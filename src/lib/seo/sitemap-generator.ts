/**
 * Dynamic Sitemap Generation System
 * Generates comprehensive sitemaps for all indexable pages
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'fast-glob';

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export interface SitemapConfig {
  siteUrl: string;
  changefreq?: SitemapEntry['changefreq'];
  priority?: number;
  exclude?: string[];
}

/**
 * Page type priority and changefreq settings
 */
const PAGE_SETTINGS: Record<string, { priority: number; changefreq: SitemapEntry['changefreq'] }> = {
  homepage: { priority: 1.0, changefreq: 'daily' },
  products: { priority: 0.9, changefreq: 'weekly' },
  blog: { priority: 0.8, changefreq: 'weekly' },
  learn: { priority: 0.75, changefreq: 'monthly' },
  locations: { priority: 0.6, changefreq: 'monthly' },
  legal: { priority: 0.3, changefreq: 'yearly' },
  default: { priority: 0.7, changefreq: 'monthly' },
};

/**
 * Determine page type from route
 */
function getPageType(route: string): keyof typeof PAGE_SETTINGS {
  if (route === '/' || route === '') return 'homepage';
  if (route.startsWith('/products/')) return 'products';
  if (route.startsWith('/blog/') || route === '/blog') return 'blog';
  if (route.startsWith('/learn/')) return 'learn';
  if (route.startsWith('/locations/')) return 'locations';
  if (route.includes('privacy') || route.includes('terms')) return 'legal';
  return 'default';
}

/**
 * Get all blog post slugs from content directory
 */
export async function getBlogPostSlugs(locale: string = 'en'): Promise<string[]> {
  const contentDir = path.join(process.cwd(), 'content', 'blog', locale);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = await glob('*.json', {
    cwd: contentDir,
    absolute: false,
  });

  return files.map(file => path.basename(file, '.json'));
}

/**
 * Get all static pages from pages directory
 */
export async function getStaticPages(): Promise<string[]> {
  const pagesDir = path.join(process.cwd(), 'pages');

  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    cwd: pagesDir,
    ignore: [
      '**/_*.{tsx,ts,jsx,js}',
      '**/api/**',
      '**/*.d.ts',
      '**/[*.{tsx,ts,jsx,js}', // Ignore dynamic route files
    ],
  });

  return files.map(file => {
    // Convert file path to route
    let route = '/' + file
      .replace(/\.(tsx|ts|jsx|js)$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');

    // Normalize route
    if (route === '/') route = '';
    if (route && !route.startsWith('/')) route = '/' + route;

    return route;
  });
}

/**
 * Get all location page routes
 */
export async function getLocationPages(): Promise<string[]> {
  const locations: string[] = [
    // English locations (indexed)
    '/locations/british-columbia',
    '/locations/ontario',
    '/locations/quebec',
    '/locations/alberta',
    '/locations/manitoba',
    '/locations/saskatchewan',
    '/locations/nova-scotia',
    '/locations/new-brunswick',
    '/locations/newfoundland-and-labrador',
    '/locations/prince-edward-island',
    '/locations/northwest-territories',
    '/locations/yukon',
    '/locations/nunavut',
    // City pages (top cities)
    '/locations/toronto',
    '/locations/montreal',
    '/locations/vancouver',
    '/locations/calgary',
    '/locations/edmonton',
    '/locations/ottawa',
    '/locations/winnipeg',
    '/locations/quebec-city',
    '/locations/hamilton',
    '/locations/kitchener',
  ];

  return locations;
}

/**
 * Check if a route should be excluded from sitemap
 */
export function shouldExclude(route: string, excludePatterns: string[]): boolean {
  // Always exclude these patterns
  const alwaysExclude = [
    '/api/',
    '/admin/',
    '/_next/',
    '/static/',
    '/404',
    '/500',
    '/offline',

    '/server-sitemap',

    // === REDIRECTING PAGES (3XX) ===
    '/thank-you',
    '/checkout',
    '/cart-2',
    '/free',
    '/test',
    '/demo/',
    '/free-trial',
    '/buy',
    '/about',
    '/montreal',
    '/support/contact',
    '/documents',
    // Legacy redirects
    '/products/compare',
    '/products/purrify-20g',
    '/products/purrify-50g',
    '/products/purrify-120g',
    '/products/medium-size',
    '/products/large-size',
    '/products/family',
    '/solutions',
    '/customers',
    '/customers/testimonials',
    '/customers/case-studies',
    '/support/subscription',
    // Common 404 patterns that redirect
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
    '/trial',

    // Old province abbreviations (redirects)
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

    // === NOINDEX PAGES (protected portals) ===
    '/affiliate/dashboard',
    '/affiliate/login',
    '/affiliate/activate',
    '/affiliate/signup',
    '/customer/portal',
    '/customer/referrals',
    '/retailer/portal',
    '/results',
    '/auth/signin',
    '/affiliate/forgot-password',

    // Non-English location pages (noindexed)
    '/fr/locations',
  ];

  const allExcludePatterns = [...alwaysExclude, ...excludePatterns];

  return allExcludePatterns.some(pattern => {
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1);
      return route.startsWith(prefix);
    }
    if (pattern.endsWith('/')) {
      return route.startsWith(pattern);
    }
    return route === pattern || route.startsWith(pattern + '/');
  });
}

