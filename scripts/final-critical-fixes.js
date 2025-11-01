#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Critical color mappings for remaining violations
const colorMappings = [
  // Text colors
  { pattern: /(\s)text-white(\s|"|'|>)/g, to: '$1text-white dark:text-gray-100$2' },
  { pattern: /(\s)text-gray-900(\s|"|'|>)/g, to: '$1text-gray-900 dark:text-gray-50$2' },
  { pattern: /(\s)text-gray-800(\s|"|'|>)/g, to: '$1text-gray-800 dark:text-gray-100$2' },
  { pattern: /(\s)text-gray-700(\s|"|'|>)/g, to: '$1text-gray-700 dark:text-gray-200$2' },
  { pattern: /(\s)text-gray-600(\s|"|'|>)/g, to: '$1text-gray-600 dark:text-gray-300$2' },
  { pattern: /(\s)text-gray-500(\s|"|'|>)/g, to: '$1text-gray-500 dark:text-gray-400$2' },
  { pattern: /(\s)text-gray-400(\s|"|'|>)/g, to: '$1text-gray-400 dark:text-gray-500$2' },
  
  // Color-specific variants
  { pattern: /(\s)text-red-700(\s|"|'|>)/g, to: '$1text-red-700 dark:text-red-300$2' },
  { pattern: /(\s)text-red-600(\s|"|'|>)/g, to: '$1text-red-600 dark:text-red-400$2' },
  { pattern: /(\s)text-red-800(\s|"|'|>)/g, to: '$1text-red-800 dark:text-red-200$2' },
  { pattern: /(\s)text-green-600(\s|"|'|>)/g, to: '$1text-green-600 dark:text-green-400$2' },
  { pattern: /(\s)text-green-700(\s|"|'|>)/g, to: '$1text-green-700 dark:text-green-300$2' },
  { pattern: /(\s)text-green-800(\s|"|'|>)/g, to: '$1text-green-800 dark:text-green-200$2' },
  { pattern: /(\s)text-green-500(\s|"|'|>)/g, to: '$1text-green-500 dark:text-green-400$2' },
  { pattern: /(\s)text-blue-800(\s|"|'|>)/g, to: '$1text-blue-800 dark:text-blue-200$2' },
  { pattern: /(\s)text-purple-800(\s|"|'|>)/g, to: '$1text-purple-800 dark:text-purple-200$2' },
  { pattern: /(\s)text-orange-800(\s|"|'|>)/g, to: '$1text-orange-800 dark:text-orange-200$2' },
  { pattern: /(\s)text-orange-700(\s|"|'|>)/g, to: '$1text-orange-700 dark:text-orange-300$2' },
  { pattern: /(\s)text-yellow-400(\s|"|'|>)/g, to: '$1text-yellow-400 dark:text-yellow-300$2' },
  { pattern: /(\s)text-yellow-600(\s|"|'|>)/g, to: '$1text-yellow-600 dark:text-yellow-400$2' },
  { pattern: /(\s)text-indigo-700(\s|"|'|>)/g, to: '$1text-indigo-700 dark:text-indigo-300$2' },
  { pattern: /(\s)text-indigo-600(\s|"|'|>)/g, to: '$1text-indigo-600 dark:text-indigo-400$2' },
  { pattern: /(\s)text-indigo-200(\s|"|'|>)/g, to: '$1text-indigo-200 dark:text-indigo-400$2' },
];

// Files with highest violation counts (from validation results)
const criticalFiles = [
  'pages/learn/how-to-use-deodorizer.tsx',
  'pages/learn/purrify-vs-arm-hammer.tsx', 
  'pages/learn/faq.tsx',
  'pages/learn/cat-litter-guide.tsx',
  'pages/learn/how-it-works.tsx',
  'pages/products/trial-size.tsx',
  'pages/free.tsx',
  'pages/zh/free.tsx',
  'pages/support/contact.tsx'
];

function applyColorMappings(content) {
  let modifiedContent = content;
  let changesMade = false;
  
  colorMappings.forEach(mapping => {
    const originalContent = modifiedContent;
    modifiedContent = modifiedContent.replace(mapping.pattern, mapping.to);
    if (originalContent !== modifiedContent) {
      changesMade = true;
    }
  });
  
  return { content: modifiedContent, changed: changesMade };
}

console.log('🎯 Targeting critical dark mode violations...\n');

let totalFixed = 0;

criticalFiles.forEach(fileName => {
  const filePath = path.join('/Users/macmini/VS/purr', fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const { content: fixedContent, changed } = applyColorMappings(originalContent);
      
      if (changed) {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`✅ Fixed violations in ${fileName}`);
        totalFixed++;
      } else {
        console.log(`⚪ No changes needed in ${fileName}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${fileName}`);
  }
});

console.log(`\n🎉 Critical fixes complete! Fixed ${totalFixed} files.`);
console.log('📊 This should significantly reduce remaining violations.');
console.log('🔧 Run validation again to check progress.');