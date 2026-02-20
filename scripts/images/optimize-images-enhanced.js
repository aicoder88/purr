// Skip sharp operations on Vercel/CI to avoid Node.js compatibility issues
if (process.env.VERCEL || process.env.CI) {
  console.log('Skipping image optimization on CI/Vercel environment');
  process.exit(0);
}

const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const ConfigurationManager = require('../lib/ConfigurationManager');
const MetadataGenerator = require('../lib/MetadataGenerator');
const ErrorHandler = require('../lib/ErrorHandler');

// Initialize configuration
const configManager = new ConfigurationManager();
const config = configManager.loadConfig();

// Directories
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const ORIGINAL_IMAGES_DIR = path.join(PUBLIC_DIR, 'original-images');
const IMAGE_SOURCE_DIR = ORIGINAL_IMAGES_DIR;
// Categories for image organization - images are stored in original-images/<category>/ subdirectories
const SOURCE_CATEGORIES = ['logos', 'products', 'stores', 'team', 'icons', 'locations', 'blog', 'marketing'];

// Initialize metadata generator
const metadataGenerator = new MetadataGenerator(
  path.join(PUBLIC_DIR, 'image-dimensions.json')
);

// Initialize error handler
const errorHandler = new ErrorHandler(config.errorThreshold);

// Reduce memory footprint
try {
  sharp.cache(false);
  sharp.concurrency(config.concurrency || 2);
} catch (_) { }

// Statistics tracking
const stats = {
  totalImages: 0,
  successful: 0,
  failed: 0,
  skipped: 0,
  errors: [],
  totalSizeReduction: 0,
  totalProcessingTime: 0,
  formatBreakdown: {
    avif: 0,
    webp: 0,
    jpg: 0
  }
};

/**
 * Create directories if they don't exist
 */
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

/**
 * Check if outputs are up to date relative to source
 */
function needsUpdate(src, outputs) {
  try {
    const srcStat = fs.statSync(src);
    for (const out of outputs) {
      if (!fs.existsSync(out)) return true;
      const outStat = fs.statSync(out);
      if (outStat.mtimeMs < srcStat.mtimeMs) return true;
    }
    return false;
  } catch {
    return true;
  }
}

/**
 * Get image dimensions and metadata
 */
