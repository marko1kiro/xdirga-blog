# Laporan Final Phase 4 — XDIRGA BLOG

**Tanggal:** 14 November 2026
**Repo:** marko1kiro/xdirga-blog
**Status keseluruhan: PASS** — Tahap 1, Tahap 2, dan Tahap 3 semuanya selesai dan terverifikasi live.
**Acuan:** `PHASE_4_IMPLEMENTATION_BRIEF.md` bagian 7 (Final Report, format A–K).

## Ringkasan eksekutif

Phase 4 dikerjakan dalam satu hari, 14 November 2026, dalam tiga tahap. Tahap 1 (Quick Wins A1–A5) live 16:52 WIB, Tahap 2 (A6–A7) live 17:05 WIB, Tahap 3 (7 artikel editorial) live 17:20–18:27 WIB. Semua item berstatus PASS. Tidak ada regresi terhadap fondasi SEO Phase 1, Phase 2, dan Phase 2.1 — dibuktikan dengan pengecekan live pada akhir Phase 4 (bagian I).

Dua perubahan di luar brief terjadi atas perintah eksplisit user di tengah Phase 4 dan didokumentasikan di bagian K: hero homepage diubah menjadi artikel terbaru otomatis, dan artikel "Selamat Datang di Blog XDIRGA" dihapus permanen. Keduanya bukan penyimpangan diam-diam — keduanya perintah user yang dicatat dan diverifikasi.

Inventaris akhir: **19 artikel terbit + 1 draf** (teknologi 7, berita 1, tips 4, edukasi 4, bisnis 2, lifestyle 1). Graf internal linking tumbuh dari 9 menjadi 37 tautan. 11 artikel membawa penanda `lastVerifiedAt`.

---

## A. Quick Wins Implementation — PASS

Tahap 1, commit `f5ea38c6`, deploy `6bbc0689`, live 14 Nov 2026 16:52 WIB. astro check 0 error, build sukses, qa-check SEMUA QA LOLOS, verifikasi live lengkap.

| Item | Pekerjaan | Status |
| --- | --- | --- |
| A1 | Verifikasi klaim Manus (5 klaim, bukti di bagian B) | PASS |
| A2 | 8 tautan internal kontekstual, graf 9 → 17 | PASS |
| A3 | Judul homepage "XDIRGA BLOG — Berita, Teknologi, dan Tips Digital" via prop `fullTitle` | PASS |
| A4 | Tautan "Semua Tag" → `/tag/` di footer (menutup F-09 orphan) | PASS |
| A5 | 3 perbaikan alt: cover Manus, cover Apa Itu Agen AI, alt avatar "Avatar Marko" di 3 file | PASS |

Detail A2 — 8 tautan yang ditambahkan: layanan-ai-gratis → 7-api; memilih-model → perbandingan; 7-api → apa-itu-agen-ai; cara-menulis → cara-pakai; lima-kebiasaan → rutinitas; rutinitas → lima-kebiasaan; apa-itu-agen-ai → cara-pakai; manus → apa-itu-agen-ai.

---

## B. Manus Verification Evidence — PASS

Semua 5 klaim artikel `manus-free-300-kredit-sehari` terverifikasi. **Nol perubahan klaim** — hanya sumber yang ditingkatkan. `updatedAt` sengaja TIDAK dipasang karena isi artikel tidak berubah.

| # | Klaim | Sumber | Hasil |
| --- | --- | --- | --- |
| 1 | 300 kredit per hari | Help Center resmi `help.manus.im/en/articles/11711121` | VERIFIED |
| 2 | Reset 00:00 UTC (07:00 WIB), tanpa rollover | Artikel Help Center yang sama | VERIFIED |
| 3 | Hanya untuk Manus 2.0 Lite | Tooltip halaman pricing resmi `manus.im/pricing` ("Daily credits can be used in the Manus 2.0 Lite") | VERIFIED |
| 4 | Batas 1.500/bulan + 1 tugas bersamaan (+2 terjadwal) | Beberapa sumber independen yang mengutip Help Center | VERIFIED |
| 5 | Tidak ada kartu Free di halaman pricing | Pengamatan langsung: hanya paket berbayar $20/$40/$200 (tahunan $17/$34/$170); kartu berbayar menulis "300 refresh credits everyday", "20 concurrent tasks", "20 scheduled tasks" | VERIFIED |

