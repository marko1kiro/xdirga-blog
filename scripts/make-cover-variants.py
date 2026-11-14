#!/usr/bin/env python3
"""Buat varian responsif cover blog XDIRGA (aturan durable, 2026-11-14).

Sumber: public/covers/<slug>.jpg yang SUDAH ber-watermark (pipeline
scripts/watermark-covers.py) — varian dibuat dari file itu, jadi watermark
"XDIRGA BLOG" ikut terbawa ke semua varian. Gambar TIDAK digenerate ulang.

Per cover dibuat 5 varian:
  <slug>-640.webp   (640x360,  WebP q78)  -> kartu kecil / DPR rendah
  <slug>-720.webp   (720x405, WebP q78)  -> mobile DPR ~1.75 (audit
                   PageSpeed menghitung lebar tampil 644px; 640w kalah
                   4px sehingga browser lompat ke 1280w — 720w menutup celah ini)
  <slug>-1280.webp  (1280x720, WebP q80)  -> desktop lebar / DPR tinggi
  <slug>-640.jpg    (640x360,  JPG q78)   -> fallback non-WebP
  <slug>-720.jpg    (720x405,  JPG q78)   -> fallback non-WebP
File asli <slug>.jpg (1280x720, JPG q82) tetap dipakai sebagai fallback 1280w.

Dipakai lewat src/components/CoverPicture.astro (<picture> + srcset/sizes).

Jalankan: python3 scripts/make-cover-variants.py
"""
import glob
import os
import sys

from PIL import Image

COVERS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "covers")

VARIANTS = [
    ("-640.webp", 640, "WEBP", {"quality": 78, "method": 6}),
    ("-720.webp", 720, "WEBP", {"quality": 78, "method": 6}),
    ("-1280.webp", 1280, "WEBP", {"quality": 80, "method": 6}),
    ("-640.jpg", 640, "JPEG", {"quality": 78, "optimize": True}),
    ("-720.jpg", 720, "JPEG", {"quality": 78, "optimize": True}),
]


def main():
    srcs = sorted(glob.glob(os.path.join(COVERS_DIR, "*.jpg")))
    # Hanya file asli: lewati varian -640.jpg/-720.jpg dari run sebelumnya.
    srcs = [p for p in srcs if not os.path.basename(p).endswith(("-640.jpg", "-720.jpg"))]
    if not srcs:
        print(f"tidak ada cover di {COVERS_DIR}")
        return 1
    total_before = total_after = 0
    for path in srcs:
        slug = os.path.basename(path)[:-4]
        im = Image.open(path).convert("RGB")
        assert im.size == (1280, 720), f"{path}: ukuran {im.size}, diharapkan (1280, 720)"
        total_before += os.path.getsize(path)
        for suffix, width, fmt, kw in VARIANTS:
            out = os.path.join(COVERS_DIR, f"{slug}{suffix}")
            resized = im.resize((width, round(width * 9 / 16)), Image.LANCZOS)
            resized.save(out, fmt, **kw)
            total_after += os.path.getsize(out)
            print(f"{slug}{suffix}  {os.path.getsize(out) // 1024} KB")
    print(f"OK: {len(srcs)} cover -> {len(srcs) * len(VARIANTS)} varian")
    print(f"ukuran asli total: {total_before // 1024} KB, varian total: {total_after // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
