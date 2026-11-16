---
title: "Ollama, Jalankan AI Gratis di Laptop Lo Tanpa API Key"
description: "Ollama bikin lo ngechat sama model AI langsung dari laptop sendiri, gratis, tanpa API key, dan tanpa data dikirim ke server. Ini cara instal dan model kecilnya."
category: teknologi
tags: ["Ollama", "AI Lokal", "Model AI", "LLM", "Privasi"]
author: xdirga
publishedAt: 2026-11-16T07:00:00+07:00
status: published
featured: false
trending: false
cover: /covers/ollama-jalankan-ai-gratis-di-laptop-sendiri.jpg
coverAlt: "Ilustrasi laptop di atas meja kerja dengan jendela chat AI di layar dan ikon gembok kecil di sampingnya"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Lo pernah kepikiran buat ngechat sama AI tanpa buka situs web, tanpa langganan, dan tanpa data lo dikirim ke server orang lain? Kedengeran kayak mimpi, tapi itu persis yang dilakuin Ollama. Lo instal satu aplikasi, unduh satu model, terus lo bisa ngobrol sama AI langsung dari laptop lo sendiri.

Ollama bukan chatbot baru. Dia alat buat jalanin model AI terbuka di komputer lo. Dan karena modelnya jalan lokal, lo nggak butuh API key dan nggak bayar per token.

## Apa itu Ollama

Intinya, Ollama itu cara buat jalanin model AI terbuka di komputer lo sendiri, bisa juga di cloud kalau lo mau. Di halaman utamanya, Ollama nyebut dirinya cara paling populer buat bangun sesuatu pakai model terbuka, dan mereka janji prompt lo nggak pernah disimpan atau dipakai buat latihan model.

Ollama itu gratis dan open source berlisensi MIT, kode sumbernya ada di github.com/ollama/ollama. Popularitasnya bukan main main. Halaman utama Ollama mencatat lebih dari 9 juta instalasi per bulan dan lebih dari 1 miliar unduhan model. Angka itu klaim dari Ollama sendiri, tapi tetap nunjukin seberapa luas alat ini dipakai.

Yang bikin Ollama beda dari layanan AI biasa adalah tempat modelnya jalan. Di layanan biasa, prompt lo dikirim ke server perusahaan. Di Ollama, model lokal jalan di laptop lo sendiri. Kalau lo mau bandingin dulu paket gratis layanan cloud, baca [perbandingan ChatGPT, Gemini, dan Claude gratis](/artikel/chatgpt-vs-gemini-vs-claude-gratis/).

## Kenapa menarik buat lo

Yang paling kerasa duluan itu gratisnya. Buat model lokal, lo nggak perlu API key sama sekali. API key cuma dibutuhkan kalau lo pakai model cloud Ollama. Jadi selama lo main di model lokal, nggak ada akun yang wajib dibuat dan nggak ada tagihan yang muncul di akhir bulan.

Terus soal privasi. Waktu lo jalanin model lokal, Ollama nggak bisa ngintip prompt atau data lo. Kalau lo pakai model cloud, Ollama memang memproses prompt dan respons buat nyediain layanan, tapi isinya nggak disimpan, nggak dicatat, dan nggak pernah dipakai buat latihan model. Ollama juga nggak menjual data pengguna, dan lo bisa hapus akun lo kapan aja.

Buat lo yang sering nanya hal sensitif ke AI, entah itu draf kerjaan, isi chat pribadi, atau dokumen yang belum boleh bocor, ini beda besar. Data lo tetap di laptop lo. Buat layanan AI yang datanya masih lewat server, cek dulu [data yang jangan pernah lo upload ke AI gratis](/artikel/aman-pakai-ai-gratis-data-jangan-upload/).

## Cara instalasi

Ollama tersedia buat macOS, Windows, dan Linux. Cara paling gampang adalah unduh dari ollama.com, lalu buka aplikasinya atau mulai dari terminal.

Kalau lo lebih nyaman instal lewat terminal, ini perintah resminya. Di macOS atau Linux, jalankan perintah berikut.

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Di Windows, jalankan perintah berikut di PowerShell.

```powershell
irm https://ollama.com/install.ps1 | iex
```

## Perintah pertama lo

Setelah Ollama terinstal, lo cukup jalankan satu perintah buat mulai ngechat sama model. Contoh resmi di dokumentasi pakai model `gemma4:e2b`.

```bash
ollama run gemma4:e2b
```

Ollama bakal mengunduh modelnya dulu, lalu membuka chat di komputer lo. Buat keluar dari chat, ketik `/bye`.

Satu catatan penting sebelum lo gas perintah itu. Model `gemma4:e2b` unduhannya sekitar 7,2 GB dan Ollama merekomendasikan VRAM 8 GB yang tersedia, atau unified memory di Mac. Jendela konteks yang lebih besar butuh memori lebih banyak. Kalau VRAM lo lebih kecil, Ollama bisa pakai RAM sistem, tapi responsnya bisa lebih lambat. Jadi buat percobaan pertama, model yang lebih kecil jauh lebih bersahabat.

## Model kecil buat laptop biasa

Library resmi Ollama isinya banyak banget, tapi buat laptop biasa, mulai dari yang kecil dulu. Ini beberapa model yang bisa lo coba.

