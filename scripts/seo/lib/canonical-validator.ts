/**
 * Canonical and Open Graph Validator
 * Validates canonical URLs and OG tags for duplicate content prevention
 */

import fg from 'fast-glob';
import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';

export interface CanonicalIssue {
  page: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'canonical' | 'og-url' | 'duplicate' | 'mismatch';
  message: string;
  fix?: string;
  details?: {
    canonical?: string;
    ogUrl?: string;
    duplicateWith?: string[];
  };
}

export interface CanonicalValidationResult {
  totalPages: number;
  pagesWithIssues: number;
  issues: CanonicalIssue[];
  stats: {
    missingCanonical: number;
    missingOgUrl: number;
    duplicateCanonicals: number;
    mismatchedUrls: number;
  };
}

/**
 * Extract canonical and OG URL from HTML content
 */
export function extractMetaUrls(html: string): {
  canonical?: string;
  ogUrl?: string;
} {
  const $ = cheerio.load(html, {
    xml: false,
  });

  // Extract canonical link
  const canonical = $('link[rel="canonical"]').attr('href');

  // Extract og:url meta tag
  const ogUrl = $('meta[property="og:url"]').attr('content');

  return {
    canonical,
    ogUrl,
  };
}

/**
 * Validate canonical and OG URLs for a single page
 */
export function validatePageCanonical(
  pagePath: string,
  html: string,
  siteUrl: string
): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];
  const { canonical, ogUrl } = extractMetaUrls(html);

  // Check for missing canonical
  if (!canonical) {
    issues.push({
      page: pagePath,
      severity: 'error',
      type: 'canonical',
      message: 'Missing canonical URL',
      fix: 'Add <link rel="canonical" href="..." /> to page head',
    });
  }

  // Check for missing og:url
  if (!ogUrl) {
    issues.push({
      page: pagePath,
      severity: 'warning',
      type: 'og-url',
      message: 'Missing og:url meta tag',
      fix: 'Add <meta property="og:url" content="..." /> to page head',
    });
  }

  // Check for mismatch between canonical and og:url
  if (canonical && ogUrl && canonical !== ogUrl) {
    issues.push({
      page: pagePath,
      severity: 'warning',
      type: 'mismatch',
      message: 'Canonical URL and og:url do not match',
      fix: 'Ensure canonical and og:url point to the same URL',
      details: {
        canonical,
        ogUrl,
      },
    });
  }

  // Validate canonical URL format
  if (canonical) {
    // Check if canonical is absolute
    if (!canonical.startsWith('http://') && !canonical.startsWith('https://')) {
      issues.push({
        page: pagePath,
        severity: 'error',
        type: 'canonical',
        message: 'Canonical URL must be absolute (include https://)',
        fix: `Change canonical from "${canonical}" to "${siteUrl}${canonical}"`,
        details: { canonical },
      });
    }

    // Check if canonical matches expected URL
    const expectedCanonical = `${siteUrl}${pagePath}`;
    if (canonical !== expectedCanonical && !canonical.includes('?') && !canonical.includes('#')) {
      issues.push({
        page: pagePath,
        severity: 'warning',
        type: 'canonical',
        message: `Canonical URL "${canonical}" differs from page URL "${expectedCanonical}"`,
        fix: 'Verify this is intentional (e.g., for duplicate content consolidation)',
        details: { canonical },
      });
    }
  }

  return issues;
}

/**
 * Find duplicate canonical URLs across pages
 */
export function findDuplicateCanonicals(
  pages: Array<{ path: string; canonical?: string }>
): CanonicalIssue[] {
  const issues: CanonicalIssue[] = [];
  const canonicalMap = new Map<string, string[]>();

  // Group pages by canonical URL
  pages.forEach((page) => {
    if (page.canonical) {
      const existing = canonicalMap.get(page.canonical) || [];
      existing.push(page.path);
      canonicalMap.set(page.canonical, existing);
    }
  });

  // Find duplicates
  canonicalMap.forEach((pagePaths, canonical) => {
    if (pagePaths.length > 1) {
      // Multiple pages pointing to the same canonical
      // This is actually OK if intentional (e.g., pagination, filters)
      // But we should warn if it seems unintentional

      pagePaths.forEach((pagePath) => {
        // Skip if canonical points to self
        const expectedCanonical = canonical.replace(/https?:\/\/[^\/]+/, '');
        if (expectedCanonical === pagePath) {
          return; // This page is the canonical version
        }

        issues.push({
          page: pagePath,
          severity: 'warning',
          type: 'duplicate',
          message: `Page canonical points to "${canonical}" (shared with ${pagePaths.length - 1} other page(s))`,
          fix: 'Verify this is intentional for duplicate content consolidation',
          details: {
            canonical,
            duplicateWith: pagePaths.filter((p) => p !== pagePath),
          },
        });
      });
    }
  });

  return issues;
}

/**
 * Validate all pages for canonical and OG URL issues
 */
