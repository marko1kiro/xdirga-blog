---
title: "ChatGPT Down 3,5 Jam, 75% Permintaan Gagal"
description: "Sabtu pagi 22 November 2026 ChatGPT dan API OpenAI sempat lumpuh tiga setengah jam karena maintenance database yang bikin dua replica gagal barengan."
category: berita
tags: ["ChatGPT", "OpenAI", "ChatGPT Down", "Status OpenAI"]
author: xdirga
publishedAt: 2026-11-22T17:15:00+07:00
status: published
featured: false
trending: false
cover: /covers/chatgpt-down-3-setengah-jam-75-persen-gagal.jpg
coverAlt: "Ilustrasi layar error di atas tumpukan server yang padam"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Sabtu pagi lo buka [ChatGPT](/artikel/chatgpt-wallet-agen-ai-bisa-bayar/) buat lanjutin kerjaan yang ketunda dari Jumat. Prompt lo kirim, yang balik malah error. Lo refresh, tetap error. Lo kira WiFi rumah yang bermasalah, padahal yang lagi tumbang itu OpenAI sendiri.

Selama sekitar tiga setengah jam di Sabtu pagi, ChatGPT dan API OpenAI gagal melayani sebagian besar permintaan. Puncaknya, tiga dari empat permintaan gagal. Pengguna berbayar kena juga.

## Yang sebenarnya terjadi Sabtu pagi

OpenAI menulis sendiri kronologinya di halaman status resmi mereka. Pada 21 November, antara pukul 13.48 sampai 17.21 waktu Pasifik, sebagian besar permintaan ke OpenAI gagal. Kalau dikonversi ke WIB, itu berarti Sabtu 22 November pukul 04.48 sampai 08.21 pagi. Puncak kegagalannya mencapai 75 persen di ChatGPT berbayar maupun gratis.

Yang ikut tumbang tidak cuma jendela chat. Di sisi API, layanan yang kena antara lain Chat Completions, Fine tuning, Embeddings, Images, Batch, Audio, Moderations, Realtime, dan endpoint Files. Di dalam ChatGPT sendiri, percakapan, login, pencarian, upload file, dan voice mode ikut terganggu atau gagal total.

Sekitar pukul delapan pagi WIB, layanan mulai pulih. Halaman status OpenAI sekarang menampilkan semua sistem operasional, dan pengecekan langsung ke API status mereka mengonfirmasi hal yang sama.

## Satu maintenance, dua replica tumbang barengan

Pemicunya terdengar sepele. Ada maintenance terjadwal pada layanan PostgresDB yang dipakai Primary API service milik OpenAI. Maintenance itu bikin kedua read replica dari database tersebut gagal di waktu yang sama.

Yang bikin insiden ini menarik, replica yang gagal itu cuma replica baca. Di atas kertas, replica baca itu cadangan. Kenyataannya, menurut OpenAI sendiri, replica itu ikut menahan beban kerja yang sesungguhnya. Begitu keduanya mati, jalur permintaan yang bergantung pada mereka ikut mati.

Kenapa efeknya bisa seluas itu. Primary API service ini memegang autentikasi pengguna dan autentikasi antar layanan di seluruh stack OpenAI. Jadi ketika fondasi autentikasinya goyang, hampir semua produk di atasnya ikut goyang. Login gagal, percakapan tidak bisa dibuka, API tidak bisa dipanggil. Bukan satu fitur yang rusak, tapi pintu masuknya yang macet.

## Kenapa pulihnya tidak cepat

OpenAI mengaku sudah mencoba menghidupkan lagi replica yang gagal, tapi tidak berhasil. Mereka juga mencoba menghadirkan replica pengganti di region lain, itu pun tidak berhasil. Jalan keluarnya akhirnya datang dari kerja sama dengan penyedia layanan mereka, menghadirkan dua replica baru di region yang sama sampai layanan bisa jalan lagi.

