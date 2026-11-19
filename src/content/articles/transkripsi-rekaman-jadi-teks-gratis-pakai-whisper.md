---
title: "Transkripsi Rekaman Jadi Teks Gratis Pakai Whisper"
description: "Whisper ubah rekaman rapat, kuliah, atau voice note jadi teks rapi, gratis dan offline di komputer sendiri. Simak cara instal, pilih model, dan perintah pertamanya."
seoTitle: "Transkripsi Rekaman Jadi Teks Gratis Pakai Whisper"
seoDescription: "Whisper ubah rekaman rapat, kuliah, atau voice note jadi teks rapi, gratis dan offline di komputer sendiri. Simak cara instal, pilih model, dan perintah pertamanya."
category: teknologi
tags: ["Whisper", "Transkripsi Audio", "OpenAI", "AI Gratis", "Speech to Text"]
author: xdirga
publishedAt: 2026-11-19T07:06:00+07:00
status: published
featured: false
trending: false
cover: /covers/transkripsi-rekaman-jadi-teks-gratis-pakai-whisper.jpg
coverAlt: "Ilustrasi abstrak gelombang suara dan lembar teks dengan aksen magenta dan cyan di latar teal gelap"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Di HP lo mungkin ada folder voice note yang isinya rapat, kuliah, atau obrolan panjang yang belum pernah lo dengar ulang. Bukan karena isinya tidak penting, tapi karena mendengarkan ulang rekaman satu jam makan waktu satu jam juga. Transkrip adalah jalan keluarnya, dan Whisper bikin jalan itu gratis.

Whisper adalah model pengenal ucapan buatan OpenAI. Lo kasih file audio, dia kembalikan teksnya. Bedanya dengan layanan transkripsi berbayar, Whisper itu open source dan jalan di komputer lo sendiri. Tidak ada langganan, tidak ada kuota bulanan, dan rekaman lo tidak perlu dikirim ke server siapa pun.

## Whisper itu bukan aplikasi, dan itu justru kelebihannya

Whisper itu model, bukan aplikasi jadi. Lo tidak akan menemukan tombol besar bertuliskan mulai di situsnya, karena memang tidak ada situsnya. Yang ada adalah repositori kode di GitHub dan bobot model yang bisa lo unduh lalu jalankan sendiri.

OpenAI melatih Whisper dengan 680.000 jam audio multibahasa beserta transkripnya yang dikumpulkan dari web, lalu merilisnya sebagai open source pada September 2022. Kode dan bobot modelnya berada di bawah lisensi MIT, jadi siapa pun boleh memakai, mengubah, dan menyertakannya di produk sendiri selama pemberitahuan lisensinya tetap disertakan. Satu model ini bisa mengerjakan beberapa tugas sekaligus, yaitu transkripsi multibahasa, terjemahan ucapan ke Bahasa Inggris, dan identifikasi bahasa yang sedang diucapkan.

Karena modelnya jalan lokal, privasi jadi nilai tambah yang nyata. Rekaman rapat internal atau wawancara yang sensitif tidak lewat server pihak ketiga. Konsekuensinya, lo yang mengurus instalasi dan lo yang menanggung beban komputasinya. Itu pertukaran yang adil buat alat gratis.

## Pilih modelnya dulu, jangan langsung yang paling besar

Whisper hadir dalam enam ukuran, dan ukurannya menentukan seberapa akurat hasilnya dan seberapa berat bebannya. Tabel di bawah ini dibaca langsung dari README resmi Whisper.

| Ukuran | Parameter | VRAM yang dibutuhkan | Kecepatan relatif |
| --- | --- | --- | --- |
| tiny | 39 juta | sekitar 1 GB | sekitar 10x |
| base | 74 juta | sekitar 1 GB | sekitar 7x |
| small | 244 juta | sekitar 2 GB | sekitar 4x |
| medium | 769 juta | sekitar 5 GB | sekitar 2x |
| large | 1550 juta | sekitar 10 GB | 1x |
| turbo | 809 juta | sekitar 6 GB | sekitar 8x |

