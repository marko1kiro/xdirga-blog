# XDIRGA BLOG — Production Technical SEO Audit

**Audit timestamp:** 14 November 2026, 14:08–14:13 WIB
**Production deployment:** 83b12c80 (commit `0b206f0`, deploy 14 Nov 2026 13:59 WIB) — terkonfirmasi aktif lewat perilaku redirect baru `/kategori/lainnya` (tanpa slash) yang sudah 301.
**Audit scope:** 61 URL sitemap + robots.txt + sitemap index + `/search/` (+ `?q=test`) + probe 404 + http/www + 62 internal link unik + varian redirect. Total sekitar 133 pemeriksaan HTTP/HTML.
**Method:** HTTP crawl langsung dengan curl (User-Agent `TechnicalSEOAudit/1.0`, header `Cache-Control: no-cache`, cache-buster unik), inspeksi HTML server-rendered, parsing sitemap, dan pemeriksaan header. READ-ONLY, tanpa perubahan kode, konfigurasi, atau deployment.
**Keterbatasan:** PageSpeed/Lighthouse API mengembalikan 429 (kuota habis) pada 14:12 WIB, jadi skor lab TIDAK DIUJI dan tidak dikarang. Google Search Console tidak diakses (tidak ada akses di environment ini), jadi status indexing GSC NOT TESTED.

## A. Executive Summary

Kondisi SEO teknis XDIRGA BLOG secara keseluruhan **sehat, dengan beberapa kekurangan menengah yang layak diperbaiki sebelum pekerjaan optimasi dimulai**. Tidak ada masalah kritis (P0): seluruh 61 URL di sitemap mengembalikan 200, canonical self-referencing di semua halaman, nol broken internal link dari 62 href unik, nol tautan ke kategori Lainnya yang sudah dihapus, redirect legacy bekerja di kedua varian URL, JSON-LD valid di semua halaman, dan seluruh 201 gambar punya alt serta dimensi.

Kekurangan terbesar terkonsentrasi di tiga tempat: homepage **tidak punya H1 sama sekali**, halaman **`/search/` dapat diindeks** (200 + canonical + tanpa noindex) padahal tidak ada di sitemap, dan **og:image generik** (48 halaman non-artikel semuanya memakai cover artikel Selamat Datang). Ditambah 3 judul artikel 85–90 karakter yang akan terpotong di SERP, `dateModified` yang tidak ada di semua artikel, serta beberapa meta description duplikat dan terlalu pendek di halaman paginasi dan halaman legal.

Performa statis terlihat sangat baik: homepage 113 KB, satu stylesheet 65 KB, nol JavaScript eksternal, font self-hosted dengan preload, Brotli aktif, dan hero image sudah eager + `fetchpriority: high`. Namun skor lab saat ini tidak tersedia (PageSpeed API 429), jadi angka Core Web Vitals tidak bisa diklaim.

## B. Audit Scorecard

| Area | Status | Jumlah Temuan | Catatan |
|---|---|---|---|
| Crawlability | PASS | 0 | robots.txt valid, sitemap 61/61 hidup, 0 broken link |
| Indexability | WARNING | 1 | F-02: /search/ indexable |
| On-page SEO | WARNING | 4 | F-01, F-03, F-06, F-07 |
| Structured data | WARNING | 2 | F-05, F-10 |
| Open Graph | WARNING | 1 | F-04: og:image generik 48 halaman |
| Internal linking | WARNING | 1 | F-09: /tag/ orphan |
| Image SEO | PASS | 0 | 201 img, 0 tanpa alt/dimensi |
| URL & redirects | PASS | 0 | Legacy lainnya 301 kedua varian, 1 hop |
| Semantic HTML | PASS | 0 | Landmark lengkap, konten server-rendered |
| Performance | NOT TESTED | 0 | Skor lab tidak tersedia (API 429); indikator statis baik |

## C. Temuan Detail

