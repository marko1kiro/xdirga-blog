// Adapter tampilan XDIRGA TOOLS di atas src/lib/tools.ts (Tim Data).
// Satu sumber kebenaran untuk data + label kategori/harga/platform/audience
// adalah src/lib/tools.ts — file ini HANYA menambah yang tidak ada di sana:
// ukuran halaman, URL paginasi /page/<n>/, hitungan aktual untuk sidebar,
// dan teks pencarian client-side. Jangan duplikasi konstanta Tim Data di sini.

import {
  AUDIENCE_LABELS,
  PLATFORM_LABELS,
  PRICING_LABELS,
  TOOL_CATEGORIES,
  categoryLabel,
  categoryUrl,
  getCategoryMeta,
  toolUrl,
  toolsIndexUrl,
  type Tool,
  type ToolAudience,
  type ToolLang,
  type ToolPlatform,
  type ToolPricingType,
} from './tools';

export type { Tool };
export type Lang = ToolLang;
export { TOOL_CATEGORIES, categoryLabel, toolUrl };

/** Ukuran halaman arsip All Tools (server-side). */
export const TOOLS_PAGE_SIZE = 20;

// ---------- URL (tambah paginasi; sisanya teruskan dari tools.ts) ----------

export function toolsHomeUrl(lang: Lang): string {
  return toolsIndexUrl(lang);
}

export function toolCategoryUrl(slug: string, lang: Lang): string {
  return categoryUrl(slug, lang);
}

/** Halaman 1 = homepage arsip; halaman 2+ = /tools/page/<n>/ (atau /id/tools/page/<n>/). */
export function toolsPageUrl(page: number, lang: Lang): string {
  if (page <= 1) return toolsIndexUrl(lang);
  return lang === 'id' ? `/id/tools/page/${page}/` : `/tools/page/${page}/`;
}

export function categoryDescription(slug: string, lang: Lang): string {
  const meta = getCategoryMeta(slug);
  if (!meta) return '';
  return lang === 'id' ? meta.descriptionId : meta.descriptionEn;
}

// ---------- Label filter ----------

export const PRICING_VALUES = Object.keys(PRICING_LABELS) as ToolPricingType[];
export const PLATFORM_VALUES = Object.keys(PLATFORM_LABELS) as ToolPlatform[];

export function pricingLabel(value: string, lang: Lang): string {
  const hit = (PRICING_LABELS as Record<string, { en: string; id: string }>)[value];
  if (!hit) return value;
  return lang === 'id' ? hit.id : hit.en;
}

export function platformLabel(value: string): string {
  const hit = (PLATFORM_LABELS as Record<string, { en: string; id: string }>)[value];
  return hit ? hit.en : value;
}

export function audienceLabel(value: string, lang: Lang): string {
  const hit = (AUDIENCE_LABELS as Record<string, { en: string; id: string }>)[value];
  if (!hit) return value;
  return lang === 'id' ? hit.id : hit.en;
}

// ---------- Hitung jumlah aktual dari data ----------

export interface CategoryNavItem {
  slug: string;
  label: string;
  count: number;
  href: string;
}

/**
 * Daftar kategori + jumlah listing AKTUAL, untuk ToolsSidebar.
 * Tool yang punya beberapa kategori dihitung di tiap kategorinya
 * (konsisten dengan arsip kategori via getToolsByCategory).
 */
export function buildCategoryNav(tools: Tool[], lang: Lang): CategoryNavItem[] {
  return TOOL_CATEGORIES.map((cat) => ({
    slug: cat.slug,
    label: lang === 'id' ? cat.labelId : cat.labelEn,
    count: tools.filter((t) => t.data.categories.includes(cat.slug)).length,
    href: categoryUrl(cat.slug, lang),
  }));
}

export function countByPricing(tools: Tool[]): Record<string, number> {
  // Semua nilai diinisialisasi 0 supaya badge "0" tetap tampil bila kosong.
  const counts: Record<string, number> = Object.fromEntries(PRICING_VALUES.map((v) => [v, 0]));
  for (const tool of tools) {
    const key = tool.data.pricingType;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function countByPlatform(tools: Tool[]): Record<string, number> {
  const counts: Record<string, number> = Object.fromEntries(PLATFORM_VALUES.map((v) => [v, 0]));
  for (const tool of tools) {
    for (const platform of tool.data.platforms) {
      counts[platform] = (counts[platform] ?? 0) + 1;
    }
  }
  return counts;
}

export interface AudienceNavItem {
  value: string;
  label: string;
  count: number;
}

/** Audience dari data aktual (schema: audiences wajib minimal 1 per tool). */
export function distinctAudiences(tools: Tool[], lang: Lang): AudienceNavItem[] {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    for (const audience of tool.data.audiences) {
      counts.set(audience, (counts.get(audience) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({
      value,
      label: audienceLabel(value, lang),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

// ---------- Teks tampilan & pencarian client-side ----------

/** Deskripsi singkat sesuai bahasa halaman. */
export function shortDescription(tool: Tool, lang: Lang): string {
  return tool.data.shortDescription[lang];
}

/**
 * Teks haystack untuk pencarian client-side (nama, vendor, deskripsi
 * singkat + panjang dua bahasa, kategori, tag) — dinormalisasi ke huruf kecil.
 */
export function toolSearchText(tool: Tool): string {
  const data = tool.data;
  return [
    data.name,
    data.vendor,
    data.shortDescription.en,
    data.shortDescription.id,
    data.description.en,
    data.description.id,
    ...data.categories.map((slug) => categoryLabel(slug, 'en')),
    ...data.categories.map((slug) => categoryLabel(slug, 'id')),
    ...data.tags,
  ]
    .join(' ')
    .toLowerCase();
}

// Re-export tipe yang dipakai komponen (tanpa menambah sumber kebenaran baru).
export type { ToolAudience, ToolPlatform, ToolPricingType };
