#!/usr/bin/env python3
"""Direct-upload deploy dist/ ke Cloudflare Pages TANPA wrangler (protokol
reverse-engineered dari wrangler, diverifikasi dari 3 sumber independen).

Urutan:
 1. GET  /accounts/{aid}/pages/projects/{name}/upload-token  (token akun)
 2. Hash tiap file: blake3(base64(bytes) + ext_tanpa_dot).hex()[:32]
 3. POST /pages/assets/check-missing   (Bearer JWT, tanpa prefix /accounts)
 4. POST /pages/assets/upload          (Bearer JWT, batch <=40MiB / <=2000 file)
 5. POST /pages/assets/upsert-hashes   (Bearer JWT)
 6. POST /accounts/{aid}/pages/projects/{name}/deployments (token akun, multipart:
    manifest JSON {"/path": hash} + branch=main)

Auth token akun lewat surrogate dynamic_credentials (seperti bin/cf.py).
JWT asset dipakai mentah sebagai Bearer (itu kredensial Cloudflare asli).
"""
import base64, hashlib, json, mimetypes, os, sys, time, urllib.request, urllib.error
import uuid

import blake3

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request  # noqa: E402

PROJECT = "xdirga-blog"
DIST = os.path.expanduser("~/workspace/xdirga-blog/dist")
CF_BASE = "https://api.cloudflare.com/client/v4"
ALLOWED_HOSTS = ("api.cloudflare.com",)


def cf_account(method, path, body=None, headers=None):
    """Request ke api.cloudflare.com dengan token akun (surrogate)."""
    url = CF_BASE + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    add_surrogate_to_request(req, "custom.cloudflare", allowed_hosts=ALLOWED_HOSTS)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{method} {path} -> HTTP {e.code}: "
                           f"{e.read().decode(errors='replace')[:500]}")


def cf_jwt(method, path, jwt, body=None, content_type="application/json"):
    """Request asset (Bearer JWT mentah, tanpa surrogate)."""
    url = CF_BASE + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {jwt}")
    req.add_header("Content-Type", content_type)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{method} {path} -> HTTP {e.code}: "
                           f"{e.read().decode(errors='replace')[:500]}")


# --- hashing -----------------------------------------------------------------
SKIP_NAMES = {"_worker.js", "_headers", "_redirects", "_routes.json",
              ".DS_Store", "node_modules", ".git", ".wrangler"}
SPECIAL = {"_headers", "_redirects", "_routes.json"}


def ext_without_dot(path):
    base = os.path.basename(path)
    _, ext = os.path.splitext(base)
    return ext[1:] if ext.startswith(".") else ""


def file_hash(data, rel):
    b64 = base64.b64encode(data).decode("ascii")
    h = blake3.blake3((b64 + ext_without_dot(rel)).encode("ascii"))
    return h.hexdigest()[:32]


def walk_dist():
    files = []  # (rel_posix, abspath, size)
    for root, dirs, names in os.walk(DIST):
        dirs[:] = [d for d in dirs if d not in SKIP_NAMES]
        for name in names:
            # File SPECIAL (_headers/_redirects/_routes.json) jangan di-skip:
            # main() mengirimnya sebagai field khusus deployment, bukan asset.
            if name in SKIP_NAMES and name not in SPECIAL:
                continue
            ap = os.path.join(root, name)
            if os.path.islink(ap):
                continue
            rel = os.path.relpath(ap, DIST).replace(os.sep, "/")
            if os.path.getsize(ap) > 25 * 1024 * 1024:
                raise RuntimeError(f"file >25MiB: {rel}")
            files.append((rel, ap, os.path.getsize(ap)))
    if len(files) > 20000:
        raise RuntimeError("file >20000")
    return sorted(files)


def content_type(rel):
    ext = os.path.splitext(rel)[1].lower()
    mapping = {
        ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
        ".mjs": "text/javascript", ".json": "application/json",
        ".xml": "application/xml", ".svg": "image/svg+xml",
        ".ico": "image/x-icon", ".wasm": "application/wasm",
        ".woff": "font/woff", ".woff2": "font/woff2",
        ".txt": "text/plain", ".png": "image/png",
        ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".webp": "image/webp", ".map": "application/json",
    }
    return mapping.get(ext, "application/octet-stream")


# --- multipart ---------------------------------------------------------------
def multipart_encode(fields):
    """fields: list of (name, value, filename, content_type) — value str/bytes."""
    boundary = "----cfpages" + uuid.uuid4().hex
    body = bytearray()
    for name, value, filename, ctype in fields:
        body += f"--{boundary}\r\n".encode()
        disp = f'Content-Disposition: form-data; name="{name}"'
        if filename is not None:
            disp += f'; filename="{filename}"'
        body += disp.encode() + b"\r\n"
        if ctype:
            body += f"Content-Type: {ctype}\r\n".encode()
        body += b"\r\n"
        body += value if isinstance(value, bytes) else value.encode()
        body += b"\r\n"
    body += f"--{boundary}--\r\n".encode()
    return bytes(body), f"multipart/form-data; boundary={boundary}"


