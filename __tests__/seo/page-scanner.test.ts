/**
 * Tests for Page Scanner
 * @jest-environment node
 */

import {
  scanAllPages,
  getIndexablePages,
  getNonIndexablePages,
  getPageStats,
} from '../../scripts/seo/lib/page-scanner';

describe('Page Scanner', () => {
  describe('scanAllPages', () => {
    it('should scan all pages in pages directory', async () => {
      const pages = await scanAllPages();

      expect(Array.isArray(pages)).toBe(true);
      expect(pages.length).toBeGreaterThan(0);
    });

    it('should identify page types correctly', async () => {
      const pages = await scanAllPages();

      const staticPages = pages.filter((p) => p.pageType === 'static');
      // These may or may not exist, just verify they can be computed
      const _dynamicPages = pages.filter((p) => p.pageType === 'dynamic');
      const _catchAllPages = pages.filter((p) => p.pageType === 'catch-all');

      expect(staticPages.length).toBeGreaterThan(0);
      // Dynamic and catch-all may or may not exist
    });

    it('should mark indexable pages correctly', async () => {
      const pages = await scanAllPages();

      const indexablePages = pages.filter((p) => p.isIndexable);
      const nonIndexablePages = pages.filter((p) => !p.isIndexable);

      // Should have both indexable and non-indexable pages
      expect(indexablePages.length).toBeGreaterThan(0);

      // Non-indexable pages should have reasons
      nonIndexablePages.forEach((page) => {
        expect(page.reason).toBeDefined();
      });
    });

    it('should not index admin pages', async () => {
      const pages = await scanAllPages();

      const adminPages = pages.filter((p) => p.routePath.includes('/admin'));

      adminPages.forEach((page) => {
        expect(page.isIndexable).toBe(false);
      });
    });

    it('should not index API routes', async () => {
      const pages = await scanAllPages();

      // API routes should be filtered out entirely
      const apiPages = pages.filter((p) => p.routePath.includes('/api'));

      expect(apiPages.length).toBe(0);
    });

    it('should not index dynamic routes by default', async () => {
      const pages = await scanAllPages();

      const dynamicPages = pages.filter((p) => p.pageType === 'dynamic');

      dynamicPages.forEach((page) => {
        expect(page.isIndexable).toBe(false);
      });
    });

    it('should convert file paths to routes correctly', async () => {
      const pages = await scanAllPages();

      // Homepage should be /
      const homepage = pages.find((p) => p.filePath === 'index.tsx');
      if (homepage) {
        expect(homepage.routePath).toBe('/');
      }

      // Regular pages should have leading slash
      const regularPages = pages.filter((p) => p.pageType === 'static' && p.filePath !== 'index.tsx');
      regularPages.forEach((page) => {
        expect(page.routePath).toMatch(/^\//);
      });
    });
  });

  describe('getIndexablePages', () => {
    it('should return only indexable pages', async () => {
      const indexablePages = await getIndexablePages();

      expect(Array.isArray(indexablePages)).toBe(true);
      expect(indexablePages.length).toBeGreaterThan(0);

      indexablePages.forEach((page) => {
        expect(page.isIndexable).toBe(true);
      });
    });
  });

  describe('getNonIndexablePages', () => {
    it('should return only non-indexable pages', async () => {
      const nonIndexablePages = await getNonIndexablePages();

      expect(Array.isArray(nonIndexablePages)).toBe(true);

      nonIndexablePages.forEach((page) => {
        expect(page.isIndexable).toBe(false);
        expect(page.reason).toBeDefined();
      });
    });
  });

  describe('getPageStats', () => {
    it('should return accurate statistics', async () => {
      const stats = await getPageStats();

      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('indexable');
      expect(stats).toHaveProperty('nonIndexable');
      expect(stats).toHaveProperty('static');
      expect(stats).toHaveProperty('dynamic');
      expect(stats).toHaveProperty('catchAll');

      // Total should equal indexable + nonIndexable
      expect(stats.total).toBe(stats.indexable + stats.nonIndexable);

      // Total should equal static + dynamic + catchAll
      expect(stats.total).toBe(stats.static + stats.dynamic + stats.catchAll);

      // All counts should be non-negative
      expect(stats.total).toBeGreaterThanOrEqual(0);
      expect(stats.indexable).toBeGreaterThanOrEqual(0);
      expect(stats.nonIndexable).toBeGreaterThanOrEqual(0);
    });
  });
});
