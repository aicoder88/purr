#!/usr/bin/env tsx
/**
 * Fix Structured Data Errors Script
 * 
 * This script addresses the errors reported in Google Search Console:
 * 1. Removes " | Free Delivery | Purrify | Purrify" duplicate suffix from titles
 * 2. Fixes missing `image` field for Merchant listing
 * 3. Fixes missing `price` or `priceSpecification.price` field for nested Offer
 * 
 * Affected URLs from CSV:
 * - /locations/brampton/, /calgary/, /edmonton/, /montreal/, /surrey/, /vancouver/
 * - /products/
 * - /learn/safety/
 * - /retailers/
 * - /us/
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Translation files that contain the problematic title pattern
  translationFiles: [
    'src/translations/namespaces/en/locations.json',
    'src/translations/en.ts',
    'src/i18n/messages/en.json',
  ],
  
  // Files containing structured data that needs fixing
  structuredDataFiles: [
    'app/locations/[citySlug]/page.tsx',
    'src/components/sections/locations/createCityPage.tsx',
    'src/lib/seo/structured-data-generator.ts',
    'src/components/seo/AdvancedStructuredData.tsx',
    'src/lib/seo-utils.ts',
  ],

  // Patterns to fix in titles
  titlePatterns: [
    { 
      search: /\|\s*Free Delivery\s*\|\s*Purrify\s*\|\s*Purrify/gi, 
      replace: '| Purrify' 
    },
    { 
      search: /\|\s*Free Delivery\s*\|\s*Purrify/gi, 
      replace: '| Purrify' 
    },
    { 
      search: /\|\s*Purrify\s*\|\s*Purrify/gi, 
      replace: '| Purrify' 
    },
  ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

interface FixResult {
  file: string;
  fixed: boolean;
  changes: string[];
  error?: string;
}

/**
 * Read file content
 */
function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Write file content
 */
function writeFile(filePath: string, content: string): boolean {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filePath}:`, error);
    return false;
  }
}

/**
 * Fix duplicate Purrify suffixes in content
 */
function fixDuplicateSuffixes(content: string, fileName: string): { fixed: boolean; newContent: string; changes: string[] } {
  let newContent = content;
  const changes: string[] = [];
  
  for (const pattern of CONFIG.titlePatterns) {
    const matches = newContent.match(pattern.search);
    if (matches) {
      const count = matches.length;
      newContent = newContent.replace(pattern.search, pattern.replace);
      changes.push(`Fixed ${count} occurrence(s) of "${pattern.search.source}" → "${pattern.replace}"`);
    }
  }
  
  return {
    fixed: newContent !== content,
    newContent,
    changes
  };
}

/**
 * Fix translation files
 */
function fixTranslationFiles(): FixResult[] {
  const results: FixResult[] = [];
  
  console.log('\n📄 Fixing translation files...\n');
  
  for (const file of CONFIG.translationFiles) {
    const filePath = path.resolve(process.cwd(), file);
    
    if (!fs.existsSync(filePath)) {
      results.push({
        file,
        fixed: false,
        changes: [],
        error: 'File not found'
      });
      continue;
    }
    
    const content = readFile(filePath);
    if (!content) continue;
    
    const { fixed, newContent, changes } = fixDuplicateSuffixes(content, file);
    
    if (fixed) {
      if (writeFile(filePath, newContent)) {
        results.push({ file, fixed: true, changes });
        console.log(`✅ Fixed: ${file}`);
        changes.forEach(c => console.log(`   ${c}`));
      } else {
        results.push({ file, fixed: false, changes: [], error: 'Write failed' });
      }
    } else {
      results.push({ file, fixed: false, changes: ['No issues found'] });
      console.log(`⏭️  Skipped: ${file} (no issues)`);
    }
  }
  
  return results;
}

/**
 * Generate fix report for structured data issues
 */
function generateStructuredDataReport(): string {
  const report = `
# Structured Data Fix Report

## Issues Identified from CSV

