#!/usr/bin/env node

/**
 * Dark Mode Validator - Automatically detects missing dark mode variants
 * This script prevents the deployment of components with poor dark mode contrast
 */

const fs = require('fs');
const path = require('path');

// This array is now handled directly in checkFile function
// Keep for reference but not used in the new logic
const CRITICAL_PATTERNS = [];

// Helper function to recursively find files
function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];
  
  function scanDirectory(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Directories to check
const DIRECTORIES_TO_CHECK = ['pages', 'src/components'];

let totalErrors = 0;
let filesWithErrors = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  
  lines.forEach((line, lineIndex) => {
    // Extract all className strings from the line
    const classNameMatches = line.match(/className=["'`]([^"'`]*)["'`]/g);
    
    if (classNameMatches) {
      classNameMatches.forEach(classMatch => {
        const classString = classMatch.match(/className=["'`]([^"'`]*)["'`]/)[1];
        
        // Check each critical pattern
        const colorClasses = [
          // Gray text colors
          /text-gray-[1-9]00/g,
          /text-white/g,
          /text-black/g,
          // Colored text
          /text-red-[1-9]00/g,
          /text-green-[1-9]00/g,
          /text-blue-[1-9]00/g,
          /text-yellow-[1-9]00/g,
          /text-purple-[1-9]00/g,
          /text-pink-[1-9]00/g,
          /text-indigo-[1-9]00/g,
          /text-orange-[1-9]00/g,
          /text-teal-[1-9]00/g,
          // Background colors (CRITICAL for preventing white backgrounds)
          /bg-white\b/g,
          /bg-gray-[1-9]00?\b/g,
          /bg-red-[1-9]00?\b/g,
          /bg-green-[1-9]00?\b/g,
          /bg-blue-[1-9]00?\b/g,
          /bg-yellow-[1-9]00?\b/g,
          /bg-purple-[1-9]00?\b/g,
          /bg-pink-[1-9]00?\b/g,
          /bg-indigo-[1-9]00?\b/g,
          /bg-orange-[1-9]00?\b/g,
          /bg-teal-[1-9]00?\b/g,
          // Border colors
          /border-gray-[1-9]00/g,
          /border-red-[1-9]00/g,
          /border-green-[1-9]00/g,
          /border-blue-[1-9]00/g,
          /border-yellow-[1-9]00/g,
          /border-purple-[1-9]00/g,
          /border-pink-[1-9]00/g,
          /border-indigo-[1-9]00/g,
          /border-orange-[1-9]00/g,
          /border-teal-[1-9]00/g,
        ];
        
        colorClasses.forEach(pattern => {
          const colorMatches = [...classString.matchAll(pattern)];
          colorMatches.forEach(colorMatch => {
            const colorClass = colorMatch[0];

            // Determine the expected dark variant pattern
            let hasDarkVariant = false;

            if (colorClass.startsWith('text-')) {
              // Text colors need dark:text- variants
              const darkPattern = new RegExp(`dark:${colorClass}`);
              hasDarkVariant = darkPattern.test(classString) || /dark:text-/.test(classString);
            } else if (colorClass.startsWith('bg-')) {
              // Background colors need dark:bg- variants
              const darkPattern = new RegExp(`dark:${colorClass}`);
              hasDarkVariant = darkPattern.test(classString) || /dark:bg-/.test(classString);
            } else if (colorClass.startsWith('border-')) {
              // Border colors need dark:border- variants
              const darkPattern = new RegExp(`dark:${colorClass}`);
              hasDarkVariant = darkPattern.test(classString) || /dark:border-/.test(classString);
            }

            if (!hasDarkVariant) {
              errors.push({
                line: lineIndex + 1,
                column: line.indexOf(classMatch) + 1,
                match: colorClass,
                pattern: pattern.toString(),
                lineContent: line.trim(),
                className: classString
              });
            }
          });
        });
      });
    }
  });
  
  return errors;
}

function validateDarkMode() {
  console.log('🌙 Starting Dark Mode Validation...\n');
  
  const allFiles = [];
  DIRECTORIES_TO_CHECK.forEach(dir => {
    const files = findFiles(dir);
    allFiles.push(...files);
  });
  
  console.log(`Checking ${allFiles.length} files...\n`);
  
  allFiles.forEach(filePath => {
    const errors = checkFile(filePath);
    
    if (errors.length > 0) {
      filesWithErrors++;
      totalErrors += errors.length;
      
      console.log(`❌ ${filePath}`);
      errors.forEach(error => {
        console.log(`  Line ${error.line}:${error.column} - Missing dark variant for: ${error.match}`);
        console.log(`    ${error.lineContent}`);
        console.log('');
      });
    }
  });
  
  console.log('\n🌙 Dark Mode Validation Results:');
  console.log(`Files checked: ${allFiles.length}`);
  console.log(`Files with errors: ${filesWithErrors}`);
  console.log(`Total errors: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ DARK MODE VALIDATION FAILED!');
    console.log('Fix all missing dark mode variants before deploying.');
    console.log('\nQuick fixes:');
    console.log('TEXT COLORS:');
    console.log('• text-gray-900 → text-gray-900 dark:text-gray-50');
    console.log('• text-gray-800 → text-gray-800 dark:text-gray-100');
    console.log('• text-gray-700 → text-gray-700 dark:text-gray-200');
    console.log('• text-white → text-white dark:text-gray-100');
    console.log('BACKGROUND COLORS:');
    console.log('• bg-white → bg-white dark:bg-gray-900');
    console.log('• bg-blue-50 → bg-blue-50 dark:bg-blue-900/20');
    console.log('• bg-green-50 → bg-green-50 dark:bg-green-900/20');
    console.log('• bg-yellow-50 → bg-yellow-50 dark:bg-yellow-900/20');
    console.log('BORDER COLORS:');
    console.log('• border-gray-200 → border-gray-200 dark:border-gray-700');
    console.log('• border-blue-200 → border-blue-200 dark:border-blue-700');
    
    process.exit(1);
  } else {
    console.log('\n✅ All files pass dark mode validation!');
    process.exit(0);
  }
}

// Run validation
validateDarkMode();