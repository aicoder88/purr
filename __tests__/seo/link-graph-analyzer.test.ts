/**
 * Tests for Link Graph Analyzer and Link Suggestion Engine
 */

import {
  LinkGraphAnalyzer,
  LinkSuggestionEngine,
  extractLinks,
  extractInternalLinks,
  normalizeLinkHref,
  buildGraphFromHTML,
  calculateLinkRelevance,
  scoreToPriority,
  generateSuggestionReason,
} from '@/lib/seo/link-graph-analyzer';
import { LinkGraphNode } from '@/lib/seo/types';

describe('LinkGraphAnalyzer', () => {
  let analyzer: LinkGraphAnalyzer;

  beforeEach(() => {
    analyzer = new LinkGraphAnalyzer();
  });

  describe('buildGraph', () => {
    it('should build a graph with correct node structure', () => {
      const pages = ['/page-a', '/page-b', '/page-c'];
      const links = [
        { from: '/page-a', to: '/page-b', anchorText: 'Link to B' },
        { from: '/page-a', to: '/page-c', anchorText: 'Link to C' },
        { from: '/page-b', to: '/page-c', anchorText: 'Another link to C' },
      ];

      const graph = analyzer.buildGraph(pages, links);

      expect(graph.size).toBe(3);
      expect(graph.has('/page-a')).toBe(true);
      expect(graph.has('/page-b')).toBe(true);
      expect(graph.has('/page-c')).toBe(true);
    });

    it('should correctly count incoming and outgoing links', () => {
      const pages = ['/page-a', '/page-b'];
      const links = [{ from: '/page-a', to: '/page-b', anchorText: 'Link' }];

      const graph = analyzer.buildGraph(pages, links);

      const nodeA = graph.get('/page-a');
      const nodeB = graph.get('/page-b');

      expect(nodeA?.outgoingLinkCount).toBe(1);
      expect(nodeA?.incomingLinkCount).toBe(0);
      expect(nodeB?.outgoingLinkCount).toBe(0);
      expect(nodeB?.incomingLinkCount).toBe(1);
    });

    it('should identify orphan pages', () => {
      const pages = ['/page-a', '/page-b', '/orphan'];
      const links = [{ from: '/page-a', to: '/page-b', anchorText: 'Link' }];

      const graph = analyzer.buildGraph(pages, links);

      const orphan = graph.get('/orphan');
      expect(orphan?.isOrphan).toBe(true);

      const pageA = graph.get('/page-a');
      const pageB = graph.get('/page-b');
      expect(pageA?.isOrphan).toBe(true); // No incoming links
      expect(pageB?.isOrphan).toBe(false); // Has incoming link
    });

    it('should identify weak pages (1 incoming link)', () => {
      const pages = ['/page-a', '/page-b', '/page-c'];
      const links = [
        { from: '/page-a', to: '/page-b', anchorText: 'Link' },
        { from: '/page-a', to: '/page-c', anchorText: 'Link' },
        { from: '/page-b', to: '/page-c', anchorText: 'Link' },
      ];

      const graph = analyzer.buildGraph(pages, links);

      const pageB = graph.get('/page-b');
      expect(pageB?.isWeak).toBe(true); // Exactly 1 incoming link

      const pageC = graph.get('/page-c');
      expect(pageC?.isWeak).toBe(false); // 2 incoming links
    });

    it('should identify dead end pages (0 outgoing links)', () => {
      const pages = ['/page-a', '/page-b'];
      const links = [{ from: '/page-a', to: '/page-b', anchorText: 'Link' }];

      const graph = analyzer.buildGraph(pages, links);

      const pageB = graph.get('/page-b');
      expect(pageB?.isDeadEnd).toBe(true);

      const pageA = graph.get('/page-a');
      expect(pageA?.isDeadEnd).toBe(false);
    });

    it('should calculate authority scores', () => {
      const pages = ['/page-a', '/page-b', '/page-c'];
      const links = [
        { from: '/page-a', to: '/page-c', anchorText: 'Link' },
        { from: '/page-b', to: '/page-c', anchorText: 'Link' },
      ];

      const graph = analyzer.buildGraph(pages, links);

      const pageC = graph.get('/page-c');
      expect(pageC?.authorityScore).toBeGreaterThan(0);
    });
  });

  describe('findOrphanPages', () => {
    it('should find all orphan pages', () => {
      const pages = ['/page-a', '/page-b', '/orphan-1', '/orphan-2'];
      const links = [{ from: '/page-a', to: '/page-b', anchorText: 'Link' }];

      analyzer.buildGraph(pages, links);
      const orphans = analyzer.findOrphanPages();

      expect(orphans).toContain('/page-a');
      expect(orphans).toContain('/orphan-1');
      expect(orphans).toContain('/orphan-2');
      expect(orphans).not.toContain('/page-b');
    });
  });

  describe('findWeakPages', () => {
    it('should find pages with exactly 1 incoming link', () => {
      const pages = ['/page-a', '/page-b', '/page-c'];
      const links = [
        { from: '/page-a', to: '/page-b', anchorText: 'Link' },
        { from: '/page-a', to: '/page-c', anchorText: 'Link' },
        { from: '/page-b', to: '/page-c', anchorText: 'Link' },
      ];

      analyzer.buildGraph(pages, links);
      const weak = analyzer.findWeakPages();

      expect(weak).toContain('/page-b');
      expect(weak).not.toContain('/page-c'); // Has 2 links
    });
  });

  describe('findDeadEndPages', () => {
    it('should find pages with 0 outgoing links', () => {
      const pages = ['/page-a', '/page-b', '/page-c'];
      const links = [
        { from: '/page-a', to: '/page-b', anchorText: 'Link' },
        { from: '/page-a', to: '/page-c', anchorText: 'Link' },
      ];

      analyzer.buildGraph(pages, links);
      const deadEnds = analyzer.findDeadEndPages();

      expect(deadEnds).toContain('/page-b');
      expect(deadEnds).toContain('/page-c');
      expect(deadEnds).not.toContain('/page-a');
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', () => {
      const pages = ['/page-a', '/page-b', '/page-c'];
      const links = [
        { from: '/page-a', to: '/page-b', anchorText: 'Link' },
        { from: '/page-a', to: '/page-c', anchorText: 'Link' },
      ];

      analyzer.buildGraph(pages, links);
      const stats = analyzer.getStats();

      expect(stats.totalPages).toBe(3);
      expect(stats.totalLinks).toBe(2);
      expect(stats.orphanPages).toBe(1); // /page-a (orphan = 0 incoming)
      expect(stats.weakPages).toBe(2); // /page-b and /page-c (weak = 1 incoming each)
      expect(stats.deadEndPages).toBe(2); // /page-b, /page-c
    });
  });

  describe('clear', () => {
    it('should clear the graph', () => {
      const pages = ['/page-a', '/page-b'];
      const links = [{ from: '/page-a', to: '/page-b', anchorText: 'Link' }];

      analyzer.buildGraph(pages, links);
      expect(analyzer.getAllNodes().size).toBe(2);

      analyzer.clear();
      expect(analyzer.getAllNodes().size).toBe(0);
    });
  });
});