export async function validateAllCanonicals(
  siteUrl: string = 'https://purrify.ca'
): Promise<CanonicalValidationResult> {
  console.log('🔗 Validating canonical URLs and OG tags...\n');

  const issues: CanonicalIssue[] = [];
  let missingCanonical = 0;
  let missingOgUrl = 0;
  let mismatchedUrls = 0;

  const pages: Array<{ path: string; canonical?: string }> = [];

  // Scan generated HTML files in .next/server/pages
  // Note: In a real implementation, we'd scan the actual built pages
  // For now, we'll scan source files as a simplified approach

  console.log('📄 Scanning pages for canonical tags...');

  // Scan TSX pages
  const pageFiles = await fg(['pages/**/*.tsx'], {
    cwd: process.cwd(),
    ignore: [
      '**/api/**',
      '**/_*.tsx',
      '**/404.tsx',
      '**/500.tsx',
      '**/admin/**',
      '**/portal/**',
    ],
  });

  console.log(`  Found ${pageFiles.length} page files\n`);

  // For each page, we'd normally render it and extract canonical
  // This is a simplified version that checks for NextSeo usage

  console.log('🔍 Checking for canonical and OG URL presence...\n');

  for (const file of pageFiles) {
    const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
    const pagePath = file
      .replace('pages/', '/')
      .replace('.tsx', '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '/');

    // Check if NextSeo is used
    const hasNextSeo = content.includes('NextSeo') || content.includes('<Head>');

    if (!hasNextSeo) {
      issues.push({
        page: pagePath,
        severity: 'warning',
        type: 'canonical',
        message: 'Page may be missing SEO tags (no NextSeo or Head component found)',
        fix: 'Add NextSeo component with canonical and og:url',
      });
      missingCanonical++;
      missingOgUrl++;
      continue;
    }

    // Look for canonical in source
    const hasCanonical =
      content.includes('canonical') ||
      content.includes('rel="canonical"') ||
      content.includes("rel='canonical'");

    if (!hasCanonical) {
      issues.push({
        page: pagePath,
        severity: 'error',
        type: 'canonical',
        message: 'No canonical URL found in page source',
        fix: 'Add canonical prop to NextSeo or add <link rel="canonical"> to Head',
      });
      missingCanonical++;
    }

    // Look for og:url
    const hasOgUrl =
      content.includes('og:url') ||
      content.includes('openGraph') ||
      content.includes('ogUrl');

    if (!hasOgUrl) {
      issues.push({
        page: pagePath,
        severity: 'warning',
        type: 'og-url',
        message: 'No og:url found in page source',
        fix: 'Add openGraph.url to NextSeo or add <meta property="og:url">',
      });
      missingOgUrl++;
    }
  }

  const stats = {
    missingCanonical,
    missingOgUrl,
    mismatchedUrls,
    duplicateCanonicals: 0, // Would be calculated from actual rendered pages
  };

  console.log('📊 Summary:');
  console.log(`  Pages scanned: ${pageFiles.length}`);
  console.log(`  Missing canonical: ${missingCanonical}`);
  console.log(`  Missing og:url: ${missingOgUrl}`);
  console.log(`  Total issues: ${issues.length}\n`);

  return {
    totalPages: pageFiles.length,
    pagesWithIssues: new Set(issues.map((i) => i.page)).size,
    issues,
    stats,
  };
}

/**
 * Generate canonical validation report
 */
export function generateCanonicalReport(
  result: CanonicalValidationResult
): string {
  const lines: string[] = [];

  lines.push('# Canonical URL & OG Tag Validation Report\n');
  lines.push(`Generated: ${new Date().toISOString()}\n`);
  lines.push('---\n\n');

  lines.push('## Summary\n');
  lines.push(`- **Total Pages**: ${result.totalPages}\n`);
  lines.push(`- **Pages with Issues**: ${result.pagesWithIssues}\n`);
  lines.push(`- **Missing Canonical**: ${result.stats.missingCanonical}\n`);
  lines.push(`- **Missing OG URL**: ${result.stats.missingOgUrl}\n`);
  lines.push(`- **URL Mismatches**: ${result.stats.mismatchedUrls}\n`);
  lines.push(`- **Duplicate Canonicals**: ${result.stats.duplicateCanonicals}\n\n`);

  if (result.issues.length > 0) {
    // Group by severity
    const criticalIssues = result.issues.filter((i) => i.severity === 'critical');
    const errorIssues = result.issues.filter((i) => i.severity === 'error');
    const warningIssues = result.issues.filter((i) => i.severity === 'warning');

    if (criticalIssues.length > 0) {
      lines.push('## Critical Issues\n\n');
      criticalIssues.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.page}**\n`);
        lines.push(`   - Type: ${issue.type}\n`);
        lines.push(`   - Message: ${issue.message}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        if (issue.details) {
          lines.push(`   - Details: ${JSON.stringify(issue.details, null, 2)}\n`);
        }
        lines.push('\n');
      });
    }

    if (errorIssues.length > 0) {
      lines.push('## Errors\n\n');
      errorIssues.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.page}**\n`);
        lines.push(`   - Type: ${issue.type}\n`);
        lines.push(`   - Message: ${issue.message}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
    }

    if (warningIssues.length > 0) {
      lines.push('## Warnings\n\n');
      warningIssues.slice(0, 20).forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.page}**\n`);
        lines.push(`   - Type: ${issue.type}\n`);
        lines.push(`   - Message: ${issue.message}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
      if (warningIssues.length > 20) {
        lines.push(`... and ${warningIssues.length - 20} more warnings\n\n`);
      }
    }
  }

  return lines.join('');
}
