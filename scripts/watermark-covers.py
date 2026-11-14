#!/usr/bin/env python3
"""Watermark cover blog XDIRGA.

Pipeline gambar cover (aturan durable, 2026-11-14):
  1. Generate gambar hero 16:9 via media.generate_image (TANPA teks/logo/watermark).
  2. Script ini: resize ke 1280x720 + watermark kecil "XDIRGA BLOG"
     pojok kanan bawah (putih + bayangan gelap halus).
  3. Simpan sebagai JPG kualitas 82 ke public/covers/<slug>.jpg,
     lalu set frontmatter `cover` artikel ke path itu.

Jalankan: python3 scripts/watermark-covers.py
Input : ~/workspace/xdirga-blog-covers-raw/media-generation-*.jpg
Output: public/covers/<slug>.jpg
"""
import glob
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RAW_DIR = os.path.expanduser("~/workspace/xdirga-blog-covers-raw")
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "covers")
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
TEXT = "XDIRGA BLOG"
TARGET_W, TARGET_H = 1280, 720
QUALITY = 82

SLUGS = [
    "manus-free-300-kredit-sehari",
    "7-api-llm-gratis-tanpa-tanggal-berakhir",
    "apa-itu-agen-ai",
    "cara-kerja-rss",
    "cara-menulis-catatan-belajar",
    "layanan-ai-gratis-makin-ketat",
    "lima-kebiasaan-kerja-rapi",
    "memilih-model-ai-gratis",
    "rutinitas-pagi-sebelum-buka-laptop",
    "selamat-datang-di-blog-xdirga",
    "catatan-draft-contoh",
]


def slug_for(path):
    stem = os.path.basename(path)
    assert stem.startswith("media-generation-"), stem
    rest = stem[len("media-generation-"):]
    for slug in SLUGS:
        if rest.startswith(slug) or slug.startswith(rest.split("-0-")[0]):
            return slug
    raise ValueError(f"tidak ada slug yang cocok untuk {stem}")


def watermark(im):
    """Tambah watermark kecil pojok kanan bawah, putih + bayangan halus."""
    w, h = im.size
    font_size = max(20, round(w * 0.024))  # tinggi huruf ~2,4% lebar gambar
    font = ImageFont.truetype(FONT_PATH, font_size)
    pad_right, pad_bottom = 28, 24

    # Lapisan bayangan: teks hitam blur, lalu teks putih di atasnya.
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    bbox = d.textbbox((0, 0), TEXT, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = w - pad_right - tw
    y = h - pad_bottom - th
    d.text((x + 2, y + 2), TEXT, font=font, fill=(0, 0, 0, 160))
    overlay = overlay.filter(ImageFilter.GaussianBlur(2))
    d = ImageDraw.Draw(overlay)
    d.text((x, y), TEXT, font=font, fill=(255, 255, 255, 235))
    return Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    files = sorted(glob.glob(os.path.join(RAW_DIR, "media-generation-*.jpg")))
    if not files:
        print(f"tidak ada file raw di {RAW_DIR}")
        return 1
    done = []
    for path in files:
        slug = slug_for(path)
        im = Image.open(path).convert("RGB")
        # Center-crop ke 16:9 lalu resize ke 1280x720.
        sw, sh = im.size
        target_ratio = TARGET_W / TARGET_H
        if sw / sh > target_ratio:
            nw = int(sh * target_ratio)
            im = im.crop(((sw - nw) // 2, 0, (sw - nw) // 2 + nw, sh))
        else:
            nh = int(sw / target_ratio)
            im = im.crop((0, (sh - nh) // 2, sw, (sh - nh) // 2 + nh))
        im = im.resize((TARGET_W, TARGET_H), Image.LANCZOS)
        im = watermark(im)
        out = os.path.join(OUT_DIR, f"{slug}.jpg")
        im.save(out, "JPEG", quality=QUALITY, optimize=True)
        done.append((slug, os.path.getsize(out)))
    for slug, size in done:
        print(f"{slug}.jpg  {size // 1024} KB")
    print(f"OK: {len(done)} cover ditulis ke {OUT_DIR}")
    missing = [s for s in SLUGS if s not in {d[0] for d in done}]
    if missing:
        print(f"PERINGATAN: slug tanpa gambar: {missing}")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
