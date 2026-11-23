---
title: "Perplexity OpenAI Turun 0,99 ke 0,76, Rem Frontier Diusulkan"
description: "Perplexity OpenAI akhirnya dibuka ke publik, skor internal GPT-3.5 sampai model terbaru turun 0,99 ke 0,76, plus usulan batas bersama antar lab frontier."
category: berita
tags: ["OpenAI", "Perplexity", "Jakub Pachocki", "AI Frontier", "Pretraining"]
author: xdirga
publishedAt: 2026-11-23T17:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/openai-perplexity-and-intelligence-batas-pretraining-ai.jpg
coverAlt: "Ilustrasi abstrak speedometer dan deretan angka yang menurun di atas latar gelap, tanpa orang di dalamnya"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Selama bertahun tahun, satu angka jadi patokan internal OpenAI buat ngukur seberapa pintar model mereka. Angka itu tidak pernah dibuka ke publik. Minggu, 22 November 2026, Chief Scientist OpenAI Jakub Pachocki akhirnya mempublikasikannya dalam esai berjudul Perplexity and Intelligence, lengkap dengan kurva dari GPT-3.5 sampai model internal terbaru yang belum rilis.

Yang bikin esai ini lebih dari sekadar pamer angka adalah usulannya. Pachocki minta semua lab frontier sepakat soal batas bersama sebelum model melewati ambang tertentu, dan dia juga jujur soal kelemahan metrik yang dia usulkan sendiri.

## Perplexity OpenAI, angka yang selama ini cuma ada di dalam lab

Pachocki menjabat Chief Scientist OpenAI sejak Mei 2024, dan dalam esainya dia berargumen supaya perplexity, atau yang setara dengan cross entropy loss, dipakai sebagai metrik pembanding antar pengembang model dan sebagai dasar standar keamanan bersama.

Perplexity itu gampang dijelasin dengan bahasa sehari hari. Metrik ini ngukur seberapa baik model menebak token berikutnya, dan nilai yang lebih rendah berarti tebakannya lebih baik. Skor ini dihitung selama pretraining, pas model lagi belajar, dan caranya beda dari benchmark yang ngukur hasil ngerjain tugas.

Angka angka itu diukur pada dataset evaluasi utama OpenAI, yaitu dataset held out yang dilacak sejak GPT-3.5 dan bersumber dari codebase internal perusahaan. Grafik dalam esai menunjukkan penurunan tajam sepanjang 2026, dengan satu model internal yang belum dirilis digambarkan lebih rendah lagi. OpenAI mengaitkan percepatan 2026 terutama dengan riset jangka panjang dan investasi komputasi.

## Satu angka, lima ambang

Tiap kali log perplexity turun melewati ambang tertentu, kemampuan baru muncul. Tabel di bawah ini merangkum ambang yang ditulis Pachocki.

| Log perplexity | Model | Kemampuan yang muncul |
| --- | --- | --- |
| Sekitar 0,99 | GPT-3.5 | Percakapan yang fasih, jadi basis ChatGPT original |
| Sekitar 0,91 | GPT-4 | Penalaran chain of thought yang produktif |
| Di bawah 0,8 | Model terbaru | Kemampuan transformatif di bidang keamanan siber dan matematika |
| Sekitar 0,76 | Model internal terbaru | Hasil terobosan pada soal matematika terbuka |
| Sekitar 0,68 sampai 0,70 | Belum ada | Perkiraan Pachocki, kemampuan transformatif berikutnya |

GPT-3.5 di angka sekitar 0,99 sudah cukup buat percakapan yang fasih dan jadi basis ChatGPT original. GPT-4 di sekitar 0,91 sudah mahir memakai penalaran chain of thought secara produktif, sampai OpenAI terdorong mengembangkan model penalaran modern dari kemampuan itu.

Begitu angka turun di bawah 0,8, kemampuan transformatif mulai muncul di bidang keamanan siber dan matematika. Di sekitar 0,76, model mulai menghasilkan hasil terobosan pada soal soal matematika terbuka yang sudah lebih dari setahun dijadikan bahan evaluasi.

Baris terakhir tabel ini beda. Angka sekitar 0,68 sampai 0,70 bukan hasil pengukuran, tapi perkiraan Pachocki. Dia memperkirakan kemampuan transformatif lebih lanjut akan muncul saat model memasuki jendela itu, dan dia sendiri mengakui tidak tahu kemampuan apa itu, bahkan mungkin kemampuan yang belum diuji hari ini.

## Speedometernya ada, speed limitnya belum

Analogi paling gampang buat memahami usulan ini adalah speedometer dan speed limit. Perplexity itu speedometernya, alat yang nunjukin seberapa cepat kemajuan pretraining berjalan. Common limits yang dia usulkan itu speed limitnya, batas bersama supaya tidak ada yang ngebut melewati titik tertentu sebelum pengamannya siap.

Usulannya, para pengembang berkomitmen tidak melewati batas bersama berbasis perplexity dan pengukuran lain, sampai kemampuan memahami dan memantau perilaku AI mencapai tonggak konkret, misalnya penerus monitor chain of thought. Jadi remnya cuma ditahan sementara sampai alat pengawasnya mengejar.

Pachocki menilai masuk akal kalau pada 2027 bisa terjadi avalanche, yaitu lonjakan beruntun kemajuan fundamental pretraining, sementara kemajuan alignment dan monitoring kemungkinan tidak cukup cepat mengimbanginya. Dia juga memperkirakan audit alignment yang kini dominan akan makin melemah, sementara kesadaran model bahwa dirinya sedang dievaluasi dan dilatih akan makin meningkat.

## Microsoft ikut buka kartu di hari yang sama