describe('Link Extraction Functions', () => {
  describe('extractLinks', () => {
    it('should extract all links from HTML', () => {
      const html = `
        <html>
          <body>
            <a href="/page-1">Link 1</a>
            <a href="/page-2">Link 2</a>
            <a href="https://external.com">External</a>
          </body>
        </html>
      `;

      const links = extractLinks(html, '/current-page');

      expect(links).toHaveLength(3);
      expect(links[0].href).toBe('/page-1');
      expect(links[0].anchorText).toBe('Link 1');
      expect(links[1].href).toBe('/page-2');
      expect(links[2].href).toBe('https://external.com');
    });

    it('should identify internal vs external links', () => {
      const html = `
        <html>
          <body>
            <a href="/internal">Internal</a>
            <a href="https://purrify.ca/page">Internal Domain</a>
            <a href="https://external.com">External</a>
          </body>
        </html>
      `;

      const links = extractLinks(html, '/current-page', 'purrify.ca');

      expect(links[0].isInternal).toBe(true);
      expect(links[1].isInternal).toBe(true);
      expect(links[2].isInternal).toBe(false);
    });

    it('should skip anchor, mailto, tel, and javascript links', () => {
      const html = `
        <html>
          <body>
            <a href="#section">Anchor</a>
            <a href="mailto:test@example.com">Email</a>
            <a href="tel:1234567890">Phone</a>
            <a href="javascript:void(0)">JS</a>
            <a href="/valid">Valid</a>
          </body>
        </html>
      `;

      const links = extractLinks(html, '/current-page');

      expect(links).toHaveLength(5);
      expect(links[0].isInternal).toBe(false); // anchor
      expect(links[1].isInternal).toBe(false); // mailto
      expect(links[2].isInternal).toBe(false); // tel
      expect(links[3].isInternal).toBe(false); // javascript
      expect(links[4].isInternal).toBe(true); // valid
    });
  });

  describe('extractInternalLinks', () => {
    it('should extract only internal links', () => {
      const html = `
        <html>
          <body>
            <a href="/internal-1">Internal 1</a>
            <a href="https://external.com">External</a>
            <a href="/internal-2">Internal 2</a>
          </body>
        </html>
      `;

      const links = extractInternalLinks(html, '/current-page');

      expect(links).toHaveLength(2);
      expect(links[0].href).toBe('/internal-1');
      expect(links[1].href).toBe('/internal-2');
    });
  });

  describe('normalizeLinkHref', () => {
    it('should remove hash and query params', () => {
      expect(normalizeLinkHref('/page#section', '/current')).toBe('/page');
      expect(normalizeLinkHref('/page?param=value', '/current')).toBe('/page');
      expect(normalizeLinkHref('/page?a=1#section', '/current')).toBe('/page');
    });

    it('should handle relative URLs', () => {
      expect(normalizeLinkHref('/page', '/current')).toBe('/page');
    });

    it('should extract path from absolute URLs', () => {
      expect(
        normalizeLinkHref('https://purrify.ca/products/standard', '/current')
      ).toBe('/products/standard');
    });
  });

  describe('buildGraphFromHTML', () => {
    it('should build graph from HTML pages', () => {
      const pages = [
        {
          path: '/page-a',
          html: '<a href="/page-b">Link to B</a>',
        },
        {
          path: '/page-b',
          html: '<a href="/page-a">Link to A</a>',
        },
      ];

      const analyzer = buildGraphFromHTML(pages);
      const graph = analyzer.getAllNodes();

      expect(graph.size).toBe(2);

      const nodeA = graph.get('/page-a');
      const nodeB = graph.get('/page-b');

      expect(nodeA?.outgoingLinkCount).toBe(1);
      expect(nodeB?.outgoingLinkCount).toBe(1);
    });
  });
});

