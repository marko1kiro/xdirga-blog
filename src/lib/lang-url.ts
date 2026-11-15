/**
 * Pemetaan URL bilingual (ID ↔ EN) untuk switcher bahasa.
 * Bahasa = URL (tanpa localStorage/cookie, tanpa redirect otomatis).
 * Aturan (brief i18n §1):
 * - Halaman berpasangan persis -> pindah ke pasangannya.
 * - Tanpa pasangan (artikel /artikel/<slug>/ dan lainnya) -> EN ke /en/, ID ke /.
 * - Bahasa saat ini: prefix /en/ atau /tools/ = EN, /id/tools/ = ID, selain itu ID.
 */

export type Lang = 'id' | 'en';

export interface LangTargets {
  id: string;
  en: string;
}

/** Bahasa halaman saat ini, diturunkan dari pathname. */
export function getLangFromPath(pathname: string): Lang {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/tools' || pathname.startsWith('/tools/')) return 'en';
  return 'id';
}

function normalize(pathname: string): string {
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

interface PairRule {
  /** Cocok dengan pathname ID (tanpa trailing slash). */
  id: RegExp;
  /** Cocok dengan pathname EN (tanpa trailing slash). */
  en: RegExp;
  toEn: (m: RegExpExecArray) => string;
  toId: (m: RegExpExecArray) => string;
}

// Urutan penting: aturan generik (slug tool) HARUS setelah aturan spesifik
// (category/kategori, editorial-policy, page) supaya tidak menelan segmen itu.
const PAIR_RULES: PairRule[] = [
  // --- Beranda ---
  { id: /^\/$/, en: /^\/en$/, toEn: () => '/en/', toId: () => '/' },
  // --- Halaman statis ---
  { id: /^\/tentang$/, en: /^\/en\/about$/, toEn: () => '/en/about/', toId: () => '/tentang/' },
  { id: /^\/kontak$/, en: /^\/en\/contact$/, toEn: () => '/en/contact/', toId: () => '/kontak/' },
  { id: /^\/privasi$/, en: /^\/en\/privacy$/, toEn: () => '/en/privacy/', toId: () => '/privasi/' },
  { id: /^\/syarat$/, en: /^\/en\/terms$/, toEn: () => '/en/terms/', toId: () => '/syarat/' },
  // --- Listing blog (slug/tag tetap, cuma segmen diterjemahkan) ---
  {
    id: /^\/kategori\/([^/]+)$/,
    en: /^\/en\/category\/([^/]+)$/,
    toEn: (m) => `/en/category/${m[1]}/`,
    toId: (m) => `/kategori/${m[1]}/`,
  },
  {
    id: /^\/tag\/([^/]+)$/,
    en: /^\/en\/tag\/([^/]+)$/,
    toEn: (m) => `/en/tag/${m[1]}/`,
    toId: (m) => `/tag/${m[1]}/`,
  },
  {
    id: /^\/author\/([^/]+)$/,
    en: /^\/en\/author\/([^/]+)$/,
    toEn: (m) => `/en/author/${m[1]}/`,
    toId: (m) => `/author/${m[1]}/`,
  },
  { id: /^\/search$/, en: /^\/en\/search$/, toEn: () => '/en/search/', toId: () => '/search/' },
  {
    id: /^\/page\/(\d+)$/,
    en: /^\/en\/page\/(\d+)$/,
    toEn: (m) => `/en/page/${m[1]}/`,
    toId: (m) => `/page/${m[1]}/`,
  },
  { id: /^\/sitemap$/, en: /^\/en\/sitemap$/, toEn: () => '/en/sitemap/', toId: () => '/sitemap/' },
  // --- Tools (EN /tools/* ↔ ID /id/tools/*; slug tool sama di kedua bahasa) ---
  { id: /^\/id\/tools$/, en: /^\/tools$/, toEn: () => '/tools/', toId: () => '/id/tools/' },
  {
    id: /^\/id\/tools\/kategori\/([^/]+)$/,
    en: /^\/tools\/category\/([^/]+)$/,
    toEn: (m) => `/tools/category/${m[1]}/`,
    toId: (m) => `/id/tools/kategori/${m[1]}/`,
  },
  {
    id: /^\/id\/tools\/kebijakan-editorial$/,
    en: /^\/tools\/editorial-policy$/,
    toEn: () => '/tools/editorial-policy/',
    toId: () => '/id/tools/kebijakan-editorial/',
  },
  {
    id: /^\/id\/tools\/page\/(\d+)$/,
    en: /^\/tools\/page\/(\d+)$/,
    toEn: (m) => `/tools/page/${m[1]}/`,
    toId: (m) => `/id/tools/page/${m[1]}/`,
  },
  {
    id: /^\/id\/tools\/([^/]+)$/,
    en: /^\/tools\/([^/]+)$/,
    toEn: (m) => `/tools/${m[1]}/`,
    toId: (m) => `/id/tools/${m[1]}/`,
  },
];

/**
 * Target switcher { id, en } untuk pathname saat ini.
 * Pasangan persis -> pasangan itu; tanpa pasangan -> EN /en/, ID /.
 */
export function getLangTargets(pathname: string): LangTargets {
  const path = normalize(pathname);
  const self = path === '/' ? '/' : `${path}/`;
  for (const rule of PAIR_RULES) {
    const idMatch = rule.id.exec(path);
    if (idMatch) return { id: self, en: rule.toEn(idMatch) };
    const enMatch = rule.en.exec(path);
    if (enMatch) return { id: rule.toId(enMatch), en: self };
  }
  return { id: '/', en: '/en/' };
}