Di hari yang sama, CEO Microsoft AI Mustafa Suleyman mendukung inisiatif transparansi OpenAI dan membuka angka model Microsoft. Dengan izin OpenAI, dia melaporkan MAI-2 Base di dataset evaluasi OpenAI dengan log perplexity 0,819, yang menurutnya berada di kisaran yang sama dengan model dasar GPT-5.6 Sol, karena keduanya memakai tokenizer yang sama sehingga angkanya bisa dibandingkan langsung.

Angka 0,819 itu datang dari Microsoft sendiri. Belum ada benchmark independen yang memverifikasinya. Angka itu menempatkan MAI-2 Base di antara GPT-4 dan model terbaru OpenAI dalam tabel di atas. Buat konteks soal model OpenAI terbaru, [GPT-6.2 Astra dan Sol](/artikel/gpt-6-2-astra-sol-openai/) sudah pernah dibahas di blog ini.

Sam Altman juga menanggapi di X pada 22 November pukul 17.40 UTC. Dia menulis lab lab telah sepakat di bawah White House Accords untuk menetapkan standar dan praktik terbaik keamanan sistem, dan diskusi soal perplexity dapat memajukan tujuan itu.

Pada September 2026, CEO Anthropic Dario Amodei sudah menerbitkan rencana pace the frontier, yaitu kerangka agar pengembangan AI tidak melampaui pengaman di sekitarnya. Esai Pachocki bisa dibaca sebagai upaya mengisi kekosongan itu dengan satuan ukur bersama.

## Pachocki sendiri yang bilang metrik ini rapuh

Bagian paling jujur dari esai ini ada di akhir, saat Pachocki mengakui empat kelemahan perplexity sebagai metrik bersama. Buat mulai, angka ini susah dibandingkan antar lab, karena tiap pengembang memakai dataset evaluasi dan campuran data latih yang berbeda. Terus ada juga jaraknya dari tugas yang benar benar dipedulikan, karena metrik ini tidak berhubungan langsung dengan tugas itu. Lalu kemajuan di luar pretraining tidak ketangkap sama sekali. Contoh paling jelasnya, penalaran chain of thought tidak menurunkan perplexity, padahal kemampuan model naik drastis karenanya. Dan yang terakhir, batas bawahnya tidak diketahui. Pachocki menulis tidak mungkin mencapai loss nol, tapi tidak ada yang tahu berapa entropi bawaan datanya.

Ini penting buat lo karena menjelaskan kenapa esai ini belum bisa dibaca sebagai kesepakatan industri. Ini proposal, bukan aturan. Belum ada kesepakatan antar lab soal batas bersama ini. Buat lo yang mau ngecek sendiri klaim klaim kayak gini sebelum percaya, ada [cara cek jawaban AI klaim per klaim](/artikel/cara-cek-jawaban-ai-halusinasi-klaim-per-klaim/) yang bisa lo pakai. Yang ada baru dukungan terbuka dari Microsoft dan tanggapan Altman, plus kerangka pace the frontier dari Anthropic yang terbit lebih dulu.

## Yang bisa lo pantau mulai sekarang

Kalau lo mau mengikuti kelanjutan cerita ini, ada tiga hal konkret yang bisa lo pantau. Yang paling gampang, baca esai aslinya di situs OpenAI, tautannya ada di daftar sumber di bawah.

Setelah itu, perhatikan apakah lab lain ikut membuka angka mereka di dataset evaluasi yang sama. Usulan ini baru bisa jalan kalau angkanya bisa dibandingkan antar lab, dan sampai sekarang baru Microsoft yang ikut membuka angka lewat postingan Suleyman.

Dan yang paling menentukan, perhatikan apakah usulan ini berubah dari esai menjadi komitmen tertulis. Pachocki memasang syarat yang jelas, yaitu alat monitoring yang lebih baik. Kalau tonggak itu tidak tercapai tapi pretraining terus melaju menuju jendela 0,68 sampai 0,70 yang dia perkirakan, di situlah ketegangan sebenarnya terjadi.

Buat lo yang penasaran kenapa satu angka sederhana bisa jadi patokan kemajuan, artikel soal [token dan context window](/artikel/token-context-window-kenapa-chat-ai-tiba-tiba-lupa/) di blog ini ngebahas sisi lain dari cara model AI diukur dan dibatasi. Angka 0,99 sampai 0,76 itu cuma awal cerita. Yang menentukan akhirnya adalah apakah lab lab frontier mau berhenti sejenak di garis yang sama, atau tetap ngebut sendiri sendiri.

## Sumber

- [OpenAI, Perplexity and Intelligence](https://openai.com/index/perplexity-and-intelligence)
- [Crypto Briefing, OpenAI Pachocki Perplexity AI Benchmark](https://cryptobriefing.com/openai-pachocki-perplexity-ai-benchmark/)
- [Crypto Briefing, OpenAI Pachocki Pretraining Breakthroughs 2027](https://cryptobriefing.com/openai-pachocki-pretraining-breakthroughs-2027/)
- [FourWeekMBA, OpenAI Loss Fell 0.99 to 0.76, It Proposes Common Limits](https://fourweekmba.com/ai-openais-loss-fell-0-99-to-0-76-it-proposes-common-limits/)
- [Dealroom, OpenAI Publishes Its Internal Pretraining Curve](https://dealroom.co/news/174824-openai-publishes-its-internal-pretraining-curve-and-proposes-industry-wi/)
- [Mustafa Suleyman di X, MAI-2 Base 0.819](https://x.com/mustafasuleyman/status/2124663594449318173)
- [KuCoin News, Microsoft and OpenAI Share Model Metrics](https://www.kucoin.com/news/flash/microsoft-and-openai-share-model-metrics-in-transparency-initiative)
