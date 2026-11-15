// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Baca frontmatter artikel dan kumpulkan URL yang tidak boleh masuk sitemap:
 * artikel berstatus draft atau bertanda noindex.
 */
function hiddenArticlePaths() {
  const dir = path.resolve('./src/content/articles');
  const hidden = new Set();
  if (!fs.existsSync(dir)) return hidden;
  for (const file of fs.readdirSync(dir)) {
    if (!/\.(md|mdx)$/.test(file)) continue;
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;
    const fm = match[1];
    const slug = file.replace(/\.(md|mdx)$/, '');
    if (/^\s*status:\s*draft\s*$/m.test(fm) || /^\s*noindex:\s*true\s*$/m.test(fm)) {
      hidden.add(`/artikel/${slug}/`);
    }
  }
  return hidden;
}

const hiddenPaths = hiddenArticlePaths();

// https://astro.build/config
export default defineConfig({
  site: 'https://xdirga.xyz',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (hiddenPaths.has(pathname)) return false;
        if (pathname.startsWith('/search')) return false;
        // Halaman pencarian EN juga bukan konten indexable (cermin /search/).
        if (pathname.startsWith('/en/search')) return false;
        return true;
      },
    }),
  ],
  vite: {
    // @ts-ignore Astro membundel salinan Vite sendiri; plugin tetap jalan saat runtime.
    plugins: [tailwindcss()],
  },
});
