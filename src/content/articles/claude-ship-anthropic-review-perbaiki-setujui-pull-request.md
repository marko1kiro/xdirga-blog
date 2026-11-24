---
title: "Claude Ship, AI Anthropic yang Review PR Sampai Approve"
description: "Anthropic meluncurkan Claude Ship pada 23 November 2026, layanan berbayar yang meninjau, memperbaiki, dan menyetujui pull request di GitHub."
category: berita
tags: ["Claude Ship", "Anthropic", "Claude Code", "AI Coding", "GitHub", "Pull Request"]
author: xdirga
publishedAt: 2026-11-24T17:37:00+07:00
status: published
featured: false
trending: false
cover: /covers/claude-ship-anthropic-review-perbaiki-setujui-pull-request.jpg
coverAlt: "Ilustrasi abstrak aliran kode dan dokumen review di atas latar gelap"
coverCaption: "Ilustrasi dibuat khusus untuk artikel ini."
---

Lo pernah buka GitHub di pagi hari lalu melihat antrean pull request yang belum ke review makin panjang. Kode lo sudah selesai sejak kemarin, tapi belum ada yang sempat baca. Reviewer lo sibuk, CI sempat merah, lalu ada merge conflict yang muncul entah dari mana. PR yang tadinya kecil jadi ngendon, dan kerjaan berikutnya ikut ketahan.

Anthropic baru saja mengumumkan sesuatu yang langsung nyenggol masalah itu. Namanya Claude Ship, layanan baru yang diumumkan pada Senin 23 November 2026 dan tersedia hari itu juga dalam status beta. Layanan ini meninjau PR, memperbaikinya, dan memutuskan mana yang siap digabung berdasarkan kebijakan yang ditetapkan tiap tim. Bedanya dengan [alat coding AI gratis](/artikel/ai-coding-gratis-copilot-cursor-codex/) yang selama ini bantu lo nulis kode, Claude Ship mengurus proses setelah PR dibuka, bagian yang selama ini paling sering bikin antrean.

## Claude Ship rilis 23 November, langsung beta

TechCrunch ikut memberitakan peluncuran yang sama di hari yang sama, jadi kabar ini bukan cuma dari halaman resmi Anthropic.

Yang bikin pengumuman ini menarik justru datang dari dapur mereka sendiri. Menurut Anthropic, di tim Claude Code, PR yang berhasil digabung lebih dari dua kali lipat dari Juni sampai September, sementara porsi PR yang dibatalkan setelah merge turun lebih dari 40 persen. Itu klaim vendor dari pemakaian internal mereka sendiri, bukan hasil pengujian independen. Angka itu menarik karena yang diukur bukan seberapa cepat kode ditulis, melainkan seberapa sering kode yang sudah masuk ternyata harus ditarik lagi.

## Tiga agen dengan tiga kerjaan berbeda

Claude Ship bukan satu agen tunggal. Layanan ini terdiri dari tiga komponen yang masing masing pegang satu tahap, dari review sampai keputusan persetujuan.

| Komponen | Status | Tugas | Boleh approve |
| --- | --- | --- | --- |
| Code Review | Umum | Meninjau PR dari berbagai sudut lalu memposting temuan yang sudah diverifikasi | Tidak, hanya memberi temuan |
| PR Steward | Beta | Membereskan CI yang gagal, merge conflict, dan feedback review, lalu berkomentar tiap habis push | Tidak, sengaja tidak boleh approve atau merge |
| Claude Approvals | Beta | Menerapkan kebijakan persetujuan dari file di repo | Ya, untuk perubahan rutin bila kebijakan mengizinkan |

Code Review sudah jalan duluan dan sekarang statusnya umum. Yang bisa lo atur adalah seberapa dalam ia memeriksa. Tim bisa memilih level Quick, Standard, atau Deep untuk tiap repositori, jadi repo yang butuh ketelitian ekstra bisa disetel lebih dalam dari repo yang isinya perubahan kecil.

PR Steward adalah tukang beres beresnya. Ia turun tangan saat CI gagal, saat ada merge conflict, dan saat ada feedback review dari Code Review, tool lain, atau anggota tim. Satu hal yang sengaja dibuat beda, ia tidak boleh menyetujui atau menggabungkan PR. Setelah setiap push, ia berkomentar menjelaskan apa yang diubah dan cara membatalkannya. Developer bisa mengarahkannya lewat komentar `@claude`, atau menghentikannya dengan `@claude stop` kalau lo merasa ia sudah cukup jauh.

## AI yang boleh menyetujui merge, dengan syarat

Bagian paling kontroversial dari Claude Ship ada di komponen ketiga, Claude Approvals. Komponen ini menerapkan kebijakan persetujuan yang ditulis tim sebagai file di repositori. Claude bisa menyetujui perubahan rutin sendiri bila kebijakan mengizinkan, atau mewajibkan persetujuan manusia untuk skenario tertentu. Anthropic menggambarkannya seperti CODEOWNERS yang lebih pintar, file penanda pemilik kode yang selama ini cuma bisa menunjuk orang, sekarang bisa menimbang aturan.