### F-01 — Homepage tidak punya H1 (Medium)
- **URL terdampak:** https://xdirga.xyz/
- **Bukti:** HTML homepage tidak mengandung satu pun tag `<h1>`. Heading pertama adalah H2: "Sedang Tren", "Terbaru", "Belajar dan Berkembang", "Pilihan Editor". 60 dari 61 halaman lain punya tepat 1 H1.
- **Dampak SEO:** H1 adalah sinyal heading terkuat; homepage kehilangan penanda topik utama untuk mesin pencari.
- **Rekomendasi:** Jadikan judul atau tagline hero homepage sebagai H1 (satu saja). Perlu perubahan kode.

### F-02 — Halaman /search/ dapat diindeks (Medium)
- **URL terdampak:** https://xdirga.xyz/search/ dan https://xdirga.xyz/search/?q=...
- **Bukti:** Keduanya 200, canonical self-referencing ke `https://xdirga.xyz/search/`, tanpa meta robots dan tanpa X-Robots-Tag. robots.txt tidak memblokir `/search/`. Halaman ini tidak ada di sitemap.
- **Dampak SEO:** Halaman hasil pencarian internal bisa masuk indeks Google sebagai thin/duplicate content; setiap query (`?q=`) berpotensi jadi URL terindeks terpisah.
- **Rekomendasi:** Tambah meta robots `noindex` pada template search (atau `Disallow: /search/` di robots.txt). Perlu perubahan kode/konfigurasi.

### F-03 — Tiga judul artikel 85–90 karakter, terpotong di SERP (Medium)
- **URL terdampak:**
  - `/artikel/cara-pakai-ai-gratis-untuk-kerja/` — 90 karakter: "7 Cara Pakai AI Gratis Buat Kerja Sehari hari, dari Email Sampai Spreadsheet — XDIRGA BLOG"
  - `/artikel/chatgpt-vs-gemini-vs-claude-gratis/` — 85 karakter
  - `/artikel/gemini-gratis-2026-flash-lite/` — 85 karakter
- **Bukti:** Panjang title diukur dari tag `<title>` di HTML production. Judul lain berada di rentang 18–75 karakter.
- **Dampak SEO:** Google menampilkan sekitar 55–60 karakter; judul terpotong dan pesan utamanya bisa hilang. Batas karakter bukan satu-satunya penentu kualitas, tapi pemotongan nyata terjadi pada tiga judul ini.
- **Rekomendasi:** Perpendek ketiga judul (konten/metadata). Slug tidak perlu diubah.

### F-04 — og:image generik untuk 48 halaman non-artikel (Medium)
- **URL terdampak:** Homepage, 6 kategori, 26 tag, 5 author, /tentang/, /kontak/, /privasi/, /syarat/, /sitemap/, /kategori/, /tag/ — total 49 halaman berbagi satu gambar yang sama.
- **Bukti:** `og:image` di 49 halaman = `https://xdirga.xyz/covers/selamat-datang-di-blog-xdirga.jpg` (cover artikel Selamat Datang). Hanya 13 halaman artikel yang memakai covernya sendiri.
- **Dampak SEO/sosial:** Preview saat dibagikan menampilkan gambar artikel yang tidak relevan dengan isi halaman (misalnya halaman Teknologi menampilkan cover artikel Selamat Datang).
- **Rekomendasi:** Sediakan og:image per template (misalnya gambar default situs yang netral, atau cover kategori). Perlu perubahan kode.

### F-05 — dateModified tidak ada di semua artikel (Low)
- **URL terdampak:** 13 artikel.
- **Bukti:** `grep article:modified_time` = 0 di HTML artikel; JSON-LD BlogPosting hanya punya `datePublished`, tanpa `dateModified`. Sebaliknya `article:published_time`, `article:section`, `article:author`, dan `article:tag` ada.
- **Dampak SEO:** Google tidak mendapat sinyal kapan artikel terakhir diperbarui; kehilangan sinyal kesegaran dan transparansi riwayat revisi.
- **Rekomendasi:** Tambah `updatedAt` di frontmatter artikel dan emit `dateModified` + `article:modified_time`. Perlu perubahan kode dan konten.

