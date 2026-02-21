#!/usr/bin/env tsx
/**
 * Fix Duplicate "| Purrify" in Titles
 * 
 * This script finds and fixes duplicate "| Purrify" suffixes in:
 * - Translation files (JSON and TS)
 * - Blog content files
 * - Page metadata
 * 
 * Patterns fixed:
 * - "| Purrify | Purrify" → "| Purrify"
 * - "| Free Delivery | Purrify" → "| Purrify"
 * - "| Free Delivery | Purrify | Purrify" → "| Purrify"
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // File patterns to search
  includePatterns: [
    '**/*.json',
    '**/*.ts',
    '**/*.tsx',
    '**/*.js',
    '**/*.jsx',
  ],
  
  // Directories to exclude
  excludeDirs: [
    'node_modules',
    '.next',
    '.git',
    'dist',
    'build',
    'scripts', // Don't modify ourselves
  ],
  
  // Patterns to fix (regex -> replacement)
  fixPatterns: [
    // "| Purrify | Purrify" → "| Purrify"
    {
      name: 'Double | Purrify',
      regex: /\|\s*Purrify\s*\|\s*Purrify/gi,
      replacement: '| Purrify',
    },
    // "| Free Delivery | Purrify" → "| Purrify"  
    {
      name: '| Free Delivery | Purrify',
      regex: /\|\s*Free Delivery\s*\|\s*Purrify/gi,
      replacement: '| Purrify',
    },
    // "| Free Delivery | Purrify | Purrify" → "| Purrify"
    {
      name: '| Free Delivery | Purrify | Purrify',
      regex: /\|\s*Free Delivery\s*\|\s*Purrify\s*\|\s*Purrify/gi,
      replacement: '| Purrify',
    },
    // "Purrify Purrify" (consecutive words) → "Purrify"
    {
      name: 'Consecutive Purrify words',
      regex: /Purrify(?:\s+Purrify)+/gi,
      replacement: 'Purrify',
    },
  ],
};

// ============================================================================
// TYPES
// ============================================================================

interface FixResult {
  file: string;
  fixed: boolean;
  changes: string[];
  error?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Recursively find all files matching patterns
 */
function findFiles(dir: string, patterns: string[], excludeDirs: string[]): string[] {
  const results: string[] = [];
  
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        if (!excludeDirs.includes(entry.name)) {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (patterns.some(p => fullPath.endsWith(p.replace('**/*', '')))) {
          results.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return results;
}

/**
 * Check if file is binary
 */
function isBinaryFile(filePath: string): boolean {
  const buffer = fs.readFileSync(filePath);
  for (let i = 0; i < Math.min(buffer.length, 1024); i++) {
    if (buffer[i] === 0) return true;
  }
  return false;
}

/**
 * Fix duplicate patterns in content
 */
function fixContent(content: string): { fixed: boolean; newContent: string; changes: string[] } {
  let newContent = content;
  const changes: string[] = [];
  
  for (const pattern of CONFIG.fixPatterns) {
    const matches = newContent.match(pattern.regex);
    if (matches && matches.length > 0) {
      const count = matches.length;
      newContent = newContent.replace(pattern.regex, pattern.replacement);
      changes.push(`${pattern.name}: ${count} occurrence(s)`);
    }
  }
  
  return {
    fixed: newContent !== content,
    newContent,
    changes,
  };
}

/**
 * Process a single file
 */
function processFile(filePath: string): FixResult {
  try {
    // Skip binary files
    if (isBinaryFile(filePath)) {
      return { file: filePath, fixed: false, changes: [], error: 'Binary file' };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const { fixed, newContent, changes } = fixContent(content);
    
    if (fixed) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      return { file: filePath, fixed: true, changes };
    }
    
    return { file: filePath, fixed: false, changes: [] };
  } catch (error) {
    return {
      file: filePath,
      fixed: false,
      changes: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║      Fix Duplicate "| Purrify" in Titles and Content           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  const cwd = process.cwd();
  console.log(`📁 Scanning directory: ${cwd}\n`);
  
  // Find all files
  const extensions = ['.json', '.ts', '.tsx', '.js', '.jsx'];
  const allFiles: string[] = [];
  
  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(cwd, fullPath);
      
      if (entry.isDirectory()) {
        if (!CONFIG.excludeDirs.includes(entry.name)) {
          walkDir(fullPath);
        }
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        allFiles.push(relativePath);
      }
    }
  }
  
  walkDir(cwd);
  
  console.log(`🔍 Found ${allFiles.length} files to check\n`);
  
  // Process each file
  const results: FixResult[] = [];
  const fixedFiles: FixResult[] = [];
  const errorFiles: FixResult[] = [];
  
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const result = processFile(path.join(cwd, file));
    results.push(result);
    
    if (result.fixed) {
      fixedFiles.push(result);
      console.log(`✅ [${i + 1}/${allFiles.length}] Fixed: ${file}`);
      result.changes.forEach(c => console.log(`   → ${c}`));
    } else if (result.error) {
      errorFiles.push(result);
      console.log(`❌ [${i + 1}/${allFiles.length}] Error: ${file} - ${result.error}`);
    } else {
      // Only show progress every 50 files to reduce noise
      if ((i + 1) % 50 === 0 || i === allFiles.length - 1) {
        console.log(`⏭️  [${i + 1}/${allFiles.length}] Checked...`);
      }
    }
  }
  
  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                         SUMMARY                                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(`\n📊 Statistics:`);
  console.log(`   Total files checked: ${results.length}`);
  console.log(`   Files fixed: ${fixedFiles.length}`);
  console.log(`   Errors: ${errorFiles.length}`);
  
  if (fixedFiles.length > 0) {
    console.log(`\n📋 Fixed Files:`);
    fixedFiles.forEach(r => {
      console.log(`\n   ✅ ${r.file}`);
      r.changes.forEach(c => console.log(`      → ${c}`));
    });
  }
  
  if (errorFiles.length > 0) {
    console.log(`\n❌ Files with errors:`);
    errorFiles.forEach(r => console.log(`   ${r.file}: ${r.error}`));
  }
  
  // Save report
  const reportPath = path.join(cwd, 'DUPLICATE_PURRIFY_FIX_REPORT.txt');
  const report = `
Duplicate "| Purrify" Fix Report
================================
Date: ${new Date().toISOString()}

Statistics:
- Total files checked: ${results.length}
- Files fixed: ${fixedFiles.length}
- Errors: ${errorFiles.length}

Fixed Files:
${fixedFiles.map(r => `- ${r.file}\n  ${r.changes.join('\n  ')}`).join('\n\n')}

Files with errors:
${errorFiles.map(r => `- ${r.file}: ${r.error}`).join('\n')}
`;
  
  fs.writeFileSync(reportPath, report);
  console.log(`\n📝 Report saved to: ${reportPath}\n`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { fixContent, processFile };
