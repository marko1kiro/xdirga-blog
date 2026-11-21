---
title: "Inkling 2 Mini, Model AI Gratis yang Jalan di Laptop Lo"
description: "Thinking Machines Lab merilis Inkling 2 Mini, model AI bobot terbuka gratis yang muter layer tengahnya tiga kali per token dan muat jalan offline di laptop."
category: berita
tags: ["Inkling 2 Mini", "Thinking Machines", "Model AI Gratis", "AI Lokal", "Ollama"]
author: xdirga
publishedAt: 2026-11-21T17:15:00+07:00
status: published
featured: false
trending: false
cover: /covers/thinking-machines-inkling-2-mini-model-ai-gratis-jalan-di-laptop.jpg
coverAlt: "Ilustrasi laptop terbuka di atas meja dengan pola layer bertumpuk dan garis cahaya magenta cyan di sekelilingnya"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Di dalam pesawat, tanpa internet, seorang peneliti Thinking Machines Lab membuka laptopnya dan minta model AI bikin simulator penerbangan yang bisa dimainkan. Beberapa menit kemudian simulator itu jadi dan jalan. Cerita ini bukan iklan, ini cara Thinking Machines Lab membuka pengumuman resminya pada 20 November 2026. Model yang dipakai namanya Inkling 2 Mini, dan laptop yang dipakai adalah MacBook Pro M5 Pro dengan RAM 48 GB dalam mode pesawat.

Buat lo yang selama ini nganggep model AI pintar itu pasti tinggal di server raksasa, kabar ini menarik karena arahnya kebalik. Inkling 2 Mini memang bukan model paling pintar di dunia, tapi dia dirancang supaya muat di perangkat yang lo punya. Bobotnya terbuka, lisensinya Apache 2.0, dan footprint memorinya sekitar 20 GB. Artinya lo bisa unduh, jalanin, dan oprek sendiri tanpa langganan dan tanpa kirim data ke server orang lain.

## Triknya ada di layer yang muter tiga kali

Model AI biasa bekerja seperti lorong lurus. Satu token masuk, dia lewat semua layer satu kali, lalu keluar jadi jawaban. Inkling 2 Mini beda. Dia punya 24 layer yang dibagi jadi empat blok berisi enam layer. Dua blok tengahnya dijalankan tiga kali untuk setiap token, sementara blok pertama dan terakhir cuma sekali. Totalnya ada 48 kunjungan layer per token, padahal layer yang tersimpan tetap 24.

Kenapa muter di tengah, bukan di awal atau di akhir. Penjelasan Thinking Machines Lab cukup masuk akal. Layer tengah dianggap tempat penalaran abstrak terjadi, sementara layer awal dan akhir lebih sibuk menerjemahkan antara teks dan representasi internal. Di eksperimen mereka, muter 12 layer tengah memberi hasil lebih bagus daripada muter 12 layer akhir di 27 dari 28 evaluasi yang mereka jalankan.

Efek praktisnya, model ini bisa mikir lebih lama di dalam kepalanya sendiri sebelum nulis jawaban. Rantai penalarannya jadi lebih pendek, tapi tetap bisa dibaca manusia. Di satu contoh soal hitung hari yang mereka tampilkan, penalaran di lima pass cuma 240 token dibanding 582 token di satu pass, dan jawabannya tetap sama. Buat coding agent, ini yang bikin dia kuat. Dia tidak perlu nulis semua langkahnya di luar supaya bisa sampai ke jawaban yang benar.

## Speknya segini, dan satu angka yang bikin ribut

Angka di bawah ini diambil dari pengumuman resmi Thinking Machines Lab dan model card resminya di Hugging Face. Semua angka benchmark di artikel ini adalah klaim vendor, bukan hasil uji independen, dan lo akan nemu label itu di tiap angka skor.

| Spek | Inkling 2 Mini |
| --- | --- |
| Parameter total | 26,4 miliar |
| Parameter aktif per token | 3,4 miliar |
| Aktivasi bobot per token, sudah termasuk loop | 5,4 miliar |
| Layer | 24 layer, 12 layer tengah diulang 3 kali |
| Footprint memori | Sekitar 20 GB |
| Presisi | NVFP4, empat layer terakhir MXFP8 |
| Context window | Sampai 1 juta token |
| Input | Teks dan gambar, output teks |
| Lisensi | Apache 2.0 |
| Rilis | 20 November 2026 |

Ada satu angka yang wajib lo tahu konfliknya. Artificial Analysis nulis bobot unik per tokennya 3,1 miliar, sementara Thinking Machines Lab nulis 3,4 miliar. Angka 5,4 miliar disepakati kedua sumber sebagai hitungan yang sudah termasuk tiga pass loop, tapi hitungan bobot uniknya beda. Artikel ini pakai angka resmi Thinking Machines Lab dan mencatat selisihnya di sini secara terbuka, supaya lo tidak bingung kalau nemu angka 3,1 miliar di tempat lain.

## Skor codingnya ngalahin Qwen, tapi baca dulu catatan kecilnya

