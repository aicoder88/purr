import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://www.purrify.ca';

// Cities that have indexed: true (no indexed: false flag in seeds)
const INDEXED_CITIES = [
  'toronto',
  'montreal',
  'calgary',
  'edmonton',
  'ottawa',
  'winnipeg',
  'mississauga',
  'vancouver',
  'brampton',
  'hamilton',
  'surrey',
  'quebec-city',
  'halifax',
  'london',
  'windsor',
];

const PROVINCES = [
  'alberta',
  'british-columbia',
  'manitoba',
  'nova-scotia',
  'ontario',
  'quebec',
  'saskatchewan',
];

const SOLUTION_SLUGS = [
  'apartment-cat-smell-solution',
  'ammonia-smell-cat-litter',
  'how-to-neutralize-ammonia-cat-litter',
  'litter-box-smell-elimination',
  'multiple-cats-odor-control',
  'natural-cat-litter-additive',
  'senior-cat-litter-solutions',
];

const REDIRECTED_BLOG_SLUGS = new Set([
  'how-to-get-rid-of-cat-litter-smell-apartment',
  'how-to-get-rid-of-cat-litter-smell-in-apartment',
  'how-to-get-rid-of-cat-pee-smell-apartment',
  'best-cat-litter-multiple-cats',
]);

type BlogSitemapPost = {
  slug: string;
  lastmod: string;
  frTranslationSlug: string | null;
};

