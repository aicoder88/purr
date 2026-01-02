const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const { execSync } = require('node:child_process');

// Configuration
const SRC_DIR = path.join(__dirname, '../../src');
const PAGES_DIR = path.join(__dirname, '../../pages');
const COMPONENTS_DIR = path.join(__dirname, '../../components');
const IMAGE_DIMENSIONS_PATH = path.join(__dirname, '../../public/image-dimensions.json');

// Load image dimensions from the JSON file
function loadImageDimensions() {
  try {
    if (fs.existsSync(IMAGE_DIMENSIONS_PATH)) {
      const data = fs.readFileSync(IMAGE_DIMENSIONS_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading image dimensions:', error);
  }
  return {};
}

// Find all JSX/TSX files
function findReactFiles() {
  const srcFiles = glob.sync(`${SRC_DIR}/**/*.{jsx,tsx}`);
  const pagesFiles = glob.sync(`${PAGES_DIR}/**/*.{jsx,tsx}`);
  const componentFiles = glob.sync(`${COMPONENTS_DIR}/**/*.{jsx,tsx}`);
  
  return [...srcFiles, ...pagesFiles, ...componentFiles];
}

// Process a file to add width and height attributes to img tags
function processFile(filePath, imageDimensions) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Find all img tags without width and height
    const imgRegex = /<img\s+([^>]*)\s*\/?>/g;
    const srcRegex = /src=["']([^"']+)["']/;
    
    content = content.replace(imgRegex, (match, attributes) => {
      // Skip if already has width and height
      if (attributes.includes('width=') && attributes.includes('height=')) {
        return match;
      }
      
      // Extract src attribute
      const srcMatch = attributes.match(srcRegex);
      if (!srcMatch) return match;
      
      const src = srcMatch[1];
      const imgPath = src.startsWith('/') ? src.substring(1) : src;
      
      // Find dimensions for this image
      const dimensions = imageDimensions[imgPath];
      if (!dimensions) return match;
      
      // Add width and height attributes
      const newAttributes = `${attributes} width="${dimensions.width}" height="${dimensions.height}"`;
      modified = true;
      return `<img ${newAttributes}/>`;
    });
    
    // Find all NextImage components without width and height
    const nextImageRegex = /<NextImage\s+([^>]*)\s*\/?>/g;
    
    content = content.replace(nextImageRegex, (match, attributes) => {
      // Skip if already has width and height
      if (attributes.includes('width=') && attributes.includes('height=')) {
        return match;
      }
      
      // Extract src attribute
      const srcMatch = attributes.match(srcRegex);
      if (!srcMatch) return match;
      
      const src = srcMatch[1];
      const imgPath = src.startsWith('/') ? src.substring(1) : src;
      
      // Find dimensions for this image
      const dimensions = imageDimensions[imgPath];
      if (!dimensions) return match;
      
      // Add width and height attributes
      const newAttributes = `${attributes} width={${dimensions.width}} height={${dimensions.height}}`;
      modified = true;
      return `<NextImage ${newAttributes}/>`;
    });
    
    // Save the file if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated image dimensions in: ${path.relative(__dirname, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Main function
async function main() {
  try {
    console.log('🔍 Loading image dimensions...');
    const imageDimensions = loadImageDimensions();
    
    if (Object.keys(imageDimensions).length === 0) {
      console.log('❌ No image dimensions found. Run optimize-all-images first.');
      process.exit(1);
    }
    
    console.log('🔍 Finding React files...');
    const reactFiles = findReactFiles();
    console.log(`Found ${reactFiles.length} React files to process`);
    
    let updatedCount = 0;
    
    for (const filePath of reactFiles) {
      if (processFile(filePath, imageDimensions)) {
        updatedCount++;
      }
    }
    
    console.log(`✅ Added missing width and height attributes to images in ${updatedCount} files`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();