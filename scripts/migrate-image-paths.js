#!/usr/bin/env node

/**
 * Image Path Migration Script
 *
 * Migrates hardcoded image paths to use optimized versions (AVIF/WebP).
 *
 * Usage:
 *   node scripts/migrate-image-paths.js           # Dry run (shows changes)
 *   node scripts/migrate-image-paths.js --apply   # Apply changes
 *   node scripts/migrate-image-paths.js --verify  # Verify optimized files exist
 *
 * Safety:
 *   - Creates backup before changes
 *   - Validates all optimized files exist
 *   - Reports all changes made
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const DRY_RUN = !process.argv.includes('--apply');
const VERIFY_ONLY = process.argv.includes('--verify');
const BACKUP_DIR = path.join(__dirname, '../.image-migration-backup');

// Image mappings: original path -> optimized path
const IMAGE_MIGRATIONS = {
  // Large product images
  '/60g yellow.png': '/optimized/60g-yellow.avif',

  // Logo images
  '/purrify-dark-mode-logo.png': '/optimized/purrify-dark-mode-logo.avif',
  '/purrify-logo.png': '/optimized/purrify-logo.avif',

  // Content images
  '/catonbed.jpeg': '/optimized/catonbed.avif',
  '/nathamo.jpg': '/optimized/nathamo.avif',

  // Keep these as-is (already optimized or small)
  // '/pattes.webp': '/pattes.webp',
  // '/lamifidel.avif': '/lamifidel.avif',
  // '/kk.avif': '/kk.avif',
  // '/Viva.avif': '/Viva.avif',
};

// Files and directories to process
const SEARCH_PATTERNS = [
  'src/**/*.{ts,tsx,js,jsx}',
  'pages/**/*.{ts,tsx,js,jsx}',
];

const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
];

// Statistics
const stats = {
  filesScanned: 0,
  filesModified: 0,
  replacements: 0,
  errors: [],
  changes: [],
};

/**
 * Verify all optimized images exist
 */
function verifyOptimizedImages() {
  console.log('🔍 Verifying optimized images exist...\n');

  let allExist = true;

  for (const [original, optimized] of Object.entries(IMAGE_MIGRATIONS)) {
    const optimizedPath = path.join(__dirname, '../public', optimized);
    const exists = fs.existsSync(optimizedPath);

    const status = exists ? '✅' : '❌';
    console.log(`${status} ${optimized}`);

    if (!exists) {
      allExist = false;
      stats.errors.push(`Missing optimized image: ${optimized}`);
    }
  }

  console.log();
  return allExist;
}

/**
 * Create backup of files before modification
 */
function createBackup(filePath) {
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  fs.copyFileSync(filePath, backupPath);
}

/**
 * Process a single file
 */
function processFile(filePath) {
  stats.filesScanned++;

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileChanges = [];

  // Track original content for comparison
  const originalContent = content;

  // Apply all image migrations
  for (const [original, optimized] of Object.entries(IMAGE_MIGRATIONS)) {
    // Escape special characters for regex
    const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match different quote styles and contexts
    const patterns = [
      // Single quotes
      new RegExp(`'${escapedOriginal}'`, 'g'),
      // Double quotes
      new RegExp(`"${escapedOriginal}"`, 'g'),
      // Template literals
      new RegExp(`\`${escapedOriginal}\``, 'g'),
    ];

    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        const matches = content.match(pattern);
        if (matches) {
          // Replace with same quote style
          const replacement = matches[0].charAt(0) + optimized + matches[0].charAt(0);
          content = content.replace(pattern, replacement);

          fileChanges.push({
            from: original,
            to: optimized,
            count: matches.length,
          });

          modified = true;
          stats.replacements += matches.length;
        }
      }
    });
  }

  // If file was modified, save changes
  if (modified) {
    stats.filesModified++;
    stats.changes.push({
      file: filePath,
      changes: fileChanges,
    });

    if (!DRY_RUN) {
      // Create backup first
      createBackup(filePath);

      // Write updated content
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }

  return modified;
}

