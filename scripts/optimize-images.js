// Skip sharp operations on Vercel/CI to avoid Node.js compatibility issues
if (process.env.VERCEL || process.env.CI) {
  console.log('Skipping image optimization on CI/Vercel environment');
  process.exit(0);
}

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const QUALITY = 80;
const MAX_WIDTH = 1920; // Maximum width for large images
const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const ORIGINAL_IMAGES_DIR = path.join(PUBLIC_DIR, 'original-images');

// Reduce memory footprint
try {
  sharp.cache(false);
  // Limit concurrency to reduce peak memory usage
  sharp.concurrency(2);
} catch (_) {}

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Check if outputs are up to date relative to source
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

// Get image dimensions
async function getImageDimensions(filePath) {
  try {
    console.log(`Processing image: ${filePath}`);
    
    // Skip purrify-logo.png as it's causing issues
    if (filePath.includes('purrify-logo.png') && !filePath.includes('purrify-logo-icon.png') && !filePath.includes('purrify-logo-text.png')) {
      console.log(`Skipping problematic file: ${filePath}`);
      return { width: 800, height: 600 }; // Default fallback
    }
    
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    console.error(`Error getting dimensions for ${filePath}:`, error);
    return { width: 800, height: 600 }; // Default fallback
  }
}

// Optimize a single image
async function optimizeImage(filePath) {
  try {
    const filename = path.basename(filePath);
    const ext = path.extname(filename).toLowerCase();
    const baseName = path.basename(filename, ext);
    
    // Skip already optimized images
    if (filePath.includes('/optimized/') || filePath.includes('/images/')) {
      return;
    }
    
    // Skip purrify-logo.png as it's causing issues
    if (filename === 'purrify-logo.png') {
      console.log(`Skipping problematic file: ${filePath}`);
      return null;
    }
    
    // Get image dimensions
    const dimensions = await getImageDimensions(filePath);
    let { width, height } = dimensions;
    
    // Calculate new dimensions if image is too large
    if (width > MAX_WIDTH) {
      const ratio = MAX_WIDTH / width;
      width = MAX_WIDTH;
      height = Math.round(height * ratio);
    }
    
    // Handle spaces in filenames by creating sanitized versions
    const sanitizedBaseName = baseName.replace(/\s+/g, '-');
    
    const webpOutputPath = path.join(OPTIMIZED_DIR, `${baseName}.webp`);
    const sanitizedWebpOutputPath = path.join(OPTIMIZED_DIR, `${sanitizedBaseName}.webp`);
    const avifOutputPath = path.join(OPTIMIZED_DIR, `${baseName}.avif`);
    const sanitizedAvifOutputPath = path.join(OPTIMIZED_DIR, `${sanitizedBaseName}.avif`);
    const optimizedOriginalPath = path.join(OPTIMIZED_DIR, filename);

    const outputs = [webpOutputPath, avifOutputPath, optimizedOriginalPath];
    if (!needsUpdate(filePath, outputs)) {
      // Up to date; no work needed
      return {
        original: filename,
        webp: `${baseName}.webp`,
        avif: `${baseName}.avif`,
        width,
        height,
      };
    }

    // Create WebP
    await sharp(filePath).resize(width, height).webp({ quality: QUALITY }).toFile(webpOutputPath);
    if (baseName !== sanitizedBaseName) {
      await sharp(filePath).resize(width, height).webp({ quality: QUALITY }).toFile(sanitizedWebpOutputPath);
      console.log(`Created sanitized WebP version: ${sanitizedBaseName}.webp`);
    }

    // Create AVIF
    await sharp(filePath).resize(width, height).avif({ quality: QUALITY }).toFile(avifOutputPath);
    if (baseName !== sanitizedBaseName) {
      await sharp(filePath).resize(width, height).avif({ quality: QUALITY }).toFile(sanitizedAvifOutputPath);
      console.log(`Created sanitized AVIF version: ${sanitizedBaseName}.avif`);
    }

    // Optimized original
    await sharp(filePath).resize(width, height).toFile(optimizedOriginalPath);
    
    console.log(`Optimized: ${filename} → WebP, AVIF, and optimized original`);
    
    // Return the dimensions for the image dimensions JSON file
    return {
      original: filename,
      webp: `${baseName}.webp`,
      avif: `${baseName}.avif`,
      width,
      height
    };
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
    return null;
  }
}

