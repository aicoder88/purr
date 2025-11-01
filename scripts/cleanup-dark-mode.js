#!/usr/bin/env node

/**
 * Clean up duplicate dark mode variants
 * Removes redundant dark: classes that were added multiple times
 */

const fs = require('fs');
const glob = require('glob');

function cleanupDarkModeInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fixCount = 0;
    
    // Clean up duplicate text-white dark:text-white dark:text-white
    const whiteTextRegex = /text-white(\s+dark:text-white)+/g;
    if (whiteTextRegex.test(content)) {
      content = content.replace(whiteTextRegex, 'text-white dark:text-white');
      modified = true;
      fixCount++;
    }
    
    // Clean up duplicate gray variants like dark:text-gray-500 dark:text-gray-400 dark:text-gray-500
    const duplicateGrayRegex = /(dark:text-gray-\d+)(\s+dark:text-gray-\d+)+/g;
    const grayMatches = content.match(duplicateGrayRegex);
    if (grayMatches) {
      content = content.replace(duplicateGrayRegex, (match, firstDark) => {
        // Keep the first dark variant, remove duplicates
        return firstDark;
      });
      modified = true;
      fixCount++;
    }
    
    // Clean up general duplicate dark variants
    const duplicateDarkRegex = /(dark:[\w-]+)(\s+dark:[\w-]+)*\s+\1/g;
    if (duplicateDarkRegex.test(content)) {
      content = content.replace(duplicateDarkRegex, '$1');
      modified = true;
      fixCount++;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned ${fixCount} duplicate dark variants in ${filePath}`);
      return fixCount;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function main() {
  console.log('🧹 Starting dark mode duplicate cleanup...\n');
  
  const files = glob.sync('{pages,src}/**/*.{tsx,ts,jsx,js}', { cwd: process.cwd() });
  console.log(`Found ${files.length} files to check\n`);
  
  let totalFixes = 0;
  let filesModified = 0;
  
  for (const file of files) {
    const fixes = cleanupDarkModeInFile(file);
    if (fixes > 0) {
      totalFixes += fixes;
      filesModified++;
    }
  }
  
  console.log('\n🎉 Dark mode cleanup complete!');
  console.log("📊 Summary:");
  console.log(`   - Files modified: ${filesModified}`);
  console.log(`   - Total duplicates cleaned: ${totalFixes}`);
}

if (require.main === module) {
  main();
}

module.exports = { cleanupDarkModeInFile };