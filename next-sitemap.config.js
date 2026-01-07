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
    '/fr/blog',
    '/fr/blog/*',
    '/zh/blog',
    '/zh/blog/*',
    '/es/blog',
    '/es/blog/*',
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
    // Spanish pages
    { loc: '/es/opiniones', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
  ],
  transform: async (config, path) => {
    // Blog pages - English only hreflang (fr/zh blog not available)
    // Note: next-sitemap auto-appends the path to alternateRefs.href, so just provide base URL
    if (path === '/blog' || path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          { href: 'https://www.purrify.ca', hreflang: 'en-CA' },
          { href: 'https://www.purrify.ca', hreflang: 'x-default' },
        ],
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

    // Spanish pages - specific hreflang setup
    // Extract the path without locale prefix for proper hreflang generation
    if (path.startsWith('/es/')) {
      const pathWithoutLocale = path.replace(/^\/es/, '');
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          { href: `https://www.purrify.ca${pathWithoutLocale}`, hreflang: 'en-CA' },
          { href: `https://www.purrify.ca/es${pathWithoutLocale}`, hreflang: 'es' },
          { href: `https://www.purrify.ca${pathWithoutLocale}`, hreflang: 'x-default' },
        ],
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
