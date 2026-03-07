import { renderHook } from '@testing-library/react';
import { useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('../../src/lib/currency-context', () => ({
  useCurrency: jest.fn(() => ({
    currency: 'CAD',
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
  getLocalizedUrl: jest.fn((path: string) => `https://www.purrify.ca${path}`),
  buildLanguageAlternates: jest.fn(() => [
    { hrefLang: 'en', href: 'https://www.purrify.ca/test' },
    { hrefLang: 'fr', href: 'https://www.purrify.ca/fr/test' },
  ]),
}));

const { useEnhancedSEO } = require('../../src/hooks/useEnhancedSEO') as typeof import('../../src/hooks/useEnhancedSEO');

const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;

describe('useEnhancedSEO smoke coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocale.mockReturnValue('en');
  });

  it('uses the provided custom image in Open Graph output', () => {
    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/test',
        title: 'Test Page',
        description: 'Test description',
        image: 'https://example.com/image.jpg',
      }),
    );

    expect(result.current.nextSeoProps.openGraph.images[0].url).toBe('https://example.com/image.jpg');
  });

  it('passes through noindex and nofollow flags', () => {
    const { result } = renderHook(() =>
      useEnhancedSEO({
        path: '/test',
        title: 'Test Page',
        description: 'Test description',
        noindex: true,
        nofollow: true,
      }),
    );

    expect(result.current.nextSeoProps.noindex).toBe(true);
    expect(result.current.nextSeoProps.nofollow).toBe(true);
  });
});
