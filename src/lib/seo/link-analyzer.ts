/**
 * Internal Link Analyzer
 * Analyzes internal linking structure to identify orphan and weak pages
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'fast-glob';

export interface LinkNode {
  url: string;
  incomingLinks: string[];
  outgoingLinks: string[];
  pageType: 'homepage' | 'product' | 'blog' | 'learn' | 'location' | 'other';
  linkScore: number;
}

export interface LinkAnalysis {
  totalPages: number;
  orphanPages: LinkNode[];
  weakPages: LinkNode[];
  strongPages: LinkNode[];
  averageIncomingLinks: number;
  averageOutgoingLinks: number;
  linkGraph: Map<string, LinkNode>;
}

/**
 * Determine page type from URL
 */
function getPageType(url: string): LinkNode['pageType'] {
  if (url === '/' || url === '') return 'homepage';
  if (url.includes('/products/')) return 'product';
  if (url.includes('/blog/')) return 'blog';
  if (url.includes('/learn/')) return 'learn';
  if (url.includes('/locations/')) return 'location';
  return 'other';
}

/**
 * Extract internal links from file content
 */
function extractInternalLinks(content: string, baseUrl: string = ''): string[] {
  const links: string[] = [];

  // Match Next.js Link href patterns
  const linkPatterns = [
    /href=["']([^"']+)["']/g,
    /to=["']([^"']+)["']/g,
    /pathname:\s*["']([^"']+)["']/g,
  ];

  for (const pattern of linkPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      let href = match[1];

      // Skip external links, anchors, and special URLs
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        href.includes('javascript:')
      ) {
        continue;
      }

      // Normalize URL
      if (href.startsWith('/')) {
        links.push(href);
      } else if (!href.includes('://')) {
        // Relative URL - resolve it
        const resolved = path.posix.join(baseUrl, href);
        links.push(resolved);
      }
    }
  }

  return [...new Set(links)]; // Remove duplicates
}

/**
 * Get all page files
 */
export async function getPageFiles(): Promise<string[]> {
  const pagesDir = path.join(process.cwd(), 'pages');

  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    cwd: pagesDir,
    ignore: [
      '**/_*.{tsx,ts,jsx,js}',
      '**/api/**',
      '**/*.d.ts',
    ],
  });

  return files.map(file => {
    // Convert file path to URL
    let url = '/' + file
      .replace(/\.(tsx|ts|jsx|js)$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');

    if (url === '/') url = '';
    return url;
  });
}

/**
 * Build link graph from all pages
 */
