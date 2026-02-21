#!/usr/bin/env node
/**
 * Title Shortener Script - Remove "| Purrify" from Long Titles
 * 
 * Purpose: Shorten page titles that exceed 55 characters by removing "| Purrify" suffix.
 * This improves SEO as Google typically truncates titles over 60 characters.
 * 
 * Complementary to: fix_duplicate_purrify.js (which fixes duplicate "Purrify" occurrences)
 * This script: Focuses on length-based optimization by removing "| Purrify" from long titles
 * 
 * Usage:
 *   node scripts/shorten-long-titles.js         # Dry run (preview only)
 *   node scripts/shorten-long-titles.js --apply # Apply changes
 * 
 * Threshold: 55 characters (configurable via MAX_LENGTH)
 * Affected files: TypeScript translations, JSON content, blog posts
 * Languages: All (en, es, fr, zh)
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// Configuration
const CONFIG = {
  // Length threshold - titles longer than this will have "| Purrify" removed
  MAX_LENGTH: 55,
  // Pattern to match "| Purrify" (with optional trailing content like "..." or duplicates)
  SUFFIX_PATTERN: /\s*\|\s*Purrify(?:\s*\|\s*Purrify)?(?:\.\.\.)?/g,
  // File extensions to process
  EXTENSIONS: ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'],
  // Directories to search
  DIRECTORIES: ['src', 'content', 'app', 'components', 'lib'],
  // Directories to exclude
  EXCLUDE_DIRS: ['node_modules', '.next', 'dist', 'build', '__tests__', 'scripts'],
};

// Stats tracking
const stats = {
  filesScanned: 0,
  filesModified: 0,
  titlesShortened: 0,
  errors: [],
};

/**
 * Check if a file should be processed based on extension
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CONFIG.EXTENSIONS.includes(ext);
}

/**
 * Check if a directory should be excluded
 */
function shouldExcludeDir(dirPath) {
  const baseName = path.basename(dirPath);
  return CONFIG.EXCLUDE_DIRS.includes(baseName);
}

/**
 * Find all files to process recursively
 */
async function findFiles(dir, files = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!shouldExcludeDir(fullPath)) {
          await findFiles(fullPath, files);
        }
      } else if (entry.isFile() && shouldProcessFile(fullPath)) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Directory might not exist, skip
  }
  
  return files;
}

/**
 * Process a single file - find and fix long titles
 */
