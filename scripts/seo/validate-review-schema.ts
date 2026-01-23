#!/usr/bin/env tsx
/**
 * Validate Aggregate Review Schema
 *
 * Tests that aggregate review schema is properly integrated into product pages
 *
 * Usage:
 *   tsx scripts/seo/validate-review-schema.ts
 */

import { useAggregateReview } from '../../src/hooks/useAggregateReview';

interface ValidationResult {
  product: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
  data?: any;
}

const PRODUCTS = ['trial', 'standard', 'family', 'familyAutoship'];
const LOCALES = ['en', 'fr', 'zh'];

function validateReviewData(product: string, locale: string): ValidationResult {
  const result: ValidationResult = {
    product: `${product} (${locale})`,
    passed: true,
    errors: [],
    warnings: [],
  };

  try {
    const { data, schema, displayText } = useAggregateReview(product, locale);
    result.data = { data, schema, displayText };

    // Validate data structure
    if (typeof data.ratingValue !== 'number') {
      result.errors.push(`ratingValue is not a number: ${typeof data.ratingValue}`);
      result.passed = false;
    }

    if (typeof data.reviewCount !== 'number') {
      result.errors.push(`reviewCount is not a number: ${typeof data.reviewCount}`);
      result.passed = false;
    }

    // Validate rating bounds
    if (data.ratingValue < data.worstRating || data.ratingValue > data.bestRating) {
      result.errors.push(`ratingValue ${data.ratingValue} is out of bounds [${data.worstRating}, ${data.bestRating}]`);
      result.passed = false;
    }

    // Validate review count
    if (data.reviewCount <= 0) {
      result.errors.push(`reviewCount must be positive: ${data.reviewCount}`);
      result.passed = false;
    }

    // Validate schema structure
    if (schema['@type'] !== 'AggregateRating') {
      result.errors.push(`Schema @type is not AggregateRating: ${schema['@type']}`);
      result.passed = false;
    }

    if (typeof schema.ratingValue !== 'number') {
      result.errors.push(`Schema ratingValue is not a number: ${typeof schema.ratingValue}`);
      result.passed = false;
    }

    if (typeof schema.reviewCount !== 'number') {
      result.errors.push(`Schema reviewCount is not a number: ${typeof schema.reviewCount}`);
      result.passed = false;
    }

    // Validate display text
    if (!displayText.rating.match(/^\d\.\d$/)) {
      result.warnings.push(`Display rating format unexpected: ${displayText.rating}`);
    }

    if (!displayText.reviewCount.includes(String(data.reviewCount))) {
      result.errors.push(`Display reviewCount doesn't include count: ${displayText.reviewCount}`);
      result.passed = false;
    }

    if (!displayText.full.includes(displayText.rating)) {
      result.errors.push(`Display full text doesn't include rating: ${displayText.full}`);
      result.passed = false;
    }

    // Warnings for review count
    if (data.reviewCount < 10) {
      result.warnings.push(`Low review count: ${data.reviewCount} (Google prefers 10+ reviews)`);
    }

    // Warnings for rating value
    if (data.ratingValue < 4.0) {
      result.warnings.push(`Low rating value: ${data.ratingValue} (consider improving product quality)`);
    }

  } catch (error) {
    result.errors.push(`Exception: ${error instanceof Error ? error.message : String(error)}`);
    result.passed = false;
  }

  return result;
}

function printResult(result: ValidationResult): void {
  const status = result.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`\n${status} ${result.product}`);

  if (result.errors.length > 0) {
    console.log('  Errors:');
    result.errors.forEach(err => console.log(`    - ${err}`));
  }

  if (result.warnings.length > 0) {
    console.log('  Warnings:');
    result.warnings.forEach(warn => console.log(`    - ${warn}`));
  }

  if (result.passed && result.data) {
    console.log(`  Rating: ${result.data.displayText.full}`);
    console.log(`  Schema: ${result.data.schema['@type']} (${result.data.schema.ratingValue}/5)`);
  }
}

function main() {
  console.log('🔍 Validating Aggregate Review Schema\n');

  let totalTests = 0;
  let passedTests = 0;
  const allResults: ValidationResult[] = [];

  // Test all products in all locales
  for (const product of PRODUCTS) {
    for (const locale of LOCALES) {
      totalTests++;
      const result = validateReviewData(product, locale);
      allResults.push(result);
      if (result.passed) passedTests++;
    }
  }

  // Print results
  allResults.forEach(printResult);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`\nSummary: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('\n✅ All aggregate review schema validations passed!');
    console.log('\nNext steps:');
    console.log('1. Deploy to staging environment');
    console.log('2. Test with Google Rich Results Test:');
    console.log('   https://search.google.com/test/rich-results');
    console.log('3. Verify star ratings appear in search results');
    console.log('4. Monitor Google Search Console for rich results');
    process.exit(0);
  } else {
    console.log('\n❌ Some validations failed. Please fix errors above.');
    process.exit(1);
  }
}

main();
