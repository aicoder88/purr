/**
 * Canonical URL Validation CLI
 * Validates canonical URLs and OG tags across all pages
 */

import {
  validateAllCanonicals,
  generateCanonicalReport,
} from './lib/canonical-validator';
import * as fs from 'fs';
import * as path from 'path';
import { getSeoSiteUrl } from './lib/site-config';

async function main() {
  const args = process.argv.slice(2);
  const generateReportFile = args.includes('--report');
  const failOnError = args.includes('--fail-on-error');
  const failOnWarning = args.includes('--fail-on-warning');
  const siteUrl = getSeoSiteUrl();

  console.log('🔗 Canonical URL & OG Tag Validation\n');
  console.log('═'.repeat(60) + '\n');

  const result = await validateAllCanonicals(siteUrl);

  // Display summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Summary:');
  console.log('═'.repeat(60));
  console.log(`Total Pages: ${result.totalPages}`);
  console.log(`Pages with Issues: ${result.pagesWithIssues}`);
  console.log(`Missing Canonical: ${result.stats.missingCanonical}`);
  console.log(`Missing OG URL: ${result.stats.missingOgUrl}`);
  console.log(`URL Mismatches: ${result.stats.mismatchedUrls}`);
  console.log(`Duplicate Canonicals: ${result.stats.duplicateCanonicals}`);

  // Display issues
  if (result.issues.length > 0) {
    const criticalIssues = result.issues.filter((i) => i.severity === 'critical');
    const errorIssues = result.issues.filter((i) => i.severity === 'error');
    const warningIssues = result.issues.filter((i) => i.severity === 'warning');

    if (criticalIssues.length > 0) {
      console.log('\n🚨 Critical Issues:');
      criticalIssues.slice(0, 5).forEach((issue) => {
        console.log(`  ❌ ${issue.page}`);
        console.log(`     ${issue.message}`);
        if (issue.fix) {
          console.log(`     💡 Fix: ${issue.fix}`);
        }
      });
      if (criticalIssues.length > 5) {
        console.log(`  ... and ${criticalIssues.length - 5} more critical issues`);
      }
    }

    if (errorIssues.length > 0) {
      console.log('\n❌ Errors:');
      errorIssues.slice(0, 5).forEach((issue) => {
        console.log(`  • ${issue.page}`);
        console.log(`    ${issue.message}`);
        if (issue.fix) {
          console.log(`    💡 ${issue.fix}`);
        }
      });
      if (errorIssues.length > 5) {
        console.log(`  ... and ${errorIssues.length - 5} more errors`);
      }
    }

    if (warningIssues.length > 0) {
      console.log('\n⚠️  Warnings:');
      warningIssues.slice(0, 5).forEach((issue) => {
        console.log(`  • ${issue.page}`);
        console.log(`    ${issue.message}`);
      });
      if (warningIssues.length > 5) {
        console.log(`  ... and ${warningIssues.length - 5} more warnings`);
      }
    }
  }

  // Generate report if requested
  if (generateReportFile) {
    const reportContent = generateCanonicalReport(result);
    const reportPath = path.join(process.cwd(), 'canonical-validation-report.md');
    fs.writeFileSync(reportPath, reportContent);
    console.log(`\n📄 Report saved to ${reportPath}`);
  }

  // Determine exit code
  const hasErrors = result.issues.some(
    (i) => i.severity === 'critical' || i.severity === 'error'
  );
  const hasWarnings = result.issues.some((i) => i.severity === 'warning');

  console.log('\n' + '═'.repeat(60));

  if (failOnError && hasErrors) {
    console.log('❌ Validation FAILED (errors found)\n');
    process.exit(1);
  } else if (failOnWarning && hasWarnings) {
    console.log('❌ Validation FAILED (warnings found)\n');
    process.exit(1);
  } else if (hasErrors) {
    console.log('⚠️  Validation completed with errors\n');
  } else if (hasWarnings) {
    console.log('⚠️  Validation completed with warnings\n');
  } else {
    console.log('✅ All pages have valid canonical URLs\n');
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
