---
title: "NVIDIA Nemotron Image 30B, Gratis tapi Bukan Buat Jualan"
description: "NVIDIA rilis bobot terbuka Nemotron Image 30B di Hugging Face. Gratis diunduh tapi lisensinya nonkomersial, dan skor GenEval 92,86 ternyata skor sistem lengkap."
category: berita
tags: ["NVIDIA", "Nemotron", "Model AI", "Hugging Face", "AI Gambar"]
author: xdirga
publishedAt: 2026-11-26T17:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/nvidia-nemotron-image-30b-a3b.jpg
coverAlt: "Ilustrasi chip GPU dan gambar digital abstrak warna magenta dan cyan di atas latar teal gelap"
---

Angka 92,86 sempat jadi headline di mana mana. NVIDIA merilis model gambar baru bernama Nemotron Image 30B, skornya mengalahkan GPT Image 2, bobotnya terbuka dan bisa diunduh gratis dari Hugging Face. Kedengarannya seperti kabar terbaik buat siapa pun yang suka mainan model AI. Sayangnya dua bagian penting dari cerita ini gampang kelewat kalau lo cuma baca judul. Lisensinya membatasi pemakaian ke riset nonkomersial dan evaluasi saja. Terus angka 92,86 itu bukan skor model yang lo unduh, melainkan skor sistem lengkap VisualCreation dengan bantuan agen. Model yang berdiri sendiri skornya jauh lebih rendah.

WCCFTech melaporkan rilis ini pada 25 November 2026 pukul 09.36 UTC, atau 16.36 WIB. Dua hari sebelumnya, tepatnya 23 November 2026, NVIDIA sudah lebih dulu mengirim paper teknisnya ke arXiv dengan judul Nemotron Labs VisualCreation dan kode arXiv 2611.31358. Jadi rilis bobot ini bukan kejutan tanpa konteks, papernya sudah duluan, bobotnya nyusul.

## Gratis Diunduh, Bukan Berarti Bebas Dipakai

Bagian ini yang paling wajib lo pahami sebelum lo keburu semangat. Model card di Hugging Face menulis governing termsnya dengan jelas. Model ini dilisensikan untuk riset nonkomersial dan evaluasi di bawah NVIDIA License. Salinannya disertakan di dalam file LICENSE di repo. Artinya lo boleh mengunduh bobotnya tanpa bayar dan memakainya buat riset atau evaluasi, tapi lo tidak boleh memakainya buat keperluan komersial. Mau dipakai buat produk berbayar, layanan pelanggan, atau konten yang lo jual, itu di luar lisensi.

Di sinilah istilah jadi penting. Model ini open weight, bukan open source. Open weight artinya bobotnya terbuka dan bisa diunduh. Open source artinya lisensinya memberi kebebasan pakai yang luas, termasuk buat jualan. Nemotron Labs Image 30B A3B cuma memenuhi yang pertama. Kalau ada yang nyebut model ini open source tanpa kualifikasi, itu menyesatkan. Ada juga klaim yang beredar kalau lisensinya lisensi permisif yang paling longgar, dan klaim itu salah. Model card resmi menulis lisensi nonkomersial di bawah NVIDIA License, bukan lisensi permisif bebas.

Buat lo yang selama ini nyobain model AI gratis lewat [Hugging Face Spaces](/artikel/hugging-face-spaces-coba-ribuan-model-ai-gratis/), bedanya terasa di sini. Di Spaces lo tinggal klik dan pakai. Di sini lo dapat bobot mentahnya, tapi dengan aturan main yang ketat. Gratisnya gratis riset, bukan gratis bisnis.

## Angka 92,86 Itu Skor Sistem, Bukan Skor Modelnya

Sekarang ke angka yang bikin heboh. Di tabel hasil model card, NVIDIA mencantumkan skor terbaik framework VisualCreation di tiap benchmark. GenEval 92,86, LongTextBench 97,98, CVTG 2K 92,53, WISE Verified 91,50, dan BizGenEval 86,0. Buat perbandingan, GPT Image 2 dapat 89,00 di GenEval dan 83,2 di BizGenEval, sementara Nano Banana Pro dapat 97,60 di LongTextBench dan 76,7 di BizGenEval. Semua angka ini adalah klaim vendor dari NVIDIA sendiri, bukan hasil pengujian independen.

Yang perlu lo tahu, model card menegaskan kalau angka itu adalah skor terbaik di antara konfigurasi yang dievaluasi, bukan skor model standalone. Skor 92,86 di GenEval itu dicapai dengan bantuan agen GPT 6. Dengan agen Nemotron sendiri, GenEvalnya 86,40. Dan kalau model yang diunduh dipakai sendirian tanpa harness agen apa pun, GenEvalnya 80,97. Selisihnya hampir 12 poin dari angka headline.

