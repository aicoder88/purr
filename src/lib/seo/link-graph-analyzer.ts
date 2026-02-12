/**
 * Link graph analysis utilities
 * Analyzes internal linking structure and identifies issues
 */

import * as cheerio from 'cheerio';
import type { AnyNode } from 'domhandler';
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
    // Resolve relative links against the current page path
    try {
      const baseUrl = new URL(basePath, 'https://example.com');
      return new URL(clean, baseUrl).pathname;
    } catch {
      // Invalid URL, return as-is
      return clean;
    }
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
  element: AnyNode,
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

/**
 * Calculate relevance score between two pieces of text
 * @param sourceText Text from source page/context
 * @param targetText Text from target page/context
 * @returns Similarity score (0-100)
 */
function calculateTextSimilarity(sourceText: string, targetText: string): number {
  // Normalize and tokenize
  const normalize = (text: string): string[] => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 3); // Filter out short words
  };

  const sourceTokens = normalize(sourceText);
  const targetTokens = normalize(targetText);

  if (sourceTokens.length === 0 || targetTokens.length === 0) {
    return 0;
  }

  // Calculate Jaccard similarity (intersection / union)
  const sourceSet = new Set(sourceTokens);
  const targetSet = new Set(targetTokens);

  const intersection = new Set(
    [...sourceSet].filter((token) => targetSet.has(token))
  );
  const union = new Set([...sourceSet, ...targetSet]);

  const similarity = (intersection.size / union.size) * 100;

  return Math.min(100, Math.max(0, similarity));
}

/**
 * Calculate relevance score for a link suggestion
 * @param sourceContext Context text from source page
 * @param targetPagePath Target page path
 * @param anchorText Proposed anchor text
 * @param graph Link graph containing page data
 * @returns Relevance score (0-100)
 */
export function calculateLinkRelevance(
  sourceContext: string,
  targetPagePath: string,
  anchorText: string,
  graph: Map<string, LinkGraphNode>
): number {
  const targetNode = graph.get(targetPagePath);

  if (!targetNode) {
    return 0; // Target page doesn't exist
  }

  // 1. Context similarity (40% weight)
  // Compare source context with target page anchor texts
  const targetTexts = [
    ...targetNode.incomingLinks.map((l) => l.anchorText),
    ...targetNode.outgoingLinks.map((l) => l.anchorText),
  ].join(' ');

  const contextScore = calculateTextSimilarity(sourceContext, targetTexts);

  // 2. Anchor text quality (30% weight)
  // Good anchor text is descriptive (5-50 chars) and relevant
  let anchorScore = 0;

  if (anchorText.length >= 5 && anchorText.length <= 50) {
    anchorScore = 50; // Good length

    // Bonus for keyword-rich anchor text
    const anchorKeywords = anchorText.toLowerCase().split(/\s+/);
    const targetPathKeywords = targetPagePath
      .toLowerCase()
      .split(/[\/\-_]/)
      .filter((w) => w.length > 3);

    const matchingKeywords = anchorKeywords.filter((k) =>
      targetPathKeywords.some((tk) => tk.includes(k) || k.includes(tk))
    );

    anchorScore += Math.min(50, matchingKeywords.length * 15);
  } else if (anchorText.length > 0) {
    anchorScore = 25; // Not ideal but usable
  }

  // 3. Target authority (30% weight)
  // Prefer linking to high-authority pages
  const authorityScore = targetNode.authorityScore;

  // Weighted combination
  const relevance =
    contextScore * 0.4 + anchorScore * 0.3 + authorityScore * 0.3;

  return Math.min(100, Math.max(0, Math.round(relevance)));
}

/**
 * Determine priority level based on relevance score
 * @param relevanceScore Relevance score (0-100)
 * @returns Priority level
 */
export function scoreToPriority(
  relevanceScore: number
): 'high' | 'medium' | 'low' {
  if (relevanceScore >= 70) {
    return 'high';
  } else if (relevanceScore >= 40) {
    return 'medium';
  } else {
    return 'low';
  }
}

/**
 * Generate reason text for link suggestion
 * @param relevanceScore Relevance score
 * @param targetNode Target page node
 * @returns Human-readable reason
 */
export function generateSuggestionReason(
  relevanceScore: number,
  targetNode: LinkGraphNode
): string {
  const reasons: string[] = [];

  // Check for issues
  if (targetNode.isOrphan) {
    reasons.push('Page is orphaned (no incoming links)');
  } else if (targetNode.isWeak) {
    reasons.push('Page has weak link equity (only 1 incoming link)');
  }

  if (targetNode.isDeadEnd) {
    reasons.push('Page is a dead end (no outgoing links)');
  }

  // Add authority context
  if (targetNode.authorityScore >= 70) {
    reasons.push('High authority page');
  } else if (targetNode.authorityScore <= 30) {
    reasons.push('Low authority page that needs more links');
  }

  // Add relevance context
  if (relevanceScore >= 70) {
    reasons.push('Highly relevant content match');
  } else if (relevanceScore >= 40) {
    reasons.push('Moderately relevant content');
  }

  return reasons.join('. ') || 'Potential relevant link';
}

