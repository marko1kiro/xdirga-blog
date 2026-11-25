---
title: "Google Workspace MCP: REST API Agen Ditutup 1 Februari 2027"
description: "Google Workspace MCP servers dan CLI gwscli resmi. Mulai 1 Februari 2027 agen AI wajib lewat jalur MCP, bukan REST API. Cek cara pindah dan tier gratisnya."
category: berita
tags: ["Google Workspace", "MCP", "gwscli", "Agen AI", "Gmail", "Google Drive"]
author: xdirga
publishedAt: 2026-11-25T17:25:00+07:00
status: published
featured: false
trending: false
cover: /covers/google-workspace-mcp-servers-cli-ga.jpg
coverAlt: "Ilustrasi jendela terminal dan ikon aplikasi Google Workspace di atas meja kerja"
---

Bayangin lo sudah berbulan bulan bangun agen AI yang baca Gmail, cari file di Drive, lalu bikin draf balasan otomatis. Semua jalan lewat REST API, dan lo sudah hafal endpointnya di luar kepala. Integrasinya stabil, demonya mulus, dan lo tinggal poles sedikit lagi sebelum nunjukin ke tim.

Lalu Google datang dengan kabar yang mengubah semua itu. Pada 24 November 2026 Google mengumumkan Workspace MCP servers dan CLI resmi berstatus generally available, dan mulai 1 Februari 2027 agen AI wajib lewat jalur itu. REST API langsung bukan lagi pilihan buat agen. Kalau agen lo masih manggil REST API secara langsung, lo punya waktu sekitar dua bulan buat pindah jalur.

## Mulai 1 Februari 2027, REST API bukan lagi jalur agen

Aturan barunya tertulis di Workspace AI Tools Addendum. Addendum itu mewajibkan agen AI terhubung lewat Workspace MCP servers atau CLI, bukan lewat REST API tradisional. Penegakan teknisnya mulai 1 Februari 2027. Artinya ini bukan sekadar rekomendasi atau praktik terbaik yang boleh lo abaikan. Setelah tanggal itu, Google menegakkan secara teknis bahwa agen AI dan access tools sejenis harus memakai MCP servers atau CLI.

Buat developer, artinya kode agen yang hari ini manggil endpoint Gmail atau Drive langsung mesti dialihkan sebelum tenggat. Buat admin IT, ini kabar bagus. Setelah Februari, lo tidak perlu lagi menebak nebak agen mana yang diam diam mengakses data Workspace lewat jalur yang tidak terpantau, karena jalurnya cuma tinggal dua dan keduanya berada di bawah kendali admin.

Satu catatan soal tanggal. Blog workspace.google.com menampilkan metadata 25 November untuk pengumuman ini, sementara postingan Google Workspace Updates dan liputan medianya menyebut 24 November. Selisih itu berasal dari zona waktu, isi pengumumannya sama. Artikel ini memakai 24 November sebagai tanggal pengumuman.

## Dua pintu resmi yang dibuka Google

Google membuka dua pintu resmi, dan masing masing ditujukan buat jenis agen yang berbeda.

Pintu pertama adalah Workspace MCP servers, buat agen cloud dan web. Server ini dibangun di atas standar terbuka MCP, jadi agen bisa bekerja di Gmail, Google Drive, Docs, Sheets, Slides, Calendar, Chat, dan Tasks langsung dari kotaknya, tanpa integrasi khusus per aplikasi. Google Keep menyusul kemudian, statusnya masih coming soon. Tiap produk punya MCP server sendiri dengan URL masing masing, contohnya server Gmail di gmailmcp.googleapis.com dan server Drive di drivemcp.googleapis.com. Ada juga server buat People API dan Classroom. Konfigurasinya dilakukan lewat file mcp_config.json dengan OAuth 2.0.

Pintu satunya lagi adalah CLI resmi bernama gwscli, buat agen lokal dan terminal. Ini klien terminal terpadu yang menghubungkan agen AI seperti Claude Code, Codex, dan Antigravity ke layanan Google Workspace. Sasaran pemakainya adalah developer terminal, VM, dan sandbox container, plus otomatisasi workflow. Bedanya dengan MCP servers, CLI ini memberi tim sign in yang dibatasi scope dan guardrail yang diatur IT, tanpa workaround yang tidak terkelola.

