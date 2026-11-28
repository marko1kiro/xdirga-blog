---
title: "Liquid AI Rilis d1.3 Ultra, Model Keputusan yang Menjawab Pakai Probabilitas"
description: "Liquid AI rilis d1.3 Ultra, model keputusan yang menjawab pakai probabilitas dan memuncaki Artificial Analysis Decision Index dengan skor 76.4."
seoTitle: "Liquid AI d1.3 Ultra Puncaki Decision Index Skor 76.4"
category: berita
tags: ["Liquid AI", "d1.3 ultra", "Decision Model", "Artificial Analysis", "AI"]
author: xdirga
publishedAt: 2026-11-28T17:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/liquid-ai-d1-3-ultra-model-keputusan-teratas.jpg
coverAlt: "Diagram abstrak tiga batang probabilitas magenta dan cyan di atas latar teal gelap, ilustrasi model keputusan AI yang menjawab tanpa menulis teks"
---

Kalau ada AI yang tidak nulis teks sama sekali, buat apa. Pertanyaan itu wajar, karena hampir semua model AI yang lo kenal selama ini kerjanya nulis. Lo tanya, dia jawab dengan kalimat. Lo minta ringkasan, dia nulis ringkasan. Tanggal 27 November 2026, Liquid AI merilis d1.3 ultra lewat postingan di X, model keputusan terkuat mereka, hasil pengembangan berulang dari d1 ultra. Model ini tidak menulis apa apa. Dia membaca situasi, lalu menjawab dengan angka probabilitas.

Buat kebanyakan orang, itu kedengeran aneh. Buat apa AI kalau tidak bisa diajak ngobrol. Jawabannya ada di kerjaan back office yang tidak butuh obrolan sama sekali, seperti sortir tiket support, cek struk belanja, atau putusin apakah satu dokumen lolos aturan atau tidak. Di kerjaan kayak gitu, yang lo butuh bukan kalimat yang enak dibaca, tapi keputusan yang bisa diukur dan diaudit.

## Bayangin Inbox Support yang Baca Sendiri

Cara kerja decision model beda jauh dari chatbot biasa. Chatbot nulis jawaban token demi token, satu kata nyusul kata berikutnya sampai kalimatnya selesai. Decision model tidak nulis sama sekali. Dia menilai satu situasi, lalu mengembalikan probabilitas yang sudah dikalibrasi buat tiap opsi, semuanya dalam satu panggilan. Dokumentasi Liquid menjelaskannya begini. Model ini membaca masukan seperti email support, invoice, atau foto, bersama daftar pertanyaan, lalu menjawab tiap pertanyaan dengan probabilitas buat setiap opsi, dalam sekali jalan, tanpa menulis teks apa pun.

Misalnya inbox support lo kebanjiran email pelanggan. Lo kasih model itu satu email dan tiga opsi, refund, tukar barang, atau bukan komplain. Model bisa menjawab refund 82 persen, tukar barang 12 persen, dan bukan komplain 6 persen. Angka itu cuma ilustrasi cara kerjanya, bukan hasil tes beneran. Yang penting polanya. Lo dapat jawaban yang bisa langsung dipakai sistem buat nerusin tiket ke jalur yang benar, plus angka keyakinan buat mutusin kapan jawaban itu cukup kuat buat jalan otomatis dan kapan harus dilempar ke manusia.

## Skor 76.4 dan Dua Cerita yang Berbeda

Model yang tidak nulis teks ini ternyata memuncaki indeks yang dibuat khusus buat kategori ini. Artificial Analysis memberi d1.3 ultra skor 76.4 di Decision Index v2.1, peringkat pertama dari 27 decision model yang dilacak. Yang bikin skor ini menarik, Artificial Analysis menjalankan sendiri semua pengujiannya, jadi skor ini pengukuran independen, bukan klaim Liquid sendiri. Tapi di sinilah ceritanya bercabang. Ada dua pembacaan skor yang beredar dan keduanya layak lo tahu.

