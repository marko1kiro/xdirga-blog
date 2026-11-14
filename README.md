# Blog XDIRGA

Blog pribadi di xdirga.xyz. Publikasi digital independen berisi berita, teknologi, gaya hidup, edukasi, tips, dan bisnis. Ditulis mengalir, dari hal yang dicoba sendiri.

## Stack

Astro 5, TypeScript, Markdown dan MDX, Tailwind v4, Cloudflare Pages. Palet LIME, magenta sebagai aksen utama dan cyan sebagai aksen kedua, bukan hijau. Font Inter dan Newsreader di self host lewat Fontsource, tanpa CDN Google Fonts.

## Struktur

- `src/content/articles/` — artikel Markdown dan MDX
- `src/content/authors/` — profil penulis (YAML)
- `src/content/categories/` — kategori (YAML)
- `src/components/` — komponen, termasuk `cards/` berisi 6 varian kartu artikel dan `mdx/` berisi komponen MDX
- `src/layouts/` — BaseLayout, ArticleLayout, ArchiveLayout
- `src/pages/` — homepage, `/artikel/`, `/kategori/`, `/tag/`, `/author/`, `/search/`, halaman statis
- `src/lib/` — helper artikel dan konfigurasi situs
- `scripts/` — `watermark-covers.py` (watermark cover JPG), `qa-check.mjs` (QA otomatis)
- `public/covers/` — cover JPG hasil generate + watermark per artikel, `public/avatars/` — avatar penulis

## Menulis artikel

Buat file `.md` atau `.mdx` di `src/content/articles/` dengan frontmatter berikut.

```yaml
title: "Judul Artikel"
description: "Ringkasan satu kalimat."
category: teknologi # slug kategori, harus ada di src/content/categories/
tags: ["AI gratis", "Tips"]
author: xdirga
publishedAt: 2026-11-14
status: published # draft tidak muncul di mana pun
featured: false
trending: false
cover: /covers/judul-artikel.jpg
coverAlt: "Ilustrasi artikel Judul Artikel"
```

## Humanize dan spot-check plagiarisme (aturan wajib, 2026-11-14)

Setiap artikel, termasuk yang ditulis user nanti, WAJIB melewati humanize pass sebelum terbit.

- Suara natural Bahasa Indonesia, nada editorial informatif, santai tapi profesional. Sapaan ke pembaca memakai "lo", itu suara blog yang sudah mapan.
- Variasikan panjang kalimat dan paragraf. Hilangkan pola AI seperti pembuka generik, "Pertama, Kedua, Ketiga" yang berulang, restatement tabel di prosa, penutup generik yang seimbang, dan konstruksi "bukan X, tapi Y" yang berulang.
- Fakta, angka, harga, nama produk atau layanan, tanggal, klaim teknis, dan link TIDAK BOLEH berubah. Jangan tambah fakta baru, jangan karang kutipan, jangan ubah makna. Judul, slug, tanggal, tag, kategori, dan cover tidak berubah.
- Prosa mengalir natural, TANPA titik dua dan TANPA strip di prosa artikel (aturan gaya user).
- Spot-check plagiarisme. Untuk tiap artikel, ambil 2 sampai 3 kalimat paling khas dan cari frasa persisnya lewat web search. Kalau ada halaman lain dengan kalimat yang hampir sama persis, tulis ulang bagian itu sampai tidak lagi sama.
- Jujur soal batas. Tidak ada run detector AI atau plagiarism checker eksternal (tidak ada akun atau API checker). Jangan pernah klaim "lolos AI detector" atau "lolos plagiarism checker". Yang dikerjakan adalah rewrite humanize plus spot-check web search, dan hasilnya dilaporkan apa adanya.

## Gambar cover (aturan wajib)

Setiap artikel WAJIB punya minimal 1 gambar (hero/konten). Gambar di-generate sendiri, bukan foto stok. Pipeline-nya:

1. Generate gambar hero 16:9 (sekitar 1280x720 atau lebih besar) dengan `media.generate_image`, gaya editorial modern yang bersih, sesuai topik artikel, palet LIME (magenta, cyan, teal gelap, dasar putih teal). Jangan ada teks, huruf, logo, atau watermark di dalam hasil generate. **JANGAN ADA KARAKTER di gambar (aturan durable 2026-11-14): tidak ada manusia, hewan, robot, maskot, makhluk, atau wajah dalam bentuk apa pun — hanya objek, scene, workspace tanpa orang, perangkat, diagram, atau komposisi abstrak. Alasan: karakter yang mirip karakter komersial yang sudah ada bisa kena klaim IP/trademark di blog publik.**
2. Jalankan `python3 scripts/watermark-covers.py` — script ini resize ke 1280x720 lalu menambahkan watermark kecil "XDIRGA BLOG" di pojok kanan bawah (putih dengan bayangan gelap halus), dan menyimpan hasilnya sebagai JPG kualitas 82 ke `public/covers/<slug>.jpg`. Watermark selalu ditambahkan oleh script, jangan pernah minta AI menambahkan watermark.
3. Set frontmatter `cover: /covers/<slug>.jpg` dan `coverAlt` yang jujur (mendeskripsikan isi gambar).

Cover SVG abstrak lama sudah dihapus total 2026-11-14.

Komponen MDX yang tersedia di artikel `.mdx`: `Callout`, `InfoBox`, `Quote`, `ArticleImage`, `RelatedContent`. Contoh pemakaian ada di `apa-itu-agen-ai.mdx` dan `memilih-model-ai-gratis.mdx`.

Rute artikel adalah `/artikel/[slug]/`. Rute lama `/blog/*` dan `/tags/*` dialihkan permanen lewat `public/_redirects`.

## Tema

Light, dark, dan system. Preferensi tersimpan di localStorage dan diterapkan sebelum render lewat script anti flash di `src/components/ThemeScript.astro`. Tombol di header mengganti mode secara berurutan.

## Perintah

```sh
npm install
npm run dev
npx astro check
npm run build
node scripts/qa-check.mjs
```

`npm run build` menjalankan Pagefind setelah build untuk indeks pencarian. `scripts/qa-check.mjs` memeriksa semua rute, draf, tautan internal, overflow di 360px dan 1280px, dark mode, dan mengambil screenshot ke `/tmp/qa-shots/`. Butuh server statis di port 8321 dan Chromium Playwright di `~/.cache/ms-playwright/`.

## Deploy

Push ke `main` belum memicu deploy otomatis karena GitHub App Cloudflare belum terpasang di repo ini. Sampai App itu dipasang, deploy manual setelah build:

```sh
npm run build
python3 cf_pages_direct_upload.py
```

Skrip itu memakai API token Cloudflare yang sama dengan konektor `custom.cloudflare`. Domain `xdirga.xyz` sudah live sejak 14 Nov 2026 (CNAME dibuat user di dashboard Cloudflare).
