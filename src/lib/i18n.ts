/**
 * Kamus UI bilingual (EN/ID) untuk chrome blog + halaman listing/statis.
 *
 * Aturan:
 * - Yang diterjemahkan: label chrome (nav, footer, tombol, judul seksi,
 *   pagination, empty state, aria-label). Judul + deskripsi ARTIKEL,
 *   nama kategori, nama/tag penulis, dan bio penulis TIDAK diterjemahkan
 *   (itu konten, tetap Indonesia).
 * - URL EN hidup di prefix /en/; URL ID tetap di root. Artikel TIDAK
 *   punya versi EN — tautan artikel selalu /artikel/<slug>/.
 */

export type Lang = 'en' | 'id';

/** Label EN untuk 6 kategori primer di nav (data kategori tetap ID). */
export const CATEGORY_LABELS_EN: Record<string, string> = {
  berita: 'News',
  teknologi: 'Technology',
  lifestyle: 'Lifestyle',
  edukasi: 'Education',
  tips: 'Tips',
  bisnis: 'Business',
};

/** URL arsip kategori per bahasa (slug kategori tetap). */
export function categoryUrlFor(slug: string, lang: Lang): string {
  return lang === 'en' ? `/en/category/${slug}/` : `/kategori/${slug}/`;
}

/** URL arsip tag per bahasa (nama tag tetap). */
export function tagUrlFor(tag: string, lang: Lang): string {
  return lang === 'en' ? `/en/tag/${encodeURIComponent(tag)}/` : `/tag/${encodeURIComponent(tag)}/`;
}

/** URL arsip penulis per bahasa (slug penulis tetap). */
export function authorUrlFor(slug: string, lang: Lang): string {
  return lang === 'en' ? `/en/author/${slug}/` : `/author/${slug}/`;
}

export function homeUrl(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
}

export function aboutUrl(lang: Lang): string {
  return lang === 'en' ? '/en/about/' : '/tentang/';
}

export function contactUrl(lang: Lang): string {
  return lang === 'en' ? '/en/contact/' : '/kontak/';
}

export function privacyUrl(lang: Lang): string {
  return lang === 'en' ? '/en/privacy/' : '/privasi/';
}

export function termsUrl(lang: Lang): string {
  return lang === 'en' ? '/en/terms/' : '/syarat/';
}

export function sitemapUrl(lang: Lang): string {
  return lang === 'en' ? '/en/sitemap/' : '/sitemap/';
}

export function searchUrl(lang: Lang): string {
  return lang === 'en' ? '/en/search/' : '/search/';
}

export function categoriesIndexUrl(lang: Lang): string {
  return lang === 'en' ? '/en/category/' : '/kategori/';
}

export function tagsIndexUrl(lang: Lang): string {
  return lang === 'en' ? '/en/tag/' : '/tag/';
}

/** Tautan statis footer per bahasa (label sudah Inggris di kedua versi). */
export function footerStaticLinks(lang: Lang): { label: string; href: string }[] {
  return [
    { label: 'Privacy', href: privacyUrl(lang) },
    { label: 'Terms', href: termsUrl(lang) },
    { label: 'Sitemap', href: sitemapUrl(lang) },
    { label: 'About', href: aboutUrl(lang) },
  ];
}

