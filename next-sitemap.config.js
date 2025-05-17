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
        disallow: ['/api/*', '/admin/*'],
      },
    ],
    additionalSitemaps: [
      'https://purrify.ca/server-sitemap.xml', // For dynamically generated content
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*', '/404'],
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