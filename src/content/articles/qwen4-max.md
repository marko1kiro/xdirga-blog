---
title: "Qwen4-Max Rilis dan Alibaba Klaim Biaya Tugas Turun 62%"
seoTitle: "Qwen4-Max Rilis, Biaya Tugas Turun 62%"
description: "Alibaba merilis Qwen4-Max sebagai model flagship keluarga Qwen4 dengan klaim biaya tugas turun 62 persen menurut benchmark miliknya sendiri."
category: berita
tags: ["Qwen", "Qwen4-Max", "Alibaba", "AI", "Model AI", "Berita AI"]
author: xdirga
publishedAt: 2026-11-16T21:05:00+07:00
status: published
featured: false
trending: false
cover: /covers/qwen4-max.jpg
coverAlt: "Ilustrasi abstrak sebuah model AI besar dengan jaringan parameter dan jendela konteks yang luas"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Alibaba baru saja merilis model AI flagship terbarunya. Namanya Qwen4-Max, model pertama dari keluarga Qwen4, dan pengumumannya terbit di blog resmi Qwen pada 16 November 2026.

Yang bikin rilis ini ramai dibicarakan adalah satu angka. Qwen mengklaim rata-rata biaya per tugas turun 62 persen dibanding pendahulunya. Angka itu kedengeran besar, dan memang besar, tapi lo perlu tahu dulu angka itu datang dari mana sebelum ikut heboh.

## Model Flagship Pertama Keluarga Qwen4

Qwen4-Max dibangun di atas arsitektur baru seri Qwen4. Backbone model ini 2,4 triliun parameter, dengan sekitar 71 miliar parameter yang aktif per token, plus 328 miliar parameter N-gram Embedding tambahan.

Buat gambaran, pendahulunya Qwen3.8-Max mengaktifkan sekitar 95 miliar parameter per token. Jadi Qwen4-Max mengaktifkan lebih sedikit parameter per token, tapi tetap diklaim lebih kuat di tugas kerja sehari-hari.

Model ini juga punya kemampuan vision native, alias bisa memahami gambar secara langsung tanpa modul tambahan, dan context window 1 juta token. Konteks sebesar itu artinya lo bisa memasukkan dokumen yang sangat panjang, misalnya ratusan halaman, dalam satu percakapan.

Soal output, dokumentasi resmi QwenCloud mencatat maksimum output 131.072 token untuk mode tanpa penalaran, dan maksimum penalaran ditambah jawaban akhir 262.144 token. Model ID-nya adalah qwen4-max.

## Klaim 62 Persen Itu Datang dari Benchmark Milik Qwen Sendiri

Ini bagian yang paling penting buat lo pahami. Angka 62 persen itu berasal dari Work360, evaluasi milik Qwen sendiri. Di evaluasi itu, rata-rata biaya per tugas turun dari 4,43 dolar Amerika untuk Qwen3.8-Max menjadi 1,67 dolar Amerika untuk Qwen4-Max.

Skor Work360 sendiri naik dari 47,74 menjadi 52,69. Work360 adalah benchmark dengan taksonomi 26 domain tingkat satu, 182 subdomain tingkat dua, dan 721 bidang tingkat tiga, semuanya dirancang oleh tim Qwen.

Jadi angka ini bukan hasil pengujian independen. Analis Greyhound Research yang dikutip InfoWorld mengingatkan perusahaan sebaiknya memperlakukan angka ini sebagai benchmark vendor, bukan jaminan pengurangan belanja AI mereka sendiri. Pesan yang sama berlaku buat lo. Klaim ini menarik, tapi buktinya masih menunggu pengujian pihak ketiga.

Turunnya biaya tugas itu dikaitkan dengan dua hal, pemakaian token yang lebih rendah dan harga API yang ikut turun. Harga API Qwen4-Max adalah 1,50 dolar Amerika per 1 juta token input dan 4,50 dolar Amerika per 1 juta token output, turun dari 2 dolar dan 6 dolar pada Qwen3.8-Max.

## Cara Mencoba Qwen4-Max

Qwen4-Max sudah tersedia di QwenCloud, lewat Token Plan atau API. Lo juga bisa memakainya di QwenWork, Qoder, dan Qwen Studio di chat.qwen.ai. Kalau lo masih bingung milih model buat kerjaan sehari-hari, baca dulu [panduan memilih model AI gratis](/artikel/memilih-model-ai-gratis/) biar nggak asal comot.

Buat lo yang penasaran tapi belum mau keluar uang, ada kuota gratis terbatas. Panggilan bayar sesuai pemakaian di Singapura mendapat 1 juta token gratis, terpisah dari kredit Token Plan. Syarat dan masa berlakunya mengikuti halaman Free quota QwenCloud, jadi cek langsung di sana sebelum lo mengandalkannya.