const normalizeTranslatedBlogSlug = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withoutOrigin = trimmed.replace(/^https?:\/\/[^/]+/i, '');
  const withoutBlogPrefix = withoutOrigin
    .replace(/^\/?(?:en|fr)(?:-[a-z]{2})?\/blog\//i, '')
    .replace(/^\/?blog\//i, '');
  const slug = withoutBlogPrefix.replace(/^\/+|\/+$/g, '');

  return /^[a-z0-9-]+$/.test(slug) ? slug : null;
};

function getBlogSlugsWithDates(locale: string): BlogSitemapPost[] {
  const dir = path.join(process.cwd(), 'content', 'blog', locale);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const slug = f.replace('.json', '');
      let lastmod = new Date().toISOString().split('T')[0];
      let frTranslationSlug: string | null = null;
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
        if (data.modifiedDate) lastmod = data.modifiedDate;
        else if (data.publishDate) lastmod = data.publishDate;

        if (locale === 'en') {
          frTranslationSlug = normalizeTranslatedBlogSlug(
            typeof data?.translations?.fr === 'string' ? data.translations.fr : undefined
          );
        }
      } catch { /* use default */ }
      return { slug, lastmod, frTranslationSlug };
    });
}

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(
  pathname: string,
  opts: {
    priority?: number;
    changeFrequency?: SitemapEntry['changeFrequency'];
    lastModified?: string | Date;
    frPath?: string | false;
  } = {},
): SitemapEntry {
  const {
    priority = 0.7,
    changeFrequency = 'monthly',
    lastModified = new Date(),
    frPath,
  } = opts;

  const item: SitemapEntry = {
    url: `${SITE_URL}${pathname}`,
    lastModified,
    changeFrequency,
    priority,
  };

  // Add hreflang alternates for EN/FR pairs
  if (frPath !== false) {
    const fr = frPath ?? `/fr${pathname}`;
    item.alternates = {
      languages: {
        'en-CA': `${SITE_URL}${pathname}`,
        'fr-CA': `${SITE_URL}${fr}`,
        'x-default': `${SITE_URL}${pathname}`,
      },
    };
  }

  return item;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // === HOMEPAGE ===
  entries.push(entry('/', { priority: 1.0, changeFrequency: 'daily' }));

  // === PRODUCT PAGES ===
  entries.push(entry('/products/', { priority: 0.9, changeFrequency: 'weekly' }));
  entries.push(entry('/products/trial-size/', { priority: 0.9, changeFrequency: 'weekly' }));

  // === BLOG INDEX ===
  entries.push(entry('/blog/', { priority: 0.8, changeFrequency: 'daily' }));

  // === EN BLOG POSTS ===
  const enPosts = getBlogSlugsWithDates('en');
  const frPosts = getBlogSlugsWithDates('fr');
  const frSlugs = new Set(frPosts.map((post) => post.slug));

  for (const post of enPosts) {
    if (REDIRECTED_BLOG_SLUGS.has(post.slug)) continue;
    const frPath = post.frTranslationSlug && frSlugs.has(post.frTranslationSlug)
      ? `/fr/blog/${post.frTranslationSlug}/`
      : false;

    entries.push(entry(`/blog/${post.slug}/`, {
      priority: 0.7,
      changeFrequency: 'weekly',
      lastModified: post.lastmod,
      frPath,
    }));
  }

  // === FR BLOG POSTS ===
  for (const post of frPosts) {
    if (REDIRECTED_BLOG_SLUGS.has(post.slug)) continue;

    entries.push(entry(`/fr/blog/${post.slug}/`, {
      priority: 0.7,
      changeFrequency: 'weekly',
      lastModified: post.lastmod,
      frPath: false, // Don't add alternates on FR entries (already on EN)
    }));
  }

  // === FR BLOG INDEX ===
  entries.push(entry('/fr/blog/', {
    priority: 0.7,
    changeFrequency: 'daily',
    frPath: false,
  }));

  // === LEARN PAGES ===
  entries.push(entry('/learn/', { priority: 0.75, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/learn/how-it-works/', { priority: 0.8, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/faq/', { priority: 0.8, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/science/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/safety/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/cat-litter-guide/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/glossary/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/ammonia-science/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/cat-litter-ammonia-health-risks/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/how-activated-carbon-works/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/', {
    priority: 0.6,
    changeFrequency: 'monthly',
    frPath: false,
  }));

  // === LEARN SOLUTIONS ===
  entries.push(entry('/learn/solutions/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  for (const slug of SOLUTION_SLUGS) {
    entries.push(entry(`/learn/solutions/${slug}/`, {
      priority: 0.6,
      changeFrequency: 'monthly',
      frPath: false, // Solutions only exist at root, not under [locale]
    }));
  }

  // === LOCATION PAGES ===
  entries.push(entry('/locations/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  for (const city of INDEXED_CITIES) {
    entries.push(entry(`/locations/${city}/`, {
      priority: 0.6,
      changeFrequency: 'monthly',
      frPath: false,
    }));
  }

  for (const province of PROVINCES) {
    entries.push(entry(`/locations/province/${province}/`, {
      priority: 0.5,
      changeFrequency: 'monthly',
      frPath: false,
    }));
  }

  // === SUPPORT ===
  entries.push(entry('/support/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/support/shipping/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));

  // === ABOUT / CONTACT ===
  entries.push(entry('/contact/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/about/our-story/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === REVIEWS / CASE STUDIES ===
  entries.push(entry('/reviews/', { priority: 0.7, changeFrequency: 'weekly', frPath: `/fr/reviews/` })); // FR reviews exist
  entries.push(entry('/case-studies/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === STORES / RETAILERS / B2B ===
  entries.push(entry('/stores/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/retailers/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/b2b/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/b2b/sell-sheet/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === SCIENCE (standalone page) ===
  entries.push(entry('/science/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));

  // === TOOLS ===
  entries.push(entry('/tools/cat-litter-calculator/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/tools/smell-quiz/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === REFERRAL / AFFILIATE ===
  entries.push(entry('/referral/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/affiliate/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));

  // === GEO PAGES ===
  entries.push(entry('/us/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/ammonia-control/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/canada/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === FUN ===
  entries.push(entry('/fun/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));

  // === FR EQUIVALENTS (pages that exist under [locale] AND are NOT redirected to EN) ===
  entries.push(entry('/fr/', { priority: 1.0, changeFrequency: 'daily', frPath: false }));
  entries.push(entry('/fr/products/', { priority: 0.9, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/fr/products/trial-size/', { priority: 0.9, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/fr/reviews/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));

  // === LEGAL ===
  entries.push(entry('/privacy-policy/', { priority: 0.3, changeFrequency: 'yearly', frPath: false }));
  entries.push(entry('/terms/', { priority: 0.3, changeFrequency: 'yearly', frPath: false }));

  return entries;
}
