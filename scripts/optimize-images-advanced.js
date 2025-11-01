#!/usr/bin/env node

/**
 * Advanced Image Optimization Script for Purrify
 * Generates WebP, AVIF variants and optimizes existing images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

class AdvancedImageOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.publicDir = path.join(this.projectRoot, 'public');
    this.optimizedDir = path.join(this.publicDir, 'optimized');
    this.stats = {
      processed: 0,
      saved: 0,
      errors: 0
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: '🖼️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type];

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      this.log(`Created directory: ${dir}`);
    }
  }

  async optimizeImage(inputPath, outputDir, options = {}) {
    const {
      quality = 80,
      generateWebP = true,
      generateAVIF = true,
      generateThumbnail = false,
      thumbnailSize = 300
    } = options;

    try {
      const filename = path.basename(inputPath, path.extname(inputPath));
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;

      // Ensure output directory exists
      await this.ensureDirectoryExists(outputDir);

      // Load and process image
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      this.log(`Processing: ${filename} (${metadata.width}x${metadata.height})`);

      // Original optimized version
      const optimizedPath = path.join(outputDir, `${filename}.jpg`);
      await image
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toFile(optimizedPath);

      // WebP version
      if (generateWebP) {
        const webpPath = path.join(outputDir, `${filename}.webp`);
        await image
          .webp({ quality, effort: 6 })
          .toFile(webpPath);
      }

      // AVIF version (best compression)
      if (generateAVIF) {
        try {
          const avifPath = path.join(outputDir, `${filename}.avif`);
          await image
            .avif({ quality, effort: 9 })
            .toFile(avifPath);
        } catch (e) {
          this.log(`AVIF generation failed for ${filename}: ${e.message}`, 'warning');
        }
      }

      // Thumbnail version
      if (generateThumbnail) {
        const thumbPath = path.join(outputDir, `${filename}_thumb.webp`);
        await image
          .resize(thumbnailSize, thumbnailSize, { fit: 'cover' })
          .webp({ quality: 70 })
          .toFile(thumbPath);
      }

      // Calculate savings
      const newStats = fs.statSync(optimizedPath);
      const savedBytes = originalSize - newStats.size;
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

      this.stats.processed++;
      this.stats.saved += savedBytes;

      this.log(`Optimized ${filename}: ${this.formatBytes(savedBytes)} saved (${savedPercent}%)`, 'success');

    } catch (error) {
      this.log(`Error processing ${inputPath}: ${error.message}`, 'error');
      this.stats.errors++;
    }
  }

  async optimizeProductImages() {
    this.log('Optimizing product images...');

    const productImages = [
      'public/images/20g.jpg',
      'public/images/60g.jpg',
      'public/images/140g.jpg',
      'public/images/purrify-logo.png'
    ];

    for (const imagePath of productImages) {
      const fullPath = path.join(this.projectRoot, imagePath);
      if (fs.existsSync(fullPath)) {
        await this.optimizeImage(fullPath, this.optimizedDir, {
          quality: 85,
          generateWebP: true,
          generateAVIF: true,
          generateThumbnail: true
        });
      }
    }
  }

  async optimizeBlogImages() {
    this.log('Optimizing blog images...');

    // Find all images in public/images/blog/
    const blogImagesDir = path.join(this.publicDir, 'images', 'blog');
    if (!fs.existsSync(blogImagesDir)) {
      this.log('Blog images directory not found, skipping...', 'warning');
      return;
    }

    const blogImages = glob.sync('**/*.{jpg,jpeg,png}', { cwd: blogImagesDir });

    for (const imagePath of blogImages) {
      const fullPath = path.join(blogImagesDir, imagePath);
      const outputDir = path.join(this.optimizedDir, 'blog', path.dirname(imagePath));

      await this.optimizeImage(fullPath, outputDir, {
        quality: 80,
        generateWebP: true,
        generateAVIF: false, // Skip AVIF for blog images to save time
        generateThumbnail: true,
        thumbnailSize: 400
      });
    }
  }

  async generateResponsiveVariants() {
    this.log('Generating responsive image variants...');

    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    const heroImages = glob.sync('**/hero*.{jpg,jpeg,png}', { cwd: this.publicDir });

    for (const imagePath of heroImages) {
      const fullPath = path.join(this.publicDir, imagePath);
      const filename = path.basename(imagePath, path.extname(imagePath));
      const outputDir = path.join(this.optimizedDir, 'responsive');

      await this.ensureDirectoryExists(outputDir);

      const image = sharp(fullPath);
      const metadata = await image.metadata();

      for (const width of breakpoints) {
        if (width <= metadata.width) {
          // WebP variant
          const webpPath = path.join(outputDir, `${filename}_${width}w.webp`);
          await image
            .resize(width)
            .webp({ quality: 80 })
            .toFile(webpPath);

          // JPEG fallback
          const jpegPath = path.join(outputDir, `${filename}_${width}w.jpg`);
          await image
            .resize(width)
            .jpeg({ quality: 80, progressive: true })
            .toFile(jpegPath);
        }
      }

      this.log(`Generated responsive variants for ${filename}`, 'success');
    }
  }

  async createImageManifest() {
    this.log('Creating image manifest...');

    const manifest = {
      generated: new Date().toISOString(),
      images: {},
      stats: this.stats
    };

    // Scan optimized directory and create manifest
    const optimizedImages = glob.sync('**/*.{jpg,jpeg,png,webp,avif}', {
      cwd: this.optimizedDir
    });

    for (const imagePath of optimizedImages) {
      const fullPath = path.join(this.optimizedDir, imagePath);
      const stats = fs.statSync(fullPath);
      const ext = path.extname(imagePath);
      const basename = path.basename(imagePath, ext);

      if (!manifest.images[basename]) {
        manifest.images[basename] = {
          variants: {},
          sizes: []
        };
      }

      manifest.images[basename].variants[ext.slice(1)] = {
        path: `/optimized/${imagePath}`,
        size: stats.size,
        modified: stats.mtime
      };

      // Extract size information from filename if present
      const sizeMatch = imagePath.match(/_(\d+)w\./);
      if (sizeMatch) {
        manifest.images[basename].sizes.push(parseInt(sizeMatch[1]));
      }
    }

    // Write manifest
    const manifestPath = path.join(this.optimizedDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    this.log(`Image manifest created: ${manifestPath}`, 'success');
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async run() {
    this.log('🚀 Starting advanced image optimization...');
    const startTime = Date.now();

    try {
      // Ensure optimized directory exists
      await this.ensureDirectoryExists(this.optimizedDir);

      // Run optimization tasks
      await this.optimizeProductImages();
      await this.optimizeBlogImages();
      await this.generateResponsiveVariants();
      await this.createImageManifest();

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      this.log('📊 Optimization Summary:', 'success');
      this.log(`   Images processed: ${this.stats.processed}`);
      this.log(`   Total space saved: ${this.formatBytes(this.stats.saved)}`);
      this.log(`   Errors: ${this.stats.errors}`);
      this.log(`   Duration: ${duration}s`);

      if (this.stats.errors === 0) {
        this.log('🎉 Image optimization completed successfully!', 'success');
      } else {
        this.log(`⚠️ Completed with ${this.stats.errors} errors`, 'warning');
      }

    } catch (error) {
      this.log(`Fatal error: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new AdvancedImageOptimizer();
  optimizer.run();
}

module.exports = AdvancedImageOptimizer;