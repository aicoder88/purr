const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const ORIGINAL_IMAGES_DIR = path.join(PUBLIC_DIR, 'original-images');

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Main function to optimize all images
async function optimizeAllImages() {
  try {
    // Ensure directories exist
    ensureDirectoryExists(OPTIMIZED_DIR);
    ensureDirectoryExists(ORIGINAL_IMAGES_DIR);
    
    console.log('🔍 Finding all images in public directory...');
    
    // Find all images in the public directory
    const imageFiles = glob.sync(`${PUBLIC_DIR}/**/*.{png,jpg,jpeg,gif,webp}`, {
      ignore: [
        `${PUBLIC_DIR}/optimized/**`,
        `${PUBLIC_DIR}/original-images/**`
      ]
    });
    
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Copy all images to the public root for optimization
    for (const filePath of imageFiles) {
      if (filePath.includes('/images/') || !filePath.includes(PUBLIC_DIR)) {
        const filename = path.basename(filePath);
        const destPath = path.join(PUBLIC_DIR, filename);
        
        // Skip if the file already exists in the root
        if (!fs.existsSync(destPath)) {
          console.log(`Copying ${filePath} to ${destPath}`);
          fs.copyFileSync(filePath, destPath);
        }
      }
    }
    
    // Run the image optimization script
    console.log('🖼️ Optimizing all images...');
    execSync('node scripts/optimize-images.js', { stdio: 'inherit' });
    
    console.log('✅ All images optimized successfully!');
  } catch (error) {
    console.error('❌ Error in image optimization process:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeAllImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});