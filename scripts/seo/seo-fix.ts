#!/usr/bin/env ts-node

import { SitemapCleaner } from '../src/lib/seo/sitemap-cleaner';
import fs from 'node:fs';

const SITEMAP_PATH = process.env.SITEMAP_PATH || 'public/sitemap.xml';

async function runFixes() {
  console.log('🔧 Starting SEO Automated Fixes...\n');

  const sitemapCleaner = new SitemapCleaner();

  // 1. Clean sitemap
  if (fs.existsSync(SITEMAP_PATH)) {
    console.log('📋 Cleaning sitemap...');
    const result = await sitemapCleaner.cleanSitemap(SITEMAP_PATH);

    console.log('\n✅ Sitemap cleaned:');
    console.log(`   Original URLs: ${result.originalUrls}`);
    console.log(`   Valid URLs: ${result.validUrls}`);
    console.log(`   Removed URLs: ${result.removedUrls}`);

    // Show what was removed
    if (result.issues.length > 0) {
      console.log('\n📝 Issues fixed:');
      const issueTypes = result.issues.reduce((acc, issue) => {
        acc[issue.issue] = (acc[issue.issue] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      for (const [type, count] of Object.entries(issueTypes)) {
        console.log(`   ${type}: ${count}`);
      }
    }

    // Check if sitemap needs splitting
    if (result.validUrls > 45000) {
      console.log('\n⚠️  Sitemap has more than 45,000 URLs, consider splitting...');
      const chunks = await sitemapCleaner.splitLargeSitemap(SITEMAP_PATH.replace('.xml', '-clean.xml'));
      console.log(`✅ Split into ${chunks.length} sitemaps`);
    }
  } else {
    console.log(`❌ Sitemap not found at ${SITEMAP_PATH}`);
  }

  console.log('\n✅ Automated fixes complete!');
  console.log('\n⚠️  Note: Broken links and canonical issues require manual review.');
  console.log('   Run `npm run seo:health-check` to see detailed reports.');
}

runFixes().catch(error => {
  console.error('❌ Fix script failed:', error);
  process.exit(1);
});
