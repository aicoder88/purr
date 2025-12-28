const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');

// Create a thumbnail from an existing image
async function createThumbnail() {
  try {
    // Use an existing image as a source
    const sourcePath = path.join(PUBLIC_DIR, 'samplebag.jpg');
    const outputPath = path.join(PUBLIC_DIR, 'cat_rose_thumbnail.jpg');
    
    // Create a thumbnail
    await sharp(sourcePath)
      .resize(500, 340, { fit: 'cover' })
      .toFile(outputPath);
    
    console.log("Created thumbnail: cat_rose_thumbnail.jpg");
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    process.exit(1);
  }
}

// Run the script
createThumbnail().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});