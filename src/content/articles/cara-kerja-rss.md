---
title: "Cara Kerja RSS dan Kenapa Masih Berguna"
description: "RSS sudah berumur puluhan tahun, tapi masih jadi cara paling tenang buat mengikuti tulisan baru tanpa algoritma."
category: teknologi
tags: ["RSS", "Teknologi", "Membaca"]
author: xdirga
publishedAt: 2026-11-13
updatedAt: 2026-11-15
status: published
featured: false
trending: false
cover: /covers/cara-kerja-rss.jpg
coverAlt: "Ilustrasi gelombang RSS mengalir ke tumpukan kartu artikel dan secangkir kopi"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

RSS sering dicap teknologi jadul. Padahal cara kerjanya sederhana, dan sampai sekarang masih jalan. Kalau lo udah capek sama linimasa yang diatur algoritma, RSS itu jalan keluarnya.

## RSS itu apa

RSS itu berkas sederhana yang isinya daftar tulisan terbaru dari satu situs. Situs yang mendukung RSS nyediain alamat khusus, biasanya diakhiri rss.xml. Di dalam berkas itu ada judul, tautan, dan ringkasan tiap tulisan, dalam format yang bisa dibaca mesin.

Pembaca RSS ngambil berkas itu secara berkala, terus nampilin tulisan baru di satu tempat. Lo nggak perlu buka tiap situs satu satu. Semua tulisan baru dari situs yang lo ikuti muncul dalam satu daftar, urut berdasarkan waktu.

## Contoh isi berkas RSS

Satu item di dalam berkas RSS bentuknya kira kira seperti ini.

```xml
<item>
  <title>Manus Gratis, 300 Kredit Setiap Hari</title>
  <link>https://xdirga.xyz/artikel/manus-free-300-kredit-sehari/</link>
  <description>Coba agen AI Manus tanpa kartu kredit.</description>
  <pubDate>Wed, 12 Nov 2026 00:00:00 GMT</pubDate>
</item>
```

Nggak ada iklan, nggak ada pelacak, nggak ada algoritma yang milihin. Yang ada cuma daftar tulisan, urut dari yang terbaru. Item contoh di atas diambil dari [tulisan soal Manus di blog ini](/artikel/manus-free-300-kredit-sehari/).

## Kenapa masih berguna

Kenapa masih layak dipakai? Ada tiga alasan, dan ketiganya soal kendali.

Yang pertama, lo yang memilih. Nggak ada algoritma yang nyembunyiin tulisan atau ndorong yang lagi viral. Yang muncul cuma dari situs yang lo ikuti sendiri.

Yang kedua, tenang. Nggak ada notifikasi yang rebutan narik perhatian. Lo buka pembaca RSS pas lo mau baca, bukan pas aplikasi manggil.

Yang ketiga, awet. Situs boleh ganti desain, ganti platform, atau ganti pemilik. Selama alamat RSS-nya tetap, langganan lo tetap jalan.

## Cara mulai

Tinggal pilih satu aplikasi pembaca RSS, terus tambahin alamat RSS dari situs yang lo suka. Blog ini punya umpan di `/rss.xml`. Tambahin, dan tulisan baru bakal muncul sendiri tanpa perlu diingat. Tulisan baru itu termasuk [kabar model gratis terbaru](/artikel/ling-3-2-flash-gratis-openrouter/), seperti Ling 3.2 Flash yang bisa dipakai gratis di OpenRouter sejak 13 November 2026.

Teknologi yang tenang kayak RSS jarang jadi berita. Justru itu kekuatannya. Dia kerja diam diam, tanpa minta perhatian, dan tetap jalan tahun demi tahun.
