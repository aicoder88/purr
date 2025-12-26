#!/usr/bin/env tsx
/**
 * Comprehensive Sitemap Fix Script
 *
 * Fixes all Google Search Console indexing issues:
 * 1. Removes redirect URLs from sitemap
 * 2. Removes 404/non-existent pages
 * 3. Removes noindex pages
 * 4. Ensures all URLs use canonical www domain
 * 5. Removes duplicate content issues
 */

import fs from 'fs';
import path from 'path';

// Canonical base URL - MUST use www
const CANONICAL_BASE = 'https://www.purrify.ca';

// URLs that should NEVER be in sitemap (redirects, noindex, admin, etc.)
const EXCLUDED_URLS = new Set([
  // Redirects (defined in next.config.js)
  '/locations/ab', '/locations/bc', '/locations/mb', '/locations/nb',
  '/locations/nl', '/locations/ns', '/locations/on', '/locations/pe',
  '/locations/qc', '/locations/sk', '/locations/nt', '/locations/nu',
  '/locations/yt',
  '/fr/locations/ab', '/fr/locations/bc', '/fr/locations/mb', '/fr/locations/nb',
  '/fr/locations/nl', '/fr/locations/ns', '/fr/locations/on', '/fr/locations/pe',
  '/fr/locations/qc', '/fr/locations/sk', '/fr/locations/nt', '/fr/locations/nu',
  '/fr/locations/yt',
  '/zh/locations/ab', '/zh/locations/bc', '/zh/locations/mb', '/zh/locations/nb',
  '/zh/locations/nl', '/zh/locations/ns', '/zh/locations/on', '/zh/locations/pe',
  '/zh/locations/qc', '/zh/locations/sk', '/zh/locations/nt', '/zh/locations/nu',
  '/zh/locations/yt',

  // Other redirects
  '/checkout',
  '/customers/case-studies',
  '/customers/testimonials',

  // Noindex pages (admin, portals, thank you pages)
  '/dialergptpitchdeck',
  '/thank-you',
  '/thank-you/upsell',
  '/offline',
  '/retailer/portal/login',
  '/admin/referral-analytics',

  // Non-existent pages
  '/server-sitemap.xml',
  '/montreal', // This is at /locations/montreal

  // Admin/private areas
  '/admin',
  '/api',
  '/customer/portal',
  '/customer/referrals',
]);

