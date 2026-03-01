/**
 * Topic Cluster System
 * Defines content hubs and their related spoke pages for internal linking
 */

import { sampleBlogPosts } from '../../data/blog-posts';


export interface TopicCluster {
  id: string;
  name: string;
  hubPage: string;
  description: string;
  spokes: string[];
  keywords: string[];
}

type RelatedPage = { url: string; title: string; type: 'hub' | 'spoke' };
type FallbackPage = { url: string; title: string };

const LOCALE_PREFIX_REGEX = /^\/(en|fr|es|zh)(?=\/|$)/;
const BLOG_PATH_REGEX = /^\/blog(?:\/|$)/;

function normalizePath(path: string): string {
  const withoutQuery = path.split('?')[0].split('#')[0];
  return withoutQuery.replace(/\/+$/, '') || '/';
}

function extractLocale(path: string): string | null {
  const match = normalizePath(path).match(LOCALE_PREFIX_REGEX);
  return match ? match[1] : null;
}

function stripLocalePrefix(path: string): string {
  const normalized = normalizePath(path);
  const stripped = normalized.replace(LOCALE_PREFIX_REGEX, '');
  return stripped || '/';
}

function localizeBlogPath(path: string, locale: string): string {
  const localeAgnosticPath = stripLocalePrefix(path);

  if (locale === 'en') {
    return localeAgnosticPath;
  }

  if (!BLOG_PATH_REGEX.test(localeAgnosticPath)) {
    return localeAgnosticPath;
  }

  return `/${locale}${localeAgnosticPath}`;
}

/**
 * Topic cluster definitions
 */
