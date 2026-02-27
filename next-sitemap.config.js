/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.purrify.ca',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    additionalSitemaps: [],
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

    // === REDIRECTING PAGES - Fix for Ahrefs "3XX redirect in sitemap" ===
    // Server-side redirect pages (these redirect to other pages)
    '/free-trial',              // Redirects to /try-free
    '/fr/free-trial',
    '/buy',                     // Redirects to /products
    '/fr/buy',
    '/about',                   // Redirects to /about/our-story
    '/fr/about',
    '/montreal',                // Redirects to /locations/montreal
    '/support/contact',         // Redirects to /contact
    '/documents',               // Redirects to /invest (per next.config.js)

    // Old product slugs that redirect
    '/products/purrify-20g',
    '/products/purrify-50g',
    '/products/purrify-120g',
    '/products/medium-size',
    '/products/large-size',
    '/products/family',
    '/fr/products/medium-size',
    '/fr/products/large-size',
    '/fr/products/family',

    // Solutions pages that redirect to /learn/solutions
    '/solutions',
    '/solutions/*',

    // === DELETED LEARN PAGES - Redirect to blog (consolidation cleanup) ===
    // English locale variants
    '/en/learn/solutions',
    '/en/learn/solutions/*',
    '/en/learn/cat-litter-answers',
    '/en/learn/answers/*',
    '/en/learn/activated-carbon-benefits',
    '/en/learn/activated-carbon-vs-baking-soda-deodorizers',
    '/en/learn/how-to-use-deodorizer',
    '/en/learn/using-deodorizers-with-kittens',
    // Root variants (if generated)
    '/learn/solutions',
    '/learn/solutions/*',
    '/learn/cat-litter-answers',
    '/learn/answers/*',
    '/learn/activated-carbon-benefits',
    '/learn/activated-carbon-vs-baking-soda-deodorizers',
    '/learn/how-to-use-deodorizer',
    '/learn/using-deodorizers-with-kittens',
    // French locale variants
    '/fr/learn/solutions',
    '/fr/learn/solutions/*',
    '/fr/learn/answers/*',

    // Legacy redirects
    '/checkout',
    '/cart-2',
    '/products/compare',
    '/comments/feed',
    '/feed',
    '/wishlist',
    '/shopdsf',
    '/home-three',
    '/purrify-cat-litter-odor-eliminator-copy',
    '/cart',
    '/order',
    '/orders',
    '/account',
    '/login',
    '/signup',
    '/register',
    '/faq',
    '/help',
    '/shipping',
    '/returns',
    '/guarantee',
    '/pricing',
    '/plans',
    '/subscribe',
    '/unsubscribe',
    '/info',
    '/catalog',
    '/store',
    '/boutique',
    '/tienda',
    '/shop',
    '/tos',
    '/privacy',
    '/my-account',
    '/purrify-odor-eliminator',
    '/services-two-2',
    '/dn',
    '/checkout-2',
    '/my-account-2',
    '/trial',
    '/fr/trial',

    // Old blog redirects
    '/blog/activated-carbon-science',
    '/blog/beyond-masking-odors',
    '/blog/fresh-home-multiple-cats',
    '/fr/blog/best-cat-litter-multiple-cats',
    '/blog/purrify-vs-arm-hammer',
    '/learn/purrify-vs-arm-hammer',
    '/learn/safe-for-kittens',
    '/learn/activated-carbon-vs-baking-soda',

    // Customers redirects
    '/customers',
    '/customers/testimonials',
    '/customers/case-studies',
    '/support/subscription',

    // Utility pages (noindex)
    '/pos',
    '/pos/*',
    '/tools/*',

    // System pages

    '/offline',

    '/thank-you',
    '/thank-you/*',
    '/auth/signin',
    '/affiliate/forgot-password',

    // === NOINDEX PAGES - Fix for Ahrefs "Noindex page in sitemap" ===
    // Affiliate portal pages (require authentication - should be noindex)
    '/affiliate/dashboard',
    '/affiliate/dashboard/*',
    '/affiliate/login',
    '/affiliate/activate',
    '/affiliate/signup',

    // French affiliate pages
    '/fr/affiliate/dashboard',
    '/fr/affiliate/dashboard/*',
    '/fr/affiliate/login',
    '/fr/affiliate/activate',
    '/fr/affiliate/signup',

    '/customer/portal',
    '/customer/referrals',
    '/fr/customer/portal',
    '/fr/customer/referrals',

    '/retailer/portal/login',
    '/fr/retailer/portal/login',

    // Admin pages
    '/admin',
    '/admin/*',

    '/results',
    '/fr/results',

    // Private/internal pages (noindex)
    '/dialergptpitchdeck',
    '/documents',

    // === NON-CANONICAL PAGES - Fix for Ahrefs "Non-canonical page in sitemap" ===

    // === OLD PROVINCE ABBREVIATION URLS (Redirect to /province/full-name) ===
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

    '/fr/locations',
    '/fr/locations/*',


  ],
  // === ADDITIONAL PATHS - Fix for Ahrefs "Indexable page not in sitemap" ===
  additionalPaths: async (config) => [
    // Core homepage
    
    // Locale homepages - IMPORTANT for indexable pages not in sitemap
    
    // Main blog index
    {
      loc: '/blog/',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    // Blog locale pages
    
    // Product pages
    {
      loc: '/products/trial-size/',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    
    
    {
      loc: '/products/',
      changefreq: 'daily',
      priority: 0.85,
      lastmod: new Date().toISOString(),
    },
    // French products  
    
    
    
    
    // Learn pages
    {
      loc: '/learn/',
      changefreq: 'weekly',
      priority: 0.75,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/how-it-works/',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/faq/',
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/cat-litter-guide/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/science/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/safety/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/glossary/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    // French learn pages
    
    
    
    // Locations
    {
      loc: '/locations/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    // Support pages
    {
      loc: '/support/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/support/shipping/',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },
    // French support
    
    // Contact pages
    {
      loc: '/contact/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    
    // About pages
    {
      loc: '/about/our-story/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    
    // Reviews
    {
      loc: '/reviews/',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Case studies
    {
      loc: '/case-studies/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    // Stores/Retailers
    {
      loc: '/stores/',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/retailers/',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    // B2B pages
    {
      loc: '/b2b/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/b2b/sell-sheet/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    
    // Referral (noindex - excluded from sitemap)
    // Fun/Tools
    {
      loc: '/fun/',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    // Science
    {
      loc: '/science/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    // Canada/US pages
    
    {
      loc: '/try-free/',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    // Legal pages
    {
      loc: '/privacy-policy/',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    
    {
      loc: '/terms/',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    },
    
    // === MISSING INDEXABLE PAGES - Adding all important pages ===
    // Learn alternatives
    {
      loc: '/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    // More learn pages
    {
      loc: '/learn/ammonia-science/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/cat-litter-ammonia-health-risks/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/learn/how-activated-carbon-works/',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    // POS and affiliate landing

    {
      loc: '/affiliate/',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    
    // Invest (noindex - excluded from sitemap)
    
    // Viral
    {
      loc: '/viral/',
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
    // Ammonia control
    
  ],
  transform: async (config, path) => {
    // Ensure path has trailing slash for consistency (except root)
    const normalizedPath = path === '' ? path : (path.endsWith('/') ? path : `${path}/`);

    // Skip if this is a redirecting URL or should be excluded
    const redirectingPatterns = [
      '/free-trial',
      '/buy',
      '/about',
      '/montreal',
      '/support/contact',
      '/documents',
      '/free',
      '/checkout',
      '/cart-2',
      '/products/compare',
    ];

    for (const pattern of redirectingPatterns) {
      if (normalizedPath === pattern || normalizedPath === `${pattern}/`) {
        return null; // Exclude from sitemap
      }
    }

    // Skip default locale prefix (causes 308 redirects)
    if (normalizedPath.startsWith('/en/') || normalizedPath === '/en/') {
      return null;
    }

    // Skip noindex pages (protected portals)
    const noindexPatterns = [
      '/affiliate/dashboard',
      '/affiliate/login',
      '/affiliate/activate',
      '/affiliate/signup',
      '/customer/portal',
      '/customer/referrals',
      '/retailer/portal',
      '/results',
      '/admin',
      '/thank-you',
    ];

    for (const pattern of noindexPatterns) {
      if (normalizedPath.startsWith(pattern)) {
        return null; // Exclude from sitemap
      }
    }

    // Blog pages
    if (normalizedPath === '/blog/' || normalizedPath.startsWith('/blog/')) {
      return {
        loc: normalizedPath,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Localized blog pages
    if (normalizedPath.match(/^\/fr\/blog\//)) {
      return {
        loc: normalizedPath,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Location pages
    if (normalizedPath.startsWith('/locations/')) {
      return {
        loc: normalizedPath,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    // French pages
    if (normalizedPath.startsWith('/fr/') || normalizedPath === '/fr/') {
      return {
        loc: normalizedPath,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Home page gets highest priority
    if (normalizedPath === '' || normalizedPath === '/') {
      return ;
    }

    // Product pages
    if (normalizedPath.startsWith('/products/')) {
      return {
        loc: normalizedPath,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Learn pages
    if (normalizedPath.startsWith('/learn/')) {
      return {
        loc: normalizedPath,
        changefreq: 'monthly',
        priority: 0.75,
        lastmod: new Date().toISOString(),
      };
    }

    // Default transformation for other pages
    return {
      loc: normalizedPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
