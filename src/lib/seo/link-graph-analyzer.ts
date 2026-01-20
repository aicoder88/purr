/**
 * Link graph analysis utilities
 * Analyzes internal linking structure and identifies issues
 */

import * as cheerio from 'cheerio';
import { LinkGraphNode, LinkSuggestion } from './types';

export class LinkGraphAnalyzer {
  private graph: Map<string, LinkGraphNode> = new Map();

  constructor() {
    this.graph = new Map();
  }

  /**
   * Build link graph from page data
   * @param pages Array of page paths
   * @param links Array of link relationships { from, to, anchorText }
   */
  buildGraph(
    pages: string[],
    links: Array<{ from: string; to: string; anchorText: string }>
  ): Map<string, LinkGraphNode> {
    // Initialize nodes for all pages
    pages.forEach((path) => {
      if (!this.graph.has(path)) {
        this.graph.set(path, {
          path,
          incomingLinks: [],
          outgoingLinks: [],
          authorityScore: 0,
          incomingLinkCount: 0,
          outgoingLinkCount: 0,
          isOrphan: false,
          isWeak: false,
          isDeadEnd: false,
        });
      }
    });

    // Build link relationships
    links.forEach(({ from, to, anchorText }) => {
      const fromNode = this.graph.get(from);
      const toNode = this.graph.get(to);

      if (fromNode && toNode) {
        // Add outgoing link to source page
        fromNode.outgoingLinks.push({ toPath: to, anchorText });
        fromNode.outgoingLinkCount++;

        // Add incoming link to target page
        toNode.incomingLinks.push({ fromPath: from, anchorText });
        toNode.incomingLinkCount++;
      }
    });

    // Calculate metrics and flags for each node
    this.graph.forEach((node) => {
      node.isOrphan = node.incomingLinkCount === 0;
      node.isWeak = node.incomingLinkCount === 1;
      node.isDeadEnd = node.outgoingLinkCount === 0;
      node.authorityScore = this.calculateAuthorityScore(node);
    });

    return this.graph;
  }

  /**
   * Calculate authority score using simplified PageRank algorithm
   * @param node The node to calculate score for
   * @returns Authority score (0-100)
   */
  private calculateAuthorityScore(node: LinkGraphNode): number {
    // Simplified PageRank: based on incoming links and their quality
    const baseScore = Math.min(node.incomingLinkCount * 10, 50);

    // Bonus for having outgoing links (not a dead end)
    const outgoingBonus = node.outgoingLinkCount > 0 ? 10 : 0;

    // Penalty for being orphaned or weak
    const orphanPenalty = node.isOrphan ? -20 : 0;
    const weakPenalty = node.isWeak ? -10 : 0;

    const score = baseScore + outgoingBonus + orphanPenalty + weakPenalty;

    // Normalize to 0-100 range
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Find orphan pages (pages with 0 incoming links)
   * @returns Array of orphan page paths
   */
  findOrphanPages(): string[] {
    const orphans: string[] = [];

    this.graph.forEach((node) => {
      if (node.isOrphan) {
        orphans.push(node.path);
      }
    });

    return orphans;
  }

  /**
   * Find weak pages (pages with exactly 1 incoming link)
   * @returns Array of weak page paths
   */
  findWeakPages(): string[] {
    const weakPages: string[] = [];

    this.graph.forEach((node) => {
      if (node.isWeak) {
        weakPages.push(node.path);
      }
    });

    return weakPages;
  }

  /**
   * Find dead end pages (pages with 0 outgoing links)
   * @returns Array of dead end page paths
   */
  findDeadEndPages(): string[] {
    const deadEnds: string[] = [];

    this.graph.forEach((node) => {
      if (node.isDeadEnd) {
        deadEnds.push(node.path);
      }
    });

    return deadEnds;
  }

  /**
   * Get node information for a specific page
   * @param path Page path
   * @returns Node information or undefined
   */
  getNode(path: string): LinkGraphNode | undefined {
    return this.graph.get(path);
  }

  /**
   * Get all nodes in the graph
   * @returns Map of all nodes
   */
  getAllNodes(): Map<string, LinkGraphNode> {
    return new Map(this.graph);
  }

  /**
   * Get statistics about the link graph
   * @returns Graph statistics
   */
  getStats(): {
    totalPages: number;
    orphanPages: number;
    weakPages: number;
    deadEndPages: number;
    averageIncomingLinks: number;
    averageOutgoingLinks: number;
    totalLinks: number;
  } {
    let totalIncoming = 0;
    let totalOutgoing = 0;
    let totalLinks = 0;

    this.graph.forEach((node) => {
      totalIncoming += node.incomingLinkCount;
      totalOutgoing += node.outgoingLinkCount;
      totalLinks += node.outgoingLinks.length;
    });

    const totalPages = this.graph.size;

    return {
      totalPages,
      orphanPages: this.findOrphanPages().length,
      weakPages: this.findWeakPages().length,
      deadEndPages: this.findDeadEndPages().length,
      averageIncomingLinks: totalPages > 0 ? totalIncoming / totalPages : 0,
      averageOutgoingLinks: totalPages > 0 ? totalOutgoing / totalPages : 0,
      totalLinks,
    };
  }

  /**
   * Clear the graph
   */
  clear(): void {
    this.graph.clear();
  }
}

/**
 * Extracted link information
 */
export interface ExtractedLink {
  href: string;
  anchorText: string;
  context: string; // Surrounding text for context
  isInternal: boolean;
}

/**
 * Extract all links from HTML content
 * @param html HTML content to parse
 * @param basePath Base path of the page (for resolving relative links)
 * @param domain Domain to identify internal links
 * @returns Array of extracted links
 */
export function extractLinks(
  html: string,
  basePath: string,
  domain: string = 'purrify.ca'
): ExtractedLink[] {
  const $ = cheerio.load(html);
  const links: ExtractedLink[] = [];

  // Extract from <a> tags
  $('a').each((_, element) => {
    const $el = $(element);
    const href = $el.attr('href');

    if (!href) return;

    const anchorText = $el.text().trim();
    const context = extractContext($, element, 50); // 50 chars of surrounding text

    links.push({
      href,
      anchorText,
      context,
      isInternal: isInternalLink(href, domain),
    });
  });

  return links;
}

/**
 * Extract only internal links from HTML
 * @param html HTML content to parse
 * @param basePath Base path of the page
 * @param domain Domain to identify internal links
 * @returns Array of internal links
 */
export function extractInternalLinks(
  html: string,
  basePath: string,
  domain: string = 'purrify.ca'
): ExtractedLink[] {
  const allLinks = extractLinks(html, basePath, domain);
  return allLinks.filter((link) => link.isInternal);
}

/**
 * Determine if a link is internal
 * @param href Link href attribute
 * @param domain Current site domain
 * @returns True if link is internal
 */
function isInternalLink(href: string, domain: string): boolean {
  // Skip anchors, mailto, tel, etc.
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return false;
  }