async function getImageMetadata(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size
    };
  } catch (error) {
    console.error(`Error getting metadata for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Generate responsive image at specific width
 */
async function generateResponsiveImage(filePath, format, width, quality, compressionLevel, outputDir, outputPrefix) {
  const filename = path.basename(filePath, path.extname(filePath));
  const sanitizedFilename = filename.replaceAll(/\s+/g, '-');
  const outputFilename = `${outputPrefix}${sanitizedFilename}-${width}w.${format}`;
  const outputPath = path.join(outputDir, `${sanitizedFilename}-${width}w.${format}`);

  try {
    let pipeline = sharp(filePath).resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });

    // Apply format-specific options
    if (format === 'avif') {
      pipeline = pipeline.avif({
        quality,
        effort: compressionLevel || 6
      });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({
        quality,
        effort: compressionLevel || 6
      });
    } else if (format === 'jpg' || format === 'jpeg') {
      pipeline = pipeline.jpeg({
        quality,
        mozjpeg: true
      });
    }

    await pipeline.toFile(outputPath);

    const outputStat = fs.statSync(outputPath);
    return {
      path: path.posix.join('optimized', outputFilename),
      size: outputStat.size,
      width
    };
  } catch (error) {
    console.error(`Error generating ${format} at ${width}px for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Generate blur placeholder for image
 */
async function generateBlurPlaceholder(filePath) {
  try {
    const buffer = await sharp(filePath)
      .resize(20, 20, { fit: 'inside' })
      .blur(2)
      .jpeg({ quality: 50 })
      .toBuffer();

    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error generating blur placeholder for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Optimize a single image with profile-based settings
 */
async function optimizeImage(filePath) {
  const startTime = Date.now();

  try {
    const filename = path.basename(filePath);
    const relativeSourcePath = path.relative(IMAGE_SOURCE_DIR, filePath);
    const relativeDir = path.dirname(relativeSourcePath);
    const normalizedRelativeDir = relativeDir === '.' ? '' : relativeDir.replaceAll(path.sep, '/');
    const outputDir = path.join(OPTIMIZED_DIR, relativeDir);
    const outputPrefix = normalizedRelativeDir ? `${normalizedRelativeDir}/` : '';
    ensureDirectoryExists(outputDir);

    // Skip already optimized images
    if (filePath.includes('/optimized/')) {
      stats.skipped++;
      return null;
    }

    // Skip problematic files
    if (filename === 'purrify-logo.png') {
      console.log(`Skipping problematic file: ${filePath}`);
      stats.skipped++;
      return null;
    }

    // Get profile for this image
    const profile = configManager.getProfile(filePath);
    console.log(`Processing ${filename} with profile: ${profile.name}`);

    // Get image metadata
    const metadata = await getImageMetadata(filePath);
    if (!metadata) {
      stats.failed++;
      errorHandler.logError(filePath, new Error('Failed to read image metadata'));
      return null;
    }

    const originalSize = metadata.size;
    let { width, height } = metadata;

    // Calculate new dimensions if image is too large
    if (width > profile.maxWidth) {
      const ratio = profile.maxWidth / width;
      width = profile.maxWidth;
      height = Math.round(height * ratio);
    }

    const result = {
      original: filename,
      width,
      height,
      aspectRatio: width / height,
      formats: {},
      processingTime: 0
    };

    // Generate all responsive sizes for each format
    for (const format of profile.formats) {
      result.formats[format] = [];

      for (const size of profile.responsiveSizes) {
        // Don't generate sizes larger than the image
        if (size > width) continue;

        const output = await generateResponsiveImage(
          filePath,
          format,
          size,
          profile.quality,
          profile.compressionLevel,
          outputDir,
          outputPrefix
        );

        if (output) {
          result.formats[format].push(output.path);
          stats.formatBreakdown[format]++;
          stats.totalSizeReduction += (originalSize - output.size);
        }
      }
    }

    // Generate blur placeholder for images larger than 100KB
    if (originalSize > 100 * 1024) {
      result.blurDataURL = await generateBlurPlaceholder(filePath);
    }

    const processingTime = Date.now() - startTime;
    result.processingTime = processingTime;
    stats.totalProcessingTime += processingTime;
    stats.successful++;

    console.log(`✓ Optimized ${filename} in ${processingTime}ms`);

    return result;
  } catch (error) {
    stats.failed++;
    errorHandler.logError(filePath, error);
    return null;
  }
}

/**
 * Process all icons (special case for favicons and logos)
 */
async function processIcons() {
  const outputDir = path.join(IMAGE_SOURCE_DIR, 'icons');
  ensureDirectoryExists(outputDir);

  const iconPath = path.join(PUBLIC_DIR, 'purrify-logo-icon.png');
  if (!fs.existsSync(iconPath)) {
    console.log('Icon file not found, skipping icon processing');
    return;
  }

  const writeIcon = async (size, name) => {
    const dest = path.join(outputDir, name);
    try {
      const srcStat = fs.statSync(iconPath);
      const needs = !fs.existsSync(dest) || fs.statSync(dest).mtimeMs < srcStat.mtimeMs;
      if (needs) {
        await sharp(iconPath).resize(size, size).toFile(dest);
        console.log(`Generated icon: ${name}`);
      }
    } catch (error) {
      console.error(`Error generating icon ${name}:`, error.message);
    }
  };

  await writeIcon(16, 'favicon.png');
  await writeIcon(32, 'icon-32.png');
  await writeIcon(64, 'icon-64.png');
  await writeIcon(128, 'icon-128.png');
  await writeIcon(180, 'apple-touch-icon.png');

  // Process text logo if exists
  const textPath = path.join(PUBLIC_DIR, 'purrify-logo-text.png');
  if (fs.existsSync(textPath)) {
    const writeTextLogo = async (w, h, name) => {
      const dest = path.join(outputDir, name);
      try {
        const srcStat = fs.statSync(textPath);
        const needs = !fs.existsSync(dest) || fs.statSync(dest).mtimeMs < srcStat.mtimeMs;
        if (needs) {
          await sharp(textPath).resize(w, h).toFile(dest);
          console.log(`Generated text logo: ${name}`);
        }
      } catch (error) {
        console.error(`Error generating text logo ${name}:`, error.message);
      }
    };

    await writeTextLogo(120, 40, 'logo-text-120.png');
    await writeTextLogo(180, 60, 'logo-text-180.png');
    await writeTextLogo(240, 80, 'logo-text-240.png');
  }
}

/**
 * Main function to optimize all images
 */
async function optimizeAllImages() {
  console.log('Starting image optimization...\n');

  try {
    // Ensure base directories exist
    ensureDirectoryExists(OPTIMIZED_DIR);
    ensureDirectoryExists(ORIGINAL_IMAGES_DIR);

    // Process icons first
    await processIcons();

    // Ensure category subdirectories exist in both source and optimized directories
    for (const category of SOURCE_CATEGORIES) {
      ensureDirectoryExists(path.join(IMAGE_SOURCE_DIR, category));
      ensureDirectoryExists(path.join(OPTIMIZED_DIR, category));
    }

    // Find all images in categorized subdirectories of original-images
    // Pattern: original-images/<category>/*.{ext}
    const imageFiles = glob.sync(`${IMAGE_SOURCE_DIR}/**/*.{png,jpg,jpeg,gif,webp,avif}`, {
      ignore: [
        `${OPTIMIZED_DIR}/**`,
        `${IMAGE_SOURCE_DIR}/**/.DS_Store`
      ]
    });

    stats.totalImages = imageFiles.length;
    console.log(`\nFound ${imageFiles.length} images to process\n`);

    // Load existing metadata for cleanup
    const existingMetadata = metadataGenerator.loadExistingMetadata();

    // Process each image and collect results
    const results = [];
    const processedPaths = [];

    for (const filePath of imageFiles) {
      const result = await optimizeImage(filePath);
      if (result) {
        // Use full relative path from PUBLIC_DIR as the key
        // e.g., "original-images/marketing/senior-cat-mobility.png"
        const relativePath = path.relative(PUBLIC_DIR, filePath);
        results.push({
          path: relativePath,
          ...result
        });
        processedPaths.push(relativePath);
      }
    }

    // Clean up metadata for removed images
    const cleanedMetadata = metadataGenerator.cleanupMetadata(existingMetadata, processedPaths);

    // Check error threshold
    if (errorHandler.shouldHaltBuild(stats.failed, stats.totalImages)) {
      const errorRate = stats.failed / stats.totalImages;
      console.error(`\n❌ Error threshold exceeded: ${(errorRate * 100).toFixed(1)}% > ${(config.errorThreshold * 100)}%`);
      errorHandler.printErrorSummary();
      console.error('Build halted due to too many failures');
      process.exit(1);
    }

    // Generate and validate metadata (merge with cleaned existing metadata)
    // Keys in metadata are full paths like "original-images/<category>/<filename>"
    const newMetadata = metadataGenerator.generateMetadata(results);
    const finalMetadata = { ...cleanedMetadata, ...newMetadata };
    await metadataGenerator.writeMetadataFile(finalMetadata);

    // Generate and write processing report
    const report = errorHandler.generateReport(stats);
    await errorHandler.writeReport(
      report,
      path.join(PUBLIC_DIR, 'image-optimization-report.json')
    );

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('Image Optimization Complete');
    console.log('='.repeat(60));
    console.log(`Total images: ${stats.totalImages}`);
    console.log(`✓ Successful: ${stats.successful}`);
    console.log(`✗ Failed: ${stats.failed}`);
    console.log(`⊘ Skipped: ${stats.skipped}`);
    console.log(`Size reduction: ${(stats.totalSizeReduction / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Average time: ${(stats.totalProcessingTime / stats.successful || 0).toFixed(0)}ms per image`);
    console.log('='.repeat(60) + '\n');

    // Print error summary if there were errors
    if (stats.failed > 0) {
      errorHandler.printErrorSummary();
    }

  } catch (error) {
    console.error('Error in image optimization process:', error);
    process.exit(1);
  }
}

/**
 * Generate responsive sizes string for Next.js Image component
 */
function generateSizesString(maxWidth) {
  if (maxWidth <= 640) {
    return '100vw';
  } else if (maxWidth <= 1200) {
    return '(max-width: 640px) 100vw, 50vw';
  } else {
    return '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
}

// Run the optimization
optimizeAllImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