Pola yang sama muncul di benchmark lain. LongTextBench 97,98 buat framework, 94,30 buat model standalone. WISE Verified 91,50 buat framework, 46,30 buat model standalone. GenEval2 malah lebih dramatis, 65,43 buat framework dengan agen GPT 6, 52,56 dengan agen Nemotron, dan cuma 31,71 kalau model dipakai sendirian. Jadi kalau lo mau menilai checkpoint yang bisa diunduh ini secara jujur, patokan lo kolom standalone, bukan kolom framework.

Tabel di bawah ini merangkum perbedaannya, supaya lo tidak tertipu headline.

| Benchmark | Framework VisualCreation | Model standalone |
| --- | --- | --- |
| GenEval | 92,86 | 80,97 |
| GenEval2 | 65,43 | 31,71 |
| LongTextBench | 97,98 | 94,30 |
| WISE Verified | 91,50 | 46,30 |

Semua angka di tabel ini adalah klaim vendor NVIDIA. Intinya bukan cuma angkanya, tapi konfigurasi apa yang bikin angka itu keluar.

## Di Mana Nemotron Image 30B Masih Kalah

Kejujuran angka juga berarti ngomongin kelemahannya. Di GenEval2, GPT Image 2 masih unggul jauh dengan 81,00 berbanding 65,43 buat framework VisualCreation. Di Qwen Image Bench, GPT Image 2 memimpin 65,23 berbanding 52,46. Jadi klaim mengalahkan GPT Image 2 itu cuma berlaku di sebagian benchmark, bukan di semua.

Ini penting buat lo yang mungkin membayangkan model ini langsung jadi raja generator gambar. Di tugas yang butuh penalaran visual kompleks dan konsistensi, pesaingnya masih di depan. Framework VisualCreation memang menang di GenEval, LongTextBench, dan BizGenEval, tapi kalah telak di GenEval2. Jadi gambarannya berimbang, jauh dari kata dominasi total.

## Isi Mesin Nemotron Image 30B

Di balik angka tadi, arsitekturnya sendiri menarik. Model ini memakai arsitektur Mixture of Experts dengan 30 miliar parameter total, tapi cuma 3 miliar parameter yang aktif per token. Itu sebabnya namanya 30B A3B, 30 miliar total dan 3 miliar aktif. Desainnya hybrid Nemotron H yang memadukan lapisan state space Mamba 2 dengan attention tradisional. Model ini diinisialisasi dari Nemotron 3 Nano, lalu disempurnakan lewat progressive mid training dan GRPO, singkatan dari Group Relative Policy Optimization, buat keselarasan semantik dan kualitas gambar.

Model ini adalah generator gambar autoregressive, bukan diffusion seperti kebanyakan generator gambar yang lo kenal. Ia adalah komponen raster image generation dari framework agentic Nemotron Labs VisualCreation. Rilis awal ini cuma mencakup image generator dan visual tokenizer yang dibundel.

Tokenizer gambarnya juga bukan pelengkap biasa. Ia punya sekitar 642 juta parameter buat encoder dan decoder, patch 16 kali 16, dan codebook tetap berisi 196.560 vektor. Rekonstruksinya meningkatkan PSNR dari 26,08 ke 29,57 dB dibanding Emu3.5 IBQ. Di batch size satu pada A100, encodingnya 7,13 kali lebih cepat dan decodingnya 10,93 kali lebih cepat. Detail teknis lain yang tercatat di model card antara lain arsitekturnya NemotronHForCausalLM, presisinya bfloat16, dan panjang konteksnya 262.144 token.

## Pixel as Code dan Janji yang Belum Bisa Dicoba

Nama VisualCreation datang dengan filosofi yang ambisius, Pixel as Code. Framework ini dirancang buat membuat gambar raster yang ekspresif sekaligus artefak visual yang bisa diedit, antara lain webpage, presentasi, dokumen, chart, dan figure ilmiah. Antarmuka Pixel as Code menghubungkan token visual hasil belajar dengan program eksplisit lewat proses generation, rendering, dan visual inspection.

Kedengarannya besar, dan memang besar. Masalahnya, yang dirilis sekarang baru model gambar dan tokenizernya. Harness VisualCreation dan model VisionCode, yang menghasilkan artefak terstruktur yang bisa diedit seperti SVG dan webpage, masih menunggu legal clearance. Artinya bagian paling menarik dari janji framework ini belum bisa lo coba dari rilis ini. Yang lo unduh adalah image generatornya, bukan sistem VisualCreation lengkap yang dijelaskan di paper 23 November itu.

