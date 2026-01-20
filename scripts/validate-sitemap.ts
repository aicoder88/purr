#!/usr/bin/env tsx
/**
 * Sitemap Validation Script
 * Validates sitemap.xml against Google's requirements and checks for common issues
 */

import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  loc?: string;
}

interface ValidationResult {
  isValid: boolean;
  totalUrls: number;
  issues: ValidationIssue[];
  stats: {
    byPriority: Record<string, number>;
    byChangefreq: Record<string, number>;
  };
}

/**
 * Validate sitemap.xml file
 */
async function validateSitemap(sitemapPath: string): Promise<ValidationResult> {
  const issues: ValidationIssue[] = [];
  const stats = {
    byPriority: {} as Record<string, number>,
    byChangefreq: {} as Record<string, number>,
  };

  // Check if file exists
  if (!fs.existsSync(sitemapPath)) {
    return {
      isValid: false,
      totalUrls: 0,
      issues: [{ type: 'error', message: `Sitemap file not found: ${sitemapPath}` }],
      stats,
    };
  }

  // Read and parse sitemap
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const $ = cheerio.load(xml, { xmlMode: true });

  // Check if it's a sitemap index or regular sitemap
  const isSitemapIndex = $('sitemapindex').length > 0;
  const urls = isSitemapIndex ? $('sitemap > loc') : $('url > loc');
  const totalUrls = urls.length;

  if (totalUrls === 0) {
    issues.push({ type: 'error', message: 'Sitemap contains no URLs' });
  }

  // Validate URL count (max 50,000 per sitemap)
  if (!isSitemapIndex && totalUrls > 50000) {
    issues.push({
      type: 'error',
      message: `Sitemap contains ${totalUrls} URLs (maximum 50,000)`,
    });
  }

  // Validate each URL
  urls.each((_, elem) => {
    const loc = $(elem).text();
    const url = $(elem).closest('url');

    // Check URL format
    if (!loc.startsWith('http://') && !loc.startsWith('https://')) {
      issues.push({
        type: 'error',
        message: 'URL must be absolute (http:// or https://)',
        loc,
      });
    }

    // Check for common redirect patterns (exact matches or path segments)
    const redirectPatterns = [
      { pattern: '/checkout', exact: false },
      { pattern: '/cart-2', exact: false },
      { pattern: '/thank-you', exact: false },
      { pattern: '/free', exact: true }, // Only /free, not /free-trial
      { pattern: '/solutions', exact: true }, // Only /solutions, not /learn/solutions/*
      { pattern: '/customers/testimonials', exact: false },
      { pattern: '/support/contact', exact: false },
      { pattern: '/locations/ab', exact: false },
      { pattern: '/locations/bc', exact: false },
      { pattern: '/locations/mb', exact: false },
    ];

    for (const { pattern, exact } of redirectPatterns) {
      const urlPath = loc.replace(/^https?:\/\/[^/]+/, '');
      const matches = exact
        ? urlPath === pattern || urlPath === pattern + '/'
        : urlPath.includes(pattern);

      if (matches) {
        issues.push({
          type: 'warning',
          message: `URL may redirect: ${pattern}`,
          loc,
        });
      }
    }

    // Check for admin/api routes
    if (loc.includes('/admin/') || loc.includes('/api/')) {
      issues.push({
        type: 'error',
        message: 'Sitemap should not contain admin or API routes',
        loc,
      });
    }

    // Check priority
    const priority = url.find('priority').text();
    if (priority) {
      const p = parseFloat(priority);
      if (p < 0 || p > 1) {
        issues.push({
          type: 'error',
          message: `Invalid priority ${priority} (must be 0.0-1.0)`,
          loc,
        });
      }
      stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;
    }

    // Check changefreq
    const changefreq = url.find('changefreq').text();
    if (changefreq) {
      const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
      if (!validFreqs.includes(changefreq)) {
        issues.push({
          type: 'error',
          message: `Invalid changefreq ${changefreq}`,
          loc,
        });
      }
      stats.byChangefreq[changefreq] = (stats.byChangefreq[changefreq] || 0) + 1;
    }

    // Check lastmod
    const lastmod = url.find('lastmod').text();
    if (lastmod) {
      const date = new Date(lastmod);
      if (isNaN(date.getTime())) {
        issues.push({
          type: 'warning',
          message: `Invalid lastmod date format: ${lastmod}`,
          loc,
        });
      }
    }
  });

  // Check for duplicates
  const urlSet = new Set<string>();
  const duplicates: string[] = [];

  urls.each((_, elem) => {
    const loc = $(elem).text();
    if (urlSet.has(loc)) {
      duplicates.push(loc);
    } else {
      urlSet.add(loc);
    }
  });

  if (duplicates.length > 0) {
    issues.push({
      type: 'error',
      message: `Found ${duplicates.length} duplicate URLs`,
    });
    duplicates.forEach(dup => {
      issues.push({
        type: 'error',
        message: 'Duplicate URL',
        loc: dup,
      });
    });
  }

  const isValid = !issues.some(i => i.type === 'error');

  return {
    isValid,
    totalUrls,
    issues,
    stats,
  };
}

/**
 * Main validation function
 */
async function main() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  console.log('🔍 Validating sitemap...\n');
  console.log(`   File: ${sitemapPath}\n`);

  const result = await validateSitemap(sitemapPath);

  console.log(`📊 Results:`);
  console.log(`   Total URLs: ${result.totalUrls}`);
  console.log(`   Status: ${result.isValid ? '✅ Valid' : '❌ Invalid'}`);
  console.log(`   Issues: ${result.issues.length}\n`);

  if (result.issues.length > 0) {
    console.log('📋 Issues:\n');

    const errors = result.issues.filter(i => i.type === 'error');
    const warnings = result.issues.filter(i => i.type === 'warning');

    if (errors.length > 0) {
      console.log(`❌ Errors (${errors.length}):`);
      errors.forEach(issue => {
        console.log(`   ${issue.message}`);
        if (issue.loc) console.log(`      ${issue.loc}`);
      });
      console.log();
    }

    if (warnings.length > 0) {
      console.log(`⚠️  Warnings (${warnings.length}):`);
      warnings.forEach(issue => {
        console.log(`   ${issue.message}`);
        if (issue.loc) console.log(`      ${issue.loc}`);
      });
      console.log();
    }
  }

  // Display stats
  console.log('📊 Statistics:\n');

  if (Object.keys(result.stats.byPriority).length > 0) {
    console.log('Priority distribution:');
    Object.entries(result.stats.byPriority)
      .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
      .forEach(([priority, count]) => {
        console.log(`   ${priority}: ${count} URLs`);
      });
    console.log();
  }

  if (Object.keys(result.stats.byChangefreq).length > 0) {
    console.log('Changefreq distribution:');
    Object.entries(result.stats.byChangefreq)
      .sort((a, b) => b[1] - a[1])
      .forEach(([freq, count]) => {
        console.log(`   ${freq}: ${count} URLs`);
      });
    console.log();
  }

  if (!result.isValid) {
    console.error('❌ Sitemap validation failed');
    process.exit(1);
  }

  console.log('✅ Sitemap validation passed');
  process.exit(0);
}

main();