Pembacaan pertama, dari Sulat yang mengutip Tproger dan alfw.ai, menempatkan d1.3 ultra di 76.4 dan Bison 31B di 75.9 pada skor yang tidak dibulatkan, unggul setengah poin. Pembacaan kedua datang dari Crypto Briefing dan liputan sindikasi, yang menyebut keduanya seri di 76.4. Dua pembacaan ini tidak bisa didamaikan dengan pembulatan, karena 75.9 kalau dibulatkan jadi 76, bukan 76.4, begitu kata alfw.ai. Artikel ini tidak memilih salah satu sebagai final. Yang tidak diperselisihkan, d1.3 ultra ada di puncak indeks dengan skor 76.4, dan naik 1,6 poin dari d1.2 ultra yang ada di 74.8.

Pembandingnya, Bison 31B, juga bukan model sembarangan. Model ini datang dari Base Labs, lengan riset Baseten, dan dirilis 20 November 2026. Bison 31B adalah model open weight yang dilatih lanjut dari Gemma 4 31B milik Google, dengan bobot di Hugging Face di bawah lisensi MIT dan Apache 2.0, jendela konteks 131.072 token, dan harga US$0.10 per juta token input. Jadi puncak indeks ini diperebutkan dua model yang [baru berumur hitungan hari](/artikel/gemini-4-neon-model-baru-google/).

## Tiga Hal Baru yang Dibawa d1.3 Ultra

Liquid menyematkan tiga kemampuan baru di d1.3 ultra. Ada rankings. Model sekarang bisa mengurutkan sekumpulan opsi atau mengembalikan top k, bukan cuma menyetujui atau menolak satu opsi. Ekstraksinya juga lebih luas. Kemampuan membaca angka dan tanggal dari gambar dan audio yang diperkenalkan di d1.2 sekarang makin luas, misalnya total struk dari foto atau tanggal yang diucapkan di klip audio. Terakhir ada spans audio, model bisa mengembalikan waktu mulai dan selesai saat sesuatu diucapkan dalam klip audio. Tiga kemampuan ini nyambung sama cara kerja decision model tadi. Semuanya soal menilai dan menunjuk, bukan soal menulis.

## Murah per Tugas, Lambat Sedikit per Jawaban

Soal harga, ada dua angka yang jangan sampai lo campur. Harga tokennya, d1.3 ultra tersedia lewat konsol dan API Liquid seharga US$0.042 per juta token input. [Harga per tugasnya](/artikel/gpt-6-2-astra-sol-openai/) beda cerita. Artificial Analysis mengukur biaya menjalankan indeksnya, dan d1.3 ultra kena US$133 per juta tugas, sementara Bison 31B kena US$345. Bison memang menjawab 37 ms lebih cepat per tugas, tapi biayanya sekitar 2,6 kali lipat. Penghematan sekitar 60 persen yang diklaim Liquid itu dihitungnya per tugas, bukan per token.

|  | d1.3-ultra | Bison 31B | d1.2-ultra |
| --- | --- | --- | --- |
| Skor Decision Index v2.1 | 76.4 | 76.4 (75.9 tanpa pembulatan) | 74.8 |
| Biaya per juta tugas | US$133 | US$345 | Tidak disebut di sumber |
| Waktu per tugas | 191 ms | 154 ms | Tidak disebut di sumber |
| Harga per juta token input | US$0.042 | US$0.10 | Tidak disebut di sumber |

Kolom d1.2 ultra di baris biaya dan waktu sengaja dikosongkan, karena sumber yang dicek di sesi riset ini tidak menyebutkannya.

## Yang Masih Klaim, Bukan Bukti

Di luar skor independen tadi, ada juga angka dari Liquid sendiri yang wajib lo baca dengan kacamata kritis. Liquid mengklaim d1.3 ultra membaik di lebih dari 100 benchmark internal, mulai dari mengikuti kebijakan, panduan, dan kontrak, sampai menangani pertanyaan sulit, menolak saat tidak yakin, dan menghadapi masukan yang lebih berantakan. Masalahnya, postingan Liquid tidak memberi angka apa pun buat klaim itu, dan tidak ada angka kalibrasi yang dipublikasikan. Sampai ada pengujian independen, anggap saja ini klaim vendor, bukan hasil teruji.

