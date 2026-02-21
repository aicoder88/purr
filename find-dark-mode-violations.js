#!/usr/bin/env node

/**
 * Comprehensive Dark Mode Violation Detector
 * 
 * Finds dark mode violations across:
 * - TSX/TS files (React components)
 * - JSON files (blog content with embedded HTML)
 * 
 * Violation types:
 * 1. Hardcoded hex colors without dark: variants
 * 2. text-white without suitable dark background
 * 3. Light backgrounds without dark variants
 * 4. bg-white/bg-gray-100 without dark variants
 * 
 * Usage: node find-dark-mode-violations.js [--json] [--fix]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const outputJson = args.includes('--json');
const showFix = args.includes('--fix');

// Directories to scan
const DIRECTORIES_TO_CHECK = [
  'app',
  'src/components', 
  'content/blog',
  'components'
];

// File extensions to check
const EXTENSIONS = ['.tsx', '.ts', '.json'];

// Colors that are problematic in dark mode without variants
const PROBLEMATIC_PATTERNS = [
  { 
    pattern: /bg-\[#FF3131\](?!\/)/g, 
    name: 'bg-[#FF3131] (red)', 
    suggestion: 'dark:bg-[#FF5050]',
    fix: (str) => str.replace(/bg-\[#FF3131\](?!\/)/g, 'bg-[#FF3131] dark:bg-[#FF5050]')
  },
  { 
    pattern: /bg-\[#03E46A\](?!\/)/g, 
    name: 'bg-[#03E46A] (green)', 
    suggestion: 'dark:bg-[#04D162]',
    fix: (str) => str.replace(/bg-\[#03E46A\](?!\/)/g, 'bg-[#03E46A] dark:bg-[#04D162]')
  },
  { 
    pattern: /bg-\[#E0EFC7\](?!\/)/g, 
    name: 'bg-[#E0EFC7] (light green)', 
    suggestion: 'dark:bg-green-900/30',
    fix: (str) => str.replace(/bg-\[#E0EFC7\](?!\/)/g, 'bg-[#E0EFC7] dark:bg-green-900/30')
  },
  { 
    pattern: /bg-\[#FFFFF5\](?!\/)/g, 
    name: 'bg-[#FFFFF5] (cream)', 
    suggestion: 'dark:bg-gray-900',
    fix: (str) => str.replace(/bg-\[#FFFFF5\](?!\/)/g, 'bg-[#FFFFF5] dark:bg-gray-900')
  },
  { 
    pattern: /bg-\[#5B2EFF\](?!\/)/g, 
    name: 'bg-[#5B2EFF] (purple)', 
    suggestion: 'dark:bg-[#818CF8]',
    fix: (str) => str.replace(/bg-\[#5B2EFF\](?!\/)/g, 'bg-[#5B2EFF] dark:bg-[#818CF8]')
  },
  { 
    pattern: /text-\[#FF3131\]/g, 
    name: 'text-[#FF3131] (red text)', 
    suggestion: 'dark:text-[#FF6B6B]',
    fix: (str) => str.replace(/text-\[#FF3131\]/g, 'text-[#FF3131] dark:text-[#FF6B6B]')
  },
  { 
    pattern: /text-\[#5B2EFF\]/g, 
    name: 'text-[#5B2EFF] (purple text)', 
    suggestion: 'dark:text-[#C4B5FD]',
    fix: (str) => str.replace(/text-\[#5B2EFF\]/g, 'text-[#5B2EFF] dark:text-[#C4B5FD]')
  },
  { 
    pattern: /(?<!dark:)text-white(?!\/[0-9]|\.)/g, 
    name: 'text-white without dark bg', 
    suggestion: 'Add dark:bg-* or use dark:text-gray-900',
    check: (value) => {
      // Check if there's a suitable dark background already
      return /bg-(gray|red|green|blue|purple|pink|indigo|orange|teal|emerald|cyan|sky|violet|fuchsia|rose|amber)-(600|700|800|900|950)\b/.test(value) ||
             /bg-black\b/.test(value) ||
             /bg-\[#[0-9a-fA-F]{3,6}\]/.test(value) ||
             /bg-gradient/.test(value);
    }
  },
  { 
    pattern: /bg-white(?!\/[0-9])/g, 
    name: 'bg-white', 
    suggestion: 'dark:bg-gray-800',
    fix: (str) => str.replace(/bg-white(?!\/[0-9])/g, 'bg-white dark:bg-gray-800')
  },
  { 
    pattern: /bg-gray-50\b/g, 
    name: 'bg-gray-50', 
    suggestion: 'dark:bg-gray-800',
    fix: (str) => str.replace(/bg-gray-50\b/g, 'bg-gray-50 dark:bg-gray-800')
  },
  { 
    pattern: /bg-gray-100\b/g, 
    name: 'bg-gray-100', 
    suggestion: 'dark:bg-gray-800',
    fix: (str) => str.replace(/bg-gray-100\b/g, 'bg-gray-100 dark:bg-gray-800')
  },
  { 
    pattern: /bg-blue-50\b/g, 
    name: 'bg-blue-50', 
    suggestion: 'dark:bg-blue-900/30',
    fix: (str) => str.replace(/bg-blue-50\b/g, 'bg-blue-50 dark:bg-blue-900/30')
  },
  { 
    pattern: /bg-green-50\b/g, 
    name: 'bg-green-50', 
    suggestion: 'dark:bg-green-900/30',
    fix: (str) => str.replace(/bg-green-50\b/g, 'bg-green-50 dark:bg-green-900/30')
  },
  { 
    pattern: /bg-red-50\b/g, 
    name: 'bg-red-50', 
    suggestion: 'dark:bg-red-900/30',
    fix: (str) => str.replace(/bg-red-50\b/g, 'bg-red-50 dark:bg-red-900/30')
  },
  { 
    pattern: /bg-yellow-50\b/g, 
    name: 'bg-yellow-50', 
    suggestion: 'dark:bg-yellow-900/30',
    fix: (str) => str.replace(/bg-yellow-50\b/g, 'bg-yellow-50 dark:bg-yellow-900/30')
  },
  { 
    pattern: /border-gray-200\b/g, 
    name: 'border-gray-200', 
    suggestion: 'dark:border-gray-700',
    fix: (str) => str.replace(/border-gray-200\b/g, 'border-gray-200 dark:border-gray-700')
  },
  { 
    pattern: /border-gray-100\b/g, 
    name: 'border-gray-100', 
    suggestion: 'dark:border-gray-800',
    fix: (str) => str.replace(/border-gray-100\b/g, 'border-gray-100 dark:border-gray-800')
  },
];

// Find files recursively
function findFiles(dir, extensions) {
  const files = [];
  
  if (!fs.existsSync(dir)) return files;
  
  function scan(currentDir) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, .next, etc.
        if (['node_modules', '.next', '.git', 'dist', 'build', '.swc', '__tests__', 'e2e'].includes(entry.name)) {
          continue;
        }
        scan(fullPath);
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

// Check if a line has dark mode variant for the violation
function hasDarkVariant(value, violationName) {
  // If the value already contains dark: for the same property type
  if (violationName.includes('bg-') && /dark:bg-/.test(value)) return true;
  if (violationName.includes('text-') && /dark:text-/.test(value)) return true;
  if (violationName.includes('border-') && /dark:border-/.test(value)) return true;
  return false;
}

// Extract class strings from various patterns
function extractClassStrings(content, isJson = false) {
  const classStrings = [];
  
  if (isJson) {
    // For JSON files, look for content field with HTML
    try {
      const json = JSON.parse(content);
      if (json.content && typeof json.content === 'string') {
        // Extract all class="..." from the HTML content
        const classMatches = json.content.matchAll(/class=\"([^\"]*)\"/g);
        for (const match of classMatches) {
          classStrings.push({ value: match[1], line: 1, source: 'json-content' });
        }
        // Also look for class='...'
        const classMatches2 = json.content.matchAll(/class='([^']*)'/g);
        for (const match of classMatches2) {
          classStrings.push({ value: match[1], line: 1, source: 'json-content' });
        }
      }
    } catch (e) {
      // Not valid JSON, skip
    }
  } else {
    // For TSX/TS files
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      // Pattern: className="..." or className={`...`}
      const patterns = [
        /(?:className|class)=\"([^\"]*)\"/g,
        /(?:className|class)=`([^`]*)`/g,
        /(?:className|class)=\{?`([^`]*)`\}?/g,
        /cn\s*\(\s*\"([^\"]*)\"/g,
        /cn\s*\(\s*`([^`]*)`/g,
      ];
      
      for (const pattern of patterns) {
        const matches = line.matchAll(pattern);
        for (const match of matches) {
          classStrings.push({ 
            value: match[1], 
            line: index + 1, 
            source: 'tsx',
            fullLine: line.trim()
          });
        }
      }
    });
  }
  
  return classStrings;
}

// Check a file for violations
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const isJson = filePath.endsWith('.json');
  const violations = [];
  
  const classStrings = extractClassStrings(content, isJson);
  
  for (const { value, line, source, fullLine } of classStrings) {
    for (const { pattern, name, suggestion, check } of PROBLEMATIC_PATTERNS) {
      const matches = [...value.matchAll(pattern)];
      
      for (const match of matches) {
        // Skip if the class string has dark: variant elsewhere
        if (hasDarkVariant(value, name)) {
          continue;
        }
        
        // Special check for text-white
        if (name === 'text-white without dark bg') {
          if (check && check(value)) {
            continue; // Has dark background, OK
          }
          // Check for hover states that might fix it
          if (value.includes('hover:bg-') && value.includes('hover:text-white')) {
            continue;
          }
        }
        
        violations.push({
          line,
          match: match[0],
          type: name,
          suggestion: suggestion,
          context: isJson ? value.substring(0, 100) : (fullLine || value).substring(0, 120),
          source
        });
      }
    }
  }
  
  return violations;
}

// Main function
function main() {
  console.log('🔍 Scanning for Dark Mode Violations...\n');
  
  const allFiles = [];
  for (const dir of DIRECTORIES_TO_CHECK) {
    const fullPath = path.join(process.cwd(), dir);
    const files = findFiles(fullPath, EXTENSIONS);
    allFiles.push(...files);
  }
  
  console.log(`Found ${allFiles.length} files to check\n`);
  
  let totalViolations = 0;
  let filesWithViolations = 0;
  const results = [];
  
  for (const filePath of allFiles) {
    let violations;
    try {
      violations = checkFile(filePath);
    } catch (e) {
      console.error(`Error checking ${filePath}:`, e.message);
      continue;
    }
    
    if (violations.length > 0) {
      filesWithViolations++;
      totalViolations += violations.length;
      
      const relativePath = path.relative(process.cwd(), filePath);
      results.push({
        file: relativePath,
        violations: violations
      });
    }
  }
  
  // Output results
  if (!outputJson) {
    console.log('='.repeat(80));
    console.log(`DARK MODE VIOLATIONS REPORT`);
    console.log('='.repeat(80));
    console.log(`Files checked: ${allFiles.length}`);
    console.log(`Files with violations: ${filesWithViolations}`);
    console.log(`Total violations: ${totalViolations}`);
    console.log('='.repeat(80));
    console.log();
  }
  
  // Group by file
  if (!outputJson) {
    for (const { file, violations } of results) {
      console.log(`\n❌ ${file}`);
      console.log('-'.repeat(80));
      
      for (const v of violations) {
        console.log(`  Line ${v.line} [${v.type}]`);
        console.log(`    Found: ${v.match}`);
        console.log(`    Suggestion: ${v.suggestion}`);
        console.log(`    Context: ${v.context.substring(0, 100)}...`);
        console.log();
      }
    }
  }
  
  // Summary by violation type
  const typeCount = {};
  for (const { violations } of results) {
    for (const v of violations) {
      typeCount[v.type] = (typeCount[v.type] || 0) + 1;
    }
  }
  
  if (!outputJson) {
    console.log('\n' + '='.repeat(80));
    console.log('VIOLATION SUMMARY BY TYPE');
    console.log('='.repeat(80));
    
    const sortedTypes = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
    for (const [type, count] of sortedTypes) {
      console.log(`  ${type}: ${count} occurrences`);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log(totalViolations > 0 ? '❌ VIOLATIONS FOUND' : '✅ NO VIOLATIONS FOUND');
    console.log('='.repeat(80));
  }
  
  // Output JSON if requested
  if (outputJson) {
    const jsonOutput = {
      summary: {
        filesChecked: allFiles.length,
        filesWithViolations: filesWithViolations,
        totalViolations: totalViolations,
        byType: typeCount
      },
      results: results
    };
    console.log(JSON.stringify(jsonOutput, null, 2));
  }
  
  // Output fix guide
  if (showFix) {
    console.log('\n' + '='.repeat(80));
    console.log('FIX GUIDE');
    console.log('='.repeat(80));
    console.log(`
Common fixes for dark mode violations:

1. Hardcoded hex colors (bg-[#FF3131]):
   Add dark: variant: bg-[#FF3131] dark:bg-[#FF5050]

2. Light backgrounds (bg-gray-50, bg-white):
   Add dark: variant: bg-gray-50 dark:bg-gray-800

3. Light borders (border-gray-200):
   Add dark: variant: border-gray-200 dark:border-gray-700

4. Text colors (text-[#FF3131]):
   Add dark: variant: text-[#FF3131] dark:text-[#FF6B6B]

5. text-white without dark background:
   Option A: Add a dark background: className="bg-blue-600 text-white"
   Option B: Use conditional text: className="text-gray-900 dark:text-white"

For JSON blog content files, edit the HTML content directly to add dark: variants.
`);
    console.log('='.repeat(80));
  }
  
  // Exit with error code if violations found
  process.exit(totalViolations > 0 ? 1 : 0);
}

main();
