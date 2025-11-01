#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common dark mode fix patterns
const DARK_MODE_FIXES = [
  // Text colors
  { pattern: /className="([^"]*\b)text-gray-900(\b[^"]*)"/, replace: 'className="$1text-gray-900 dark:text-gray-50$2"' },
  { pattern: /className="([^"]*\b)text-gray-800(\b[^"]*)"/, replace: 'className="$1text-gray-800 dark:text-gray-100$2"' },
  { pattern: /className="([^"]*\b)text-gray-700(\b[^"]*)"/, replace: 'className="$1text-gray-700 dark:text-gray-200$2"' },
  { pattern: /className="([^"]*\b)text-gray-600(\b[^"]*)"/, replace: 'className="$1text-gray-600 dark:text-gray-300$2"' },
  { pattern: /className="([^"]*\b)text-gray-500(\b[^"]*)"/, replace: 'className="$1text-gray-500 dark:text-gray-400$2"' },
  
  // Color variants
  { pattern: /className="([^"]*\b)text-red-600(\b[^"]*)"/, replace: 'className="$1text-red-600 dark:text-red-400$2"' },
  { pattern: /className="([^"]*\b)text-green-600(\b[^"]*)"/, replace: 'className="$1text-green-600 dark:text-green-400$2"' },
  { pattern: /className="([^"]*\b)text-blue-600(\b[^"]*)"/, replace: 'className="$1text-blue-600 dark:text-blue-400$2"' },
  { pattern: /className="([^"]*\b)text-indigo-600(\b[^"]*)"/, replace: 'className="$1text-indigo-600 dark:text-indigo-400$2"' },
  { pattern: /className="([^"]*\b)text-yellow-600(\b[^"]*)"/, replace: 'className="$1text-yellow-600 dark:text-yellow-400$2"' },
  
  // Stronger colors
  { pattern: /className="([^"]*\b)text-red-800(\b[^"]*)"/, replace: 'className="$1text-red-800 dark:text-red-200$2"' },
  { pattern: /className="([^"]*\b)text-blue-800(\b[^"]*)"/, replace: 'className="$1text-blue-800 dark:text-blue-200$2"' },
  { pattern: /className="([^"]*\b)text-blue-900(\b[^"]*)"/, replace: 'className="$1text-blue-900 dark:text-blue-100$2"' },
  { pattern: /className="([^"]*\b)text-indigo-800(\b[^"]*)"/, replace: 'className="$1text-indigo-800 dark:text-indigo-200$2"' },
  { pattern: /className="([^"]*\b)text-green-800(\b[^"]*)"/, replace: 'className="$1text-green-800 dark:text-green-200$2"' },
  
  // White text that needs dark mode variants
  { pattern: /className="([^"]*\b)text-white(\b[^"]*)"/, replace: 'className="$1text-white dark:text-gray-100$2"' },
  
  // Background variants for completeness
  { pattern: /className="([^"]*\b)bg-blue-50(\b[^"]*)"/, replace: 'className="$1bg-blue-50 dark:bg-blue-900/20$2"' },
  { pattern: /className="([^"]*\b)bg-green-50(\b[^"]*)"/, replace: 'className="$1bg-green-50 dark:bg-green-900/20$2"' },
  { pattern: /className="([^"]*\b)bg-red-50(\b[^"]*)"/, replace: 'className="$1bg-red-50 dark:bg-red-900/20$2"' },
];

function fixDarkModeInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Skip files that already have extensive dark mode support
    const darkModeCount = (content.match(/dark:/g) || []).length;
    const totalLines = content.split('\n').length;
    
    // If file already has good dark mode coverage, skip it
    if (darkModeCount > totalLines / 10) {
      return false;
    }
    
    DARK_MODE_FIXES.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replace);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findTSXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTSXFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function main() {
  console.log('🌙 Starting batch dark mode fixes...\n');
  
  const startDir = path.join(__dirname, '..');
  const tsxFiles = findTSXFiles(startDir);
  
  console.log(`Found ${tsxFiles.length} TypeScript/React files to check`);
  
  let fixedCount = 0;
  
  tsxFiles.forEach(file => {
    // Skip node_modules, .next, and other build directories
    if (file.includes('node_modules') || 
        file.includes('.next') || 
        file.includes('dist') ||
        file.includes('build')) {
      return;
    }
    
    if (fixDarkModeInFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n🎉 Fixed ${fixedCount} files!`);
  
  // Run validation to see progress
  console.log('\n📊 Running validation to check progress...\n');
  try {
    execSync('npm run validate-dark-mode', { stdio: 'inherit' });
  } catch (error) {
    console.log('Validation completed with remaining issues to fix manually.');
  }
}

main();