#!/usr/bin/env node
/**
 * Optimized Sitemap Generator
 * Generates a clean, valid sitemap based on actual pages that exist
 *
 * Run: node scripts/seo/generate-optimized-sitemap.js
 */

const fs = require('node:fs');
const path = require('node:path');

const SITE_URL = 'https://www.purrify.ca';
const OUTPUT_DIR = path.join(process.cwd(), 'public');

// Cities that have location pages (from city-profile-seeds.json)
const CITIES = [
  'toronto', 'montreal', 'calgary', 'edmonton', 'ottawa', 'winnipeg',
  'mississauga', 'vancouver', 'brampton', 'scarborough', 'hamilton',
  'quebec-city', 'halifax', 'laval', 'london', 'markham', 'vaughan',
  'gatineau', 'saskatoon', 'kitchener', 'longueuil', 'windsor', 'regina',
  'oakville', 'richmond-hill', 'burlington', 'oshawa', 'barrie', 'kelowna',
  'guelph', 'surrey', 'burnaby', 'richmond'
];

// Provinces with stores (location pages exist)
const PROVINCES = [
  'alberta', 'british-columbia', 'manitoba', 'nova-scotia',
  'ontario', 'quebec', 'saskatchewan'
];

// Locales for different page types
const ALL_LOCALES = ['en', 'fr', 'zh', 'es'];
const LOCATION_LOCALES = ['en', 'fr', 'zh']; // es doesn't have location pages
const BLOG_LOCALES = ['en']; // Blog is English only

