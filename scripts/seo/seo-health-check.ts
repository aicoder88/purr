#!/usr/bin/env ts-node

import { BrokenLinkDetector } from '../../src/lib/seo/broken-link-detector';
import { CanonicalValidator } from '../../src/lib/seo/canonical-validator';
import { RedirectAnalyzer } from '../../src/lib/seo/redirect-analyzer';
import { SitemapCleaner } from '../../src/lib/seo/sitemap-cleaner';
import { ReportGenerator, TechnicalSEOReport } from '../../src/lib/seo/report-generator';

const SITE_URL = process.env.SITE_URL || 'https://purrify.ca';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function runHealthCheck() {
  console.log('🔍 Starting Technical SEO Health Check...\n');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Sitemap: ${SITEMAP_URL}\n`);

  const startTime = Date.now();

  // Initialize components
  const brokenLinkDetector = new BrokenLinkDetector();
  const canonicalValidator = new CanonicalValidator();
  const redirectAnalyzer = new RedirectAnalyzer();
  const sitemapCleaner = new SitemapCleaner();
  const reportGenerator = new ReportGenerator();

  // 1. Check broken links (using sitemap for complete coverage)
  console.log('📋 Step 1/5: Checking for broken links...');
  const useSitemap = process.env.USE_SITEMAP !== 'false'; // Default to true
  const linkResult = await brokenLinkDetector.crawlSite(SITE_URL, useSitemap);
  console.log(`   Found ${linkResult.brokenLinks.length} broken links from ${linkResult.totalLinks} links\n`);

  // Add suggested fixes
  for (const link of linkResult.brokenLinks) {
    if (link.linkType === 'internal' && link.statusCode === 404) {
      const suggestion = await brokenLinkDetector.suggestReplacement(link.targetUrl);
      if (suggestion) {
        link.suggestedFix = suggestion;
      }
    }
  }

  // 2. Validate canonical tags
  console.log('📋 Step 2/5: Validating canonical tags...');
  const canonicalIssues = await canonicalValidator.validateCanonicals(SITE_URL);
  console.log(`   Found ${canonicalIssues.length} canonical issues\n`);

  // 3. Analyze redirect chains
  console.log('📋 Step 3/5: Analyzing redirect chains...');
  const redirectChains = await redirectAnalyzer.analyzeRedirects(SITE_URL);
  const problematicChains = redirectChains.filter(c => c.totalHops > 1 || c.chain.some(h => h.redirectType === 'temporary'));
  console.log(`   Found ${problematicChains.length} problematic redirect chains\n`);

  // 4. Validate sitemap
  console.log('📋 Step 4/5: Validating sitemap...');
  const sitemapIssues = await sitemapCleaner.validateSitemap(SITEMAP_URL);
  console.log(`   Found ${sitemapIssues.length} sitemap issues\n`);

  // 5. Check for redirects in sitemap
  console.log('📋 Step 5/5: Checking for redirects in sitemap...');
  const sitemapRedirects = await redirectAnalyzer.validateSitemapRedirects(SITE_URL, SITEMAP_URL);
  console.log(`   Found ${sitemapRedirects.length} redirecting URLs in sitemap\n`);

  // Calculate health score
  const totalUrls = linkResult.totalLinks;
  const totalIssues = linkResult.brokenLinks.length + canonicalIssues.length + problematicChains.length + sitemapIssues.length;
  const healthScore = Math.max(0, Math.round(100 - (totalIssues / totalUrls) * 100));

  // Generate comprehensive report
  const report: TechnicalSEOReport = {
    timestamp: new Date().toISOString(),
    summary: {
      totalUrls,
      brokenLinks: linkResult.brokenLinks.length,
      canonicalIssues: canonicalIssues.length,
      redirectChains: problematicChains.length,
      sitemapIssues: sitemapIssues.length,
      healthScore
    },
    brokenLinks: linkResult.brokenLinks,
    canonicalIssues,
    redirectChains: problematicChains,
    sitemapIssues: sitemapIssues.map(issue => ({
      url: issue.url,
      issue: issue.issue,
      action: issue.action,
      canonicalUrl: issue.canonicalUrl
    }))
  };

  // Generate reports
  reportGenerator.generateTechnicalSEOReport(report);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n⏱️  Health check completed in ${duration}s`);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Health Score: ${healthScore}% ${getHealthEmoji(healthScore)}`);
  console.log(`Total URLs: ${totalUrls}`);
  console.log(`Broken Links: ${linkResult.brokenLinks.length} ${linkResult.brokenLinks.length > 0 ? '❌' : '✅'}`);
  console.log(`Canonical Issues: ${canonicalIssues.length} ${canonicalIssues.length > 0 ? '⚠️' : '✅'}`);
  console.log(`Redirect Chains: ${problematicChains.length} ${problematicChains.length > 0 ? '⚠️' : '✅'}`);
  console.log(`Sitemap Issues: ${sitemapIssues.length} ${sitemapIssues.length > 0 ? '⚠️' : '✅'}`);
  console.log('='.repeat(60));

  // Exit with error code if critical issues found
  const criticalIssues = linkResult.brokenLinks.length + canonicalIssues.filter(i => i.issueType === 'points-to-redirect').length;
  if (criticalIssues > 0) {
    console.log(`\n❌ ${criticalIssues} critical issues found!`);
    process.exit(1);
  }

  console.log('\n✅ No critical issues found!');
  process.exit(0);
}

function getHealthEmoji(score: number): string {
  if (score >= 90) return '🟢';
  if (score >= 70) return '🟡';
  if (score >= 50) return '🟠';
  return '🔴';
}

// Run the health check
runHealthCheck().catch(error => {
  console.error('❌ Health check failed:', error);
  process.exit(1);
});