Data latihnya juga disebut berubah. Menurut Liquid, data latih d1.3 ultra sekarang mencakup dokumen hasil pindaian asli, struk, tabel, laporan panjang, tanggal dalam format lokal, lebih banyak bahasa, dan instruksi yang ditanam di dalam masukan. Instruksi yang ditanam itu kabarnya harus diperlakukan model sebagai data, bukan sebagai perintah. Tapi klaim yang terakhir ini belum punya tes yang dipublikasikan di baliknya, jadi jangan dulu lo tulis sebagai kemampuan yang sudah terbukti.

## Rilisnya Cepat, Dokumennya Ketinggalan

Tempo rilis Liquid di lini ini kencang banget. Model d1 keluar 5 Oktober, d1 ultra menyusul 15 Oktober, d1.2 pada 16 November, dan d1.3 ultra pada 27 November, cuma 11 hari setelah d1.2. Modelnya sudah live di konsol dan API Liquid, sementara OpenRouter dan Vercel masih berstatus segera menurut Liquid, tanpa tanggal. Satu hal yang perlu lo tahu, d1.3 ultra bukan model open weight. Model open weight Liquid yang bisa lo jalankan di hardware sendiri cuma d1 2B, d1 omni 2B, dan d1 omni 600M, semuanya model kecil. Jendela konteks 64 ribu token yang beredar buat d1.3 ultra pun datangnya dari listing Artificial Analysis, bukan dokumen Liquid.

Yang paling jujur dari rilis ini justru ada di catatan kakinya. Sampai 28 November 2026, dokumentasi Liquid masih mencantumkan d1.2 ultra sebagai model keputusan paling mumpuni, dan belum ada entri d1.3 ultra di sana. Model ID dan batas resmi d1.3 ultra juga belum tercantum di halaman yang dicek. Jadi kalau lo mau coba, jalurnya baru lewat konsol dan API Liquid, dan jangan heran kalau dokumentasinya belum bisa jawab semua pertanyaan lo.

## Jadi Kapan Lo Pakai Model Keputusan, Kapan Lo Pakai Chatbot

Nah, [kapan model kayak gini lebih masuk akal](/artikel/memilih-model-ai-gratis/) daripada chatbot. Kalau kerjaan lo punya daftar opsi yang sudah jelas, volumenya besar, dan tiap keputusan harus bisa lo lacak angka keyakinannya, decision model jawabannya. Sortir ribuan tiket support, baca total dari ribuan foto struk, atau mutusin ribuan dokumen lolos aturan atau tidak, itu kerjaan yang tidak butuh kalimat balasan. Tapi kalau lo butuh penjelasan, draf tulisan, atau percakapan yang mengalir, chatbot tetap tempatnya. Model keputusan tidak nulis, dan itu memang fungsinya.

Buat sekarang, rilis ini paling relevan buat lo yang bangun sistem back office dan sudah capek dengan jawaban chatbot yang panjang tapi susah diukur. Coba lewat konsol atau API Liquid, dan catat tanggalnya, karena dokumentasi resminya belum mengejar rilis ini. Kalau OpenRouter dan Vercel sudah kebagian, di situlah model ini baru benar benar gampang dicoba banyak orang.

## Sumber

- Sulat, Liquid AI Decision Model Ultra, 28 November 2026, https://news.sulat.com/2026/11/28/liquid-ai-decision-model-ultra/
- Crypto Briefing, Liquid AI d1.3 Ultra Ties Bison 31B, https://cryptobriefing.com/liquid-ai-d1-3-ultra-ties-bison-31b/
- BenchLM, Artificial Analysis Decision Index, https://benchlm.ai/benchmarks/artificial-analysis-decision-index
- Liquid AI, Decision Models, dokumentasi resmi, https://docs.liquid.ai/lfm/models/decision-models