### 1. Missing \`image\` field for Merchant listing
**Affected URLs:**
- /locations/brampton/
- /locations/calgary/
- /locations/edmonton/
- /locations/montreal/
- /locations/surrey/
- /locations/vancouver/
- /products/

**Fix Required:**
Add image field to Product structured data in the offers:
\`\`\`typescript
// In createCityPage.tsx, add to Product schema:
image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
\`\`\`

### 2. Missing \`price\` or \`priceSpecification.price\` for nested Offer
**Affected URLs:** Same as above

**Fix Required:**
Ensure Offer has price field:
\`\`\`typescript
offers: {
  '@type': 'Offer',
  price: '29.99',  // Add actual product price
  priceCurrency: 'CAD',
  // ... rest of offer
}
\`\`\`

### 3. Missing \`address\` field for Local Business
**Affected URLs:**
- /locations/brampton/
- /locations/calgary/
- /locations/edmonton/
- /locations/montreal/
- /locations/surrey/
- /locations/vancouver/

**Fix Required:**
Add address to LocalBusiness schema:
\`\`\`typescript
address: {
  '@type': 'PostalAddress',
  addressLocality: cityName,
  addressRegion: province,
  addressCountry: 'CA'
}
\`\`\`

### 4. Missing \`aggregateRating\` or \`offers\` or \`review\` for Product snippet
**Affected URLs:**
- /learn/safety/
- /locations/* (all city pages)
- /retailers/
- /us/

**Note:** These pages have Product markup without required fields. 
Recommendation: Either:
a) Add the required fields (offers with price)
b) Remove Product schema if not actually selling products on these pages

## Manual Fixes Required

The following files need manual code changes:

1. **app/locations/[citySlug]/page.tsx**
   - Update generateLocalBusinessSchema to include address
   
2. **src/components/sections/locations/createCityPage.tsx**
   - Add image field to Product schema (around line 363)
   - Add price field to Offer schema
   - Add address to LocalBusiness schema (around line 381)

3. **src/lib/seo-utils.ts**
   - Update generateLocalBusinessSchema function to always include address
   - Update generateProductPageSchema to ensure image is included in offers

4. **app/learn/safety/page.tsx** (if it has Product schema)
   - Remove Product schema or add required offers/review fields

5. **app/retailers/page.tsx** (if it has Product schema)
   - Remove Product schema or add required offers/review fields

6. **app/us/page.tsx** (if it has Product schema)
   - Remove Product schema or add required offers/review fields
`;

  return report;
}

/**
 * Fix the createCityPage.tsx structured data
 */
