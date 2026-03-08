/**
 * Pre-Build SEO Validation Orchestrator
 * Runs all SEO validations before build and determines if build should proceed
 */

import { validateAllPages } from './validate-seo-compliance';
import { validateAllImages } from './lib/image-validator';
import { validateAllCanonicals } from './lib/canonical-validator';
import { validateGeneratedSitemapIndexability } from './lib/sitemap-indexability-validator';
import { validateNoInlineHeadTags } from './validate-no-inline-head-tags';
import { validateRenderedSeo } from './validate-rendered-seo';
import { validateSupportedLocaleSurface } from './validate-supported-locales';

const BLOCK_ON_RENDERED_SEO = process.env.SEO_RENDERED_BLOCK_BUILD === 'true';

interface ValidationSummary {
  passed: boolean;
  criticalIssues: number;
  errors: number;
  warnings: number;
  details: {
    seoCompliance?: {
      passed: boolean;
      errors: number;
      warnings: number;
    };
    images?: {
      passed: boolean;
      issues: number;
    };
    canonicals?: {
      passed: boolean;
      errors: number;
      warnings: number;
    };
    inlineHead?: {
      passed: boolean;
      errors: number;
      allowedExceptions: number;
    };
    supportedLocales?: {
      passed: boolean;
      errors: number;
    };
    sitemapIndexability?: {
      passed: boolean;
      errors: number;
    };
    renderedSeo?: {
      passed: boolean;
      errors: number;
      warnings: number;
      pagesChecked: number;
    };
  };
}

