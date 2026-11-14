---
title: "Cloudflare Buka Kode Kitesurf, Browser Buat Agen AI"
description: "Cloudflare membuka kode Kitesurf, browser ringan buat agen AI yang jalan di Workers tanpa Chromium. Lo bisa menjalankannya sendiri di bawah lisensi Apache 2.0."
category: berita
tags: ["Kitesurf", "Cloudflare", "Berita"]
author: xdirga
publishedAt: 2026-11-15T01:00:00+07:00
lastVerifiedAt: 2026-11-15
status: published
featured: false
trending: true
cover: /covers/cloudflare-kitesurf-open-source.jpg
coverAlt: "Ilustrasi jendela browser abstrak dan sirkuit di atas meja kerja tanpa orang, warna magenta dan cyan"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Bayangin lo punya agen AI yang tugasnya menjelajah web sendiri. Dia buka halaman, baca isinya, klik sana sini, lalu balik bawa jawaban. Masalahnya, tiap agen yang jalan butuh satu browser penuh di belakangnya. Chromium itu berat, makan CPU dan memori, dan kalau lo jalanin puluhan agen sekaligus, tagihannya ikut membengkak.

Cloudflare punya jawaban buat masalah itu, dan jawabannya sekarang terbuka buat semua orang. Pada 13 November 2026, Cloudflare resmi membuka kode Kitesurf, browser yang dirancang khusus buat agen AI. Lo bisa baca kodenya, jalanin di laptop sendiri, bahkan deploy ke akun Cloudflare lo.

## Apa itu Kitesurf

Kitesurf itu browser engine, bukan browser yang lo buka tiap hari. Dia tidak punya jendela dan tombol yang bisa lo klik. Tugasnya satu, jadi mesin di balik layar yang memuat halaman web buat agen AI.

Bedanya dengan Chromium, Kitesurf jalan sepenuhnya di atas Cloudflare Workers. Dia mengurai HTML, menerapkan CSS, menjalankan JavaScript halaman, dan membuat screenshot tanpa container browser sama sekali. Dia juga bicara lewat Chrome DevTools Protocol, disingkat CDP, jadi perkakas otomasi yang sudah ada seperti Puppeteer bisa langsung terhubung.

Cloudflare bilang tujuan mereka jelas, memberi agen AI browser yang ringan dan efisien, yang memakai CPU dan memori lebih sedikit dibanding Chromium dan bisa scale sesuai kebutuhan di jaringan Workers global. Catatan penting, itu klaim dan tujuan dari Cloudflare sendiri. Pengumuman ini tidak menyertakan angka benchmark, jadi jangan anggap itu hasil pengukuran independen.

Kitesurf bukan proyek yang muncul tiba tiba. Cloudflare pertama kali memperkenalkannya pada Agustus 2026, lalu ada tindak lanjut pada September 2026 dengan dukungan WebMCP, API baru, dan kompatibilitas yang lebih baik. Sejak awal Cloudflare sudah berjanji bakal membuka kodenya, dan pada 13 November 2026 janji itu ditepati.

## Isi dapur pacunya

Di balik kesederhanaan itu, Kitesurf merakit tumpukan teknologi yang semuanya berbasis Rust dan dikompilasi ke WebAssembly.

Blitz mengurus parsing HTML, DOM, layout, dan painting. Stylo, mesin CSS dari Firefox, mengurus parsing CSS, cascading, dan computed styles. Boa menjalankan JavaScript di dalam WebAssembly, tapi cuma sebagai jalan terakhir kalau JavaScript tidak bisa jalan di Dynamic Workers. Library Linebender mengurus layout teks dan grafis 2D, sementara Krilla menghasilkan output PDF.

Secara struktur, Kitesurf punya tiga bagian utama. Engine mengatur sesi browser dan koneksi klien. PageScript menjalankan halaman beserta JavaScriptnya. PageRenderer menggambar hasilnya. Semua paket, mulai dari Rust core, DOM shims, renderer, sampai Kitesurf CLI, tinggal di folder packages di repo yang sama, jadi lo bisa menelusuri cara semua bagiannya tersambung.

## Nyobain sendiri di laptop lo

Bagian paling seru, lo bisa nyobain Kitesurf sendiri tanpa bayar apa apa. Syaratnya, lo perlu Bazelisk, Node.js 22 atau yang lebih baru, dan pnpm 9.15.4. Setelah itu tiga perintah ini cukup buat mulai.

```
git clone https://github.com/cloudflare/kitesurf.git
cd kitesurf
pnpm install --frozen-lockfile
pnpm run dev
```

Build pertama butuh waktu agak lama karena Rust core dan dependensinya dikompilasi dulu. Setelah itu Wrangler menyalakan server lokal di alamat berikut.

```
http://127.0.0.1:8787
```

Buka alamat itu buat mencoba halaman di Chrome DevTools, atau arahkan AI harness lo ke port CDP lokal dan biarkan agen mengambil alih. Kalau lo sudah biasa pakai Puppeteer, koneksinya juga gampang. Lo cukup mengarahkan Puppeteer ke endpoint WebSocket lokal, lalu halaman bisa dibuka dan di screenshot seperti biasa.

```
import puppeteer from "puppeteer-core";

const browser = await puppeteer.connect({
  browserWSEndpoint: "ws://127.0.0.1:8787/devtools/browser",
});

const page = await browser.newPage();
await page.goto("https://example.com/");
await page.screenshot({ path: "page.png" });
await browser.disconnect();
```

## Kalau mau deploy ke akun sendiri

Jalanin lokal itu gratis, tapi deploy ke akun Cloudflare sendiri ada syaratnya. Lo butuh Workers Paid plan, karena Kitesurf memakai Dynamic Workers buat membuat Worker terisolasi di tiap halaman.

Dan ada satu peringatan yang tidak boleh dilewatkan. Kitesurf tidak punya autentikasi bawaan. Siapa pun yang memegang URL deploy lo bisa membuka DevTools, menghubungkan Puppeteer, dan memakai CPU serta Dynamic Workers dari akun lo. Cloudflare sendiri memperingatkan untuk tidak deploy tanpa autentikasi di depannya, misalnya Cloudflare Access. Jadi sebelum URL itu tersebar, pasang dulu lapis pengamannya.

## Masih eksperimental, jadi jangan berharap Chrome

Terakhir, jaga ekspektasi lo. Kitesurf masih dalam pengembangan aktif dan statusnya eksperimental. Dia menyediakan endpoint CDP, bukan implementasi Chrome yang lengkap, dan beberapa fitur Chrome DevTools belum jalan. Cloudflare bilang fokus mereka sekarang adalah membuat engine ini makin kompatibel, makin andal, dan makin efisien.

Buat lo yang membangun agen AI, ini kabar yang layak dicoba langsung. Clone reponya, jalankan di laptop, dan lihat sendiri apakah browser tanpa Chromium ini cukup buat kebutuhan lo. Kalau lo belum terlalu paham apa itu agen AI dan kenapa mereka butuh browser sendiri, mulai dari artikel [Apa Itu Agen AI dan Cara Kerjanya](/artikel/apa-itu-agen-ai/) di blog ini. Dan kalau lo penasaran perkakas coding AI apa saja yang gratis dipakai bareng agen seperti ini, ada [AI Coding Gratis Buat Pemula, Copilot vs Cursor vs Codex](/artikel/ai-coding-gratis-copilot-cursor-codex/).

Sumber tulisan ini [pengumuman resmi Cloudflare](https://blog.cloudflare.com/kitesurf-open-source/) dan [repo Kitesurf di GitHub](https://github.com/cloudflare/kitesurf).
