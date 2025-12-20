#!/usr/bin/env node

/**
 * SonarCloud Issues Fixer
 *
 * This script programmatically fixes common SonarCloud issues:
 * 1. Prefer node: prefix for built-in modules
 * 2. String.replaceAll over String.replace with regex
 * 3. structuredClone over JSON.parse(JSON.stringify())
 * 4. Unused error catches - remove unused error variable
 * 5. Array index keys in React - attempts to fix common patterns
 * 6. Prefer globalThis over window
 * 7. Fix .includes() over .some() for simple value checks
 *
 * Usage: node scripts/fix-sonarcloud-issues.js [--dry-run] [--type=<type>]
 *
 * Types: all, node-prefix, replace-all, structured-clone, unused-catch,
 *        global-this, includes
 */

const fs = require('node:fs');
const path = require('node:path');

// Configuration
const CONFIG = {
  // Directories to scan
  includeDirs: ['pages', 'src', 'scripts', 'e2e', '__tests__'],
  // Directories to exclude
  excludeDirs: ['node_modules', '.next', '.git', '.image-migration-backup', 'dist', 'coverage'],
  // File extensions to process
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
};

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const typeArg = args.find(a => a.startsWith('--type='));
const fixType = typeArg ? typeArg.split('=')[1] : 'all';

let filesModified = 0;
let totalFixes = 0;
const fixes = {};

// Utility to walk directories
function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!CONFIG.excludeDirs.includes(file)) {
        walkDir(filePath, callback);
      }
    } else if (CONFIG.extensions.includes(path.extname(file))) {
      callback(filePath);
    }
  }
}

// Fix: Prefer node: prefix for built-in modules
function fixNodePrefix(content, filePath) {
  const builtins = ['fs', 'path', 'url', 'crypto', 'os', 'util', 'stream', 'http', 'https', 'child_process', 'events', 'buffer', 'querystring', 'zlib'];
  let modified = content;
  let count = 0;

  for (const mod of builtins) {
    // require('fs') -> require('node:fs')
    const requireRegex = new RegExp(`require\\(['"]${mod}['"]\\)`, 'g');
    const requireMatches = modified.match(requireRegex);
    if (requireMatches) {
      modified = modified.replace(requireRegex, `require('node:${mod}')`);
      count += requireMatches.length;
    }

    // import ... from 'fs' -> import ... from 'node:fs'
    const importRegex = new RegExp(`from ['"]${mod}['"]`, 'g');
    const importMatches = modified.match(importRegex);
    if (importMatches) {
      modified = modified.replace(importRegex, `from 'node:${mod}'`);
      count += importMatches.length;
    }
  }

  return { content: modified, count };
}

// Fix: String.replaceAll over String.replace with global regex
function fixReplaceAll(content, filePath) {
  let modified = content;
  let count = 0;

  // Match .replace(/pattern/g, replacement) -> .replaceAll(/pattern/g, replacement)
  // Only for patterns that are simple enough
  const regex = /\.replace\((\/.+?\/g),/g;
  const matches = modified.match(regex);

  if (matches) {
    modified = modified.replace(regex, '.replaceAll($1,');
    count = matches.length;
  }

  return { content: modified, count };
}

// Fix: structuredClone over JSON.parse(JSON.stringify())
function fixStructuredClone(content, filePath) {
  let modified = content;
  let count = 0;

  // JSON.parse(JSON.stringify(x)) -> structuredClone(x)
  const regex = /JSON\.parse\(JSON\.stringify\(([^)]+)\)\)/g;
  const matches = modified.match(regex);

  if (matches) {
    modified = modified.replace(regex, 'structuredClone($1)');
    count = matches.length;
  }

  return { content: modified, count };
}

