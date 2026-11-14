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

export const collections = { articles, authors, categories };
