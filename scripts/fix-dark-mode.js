#!/usr/bin/env node

/**
 * Automated Dark Mode Fix Utility
 * Systematically fixes missing dark mode variants in CSS classes
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Common dark mode mappings
const DARK_MODE_MAPPINGS = {
  // Text colors (most common violations)
  'text-gray-900': 'text-gray-900 dark:text-gray-50',
  'text-gray-800': 'text-gray-800 dark:text-gray-100', 
  'text-gray-700': 'text-gray-700 dark:text-gray-200',
  'text-gray-600': 'text-gray-600 dark:text-gray-300',
  'text-gray-500': 'text-gray-500 dark:text-gray-400',
  'text-gray-400': 'text-gray-400 dark:text-gray-500',
  
  // Background colors
  'bg-white': 'bg-white dark:bg-gray-800',
  'bg-gray-50': 'bg-gray-50 dark:bg-gray-900',
  'bg-gray-100': 'bg-gray-100 dark:bg-gray-700',
  'bg-gray-200': 'bg-gray-200 dark:bg-gray-600',
  
  // Border colors
  'border-gray-100': 'border-gray-100 dark:border-gray-700',
  'border-gray-200': 'border-gray-200 dark:border-gray-600',
  'border-gray-300': 'border-gray-300 dark:border-gray-500',
  
  // Color-specific variants
  'text-red-600': 'text-red-600 dark:text-red-400',
  'text-green-600': 'text-green-600 dark:text-green-400',
  'text-blue-600': 'text-blue-600 dark:text-blue-400',
  'text-yellow-600': 'text-yellow-600 dark:text-yellow-400',
  'text-purple-600': 'text-purple-600 dark:text-purple-400',
  
  // White text (usually fine but validator complains)
  'text-white': 'text-white dark:text-white',
  
  // Additional color variants discovered in validation
  'text-gray-300': 'text-gray-300 dark:text-gray-600',
  'text-gray-100': 'text-gray-100 dark:text-gray-800',
  
  // Colored text variants
  'text-red-300': 'text-red-300 dark:text-red-600',
  'text-red-500': 'text-red-500 dark:text-red-400',
  'text-green-500': 'text-green-500 dark:text-green-400',
  'text-orange-500': 'text-orange-500 dark:text-orange-400',
  'text-orange-600': 'text-orange-600 dark:text-orange-400',
  'text-green-600': 'text-green-600 dark:text-green-400',
  'text-yellow-400': 'text-yellow-400 dark:text-yellow-300',
  'text-black': 'text-black dark:text-white',
};

// High priority files to fix first
const HIGH_PRIORITY_FILES = [
  'pages/_document.tsx',
  'pages/index.tsx', 
  'pages/404.tsx',
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/ui/button.tsx',
];

function findFilesToFix() {
  const patterns = [
    'pages/**/*.{tsx,ts,jsx,js}',
    'src/**/*.{tsx,ts,jsx,js}',
    '!node_modules/**',
    '!.next/**',
    '!.claude/**'
  ];
  
  const allFiles = [];
  patterns.forEach(pattern => {
    if (!pattern.startsWith('!')) {
      const files = glob.sync(pattern, { cwd: process.cwd() });
      allFiles.push(...files);
    }
  });
  
  return allFiles;
}

function fixDarkModeInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fixCount = 0;
    
    // Apply each mapping
    for (const [oldClass, newClass] of Object.entries(DARK_MODE_MAPPINGS)) {
      // Create regex to match the old class but not if dark variant already exists
      const regex = new RegExp(
        `\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b(?!.*dark:)`,
        'g'
      );
      
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newClass);
        fixCount += matches.length;
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${fixCount} dark mode issues in ${filePath}`);
      return fixCount;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function main() {
  console.log('🌙 Starting automated dark mode fixes...\n');
  
  const allFiles = findFilesToFix();
  console.log(`Found ${allFiles.length} files to analyze\n`);
  
  let totalFixes = 0;
  let filesModified = 0;
  
  // Process high priority files first
  console.log('📋 Processing high-priority files first:');
  const highPriorityExisting = HIGH_PRIORITY_FILES.filter(file => 
    fs.existsSync(path.join(process.cwd(), file))
  );
  
  for (const file of highPriorityExisting) {
    const fixes = fixDarkModeInFile(file);
    if (fixes > 0) {
      totalFixes += fixes;
      filesModified++;
    }
  }
  
  console.log('\n📋 Processing remaining files:');
  const remainingFiles = allFiles.filter(file => 
    !HIGH_PRIORITY_FILES.includes(file)
  );
  
  // Process in batches to avoid overwhelming
  const BATCH_SIZE = 20;
  for (let i = 0; i < Math.min(remainingFiles.length, BATCH_SIZE); i++) {
    const file = remainingFiles[i];
    const fixes = fixDarkModeInFile(file);
    if (fixes > 0) {
      totalFixes += fixes;
      filesModified++;
    }
  }
  
  console.log('\n🎉 Dark mode fixes complete!');
  console.log(`📊 Summary:`);
  console.log(`   - Files modified: ${filesModified}`);
  console.log(`   - Total fixes applied: ${totalFixes}`);
  
  if (totalFixes > 0) {
    console.log('\n⚠️  Remember to:');
    console.log('   1. Test the changes in both light and dark modes');
    console.log('   2. Run npm run validate-dark-mode to check progress');
    console.log('   3. Commit the changes when satisfied');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixDarkModeInFile, DARK_MODE_MAPPINGS };