def create_deployment(account_id, manifest, special_files):
    fields = [("manifest", json.dumps(manifest), None, "application/json"),
              ("branch", "main", None, "text/plain")]
    for name, data in special_files.items():
        fields.append((name, data, name, "text/plain"))
    body, ctype = multipart_encode(fields)
    req = urllib.request.Request(
        f"{CF_BASE}/accounts/{account_id}/pages/projects/{PROJECT}/deployments",
        data=body, method="POST")
    req.add_header("Content-Type", ctype)
    add_surrogate_to_request(req, "custom.cloudflare", allowed_hosts=ALLOWED_HOSTS)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"POST deployments -> HTTP {e.code}: "
                           f"{e.read().decode(errors='replace')[:800]}")


# --- main ----------------------------------------------------------------------
def main():
    # 0. account id dari zone xdirga.xyz
    zone = cf_account("GET", "/zones?name=xdirga.xyz")
    account_id = zone["result"][0]["account"]["id"]
    print(f"account: {account_id}")

    # 1. upload token
    tok = cf_account("GET", f"/accounts/{account_id}/pages/projects/{PROJECT}/upload-token")
    jwt = tok["result"]["jwt"]
    print("upload-token OK (jwt diterima)")

    # 2. hash semua file
    files = walk_dist()
    manifest = {}
    by_hash = {}
    special = {}
    total = 0
    for rel, ap, size in files:
        if os.path.basename(rel) in SPECIAL:
            with open(ap, "rb") as f:
                special[os.path.basename(rel)] = f.read()
            continue
        with open(ap, "rb") as f:
            data = f.read()
        h = file_hash(data, rel)
        manifest["/" + rel] = h
        by_hash[h] = (rel, data)
        total += size
    print(f"{len(manifest)} file di-hash, total {total/1024:.0f} KiB")

    # 3. check-missing
    hashes = list(manifest.values())
    missing_resp = cf_jwt("POST", "/pages/assets/check-missing", jwt,
                          {"hashes": hashes})
    missing = set(missing_resp.get("result") or [])
    print(f"check-missing: {len(missing)} dari {len(hashes)} perlu di-upload")

    # 4. upload batch (<=40MiB, <=2000 file, terbesar dulu)
    to_upload = [(by_hash[h][0], by_hash[h][1], h) for h in missing]
    to_upload.sort(key=lambda t: len(t[1]), reverse=True)
    batches, cur, cur_size = [], [], 0
    for rel, data, h in to_upload:
        b64len = ((len(data) + 2) // 3) * 4
        if cur and (cur_size + b64len > 40 * 1024 * 1024 or len(cur) >= 2000):
            batches.append(cur)
            cur, cur_size = [], 0
        cur.append((rel, data, h))
        cur_size += b64len
    if cur:
        batches.append(cur)
    print(f"upload: {len(batches)} batch")
    for i, batch in enumerate(batches):
        payload = [{"key": h,
                    "value": base64.b64encode(data).decode("ascii"),
                    "metadata": {"contentType": content_type(rel)},
                    "base64": True} for rel, data, h in batch]
        for attempt in range(5):
            try:
                cf_jwt("POST", "/pages/assets/upload", jwt, payload)
                break
            except RuntimeError as e:
                if "401" in str(e) and attempt < 4:
                    tok = cf_account("GET", f"/accounts/{account_id}/pages/projects/{PROJECT}/upload-token")
                    jwt = tok["result"]["jwt"]
                    print("  JWT di-refresh (401)")
                    continue
                if attempt == 4:
                    raise
                time.sleep(2 ** attempt)
        print(f"  batch {i+1}/{len(batches)} OK ({len(batch)} file)")

    # 5. upsert-hashes
    cf_jwt("POST", "/pages/assets/upsert-hashes", jwt, {"hashes": hashes})
    print("upsert-hashes OK")

    # 6. create deployment
    dep = create_deployment(account_id, manifest, special)
    if not dep.get("success"):
        raise RuntimeError(f"create deployment gagal: {json.dumps(dep)[:800]}")
    dep_id = dep["result"]["id"]
    dep_url = dep["result"].get("url")
    print(f"deployment dibuat: id={dep_id} url={dep_url}")

    # 7. poll sampai sukses/gagal
    for _ in range(60):
        d = cf_account("GET", f"/accounts/{account_id}/pages/projects/{PROJECT}/deployments/{dep_id}")
        stage = d["result"].get("latest_stage", {})
        status = stage.get("status")
        print(f"  stage: {stage.get('name')} -> {status}")
        if status in ("success", "failure"):
            print(json.dumps(d["result"], indent=2)[:1500])
            if status == "success":
                print(f"\nLIVE: {dep_url}")
                print(f"production: https://{PROJECT}.pages.dev")
            return 0 if status == "success" else 1
        time.sleep(5)
    print("poll timeout")
    return 2


if __name__ == "__main__":
    sys.exit(main())
