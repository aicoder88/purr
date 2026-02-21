#!/usr/bin/env node
/**
 * Fix Duplicate "Purrify" in Titles and Descriptions (Complete Version)
 * 
 * This is a comprehensive script that handles all edge cases:
 * 1. Page titles manually adding "| Purrify" 
 * 2. Blog pages with `${metaTitle} | ${SITE_NAME}` pattern
 * 3. Multiple "Purrify" in descriptions
 * 4. Multiple "Purrify" in titles (| Purrify | Purrify, Purrify...Purrify, etc.)
 * 5. Trailing spaces in titles
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[FIXED]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

// Track statistics
const stats = {
  filesChecked: 0,
  filesFixed: 0,
  titleFixes: 0,
  descriptionFixes: 0,
};

/**
 * Count occurrences of a substring in a string
 */
function countOccurrences(str, substring) {
  return (str.match(new RegExp(substring, 'gi')) || []).length;
}

/**
 * Fix duplicate Purrify in a title string
 * Returns the fixed title and whether it was changed
 */
function fixTitleString(title) {
  let newTitle = title;
  let changed = false;
  
  // Count Purrify occurrences
  const purrifyCount = countOccurrences(newTitle, 'Purrify');
  
  if (purrifyCount <= 1) {
    return { title: newTitle, changed: false };
  }
  
  // Pattern 1: "| Purrify | Purrify" -> "| Purrify"
  if (/\|\s*Purrify\s*\|\s*Purrify/i.test(newTitle)) {
    newTitle = newTitle.replace(/\|\s*Purrify\s*\|\s*Purrify/gi, '| Purrify');
    changed = true;
  }
  
  // Pattern 2: "Purrify Purrify" (consecutive) -> "Purrify"
  if (/Purrify\s+Purrify/i.test(newTitle)) {
    newTitle = newTitle.replace(/Purrify(?:\s+Purrify)+/gi, 'Purrify');
    changed = true;
  }
  
  // Pattern 3: Keep only the last Purrify if there are multiple non-consecutive ones
  // This handles cases like "Purrify对比喷雾... | Purrify 猫砂..."
  const purrifyMatches = newTitle.match(/Purrify/gi);
  if (purrifyMatches && purrifyMatches.length > 1) {
    // Remove all Purrify occurrences except keep the one that's part of "| Purrify" or at the end
    // Strategy: Find "| Purrify" pattern and keep that, remove others
    // Or find the last occurrence and keep that
    
    if (/\|\s*Purrify/i.test(newTitle)) {
      // Has "| Purrify" pattern - keep that one
      newTitle = newTitle.replace(/Purrify/gi, (match, offset, string) => {
        // Check if this Purrify is preceded by "| "
        const before = string.substring(0, offset);
        if (/\|\s*$/i.test(before)) {
          return match; // Keep this one
        }
        return ''; // Remove others
      });
      changed = true;
    } else {
      // No pipe pattern - keep only the first occurrence
      let first = true;
      newTitle = newTitle.replace(/Purrify/gi, (match) => {
        if (first) {
          first = false;
          return match;
        }
        return '';
      });
      changed = true;
    }
  }
  
  // Clean up double spaces
  newTitle = newTitle.replace(/\s+/g, ' ').trim();
  
  return { title: newTitle, changed };
}

/**
 * Fix title strings that end with "| Purrify" since layout already adds it
 */
function fixTitleSuffix(content) {
  // Pattern: title: 'Something | Purrify' or title: "Something | Purrify"
  const pattern = /(title\s*:\s*['"])([^'"]*?)(\s*\|\s*Purrify\s*)(['"])/gi;
  
  return content.replace(pattern, (match, prefix, titleText, suffix, quote) => {
    stats.titleFixes++;
    const cleanTitle = titleText.trimEnd();
    return `${prefix}${cleanTitle}${quote}`;
  });
}

/**
 * Fix blog pages with `${metaTitle} | ${SITE_NAME}` pattern
 */
function fixBlogTitlePattern(content) {
  const pattern = /title\s*:\s*`\$\{(\w+)\}\s*\|\s*\$\{SITE_NAME\}`/g;
  
  return content.replace(pattern, (match, varName) => {
    stats.titleFixes++;
    return `title: ${varName}`;
  });
}

/**
 * Fix descriptions with multiple "Purrify" instances at the end
 */
function fixDescriptionDuplicates(content) {
  // Pattern: "description": "... Purrify Purrify Purrify" (multiple at end)
  const pattern = /("description"\s*:\s*["'])([^"']*?)(\s*Purrify(?:\s+Purrify)+)(["'])/gi;
  
  return content.replace(pattern, (match, prefix, descText, purrifySuffix, quote) => {
    stats.descriptionFixes++;
    return `${prefix}${descText}${quote}`;
  });
}

/**
 * Fix all title patterns in JSON content
 */
function fixAllJsonTitles(content) {
  const titlePattern = /"title"\s*:\s*"([^"]*)"/gi;
  
  return content.replace(titlePattern, (match, titleValue) => {
    const { title: newTitle, changed } = fixTitleString(titleValue);
    
    if (changed) {
      stats.titleFixes++;
      return `"title": "${newTitle}"`;
    }
    return match;
  });
}

/**
 * Process a single file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;

  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    newContent = fixTitleSuffix(newContent);
    newContent = fixBlogTitlePattern(newContent);
  }
  
  if (filePath.endsWith('.json')) {
    newContent = fixDescriptionDuplicates(newContent);
    newContent = fixAllJsonTitles(newContent);
  }

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }
  
  return false;
}

/**
 * Recursively find files matching patterns
 */
function findFiles(dir, patterns, excludeDirs = ['node_modules', '.next', '.git']) {
  const files = [];
  
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        if (!excludeDirs.includes(entry.name)) {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        if (patterns.some(pattern => entry.name.endsWith(pattern))) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

/**
 * Main function
 */
function main() {
  log.header('=== Fixing Duplicate "Purrify" in Titles and Descriptions (Complete) ===\n');

  // Fix 1: Process app directory .tsx files
  log.header('Phase 1: Fixing page titles in app/');
  const appFiles = findFiles('app', ['.tsx', '.ts']);
  
  for (const file of appFiles) {
    stats.filesChecked++;
    try {
      if (processFile(file)) {
        stats.filesFixed++;
        log.success(`Fixed titles in ${file}`);
      }
    } catch (err) {
      log.error(`Failed to process ${file}: ${err.message}`);
    }
  }

  // Fix 2: Process content/blog JSON files
  log.header('Phase 2: Fixing titles and descriptions in content/blog/');
  const blogFiles = findFiles('content/blog', ['.json']);
  
  for (const file of blogFiles) {
    stats.filesChecked++;
    try {
      if (processFile(file)) {
        stats.filesFixed++;
        log.success(`Fixed in ${file}`);
      }
    } catch (err) {
      log.error(`Failed to process ${file}: ${err.message}`);
    }
  }

  // Summary
  log.header('\n=== Summary ===');
  log.info(`Files checked: ${stats.filesChecked}`);
  log.info(`Files fixed: ${stats.filesFixed}`);
  log.info(`Title fixes: ${stats.titleFixes}`);
  log.info(`Description fixes: ${stats.descriptionFixes}`);
  
  if (stats.filesFixed === 0) {
    log.info('\nNo issues found - all titles and descriptions look good!');
  } else {
    log.success(`\nFixed ${stats.filesFixed} files with ${stats.titleFixes + stats.descriptionFixes} issues total.`);
  }
}

// Run the script
main();
