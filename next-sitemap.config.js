/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.purrify.ca',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/*', '/admin/*', '/_next/*', '/static/*'],
      },
    ],
    additionalSitemaps: [
      'https://www.purrify.ca/server-sitemap.xml', // For dynamically generated content
    ],
    host: 'https://www.purrify.ca',
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/api/*',
    '/admin/*',
    '/404',
    '/_next/*',
    '/static/*',
    '/free',
    '/fr/free',
    '/test',
    '/demo/*',
    // Note: FR/ZH/ES blog exclusions removed - translated blog content now exists (Jan 2026)
    // Pages that redirect - exclude to avoid canonical pointing to redirect issues
    '/checkout',
    '/cart-2',
    '/products/compare',
    '/comments/feed',
    '/support/contact',
    '/customers',
    '/thank-you',
    '/thank-you/*',
    // Old product slugs that redirect
    '/products/purrify-20g',
    '/products/purrify-50g',
    '/products/purrify-120g',
    '/products/medium-size',
    '/products/large-size',
    '/products/family',
    // Solutions pages that redirect to /learn/solutions
    '/solutions',
    '/solutions/*',
    // Redirect pages that don't render content
    '/customers/testimonials',
    '/customers/case-studies',
    '/support/subscription',
    '/montreal', // Redirects to locations
    '/sentry-example-page',
    '/offline',
    '/server-sitemap.xml',
    // Old province abbreviation URLs (now redirect to /province/full-name)
    '/locations/ab',
    '/locations/bc',
    '/locations/mb',
    '/locations/nb',
    '/locations/nl',
    '/locations/ns',
    '/locations/nt',
    '/locations/nu',
    '/locations/on',
    '/locations/pe',
    '/locations/qc',
    '/locations/sk',
    '/locations/yt',
    '/fr/locations/ab',
    '/fr/locations/bc',
    '/fr/locations/mb',
    '/fr/locations/nb',
    '/fr/locations/nl',
    '/fr/locations/ns',
    '/fr/locations/nt',
    '/fr/locations/nu',
    '/fr/locations/on',
    '/fr/locations/pe',
    '/fr/locations/qc',
    '/fr/locations/sk',
    '/fr/locations/yt',
    '/zh/locations/ab',
    '/zh/locations/bc',
    '/zh/locations/mb',
    '/zh/locations/nb',
    '/zh/locations/nl',
    '/zh/locations/ns',
    '/zh/locations/nt',
    '/zh/locations/nu',
    '/zh/locations/on',
    '/zh/locations/pe',
    '/zh/locations/qc',
    '/zh/locations/sk',
    '/zh/locations/yt',
    // Exclude ALL non-English location pages (noindexed to prevent thin content)
    '/fr/locations',
    '/fr/locations/*',
    '/zh/locations',
    '/zh/locations/*',
    '/es/locations',
    '/es/locations/*',
    // Exclude Spanish protected/portal pages (not public-facing)
    '/es/affiliate/*',
    '/es/retailer/*',
    '/es/customer/*',
    '/es/admin/*',
    // Exclude Spanish versions of pages that redirect or are post-purchase
    '/es/results',
    '/es/free',
    // B2B Spanish pages - keep some, exclude portal-specific
    '/es/invest',
    '/es/dialergptpitchdeck',
  ],
  alternateRefs: [
    { href: 'https://www.purrify.ca', hreflang: 'en-CA' },
    { href: 'https://www.purrify.ca/fr', hreflang: 'fr-CA' },
    { href: 'https://www.purrify.ca/zh', hreflang: 'zh-CN' },
    { href: 'https://www.purrify.ca/es', hreflang: 'es' },
    { href: 'https://www.purrify.ca', hreflang: 'x-default' },
  ],
  // Explicitly define all important pages
  additionalPaths: async (config) => [
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/es',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/blog',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    // Removed /checkout - it redirects to /products
    // Removed /thank-you - post-purchase page shouldn't be in sitemap
    {
      loc: '/privacy-policy',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr/privacy-policy',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/es/privacy-policy',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/terms',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr/terms',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/es/terms',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    // Product pages (canonical slugs)
    { loc: '/products/trial-size', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
    { loc: '/products/standard', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
    { loc: '/products/family-pack', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
    // USA landing page - important for US market expansion
    { loc: '/us', changefreq: 'weekly', priority: 0.85, lastmod: new Date().toISOString() },
    // Spanish pages - key landing pages for Spanish market
    { loc: '/es/opiniones', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
    { loc: '/es/products/trial-size', changefreq: 'weekly', priority: 0.85, lastmod: new Date().toISOString() },
    { loc: '/es/products/standard', changefreq: 'weekly', priority: 0.85, lastmod: new Date().toISOString() },
    { loc: '/es/products/family-pack', changefreq: 'weekly', priority: 0.85, lastmod: new Date().toISOString() },
    { loc: '/es/contact', changefreq: 'monthly', priority: 0.5, lastmod: new Date().toISOString() },
    { loc: '/es/learn/how-it-works', changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() },
    { loc: '/es/learn/faq', changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() },
  ],
  transform: async (config, path) => {
    // Blog pages - now available in EN, FR, ZH, ES (Jan 2026)
    // Each locale blog will have its own canonical, no alternateRefs needed (handled at page level)
    if (path === '/blog' || path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Localized blog pages
    if (path.includes('/blog/') || path.endsWith('/blog')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Location pages - reduced priority and frequency (SEO fix 2025-12-26)
    if (path.startsWith('/locations/') || path.includes('/locations/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    // Spanish pages - NO alternateRefs to avoid doubled paths bug
    // next-sitemap auto-appends path to alternateRefs.href even in transform returns
    // Hreflang for locale pages will be handled by the page's own meta tags
    if (path.startsWith('/es/') || path === '/es') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        // No alternateRefs - let page-level meta handle hreflang to avoid sitemap path doubling
      };
    }

    // French pages - NO alternateRefs to avoid doubled paths bug
    if (path.startsWith('/fr/') || path === '/fr') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        // No alternateRefs - let page-level meta handle hreflang
      };
    }

    // Chinese pages - NO alternateRefs to avoid doubled paths bug
    if (path.startsWith('/zh/') || path === '/zh') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        // No alternateRefs - let page-level meta handle hreflang
      };
    }

    // Home page gets highest priority
    if (path === '') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString(),
      };
    }

    // Default transformation for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
