import type { MetadataRoute } from 'next';
import { ContentStore } from '@/lib/blog/content-store';
import {
  buildTaxonomyHubData,
  CANONICAL_CATEGORY_SLUGS,
  CANONICAL_TAG_SLUGS,
} from '@/lib/blog/taxonomy';
import { COMPARISON_ENTRIES } from '@/lib/comparison-lab/data';
import {
  getBlogSitemapPosts,
  getLatestContentDate,
  getStaticRouteLastModified,
} from '@/lib/seo/sitemap-lastmod';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.purrify.ca';

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
  'purrify-vs-arm-hammer',
  'safe-for-kittens',
  'activated-carbon-science',
  'beyond-masking-odors',
  'fresh-home-multiple-cats',
  'best-cat-litter-multiple-cats',
  'best-cat-litter-senior-cats',
  'best-cat-litter-for-odor-small-apartment',
]);

const REDIRECTED_FR_BLOG_SLUGS = new Set([
  'activated-carbon-science',
  'fresh-home-multiple-cats',
  'beyond-masking-odors',
  'how-to-get-rid-of-cat-litter-smell-apartment',
  'best-cat-litter-multiple-cats',
]);

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
    lastModified = getStaticRouteLastModified(pathname),
    frPath,
  } = opts;

  const item: SitemapEntry = {
    url: `${SITE_URL}${pathname}`,
    changeFrequency,
    priority,
  };

  if (lastModified) {
    item.lastModified = lastModified;
  }

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