export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: 'odor-control',
    name: 'Cat Litter Odor Control',
    hubPage: '/learn/cat-litter-guide',
    description: 'Complete guide to eliminating cat litter smell and odor control',
    spokes: [
      '/blog/most-powerful-odor-absorber',
      '/blog/best-litter-odor-remover-small-apartments',
      '/blog/cat-litter-smell-worse-summer',
      '/blog/cat-litter-smell-worse-winter',
      '/blog/house-smells-like-cat-litter-solutions',
      '/blog/strong-cat-urine-smell-litter-box',
      '/blog/embarrassed-guests-visit-cat-litter-smell',
      '/blog/tried-everything-cat-litter-smell-solutions',
      '/learn/how-it-works',
      '/blog/activated-carbon-vs-baking-soda-comparison',
      '/learn/ammonia-science',
      '/learn/cat-litter-ammonia-health-risks',
      '/blog/how-to-eliminate-cat-litter-odor',
      '/blog/how-to-neutralize-ammonia-cat-litter',
      '/learn/faq',
      '/science',
      '/tools/cat-litter-calculator',
      '/products/trial-size',
      '/products',
    ],
    keywords: ['odor control', 'smell elimination', 'litter box smell', 'cat litter odor'],
  },
  {
    id: 'activated-carbon',
    name: 'Activated Carbon Science',
    hubPage: '/blog/activated-carbon-litter-additive-benefits',
    description: 'How activated carbon eliminates pet odors and why it works',
    spokes: [
      '/blog/activated-carbon-litter-additive-benefits',
      '/blog/activated-carbon-vs-baking-soda-comparison',
      '/blog/most-powerful-odor-absorber',
      '/learn/how-activated-carbon-works',
      '/learn/how-it-works',
      '/learn/science',
      '/learn/ammonia-science',
      '/learn/glossary',
      '/blog/best-natural-cat-litter-odor-control',
      '/learn/faq',
      '/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
      '/science',
      '/products/trial-size',
      '/products',
    ],
    keywords: ['activated carbon', 'charcoal', 'natural deodorizer', 'carbon benefits'],
  },
  {
    id: 'small-apartments',
    name: 'Small Apartment Cat Care',
    hubPage: '/blog/best-litter-odor-remover-small-apartments',
    description: 'Cat litter solutions for apartments and small spaces',
    spokes: [
      '/blog/best-litter-odor-remover-small-apartments',
      '/blog/house-smells-like-cat-litter-solutions',
      '/blog/embarrassed-guests-visit-cat-litter-smell',
      '/blog/how-to-eliminate-cat-litter-odor',
      '/learn/faq',
      '/tools/cat-litter-calculator',
      '/products/trial-size',
      '/products',
    ],
    keywords: ['apartment', 'small space', 'condo', 'studio', 'compact'],
  },
  {
    id: 'multi-cat',
    name: 'Multi-Cat Household Solutions',
    hubPage: '/blog/best-cat-litter-multiple-cats-odor-control',
    description: 'Odor control for homes with multiple cats',
    spokes: [
      '/blog/multi-cat-litter-deodorizer-guide',
      '/blog/strong-cat-urine-smell-litter-box',
      '/blog/tried-everything-cat-litter-smell-solutions',
      '/learn/faq',
      '/tools/cat-litter-calculator',
      '/products',
    ],
    keywords: ['multiple cats', 'multi-cat', 'several cats', 'many cats'],
  },
  {
    id: 'product-comparison',
    name: 'Deodorizer Types & Comparisons',
    hubPage: '/blog/how-to-use-cat-litter-deodorizer',
    description: 'Understanding different cat litter deodorizer types',
    spokes: [
      '/blog/powder-vs-spray-litter-deodorizer',
      '/blog/activated-carbon-vs-baking-soda-comparison',
      '/blog/tried-every-litter-deodorizer-90-days-results',
      '/blog/how-to-use-cat-litter-deodorizer',
      '/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative',
      '/learn/faq',
      '/products',
    ],
    keywords: ['granules', 'spray', 'comparison', 'best deodorizer', 'deodorizer types'],
  },
  {
    id: 'kittens-seniors',
    name: 'Special Needs Cats',
    hubPage: '/blog/using-deodorizers-with-kittens',
    description: 'Safe deodorizer use for kittens and senior cats',
    spokes: [
      '/blog/using-deodorizers-with-kittens',
      '/blog/best-cat-litter-multiple-cats-odor-control',
      '/learn/safety',
      '/learn/faq',
      '/products/trial-size',
    ],
    keywords: ['kittens', 'senior cats', 'elderly cats', 'young cats', 'safety'],
  },
  // SEO FIX (Feb 2026): New cluster for seasonal content
  {
    id: 'seasonal-odor',
    name: 'Seasonal Cat Litter Odor',
    hubPage: '/blog/cat-litter-smell-worse-summer',
    description: 'Managing cat litter odor during different seasons',
    spokes: [
      '/blog/cat-litter-smell-worse-summer',
      '/blog/cat-litter-smell-worse-winter',
      '/blog/cat-litter-smell-worse-summer',
      '/learn/cat-litter-guide',
    ],
    keywords: ['summer odor', 'winter odor', 'seasonal', 'heat', 'humidity'],
  },
  // SEO FIX (Feb 2026): New cluster for health & safety content  
  {
    id: 'health-safety',
    name: 'Cat Litter Health & Safety',
    hubPage: '/learn/cat-litter-ammonia-health-risks',
    description: 'Health and safety information about cat litter and ammonia',
    spokes: [
      '/learn/cat-litter-ammonia-health-risks',
      '/learn/safety',
      '/learn/faq',
      '/science',
    ],
    keywords: ['health', 'safety', 'ammonia risks', 'toxic', 'breathing'],
  },
];

/**
 * Get cluster for a given page
 */
export function getClusterForPage(pageUrl: string): TopicCluster | null {
  const normalizedPage = stripLocalePrefix(pageUrl);

  for (const cluster of TOPIC_CLUSTERS) {
    const hubPage = normalizePath(cluster.hubPage);
    const spokes = cluster.spokes.map(normalizePath);
    if (hubPage === normalizedPage || spokes.includes(normalizedPage)) {
      return cluster;
    }
  }
  return null;
}

/**
 * Get related pages within the same cluster
 */
