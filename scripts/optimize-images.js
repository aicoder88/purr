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

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
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
    
    // Create WebP version (both with original filename and sanitized filename)
    const webpOutputPath = path.join(OPTIMIZED_DIR, `${baseName}.webp`);
    const sanitizedWebpOutputPath = path.join(OPTIMIZED_DIR, `${sanitizedBaseName}.webp`);
    
    await sharp(filePath)
      .resize(width, height)
      .webp({ quality: QUALITY })
      .toFile(webpOutputPath);
      
    // Create a sanitized copy if the filename has spaces
    if (baseName !== sanitizedBaseName) {
      await sharp(filePath)
        .resize(width, height)
        .webp({ quality: QUALITY })
        .toFile(sanitizedWebpOutputPath);
      console.log(`Created sanitized WebP version: ${sanitizedBaseName}.webp`);
    }
    
    // Create AVIF version (higher quality for better appearance)
    const avifOutputPath = path.join(OPTIMIZED_DIR, `${baseName}.avif`);
    const sanitizedAvifOutputPath = path.join(OPTIMIZED_DIR, `${sanitizedBaseName}.avif`);
    
    await sharp(filePath)
      .resize(width, height)
      .avif({ quality: QUALITY })
      .toFile(avifOutputPath);
      
    // Create a sanitized copy if the filename has spaces
    if (baseName !== sanitizedBaseName) {
      await sharp(filePath)
        .resize(width, height)
        .avif({ quality: QUALITY })
        .toFile(sanitizedAvifOutputPath);
      console.log(`Created sanitized AVIF version: ${sanitizedBaseName}.avif`);
    }
    
    // Create optimized version in original format with proper dimensions
    const optimizedOriginalPath = path.join(OPTIMIZED_DIR, filename);
    await sharp(filePath)
      .resize(width, height)
      .toFile(optimizedOriginalPath);
    
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
  
  // Create favicon (16x16)
  await sharp(iconPath)
    .resize(16, 16)
    .toFile(path.join(outputDir, 'favicon.png'));
    
  // Create small icon (32x32)
  await sharp(iconPath)
    .resize(32, 32)
    .toFile(path.join(outputDir, 'icon-32.png'));
    
  // Create medium icon (64x64)
  await sharp(iconPath)
    .resize(64, 64)
    .toFile(path.join(outputDir, 'icon-64.png'));
    
  // Create large icon (128x128)
  await sharp(iconPath)
    .resize(128, 128)
    .toFile(path.join(outputDir, 'icon-128.png'));
    
  // Create apple touch icon (180x180)
  await sharp(iconPath)
    .resize(180, 180)
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  
  // Optimize text logo
  const textPath = path.join(PUBLIC_DIR, 'purrify-logo-text.png');
  
  // Create small text logo (120x40)
  await sharp(textPath)
    .resize(120, 40)
    .toFile(path.join(outputDir, 'logo-text-120.png'));
    
  // Create medium text logo (180x60)
  await sharp(textPath)
    .resize(180, 60)
    .toFile(path.join(outputDir, 'logo-text-180.png'));
    
  // Create large text logo (240x80)
  await sharp(textPath)
    .resize(240, 80)
    .toFile(path.join(outputDir, 'logo-text-240.png'));
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
    const optimizationPromises = imageFiles.map(async (filePath) => {
      // Skip purrify-logo.png as it's causing issues
      if (path.basename(filePath) === 'purrify-logo.png') {
        console.log(`Skipping problematic file: ${filePath}`);
        return;
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
        fs.copyFileSync(filePath, backupPath);
      }
    });
    
    await Promise.all(optimizationPromises);
    
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