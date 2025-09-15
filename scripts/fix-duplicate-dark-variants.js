#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing duplicate dark mode variants...\n');

// Find all TypeScript and JSX files
const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
  ignore: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'coverage/**']
});

let totalFiles = 0;
let totalFixes = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let modified = content;
  let fileFixes = 0;

  // Fix patterns like "dark:text-gray-50"
  // Keep the last dark variant which is usually the correct one
  modified = modified.replace(/(dark:text-\w+(?:-\d+)?(?:\s+dark:text-\w+(?:-\d+)?)*)/g, (match) => {
    const darkVariants = match.split(/\s+/).filter(variant => variant.startsWith('dark:text-'));
    if (darkVariants.length > 1) {
      fileFixes++;
      // Keep the last variant, which is usually the intended fix
      return darkVariants[darkVariants.length - 1];
    }
    return match;
  });

  // Fix patterns like "dark:bg-gray-800" - keep the last one
  modified = modified.replace(/(dark:bg-\w+(?:-\d+)?(?:\s+dark:bg-\w+(?:-\d+)?)*)/g, (match) => {
    const darkVariants = match.split(/\s+/).filter(variant => variant.startsWith('dark:bg-'));
    if (darkVariants.length > 1) {
      fileFixes++;
      return darkVariants[darkVariants.length - 1];
    }
    return match;
  });

  // Fix patterns like "dark:border-gray-700" - keep the last one
  modified = modified.replace(/(dark:border-\w+(?:-\d+)?(?:\s+dark:border-\w+(?:-\d+)?)*)/g, (match) => {
    const darkVariants = match.split(/\s+/).filter(variant => variant.startsWith('dark:border-'));
    if (darkVariants.length > 1) {
      fileFixes++;
      return darkVariants[darkVariants.length - 1];
    }
    return match;
  });

  if (fileFixes > 0) {
    fs.writeFileSync(file, modified);
    console.log(`✅ ${file}: ${fileFixes} duplicates fixed`);
    totalFiles++;
    totalFixes += fileFixes;
  }
});

console.log(`\n🎉 Complete! Fixed ${totalFixes} duplicate dark variants in ${totalFiles} files.`);