function addLocalizedEntries(
  entries: MetadataRoute.Sitemap,
  pathname: string,
  opts: {
    priority?: number;
    changeFrequency?: SitemapEntry['changeFrequency'];
    lastModified?: string | Date;
  } = {},
) {
  entries.push(entry(pathname, {
    ...opts,
    frPath: `/fr${pathname}`,
  }));
  entries.push(entry(`/fr${pathname}`, {
    ...opts,
    frPath: false,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const store = new ContentStore();
  const taxonomyPostsByLocale = {
    en: await store.getAllPosts('en', false, { includeContent: false }),
    fr: await store.getAllPosts('fr', false, { includeContent: false }),
  };
  const blogIndexLastModified = {
    en: getLatestContentDate(taxonomyPostsByLocale.en) ?? getStaticRouteLastModified('/blog/'),
    fr: getLatestContentDate(taxonomyPostsByLocale.fr) ?? getStaticRouteLastModified('/fr/blog/'),
  };

  // === HOMEPAGE ===
  entries.push(entry('/', { priority: 1.0, changeFrequency: 'daily' }));

  // === PRODUCT PAGES ===
  entries.push(entry('/products/', { priority: 0.9, changeFrequency: 'weekly' }));
  entries.push(entry('/products/trial-size/', { priority: 0.9, changeFrequency: 'weekly' }));

  // === BLOG INDEX ===
  entries.push(entry('/blog/', {
    priority: 0.8,
    changeFrequency: 'daily',
    lastModified: blogIndexLastModified.en,
  }));

  // === EN BLOG POSTS ===
  const enPosts = getBlogSitemapPosts('en');
  const frPosts = getBlogSitemapPosts('fr');
  const frSlugs = new Set(frPosts.map((post) => post.slug));

  for (const post of enPosts) {
    if (REDIRECTED_BLOG_SLUGS.has(post.slug)) continue;
    const frPath = post.frTranslationSlug &&
      frSlugs.has(post.frTranslationSlug) &&
      !REDIRECTED_FR_BLOG_SLUGS.has(post.frTranslationSlug)
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
    lastModified: blogIndexLastModified.fr,
    frPath: false,
  }));

  // === BLOG TAXONOMY HUBS ===
  for (const locale of ['en', 'fr'] as const) {
    const posts = taxonomyPostsByLocale[locale];
    const localePrefix = locale === 'en' ? '' : '/fr';

    for (const slug of CANONICAL_CATEGORY_SLUGS) {
      const hub = buildTaxonomyHubData(posts, 'category', slug);
      if (!hub) {
        continue;
      }

      entries.push(entry(`${localePrefix}/blog/category/${slug}/`, {
        priority: locale === 'en' ? 0.65 : 0.55,
        changeFrequency: 'weekly',
        lastModified: getLatestContentDate(hub.posts)
          ?? getStaticRouteLastModified(`${localePrefix}/blog/category/${slug}/`),
        frPath: locale === 'en' ? `/fr/blog/category/${slug}/` : false,
      }));
    }

    for (const slug of CANONICAL_TAG_SLUGS) {
      const hub = buildTaxonomyHubData(posts, 'tag', slug);
      if (!hub) {
        continue;
      }

      entries.push(entry(`${localePrefix}/blog/tag/${slug}/`, {
        priority: locale === 'en' ? 0.55 : 0.45,
        changeFrequency: 'weekly',
        lastModified: getLatestContentDate(hub.posts)
          ?? getStaticRouteLastModified(`${localePrefix}/blog/tag/${slug}/`),
        frPath: locale === 'en' ? `/fr/blog/tag/${slug}/` : false,
      }));
    }
  }

  // === LEARN PAGES ===
  addLocalizedEntries(entries, '/learn/', { priority: 0.75, changeFrequency: 'weekly' });
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
  entries.push(entry('/learn/comparison-lab/', {
    priority: 0.7,
    changeFrequency: 'monthly',
    frPath: '/fr/learn/comparison-lab/',
  }));
  entries.push(entry('/learn/comparison-lab/methodology/', {
    priority: 0.7,
    changeFrequency: 'monthly',
    frPath: '/fr/learn/comparison-lab/methodology/',
  }));
  for (const comparisonEntry of COMPARISON_ENTRIES.filter((entry) => entry.indexable)) {
    entries.push(entry(`/learn/comparison-lab/${comparisonEntry.slug}/`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: comparisonEntry.updatedAt || comparisonEntry.publishedAt,
      frPath: `/fr/learn/comparison-lab/${comparisonEntry.slug}/`,
    }));
  }

  // === LEARN SOLUTIONS ===
  addLocalizedEntries(entries, '/learn/solutions/', { priority: 0.7, changeFrequency: 'monthly' });
  for (const slug of SOLUTION_SLUGS) {
    addLocalizedEntries(entries, `/learn/solutions/${slug}/`, {
      priority: 0.6,
      changeFrequency: 'monthly',
    });
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
  entries.push(entry('/support/subscription/', {
    priority: 0.6,
    changeFrequency: 'monthly',
    frPath: false,
  }));

  // === ABOUT / CONTACT ===
  entries.push(entry('/contact/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/about/our-story/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/about/editorial-policy/', {
    priority: 0.4,
    changeFrequency: 'yearly',
    frPath: false,
  }));
  entries.push(entry('/about/testing-policy/', {
    priority: 0.4,
    changeFrequency: 'yearly',
    frPath: false,
  }));
  entries.push(entry('/about/team/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));

  // === REVIEWS / CASE STUDIES ===
  entries.push(entry('/reviews/', { priority: 0.7, changeFrequency: 'weekly', frPath: `/fr/reviews/` })); // FR reviews exist
  entries.push(entry('/case-studies/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/results/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === STORES / RETAILERS / B2B ===
  entries.push(entry('/stores/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/retailers/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));
  entries.push(entry('/b2b/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/b2b/sell-sheet/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === SCIENCE (standalone page) ===
  entries.push(entry('/science/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));

  // === TOOLS ===
  entries.push(entry('/tools/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/tools/cat-litter-calculator/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/tools/smell-quiz/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === AFFILIATE ===
  entries.push(entry('/affiliate/', { priority: 0.7, changeFrequency: 'weekly', frPath: false }));

  // === GEO PAGES ===
  entries.push(entry('/fr/ammonia-control/', { priority: 0.7, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/fr/canada/', { priority: 0.6, changeFrequency: 'monthly', frPath: false }));

  // === FUN ===
  entries.push(entry('/fun/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));
  entries.push(entry('/viral/', { priority: 0.5, changeFrequency: 'monthly', frPath: false }));

  // === LEGAL ===
  entries.push(entry('/privacy-policy/', { priority: 0.3, changeFrequency: 'yearly', frPath: false }));
  return entries;
}
