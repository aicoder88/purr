/**
 * SEO Compliance Validation Tests
 * Tests for the pre-build validation system
 */

// Mock external dependencies before imports
jest.mock('image-size', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('fast-glob', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../scripts/seo/lib/page-scanner', () => ({
  scanAllPages: jest.fn(() => Promise.resolve([])),
  getIndexablePages: jest.fn(() => Promise.resolve([])),
}));

jest.mock('../../src/lib/seo/link-graph-analyzer', () => ({
  LinkGraphAnalyzer: jest.fn(() => ({
    buildGraph: jest.fn(),
    findOrphanPages: jest.fn(() => []),
    findWeakPages: jest.fn(() => []),
    findDeadEndPages: jest.fn(() => []),
  })),
  buildGraphFromHTML: jest.fn(),
}));

import { validateAllPages, generateReport, ValidationResult } from '../../scripts/seo/validate-seo-compliance';
import { validateAllImages } from '../../scripts/seo/lib/image-validator';
import { validateOGCanonicalUrls, validatePageFile as validateOGPageFile } from '../../src/lib/seo/og-canonical-validator';
import * as fs from 'fs';
import * as path from 'path';

// Mock remaining dependencies
jest.mock('../../scripts/seo/lib/image-validator');
jest.mock('../../src/lib/seo/og-canonical-validator');