export function getRelatedPages(
  pageUrl: string,
  maxResults: number = 5,
  fallbackPages: FallbackPage[] = []
): RelatedPage[] {
  const normalizedPageUrl = normalizePath(pageUrl);
  const currentLocale = extractLocale(normalizedPageUrl) || 'en';
  const cluster = getClusterForPage(normalizedPageUrl);
  // Removed early return to allow fallback logic
  // if (!cluster) return [];

  const related: RelatedPage[] = [];
  const seenUrls = new Set<string>([normalizedPageUrl]);

  const fallbackTitleMap = new Map<string, string>();
  fallbackPages.forEach((page) => {
    fallbackTitleMap.set(normalizePath(page.url), page.title);
  });

  const getTitle = (url: string): string => {
    const normalizedUrl = normalizePath(url);
    return (
      fallbackTitleMap.get(normalizedUrl) ||
      fallbackTitleMap.get(stripLocalePrefix(normalizedUrl)) ||
      urlToTitle(normalizedUrl)
    );
  };

  const addRelated = (url: string, type: 'hub' | 'spoke') => {
    if (related.length >= maxResults) return;

    const normalizedUrl = normalizePath(url);
    if (seenUrls.has(normalizedUrl)) return;

    seenUrls.add(normalizedUrl);
    related.push({
      url: normalizedUrl,
      title: getTitle(normalizedUrl),
      type,
    });
  };

  // Removed: Hub pages are now excluded from "Related Articles" to prevent
  // jarring transitions from blog posts to commercial landing pages.
  // The Hub page is still linked via Breadcrumbs and internal navigation.
  /*
  if (cluster && cluster.spokes.includes(pageUrl)) {
    related.push({
      url: cluster.hubPage,
      title: cluster.name,
      type: 'hub',
    });
  }
  */

  // Add other spokes (excluding current page)
  if (cluster) {
    const otherSpokes = cluster.spokes
      .map((url) => localizeBlogPath(url, currentLocale))
      .filter((url) => normalizePath(url) !== normalizedPageUrl);

    // Prioritize blog posts and learn pages over product pages
    const sortedSpokes = otherSpokes.sort((a, b) => {
      const aScore = a.includes('/blog/') ? 3 : a.includes('/learn/') ? 2 : 1;
      const bScore = b.includes('/blog/') ? 3 : b.includes('/learn/') ? 2 : 1;
      return bScore - aScore;
    });

    for (const spokeUrl of sortedSpokes) {
      addRelated(spokeUrl, 'spoke');
    }
  }



  // Check if we have enough related pages
  if (related.length < maxResults) {
    // Lazy load sampleBlogPosts to avoid potential circular dependencies or large initial bundle size if not needed
    // However, since we need to return synchronously, we'll assume it's available or we need to import it at top level.
    // For this implementation, we will import it at the top level.
    // NOTE: See import addition at top of file. 

    // Filter potential fallback posts
    const dynamicFallbackPages = fallbackPages.length > 0
      ? fallbackPages
      : sampleBlogPosts
        .map((post) => ({
          url: localizeBlogPath(post.link, currentLocale),
          title: post.title,
        }))
        .sort((a, b) => new Date(
          sampleBlogPosts.find((post) => post.link === b.url || localizeBlogPath(post.link, currentLocale) === b.url)?.date || 0
        ).getTime() - new Date(
          sampleBlogPosts.find((post) => post.link === a.url || localizeBlogPath(post.link, currentLocale) === a.url)?.date || 0
        ).getTime());

    const normalizedFallbackPages = dynamicFallbackPages
      .map((page) => ({
        url: normalizePath(page.url),
        title: page.title,
      }))
      .filter((page) => {
        // Exclude current page
        if (page.url === normalizedPageUrl) return false;

        // Exclude pages already in related list
        if (seenUrls.has(page.url)) return false;

        return true;
      });

    if (normalizedFallbackPages.length > 0) {
      const currentIndex = dynamicFallbackPages.findIndex(
        (page) => normalizePath(page.url) === normalizedPageUrl
      );

      if (currentIndex >= 0) {
        for (let offset = 1; offset < normalizedFallbackPages.length && related.length < maxResults; offset++) {
          const forwardIndex = currentIndex + offset;
          const backwardIndex = currentIndex - offset;

          if (forwardIndex < dynamicFallbackPages.length) {
            addRelated(dynamicFallbackPages[forwardIndex].url, 'spoke');
          }

          if (related.length >= maxResults) break;

          if (backwardIndex >= 0) {
            addRelated(dynamicFallbackPages[backwardIndex].url, 'spoke');
          }
        }
      }

      if (related.length < maxResults) {
        for (const fallbackPage of normalizedFallbackPages) {
          if (related.length >= maxResults) break;
          addRelated(fallbackPage.url, 'spoke');
        }
      }
    }
  }

  return related.slice(0, maxResults);
}

/**
 * Get all clusters a page belongs to
 */
