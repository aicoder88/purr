import fs from 'node:fs';
import path from 'node:path';

export type BlogSitemapPost = {
  slug: string;
  lastmod?: string;
  frTranslationSlug: string | null;
};

type RoutePattern = {
  pattern: RegExp;
  sources: string[];
};

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const EXACT_ROUTE_SOURCES: Record<string, string[]> = {
  '/': ['app/page.tsx', 'app/homepage-client.tsx'],
  '/products/': ['app/products/page.tsx', 'app/products/PageContent.tsx', 'app/products/components'],
  '/products/trial-size/': ['app/products/trial-size', 'app/products/trial-size/page.tsx'],
  '/blog/': ['app/blog/page.tsx', 'app/[locale]/blog/page.tsx'],
  '/fr/blog/': ['app/[locale]/blog/page.tsx'],
  '/search/': ['app/search/page.tsx', 'app/[locale]/search/page.tsx', 'src/lib/search/site-search.ts'],
  '/fr/search/': ['app/[locale]/search/page.tsx', 'src/lib/search/site-search.ts'],
  '/learn/': ['app/learn/page.tsx', 'app/learn/LearnPageClient.tsx', 'app/learn/LearnPageContent.tsx'],
  '/fr/learn/': ['app/[locale]/learn/page.tsx', 'app/learn/LearnPageClient.tsx', 'app/learn/LearnPageContent.tsx'],
  '/learn/how-it-works/': ['app/learn/how-it-works'],
  '/fr/learn/how-it-works/': ['app/[locale]/learn/how-it-works/page.tsx', 'app/learn/how-it-works'],
  '/learn/faq/': ['app/learn/faq'],
  '/fr/learn/faq/': ['app/[locale]/learn/faq/page.tsx', 'app/learn/faq'],
  '/learn/science/': ['app/learn/science'],
  '/fr/learn/science/': ['app/[locale]/learn/science/page.tsx', 'app/learn/science'],
  '/learn/safety/': ['app/learn/safety'],
  '/fr/learn/safety/': ['app/[locale]/learn/safety/page.tsx', 'app/learn/safety'],
  '/learn/cat-litter-guide/': ['app/learn/cat-litter-guide'],
  '/fr/learn/cat-litter-guide/': ['app/[locale]/learn/cat-litter-guide/page.tsx', 'app/learn/cat-litter-guide'],
  '/learn/glossary/': ['app/learn/glossary'],
  '/fr/learn/glossary/': ['app/[locale]/learn/glossary/page.tsx', 'app/learn/glossary'],
  '/learn/ammonia-science/': ['app/learn/ammonia-science'],
  '/fr/learn/ammonia-science/': ['app/[locale]/learn/ammonia-science/page.tsx', 'app/learn/ammonia-science'],
  '/learn/cat-litter-ammonia-health-risks/': ['app/learn/cat-litter-ammonia-health-risks'],
  '/fr/learn/cat-litter-ammonia-health-risks/': ['app/[locale]/learn/cat-litter-ammonia-health-risks/page.tsx', 'app/learn/cat-litter-ammonia-health-risks'],
  '/learn/how-activated-carbon-works/': ['app/learn/how-activated-carbon-works'],
  '/fr/learn/how-activated-carbon-works/': ['app/[locale]/learn/how-activated-carbon-works/page.tsx', 'app/learn/how-activated-carbon-works'],
  '/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/': ['app/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative'],
  '/fr/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/': ['app/[locale]/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/page.tsx', 'app/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative'],
  '/learn/comparison-lab/methodology/': ['app/learn/comparison-lab/methodology/page.tsx'],
  '/fr/learn/comparison-lab/methodology/': ['app/[locale]/learn/comparison-lab/methodology/page.tsx'],
  '/learn/solutions/': ['app/learn/solutions'],
  '/fr/learn/solutions/': ['app/[locale]/learn/solutions/page.tsx', 'app/learn/solutions'],
  '/learn/solutions/apartment-cat-smell-solution/': ['app/learn/solutions/apartment-cat-smell-solution'],
  '/fr/learn/solutions/apartment-cat-smell-solution/': ['app/[locale]/learn/solutions/apartment-cat-smell-solution/page.tsx', 'app/learn/solutions/apartment-cat-smell-solution'],
  '/learn/solutions/ammonia-smell-cat-litter/': ['app/learn/solutions/ammonia-smell-cat-litter'],
  '/fr/learn/solutions/ammonia-smell-cat-litter/': ['app/[locale]/learn/solutions/ammonia-smell-cat-litter/page.tsx', 'app/learn/solutions/ammonia-smell-cat-litter'],
  '/learn/solutions/how-to-neutralize-ammonia-cat-litter/': ['app/learn/solutions/how-to-neutralize-ammonia-cat-litter'],
  '/fr/learn/solutions/how-to-neutralize-ammonia-cat-litter/': ['app/[locale]/learn/solutions/how-to-neutralize-ammonia-cat-litter/page.tsx', 'app/learn/solutions/how-to-neutralize-ammonia-cat-litter'],
  '/learn/solutions/litter-box-smell-elimination/': ['app/learn/solutions/litter-box-smell-elimination'],
  '/fr/learn/solutions/litter-box-smell-elimination/': ['app/[locale]/learn/solutions/litter-box-smell-elimination/page.tsx', 'app/learn/solutions/litter-box-smell-elimination'],
  '/learn/solutions/multiple-cats-odor-control/': ['app/learn/solutions/multiple-cats-odor-control'],
  '/fr/learn/solutions/multiple-cats-odor-control/': ['app/[locale]/learn/solutions/multiple-cats-odor-control/page.tsx', 'app/learn/solutions/multiple-cats-odor-control'],
  '/learn/solutions/natural-cat-litter-additive/': ['app/learn/solutions/natural-cat-litter-additive'],
  '/fr/learn/solutions/natural-cat-litter-additive/': ['app/[locale]/learn/solutions/natural-cat-litter-additive/page.tsx', 'app/learn/solutions/natural-cat-litter-additive'],
  '/learn/solutions/senior-cat-litter-solutions/': ['app/learn/solutions/senior-cat-litter-solutions'],
  '/fr/learn/solutions/senior-cat-litter-solutions/': ['app/[locale]/learn/solutions/senior-cat-litter-solutions/page.tsx', 'app/learn/solutions/senior-cat-litter-solutions'],
  '/locations/': ['app/locations/page.tsx'],
  '/support/': ['app/support/page.tsx', 'app/support/SupportPageClient.tsx'],
  '/fr/support/': ['app/[locale]/support/page.tsx', 'app/support/SupportPageClient.tsx'],
  '/support/shipping/': ['app/support/shipping/page.tsx'],
  '/contact/': ['app/contact'],
  '/about/our-story/': ['app/about/our-story/page.tsx'],
  '/reviews/': ['app/reviews/page.tsx', 'app/reviews/PageContent.tsx'],
  '/case-studies/': ['app/case-studies/page.tsx'],
  '/stores/': ['app/stores/page.tsx', 'app/stores/PageContent.tsx'],
  '/retailers/': ['app/retailers/page.tsx'],
  '/b2b/': ['app/b2b/page.tsx', 'app/b2b/_components'],
  '/b2b/sell-sheet/': ['app/b2b/sell-sheet'],
  '/science/': ['app/science'],
  '/tools/cat-litter-calculator/': ['app/tools/cat-litter-calculator'],
  '/tools/smell-quiz/': ['app/tools/smell-quiz'],
  '/referral/': ['app/referral/page.tsx'],
  '/affiliate/': ['app/affiliate/page.tsx', 'app/affiliate/AffiliateContent.tsx'],
  '/us/': ['app/us/page.tsx'],
  '/fr/ammonia-control/': ['app/[locale]/ammonia-control/page.tsx'],
  '/fr/canada/': ['app/[locale]/canada/page.tsx'],
  '/fun/': ['app/fun/page.tsx', 'app/fun/CatBlessingToolClient.tsx'],
  '/privacy-policy/': ['app/privacy-policy/page.tsx'],
  '/terms/': ['app/terms/page.tsx', 'app/terms/TermsPageClient.tsx'],
};