Kecepatan relatif di tabel itu diukur dengan mentranskrip ucapan Bahasa Inggris di GPU A100, dan README sendiri menulis hasil di dunia nyata bisa sangat berbeda tergantung bahasa, kecepatan bicara, dan hardware yang lo pakai. Jadi pakai tabel ini sebagai kompas, bukan janji.

Buat pemakaian sehari hari, patokannya sederhana. Laptop tanpa GPU yang kencang cukup pakai tiny atau base buat draf kasar yang masih bisa lo rapikan sendiri. Kalau rekamannya penting dan lo punya GPU dengan VRAM lega, medium atau large memberi hasil yang lebih rapi. Turbo adalah versi large-v3 yang dioptimalkan, lebih cepat dengan penurunan akurasi yang minimal menurut README, jadi dia pilihan tengah yang masuk akal buat banyak orang.

Satu catatan dari README, model berekstensi `.en` yang hanya berbahasa Inggris cenderung bekerja lebih baik untuk aplikasi Bahasa Inggris, terutama di ukuran tiny dan base. Buat rekaman Bahasa Indonesia, pakai model multibahasa biasa tanpa `.en`. Bahasa Indonesia sendiri ada di daftar bahasa Whisper dengan kode `id`, jadi lo tidak perlu khawatir modelnya tidak kenal bahasa kita.

## Instalasi, tiga perintah dan satu syarat

Instalasi Whisper butuh dua hal, paket Python-nya dan tool ffmpeg. Perintah instalasi paketnya cuma satu baris.

```bash
pip install -U openai-whisper
```

Syarat yang sering bikin orang mentok adalah ffmpeg. Whisper butuh tool command-line ini terpasang di sistem lo, dan perintah instalasinya beda tiap sistem operasi.

```bash
# di Ubuntu atau Debian
sudo apt update && sudo apt install ffmpeg

# di macOS pakai Homebrew
brew install ffmpeg

# di Windows pakai Chocolatey
choco install ffmpeg
```

Kode di atas butuh Python 3.8 sampai 3.11 dan PyTorch versi terbaru. Di beberapa sistem, instalasi juga butuh Rust kalau tiktoken tidak menyediakan wheel yang sudah jadi buat platform lo. Kalau instalasi gagal dengan pesan soal `setuptools_rust`, pasang dulu dengan `pip install setuptools-rust` lalu ulangi instalasi Whisper.

## Perintah pertama lo

Setelah instalasi beres, transkripsi pertama lo cuma satu perintah. Contoh di bawah ini mentranskrip satu file MP3 pakai model base dan bahasa Indonesia.

```bash
whisper rekaman-rapat.mp3 --model base --language Indonesian
```

Lo juga bisa mentranskrip beberapa file sekaligus dalam satu perintah. Pengaturan default Whisper memakai model turbo, dan itu sudah cukup baik buat transkripsi Bahasa Inggris. Kalau lo tidak menulis `--model`, turbo yang dipakai.

```bash
whisper audio.flac audio.mp3 audio.wav --model turbo
```

Buat yang lebih suka menulis kode sendiri, Whisper juga bisa dipakai dari Python. Contoh resmi dari README cuma butuh empat baris.

```python
import whisper

model = whisper.load_model("turbo")
result = model.transcribe("audio.mp3")
print(result["text"])
```

Di balik layar, method `transcribe()` membaca seluruh file lalu memproses audio dengan jendela geser 30 detik. Jadi file yang panjang tetap diproses potongan demi potongan, dan lo tinggal menunggu sampai selesai.

## Bahasa Indonesia dan jalan pintas terjemahan

Whisper mendeteksi bahasa secara otomatis, tapi lo boleh menyebut bahasanya secara eksplisit dengan `--language`. Ini berguna kalau rekaman lo campur aduk atau model salah menebak bahasa di awal.