  // Relative links are internal
  if (href.startsWith('/')) {
    return true;
  }

  // Check if absolute URL contains our domain
  if (href.includes(domain)) {
    return true;
  }

  // External link
  return false;
}

/**
 * Normalize a link href to a clean path
 * @param href Link href
 * @param basePath Current page path
 * @returns Normalized path
 */
export function normalizeLinkHref(href: string, basePath: string): string {
  // Remove hash
  let clean = href.split('#')[0];

  // Remove query params
  clean = clean.split('?')[0];

  // If relative, resolve against base path
  if (clean.startsWith('/')) {
    return clean;
  }

  // If absolute URL, extract path
  try {
    const url = new URL(clean);
    return url.pathname;
  } catch {
    // Invalid URL, return as-is
    return clean;
  }
}

/**
 * Extract surrounding text context for a link
 * @param $ Cheerio instance
 * @param element Link element
 * @param maxLength Maximum context length
 * @returns Context string
 */
function extractContext(
  $: cheerio.CheerioAPI,
  element: any,
  maxLength: number = 50
): string {
  const $el = $(element);
  const $parent = $el.parent();

  if (!$parent.length) {
    return '';
  }

  // Get parent text content
  const parentText = $parent.text().trim();

  // Find the link text within parent
  const linkText = $el.text().trim();
  const linkIndex = parentText.indexOf(linkText);

  if (linkIndex === -1) {
    return parentText.substring(0, maxLength);
  }

  // Extract text before and after the link
  const before = parentText.substring(
    Math.max(0, linkIndex - maxLength / 2),
    linkIndex
  );
  const after = parentText.substring(
    linkIndex + linkText.length,
    linkIndex + linkText.length + maxLength / 2
  );

  return `...${before}${linkText}${after}...`.trim();
}

/**
 * Build link graph from HTML files
 * @param pages Array of page objects with path and HTML content
 * @param domain Site domain
 * @returns LinkGraphAnalyzer with built graph
 */
export function buildGraphFromHTML(
  pages: Array<{ path: string; html: string }>,
  domain: string = 'purrify.ca'
): LinkGraphAnalyzer {
  const analyzer = new LinkGraphAnalyzer();
  const allPages = pages.map((p) => p.path);
  const allLinks: Array<{ from: string; to: string; anchorText: string }> = [];

  // Extract links from each page
  pages.forEach(({ path, html }) => {
    const links = extractInternalLinks(html, path, domain);

    links.forEach((link) => {
      const normalizedPath = normalizeLinkHref(link.href, path);

      allLinks.push({
        from: path,
        to: normalizedPath,
        anchorText: link.anchorText,
      });
    });
  });

  // Build the graph
  analyzer.buildGraph(allPages, allLinks);

  return analyzer;
}

// Export singleton instance for convenience
export const linkGraphAnalyzer = new LinkGraphAnalyzer();