export async function buildLinkGraph(): Promise<Map<string, LinkNode>> {
  const linkGraph = new Map<string, LinkNode>();
  const pagesDir = path.join(process.cwd(), 'pages');

  // Get all page files
  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    cwd: pagesDir,
    ignore: [
      '**/_*.{tsx,ts,jsx,js}',
      '**/api/**',
      '**/*.d.ts',
    ],
  });

  // Initialize all nodes
  for (const file of files) {
    let url = '/' + file
      .replace(/\.(tsx|ts|jsx|js)$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');

    if (url === '/') url = '';

    linkGraph.set(url, {
      url,
      incomingLinks: [],
      outgoingLinks: [],
      pageType: getPageType(url),
      linkScore: 0,
    });
  }

  // Scan each file for outgoing links
  for (const file of files) {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    let sourceUrl = '/' + file
      .replace(/\.(tsx|ts|jsx|js)$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');

    if (sourceUrl === '/') sourceUrl = '';

    const outgoingLinks = extractInternalLinks(content, sourceUrl);

    const sourceNode = linkGraph.get(sourceUrl);
    if (sourceNode) {
      sourceNode.outgoingLinks = outgoingLinks;
    }

    // Add to incoming links of target pages
    for (const targetUrl of outgoingLinks) {
      // Normalize target URL
      let normalizedTarget = targetUrl;
      if (normalizedTarget.endsWith('/') && normalizedTarget !== '/') {
        normalizedTarget = normalizedTarget.slice(0, -1);
      }

      const targetNode = linkGraph.get(normalizedTarget);
      if (targetNode && !targetNode.incomingLinks.includes(sourceUrl)) {
        targetNode.incomingLinks.push(sourceUrl);
      }
    }
  }

  // Calculate link scores
  for (const node of linkGraph.values()) {
    // Link score = weighted sum of incoming and outgoing links
    // Incoming links are more important (3x weight)
    node.linkScore = (node.incomingLinks.length * 3) + node.outgoingLinks.length;
  }

  return linkGraph;
}

/**
 * Analyze link structure
 */
export async function analyzeLinkStructure(): Promise<LinkAnalysis> {
  const linkGraph = await buildLinkGraph();

  const orphanPages: LinkNode[] = [];
  const weakPages: LinkNode[] = [];
  const strongPages: LinkNode[] = [];

  let totalIncomingLinks = 0;
  let totalOutgoingLinks = 0;

  for (const node of linkGraph.values()) {
    totalIncomingLinks += node.incomingLinks.length;
    totalOutgoingLinks += node.outgoingLinks.length;

    // Categorize pages
    if (node.incomingLinks.length === 0 && node.url !== '') {
      // Homepage is not an orphan even with 0 incoming links
      orphanPages.push(node);
    } else if (node.incomingLinks.length >= 1 && node.incomingLinks.length <= 2) {
      weakPages.push(node);
    } else if (node.incomingLinks.length >= 5) {
      strongPages.push(node);
    }
  }

  // Sort by link score (lowest first for orphan/weak, highest first for strong)
  orphanPages.sort((a, b) => a.linkScore - b.linkScore);
  weakPages.sort((a, b) => a.linkScore - b.linkScore);
  strongPages.sort((a, b) => b.linkScore - a.linkScore);

  return {
    totalPages: linkGraph.size,
    orphanPages,
    weakPages,
    strongPages,
    averageIncomingLinks: totalIncomingLinks / linkGraph.size,
    averageOutgoingLinks: totalOutgoingLinks / linkGraph.size,
    linkGraph,
  };
}

/**
 * Get link suggestions for a page
 */
export function getLinkSuggestions(
  targetUrl: string,
  linkGraph: Map<string, LinkNode>,
  maxSuggestions: number = 5
): LinkNode[] {
  const targetNode = linkGraph.get(targetUrl);
  if (!targetNode) return [];

  const suggestions: LinkNode[] = [];
  const targetType = targetNode.pageType;

  // Find related pages that could link to this page
  for (const [url, node] of linkGraph.entries()) {
    if (url === targetUrl) continue;
    if (node.incomingLinks.includes(targetUrl)) continue; // Already links to it

    // Calculate relevance score
    let relevance = 0;

    // Same page type = higher relevance
    if (node.pageType === targetType) {
      relevance += 3;
    }

    // Strong pages (many outgoing links) are good link sources
    if (node.outgoingLinks.length >= 3) {
      relevance += 2;
    }

    // Related URL structure
    const targetParts = targetUrl.split('/');
    const sourceParts = url.split('/');
    const commonParts = targetParts.filter(p => sourceParts.includes(p)).length;
    relevance += commonParts;

    if (relevance > 0) {
      suggestions.push({ ...node, linkScore: relevance });
    }
  }

  // Sort by relevance and return top suggestions
  suggestions.sort((a, b) => b.linkScore - a.linkScore);
  return suggestions.slice(0, maxSuggestions);
}

/**
 * Find pages that need more internal links
 */
export function findPagesNeedingLinks(
  linkGraph: Map<string, LinkNode>,
  minIncomingLinks: number = 3
): LinkNode[] {
  const needsLinks: LinkNode[] = [];

  for (const node of linkGraph.values()) {
    if (node.url === '') continue; // Skip homepage
    if (node.incomingLinks.length < minIncomingLinks) {
      needsLinks.push(node);
    }
  }

  // Sort by priority (orphans first, then by page type importance)
  needsLinks.sort((a, b) => {
    // Orphans first
    if (a.incomingLinks.length === 0 && b.incomingLinks.length > 0) return -1;
    if (b.incomingLinks.length === 0 && a.incomingLinks.length > 0) return 1;

    // Then by page type importance
    const typeOrder = { product: 1, blog: 2, learn: 3, location: 4, other: 5, homepage: 6 };
    const aOrder = typeOrder[a.pageType] || 99;
    const bOrder = typeOrder[b.pageType] || 99;

    if (aOrder !== bOrder) return aOrder - bOrder;

    // Then by number of incoming links (fewest first)
    return a.incomingLinks.length - b.incomingLinks.length;
  });

  return needsLinks;
}
