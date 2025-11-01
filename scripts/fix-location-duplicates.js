#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to remove duplicate dark mode classes
function removeDuplicateDarkClasses(content) {
  // Remove duplicate dark:text-gray-200 classes
  content = content.replace(/dark:text-gray-200\s+dark:text-gray-200/g, 'dark:text-gray-200');
  content = content.replace(/dark:text-gray-200\s+dark:text-gray-300/g, 'dark:text-gray-200');
  
  // Remove duplicate dark:text-gray-100 classes
  content = content.replace(/dark:text-gray-100\s+dark:text-gray-100/g, 'dark:text-gray-100');
  
  // Remove duplicate background classes
  content = content.replace(/dark:bg-red-900\/20\s+dark:bg-red-900\/20/g, 'dark:bg-red-900/20');
  content = content.replace(/dark:bg-green-900\/20\s+dark:bg-green-900\/20/g, 'dark:bg-green-900/20');
  
  // Remove duplicate text color classes
  content = content.replace(/dark:text-red-400\s+dark:text-red-400/g, 'dark:text-red-400');
  content = content.replace(/dark:text-green-400\s+dark:text-green-400/g, 'dark:text-green-400');
  
  // Clean up any remaining duplicates in className strings
  content = content.replace(/className="([^"]*?)(\s+dark:[\w-\/]+)\2([^"]*?)"/g, 'className="$1$2$3"');
  
  return content;
}

// Process location files
const locationDir = '/Users/macmini/VS/purr/pages/locations';
const locationFiles = [
  'toronto.tsx',
  'quebec-city.tsx', 
  'ottawa.tsx',
  'montreal.tsx',
  'hamilton.tsx'
];

console.log('🔧 Fixing duplicate dark mode classes in location pages...\n');

locationFiles.forEach(fileName => {
  const filePath = path.join(locationDir, fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = removeDuplicateDarkClasses(content);
      
      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`✅ Fixed duplicates in ${fileName}`);
      } else {
        console.log(`⚪ No duplicates found in ${fileName}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${fileName}`);
  }
});

console.log('\n🎉 Location duplicate cleanup complete!');