async function processFile(filePath, dryRun = true) {
  try {
    const content = await readFile(filePath, 'utf-8');
    let modified = false;
    let newContent = content;
    const changes = [];

    // Pattern to match title fields in various formats
    // Matches: title: "..." or "title": "..." or title: '...' etc.
    const titlePatterns = [
      // TypeScript/JS: title: "..." or title: '...'
      { regex: /(title\s*:\s*["'])([^"']+)(["'])/gi, type: 'ts' },
      // JSON: "title": "..."
      { regex: /("title"\s*:\s*")([^"]+)(")/gi, type: 'json' },
      // pageTitle: "..." (common in this codebase)
      { regex: /(pageTitle\s*:\s*["'])([^"']+)(["'])/gi, type: 'pageTitle' },
    ];

    for (const pattern of titlePatterns) {
      newContent = newContent.replace(pattern.regex, (match, prefix, titleValue, suffix) => {
        // Check if title contains "| Purrify"
        if (!titleValue.includes('| Purrify')) {
          return match;
        }

        const originalLength = titleValue.length;
        
        // Check if title exceeds threshold
        if (originalLength <= CONFIG.MAX_LENGTH) {
          return match; // Title is short enough, keep as-is
        }

        // Remove "| Purrify" suffix (and any duplicates)
        let newTitleValue = titleValue.replace(CONFIG.SUFFIX_PATTERN, '').trim();
        
        // Clean up any trailing spaces or punctuation issues
        newTitleValue = newTitleValue.replace(/\s+$/g, '').trim();
        
        const newLength = newTitleValue.length;
        
        if (newTitleValue !== titleValue) {
          modified = true;
          changes.push({
            original: titleValue,
            shortened: newTitleValue,
            originalLength,
            newLength,
            saved: originalLength - newLength,
          });
          return prefix + newTitleValue + suffix;
        }
        
        return match;
      });
    }

    if (modified) {
      stats.filesModified++;
      stats.titlesShortened += changes.length;
      
      if (!dryRun) {
        // Create backup
        const backupPath = filePath + '.backup';
        await writeFile(backupPath, content, 'utf-8');
        
        // Write modified content
        await writeFile(filePath, newContent, 'utf-8');
      }
      
      return { filePath, changes, dryRun };
    }
    
    return null;
  } catch (err) {
    stats.errors.push({ file: filePath, error: err.message });
    return null;
  }
}

/**
 * Print formatted results
 */
function printResults(results) {
  console.log('\n' + '='.repeat(80));
  console.log('TITLE SHORTENING RESULTS');
  console.log('='.repeat(80));
  
  if (results.length === 0) {
    console.log('\n✅ No titles needed shortening (all titles are under 55 characters)');
    return;
  }

  for (const result of results) {
    if (!result) continue;
    
    console.log(`\n📄 ${result.filePath}`);
    console.log('-'.repeat(80));
    
    for (const change of result.changes) {
      console.log(`  Length: ${change.originalLength} → ${change.newLength} chars (saved ${change.saved})`);
      console.log(`  Before: "${change.original}"`);
      console.log(`  After:  "${change.shortened}"`);
      console.log('');
    }
  }
  
  console.log('='.repeat(80));
  console.log(`SUMMARY:`);
  console.log(`  Files scanned: ${stats.filesScanned}`);
  console.log(`  Files with long titles: ${stats.filesModified}`);
  console.log(`  Titles shortened: ${stats.titlesShortened}`);
  console.log(`  Mode: ${results[0]?.dryRun ? 'DRY RUN (no changes made)' : 'APPLIED'}`);
  
  if (stats.errors.length > 0) {
    console.log(`\n  ⚠️  Errors: ${stats.errors.length}`);
    for (const err of stats.errors) {
      console.log(`     - ${err.file}: ${err.error}`);
    }
  }
  console.log('='.repeat(80));
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  const help = args.includes('--help') || args.includes('-h');
  
  if (help) {
    console.log(`
Usage: node scripts/shorten-long-titles.js [options]

Remove "| Purrify" suffix from titles exceeding ${CONFIG.MAX_LENGTH} characters.

Options:
  --apply    Actually apply the changes (default is dry-run)
  --help     Show this help message

Examples:
  # Dry run (preview changes)
  node scripts/shorten-long-titles.js

  # Apply changes
  node scripts/shorten-long-titles.js --apply
`);
    return;
  }

  console.log(`🔍 Scanning for titles with "| Purrify" longer than ${CONFIG.MAX_LENGTH} chars...`);
  console.log(`   Mode: ${dryRun ? 'DRY RUN (preview only)' : 'APPLY CHANGES'}`);
  console.log('');

  // Find all files to process
  const rootDir = process.cwd();
  let allFiles = [];
  
  for (const dir of CONFIG.DIRECTORIES) {
    const dirPath = path.join(rootDir, dir);
    try {
      await stat(dirPath);
      const files = await findFiles(dirPath);
      allFiles = allFiles.concat(files);
    } catch (err) {
      // Directory doesn't exist, skip
    }
  }
  
  // Also check root-level files
  for (const ext of CONFIG.EXTENSIONS) {
    try {
      const files = await readdir(rootDir);
      for (const file of files) {
        if (file.endsWith(ext) && !allFiles.includes(path.join(rootDir, file))) {
          allFiles.push(path.join(rootDir, file));
        }
      }
    } catch (err) {
      // Ignore
    }
  }
  
  stats.filesScanned = allFiles.length;
  console.log(`📁 Found ${allFiles.length} files to scan`);
  
  // Process files
  const results = [];
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    if (i % 50 === 0) {
      process.stdout.write(`\r   Processing: ${i + 1}/${allFiles.length} files...`);
    }
    const result = await processFile(file, dryRun);
    if (result) {
      results.push(result);
    }
  }
  process.stdout.write(`\r   Processing: ${allFiles.length}/${allFiles.length} files... Done!\n`);
  
  // Print results
  printResults(results);
  
  if (dryRun && results.length > 0) {
    console.log('\n💡 To apply these changes, run:');
    console.log('   node scripts/shorten-long-titles.js --apply\n');
  }
  
  // Exit with appropriate code
  process.exit(stats.errors.length > 0 ? 1 : 0);
}

// Run main
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
