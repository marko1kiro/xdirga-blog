import { getCollection, type CollectionEntry } from 'astro:content';

export type Tool = CollectionEntry<'tools'>;
export type ToolLang = 'en' | 'id';
export type ToolPlatform = Tool['data']['platforms'][number];
export type ToolAudience = Tool['data']['audiences'][number];
export type ToolPricingType = Tool['data']['pricingType'];

export interface ToolCategoryMeta {
  slug: string;
  labelEn: string;
  labelId: string;
  descriptionEn: string;
  descriptionId: string;
}

/** 9 kategori direktori Tools (kontrak Stage 2). */
export const TOOL_CATEGORIES: ToolCategoryMeta[] = [
  {
    slug: 'ai-automation',
    labelEn: 'AI & Automation',
    labelId: 'AI & Otomasi',
    descriptionEn: 'Tools that use AI to automate work, generate content, or assist decisions.',
    descriptionId: 'Tools yang memakai AI untuk mengotomasi pekerjaan, menghasilkan konten, atau membantu pengambilan keputusan.',
  },
  {
    slug: 'design-creative',
    labelEn: 'Design & Creative',
    labelId: 'Desain & Kreatif',
    descriptionEn: 'Design, illustration, and creative production tools.',
    descriptionId: 'Tools desain, ilustrasi, dan produksi kreatif.',
  },
  {
    slug: 'video-audio',
    labelEn: 'Video & Audio',
    labelId: 'Video & Audio',
    descriptionEn: 'Video editing, audio production, and transcription tools.',
    descriptionId: 'Tools editing video, produksi audio, dan transkripsi.',
  },
  {
    slug: 'productivity',
    labelEn: 'Productivity',
    labelId: 'Produktivitas',
    descriptionEn: 'Note-taking, task management, and everyday workflow tools.',
    descriptionId: 'Tools pencatatan, manajemen tugas, dan alur kerja sehari-hari.',
  },
  {
    slug: 'developer-engineering',
    labelEn: 'Developer & Engineering',
    labelId: 'Developer & Rekayasa',
    descriptionEn: 'Code editors, APIs, hosting, and engineering utilities.',
    descriptionId: 'Editor kode, API, hosting, dan utilitas rekayasa.',
  },
  {
    slug: 'marketing-growth',
    labelEn: 'Marketing & Growth',
    labelId: 'Pemasaran & Pertumbuhan',
    descriptionEn: 'SEO, social media, email, and audience growth tools.',
    descriptionId: 'Tools SEO, media sosial, email, dan pertumbuhan audiens.',
  },
  {
    slug: 'business-finance',
    labelEn: 'Business & Finance',
    labelId: 'Bisnis & Keuangan',
    descriptionEn: 'Invoicing, accounting, payments, and business operations.',
    descriptionId: 'Tools penagihan, akuntansi, pembayaran, dan operasional bisnis.',
  },
  {
    slug: 'education-learning',
    labelEn: 'Education & Learning',
    labelId: 'Edukasi & Pembelajaran',
    descriptionEn: 'Courses, language learning, and study tools.',
    descriptionId: 'Tools kursus, belajar bahasa, dan alat belajar.',
  },
  {
    slug: 'website-infrastructure',
    labelEn: 'Website & Infrastructure',
    labelId: 'Website & Infrastruktur',
    descriptionEn: 'Domains, website builders, analytics, and site infrastructure.',
    descriptionId: 'Tools domain, pembangun website, analitik, dan infrastruktur situs.',
  },
];

export function getCategoryMeta(slug: string): ToolCategoryMeta | undefined {
  return TOOL_CATEGORIES.find((c) => c.slug === slug);
}

export function categoryLabel(slug: string, lang: ToolLang): string {
  const meta = getCategoryMeta(slug);
  if (!meta) return slug;
  return lang === 'id' ? meta.labelId : meta.labelEn;
}

export const PRICING_LABELS: Record<ToolPricingType, { en: string; id: string }> = {
  free: { en: 'Free', id: 'Gratis' },
  freemium: { en: 'Freemium', id: 'Freemium' },
  'free-trial': { en: 'Free trial', id: 'Uji coba gratis' },
  paid: { en: 'Paid', id: 'Berbayar' },
};

export const PLATFORM_LABELS: Record<ToolPlatform, { en: string; id: string }> = {
  web: { en: 'Web', id: 'Web' },
  windows: { en: 'Windows', id: 'Windows' },
  macos: { en: 'macOS', id: 'macOS' },
  linux: { en: 'Linux', id: 'Linux' },
  android: { en: 'Android', id: 'Android' },
  ios: { en: 'iOS', id: 'iOS' },
};