async function runPrebuildValidation(): Promise<ValidationSummary> {
  console.log('🚀 Pre-Build SEO Validation\n');
  console.log('═'.repeat(70) + '\n');

  const summary: ValidationSummary = {
    passed: true,
    criticalIssues: 0,
    errors: 0,
    warnings: 0,
    details: {},
  };

  // 1. Run SEO Compliance Validation (meta tags, links)
  console.log('1️⃣  Running SEO Compliance Validation...\n');
  try {
    const seoResult = await validateAllPages({ failOnError: false });

    const seoCritical = seoResult.errors.filter((e) => e.severity === 'critical').length;
    const seoErrors = seoResult.errors.filter((e) => e.severity === 'error').length;
    const seoWarnings = seoResult.warnings.length;

    summary.details.seoCompliance = {
      passed: seoCritical === 0,
      errors: seoErrors,
      warnings: seoWarnings,
    };

    summary.criticalIssues += seoCritical;
    summary.errors += seoErrors;
    summary.warnings += seoWarnings;

    // Only fail on critical issues, not regular errors
    if (seoCritical > 0) {
      summary.passed = false;
    }

    console.log(`   ✓ SEO Compliance: ${seoErrors} errors, ${seoWarnings} warnings\n`);
  } catch (error) {
    console.error(`   ✗ SEO Compliance validation failed: ${error}\n`);
    summary.passed = false;
    summary.errors++;
  }

  // 2. Run Image Validation (optional - only warn on issues)
  console.log('2️⃣  Running Image Validation...\n');
  try {
    const imageResult = await validateAllImages({
      mode: 'runtime',
      includeLegacyBacklog: true,
    });

    const imageIssues = imageResult.actionableIssues.filter(
      (i) => i.severity === 'critical' || i.severity === 'error'
    ).length;

    summary.details.images = {
      passed: imageIssues === 0,
      issues: imageResult.actionableIssues.length,
    };

    // Don't fail build on image issues, just warn
    summary.warnings += imageResult.actionableIssues.length;

    console.log(
      `   ℹ️  Image Validation: ${imageResult.actionableIssues.length} actionable issues (warnings only)\n`
    );
  } catch (error) {
    console.error(`   ✗ Image validation failed: ${error}\n`);
    // Don't fail build on image validation errors
  }

  // 3. Run Canonical Validation
  console.log('3️⃣  Running Canonical URL Validation...\n');
  try {
    const canonicalResult = await validateAllCanonicals();

    const canonicalErrors = canonicalResult.issues.filter(
      (i) => i.severity === 'critical' || i.severity === 'error'
    ).length;
    const canonicalWarnings = canonicalResult.issues.filter(
      (i) => i.severity === 'warning'
    ).length;

    summary.details.canonicals = {
      passed: canonicalErrors === 0,
      errors: canonicalErrors,
      warnings: canonicalWarnings,
    };

    summary.criticalIssues += canonicalResult.issues.filter(
      (i) => i.severity === 'critical'
    ).length;
    summary.errors += canonicalErrors;
    summary.warnings += canonicalWarnings;

    // Fail build only on critical canonical issues
    if (canonicalResult.issues.some((i) => i.severity === 'critical')) {
      summary.passed = false;
    }

    console.log(`   ✓ Canonical URLs: ${canonicalErrors} errors, ${canonicalWarnings} warnings\n`);
  } catch (error) {
    console.error(`   ✗ Canonical validation failed: ${error}\n`);
    // Don't fail build on canonical validation errors
  }

  // 4. Ban inline title/meta/canonical tags in App Router pages.
  console.log('4️⃣  Validating App Router Metadata Contract...\n');
  try {
    const inlineHeadResult = await validateNoInlineHeadTags();

    summary.details.inlineHead = {
      passed: inlineHeadResult.passed,
      errors: inlineHeadResult.issues.length,
      allowedExceptions: inlineHeadResult.allowedExceptions,
    };

    summary.criticalIssues += inlineHeadResult.issues.length;
    summary.errors += inlineHeadResult.issues.length;

    if (!inlineHeadResult.passed) {
      summary.passed = false;
      console.error(
        `   ✗ Inline head tags: ${inlineHeadResult.issues.length} violation(s), ${inlineHeadResult.allowedExceptions} documented exception(s)\n`
      );
    } else {
      console.log(
        `   ✓ Inline head tags: ${inlineHeadResult.allowedExceptions} documented exception(s), 0 violations\n`
      );
    }
  } catch (error) {
    console.error(`   ✗ Inline head tag validation failed: ${error}\n`);
    summary.passed = false;
    summary.errors++;
  }

  // 5. Prevent unsupported locales from leaking into crawlable SEO surfaces.
  console.log('5️⃣  Validating Supported Locale SEO Surface...\n');
  try {
    const localeResult = await validateSupportedLocaleSurface();

    summary.details.supportedLocales = {
      passed: localeResult.passed,
      errors: localeResult.issues.length,
    };

    summary.errors += localeResult.issues.length;

    if (!localeResult.passed) {
      summary.passed = false;
      console.error(
        `   ✗ Supported locales: ${localeResult.issues.length} unsupported locale leak(s) found\n`
      );
    } else {
      console.log('   ✓ Supported locales: no unsupported locale leaks found\n');
    }
  } catch (error) {
    console.error(`   ✗ Supported locale validation failed: ${error}\n`);
    summary.passed = false;
    summary.errors++;
  }

  // 6. Enforce sitemap consistency with redirects, indexability, and canonical URLs.
  console.log('6️⃣  Validating Sitemap Indexability...\n');
  try {
    const sitemapResult = await validateGeneratedSitemapIndexability();

    summary.details.sitemapIndexability = {
      passed: sitemapResult.passed,
      errors: sitemapResult.issues.length,
    };

    summary.errors += sitemapResult.issues.length;

    if (!sitemapResult.passed) {
      summary.passed = false;
      console.error(
        `   ✗ Sitemap indexability: ${sitemapResult.issues.length} blocking issue(s) found\n`
      );
    } else {
      console.log('   ✓ Sitemap indexability: all sitemap URLs are indexable and canonical\n');
    }
  } catch (error) {
    console.error(`   ✗ Sitemap indexability validation failed: ${error}\n`);
    summary.passed = false;
    summary.errors++;
  }

  // 7. Validate the final rendered DOM across sitemap-discovered URLs.
  console.log('7️⃣  Running Rendered SEO Validation...\n');
  try {
    const renderedResult = await validateRenderedSeo();
    const renderedErrors = renderedResult.issues.filter((issue) => issue.severity === 'error').length;
    const renderedWarnings = renderedResult.issues.filter(
      (issue) => issue.severity === 'warning'
    ).length;

    summary.details.renderedSeo = {
      passed: renderedResult.passed,
      errors: renderedErrors,
      warnings: renderedWarnings,
      pagesChecked: renderedResult.pagesChecked,
    };

    summary.errors += renderedErrors;
    summary.warnings += renderedWarnings;

    if (!renderedResult.passed && BLOCK_ON_RENDERED_SEO) {
      summary.passed = false;
      console.error(
        `   ✗ Rendered SEO: ${renderedErrors} errors, ${renderedWarnings} warnings across ${renderedResult.pagesChecked} page(s)\n`
      );
    } else if (!renderedResult.passed) {
      console.log(
        `   ℹ️  Rendered SEO: ${renderedErrors} errors, ${renderedWarnings} warnings across ${renderedResult.pagesChecked} page(s) (reported, non-blocking in prebuild)\n`
      );
    } else {
      console.log(
        `   ✓ Rendered SEO: ${renderedWarnings} warnings across ${renderedResult.pagesChecked} page(s)\n`
      );
    }
  } catch (error) {
    if (BLOCK_ON_RENDERED_SEO) {
      console.error(`   ✗ Rendered SEO validation failed: ${error}\n`);
      summary.passed = false;
      summary.errors++;
    } else {
      console.warn(`   ⚠️  Rendered SEO validation failed (non-blocking in prebuild): ${error}\n`);
      summary.warnings++;
    }
  }

  return summary;
}

