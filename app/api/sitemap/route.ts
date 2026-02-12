import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const revalidate = 86400;

// === EXCLUDED URLS - Fix for Ahrefs sitemap issues ===
const EXCLUDED_URLS = [
  // 3XX Redirects
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
  '/solutions',
  '/customers',
  '/customers/testimonials',
  '/customers/case-studies',
  '/support/subscription',

  // Noindex pages (protected portals)
  '/affiliate/dashboard',
  '/affiliate/login',
  '/affiliate/activate',
  '/affiliate/signup',
  '/customer/portal',
  '/customer/referrals',
  '/retailer/portal/login',
  '/results',
  '/admin',
  '/thank-you',
  '/thank-you/upsell',

  // Non-canonical pages
  '/es/opiniones',
];

// === ADDITIONAL INDEXABLE PAGES - Fix for "Indexable page not in sitemap" ===
const ADDITIONAL_URLS = [
  // Locale homepages (Implemented via app/[locale]/page.tsx)
  { loc: '/fr/', priority: '0.9', changefreq: 'daily' },
  { loc: '/zh/', priority: '0.9', changefreq: 'daily' },
  { loc: '/es/', priority: '0.9', changefreq: 'daily' },
  { loc: '/us/', priority: '0.85', changefreq: 'weekly' },

  // Blog locale pages (Implemented via app/[locale]/blog/page.tsx)
  { loc: '/fr/blog/', priority: '0.7', changefreq: 'weekly' },
  { loc: '/zh/blog/', priority: '0.7', changefreq: 'weekly' },
  { loc: '/es/blog/', priority: '0.7', changefreq: 'weekly' },

  // Learn answers pages (important for SEO)
  { loc: '/learn/cat-litter-answers/', priority: '0.7', changefreq: 'weekly' },
  { loc: '/learn/answers/does-activated-carbon-work-for-cat-litter/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/how-do-i-keep-my-house-from-smelling-like-cat-litter/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/how-do-i-stop-my-cat-litter-from-smelling/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/how-often-should-i-change-cat-litter/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/how-to-eliminate-cat-litter-odor/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/how-to-keep-litter-box-from-smelling/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/is-it-safe-to-sleep-in-a-room-with-cat-litter/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/what-absorbs-cat-litter-odor/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/what-cat-litter-controls-odor-best/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/what-eliminates-cat-litter-odor/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/why-does-cat-litter-smell-worse-in-summer/', priority: '0.6', changefreq: 'monthly' },
  { loc: '/learn/answers/why-does-my-house-smell-like-cat-pee/', priority: '0.6', changefreq: 'monthly' },

  // Other important pages
  { loc: '/try-free/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/canada/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/science/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/ammonia-control/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/viral/', priority: '0.6', changefreq: 'weekly' },
  { loc: '/pos/', priority: '0.6', changefreq: 'monthly' },
];

export async function GET() {
  try {
    // Read the existing sitemap.xml from public folder
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    let sitemapContent: string;

    if (fs.existsSync(sitemapPath)) {
      sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    } else {
      // Generate a basic sitemap if the file doesn't exist
      sitemapContent = generateBasicSitemap();
    }

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (err) {
    console.error('Error serving sitemap:', err);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}

function generateBasicSitemap(): string {
  const baseUrl = 'https://www.purrify.ca';

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/products/trial-size/', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/standard/', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/family-pack/', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/', priority: '0.85', changefreq: 'weekly' },
    { loc: '/es/products/trial-size/', priority: '0.85', changefreq: 'weekly' },
    { loc: '/es/products/standard/', priority: '0.85', changefreq: 'weekly' },
    { loc: '/es/products/family-pack/', priority: '0.85', changefreq: 'weekly' },
    { loc: '/us/', priority: '0.85', changefreq: 'weekly' },
    { loc: '/canada/', priority: '0.8', changefreq: 'weekly' },
    { loc: '/try-free/', priority: '0.8', changefreq: 'weekly' },
    { loc: '/learn/how-it-works/', priority: '0.8', changefreq: 'monthly' },
    { loc: '/learn/faq/', priority: '0.8', changefreq: 'weekly' },
    { loc: '/en/blog/', priority: '0.8', changefreq: 'daily' },
    { loc: '/fr/blog/', priority: '0.8', changefreq: 'daily' },
    { loc: '/es/blog/', priority: '0.8', changefreq: 'daily' },
    { loc: '/zh/blog/', priority: '0.8', changefreq: 'daily' },
    { loc: '/learn/', priority: '0.75', changefreq: 'weekly' },
    { loc: '/es/learn/how-it-works/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/es/learn/faq/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/fr/learn/how-it-works/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/fr/learn/faq/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/learn/solutions/', priority: '0.75', changefreq: 'weekly' },
    { loc: '/reviews/', priority: '0.7', changefreq: 'weekly' },
    { loc: '/es/reviews/', priority: '0.7', changefreq: 'weekly' },
    { loc: '/case-studies/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/stores/', priority: '0.7', changefreq: 'weekly' },
    { loc: '/retailers/', priority: '0.7', changefreq: 'weekly' },
    { loc: '/b2b/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/about/our-story/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/support/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/privacy-policy/', priority: '0.3', changefreq: 'monthly' },
    { loc: '/terms/', priority: '0.3', changefreq: 'monthly' },
    // Blog posts (Fix: Use /en prefix for English)
    { loc: '/en/blog/activated-carbon-litter-additive-benefits/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/en/blog/how-to-use-cat-litter-deodorizer/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/en/blog/best-litter-odor-remover-small-apartments/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/en/blog/using-deodorizers-with-kittens/', priority: '0.6', changefreq: 'monthly' },
    { loc: '/en/blog/activated-carbon-vs-baking-soda-comparison/', priority: '0.6', changefreq: 'monthly' },
    // Locale homepages (FIX: indexable pages not in sitemap)
    { loc: '/fr/', priority: '0.9', changefreq: 'daily' },
    { loc: '/es/', priority: '0.9', changefreq: 'daily' },
    { loc: '/zh/', priority: '0.9', changefreq: 'daily' },
  ];

  // Add additional URLs for missing indexable pages
  urls.push(...ADDITIONAL_URLS);

  // Filter out excluded URLs
  const filteredUrls = urls.filter(url => !EXCLUDED_URLS.includes(url.loc));

  const lastmod = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  filteredUrls.forEach(url => {
    // Ensure trailing slash
    const loc = url.loc.endsWith('/') ? url.loc : `${url.loc}/`;
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}
