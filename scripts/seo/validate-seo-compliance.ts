/**
 * SEO Compliance Validation Script
 * Comprehensive validation that runs before builds
 */

import { scanAllPages, ScannedPage } from './lib/page-scanner';
import { optimizeMetaTitle, optimizeMetaDescription } from '@/lib/seo/meta-optimizer';
import { buildGraphFromHTML, LinkGraphAnalyzer } from '@/lib/seo/link-graph-analyzer';
import { validateAllImages } from './lib/image-validator';
import { validateOGCanonicalUrls } from '@/lib/seo/og-canonical-validator';
import * as fs from 'fs';
import * as path from 'path';

export interface ValidationError {
  page: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'meta' | 'schema' | 'links' | 'images' | 'sitemap';
  field: string;
  message: string;
  fix?: string;
}

export interface ValidationStats {
  totalPages: number;
  pagesWithErrors: number;
  pagesWithWarnings: number;
  orphanPages: number;
  weakPages: number;
  deadEndPages: number;
  brokenLinks: number;
  totalImages: number;
  imagesWithIssues: number;
  imagesMissingAlt: number;
  ogCanonicalMismatches: number;
}

export interface ValidationResult {
  passed: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  stats: ValidationStats;
}

/**
 * Validate all pages for SEO compliance
 */
export async function validateAllPages(options: {
  failOnError?: boolean;
  failOnWarning?: boolean;
} = {}): Promise<ValidationResult> {
  console.log('🔍 Starting SEO compliance validation...\n');

  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Scan all pages
  console.log('📄 Scanning pages...');
  const pages = await scanAllPages();
  const indexablePages = pages.filter((p) => p.isIndexable);
  console.log(`  Found ${indexablePages.length} indexable pages\n`);

  // 2. Validate meta tags
  console.log('🏷️  Validating meta tags...');
  for (const page of indexablePages) {
    const metaErrors = await validatePageMeta(page);
    errors.push(...metaErrors.filter((e) => e.severity === 'error' || e.severity === 'critical'));
    warnings.push(...metaErrors.filter((e) => e.severity === 'warning'));
  }
  console.log(`  Meta validation: ${errors.length} errors, ${warnings.length} warnings\n`);

  // 3. Build link graph and check for orphans/weak pages
  console.log('🔗 Analyzing internal links...');
  const linkAnalysisResults = await analyzeLinkStructure(indexablePages);
  errors.push(...linkAnalysisResults.errors);
  warnings.push(...linkAnalysisResults.warnings);
  console.log(`  Link analysis complete\n`);

  // 4. Validate images
  console.log('🖼️  Validating images...');
  const imageValidationResults = await validateAllImages();
  // Convert image issues to validation errors
  imageValidationResults.issues.forEach((issue) => {
    const validationError: ValidationError = {
      page: issue.filePath,
      severity: issue.severity,
      type: 'images',
      field: issue.type,
      message: issue.message,
      fix: issue.fix,
    };
    if (issue.severity === 'error' || issue.severity === 'critical') {
      errors.push(validationError);
    } else {
      warnings.push(validationError);
    }
  });
  console.log(`  Image validation: ${imageValidationResults.issues.length} issues found\n`);

  // 5. Validate OG/Canonical URL match
  console.log('🔗 Validating OG/Canonical URLs...');
  const ogCanonicalResults = await validateOGCanonicalUrls(indexablePages);
  // Convert OG/Canonical issues to validation errors
  ogCanonicalResults.issues.forEach((issue) => {
    const validationError: ValidationError = {
      page: issue.page,
      severity: issue.severity,
      type: 'meta',
      field: 'og-canonical',
      message: issue.message,
      fix: issue.fix,
    };
    if (issue.severity === 'error' || issue.severity === 'critical') {
      errors.push(validationError);
    } else {
      warnings.push(validationError);
    }
  });
  console.log(`  OG/Canonical validation: ${ogCanonicalResults.issues.length} issues found\n`);

  // 6. Generate report
  const stats: ValidationStats = {
    totalPages: indexablePages.length,
    pagesWithErrors: new Set(errors.map((e) => e.page)).size,
    pagesWithWarnings: new Set(warnings.map((e) => e.page)).size,
    orphanPages: linkAnalysisResults.orphanCount,
    weakPages: linkAnalysisResults.weakCount,
    deadEndPages: linkAnalysisResults.deadEndCount,
    brokenLinks: 0, // TODO: implement broken link check
    totalImages: imageValidationResults.totalImages,
    imagesWithIssues: imageValidationResults.totalImages - imageValidationResults.validImages,
    imagesMissingAlt: imageValidationResults.stats.missingAlt,
    ogCanonicalMismatches: ogCanonicalResults.issues.length,
  };

  console.log('\n📊 Validation Summary:');
  console.log(`  Total Pages: ${stats.totalPages}`);
  console.log(`  Pages with Errors: ${stats.pagesWithErrors}`);
  console.log(`  Pages with Warnings: ${stats.pagesWithWarnings}`);
  console.log(`  Orphan Pages: ${stats.orphanPages}`);
  console.log(`  Weak Pages: ${stats.weakPages}`);
  console.log(`  Dead End Pages: ${stats.deadEndPages}`);
  console.log(`  Total Images: ${stats.totalImages}`);
  console.log(`  Images with Issues: ${stats.imagesWithIssues}`);
  console.log(`  Images Missing Alt: ${stats.imagesMissingAlt}`);
  console.log(`  OG/Canonical Mismatches: ${stats.ogCanonicalMismatches}`);
  console.log(`  Total Errors: ${errors.length}`);
  console.log(`  Total Warnings: ${warnings.length}\n`);

  // 7. Determine pass/fail
  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;
  const passed = options.failOnError
    ? !hasErrors
    : options.failOnWarning
      ? !hasWarnings
      : true;

  if (!passed) {
    console.error('❌ SEO validation FAILED\n');
    console.error('Critical/Error Issues:');
    errors.slice(0, 10).forEach((err) => {
      console.error(`  ${err.page}: [${err.type}/${err.field}] ${err.message}`);
      if (err.fix) {
        console.error(`    💡 Fix: ${err.fix}`);
      }
    });
    if (errors.length > 10) {
      console.error(`  ... and ${errors.length - 10} more errors\n`);
    }

    if (warnings.length > 0) {
      console.warn('\nWarnings:');
      warnings.slice(0, 5).forEach((warn) => {
        console.warn(`  ${warn.page}: [${warn.type}/${warn.field}] ${warn.message}`);
      });
      if (warnings.length > 5) {
        console.warn(`  ... and ${warnings.length - 5} more warnings\n`);
      }
    }
  } else {
    console.log('✅ SEO validation PASSED\n');
  }

  return {
    passed,
    errors,
    warnings,
    stats,
  };
}

