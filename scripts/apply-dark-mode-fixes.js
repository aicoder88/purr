#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Comprehensive Dark Mode Fix Application Script
 * Applies systematic color improvements for modern, elegant contrast
 */

const filePath = process.argv[2] || 'pages/dn.tsx';

console.log(`🎨 Applying comprehensive dark mode fixes to ${filePath}...`);

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Create backup
const backupPath = `${filePath}.backup.${Date.now()}`;
fs.writeFileSync(backupPath, content);
console.log(`📋 Backup created: ${backupPath}`);

// Define comprehensive fix patterns
const fixes = [
  // Background improvements
  {
    search: /bg-white(?!\s*dark:)/g,
    replace: 'bg-white dark:bg-gray-900',
    description: 'Add dark background to white backgrounds'
  },
  {
    search: /bg-gray-50(?!\s*dark:)/g,
    replace: 'bg-gray-50 dark:bg-gray-800',
    description: 'Add dark variant to light gray backgrounds'
  },
  {
    search: /bg-gray-100(?!\s*dark:)/g,
    replace: 'bg-gray-100 dark:bg-gray-700',
    description: 'Add dark variant to gray-100 backgrounds'
  },
  
  // Poor contrast fixes (high priority)
  {
    search: /text-gray-300 dark:text-gray-400/g,
    replace: 'text-gray-600 dark:text-gray-300',
    description: 'Fix poor contrast: gray-300/gray-400 -> gray-600/gray-300'
  },
  {
    search: /text-gray-200 dark:text-gray-300/g,
    replace: 'text-gray-700 dark:text-gray-200',
    description: 'Improve contrast: gray-200/gray-300 -> gray-700/gray-200'
  },
  
  // Text hierarchy improvements (systematic approach)
  {
    search: /className="([^"]*text-gray-900(?!\s*dark:)[^"]*)"/, 
    replace: 'className="$1 dark:text-gray-50"',
    description: 'Add dark:text-gray-50 to text-gray-900 (primary headers)'
  },
  {
    search: /className="([^"]*text-gray-800(?!\s*dark:)[^"]*)"/, 
    replace: 'className="$1 dark:text-gray-100"',
    description: 'Add dark:text-gray-100 to text-gray-800 (secondary headers)'
  },
  {
    search: /className="([^"]*text-gray-700(?!\s*dark:)[^"]*)"/, 
    replace: 'className="$1 dark:text-gray-200"',
    description: 'Add dark:text-gray-200 to text-gray-700 (body text)'
  },
  {
    search: /className="([^"]*text-gray-600(?!\s*dark:)[^"]*)"/, 
    replace: 'className="$1 dark:text-gray-300"',
    description: 'Add dark:text-gray-300 to text-gray-600 (secondary text)'
  },
  {
    search: /className="([^"]*text-gray-500(?!\s*dark:)[^"]*)"/, 
    replace: 'className="$1 dark:text-gray-400"',
    description: 'Add dark:text-gray-400 to text-gray-500 (metadata)'
  },
  
  // Color-specific improvements for better elegance
  {
    search: /text-green-700(?!\s*dark:)/g,
    replace: 'text-green-700 dark:text-green-300',
    description: 'Add green dark variant'
  },
  {
    search: /text-green-800(?!\s*dark:)/g,
    replace: 'text-green-800 dark:text-green-200',
    description: 'Add green-800 dark variant'
  },
  {
    search: /text-blue-700(?!\s*dark:)/g,
    replace: 'text-blue-700 dark:text-blue-300',
    description: 'Add blue dark variant'
  },
  {
    search: /text-blue-800(?!\s*dark:)/g,
    replace: 'text-blue-800 dark:text-blue-200',
    description: 'Add blue-800 dark variant'
  },
  {
    search: /text-purple-700(?!\s*dark:)/g,
    replace: 'text-purple-700 dark:text-purple-300',
    description: 'Add purple dark variant'
  },
  {
    search: /text-purple-800(?!\s*dark:)/g,
    replace: 'text-purple-800 dark:text-purple-200',
    description: 'Add purple-800 dark variant'
  },
  {
    search: /text-orange-700(?!\s*dark:)/g,
    replace: 'text-orange-700 dark:text-orange-300',
    description: 'Add orange dark variant'
  },
  {
    search: /text-orange-800(?!\s*dark:)/g,
    replace: 'text-orange-800 dark:text-orange-200',
    description: 'Add orange-800 dark variant'
  },
  {
    search: /text-red-700(?!\s*dark:)/g,
    replace: 'text-red-700 dark:text-red-300',
    description: 'Add red dark variant'
  },
  {
    search: /text-red-800(?!\s*dark:)/g,
    replace: 'text-red-800 dark:text-red-200',
    description: 'Add red-800 dark variant'
  },
  
  // Border improvements for elegance
  {
    search: /border-white\/20(?!\s*dark:)/g,
    replace: 'border-white/20 dark:border-gray-600/30',
    description: 'Add dark border variant'
  },
  {
    search: /border-white\/30(?!\s*dark:)/g,
    replace: 'border-white/30 dark:border-gray-600/30',
    description: 'Add dark border variant'
  },
  {
    search: /border-white\/10(?!\s*dark:)/g,
    replace: 'border-white/10 dark:border-gray-700/30',
    description: 'Add dark border variant'
  },
  
  // Enhanced backdrop improvements for modern look
  {
    search: /bg-white dark:bg-gray-800\/20/g,
    replace: 'bg-white/95 dark:bg-gray-800/95',
    description: 'Enhance backdrop opacity for better elegance'
  },
  {
    search: /backdrop-blur-lg bg-white(?!\s*\/)/g,
    replace: 'backdrop-blur-lg bg-white/95',
    description: 'Add opacity to backdrop-blur backgrounds'
  }
];

