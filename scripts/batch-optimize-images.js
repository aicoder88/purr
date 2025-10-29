#!/usr/bin/env node

/**
 * Comprehensive Batch Image Optimization
 * Optimizes ALL large images in public directory
 * Converts PNG to WebP/AVIF for maximum compression
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

class BatchImageOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.publicDir = path.join(this.projectRoot, 'public');
    this.optimizedDir = path.join(this.publicDir, 'optimized');
    this.stats = {
      processed: 0,
      skipped: 0,
      saved: 0,
      errors: 0,
      totalOriginalSize: 0,
      totalOptimizedSize: 0
    };

    // Minimum file size to optimize (100KB)
    this.minSizeBytes = 100 * 1024;
  }

  log(message, type = 'info') {
    const prefix = {
      info: '🖼️ ',
      success: '✅',
      warning: '⚠️ ',
      error: '❌'
    }[type];

    console.log(`${prefix} ${message}`);
  }

  async ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async optimizeImage(inputPath) {
    try {
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;

      // Skip small images
      if (originalSize < this.minSizeBytes) {
        this.log(`Skipping ${path.basename(inputPath)} (${this.formatBytes(originalSize)} - too small)`, 'warning');
        this.stats.skipped++;
        return;
      }

      const ext = path.extname(inputPath);
      const filename = path.basename(inputPath, ext);
      const relPath = path.relative(this.publicDir, path.dirname(inputPath));
      const outputDir = path.join(this.optimizedDir, relPath);

      await this.ensureDirectoryExists(outputDir);

      // Load image
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      this.log(`Processing: ${filename}${ext} (${metadata.width}x${metadata.height}, ${this.formatBytes(originalSize)})`);

      let totalNewSize = 0;

      // 1. Optimized WebP (best for most browsers)
      const webpPath = path.join(outputDir, `${filename}.webp`);
      await image
        .webp({ quality: 82, effort: 6 })
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size;
      totalNewSize += webpSize;

      // 2. AVIF (best compression, newer browsers)
      try {
        const avifPath = path.join(outputDir, `${filename}.avif`);
        await image
          .avif({ quality: 75, effort: 7 })
          .toFile(avifPath);
        const avifSize = fs.statSync(avifPath).size;
        totalNewSize += avifSize;
      } catch (e) {
        this.log(`AVIF generation failed for ${filename}: ${e.message}`, 'warning');
      }

      // 3. Optimized JPEG fallback
      const jpgPath = path.join(outputDir, `${filename}.jpg`);
      await image
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(jpgPath);
      const jpgSize = fs.statSync(jpgPath).size;
      totalNewSize += jpgSize;

      // Calculate savings
      const savedBytes = originalSize - (totalNewSize / 3); // Average of all formats
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

      this.stats.processed++;
      this.stats.saved += savedBytes;
      this.stats.totalOriginalSize += originalSize;
      this.stats.totalOptimizedSize += (totalNewSize / 3);

      this.log(`✓ Optimized ${filename}: ${this.formatBytes(savedBytes)} saved (${savedPercent}%)`, 'success');

    } catch (error) {
      this.log(`Error processing ${inputPath}: ${error.message}`, 'error');
      this.stats.errors++;
    }
  }

  async findLargeImages() {
    this.log('Scanning for large images...');

    // Find all images in public directory (excluding already optimized)
    const patterns = [
      path.join(this.publicDir, '*.{jpg,jpeg,png}'),
      path.join(this.publicDir, 'images', '**', '*.{jpg,jpeg,png}')
    ];

    const imagePaths = [];

    for (const pattern of patterns) {
      const files = glob.sync(pattern, {
        ignore: [
          '**/optimized/**',
          '**/original-images/**',
          '**/node_modules/**'
        ]
      });
      imagePaths.push(...files);
    }

    // Filter by size
    const largeImages = imagePaths.filter(filePath => {
      try {
        const stats = fs.statSync(filePath);
        return stats.size >= this.minSizeBytes;
      } catch {
        return false;
      }
    });

    // Sort by size (largest first)
    largeImages.sort((a, b) => {
      const sizeA = fs.statSync(a).size;
      const sizeB = fs.statSync(b).size;
      return sizeB - sizeA;
    });

    this.log(`Found ${largeImages.length} large images to optimize`);
    return largeImages;
  }

  async run() {
    this.log('🚀 Starting batch image optimization...');
    const startTime = Date.now();

    try {
      // Find all large images
      const images = await this.findLargeImages();

      if (images.length === 0) {
        this.log('No large images found to optimize', 'warning');
        return;
      }

      // Ensure optimized directory exists
      await this.ensureDirectoryExists(this.optimizedDir);

      // Process each image
      for (const imagePath of images) {
        await this.optimizeImage(imagePath);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      // Summary
      console.log('\n' + '='.repeat(60));
      this.log('📊 Batch Optimization Summary:', 'success');
      console.log('='.repeat(60));
      this.log(`   Images processed: ${this.stats.processed}`);
      this.log(`   Images skipped: ${this.stats.skipped}`);
      this.log(`   Original total size: ${this.formatBytes(this.stats.totalOriginalSize)}`);
      this.log(`   Optimized average size: ${this.formatBytes(this.stats.totalOptimizedSize)}`);
      this.log(`   Total space saved: ${this.formatBytes(this.stats.saved)}`);
      this.log(`   Compression ratio: ${((1 - this.stats.totalOptimizedSize / this.stats.totalOriginalSize) * 100).toFixed(1)}%`);
      this.log(`   Errors: ${this.stats.errors}`);
      this.log(`   Duration: ${duration}s`);
      console.log('='.repeat(60) + '\n');

      if (this.stats.errors === 0) {
        this.log('🎉 Batch optimization completed successfully!', 'success');
      } else {
        this.log(`⚠️  Completed with ${this.stats.errors} errors`, 'warning');
      }

    } catch (error) {
      this.log(`Fatal error: ${error.message}`, 'error');
      console.error(error);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new BatchImageOptimizer();
  optimizer.run().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = BatchImageOptimizer;