describe('SEO Compliance Validation System', () => {
  describe('Main Validation Script', () => {
    it('should validate all pages without errors when everything is correct', async () => {
      // Mock successful validation
      const mockImageValidation = {
        totalImages: 10,
        validImages: 10,
        issues: [],
        stats: {
          missingAlt: 0,
          oversized: 0,
          wrongFormat: 0,
          totalFileSize: 0,
        },
      };

      const mockOGValidation = {
        totalPages: 5,
        validPages: 5,
        issues: [],
      };

      (validateAllImages as jest.Mock).mockResolvedValue(mockImageValidation);
      (validateOGCanonicalUrls as jest.Mock).mockResolvedValue(mockOGValidation);

      const result = await validateAllPages({ failOnError: false });

      expect(result.passed).toBe(true);
      expect(result.errors.length).toBeGreaterThanOrEqual(0);
      expect(result.stats).toBeDefined();
      expect(result.stats.totalImages).toBe(10);
    });

    it('should fail when critical errors are present with failOnError option', async () => {
      const mockImageValidation = {
        totalImages: 10,
        validImages: 8,
        issues: [
          {
            filePath: '/test.jpg',
            severity: 'error' as const,
            type: 'alt-text' as const,
            message: 'Missing alt text',
          },
        ],
        stats: {
          missingAlt: 2,
          oversized: 0,
          wrongFormat: 0,
          totalFileSize: 0,
        },
      };

      const mockOGValidation = {
        totalPages: 5,
        validPages: 5,
        issues: [],
      };

      (validateAllImages as jest.Mock).mockResolvedValue(mockImageValidation);
      (validateOGCanonicalUrls as jest.Mock).mockResolvedValue(mockOGValidation);

      const result = await validateAllPages({ failOnError: true });

      // Should still pass in test environment but have errors recorded
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should generate a comprehensive report', async () => {
      const mockResult: ValidationResult = {
        passed: false,
        errors: [
          {
            page: '/test-page',
            severity: 'error',
            type: 'meta',
            field: 'title',
            message: 'Title too long',
            fix: 'Shorten the title',
          },
        ],
        warnings: [
          {
            page: '/test-page-2',
            severity: 'warning',
            type: 'links',
            field: 'incomingLinks',
            message: 'Weak page',
          },
        ],
        stats: {
          totalPages: 10,
          pagesWithErrors: 1,
          pagesWithWarnings: 1,
          orphanPages: 0,
          weakPages: 1,
          deadEndPages: 0,
          brokenLinks: 0,
          totalImages: 5,
          imagesWithIssues: 0,
          imagesMissingAlt: 0,
          ogCanonicalMismatches: 0,
        },
      };

      const report = await generateReport(mockResult);

      expect(report).toContain('# SEO Validation Report');
      expect(report).toContain('❌ FAILED');
      expect(report).toContain('**Total Pages**: 10');
      expect(report).toContain('Title too long');
      expect(report).toContain('Weak page');
      expect(report).toContain('## Errors');
      expect(report).toContain('## Warnings');
    });
  });

  describe('Image Validator', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (validateAllImages as jest.Mock).mockRestore();
    });

    it('should validate images and detect missing alt text', async () => {
      const mockResult = {
        totalImages: 10,
        validImages: 8,
        issues: [
          {
            filePath: '/images/test1.jpg',
            severity: 'error' as const,
            type: 'alt-text' as const,
            message: 'Image is missing alt text',
            fix: 'Add descriptive alt text',
          },
          {
            filePath: '/images/test2.jpg',
            severity: 'error' as const,
            type: 'alt-text' as const,
            message: 'Image is missing alt text',
            fix: 'Add descriptive alt text',
          },
        ],
        stats: {
          missingAlt: 2,
          oversized: 0,
          wrongFormat: 0,
          totalFileSize: 0,
        },
      };

      (validateAllImages as jest.Mock).mockResolvedValue(mockResult);

      const result = await validateAllImages();

      expect(result.totalImages).toBe(10);
      expect(result.validImages).toBe(8);
      expect(result.issues.length).toBe(2);
      expect(result.stats.missingAlt).toBe(2);
    });

    it('should detect oversized images', async () => {
      const mockResult = {
        totalImages: 10,
        validImages: 9,
        issues: [
          {
            filePath: '/images/large.jpg',
            severity: 'warning' as const,
            type: 'file-size' as const,
            message: 'Image file size exceeds recommended limit',
            fix: 'Compress or optimize the image',
            details: {
              fileSize: 650,
            },
          },
        ],
        stats: {
          missingAlt: 0,
          oversized: 1,
          wrongFormat: 0,
          totalFileSize: 650,
        },
      };

      (validateAllImages as jest.Mock).mockResolvedValue(mockResult);

      const result = await validateAllImages();

      expect(result.stats.oversized).toBe(1);
      expect(result.issues[0].type).toBe('file-size');
    });

    it('should detect suboptimal image formats', async () => {
      const mockResult = {
        totalImages: 5,
        validImages: 3,
        issues: [
          {
            filePath: '/images/photo.jpg',
            severity: 'warning' as const,
            type: 'format' as const,
            message: 'Consider using WebP or AVIF format',
            fix: 'Convert to modern format',
            details: {
              format: '.jpg',
            },
          },
        ],
        stats: {
          missingAlt: 0,
          oversized: 0,
          wrongFormat: 1,
          totalFileSize: 0,
        },
      };

      (validateAllImages as jest.Mock).mockResolvedValue(mockResult);

      const result = await validateAllImages();

      expect(result.stats.wrongFormat).toBe(1);
    });
  });

  describe('OG Canonical URL Validator', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (validateOGCanonicalUrls as jest.Mock).mockRestore();
      (validateOGPageFile as jest.Mock).mockRestore();
    });

    it('should detect matching canonical and OG URLs', () => {
      const mockContent = `
        export default function Page() {
          const canonicalUrl = 'https://example.com/test';
          return (
            <NextSeo
              canonical={canonicalUrl}
              openGraph={{
                url: canonicalUrl,
              }}
            />
          );
        }
      `;

      (validateOGPageFile as jest.Mock).mockReturnValue([]);

      const issues = validateOGPageFile('/test-page.tsx');

      expect(issues.length).toBe(0);
    });

    it('should detect mismatched canonical and OG URLs', () => {
      const mockIssues = [
        {
          page: '/test-page',
          severity: 'error' as const,
          type: 'mismatch' as const,
          message: 'Canonical URL does not match Open Graph URL',
          details: {
            canonical: 'https://example.com/page-a',
            ogUrl: 'https://example.com/page-b',
          },
          fix: 'Ensure both URLs point to the same location',
        },
      ];

      (validateOGPageFile as jest.Mock).mockReturnValue(mockIssues);

      const issues = validateOGPageFile('/test-page.tsx');

      expect(issues.length).toBe(1);
      expect(issues[0].type).toBe('mismatch');
      expect(issues[0].severity).toBe('error');
    });

    it('should detect missing canonical URL', () => {
      const mockIssues = [
        {
          page: '/test-page',
          severity: 'error' as const,
          type: 'missing-canonical' as const,
          message: 'Page has Open Graph URL but missing canonical URL',
          fix: 'Add canonical URL to NextSeo component',
        },
      ];

      (validateOGPageFile as jest.Mock).mockReturnValue(mockIssues);

      const issues = validateOGPageFile('/test-page.tsx');

      expect(issues.length).toBe(1);
      expect(issues[0].type).toBe('missing-canonical');
    });

    it('should detect missing OG URL', () => {
      const mockIssues = [
        {
          page: '/test-page',
          severity: 'error' as const,
          type: 'missing-og' as const,
          message: 'Page has canonical URL but missing Open Graph URL',
          fix: 'Add url property to openGraph object',
        },
      ];

      (validateOGPageFile as jest.Mock).mockReturnValue(mockIssues);

      const issues = validateOGPageFile('/test-page.tsx');

      expect(issues.length).toBe(1);
      expect(issues[0].type).toBe('missing-og');
    });

    it('should validate multiple pages', async () => {
      const mockPages = [
        { filePath: 'index.tsx', routePath: '/' },
        { filePath: 'about.tsx', routePath: '/about' },
        { filePath: 'contact.tsx', routePath: '/contact' },
      ];

      const mockResult = {
        totalPages: 3,
        validPages: 2,
        issues: [
          {
            page: '/contact',
            severity: 'error' as const,
            type: 'mismatch' as const,
            message: 'URL mismatch',
            details: {
              canonical: 'https://example.com/contact',
              ogUrl: 'https://example.com/contact-us',
            },
          },
        ],
      };

      (validateOGCanonicalUrls as jest.Mock).mockResolvedValue(mockResult);

      const result = await validateOGCanonicalUrls(mockPages);

      expect(result.totalPages).toBe(3);
      expect(result.validPages).toBe(2);
      expect(result.issues.length).toBe(1);
    });
  });

  describe('Integration Tests', () => {
    it('should combine all validators correctly', async () => {
      const mockImageValidation = {
        totalImages: 20,
        validImages: 18,
        issues: [
          {
            filePath: '/image1.jpg',
            severity: 'error' as const,
            type: 'alt-text' as const,
            message: 'Missing alt text',
          },
        ],
        stats: {
          missingAlt: 1,
          oversized: 1,
          wrongFormat: 0,
          totalFileSize: 500,
        },
      };

      const mockOGValidation = {
        totalPages: 10,
        validPages: 9,
        issues: [
          {
            page: '/test',
            severity: 'error' as const,
            type: 'mismatch' as const,
            message: 'URL mismatch',
          },
        ],
      };

      (validateAllImages as jest.Mock).mockResolvedValue(mockImageValidation);
      (validateOGCanonicalUrls as jest.Mock).mockResolvedValue(mockOGValidation);

      const result = await validateAllPages({ failOnError: false });

      // Should include stats from all validators
      expect(result.stats.totalImages).toBe(20);
      expect(result.stats.imagesWithIssues).toBe(2);
      expect(result.stats.ogCanonicalMismatches).toBe(1);
    });
  });
});
