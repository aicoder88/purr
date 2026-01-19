const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel prebuild process...');

const isCI = !!(process.env.CI || process.env.VERCEL);

// Dark mode validation
if (!isCI) {
  console.log('Running dark mode validation...');
  try {
    execSync('npm run validate-dark-mode', { stdio: 'inherit' });
    console.log('Dark mode validation passed');
  } catch (e) {
    console.error('Dark mode validation failed');
    process.exit(1);
  }
} else {
  console.log('Skipping dark mode validation in CI/Vercel build');
}

// Ensure output directories exist
const optimizedDir = path.join(__dirname, '../public/optimized');
const originalImagesDir = path.join(__dirname, '../public/original-images');
if (!fs.existsSync(optimizedDir)) fs.mkdirSync(optimizedDir, { recursive: true });
if (!fs.existsSync(originalImagesDir)) fs.mkdirSync(originalImagesDir, { recursive: true });

// image-dimensions presence
const imageDimensionsPath = path.join(__dirname, '../public/image-dimensions.json');

try {
  if (isCI) {
    console.log('CI/Vercel build detected: skipping heavy image optimization.');
  } else {
    // Local/dev builds only: optimize images if script exists
    const optimizeScript = path.join(__dirname, 'images/optimize-all-images.js');
    if (fs.existsSync(optimizeScript)) {
      console.log('Optimizing all images...');
      execSync(`node ${optimizeScript}`, { stdio: 'inherit' });
      console.log('Image optimization complete');
    } else {
      console.log('Skipping image optimization: script not found');
    }
  }

  // Add width/height only if we have dimensions and script exists
  const addDimensionsScript = path.join(__dirname, 'images/add-image-dimensions.js');
  if (fs.existsSync(imageDimensionsPath) && fs.existsSync(addDimensionsScript)) {
    console.log('Adding width and height attributes to images...');
    execSync(`node ${addDimensionsScript}`, { stdio: 'inherit' });
    console.log('Image dimensions added');
  } else {
    console.log('Skipping add-image-dimensions: requirements not met');
  }

  console.log('Vercel prebuild process complete!');
} catch (error) {
  console.error('Error during Vercel prebuild process:', error.message);
  console.log('Continuing with build despite optimization errors...');
}
