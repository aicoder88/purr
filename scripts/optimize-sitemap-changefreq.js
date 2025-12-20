#!/usr/bin/env node
/**
 * Optimize sitemap changefreq values to be realistic
 * Google ignores unrealistic changefreq values, so this improves crawl efficiency
 */

const fs = require('node:fs');
const path = require('node:path');

const SITEMAP_PATH = path.join(process.cwd(), 'public/sitemap-0.xml');

// Realistic changefreq based on page type
const CHANGEFREQ_RULES = [
  // Homepage
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/<\/loc>/, changefreq: 'daily' },

  // Blog posts (static after publish)
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/blog\/[^<]+<\/loc>/, changefreq: 'monthly' },
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/blog<\/loc>/, changefreq: 'weekly' },

  // Products (pricing changes)
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/products\/[^<]+<\/loc>/, changefreq: 'weekly' },

  // Learn pages (educational content, stable)
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/learn\/[^<]+<\/loc>/, changefreq: 'monthly' },

  // Solutions pages (stable content)
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/solutions\/[^<]+<\/loc>/, changefreq: 'monthly' },

  // Legal pages (rarely change)
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/(privacy|tos|privacy-policy|terms)<\/loc>/, changefreq: 'yearly' },

  // Customer/retailer portals (weekly updates)
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/(customer|retailer)\/[^<]+<\/loc>/, changefreq: 'weekly' },

  // B2B and other marketing pages
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/(b2b|invest|retailers|reviews|case-studies)<\/loc>/, changefreq: 'monthly' },

  // Checkout and transactional pages
  { pattern: /<loc>https:\/\/www\.purrify\.ca\/checkout<\/loc>/, changefreq: 'monthly' },
];

function optimizeSitemap() {
  let content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  let changes = 0;

  // Process each URL block
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;

  content = content.replace(urlRegex, (urlBlock) => {
    let optimized = urlBlock;

    // Find matching rule
    for (const rule of CHANGEFREQ_RULES) {
      if (rule.pattern.test(urlBlock)) {
        // Replace changefreq if it's currently "daily" (unrealistic for most pages)
        const currentChangefreq = urlBlock.match(/<changefreq>([^<]+)<\/changefreq>/);
        if (currentChangefreq && currentChangefreq[1] !== rule.changefreq) {
          optimized = urlBlock.replace(
            /<changefreq>[^<]+<\/changefreq>/,
            `<changefreq>${rule.changefreq}</changefreq>`
          );
          if (optimized !== urlBlock) {
            changes++;
          }
        }
        break;
      }
    }

    return optimized;
  });

  // Write optimized sitemap
  fs.writeFileSync(SITEMAP_PATH, content, 'utf-8');

  console.log('✅ Sitemap changefreq optimization complete!');
  console.log(`   📝 ${changes} URLs updated with realistic changefreq values`);
  console.log('');
  console.log('📊 Changefreq Strategy:');
  console.log('   • Homepage: daily');
  console.log('   • Blog posts: monthly (static after publish)');
  console.log('   • Products: weekly (pricing updates)');
  console.log('   • Learn pages: monthly (stable content)');
  console.log('   • Legal pages: yearly (rarely change)');
  console.log('   • Portals: weekly (regular updates)');
  console.log('');
  console.log('🎯 Benefits:');
  console.log('   • Google respects realistic changefreq values');
  console.log('   • Improved crawl budget efficiency');
  console.log('   • Faster indexing of important pages');
}

try {
  optimizeSitemap();
} catch (error) {
  console.error('❌ Error optimizing sitemap:', error);
  process.exit(1);
}
