import type { MetadataRoute } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'de', 'fr', 'pt'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://safehaven-dash.vercel.app';
  const now = new Date();

  const pages: { path: string; freq: 'hourly' | 'monthly' | 'yearly'; priority: number }[] = [
    { path: '', freq: 'hourly', priority: 1 },
    { path: '/about', freq: 'monthly', priority: 0.8 },
    { path: '/how-to-use', freq: 'monthly', priority: 0.8 },
    { path: '/gold-price-today', freq: 'hourly', priority: 0.9 },
    { path: '/market-fear-index', freq: 'hourly', priority: 0.9 },
    { path: '/privacy', freq: 'yearly', priority: 0.3 },
    { path: '/terms', freq: 'yearly', priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.freq,
        priority: page.priority,
      });
    }
  }

  return entries;
}
