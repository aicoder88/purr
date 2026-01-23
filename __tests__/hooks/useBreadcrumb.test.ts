/**
 * Unit tests for useBreadcrumb hook
 * Tests breadcrumb item generation and schema.org BreadcrumbList creation
 */

import { renderHook } from '@testing-library/react';
import { useBreadcrumb } from '../../src/hooks/useBreadcrumb';
import { useTranslation } from '../../src/lib/translation-context';

// Mock dependencies
jest.mock('../../src/lib/translation-context');
jest.mock('../../src/lib/seo-utils');

const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>;

describe('useBreadcrumb', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock: English locale
    mockUseTranslation.mockReturnValue({
      t: {} as any,
      locale: 'en',
    } as any);

    // Mock getLocalizedUrl
    const { getLocalizedUrl } = require('../../src/lib/seo-utils');
    getLocalizedUrl.mockImplementation((path: string, locale: string) => {
      const baseUrl = 'https://www.purrify.ca';
      if (locale === 'en') return `${baseUrl}${path}`;
      return `${baseUrl}/${locale}${path}`;
    });
  });

  describe('Single-level paths', () => {
    it('should generate breadcrumb for /products', () => {
      const { result } = renderHook(() => useBreadcrumb('/products'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Products', path: '/products', position: 2 },
      ]);
    });

    it('should generate breadcrumb for /blog', () => {
      const { result } = renderHook(() => useBreadcrumb('/blog'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Blog', path: '/blog', position: 2 },
      ]);
    });
  });

  describe('Multi-level paths', () => {
    it('should generate breadcrumb for /products/trial-size', () => {
      const { result } = renderHook(() => useBreadcrumb('/products/trial-size'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Products', path: '/products', position: 2 },
        { name: 'FREE Trial', path: '/products/trial-size', position: 3 },
      ]);
    });

    it('should generate breadcrumb for /learn/how-it-works', () => {
      const { result } = renderHook(() => useBreadcrumb('/learn/how-it-works'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Learn', path: '/learn', position: 2 },
        { name: 'How It Works', path: '/learn/how-it-works', position: 3 },
      ]);
    });

    it('should generate breadcrumb for blog articles', () => {
      const { result } = renderHook(() =>
        useBreadcrumb('/blog/most-powerful-odor-absorber')
      );

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Blog', path: '/blog', position: 2 },
        {
          name: 'Most Powerful Odor Absorber',
          path: '/blog/most-powerful-odor-absorber',
          position: 3,
        },
      ]);
    });
  });

  describe('Multi-language support', () => {
    it('should generate French breadcrumbs', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'fr',
      } as any);

      const { result } = renderHook(() => useBreadcrumb('/products/trial-size'));

      expect(result.current.items).toEqual([
        { name: 'Accueil', path: '/', position: 1 },
        { name: 'Produits', path: '/products', position: 2 },
        { name: 'Essai GRATUIT', path: '/products/trial-size', position: 3 },
      ]);
    });

    it('should generate Chinese breadcrumbs', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'zh',
      } as any);

      const { result } = renderHook(() => useBreadcrumb('/products/standard'));

      expect(result.current.items).toEqual([
        { name: '首页', path: '/', position: 1 },
        { name: '产品', path: '/products', position: 2 },
        { name: '标准装', path: '/products/standard', position: 3 },
      ]);
    });
  });

  describe('Unknown segments', () => {
    it('should auto-generate labels for unmapped segments', () => {
      const { result } = renderHook(() => useBreadcrumb('/unknown/test-page'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Unknown', path: '/unknown', position: 2 },
        { name: 'Test Page', path: '/unknown/test-page', position: 3 },
      ]);
    });

    it('should capitalize hyphenated segments', () => {
      const { result } = renderHook(() => useBreadcrumb('/my-custom-page'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'My Custom Page', path: '/my-custom-page', position: 2 },
      ]);
    });
  });

  describe('Schema generation', () => {
    it('should generate valid schema.org BreadcrumbList', () => {
      const { result } = renderHook(() => useBreadcrumb('/products/trial-size'));

      expect(result.current.schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.purrify.ca/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://www.purrify.ca/products',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'FREE Trial',
            item: 'https://www.purrify.ca/products/trial-size',
          },
        ],
      });
    });

    it('should include locale in URLs for non-English', () => {
      mockUseTranslation.mockReturnValue({
        t: {} as any,
        locale: 'fr',
      } as any);

      const { result } = renderHook(() => useBreadcrumb('/products'));

      expect(result.current.schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://www.purrify.ca/fr/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Produits',
            item: 'https://www.purrify.ca/fr/products',
          },
        ],
      });
    });

    it('should use correct position numbering', () => {
      const { result } = renderHook(() => useBreadcrumb('/a/b/c/d'));

      const schema = result.current.schema as any;
      const positions = schema.itemListElement.map(
        (item: any) => item.position
      );
      expect(positions).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('Edge cases', () => {
    it('should handle root path', () => {
      const { result } = renderHook(() => useBreadcrumb('/'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
      ]);
    });

    it('should handle trailing slashes', () => {
      const { result } = renderHook(() => useBreadcrumb('/products/'));

      expect(result.current.items).toEqual([
        { name: 'Home', path: '/', position: 1 },
        { name: 'Products', path: '/products', position: 2 },
      ]);
    });

    it('should handle deep nesting', () => {
      const { result } = renderHook(() => useBreadcrumb('/a/b/c/d/e/f'));

      expect(result.current.items).toHaveLength(7); // Home + 6 segments
      expect(result.current.items[0].name).toBe('Home');
      expect(result.current.items[6].path).toBe('/a/b/c/d/e/f');
    });
  });

  describe('All product pages', () => {
    it('should handle trial-size product', () => {
      const { result } = renderHook(() => useBreadcrumb('/products/trial-size'));

      expect(result.current.items[2].name).toBe('FREE Trial');
    });

    it('should handle standard product', () => {
      const { result } = renderHook(() => useBreadcrumb('/products/standard'));

      expect(result.current.items[2].name).toBe('Standard');
    });

    it('should handle family-pack product', () => {
      const { result } = renderHook(() => useBreadcrumb('/products/family-pack'));

      expect(result.current.items[2].name).toBe('Family Pack');
    });
  });

  describe('All learn pages', () => {
    it('should handle how-it-works', () => {
      const { result } = renderHook(() => useBreadcrumb('/learn/how-it-works'));

      expect(result.current.items[2].name).toBe('How It Works');
    });

    it('should handle FAQ', () => {
      const { result } = renderHook(() => useBreadcrumb('/learn/faq'));

      expect(result.current.items[2].name).toBe('FAQ');
    });

    it('should handle science', () => {
      const { result } = renderHook(() => useBreadcrumb('/learn/science'));

      expect(result.current.items[2].name).toBe('Science');
    });

    it('should handle safety', () => {
      const { result } = renderHook(() => useBreadcrumb('/learn/safety'));

      expect(result.current.items[2].name).toBe('Safety');
    });
  });

  describe('Blog articles', () => {
    it('should handle blog article with long slug', () => {
      const { result } = renderHook(() =>
        useBreadcrumb('/blog/best-litter-odor-remover-small-apartments')
      );

      expect(result.current.items[2].name).toBe(
        'Best Odor Remover for Small Apartments'
      );
    });
  });
});