// Fix: Unused error catches
function fixUnusedCatch(content, filePath) {
  let modified = content;
  let count = 0;

  // Pattern: catch (error) { ... } where error is not used
  // This is a simplified version - catches cases where error appears only once (in the catch)
  const catchRegex = /\} catch \(error\) \{([^}]*)\}/g;

  modified = modified.replace(catchRegex, (match, body) => {
    // Check if 'error' is used in the body (not just as a parameter)
    if (!body.includes('error')) {
      count++;
      return `} catch {${body}}`;
    }
    return match;
  });

  // Also handle (err) pattern
  const catchErrRegex = /\} catch \(err\) \{([^}]*)\}/g;
  modified = modified.replace(catchErrRegex, (match, body) => {
    if (!body.includes('err')) {
      count++;
      return `} catch {${body}}`;
    }
    return match;
  });

  // Handle multi-line catch blocks (simplified - just removes unused _error, _err prefixed ones)
  const underscoreRegex = /catch \(_error\)/g;
  const underscoreMatches = modified.match(underscoreRegex);
  if (underscoreMatches) {
    modified = modified.replace(underscoreRegex, 'catch');
    count += underscoreMatches.length;
  }

  return { content: modified, count };
}

// Fix: Prefer globalThis over window
function fixGlobalThis(content, filePath) {
  let modified = content;
  let count = 0;

  // typeof window !== 'undefined' -> typeof globalThis.window !== 'undefined'
  // But be careful not to double-fix
  if (!modified.includes('globalThis.window')) {
    const patterns = [
      [/typeof window !== ['"]undefined['"]/g, "typeof globalThis.window !== 'undefined'"],
      [/typeof window === ['"]undefined['"]/g, "typeof globalThis.window === 'undefined'"],
    ];

    for (const [pattern, replacement] of patterns) {
      const matches = modified.match(pattern);
      if (matches) {
        modified = modified.replace(pattern, replacement);
        count += matches.length;
      }
    }
  }

  return { content: modified, count };
}

// Fix: Use .includes() instead of .some() for simple value checks
function fixIncludes(content, filePath) {
  let modified = content;
  let count = 0;

  // .some(x => x === value) -> .includes(value)
  // .some(item => item === value) -> .includes(value)
  const someRegex = /\.some\(\s*(\w+)\s*=>\s*\1\s*===\s*([^)]+)\)/g;

  modified = modified.replace(someRegex, (match, param, value) => {
    count++;
    return `.includes(${value})`;
  });

  return { content: modified, count };
}

// Fix: Remove unused imports (basic pattern matching)
function fixUnusedImports(content, filePath) {
  // This is complex - we'll handle only obvious cases
  // For now, skip this - ESLint --fix handles it better
  return { content, count: 0 };
}

// Main processing function
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileFixCount = 0;

  const fixers = {
    'node-prefix': fixNodePrefix,
    'replace-all': fixReplaceAll,
    'structured-clone': fixStructuredClone,
    'unused-catch': fixUnusedCatch,
    'global-this': fixGlobalThis,
    'includes': fixIncludes,
  };

  const fixersToRun = fixType === 'all' ? Object.keys(fixers) : [fixType];

  for (const type of fixersToRun) {
    if (fixers[type]) {
      const result = fixers[type](content, filePath);
      content = result.content;
      if (result.count > 0) {
        fileFixCount += result.count;
        fixes[type] = (fixes[type] || 0) + result.count;
      }
    }
  }

  if (content !== originalContent) {
    filesModified++;
    totalFixes += fileFixCount;

    if (dryRun) {
      console.log(`[DRY RUN] Would modify: ${filePath} (${fileFixCount} fixes)`);
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Modified: ${filePath} (${fileFixCount} fixes)`);
    }
  }
}

// Main execution
console.log('🔧 SonarCloud Issues Fixer');
console.log('==========================');
console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
console.log(`Fix type: ${fixType}`);
console.log('');

const rootDir = process.cwd();

for (const dir of CONFIG.includeDirs) {
  const fullPath = path.join(rootDir, dir);
  walkDir(fullPath, processFile);
}

// Also process root-level files
const rootFiles = fs.readdirSync(rootDir);
for (const file of rootFiles) {
  const filePath = path.join(rootDir, file);
  const stat = fs.statSync(filePath);
  if (!stat.isDirectory() && CONFIG.extensions.includes(path.extname(file))) {
    processFile(filePath);
  }
}

console.log('');
console.log('📊 Summary');
console.log('==========');
console.log(`Files modified: ${filesModified}`);
console.log(`Total fixes: ${totalFixes}`);
console.log('');
console.log('Fixes by type:');
for (const [type, count] of Object.entries(fixes)) {
  console.log(`  ${type}: ${count}`);
}

if (dryRun) {
  console.log('');
  console.log('💡 Run without --dry-run to apply changes');
}
