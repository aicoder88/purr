#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fix duplicate classes and remaining critical violations
function cleanupDuplicatesAndFinalFixes(content) {
  let cleaned = content;
  
  // Remove all duplicate dark: classes
  cleaned = cleaned.replace(/(\s)(dark:[\w-\/]+)\s+\2(\s|"|'|>)/g, '$1$2$3');
  
  // Fix specific remaining patterns that weren't caught
  const finalPatterns = [
    // Green checkmarks and indicators
    { from: /(\s)text-green-500(\s|"|'|>)/g, to: '$1text-green-500 dark:text-green-400$2' },
    
    // Star ratings
    { from: /(\s)text-yellow-400(\s|"|'|>)/g, to: '$1text-yellow-400 dark:text-yellow-300$2' },
    
    // Remaining color-800 variants
    { from: /(\s)text-green-800(\s|"|'|>)(?!.*dark:)/g, to: '$1text-green-800 dark:text-green-200$2' },
    { from: /(\s)text-purple-800(\s|"|'|>)(?!.*dark:)/g, to: '$1text-purple-800 dark:text-purple-200$2' },
    { from: /(\s)text-orange-800(\s|"|'|>)(?!.*dark:)/g, to: '$1text-orange-800 dark:text-orange-200$2' },
    { from: /(\s)text-blue-800(\s|"|'|>)(?!.*dark:)/g, to: '$1text-blue-800 dark:text-blue-200$2' },
    { from: /(\s)text-red-700(\s|"|'|>)(?!.*dark:)/g, to: '$1text-red-700 dark:text-red-300$2' },
    { from: /(\s)text-yellow-800(\s|"|'|>)(?!.*dark:)/g, to: '$1text-yellow-800 dark:text-yellow-200$2' },
    
    // Color-600 and 700 variants
    { from: /(\s)text-green-600(\s|"|'|>)(?!.*dark:)/g, to: '$1text-green-600 dark:text-green-400$2' },
    { from: /(\s)text-green-700(\s|"|'|>)(?!.*dark:)/g, to: '$1text-green-700 dark:text-green-300$2' },
    { from: /(\s)text-yellow-600(\s|"|'|>)(?!.*dark:)/g, to: '$1text-yellow-600 dark:text-yellow-400$2' },
    
    // Gray text that still needs fixing
    { from: /(\s)text-gray-700(\s|"|'|>)(?!.*dark:)/g, to: '$1text-gray-700 dark:text-gray-200$2' },
    { from: /(\s)text-gray-400(\s|"|'|>)(?!.*dark:)/g, to: '$1text-gray-400 dark:text-gray-500$2' },
    
    // Special cases for buttons on solid backgrounds (keep text-white as is for readability)
    // Only fix text-white in specific safe contexts
    { from: /(className="[^"]*bg-gradient-to-r[^"]*text-white)(\s|"|'|>)(?!.*dark:)/g, to: '$1 dark:text-gray-100$2' }
  ];
  
  finalPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern.from, pattern.to);
  });
  
  return cleaned;
}

// Target all remaining violated files
const remainingFiles = [
  'pages/free.tsx',
  'pages/learn/faq.tsx',
  'pages/learn/how-it-works.tsx', 
  'pages/learn/how-to-use-deodorizer.tsx',
  'pages/learn/purrify-vs-arm-hammer.tsx',
  'pages/learn/safe-for-kittens.tsx',
  'pages/locations/calgary.tsx',
  'pages/locations/hamilton.tsx',
  'pages/locations/montreal.tsx',
  'pages/locations/ottawa.tsx',
  'pages/locations/quebec-city.tsx',
  'pages/locations/toronto.tsx',
  'pages/locations/vancouver.tsx',
  'pages/products/compare.tsx',
  'pages/solutions/ammonia-smell-cat-litter.tsx',
  'pages/solutions/apartment-cat-smell-solution.tsx',
  'pages/solutions/multiple-cats-odor-control.tsx',
  'pages/solutions/natural-cat-litter-additive.tsx',
  'pages/zh/free.tsx'
];

console.log('🏁 Final Polish - Cleaning duplicates and last violations...\n');

let totalCleaned = 0;

remainingFiles.forEach(fileName => {
  const filePath = path.join('/Users/macmini/VS/purr', fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const cleanedContent = cleanupDuplicatesAndFinalFixes(originalContent);
      
      if (originalContent !== cleanedContent) {
        fs.writeFileSync(filePath, cleanedContent);
        console.log(`✅ Polished ${fileName}`);
        totalCleaned++;
      } else {
        console.log(`⚪ Already clean: ${fileName}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${fileName}`);
  }
});

console.log("\n🎉 Final polish complete!");
console.log(`📊 Cleaned ${totalCleaned} files`);
console.log("✨ All duplicates removed, critical violations addressed");
console.log("🔍 Ready for final validation...");