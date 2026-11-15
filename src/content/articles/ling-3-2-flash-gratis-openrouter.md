---
title: "Ling 3.2 Flash Gratis di OpenRouter: Model 1 Juta Token Tanpa Bayar"
description: "Ling 3.2 Flash dari inclusionAI kini gratis di OpenRouter sejak 13 November 2026, dengan konteks 1.048.576 token dan harga nol untuk prompt maupun completion."
category: berita
tags: ["Ling 3.2 Flash", "OpenRouter", "AI gratis", "Berita"]
author: xdirga
publishedAt: 2026-11-15T06:37:00+07:00
updatedAt: 2026-11-15
lastVerifiedAt: 2026-11-15
status: published
featured: false
trending: true
cover: /covers/ling-3-2-flash-gratis-openrouter.jpg
coverAlt: "Ilustrasi abstrak jendela konteks panjang dan chip AI di atas meja kerja tanpa orang, warna magenta dan cyan"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Lo pernah ngerasa model AI gratis itu selalu pelit konteks? Dokumen panjang dikit langsung kepotong, percakapan panjang langsung lupa awalnya. Nah, ada kabar yang lumayan bikin senyum buat lo yang suka eksperimen tanpa keluar duit, dan Ling 3.2 Flash gratis di OpenRouter bisa jadi jawabannya. Kabar kayak gini bakal muncul sendiri di pembaca RSS lo kalau lo mengikuti blog ini lewat [umpan RSS](/artikel/cara-kerja-rss/).

## Ling 3.2 Flash Gratis sejak 13 November 2026

Ling 3.2 Flash dari inclusionAI sudah bisa dipakai gratis lewat OpenRouter sejak 13 November 2026. Halaman resmi OpenRouter mencatat tanggal rilisnya, dan harganya nol untuk token prompt maupun completion. Konteksnya 1.048.576 token, dengan completion maksimum 262.144 token. Buat gambaran, itu ruang kerja yang lega banget buat olah dokumen panjang atau percakapan yang muter muter tanpa takut kepotong di tengah jalan.

## Apa itu Ling 3.2 Flash

Model ini bikinan inclusionAI, lab AI di bawah Ant Group. Menurut laporan peluncuran, Ling 3.2 Flash meluncur pada 5 November 2026 sebagai model multimodal Mixture of Experts dengan 560 miliar parameter total dan 25 miliar parameter aktif per token. Dia multimodal native, jadi bisa ngelihat gambar dan video, bukan cuma baca teks.

Di OpenRouter, dia nerima teks dan gambar, sampai 200 gambar dalam satu request, terus ngembaliin teks. Mode thinkingnya bisa lo matiin per request kalau mau jawaban cepat tanpa penalaran panjang. Dia juga dukung tool calling dan structured outputs lewat JSON schema, jadi lumayan kepakai buat coding agent atau kerjaan yang butuh output rapi.

## Cara pakai dalam 3 langkah

1. Daftar akun di openrouter.ai
2. Buat API key
3. Kirim request ke model `inclusionai/ling-3.2-flash:free`

API OpenRouter itu kompatibel dengan OpenAI, jadi kebanyakan SDK tinggal ganti base URL. Contoh panggilannya seperti ini.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="ISI_API_KEY_LO",
)

response = client.chat.completions.create(
    model="inclusionai/ling-3.2-flash:free",
    messages=[{"role": "user", "content": "Halo, siapa kamu?"}],
)

print(response.choices[0].message.content)
```

## Batasnya, jujur saja

Gratis di sini bukan berarti tanpa batas. Varian gratis yang ID-nya berakhiran free dibatasi 20 request per menit dan 50 request per hari. Jatah hariannya naik jadi 1.000 request per hari kalau akun lo udah beli kredit 10 dolar, dan percobaan yang gagal tetap dihitung ke jatah harian.

Model ini juga cuma dilayani satu provider, Ant Digital, tanpa routing ke provider lain. Satu hal lagi yang perlu lo tahu, tidak ada tanggal berakhir yang dipublikasikan untuk rute gratis ini di halaman resmi OpenRouter. Jadi nikmati selagi ada, tapi jangan bangun layanan yang hidup matinya bergantung sama [jatah gratis](/artikel/layanan-ai-gratis-makin-ketat/) ini.

Itu tadi soal OpenRouter. Terpisah dari itu, API resmi Ant Ling digratiskan selama dua minggu pertama setelah peluncuran. Penawarannya beda, jadi jangan dicampur sama rute gratis di OpenRouter.

## Cocok buat lo yang suka ngoprek

Buat lo yang doyan ngulik, ini bahan eksperimen yang nggak nguras kantong. Coba buat ngolah dokumen panjang, bangun coding agent sederhana, atau sekadar bandingin jawabannya sama [model gratis lain](/artikel/7-api-llm-gratis-tanpa-tanggal-berakhir/) yang biasa lo pakai. Kalau lo mau bandingin sama chatbot gratis yang paling populer, baca dulu [perbandingan ChatGPT vs Gemini vs Claude gratis](/artikel/chatgpt-vs-gemini-vs-claude-gratis/). Kalau lo penasaran, tinggal daftar, bikin API key, terus kirim request pertama lo hari ini juga.

## Sumber

- [Halaman model Ling 3.2 Flash di OpenRouter](https://openrouter.ai/inclusionai/ling-3.2-flash:free)
- [Koleksi model gratis OpenRouter](https://openrouter.ai/collections/free-models)
- [Laporan peluncuran Ling 3.2 Flash di AI Compass](https://ashutoshai.com/ai-compass/2026/11/05/inclusionai-ling-3-2-flash/)
- [Panduan Ling 3.2 Flash di FreakyJolly](https://freakyjolly.com/ling-3-2-flash-guide/)
- [Cara klaim di aifree.dev](https://aifree.dev/news/ling-3-2-flash-free-on-openrouter)
