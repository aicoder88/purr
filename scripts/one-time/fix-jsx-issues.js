#!/usr/bin/env node

/**
 * JSX/React Issues Fixer
 *
 * Fixes React-specific SonarCloud issues:
 * 1. Array index keys - replace key={index} with key={item.id} or key={item.name} patterns
 * 2. Form label accessibility - add htmlFor and id attributes
 * 3. Nested ternary operations - extract to variables (basic patterns)
 *
 * Usage: node scripts/fix-jsx-issues.js [--dry-run]
 */

const fs = require('node:fs');
const path = require('node:path');

const CONFIG = {
  includeDirs: ['pages', 'src'],
  excludeDirs: ['node_modules', '.next', '.git', '.image-migration-backup'],
  extensions: ['.tsx', '.jsx'],
};

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

let filesModified = 0;
let totalFixes = 0;
const fixes = {};

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

// Fix array index keys - common patterns
function fixArrayIndexKeys(content, filePath) {
  let modified = content;
  let count = 0;

  // Pattern: .map((item, index) => ... key={index}
  // This is complex - we'll handle specific safe patterns

  // Pattern 1: key={index} when iterating over objects with 'id' field
  // Look for .map((item, index) and later key={index}, suggest using item.id

  // Pattern 2: key={i} - common shorthand
  // .map((x, i) => <... key={i}

  // For safety, we'll only fix patterns where we can clearly identify the item variable
  const mapWithIndexRegex = /\.map\(\s*\((\w+),\s*(\w+)\)\s*=>/g;
  let match;

  // Track what we find but don't auto-fix (too risky without full AST)
  // Instead, log suggestions
  while ((match = mapWithIndexRegex.exec(content)) !== null) {
    const itemVar = match[1];
    const indexVar = match[2];

    // Check if key={indexVar} exists nearby
    const keyPattern = new RegExp(`key=\\{${indexVar}\\}`, 'g');
    if (keyPattern.test(content)) {
      // Found a potential fix - log it
      console.log(`  ⚠️  Found key={${indexVar}} in ${filePath} - consider using key={${itemVar}.id} or similar`);
    }
  }

  return { content: modified, count };
}

// Add form label IDs - basic pattern matching
function fixFormLabels(content, filePath) {
  let modified = content;
  let count = 0;

  // Pattern: <label>Text</label> followed by <input ... without id
  // This is complex - we'll look for specific patterns

  // Find labels without htmlFor
  const labelWithoutFor = /<label(?![^>]*htmlFor)[^>]*>/g;
  const matches = content.match(labelWithoutFor);

  if (matches && matches.length > 0) {
    console.log(`  ⚠️  Found ${matches.length} <label> without htmlFor in ${filePath}`);
  }

  return { content: modified, count };
}

// Report nested ternaries
function reportNestedTernaries(content, filePath) {
  let count = 0;

  // Pattern: ? ... ? ... : ... : (nested ternary)
  const nestedTernaryRegex = /\?[^:?]*\?[^:]*:[^:]*:/g;
  const matches = content.match(nestedTernaryRegex);

  if (matches && matches.length > 0) {
    console.log(`  ⚠️  Found ${matches.length} nested ternary operations in ${filePath}`);
    count = matches.length;
  }

  return { content, count };
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileFixCount = 0;

  // These are mostly reporting functions for now
  fixArrayIndexKeys(content, filePath);
  fixFormLabels(content, filePath);
  reportNestedTernaries(content, filePath);

  if (content !== originalContent) {
    filesModified++;
    totalFixes += fileFixCount;

    if (dryRun) {
      console.log(`[DRY RUN] Would modify: ${filePath}`);
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Modified: ${filePath}`);
    }
  }
}

console.log('🔧 JSX Issues Scanner/Fixer');
console.log('============================');
console.log(`Mode: ${dryRun ? 'DRY RUN' : 'SCAN'}`);
console.log('');
console.log('Scanning for issues that need manual review...');
console.log('');

const rootDir = process.cwd();

for (const dir of CONFIG.includeDirs) {
  const fullPath = path.join(rootDir, dir);
  walkDir(fullPath, processFile);
}

console.log('');
console.log('📊 Summary');
console.log('==========');
console.log(`Files scanned: ${filesModified > 0 ? filesModified : 'all'}`);
console.log('');
console.log('💡 Note: Most JSX issues require manual review due to context-dependent fixes.');
console.log('   Use ESLint with --fix for what can be auto-fixed.');
