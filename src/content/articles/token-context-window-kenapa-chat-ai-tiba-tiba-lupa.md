---
title: "Token dan Context Window Itu Apa, Kenapa Chat AI Lo Tiba-tiba Lupa"
description: "Token AI dan context window bikin chat AI lo tiba-tiba lupa di tengah percakapan panjang. Pahami cara kerjanya dan trik biar chat lo tetap nyambung."
category: edukasi
tags: ["Token AI", "Context Window", "ChatGPT", "Claude", "Gemini"]
author: xdirga
publishedAt: 2026-11-22T07:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/token-context-window-kenapa-chat-ai-tiba-tiba-lupa.jpg
coverAlt: "Ilustrasi jendela konteks dan potongan teks yang terpotong di tepinya"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

```
Lo: Nama proyek gue apa, masih inget kan
AI: Tentu, proyek lo namanya...
Lo: Terus rencana minggu depan yang udah kita bahas panjang lebar tadi gimana
AI: Maaf, gue nggak nemu pembahasan itu di percakapan ini
```

Kalau lo pernah ngalamin momen kayak gitu, lo nggak sendirian. AI lo nggak rusak dan nggak ngambek. Jendela konteksnya penuh, dan bagian awal percakapan lo udah dibuang buat ngasih ruang ke pesan yang baru.

Dua konsep di balik semua itu namanya token dan context window. Sekali lo paham dua hal ini, lo langsung ngerti kenapa chat panjang makin lama makin ngawur, dan lo bisa ngakalinnya biar chat lo tetap nyambung.

## Token itu bukan kata

Model AI nggak baca teks kayak lo baca buku. Sebelum diolah, teks lo dipotong potong dulu jadi unit kecil yang namanya token. Satu token bisa jadi satu karakter, sebagian kata, satu kata utuh, atau tanda baca. Spasi pun ikut ngaruh ke cara teks dipotong.

Coba lihat kalimat "tiktoken is great!" yang dipecah jadi enam token. Potongannya t, ikt, oken, spasi yang nempel di is, spasi yang nempel di great, dan tanda seru. ID tokennya 83, 8251, 2488, 382, 2212, dan 0. Kata yang di mata lo kelihatan utuh ternyata bisa jadi tiga potong di mata model, dan spasi itu nempel ke kata setelahnya, dia nggak berdiri sendiri.

Buat ngira ngira ukurannya, OpenAI ngasih patokan kasar buat teks Inggris. Satu token kira kira empat karakter, satu token kira kira tiga perempat kata, dan seratus token kira kira tujuh puluh lima kata. Google ngasih patokan yang mirip buat model Gemini, satu token setara kira kira empat karakter dan seratus token setara kira kira enam puluh sampai delapan puluh kata Inggris. Intinya sama, ini cuma perkiraan kasar, jangan dipegang sebagai hitungan pasti.

Kode singkat di bawah ini ngitung perkiraan token dari teks pakai patokan empat karakter per token, terus motong teks panjang jadi beberapa chunk. Ingat, ini cuma perkiraan kasar dari aturan OpenAI, jangan dikira hasil jalanin tokenizer beneran. Kalau lo butuh angka pastinya, tiap provider nyediain alat hitung sendiri yang bakal dibahas di bagian bawah.

```python
def perkiraan_token(teks):
    return max(1, len(teks) // 4)


def potong_chunk(teks, maks_token=1000):
    maks_karakter = maks_token * 4
    return [teks[i:i + maks_karakter] for i in range(0, len(teks), maks_karakter)]


teks = "Tulis di sini teks panjang yang mau lo kirim ke AI"
print(perkiraan_token(teks))
print(potong_chunk(teks, maks_token=10))
```

## Jendela yang ukurannya tetap

Token itu bahan bakarnya, context window itu wadahnya. Anthropic ngejelasin context window sebagai semua teks yang bisa dirujuk model waktu bikin jawaban, termasuk jawabannya sendiri. Ini beda dari data latih model. Kalau data latih itu pengetahuan yang udah nempel di model, context window itu memori kerjanya, tempat dia naruh percakapan yang lagi jalan.

Bayangin meja kerja yang ukurannya tetap. Lo bisa naruh makin banyak kertas di atasnya, tapi luas mejanya nggak ikut nambah. Makin penuh mejanya, makin susah lo nemu kertas yang lo butuhin. Begitu juga model. Ruang yang lebih lapang bikin model lebih leluasa ngolah prompt yang panjang dan rumit, tapi menumpuk konteks tanpa milih isinya bukan jaminan jawaban makin bagus.

