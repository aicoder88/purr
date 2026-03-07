import { renderHook } from '@testing-library/react';
import { useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('../../src/lib/seo-utils', () => ({
  getLocalizedUrl: jest.fn((path: string, locale: string) =>
    locale === 'en' ? `https://www.purrify.ca${path}` : `https://www.purrify.ca/${locale}${path}`
  ),
}));

const { useBreadcrumb } = require('../../src/hooks/useBreadcrumb') as typeof import('../../src/hooks/useBreadcrumb');

const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;

describe('useBreadcrumb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocale.mockReturnValue('en');
  });

  it('builds English breadcrumb items for known routes', () => {
    const { result } = renderHook(() => useBreadcrumb('/products/trial-size'));

    expect(result.current.items).toEqual([
      { name: 'Home', path: '/', position: 1 },
      { name: 'Products', path: '/products', position: 2 },
      { name: 'FREE Trial', path: '/products/trial-size', position: 3 },
    ]);
  });

  it('builds French breadcrumb items when locale is fr', () => {
    mockUseLocale.mockReturnValue('fr');

    const { result } = renderHook(() => useBreadcrumb('/products/trial-size'));

    expect(result.current.items).toEqual([
      { name: 'Accueil', path: '/', position: 1 },
      { name: 'Produits', path: '/products', position: 2 },
      { name: 'Essai GRATUIT', path: '/products/trial-size', position: 3 },
    ]);
  });

  it('falls back to generated labels for unknown segments', () => {
    const { result } = renderHook(() => useBreadcrumb('/unknown/test-page'));

    expect(result.current.items).toEqual([
      { name: 'Home', path: '/', position: 1 },
      { name: 'Unknown', path: '/unknown', position: 2 },
      { name: 'Test Page', path: '/unknown/test-page', position: 3 },
    ]);
  });

  it('generates schema.org BreadcrumbList output', () => {
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
});
