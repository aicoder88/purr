#!/usr/bin/env tsx
/**
 * Dynamic Sitemap Generation Script
 * Generates comprehensive sitemaps for all indexable pages
 */

import * as path from 'path';
import {
  generateSitemapEntries,
  writeSitemaps,
  SitemapConfig,
} from '../src/lib/seo/sitemap-generator';

const SITE_URL = 'https://www.purrify.ca';
const OUTPUT_DIR = path.join(process.cwd(), 'public');

async function main() {
  console.log('🗺️  Generating dynamic sitemap...\n');

  const config: SitemapConfig = {
    siteUrl: SITE_URL,
    exclude: [
      // Additional exclusions beyond the defaults
    ],
  };

  try {
    // Generate sitemap entries
    console.log('📄 Scanning pages...');
    const entries = await generateSitemapEntries(config);
    console.log(`   Found ${entries.length} indexable pages\n`);

    // Write sitemap files
    console.log('✍️  Writing sitemap files...');
    const sitemapFiles = await writeSitemaps(entries, OUTPUT_DIR, SITE_URL);

    console.log(`\n✅ Sitemap generation complete!`);
    console.log(`   Total URLs: ${entries.length}`);
    console.log(`   Sitemap files: ${sitemapFiles.length}`);
    console.log(`   Output: ${OUTPUT_DIR}`);

    // Summary by page type
    const byType: Record<string, number> = {};
    entries.forEach(entry => {
      const url = entry.loc.replace(SITE_URL, '');
      let type = 'other';
      if (url === '' || url === '/') type = 'homepage';
      else if (url.includes('/blog/')) type = 'blog';
      else if (url.includes('/products/')) type = 'products';
      else if (url.includes('/learn/')) type = 'learn';
      else if (url.includes('/locations/')) type = 'locations';
      else if (url.includes('/fr/')) type = 'french';
      else if (url.includes('/zh/')) type = 'chinese';
      else if (url.includes('/es/')) type = 'spanish';

      byType[type] = (byType[type] || 0) + 1;
    });

    console.log('\n📊 URLs by type:');
    Object.entries(byType)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`   ${type.padEnd(15)} ${count}`);
      });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Sitemap generation failed:', error);
    process.exit(1);
  }
}

main();
