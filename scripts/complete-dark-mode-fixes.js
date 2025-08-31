#!/usr/bin/env node

const fs = require('fs');

/**
 * Complete Dark Mode Fixes - Advanced Script
 * Handles all remaining text elements missing dark variants
 */

const filePath = process.argv[2] || 'pages/dn.tsx';
console.log(`🎨 Completing dark mode fixes for ${filePath}...`);

let content = fs.readFileSync(filePath, 'utf8');

// Create backup
const backupPath = `${filePath}.complete-backup.${Date.now()}`;
fs.writeFileSync(backupPath, content);
console.log(`📋 Backup created: ${backupPath}`);

let fixCount = 0;

// Advanced regex patterns to catch remaining issues
const advancedFixes = [
  // Handle className with text positioning but no color
  {
    pattern: /className="([^"]*?)(\btext-(?:left|center|right|justify)\b)([^"]*?)"/g,
    replace: (match, before, textAlign, after) => {
      if (!before.includes('text-gray') && !before.includes('text-white') && !before.includes('text-black') && 
          !before.includes('text-blue') && !before.includes('text-green') && !before.includes('text-red') &&
          !before.includes('text-purple') && !before.includes('text-orange') && !before.includes('text-yellow') &&
          !before.includes('text-transparent') && !after.includes('text-')) {
        // Add neutral text color for positioning-only classes
        return `className="${before}${textAlign} text-gray-800 dark:text-gray-100${after}"`;
      }
      return match;
    }
  },
  
  // Handle font styling without color
  {
    pattern: /className="([^"]*?)(\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b)([^"]*?)"/g,
    replace: (match, before, textSize, after) => {
      if (!match.includes('dark:text-') && !match.includes('text-transparent') && !match.includes('bg-clip-text')) {
        // Check if it's likely a header, body text, or secondary text based on size
        let darkVariant = '';
        if (textSize.includes('4xl') || textSize.includes('5xl') || textSize.includes('6xl')) {
          darkVariant = ' text-gray-900 dark:text-gray-50';
        } else if (textSize.includes('2xl') || textSize.includes('3xl')) {
          darkVariant = ' text-gray-800 dark:text-gray-100';
        } else if (textSize.includes('xl')) {
          darkVariant = ' text-gray-700 dark:text-gray-200';
        } else {
          darkVariant = ' text-gray-600 dark:text-gray-300';
        }
        return `className="${before}${textSize}${darkVariant}${after}"`;
      }
      return match;
    }
  },
  
  // Handle font weight without color
  {
    pattern: /className="([^"]*?)(\bfont-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b)([^"]*?)"/g,
    replace: (match, before, fontWeight, after) => {
      if (!match.includes('dark:text-') && !match.includes('text-transparent') && !match.includes('bg-clip-text') && 
          !match.includes('text-gray') && !match.includes('text-white') && !match.includes('text-black') &&
          !match.includes('text-blue') && !match.includes('text-green') && !match.includes('text-red')) {
        // Determine text color based on font weight context
        let textColor = '';
        if (fontWeight === 'font-bold' || fontWeight === 'font-extrabold' || fontWeight === 'font-black') {
          textColor = ' text-gray-800 dark:text-gray-100';
        } else {
          textColor = ' text-gray-600 dark:text-gray-300';
        }
        return `className="${before}${fontWeight}${textColor}${after}"`;
      }
      return match;
    }
  }
];

// Apply advanced fixes
advancedFixes.forEach(fix => {
  if (fix.replace) {
    content = content.replace(fix.pattern, fix.replace);
  } else {
    const matches = content.match(fix.pattern);
    if (matches) {
      content = content.replace(fix.pattern, fix.replacement);
      fixCount += matches.length;
    }
  }
});

