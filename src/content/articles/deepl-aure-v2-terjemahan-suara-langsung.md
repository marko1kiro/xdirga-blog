---
title: "DeepL Aure v2 Bikin Terjemahan Suara Langsung Separuh Lebih Cepat"
description: "DeepL meluncurkan Aure v2 pada 26 November 2026 di Tokyo, model Voice AI yang memangkas delay terjemahan suara langsung sampai 50 persen dibanding pendahulunya."
seoTitle: "DeepL Aure v2 Pangkas Delay Terjemahan Suara 50 Persen"
category: berita
tags: ["DeepL", "Aure v2", "Terjemahan Suara", "Voice AI", "AI"]
author: xdirga
publishedAt: 2026-11-27T17:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/deepl-aure-v2-terjemahan-suara-langsung.jpg
coverAlt: "Pita gelombang suara magenta dan cyan yang bertemu di tengah latar teal gelap, ilustrasi abstrak terjemahan suara langsung"
---

Tokyo baru saja jadi panggung lompatan berikutnya di terjemahan suara. Tanggal 26 November 2026, DeepL meluncurkan Aure v2 di Unmute Summit perdananya di Tokyo, cuma 15 hari setelah Aure generasi pertama diperkenalkan. Model baru ini memangkas delay terjemahan sampai 50 persen dibanding pendahulunya, sambil menaikkan akurasi dan ekspresivitas.

Buat lo yang pernah ikut rapat lintas bahasa, lo tahu rasanya. Lo ngomong, lalu ada jeda. Lawan bicara lo menunggu, lo menunggu, dan percakapan yang seharusnya mengalir jadi terpotong potong. Aure v2 menyerang tepat di titik itu. Delay yang lebih pendek berarti jeda canggung berkurang dan percakapan terasa lebih natural, karena terjemahan datang hampir bersamaan dengan ucapan aslinya.

## Lima Belas Hari Setelah Aure Lahir, Penggantinya Sudah Datang

Aure generasi pertama diluncurkan 11 November 2026 di Cologne, Jerman. Model itu bisa menyesuaikan hasil terjemahan dengan nada, emosi, dan intonasi pembicara, termasuk perubahan penekanan dan tempo bicara. Lima belas hari kemudian, DeepL sudah membawa penggantinya ke Tokyo. Lima belas hari itu jeda yang pendek banget buat ganti generasi model. DeepL jelas lagi ngebut di lini Voice AI mereka.

## Satu Langkah Menggantikan Tiga

Selama ini terjemahan suara real time jalan lewat tiga tahap terpisah. Suara diubah jadi teks, teks itu diterjemahkan ke bahasa lain, lalu suara baru dihasilkan dari hasil terjemahan. Tiap tahap nunggu tahap sebelumnya selesai, dan tiap antrean nambah delay yang bisa memotong alur percakapan. Buat gambaran tahap pertamanya, baca dulu cara [transkripsi rekaman jadi teks pakai Whisper](/artikel/transkripsi-rekaman-jadi-teks-gratis-pakai-whisper/).

Aure v2 menyatukan ketiganya jadi satu langkah. Model ini menerjemahkan langsung dari suara ke suara, tanpa tahap transkripsi dan sintesis yang terpisah. Begitu rantai tahap yang berurutan hilang, sumber delay terbesarnya ikut hilang. Di situlah arsitektur ujung ke ujungnya bekerja.

Melatih model kayak gini bukan perkara gampang, karena rekaman terjemahan real time berkualitas tinggi itu langka. DeepL ngajarin Aure v2 pakai reinforcement learning, intinya model ini belajar kapan konteks yang sudah didengar cukup buat mulai menerjemah. Selama pelatihan, model dapat imbalan tiap kali terjemahannya akurat dan cepat dimulai. Sebastian Enderlein, Chief Technology Officer DeepL, bilang kuncinya bukan memproses suara lebih cepat, tapi tahu kapan informasi yang sudah didengar cukup buat menerjemah dengan akurat.

Cara pandang kayak gini yang bikin Aure v2 menarik. Ternyata masalah utama terjemahan suara langsung bukan kecepatan mentah, tapi keputusan kapan mulai bicara. Mulai terlalu cepat, terjemahan bisa salah arah karena konteks belum lengkap. Mulai terlalu lambat, delay menumpuk dan percakapan terasa tersendat. Model yang belajar soal timing ini berarti DeepL memindahkan hambatannya dari antrean teknis ke penilaian momen, dan itu perubahan cara berpikir, bukan sekadar mesin yang lebih kencang.

## Tiga Tahap Lama Lawan Satu Langkah Baru

Perbedaannya lebih gampang dilihat kalau dua pendekatannya disandingkan.

|  | Cara lama | Aure v2 |
| --- | --- | --- |
| Jumlah tahap | Tiga tahap terpisah | Satu langkah |
| Alur kerja | Suara diubah jadi teks, teks diterjemahkan, lalu suara dihasilkan dari terjemahan | Suara langsung diterjemahkan jadi suara |
| Sumber delay | Tiap tahap menunggu tahap sebelumnya | Tidak ada antrean antar tahap |
| Penurunan delay | Tidak ada angka pembanding | 50 persen dibanding pendahulunya |