/**
 * Get all files to process
 */
function getFilesToProcess() {
  const allFiles = [];

  for (const pattern of SEARCH_PATTERNS) {
    const files = glob.sync(pattern, {
      cwd: path.join(__dirname, '..'),
      ignore: EXCLUDE_PATTERNS,
      absolute: true,
    });
    allFiles.push(...files);
  }

  return [...new Set(allFiles)]; // Remove duplicates
}

/**
 * Print results
 */
function printResults() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION RESULTS');
  console.log('='.repeat(60) + '\n');

  console.log(`Files scanned:   ${stats.filesScanned}`);
  console.log(`Files modified:  ${stats.filesModified}`);
  console.log(`Total replacements: ${stats.replacements}\n`);

  if (stats.changes.length > 0) {
    console.log('📝 Changes by file:\n');

    stats.changes.forEach(({ file, changes }) => {
      const relativePath = path.relative(path.join(__dirname, '..'), file);
      console.log(`  📄 ${relativePath}`);

      changes.forEach(({ from, to, count }) => {
        console.log(`     ${from} → ${to} (${count}x)`);
      });
      console.log();
    });
  }

  if (stats.errors.length > 0) {
    console.log('❌ ERRORS:\n');
    stats.errors.forEach(error => console.log(`  - ${error}`));
    console.log();
  }

  if (DRY_RUN) {
    console.log('🔍 DRY RUN - No files were modified');
    console.log('   Run with --apply to apply changes\n');
  } else {
    console.log('✅ Changes applied successfully');
    console.log(`   Backup created at: ${BACKUP_DIR}\n`);
  }
}

/**
 * Print summary of migrations
 */
function printMigrationSummary() {
  console.log('📋 IMAGE MIGRATIONS TO BE APPLIED:\n');

  for (const [original, optimized] of Object.entries(IMAGE_MIGRATIONS)) {
    console.log(`  ${original}`);
    console.log(`  → ${optimized}\n`);
  }
}

/**
 * Restore from backup
 */
function restoreBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('❌ No backup found');
    return;
  }

  console.log('🔄 Restoring from backup...\n');

  const backupFiles = glob.sync('**/*', {
    cwd: BACKUP_DIR,
    nodir: true,
    absolute: true,
  });

  backupFiles.forEach(backupFile => {
    const relativePath = path.relative(BACKUP_DIR, backupFile);
    const originalFile = path.join(__dirname, '..', relativePath);

    fs.copyFileSync(backupFile, originalFile);
    console.log(`  Restored: ${relativePath}`);
  });

  console.log('\n✅ Restore complete');
}

/**
 * Main execution
 */
function main() {
  console.log('\n🎨 IMAGE PATH MIGRATION SCRIPT\n');

  // Handle restore command
  if (process.argv.includes('--restore')) {
    restoreBackup();
    return;
  }

  // Verify optimized images exist
  printMigrationSummary();

  const imagesExist = verifyOptimizedImages();

  if (!imagesExist) {
    console.log('❌ Some optimized images are missing!');
    console.log('   Run: npm run optimize-all-images');
    console.log('   Then try again.\n');
    process.exit(1);
  }

  if (VERIFY_ONLY) {
    console.log('✅ All optimized images exist\n');
    return;
  }

  console.log('✅ All optimized images verified\n');

  // Get files to process
  const files = getFilesToProcess();
  console.log(`📁 Found ${files.length} files to scan\n`);

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - Preview changes\n');
  } else {
    console.log('⚡ APPLYING CHANGES...\n');
  }

  // Process all files
  files.forEach(file => {
    processFile(file);
  });

  // Print results
  printResults();

  // Exit with error if there were problems
  if (stats.errors.length > 0) {
    process.exit(1);
  }
}

// Run the script
main();
