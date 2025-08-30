#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ultimate color mappings for the final 100 violations
const finalMappings = [
  // Icon and indicator colors
  { pattern: /(\s)text-green-500(\s|"|'|>)/g, to: '$1text-green-500 dark:text-green-400$2' },
  { pattern: /(\s)text-red-500(\s|"|'|>)/g, to: '$1text-red-500 dark:text-red-400$2' },
  { pattern: /(\s)text-yellow-400(\s|"|'|>)/g, to: '$1text-yellow-400 dark:text-yellow-300$2' },
  { pattern: /(\s)text-blue-600(\s|"|'|>)/g, to: '$1text-blue-600 dark:text-blue-400$2' },
  { pattern: /(\s)text-gray-400(\s|"|'|>)/g, to: '$1text-gray-400 dark:text-gray-500$2' },
  
  // Specialized color combinations
  { pattern: /(\s)text-red-700(\s|"|'|>)/g, to: '$1text-red-700 dark:text-red-300$2' },
  { pattern: /(\s)text-green-700(\s|"|'|>)/g, to: '$1text-green-700 dark:text-green-300$2' },
  { pattern: /(\s)text-green-600(\s|"|'|>)/g, to: '$1text-green-600 dark:text-green-400$2' },
  { pattern: /(\s)text-yellow-600(\s|"|'|>)/g, to: '$1text-yellow-600 dark:text-yellow-400$2' },
  { pattern: /(\s)text-yellow-700(\s|"|'|>)/g, to: '$1text-yellow-700 dark:text-yellow-300$2' },
  { pattern: /(\s)text-yellow-800(\s|"|'|>)/g, to: '$1text-yellow-800 dark:text-yellow-200$2' },
  
  // All the color-800 variants
  { pattern: /(\s)text-green-800(\s|"|'|>)/g, to: '$1text-green-800 dark:text-green-200$2' },
  { pattern: /(\s)text-blue-800(\s|"|'|>)/g, to: '$1text-blue-800 dark:text-blue-200$2' },
  { pattern: /(\s)text-purple-800(\s|"|'|>)/g, to: '$1text-purple-800 dark:text-purple-200$2' },
  { pattern: /(\s)text-orange-800(\s|"|'|>)/g, to: '$1text-orange-800 dark:text-orange-200$2' },
  
  // Common text colors that still need fixing
  { pattern: /(\s)text-gray-700(\s|"|'|>)/g, to: '$1text-gray-700 dark:text-gray-200$2' },
  
  // Special case: text-white on buttons and backgrounds (keep as is, but add fallback)
  // Only add dark variant where it makes sense (not on colored backgrounds)
];

// Apply conservative white text mapping only where appropriate
const whiteTextMappings = [
  // Only apply to specific safe contexts (numbered steps, simple spans)
  { pattern: /(<span[^>]*text-white[^>]*>\d+<\/span>)/g, to: (match) => match.replace('text-white', 'text-white dark:text-gray-100') },
];

function applyMappings(content, mappings) {
  let modifiedContent = content;
  let changesMade = false;
  
  mappings.forEach(mapping => {
    const originalContent = modifiedContent;
    if (typeof mapping.to === 'function') {
      modifiedContent = modifiedContent.replace(mapping.pattern, mapping.to);
    } else {
      modifiedContent = modifiedContent.replace(mapping.pattern, mapping.to);
    }
    if (originalContent !== modifiedContent) {
      changesMade = true;
    }
  });
  
  return { content: modifiedContent, changed: changesMade };
}

// Get all files that currently have violations
const getViolatedFiles = () => {
  try {
    const result = execSync('npm run validate-dark-mode 2>&1', { encoding: 'utf8' });
    const lines = result.split('\n');
    const files = [];
    
    lines.forEach(line => {
      if (line.startsWith('❌ ')) {
        const fileName = line.replace('❌ ', '').trim();
        if (fileName && !files.includes(fileName)) {
          files.push(fileName);
        }
      }
    });
    
    return files;
  } catch (error) {
    // Extract files from error output
    const lines = error.stdout ? error.stdout.split('\n') : [];
    const files = [];
    
    lines.forEach(line => {
      if (line.startsWith('❌ ')) {
        const fileName = line.replace('❌ ', '').trim();
        if (fileName && !files.includes(fileName)) {
          files.push(fileName);
        }
      }
    });
    
    return files;
  }
};

console.log('🔥 Ultimate Dark Mode Cleanup - Final Push!\n');

// Get current violated files
const violatedFiles = getViolatedFiles();
console.log(`📋 Found ${violatedFiles.length} files with violations to fix\n`);

let totalFixed = 0;

violatedFiles.forEach(fileName => {
  const filePath = path.join('/Users/macmini/VS/purr', fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      
      // Apply main mappings
      let { content: fixedContent, changed: mainChanged } = applyMappings(originalContent, finalMappings);
      
      // Apply white text mappings
      const { content: finalContent, changed: whiteChanged } = applyMappings(fixedContent, whiteTextMappings);
      
      const totalChanged = mainChanged || whiteChanged;
      
      if (totalChanged) {
        fs.writeFileSync(filePath, finalContent);
        console.log(`✅ Applied final fixes to ${fileName}`);
        totalFixed++;
      } else {
        console.log(`⚪ No applicable fixes for ${fileName}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${fileName}`);
  }
});

console.log(`\n🎯 Ultimate cleanup complete!`);
console.log(`📊 Processed ${totalFixed} files with final optimizations`);
console.log(`🚀 Ready for final validation check!`);

// Run validation to show results
console.log('\n🔍 Running final validation...\n');
try {
  execSync('npm run validate-dark-mode', { stdio: 'inherit' });
} catch (error) {
  // Validation will show results in output
}