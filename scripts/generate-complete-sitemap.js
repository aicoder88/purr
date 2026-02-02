#!/usr/bin/env node
/**
 * Comprehensive Sitemap Generator
 * Includes all static pages, dynamic blog posts, and location pages
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.purrify.ca';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Static routes with priority and changefreq
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/products', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/trial-size', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/standard', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/family-pack', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.8, changefreq: 'daily' },
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

// Hardcoded blog posts from app/blog/* directories
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

// 33 Canadian cities from cityOdorProfiles
const CITIES = [
  { slug: 'calgary', name: 'Calgary', province: 'Alberta' },
  { slug: 'edmonton', name: 'Edmonton', province: 'Alberta' },
  { slug: 'burnaby', name: 'Burnaby', province: 'British Columbia' },
  { slug: 'kelowna', name: 'Kelowna', province: 'British Columbia' },
  { slug: 'richmond', name: 'Richmond', province: 'British Columbia' },
  { slug: 'surrey', name: 'Surrey', province: 'British Columbia' },
  { slug: 'vancouver', name: 'Vancouver', province: 'British Columbia' },
  { slug: 'winnipeg', name: 'Winnipeg', province: 'Manitoba' },
  { slug: 'halifax', name: 'Halifax', province: 'Nova Scotia' },
  { slug: 'barrie', name: 'Barrie', province: 'Ontario' },
  { slug: 'brampton', name: 'Brampton', province: 'Ontario' },
  { slug: 'burlington', name: 'Burlington', province: 'Ontario' },
  { slug: 'guelph', name: 'Guelph', province: 'Ontario' },
  { slug: 'hamilton', name: 'Hamilton', province: 'Ontario' },
  { slug: 'kitchener', name: 'Kitchener', province: 'Ontario' },
  { slug: 'london', name: 'London', province: 'Ontario' },
  { slug: 'markham', name: 'Markham', province: 'Ontario' },
  { slug: 'mississauga', name: 'Mississauga', province: 'Ontario' },
  { slug: 'oakville', name: 'Oakville', province: 'Ontario' },
  { slug: 'oshawa', name: 'Oshawa', province: 'Ontario' },
  { slug: 'ottawa', name: 'Ottawa', province: 'Ontario' },
  { slug: 'richmond-hill', name: 'Richmond Hill', province: 'Ontario' },
  { slug: 'scarborough', name: 'Scarborough', province: 'Ontario' },
  { slug: 'toronto', name: 'Toronto', province: 'Ontario' },
  { slug: 'vaughan', name: 'Vaughan', province: 'Ontario' },
  { slug: 'windsor', name: 'Windsor', province: 'Ontario' },
  { slug: 'gatineau', name: 'Gatineau', province: 'Quebec' },
  { slug: 'laval', name: 'Laval', province: 'Quebec' },
  { slug: 'longueuil', name: 'Longueuil', province: 'Quebec' },
  { slug: 'montreal', name: 'Montreal', province: 'Quebec' },
  { slug: 'quebec-city', name: 'Quebec City', province: 'Quebec' },
  { slug: 'regina', name: 'Regina', province: 'Saskatchewan' },
  { slug: 'saskatoon', name: 'Saskatoon', province: 'Saskatchewan' },
];

// 7 Canadian provinces
const PROVINCES = [
  'alberta', 'british-columbia', 'manitoba', 'nova-scotia',
  'ontario', 'quebec', 'saskatchewan',
];

// Additional blog posts from sample data
const SAMPLE_BLOG_POSTS = [
  { slug: 'most-powerful-odor-absorber', date: '2024-01-15' },
  { slug: 'strong-cat-urine-smell-litter-box', date: '2024-01-20' },
  { slug: 'tried-everything-cat-litter-smell-solutions', date: '2024-01-25' },
  { slug: 'powder-vs-spray-litter-deodorizer', date: '2024-02-01' },
  { slug: 'tried-every-litter-deodorizer-90-days-results', date: '2024-02-05' },
  { slug: 'how-to-use-cat-litter-deodorizer', date: '2024-02-10' },
  { slug: 'multi-cat-litter-deodorizer-guide', date: '2024-02-15' },
  { slug: 'using-deodorizers-with-kittens', date: '2024-02-20' },
];

function generateSitemap() {
  const date = new Date().toISOString();
  const urls = [];

  // Add static routes
  for (const route of STATIC_ROUTES) {
    urls.push({
      loc: `${SITE_URL}${route.path}`,
      lastmod: date,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // Add static blog posts
  for (const slug of STATIC_BLOG_POSTS) {
    urls.push({
      loc: `${SITE_URL}/blog/${slug}`,
      lastmod: date,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Add sample blog posts
  for (const post of SAMPLE_BLOG_POSTS) {
    if (!STATIC_BLOG_POSTS.includes(post.slug)) {
      urls.push({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: new Date(post.date).toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
  }

  // Add city location pages
  for (const city of CITIES) {
    urls.push({
      loc: `${SITE_URL}/locations/${city.slug}`,
      lastmod: date,
      changefreq: 'weekly',
      priority: 0.6,
    });
  }

  // Add province pages
  for (const province of PROVINCES) {
    urls.push({
      loc: `${SITE_URL}/locations/province/${province}`,
      lastmod: date,
      changefreq: 'weekly',
      priority: 0.6,
    });
  }

  // Remove duplicates
  const uniqueUrls = [];
  const seen = new Set();
  for (const url of urls) {
    if (!seen.has(url.loc)) {
      seen.add(url.loc);
      uniqueUrls.push(url);
    }
  }

  // Sort by priority (descending), then by path
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
  const categories = {
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
