#!/usr/bin/env node

/**
 * Cleanup Duplicate Images Script
 *
 * Safely removes duplicate images from /public/ root that exist in /public/original-images/
 * Only deletes files that are no longer referenced after the image path migration.
 *
 * Usage:
 *   node scripts/cleanup-duplicate-images.js           # Dry run
 *   node scripts/cleanup-duplicate-images.js --apply   # Actually delete files
 */

const fs = require('node:fs');
const path = require('node:path');

const DRY_RUN = !process.argv.includes('--apply');
const PUBLIC_DIR = path.join(__dirname, '../public');
const ORIGINAL_IMAGES_DIR = path.join(PUBLIC_DIR, 'original-images');

// Statistics
const stats = {
  scanned: 0,
  duplicates: 0,
  deleted: 0,
  spaceFreed: 0,
  errors: [],
  files: [],
};

/**
 * Check if a file exists in both root and original-images
 */
function isDuplicate(filename) {
  const rootPath = path.join(PUBLIC_DIR, filename);
  const originalPath = path.join(ORIGINAL_IMAGES_DIR, filename);

  return fs.existsSync(rootPath) && fs.existsSync(originalPath);
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get list of image files in /public/ root
 */
function getRootImageFiles() {
  const files = fs.readdirSync(PUBLIC_DIR);

  return files.filter(file => {
    // Only image files
    if (!/\.(png|jpg|jpeg|webp|avif)$/i.test(file)) {
      return false;
    }

    // Skip special files that should stay
    const keepFiles = [
      'favicon.ico',
      'apple-touch-icon.png',
      'purrify-logo.svg',
      'icon-32.png',
      'icon-64.png',
      'icon-128.png',
      // Store logos (already optimized formats)
      'pattes.webp',
      'lamifidel.avif',
      'kk.avif',
      'kk logo~mv2.avif',
      'Viva.avif',
      'viva.avif',
      // Other small optimized files
      'natural_cat_litter.webp',
      'clamping-cat-litter.webp',
      'clay-cat-litter.webp',
      'crystal-cat-litter.webp',
      'natural-cat-litter.webp',
    ];

    if (keepFiles.includes(file)) {
      return false;
    }

    // Only duplicates
    return isDuplicate(file);
  });
}

/**
 * Delete a file
 */
function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    stats.errors.push(`Failed to delete ${filePath}: ${error.message}`);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('\n🗑️  DUPLICATE IMAGE CLEANUP SCRIPT\n');

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be deleted');
  } else {
    console.log('⚠️  DELETION MODE - Files will be permanently removed');
  }

  console.log('\nScanning for duplicate images...\n');

  // Get duplicate files
  const duplicateFiles = getRootImageFiles();
  stats.scanned = duplicateFiles.length;

  if (duplicateFiles.length === 0) {
    console.log('✅ No duplicate images found!\n');
    return;
  }

  console.log(`Found ${duplicateFiles.length} duplicate images:\n`);

  // Process each duplicate
  duplicateFiles.forEach(filename => {
    const rootPath = path.join(PUBLIC_DIR, filename);
    const fileSize = getFileSize(rootPath);

    stats.files.push({
      name: filename,
      size: fileSize,
      path: rootPath,
    });

    stats.duplicates++;
    stats.spaceFreed += fileSize;

    // Show file info
    const sizeStr = formatBytes(fileSize).padStart(10);
    console.log(`  ${sizeStr}  ${filename}`);

    // Delete if not dry run
    if (!DRY_RUN) {
      if (deleteFile(rootPath)) {
        stats.deleted++;
      }
    }
  });

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 CLEANUP SUMMARY');
  console.log('='.repeat(60) + '\n');

  console.log(`Files scanned:     ${stats.scanned}`);
  console.log(`Duplicates found:  ${stats.duplicates}`);

  if (!DRY_RUN) {
    console.log(`Files deleted:     ${stats.deleted}`);
  }

  console.log(`Space freed:       ${formatBytes(stats.spaceFreed)}\n`);

  if (stats.errors.length > 0) {
    console.log('❌ ERRORS:\n');
    stats.errors.forEach(error => console.log(`  - ${error}`));
    console.log();
  }

  if (DRY_RUN) {
    console.log('🔍 DRY RUN - No files were deleted');
    console.log('   Run with --apply to delete these files\n');
  } else {
    console.log('✅ Cleanup complete!\n');
    console.log('💡 Files remain in /public/original-images/ as backups');
    console.log('💡 Optimized versions in /public/optimized/ are still available\n');
  }

  // Additional safety info
  if (!DRY_RUN && stats.deleted > 0) {
    console.log('🔄 To undo this cleanup:');
    console.log('   cp public/original-images/*.{png,jpg,jpeg} public/ 2>/dev/null\n');
  }
}

// Run the script
main();