Perubahan artikel: tautan internal "agen AI" → `/artikel/apa-itu-agen-ai/`; baris sumber kini menaut ke Help Center 11711121 + `manus.im/pricing` + tautan Medium asli. Bukti live akhir Phase 4: halaman artikel menampilkan "Terverifikasi 14 November 2026" dan kedua tautan sumber resmi masih ada.

---

## C. Internal Linking Graph Before/After — PASS

| Titik ukur | Jumlah tautan internal antar-artikel |
| --- | --- |
| Sebelum Tahap 1 | 9 |
| Setelah Tahap 1 (A2) | 17 |
| Akhir Tahap 3 | **37** |

Tahap 3 menambah 20 tautan dari 7 artikel baru (tiap artikel 2–6 tautan internal). Angka dihitung ulang dari file sumber artikel terbit pada akhir Phase 4.

**Koreksi atas laporan Tahap 1:** laporan Tahap 1 sempat menulis artikel tanpa tautan keluar hanya 2 (cara-kerja-rss dan selamat-datang). Pengecekan ulang menunjukkan angka itu salah. Yang benar: **8 artikel terbit tidak memiliki tautan keluar (http)**, yaitu 6 artikel lama pra-Phase 4 (apa-itu-agen-ai, cara-menulis-catatan-belajar, cara-pakai-ai-gratis-untuk-kerja, layanan-ai-gratis-makin-ketat, lima-kebiasaan-kerja-rapi, rutinitas-pagi-sebelum-buka-laptop) plus 2 artikel Tahap 3 yang disengaja tanpa sumber eksternal — Artikel 7 (template prompt orisinal, tidak ada fakta eksternal) dan Artikel 10 (sintesis artikel seri yang sudah dikutip, semua fakta tertaut ke artikel seri). Keenam artikel lama dicatat sebagai tindak lanjut di bagian K.

---

## D. Homepage Metadata — PASS

- Judul homepage: "XDIRGA BLOG — Berita, Teknologi, dan Tips Digital" (prop `fullTitle` di `BaseLayout.astro`, dipasang dari `index.astro`). Terverifikasi live akhir Phase 4.
- H1 homepage: tepat 1 ("Berita, Teknologi, dan Tips Digital untuk Kehidupan Sehari-hari"), tidak berubah sejak Phase 1. Terverifikasi live akhir Phase 4.
- Canonical tidak berubah. `og-default.jpg` masih 200 live (F-04 tetap utuh).

---

## E. Footer and Alt Text — PASS

- Footer: tautan "Semua Tag" → `/tag/` ada di daftar Kategori (F-09 tertutup). Terverifikasi live akhir Phase 4.
- Alt: cover Manus → "Ilustrasi meja kerja dengan laptop dan kartu tugas selesai"; cover Apa Itu Agen AI → "Ilustrasi diagram alur tugas agen AI"; alt avatar → "Avatar Marko" di 3 file.
- Baris bawah footer tetap "© 2026 XDIRGA BLOG" saja.

---

## F. Memilih Model AI Gratis Improvement — PASS

Tahap 2, commit `20c7b77b`, deploy `f84e3b89`, live 14 Nov 2026 17:05 WIB.

Artikel `memilih-model-ai-gratis.mdx` ditulis ulang dengan rekomendasi bernama per tugas, semuanya terverifikasi ke halaman harga resmi yang dibaca langsung pada 14 Nov 2026:

