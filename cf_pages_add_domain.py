#!/usr/bin/env python3
"""Pasang custom domain xdirga.xyz ke Pages project xdirga-blog + cek DNS."""
import json, sys, urllib.request, urllib.error

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request

CF_BASE = "https://api.cloudflare.com/client/v4"
PROJECT = "xdirga-blog"
DOMAIN = "xdirga.xyz"


def cf(method, path, body=None):
    url = CF_BASE + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    add_surrogate_to_request(req, "custom.cloudflare",
                             allowed_hosts=("api.cloudflare.com",))
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{method} {path} -> HTTP {e.code}: "
                           f"{e.read().decode(errors='replace')[:800]}")


zone = cf("GET", f"/zones?name={DOMAIN}")
z = zone["result"][0]
zone_id, account_id = z["id"], z["account"]["id"]
print(f"zone {DOMAIN}: {zone_id} account {account_id}")

# domain yang sudah terpasang
cur = cf("GET", f"/accounts/{account_id}/pages/projects/{PROJECT}/domains")
print("domain saat ini:", [d["name"] for d in cur["result"]])
if DOMAIN not in [d["name"] for d in cur["result"]]:
    add = cf("POST", f"/accounts/{account_id}/pages/projects/{PROJECT}/domains",
             {"name": DOMAIN})
    print("tambah domain:", json.dumps(add, indent=2)[:1200])
else:
    print("domain sudah terpasang")

# cek record DNS apex
dns = cf("GET", f"/zones/{zone_id}/dns_records?name={DOMAIN}&type=A")
print("record A apex:", [(r["type"], r["name"], r["content"], r.get("proxied"))
                         for r in dns["result"]])
dns2 = cf("GET", f"/zones/{zone_id}/dns_records?name={DOMAIN}&type=CNAME")
print("record CNAME apex:", [(r["type"], r["name"], r["content"])
                             for r in dns2["result"]])
