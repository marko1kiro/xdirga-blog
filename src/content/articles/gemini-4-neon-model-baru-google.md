---
title: "Gemini 4 Neon Rilis, Model Baru di Tengah Keluarga Gemini 4"
description: "Gemini 4 Neon resmi rilis, model keempat keluarga Gemini 4 di antara Carbon dan Hydrogen. Cek harga API, skor benchmark, dan siapa yang bisa pakainya."
category: berita
tags: ["gemini", "google", "ai", "gemini-4-neon"]
author: xdirga
publishedAt: 2026-11-19T17:11:00+07:00
status: published
featured: true
trending: true
cover: /covers/gemini-4-neon-model-baru-google.jpg
coverAlt: "Ilustrasi abstrak magenta dan cyan tanpa karakter, laptop dan diagram model AI di atas meja kerja"
---

Lo buka aplikasi Gemini dan pemilih modelnya kelihatan beda. Argon sudah tidak ada di tempatnya. Yang muncul di bawah judul Deeper analysis sekarang namanya Neon.

Google resmi mengumumkan Gemini 4 Neon pada 18 November 2026 lewat blog resminya. Ini model keempat di keluarga Gemini 4, dan posisinya sengaja ditaruh di tengah tengah, di antara Carbon yang paling berat dan Hydrogen yang paling cepat. Buat lo yang sudah pakai [Gemini gratis](/artikel/gemini-gratis-2026-flash-lite/), kabar ini nyambung langsung, karena Neon yang menentukan seperti apa pemilih model lo ke depannya.

## Neon duduk di tengah keluarga Gemini 4

Google sendiri menjelaskan pembagian tugasnya dengan sederhana. Carbon mengerjakan proyek jangka panjang yang paling sulit. Hydrogen menangani eksekusi harian yang cepat. Neon menyeimbangkan kedalaman dan efisiensi, dan Google mengarahkannya buat coding yang kompleks, penalaran analitis, dan alur kerja enterprise kelas produksi.

| Model | Peran di keluarga Gemini 4 | Harga API |
| --- | --- | --- |
| Carbon | Proyek jangka panjang tersulit | Tidak disebut di pengumuman Neon |
| Neon | Menyeimbangkan kedalaman dan efisiensi, coding kompleks dan kerja enterprise | $3 per 1 juta token input, $15 per 1 juta token output |
| Hydrogen | Eksekusi harian yang cepat | Tidak disebut di pengumuman Neon |

Yang belum kelihatan dari tabel itu adalah harga. Google mengumumkan harga Neon secara resmi, dan itu yang bikin perbandingan ini gampang dihitung. Carbon dan Hydrogen tidak disebut harganya di pengumuman Neon, jadi tabel di atas memang cuma memuat harga Neon.

## Satu tugas coding, hitungannya segini

Harga API Neon adalah 3 dolar per 1 juta token input dan 15 dolar per 1 juta token output, dengan token input yang sudah tersimpan di cache cuma 0,15 dolar per 1 juta token. Context windownya 1 juta token. Angka itu saja belum ngasih gambaran, jadi ini contoh hitungan penulis buat satu tugas coding.

```
200.000 token input × $3 per 1 juta token = $0,60
50.000 token output × $15 per 1 juta token = $0,75
Total per tugas = $1,35
```

Kalau sebagian besar input lo sudah tersimpan di cache, hitungannya berubah drastis. Input yang sama tinggal 0,03 dolar, dan total per tugas turun jadi 0,78 dolar. Neon juga punya empat level berpikir yang bisa lo atur sesuai beban kerja, dan menurut Google, pada level berpikir default high, biaya per tugas Neon 32 persen lebih rendah dari Carbon.

## Skor benchmarknya, baca dengan satu catatan

Di atas kertas, angka Neon kelihatan kuat. Menurut Google, Neon meraih skor 61 di Artificial Analysis Intelligence Index pada level berpikir xhigh, peringkat 3 keseluruhan, di depan Claude Opus 5.5 dan [GPT-6.2 Sol](/artikel/gpt-6-2-astra-sol-openai/) yang menurut tabel Google masing masing meraih 59 dan 57.

Di sisi coding, klaim Google lebih berani lagi. Neon diklaim peringkat 1 keseluruhan di Artificial Analysis Coding Agent Index dengan skor 58,6, plus 65,2 persen di Terminal-Bench 4.1 dan 46,2 persen di FrontierCode 2.0 pada setelan default high. Google juga mengklaim Neon peringkat 2 di Vals Index dan peringkat 2 di Agent Arena Index, termasuk peringkat 2 untuk steerability, alias seberapa rapi model mengikuti koreksi lo di tengah tugas.

Catatannya begini. Semua angka di atas adalah klaim Google dan evaluator yang dikutip Google, bukan hasil tes independen. Digital Trends sendiri mengingatkan bahwa itu benchmark milik Google, jadi tes independen bisa saja keluar beda. Sampai ada pengujian dari pihak ketiga, angka ini paling aman lo baca sebagai janji, bukan bukti.

## Lo bisa pakainya lewat mana

Sejak 18 November 2026, Neon tersedia di Gemini API lewat Google AI Studio, di Gemini for business lewat API dan model dropdown, di Google Antigravity buat pelanggan berbayar AI Pro dan Ultra, dan di aplikasi Gemini buat pelanggan Pro dan Ultra. Jadi aksesnya lewat jalur berbayar dan langganan Pro atau Ultra, bukan lewat akun gratis.

Ada satu varian lagi yang jalurnya beda. Gemini 4 Neon for cyber diluncurkan ke para defender tepercaya dalam beberapa hari ke depan sebagai bagian dari Fairwind Program. Itu ditujukan buat tim keamanan yang sudah dipercaya Google, dan pengguna umum belum kebagian jalur ini.

Neon paling masuk akal buat lo kalau kerjaan lo memang ada di tengah tengah, coding yang cukup berat tapi tidak sampai butuh proyek jangka panjang, dan lo sudah bayar API atau langganan Pro atau Ultra. Kalau lo masih di akun gratis, Neon belum mengubah apa apa buat lo hari ini, karena jalurnya memang lewat API berbayar dan langganan. Kalau lo masih menimbang antara model model besar, [perbandingan ChatGPT lawan Gemini lawan Claude](/artikel/chatgpt-vs-gemini-vs-claude-gratis/) di blog ini bisa jadi titik awal sebelum lo memutuskan.

Dan kalau lo sudah penasaran, jangan langsung pindah semua proyek lo ke Neon. Coba satu tugas kecil dulu, hitung biayanya pakai hitungan di atas, lalu bandingkan hasilnya dengan model yang biasa lo pakai. Klaim benchmark boleh ramai, tapi yang menentukan tetap hasil di tangan lo sendiri.

## Sumber

- [Google, Introducing Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)
- [Digital Trends, Google says Gemini 4 Neon can hang with Claude Opus 5.5 and GPT-6.2 Sol for less](https://www.digitaltrends.com/computing/google-says-gemini-4-neon-can-hang-with-claude-opus-5-5-and-gpt-6-2-sol-for-less/)