function fixCreateCityPage(): FixResult {
  const filePath = path.resolve(process.cwd(), 'src/components/sections/locations/createCityPage.tsx');
  
  if (!fs.existsSync(filePath)) {
    return {
      file: 'createCityPage.tsx',
      fixed: false,
      changes: [],
      error: 'File not found'
    };
  }
  
  let content = readFile(filePath);
  if (!content) {
    return {
      file: 'createCityPage.tsx',
      fixed: false,
      changes: [],
      error: 'Read failed'
    };
  }
  
  const changes: string[] = [];
  
  // Fix 1: Add image to Product schema (around line 363-378)
  if (content.includes("'@type': 'Product',") && !content.includes("image:")) {
    // Find the Product schema and add image
    content = content.replace(
      /('@type': 'Product',\s*name: `Purrify Cat Litter Odor Eliminator - \$\{profile\.name\}`)/,
      `$1,\n                image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',`
    );
    changes.push('Added image field to Product schema');
  }
  
  // Fix 2: Add price to Offer schema
  if (content.includes("'@type': 'Offer',") && !content.includes('price:')) {
    content = content.replace(
      /('@type': 'Offer',\s*availability:)/,
      `'@type': 'Offer',
                  price: '29.99',
                  priceCurrency: 'CAD',
                  availability:`
    );
    changes.push('Added price field to Offer schema');
  }
  
  // Fix 3: Add address to LocalBusiness schema
  if (content.includes("'@type': 'LocalBusiness',") && !content.includes("address:")) {
    content = content.replace(
      /(makesOffer: \{\s*'@type': 'Offer',)/,
      `address: {
                  '@type': 'PostalAddress',
                  addressLocality: profile.name,
                  addressRegion: provinceName,
                  addressCountry: 'CA',
                },
                makesOffer: {
                  '@type': 'Offer',`
    );
    changes.push('Added address field to LocalBusiness schema');
  }
  
  const fixed = changes.length > 0;
  
  if (fixed) {
    if (writeFile(filePath, content)) {
      console.log(`✅ Fixed: createCityPage.tsx`);
      changes.forEach(c => console.log(`   ${c}`));
      return { file: 'createCityPage.tsx', fixed: true, changes };
    } else {
      return { file: 'createCityPage.tsx', fixed: false, changes: [], error: 'Write failed' };
    }
  }
  
  return { file: 'createCityPage.tsx', fixed: false, changes: ['No automatic fixes applied - may need manual review'] };
}

/**
 * Fix seo-utils.ts for LocalBusiness schema
 */
function fixSeoUtils(): FixResult {
  const filePath = path.resolve(process.cwd(), 'src/lib/seo-utils.ts');
  
  if (!fs.existsSync(filePath)) {
    return {
      file: 'seo-utils.ts',
      fixed: false,
      changes: [],
      error: 'File not found'
    };
  }
  
  let content = readFile(filePath);
  if (!content) {
    return {
      file: 'seo-utils.ts',
      fixed: false,
      changes: [],
      error: 'Read failed'
    };
  }
  
  const changes: string[] = [];
  
  // Check if generateLocalBusinessSchema already has address in the return object
  const hasAddressInReturn = /generateLocalBusinessSchema[\s\S]*?return\s*\{[\s\S]*?address:/.test(content);
  
  if (!hasAddressInReturn) {
    changes.push('Note: generateLocalBusinessSchema function needs manual review to ensure address is always included');
  }
  
  return { file: 'seo-utils.ts', fixed: false, changes };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║     Fix Structured Data Errors - Google Search Console         ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  
  const allResults: FixResult[] = [];
  
  // Step 1: Fix translation files (duplicate suffixes)
  const translationResults = fixTranslationFiles();
  allResults.push(...translationResults);
  
  // Step 2: Fix createCityPage.tsx
  console.log('\n📄 Fixing createCityPage.tsx structured data...\n');
  const cityPageResult = fixCreateCityPage();
  allResults.push(cityPageResult);
  
  // Step 3: Check seo-utils.ts
  console.log('\n📄 Checking seo-utils.ts...\n');
  const seoUtilsResult = fixSeoUtils();
  allResults.push(seoUtilsResult);
  
  // Step 4: Generate report
  console.log('\n📋 Generating detailed report...\n');
  const report = generateStructuredDataReport();
  const reportPath = path.resolve(process.cwd(), 'STRUCTURED_DATA_FIX_REPORT.md');
  writeFile(reportPath, report);
  console.log(`✅ Report saved to: ${reportPath}`);
  
  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                         SUMMARY                                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  
  const fixedCount = allResults.filter(r => r.fixed).length;
  const errorCount = allResults.filter(r => r.error).length;
  
  console.log(`\n✅ Files fixed: ${fixedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📄 Total files processed: ${allResults.length}`);
  
  console.log('\n📋 Detailed Results:');
  allResults.forEach(result => {
    const status = result.fixed ? '✅' : result.error ? '❌' : '⏭️';
    console.log(`\n${status} ${result.file}`);
    if (result.changes.length > 0) {
      result.changes.forEach(change => console.log(`   → ${change}`));
    }
    if (result.error) {
      console.log(`   ⚠️  Error: ${result.error}`);
    }
  });
  
  console.log('\n⚠️  IMPORTANT: Some fixes require manual code changes.');
  console.log('   Please review STRUCTURED_DATA_FIX_REPORT.md for details.\n');
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { fixDuplicateSuffixes, fixTranslationFiles, generateStructuredDataReport };
