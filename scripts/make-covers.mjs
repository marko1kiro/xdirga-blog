#!/usr/bin/env node
/**
 * Generator cover SVG abstrak untuk artikel XDIRGA BLOG.
 * Palet LIME (magenta + cyan/teal). TIDAK ADA hijau.
 * Membaca frontmatter tiap artikel di src/content/articles/ dan menulis
 * satu file SVG 1200x630 ke public/covers/<slug>.svg, plus avatar penulis.
 * Jalankan: node scripts/make-covers.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const articlesDir = path.join(root, 'src/content/articles');
const coversDir = path.join(root, 'public/covers');
const avatarsDir = path.join(root, 'public/avatars');

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Varian gradasi LIME. letter = warna huruf besar, word = warna wordmark,
// chip = warna teks chip kategori, chipBg = isi chip.
const VARIANTS = [
  { id: 'teal-dark', from: '#10333d', to: '#1a4a5a', letter: '#ffffff', word: '#f0abfc', chip: '#ffffff', chipBg: 'rgba(255,255,255,0.16)', deco: ['#d946ef', '#22d3ee'] },
  { id: 'magenta-cyan', from: '#c026d3', to: '#0891b2', letter: '#ffffff', word: '#ffffff', chip: '#ffffff', chipBg: 'rgba(255,255,255,0.18)', deco: ['#ffffff', '#ecfeff'] },
  { id: 'tint-light', from: '#fdf4ff', to: '#ecfeff', letter: '#10333d', word: '#c026d3', chip: '#10333d', chipBg: 'rgba(16,51,61,0.10)', deco: ['#d946ef', '#0891b2'] },
  { id: 'magenta-deep', from: '#a21caf', to: '#0e7490', letter: '#ffffff', word: '#f0abfc', chip: '#ffffff', chipBg: 'rgba(255,255,255,0.16)', deco: ['#22d3ee', '#ffffff'] },
  { id: 'magenta-bright', from: '#d946ef', to: '#22d3ee', letter: '#ffffff', word: '#ffffff', chip: '#ffffff', chipBg: 'rgba(255,255,255,0.20)', deco: ['#10333d', '#ffffff'] },
  { id: 'teal-deep', from: '#0b2730', to: '#164e63', letter: '#ffffff', word: '#67e8f9', chip: '#ffffff', chipBg: 'rgba(255,255,255,0.14)', deco: ['#c026d3', '#22d3ee'] },
];

function coverSvg({ title, category, index }) {
  const v = VARIANTS[index % VARIANTS.length];
  const letter = (title.trim()[0] || 'X').toUpperCase();
  const gid = `g${index}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc('Ilustrasi abstrak artikel ' + title)}">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${v.from}" />
      <stop offset="1" stop-color="${v.to}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#${gid})" />
  <circle cx="1050" cy="90" r="260" fill="${v.deco[0]}" fill-opacity="0.16" />
  <circle cx="180" cy="560" r="220" fill="${v.deco[1]}" fill-opacity="0.14" />
  <circle cx="980" cy="540" r="130" fill="${v.deco[1]}" fill-opacity="0.10" />
  <line x1="0" y1="630" x2="1200" y2="0" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
  <line x1="0" y1="520" x2="1200" y2="-110" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2" />
  <text x="64" y="96" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-weight="700" letter-spacing="8" fill="${v.word}">XDIRGA BLOG</text>
  <text x="880" y="560" font-family="Georgia, 'Times New Roman', serif" font-size="520" font-weight="700" fill="${v.letter}" fill-opacity="0.92" text-anchor="middle">${esc(letter)}</text>
  <rect x="64" y="520" width="${Math.min(460, 34 + category.length * 15)}" height="52" rx="26" fill="${v.chipBg}" />
  <text x="98" y="555" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-weight="700" letter-spacing="3" fill="${v.chip}">${esc(category.toUpperCase())}</text>
</svg>
`;
}

function avatarSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="Avatar XDIRGA">
  <defs>
    <linearGradient id="av" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c026d3" />
      <stop offset="1" stop-color="#0891b2" />
    </linearGradient>
  </defs>
  <circle cx="128" cy="128" r="128" fill="url(#av)" />
  <circle cx="128" cy="128" r="118" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="3" />
  <text x="128" y="172" font-family="Georgia, 'Times New Roman', serif" font-size="132" font-weight="700" fill="#ffffff" text-anchor="middle">X</text>
</svg>
`;
}

function readFrontmatter(file) {
  const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = match[1];
  const get = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, 'm'));
    return m ? m[1].trim() : null;
  };
  return {
    title: get('title') || file,
    category: get('category') || 'lainnya',
    cover: get('cover'),
    status: get('status') || 'published',
  };
}

fs.mkdirSync(coversDir, { recursive: true });
fs.mkdirSync(avatarsDir, { recursive: true });

const files = fs.readdirSync(articlesDir).filter((f) => /\.(md|mdx)$/.test(f)).sort();
let count = 0;
files.forEach((file, i) => {
  const fm = readFrontmatter(file);
  if (!fm || !fm.cover) return;
  if (fm.status === 'draft') return; // draf tidak dapat cover publik
  const outPath = path.join(root, 'public', fm.cover.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, coverSvg({ title: fm.title, category: fm.category, index: i }));
  count += 1;
  console.log(`cover: ${fm.cover}`);
});

fs.writeFileSync(path.join(avatarsDir, 'xdirga.svg'), avatarSvg());
console.log(`avatar: /avatars/xdirga.svg`);
console.log(`Selesai. ${count} cover dibuat.`);
