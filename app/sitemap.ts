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

function getBlogSlugsWithDates(locale: string): Array<{ slug: string; lastmod: string }> {
  const dir = path.join(process.cwd(), 'content', 'blog', locale);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const slug = f.replace('.json', '');
      let lastmod = new Date().toISOString().split('T')[0];
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
        if (data.modifiedDate) lastmod = data.modifiedDate;
        else if (data.publishDate) lastmod = data.publishDate;
      } catch { /* use default */ }
      return { slug, lastmod };
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
  for (const post of enPosts) {
    entries.push(entry(`/blog/${post.slug}/`, {
      priority: 0.7,
      changeFrequency: 'weekly',
      lastModified: post.lastmod,
      frPath: `/fr/blog/${post.slug}/`,
    }));
  }

  // === FR BLOG POSTS ===
  const frPosts = getBlogSlugsWithDates('fr');
  for (const post of frPosts) {
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
  entries.push(entry('/learn/', { priority: 0.75, changeFrequency: 'weekly' }));
  entries.push(entry('/learn/how-it-works/', { priority: 0.8, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/faq/', { priority: 0.8, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/science/', { priority: 0.7, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/safety/', { priority: 0.7, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/cat-litter-guide/', { priority: 0.7, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/glossary/', { priority: 0.6, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/ammonia-science/', { priority: 0.7, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/cat-litter-ammonia-health-risks/', { priority: 0.7, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/how-activated-carbon-works/', { priority: 0.7, changeFrequency: 'monthly' }));
  entries.push(entry('/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/', {
    priority: 0.6,
    changeFrequency: 'monthly',
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
  entries.push(entry('/support/', { priority: 0.6, changeFrequency: 'monthly' }));
  entries.push(entry('/support/shipping/', { priority: 0.5, changeFrequency: 'monthly' }));

  // === ABOUT / CONTACT ===
  entries.push(entry('/contact/', { priority: 0.6, changeFrequency: 'monthly' }));
  entries.push(entry('/about/our-story/', { priority: 0.6, changeFrequency: 'monthly' }));

  // === REVIEWS / CASE STUDIES ===
  entries.push(entry('/reviews/', { priority: 0.7, changeFrequency: 'weekly' }));
  entries.push(entry('/case-studies/', { priority: 0.6, changeFrequency: 'monthly' }));

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
  entries.push(entry('/referral/', { priority: 0.6, changeFrequency: 'monthly' }));
  entries.push(entry('/affiliate/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));

  // === GEO PAGES ===
  entries.push(entry('/us/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/ammonia-control/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/canada/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === FUN ===
  entries.push(entry('/fun/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));

  // === FR EQUIVALENTS (pages that exist under [locale]) ===
  entries.push(entry('/fr/', { priority: 1.0, changeFrequency: 'daily', frPath: false }));
  entries.push(entry('/fr/products/', { priority: 0.9, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/fr/products/trial-size/', { priority: 0.9, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/fr/learn/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/fr/learn/how-it-works/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/faq/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/science/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/safety/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/cat-litter-guide/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/glossary/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/ammonia-science/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/cat-litter-ammonia-health-risks/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/how-activated-carbon-works/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/', {
    priority: 0.6,
    changeFrequency: 'monthly',
    frPath: false,
  }));
  entries.push(entry('/fr/reviews/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/fr/support/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/support/shipping/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/case-studies/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/referral/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === LEGAL ===
  entries.push(entry('/privacy-policy/', { priority: 0.3, changeFrequency: 'yearly', frPath: false }));
  entries.push(entry('/terms/', { priority: 0.3, changeFrequency: 'yearly', frPath: false }));

  return entries;
}