// Static pages with their locale support
const PAGES = {
  // High priority pages
  highPriority: [
    { path: '', priority: 1.0, changefreq: 'daily', locales: ALL_LOCALES },
    { path: '/products', priority: 0.9, changefreq: 'daily', locales: ALL_LOCALES },
    { path: '/products/trial-size', priority: 0.9, changefreq: 'weekly', locales: ALL_LOCALES },
    { path: '/products/standard', priority: 0.9, changefreq: 'weekly', locales: ALL_LOCALES },
    { path: '/products/family-pack', priority: 0.9, changefreq: 'weekly', locales: ALL_LOCALES },
  ],

  // Blog pages (English only)
  blog: [
    { path: '/blog', priority: 0.8, changefreq: 'weekly' },
    { path: '/blog/activated-carbon-litter-additive-benefits', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/activated-carbon-vs-baking-soda-comparison', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/best-litter-odor-remover-small-apartments', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/cat-litter-smell-worse-summer', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/cat-litter-smell-worse-winter', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/embarrassed-guests-visit-cat-litter-smell', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/house-smells-like-cat-litter-solutions', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/how-to-use-cat-litter-deodorizer', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/most-powerful-odor-absorber', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/multi-cat-litter-deodorizer-guide', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/powder-vs-spray-litter-deodorizer', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/strong-cat-urine-smell-litter-box', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/tried-every-litter-deodorizer-90-days-results', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/tried-everything-cat-litter-smell-solutions', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/using-deodorizers-with-kittens', priority: 0.8, changefreq: 'monthly' },
    { path: '/blog/space-station-secret-fresh-home-cat-owners', priority: 0.8, changefreq: 'monthly' },
  ],

  // Learn/educational pages
  learn: [
    { path: '/learn/how-it-works', priority: 0.8, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/faq', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/safety', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/science', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/activated-carbon-benefits', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/activated-carbon-vs-baking-soda-deodorizers', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/cat-litter-guide', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/how-to-use-deodorizer', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/using-deodorizers-with-kittens', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/ammonia-smell-cat-litter', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/apartment-cat-smell-solution', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/how-to-neutralize-ammonia-cat-litter', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/litter-box-smell-elimination', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/multiple-cats-odor-control', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/natural-cat-litter-additive', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/learn/solutions/senior-cat-litter-solutions', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
  ],

  // B2B and business pages
  business: [
    { path: '/b2b', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/b2b/sell-sheet', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
    { path: '/retailers', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/stockists', priority: 0.7, changefreq: 'weekly', locales: ALL_LOCALES },
    { path: '/shelters', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/groomers', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/hospitality', priority: 0.7, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/cat-cafes', priority: 0.7, changefreq: 'monthly', locales: ['en'] },
    { path: '/veterinarians', priority: 0.7, changefreq: 'monthly', locales: ['en'] },
    { path: '/affiliate', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
    { path: '/affiliate/signup', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
  ],

  // Other pages
  other: [
    { path: '/about/our-story', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
    { path: '/contact', priority: 0.6, changefreq: 'monthly', locales: ALL_LOCALES },
    { path: '/reviews', priority: 0.7, changefreq: 'weekly', locales: ALL_LOCALES },
    { path: '/results', priority: 0.7, changefreq: 'monthly', locales: ['en'] },
    { path: '/case-studies', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
    { path: '/support', priority: 0.5, changefreq: 'monthly', locales: ['en'] },
    { path: '/support/shipping', priority: 0.5, changefreq: 'monthly', locales: ['en'] },
    { path: '/buy', priority: 0.8, changefreq: 'daily', locales: ['en'] },
    { path: '/free-trial', priority: 0.8, changefreq: 'weekly', locales: ['en'] },
    { path: '/try-free', priority: 0.8, changefreq: 'weekly', locales: ['en'] },
    { path: '/referral', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
    { path: '/ammonia-control', priority: 0.7, changefreq: 'monthly', locales: ['en'] },
    { path: '/invest', priority: 0.5, changefreq: 'monthly', locales: ['en'] },
    { path: '/us', priority: 0.85, changefreq: 'weekly', locales: ['en'] },
    { path: '/es/opiniones', priority: 0.7, changefreq: 'weekly', locales: ['es'] },
    { path: '/tools/cat-litter-calculator', priority: 0.6, changefreq: 'monthly', locales: ['en'] },
  ],

  // Legal pages
  legal: [
    { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly', locales: ALL_LOCALES },
    { path: '/terms', priority: 0.3, changefreq: 'yearly', locales: ALL_LOCALES },
  ],
};

function getLocalePath(basePath, locale) {
  if (locale === 'en') return basePath || '/';
  if (basePath.startsWith(`/${locale}/`)) return basePath; // Already localized
  return `/${locale}${basePath}`;
}

function generateUrl(path, priority, changefreq, lastmod, alternates = []) {
  const loc = `${SITE_URL}${path === '/' ? '' : path}`;
  let alternateLinks = '';

  if (alternates.length > 0) {
    alternateLinks = alternates.map(alt =>
      `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
    ).join('\n    ');
  }

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${alternateLinks}
  </url>`;
}

function generateSitemap() {
  const lastmod = new Date().toISOString();
  const urls = [];

  // Generate URLs for static pages with locale support
  for (const category of Object.values(PAGES)) {
    for (const page of category) {
      const locales = page.locales || ['en'];

      for (const locale of locales) {
        const localePath = getLocalePath(page.path, locale);

        // Generate alternate links for this page
        const alternates = locales.length > 1 ? locales.map(l => ({
          hreflang: l === 'en' ? 'en-CA' : l === 'fr' ? 'fr-CA' : l === 'zh' ? 'zh-CN' : l,
          href: `${SITE_URL}${getLocalePath(page.path, l) === '/' ? '' : getLocalePath(page.path, l)}`
        })).concat([{
          hreflang: 'x-default',
          href: `${SITE_URL}${page.path === '' ? '' : page.path}`
        }]) : [];

        urls.push(generateUrl(localePath, page.priority, page.changefreq, lastmod, alternates));
      }
    }
  }

  // Generate location index pages
  for (const locale of LOCATION_LOCALES) {
    const path = getLocalePath('/locations', locale);
    urls.push(generateUrl(path, 0.7, 'weekly', lastmod));
  }

  // Generate province pages
  for (const province of PROVINCES) {
    for (const locale of LOCATION_LOCALES) {
      const path = getLocalePath(`/locations/province/${province}`, locale);
      urls.push(generateUrl(path, 0.6, 'monthly', lastmod));
    }
  }

  // Generate city pages
  for (const city of CITIES) {
    for (const locale of LOCATION_LOCALES) {
      const path = getLocalePath(`/locations/${city}`, locale);
      urls.push(generateUrl(path, 0.6, 'monthly', lastmod));
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return sitemap;
}

function generateSitemapIndex() {
  const lastmod = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-0.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
}

function main() {
  console.log('Generating optimized sitemap...');

  // Generate main sitemap
  const sitemap = generateSitemap();
  const sitemapPath = path.join(OUTPUT_DIR, 'sitemap-0.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Written: ${sitemapPath}`);

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex();
  const indexPath = path.join(OUTPUT_DIR, 'sitemap.xml');
  fs.writeFileSync(indexPath, sitemapIndex);
  console.log(`Written: ${indexPath}`);

  // Count URLs
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`\nGenerated ${urlCount} URLs in sitemap`);
  console.log('Done!');
}

main();
