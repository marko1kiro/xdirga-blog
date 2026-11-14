export const SITE = {
  name: 'XDIRGA BLOG',
  shortName: 'XDIRGA',
  tagline: 'Tempat menemukan informasi bermanfaat, sudut pandang segar, dan pengetahuan praktis.',
  description:
    'XDIRGA BLOG adalah publikasi digital independen berisi berita, teknologi, gaya hidup, edukasi, tips, dan bisnis. Ditulis mengalir, dari hal yang dicoba sendiri.',
  url: 'https://xdirga.xyz',
  locale: 'id-ID',
  language: 'id',
  author: 'XDIRGA',
} as const;

export const NAV_STATIC = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang/' },
  { label: 'Cari', href: '/search/' },
] as const;

export const FOOTER_STATIC = [
  { label: 'Privacy', href: '/privasi/' },
  { label: 'Terms', href: '/syarat/' },
  { label: 'Sitemap', href: '/sitemap/' },
  { label: 'About', href: '/tentang/' },
] as const;

export const PAGE_SIZE = 3;
