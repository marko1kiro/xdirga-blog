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
    "catatan-draft-contoh",
    "chatgpt-vs-gemini-vs-claude-gratis",
    "gemini-gratis-2026-flash-lite",
    "cara-pakai-ai-gratis-untuk-kerja",
    "ai-gambar-gratis-leonardo-canva-gemini",
    "voiceover-musik-ai-gratis-elevenlabs-suno",
    "ai-coding-gratis-copilot-cursor-codex",
    "prompt-ai-pemula-siap-pakai",
    "ai-gratis-content-creator",
    "aman-pakai-ai-gratis-data-jangan-upload",
    "ai-gratis-umkm-pelajar-rencana-7-hari",
    "gemini-google-wallet",
    "cloudflare-kitesurf-open-source",
    "ling-3-2-flash-gratis-openrouter",
    "chatgpt-wallet-agen-ai-bisa-bayar",
    "ngatur-waktu-layar-hp-android-iphone",
    "cara-cek-jawaban-ai-halusinasi-klaim-per-klaim",
    "ollama-jalankan-ai-gratis-di-laptop-sendiri",
    "rangkum-pdf-materi-belajar-notebooklm-gratis",
    "italia-denda-meta-805-juta-euro-galeri-facebook",
    "6-update-ai-pocket-tts-kimi-k3",
    "jualan-di-whatsapp-business-gratis-katalog-umkm",
    "foto-lama-jadi-kinclong-edit-gratis-ai-google-photos",
    "qwen4-max",
    "aplikasi-kasir-gratis-umkm-pawoon-kasir-pintar-qasir-loyverse",
    "cara-bedain-gambar-ai-deepfake",
    "elevenlabs-akuisisi-kotoba-voice-ai-jepang",
    "bikin-presentasi-rapi-gamma-gratis",
    "gpt-6-2-astra-sol-openai",
    "transkripsi-rekaman-jadi-teks-gratis-pakai-whisper",
    "gemini-4-neon-model-baru-google",
    "belajar-bahasa-asing-gratis-duolingo",
    "anthropic-ipo-nasdaq-terbesar-sejarah",
    "bikin-invoice-gratis-paper-id-freelancer-umkm",
    "thinking-machines-inkling-2-mini-model-ai-gratis-jalan-di-laptop",
    "token-context-window-kenapa-chat-ai-tiba-tiba-lupa",
    "chatgpt-down-3-setengah-jam-75-persen-gagal",
    "ngetik-tanpa-keyboard-voice-typing-google-docs-gratis",
    "openai-perplexity-and-intelligence-batas-pretraining-ai",
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