Kalau lo pernah dengar proyek bernama gws, jangan dicampur. Itu proyek open source terpisah dari Maret 2026 yang README nya sendiri menyatakan bukan produk resmi Google yang didukung, dan perintahnya berbeda. CLI resmi dari pengumuman ini bernama gwscli.

## Kenapa Google maksa semua agen pindah ke MCP

Alasan Google bukan cuma soal kerapian. Cara kerja MCP beda dari REST API dalam satu hal yang penting. MCP tools mengembalikan ringkasan konteks yang disintesis di dalam batas keamanan Workspace, bukan mengunduh email dan file mentah baris demi baris lewat REST API. Hasilnya, pemakaian token lebih hemat dan latensi lebih rendah. CLI pun berjalan di terminal, tempat agen bisa merangkai banyak tools sekaligus.

Bersamaan dengan pengumuman GA ini, Google mengumumkan enam perlindungan agen AI baru. Setiap request yang masuk lewat MCP atau CLI dicek dulu sama policy, jadi tidak ada request yang lolos tanpa dicek. Agen juga punya identitas yang jelas plus kuota pemakaian sendiri, jadi ketahuan siapa yang ngapain. Buat aksi yang dampaknya besar, manusia tetap pegang kendali, agen mesti minta konfirmasi dulu sebelum jalan, mirip cara [agen AI kini bisa membayar belanja](/artikel/chatgpt-wallet-agen-ai-bisa-bayar/) tapi tetap dalam batas yang dikontrol. Admin bisa melihat dan mencabut akses agen langsung dari admin console. Pembatasan akses ke email dan file paling sensitif masih disiapkan, statusnya coming soon. Terakhir, Addendum melarang pemakaian agen AI buat aktivitas berisiko. Larangannya mencakup penyimpanan mentah permanen, pelatihan model, dan pemakaian agen AI buat scraping API Workspace. Data turunan mesti dihapus dalam jendela waktu yang ditentukan secara ketat, dan data lo wajib dihapus begitu lo memutuskan koneksi.

Agen AI dari luar juga kena aturan identitas baru. Mereka wajib memakai OAuth client ID khusus dengan opsi `Use this client for an AI-powered agent`, dipasangkan dengan scope least privilege. Persetujuan berbatas waktu menyusul kemudian. Aturan DLP, kontrol akses, dan audit logging ikut menyertai, supaya tim IT dan keamanan bisa memantau dan mengelola aksi agen. Buat yang belum paham apa itu agen AI, ada penjelasan [apa itu agen AI](/artikel/apa-itu-agen-ai/) yang bisa lo baca dulu.

## Coba gwscli di terminal lo

Bagian paling praktis dari pengumuman ini adalah CLI nya sudah bisa dicoba sekarang, dan dokumentasi resmi memberi contoh perintah yang bisa lo salin langsung.

```bash
curl -fsSL https://dl.google.com/workspace-cli/install.sh | bash
gwscli version
gwscli auth login --bundle=readonly
gwscli drive search_files --query="title contains 'Quarterly'" | jq '.files[] | {id: .id, title: .title}'
gwscli calendar list_events --show-scopes
gwscli skills install --dir ~/.agents/skills
```

Baris pertama memasang gwscli di Linux atau macOS. Baris kedua memastikan instalasinya berhasil. Loginnya pakai bundle hanya baca, jadi agen lo tidak langsung pegang izin tulis sebelum lo siap. Setelah login, lo bisa cari file Drive yang judulnya mengandung kata Quarterly, lalu menampilkan id dan judulnya lewat jq. Perintah kalender menampilkan daftar event sekaligus scope yang dipakai perintah itu. Terakhir, agent skills dipasang ke direktori agen lo.

Satu peringatan penting dari dokumentasinya. CLI ini menemukan perintah, parameter, dan skema secara dinamis saat runtime, jadi antarmuka perintah dan skema output bisa berubah tanpa kompatibilitas ke belakang. Jangan mengandalkan signature perintah yang tetap di dalam script statis. Buat lo yang biasa mengotak atik agen coding di terminal, ada baiknya baca juga [Claude Ship dari Anthropic](/artikel/claude-ship-anthropic-review-perbaiki-setujui-pull-request/) soal review dan persetujuan pull request langsung dari chat.

## MCP lawan REST API langsung

Biar gampang dibandingin, ini bedanya kalau lo taruh bersebelahan.

