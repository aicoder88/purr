#!/usr/bin/env node
/**
 * Move flat optimized files to categorized folders based on migration-manifest.json
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const MANIFEST_PATH = path.join(__dirname, '../migration-manifest.json');
const DIMENSIONS_PATH = path.join(PUBLIC_DIR, 'image-dimensions.json');

// Statistics
const stats = {
  filesMoved: 0,
  filesAlreadyCategorized: 0,
  filesNotFound: 0,
  errors: []
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function moveFile(src, dest) {
  try {
    ensureDir(path.dirname(dest));
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest); // Remove destination if exists
    }
    fs.renameSync(src, dest);
    return true;
  } catch (err) {
    stats.errors.push({ src, dest, error: err.message });
    return false;
  }
}

function getFileExtension(filename) {
  return path.extname(filename).toLowerCase();
}

function getBaseName(filename) {
  return path.basename(filename, getFileExtension(filename));
}

function main() {
  console.log('Loading migration manifest...');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  
  // Build a map of filenames to their target categories
  const fileCategoryMap = new Map();
  for (const entry of manifest.files) {
    const category = entry.category;
    const filename = entry.filename;
    const baseName = entry.baseName;
    
    // Map both filename and baseName to category
    fileCategoryMap.set(filename, category);
    fileCategoryMap.set(baseName, category);
  }
  
  console.log(`Loaded ${fileCategoryMap.size} file mappings`);
  
  // Get all files in the flat optimized directory
  const allFiles = fs.readdirSync(OPTIMIZED_DIR);
  const flatFiles = allFiles.filter(f => {
    const fullPath = path.join(OPTIMIZED_DIR, f);
    return fs.statSync(fullPath).isFile();
  });
  
  console.log(`Found ${flatFiles.length} flat files to process`);
  
  // Process each flat file
  for (const filename of flatFiles) {
    const srcPath = path.join(OPTIMIZED_DIR, filename);
    const baseName = getBaseName(filename);
    const category = fileCategoryMap.get(filename) || fileCategoryMap.get(baseName);
    
    if (!category) {
      // Try to infer category from filename patterns
      let inferredCategory = null;
      
      if (filename.includes('140g') || filename.includes('17g') || filename.includes('60g') || 
          filename.includes('carbon-granules') || filename.includes('purrify') || 
          filename.includes('samplebag') || filename.includes('three-bags')) {
        inferredCategory = 'products';
      } else if (filename.includes('team-avatar') || filename.includes('silas') || 
                 filename.includes('trenton') || filename.includes('sage') || 
                 filename.includes('orion') || filename.includes('merrick') || 
                 filename.includes('mark') || filename.includes('leland') || 
                 filename.includes('gideon') || filename.includes('finnegan') || 
                 filename.includes('ezekiel') || filename.includes('david') || 
                 filename.includes('cassian') || filename.includes('dorian') || 
                 filename.includes('michael')) {
        inferredCategory = 'team';
      } else if (filename.includes('logo') || filename.includes('social')) {
        inferredCategory = 'logos';
      } else if (filename.includes('icon') || filename.includes('favicon')) {
        inferredCategory = 'icons';
      } else if (filename.includes('ontario') || filename.includes('quebec') || 
                 filename.includes('alberta') || filename.includes('british') || 
                 filename.includes('atlantic') || filename.includes('prairies') || 
                 filename.includes('north')) {
        inferredCategory = 'locations';
      } else if (filename.includes('slide-') || filename.includes('hero') || 
                 filename.includes('mission') || filename.includes('happy-owner') ||
                 filename.includes('retailer') || filename.includes('senior-cat') ||
                 filename.includes('dr-michael')) {
        inferredCategory = 'marketing';
      } else if (filename.includes('ammonia') || filename.includes('apartment') || 
                 filename.includes('cat-litter') || filename.includes('carbon') || 
                 filename.includes('multi-cat') || filename.includes('ghibli') ||
                 filename.includes('90day') || filename.includes('powder') ||
                 filename.includes('summer') || filename.includes('winter') ||
                 filename.includes('embarrassed') || filename.includes('tried')) {
        inferredCategory = 'blog';
      }
      
      if (inferredCategory) {
        const destDir = path.join(OPTIMIZED_DIR, inferredCategory);
        const destPath = path.join(destDir, filename);
        
        if (moveFile(srcPath, destPath)) {
          stats.filesMoved++;
          console.log(`Moved (inferred): ${filename} -> ${inferredCategory}/`);
        }
      } else {
        stats.filesNotFound++;
        console.log(`No category found for: ${filename}`);
      }
      continue;
    }
    
    const destDir = path.join(OPTIMIZED_DIR, category);
    const destPath = path.join(destDir, filename);
    
    // Check if already in correct location
    if (fs.existsSync(destPath)) {
      // Remove the flat file if categorized version exists
      try {
        fs.unlinkSync(srcPath);
        stats.filesAlreadyCategorized++;
        console.log(`Removed duplicate: ${filename}`);
      } catch (err) {
        stats.errors.push({ src: srcPath, error: err.message });
      }
      continue;
    }
    
    if (moveFile(srcPath, destPath)) {
      stats.filesMoved++;
      console.log(`Moved: ${filename} -> ${category}/`);
    }
  }
  
  // Update image-dimensions.json to use categorized paths
  console.log('\nUpdating image-dimensions.json...');
  if (fs.existsSync(DIMENSIONS_PATH)) {
    const dimensions = JSON.parse(fs.readFileSync(DIMENSIONS_PATH, 'utf8'));
    const updatedDimensions = {};
    
    for (const [key, value] of Object.entries(dimensions)) {
      // Update paths in formats to use categorized paths
      const updatedValue = { ...value };
      
      if (updatedValue.formats) {
        for (const [format, files] of Object.entries(updatedValue.formats)) {
          if (Array.isArray(files)) {
            updatedValue.formats[format] = files.map(filePath => {
              // Check if this is a flat optimized path that needs updating
              if (filePath.startsWith('optimized/') && !filePath.includes('/', 10)) {
                const fileName = path.basename(filePath);
                const baseName = getBaseName(fileName);
                const category = fileCategoryMap.get(fileName) || fileCategoryMap.get(baseName);
                
                if (category) {
                  return `optimized/${category}/${fileName}`;
                }
              }
              return filePath;
            });
          }
        }
      }
      
      updatedDimensions[key] = updatedValue;
    }
    
    fs.writeFileSync(DIMENSIONS_PATH, JSON.stringify(updatedDimensions, null, 2));
    console.log('Updated image-dimensions.json');
  }
  
  // Print summary
  console.log('\n=== SUMMARY ===');
  console.log(`Files moved: ${stats.filesMoved}`);
  console.log(`Files already categorized (duplicates removed): ${stats.filesAlreadyCategorized}`);
  console.log(`Files not found in manifest: ${stats.filesNotFound}`);
  console.log(`Errors: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(e => console.log(`  - ${e.src}: ${e.error}`));
  }
}

main();
