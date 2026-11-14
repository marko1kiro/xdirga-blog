import rss from '@astrojs/rss';
import { getIndexableArticles } from '../lib/articles';
import { articleUrl } from '../lib/articles';
import { SITE } from '../lib/site';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getIndexableArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: articleUrl(post),
      categories: [post.data.category, ...post.data.tags],
    })),
  });
};
