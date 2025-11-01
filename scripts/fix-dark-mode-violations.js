#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🌙 Dark Mode Auto-Fix Script');
console.log('============================');

// Common dark mode fixes
const fixes = [
  // Background colors - most common patterns
  { pattern: /hover:bg-white\b(?! dark:)/g, replacement: 'hover:bg-white dark:hover:bg-gray-700' },
  { pattern: /bg-white\b(?! dark:)/g, replacement: 'bg-white dark:bg-gray-900' },
  { pattern: /bg-blue-50\b(?! dark:)/g, replacement: 'bg-blue-50 dark:bg-blue-900/20' },
  { pattern: /bg-green-50\b(?! dark:)/g, replacement: 'bg-green-50 dark:bg-green-900/20' },
  { pattern: /bg-red-50\b(?! dark:)/g, replacement: 'bg-red-50 dark:bg-red-900/20' },
  { pattern: /bg-yellow-50\b(?! dark:)/g, replacement: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { pattern: /bg-orange-50\b(?! dark:)/g, replacement: 'bg-orange-50 dark:bg-orange-900/20' },
  { pattern: /bg-orange-100\b(?! dark:)/g, replacement: 'bg-orange-100 dark:bg-orange-900/30' },
  { pattern: /bg-blue-100\b(?! dark:)/g, replacement: 'bg-blue-100 dark:bg-blue-900/30' },
  { pattern: /bg-green-100\b(?! dark:)/g, replacement: 'bg-green-100 dark:bg-green-900/30' },
  { pattern: /bg-red-100\b(?! dark:)/g, replacement: 'bg-red-100 dark:bg-red-900/30' },
  { pattern: /bg-gray-50\b(?! dark:)/g, replacement: 'bg-gray-50 dark:bg-gray-800' },
  { pattern: /hover:bg-gray-50\b(?! dark:)/g, replacement: 'hover:bg-gray-50 dark:hover:bg-gray-700' },

  // Primary color backgrounds
  { pattern: /bg-blue-600\b(?! dark:)/g, replacement: 'bg-blue-600 dark:bg-blue-600' },
  { pattern: /hover:bg-blue-700\b(?! dark:)/g, replacement: 'hover:bg-blue-700 dark:hover:bg-blue-500' },
  { pattern: /bg-green-400\b(?! dark:)/g, replacement: 'bg-green-400 dark:bg-green-500' },

  // Border colors
  { pattern: /border-blue-600\b(?! dark:)/g, replacement: 'border-blue-600 dark:border-blue-400' },
  { pattern: /border-red-500\b(?! dark:)/g, replacement: 'border-red-500 dark:border-red-400' },
  { pattern: /border-green-500\b(?! dark:)/g, replacement: 'border-green-500 dark:border-green-400' },
  { pattern: /border-gray-300\b(?! dark:)/g, replacement: 'border-gray-300 dark:border-gray-600' },

  // Special cases - white with transparency
  { pattern: /bg-white\/20\b(?! dark:)/g, replacement: 'bg-white/20 dark:bg-gray-600/50' },
  { pattern: /bg-white\/30\b(?! dark:)/g, replacement: 'bg-white/30 dark:bg-gray-600/50' },
  { pattern: /hover:bg-white\/20\b(?! dark:)/g, replacement: 'hover:bg-white/20 dark:hover:bg-gray-600/50' },
];

// Get all files that need fixing
function getFilesToFix() {
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  const dirs = ['pages', 'src'];
  let files = [];

  function scanDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory() && !item.name.startsWith('.')) {
        scanDir(fullPath);
      } else if (item.isFile() && extensions.some(ext => item.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  dirs.forEach(dir => {
    if (fs.existsSync(dir)) scanDir(dir);
  });

  return files;
}

// Apply fixes to a file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changeCount = 0;

    for (const fix of fixes) {
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

// Main execution
const files = getFilesToFix();
console.log(`📁 Found ${files.length} files to check`);

let totalFixes = 0;
let fixedFiles = 0;

for (const file of files) {
  const fixes = fixFile(file);
  if (fixes > 0) {
    totalFixes += fixes;
    fixedFiles++;
  }
}

console.log('\n🎉 Auto-fix Results:');
console.log(`Files processed: ${files.length}`);
console.log(`Files fixed: ${fixedFiles}`);
console.log(`Total fixes applied: ${totalFixes}`);

// Run validation again to see remaining issues
console.log('\n🔍 Running validation to check remaining issues...');
try {
  execSync('npm run validate-dark-mode', { stdio: 'inherit' });
} catch (e) {
  console.log('\n⚠️ Some violations remain - may need manual fixes');
}