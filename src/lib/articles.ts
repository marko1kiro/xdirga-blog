import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;
export type Author = CollectionEntry<'authors'>;
export type Category = CollectionEntry<'categories'>;

export function articleSlug(article: Article): string {
  return article.id.replace(/\.(md|mdx)$/, '');
}

export function articleUrl(article: Article): string {
  return `/artikel/${articleSlug(article)}/`;
}

export function categoryUrl(slug: string): string {
  return `/kategori/${slug}/`;
}

export function tagUrl(tag: string): string {
  return `/tag/${encodeURIComponent(tag)}/`;
}

export function authorUrl(slug: string): string {
  return `/author/${slug}/`;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** BreadcrumbList JSON-LD dari trail yang sama dengan breadcrumb visual. */
export function breadcrumbJsonLd(items: BreadcrumbItem[], siteUrl = 'https://xdirga.xyz') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, siteUrl).href } : {}),
    })),
  };
}

/**
 * Deskripsi meta untuk halaman arsip berpaginasi.
 * Halaman 1 memakai deskripsi dasar; halaman berikutnya memakai kalimat
 * lanjutan yang menyebut arsip dan posisi halamannya, bukan sekadar angka.
 */
export function archivePageDescription(
  base: string,
  currentPage: number,
  lastPage: number,
  label: string,
): string {
  if (currentPage <= 1) return base;
  return `Lanjutan ${label} di XDIRGA BLOG, halaman ${currentPage} dari ${lastPage}.`;
}

/** Artikel terbit (status published), terbaru dulu. Draft tidak pernah lolos dari sini. */
export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => data.status === 'published');
  return articles.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

/** Artikel terbit yang boleh masuk sitemap (bukan noindex). RSS sudah dihapus total. */
export async function getIndexableArticles(): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published.filter((a) => !a.data.noindex);
}

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDateID(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export async function getAuthor(slug: string): Promise<Author | undefined> {
  return getEntry('authors', slug);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return getEntry('categories', slug);
}

export async function getCategories(): Promise<Category[]> {
  const categories = await getCollection('categories');
  return categories.sort((a, b) => a.data.order - b.data.order);
}

/** Semua tag dari artikel terbit, beserta jumlah pemakaian. */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const articles = await getPublishedArticles();
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'id'));
}

/**
 * Artikel terkait: kategori sama dulu, lalu tag yang sama, lalu terbaru.
 * Tidak pernah mengembalikan artikel itu sendiri.
 */
export function relatedArticles(article: Article, all: Article[], count = 3): Article[] {
  const others = all.filter((a) => articleSlug(a) !== articleSlug(article));
  const score = (a: Article) => {
    let s = 0;
    if (a.data.category === article.data.category) s += 10;
    s += a.data.tags.filter((t) => article.data.tags.includes(t)).length * 3;
    return s;
  };
  return others
    .sort((a, b) => score(b) - score(a) || b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
    .slice(0, count);
}

/** Artikel sebelum dan sesudah dalam urutan kronologis (terbaru dulu). */
export function prevNext(article: Article, all: Article[]): { prev: Article | null; next: Article | null } {
  const index = all.findIndex((a) => articleSlug(a) === articleSlug(article));
  if (index === -1) return { prev: null, next: null };
  return {
    // "Sebelumnya" = artikel yang lebih baru (di atas dalam daftar)
    prev: index > 0 ? all[index - 1] : null,
    // "Berikutnya" = artikel yang lebih lama
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

/** Slug heading mengikuti cara Astro memberi id pada heading (github-slugger). */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Ambil daftar isi dari heading ## dan ### di isi artikel. */
export function tocFromBody(body: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of body.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, '').trim();
    if (!text) continue;
    items.push({
      depth: match[1].length === 2 ? 2 : 3,
      text,
      id: slugifyHeading(text),
    });
  }
  return items;
}

/**
 * Validasi: setiap artikel terbit harus memakai kategori yang terdaftar.
 * Dipanggil di getStaticPaths supaya build gagal dengan pesan yang jelas.
 */
export async function validateArticleCategories(articles: Article[]): Promise<void> {
  const categories = await getCategories();
  const known = new Set(categories.map((c) => c.id));
  for (const article of articles) {
    if (!known.has(article.data.category)) {
      throw new Error(
        `Artikel "${articleSlug(article)}" memakai kategori "${article.data.category}" yang tidak ada di src/content/categories/. Tambahkan file src/content/categories/${article.data.category}.yaml atau perbaiki frontmatter.`,
      );
    }
  }
}