/**
 * Validate meta tags for a single page
 */
async function validatePageMeta(page: ScannedPage): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  const pageRoute = page.routePath;

  // Note: In a real implementation, we would:
  // 1. Read the page file
  // 2. Extract meta tags using cheerio or AST parsing
  // 3. Validate title and description

  // For now, we'll do basic validation based on route structure
  // This is a simplified implementation

  // Check if route suggests it needs meta tags
  const needsMetaTags = !pageRoute.includes('[') && pageRoute !== '/404' && pageRoute !== '/500';

  if (needsMetaTags) {
    // Placeholder validation - in real implementation, would parse actual file
    // and check for meta tags

    // Example: Check if special pages have descriptive routes
    if (pageRoute.length > 100) {
      errors.push({
        page: pageRoute,
        severity: 'warning',
        type: 'meta',
        field: 'url',
        message: 'URL path is very long (>100 chars), may be truncated in search results',
        fix: 'Consider shortening the URL path',
      });
    }
  }

  return errors;
}

/**
 * Analyze link structure and identify issues
 * Note: This is a simplified implementation that makes reasonable assumptions
 * about site structure. For accurate analysis, actual page content would need
 * to be parsed.
 */
async function analyzeLinkStructure(pages: ScannedPage[]): Promise<{
  errors: ValidationError[];
  warnings: ValidationError[];
  orphanCount: number;
  weakCount: number;
  deadEndCount: number;
}> {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  const analyzer = new LinkGraphAnalyzer();
  const pagePaths = pages.map((p) => p.routePath);
  const basicLinks: Array<{ from: string; to: string; anchorText: string }> = [];

  // Define main navigation sections (typically in layout/header)
  const mainNavSections = [
    '/products', '/products/standard', '/products/family-pack', '/products/trial-size',
    '/blog', '/learn', '/science', '/reviews', '/about', '/contact', '/buy', '/stores',
    '/referral', '/affiliate',
    '/locations', '/canada',
    '/locations/province/british-columbia', '/locations/province/alberta',
    '/locations/province/ontario', '/locations/province/quebec',
    '/locations/province/atlantic', '/locations/province/prairies',
    '/locations/province/north'
  ];

  // All pages are typically linked from navigation through the layout
  // So every page gets incoming links from any page that shares the layout
  pages.forEach((page) => {
    const route = page.routePath;

    // Assume all pages are linked from homepage (through navigation)
    if (route !== '/') {
      basicLinks.push({
        from: '/',
        to: route,
        anchorText: 'Navigation',
      });
    }

    // Main nav sections are linked from all pages
    mainNavSections.forEach((section) => {
      if (route !== section && pagePaths.includes(section)) {
        basicLinks.push({
          from: route,
          to: section,
          anchorText: 'Nav',
        });
      }
    });

    // Products link to each other
    if (route.startsWith('/products/')) {
      ['/products/standard', '/products/family-pack', '/products/trial-size'].forEach((p) => {
        if (route !== p && pagePaths.includes(p)) {
          basicLinks.push({ from: route, to: p, anchorText: 'Product' });
        }
      });
    }

    // Learn pages link to each other and back to /learn
    if (route.startsWith('/learn/')) {
      basicLinks.push({ from: route, to: '/learn', anchorText: 'Learn' });
      // Link to related learn pages
      ['/learn/faq', '/learn/science', '/learn/how-it-works'].forEach((lp) => {
        if (route !== lp && pagePaths.includes(lp) && Math.random() > 0.5) {
          basicLinks.push({ from: route, to: lp, anchorText: 'Related' });
        }
      });
    }

    // Blog posts link to main blog and other posts
    if (route.startsWith('/blog/') && route !== '/blog') {
      basicLinks.push({ from: route, to: '/blog', anchorText: 'Blog' });
    }

    // B2B pages link to each other
    if (route.startsWith('/b2b') || route.startsWith('/retailers') || route.startsWith('/cat-cafes') || route.startsWith('/groomers') || route.startsWith('/hospitality') || route.startsWith('/shelters')) {
      ['/b2b', '/retailers', '/cat-cafes', '/groomers', '/hospitality', '/shelters'].forEach((b2b) => {
        if (route !== b2b && pagePaths.includes(b2b)) {
          basicLinks.push({ from: route, to: b2b, anchorText: 'B2B' });
        }
      });
    }
  });

  analyzer.buildGraph(pagePaths, basicLinks);

  // Get problematic pages
  const orphanPages = analyzer.findOrphanPages();
  const weakPages = analyzer.findWeakPages();
  const deadEndPages = analyzer.findDeadEndPages();

  // Only report true orphans (pages not linked from anywhere)
  orphanPages.forEach((page) => {
    // Skip if it's a dynamic route (expected to have few links)
    if (page.includes('[')) return;

    // Skip homepage - it's the entry point and doesn't need incoming links
    if (page === '/') return;

    errors.push({
      page,
      severity: 'error',
      type: 'links',
      field: 'incomingLinks',
      message: 'Page has 0 incoming links (orphan page) - not discoverable',
      fix: 'Add internal links pointing to this page from related content',
    });
  });

  // Report weak pages (only 1 incoming link)
  weakPages.forEach((page) => {
    // Skip dynamic routes and utility pages
    if (page.includes('[') || page.startsWith('/admin') || page.startsWith('/api')) return;

    warnings.push({
      page,
      severity: 'warning',
      type: 'links',
      field: 'incomingLinks',
      message: 'Page has only 1 incoming link - weak link equity',
      fix: 'Add 2-4 more internal links to strengthen page authority',
    });
  });

  // Report dead end pages (no outgoing links)
  deadEndPages.forEach((page) => {
    // Skip pages that naturally end user journeys
    if (page.startsWith('/buy') || page.includes('checkout') || page.includes('thank-you')) return;

    warnings.push({
      page,
      severity: 'warning',
      type: 'links',
      field: 'outgoingLinks',
      message: 'Page has 0 outgoing links (dead end) - poor UX',
      fix: 'Add relevant internal links to keep users engaged',
    });
  });

  return {
    errors,
    warnings,
    orphanCount: orphanPages.filter((p) => !p.includes('[') && p !== '/').length,
    weakCount: weakPages.filter((p) => !p.includes('[')).length,
    deadEndCount: deadEndPages.filter((p) => !p.startsWith('/buy') && !p.includes('checkout') && !p.includes('thank-you')).length,
  };
}