describe('Relevance Scoring Functions', () => {
  describe('calculateLinkRelevance', () => {
    it('should return 0 for non-existent target', () => {
      const graph = new Map<string, LinkGraphNode>();
      const score = calculateLinkRelevance(
        'some context',
        '/nonexistent',
        'anchor',
        graph
      );
      expect(score).toBe(0);
    });

    it('should score based on context similarity', () => {
      const graph = new Map<string, LinkGraphNode>();
      graph.set('/target', {
        path: '/target',
        incomingLinks: [{ fromPath: '/other', anchorText: 'cat litter' }],
        outgoingLinks: [],
        authorityScore: 50,
        incomingLinkCount: 1,
        outgoingLinkCount: 0,
        isOrphan: false,
        isWeak: true,
        isDeadEnd: true,
      });

      const highScore = calculateLinkRelevance(
        'cat litter odor control',
        '/target',
        'cat litter',
        graph
      );

      const lowScore = calculateLinkRelevance(
        'dog food nutrition',
        '/target',
        'cat litter',
        graph
      );

      expect(highScore).toBeGreaterThan(lowScore);
    });

    it('should score based on anchor text quality', () => {
      const graph = new Map<string, LinkGraphNode>();
      graph.set('/products/cat-litter', {
        path: '/products/cat-litter',
        incomingLinks: [],
        outgoingLinks: [],
        authorityScore: 50,
        incomingLinkCount: 0,
        outgoingLinkCount: 0,
        isOrphan: true,
        isWeak: false,
        isDeadEnd: true,
      });

      const goodAnchor = calculateLinkRelevance(
        'some context',
        '/products/cat-litter',
        'cat litter products',
        graph
      );

      const poorAnchor = calculateLinkRelevance(
        'some context',
        '/products/cat-litter',
        'click here',
        graph
      );

      expect(goodAnchor).toBeGreaterThan(poorAnchor);
    });
  });

  describe('scoreToPriority', () => {
    it('should classify high scores as high priority', () => {
      expect(scoreToPriority(70)).toBe('high');
      expect(scoreToPriority(85)).toBe('high');
      expect(scoreToPriority(100)).toBe('high');
    });

    it('should classify medium scores as medium priority', () => {
      expect(scoreToPriority(40)).toBe('medium');
      expect(scoreToPriority(55)).toBe('medium');
      expect(scoreToPriority(69)).toBe('medium');
    });

    it('should classify low scores as low priority', () => {
      expect(scoreToPriority(0)).toBe('low');
      expect(scoreToPriority(20)).toBe('low');
      expect(scoreToPriority(39)).toBe('low');
    });
  });

  describe('generateSuggestionReason', () => {
    it('should mention orphan status', () => {
      const node: LinkGraphNode = {
        path: '/test',
        incomingLinks: [],
        outgoingLinks: [],
        authorityScore: 30,
        incomingLinkCount: 0,
        outgoingLinkCount: 0,
        isOrphan: true,
        isWeak: false,
        isDeadEnd: true,
      };

      const reason = generateSuggestionReason(50, node);
      expect(reason).toContain('orphaned');
    });

    it('should mention weak status', () => {
      const node: LinkGraphNode = {
        path: '/test',
        incomingLinks: [{ fromPath: '/other', anchorText: 'link' }],
        outgoingLinks: [],
        authorityScore: 30,
        incomingLinkCount: 1,
        outgoingLinkCount: 0,
        isOrphan: false,
        isWeak: true,
        isDeadEnd: true,
      };

      const reason = generateSuggestionReason(50, node);
      expect(reason).toContain('weak link equity');
    });

    it('should mention dead end status', () => {
      const node: LinkGraphNode = {
        path: '/test',
        incomingLinks: [],
        outgoingLinks: [],
        authorityScore: 50,
        incomingLinkCount: 0,
        outgoingLinkCount: 0,
        isOrphan: true,
        isWeak: false,
        isDeadEnd: true,
      };

      const reason = generateSuggestionReason(50, node);
      expect(reason).toContain('dead end');
    });
  });
});

