#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌙 Dark Mode Remaining Issues Fix');
console.log('================================');

// More complex pattern fixes for remaining violations
const complexFixes = [
  // Background colors with transparency - most common remaining issues
  { pattern: /bg-blue-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-blue-500/$1 dark:bg-blue-600/$1' },
  { pattern: /bg-green-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-green-500/$1 dark:bg-green-600/$1' },
  { pattern: /bg-red-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-red-500/$1 dark:bg-red-600/$1' },
  { pattern: /bg-purple-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-purple-500/$1 dark:bg-purple-600/$1' },
  { pattern: /bg-orange-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-orange-500/$1 dark:bg-orange-600/$1' },
  { pattern: /bg-teal-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-teal-500/$1 dark:bg-teal-600/$1' },
  { pattern: /bg-yellow-500\/([0-9]+)(?! dark:)/g, replacement: 'bg-yellow-500/$1 dark:bg-yellow-600/$1' },

  // Border colors with transparency
  { pattern: /border-blue-300\/([0-9]+)(?! dark:)/g, replacement: 'border-blue-300/$1 dark:border-blue-600/$1' },
  { pattern: /border-green-300\/([0-9]+)(?! dark:)/g, replacement: 'border-green-300/$1 dark:border-green-600/$1' },
  { pattern: /border-purple-300\/([0-9]+)(?! dark:)/g, replacement: 'border-purple-300/$1 dark:border-purple-600/$1' },
  { pattern: /border-orange-300\/([0-9]+)(?! dark:)/g, replacement: 'border-orange-300/$1 dark:border-orange-600/$1' },
  { pattern: /border-teal-300\/([0-9]+)(?! dark:)/g, replacement: 'border-teal-300/$1 dark:border-teal-600/$1' },

  // Solid borders without transparency
  { pattern: /border-gray-200(?! dark:)/g, replacement: 'border-gray-200 dark:border-gray-600' },
  { pattern: /border-red-200(?! dark:)/g, replacement: 'border-red-200 dark:border-red-600' },
  { pattern: /border-green-200(?! dark:)/g, replacement: 'border-green-200 dark:border-green-600' },
  { pattern: /border-blue-200(?! dark:)/g, replacement: 'border-blue-200 dark:border-blue-600' },
  { pattern: /border-green-400(?! dark:)/g, replacement: 'border-green-400 dark:border-green-500' },
  { pattern: /border-red-400(?! dark:)/g, replacement: 'border-red-400 dark:border-red-500' },
  { pattern: /border-blue-400(?! dark:)/g, replacement: 'border-blue-400 dark:border-blue-500' },
  { pattern: /border-purple-400(?! dark:)/g, replacement: 'border-purple-400 dark:border-purple-500' },
  { pattern: /border-orange-400(?! dark:)/g, replacement: 'border-orange-400 dark:border-orange-500' },

  // Specific colored backgrounds
  { pattern: /bg-gray-100(?! dark:)/g, replacement: 'bg-gray-100 dark:bg-gray-700' },
  { pattern: /bg-purple-50(?! dark:)/g, replacement: 'bg-purple-50 dark:bg-purple-900/20' },
  { pattern: /bg-teal-50(?! dark:)/g, replacement: 'bg-teal-50 dark:bg-teal-900/20' },

  // Text colors that were missed
  { pattern: /text-teal-900(?! dark:)/g, replacement: 'text-teal-900 dark:text-teal-100' },
  { pattern: /text-teal-800(?! dark:)/g, replacement: 'text-teal-800 dark:text-teal-200' },
  { pattern: /text-teal-700(?! dark:)/g, replacement: 'text-teal-700 dark:text-teal-300' },

  // Background colors for specific use cases
  { pattern: /bg-blue-500\/10(?! dark:)/g, replacement: 'bg-blue-500/10 dark:bg-blue-600/20' },
  { pattern: /bg-green-500\/10(?! dark:)/g, replacement: 'bg-green-500/10 dark:bg-green-600/20' },
];

// Apply fixes to a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changeCount = 0;

    for (const fix of complexFixes) {
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

// Get files from validation output - files that still have issues
const problemFiles = [
  'pages/dn.tsx', 'pages/learn/how-to-use-deodorizer.tsx'
];

console.log(`📁 Targeting ${problemFiles.length} files with remaining issues`);

let totalFixes = 0;
let fixedFiles = 0;

for (const file of problemFiles) {
  if (fs.existsSync(file)) {
    const fixes = fixFile(file);
    if (fixes > 0) {
      totalFixes += fixes;
      fixedFiles++;
    }
  }
}

console.log('\n🎉 Complex Fixes Results:');
console.log(`Files processed: ${problemFiles.length}`);
console.log(`Files fixed: ${fixedFiles}`);
console.log(`Total fixes applied: ${totalFixes}`);