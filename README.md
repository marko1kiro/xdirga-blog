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
- `scripts/` — `make-covers.mjs` (generator cover SVG), `qa-check.mjs` (QA otomatis)
- `public/covers/` — cover SVG abstrak per artikel, `public/avatars/` — avatar penulis

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
cover: /covers/judul-artikel.svg
coverAlt: "Ilustrasi abstrak artikel Judul Artikel"
```

Setelah menambah artikel, jalankan `node scripts/make-covers.mjs` untuk membuat cover SVG-nya. Cover selalu abstrak, bukan foto stok, dan alt text-nya jujur.

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

Skrip itu memakai API token Cloudflare yang sama dengan konektor `custom.cloudflare`. Domain `xdirga.xyz` belum live, menunggu record CNAME di dashboard Cloudflare.