Di DeepSWE v1.1, benchmark coding agent yang mereka tonjolkan, Inkling 2 Mini menyelesaikan 48,2 persen tugas, sementara Qwen3.8 27B di 42,2 persen. Di Vals Index v2.2 dia dapat 46,5 persen. Artificial Analysis menempatkan dia di skor 20 pada Intelligence Index, imbang dengan Qwen3.8 27B, tapi dengan parameter aktif sekitar 5 kali lebih sedikit. Mereka juga menghitung Inkling 2 Mini sekitar 6 kali lebih murah dan 4 kali lebih cepat per tugas dibanding Qwen3.8 27B, dengan biaya 0,59 dolar AS dan 9,0 menit per tugas berbanding 3,53 dolar AS dan 38,2 menit.

Angka angka ini menarik, tapi ada tiga catatan yang jangan lo lewatin. Pertama, semua skor itu klaim vendor dan hasil uji mereka sendiri, bukan hasil lembaga independen. Kedua, Thinking Machines Lab sendiri ngaku model ini bukan yang terkuat buat obrolan panjang yang bolak balik atau instruksi dengan banyak batasan. Skornya 50,0 persen di MultiChallenge dan 33,4 persen di ComplexConstraints v1.1, dan di dua benchmark itu dia masih di belakang Qwen3.8 27B. Ketiga, looping bikin dia makin jago bernalar, tapi tidak bikin dia makin banyak tahu. Pengetahuan model tetap ditentukan jumlah parameter totalnya, dan di tes faktual dia sejajar dengan model lain yang seukuran.

Jadi gambaran yang jujur itu begini. Buat kerja coding agent dan tugas yang butuh penalaran berantai, Inkling 2 Mini kelihatan kuat di kelasnya. Buat hafalan fakta dan obrolan panjang yang ribet aturannya, jangan berharap dia ngalahin model yang lebih besar. Kalau lo mau pembanding model open weight lain yang sudah dibahas di blog ini, artikel [Qwen4 Max](/artikel/qwen4-max/) ngebahas model terbuka lain dari sisi yang beda.

## Jalanin di laptop lo, dua perintah ini cukup

Buat lo yang sudah kenal Ollama, ini bagian paling gampangnya. Thinking Machines Lab bilang saat peluncuran, Inkling 2 Mini didukung jalan di semua sistem Mac, MacBook atau Mac Mini, dengan RAM minimal 32 GB lewat Ollama. Perintahnya cuma dua baris.

```bash
ollama pull inkling-2-mini
ollama run inkling-2-mini
```

Ada satu syarat yang jangan lo lewatin. Saat peluncuran, model ini butuh Ollama preview release 0.40.17, dan dukungan Windows serta hardware lain masih menyusul. Jadi kalau lo pakai Windows, jangan buru buru unduh 20 GB dulu. Cek dulu halaman library Ollama dan pastikan build buat perangkat lo sudah ada.

Buat yang tidak pakai Mac, jalurnya tetap ada. Versi GGUF terkuantisasi tersedia lewat Unsloth dan llama.cpp, dan model ini juga didukung SGLang, vLLM, NVIDIA Dynamo, TokenSpeed, dan Llama App. Bobot penuhnya ada di Hugging Face di bawah nama thinkingmachines/Inkling-2-Mini, lengkap dengan model card resminya. Kalau lo belum pernah jalanin model lokal sama sekali, panduan [Ollama, jalankan AI gratis di laptop lo](/artikel/ollama-jalankan-ai-gratis-di-laptop-sendiri/) di blog ini ngebahas instalasi dan dasar dasarnya dari nol.

Satu hal lagi yang menarik dari sisi riset. Thinking Machines Lab juga merilis varian riset bernama TML-d24-varloop-research, model yang jumlah pass loopnya bisa diubah ubah, supaya komunitas bisa meneliti efek looping dan seberapa gampang penalaran model diawasi. Model itu juga tersedia publik di Hugging Face.

## Sebelum lo unduh 20 GB

Cek dulu RAM laptop lo. Kalau lo pakai Mac, patokannya 32 GB. Di bawah itu jangan maksa, karena 20 GB cuma ukuran checkpointnya, masih ada overhead runtime dan context yang butuh ruang. Terus cek versi Ollama lo, pastikan sudah di preview release yang mendukung model ini. Baru unduh, dan coba satu tugas coding kecil dulu, bukan langsung pindahin semua proyek lo.

Kalau tugas kecil itu hasilnya bagus, lo baru saja dapat coding agent yang jalan offline, gratis, dan tidak kirim data lo ke mana mana. Kalau hasilnya biasa saja, lo cuma rugi waktu unduh, bukan uang langganan. Dan kalau lo penasaran sama model baru lain yang rilis di minggu yang sama, artikel [Gemini 4 Neon](/artikel/gemini-4-neon-model-baru-google/) ngebahas model Google yang posisinya beda, di tengah keluarga Gemini 4.

## Sumber

- [Thinking Machines Lab, Introducing Inkling 2 Mini](https://thinkingmachines.ai/news/inkling-2-mini/)
- [Hugging Face, thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- [Artificial Analysis, Thinking Machines has released Inkling 2 Mini](https://artificialanalysis.ai/articles/inkling-2-mini)
- [Metarix, Inkling 2 Mini Benchmarks](https://metarix.io/inkling-2-mini-benchmarks)