| Tugas | Model gratis yang cocok | Batasan yang perlu diingat |
| --- | --- | --- |
| Menulis | ChatGPT GPT 6 Luna | Chat teks tidak terbatas; Claude Sonnet lebih teliti tapi ada batas 5 jam |
| Riset | Gemini Flash Lite | Konteks gratis 32 ribu token; mode Auto yang memilih model |
| Coding | GPT 6 Luna + Codex terbatas | Codex gratis hanya di aplikasi desktop; Claude Code tidak ada paket gratis |
| Analisis dokumen | Claude Sonnet | Konteks sampai 1 juta tergantung model |
| Brainstorming | GPT 6 Luna, cadangan Claude Haiku | — |
| Konteks panjang | Claude Sonnet | ChatGPT gratis 27 ribu, Gemini gratis 32 ribu |

**Koreksi penting yang ditemukan Tahap 2:** artikel perbandingan sempat menulis model gratis ChatGPT sebagai "GPT 5.6 Luna". Halaman resmi membuktikan model gratisnya adalah **GPT 6 Luna**. Sudah diperbaiki; artikel perbandingan mendapat `updatedAt: 2026-11-14` + `lastVerifiedAt: 2026-11-14`. Artikel Memilih Model mendapat `updatedAt: 2026-11-14` + `lastVerifiedAt: 2026-11-14`.

Fakta halaman resmi yang dibaca langsung 14 Nov 2026: ChatGPT Free — "Unlimited text chats with GPT-6", GPT-6 Luna termasuk, GPT-5 Thinking Mini termasuk, GPT-5.6 Terra terbatas; TIDAK termasuk GPT-5.6 Luna, GPT-5.6 Sol/Pro, GPT-6 Sol, GPT-6 Astra, GPT-6.1 Sol, Legacy; konteks instan 27 ribu. Claude Free — model tertulis hanya "Sonnet" dan "Haiku" tanpa nomor versi; batas per 5 jam + mingguan; konteks sampai 1 juta tergantung model; Projects sampai 5; TIDAK termasuk Opus, Fable, Claude Code, Research. Gemini Free — mode Auto mayoritas Flash-Lite sejak 9 Okt 2026; batas berbasis komputasi sejak 17 Mei 2026; konteks gratis 32.000 token.

---

## G. Last Verified Status — PASS

Penanda `lastVerifiedAt` diimplementasikan sebagai field skema baru di `src/content.config.ts` (`z.coerce.date().optional()`), dirender `ArticleMeta.astro` sebagai "Terverifikasi {tanggal}" dengan pemisah `·`. Penanda ini hanya dipasang setelah verifikasi nyata pada hari itu, tidak pernah dari waktu build, dan **tidak** masuk ke JSON-LD `dateModified` (yang hanya berasal dari `updatedAt`).

**11 dari 19 artikel terbit membawa `lastVerifiedAt: 2026-11-14`:** manus-free-300-kredit-sehari, 7-api-llm-gratis-tanpa-tanggal-berakhir (dicek ulang ke llmlatency.dev, diperbarui 14 Nov 2026 — 7 penyedia tanpa tanggal berakhir tetap sama: OpenRouter, Cohere, GroqCloud, Novita AI, Z.AI, Gemini API, SenseNova Token Plan), chatgpt-vs-gemini-vs-claude-gratis, gemini-gratis-2026-flash-lite, memilih-model-ai-gratis (Tahap 2), plus Artikel 4, 5, 6, 8, 9, 10 (Tahap 3).

Artikel 7 (`prompt-ai-pemula-siap-pakai`) sengaja tanpa penanda — isinya template prompt orisinal, tidak ada fakta eksternal untuk diverifikasi. Bukti live: teks "Terverifikasi 14 November 2026" tampil di artikel Manus dan Memilih Model.

---

## H. Editorial Brief and Progress for Seven Articles — PASS

