#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Surgical fixes for the final 27 violations
function applySurgicalFixes(content) {
  let surgical = content;
  
  // Surgical Fix 1: Exact pattern - <p className="text-purple-800 mb-3">
  surgical = surgical.replace(
    /(className="[^"]*?)text-purple-800(\s[^"]*mb-3">)/g,
    '$1text-purple-800 dark:text-purple-200$2'
  );
  
  // Surgical Fix 2: Exact pattern - <p className="text-orange-800 mb-3">
  surgical = surgical.replace(
    /(className="[^"]*?)text-orange-800(\s[^"]*mb-3">)/g,
    '$1text-orange-800 dark:text-orange-200$2'
  );
  
  // Surgical Fix 3: Exact pattern - <p className="text-blue-800">
  surgical = surgical.replace(
    /(className="[^"]*?)text-blue-800(">)/g,
    '$1text-blue-800 dark:text-blue-200$2'
  );
  
  // Surgical Fix 4: Exact pattern - <p className="text-green-800">
  surgical = surgical.replace(
    /(className="[^"]*?)text-green-800(">)/g,
    '$1text-green-800 dark:text-green-200$2'
  );
  
  // Surgical Fix 5: Remaining gray-700 variants
  surgical = surgical.replace(
    /(className="[^"]*?)text-gray-700(\s[^"]*space-y-2">)/g,
    '$1text-gray-700 dark:text-gray-200$2'
  );
  surgical = surgical.replace(
    /(className="[^"]*?)text-gray-700(">)/g,
    '$1text-gray-700 dark:text-gray-200$2'
  );
  surgical = surgical.replace(
    /(className="[^"]*?)text-gray-700(\s[^"]*mb-6">)/g,
    '$1text-gray-700 dark:text-gray-200$2'
  );
  
  // Surgical Fix 6: Specific learn page patterns for text-green-800 text-sm
  surgical = surgical.replace(
    /(className="[^"]*?)text-green-800(\s[^"]*text-sm">)/g,
    '$1text-green-800 dark:text-green-200$2'
  );
  
  // Surgical Fix 7: Blockquote with text-blue-800 italic
  surgical = surgical.replace(
    /(className="[^"]*?)text-blue-800(\s[^"]*italic[^"]*>)/g,
    '$1text-blue-800 dark:text-blue-200$2'
  );
  
  // Surgical Fix 8: Button hover states - only for specific safe patterns
  // For text-white on solid color backgrounds, add subtle fallback
  surgical = surgical.replace(
    /(hover:bg-\[#03E46A\]\s+hover:)text-white/g,
    '$1text-white dark:text-gray-100'
  );
  
  // Surgical Fix 9: Step numbers with text-white on gradients (keep as-is for contrast)
  // This is intentionally left as-is for brand consistency and contrast
  
  // Surgical Fix 10: Table headers with branded backgrounds (keep as-is)
  // These should remain text-white for proper contrast on branded backgrounds
  
  return surgical;
}

// Target only the 7 files with remaining violations
const surgicalTargets = [
  'pages/free.tsx',              // 1 violation (commented code - skip)
  'pages/learn/faq.tsx',         // 1 violation (button hover)
  'pages/learn/how-it-works.tsx', // 1 violation (gradient text-white)
  'pages/learn/how-to-use-deodorizer.tsx', // 12 violations (paragraphs)
  'pages/learn/purrify-vs-arm-hammer.tsx', // 4 violations (paragraphs)
  'pages/learn/safe-for-kittens.tsx',      // 7 violations (paragraphs)
  'pages/products/compare.tsx'   // 4 violations (branded elements)
];

console.log('🔬 Surgical Precision - Final 27 Violations...\n');

let surgicalFixed = 0;

surgicalTargets.forEach(fileName => {
  const filePath = path.join('/Users/macmini/VS/purr', fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const surgicalContent = applySurgicalFixes(originalContent);
      
      if (originalContent !== surgicalContent) {
        fs.writeFileSync(filePath, surgicalContent);
        console.log(`✅ Surgical fixes applied to ${fileName}`);
        surgicalFixed++;
      } else {
        console.log(`⚪ No surgical changes for ${fileName} (may be intentional)`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${fileName}`);
  }
});

console.log(`\n🔬 Surgical operation complete!`);
console.log(`📊 Applied surgical fixes to ${surgicalFixed} files`);
console.log(`🎯 Targeting exact patterns for maximum compliance`);
console.log(`🏥 Some violations may be intentionally preserved for design/branding`);
console.log(`🔍 Running final validation...`);

// Run final validation
console.log('\n🔍 Running final validation to show results...\n');
const { execSync } = require('child_process');
try {
  execSync('npm run validate-dark-mode', { stdio: 'inherit' });
} catch (error) {
  // Validation results will show in output
}