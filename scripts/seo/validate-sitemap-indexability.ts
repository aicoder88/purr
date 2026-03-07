import { validateGeneratedSitemapIndexability } from './lib/sitemap-indexability-validator';

async function main() {
  const result = await validateGeneratedSitemapIndexability();

  console.log('🧭 Sitemap Indexability Validation\n');
  console.log(`Checked URLs: ${result.checkedUrls}`);
  console.log(`Redirects: ${result.stats.redirects}`);
  console.log(`Missing routes: ${result.stats.missing}`);
  console.log(`Noindex URLs: ${result.stats.noindex}`);
  console.log(`Canonical mismatches: ${result.stats.nonCanonical}`);
  console.log(`Allowlisted canonical mismatches: ${result.stats.allowlistedCanonicalMismatches}`);
  console.log();

  if (result.passed) {
    console.log('✅ Sitemap indexability validation PASSED');
    return;
  }

  console.error('❌ Sitemap indexability validation FAILED\n');
  for (const issue of result.issues) {
    const details = [
      issue.routeFile ? `route=${issue.routeFile}` : null,
      issue.redirectDestination ? `destination=${issue.redirectDestination}` : null,
      issue.canonicalUrl ? `canonical=${issue.canonicalUrl}` : null,
    ].filter(Boolean).join(' ');

    console.error(`- ${issue.url} [${issue.type}] ${issue.message}${details ? ` (${details})` : ''}`);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error('Fatal sitemap indexability validation error:', error);
  process.exit(1);
});
