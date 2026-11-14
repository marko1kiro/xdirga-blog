import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(1, 'title wajib diisi'),
    description: z.string().min(1, 'description wajib diisi'),
    category: z.string().min(1, 'category wajib diisi (slug kategori, mis. teknologi)'),
    tags: z.array(z.string()).default([]),
    author: z.string().default('xdirga'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    // Tanggal terakhir isi artikel DIPERIKSA kebenarannya (bukan tanggal tulis/terbit/update).
    // Hanya diisi setelah verifikasi nyata ke sumber, jangan pernah dari waktu build/deploy.
    lastVerifiedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    featured: z.boolean().default(false),
    trending: z.boolean().default(false),
    cover: z.string().min(1, 'cover wajib diisi (path file di /covers/)'),
    coverAlt: z.string().min(1, 'coverAlt wajib diisi'),
    coverCaption: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalURL: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/authors' }),
  schema: z.object({
    name: z.string().min(1),
    role: z.string().optional(),
    bio: z.string().min(1),
    avatar: z.string().min(1),
    website: z.string().url().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories' }),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    order: z.number().default(99),
  }),
});

// Direktori tools (XDIRGA TOOLS): satu file YAML per tool.
// Skor: total scoreBreakdown (skala 100) HARUS sama dengan Math.round(reviewScore * 10).
const localizedString = z.object({
  en: z.string().min(1),
  id: z.string().min(1),
});

const localizedList = z.object({
  en: z.array(z.string()).default([]),
  id: z.array(z.string()).default([]),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/tools' }),
  schema: z
    .object({
      slug: z.string().min(1),
      name: z.string().min(1),
      vendor: z.string().min(1),
      officialWebsite: z.string().url(),
      logo: z.string().min(1, 'logo wajib diisi (path file di /tools/logos/)'),
      logoSource: z.string().min(1),
      // Kategori pertama = kategori utama.
      categories: z.array(z.string().min(1)).min(1, 'categories wajib diisi minimal 1'),
      tags: z
        .array(z.string())
        .default([])
        .refine((tags) => tags.every((t) => t === t.toLowerCase()), 'tags harus lowercase'),
      platforms: z
        .array(z.enum(['web', 'windows', 'macos', 'linux', 'android', 'ios']))
        .min(1, 'platforms wajib diisi minimal 1'),
      audiences: z
        .array(z.enum(['individual', 'creator', 'developer', 'small-business', 'enterprise']))
        .min(1, 'audiences wajib diisi minimal 1'),
      pricingType: z.enum(['free', 'freemium', 'free-trial', 'paid']),
      status: z.enum(['active', 'discontinued', 'temporarily-unavailable', 'archived']),
      featured: z.boolean().default(false),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      reviewedAt: z.coerce.date().optional(),
      lastVerifiedAt: z.coerce.date(),
      reviewScore: z
        .number()
        .min(0)
        .max(10)
        .refine(
          (v) => Math.abs(v * 10 - Math.round(v * 10)) < 1e-9,
          'reviewScore harus satu desimal (0–10)',
        ),
      scoreBreakdown: z.object({
        usefulness: z.number().int().min(0).max(25),
        features: z.number().int().min(0).max(20),
        easeOfUse: z.number().int().min(0).max(15),
        pricing: z.number().int().min(0).max(20),
        platform: z.number().int().min(0).max(10),
        transparency: z.number().int().min(0).max(10),
      }),
      verdict: localizedString,
      bestFor: localizedList,
      pros: localizedList,
      cons: localizedList,
      alternatives: z.array(z.string()).default([]),
      reviewMethod: z.literal('research-based'),
      sources: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.string().url(),
          }),
        )
        .min(1, 'sources wajib diisi minimal 1'),
      shortDescription: localizedString,
      description: localizedString,
      features: localizedList,
      pricingNote: localizedString,
    })
    .refine(
      (d) => {
        const total =
          d.scoreBreakdown.usefulness +
          d.scoreBreakdown.features +
          d.scoreBreakdown.easeOfUse +
          d.scoreBreakdown.pricing +
          d.scoreBreakdown.platform +
          d.scoreBreakdown.transparency;
        return total === Math.round(d.reviewScore * 10);
      },
      {
        message:
          'Jumlah scoreBreakdown harus sama dengan Math.round(reviewScore * 10) (skala 100 vs skala 10)',
      },
    ),
});

export const collections = { articles, authors, categories, tools };