/** Format tanggal pendek per bahasa ("14 Nov 2026" vs "Nov 14, 2026"). */
export function formatDateShortLang(date: Date, lang: Lang): string {
  if (lang === 'en') {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Deskripsi meta arsip berpaginasi (EN), cerminan archivePageDescription.
 * Halaman 1 memakai deskripsi dasar; halaman berikutnya memakai kalimat
 * lanjutan yang menyebut arsip dan posisi halamannya.
 */
export function archivePageDescriptionEn(
  base: string,
  currentPage: number,
  lastPage: number,
  label: string,
): string {
  if (currentPage <= 1) return base;
  return `More ${label} on XDIRGA BLOG, page ${currentPage} of ${lastPage}.`;
}

/** Semua string UI chrome, per bahasa. */
export const UI = {
  id: {
    skipLink: 'Lewati ke konten',
    logoHome: 'XDIRGA BLOG, ke beranda',
    mainNavAria: 'Navigasi utama',
    navHome: 'Beranda',
    navAbout: 'Tentang',
    navTools: 'Tools',
    openSubmenu: (label: string) => `Buka submenu ${label}`,
    submenu: (label: string) => `Submenu ${label}`,
    topics: 'Topik',
    latestIn: (label: string) => `Terbaru di ${label}`,
    seeAll: (label: string) => `Lihat Semua ${label}`,
    readMore: 'Baca selengkapnya',
    featuredArticle: (label: string) => `Artikel unggulan: ${label}`,
    searchAria: 'Cari artikel',
    themeAria: 'Ganti tema',
    menuAria: 'Buka menu',
    mobileNavAria: 'Navigasi seluler',
    mobileMenuClose: 'Tutup menu',
    allCategories: 'Semua Kategori',
    searchArticles: 'Cari Artikel',
    footerTagline:
      'Tempat menemukan informasi bermanfaat, sudut pandang segar, dan pengetahuan praktis.',
    footerAbout:
      'Publikasi digital independen. Ditulis mengalir, dari hal yang dicoba sendiri, tanpa paywall dan tanpa iklan.',
    footerRss: 'Ikuti lewat RSS',
    footerCategories: 'Kategori',
    footerCategoriesAria: 'Kategori di footer',
    footerLinks: 'Tautan',
    footerLinksAria: 'Tautan footer',
    footerAllTags: 'Semua Tag',
    minRead: (n: number) => `${n} menit baca`,
    paginationAria: 'Pagination',
    prevPage: '← Sebelumnya',
    nextPage: 'Berikutnya →',
    emptyArchive: 'Belum ada artikel di sini.',
    featuredSectionAria: 'Artikel unggulan',
    articleListAria: 'Daftar artikel',
    // Beranda
    homeTitle: 'XDIRGA BLOG — Berita, Teknologi, dan Tips Digital',
    homeH1: 'Berita, Teknologi, dan Tips Digital untuk Kehidupan Sehari-hari',
    homeSub: 'Tulisan soal gaya hidup, edukasi, dan bisnis, ditulis mengalir dari hal yang dicoba sendiri.',
    homeAboutAria: 'Tentang XDIRGA BLOG',
    homeTrendingAria: 'Artikel unggulan dan tren',
    trending: 'Sedang Tren',
    trendingMore: 'Cari tulisan lain →',
    browseCategoriesAria: 'Jelajahi kategori',
    latest: 'Terbaru',
    latestSeeAll: 'Lihat semua →',
    latestAria: 'Artikel terbaru',
    learnTitle: 'Belajar dan Berkembang',
    learnSub: 'Panduan praktis dan penjelasan yang gampang diikuti, buat yang mau belajar hal baru tanpa ribet.',
    learnAria: 'Tips dan edukasi',
    picksTitle: 'Pilihan Editor',
    picksSub: 'Tulisan pilihan soal kerja, gaya hidup, dan kabar yang layak dibaca sampai habis.',
    picksAria: 'Pilihan editor',
    exploreTitle: 'Jelajahi Lebih Lanjut',
    exploreAria: 'Jelajahi lebih lanjut',
    popularTopics: 'Topik Populer',
    publishedCount: (n: number, m: number) => `${n} tulisan diterbitkan sejauh ini, di ${m} kategori.`,
    followTitle: 'Jangan sampai ketinggalan tulisan baru',
    followText:
      'Semua tulisan di sini gratis dibaca, tanpa paywall dan tanpa iklan. Ikuti lewat RSS supaya tulisan baru langsung masuk ke pembaca favoritmu.',
    followAria: 'Ikuti XDIRGA BLOG',
    followSearch: 'Cari tulisan',
    // Indeks kategori/tag
    categoriesTitle: 'Kategori',
    categoriesIntro: 'Semua tulisan dikelompokkan ke dalam kategori supaya gampang dicari.',
    categoriesDesc: 'Jelajahi semua kategori di XDIRGA BLOG.',
    articleCount: (n: number) => `${n} tulisan`,
    tagsTitle: 'Semua Tag',
    tagsIntro: 'Topik yang dibahas di blog ini, dikelompokkan berdasarkan tag.',
    tagsDesc: 'Jelajahi semua tag di XDIRGA BLOG untuk menemukan tulisan berdasarkan topik yang lo cari.',
    tagsAria: 'Tag artikel',
    // Arsip
    breadcrumbHome: 'Beranda',
    breadcrumbCategories: 'Kategori',
    breadcrumbAllTags: 'Semua Tag',
    tagPageTitle: (tag: string) => `Tag ${tag}`,
    tagPageTitlePaged: (tag: string, n: number) => `Tag ${tag} (Halaman ${n})`,
    tagDescBase: (tag: string) => `Semua tulisan di XDIRGA BLOG dengan tag ${tag}.`,
    tagIntro: (tag: string, total: number) => `Semua tulisan dengan tag ${tag}. Total ${total} tulisan.`,
    pageSuffix: (n: number) => `(Halaman ${n})`,
    // Penulis
    authorPublished: (n: number) => `${n} tulisan diterbitkan`,
    authorTopics: 'Topik yang sering ditulis',
    authorTopicsAria: 'Topik yang sering ditulis',
    authorEmpty: 'Belum ada tulisan dari penulis ini.',
    authorArticlesAria: (name: string) => `Tulisan oleh ${name}`,
    // Pencarian
    searchTitle: 'Cari',
    searchDesc: 'Cari tulisan di XDIRGA BLOG.',
    searchIntro: 'Ketik kata kunci di bawah. Pencarian mencakup semua tulisan yang sudah diterbitkan.',
    searchHint: 'Tidak ketemu yang dicari? Coba kata yang lebih umum, misal AI, gratis, atau tips.',
    // Sitemap
    sitemapTitle: 'Sitemap',
    sitemapDesc: 'Daftar semua halaman dan artikel di XDIRGA BLOG, dikelompokkan per kategori.',
    sitemapIntro: 'Daftar semua halaman di blog ini, dikelompokkan per kategori supaya gampang dicari.',
    sitemapPages: 'Halaman',
    sitemapToolsEn: 'Tools (English)',
    sitemapToolsId: 'Tools (Bahasa Indonesia)',
  },
  en: {
    skipLink: 'Skip to content',
    logoHome: 'XDIRGA BLOG, to homepage',
    mainNavAria: 'Main navigation',
    navHome: 'Home',
    navAbout: 'About',
    navTools: 'Tools',
    openSubmenu: (label: string) => `Open submenu for ${label}`,
    submenu: (label: string) => `Submenu for ${label}`,
    topics: 'Topics',
    latestIn: (label: string) => `Latest in ${label}`,
    seeAll: (label: string) => `See all ${label}`,
    readMore: 'Read more',
    featuredArticle: (label: string) => `Featured article: ${label}`,
    searchAria: 'Search articles',
    themeAria: 'Change theme',
    menuAria: 'Open menu',
    mobileNavAria: 'Mobile navigation',
    mobileMenuClose: 'Close menu',
    allCategories: 'All Categories',
    searchArticles: 'Search Articles',
    footerTagline:
      'Where to find useful information, fresh perspectives, and practical knowledge.',
    footerAbout:
      'An independent digital publication. Written in a flowing style, from things tried firsthand, with no paywall and no ads.',
    footerRss: 'Follow via RSS',
    footerCategories: 'Categories',
    footerCategoriesAria: 'Categories in footer',
    footerLinks: 'Links',
    footerLinksAria: 'Footer links',
    footerAllTags: 'All Tags',
    minRead: (n: number) => `${n} min read`,
    paginationAria: 'Pagination',
    prevPage: '← Previous',
    nextPage: 'Next →',
    emptyArchive: 'No articles here yet.',
    featuredSectionAria: 'Featured article',
    articleListAria: 'Article list',
    // Homepage
    homeTitle: 'XDIRGA BLOG — News, Technology, and Digital Tips',
    homeH1: 'News, Technology, and Digital Tips for Everyday Life',
    homeSub: 'Writing about lifestyle, education, and business, flowing from things tried firsthand.',
    homeAboutAria: 'About XDIRGA BLOG',
    homeTrendingAria: 'Featured and trending articles',
    trending: 'Trending',
    trendingMore: 'Search for more articles →',
    browseCategoriesAria: 'Browse categories',
    latest: 'Latest',
    latestSeeAll: 'See all →',
    latestAria: 'Latest articles',
    learnTitle: 'Learn and Grow',
    learnSub: 'Practical guides and easy-to-follow explanations, for anyone who wants to pick up something new without the fuss.',
    learnAria: 'Tips and education',
    picksTitle: "Editor's Picks",
    picksSub: 'Handpicked writing about work, lifestyle, and news worth reading to the end.',
    picksAria: "Editor's picks",
    exploreTitle: 'Explore More',
    exploreAria: 'Explore more',
    popularTopics: 'Popular Topics',
    publishedCount: (n: number, m: number) => `${n} articles published so far, across ${m} categories.`,
    followTitle: "Don't miss new articles",
    followText:
      'Everything here is free to read, with no paywall and no ads. Follow via RSS so new articles land straight in your favorite reader.',
    followAria: 'Follow XDIRGA BLOG',
    followSearch: 'Search articles',
    // Category/tag indexes
    categoriesTitle: 'Categories',
    categoriesIntro: 'All articles grouped into categories so they are easy to find.',
    categoriesDesc: 'Browse all categories on XDIRGA BLOG.',
    articleCount: (n: number) => `${n} articles`,
    tagsTitle: 'All Tags',
    tagsIntro: 'Topics covered on this blog, grouped by tag.',
    tagsDesc: 'Browse all tags on XDIRGA BLOG to find articles by the topic you are looking for.',
    tagsAria: 'Article tags',
    // Archives
    breadcrumbHome: 'Home',
    breadcrumbCategories: 'Categories',
    breadcrumbAllTags: 'All Tags',
    tagPageTitle: (tag: string) => `Tag ${tag}`,
    tagPageTitlePaged: (tag: string, n: number) => `Tag ${tag} (Page ${n})`,
    tagDescBase: (tag: string) => `All articles on XDIRGA BLOG tagged ${tag}.`,
    tagIntro: (tag: string, total: number) => `All articles tagged ${tag}. ${total} articles in total.`,
    pageSuffix: (n: number) => `(Page ${n})`,
    // Author
    authorPublished: (n: number) => `${n} articles published`,
    authorTopics: 'Frequently covered topics',
    authorTopicsAria: 'Frequently covered topics',
    authorEmpty: 'No articles from this author yet.',
    authorArticlesAria: (name: string) => `Articles by ${name}`,
    // Search
    searchTitle: 'Search',
    searchDesc: 'Search articles on XDIRGA BLOG.',
    searchIntro: 'Type a keyword below. Search covers every published article.',
    searchHint: "Can't find what you're looking for? Try a more general word, like AI, free, or tips.",
    // Sitemap
    sitemapTitle: 'Sitemap',
    sitemapDesc: 'A list of all pages and articles on XDIRGA BLOG, grouped by category.',
    sitemapIntro: 'A list of every page on this blog, grouped by category so it is easy to browse.',
    sitemapPages: 'Pages',
    sitemapToolsEn: 'Tools (English)',
    sitemapToolsId: 'Tools (Bahasa Indonesia)',
  },
} as const;

export type UiStrings = (typeof UI)[Lang];

export function ui(lang: Lang): UiStrings {
  return UI[lang];
}