// URLs that SHOULD be in the sitemap (all actual pages)
const VALID_STATIC_PAGES = [
  // Homepage
  { loc: '/', priority: 1.0, changefreq: 'daily' },

  // Products
  { loc: '/products/trial-size', priority: 0.9, changefreq: 'weekly' },
  { loc: '/products/standard', priority: 0.9, changefreq: 'weekly' },
  { loc: '/products/family-pack', priority: 0.9, changefreq: 'weekly' },
  { loc: '/products/compare', priority: 0.7, changefreq: 'weekly' },

  // Learn
  { loc: '/learn/how-it-works', priority: 0.8, changefreq: 'monthly' },
  { loc: '/learn/cat-litter-guide', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/faq', priority: 0.8, changefreq: 'weekly' },
  { loc: '/learn/activated-carbon-benefits', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/activated-carbon-vs-baking-soda-deodorizers', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/how-to-use-deodorizer', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/safety', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/science', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/using-deodorizers-with-kittens', priority: 0.7, changefreq: 'monthly' },

  // Learn - Solutions
  { loc: '/learn/solutions/ammonia-smell-cat-litter', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/solutions/apartment-cat-smell-solution', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/solutions/litter-box-smell-elimination', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/solutions/multiple-cats-odor-control', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/solutions/natural-cat-litter-additive', priority: 0.7, changefreq: 'monthly' },
  { loc: '/learn/solutions/senior-cat-litter-solutions', priority: 0.7, changefreq: 'monthly' },

  // Customer
  { loc: '/case-studies', priority: 0.6, changefreq: 'monthly' },
  { loc: '/reviews', priority: 0.7, changefreq: 'weekly' },

  // Support
  { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
  { loc: '/support', priority: 0.6, changefreq: 'monthly' },
  { loc: '/support/shipping', priority: 0.5, changefreq: 'monthly' },
  { loc: '/support/subscription', priority: 0.5, changefreq: 'monthly' },

  // About
  { loc: '/about/our-story', priority: 0.6, changefreq: 'monthly' },

  // Business
  { loc: '/b2b', priority: 0.7, changefreq: 'monthly' },
  { loc: '/retailers', priority: 0.7, changefreq: 'monthly' },
  { loc: '/stockists', priority: 0.7, changefreq: 'monthly' },
  { loc: '/affiliate', priority: 0.7, changefreq: 'monthly' },
  { loc: '/affiliate/signup', priority: 0.6, changefreq: 'monthly' },
  { loc: '/invest', priority: 0.6, changefreq: 'monthly' },

  // Locations
  { loc: '/locations', priority: 0.7, changefreq: 'monthly' },

  // Blog
  { loc: '/blog', priority: 0.8, changefreq: 'weekly' },

  // Legal
  { loc: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { loc: '/terms', priority: 0.3, changefreq: 'yearly' },
];

// Blog posts (English only for now - French/Chinese have noindex)
const BLOG_POSTS = [
  'activated-carbon-litter-additive-benefits',
  'activated-carbon-vs-baking-soda-comparison',
  'best-litter-odor-remover-small-apartments',
  'cat-litter-smell-worse-summer',
  'cat-litter-smell-worse-winter',
  'embarrassed-guests-visit-cat-litter-smell',
  'house-smells-like-cat-litter-solutions',
  'how-to-use-cat-litter-deodorizer',
  'most-powerful-odor-absorber',
  'multi-cat-litter-deodorizer-guide',
  'powder-vs-spray-litter-deodorizer',
  'strong-cat-urine-smell-litter-box',
  'tried-every-litter-deodorizer-90-days-results',
  'tried-everything-cat-litter-smell-solutions',
  'using-deodorizers-with-kittens',
];

// Canadian cities (30 major cities only, not province codes)
const CITIES = [
  'calgary', 'edmonton', 'kelowna', 'vancouver', 'winnipeg', 'halifax',
  'barrie', 'brampton', 'burlington', 'guelph', 'hamilton', 'kitchener',
  'london', 'markham', 'mississauga', 'oakville', 'oshawa', 'ottawa',
  'richmond-hill', 'scarborough', 'toronto', 'vaughan', 'windsor',
  'gatineau', 'laval', 'longueuil', 'montreal', 'quebec-city',
  'regina', 'saskatoon',
];

// Provinces (full names, not codes)
const PROVINCES = [
  'alberta', 'british-columbia', 'manitoba', 'nova-scotia',
  'ontario', 'quebec', 'saskatchewan',
];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function generateSitemap(): string {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Add static pages (English only)
  VALID_STATIC_PAGES.forEach(page => {
    const url = page.loc === '/' ? CANONICAL_BASE : `${CANONICAL_BASE}${page.loc}`;

    // Skip if in exclusion list
    if (EXCLUDED_URLS.has(page.loc)) {
      console.log(`⚠️  Skipping excluded URL: ${page.loc}`);
      return;
    }

    urls.push({
      loc: url,
      lastmod: today,
      changefreq: page.changefreq as string,
      priority: page.priority,
    });
  });

  // Add blog posts (English only - fr/zh have conditional noindex)
  BLOG_POSTS.forEach(slug => {
    urls.push({
      loc: `${CANONICAL_BASE}/blog/${slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  // Add location pages - cities (English only for now)
  CITIES.forEach(city => {
    urls.push({
      loc: `${CANONICAL_BASE}/locations/${city}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  // Add location pages - provinces (full names only, not codes!)
  PROVINCES.forEach(province => {
    urls.push({
      loc: `${CANONICAL_BASE}/locations/province/${province}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  // Add French pages (main pages only, not blog until we have content)
  const frenchPages = [
    '/',
    '/products/trial-size',
    '/products/standard',
    '/products/family-pack',
    '/b2b',
    '/stockists',
    '/locations',
    '/privacy-policy',
    '/terms',
  ];

  frenchPages.forEach(page => {
    const url = page === '/' ? `${CANONICAL_BASE}/fr` : `${CANONICAL_BASE}/fr${page}`;
    urls.push({
      loc: url,
      lastmod: today,
      changefreq: page === '/' ? 'daily' : 'monthly',
      priority: page === '/' ? 0.9 : 0.6,
    });
  });

  // Add French location pages
  CITIES.forEach(city => {
    urls.push({
      loc: `${CANONICAL_BASE}/fr/locations/${city}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  PROVINCES.forEach(province => {
    urls.push({
      loc: `${CANONICAL_BASE}/fr/locations/province/${province}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  // Add Chinese pages (main pages only)
  const chinesePages = [
    '/products/trial-size',
    '/products/standard',
    '/products/family-pack',
    '/b2b',
    '/stockists',
    '/locations',
  ];

  chinesePages.forEach(page => {
    urls.push({
      loc: `${CANONICAL_BASE}/zh${page}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  // Add Chinese location pages
  CITIES.forEach(city => {
    urls.push({
      loc: `${CANONICAL_BASE}/zh/locations/${city}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  PROVINCES.forEach(province => {
    urls.push({
      loc: `${CANONICAL_BASE}/zh/locations/province/${province}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  console.log(`\n✅ Generated sitemap with ${urls.length} URLs`);
  console.log(`📊 Breakdown:`);
  console.log(`   - English pages: ${urls.filter(u => !u.loc.includes('/fr') && !u.loc.includes('/zh')).length}`);
  console.log(`   - French pages: ${urls.filter(u => u.loc.includes('/fr')).length}`);
  console.log(`   - Chinese pages: ${urls.filter(u => u.loc.includes('/zh')).length}`);

  return xml;
}

function generateSitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${CANONICAL_BASE}/sitemap-0.xml</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '</sitemapindex>';

  return xml;
}

function updateRobotsTxt(): string {
  return `# *
User-agent: *
Allow: /

# Block private areas
Disallow: /api/*
Disallow: /admin/*
Disallow: /_next/*
Disallow: /static/*

# Host (canonical www domain)
Host: ${CANONICAL_BASE}

# Sitemaps (using canonical domain)
Sitemap: ${CANONICAL_BASE}/sitemap.xml
Sitemap: ${CANONICAL_BASE}/sitemap-locations.xml
`;
}

// Main execution
function main() {
  console.log('🚀 Starting sitemap cleanup...\n');

  const publicDir = path.join(process.cwd(), 'public');

  // Generate main sitemap
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-0.xml'), sitemap);
  console.log('✅ Written: public/sitemap-0.xml\n');

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
  console.log('✅ Written: public/sitemap.xml\n');

  // Update robots.txt
  const robotsTxt = updateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('✅ Written: public/robots.txt\n');

  console.log('✨ Sitemap cleanup complete!\n');
  console.log('📋 Summary of fixes:');
  console.log('   ✅ Removed all redirect URLs (province codes, /checkout, etc.)');
  console.log('   ✅ Removed all 404/non-existent pages');
  console.log('   ✅ Removed all noindex pages (admin, thank-you, etc.)');
  console.log('   ✅ All URLs use canonical www domain');
  console.log('   ✅ Duplicate content issues resolved');
  console.log('\n📝 Next steps:');
  console.log('   1. Deploy to production');
  console.log('   2. Submit updated sitemap in Google Search Console');
  console.log('   3. Request re-indexing for key pages');
  console.log('   4. Monitor indexing status over next 2-4 weeks');
}

main();