const ROUTE_PATTERNS: RoutePattern[] = [
  {
    pattern: /^\/blog\/category\/[^/]+\/$/,
    sources: ['app/blog/category/[slug]/page.tsx'],
  },
  {
    pattern: /^\/fr\/blog\/category\/[^/]+\/$/,
    sources: ['app/[locale]/blog/category/[slug]/page.tsx'],
  },
  {
    pattern: /^\/blog\/tag\/[^/]+\/$/,
    sources: ['app/blog/tag/[slug]/page.tsx'],
  },
  {
    pattern: /^\/fr\/blog\/tag\/[^/]+\/$/,
    sources: ['app/[locale]/blog/tag/[slug]/page.tsx'],
  },
  {
    pattern: /^\/learn\/comparison-lab\/[^/]+\/$/,
    sources: ['app/learn/comparison-lab/[slug]/page.tsx'],
  },
  {
    pattern: /^\/fr\/learn\/comparison-lab\/[^/]+\/$/,
    sources: ['app/[locale]/learn/comparison-lab/[slug]/page.tsx'],
  },
  {
    pattern: /^\/locations\/province\/[^/]+\/$/,
    sources: ['app/locations/province/[provinceSlug]/page.tsx'],
  },
  {
    pattern: /^\/locations\/[^/]+\/$/,
    sources: ['app/locations/[citySlug]/page.tsx'],
  },
];