// Process all icons (special case for favicons and logos)
async function processIcons() {
  const outputDir = path.join(PUBLIC_DIR, 'images');
  ensureDirectoryExists(outputDir);

  // Optimize icon logo
  const iconPath = path.join(PUBLIC_DIR, 'purrify-logo-icon.png');

  // Skip icon processing if source file doesn't exist
  if (fs.existsSync(iconPath)) {
    // Create favicon (16x16)
    const writeIcon = async (size, name) => {
      const dest = path.join(outputDir, name);
      const srcStat = fs.statSync(iconPath);
      const needs = !fs.existsSync(dest) || fs.statSync(dest).mtimeMs < srcStat.mtimeMs;
      if (needs) {
        await sharp(iconPath).resize(size, size).toFile(dest);
      }
    };

    // Create small icon (32x32)
    await writeIcon(16, 'favicon.png');
    await writeIcon(32, 'icon-32.png');

    // Create medium icon (64x64)
    await writeIcon(64, 'icon-64.png');

    // Create large icon (128x128)
    await writeIcon(128, 'icon-128.png');

    // Create apple touch icon (180x180)
    await writeIcon(180, 'apple-touch-icon.png');
  } else {
    console.log('Skipping icon processing - source file not found:', iconPath);
  }

  // Optimize text logo
  const textPath = path.join(PUBLIC_DIR, 'purrify-logo-text.png');

  // Skip text logo processing if source file doesn't exist
  if (fs.existsSync(textPath)) {
    // Create small text logo (120x40)
    const writeTextLogo = async (w, h, name) => {
      const dest = path.join(outputDir, name);
      const srcStat = fs.statSync(textPath);
      const needs = !fs.existsSync(dest) || fs.statSync(dest).mtimeMs < srcStat.mtimeMs;
      if (needs) {
        await sharp(textPath).resize(w, h).toFile(dest);
      }
    };

    // Create medium text logo (180x60)
    await writeTextLogo(120, 40, 'logo-text-120.png');
    await writeTextLogo(180, 60, 'logo-text-180.png');

    // Create large text logo (240x80)
    await writeTextLogo(240, 80, 'logo-text-240.png');
  } else {
    console.log('Skipping text logo processing - source file not found:', textPath);
  }
}

// Main function to optimize all images
async function optimizeAllImages() {
  try {
    // Ensure directories exist
    ensureDirectoryExists(OPTIMIZED_DIR);
    ensureDirectoryExists(ORIGINAL_IMAGES_DIR);
    
    // Process icons first
    await processIcons();
    
    // Find all images in the public directory
    const imageFiles = glob.sync(`${PUBLIC_DIR}/**/*.{png,jpg,jpeg,gif}`, {
      ignore: [
        `${PUBLIC_DIR}/images/**`,
        `${PUBLIC_DIR}/optimized/**`,
        `${PUBLIC_DIR}/original-images/**`
      ]
    });
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    // Process each image and collect dimension data
    const imageDimensions = {};
    for (const filePath of imageFiles) {
      // Skip purrify-logo.png as it's causing issues
      if (path.basename(filePath) === 'purrify-logo.png') {
        console.log(`Skipping problematic file: ${filePath}`);
        continue;
      }
      
      const result = await optimizeImage(filePath);
      if (result) {
        const relativePath = path.relative(PUBLIC_DIR, filePath);
        // Handle spaces in filenames for image dimensions
        const sanitizedWebp = result.webp.replace(/\s+/g, '-');
        const sanitizedAvif = result.avif.replace(/\s+/g, '-');
        
        imageDimensions[relativePath] = {
          width: result.width,
          height: result.height,
          webp: `optimized/${result.webp}`,
          webpSanitized: `optimized/${sanitizedWebp}`,
          avif: `optimized/${result.avif}`,
          avifSanitized: `optimized/${sanitizedAvif}`,
          optimized: `optimized/${result.original}`
        };
        
        // Move original to backup directory
        const backupPath = path.join(ORIGINAL_IMAGES_DIR, path.basename(filePath));
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(filePath, backupPath);
        }
      }
    }

    // Write image dimensions to a JSON file for reference
    fs.writeFileSync(
      path.join(PUBLIC_DIR, 'image-dimensions.json'),
      JSON.stringify(imageDimensions, null, 2)
    );
    
    console.log('All images optimized successfully!');
  } catch (error) {
    console.error('Error in image optimization process:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeAllImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