Workstream B: 7 dari 7 artikel selesai, semua PASS, semua live. Total **5.129 kata**. Setiap artikel melewati riset → tulis → humanize → cover → QC → terbit → verifikasi live. Judul memakai sapaan "lo", prosa bersih dari titik dua dan strip, cover tanpa karakter + watermark + varian responsif.

| # | Artikel (slug) | Kategori | Kata | Commit | Deploy | Live (WIB) |
| --- | --- | --- | --- | --- | --- | --- |
| 4 | AI Gambar Gratis, Leonardo vs Canva vs Gemini (`ai-gambar-gratis-leonardo-canva-gemini`) | teknologi | 794 | `edf34639` | `02e76abd` | 17:20 |
| 5 | Voiceover dan Musik AI Gratis, ElevenLabs dan Suno (`voiceover-musik-ai-gratis-elevenlabs-suno`) | tips | 611 | `ae1986d7` | `136f9fab` | 17:27 |
| 6 | AI Coding Gratis, Copilot vs Cursor vs Codex (`ai-coding-gratis-copilot-cursor-codex`) | teknologi | 722 | `b4dc6e12` | `65356c25` | 17:37 |
| 7 | 15 Prompt Siap Pakai Buat Pemula (`prompt-ai-pemula-siap-pakai`) | edukasi | 892 | `d0d05036` | `826e41a3` | 17:51 |
| 8 | AI Gratis Buat Content Creator Tanpa Kartu Kredit (`ai-gratis-content-creator`) | tips | 699 | `872d6aa9` | `940d7e77` | 18:01 |
| 9 | Aman Pakai AI Gratis, Data Apa yang Jangan Pernah Lo Upload (`aman-pakai-ai-gratis-data-jangan-upload`) | edukasi | 677 | `8e0dc3fe` | `9d27d5ea` | 18:10 |
| 10 | AI Gratis Buat UMKM dan Pelajar, Rencana 7 Hari (`ai-gratis-umkm-pelajar-rencana-7-hari`) | bisnis | 734 | `9f8d74a6` | `d9fb5400` | 18:27 |

Fakta kunci yang terverifikasi per artikel (semua dicek ke sumber resmi atau sumber yang membaca dokumen resmi, 14 Nov 2026):

