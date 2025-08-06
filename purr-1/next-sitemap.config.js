/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://purrify.ca',
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
      'https://purrify.ca/server-sitemap.xml', // For dynamically generated content
      'https://purrify.ca/sitemap-0.xml', // For static pages
    ],
    host: 'https://purrify.ca',
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*', '/404', '/_next/*', '/static/*'],
  alternateRefs: [
    {
      href: 'https://purrify.ca',
      hreflang: 'en',
    },
    {
      href: 'https://purrify.ca/fr',
      hreflang: 'fr',
    },
  ],
  // Explicitly define all important pages
  additionalPaths: async (config) => [
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr',
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
    {
      loc: '/fr/blog',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/free',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr/free',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/checkout',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/thank-you',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/privacy-policy',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr/privacy-policy',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/terms',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/fr/terms',
      changefreq: 'monthly',
      priority: 0.4,
      lastmod: new Date().toISOString(),
    },
    // Product pages
    {
      loc: '/products/purrify-20g',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/products/purrify-60g',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/products/purrify-120g',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
  ],
  transform: async (config, path) => {
    // Custom transformation for specific pages
    if (path.startsWith('/blog/')) {
      // Higher priority for blog posts
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Home page gets highest priority
    if (path === '') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
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