| Aspek | MCP servers atau CLI | REST API langsung |
| --- | --- | --- |
| Jalur akses agen | Jalur resmi buat agen AI | Bukan lagi jalur agen mulai 1 Februari 2027 |
| Policy check | Ada di setiap request | Tanpa policy check per request di jalur agen |
| Identitas agen | Jelas, OAuth client ID khusus agen | Tanpa identitas agen khusus |
| Data yang dikembalikan | Ringkasan konteks yang disintesis di dalam batas keamanan Workspace | Data mentah baris demi baris |
| Kuota dan tarif | Tier Standard gratis, Scaled berbayar di atas daily free allowance | Juga masuk tier, tapi jalurnya ditutup buat agen |
| Kontrol admin | Visibilitas dan pencabutan di admin console | Tanpa kontrol agen khusus di admin console |

## Siapa yang tetap gratis dan siapa yang bakal bayar

Google memperkenalkan dua tier pemakaian. Tier Standard gratis dengan kuota dan rate limit yang dipublikasikan. Tier Scaled dirancang buat proyek yang butuh kuota lebih tinggi. Yang bikin lega, lebih dari 99 persen developer aktif saat ini berada dalam tier Standard dan tetap mengakses API tanpa biaya tambahan.

Tagihan tier Scaled dimulai 1 April 2027, dan hanya dikenakan buat pemakaian API atau MCP di atas daily free allowance. Besaran harga Scaled dan besaran daily free allowance belum dipublikasikan Google, jadi artikel ini tidak menulis angka apa pun soal itu. Dua tier ini dimulai dari API Gmail, Drive, dan Calendar. Mekanisme akses data lain menyusul dalam beberapa bulan ke depan. Fitur ini tersedia buat semua pelanggan dan developer Google Workspace.

Buat yang mau mantau posisi, ada dua hal yang membantu. Proyek yang hanya dipakai di dalam organisasi Workspace bisa ditandai admin sebagai internal use, sehingga limit yang lebih tinggi tetap termasuk dalam langganan Workspace. Proyek lain yang butuh kuota lebih harus ditautkan ke billing dan pindah ke Scaled. Ada juga dashboard developer baru buat melihat pemakaian tiap proyek terhadap rate limit Standard beserta estimasi biaya.

## Jadwal rollout dan langkah lo berikutnya

Rollout ke semua domain Rapid Release dan Scheduled Release dijadwalkan dalam 2 minggu sejak pengumuman. Yang ikut rollout adalah MCP servers, CLI, kontrol admin console buat akses agen, human in the loop, dan audit log, plus dashboard pemakaian API dan pemilihan tier Scaled.

Jadi langkah lo berikutnya cukup konkret. Mulai dari ngecek apakah agen lo masih memanggil REST API Workspace secara langsung, dan kalau iya catat semua endpoint yang dipakai. Terus pasang gwscli di mesin pengembangan lo lalu jalankan perintah contoh di atas, mulai dari login mode hanya baca. Kalau agen lo eksternal, daftarkan dengan OAuth client ID khusus agen dan scope least privilege. Terakhir, buka dashboard pemakaian API buat melihat posisi proyek lo terhadap limit Standard. Tenggatnya ada dua, 1 Februari 2027 buat enforcement MCP dan 1 April 2027 buat tagihan tier Scaled. Kerjakan migrasi jalur aksesnya dulu sebelum Februari, urusan tarif bisa menyusul setelah lo tahu posisi pemakaian lo.

## Sumber

- Google Workspace Blog, Built for trust and control: New AI agent protections and developer tools in Google Workspace, https://workspace.google.com/blog/product-announcements/built-for-trust-and-control-new-ai-agent-protections-and-developer-tools-in-google-workspace
- Google Workspace Updates, Simplifying agent access while keeping organizations in control: MCP servers, CLI, standardized usage tiers, and admin policies, https://www.googblogs.com/tag/gemini/
- Google Workspace Developers, Workspace CLI, https://developers.google.com/workspace/guides/workspace-cli
- Google Workspace Developers, Configure MCP servers, https://developers.google.com/workspace/guides/configure-mcp-servers
- Dataconomy, Google mandates MCP for Workspace AI agents from February, https://dataconomy.com/2026/11/25/google-mandates-mcp-for-workspace-ai-agents-from-february/
- Pandromeda, Google Workspace MCP servers and CLI reach general availability, https://pandromeda.com/software/google-workspace-mcp-servers-and-cli-reach-general-availability