- **Artikel 4:** Leonardo Free 150 token cepat/hari tanpa rollover, ~8 token per gambar lebar (sekitar 18/hari), lisensi komersial royalty-free non-eksklusif; Canva Free sampai 20 pemakaian AI Premium/bulan (angka "50 seumur hidup" adalah sistem lama, tidak dipakai); Gemini Nano Banana 2 berbasis komputasi, refresh 5 jam, Flow sampai 400 gambar/hari + 20 Nano Banana Pro/hari; Bing 15 cepat/hari lalu standar sampai 200 prompt/24 jam; Playground 10 gambar/3 jam; Midjourney tanpa paket gratis.
- **Artikel 5:** ElevenLabs Free 10.000 kredit/bulan (sekitar 10 menit bicara; Flash/Turbo 0,5 kredit/karakter), batas sekali generate 2.500 karakter, TANPA lisensi komersial, atribusi wajib, tanpa voice cloning; Suno Free 50 kredit/hari (sekitar 10 lagu), tanpa rollover, ber-watermark, Suno memiliki lagu paket gratis (nol hak komersial), upgrade tidak melisensikan ulang secara surut; Pro $10/bulan, Premier $30/bulan. Nama versi model Suno tidak ditulis karena sumber saling bertentangan.
- **Artikel 6:** Copilot Free 2.000 completion/bulan + 50 chat/bulan (meter terpisah), tanpa rollover, reset dihitung dari hari daftar, pemilihan model Auto saja sejak 24 Jun 2026, Pro $10/bulan; Cursor Hobby tidak memublikasikan angka (hanya "Limited Agent requests"/"Limited Tab completions") — perkiraan komunitas sekitar 2.000 completion + 50 slow premium request/bulan ditulis sebagai perkiraan, bukan janji vendor, Pro $20/bulan; Codex di ChatGPT Free memakai GPT-6 Luna, aplikasi desktop saja, "subject to rollout", tanpa batas terpublikasi; Claude Code tanpa paket gratis.
- **Artikel 7:** 15 template prompt orisinal (5 kerja, 5 belajar, 5 konten), tanpa fakta eksternal, tanpa prompt data sensitif, tanpa `lastVerifiedAt`.
- **Artikel 8:** Definisi gratis yang ketat — daftar dan pakai fitur inti tanpa kartu kredit, bukan trial auto-charge. Konfirmasi tanpa kartu untuk Leonardo, ElevenLabs, Suno; CapCut Free edit + ekspor 1080p tanpa watermark, penyimpanan cloud 512 MB; caption otomatis di editor CapCut pindah ke Pro sejak 31 Okt 2026, tapi halaman AI Captions terpisah CapCut masih ekspor gratis tanpa watermark (ditulis jujur apa adanya); CapCut tidak punya halaman pricing publik.
- **Artikel 9:** 6 jenis data yang jangan pernah diunggah + cara aman + "aturan 5 detik"; dibingkai sebagai panduan praktis umum, bukan saran hukum. Fakta pelatihan: ChatGPT personal "Improve the model for everyone" aktif default, opt-out tidak berlaku surut, Temporary Chat tidak dipakai buat latih, dihapus dalam 30 hari; Gemini personal "Keep Activity" aktif default, subset dibaca peninjau manusia, chat yang ditinjau disimpan sampai 3 tahun; Claude latih default sejak 28 Agu 2025 kecuali opt-out; Copilot latih sejak 24 Apr 2026 kecuali dimatikan; paket bisnis tidak dilatih default.
- **Artikel 10:** Penutup seri — rencana 7 hari, satu tugas kecil per hari yang hasilnya kepakai, semua bisa selesai dengan paket gratis; menaut ke 6 artikel seri (cara-pakai, prompt, content creator, gambar, voiceover, aman pakai AI).

Workstream C (editorial QC): tiap artikel lolos prose check (tanpa titik dua dan strip, termasuk di dalam code block), `npx astro check` 0 error, `npm run build` sukses, `node scripts/qa-check.mjs` "SEMUA QA LOLOS", verifikasi live (artikel 200, cover 200, sitemap 200, hero ikut berganti ke artikel terbaru tiap kali terbit).

---

## I. Build and Regression Test — PASS

- `npx astro check`: 0 error, 0 warning, 0 hint pada setiap tahap.
- `npm run build`: sukses pada setiap tahap.
- `node scripts/qa-check.mjs`: "SEMUA QA LOLOS" pada setiap tahap (termasuk pengecekan baru pasca-penghapusan: artikel Selamat Datang tidak ada di arsip Berita, Layanan AI Gratis Makin Ketat tetap ada).
- Pengecekan regresi live akhir Phase 4 (14 Nov 2026, cache-buster, terhadap produksi): homepage tepat 1 H1; judul homepage A3 utuh; `/search/` masih `noindex,follow`; `og-default.jpg` 200; artikel Manus menampilkan "Terverifikasi 14 November 2026" + tautan Help Center 11711121 + `manus.im/pricing`; artikel Memilih Model menampilkan "Terverifikasi 14 November 2026" + "GPT 6 Luna"; breadcrumb tampil di halaman artikel; `sitemap-index.xml` 200.
- Kepatuhan terhadap larangan brief: tidak ada perubahan slug/URL/canonical/publishedAt; tidak ada `updatedAt` palsu; tidak ada data/kuota/harga/benchmark yang dikarang; tidak ada kategori baru; tidak ada redesign header/mega-menu/drawer; tidak ada perubahan konfigurasi Cloudflare. Dua pengecualian — hero otomatis dan penghapusan Selamat Datang — adalah perintah eksplisit user (bagian K).

