/**
 * Internal Link Suggestion System
 * Suggests where to add internal links based on content analysis
 */

import { TOPIC_CLUSTERS, getClusterForPage } from './topic-clusters';

export interface LinkSuggestion {
  fromPage: string;
  toPage: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  anchorText?: string;
  context?: string;
}

/**
 * Generate link suggestions for all pages
 */
export function generateLinkSuggestions(): LinkSuggestion[] {
  const suggestions: LinkSuggestion[] = [];

  // 1. Cluster-based suggestions
  for (const cluster of TOPIC_CLUSTERS) {
    // Hub should link to all spokes
    for (const spoke of cluster.spokes) {
      suggestions.push({
        fromPage: cluster.hubPage,
        toPage: spoke,
        reason: `Hub page should link to spoke: ${spoke}`,
        priority: 'high',
        anchorText: extractTitle(spoke),
        context: cluster.name,
      });
    }

    // All spokes should link back to hub
    for (const spoke of cluster.spokes) {
      suggestions.push({
        fromPage: spoke,
        toPage: cluster.hubPage,
        reason: `Spoke should link to hub: ${cluster.name}`,
        priority: 'high',
        anchorText: `${cluster.name} Guide`,
        context: 'Related guide',
      });
    }

    // Spokes should link to 2-3 related spokes
    for (const spoke of cluster.spokes) {
      const relatedSpokes = cluster.spokes.filter(s => s !== spoke);

      // Link to 3 most relevant spokes
      for (let i = 0; i < Math.min(3, relatedSpokes.length); i++) {
        suggestions.push({
          fromPage: spoke,
          toPage: relatedSpokes[i],
          reason: `Related content within cluster: ${cluster.name}`,
          priority: 'medium',
          anchorText: extractTitle(relatedSpokes[i]),
          context: cluster.name,
        });
      }
    }
  }

  // 2. All blog posts about products should link to product pages
  for (const cluster of TOPIC_CLUSTERS) {
    for (const spoke of cluster.spokes) {
      if (spoke.includes('/blog/')) {
        // Link to trial-size (most common entry point)
        suggestions.push({
          fromPage: spoke,
          toPage: '/products/trial-size',
          reason: 'Blog post should link to trial product',
          priority: 'high',
          anchorText: 'Try Purrify Free',
          context: 'Call to action',
        });
      }
    }
  }

  // 3. Blog index should link to all blog posts
  for (const cluster of TOPIC_CLUSTERS) {
    for (const spoke of cluster.spokes) {
      if (spoke.includes('/blog/')) {
        suggestions.push({
          fromPage: '/blog',
          toPage: spoke,
          reason: 'Blog index should link to blog post',
          priority: 'medium',
          anchorText: extractTitle(spoke),
        });
      }
    }
  }

  // 4. Learn index should link to all learn pages
  for (const cluster of TOPIC_CLUSTERS) {
    for (const spoke of cluster.spokes) {
      if (spoke.includes('/learn/')) {
        suggestions.push({
          fromPage: '/learn',
          toPage: spoke,
          reason: 'Learn index should link to learn page',
          priority: 'medium',
          anchorText: extractTitle(spoke),
        });
      }
    }
  }

  return suggestions;
}

/**
 * Get link suggestions for a specific page
 */
export function getSuggestionsForPage(pageUrl: string): LinkSuggestion[] {
  const allSuggestions = generateLinkSuggestions();
  return allSuggestions.filter(s => s.fromPage === pageUrl);
}

/**
 * Get suggestions where a page should receive links
 */
export function getSuggestionsToPage(pageUrl: string): LinkSuggestion[] {
  const allSuggestions = generateLinkSuggestions();
  return allSuggestions.filter(s => s.toPage === pageUrl);
}

/**
 * Find anchor text opportunities in content
 */
export function findAnchorOpportunities(
  content: string,
  targetUrl: string
): Array<{ keyword: string; position: number }> {
  const opportunities: Array<{ keyword: string; position: number }> = [];

  // Get keywords for the target page
  const cluster = getClusterForPage(targetUrl);
  if (!cluster) return opportunities;

  // Search for keyword mentions in content
  const keywords = cluster.keywords || [];
  const contentLower = content.toLowerCase();

  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    let match;

    while ((match = regex.exec(contentLower)) !== null) {
      opportunities.push({
        keyword,
        position: match.index,
      });
    }
  }

  // Sort by position
  opportunities.sort((a, b) => a.position - b.position);

  return opportunities;
}

/**
 * Extract title from URL
 */
function extractTitle(url: string): string {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Prioritize link suggestions by impact
 */
export function prioritizeSuggestions(
  suggestions: LinkSuggestion[]
): LinkSuggestion[] {
  return suggestions.sort((a, b) => {
    // Sort by priority first
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const aPriority = priorityOrder[a.priority];
    const bPriority = priorityOrder[b.priority];

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // Then by page type (product > blog > learn > other)
    const typeScore = (url: string) => {
      if (url.includes('/products/')) return 4;
      if (url.includes('/blog/')) return 3;
      if (url.includes('/learn/')) return 2;
      return 1;
    };

    return typeScore(b.toPage) - typeScore(a.toPage);
  });
}

/**
 * Group suggestions by page
 */
export function groupSuggestionsByPage(
  suggestions: LinkSuggestion[]
): Map<string, LinkSuggestion[]> {
  const grouped = new Map<string, LinkSuggestion[]>();

  for (const suggestion of suggestions) {
    const existing = grouped.get(suggestion.fromPage) || [];
    existing.push(suggestion);
    grouped.set(suggestion.fromPage, existing);
  }

  return grouped;
}