Keputusan itu bisa mempertimbangkan berbagai sinyal, termasuk temuan Code Review atau classifier yang tim lo tulis sendiri dalam bahasa natural. Jadi aturannya ditulis pakai kata kata sendiri, bukan cuma checklist kaku. Tapi Anthropic sendiri menyarankan jangan langsung percaya penuh. Mereka merekomendasikan fitur ini diaktifkan dulu dalam mode observe only untuk membangun kepercayaan, sebelum branch protection diatur agar mewajibkan lampu hijau dari Claude Approvals. TechCrunch mencatat saran yang sama, karena layanan ini masih berstatus beta.

Intinya, mode observe only memberi tim lo waktu melihat dulu seberapa akurat keputusan Claude sebelum keputusan itu benar benar mengunci merge.

## Coba sendiri lewat perintah /ship

Buat developer yang penasaran, Anthropic menyediakan jalan masuk paling gampang lewat perintah baru `/ship` di Claude Code. Alurnya begini.

1. Lo selesaikan dulu perubahan lo di Claude Code sampai siap.
2. Lo jalankan perintah `/ship`.
3. Claude push perubahan lo lalu membuka PR.
4. Claude meninjau perubahan itu sendiri.
5. Claude mengerjakan feedback review dan CI yang gagal sampai PR siap digabung.

Perintah `/ship` mulai diluncurkan di Claude Code dan aplikasi desktop pada 23 November 2026. Buat admin tim, ada jalur lain yang lebih terkontrol. Admin bisa menyalakan Code Review dan PR Steward per repositori, mengatur level review, mengatur jadwal review, dan memasang batas pengeluaran bulanan. Tim juga bisa mulai dari satu repositori dulu, lalu menjalankan kebijakan persetujuannya dalam mode observe sampai mereka percaya. Claude Ship juga bekerja dengan branch protection dan required checks yang sudah dipakai tim, jadi lo tidak perlu mengganti tooling yang ada.

## Bukan gratis, ini soal biaya dan paket

Bagian ini wajib lo baca baik baik sebelum antusias. Claude Ship adalah produk berbayar. Layanan ini tersedia untuk paket Claude Team dan Enterprise, untuk repositori di GitHub. Ia tidak tersedia untuk organisasi dengan Zero Data Retention, konfigurasi HIPAA, atau kunci enkripsi yang dikelola pelanggan sendiri.

Pemakaian Claude Ship ditagih berdasarkan token, jadi menyalakannya bisa menambah biaya organisasi. Besarnya tergantung jumlah dan ukuran PR yang dicakup, level review, seberapa sering review dijalankan, dan seberapa banyak kerja yang dilakukan PR Steward. Admin bisa mengatur batas pengeluaran untuk Code Review dan PR Steward. Claude Approvals sendiri tidak ada biaya dasar, tapi classifier di dalam kebijakan ditagih berdasarkan token yang dipakai, dan kebijakan yang memakai review Claude akan memicu Code Review yang ditagih, bahkan dalam mode observe. Menjalankan `/ship` dihitung sebagai pemakaian Claude Code biasa.

Ada satu insentif buat organisasi besar. Organisasi Claude Enterprise yang memenuhi syarat bisa mengklaim minimal 10.000 dolar kredit Claude Ship untuk dipakai dalam 30 hari sejak klaim, dengan batas klaim 15 Januari 2027 dan syarat ketentuan berlaku. Kredit ini bukan buat semua orang, hanya Enterprise yang memenuhi syarat. Kalau lo perhatikan [GPT 6.2](/artikel/gpt-6-2-astra-sol-openai/) dan [Gemini 4 Neon](/artikel/gemini-4-neon-model-baru-google/), arahnya sama, agen yang makin otonom. Bedanya, Claude Ship tidak main di area yang luas. Ia fokus ke satu titik yang paling sering bikin antrean, yaitu PR.

## Yang bisa lo lakukan sekarang

Kalau di tim lo PR sering ngendon, minggu ini lo bisa mulai dari hal kecil. Cek dulu paket Claude yang dipakai tim lo, karena Claude Ship cuma jalan di Team dan Enterprise. Terus coba perintah `/ship` di satu PR kecil yang risikonya rendah, biar lo merasakan langsung alurnya dari push sampai review.

Kalau lo admin, nyalakan Code Review dan PR Steward di satu repositori dulu, pasang batas pengeluaran bulanan, dan jalankan Claude Approvals dalam mode observe only selama beberapa minggu. Kalau tim lo masuk kategori Enterprise yang memenuhi syarat, klaim kreditnya sebelum 15 Januari 2027. Ingat saja kredit itu cuma berlaku 30 hari sejak diklaim. Satu lagi yang jangan dilewatkan, tulis kebijakan persetujuan tim lo dengan hati hati. File itulah yang nanti menentukan perubahan apa yang boleh disetujui AI sendiri dan mana yang wajib lewat tangan manusia. Kalau setelah masa observe lo merasa keputusannya bisa dipercaya, barulah sambungkan ke branch protection tim lo.

## Sumber

- [Anthropic, Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship)
- [TechCrunch, Anthropic launches Claude Ship, letting AI agents review, fix, and approve code changes](https://techcrunch.com/2026/11/23/anthropic-launches-claude-ship-letting-ai-agents-review-fix-and-approve-code-changes/)
