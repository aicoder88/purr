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
      '/learn/activated-carbon-vs-baking-soda-deodorizers',
      '/learn/ammonia-science',
      '/learn/cat-litter-ammonia-health-risks',
      '/learn/solutions/litter-box-smell-elimination',
      '/learn/solutions/ammonia-smell-cat-litter',
      '/learn/solutions/how-to-neutralize-ammonia-cat-litter',
      '/products/trial-size',
      '/products/standard',
      '/products/family-pack',
    ],
    keywords: ['odor control', 'smell elimination', 'litter box smell', 'cat litter odor'],
  },
  {
    id: 'activated-carbon',
    name: 'Activated Carbon Science',
    hubPage: '/learn/activated-carbon-benefits',
    description: 'How activated carbon eliminates pet odors and why it works',
    spokes: [
      '/blog/activated-carbon-litter-additive-benefits',
      '/blog/activated-carbon-vs-baking-soda-comparison',
      '/blog/most-powerful-odor-absorber',
      '/learn/activated-carbon-vs-baking-soda-deodorizers',
      '/learn/how-it-works',
      '/learn/science',
      '/learn/ammonia-science',
      '/learn/glossary',
      '/learn/solutions/natural-cat-litter-additive',
      '/products/trial-size',
      '/products/standard',
      '/products/family-pack',
    ],
    keywords: ['activated carbon', 'charcoal', 'natural deodorizer', 'carbon benefits'],
  },
  {
    id: 'small-apartments',
    name: 'Small Apartment Cat Care',
    hubPage: '/learn/solutions/apartment-cat-smell-solution',
    description: 'Cat litter solutions for apartments and small spaces',
    spokes: [
      '/blog/best-litter-odor-remover-small-apartments',
      '/blog/house-smells-like-cat-litter-solutions',
      '/blog/embarrassed-guests-visit-cat-litter-smell',
      '/learn/solutions/litter-box-smell-elimination',
      '/products/trial-size',
      '/products/standard',
    ],
    keywords: ['apartment', 'small space', 'condo', 'studio', 'compact'],
  },
  {
    id: 'multi-cat',
    name: 'Multi-Cat Household Solutions',
    hubPage: '/learn/solutions/multiple-cats-odor-control',
    description: 'Odor control for homes with multiple cats',
    spokes: [
      '/blog/multi-cat-litter-deodorizer-guide',
      '/blog/strong-cat-urine-smell-litter-box',
      '/blog/tried-everything-cat-litter-smell-solutions',
      '/products/family-pack',
      '/products/standard',
    ],
    keywords: ['multiple cats', 'multi-cat', 'several cats', 'many cats'],
  },
  {
    id: 'product-comparison',
    name: 'Deodorizer Types & Comparisons',
    hubPage: '/learn/how-to-use-deodorizer',
    description: 'Understanding different cat litter deodorizer types',
    spokes: [
      '/blog/powder-vs-spray-litter-deodorizer',
      '/blog/activated-carbon-vs-baking-soda-comparison',
      '/blog/tried-every-litter-deodorizer-90-days-results',
      '/blog/how-to-use-cat-litter-deodorizer',
      '/learn/activated-carbon-vs-baking-soda-deodorizers',
      '/products',
    ],
    keywords: ['granules', 'spray', 'comparison', 'best deodorizer', 'deodorizer types'],
  },
  {
    id: 'kittens-seniors',
    name: 'Special Needs Cats',
    hubPage: '/learn/using-deodorizers-with-kittens',
    description: 'Safe deodorizer use for kittens and senior cats',
    spokes: [
      '/blog/using-deodorizers-with-kittens',
      '/learn/solutions/senior-cat-litter-solutions',
      '/learn/safety',
      '/products/trial-size',
    ],
    keywords: ['kittens', 'senior cats', 'elderly cats', 'young cats', 'safety'],
  },
];

/**
 * Get cluster for a given page
 */