Buat pengguna, jeda tiga setengah jam itu terasa panjang. Buat tim infrastruktur, ceritanya familiar. Cadangan yang seharusnya menyelamatkan ternyata gagal di momen yang sama dengan sistem utama. Itu pelajaran klasik soal redundansi, punya dua cadangan tidak ada artinya kalau keduanya bisa mati karena satu penyebab yang sama.

Insiden ini juga bukan yang pertama dalam seminggu. Dua hari sebelumnya, 19 November, OpenAI sempat mencatat elevated error rate untuk permintaan API GPT 6 Luna. Yang itu selesai dalam waktu kurang dari satu jam. Insiden Sabtu pagi jauh lebih besar skalanya.

## Yang sudah diubah OpenAI

Di tulisan pasca insidennya, OpenAI menyebut beberapa langkah yang sudah mereka lakukan. Mereka memberlakukan moratorium untuk maintenance serupa sampai ada pemberitahuan lebih lanjut. Mereka menyesuaikan konfigurasi database untuk mengurangi connection churn. Mereka juga menambahkan feature flag yang memungkinkan trafik dialihkan dari replica secara bertahap berbasis persentase. Dan mereka sudah menguji mengarahkan 100 persen query ke primary instance untuk memverifikasi hipotesis penyebab kegagalan primary.

Untuk jangka panjang, mereka berjanji membuat proses review sebelum maintenance, memastikan kapasitas buffer tersedia sebagai hot standby selama maintenance, serta menyusun strategi pemulihan replica lag dalam jangka pendek dan perubahan arsitektur dalam jangka panjang. Mereka juga menulis akan memeriksa seluruh tumpukan infrastruktur dan layanan mereka untuk menambah redundansi dan mekanisme fail safe.

Janji seperti ini memang gampang ditulis. Ukurannya nanti kelihatan dari apakah insiden sebesar ini terulang atau tidak.

## Kalau ChatGPT down lagi, lo bisa cek sendiri

Saat ChatGPT error, hal pertama yang perlu lo pastikan adalah apakah masalahnya ada di sisi lo atau di sisi OpenAI. Cara paling cepat adalah buka halaman status resmi mereka di status.openai.com. Kalau di sana tertulis semua sistem operasional tapi ChatGPT lo tetap error, barulah masalahnya kemungkinan ada di koneksi atau perangkat lo.

Buat lo yang nyaman dengan terminal, status itu bisa dicek langsung lewat satu perintah. Perintah ini sudah dites dan hasilnya keluar seperti yang diharapkan.

```bash
curl -s https://status.openai.com/api/v2/status.json
```

Kalau hasilnya menampilkan `All Systems Operational` dengan indicator `none`, berarti layanan OpenAI sedang normal. Kalau tulisannya berubah dari itu, berarti memang ada gangguan di sisi mereka dan yang bisa lo lakukan cuma menunggu sambil menyimpan pekerjaan lo di tempat lain dulu.

Kebiasaan kecil ini berguna tidak cuma buat ChatGPT. [Layanan AI](/artikel/layanan-ai-gratis-makin-ketat/) apa pun bisa down, dan yang membedakan pengguna yang panik dengan yang tenang biasanya cuma satu hal, mereka tahu di mana harus mengecek. Kalau lo mau siap dengan [opsi lain selain ChatGPT](/artikel/chatgpt-vs-gemini-vs-claude-gratis/), perbandingan versi gratisnya sudah pernah gue bahas di sini.

## Sumber

- [OpenAI Status, Elevated Errors on API and ChatGPT](https://status.openai.com/incidents/n254wyd7nml7)
- [AI Weekly, OpenAI: Postgres replica failure peaked API, ChatGPT errors at 75%](https://aiweekly.co/alerts/openai-postgres-replica-failure-peaked-api-chatgpt-errors-at-75)
- [Paktechstan, OpenAI's 3.5-Hour Outage Failed 75% of ChatGPT Requests After Both Auth Database Replicas Crashed](https://paktechstan.com/article/openai-s-3-5-hour-outage-failed-75-of-chatgpt-requests-after-both-auth-database-replicas-crashed)
