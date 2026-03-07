/**
 * Pre-Build SEO Validation Orchestrator
 * Runs all SEO validations before build and determines if build should proceed
 */

import { validateAllPages } from './validate-seo-compliance';
import { validateAllImages } from './lib/image-validator';
import { validateAllCanonicals } from './lib/canonical-validator';
import { validateSupportedLocaleSurface } from './validate-supported-locales';

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
    supportedLocales?: {
      passed: boolean;
      errors: number;
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

  // 4. Prevent unsupported locales from leaking into crawlable SEO surfaces.
  console.log('4️⃣  Validating Supported Locale SEO Surface...\n');
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

    if (summary.details.supportedLocales) {
      console.log(`Supported locales: ${summary.details.supportedLocales.errors} errors`);
    }

    console.log('═'.repeat(70));

    if (summary.passed) {
      console.log('✅ Pre-build validation PASSED - Build can proceed\n');
      process.exit(0);
    } else {
      console.log('❌ Pre-build validation FAILED - Critical issues found\n');
      console.log('Fix critical issues before building for production.');
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
