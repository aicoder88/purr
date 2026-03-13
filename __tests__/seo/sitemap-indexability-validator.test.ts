import {
  validateSitemapUrls,
  type RedirectRule,
  type RouteInspection,
} from '../../scripts/seo/lib/sitemap-indexability-validator';

describe('sitemap indexability validator', () => {
  const redirects: RedirectRule[] = [
    {
      source: '/fr/learn/how-it-works/',
      destination: '/learn/how-it-works/',
    },
  ];

  function inspectPath(pathname: string): RouteInspection {
    if (pathname === '/search/') {
      return {
        exists: true,
        routeFile: 'app/search/page.tsx',
        noindex: true,
        canonicalUrl: 'https://www.purrify.ca/search/',
      };
    }

    if (pathname === '/referral/') {
      return {
        exists: true,
        routeFile: 'app/referral/page.tsx',
        noindex: false,
        canonicalUrl: 'https://www.purrify.ca/referral/',
      };
    }

    if (pathname === '/fr/referral/') {
      return {
        exists: true,
        routeFile: 'app/[locale]/referral/page.tsx',
        noindex: false,
        canonicalUrl: 'https://www.purrify.ca/referral/',
      };
    }

    return {
      exists: pathname !== '/missing/',
      routeFile: 'app/placeholder/page.tsx',
      noindex: false,
      canonicalUrl: `https://www.purrify.ca${pathname}`,
    };
  }

  it('fails on redirects, noindex routes, canonical mismatches, and missing routes', () => {
    const result = validateSitemapUrls(
      [
        'https://www.purrify.ca/fr/learn/how-it-works/',
        'https://www.purrify.ca/search/',
        'https://www.purrify.ca/fr/referral/',
        'https://www.purrify.ca/missing/',
      ],
      {
        redirects,
        inspectPath,
      },
    );

    expect(result.passed).toBe(false);
    expect(result.stats.redirects).toBe(1);
    expect(result.stats.noindex).toBe(1);
    expect(result.stats.nonCanonical).toBe(1);
    expect(result.stats.missing).toBe(1);
  });

  it('allows explicit canonical mismatches when allowlisted with justification', () => {
    const result = validateSitemapUrls(
      ['https://www.purrify.ca/fr/referral/'],
      {
        redirects: [],
        inspectPath,
        allowlist: [
          {
            pattern: '/fr/referral/',
            canonicalUrl: 'https://www.purrify.ca/referral/',
            justification: 'Localized referral route intentionally consolidates to the English canonical.',
          },
        ],
      },
    );

    expect(result.passed).toBe(true);
    expect(result.stats.allowlistedCanonicalMismatches).toBe(1);
    expect(result.issues).toHaveLength(0);
  });

  it('fails invalid allowlist entries without justification', () => {
    const result = validateSitemapUrls(
      ['https://www.purrify.ca/referral/'],
      {
        redirects: [],
        inspectPath,
        allowlist: [
          {
            pattern: '/fr/referral/',
            canonicalUrl: 'https://www.purrify.ca/referral/',
            justification: '',
          },
        ],
      },
    );

    expect(result.passed).toBe(false);
    expect(result.stats.invalidAllowlistEntries).toBe(1);
    expect(result.issues[0]?.type).toBe('invalid-allowlist');
  });
});

describe('generated sitemap', () => {
  it('excludes known noindex and redirected URLs', async () => {
    const sitemapModule = await import('../../app/sitemap');
    const sitemapFactory = (sitemapModule as { default: { default?: () => Promise<Array<{ url: string }>> } }).default.default
      ?? (sitemapModule as { default: () => Promise<Array<{ url: string }>> }).default;
    const entries = await sitemapFactory();
    const urls = new Set(entries.map((entry) => entry.url));

    expect(urls.has('https://www.purrify.ca/search/')).toBe(false);
    expect(urls.has('https://www.purrify.ca/fr/search/')).toBe(false);
    expect(urls.has('https://www.purrify.ca/fr/learn/how-it-works/')).toBe(true);
    expect(urls.has('https://www.purrify.ca/fr/learn/faq/')).toBe(true);
    expect(urls.has('https://www.purrify.ca/fr/support/')).toBe(true);
    expect(urls.has('https://www.purrify.ca/referral/')).toBe(false);
    expect(urls.has('https://www.purrify.ca/terms/')).toBe(false);

    expect(urls.has('https://www.purrify.ca/learn/how-it-works/')).toBe(true);
    expect(urls.has('https://www.purrify.ca/learn/faq/')).toBe(true);
    expect(urls.has('https://www.purrify.ca/support/')).toBe(true);
  });
});
