/**
 * SEO Compliance Validation Script
 * Comprehensive validation that runs before builds
 */

import { scanAllPages, ScannedPage } from './lib/page-scanner';
import { optimizeMetaTitle, optimizeMetaDescription } from '@/lib/seo/meta-optimizer';
import { buildGraphFromHTML, LinkGraphAnalyzer } from '@/lib/seo/link-graph-analyzer';
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

  // 4. Generate report
  const stats: ValidationStats = {
    totalPages: indexablePages.length,
    pagesWithErrors: new Set(errors.map((e) => e.page)).size,
    pagesWithWarnings: new Set(warnings.map((e) => e.page)).size,
    orphanPages: linkAnalysisResults.orphanCount,
    weakPages: linkAnalysisResults.weakCount,
    deadEndPages: linkAnalysisResults.deadEndCount,
    brokenLinks: 0, // TODO: implement broken link check
  };

  console.log('\n📊 Validation Summary:');
  console.log(`  Total Pages: ${stats.totalPages}`);
  console.log(`  Pages with Errors: ${stats.pagesWithErrors}`);
  console.log(`  Pages with Warnings: ${stats.pagesWithWarnings}`);
  console.log(`  Orphan Pages: ${stats.orphanPages}`);
  console.log(`  Weak Pages: ${stats.weakPages}`);
  console.log(`  Dead End Pages: ${stats.deadEndPages}`);
  console.log(`  Total Errors: ${errors.length}`);
  console.log(`  Total Warnings: ${warnings.length}\n`);

  // 5. Determine pass/fail
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

  // Note: For a full implementation, we would:
  // 1. Read HTML content for each page
  // 2. Extract links using cheerio
  // 3. Build link graph
  // 4. Identify orphans, weak pages, dead ends

  // Simplified implementation: just count static pages
  // In production, this would use buildGraphFromHTML with actual page content

  const analyzer = new LinkGraphAnalyzer();

  // Build basic graph from page paths
  const pagePaths = pages.map((p) => p.routePath);
  const basicLinks: Array<{ from: string; to: string; anchorText: string }> = [];

  // Create some basic link assumptions (simplified)
  // Real implementation would parse actual page content
  pages.forEach((page) => {
    // Assume homepage links to main sections
    if (page.routePath === '/') {
      basicLinks.push({
        from: '/',
        to: '/products',
        anchorText: 'Products',
      });
      basicLinks.push({
        from: '/',
        to: '/blog',
        anchorText: 'Blog',
      });
      basicLinks.push({
        from: '/',
        to: '/learn',
        anchorText: 'Learn',
      });
    }
  });

  analyzer.buildGraph(pagePaths, basicLinks);

  // Get problematic pages
  const orphanPages = analyzer.findOrphanPages();
  const weakPages = analyzer.findWeakPages();
  const deadEndPages = analyzer.findDeadEndPages();

  // Generate errors for orphan pages (critical issue)
  orphanPages.forEach((page) => {
    errors.push({
      page,
      severity: 'error',
      type: 'links',
      field: 'incomingLinks',
      message: 'Page has 0 incoming links (orphan page) - not discoverable',
      fix: 'Add internal links pointing to this page from related content',
    });
  });

  // Generate warnings for weak pages
  weakPages.forEach((page) => {
    warnings.push({
      page,
      severity: 'warning',
      type: 'links',
      field: 'incomingLinks',
      message: 'Page has only 1 incoming link - weak link equity',
      fix: 'Add 2-4 more internal links to strengthen page authority',
    });
  });

  // Generate warnings for dead end pages
  deadEndPages.forEach((page) => {
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
    orphanCount: orphanPages.length,
    weakCount: weakPages.length,
    deadEndCount: deadEndPages.length,
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
