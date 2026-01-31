const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
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
    // Skip entirely on CI/Vercel to avoid extra work and FS churn
    if (process.env.VERCEL || process.env.CI) {
      console.log('CI/Vercel detected: skipping optimize-all-images.');
      return;
    }

    // Ensure directories exist
    ensureDirectoryExists(OPTIMIZED_DIR);
    ensureDirectoryExists(ORIGINAL_IMAGES_DIR);

    // Run the image optimization script
    console.log('🖼️ Optimizing all images...');
    execSync('pnpm tsx scripts/optimize-images.ts', { stdio: 'inherit' });

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
