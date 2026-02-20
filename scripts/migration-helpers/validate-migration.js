#!/usr/bin/env node
/**
 * validate-migration.js
 * 
 * Validation script to verify migration success.
 * 
 * Features:
 * - Verify all categorized files exist
 * - Verify no broken references remain
 * - Check for orphaned files
 * - Generate validation report
 * 
 * Usage: node scripts/migration-helpers/validate-migration.js [--manifest=<file>] [--verbose]
 */

const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose');
const manifestPath = args.find(arg => arg.startsWith('--manifest='))?.split('=')[1] || 'reference-manifest.json';

// Statistics and results
const results = {
  categorizedFiles: { exists: 0, missing: [] },
  brokenReferences: [],
  orphanedFiles: [],
  uncategorizedPaths: [],
  summary: {
    totalChecked: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
  },
};

/**
 * Load the reference manifest
 */
function loadManifest() {
  const manifestFullPath = path.resolve(process.cwd(), manifestPath);
  if (!fs.existsSync(manifestFullPath)) {
    console.error(`Error: Manifest file not found: ${manifestFullPath}`);
    process.exit(1);
  }
  
  try {
    const content = fs.readFileSync(manifestFullPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error parsing manifest: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Check if a categorized file exists in public/optimized
 */
function checkCategorizedFile(filePath) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    results.categorizedFiles.exists++;
  } else {
    results.categorizedFiles.missing.push(filePath);
  }
  
  return exists;
}

/**
 * Scan for orphaned files in public directory
 */
function findOrphanedFiles() {
  const publicDir = path.join(process.cwd(), 'public');
  const orphaned = [];
  
  // Directories to check for orphaned files
  const checkDirs = [
    path.join(publicDir, 'images'),
    path.join(publicDir, 'optimized'),
  ];
  
  for (const dir of checkDirs) {
    if (!fs.existsSync(dir)) continue;
    
    const files = findAllFiles(dir);
    
    for (const file of files) {
      const relativePath = path.relative(publicDir, file);
      const webPath = '/' + relativePath.replace(/\\/g, '/');
      
      // Check if this file is referenced anywhere
      // For now, just check if it's in old /images/ (should be moved)
      if (webPath.startsWith('/images/') && !webPath.includes('/images/Logos/')) {
        orphaned.push({ path: webPath, reason: 'Should be in categorized folder' });
      }
    }
  }
  
  return orphaned;
}

/**
 * Recursively find all files in a directory
 */
function findAllFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        scan(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

/**
 * Check for broken references in source files
 */
function checkBrokenReferences(manifest) {
  const broken = [];
  
  for (const ref of manifest.references || []) {
    // Skip if no rewrite needed
    if (!ref.needsRewrite) continue;
    
    const filePath = path.join(process.cwd(), ref.file);
    
    if (!fs.existsSync(filePath)) {
      broken.push({
        file: ref.file,
        path: ref.originalPath,
        reason: 'Source file not found',
      });
      continue;
    }
    
    // Read file and check if original path still exists
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(ref.originalPath)) {
      // Check if this reference should have been updated
      if (ref.suggestedNewPath) {
        broken.push({
          file: ref.file,
          line: ref.line,
          path: ref.originalPath,
          reason: 'Reference not updated',
        });
      }
    }
  }
  
  return broken;
}

/**
 * Find uncategorized paths in the codebase
 */
function findUncategorizedPaths() {
  const uncategorized = [];
  
  // Patterns that indicate uncategorized paths
  const patterns = [
    /['"`](\/images\/[^'"`]+)['"`]/g,
    /['"`](\/optimized\/[a-zA-Z0-9_-]+\.(webp|png|jpg|jpeg|avif))['"`]/g,
  ];
  
  // Directories to scan
  const scanDirs = [
    path.join(process.cwd(), 'app'),
    path.join(process.cwd(), 'src'),
    path.join(process.cwd(), 'components'),
  ];
  
  const checkedFiles = new Set();
  
  for (const dir of scanDirs) {
    if (!fs.existsSync(dir)) continue;
    
    const files = findSourceFiles(dir);
    
    for (const file of files) {
      if (checkedFiles.has(file)) continue;
      checkedFiles.add(file);
      
      const content = fs.readFileSync(file, 'utf8');
      
      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const matchedPath = match[1];
          
          // Skip already categorized paths
          if (matchedPath.match(/^\/optimized\/(blog|products|marketing|logos|team|misc|locations)\//)) {
            continue;
          }
          
          // Skip Logos subdirectory (special case)
          if (matchedPath.includes('/images/Logos/')) {
            continue;
          }
          
          uncategorized.push({
            file: path.relative(process.cwd(), file),
            path: matchedPath,
          });
        }
      }
    }
  }
  
  return uncategorized;
}

/**
 * Find source files in a directory
 */
function findSourceFiles(dir) {
  const files = [];
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  
  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .next
        if (entry.name === 'node_modules' || entry.name === '.next') continue;
        scan(fullPath);
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

/**
 * Print validation results
 */
function printResults() {
  console.log('');
  console.log('='.repeat(60));
  console.log('Validation Results');
  console.log('='.repeat(60));
  
  // Categorized files
  console.log('');
  console.log('1. Categorized Files');
  console.log(`   ✓ Exists: ${results.categorizedFiles.exists}`);
  if (results.categorizedFiles.missing.length > 0) {
    console.log(`   ✗ Missing: ${results.categorizedFiles.missing.length}`);
    if (isVerbose) {
      for (const file of results.categorizedFiles.missing.slice(0, 10)) {
        console.log(`      - ${file}`);
      }
      if (results.categorizedFiles.missing.length > 10) {
        console.log(`      ... and ${results.categorizedFiles.missing.length - 10} more`);
      }
    }
  }
  
  // Broken references
  console.log('');
  console.log('2. Broken References');
  if (results.brokenReferences.length === 0) {
    console.log('   ✓ No broken references found');
  } else {
    console.log(`   ✗ Found: ${results.brokenReferences.length}`);
    if (isVerbose) {
      for (const broken of results.brokenReferences.slice(0, 10)) {
        console.log(`      - ${broken.file}:${broken.line || '?'} - ${broken.reason}`);
        console.log(`        Path: ${broken.path}`);
      }
      if (results.brokenReferences.length > 10) {
        console.log(`      ... and ${results.brokenReferences.length - 10} more`);
      }
    }
  }
  
  // Orphaned files
  console.log('');
  console.log('3. Orphaned Files');
  if (results.orphanedFiles.length === 0) {
    console.log('   ✓ No orphaned files found');
  } else {
    console.log(`   ⚠ Found: ${results.orphanedFiles.length}`);
    results.summary.warnings++;
    if (isVerbose) {
      for (const file of results.orphanedFiles.slice(0, 10)) {
        console.log(`      - ${file.path} (${file.reason})`);
      }
      if (results.orphanedFiles.length > 10) {
        console.log(`      ... and ${results.orphanedFiles.length - 10} more`);
      }
    }
  }
  
  // Uncategorized paths
  console.log('');
  console.log('4. Uncategorized Paths');
  if (results.uncategorizedPaths.length === 0) {
    console.log('   ✓ All paths are categorized');
  } else {
    console.log(`   ⚠ Found: ${results.uncategorizedPaths.length}`);
    results.summary.warnings++;
    if (isVerbose) {
      const uniquePaths = [...new Set(results.uncategorizedPaths.map(p => p.path))];
      for (const p of uniquePaths.slice(0, 10)) {
        console.log(`      - ${p}`);
      }
      if (uniquePaths.length > 10) {
        console.log(`      ... and ${uniquePaths.length - 10} more unique paths`);
      }
    }
  }
  
  // Final summary
  console.log('');
  console.log('='.repeat(60));
  console.log('Final Summary');
  console.log('='.repeat(60));
  
  const hasErrors = results.categorizedFiles.missing.length > 0 || 
                    results.brokenReferences.length > 0;
  
  if (hasErrors) {
    console.log('Status: ❌ FAILED');
    results.summary.failed = results.categorizedFiles.missing.length + 
                             results.brokenReferences.length;
  } else if (results.summary.warnings > 0) {
    console.log('Status: ⚠️  PASSED WITH WARNINGS');
    results.summary.passed = 1;
  } else {
    console.log('Status: ✅ PASSED');
    results.summary.passed = 1;
  }
  
  console.log('');
  console.log(`Total checked: ${results.summary.totalChecked}`);
  console.log(`Passed: ${results.summary.passed}`);
  console.log(`Failed: ${results.summary.failed}`);
  console.log(`Warnings: ${results.summary.warnings}`);
}

/**
 * Generate validation report file
 */
function generateReport() {
  const reportPath = path.join(process.cwd(), 'migration-validation-report.json');
  
  const report = {
    generatedAt: new Date().toISOString(),
    manifest: manifestPath,
    results,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('');
  console.log(`Detailed report saved to: ${reportPath}`);
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Phase 2: Migration Validation');
  console.log('='.repeat(60));
  console.log(`Manifest: ${manifestPath}`);
  console.log('');
  
  const manifest = loadManifest();
  
  // 1. Check categorized files from manifest
  console.log('1. Checking categorized files...');
  const categorizedPaths = new Set();
  
  for (const ref of manifest.references || []) {
    if (ref.suggestedNewPath && ref.suggestedNewPath.startsWith('/optimized/')) {
      categorizedPaths.add(ref.suggestedNewPath);
    }
  }
  
  results.summary.totalChecked += categorizedPaths.size;
  
  for (const filePath of categorizedPaths) {
    checkCategorizedFile(filePath);
  }
  
  console.log(`   Checked ${categorizedPaths.size} categorized paths`);
  
  // 2. Check for broken references
  console.log('');
  console.log('2. Checking for broken references...');
  results.brokenReferences = checkBrokenReferences(manifest);
  console.log(`   Found ${results.brokenReferences.length} broken references`);
  
  // 3. Find orphaned files
  console.log('');
  console.log('3. Checking for orphaned files...');
  results.orphanedFiles = findOrphanedFiles();
  console.log(`   Found ${results.orphanedFiles.length} orphaned files`);
  
  // 4. Find uncategorized paths
  console.log('');
  console.log('4. Checking for uncategorized paths...');
  results.uncategorizedPaths = findUncategorizedPaths();
  const uniqueUncategorized = [...new Set(results.uncategorizedPaths.map(p => p.path))];
  console.log(`   Found ${uniqueUncategorized.length} unique uncategorized paths`);
  
  // Print and save results
  printResults();
  generateReport();
  
  // Exit with appropriate code
  const exitCode = results.summary.failed > 0 ? 1 : 0;
  process.exit(exitCode);
}

main();
