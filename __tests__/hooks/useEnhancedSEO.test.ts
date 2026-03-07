import { renderHook } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { useCurrency } from '../../src/lib/currency-context';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('../../src/lib/currency-context', () => ({
  useCurrency: jest.fn(() => ({
    currency: 'CAD',
    formatPrice: jest.fn(),
  })),
}));

jest.mock('../../src/lib/seo/meta-optimizer', () => ({
  optimizeMetaTitle: jest.fn((title: string) => ({
    title,
    length: title.length,
    isTruncated: false,
    warnings: [],
  })),
  optimizeMetaDescription: jest.fn((description: string) => ({
    description,
    length: description.length,
    isTruncated: false,
    warnings: [],
  })),
}));

jest.mock('../../src/lib/seo-utils', () => ({
  getLocalizedUrl: jest.fn((path: string, locale: string) =>
    locale === 'en' ? `https://www.purrify.ca${path}` : `https://www.purrify.ca/${locale}${path}`
  ),
  buildLanguageAlternates: jest.fn((path: string) => ([
    { hrefLang: 'en', href: `https://www.purrify.ca${path}` },
    { hrefLang: 'fr', href: `https://www.purrify.ca/fr${path}` },
  ])),
}));

const { useEnhancedSEO } = require('../../src/hooks/useEnhancedSEO') as typeof import('../../src/hooks/useEnhancedSEO');

const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;
const mockUseCurrency = useCurrency as jest.MockedFunction<typeof useCurrency>;

describe('useEnhancedSEO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocale.mockReturnValue('en');
    mockUseCurrency.mockReturnValue({
      currency: 'CAD',
      formatPrice: jest.fn(),
    } as ReturnType<typeof useCurrency>);
  });

  it('generates core Next SEO props', () => {
    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/test-page',
        title: 'Test Page Title',
        description: 'This is a test description.',
      }),
    );

    expect(result.current.nextSeoProps).toMatchObject({
      title: 'Test Page Title',
      description: 'This is a test description.',
      canonical: 'https://www.purrify.ca/test-page',
      openGraph: expect.objectContaining({
        type: 'website',
        locale: 'en_CA',
      }),
      twitter: {
        cardType: 'summary_large_image',
      },
    });
    expect(result.current.breadcrumb).toBeUndefined();
  });

  it('switches Open Graph locale for French', () => {
    mockUseLocale.mockReturnValue('fr');

    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/test',
        title: 'Page de test',
        description: 'Description',
      }),
    );

    expect(result.current.nextSeoProps.canonical).toBe('https://www.purrify.ca/fr/test');
    expect(result.current.nextSeoProps.openGraph.locale).toBe('fr_CA');
  });

  it('falls back to en_CA for unsupported locales', () => {
    mockUseLocale.mockReturnValue('zh');

    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/test',
        title: 'Test',
        description: 'Test',
      }),
    );

    expect(result.current.nextSeoProps.openGraph.locale).toBe('en_CA');
  });

  it('uses article open graph type for article schema', () => {
    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/blog/test',
        title: 'Article',
        description: 'Article description',
        schemaType: 'article',
        schemaData: {
          headline: 'Article',
          description: 'Article description',
          datePublished: '2024-01-01',
        },
      }),
    );

    expect(result.current.nextSeoProps.openGraph.type).toBe('article');
  });

  it('uses active currency in product schema offers', () => {
    mockUseCurrency.mockReturnValue({
      currency: 'USD',
      formatPrice: jest.fn(),
    } as ReturnType<typeof useCurrency>);

    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/products/test',
        title: 'Test Product',
        description: 'Product description',
        schemaType: 'product',
        schemaData: {
          name: 'Test Product',
          description: 'Product description',
          image: 'https://example.com/product.jpg',
          price: '29.99',
          priceValidUntil: '2026-12-31',
        },
      }),
    );

    expect((result.current.schema as { offers?: { priceCurrency?: string } })?.offers?.priceCurrency).toBe('USD');
  });
});
