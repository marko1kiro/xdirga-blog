## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Deploy dan QA (v2, 2026-11-14)

- Push ke GitHub: `python3 ~/workspace/xdirga-blog-push.py "<pesan>" [--delete <path> ...]` — SATU commit via Git Data API. File yang dihapus dari worktree wajib disebut lewat `--delete` (boleh diulang) supaya ikut terhapus di repo dalam commit yang sama, kalau tidak build GitHub-connected bisa rusak.
- Deploy ke Cloudflare Pages: `npm run build` lalu `python3 cf_pages_direct_upload.py` (repo belum GitHub-connected, jadi push tidak auto-deploy).
- QA otomatis: server statis di port 8321, lalu `node scripts/qa-check.mjs` (rute, draf, tautan internal, overflow 360/1280px, dark mode, screenshot ke `/tmp/qa-shots/`).
- Palet LIME (magenta + cyan/teal). Palet hijau di master prompt DIBATALKAN TOTAL. Jangan kembalikan warna hijau.
- Gambar cover artikel: WAJIB minimal 1 gambar per artikel, hasil generate (media.generate_image, 16:9, palet LIME, tanpa teks di dalam gambar) + watermark kecil "XDIRGA BLOG" pojok kanan bawah via `scripts/watermark-covers.py` (PIL, JPG kualitas 82, ke `public/covers/<slug>.jpg`). Jangan pernah minta AI menambahkan watermark. Cover SVG lama sudah dihapus total 2026-11-14.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