---

## J. Production Verification — PASS

Semua perubahan Phase 4 terverifikasi live di `https://xdirga.xyz` (cache-buster + `Cache-Control: no-cache`):

- Tahap 1: homepage (judul + H1 + footer "Semua Tag"), artikel Manus (tautan sumber + penanda terverifikasi), alt avatar "Avatar Marko".
- Tahap 2: artikel Memilih Model (tabel rekomendasi bernama + penanda terverifikasi + tanggal diperbarui), 4 artikel dengan penanda `lastVerifiedAt`.
- Tahap 3: ketujuh artikel 200 + cover 200 + tampil di arsip kategori masing-masing; hero homepage berganti otomatis ke artikel terbaru pada tiap penerbitan (terakhir Artikel 10); sitemap-index 200.
- Penghapusan Selamat Datang: URL lama kedua varian slash 301 → `/tentang/`; arsip Berita 0 penyebutan artikel itu; homepage dan sitemap bersih; cover lama 404; `/tag/xdirga/` 404.

---

## K. Remaining Issues and Recommendations — NOT IMPLEMENTED (tindak lanjut)

1. **coverAlt Memilih Model menyebut "seseorang"** — "Ilustrasi seseorang memilih di antara beberapa bola model AI bercahaya" — bertentangan dengan aturan tanpa karakter di cover. Perlu cek visual cover dan perbaiki alt bila perlu. (Dibawa dari Tahap 2.)
2. **6 artikel lama tanpa tautan keluar/sumber** — apa-itu-agen-ai, cara-menulis-catatan-belajar, cara-pakai-ai-gratis-untuk-kerja, layanan-ai-gratis-makin-ketat, lima-kebiasaan-kerja-rapi, rutinitas-pagi-sebelum-buka-laptop. Rekomendasi: tambah baris sumber atau biarkan (klaimnya umum); keputusan di tangan user.
3. **F-08 sitemap tanpa lastmod** — masih terbuka sejak audit SEO teknis.
4. **F-12 www.xdirga.xyz tanpa DNS** — di sisi user.
5. **Perubahan di luar brief atas perintah user (sudah selesai, dicatat di sini):**
   - Hero homepage menjadi artikel terbaru otomatis — commit `1eebef71`, deploy `ea89f874`, 14 Nov 2026 17:56 WIB. Flag frontmatter `featured` dipensiunkan; `index.astro` kini memakai `const featured = all[0];`.
   - Artikel "Selamat Datang di Blog XDIRGA" dihapus permanen — commit `7c5f5045`, deploy `7746bf40`, 14 Nov 2026 18:18 WIB. File artikel + 6 file cover dihapus dari repo; slug dicabut dari `scripts/watermark-covers.py`; cek QA diperbarui; URL lama 301 ke `/tentang/` (kedua varian). Berita kini tinggal 1 artikel; tag "XDIRGA" hilang.
6. **Koreksi yang dibuat selama Phase 4:** model gratis ChatGPT "GPT 5.6 Luna" → "GPT 6 Luna" (bukti halaman resmi); jumlah artikel terbit pada laporan penghapusan dikoreksi 14 → 18 (angka 15 yang dipakai adalah jumlah lama pasca Artikel 5); jam pada laporan Artikel 5–9 dikoreksi ke waktu commit GitHub (tabel bagian H memakai waktu commit); klaim outbound-zero pada laporan Tahap 1 dikoreksi (bagian C).

**Penutup:** Phase 4 selesai. Seri AI gratis kini lengkap 10 artikel yang saling menaut, dari mengenal agen AI sampai rencana 7 hari. Fondasi teknis Phase 1, 2, dan 2.1 utuh. Tindak lanjut di atas menunggu keputusan user.