Semua yang ada di request ikut ngitung ke jendela itu. System prompt ikut, semua pesan ikut, termasuk hasil tool, gambar, dan dokumen. Definisi tool ikut, dan output yang dihasilkan model di giliran itu ikut juga, termasuk extended thinking. Token makin numpuk tiap giliran karena seluruh riwayat percakapan dikirim ulang dari awal.

## Tiga alasan kenapa chat panjang bikin AI lupa

### Riwayat percakapan dikirim ulang tiap giliran

Tiap kali lo kirim pesan baru, model nggak cuma baca pesan itu. Dia baca ulang seluruh percakapan dari awal sampai akhir. Makin panjang chat lo, makin besar beban yang dia pikul tiap kali jawab, dan makin cepat jendelanya penuh.

### Pesan tertua dibuang duluan saat jendela penuh

Antarmuka chat kayak claude.ai ngatur jendela ini dengan cara yang masuk duluan dibuang duluan. Begitu jendela penuh, konten tertua dicopot buat ngasih tempat ke pesan baru. Nama proyek yang lo sebut di awal, instruksi yang lo kasih di pesan kelima, semuanya bisa hilang tanpa pemberitahuan.

### Konteks yang kepanjangan bikin akurasi turun

Anthropic nyebut fenomena ini context rot. Seiring jumlah token bertambah, akurasi dan daya ingat model menurun. Jadi masalahnya nggak cuma lupa, jawaban di chat yang konteksnya udah kepanjangan juga makin gampang ngawur. Kalau lo curiga jawabannya mulai ngawur, cek dulu klaimnya satu per satu dengan [metode klaim per klaim](/artikel/cara-cek-jawaban-ai-halusinasi-klaim-per-klaim/). Milih isi konteks sama pentingnya dengan seberapa besar ruangnya.

Kalau jendelanya beneran mentok, yang terjadi tergantung tempat lo ngobrol. Di API, kalau input aja udah melebihi context window, API ngebalikin error 400 dengan pesan "prompt is too long" di semua model. Di model Claude 4.5 ke atas, kalau input plus max_tokens melebihi jendela, request tetap diterima tapi generasi berhenti dengan `stop_reason` `model_context_window_exceeded` begitu jendela terisi penuh. Ada juga jalan keluar yang disiapin Anthropic, yaitu compaction, yang otomatis meringkas bagian awal percakapan di server supaya percakapan bisa lanjut melewati batas. Fitur ini masih beta dan tersedia buat model Claude 4.6 ke atas.

## Seberapa besar sih jendela model sekarang

Angka di tabel ini diambil dari halaman model resmi masing masing provider. Model flagship sekarang rata rata punya jendela satu juta token, tapi generasi sebelumnya jauh lebih kecil, dan itu ngaruh banget ke seberapa panjang chat lo bisa jalan sebelum mulai lupa.

| Model | Context window | Output maksimal |
| --- | --- | --- |
| GPT-6.2 Astra, GPT-6.2 Sol, GPT-6.1 Terra, GPT-6 Luna | 1,05 juta token | 128 ribu token |
| Claude Fable 5.2, Claude Opus 5.5, Claude Sonnet 5.5, Claude Haiku 5.5 | 1 juta token | 128 ribu token |
| Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5 | 200 ribu token | 64 ribu token |
| Gemini 4 Carbon, Gemini 4 Neon, Gemini 4 Hydrogen, Gemini 4 Argon | 1 juta token | 64 ribu / 1 juta token |
| Gemini 3.8 Flash | 1.048.576 token | 65.536 token |

Biar kebayang skalanya, pakai patokan OpenAI tadi, jendela satu juta token itu nampung kira kira tujuh ratus lima puluh ribu kata Inggris. Itu setara beberapa novel panjang atau satu codebase ukuran menengah. Kedengeran gede, tapi ingat, semua pesan lo dan semua jawaban model ikut ngitung, jadi di chat yang aktif banget, angka segede itu bisa habis juga.

## Token juga dihitung waktu lo nggak sadar

Token input dan token output dihitung terpisah. Token input itu token yang lo kirim ke model dalam satu request, token output itu token yang dihasilkan model. Tarif API pun bisa beda per kategori token. Token reasoning, yaitu proses mikir internal model, nggak kelihatan sebagai teks jawaban, tapi tetap dihitung sebagai token output dan ditagih sebagai output.

Bukan cuma teks yang makan token. Semua input ke Gemini API dihitung sebagai token, termasuk gambar, video, dan audio. Gambar yang kedua sisinya sampai 384 piksel dihitung 258 token, audio 32 token per detik, dan video 263 token per detik buat pemrosesan statis. Jadi tiap kali lo nempel gambar atau kirim voice note ke AI, jendela lo ikut kemakan tanpa lo sadar.