Buat lo yang penasaran sama gambar hasil AI dan cara membedakan mana yang asli mana yang buatan, ada panduan [cara bedain gambar AI dan deepfake](/artikel/cara-bedain-gambar-ai-deepfake/) yang tetap relevan buat hasil generator seperti ini.

## Buat Jalanin, Siapin Empat H100

Contoh inference resmi NVIDIA memakai empat GPU NVIDIA H100 80GB, dengan Python 3.12, CUDA 13.0, dan vLLM 0.21.0. Bobotnya bfloat16 dan repo berisi 32 shard safetensors plus tokenizer gambar yang dibundel. Resolusi yang direkomendasikan antara lain 1024 kali 1024 dan 1248 kali 832.

Potongan relevan dari contoh resmi di model card kelihatan seperti ini.

```python
from vllm import LLM

llm = LLM(
    model="nvidia/Nemotron-Labs-Image-30B-A3B",
    tensor_parallel_size=4,
    dtype="bfloat16",
)
```

Buat sebagian besar pembaca, empat H100 itu angka yang langsung menjelaskan siapa target rilis ini. Jangan harap model ini jalan di laptop, seperti model ringan yang bisa lo jalankan lewat [Ollama di laptop sendiri](/artikel/ollama-jalankan-ai-gratis-di-laptop-sendiri/). Ini rilis buat peneliti dan lab yang punya akses ke GPU kelas data center. Kalau lo cuma mau nyoba gambarnya, nunggu ada yang hosting demonya di Spaces atau layanan sejenis jauh lebih masuk akal daripada nyiapin hardware sendiri.

## Batasan yang Ditulis NVIDIA Sendiri

Model card juga jujur soal batasan, dan bagian ini layak lo baca sebelum lo berekspektasi terlalu tinggi. Model ini tidak jalan di pipeline Diffusers dan tidak kompatibel dengan AutoPipelineForText2Image. Jadi jangan harap lo bisa langsung colok ke workflow Diffusers yang sudah lo punya.

Loading model menjalankan kode repo lewat `trust_remote_code=True`, jadi NVIDIA menyarankan lo mengunci revisi tertentu dan meninjaunya dulu buat deployment yang terkontrol. Ini standar buat model yang menjalankan kode dari repo, tapi tetap wajib lo tahu.

Satu lagi, hasil generasi bersifat stokastik dan bisa salah. Komposisi, anatomi, jumlah objek, hubungan spasial, dan teks yang dirender bisa saja tidak benar. Model ini bisa bikin gambar yang kelihatan meyakinkan tapi detailnya ngaco, dan itu sudah diakui di model cardnya sendiri.

## Jadi, Buat Siapa Rilis Ini

Kalau lo peneliti atau pengembang yang kerja di bidang image generation, rilis ini berharga. Lo dapat generator autoregressive 30B dengan tokenizer yang cepat dan arsitektur hybrid yang menarik buat dipelajari, lengkap dengan paper yang menjelaskan framework di sekelilingnya. Skor standalone 80,97 di GenEval memang bukan yang tertinggi, tapi cukup buat jadi titik awal riset yang serius.

Kalau lo kreator atau pemilik bisnis yang berharap dapat generator gambar gratis buat dipakai jualan, rilis ini bukan buat lo. Lisensinya melarang pemakaian komersial, hardware contohnya empat H100, dan artefak editable yang jadi janji besarnya belum dirilis. Buat kebutuhan jualan, lo lebih aman lirik [generator gambar AI gratis](/artikel/ai-gambar-gratis-leonardo-canva-gemini/) yang memang boleh dipakai, dan kalau lo masih bingung milih, ada panduan [memilih model AI gratis](/artikel/memilih-model-ai-gratis/) yang bisa lo baca dulu. Tunggu harness VisualCreation dan VisionCode keluar dari legal clearance, dan baca lagi lisensinya saat itu. Sampai saat itu, yang paling jujur dari rilis ini justru ada di dua catatan kecilnya, gratis buat riset dan angka headline bukan skor model yang lo unduh.

## Sumber

- WCCFTech, NVIDIA Diam Diam Merilis Bobot Terbuka Nemotron Labs Image 30B A3B, 25 November 2026, https://wccftech.com/nvidia-quietly-releases-open-weights-for-nemotron-labs-image-30b-a3b/
- Model card Hugging Face, NVIDIA Nemotron Labs Image 30B A3B, https://huggingface.co/nvidia/Nemotron-Labs-Image-30B-A3B
- arXiv, Nemotron Labs VisualCreation Pixel as Code for Agentic Visual Creation, arXiv 2611.31358, disubmit 23 November 2026, https://arxiv.org/abs/2611.31358
- PromptsZone, NVIDIA Nemotron Labs Image 30B A3B Weights Benchmarks, https://promptszone.com/nvidia-nemotron-labs-image-30b-a3b-weights-benchmarks