Angka 50 persen itu jadi masuk akal kalau lo lihat arsitekturnya. Delay terbesar selama ini datang dari antrean tiga tahap, jadi menghapus antrean itu memang cara paling langsung buat memangkasnya.

## Angka 50 Persen dan 32 Persen Itu Klaim Siapa

Nah, sekarang bagian yang wajib lo baca pakai kacamata kritis. Di benchmark internal DeepL, Aure v2 mencetak kualitas terjemahan lebih tinggi dari enam sistem pesaing yang diuji, di setiap pasangan bahasa. Di pasangan Inggris Jepang, salah satu pasangan tersulit buat terjemahan suara real time, Aure v2 bikin 32 persen lebih sedikit error terjemahan dibanding Google Gemini 3.5 Live Translate.

Semua angka itu berasal dari studi internal DeepL, bukan pengujian independen. Studinya dilakukan pada November 2026 memakai rekaman ucapan nyata berdurasi satu menit di 10 pasangan bahasa, dengan transkrip yang divalidasi manusia. Semua model diuji lewat API publik tanpa overhead aplikasi. DeepL sendiri menulis kalau hasilnya bisa berbeda di percakapan nyata. Jadi angka 50 persen dan 32 persen di artikel ini lo baca sebagai klaim DeepL, bukan fakta mutlak yang sudah diuji pihak ketiga.

Angkanya menarik dan arsitekturnya menjelaskan kenapa angka itu mungkin. Tapi bukti independennya belum ada, jadi tunggu pengujian pihak ketiga sebelum lo jadikan angka ini patokan.

## Enam Bahasa Dulu, Indonesia Belum Masuk

Aure v2 mendukung enam bahasa saat peluncuran, yaitu Inggris, Jerman, Prancis, Spanyol, Jepang, dan Korea. DeepL bilang bahasa lain akan menyusul, tapi belum ada daftar atau jadwalnya di siaran pers ini. Kalau lo berharap Bahasa Indonesia langsung didukung, jawabannya belum. Bahasa Indonesia tidak ada di daftar enam bahasa peluncuran.

Model ini langsung tersedia buat pelanggan DeepL Voice di tiga tempat, yaitu DeepL Voice for Online Meetings, DeepL Voice untuk percakapan tatap muka, dan DeepL API for Voice. Model ini aktif otomatis buat bahasa yang didukung, tanpa setup tambahan. Kalau lo butuh terjemahan tatap muka tanpa internet, ada juga cara [terjemahan offline saat traveling tanpa sinyal](/artikel/traveling-tanpa-sinyal-peta-terjemahan-offline/).

Rilis ini datang pas pemakaian DeepL Voice lagi naik kencang. Total menit suara DeepL Voice naik lebih dari 8x year over year di kuartal ketiga 2026, dan menit rapat yang diterjemahkan naik sekitar 7x. Sehari sebelum Aure v2, DeepL dan Macnica juga mengumumkan program dukungan komunikasi multibahasa saat bencana di Jepang. Program itu memberi akses gratis DeepL Voice untuk percakapan tatap muka antara pemerintah daerah, organisasi pendukung, dan warga yang terdampak bencana, mulai 26 November 2026. Program itu terpisah dari Aure v2, tapi menunjukkan ke mana teknologi ini diarahkan. Jepang memang lagi jadi pusat perhatian Voice AI, setelah sebelumnya ada [akuisisi ElevenLabs atas lab voice AI Jepang Kotoba](/artikel/elevenlabs-akuisisi-kotoba-voice-ai-jepang/).

## Yang Layak Lo Pantau Berikutnya

Yang paling layak lo pantau sekarang adalah gelombang bahasa berikutnya, apakah Bahasa Indonesia masuk di awal atau belakangan. Setelah itu, pengujian independen yang membandingkan Aure v2 dengan pesaingnya di percakapan nyata, bukan rekaman satu menit. Terakhir, apakah penurunan delay 50 persen itu tetap terasa saat percakapannya panjang dan berbelit, bukan cuma di kondisi uji.

Buat lo yang sudah pelanggan DeepL Voice dan memakai salah satu dari enam bahasa yang didukung, Aure v2 sudah aktif otomatis tanpa setup tambahan. Buat lo yang menunggu Bahasa Indonesia, rilis ini belum membawa apa apa yang bisa lo coba. Yang bisa lo lakukan sekarang cuma mencatat tanggalnya. Begitu DeepL mengumumkan gelombang bahasa berikutnya, di situlah ketahuan apakah model ini akhirnya relevan buat percakapan sehari hari lo.

## Sumber

- DeepL, siaran pers resmi, https://app.deepl.com/en/press-release
- PR Newswire, DeepL Introduces Aure v2, Its Fastest Voice AI Translation Model, 26 November 2026, https://www.prnewswire.com/apac/news-releases/deepl-introduces-aure-v2-its-fastest-voice-ai-translation-model-302950696.html