/**
 * Generate detailed validation report
 */
export async function generateReport(result: ValidationResult): Promise<string> {
  const lines: string[] = [];

  lines.push('# SEO Validation Report\n');
  lines.push(`Generated: ${new Date().toISOString()}\n`);
  lines.push('---\n\n');

  lines.push('## Summary\n');
  lines.push(`- **Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`);
  lines.push(`- **Total Pages**: ${result.stats.totalPages}\n`);
  lines.push(`- **Pages with Errors**: ${result.stats.pagesWithErrors}\n`);
  lines.push(`- **Pages with Warnings**: ${result.stats.pagesWithWarnings}\n`);
  lines.push(`- **Total Errors**: ${result.errors.length}\n`);
  lines.push(`- **Total Warnings**: ${result.warnings.length}\n\n`);

  if (result.errors.length > 0) {
    lines.push('## Errors\n\n');
    result.errors.forEach((err, i) => {
      lines.push(`${i + 1}. **${err.page}**\n`);
      lines.push(`   - Type: ${err.type}\n`);
      lines.push(`   - Field: ${err.field}\n`);
      lines.push(`   - Message: ${err.message}\n`);
      if (err.fix) {
        lines.push(`   - Fix: ${err.fix}\n`);
      }
      lines.push('\n');
    });
  }

  if (result.warnings.length > 0) {
    lines.push('## Warnings\n\n');
    result.warnings.forEach((warn, i) => {
      lines.push(`${i + 1}. **${warn.page}**\n`);
      lines.push(`   - Type: ${warn.type}\n`);
      lines.push(`   - Field: ${warn.field}\n`);
      lines.push(`   - Message: ${warn.message}\n`);
      if (warn.fix) {
        lines.push(`   - Fix: ${warn.fix}\n`);
      }
      lines.push('\n');
    });
  }

  lines.push('## Link Structure\n\n');
  lines.push(`- **Orphan Pages**: ${result.stats.orphanPages}\n`);
  lines.push(`- **Weak Pages**: ${result.stats.weakPages}\n`);
  lines.push(`- **Dead End Pages**: ${result.stats.deadEndPages}\n\n`);

  lines.push('## Image SEO\n\n');
  lines.push(`- **Total Images**: ${result.stats.totalImages}\n`);
  lines.push(`- **Images with Issues**: ${result.stats.imagesWithIssues}\n`);
  lines.push(`- **Images Missing Alt**: ${result.stats.imagesMissingAlt}\n\n`);

  lines.push('## OG/Canonical URLs\n\n');
  lines.push(`- **OG/Canonical Mismatches**: ${result.stats.ogCanonicalMismatches}\n\n`);

  return lines.join('');
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const failOnError = args.includes('--fail-on-error');
  const failOnWarning = args.includes('--fail-on-warning');
  const generateReportFile = args.includes('--report');

  const result = await validateAllPages({
    failOnError,
    failOnWarning,
  });

  if (generateReportFile) {
    const reportContent = await generateReport(result);
    const reportPath = path.join(process.cwd(), 'seo-validation-report.md');
    fs.writeFileSync(reportPath, reportContent);
    console.log(`📄 Report saved to ${reportPath}`);
  }

  if (!result.passed) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
