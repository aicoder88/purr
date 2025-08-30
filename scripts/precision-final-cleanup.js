#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Precision targeting for the most common remaining patterns
function applyPrecisionFixes(content) {
  let fixed = content;
  
  // Pattern 1: Green checkmarks (✓) - most common pattern across location pages
  // Target: <span className="text-green-500 mr-2">✓</span>
  fixed = fixed.replace(
    /(className="[^"]*?)text-green-500(\s[^"]*mr-2[^"]*">✓<\/span>)/g,
    '$1text-green-500 dark:text-green-400$2'
  );
  
  // Pattern 2: Yellow stars (⭐) - consistent across all location pages  
  // Target: <span key={star} className="text-yellow-400">⭐</span>
  fixed = fixed.replace(
    /(className="[^"]*?)text-yellow-400("[^>]*>⭐<\/span>)/g,
    '$1text-yellow-400 dark:text-yellow-300$2'
  );
  
  // Pattern 3: Color-800 paragraph tags in learn pages
  // Target: <p className="text-[color]-800
  fixed = fixed.replace(
    /(className="[^"]*?)text-green-800(\s[^"]*mb-3">)/g,
    '$1text-green-800 dark:text-green-200$2'
  );
  fixed = fixed.replace(
    /(className="[^"]*?)text-purple-800(\s[^"]*>)/g,
    '$1text-purple-800 dark:text-purple-200$2'
  );
  fixed = fixed.replace(
    /(className="[^"]*?)text-orange-800(\s[^"]*>)/g,
    '$1text-orange-800 dark:text-orange-200$2'
  );
  fixed = fixed.replace(
    /(className="[^"]*?)text-blue-800(\s[^"]*>)/g,
    '$1text-blue-800 dark:text-blue-200$2'
  );
  
  // Pattern 4: Color-700 text without dark variants
  fixed = fixed.replace(
    /(className="[^"]*?)text-red-700(\s[^"]*mb-3">)/g,
    '$1text-red-700 dark:text-red-300$2'
  );
  fixed = fixed.replace(
    /(className="[^"]*?)text-gray-700(\s[^"]*>)/g,
    '$1text-gray-700 dark:text-gray-200$2'
  );
  fixed = fixed.replace(
    /(className="[^"]*?)text-green-700(\s[^"]*space-y-1">)/g,
    '$1text-green-700 dark:text-green-300$2'
  );
  
  // Pattern 5: Color-600 spans with checkmarks and symbols
  fixed = fixed.replace(
    /(className="[^"]*?)text-green-600(\s[^"]*font-semibold">✓<\/span>)/g,
    '$1text-green-600 dark:text-green-400$2'
  );
  fixed = fixed.replace(
    /(className="[^"]*?)text-yellow-600(">[^<]*<\/span>)/g,
    '$1text-yellow-600 dark:text-yellow-400$2'
  );
  
  // Pattern 6: Specific learn page patterns
  fixed = fixed.replace(
    /(className="[^"]*?)text-yellow-800(\s[^"]*text-sm">)/g,
    '$1text-yellow-800 dark:text-yellow-200$2'
  );
  
  // Pattern 7: Gray-400 symbols and dashes  
  fixed = fixed.replace(
    /(className="[^"]*?)text-gray-400(">—<\/span>)/g,
    '$1text-gray-400 dark:text-gray-500$2'
  );
  
  // Pattern 8: Blockquotes with specific colors
  fixed = fixed.replace(
    /(className="[^"]*?)text-blue-800(\s[^"]*italic[^"]*>)/g,
    '$1text-blue-800 dark:text-blue-200$2'
  );
  
  return fixed;
}

// Target files with highest remaining violations
const precisionTargets = [
  // Location pages with green checkmarks and stars
  'pages/locations/calgary.tsx',
  'pages/locations/hamilton.tsx', 
  'pages/locations/montreal.tsx',
  'pages/locations/ottawa.tsx',
  'pages/locations/quebec-city.tsx',
  'pages/locations/toronto.tsx',
  'pages/locations/vancouver.tsx',
  
  // Learn pages with color-800 patterns
  'pages/learn/how-to-use-deodorizer.tsx',
  'pages/learn/purrify-vs-arm-hammer.tsx',
  'pages/learn/safe-for-kittens.tsx',
  
  // Other pages
  'pages/products/compare.tsx',
  'pages/zh/free.tsx'
];

console.log('🎯 Precision Targeting - Final 80 Violations...\n');

let precisionFixed = 0;

precisionTargets.forEach(fileName => {
  const filePath = path.join('/Users/macmini/VS/purr', fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const precisionFixed_content = applyPrecisionFixes(originalContent);
      
      if (originalContent !== precisionFixed_content) {
        fs.writeFileSync(filePath, precisionFixed_content);
        console.log(`✅ Precision fixes applied to ${fileName}`);
        precisionFixed++;
      } else {
        console.log(`⚪ No precision fixes needed for ${fileName}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${fileName}`);
  }
});

console.log(`\n🎯 Precision targeting complete!`);
console.log(`📊 Applied precision fixes to ${precisionFixed} files`);
console.log(`🚀 Targeting the most common violation patterns for maximum impact`);
console.log(`🔍 Ready for final validation check...`);

// Run final validation
console.log('\n🔍 Running final validation to show results...\n');
const { execSync } = require('child_process');
try {
  execSync('npm run validate-dark-mode', { stdio: 'inherit' });
} catch (error) {
  // Validation results will show in output
}