// Manual high-impact fixes for specific cases
const manualFixes = [
  // Fix specific measurement text
  { 
    find: 'className="text-sm text-gray-300 dark:text-gray-300"',
    replace: 'className="text-sm text-gray-600 dark:text-gray-300"'
  },
  
  // Add text color to generic flex/grid containers with content
  {
    find: 'className="text-center"',
    replace: 'className="text-center text-gray-700 dark:text-gray-200"'
  },
  
  // Fix timeline elements
  {
    find: 'className="text-right"',
    replace: 'className="text-right text-gray-700 dark:text-gray-200"'
  },
  
  // Fix generic bold text
  {
    find: 'className="text-2xl font-bold"',
    replace: 'className="text-2xl font-bold text-gray-800 dark:text-gray-100"'
  },
  
  {
    find: 'className="text-xl font-bold mb-1"',
    replace: 'className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100"'
  },
  
  {
    find: 'className="text-lg font-bold"',
    replace: 'className="text-lg font-bold text-gray-800 dark:text-gray-100"'
  },
  
  // Fix metric values and labels
  {
    find: 'className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2"',
    replace: 'className="text-2xl font-bold text-green-600 dark:text-green-300 mb-2"'
  },
  
  {
    find: 'className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2"',
    replace: 'className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-2"'
  },
  
  {
    find: 'className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2"',
    replace: 'className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-2"'
  },
  
  {
    find: 'className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2"',
    replace: 'className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-2"'
  }
];

// Apply manual fixes
manualFixes.forEach(fix => {
  if (content.includes(fix.find)) {
    content = content.replace(new RegExp(fix.find.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), fix.replace);
    fixCount++;
  }
});

// Handle remaining text elements through intelligent scanning
const lines = content.split('\\n');
const updatedLines = lines.map((line, index) => {
  // Look for className attributes with text-related classes missing dark variants
  const classNameMatch = line.match(/className="([^"]*)"/);
  if (classNameMatch) {
    const className = classNameMatch[1];
    
    // Skip if already has dark:text- or is a special case
    if (className.includes('dark:text-') || 
        className.includes('text-transparent') || 
        className.includes('bg-clip-text') ||
        !className.includes('text-')) {
      return line;
    }
    
    // Check for specific text utility classes that need dark variants
    if (className.match(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/) ||
        className.match(/font-(thin|light|normal|medium|semibold|bold|extrabold)/) ||
        className.includes('text-center') ||
        className.includes('text-left') ||
        className.includes('text-right')) {
      
      // Determine appropriate dark variant based on context
      let darkVariant = ' text-gray-700 dark:text-gray-200';
      
      // Headers get stronger contrast
      if (className.includes('text-4xl') || className.includes('text-5xl') || className.includes('text-6xl') ||
          className.includes('font-bold')) {
        darkVariant = ' text-gray-800 dark:text-gray-100';
      }
      
      // Small text gets softer contrast
      if (className.includes('text-xs') || className.includes('text-sm')) {
        darkVariant = ' text-gray-600 dark:text-gray-300';
      }
      
      const newClassName = `${className}${darkVariant}`;
      const newLine = line.replace(classNameMatch[0], `className="${newClassName}"`);
      
      if (newLine !== line) {
        fixCount++;
        return newLine;
      }
    }
  }
  
  return line;
});

content = updatedLines.join('\\n');

console.log(`✅ Applied ${fixCount} comprehensive fixes`);

// Write the enhanced content
fs.writeFileSync(filePath, content);
console.log(`\\n💎 Complete dark mode enhancement applied!`);
console.log(`🎯 All text elements should now have elegant, high-contrast dark mode variants`);

console.log(`\\n🔍 Final validation:`);
console.log(`   Run: node scripts/validate-dark-mode.js ${filePath}`);
console.log(`\\n🎨 Visual testing:`);
console.log(`   1. npm run dev`);
console.log(`   2. Toggle between light/dark modes`);
console.log(`   3. Verify all text is clearly readable`);
console.log(`   4. Check for consistent, elegant styling`);