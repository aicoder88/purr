#!/usr/bin/env node

/**
 * Dark Mode Validator - Automatically detects missing dark mode variants
 * This script prevents the deployment of components with poor dark mode contrast
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color classes that MUST have dark mode variants
const CRITICAL_PATTERNS = [
  // Text colors that need dark variants
  /text-gray-[1-9]00(?!\s+dark:)/g,
  /text-white(?!\s+dark:)/g,
  /text-black(?!\s+dark:)/g,
  
  // Color text that needs dark variants  
  /text-red-[1-9]00(?!\s+dark:)/g,
  /text-green-[1-9]00(?!\s+dark:)/g,
  /text-blue-[1-9]00(?!\s+dark:)/g,
  /text-yellow-[1-9]00(?!\s+dark:)/g,
  /text-purple-[1-9]00(?!\s+dark:)/g,
  /text-pink-[1-9]00(?!\s+dark:)/g,
  /text-indigo-[1-9]00(?!\s+dark:)/g,
  /text-orange-[1-9]00(?!\s+dark:)/g,
  
  // Background colors in critical contexts
  /bg-white(?!\s+dark:)(?=.*className="[^"]*(?:card|modal|popup|dropdown))/g,
  /bg-gray-50(?!\s+dark:)/g,
];

// Files to check
const FILE_PATTERNS = [
  'pages/**/*.tsx',
  'pages/**/*.ts', 
  'src/components/**/*.tsx',
  'src/components/**/*.ts'
];

let totalErrors = 0;
let filesWithErrors = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  
  CRITICAL_PATTERNS.forEach((pattern, patternIndex) => {
    lines.forEach((line, lineIndex) => {
      const matches = [...line.matchAll(pattern)];
      matches.forEach(match => {
        errors.push({
          line: lineIndex + 1,
          column: match.index + 1,
          match: match[0],
          pattern: pattern.toString(),
          lineContent: line.trim()
        });
      });
    });
  });
  
  return errors;
}

function validateDarkMode() {
  console.log('🌙 Starting Dark Mode Validation...\n');
  
  const allFiles = [];
  FILE_PATTERNS.forEach(pattern => {
    const files = glob.sync(pattern);
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
    console.log('• text-gray-900 → text-gray-900 dark:text-gray-50');  
    console.log('• text-gray-800 → text-gray-800 dark:text-gray-100');
    console.log('• text-gray-700 → text-gray-700 dark:text-gray-200');
    console.log('• text-gray-600 → text-gray-600 dark:text-gray-300');
    console.log('• text-red-600 → text-red-600 dark:text-red-400');
    console.log('• text-green-600 → text-green-600 dark:text-green-400');
    
    process.exit(1);
  } else {
    console.log('\n✅ All files pass dark mode validation!');
    process.exit(0);
  }
}

// Run validation
validateDarkMode();