```bash
ollama run llama3.2
ollama run qwen3:0.6b
ollama run gemma3:1b
ollama run mistral
```

Llama 3.2 dari Meta tersedia dalam ukuran 1B dan 3B, jadi cocok buat mesin yang speknya pas pasan. Kalau lo mau milih berdasarkan tugasnya bukan namanya, baca [cara memilih model AI gratis buat tugas sehari hari](/artikel/memilih-model-ai-gratis/). Qwen3 punya varian yang ukurannya jelas banget. Varian 0.6b cuma 523 MB, varian 1.7b sekitar 1,4 GB, varian 4b sekitar 2,5 GB, dan varian 8b sekitar 5,2 GB. Gemma3 dari Google itu keluarga model ringan yang dibangun di atas teknologi Gemini, ukurannya dari 270M sampai 27B. Mistral itu model 7B berlisensi Apache.

Kalau lo penasaran sama model yang lebih besar, ada juga `qwen3:14b` sekitar 9,3 GB dan `qwen3:235b` yang unduhannya 142 GB. DeepSeek R1 juga ada di library, dengan varian distilled dari 1.5B sampai 70B plus model penuh 671B. Jelas, yang segede itu bukan buat laptop biasa. Tapi justru di situ enaknya Ollama. Lo bisa naik ukuran model pelan pelan sesuai kemampuan laptop lo, tanpa ganti alat.

## Soal hardware, jujur aja

Bagian ini penting biar lo nggak kecewa. Kecepatan model lokal tergantung hardware. Model besar lambat di komputer tanpa GPU yang kuat. Itu pernyataan resmi Ollama sendiri, bukan tebakan.

Buat GPU, Ollama bisa manfaatin Nvidia dengan compute capability 5.0 ke atas dan driver versi 550 ke atas, AMD Radeon lewat ROCm atau Vulkan, dan GPU Apple lewat Metal API. Di Windows dan Linux, dukungan GPU tambahan disediakan lewat Vulkan.

Artinya, laptop dengan GPU lumayan bakal ngerasain respons yang jauh lebih gesit. Laptop tanpa GPU khusus tetap bisa jalan, tapi lo harus sabar dan pilih model kecil. Sekali lagi, jangan maksa model gede di laptop kentang. Mulai dari yang kecil, rasain dulu, baru naik.

## Yang gratis dan yang berbayar

Di sinilah banyak orang ketuker. Ollama itu gratis buat model lokal, tapi model cloud itu cerita lain. Model cloud jalan di server Ollama, jadi cepat di komputer apa pun dan nggak perlu diunduh. Di CLI, nama model cloud berakhiran `:cloud`, misalnya `gemma4:cloud`. Model cloud butuh kredit pemakaian atau paket berbayar, dan butuh akun Ollama.

Jadi kalau lo lihat ada model `:cloud`, itu bukan model lokal. Jangan sampai lo kira semuanya gratis tanpa batas, terus kaget pas diminta bayar. Selama lo pakai model tanpa akhiran `:cloud`, lo main di wilayah gratis.

## Mode lokal saja buat privasi maksimal

Buat lo yang mau privasi maksimal, Ollama bisa jalan dalam mode lokal saja dengan mematikan fitur cloud sepenuhnya. Caranya lewat pengaturan `disable_ollama_cloud` di file `~/.ollama/server.json`, atau lewat variabel lingkungan `OLLAMA_NO_CLOUD=1`.

Konsekuensinya, lo nggak bisa lagi pakai model cloud Ollama dan pencarian web. Tapi sebagai gantinya, lo dapat kepastian penuh kalau semua yang lo ketik tetap di laptop lo. Server Ollama sendiri secara default terikat ke 127.0.0.1 port 11434, jadi dia memang dirancang buat jalan lokal sejak awal.

## Langkah berikutnya

Unduh Ollama dari ollama.com, instal sesuai sistem operasi lo, lalu coba perintah pertama dengan model kecil kayak `ollama run qwen3:0.6b` yang unduhannya cuma 523 MB. Kalau udah nyaman, naik pelan pelan ke model yang lebih besar, atau aktifin mode lokal saja kalau privasi jadi prioritas utama lo. AI gratis di laptop sendiri itu nyata, asal lo tahu mana yang lokal dan mana yang cloud.

## Sumber

- [Ollama](https://ollama.com/)
- [Ollama Quickstart](https://docs.ollama.com/quickstart.md)
- [Ollama FAQ](https://docs.ollama.com/faq.md)
- [Ollama GPU](https://docs.ollama.com/gpu.md)
- [Ollama Cloud](https://docs.ollama.com/cloud.md)
- [Ollama Download](https://ollama.com/download)
- [Ollama Library Llama 3.2](https://ollama.com/library/llama3.2)
- [Ollama Library Mistral](https://ollama.com/library/mistral)
- [Ollama Library Gemma 3](https://ollama.com/library/gemma3)
- [Ollama Library Qwen 3](https://ollama.com/library/qwen3)
- [Ollama Library DeepSeek R1](https://ollama.com/library/deepseek-r1)
- [Wikipedia Ollama](https://en.wikipedia.org/wiki/Ollama)
- [Ohio Supercomputer Center Ollama](http://www.osc.edu/resources/available_software/software_list/ollama)
