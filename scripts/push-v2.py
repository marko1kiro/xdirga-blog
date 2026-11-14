#!/usr/bin/env python3
"""Push xdirga-blog ke GitHub dalam SATU commit via Git Data API.

Sama seperti ~/workspace/xdirga-blog-push.py, tapi juga MENGHAPUS file yang
ada di repo namun sudah tidak ada di worktree (entri tree dengan "sha": null),
supaya rute dan koleksi lama v1 tidak ikut terbangun lagi.

Usage:
  push-v2.py "<pesan commit>"

Prints head/tree/commit SHAs only — never any credential.
"""
import sys, os, json, base64, urllib.request, urllib.error

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request, read_json_response

API = "https://api.github.com"
ALLOWED = ("api.github.com",)
CRED = "custom.github-marko1kiro"
OWNER = "marko1kiro"
REPO = "xdirga-blog"
BRANCH = "main"
AUTHOR = {"name": "marko1kiro", "email": "marko1.kiro@gmail.com"}
WORKTREE = os.path.expanduser("~/workspace/xdirga-blog")
EXCLUDE_DIRS = {"node_modules", "dist", ".git", ".astro", "__pycache__"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        raise RuntimeError("redirect refused, verify the endpoint")


def api(method, url, payload=None, ok_codes=(200, 201)):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method,
        headers={"Accept": "application/vnd.github+json",
                 "X-GitHub-Api-Version": "2022-11-28",
                 "User-Agent": "muse-github-marko1kiro",
                 "Content-Type": "application/json"})
    add_surrogate_to_request(req, CRED, allowed_hosts=ALLOWED)
    opener = urllib.request.build_opener(NoRedirect())
    try:
        with opener.open(req, timeout=120) as resp:
            return resp.status, read_json_response(resp)
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:800]
        if e.code in ok_codes:
            return e.code, json.loads(body) if body else {}
        print(f"HTTP {e.code} {method} {url}\n{body}", file=sys.stderr)
        sys.exit(1)


def collect_files():
    out = []
    for root, dirs, files in os.walk(WORKTREE):
        dirs[:] = sorted(d for d in dirs if d not in EXCLUDE_DIRS)
        for f in sorted(files):
            full = os.path.join(root, f)
            rel = os.path.relpath(full, WORKTREE)
            if os.path.getsize(full) == 0:
                print(f"SKIP empty file (GitHub Blobs API rejects 0-byte): {rel}")
                continue
            out.append(rel)
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(2)
    msg = sys.argv[1]

    status, ref = api("GET", f"{API}/repos/{OWNER}/{REPO}/git/ref/heads/{BRANCH}",
                      ok_codes=(200, 404, 409))
    if status in (404, 409):
        print("repo kosong atau branch belum ada — jalankan xdirga-blog-push.py dulu untuk seed.", file=sys.stderr)
        sys.exit(1)
    head_sha = ref["object"]["sha"]
    print(f"head {BRANCH} = {head_sha}")

    # File di repo saat ini (rekursif) untuk menghitung penghapusan.
    _, tree_now = api("GET", f"{API}/repos/{OWNER}/{REPO}/git/trees/{head_sha}?recursive=1")
    repo_paths = {t["path"] for t in tree_now.get("tree", []) if t["type"] == "blob"}

    files = collect_files()
    local_set = set(files)
    deleted = sorted(repo_paths - local_set)
    print(f"{len(files)} files to push, {len(deleted)} to delete")
    for d in deleted:
        print(f"  delete {d}")

    head_commit = api("GET", f"{API}/repos/{OWNER}/{REPO}/git/commits/{head_sha}")[1]
    base_tree = head_commit["tree"]["sha"]

    entries = []
    for rel in files:
        with open(os.path.join(WORKTREE, rel), "rb") as f:
            content = base64.b64encode(f.read()).decode()
        _, blob = api("POST", f"{API}/repos/{OWNER}/{REPO}/git/blobs",
                      {"content": content, "encoding": "base64"})
        entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": blob["sha"]})
    for rel in deleted:
        entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": None})

    _, tree = api("POST", f"{API}/repos/{OWNER}/{REPO}/git/trees",
                  {"base_tree": base_tree, "tree": entries})
    print(f"tree = {tree['sha']}")
    _, commit = api("POST", f"{API}/repos/{OWNER}/{REPO}/git/commits", {
        "message": msg,
        "tree": tree["sha"],
        "parents": [head_sha],
        "author": AUTHOR,
        "committer": AUTHOR,
    })
    print(f"commit = {commit['sha']}")
    _, updated = api("PATCH", f"{API}/repos/{OWNER}/{REPO}/git/refs/heads/{BRANCH}", {
        "sha": commit["sha"],
    })
    print(f"ref {BRANCH} -> {updated['object']['sha']}")
    print("PUSH OK")


if __name__ == "__main__":
    main()
