#!/usr/bin/env ts-node
/**
 * Comprehensive Sitemap Generator
 * Includes all static pages, dynamic blog posts, and location pages
 */

import fs from 'fs';
import path from 'path';
import { getAllCities } from '../src/data/locations';
import { sampleBlogPosts } from '../src/data/blog-posts';

const SITE_URL = 'https://www.purrify.ca';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Routes to exclude from sitemap
const EXCLUDED_PATHS = new Set([
  '/buy', '/free', '/free-trial', '/montreal',
  '/admin', '/customer', '/affiliate/dashboard', '/retailer/portal/login',
  '/api', '/offline', '/thank-you', '/results', '/documents', '/refer',
  '/tools/cat-litter-calculator', '/dialergptpitchdeck', '/invest', '/viral',
]);

interface RouteConfig {
  path: string;
  priority: number;
  changefreq: string;
}

const STATIC_ROUTES: RouteConfig[] = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/products', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/trial-size', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/standard', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/family-pack', priority: 0.9, changefreq: 'weekly' },
  { path: '/en/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/fr/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/es/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/zh/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/reviews', priority: 0.8, changefreq: 'weekly' },
  { path: '/us', priority: 0.85, changefreq: 'weekly' },
  { path: '/canada', priority: 0.8, changefreq: 'weekly' },
  { path: '/learn/how-it-works', priority: 0.8, changefreq: 'monthly' },
  { path: '/learn/faq', priority: 0.8, changefreq: 'weekly' },
  { path: '/learn/science', priority: 0.8, changefreq: 'monthly' },
  { path: '/learn/cat-litter-guide', priority: 0.8, changefreq: 'monthly' },
  { path: '/learn/safety', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/activated-carbon-benefits', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/how-to-use-deodorizer', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/glossary', priority: 0.6, changefreq: 'monthly' },
  { path: '/learn/using-deodorizers-with-kittens', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/activated-carbon-vs-baking-soda-deodorizers', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/ammonia-science', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/cat-litter-ammonia-health-risks', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/how-activated-carbon-works', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/solutions', priority: 0.7, changefreq: 'weekly' },
  { path: '/learn/solutions/ammonia-smell-cat-litter', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/solutions/apartment-cat-smell-solution', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/solutions/how-to-neutralize-ammonia-cat-litter', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/solutions/litter-box-smell-elimination', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/solutions/multiple-cats-odor-control', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/solutions/natural-cat-litter-additive', priority: 0.7, changefreq: 'monthly' },
  { path: '/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/about/our-story', priority: 0.6, changefreq: 'monthly' },
  { path: '/case-studies', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/support', priority: 0.6, changefreq: 'weekly' },
  { path: '/support/shipping', priority: 0.6, changefreq: 'monthly' },
  { path: '/support/subscription', priority: 0.6, changefreq: 'monthly' },
  { path: '/b2b', priority: 0.7, changefreq: 'weekly' },
  { path: '/b2b/sell-sheet', priority: 0.6, changefreq: 'monthly' },
  { path: '/retailers', priority: 0.7, changefreq: 'weekly' },
  { path: '/stores', priority: 0.6, changefreq: 'weekly' },
  { path: '/cat-cafes', priority: 0.6, changefreq: 'monthly' },
  { path: '/groomers', priority: 0.6, changefreq: 'monthly' },
  { path: '/shelters', priority: 0.6, changefreq: 'monthly' },
  { path: '/veterinarians', priority: 0.6, changefreq: 'monthly' },
  { path: '/hospitality', priority: 0.6, changefreq: 'monthly' },
  { path: '/science', priority: 0.6, changefreq: 'monthly' },
  { path: '/ammonia-control', priority: 0.7, changefreq: 'monthly' },
  { path: '/locations', priority: 0.7, changefreq: 'weekly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'monthly' },
  { path: '/terms', priority: 0.3, changefreq: 'monthly' },
  { path: '/try-free', priority: 0.8, changefreq: 'weekly' },
  // Localized pages
  { path: '/es/opiniones', priority: 0.7, changefreq: 'weekly' },
  { path: '/es', priority: 0.9, changefreq: 'daily' },
  { path: '/fr', priority: 0.9, changefreq: 'daily' },
  { path: '/zh', priority: 0.9, changefreq: 'daily' },
  { path: '/fr/privacy-policy', priority: 0.3, changefreq: 'monthly' },
  { path: '/fr/terms', priority: 0.3, changefreq: 'monthly' },
  { path: '/es/privacy-policy', priority: 0.3, changefreq: 'monthly' },
  { path: '/es/terms', priority: 0.3, changefreq: 'monthly' },
  { path: '/es/contact', priority: 0.5, changefreq: 'monthly' },
  { path: '/es/learn/how-it-works', priority: 0.6, changefreq: 'monthly' },
  { path: '/es/learn/faq', priority: 0.6, changefreq: 'monthly' },
  { path: '/es/products/trial-size', priority: 0.85, changefreq: 'weekly' },
  { path: '/es/products/standard', priority: 0.85, changefreq: 'weekly' },
  { path: '/es/products/family-pack', priority: 0.85, changefreq: 'weekly' },
];

const STATIC_BLOG_POSTS = [
  'activated-carbon-litter-additive-benefits',
  'activated-carbon-vs-baking-soda-comparison',
  'activated-carbon-vs-zeolite',
  'activated-carbon-vs-zeolite-cat-litter',
  'best-litter-odor-remover-small-apartments',
  'best-odor-control-litter-2026',
  'cat-litter-additive-comparison-2026',
  'cat-litter-odor-myths',
  'cat-litter-smell-wont-go-away',
  'cat-litter-smell-worse-summer',
  'cat-litter-smell-worse-winter',
  'embarrassed-guests-visit-cat-litter-smell',
  'fresh-step-vs-arm-hammer-comparison',
  'house-smells-like-cat-litter-solutions',
];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function generateSitemap() {
  const date = new Date().toISOString();
  const urls: SitemapUrl[] = [];

  // Add static routes
  for (const route of STATIC_ROUTES) {
    urls.push({
      loc: `${SITE_URL}${route.path}`,
      lastmod: date,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // Add static blog posts (Fix: Use /en prefix)
  for (const slug of STATIC_BLOG_POSTS) {
    urls.push({
      loc: `${SITE_URL}/en/blog/${slug}`,
      lastmod: date,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Add sample blog posts
  if (sampleBlogPosts && Array.isArray(sampleBlogPosts)) {
    for (const post of sampleBlogPosts) {
      if (post.link && post.link.startsWith('/blog/')) {
        const slug = post.link.replace('/blog/', '');
        if (!STATIC_BLOG_POSTS.includes(slug)) {
          // Normalize to /en/blog
          const normalizedLink = post.link.startsWith('/en/blog/')
            ? post.link
            : `/en${post.link}`;

          urls.push({
            loc: `${SITE_URL}${normalizedLink}`,
            lastmod: post.date ? new Date(post.date).toISOString() : date,
            changefreq: 'weekly',
            priority: 0.7,
          });
        }
      }
    }
  }

  // Add city location pages
  try {
    const cities = getAllCities();
    for (const city of cities) {
      if (city.slug && city.profile?.indexed !== false) {
        urls.push({
          loc: `${SITE_URL}/locations/${city.slug}`,
          lastmod: date,
          changefreq: 'weekly',
          priority: 0.6,
        });
      }
    }
    console.log(`✓ Added ${cities.length} city location pages`);
  } catch (err) {
    console.warn('⚠ Could not load city locations:', (err as Error).message);
  }

  // Add province pages
  const provinces = [
    'alberta', 'british-columbia', 'manitoba', 'nova-scotia',
    'ontario', 'quebec', 'saskatchewan',
  ];
  for (const province of provinces) {
    urls.push({
      loc: `${SITE_URL}/locations/province/${province}`,
      lastmod: date,
      changefreq: 'weekly',
      priority: 0.6,
    });
  }

  // Remove duplicates
  const uniqueUrls: SitemapUrl[] = [];
  const seen = new Set<string>();
  for (const url of urls) {
    if (!seen.has(url.loc)) {
      seen.add(url.loc);
      uniqueUrls.push(url);
    }
  }

  // Sort by priority, then by path
  uniqueUrls.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.loc.localeCompare(b.loc);
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of uniqueUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

  console.log('\n✅ Sitemap generated successfully!');
  console.log(`   Total URLs: ${uniqueUrls.length}`);
  console.log(`   Output: ${OUTPUT_FILE}\n`);

  // Print summary
  const categories: Record<string, number> = {
    'Homepage': uniqueUrls.filter(u => u.loc === SITE_URL + '/').length,
    'Products': uniqueUrls.filter(u => u.loc.includes('/products')).length,
    'Blog Posts': uniqueUrls.filter(u => u.loc.includes('/blog/') && !u.loc.includes('/category') && !u.loc.includes('/tag')).length,
    'Learn Pages': uniqueUrls.filter(u => u.loc.includes('/learn/')).length,
    'Location Pages': uniqueUrls.filter(u => u.loc.includes('/locations/')).length,
    'B2B Pages': uniqueUrls.filter(u => ['/b2b', '/retailers', '/stores', '/cat-cafes', '/groomers', '/shelters', '/veterinarians', '/hospitality'].some(p => u.loc.includes(p))).length,
    'Localized (FR/ZH/ES)': uniqueUrls.filter(u => u.loc.includes('/fr/') || u.loc.includes('/zh/') || u.loc.includes('/es/')).length,
    'Other': 0,
  };
  categories['Other'] = uniqueUrls.length - Object.values(categories).reduce((a, b) => a + b, 0);

  console.log('Breakdown by category:');
  for (const [cat, count] of Object.entries(categories)) {
    if (count > 0) console.log(`   ${cat}: ${count}`);
  }

  return uniqueUrls.length;
}

// Execute
try {
  generateSitemap();
} catch (err) {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
}
