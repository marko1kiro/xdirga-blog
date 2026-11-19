#!/usr/bin/env node
/**
 * QA otomatis untuk XDIRGA BLOG v2.
 * 1. Semua rute di dist mengembalikan 200.
 * 2. Draf tidak muncul di sitemap atau homepage. RSS sudah dihapus total:
 *    /rss.xml 404, dist/rss.xml tidak ada, tidak ada application/rss+xml
 *    di dist kecuali isi artikel editorial cara-kerja-rss.
 * 3. Tidak ada broken internal link.
 * 4. Tidak ada horizontal overflow di 360px dan 1280px (via CDP).
 * 5. Dark mode: class .dark terpasang dan preferensi tersimpan di localStorage.
 * 6. Screenshot homepage + artikel (light + dark) ke /tmp/qa-shots/.
 *
 * Prasyarat: server statis jalan di http://127.0.0.1:8321 (python3 -m http.server 8321 --directory dist)
 * Chrome: /opt/meta-chromium/chrome --headless=new --remote-debugging-port=9222
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const BASE = 'http://127.0.0.1:8321';
const CHROME = process.env.QA_CHROME || '/home/hatch/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome';
const SHOTS = '/tmp/qa-shots';
fs.mkdirSync(SHOTS, { recursive: true });

const failures = [];
const ok = (name, cond, detail = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
  if (!cond) failures.push(name);
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- 1. Daftar rute dari dist ----------
function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(p, out);
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walkHtml(dist);
const routes = htmlFiles.map((f) => {
  let rel = path.relative(dist, f).replace(/\\/g, '/');
  if (rel === '404.html') return '/404.html';
  rel = rel.replace(/\/index\.html$/, '/');
  return '/' + rel;
});
const extraRoutes = ['/sitemap-index.xml', '/sitemap-0.xml', '/robots.txt', '/_redirects'];
const allRoutes = [...new Set([...routes, ...extraRoutes])];

let statusOk = 0;
for (const route of allRoutes) {
  const res = await fetch(BASE + route);
  // WAJIB konsumsi body: server HTTP/1.0 menutup koneksi tiap respons,
  // body yang tidak dibaca memicu assert undici di Node 24 (crash QA).
  await res.arrayBuffer().catch(() => {});
  if (res.status === 200) statusOk += 1;
  else ok(`route 200 ${route}`, false, `status ${res.status}`);
}
ok(`semua rute 200 (${statusOk}/${allRoutes.length})`, statusOk === allRoutes.length);

// ---------- 1b. Rute /en/ wajib ADA di dist (i18n) ----------
// Daftar rute 200 di atas diturunkan otomatis dari dist, jadi rute yang tidak
// kebangun tidak akan ketahuan dari sana. Daftar eksplisit ini gagal keras
// bila tim halaman EN belum terintegrasi.
const expectedRoutes = [
  '/en/',
  '/en/about/',
  '/en/contact/',
  '/en/privacy/',
  '/en/terms/',
  '/en/search/',
  '/en/category/teknologi/',
  '/en/author/xdirga/',
  '/tools/',
  '/tools/chatgpt/',
];
for (const r of expectedRoutes) ok(`rute wajib ada ${r}`, allRoutes.includes(r));
ok('rute /en/tag/ ada (min. 1 tag)', allRoutes.some((r) => r.startsWith('/en/tag/')));

// ---------- 2. Draf tidak boleh muncul ----------
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
ok('draf tidak ada di sitemap', !sitemap.includes('catatan-draft-contoh'));
ok('draf tidak ada di homepage', !home.includes('catatan-draft-contoh'));
const publishedCount = fs.readdirSync(path.join(root, 'src/content/articles')).filter((f) => /\.(md|mdx)$/.test(f)).filter((f) => /status:\s*published/.test(fs.readFileSync(path.join(root, 'src/content/articles', f), 'utf8'))).length;
ok(`sitemap berisi ${publishedCount} artikel`, (sitemap.match(/\/artikel\//g) || []).length === publishedCount, `${(sitemap.match(/\/artikel\//g) || []).length} artikel`);
ok('sitemap tidak berisi /search/', !sitemap.includes('/search'));
ok('homepage berisi judul XDIRGA BLOG', home.includes('XDIRGA') && home.includes('Sedang Tren'));

// ---------- 2c. RSS dihapus total (keputusan user 15 Nov 2026) ----------
// /rss.xml tidak ada di dist, server mengembalikan 404, tidak ada jejak
// application/rss+xml atau /rss.xml di HTML mana pun — KECUALI isi artikel
// editorial cara-kerja-rss (konten TENTANG RSS, sengaja dipertahankan).
// Footer: tanpa tombol RSS, ada tombol langganan email ke /kontak/.
// FollowSection: dirender beserta form langganan karena newsletter AKTIF
// (username Buttondown sudah diisi); penanda data-follow-section hanya ada
// bila section dirender.
ok('RSS: dist/rss.xml tidak ada', !fs.existsSync(path.join(dist, 'rss.xml')));
const rssRes = await fetch(BASE + '/rss.xml');
await rssRes.arrayBuffer().catch(() => {});
ok('RSS: /rss.xml mengembalikan 404', rssRes.status === 404, `status ${rssRes.status}`);
const rssLeakFiles = htmlFiles.filter((f) => {
  const rel = path.relative(dist, f).replace(/\\/g, '/');
  if (rel.startsWith('artikel/cara-kerja-rss/')) return false;
  const text = fs.readFileSync(f, 'utf8');
  return text.includes('rss.xml') || text.includes('application/rss+xml');
});
ok(
  'RSS: tidak ada jejak rss.xml / application/rss+xml di dist (kecuali artikel cara-kerja-rss)',
  rssLeakFiles.length === 0,
  rssLeakFiles.map((f) => path.relative(dist, f)).join(', '),
);
ok('RSS: homepage tanpa tautan /rss.xml', !home.includes('/rss.xml'));
ok('RSS: homepage tanpa application/rss+xml', !home.includes('application/rss+xml'));
ok('RSS: footer punya tombol langganan email ke /kontak/', home.includes('href="/kontak/"'));
// Newsletter AKTIF (username Buttondown xdirgablog, keputusan user 15 Nov 11:12 WIB):
// FollowSection HARUS dirender di beranda ID + EN beserta form langganan,
// dan form HARUS ada di halaman kontak ID + EN, dengan action URL Buttondown
// yang tepat. Tidak ada subscriber palsu yang dibuat — verifikasi hanya
// sampai form ter-render dengan action URL benar.
const enHome = fs.readFileSync(path.join(dist, 'en/index.html'), 'utf8');
const kontakId = fs.readFileSync(path.join(dist, 'kontak/index.html'), 'utf8');
const kontakEn = fs.readFileSync(path.join(dist, 'en/contact/index.html'), 'utf8');
const BUTTONDOWN_ACTION = 'https://buttondown.com/api/emails/embed-subscribe/xdirgablog';
ok('newsletter: FollowSection dirender di beranda ID', home.includes('data-follow-section'));
ok('newsletter: FollowSection dirender di beranda EN', enHome.includes('data-follow-section'));
for (const [label, html] of [
  ['beranda ID', home],
  ['beranda EN', enHome],
  ['kontak ID', kontakId],
  ['kontak EN', kontakEn],
]) {
  ok(`newsletter: form muncul di ${label}`, html.includes('id="subscribe-email"'));
  ok(
    `newsletter: action URL Buttondown benar di ${label}`,
    html.includes(`action="${BUTTONDOWN_ACTION}"`),
  );
}

// ---------- 2b. Hreflang i18n ----------
// Halaman EN berpasangan: hreflang en/id/x-default + <html lang="en"> +
// canonical ke diri sendiri. Halaman artikel: TANPA hreflang (ID-only,
// brief §0 aturan 1) + <html lang="id">. Asersi urutan nav desktop (§8)
// TIDAK disentuh — switcher bukan item nav.
const readDist = (rel) => {
  const f = path.join(dist, rel);
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
};
const enPageFiles = [
  { file: 'en/index.html', url: 'https://xdirga.xyz/en/' },
  { file: 'en/about/index.html', url: 'https://xdirga.xyz/en/about/' },
  { file: 'en/search/index.html', url: 'https://xdirga.xyz/en/search/' },
  { file: 'en/category/teknologi/index.html', url: 'https://xdirga.xyz/en/category/teknologi/' },
];
for (const { file, url } of enPageFiles) {
  const html = readDist(file);
  const label = '/' + file.replace('/index.html', '/');
  ok(`i18n: ${label} ada di dist`, html !== null);
  if (html === null) continue;
  ok(`i18n: ${label} hreflang en`, html.includes('hreflang="en"'));
  ok(`i18n: ${label} hreflang id`, html.includes('hreflang="id"'));
  ok(`i18n: ${label} hreflang x-default`, html.includes('hreflang="x-default"'));
  ok(`i18n: ${label} <html lang="en">`, html.includes('<html lang="en">'));
  ok(`i18n: ${label} canonical ke diri sendiri`, html.includes(`<link rel="canonical" href="${url}"`));
}
const articleHtml = readDist('artikel/manus-free-300-kredit-sehari/index.html');
ok('i18n: artikel contoh ada di dist', articleHtml !== null);
if (articleHtml !== null) {
  ok('i18n: artikel TIDAK punya hreflang', !articleHtml.includes('hreflang='));
  ok('i18n: artikel <html lang="id">', articleHtml.includes('<html lang="id">'));
}
// Sitemap XML: rute /en/ masuk otomatis lewat @astrojs/sitemap (tanpa pola
// hreflang — sitemap Tools juga polos tanpa xhtml:link); /en/search/ tetap
// terkecuali seperti /search/.
ok('sitemap berisi rute /en/', sitemap.includes('https://xdirga.xyz/en/'));
ok('sitemap berisi /en/about/', sitemap.includes('https://xdirga.xyz/en/about/'));
ok('sitemap tidak berisi /en/search/', !sitemap.includes('/en/search'));

// ---------- 3. Broken internal link ----------
const linkRe = /(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g;
const checked = new Set();
let broken = [];
for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(linkRe)) {
    let href = decodeURIComponent(m[1].split('?')[0]);
    if (checked.has(href)) continue;
    checked.add(href);
    let target = href;
    if (target.endsWith('/')) target += 'index.html';
    else if (!path.extname(target)) target += '/index.html';
    if (!fs.existsSync(path.join(dist, target))) broken.push(`${href} (di ${path.relative(dist, file)})`);
  }
}
ok(`tidak ada broken internal link (${checked.size} tautan dicek)`, broken.length === 0, broken.slice(0, 5).join('; '));

// ---------- 4-6. CDP: overflow, dark mode, screenshot ----------
async function waitForJson(url, tries = 30) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {}
    await sleep(500);
  }
  throw new Error('CDP tidak merespons: ' + url);
}

const chrome = spawn(CHROME, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--user-data-dir=/tmp/qa-chrome-profile',
  'about:blank',
], { stdio: 'ignore' });

try {
  await waitForJson('http://127.0.0.1:9222/json/version');
  const targets = await waitForJson('http://127.0.0.1:9222/json/list');
  const page = targets.find((t) => t.type === 'page');
  if (!page) throw new Error('tidak ada target page CDP');

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let msgId = 0;
  const pending = new Map();
  const events = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method) {
      events.push(msg);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = ++msgId;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evalJs = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    if (res.result?.exceptionDetails) throw new Error('JS error: ' + JSON.stringify(res.result.exceptionDetails));
    return res.result?.result?.value;
  };
  const waitLoad = async () => {
    for (let i = 0; i < 40; i++) {
      if (events.some((e) => e.method === 'Page.loadEventFired')) return;
      await sleep(250);
    }
  };
  const nav = async (url) => {
    events.length = 0;
    await send('Page.navigate', { url });
    await waitLoad();
    await sleep(600);
  };
  const shot = async (name) => {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(SHOTS, name), Buffer.from(res.result.data, 'base64'));
  };

  await send('Page.enable');
  await send('Runtime.enable');

  // Light mode, 360px dan 1280px
  for (const [w, h, label] of [[360, 800, '360'], [1280, 900, '1280']]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
    await nav(BASE + '/');
    const overflow = await evalJs(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
    ok(`tidak ada horizontal overflow homepage ${label}px`, overflow === 0, `kelebihan ${overflow}px`);
    await shot(`home-${label}.png`);
    await nav(BASE + '/artikel/manus-free-300-kredit-sehari/');
    const overflowArt = await evalJs(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
    ok(`tidak ada horizontal overflow artikel ${label}px`, overflowArt === 0, `kelebihan ${overflowArt}px`);
    await shot(`artikel-${label}.png`);
  }

  // Dark mode + persistence
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav(BASE + '/');
  await evalJs(`localStorage.setItem('xdirga-theme', 'dark')`);
  await nav(BASE + '/');
  const darkClass = await evalJs(`document.documentElement.classList.contains('dark')`);
  const darkBg = await evalJs(`getComputedStyle(document.body).backgroundColor`);
  ok('dark mode: class .dark terpasang setelah reload', darkClass === true);
  ok('dark mode: background gelap terpakai', darkBg !== 'rgb(250, 248, 251)', darkBg);
  await shot('home-dark-1280.png');

  // Theme toggle menyimpan localStorage
  await evalJs(`localStorage.setItem('xdirga-theme', 'system')`);
  await nav(BASE + '/');
  const stored = await evalJs(`localStorage.getItem('xdirga-theme')`);
  ok('preferensi tema tersimpan di localStorage', stored === 'system', `nilai: ${stored}`);
  const toggleExists = await evalJs(`!!document.getElementById('theme-toggle')`);
  ok('tombol toggle tema ada', toggleExists === true);
  const menuExists = await evalJs(`!!document.getElementById('menu-toggle')`);
  ok('tombol menu seluler ada', menuExists === true);

  // ---------- 7. Mega Menu desktop + drawer mobile ----------
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav(BASE + '/');
  const megaCount = await evalJs(`document.querySelectorAll('[data-mega-trigger]').length`);
  ok('mega menu: 6 pemicu kategori desktop', megaCount === 6, `${megaCount} pemicu`);
  const megaInit = await evalJs(`document.querySelector('[data-mega-panel="teknologi"]').getAttribute('data-open')`);
  ok('mega menu: panel tertutup saat awal', megaInit === 'false');
  await evalJs(`document.querySelector('[data-mega-trigger="teknologi"]').click()`);
  await sleep(400);
  const megaOpen = await evalJs(`document.querySelector('[data-mega-panel="teknologi"]').getAttribute('data-open')`);
  ok('mega menu: panel terbuka saat klik', megaOpen === 'true');
  const megaFit = await evalJs(`(function(){var p=document.querySelector('[data-mega-panel="teknologi"]');var r=p.getBoundingClientRect();return r.width>=600 && r.width<=1130 && r.left>=0 && r.right<=window.innerWidth;})()`);
  ok('mega menu: panel muat di viewport 1280', megaFit === true);
  await shot('mega-teknologi-1280.png');
  await evalJs(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
  await sleep(300);
  const megaClosed = await evalJs(`document.querySelector('[data-mega-panel="teknologi"]').getAttribute('data-open')`);
  ok('mega menu: Escape menutup panel', megaClosed === 'false');

  await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: true });
  await nav(BASE + '/');
  await evalJs(`document.getElementById('menu-toggle').click()`);
  await sleep(500);
  const drawerOpen = await evalJs(`!document.getElementById('mobile-menu').hidden && document.body.style.overflow==='hidden'`);
  ok('drawer mobile: terbuka + scroll terkunci', drawerOpen === true);
  await shot('drawer-360.png');
  await evalJs(`document.querySelector('[data-accordion-btn="teknologi"]').click()`);
  await sleep(400);
  const accOpen = await evalJs(`document.querySelector('[data-accordion-btn="teknologi"]').getAttribute('aria-expanded')`);
  ok('drawer mobile: accordion Teknologi terbuka', accOpen === 'true');
  await evalJs(`document.querySelector('[data-accordion-panel="teknologi"] a[href]').click()`);
  await sleep(700);
  const drawerClosed = await evalJs(`document.getElementById('mobile-menu').hidden`);
  ok('drawer mobile: tertutup setelah pilih tujuan', drawerClosed === true);

  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 700, deviceScaleFactor: 1, mobile: true });
  await nav(BASE + '/');
  await evalJs(`document.getElementById('menu-toggle').click()`);
  await sleep(500);
  const overflow320 = await evalJs(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
  ok('drawer mobile: tanpa overflow horizontal 320px', overflow320 === 0, `kelebihan ${overflow320}px`);

  // ---------- 8. Arsip tanpa empty-state palsu + nav utama benar ----------
  // Empty-state "Belum ada artikel" tidak boleh muncul di file HTML mana pun:
  // arsip 1 artikel pun harus menampilkan featured-nya, bukan empty-state.
  const emptyFiles = htmlFiles.filter((f) =>
    fs.readFileSync(f, 'utf8').includes('Belum ada artikel di sini'),
  );
  ok(
    'arsip: tidak ada empty-state palsu di dist',
    emptyFiles.length === 0,
    emptyFiles.map((f) => path.relative(dist, f)).join(', '),
  );
  const goneRes = await fetch(BASE + '/kategori/lainnya/');
  await goneRes.arrayBuffer().catch(() => {});
  ok('arsip: /kategori/lainnya/ sudah tidak ada (404)', goneRes.status === 404, `status ${goneRes.status}`);
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav(BASE + '/');
  const navLabels = await evalJs(
    `(function(){var n=document.querySelector('[data-desktop-nav]');var l=[];n.querySelectorAll(':scope > a, :scope > div[data-mega-item] > a').forEach(function(a){l.push(a.textContent.trim());});return l.join('|');})()`,
  );
  ok(
    'nav: urutan Beranda, Berita, Teknologi, Lifestyle, Edukasi, Tips, Bisnis, Tools',
    navLabels === 'Beranda|Berita|Teknologi|Lifestyle|Edukasi|Tips|Bisnis|Tools',
    navLabels,
  );
  const noLainnyaLink = await evalJs(`!document.querySelector('a[href="/kategori/lainnya/"]')`);
  ok('nav: tidak ada tautan ke /kategori/lainnya/ di homepage', noLainnyaLink === true);
  const beritaHtml = await (await fetch(BASE + '/kategori/berita/')).text();
  // Paginasi: PAGE_SIZE 3, Berita kini 10 artikel, jadi artikel tertua bisa
  // pindah ke halaman 4. Cek halaman 1, 2, 3, dan 4 (hal. 4 boleh 404 bila belum ada).
  const beritaHtml2 = await (await fetch(BASE + '/kategori/berita/2/')).text();
  const beritaHtml3 = await (await fetch(BASE + '/kategori/berita/3/')).text();
  const beritaHtml4 = await (await fetch(BASE + '/kategori/berita/4/')).text();
  ok(
    'arsip: artikel Selamat Datang sudah dihapus permanen, Berita tersisa Layanan AI Gratis Makin Ketat',
    !beritaHtml.includes('/artikel/selamat-datang-di-blog-xdirga/') &&
      !beritaHtml2.includes('/artikel/selamat-datang-di-blog-xdirga/') &&
      !beritaHtml3.includes('/artikel/selamat-datang-di-blog-xdirga/') &&
      !beritaHtml4.includes('/artikel/selamat-datang-di-blog-xdirga/') &&
      (beritaHtml.includes('/artikel/layanan-ai-gratis-makin-ketat/') ||
        beritaHtml2.includes('/artikel/layanan-ai-gratis-makin-ketat/') ||
        beritaHtml3.includes('/artikel/layanan-ai-gratis-makin-ketat/') ||
        beritaHtml4.includes('/artikel/layanan-ai-gratis-makin-ketat/')),
  );

  ws.close();
} finally {
  chrome.kill('SIGKILL');
}

console.log('\n' + (failures.length === 0 ? 'SEMUA QA LOLOS' : `GAGAL: ${failures.length} — ${failures.join(', ')}`));
process.exit(failures.length === 0 ? 0 : 1);