```bash
whisper rekaman-kuliah.mp3 --language Indonesian
```

Selain transkripsi, Whisper juga bisa menerjemahkan ucapan non-Inggris ke Bahasa Inggris. Caranya, tambah `--task translate` dan pakai salah satu model multibahasa seperti medium atau large.

```bash
whisper rekaman.mp3 --model medium --language Indonesian --task translate
```

Ada satu jebakan di sini. Model turbo tidak dilatih buat tugas terjemahan, jadi dia akan mengembalikan teks dalam bahasa aslinya meskipun lo sudah menulis `--task translate`. Buat terjemahan, pakai medium atau large supaya hasilnya paling baik, begitu tulis README-nya.

Kalau lo suka alat AI yang jalan di laptop sendiri, [Ollama](/artikel/ollama-jalankan-ai-gratis-di-laptop-sendiri/) main di jalur yang sama buat chatbot. Bedanya, Whisper khusus buat suara jadi teks, dan dia tidak butuh API key apa pun.

## Yang perlu lo terima sebelum mulai

Whisper gratis, tapi bukan sulap. Ada beberapa hal yang sebaiknya lo terima di awal supaya tidak kecewa di tengah jalan.

Soal kecepatan, angka di tabel itu diukur di GPU kelas data center. Laptop biasa, apalagi yang cuma mengandalkan CPU, akan butuh waktu lebih lama. Rekaman satu jam bisa makan waktu lebih dari satu jam kalau lo pakai model besar di CPU.

Soal hardware, model besar butuh VRAM besar. Large butuh sekitar 10 GB VRAM, dan itu sudah di luar jangkauan kebanyakan laptop. Jangan paksakan large kalau hardware lo tidak sanggup, karena hasilnya malah tidak jalan sama sekali. Mulai dari base atau small, lalu naik kalau memang perlu.

Soal akurasi, cek ulang hasil transkripnya. Bagian audio yang berisik, suara yang saling timpa, atau jeda sunyi yang panjang adalah tempat kesalahan paling sering muncul. Kalau transkripnya dipakai buat tugas penting, baca sekali lagi sambil sesekali mencocokkan ke rekaman aslinya. Cara memeriksa jawaban AI klaim per klaim sudah pernah dibahas di artikel [cara cek jawaban AI biar lo tidak ketipu halusinasi](/artikel/cara-cek-jawaban-ai-halusinasi-klaim-per-klaim/), dan kebiasaan yang sama berlaku di sini.

## Mulai dari rekaman yang paling pendek

Jangan mulai dari rekaman seminar tiga jam. Ambil voice note paling pendek yang lo punya, yang isinya masih lo ingat, lalu jalankan dengan model base. Bandingkan hasilnya dengan yang lo dengar sendiri. Kalau hasilnya sudah cukup rapi buat kebutuhan lo, ulangi buat rekaman yang lebih panjang. Kalau masih banyak yang meleset, naik satu ukuran model dan coba lagi.

Begitu alur ini jalan, tumpukan rekaman yang selama ini cuma numpuk di HP berubah jadi teks yang bisa lo cari, lo kutip, dan lo olah lagi. Transkrip dari kuliah bisa lo ringkas lagi pakai [NotebookLM](/artikel/rangkum-pdf-materi-belajar-notebooklm-gratis/), dan transkrip rapat bisa langsung jadi notulen yang tinggal lo rapikan. Rekamannya tetap milik lo, teksnya juga milik lo, dan tidak ada tagihan yang datang di akhir bulan.

## Sumber

- [OpenAI, Whisper di GitHub](https://github.com/openai/whisper/blob/main/README.md)
- [OpenAI, Introducing Whisper](https://openai.com/index/whisper/)
- [Wikipedia, Whisper (speech recognition system)](https://en.wikipedia.org/wiki/Whisper_(speech_recognition_system))
- [arXiv, Robust Speech Recognition via Large-Scale Weak Supervision](https://arxiv.org/abs/2212.04356)