export function getClustersForPage(pageUrl: string): TopicCluster[] {
  const normalizedPage = stripLocalePrefix(pageUrl);
  return TOPIC_CLUSTERS.filter(
    (cluster) => (
      normalizePath(cluster.hubPage) === normalizedPage ||
      cluster.spokes.map(normalizePath).includes(normalizedPage)
    )
  );
}

/**
 * Convert URL to human-readable title
 */
function urlToTitle(url: string): string {
  // Extract the last part of the URL
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];

  // Convert kebab-case to Title Case
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all pages that should link to a given page
 */
export function getPagesLinkingTo(targetUrl: string): string[] {
  const normalizedTargetUrl = normalizePath(targetUrl);
  const targetLocale = extractLocale(normalizedTargetUrl) || 'en';
  const localeAgnosticTarget = stripLocalePrefix(normalizedTargetUrl);

  const cluster = getClusterForPage(localeAgnosticTarget);
  if (!cluster) return [];

  const linkingPages: string[] = [];

  // If target is the hub, all spokes should link to it
  if (normalizePath(cluster.hubPage) === localeAgnosticTarget) {
    return cluster.spokes.map((url) => localizeBlogPath(url, targetLocale));
  }

  // If target is a spoke, hub and related spokes should link to it
  if (cluster.spokes.map(normalizePath).includes(localeAgnosticTarget)) {
    linkingPages.push(localizeBlogPath(cluster.hubPage, targetLocale));

    // Add a few related spokes (not all to avoid over-linking)
    const otherSpokes = cluster.spokes.filter((url) => normalizePath(url) !== localeAgnosticTarget);
    linkingPages.push(...otherSpokes.slice(0, 3).map((url) => localizeBlogPath(url, targetLocale)));
  }

  return linkingPages;
}

/**
 * Get breadcrumb trail for a page based on its cluster
 */
export function getBreadcrumbs(pageUrl: string): Array<{ label: string; url: string }> {
  const normalizedPageUrl = normalizePath(pageUrl);
  const locale = extractLocale(normalizedPageUrl) || 'en';
  const localeAgnosticUrl = stripLocalePrefix(normalizedPageUrl);
  const localizedSectionUrl = (section: string) => (locale === 'en' ? section : `/${locale}${section}`);

  const breadcrumbs: Array<{ label: string; url: string }> = [
    { label: 'Home', url: '/' },
  ];

  // Add section breadcrumb
  if (localeAgnosticUrl.startsWith('/blog/')) {
    breadcrumbs.push({ label: 'Blog', url: localizedSectionUrl('/blog') });
  } else if (localeAgnosticUrl.startsWith('/learn/')) {
    breadcrumbs.push({ label: 'Learn', url: localizedSectionUrl('/learn') });
  } else if (localeAgnosticUrl.startsWith('/products/')) {
    breadcrumbs.push({ label: 'Products', url: '/products' });
  } else if (localeAgnosticUrl.startsWith('/locations/')) {
    breadcrumbs.push({ label: 'Locations', url: '/locations' });
  }

  // Add cluster hub if applicable
  const cluster = getClusterForPage(localeAgnosticUrl);
  if (cluster && cluster.spokes.map(normalizePath).includes(localeAgnosticUrl)) {
    breadcrumbs.push({
      label: cluster.name,
      url: localizeBlogPath(cluster.hubPage, locale),
    });
  }

  return breadcrumbs;
}

/**
 * Validate topic clusters
 */
export function validateTopicClusters(): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for duplicate pages across clusters
  const allPages = new Set<string>();
  for (const cluster of TOPIC_CLUSTERS) {
    // Check hub
    if (allPages.has(cluster.hubPage)) {
      issues.push(`Duplicate hub page: ${cluster.hubPage}`);
    }
    allPages.add(cluster.hubPage);

    // Check spokes
    for (const spoke of cluster.spokes) {
      if (allPages.has(spoke)) {
        issues.push(`Page ${spoke} appears in multiple clusters`);
      }
      allPages.add(spoke);
    }

    // Check for empty spokes
    if (cluster.spokes.length === 0) {
      issues.push(`Cluster "${cluster.name}" has no spokes`);
    }

    // Check for too few spokes
    if (cluster.spokes.length < 3) {
      issues.push(`Cluster "${cluster.name}" has only ${cluster.spokes.length} spokes (recommend 3+)`);
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
