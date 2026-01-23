/**
 * Unit tests for useEnhancedSEO hook
 * Tests SEO optimization, schema generation, and currency handling
 */

import { renderHook } from '@testing-library/react';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';
import { useTranslation } from '../../src/lib/translation-context';
import { useCurrency } from '../../src/lib/currency-context';

// Mock dependencies
jest.mock('../../src/lib/translation-context');
jest.mock('../../src/lib/currency-context');
jest.mock('../../src/lib/seo/meta-optimizer');
jest.mock('../../src/lib/seo-utils');
jest.mock('../../src/hooks/useBreadcrumb');

const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;
const mockUseCurrency = useCurrency as jest.MockedFunction<typeof useCurrency>;

describe('useEnhancedSEO', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Default mock implementations
    mockUseTranslation.mockReturnValue({
      t: {} as any,
      locale: 'en',
    } as any);

    mockUseCurrency.mockReturnValue({
      currency: 'CAD',
      formatPrice: jest.fn(),
    } as any);

    // Mock meta optimizer
    const { optimizeMetaTitle, optimizeMetaDescription } = require('../../src/lib/seo/meta-optimizer');
    optimizeMetaTitle.mockImplementation((title: string) => ({
      title,
      length: title.length,
      isTruncated: false,
      warnings: [],
    }));
    optimizeMetaDescription.mockImplementation((desc: string) => ({
      description: desc,
      length: desc.length,
      isTruncated: false,
      warnings: [],
    }));

    // Mock seo-utils
    const seoUtils = require('../../src/lib/seo-utils');
    seoUtils.getLocalizedUrl.mockImplementation((path: string, locale: string) =>
      locale === 'en' ? `https://www.purrify.ca${path}` : `https://www.purrify.ca/${locale}${path}`
    );
    seoUtils.buildLanguageAlternates.mockReturnValue([
      { hrefLang: 'en', href: 'https://www.purrify.ca/test' },
      { hrefLang: 'fr', href: 'https://www.purrify.ca/fr/test' },
    ]);

    // Mock useBreadcrumb
    const { useBreadcrumb } = require('../../src/hooks/useBreadcrumb');
    useBreadcrumb.mockImplementation((path: string) => {
      const locale = mockUseTranslation().locale;
      const segments = path.split('/').filter(Boolean);

      const homeLabels: Record<string, string> = {
        en: 'Home',
        fr: 'Accueil',
        zh: '首页',
      };

      const segmentLabels: Record<string, Record<string, string>> = {
        en: {
          products: 'Products',
          'trial-size': 'FREE Trial',
          standard: 'Standard',
          'family-pack': 'Family Pack',
          learn: 'Learn',
          'how-it-works': 'How It Works',
        },
        fr: {
          products: 'Produits',
          standard: 'Standard',
        },
        zh: {
          products: '产品',
          'family-pack': '家庭装',
        },
      };

      const items = [{ name: homeLabels[locale] || 'Home', path: '/', position: 1 }];
      let currentPath = '';
      segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const label = segmentLabels[locale]?.[segment] || segment;
        items.push({
          name: label,
          path: currentPath,
          position: index + 2,
        });
      });

      return {
        items,
        schema: {
          '@type': 'BreadcrumbList',
          itemListElement: items.map(item => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            item: `https://www.purrify.ca${locale === 'en' ? '' : `/${locale}`}${item.path}`,
          })),
        },
      };
    });
  });

  describe('Basic Functionality', () => {
    it('should generate NextSeo props with required fields', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
        })
      );

      expect(result.current.nextSeoProps).toMatchObject({
        title: 'Test Page',
        description: 'Test description',
        canonical: expect.stringContaining('/test'),
      });
    });

    it('should include language alternates', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
        })
      );

      expect(result.current.nextSeoProps.languageAlternates).toEqual([
        { hrefLang: 'en', href: 'https://www.purrify.ca/test' },
        { hrefLang: 'fr', href: 'https://www.purrify.ca/fr/test' },
      ]);
    });

    it('should include Open Graph metadata', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
        })
      );

      expect(result.current.nextSeoProps.openGraph).toMatchObject({
        type: 'website',
        title: 'Test Page',
        description: 'Test description',
        locale: 'en_CA',
      });
    });

    it('should include Twitter metadata', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
        })
      );

      expect(result.current.nextSeoProps.twitter).toMatchObject({
        cardType: 'summary_large_image',
        handle: '@purrifyhq',
        site: '@purrifyhq',
      });
    });

    it('should include keywords in additional meta tags', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
          keywords: ['keyword1', 'keyword2'],
        })
      );

      const keywordTag = result.current.nextSeoProps.additionalMetaTags.find(
        tag => tag.name === 'keywords'
      );

      expect(keywordTag).toEqual({
        name: 'keywords',
        content: 'keyword1, keyword2',
      });
    });
  });

  describe('Schema Generation', () => {
    it('should generate product schema with currency support', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/test',
          title: 'Test Product',
          description: 'Test product description',
          schemaType: 'product',
          schemaData: {
            name: 'Test Product',
            description: 'Test product description',
            image: 'https://example.com/image.jpg',
            price: '29.99',
            priceValidUntil: '2024-12-31',
            rating: { value: '4.8', count: '127' },
          },
        })
      );

      expect(result.current.schema).toMatchObject({
        '@type': 'Product',
        name: 'Test Product',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CAD', // From mocked useCurrency
          price: '29.99',
        },
      });
    });

    it('should generate article schema', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/blog/test',
          title: 'Test Article',
          description: 'Test article description',
          schemaType: 'article',
          schemaData: {
            headline: 'Test Article',
            description: 'Test article description',
            datePublished: '2024-01-01',
            dateModified: '2024-01-02',
            image: 'https://example.com/image.jpg',
          },
        })
      );

      expect(result.current.schema).toMatchObject({
        '@type': 'Article',
        headline: 'Test Article',
        datePublished: '2024-01-01',
        dateModified: '2024-01-02',
      });
    });

    it('should generate FAQ schema', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/faq',
          title: 'FAQ',
          description: 'Frequently asked questions',
          schemaType: 'faq',
          schemaData: {
            questions: [
              { question: 'Q1?', answer: 'A1' },
              { question: 'Q2?', answer: 'A2' },
            ],
          },
        })
      );

      expect(result.current.schema).toMatchObject({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Q1?',
            acceptedAnswer: { '@type': 'Answer', text: 'A1' },
          },
          {
            '@type': 'Question',
            name: 'Q2?',
            acceptedAnswer: { '@type': 'Answer', text: 'A2' },
          },
        ],
      });
    });

    it('should generate organization schema', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/',
          title: 'Home',
          description: 'Homepage',
          schemaType: 'organization',
          schemaData: {
            description: 'Company description',
            socialLinks: ['https://twitter.com/purrifyhq'],
          },
        })
      );

      expect(result.current.schema).toMatchObject({
        '@type': 'Organization',
        sameAs: ['https://twitter.com/purrifyhq'],
      });
    });

    it('should not generate schema when schemaType is not provided', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
        })
      );

      expect(result.current.schema).toBeNull();
    });
  });

  describe('Currency Support', () => {
    it('should use CAD currency for product schema', () => {
      mockUseCurrency.mockReturnValue({
        currency: 'CAD',
        formatPrice: jest.fn(),
      });

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/test',
          title: 'Test Product',
          description: 'Test',
          schemaType: 'product',
          schemaData: {
            name: 'Test',
            description: 'Test',
            image: 'test.jpg',
            price: '29.99',
            priceValidUntil: '2024-12-31',
          },
        })
      );

      expect((result.current.schema as any)?.offers?.priceCurrency).toBe('CAD');
    });

    it('should use USD currency for product schema', () => {
      mockUseCurrency.mockReturnValue({
        currency: 'USD',
        formatPrice: jest.fn(),
      });

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/test',
          title: 'Test Product',
          description: 'Test',
          schemaType: 'product',
          schemaData: {
            name: 'Test',
            description: 'Test',
            image: 'test.jpg',
            price: '29.99',
            priceValidUntil: '2024-12-31',
          },
        })
      );

      expect((result.current.schema as any)?.offers?.priceCurrency).toBe('USD');
    });
  });

  describe('Locale Handling', () => {
    it('should handle French locale', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'fr',
      } as any);

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Page de test',
          description: 'Description de test',
        })
      );

      expect(result.current.nextSeoProps.openGraph.locale).toBe('fr_CA');
    });

    it('should handle Chinese locale', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'zh',
      } as any);

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: '测试页面',
          description: '测试描述',
        })
      );

      expect(result.current.nextSeoProps.openGraph.locale).toBe('zh_CN');
    });

    it('should default to en_CA for unknown locales', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'unknown',
      } as any);

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test',
          description: 'Test',
        })
      );

      expect(result.current.nextSeoProps.openGraph.locale).toBe('en_CA');
    });
  });

  describe('Meta Information', () => {
    it('should return meta information about title and description', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test Page',
          description: 'Test description',
        })
      );

      expect(result.current.meta).toMatchObject({
        titleLength: expect.any(Number),
        descriptionLength: expect.any(Number),
        isTitleTruncated: false,
        isDescriptionTruncated: false,
        titleWarnings: [],
        descriptionWarnings: [],
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional fields', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test',
          description: 'Test',
        })
      );

      expect(result.current.nextSeoProps).toBeDefined();
      expect(result.current.schema).toBeNull();
    });

    it('should handle noindex and nofollow flags', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test',
          description: 'Test',
          noindex: true,
          nofollow: true,
        })
      );

      expect(result.current.nextSeoProps.noindex).toBe(true);
      expect(result.current.nextSeoProps.nofollow).toBe(true);
    });

    it('should handle custom image', () => {
      const customImage = 'https://example.com/custom-image.jpg';

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/test',
          title: 'Test',
          description: 'Test',
          image: customImage,
        })
      );

      expect(result.current.nextSeoProps.openGraph.images[0].url).toBe(customImage);
    });
  });

  describe('Article Schema Types', () => {
    it('should set correct Open Graph type for article schema', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/blog/test',
          title: 'Test Article',
          description: 'Test',
          schemaType: 'article',
          schemaData: {
            headline: 'Test',
            description: 'Test',
            datePublished: '2024-01-01',
            image: 'test.jpg',
          },
        })
      );

      expect(result.current.nextSeoProps.openGraph.type).toBe('article');
    });

    it('should set website type for non-article schemas', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/test',
          title: 'Test Product',
          description: 'Test',
          schemaType: 'product',
          schemaData: {
            name: 'Test',
            description: 'Test',
            image: 'test.jpg',
            price: '29.99',
            priceValidUntil: '2024-12-31',
          },
        })
      );

      expect(result.current.nextSeoProps.openGraph.type).toBe('website');
    });
  });

  describe('Breadcrumb Integration', () => {
    it('should not include breadcrumb by default', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/trial-size',
          title: 'Test',
          description: 'Test',
        })
      );

      expect(result.current.breadcrumb).toBeUndefined();
    });

    it('should generate breadcrumb when includeBreadcrumb is true', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/trial-size',
          title: 'Test',
          description: 'Test',
          includeBreadcrumb: true,
        })
      );

      expect(result.current.breadcrumb).toBeDefined();
      expect(result.current.breadcrumb?.items).toHaveLength(3);
      expect(result.current.breadcrumb?.items[0].name).toBe('Home');
      expect(result.current.breadcrumb?.items[1].name).toBe('Products');
      expect(result.current.breadcrumb?.items[2].name).toBe('FREE Trial');
    });

    it('should include breadcrumb schema when only breadcrumb is requested', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products',
          title: 'Test',
          description: 'Test',
          includeBreadcrumb: true,
        })
      );

      expect(result.current.schema).toBeDefined();
      expect(result.current.schema).toHaveProperty('@type', 'BreadcrumbList');
    });

    it('should combine breadcrumb and main schema using @graph', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/trial-size',
          title: 'Test',
          description: 'Test',
          schemaType: 'product',
          schemaData: {
            name: 'Test Product',
            description: 'Test',
            image: 'test.jpg',
            price: '29.99',
            priceValidUntil: '2024-12-31',
          },
          includeBreadcrumb: true,
        })
      );

      expect(result.current.schema).toHaveProperty('@context', 'https://schema.org');
      expect(result.current.schema).toHaveProperty('@graph');
      const graph = (result.current.schema as any)['@graph'];
      expect(graph).toHaveLength(2);
      expect(graph[0]).toHaveProperty('@type', 'Product');
      expect(graph[1]).toHaveProperty('@type', 'BreadcrumbList');
    });

    it('should generate breadcrumb schema with correct URLs', () => {
      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/learn/how-it-works',
          title: 'Test',
          description: 'Test',
          includeBreadcrumb: true,
        })
      );

      const breadcrumbSchema = result.current.breadcrumb?.schema as any;
      expect(breadcrumbSchema.itemListElement[0].item).toBe(
        'https://www.purrify.ca/'
      );
      expect(breadcrumbSchema.itemListElement[1].item).toBe(
        'https://www.purrify.ca/learn'
      );
      expect(breadcrumbSchema.itemListElement[2].item).toBe(
        'https://www.purrify.ca/learn/how-it-works'
      );
    });

    it('should support breadcrumbs in French', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'fr',
      } as any);

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/standard',
          title: 'Test',
          description: 'Test',
          includeBreadcrumb: true,
        })
      );

      expect(result.current.breadcrumb?.items[0].name).toBe('Accueil');
      expect(result.current.breadcrumb?.items[1].name).toBe('Produits');
      expect(result.current.breadcrumb?.items[2].name).toBe('Standard');
    });

    it('should support breadcrumbs in Chinese', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'zh',
      } as any);

      const { result } = renderHook(() =>
        useEnhancedSEO({
          path: '/products/family-pack',
          title: 'Test',
          description: 'Test',
          includeBreadcrumb: true,
        })
      );

      expect(result.current.breadcrumb?.items[0].name).toBe('首页');
      expect(result.current.breadcrumb?.items[1].name).toBe('产品');
      expect(result.current.breadcrumb?.items[2].name).toBe('家庭装');
    });
  });
});
