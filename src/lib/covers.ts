/** Helper gambar cover responsif (aturan durable, 2026-11-14). */
export function coverSrcsetWebp(cover: string): string {
  const base = cover.replace(/\.jpg$/, '');
  return `${base}-640.webp 640w, ${base}-720.webp 720w, ${base}-1280.webp 1280w`;
}
