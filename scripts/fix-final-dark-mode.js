#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌙 Final Dark Mode Fixes - Complex Patterns');
console.log('==========================================');

// Advanced pattern fixes for remaining complex violations
const finalFixes = [
  // Focus states - these need special handling
  { pattern: /focus:bg-white(?! dark:)/g, replacement: 'focus:bg-white dark:focus:bg-gray-800' },
  { pattern: /focus:bg-gray-800(?! dark:)/g, replacement: 'focus:bg-gray-800 dark:focus:bg-gray-700' },

  // Complex hover patterns that were missed
  { pattern: /hover:bg-white(?! dark:)/g, replacement: 'hover:bg-white dark:hover:bg-gray-700' },
  { pattern: /hover:bg-gray-50(?! dark:)/g, replacement: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
  { pattern: /hover:bg-gray-100(?! dark:)/g, replacement: 'hover:bg-gray-100 dark:hover:bg-gray-700' },
  { pattern: /hover:bg-blue-50(?! dark:)/g, replacement: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
  { pattern: /hover:bg-red-50(?! dark:)/g, replacement: 'hover:bg-red-50 dark:hover:bg-red-900/20' },

  // Solid color backgrounds that need dark variants
  { pattern: /bg-blue-500(?! dark:)/g, replacement: 'bg-blue-500 dark:bg-blue-600' },
  { pattern: /bg-green-500(?! dark:)/g, replacement: 'bg-green-500 dark:bg-green-600' },
  { pattern: /bg-red-500(?! dark:)/g, replacement: 'bg-red-500 dark:bg-red-600' },
  { pattern: /bg-purple-500(?! dark:)/g, replacement: 'bg-purple-500 dark:bg-purple-600' },
  { pattern: /bg-orange-500(?! dark:)/g, replacement: 'bg-orange-500 dark:bg-orange-600' },
  { pattern: /bg-yellow-500(?! dark:)/g, replacement: 'bg-yellow-500 dark:bg-yellow-600' },
  { pattern: /bg-teal-500(?! dark:)/g, replacement: 'bg-teal-500 dark:bg-teal-600' },
  { pattern: /bg-indigo-500(?! dark:)/g, replacement: 'bg-indigo-500 dark:bg-indigo-600' },

  // Text colors
  { pattern: /text-blue-600(?! dark:)/g, replacement: 'text-blue-600 dark:text-blue-400' },
  { pattern: /text-green-600(?! dark:)/g, replacement: 'text-green-600 dark:text-green-400' },
  { pattern: /text-red-600(?! dark:)/g, replacement: 'text-red-600 dark:text-red-400' },
  { pattern: /text-purple-600(?! dark:)/g, replacement: 'text-purple-600 dark:text-purple-400' },
  { pattern: /text-orange-600(?! dark:)/g, replacement: 'text-orange-600 dark:text-orange-400' },

  // Specific patterns from validation output
  { pattern: /bg-white(?! dark:)(?=.*dark:hover:bg-gray-700)/g, replacement: 'bg-white dark:bg-gray-900' },
  { pattern: /bg-gray-700(?! dark:)(?=.*hover:bg-white)/g, replacement: 'bg-gray-700 dark:bg-gray-600' },
  { pattern: /bg-blue-900(?! dark:)(?=.*hover:bg-blue-50)/g, replacement: 'bg-blue-900 dark:bg-blue-800' },

  // Border patterns
  { pattern: /border-white(?! dark:)/g, replacement: 'border-white dark:border-gray-600' },
  { pattern: /border-gray-300(?! dark:)/g, replacement: 'border-gray-300 dark:border-gray-600' },
];

// Get all files that have dark mode violations
const problemFiles = [
  'pages/404.tsx', 'pages/_document.tsx', 'pages/_error.tsx', 'pages/b2b.tsx',
  'pages/case-studies.tsx', 'pages/customer/portal.tsx', 'pages/customers/case-studies.tsx',
  'pages/dn.tsx', 'pages/free.tsx', 'pages/learn/activated-carbon-benefits.tsx',
  'pages/learn/cat-litter-guide.tsx', 'pages/learn/faq.tsx', 'pages/learn/how-it-works.tsx',
  'pages/learn/how-to-use-deodorizer.tsx', 'pages/learn/purrify-vs-arm-hammer.tsx',
  'pages/learn/science.tsx', 'pages/learn/using-deodorizers-with-kittens.tsx',
  'pages/montreal.tsx', 'pages/products/compare.tsx', 'pages/products/family-pack.tsx',
  'pages/products/standard.tsx', 'pages/products/trial-size.tsx', 'pages/reviews.tsx',
  'pages/solutions/apartment-cat-smell-solution.tsx', 'pages/solutions/multiple-cats-odor-control.tsx',
  'pages/solutions/natural-cat-litter-additive.tsx', 'pages/stockists.tsx',
  'pages/support/contact.tsx', 'pages/support/shipping.tsx', 'pages/thank-you.tsx',
  'src/components/bundles/SmartBundles.tsx', 'src/components/conversion/ConversionOptimizer.tsx',
  'src/components/customer/CustomerAuth.tsx', 'src/components/mobile/FastCheckout.tsx',
  'src/components/optimization/ABTesting.tsx', 'src/components/referrals/ViralReferralSystem.tsx',
  'src/components/sections/free-giveaway-form.tsx', 'src/components/sections/retailer-contact.tsx',
  'src/components/sections/retailer-hero.tsx', 'src/components/sections/wholesale-pricing.tsx',
  'src/components/sections/why-purrify.tsx', 'src/components/social-proof/LivePurchaseNotifications.tsx',
  'src/components/ui/scroll-to-top.tsx', 'src/components/ui/shopping-cart.tsx',
  'src/components/ui/skip-nav.tsx', 'src/components/video/SolutionVideos.tsx',
  'src/components/video/VideoPlayer.tsx'
];

// Apply fixes to a file
function fixFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return 0;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changeCount = 0;

    for (const fix of finalFixes) {
      const matches = content.match(fix.pattern);
      if (matches) {
        content = content.replace(fix.pattern, fix.replacement);
        changeCount += matches.length;
      }
    }

    if (changeCount > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${filePath}: Fixed ${changeCount} violations`);
      return changeCount;
    }

    return 0;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return 0;
  }
}

console.log(`📁 Processing ${problemFiles.length} files with remaining violations`);

let totalFixes = 0;
let fixedFiles = 0;

for (const file of problemFiles) {
  const fixes = fixFile(file);
  if (fixes > 0) {
    totalFixes += fixes;
    fixedFiles++;
  }
}

console.log('\n🎉 Final Fixes Results:');
console.log(`Files processed: ${problemFiles.length}`);
console.log(`Files fixed: ${fixedFiles}`);
console.log(`Total fixes applied: ${totalFixes}`);

// Run validation to see remaining issues
console.log('\n🔍 Running validation to check progress...');
const { execSync } = require('child_process');
try {
  execSync('npm run validate-dark-mode', { stdio: 'inherit' });
  console.log('\n🎉 All dark mode violations fixed!');
} catch (e) {
  console.log('\n⚠️ Some violations may remain - checking specific patterns...');
}