### F-06 — Meta description duplikat di halaman paginasi (Low)
- **URL terdampak:** `/author/xdirga/` sampai `/author/xdirga/5/` (5x deskripsi sama, 186 karakter), `/tag/AI%20gratis/` sampai `/3/` (3x), `/kategori/teknologi/` dan `/2/` (2x).
- **Bukti:** Perbandingan `meta description` di 61 halaman; tidak ada description kosong, tapi 3 kelompok duplikat ini.
- **Dampak SEO:** Deskripsi yang sama di beberapa URL melemahkan diferensiasi snippet di SERP.
- **Rekomendasi:** Tambahkan penanda halaman (misalnya "(Halaman 2)") ke description halaman paginasi, seperti yang sudah dilakukan pada title. Perlu perubahan kode.

### F-07 — Meta description sangat pendek di halaman legal dan indeks tag (Low)
- **URL terdampak:** `/syarat/` (27 karakter: "Syarat layanan XDIRGA BLOG."), `/privasi/` (30 karakter), `/tag/` (34 karakter: "Jelajahi semua tag di XDIRGA BLOG.").
- **Bukti:** Panjang description diukur dari HTML production; description terpanjang 186 karakter.
- **Dampak SEO:** Snippet kurang informatif; Google kemungkinan mengganti dengan teks lain dari halaman.
- **Rekomendasi:** Tulis deskripsi 1–2 kalimat yang menjelaskan isi halaman. Perlu perubahan konten.

### F-08 — Sitemap tanpa lastmod (Low)
- **URL terdampak:** Seluruh 61 URL di `sitemap-0.xml`.
- **Bukti:** 0 entri `<lastmod>` di sitemap. Sitemap index hanya berisi satu child (`sitemap-0.xml`), XML valid, semua URL absolut HTTPS dengan trailing slash konsisten.
- **Dampak SEO:** Crawler tidak bisa memprioritaskan URL yang baru berubah; dampaknya kecil untuk situs sekecil ini, tapi lastmod adalah sinyal yang murah.
- **Rekomendasi:** Isi `lastmod` dari tanggal publikasi/perubahan artikel. Perlu perubahan kode.

### F-09 — Halaman /tag/ ada di sitemap tapi orphan (Low)
- **URL terdampak:** https://xdirga.xyz/tag/
- **Bukti:** Dari 61 halaman yang di-crawl, tidak satu pun `<a href>` yang menunjuk ke `/tag/`. Semua URL sitemap lain ter-link dari minimal satu halaman. (Satu-satunya URL ter-link tapi tidak di sitemap adalah `/rss.xml` — benar — dan `/search/` — lihat F-02.)
- **Dampak SEO:** Halaman ini hanya bisa ditemukan lewat sitemap; PageRank internal tidak mengalir ke sana.
- **Rekomendasi:** Tambah tautan ke /tag/ di footer atau navigasi, atau keluarkan dari sitemap. Perlu perubahan kode.

### F-10 — BreadcrumbList JSON-LD ada, tapi tidak ada breadcrumb visible (Low)
- **URL terdampak:** 13 artikel.
- **Bukti:** JSON-LD `BreadcrumbList` valid di semua artikel (Beranda › Kategori › Artikel), tapi string "breadcrumb" di HTML artikel hanya muncul di dalam script JSON-LD — tidak ada navigasi breadcrumb yang terlihat di halaman.
- **Dampak SEO:** Google menyarankan breadcrumb yang terlihat sesuai dengan structured data; ketidaksesuaian ini bukan pelanggaran, tapi melemahkan konsistensi sinyal dan navigasi pengguna.
- **Rekomendasi:** Tampilkan breadcrumb di atas judul artikel. Perlu perubahan kode.

### F-11 — Tidak ada rel=prev/next di halaman paginasi (Informational)
- **URL terdampak:** `/kategori/teknologi/2/`, `/author/xdirga/2/`–`/5/`, `/tag/AI%20gratis/2/`–`/3/`.
- **Bukti:** Tidak ada `rel="prev"` atau `rel="next"` di HTML halaman paginasi. Title halaman paginasi sudah unik ("Teknologi (Halaman 2) — XDIRGA BLOG") dan canonical self-referencing.
- **Dampak SEO:** Tidak ada. Google berhenti memakai rel prev/next sejak 2019. Dicatat hanya untuk kelengkapan; tidak perlu diperbaiki.