// Apply fixes
let fixCount = 0;
fixes.forEach((fix, index) => {
  const beforeMatches = content.match(fix.search);
  const beforeCount = beforeMatches ? beforeMatches.length : 0;
  
  content = content.replace(fix.search, fix.replace);
  
  const afterMatches = content.match(fix.search);
  const afterCount = afterMatches ? afterMatches.length : 0;
  const applied = beforeCount - afterCount;
  
  if (applied > 0) {
    console.log(`✅ ${applied} instances: ${fix.description}`);
    fixCount += applied;
  }
});

// Special handling for text elements without any dark variants
const textClassRegex = /className="([^"]*?)"/g;
let matches;
let additionalFixes = 0;

// Apply additional systematic fixes
while ((matches = textClassRegex.exec(content)) !== null) {
  const className = matches[1];
  
  // Check if it has text classes but no dark: variants
  if (className.includes('text-') && !className.includes('dark:text-') && !className.includes('text-transparent') && !className.includes('bg-clip-text')) {
    // Extract text color class
    const textColorMatch = className.match(/text-(\\w+)-(\\d+)/);
    if (textColorMatch) {
      const [fullMatch, color, shade] = textColorMatch;
      let darkVariant = '';
      
      // Apply intelligent dark variant mapping
      if (color === 'gray' || color === 'slate') {
        const shadeNum = parseInt(shade);
        if (shadeNum >= 800) darkVariant = "dark:text-gray-100";
        else if (shadeNum >= 700) darkVariant = "dark:text-gray-200";
        else if (shadeNum >= 600) darkVariant = "dark:text-gray-300";
        else if (shadeNum >= 500) darkVariant = "dark:text-gray-400";
        else darkVariant = "dark:text-gray-300";
      } else {
        // For colors, use lighter shades in dark mode
        const shadeNum = parseInt(shade);
        if (shadeNum >= 700) darkVariant = `dark:text-${color}-300`;
        else if (shadeNum >= 600) darkVariant = `dark:text-${color}-400`;
        else darkVariant = `dark:text-${color}-300`;
      }
      
      if (darkVariant) {
        const newClassName = `${className} ${darkVariant}`;
        content = content.replace(matches[0], `className="${newClassName}"`);
        additionalFixes++;
      }
    }
  }
}

console.log(`\\n🎨 Applied ${fixCount} systematic fixes`);
console.log(`✨ Applied ${additionalFixes} additional intelligent fixes`);

// Write the fixed content
fs.writeFileSync(filePath, content);
console.log(`\\n💾 Enhanced dark mode applied to: ${filePath}`);
console.log(`🎯 Total improvements: ${fixCount + additionalFixes}`);

console.log("\\n🚀 Next steps:");
console.log(`   1. Run: node scripts/validate-dark-mode.js ${filePath}`);
console.log("   2. Test both light and dark modes visually");
console.log("   3. Check contrast ratios with browser dev tools");
console.log("\\n✨ Your dn.tsx should now have modern, elegant, deal-closing aesthetics!");