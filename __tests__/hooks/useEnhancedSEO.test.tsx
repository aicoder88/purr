/**
 * useEnhancedSEO Hook Tests
 */

import { renderHook } from '@testing-library/react';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

// Mock dependencies
jest.mock('../../src/lib/translation-context', () => ({
  useTranslation: jest.fn(() => ({
    t: {},
    locale: 'en',
  })),
}));

jest.mock('../../src/lib/currency-context', () => ({
  useCurrency: jest.fn(() => ({
    currency: 'CAD',
  })),
}));

jest.mock('../../src/lib/seo-utils', () => ({
  getLocalizedUrl: jest.fn((path) => `https://www.purrify.ca${path}`),
  buildLanguageAlternates: jest.fn(() => [
    { hrefLang: 'en', href: 'https://www.purrify.ca/test' },
    { hrefLang: 'fr', href: 'https://www.purrify.ca/fr/test' },
  ]),
  normalizeMetaTitle: jest.fn((title) => title),
  normalizeMetaDescription: jest.fn((desc) => desc),
}));

describe('useEnhancedSEO', () => {
  describe('Basic SEO Props', () => {
    it('should generate optimized NextSeo props', () => {
      const config = {
        path: '/test-page',
        title: 'Test Page Title',
        description: 'This is a test page description for SEO optimization testing.',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.nextSeoProps).toBeDefined();
      expect(result.current.nextSeoProps.title).toContain('Test Page Title');
      expect(result.current.nextSeoProps.description).toContain('test page description');
      expect(result.current.nextSeoProps.canonical).toBe(
        'https://www.purrify.ca/test-page'
      );
    });

    it('should optimize meta title with target keyword', () => {
      const config = {
        path: '/test',
        title: 'Amazing Product for Cat Owners',
        description: 'Test description',
        targetKeyword: 'cat litter deodorizer',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      // Title should be optimized (keyword moved to front if needed)
      expect(result.current.meta.titleLength).toBeGreaterThan(0);
      expect(result.current.meta.titleLength).toBeLessThanOrEqual(60);
    });

    it('should optimize meta description length', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description:
          'This is a very long description that exceeds the recommended maximum length for meta descriptions which should be between 140 and 155 characters for optimal display in search results without truncation issues',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.meta.descriptionLength).toBeLessThanOrEqual(155);
      expect(result.current.meta.isDescriptionTruncated).toBe(true);
    });
  });

  describe('Open Graph Props', () => {
    it('should generate complete Open Graph metadata', () => {
      const config = {
        path: '/test',
        title: 'Test Page',
        description: 'Test description',
        image: 'https://example.com/image.jpg',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      const og = result.current.nextSeoProps.openGraph;
      expect(og.url).toBe('https://www.purrify.ca/test');
      expect(og.title).toBe('Test Page');
      expect(og.description).toContain('Test description');
      expect(og.locale).toBe('en_CA');
      expect(og.images[0].url).toBe('https://example.com/image.jpg');
    });

    it('should use default image if none provided', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      const images = result.current.nextSeoProps.openGraph.images;
      expect(images[0].url).toBe('https://www.purrify.ca/purrify-logo.png');
    });

    it('should set article type for blog posts', () => {
      const config = {
        path: '/blog/test',
        title: 'Blog Post',
        description: 'Blog description',
        schemaType: 'article' as const,
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.nextSeoProps.openGraph.type).toBe('article');
    });
  });

  describe('Twitter Card Props', () => {
    it('should include Twitter card metadata', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      const twitter = result.current.nextSeoProps.twitter;
      expect(twitter.cardType).toBe('summary_large_image');
      expect(twitter.handle).toBe('@purrifyhq');
      expect(twitter.site).toBe('@purrifyhq');
    });
  });

  describe('Language Alternates', () => {
    it('should generate language alternate links', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      const alts = result.current.nextSeoProps.languageAlternates;
      expect(alts).toBeDefined();
      expect(alts.length).toBeGreaterThan(0);
    });
  });

  describe('Additional Meta Tags', () => {
    it('should include keywords if provided', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
        keywords: ['cat litter', 'odor control', 'activated carbon'],
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      const keywordTag = result.current.nextSeoProps.additionalMetaTags.find(
        (tag) => tag.name === 'keywords'
      );
      expect(keywordTag).toBeDefined();
      expect(keywordTag?.content).toContain('cat litter');
      expect(keywordTag?.content).toContain('odor control');
    });

    it('should include author tag', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      const authorTag = result.current.nextSeoProps.additionalMetaTags.find(
        (tag) => tag.name === 'author'
      );
      expect(authorTag).toBeDefined();
    });
  });

  describe('Structured Data Schema', () => {
    it('should generate product schema', () => {
      const config = {
        path: '/products/test',
        title: 'Test Product',
        description: 'Test product description',
        schemaType: 'product' as const,
        schemaData: {
          name: 'Test Product',
          description: 'Test description',
          image: 'https://example.com/product.jpg',
          price: '29.99',
          priceValidUntil: '2025-12-31',
        },
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.schema).toBeDefined();
      expect(result.current.schema).toHaveProperty('@type', 'Product');
      expect(result.current.schema).toHaveProperty('name', 'Test Product');
      expect(result.current.schema).toHaveProperty('offers');
    });

    it('should generate article schema', () => {
      const config = {
        path: '/blog/test',
        title: 'Test Article',
        description: 'Test article description',
        schemaType: 'article' as const,
        schemaData: {
          headline: 'Test Article',
          description: 'Test',
          image: 'https://example.com/article.jpg',
          datePublished: '2025-01-01',
          category: 'Cat Care',
          keywords: ['cats', 'care'],
          wordCount: 1500,
        },
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.schema).toBeDefined();
      expect(result.current.schema).toHaveProperty('@type', 'Article');
      expect(result.current.schema).toHaveProperty('headline', 'Test Article');
      expect(result.current.schema).toHaveProperty('publisher');
    });

    it('should generate FAQ schema', () => {
      const config = {
        path: '/faq',
        title: 'FAQ',
        description: 'Frequently asked questions',
        schemaType: 'faq' as const,
        schemaData: {
          questions: [
            {
              question: 'How does it work?',
              answer: 'It works by using activated carbon.',
            },
            {
              question: 'Is it safe?',
              answer: 'Yes, it is completely safe for pets.',
            },
          ],
        },
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.schema).toBeDefined();
      expect(result.current.schema).toHaveProperty('@type', 'FAQPage');
      expect(result.current.schema).toHaveProperty('mainEntity');
    });

    it('should not generate schema if type not specified', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.schema).toBeNull();
    });
  });

  describe('Robots Meta', () => {
    it('should support noindex flag', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
        noindex: true,
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.nextSeoProps.noindex).toBe(true);
    });

    it('should support nofollow flag', () => {
      const config = {
        path: '/test',
        title: 'Test',
        description: 'Test',
        nofollow: true,
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.nextSeoProps.nofollow).toBe(true);
    });
  });

  describe('Meta Information', () => {
    it('should provide meta information about optimizations', () => {
      const config = {
        path: '/test',
        title: 'Short',
        description: 'Also short',
      };

      const { result } = renderHook(() => useEnhancedSEO(config));

      expect(result.current.meta).toBeDefined();
      expect(result.current.meta.titleLength).toBeGreaterThan(0);
      expect(result.current.meta.descriptionLength).toBeGreaterThan(0);
      expect(result.current.meta.titleWarnings).toBeDefined();
      expect(result.current.meta.descriptionWarnings).toBeDefined();
      expect(Array.isArray(result.current.meta.titleWarnings)).toBe(true);
      expect(Array.isArray(result.current.meta.descriptionWarnings)).toBe(true);
    });
  });
});