### F-12 — www.xdirga.xyz tidak punya DNS (Informational)
- **URL terdampak:** https://www.xdirga.xyz/ (gagal koneksi, curl 000).
- **Bukti:** DNS lookup via dns.google (1.1.1.1) mengembalikan jawaban kosong untuk `www.xdirga.xyz`, sementara `xdirga.xyz` mengembalikan 104.21.30.19 dan 172.67.150.62 (Cloudflare).
- **Dampak SEO:** Tidak ada duplikasi host (tidak ada versi www yang hidup), jadi bukan masalah canonical. Tapi pengguna yang mengetik www mendapat error DNS.
- **Rekomendasi:** Tambah CNAME www → Pages dan redirect ke apex bila diinginkan. Perlu perubahan konfigurasi DNS (di luar kode).

### F-13 — robots.txt memblokir AI training crawler (Informational, disengaja)
- **URL terdampak:** https://xdirga.xyz/robots.txt (200, `text/plain; charset=utf-8`).
- **Bukti:** Blok "BEGIN Cloudflare Managed content" memblokir 30+ crawler pelatihan AI (GPTBot, CCBot, ClaudeBot, Google-Extended, Applebot-Extended, Bytespider, dan lain-lain) plus `Content-Signal: search=yes,ai-train=no,use=reference`. `User-agent: *` tetap `Allow: /`. Sitemap directive benar: `https://xdirga.xyz/sitemap-index.xml`. Tidak ada aturan yang memblokir halaman penting.
- **Dampak SEO:** Tidak ada dampak pada pencarian. Konsekuensinya: konten tidak dipakai untuk melatih model AI dan mungkin tidak muncul di sebagian jawaban AI. Ini pembatasan yang disengaja dari Cloudflare; pastikan pemilik sadar akan trade-off-nya.
- **Rekomendasi:** Tidak ada, kecuali pemilik memang ingin mengubah kebijakan AI.

### F-14 — Title homepage hanya "XDIRGA BLOG" (Informational)
- **URL terdampak:** https://xdirga.xyz/ (title 11 karakter; description 144 karakter sudah baik).
- **Bukti:** `<title>XDIRGA BLOG</title>`, `og:title` sama.
- **Dampak SEO:** Kecil untuk brand baru; homepage tidak membawa kata kunci deskriptif apa pun ke SERP.
- **Rekomendasi:** Pertimbangkan "XDIRGA BLOG — Berita, Teknologi, dan Tips AI" atau sejenis. Perlu perubahan metadata.

### F-15 — Sitemap menyertakan halaman paginasi arsip (Informational)
- **URL terdampak:** `/author/xdirga/2/`–`/5/`, `/kategori/teknologi/2/`, `/tag/AI%20gratis/2/`–`/3/`.
- **Bukti:** 7 dari 61 URL sitemap adalah halaman 2+. Semuanya 200 dengan canonical self-referencing dan title unik.
- **Dampak SEO:** Tidak ada masalah nyata; Google umumnya mengabaikan URL paginasi di sitemap. Dicatat untuk kelengkapan.

## D. URL Inventory

Seluruh 61 URL di sitemap mengembalikan 200, canonical self-referencing, dan indexable (tanpa meta robots dan tanpa X-Robots-Tag). Kolom H1 menampilkan teks H1; "—" berarti tidak ada H1 (hanya homepage).