async function main() {
  const startTime = Date.now();

  try {
    const summary = await runPrebuildValidation();
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('═'.repeat(70));
    console.log('📊 Validation Summary');
    console.log('═'.repeat(70));
    console.log(`Duration: ${duration}s`);
    console.log(`Critical Issues: ${summary.criticalIssues}`);
    console.log(`Errors: ${summary.errors}`);
    console.log(`Warnings: ${summary.warnings}`);
    console.log();

    if (summary.details.seoCompliance) {
      console.log(`SEO Compliance: ${summary.details.seoCompliance.errors} errors, ${summary.details.seoCompliance.warnings} warnings`);
    }

    if (summary.details.images) {
      console.log(`Images: ${summary.details.images.issues} issues`);
    }

    if (summary.details.canonicals) {
      console.log(`Canonicals: ${summary.details.canonicals.errors} errors, ${summary.details.canonicals.warnings} warnings`);
    }

    if (summary.details.inlineHead) {
      console.log(
        `Inline head tags: ${summary.details.inlineHead.errors} errors, ${summary.details.inlineHead.allowedExceptions} documented exceptions`
      );
    }

    if (summary.details.supportedLocales) {
      console.log(`Supported locales: ${summary.details.supportedLocales.errors} errors`);
    }

    if (summary.details.sitemapIndexability) {
      console.log(`Sitemap indexability: ${summary.details.sitemapIndexability.errors} errors`);
    }

    if (summary.details.renderedSeo) {
      console.log(
        `Rendered SEO: ${summary.details.renderedSeo.errors} errors, ${summary.details.renderedSeo.warnings} warnings (${summary.details.renderedSeo.pagesChecked} pages)`
      );
    }

    console.log('═'.repeat(70));

    if (summary.passed) {
      console.log('✅ Pre-build validation PASSED - Build can proceed\n');
      process.exit(0);
    } else {
      console.log('❌ Pre-build validation FAILED - Critical issues found\n');
      console.log('Fix critical issues before building for production.');
      if (!BLOCK_ON_RENDERED_SEO) {
        console.log('Rendered SEO findings are reported during prebuild but do not block the build.');
      }
      console.log('To bypass this check (not recommended), set SKIP_SEO_VALIDATION=true\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error during pre-build validation:', error);
    process.exit(1);
  }
}

// Check if validation should be skipped
if (process.env.SKIP_SEO_VALIDATION === 'true') {
  console.log('⚠️  SEO validation skipped (SKIP_SEO_VALIDATION=true)\n');
  process.exit(0);
} else {
  main();
}