export const AUDIENCE_LABELS: Record<ToolAudience, { en: string; id: string }> = {
  individual: { en: 'Individuals', id: 'Individu' },
  creator: { en: 'Creators', id: 'Kreator' },
  developer: { en: 'Developers', id: 'Developer' },
  'small-business': { en: 'Small businesses', id: 'Bisnis kecil' },
  enterprise: { en: 'Enterprise', id: 'Enterprise' },
};

/** Rubrik hybrid scoring: 6 dimensi, total 100 poin (= skor skala 10). */
export const SCORE_DIMENSIONS = [
  {
    key: 'usefulness',
    max: 25,
    labelEn: 'Usefulness',
    labelId: 'Kegunaan',
    descriptionEn: 'How well the tool solves a real problem for its intended audience.',
    descriptionId: 'Seberapa baik tool ini menyelesaikan masalah nyata untuk audiens yang dituju.',
  },
  {
    key: 'features',
    max: 20,
    labelEn: 'Features',
    labelId: 'Fitur',
    descriptionEn: 'Breadth and depth of the features offered, based on official documentation.',
    descriptionId: 'Luas dan kedalaman fitur yang ditawarkan, berdasarkan dokumentasi resmi.',
  },
  {
    key: 'easeOfUse',
    max: 15,
    labelEn: 'Ease of use',
    labelId: 'Kemudahan pakai',
    descriptionEn: 'How easy the tool is to learn and use day to day.',
    descriptionId: 'Seberapa mudah tool ini dipelajari dan dipakai sehari-hari.',
  },
  {
    key: 'pricing',
    max: 20,
    labelEn: 'Pricing & value',
    labelId: 'Harga & nilai',
    descriptionEn: 'What the free plan covers and whether paid plans are fairly priced.',
    descriptionId: 'Apa yang dicakup paket gratis dan apakah paket berbayarnya sepadan.',
  },
  {
    key: 'platform',
    max: 10,
    labelEn: 'Platform & accessibility',
    labelId: 'Platform & aksesibilitas',
    descriptionEn: 'Availability across web, desktop, and mobile, plus accessibility.',
    descriptionId: 'Ketersediaan di web, desktop, dan mobile, plus aksesibilitas.',
  },
  {
    key: 'transparency',
    max: 10,
    labelEn: 'Transparency & trust',
    labelId: 'Transparansi & kepercayaan',
    descriptionEn: 'Clear pricing, terms, privacy policy, and vendor track record.',
    descriptionId: 'Kejelasan harga, ketentuan, kebijakan privasi, dan rekam jejak vendor.',
  },
] as const;

export type ScoreDimensionKey = (typeof SCORE_DIMENSIONS)[number]['key'];

/** Total breakdown (skala 100). Harus sama dengan Math.round(reviewScore * 10). */
export function breakdownTotal(breakdown: Tool['data']['scoreBreakdown']): number {
  return (
    breakdown.usefulness +
    breakdown.features +
    breakdown.easeOfUse +
    breakdown.pricing +
    breakdown.platform +
    breakdown.transparency
  );
}

/** Skor skala 10 → persen (0–100). */
export function scoreToPercent(score: number): number {
  return Math.round((score / 10) * 100);
}

export function toolSlug(tool: Tool): string {
  return tool.data.slug;
}

export function toolUrl(tool: Tool | string, lang: ToolLang = 'en'): string {
  const slug = typeof tool === 'string' ? tool : tool.data.slug;
  return lang === 'id' ? `/id/tools/${slug}/` : `/tools/${slug}/`;
}

export function categoryUrl(slug: string, lang: ToolLang = 'en'): string {
  return lang === 'id' ? `/id/tools/kategori/${slug}/` : `/tools/category/${slug}/`;
}

export function toolsIndexUrl(lang: ToolLang = 'en'): string {
  return lang === 'id' ? '/id/tools/' : '/tools/';
}

export function editorialPolicyUrl(lang: ToolLang = 'en'): string {
  return lang === 'id' ? '/id/tools/kebijakan-editorial/' : '/tools/editorial-policy/';
}

/**
 * Semua tool berstatus active.
 * 'featured': unggulan dulu, lalu nama A–Z. 'newest': publishedAt terbaru dulu.
 */
export async function getAllTools(sort: 'featured' | 'newest' = 'featured'): Promise<Tool[]> {
  const tools = await getCollection('tools', ({ data }) => data.status === 'active');
  if (sort === 'newest') {
    return tools.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  }
  return tools.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.name.localeCompare(b.data.name, 'en'),
  );
}

/** Tool active dalam satu kategori (kategori utama maupun tambahan). */
export async function getToolsByCategory(slug: string): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((t) => t.data.categories.includes(slug));
}

/** Tool active yang ditandai featured. */
export async function getFeaturedTools(): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((t) => t.data.featured);
}

/** Satu tool berdasarkan slug (cocok dengan field `slug` atau nama file YAML). */
export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const tools = await getCollection('tools');
  return tools.find((t) => t.data.slug === slug || t.id.replace(/\.yaml$/, '') === slug);
}