| URL | HTTP | Indexability | Canonical | Title (karakter) | H1 | Sitemap | Desc (karakter) |
|---|---|---|---|---|---|---|---|
| `/` | 200 | indexable | self | 11 | — | ya | 160 |
| `/artikel/7-api-llm-gratis-tanpa-tanggal-berakhir/` | 200 | indexable | self | 53 | 7 API LLM Gratis Tanpa Tanggal Berakhir | ya | 94 |
| `/artikel/apa-itu-agen-ai/` | 200 | indexable | self | 47 | Apa Itu Agen AI dan Cara Kerjanya | ya | 114 |
| `/artikel/cara-kerja-rss/` | 200 | indexable | self | 53 | Cara Kerja RSS dan Kenapa Masih Berguna | ya | 112 |
| `/artikel/cara-menulis-catatan-belajar/` | 200 | indexable | self | 67 | Cara Menulis Catatan Belajar yang Gampan | ya | 104 |
| `/artikel/cara-pakai-ai-gratis-untuk-kerja/` | 200 | indexable | self | 90 | 7 Cara Pakai AI Gratis Buat Kerja Sehari | ya | 150 |
| `/artikel/chatgpt-vs-gemini-vs-claude-gratis/` | 200 | indexable | self | 85 | ChatGPT vs Gemini vs Claude Gratis 2026, | ya | 143 |
| `/artikel/gemini-gratis-2026-flash-lite/` | 200 | indexable | self | 85 | Gemini Gratis 2026, Masih Bisa Dipakai B | ya | 154 |
| `/artikel/layanan-ai-gratis-makin-ketat/` | 200 | indexable | self | 72 | Layanan AI Gratis Makin Ketat, Ini yang  | ya | 124 |
| `/artikel/lima-kebiasaan-kerja-rapi/` | 200 | indexable | self | 64 | 5 Kebiasaan Kecil yang Bikin Hari Kerja  | ya | 101 |
| `/artikel/manus-free-300-kredit-sehari/` | 200 | indexable | self | 50 | Manus Gratis, 300 Kredit Setiap Hari | ya | 98 |
| `/artikel/memilih-model-ai-gratis/` | 200 | indexable | self | 61 | Memilih Model AI Gratis untuk Tugas Seha | ya | 122 |
| `/artikel/rutinitas-pagi-sebelum-buka-laptop/` | 200 | indexable | self | 63 | Rutinitas Pagi yang Sederhana Sebelum Bu | ya | 109 |
| `/artikel/selamat-datang-di-blog-xdirga/` | 200 | indexable | self | 43 | Selamat Datang di Blog XDIRGA | ya | 102 |
| `/author/xdirga/` | 200 | indexable | self | 19 | Marko | ya | 186 |
| `/author/xdirga/2/` | 200 | indexable | self | 31 | Marko | ya | 186 |
| `/author/xdirga/3/` | 200 | indexable | self | 31 | Marko | ya | 186 |
| `/author/xdirga/4/` | 200 | indexable | self | 31 | Marko | ya | 186 |
| `/author/xdirga/5/` | 200 | indexable | self | 31 | Marko | ya | 186 |
| `/kategori/` | 200 | indexable | self | 22 | Kategori | ya | 39 |
| `/kategori/berita/` | 200 | indexable | self | 20 | Berita | ya | 98 |
| `/kategori/bisnis/` | 200 | indexable | self | 20 | Bisnis | ya | 78 |
| `/kategori/edukasi/` | 200 | indexable | self | 21 | Edukasi | ya | 70 |
| `/kategori/lifestyle/` | 200 | indexable | self | 23 | Lifestyle | ya | 76 |
| `/kategori/teknologi/` | 200 | indexable | self | 23 | Teknologi | ya | 91 |
| `/kategori/teknologi/2/` | 200 | indexable | self | 35 | Teknologi | ya | 91 |
| `/kategori/tips/` | 200 | indexable | self | 18 | Tips | ya | 78 |
| `/kontak/` | 200 | indexable | self | 20 | Kontak | ya | 43 |
| `/privasi/` | 200 | indexable | self | 31 | Kebijakan Privasi | ya | 30 |
| `/sitemap/` | 200 | indexable | self | 21 | Sitemap | ya | 76 |
| `/syarat/` | 200 | indexable | self | 28 | Syarat Layanan | ya | 27 |
| `/tag/` | 200 | indexable | self | 23 | Semua Tag | ya | 34 |
| `/tag/AI%20gratis/` | 200 | indexable | self | 27 | #AI gratis | ya | 50 |
| `/tag/AI%20gratis/2/` | 200 | indexable | self | 39 | #AI gratis | ya | 50 |
| `/tag/AI%20gratis/3/` | 200 | indexable | self | 39 | #AI gratis | ya | 50 |
| `/tag/API/` | 200 | indexable | self | 21 | #API | ya | 44 |
| `/tag/Agen%20AI/` | 200 | indexable | self | 25 | #Agen AI | ya | 48 |
| `/tag/Belajar/` | 200 | indexable | self | 25 | #Belajar | ya | 48 |
| `/tag/Berita/` | 200 | indexable | self | 24 | #Berita | ya | 47 |
| `/tag/Catatan/` | 200 | indexable | self | 25 | #Catatan | ya | 48 |
| `/tag/ChatGPT/` | 200 | indexable | self | 25 | #ChatGPT | ya | 48 |
| `/tag/Claude/` | 200 | indexable | self | 24 | #Claude | ya | 47 |
| `/tag/Edukasi/` | 200 | indexable | self | 25 | #Edukasi | ya | 48 |
| `/tag/Gaya%20Hidup/` | 200 | indexable | self | 28 | #Gaya Hidup | ya | 51 |
| `/tag/Gemini/` | 200 | indexable | self | 24 | #Gemini | ya | 47 |
| `/tag/Google/` | 200 | indexable | self | 24 | #Google | ya | 47 |
| `/tag/Kebiasaan/` | 200 | indexable | self | 27 | #Kebiasaan | ya | 50 |
| `/tag/Kerja/` | 200 | indexable | self | 23 | #Kerja | ya | 46 |
| `/tag/LLM%20gratis/` | 200 | indexable | self | 28 | #LLM gratis | ya | 51 |
| `/tag/Manus/` | 200 | indexable | self | 23 | #Manus | ya | 46 |
| `/tag/Membaca/` | 200 | indexable | self | 25 | #Membaca | ya | 48 |
| `/tag/Model%20AI/` | 200 | indexable | self | 26 | #Model AI | ya | 49 |
| `/tag/Pagi/` | 200 | indexable | self | 22 | #Pagi | ya | 45 |
| `/tag/Produktivitas/` | 200 | indexable | self | 31 | #Produktivitas | ya | 54 |
| `/tag/RSS/` | 200 | indexable | self | 21 | #RSS | ya | 44 |
| `/tag/Rutinitas/` | 200 | indexable | self | 27 | #Rutinitas | ya | 50 |
| `/tag/Teknologi/` | 200 | indexable | self | 27 | #Teknologi | ya | 50 |
| `/tag/Tips/` | 200 | indexable | self | 22 | #Tips | ya | 45 |
| `/tag/Tren/` | 200 | indexable | self | 22 | #Tren | ya | 45 |
| `/tag/XDIRGA/` | 200 | indexable | self | 24 | #XDIRGA | ya | 47 |
| `/tentang/` | 200 | indexable | self | 21 | Tentang XDIRGA BLOG | ya | 102 |
**URL di luar sitemap yang ditemukan lewat internal link:** `/rss.xml` (200, `application/xml` — benar tidak di sitemap) dan `/search/` (200, indexable — lihat F-02).