/**
 * Generate sitemap entries for all pages
 */
export async function generateSitemapEntries(config: SitemapConfig): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  const { siteUrl, exclude = [] } = config;

  // Get all static pages
  const staticPages = await getStaticPages();

  // Add static pages (excluding blog posts which we'll add dynamically)
  for (const route of staticPages) {
    if (shouldExclude(route, exclude)) continue;

    // Skip individual blog post routes - we'll add them from content directory
    if (route.match(/^\/blog\/[^/]+$/) || route.match(/^\/(fr)\/blog\/[^/]+$/)) {
      continue;
    }

    const pageType = getPageType(route);
    const settings = PAGE_SETTINGS[pageType];

    entries.push({
      loc: `${siteUrl}${route}`,
      lastmod: new Date().toISOString(),
      changefreq: settings.changefreq,
      priority: settings.priority,
    });
  }

  // Add blog posts for all locales
  const locales = ['en', 'fr'];
  for (const locale of locales) {
    const slugs = await getBlogPostSlugs(locale);
    const prefix = locale === 'en' ? '' : `/${locale}`;

    for (const slug of slugs) {
      const route = `${prefix}/blog/${slug}`;
      if (shouldExclude(route, exclude)) continue;

      entries.push({
        loc: `${siteUrl}${route}`,
        lastmod: new Date().toISOString(),
        changefreq: PAGE_SETTINGS.blog.changefreq,
        priority: PAGE_SETTINGS.blog.priority,
      });
    }
  }

  // Add location pages
  const locationPages = await getLocationPages();
  for (const route of locationPages) {
    if (shouldExclude(route, exclude)) continue;

    entries.push({
      loc: `${siteUrl}${route}`,
      lastmod: new Date().toISOString(),
      changefreq: PAGE_SETTINGS.locations.changefreq,
      priority: PAGE_SETTINGS.locations.priority,
    });
  }

  return entries;
}

/**
 * Convert sitemap entries to XML format
 */
export function entriesToXML(entries: SitemapEntry[]): string {
  const urlsets = entries.map(entry => {
    const alternatesXML = entry.alternates
      ? entry.alternates.map(alt =>
        `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
      ).join('\n')
      : '';

    return `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `
    <lastmod>${entry.lastmod}</lastmod>` : ''}${entry.changefreq ? `
    <changefreq>${entry.changefreq}</changefreq>` : ''}${entry.priority !== undefined ? `
    <priority>${entry.priority.toFixed(1)}</priority>` : ''}${alternatesXML ? `\n${alternatesXML}` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsets}
</urlset>`;
}

/**
 * Generate sitemap index XML
 */
export function generateSitemapIndex(sitemapUrls: string[]): string {
  const lastmod = new Date().toISOString();

  const sitemaps = sitemapUrls.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

/**
 * Split entries into multiple sitemaps if needed (max 50,000 URLs per sitemap)
 */
export function splitSitemapEntries(entries: SitemapEntry[], maxEntries: number = 50000): SitemapEntry[][] {
  const chunks: SitemapEntry[][] = [];

  for (let i = 0; i < entries.length; i += maxEntries) {
    chunks.push(entries.slice(i, i + maxEntries));
  }

  return chunks;
}

/**
 * Write sitemap files to disk
 */
export async function writeSitemaps(
  entries: SitemapEntry[],
  outputDir: string,
  siteUrl: string
): Promise<string[]> {
  const chunks = splitSitemapEntries(entries);
  const sitemapFiles: string[] = [];

  // Write individual sitemap files
  for (let i = 0; i < chunks.length; i++) {
    const filename = chunks.length === 1 ? 'sitemap.xml' : `sitemap-${i}.xml`;
    const filepath = path.join(outputDir, filename);
    const xml = entriesToXML(chunks[i]);

    fs.writeFileSync(filepath, xml, 'utf-8');
    sitemapFiles.push(`${siteUrl}/${filename}`);

    // Sitemap file generated
  }

  // Write sitemap index if multiple sitemaps
  if (chunks.length > 1) {
    const indexPath = path.join(outputDir, 'sitemap.xml');
    const indexXML = generateSitemapIndex(sitemapFiles);
    fs.writeFileSync(indexPath, indexXML, 'utf-8');
    // Sitemap index generated
  }

  return sitemapFiles;
}
