---
title: "6 Update AI Terbaru dari Pocket TTS sampai Kimi K3 di CPU"
description: "Enam update AI yang sudah diverifikasi satu per satu, dari Pocket TTS yang kloning suara di CPU sampai Kimi K3 yang jalan di satu CPU."
category: teknologi
tags: ["Update AI", "Pocket TTS", "Qwen 3.8 Max", "Kimi K3", "Grok Imagine", "Muse Code"]
author: xdirga
publishedAt: 2026-11-16T15:41:00+07:00
lastVerifiedAt: 2026-11-16
status: published
featured: false
trending: true
cover: /covers/6-update-ai-pocket-tts-kimi-k3.jpg
coverAlt: "Ilustrasi abstrak gelombang suara magenta dan cyan yang mengalir ke gugus neural di latar teal gelap"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Lo mungkin sudah lihat reel yang nyebut enam update AI sekaligus. Ide artikel ini memang berawal dari [reel Instagram @garrytechstuff](https://www.instagram.com/reel/DcgC7o4SPf4/?srtk=MmFyaDljaTViaDV6) itu, tapi reel cuma jadi pemantik. Semua fakta di bawah ini sudah dicek ke halaman resmi tiap pembuatnya, dan beberapa klaim viral ternyata meleset lalu diluruskan di sini.

## Pocket TTS, Kloning Suara yang Jalan di CPU

Pocket TTS adalah proyek pengubah teks jadi suara dari Kyutai yang jalan efisien di CPU, tanpa GPU dan tanpa API web. Di CPU MacBook Air M4, alat ini menghasilkan audio sekitar 6 kali lebih cepat dari waktu nyata. Modelnya kecil, 100 juta parameter.

Yang bikin ramai adalah kloning suara dari file wav biasa, dipasang lewat satu perintah `uvx pocket-tts generate`. Kodenya MIT, bobot modelnya CC BY 4.0. Tapi bobot kloning itu gated di Hugging Face, jadi lo perlu akun dan login dulu. Di Linux, instalasi pip biasa ikut mengunduh runtime CUDA sekitar 3 GB. Bahasa Indonesia juga belum didukung resmi, dan Kyutai melarang kloning suara tanpa izin eksplisit yang sah. Kalau lo suka AI lokal, [Ollama](/artikel/ollama-jalankan-ai-gratis-di-laptop-sendiri/) main di jalur yang sama.

## Hermes Skills Hub, Pusat Skill buat Agen AI

Hermes Agent adalah agen AI sumber terbuka dari Nous Research yang makin lama dipakai makin mumpuni. Skills Hub adalah sistem bawaannya buat mencari dan memasang skill dari berbagai registri.

Tap bawaan Hub mencakup repo skill resmi OpenAI, Anthropic, Hugging Face, dan NVIDIA yang berstatus trusted, bukan community. Masang skill tinggal satu perintah `hermes skills install openai/skills/k8s`, dan tiap skill yang dipasang melewati security scan.

Sebagian skill membungkus tool pihak ketiga dengan lisensinya sendiri, dan Hermes butuh model LLM buat jalan, jadi modelnya belum tentu gratis. Kalau lo belum kenal agen AI, baca dulu [penjelasan apa itu agen AI](/artikel/apa-itu-agen-ai/).

## Grok Imagine Image 2.0, Edit Gambar Sebagian Saja

Grok Imagine Image 2.0 adalah model gambar dari xAI yang hadir sebagai Quality Mode baru di grok.com/imagine dan aplikasi Grok. Magic wand mengedit cuma region yang lo tunjuk dan sisanya tidak berubah, segmentasi memilih area dengan presisi, dan background removal mengekspor subjek dengan latar transparan.

Multi referensi menerima hingga 5 gambar input dalam satu generasi. Soal peringkat, baca dengan tanggalnya. Saat diluncurkan 7 Agustus 2026, xAI mengklaim Image 2.0 peringkat kedua dunia di leaderboard Arena, Elo 1.439 buat image editing di bawah GPT Image 2 dengan 1.463, dan 1.320 melawan 1.380 buat text to image. Itu snapshot 7 Agustus 2026.

## Muse Code, Coding Agent Pertama Meta

Muse Code adalah coding agent pertama Meta yang jalan di terminal. Alat ini masuk beta pada 5 Agustus 2026 dengan model Muse Spark 1.2, lalu keluar dari beta pada 31 Agustus 2026. Instalasinya satu perintah curl di macOS dan Linux.

Satu tugas besar dipecah jadi beberapa sub agen yang bekerja bersamaan, tiap sub agen di git worktree terisolasi sampai enam belas sub agen, dan working copy utama lo tidak pernah tersentuh. Tapi paralel di sini artinya di dalam satu repo yang sama, bukan banyak repo sekaligus. Bandingkan dulu lewat [perbandingan alat coding AI gratis](/artikel/ai-coding-gratis-copilot-cursor-codex/).

## Qwen 3.8 Max, Model Raksasa Alibaba yang Bobotnya Dibuka

Qwen 3.8 Max adalah model paling mumpuni di keluarga Qwen saat dirilis Alibaba pada 3 Agustus 2026, itu klaim vendornya sendiri. Total 2,4 triliun parameter dengan 95 miliar yang aktif per token, memakai arsitektur MoE.

Pada 12 Agustus 2026 Alibaba merilis bobotnya sebagai varian teks saja yang selalu memakai mode thinking, sementara layanan resmi menambahkan input vision, mode tanpa thinking, dan tool bawaan. Lisensinya custom Qwen 3.8 Max License, bukan Apache 2.0.

Konteks native checkpoint terbukanya 262.144 token, sementara layanan hosted memakai 1 juta token. Artificial Analysis menaruh model ini di skor 58 pada Intelligence Index mereka, peringkat 2 dari 106 model.

## Kimi K3 di CPU Lewat kimi-k3-in-c

Bagian ini perlu diluruskan dulu. Nama yang beredar di video pendek itu tidak ada. Yang benar adalah proyek pihak ketiga bernama kimi k3 in c, sebuah inference engine C99 buatan developer independen Fareed Khan yang menjalankan model Kimi K3 milik Moonshot AI.

Model Kimi K3 sendiri memang ada, buatan Moonshot AI, total 2,8 triliun parameter dan 104 miliar aktif per token. Tiap token memilih 16 dari 896 experts, dan konteksnya 1 juta token. Bobotnya terbuka di bawah lisensi custom Kimi K3 License, bukan lisensi sumber terbuka penuh.

Engine kimi k3 in c ini menjalankan Kimi K3 di satu CPU tanpa GPU dengan RAM 8,24 GB, karena bobot model di streaming dari disk sedikit demi sedikit. Checkpointnya 1,56 TB dan lo butuh sekitar 1,7 TB disk kosong, dengan kecepatan sekitar 26,5 detik per token di RAM 8 GB. Jawaban 500 token butuh sekitar 3,7 jam. Kode enginenya Apache 2.0, tapi lisensi modelnya terpisah. Ini bukti konsep, bukan alat chat praktis.

## Penutup

Enam update ini nunjukin satu pola. AI makin bisa jalan di perangkat sendiri dan makin besar skalanya. Tapi tiap klaim viral layak dicek ulang, karena nama bisa salah eja, peringkat bisa sudah kedaluwarsa, dan gratis di satu sisi bisa berarti berbayar di sisi lain. Kalau lo mau mulai, coba Pocket TTS atau Ollama dulu.

## Sumber

Semua fakta di atas diverifikasi ke sumber resmi di bawah ini. Reel terakhir hanya inspirasi, bukan sumber fakta.

- [Repo Pocket TTS](https://github.com/kyutai-labs/pocket-tts)
- [Dokumentasi Hermes Skills Hub](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)
- [Pengumuman Grok Imagine Image 2.0](https://x.ai/news/grok-imagine-image-2)
- [Blog developer Meta tentang Muse Code](https://dev.meta.ai/resources/blog/build-with-muse-code)
- [Pengumuman Qwen 3.8 Max](https://www.alibabacloud.com/blog/qwen3-8-max-a-new-bar-for-coding-and-cowork_603421)
- [Model card Kimi K3](https://huggingface.co/moonshotai/Kimi-K3)
- [Repo kimi k3 in c](https://github.com/FareedKhan-dev/kimi-k3-in-c)
- [Reel @garrytechstuff yang jadi inspirasi](https://www.instagram.com/reel/DcgC7o4SPf4/?srtk=MmFyaDljaTViaDV6)