describe('LinkSuggestionEngine', () => {
  let graph: Map<string, LinkGraphNode>;
  let engine: LinkSuggestionEngine;

  beforeEach(() => {
    graph = new Map<string, LinkGraphNode>();

    // Create a simple graph
    graph.set('/page-a', {
      path: '/page-a',
      incomingLinks: [],
      outgoingLinks: [{ toPath: '/page-b', anchorText: 'Link to B' }],
      authorityScore: 60,
      incomingLinkCount: 0,
      outgoingLinkCount: 1,
      isOrphan: true,
      isWeak: false,
      isDeadEnd: false,
    });

    graph.set('/page-b', {
      path: '/page-b',
      incomingLinks: [{ fromPath: '/page-a', anchorText: 'Link to B' }],
      outgoingLinks: [],
      authorityScore: 40,
      incomingLinkCount: 1,
      outgoingLinkCount: 0,
      isOrphan: false,
      isWeak: true,
      isDeadEnd: true,
    });

    graph.set('/orphan', {
      path: '/orphan',
      incomingLinks: [],
      outgoingLinks: [],
      authorityScore: 0,
      incomingLinkCount: 0,
      outgoingLinkCount: 0,
      isOrphan: true,
      isWeak: false,
      isDeadEnd: true,
    });

    engine = new LinkSuggestionEngine(graph);
  });

  describe('suggestLinksForPage', () => {
    it('should return suggestions for a page', () => {
      const suggestions = engine.suggestLinksForPage('/page-a', 'some context');

      expect(Array.isArray(suggestions)).toBe(true);
      // Should suggest orphan page
      const orphanSuggestion = suggestions.find((s) => s.targetPage === '/orphan');
      expect(orphanSuggestion).toBeDefined();
    });

    it('should not suggest already linked pages', () => {
      const suggestions = engine.suggestLinksForPage('/page-a', 'some context');

      // Should not suggest /page-b since already linked
      const pageBSuggestion = suggestions.find((s) => s.targetPage === '/page-b');
      expect(pageBSuggestion).toBeUndefined();
    });

    it('should not suggest linking to self', () => {
      const suggestions = engine.suggestLinksForPage('/page-a', 'some context');

      const selfLink = suggestions.find((s) => s.targetPage === '/page-a');
      expect(selfLink).toBeUndefined();
    });

    it('should sort suggestions by relevance', () => {
      const suggestions = engine.suggestLinksForPage('/page-a', 'some context', 10);

      // Check if sorted descending by relevance score
      for (let i = 0; i < suggestions.length - 1; i++) {
        expect(suggestions[i].relevanceScore).toBeGreaterThanOrEqual(
          suggestions[i + 1].relevanceScore
        );
      }
    });

    it('should limit suggestions to maxSuggestions', () => {
      const suggestions = engine.suggestLinksForPage('/page-a', 'some context', 1);

      expect(suggestions.length).toBeLessThanOrEqual(1);
    });
  });

  describe('findPagesNeedingLinks', () => {
    it('should find orphan pages', () => {
      const pages = engine.findPagesNeedingLinks();

      const orphan = pages.find((p) => p.page === '/orphan');
      expect(orphan).toBeDefined();
      expect(orphan?.issue).toBe('orphan');
    });

    it('should find weak pages', () => {
      const pages = engine.findPagesNeedingLinks();

      const weak = pages.find((p) => p.page === '/page-b');
      expect(weak).toBeDefined();
      expect(weak?.issue).toBe('weak');
    });

    it('should sort by severity', () => {
      const pages = engine.findPagesNeedingLinks();

      // Orphans should come first
      const firstOrphan = pages.findIndex((p) => p.issue === 'orphan');
      const firstWeak = pages.findIndex((p) => p.issue === 'weak');

      if (firstOrphan !== -1 && firstWeak !== -1) {
        expect(firstOrphan).toBeLessThan(firstWeak);
      }
    });
  });

  describe('getFullReport', () => {
    it('should return a comprehensive report', () => {
      const report = engine.getFullReport();

      expect(report).toHaveProperty('suggestions');
      expect(report).toHaveProperty('pagesNeedingLinks');
      expect(report).toHaveProperty('stats');

      expect(report.suggestions).toBeInstanceOf(Map);
      expect(Array.isArray(report.pagesNeedingLinks)).toBe(true);
      expect(typeof report.stats).toBe('object');
    });

    it('should include accurate statistics', () => {
      const report = engine.getFullReport();

      expect(report.stats.totalPages).toBe(3);
      expect(report.stats.orphanPages).toBeGreaterThan(0);
      expect(report.stats.weakPages).toBeGreaterThan(0);
    });
  });
});