/**
 * Link Suggestion Engine
 * Generates smart internal link suggestions based on content relevance
 */
export class LinkSuggestionEngine {
  private graph: Map<string, LinkGraphNode>;

  constructor(graph: Map<string, LinkGraphNode>) {
    this.graph = graph;
  }

  /**
   * Generate link suggestions for a specific page
   * @param sourcePath Source page path
   * @param sourceContext Context text from source page
   * @param maxSuggestions Maximum number of suggestions to return
   * @returns Array of link suggestions sorted by relevance
   */
  suggestLinksForPage(
    sourcePath: string,
    sourceContext: string,
    maxSuggestions: number = 10
  ): LinkSuggestion[] {
    const sourceNode = this.graph.get(sourcePath);

    if (!sourceNode) {
      return []; // Source page doesn't exist
    }

    const suggestions: LinkSuggestion[] = [];

    // Get all potential target pages (exclude self and already linked)
    const alreadyLinkedPaths = new Set(
      sourceNode.outgoingLinks.map((l) => l.toPath)
    );
    alreadyLinkedPaths.add(sourcePath); // Don't suggest linking to self

    // Evaluate each potential target
    this.graph.forEach((targetNode, targetPath) => {
      if (alreadyLinkedPaths.has(targetPath)) {
        return; // Skip already linked pages
      }

      // Generate anchor text suggestion from target path
      const anchorText = this.generateAnchorText(targetPath, targetNode);

      // Calculate relevance score
      const relevanceScore = calculateLinkRelevance(
        sourceContext,
        targetPath,
        anchorText,
        this.graph
      );

      // Only suggest if relevance is above threshold
      if (relevanceScore >= 20) {
        suggestions.push({
          targetPage: targetPath,
          anchorText,
          reason: generateSuggestionReason(relevanceScore, targetNode),
          priority: scoreToPriority(relevanceScore),
          relevanceScore,
        });
      }
    });

    // Sort by relevance score (highest first)
    suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Return top N suggestions
    return suggestions.slice(0, maxSuggestions);
  }

  /**
   * Find pages that need more incoming links
   * @param minAuthorityScore Minimum authority threshold
   * @returns Array of weak pages with suggested sources
   */
  findPagesNeedingLinks(
    minAuthorityScore: number = 30
  ): Array<{
    page: string;
    issue: 'orphan' | 'weak' | 'low-authority';
    currentLinks: number;
    authorityScore: number;
    suggestedSources: string[];
  }> {
    const pagesNeedingHelp: Array<{
      page: string;
      issue: 'orphan' | 'weak' | 'low-authority';
      currentLinks: number;
      authorityScore: number;
      suggestedSources: string[];
    }> = [];

    this.graph.forEach((node, path) => {
      let issue: 'orphan' | 'weak' | 'low-authority' | null = null;

      if (node.isOrphan) {
        issue = 'orphan';
      } else if (node.isWeak) {
        issue = 'weak';
      } else if (node.authorityScore < minAuthorityScore) {
        issue = 'low-authority';
      }

      if (issue) {
        // Find potential source pages (high authority pages)
        const suggestedSources = this.findBestSourcePages(path, 5);

        pagesNeedingHelp.push({
          page: path,
          issue,
          currentLinks: node.incomingLinkCount,
          authorityScore: node.authorityScore,
          suggestedSources,
        });
      }
    });

    // Sort by severity (orphans first, then weak, then low authority)
    pagesNeedingHelp.sort((a, b) => {
      const severityOrder = { orphan: 0, weak: 1, 'low-authority': 2 };
      if (severityOrder[a.issue] !== severityOrder[b.issue]) {
        return severityOrder[a.issue] - severityOrder[b.issue];
      }
      return a.authorityScore - b.authorityScore; // Lower authority first
    });

    return pagesNeedingHelp;
  }

