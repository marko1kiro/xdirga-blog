import type { Article, Category } from '../lib/articles';
import { articleUrl, categoryUrl, tagUrl } from '../lib/articles';

/**
 * Navigasi utama XDIRGA BLOG — satu sumber data untuk desktop dan mobile.
 *
 * Aturan durable:
 * - Hanya rute nyata yang boleh jadi tautan: arsip kategori (/kategori/),
 *   arsip tag (/tag/), dan artikel terbit (/artikel/). Subkategori usulan
 *   konsultan (Nasional, Politik, dst.) TIDAK dibuat jadi tautan karena
 *   tidak ada artikel maupun rutenya — tautan mati dilarang.
 * - "Lainnya" tidak masuk nav utama, tapi arsipnya (/kategori/lainnya/)
 *   tetap hidup dan terdaftar di halaman /kategori/.
 * - Deskripsi kategori diambil dari src/content/categories/*.yaml.
 */

export interface NavLink {
  label: string;
  href: string;
  count?: number;
}

export interface NavItem {
  /** slug kategori, dipakai untuk id panel/accordion */
  slug: string;
  label: string;
  href: string;
  description: string;
  /** Topik nyata di kategori ini (tag artikel terbit, terbanyak dulu, maks 6). */
  tags: NavLink[];
  /** Artikel terbaru di kategori ini (maks 3). */
  latest: NavLink[];
}

/** Urutan kategori di nav utama. */
export const PRIMARY_CATEGORY_SLUGS = [
  'berita',
  'teknologi',
  'lifestyle',
  'edukasi',
  'tips',
  'bisnis',
] as const;

export const MAX_NAV_TAGS = 6;
export const MAX_NAV_LATEST = 3;

export function buildNavigation(categories: Category[], articles: Article[]): NavItem[] {
  const bySlug = new Map(categories.map((c) => [c.id, c]));
  return PRIMARY_CATEGORY_SLUGS.map((slug) => {
    const cat = bySlug.get(slug);
    if (!cat) {
      throw new Error(
        `Kategori "${slug}" tidak ada di src/content/categories/. Tambahkan ${slug}.yaml atau perbaiki PRIMARY_CATEGORY_SLUGS.`,
      );
    }
    // articles sudah terurut terbaru dulu (getPublishedArticles).
    const inCat = articles.filter((a) => a.data.category === slug);
    const tagCounts = new Map<string, number>();
    for (const a of inCat) {
      for (const t of a.data.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
    const tags: NavLink[] = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_NAV_TAGS)
      .map(([tag, count]) => ({ label: tag, href: tagUrl(tag), count }));
    const latest: NavLink[] = inCat
      .slice(0, MAX_NAV_LATEST)
      .map((a) => ({ label: a.data.title, href: articleUrl(a) }));
    return {
      slug,
      label: cat.data.name,
      href: categoryUrl(slug),
      description: cat.data.description ?? '',
      tags,
      latest,
    };
  });
}