export function getClusterForPage(pageUrl: string): TopicCluster | null {
  for (const cluster of TOPIC_CLUSTERS) {
    if (cluster.hubPage === pageUrl || cluster.spokes.includes(pageUrl)) {
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
  maxResults: number = 5
): Array<{ url: string; title: string; type: 'hub' | 'spoke' }> {
  const cluster = getClusterForPage(pageUrl);
  // Removed early return to allow fallback logic
  // if (!cluster) return [];

  const related: Array<{ url: string; title: string; type: 'hub' | 'spoke' }> = [];

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
    const otherSpokes = cluster.spokes.filter(url => url !== pageUrl);

    // Prioritize blog posts and learn pages over product pages
    const sortedSpokes = otherSpokes.sort((a, b) => {
      const aScore = a.includes('/blog/') ? 3 : a.includes('/learn/') ? 2 : 1;
      const bScore = b.includes('/blog/') ? 3 : b.includes('/learn/') ? 2 : 1;
      return bScore - aScore;
    });

    for (const spokeUrl of sortedSpokes) {
      if (related.length >= maxResults) break;

      related.push({
        url: spokeUrl,
        title: urlToTitle(spokeUrl),
        type: 'spoke',
      });
    }
  }



  // Check if we have enough related pages
  if (related.length < maxResults) {
    // Lazy load sampleBlogPosts to avoid potential circular dependencies or large initial bundle size if not needed
    // However, since we need to return synchronously, we'll assume it's available or we need to import it at top level.
    // For this implementation, we will import it at the top level.
    // NOTE: See import addition at top of file. 

    // Filter potential fallback posts
    const fallbackPosts = sampleBlogPosts
      .filter(post => {
        // Exclude current page
        if (post.link === pageUrl) return false;

        // Exclude pages already in related list
        if (related.some(r => r.url === post.link)) return false;

        return true;
      })
      // Sort by date (newest first) - assuming they are already sorted or we sort them
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Add fallback posts until we reach maxResults
    for (const post of fallbackPosts) {
      if (related.length >= maxResults) break;

      related.push({
        url: post.link,
        title: post.title,
        type: 'spoke' // Treat fallbacks as regular articles
      });
    }
  }

  return related.slice(0, maxResults);
}

/**
 * Get all clusters a page belongs to
 */
export function getClustersForPage(pageUrl: string): TopicCluster[] {
  return TOPIC_CLUSTERS.filter(
    cluster => cluster.hubPage === pageUrl || cluster.spokes.includes(pageUrl)
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
  const cluster = getClusterForPage(targetUrl);
  if (!cluster) return [];

  const linkingPages: string[] = [];

  // If target is the hub, all spokes should link to it
  if (cluster.hubPage === targetUrl) {
    return cluster.spokes;
  }

  // If target is a spoke, hub and related spokes should link to it
  if (cluster.spokes.includes(targetUrl)) {
    linkingPages.push(cluster.hubPage);

    // Add a few related spokes (not all to avoid over-linking)
    const otherSpokes = cluster.spokes.filter(url => url !== targetUrl);
    linkingPages.push(...otherSpokes.slice(0, 3));
  }

  return linkingPages;
}

/**
 * Get breadcrumb trail for a page based on its cluster
 */
export function getBreadcrumbs(pageUrl: string): Array<{ label: string; url: string }> {
  const breadcrumbs: Array<{ label: string; url: string }> = [
    { label: 'Home', url: '/' },
  ];

  // Add section breadcrumb
  if (pageUrl.startsWith('/blog/')) {
    breadcrumbs.push({ label: 'Blog', url: '/blog' });
  } else if (pageUrl.startsWith('/learn/')) {
    breadcrumbs.push({ label: 'Learn', url: '/learn' });
  } else if (pageUrl.startsWith('/products/')) {
    breadcrumbs.push({ label: 'Products', url: '/products' });
  } else if (pageUrl.startsWith('/locations/')) {
    breadcrumbs.push({ label: 'Locations', url: '/locations' });
  }

  // Add cluster hub if applicable
  const cluster = getClusterForPage(pageUrl);
  if (cluster && cluster.spokes.includes(pageUrl)) {
    breadcrumbs.push({
      label: cluster.name,
      url: cluster.hubPage,
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