## E. Structured Data Inventory

Semua JSON-LD valid (parse JSON berhasil di 61/61 halaman) dan memakai `@context: https://schema.org`.

| Tipe halaman | Schema ditemukan | Catatan |
|---|---|---|
| Homepage | Organization, WebSite | Lengkap; WebSite tanpa `potentialAction` SearchAction (wajar, pencarian internal tidak memakai schema) |
| Artikel (13) | Organization, BlogPosting, BreadcrumbList | BlogPosting lengkap kecuali `dateModified` (F-05); author Person "Marko" dengan url `/author/xdirga/`; publisher Organization "XDIRGA BLOG"; `inLanguage: id-ID`; `mainEntityOfPage` = URL artikel; headline sesuai judul |
| Kategori (6 + 1 paginasi) | Organization, CollectionPage | Lengkap |
| Tag (26 + 2 paginasi) | Organization, CollectionPage | Lengkap |
| Author (5) | Organization, Person | Person "Marko" |
| Tentang, Kontak, Privasi, Syarat, Sitemap HTML, indeks kategori/tag | Organization | Wajar untuk halaman statis |

Tidak ada klaim Rich Results: JSON-LD yang valid bukan jaminan tampilnya rich result Google; kelayakan fitur ditentukan Google secara terpisah.

