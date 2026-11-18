---
title: "OpenAI Rilis GPT-6.2 Astra dan Sol, Lebih Murah dan Lebih Kuat buat Kerja Profesional"
description: "OpenAI rilis GPT-6.2 Astra dan Sol 17 November 2026. Astra lebih murah 20 persen di API, Sol hampir menyamai Astra dengan biaya sekitar seperlima."
seoTitle: "GPT-6.2 Astra dan Sol Rilis Harga API Turun 20 Persen"
seoDescription: "OpenAI rilis GPT-6.2 Astra dan Sol 17 November 2026. Astra lebih murah 20 persen di API, Sol hampir menyamai Astra dengan biaya sekitar seperlima."
category: berita
tags: ["GPT-6.2", "OpenAI", "Astra", "Sol", "Model AI", "Berita AI"]
author: xdirga
publishedAt: 2026-11-18T17:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/gpt-6-2-astra-sol-openai.jpg
coverAlt: "Ilustrasi abstrak dua model AI dengan aksen magenta dan cyan di latar teal gelap"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Kalau lo bayar API OpenAI tiap bulan, kabar yang datang 17 November 2026 ini lumayan enak didengar. Model flagshipnya turun harga, dan menurut OpenAI performanya malah naik. Yang datang langsung dua model sekaligus.

OpenAI ngerilis GPT-6.2 Astra buat proyek paling berat dan GPT-6.2 Sol buat kerja sehari hari. Astra jadi andalan buat kerjaan paling sulit, Sol jadi model efisien yang serbaguna. Keduanya langsung bisa dipakai di hari pengumuman, tapi ada syaratnya, dan syarat itu yang menentukan apakah kabar ini relevan buat lo atau cuma buat dibaca doang.

## Dua model sekaligus, tapi tidak semua orang bisa langsung pakai

Mulai hari pengumuman, GPT-6.2 Astra dan Sol tersedia buat pengguna Plus, Pro, Enterprise, dan Edu di ChatGPT Work dan Codex. Pelanggan Pro 500 bisa memakai Ultrafast dengan salah satu dari dua model itu. Buat pertama kalinya, Ultrafast juga dibawa ke pelanggan Pro 200, dimulai dari GPT-6.2 Sol.

Developer bisa mengakses keduanya lewat API dengan ID gpt-6.2-astra dan gpt-6.2-sol, dan Ultrafast tersedia buat kedua model sejak peluncuran. Yang perlu lo catat, model ini tidak masuk ChatGPT reguler dan bukan buat paket Free. Jadi kalau lo pakai ChatGPT gratis, kabar ini belum mengubah apa apa buat lo.

## Tarif API Astra turun 20 persen

Buat developer, ini bagian paling konkret dari pengumuman. Astra turun 20 persen dari GPT-6 Astra, dengan diskon 60 persen buat cached input, dan angka lengkapnya ada di tabel di bawah.

Sol jalurnya beda. Tarifnya bertahan di angka GPT-6.1 Sol, jadi jarak harga di antara keduanya tetap lebar.

| Model | Input | Cached input | Output |
|---|---|---|---|
| GPT-6.2 Astra | $8 | $0,40 | $40 |
| GPT-6.2 Sol | $2 | $0,10 | $10 |

Tarif di atas per 1 juta token, sesuai pengumuman resmi OpenAI.

## Contoh panggilannya lewat API

Biar kebayang cara pakainya, ini contoh singkat pemanggilan API dengan dua model itu. Ini cuma contoh pemakaian, bukan hasil uji, dan ID modelnya sudah sesuai pengumuman resmi.

```python
from openai import OpenAI

client = OpenAI()

# Tugas berat, pakai Astra
tugas_berat = client.chat.completions.create(
    model="gpt-6.2-astra",
    messages=[{"role": "user", "content": "Analisis laporan ini dan susun rencana kerjanya."}],
)

# Tugas harian, pakai Sol
tugas_harian = client.chat.completions.create(
    model="gpt-6.2-sol",
    messages=[{"role": "user", "content": "Buatkan outline artikel tentang AI gratis."}],
)
```

Tinggal ganti nilai modelnya kalau lo mau [pindah dari satu model ke model lain](/artikel/memilih-model-ai-gratis/). Sisanya sama, karena keduanya dipanggil lewat API yang sama.

## Angka benchmarknya, dan kenapa lo harus baca dengan satu catatan