function normalizeDateOnly(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (DATE_ONLY_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toISOString().slice(0, 10);
}

function normalizeTranslatedBlogSlug(value: string | undefined): string | null {
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
}

function collectMtimeMs(absolutePath: string): number[] {
  if (!fs.existsSync(absolutePath)) {
    return [];
  }

  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) {
    return [stat.mtimeMs];
  }

  if (!stat.isDirectory()) {
    return [];
  }

  const timestamps: number[] = [];

  for (const childName of fs.readdirSync(absolutePath)) {
    timestamps.push(...collectMtimeMs(path.join(absolutePath, childName)));
  }

  return timestamps;
}

function getSourceLastModified(sources: string[], rootDir: string): string | undefined {
  const timestamps = sources.flatMap((relativePath) => collectMtimeMs(path.join(rootDir, relativePath)));

  if (timestamps.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...timestamps)).toISOString().slice(0, 10);
}

export function getStaticRouteLastModified(pathname: string, rootDir = process.cwd()): string | undefined {
  const directMatch = EXACT_ROUTE_SOURCES[pathname];
  if (directMatch) {
    return getSourceLastModified(directMatch, rootDir);
  }

  const patternMatch = ROUTE_PATTERNS.find((routePattern) => routePattern.pattern.test(pathname));
  if (!patternMatch) {
    return undefined;
  }

  return getSourceLastModified(patternMatch.sources, rootDir);
}

export function getLatestContentDate(
  items: Array<{ modifiedDate?: string | null; publishDate?: string | null }>
): string | undefined {
  let latestTimestamp: number | undefined;

  for (const item of items) {
    const normalized = normalizeDateOnly(item.modifiedDate) ?? normalizeDateOnly(item.publishDate);
    if (!normalized) {
      continue;
    }

    const timestamp = new Date(normalized).getTime();
    if (latestTimestamp === undefined || timestamp > latestTimestamp) {
      latestTimestamp = timestamp;
    }
  }

  return latestTimestamp === undefined
    ? undefined
    : new Date(latestTimestamp).toISOString().slice(0, 10);
}

export function getBlogSitemapPosts(locale: string, rootDir = process.cwd()): BlogSitemapPost[] {
  const localeDir = path.join(rootDir, 'content', 'blog', locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs.readdirSync(localeDir)
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => {
      const filePath = path.join(localeDir, filename);
      const slug = filename.replace('.json', '');
      let lastmod = fs.statSync(filePath).mtime.toISOString().slice(0, 10);
      let frTranslationSlug: string | null = null;

      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as {
          modifiedDate?: string;
          publishDate?: string;
          translations?: Record<string, string>;
        };

        lastmod = normalizeDateOnly(data.modifiedDate) ?? normalizeDateOnly(data.publishDate) ?? lastmod;

        if (locale === 'en') {
          frTranslationSlug = normalizeTranslatedBlogSlug(data.translations?.fr);
        }
      } catch {
        // Keep stable filesystem-derived fallback when content is unreadable.
      }

      return { slug, lastmod, frTranslationSlug };
    });
}