**Pemeriksaan Organization:** nama "XDIRGA BLOG", url `https://xdirga.xyz`. Tidak ada logo di Organization (properti `logo` tidak ditemukan) — tambahan opsional untuk kelengkapan.

## F. Prioritas Perbaikan

**P0 — Kritis (menghalangi crawling/indexing):** tidak ada.

**P1 — Penting untuk kualitas SEO:**
- F-01 — H1 homepage hilang.
- F-02 — /search/ indexable.
- F-03 — 3 judul artikel 85–90 karakter.
- F-04 — og:image generik di 48 halaman.

**P2 — Peningkatan kualitas dan optimasi:**
- F-05 — dateModified tidak ada.
- F-06 — description duplikat di paginasi.
- F-07 — description sangat pendek (legal + indeks tag).
- F-08 — sitemap tanpa lastmod.
- F-09 — /tag/ orphan.
- F-10 — breadcrumb tidak visible.

**P3 — Penyempurnaan opsional:**
- F-11 — rel prev/next (tidak perlu diperbaiki).
- F-12 — DNS www tidak ada.
- F-13 — kebijakan blokir AI crawler (sadar akan trade-off).
- F-14 — title homepage tanpa kata kunci.
- F-15 — paginasi di sitemap (biarkan).

## G. Rekomendasi Implementasi

Daftar perubahan yang disarankan, **belum diimplementasikan** (audit read-only):

1. Tambah H1 di hero homepage (F-01, P1).
2. Tambah meta robots `noindex` pada `/search/` (F-02, P1).
3. Perpendek 3 judul artikel (F-03, P1).
4. Sediakan og:image per template, minimal gambar default situs yang netral untuk halaman non-artikel (F-04, P1).
5. Tambah `updatedAt` di frontmatter dan emit `dateModified` + `article:modified_time` (F-05, P2).
6. Tambah penanda "(Halaman N)" pada description paginasi (F-06, P2).
7. Tulis ulang description `/syarat/`, `/privasi/`, `/tag/` (F-07, P2).
8. Isi `lastmod` di sitemap dari tanggal artikel (F-08, P2).
9. Tautkan `/tag/` dari footer atau keluarkan dari sitemap (F-09, P2).
10. Tampilkan breadcrumb visible di artikel (F-10, P2).
11. Opsional: tambah CNAME www + redirect ke apex (F-12, P3); tambah `logo` ke Organization JSON-LD (P3).

## H. Kesimpulan

**WARNING.** Tidak ditemukan masalah kritis yang menghalangi crawling atau indexing, dan fondasi SEO teknis situs ini kuat: sitemap dan robots sehat, canonical konsisten, nol broken link, JSON-LD valid, gambar teroptimasi dengan baik, dan redirect legacy bekerja. Namun ada 4 temuan Medium (P1) yang sebaiknya diperbaiki sebelum pekerjaan optimasi dimulai: H1 homepage yang hilang, halaman pencarian internal yang dapat diindeks, tiga judul artikel yang terpotong di SERP, dan og:image generik di 48 halaman. Area Performance berstatus **NOT TESTED** untuk skor lab karena PageSpeed API mengembalikan 429 pada saat audit; indikator statis (ukuran HTML, aset, kompresi, cache) terlihat baik, dan skor PageSpeed 98/100/100/100 dari 14 Nov 10:38 WIB tidak bisa dipakai sebagai bukti kondisi sekarang karena diambil sebelum Mega Menu dan perbaikan redirect. Google Search Console juga **NOT TESTED** (tidak ada akses di environment ini).