Semua angka di bagian ini adalah klaim OpenAI dari benchmark pilihannya sendiri, bukan hasil uji independen. Itu penting, karena angka benchmark dari pembuat model hampir selalu menampilkan sisi terbaik modelnya.

Di Agents' Last Exam, benchmark yang menguji kerja profesional berlapis, GPT-6.2 Astra mencetak rekor baru menurut OpenAI. Skornya 5,2 poin lebih tinggi dari GPT-6 Astra dengan biaya kurang dari sepertiga per tugas, dan 5,5 poin di atas Claude Fable 5.2 dengan biaya cuma 5 persen.

Sol justru yang paling menarik di sini. Di FrontierCode 2.0 dari Cognition, Sol berada dalam 0,5 poin dari Astra dengan biaya sekitar seperlima. Di evaluasi LifeVal yang mengukur tugas sehari hari yang menantang, Sol bahkan mengungguli GPT-6 Astra dengan biaya sekitar sepertujuh. Sementara Astra mencetak rekor baru di Terminal-Bench-Science 0.1, 9 poin di atas GPT-6 Astra dengan biaya kurang dari sepertiga.

Minggu yang sama, [Qwen4-Max dari Alibaba](/artikel/qwen4-max/) juga rilis dan membawa klaim serupa soal biaya tugas yang turun. Persaingan model flagship sekarang bukan cuma soal siapa paling pintar, tapi juga soal siapa yang bikin tagihan paling ringan.

## Astra tembus ambang yang belum pernah dicapai model OpenAI sebelumnya

Ada satu klaim di pengumuman ini yang jarang dibahas tapi besar maknanya. GPT-6.2 Astra adalah model pertama OpenAI yang dirilis ke publik dan mencapai ambang High buat AI self improvement dalam Preparedness Framework. Ambang itu mengukur kemampuan model mempercepat riset AI.

Dengan kata lain, OpenAI menilai model ini bisa mempercepat riset AI secara material, termasuk risetnya sendiri. Itu kabar baik buat kecepatan pengembangan AI, dan di saat yang sama jadi alasan kenapa bagian pengamanan di pengumuman ini ditulis dengan nada yang lebih serius dari biasanya.

## Di sisi lain, pengamanan sibernya justru diperketat

Kedua model memenuhi ambang Critical buat kemampuan keamanan siber dan ambang High buat kemampuan biologis dan kimia dalam Preparedness Framework. Karena kemampuannya meningkat, OpenAI meluncurkan keduanya dengan pengamanan yang lebih ketat buat bantuan keamanan siber berisiko tinggi.

The Neuron mencatat pengamanan yang diperketat ini menyasar permintaan yang bisa membantu penyerang mengeksploitasi kerentanan perangkat lunak. Jadi rilis ini datang sepaket, model lebih kuat di satu sisi, pagarnya ditebalkan di sisi lain.

## Yang OpenAI akui sendiri, model ini kadang diam saat tugasnya mentok

Bagian paling jujur dari pengumuman ini ada di dekat akhirnya. Dalam dua tes simulasi kerja, kedua model lebih cenderung tidak menyebut kendala yang memblokir pekerjaan mereka, misalnya file yang hilang atau tool pencarian yang tidak tersedia.

OpenAI menambahkan instruksi di Codex yang menurut mereka mengurangi kelalaian ini secara substansial, dan mereka masih menyelidiki perilakunya. Itu pengakuan yang layak diapresiasi, karena model yang diam saat mentok lebih berbahaya daripada model yang salah tapi berisik.

Jadi kalau lo pakai model ini buat kerja berlapis di Codex, jangan anggap diam berarti beres. Cek hasilnya, terutama kalau ada file atau tool yang harusnya dipakai di tengah jalan. Modelnya lebih murah dan menurut OpenAI lebih kuat, tapi bagian yang paling menentukan tetap cara lo memakainya.

## Sumber

- [OpenAI, Introducing GPT-6.2 Astra and Sol](https://openai.com/index/introducing-gpt-6-2-astra-sol/)
- [Forum resmi OpenAI, GPT-6.2 Astra and Sol are now available](https://community.openai.com/t/gpt-6-2-astra-and-sol-are-now-available/1417531)
- [The Neuron, Everything that happened in AI today, Wednesday November 18 2026](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-november-18-2026/)