Buat yang pakai API, tarif per satu juta token beda beda tiap model dan berubah berkala, jadi selalu cek tanggal berlakunya. Gemini 3.8 Flash misalnya, tarifnya 0,75 dolar buat input dan 3,75 dolar buat output per satu juta token sampai 31 Desember 2026, lalu naik jadi 1,50 dolar dan 7,50 dolar mulai 1 Januari 2027. Gemini 4 Carbon dan Gemini 4 Argon dipatok 2 dolar buat input dan 10 dolar buat output per satu juta token sampai 30 November 2026, lalu naik jadi 4 dolar dan 20 dolar mulai 1 Desember 2026. Di tier gratis Gemini, Gemini 3.8 Flash gratis dipakai, sementara Gemini 4 Carbon dan Gemini 4 Argon nggak tersedia di tier gratis.

Di chat langganan kayak ChatGPT atau Claude, semua hitungan ini disembunyiin di balik biaya bulanan dan batas pemakaian. Kalau lo masih bingung milih yang mana, baca dulu [perbandingan ChatGPT, Gemini, dan Claude gratis](/artikel/chatgpt-vs-gemini-vs-claude-gratis/) biar lo tahu batas tiap model sebelum mulai chat panjang. Lo nggak lihat angka tokennya, tapi matematika yang sama tetap jalan di baliknya. Chat panjang tetap makan jendela, tetap numpuk token tiap giliran, dan tetap berujung pada pesan tertua yang dibuang.

Kalau lo mau ngitung sebelum kirim, tiap provider nyediain alatnya. OpenAI punya Tokenizer dan library tiktoken, plus API penghitung input token yang gratis dan nggak makan kuota inferensi normal. Anthropic punya endpoint `count_tokens`, dan Google punya metode `countTokens` di Gemini API.

## Biar chat lo tetap nyambung

OpenAI ngasih beberapa saran praktis kalau input lo kegedean. Persingkat atau susun ulang prompt lo, buang konteks yang nggak perlu atau keulang, pecah input besar jadi bagian bagian kecil, dan ringkas dulu teksnya sebelum dikirim. Buat dokumen panjang, lo bisa minta ringkasannya dulu pakai [NotebookLM gratis](/artikel/rangkum-pdf-materi-belajar-notebooklm-gratis/) sebelum nempel isinya ke chat. Kedengeran sepele, tapi itu cara paling langsung buat ngasih ruang napas ke jendela lo.

Satu kebiasaan yang paling gampang dan paling ngaruh adalah mulai chat baru buat topik baru. Tiap pesan ngirim ulang seluruh percakapan sejauh ini, jadi chat panjang makin mahal per giliran dan makin mendorong materi lama ke tepi jendela. Chat baru itu kayak meja kerja yang dibersihin, lo mulai dari ruang kosong dan cuma naruh kertas yang relevan.

Kalau chat lo udah panjang dan masih lo butuhin, tulis ulang poin pentingnya dalam satu pesan singkat sebelum lanjut. Nama proyek, keputusan yang udah disepakati, dan instruksi yang masih berlaku, tulis lagi dengan kata kata lo sendiri. Itu cara paling murah buat narik materi lama balik ke dalam jendela sebelum dia dibuang.

## Cek kilat 10 detik sebelum lo kirim pesan panjang

Sebelum lo pencet kirim buat pesan panjang, jawab tiga pertanyaan ini di kepala lo.

1. Pesan ini masih satu topik sama chat yang udah jalan, atau sebenarnya udah topik baru yang pantas dapat chat sendiri?
2. Ada info penting dari awal chat yang masih lo butuhin, dan udah lo tulis ulang singkat di pesan ini?
3. Teks yang lo tempel beneran dibutuhin semua, atau sebagian bisa lo ringkas dulu sebelum dikirim?

## Sumber

- [OpenAI, What are tokens and how to count them](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)
- [Anthropic, Context windows](https://docs.claude.com/en/docs/build-with-claude/context-windows)
- [Anthropic, Models overview](https://docs.claude.com/en/docs/about-claude/models/overview)
- [Google, Tokens](https://ai.google.dev/gemini-api/docs/tokens)
- [Google, Gemini models](https://ai.google.dev/gemini-api/docs/models)
- [Google, Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash)
- [Google, Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [OpenAI, Models](https://platform.openai.com/docs/models)
- [codewithkg, Tokens and Context Windows](https://codewithkg.com/topics/tokens-and-context-windows/)
- [The AI Rankings, AI Tokens](https://theairankings.com/guides/ai-tokens/)