  /**
   * Find best source pages to link from to a target
   * @param targetPath Target page path
   * @param maxSources Maximum number of sources to return
   * @returns Array of source page paths sorted by suitability
   */
  private findBestSourcePages(
    targetPath: string,
    maxSources: number = 5
  ): string[] {
    const targetNode = this.graph.get(targetPath);

    if (!targetNode) {
      return [];
    }

    const sourceCandidates: Array<{ path: string; score: number }> = [];

    // Evaluate each page as a potential source
    this.graph.forEach((sourceNode, sourcePath) => {
      if (sourcePath === targetPath) {
        return; // Skip self
      }

      // Check if already linked
      const alreadyLinked = sourceNode.outgoingLinks.some(
        (l) => l.toPath === targetPath
      );

      if (alreadyLinked) {
        return; // Skip if already linking
      }

      // Prefer high-authority pages as sources
      let score = sourceNode.authorityScore;

      // Bonus for pages that aren't dead ends
      if (!sourceNode.isDeadEnd) {
        score += 10;
      }

      // Bonus for pages with moderate outgoing link count (not too many)
      if (sourceNode.outgoingLinkCount >= 2 && sourceNode.outgoingLinkCount <= 10) {
        score += 15;
      }

      sourceCandidates.push({ path: sourcePath, score });
    });

    // Sort by score and return top N
    sourceCandidates.sort((a, b) => b.score - a.score);
    return sourceCandidates.slice(0, maxSources).map((c) => c.path);
  }

  /**
   * Generate anchor text from page path and node data
   * @param path Page path
   * @param node Link graph node
   * @returns Suggested anchor text
   */
  private generateAnchorText(path: string, node: LinkGraphNode): string {
    // Use existing anchor texts if available
    if (node.incomingLinks.length > 0) {
      // Use most common anchor text
      const anchorCounts = new Map<string, number>();

      node.incomingLinks.forEach((link) => {
        const text = link.anchorText.trim();
        if (text) {
          anchorCounts.set(text, (anchorCounts.get(text) || 0) + 1);
        }
      });

      // Find most frequent
      let maxCount = 0;
      let bestAnchor = '';

      anchorCounts.forEach((count, anchor) => {
        if (count > maxCount) {
          maxCount = count;
          bestAnchor = anchor;
        }
      });

      if (bestAnchor) {
        return bestAnchor;
      }
    }

    // Generate from path
    const pathParts = path.split('/').filter((p) => p);
    const lastPart = pathParts[pathParts.length - 1] || '';

    // Convert kebab-case/snake_case to title case
    const readable = lastPart
      .replace(/[-_]/g, ' ')
      .replace(/\.(html?|tsx?|jsx?)$/, '') // Remove file extensions
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();

    return readable || 'Read More';
  }

  /**
   * Get comprehensive link suggestions report
   * @returns Object with suggestions and issues
   */
  getFullReport(): {
    suggestions: Map<string, LinkSuggestion[]>;
    pagesNeedingLinks: Array<{
      page: string;
      issue: 'orphan' | 'weak' | 'low-authority';
      currentLinks: number;
      authorityScore: number;
      suggestedSources: string[];
    }>;
    stats: {
      totalPages: number;
      orphanPages: number;
      weakPages: number;
      deadEndPages: number;
      averageIncomingLinks: number;
      averageOutgoingLinks: number;
      totalLinks: number;
    };
  } {
    const suggestions = new Map<string, LinkSuggestion[]>();

    // Generate suggestions for each page
    this.graph.forEach((node, path) => {
      // Use first incoming link's context as source context
      // In real usage, this would be actual page content
      const sourceContext = node.incomingLinks
        .map((l) => l.anchorText)
        .join(' ');

      const pageSuggestions = this.suggestLinksForPage(
        path,
        sourceContext || path,
        5
      );

      if (pageSuggestions.length > 0) {
        suggestions.set(path, pageSuggestions);
      }
    });

    return {
      suggestions,
      pagesNeedingLinks: this.findPagesNeedingLinks(),
      stats: this.getGraphStats(),
    };
  }

  /**
   * Get graph statistics
   * @returns Graph statistics
   */
  private getGraphStats(): {
    totalPages: number;
    orphanPages: number;
    weakPages: number;
    deadEndPages: number;
    averageIncomingLinks: number;
    averageOutgoingLinks: number;
    totalLinks: number;
  } {
    let orphanCount = 0;
    let weakCount = 0;
    let deadEndCount = 0;
    let totalIncoming = 0;
    let totalOutgoing = 0;
    let totalLinks = 0;

    this.graph.forEach((node) => {
      if (node.isOrphan) orphanCount++;
      if (node.isWeak) weakCount++;
      if (node.isDeadEnd) deadEndCount++;
      totalIncoming += node.incomingLinkCount;
      totalOutgoing += node.outgoingLinkCount;
      totalLinks += node.outgoingLinks.length;
    });

    const totalPages = this.graph.size;

    return {
      totalPages,
      orphanPages: orphanCount,
      weakPages: weakCount,
      deadEndPages: deadEndCount,
      averageIncomingLinks: totalPages > 0 ? totalIncoming / totalPages : 0,
      averageOutgoingLinks: totalPages > 0 ? totalOutgoing / totalPages : 0,
      totalLinks,
    };
  }
}

// Export singleton instance for convenience
export const linkGraphAnalyzer = new LinkGraphAnalyzer();