Satu hal yang jangan sampai ketukar. Qwen4-Max sempat masuk preview Token Plan pada 11 November 2026, tapi itu model preview dengan nama qwen4-max-preview, dan masa preview-nya hanya 11 sampai 25 November 2026 sebelum pensiun. Yang dirilis 16 November ini adalah model qwen4-max yang sudah general availability, bukan preview yang sama.

## Fitur Live Delivery dan Rencana Open Source

Qwen4-Max punya fitur bernama Live Delivery. Cara kerjanya, agen menyerahkan versi pertama yang sudah bisa dipakai lebih awal, lalu memperbaikinya lewat rilis bertahap sambil menyesuaikan rencana berdasarkan hasil eksekusi dan kebutuhan pengguna. Lo bisa mengarahkan di tengah jalan, jadi tidak perlu menunggu sampai semuanya selesai baru bisa melihat hasilnya.

Qwen juga merilis plugin Qwen-Live-Delivery-Plugin sebagai open source. Tapi hati-hati, yang dibuka kodenya adalah plugin itu, bukan model Qwen4-Max itu sendiri. Model Max bukan open source. Yang dijanjikan adalah model Qwen4 yang lebih kecil akan datang sebagai open source, dengan lineage dan generasi teknik pelatihan yang sama.

## Klaim Keamanan yang Ikut Dibawa

Di sisi keamanan, Qwen memfilter data pelatihan siber berdasarkan tujuan tiap tugas. Data untuk tugas defensif seperti verifikasi kerentanan, deteksi, dan remediasi dipertahankan, sementara data untuk tugas ofensif yang bertujuan meningkatkan kemampuan menyerang dihapus.

Hasilnya di Last Secure Code Bench, pass rate fungsi yang lolos uji fungsionalitas sekaligus keamanan naik dari 22,0 persen pada Qwen3.8-Max menjadi 31,8 persen. Kode yang aman di ketiga granularitas sekaligus, fungsi, file, dan repositori, naik dari 8 persen menjadi 14,7 persen, hampir dua kali lipat.

Ini tetap klaim internal Alibaba. Analis di InfoWorld mempertanyakan apakah pengetahuan ofensif dan defensif memang bisa dipisah lewat filter data, dan meminta validasi independen. Jadi anggap saja ini sebagai klaim yang menarik, bukan vonis final.

## Demo Manufaktur yang Turun 95 Persen

Qwen juga memamerkan satu showcase manufaktur di SANF dan Pacific Union. Dalam showcase itu, usaha manual untuk memprogram satu workpiece turun dari sekitar 475 menit menjadi 24 menit, pengurangan sekitar 95 persen.

Angka itu mengesankan, tapi ingat ini satu showcase mitra, bukan bukti umum. Jangan jadikan ini patokan buat semua pekerjaan atau semua industri.

## Yang Perlu Lo Catat

Qwen4-Max adalah rilis yang solid di atas kertas. Arsitekturnya baru, konteksnya 1 juta token, harga API-nya turun, dan ada kuota gratis terbatas buat nyoba. Tapi tiga hal ini jangan sampai lolos dari kepala lo.

Angka 62 persen itu benchmark vendor sendiri, bukan pengujian independen. Modelnya bukan open source, yang di-open-source-kan cuma plugin Live Delivery. Dan demo-demo spektakulernya masih showcase mitra, bukan hasil yang dijamin buat semua pengguna. Kalau lo mau lihat posisi model-model besar lain, [perbandingan ChatGPT, Gemini, dan Claude versi gratisnya](/artikel/chatgpt-vs-gemini-vs-claude-gratis/) bisa jadi pembanding.

Kalau lo mau nyoba, jalur paling gampang adalah Qwen Studio di chat.qwen.ai atau QwenCloud dengan kuota gratis 1 juta token di Singapura. Coba dulu buat tugas kerja lo yang sebenarnya, lalu bandingkan sendiri biayanya dengan model yang biasa lo pakai. Buat pembanding gratis lainnya, [Ling 3.2 Flash juga bisa dicoba gratis lewat OpenRouter](/artikel/ling-3-2-flash-gratis-openrouter/). Itu cara paling jujur buat tahu apakah klaim 62 persen itu terasa juga di tangan lo.

## Sumber

- [Blog resmi Qwen, pengumuman Qwen4-Max, November 2026](https://qwen.ai/blog?id=qwen4-max)
- [InfoWorld, Alibaba touts 62% lower task costs with Qwen4-Max, 16 November 2026](https://www.infoworld.com/article/4248996/alibaba-touts-62-lower-task-costs-with-qwen4-max-adds-cyber-safeguards.html)
- [Digital Trends, Qwen 4 Max, Alibaba latest flagship AI model announced, 16 November 2026](https://www.digitaltrends.com/computing/qwen-4-max-aliababas-latest-flagship-ai-model-announced/)
- [Dokumentasi resmi QwenCloud, model terbaru](https://docs.qwencloud.com/developer-guides/getting-started/latest-model)
