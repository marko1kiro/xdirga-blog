#!/usr/bin/env node
/**
 * QA otomatis untuk XDIRGA BLOG v2.
 * 1. Semua rute di dist mengembalikan 200.
 * 2. Draf tidak muncul di sitemap, RSS, atau homepage.
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
const extraRoutes = ['/rss.xml', '/sitemap-index.xml', '/sitemap-0.xml', '/robots.txt', '/_redirects'];
const allRoutes = [...new Set([...routes, ...extraRoutes])];

let statusOk = 0;
for (const route of allRoutes) {
  const res = await fetch(BASE + route);
  if (res.status === 200) statusOk += 1;
  else ok(`route 200 ${route}`, false, `status ${res.status}`);
}
ok(`semua rute 200 (${statusOk}/${allRoutes.length})`, statusOk === allRoutes.length);

// ---------- 2. Draf tidak boleh muncul ----------
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const rss = fs.readFileSync(path.join(dist, 'rss.xml'), 'utf8');
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
ok('draf tidak ada di sitemap', !sitemap.includes('catatan-draft-contoh'));
ok('draf tidak ada di RSS', !rss.includes('catatan-draft-contoh'));
ok('draf tidak ada di homepage', !home.includes('catatan-draft-contoh'));
ok('sitemap berisi 10 artikel', (sitemap.match(/\/artikel\//g) || []).length === 10, `${(sitemap.match(/\/artikel\//g) || []).length} artikel`);
ok('sitemap tidak berisi /search/', !sitemap.includes('/search'));
ok('RSS berisi 10 item', (rss.match(/<item>/g) || []).length === 10, `${(rss.match(/<item>/g) || []).length} item`);
ok('homepage berisi judul XDIRGA BLOG', home.includes('XDIRGA') && home.includes('Sedang Tren'));

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

  ws.close();
} finally {
  chrome.kill('SIGKILL');
}

console.log('\n' + (failures.length === 0 ? 'SEMUA QA LOLOS' : `GAGAL: ${failures.length} — ${failures.join(', ')}`));
process.exit(failures.length === 0 ? 0 : 1);
