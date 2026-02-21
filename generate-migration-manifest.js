const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Directories to analyze
const DIRECTORIES = [
  'public/images',
  'public/original-images', 
  'public/optimized'
];

// Variant suffixes to strip for grouping
const VARIANT_SUFFIXES = ['-640w', '-828w', '-1080w', '-1200w', '-1920w'];

// Image extensions
const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg', '.ico'
]);

// Team member names (common patterns)
const TEAM_NAMES = new Set([
  'david-kim', 'leland-brantley', 'merrick-sullivan', 'ezekiel-voss',
  'orion-hampton', 'cassian-reed', 'gideon-fletcher', 'trenton-harlow',
  'sage-dean', 'finnegan-crosby', 'mark-archer'
]);

// Store/retailer names (common patterns from western_stores_enriched_FINAL.csv)
const STORE_NAMES = new Set([
  'kk', 'pet-valu', 'camlachie-feed', 'global-pet-foods', 'petland',
  'pitou-minou', 'wbu', 'shur-gain', 'tail-blazers', 'bone-yard'
]);

// Location/province names
const LOCATION_NAMES = new Set([
  'alberta', 'british-columbia', 'bc', 'ontario', 'quebec', 'manitoba',
  'saskatchewan', 'nova-scotia', 'new-brunswick', 'newfoundland',
  'prince-edward-island', 'pei', 'north', 'south', 'east', 'west',
  'atlantic', 'prairies', 'canada', 'usa'
]);

// Check if file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

// Extract base name (strip variant suffixes)
function getBaseName(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  for (const suffix of VARIANT_SUFFIXES) {
    if (nameWithoutExt.endsWith(suffix)) {
      return nameWithoutExt.slice(0, -suffix.length);
    }
  }
  return nameWithoutExt;
}

// Check if filename is a variant
function isVariant(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return VARIANT_SUFFIXES.some(suffix => nameWithoutExt.endsWith(suffix));
}

// Compute SHA-256 hash of file
function computeHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch (_e) {
    return null;
  }
}

// Get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (_e) {
    return 0;
  }
}

// Classify file based on path and filename
function classifyFile(filePath, relativePath) {
  // relativePath now includes the directory prefix (public/images/, public/original-images/, etc.)
  const normalizedPath = relativePath.toLowerCase();
  const filename = path.basename(filePath).toLowerCase();
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const baseName = getBaseName(filename);

  // 1. Path-first hard mapping
  // Use normalized paths and check for any variation of the category names
  if (normalizedPath.includes('/logos/') || normalizedPath.includes('/logos\\') || 
      normalizedPath.includes('/Logos/') || normalizedPath.includes('/Logos\\')) return 'logos';
  if (normalizedPath.includes('/products/') || normalizedPath.includes('/products\\') ||
      normalizedPath.includes('/Products/') || normalizedPath.includes('/Products\\')) return 'products';
  if (normalizedPath.includes('/team/') || normalizedPath.includes('/team\\') ||
      normalizedPath.includes('/Team/') || normalizedPath.includes('/Team\\')) return 'team';
  if (normalizedPath.includes('/stores/') || normalizedPath.includes('/stores\\') ||
      normalizedPath.includes('/Stores/') || normalizedPath.includes('/Stores\\')) return 'stores';
  if (normalizedPath.includes('/icons/') || normalizedPath.includes('/icons\\') ||
      normalizedPath.includes('/Icons/') || normalizedPath.includes('/Icons\\')) return 'icons';
  if (normalizedPath.includes('/locations/') || normalizedPath.includes('/locations\\') ||
      normalizedPath.includes('/Locations/') || normalizedPath.includes('/Locations\\') ||
      normalizedPath.includes('/provinces/') || normalizedPath.includes('/provinces\\') ||
      normalizedPath.includes('/Provinces/') || normalizedPath.includes('/Provinces\\')) return 'locations';
  if (normalizedPath.includes('/pitchdeck/') || normalizedPath.includes('/pitchdeck\\') ||
      normalizedPath.includes('/Pitchdeck/') || normalizedPath.includes('/Pitchdeck\\')) return 'marketing';
  if (normalizedPath.includes('/blog/') || normalizedPath.includes('/blog\\') ||
      normalizedPath.includes('/Blog/') || normalizedPath.includes('/Blog\\')) return 'blog';
  if (normalizedPath.includes('/marketing/') || normalizedPath.includes('/marketing\\') ||
      normalizedPath.includes('/Marketing/') || normalizedPath.includes('/Marketing\\')) return 'marketing';

  // 2. Filename hard mapping
  // Icons
  if (filename.startsWith('favicon') || 
      filename.startsWith('apple-touch-icon') || 
      filename.startsWith('icon-') ||
      filename.startsWith('manifest') ||
      filename === 'icon.png' ||
      filename === 'icon.svg') {
    return 'icons';
  }

  // Logos
  if (filename.startsWith('logo') || 
      filename.startsWith('social-logo') || 
      filename.startsWith('purrify-logo') ||
      filename.includes('logo-dark') ||
      filename.includes('logo-light') ||
      filename.includes('animated_logo') ||
      filename.includes('animated-logo') ||
      filename.includes('_logo') ||
      filename.includes('-logo') ||
      filename.includes('logo.')) {
    return 'logos';
  }

  // Team
  if (filename.startsWith('team') || 
      filename.startsWith('avatar') ||
      TEAM_NAMES.has(baseName) ||
      TEAM_NAMES.has(nameWithoutExt)) {
    return 'team';
  }

  // Products
  if (filename.includes('17g') || 
      filename.includes('60g') || 
      filename.includes('140g') ||
      filename.includes('bag') ||
      filename.includes('transparent') ||
      filename.includes('product') ||
      filename.includes('-removebg-') ||
      filename.includes('purrify-standard') ||
      filename.includes('carbon-granules')) {
    return 'products';
  }

  // Marketing (pitchdeck slides)
  if (filename.startsWith('slide-') || 
      filename.startsWith('pitchdeck') ||
      filename.startsWith('retailer')) {
    return 'marketing';
  }

  // Stores
  if (STORE_NAMES.has(baseName) || STORE_NAMES.has(nameWithoutExt)) {
    return 'stores';
  }

  // Locations
  if (LOCATION_NAMES.has(baseName) || LOCATION_NAMES.has(nameWithoutExt)) {
    return 'locations';
  }

  // 3. Content-based classification
  // Blog content images (patterns that suggest blog imagery)
  const blogPatterns = [
    /cat.*litter/i,
    /cat.*owner/i,
    /happy.*cat/i,
    /curious.*cat/i,
    /senior.*cat/i,
    /multi.*cat/i,
    /ammonia/i,
    /carbon/i,
    /odor/i,
    /ventilation/i,
    /ghibli/i,
    /hero/i,
    /powder.*spray/i,
    /clay.*litter/i,
    /crystal.*litter/i,
    /activated.*carbon/i,
    /comparison/i,
    /science/i,
    /testing/i,
    /results/i,
    /realistic/i,
    /modern.*living/i,
    /small.*apartment/i,
    /landlord/i,
    /content-/i,
  ];

  for (const pattern of blogPatterns) {
    if (pattern.test(filename)) {
      return 'blog';
    }
  }

  // Default to marketing
  return 'marketing';
}

// Recursively get all files in directory
function getAllFiles(dirPath, arrayOfFiles = [], baseDir = dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    // baseDirName is the path from cwd to the ORIGINAL base directory (e.g., "public/images")
    const baseDirName = path.relative(process.cwd(), baseDir);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles, baseDir);
      } else {
        // Skip .DS_Store and non-image files
        if (file === '.DS_Store') continue;
        if (!isImageFile(file)) continue;
        
        // Get path relative to the ORIGINAL base directory, not the current subdirectory
        const relativePath = path.relative(baseDir, fullPath);
        // Source path is baseDirName + relativePath
        const sourcePath = path.join(baseDirName, relativePath);
        
        arrayOfFiles.push({
          fullPath,
          relativePath: sourcePath,  // This is the full relative path from project root
          dir: baseDirName.split('/')[1] // images, original-images, or optimized
        });
      }
    }
  } catch (e) {
    // Directory might not exist
    console.error(`Error reading directory ${dirPath}:`, e.message);
  }
  
  return arrayOfFiles;
}

// Main function
async function generateManifest() {
  console.log('Starting migration manifest generation...');
  
  const allFiles = [];
  
  // Collect files from all directories
  for (const dir of DIRECTORIES) {
    const fullDir = path.join(process.cwd(), dir);
    console.log(`Scanning ${dir}...`);
    const files = getAllFiles(fullDir, [], fullDir);
    console.log(`  Found ${files.length} image files`);
    allFiles.push(...files);
  }
  
  console.log(`\nTotal files to process: ${allFiles.length}`);
  
  // Process each file
  const processedFiles = [];
  const variantGroups = new Map();
  
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const filename = path.basename(file.fullPath);
    
    if (i % 100 === 0) {
      console.log(`Processing ${i + 1}/${allFiles.length}...`);
    }
    
    const baseName = getBaseName(filename);
    const category = classifyFile(file.fullPath, file.relativePath);
    const hash = computeHash(file.fullPath);
    const size = getFileSize(file.fullPath);
    
    const processedFile = {
      sourcePath: file.relativePath,
      fullSourcePath: file.fullPath,
      filename,
      baseName,
      category,
      isVariant: isVariant(filename),
      variantGroup: baseName,
      targetOriginalPath: `public/original-images/${category}/${filename}`,
      targetOptimizedPath: `public/optimized/${category}/${filename}`,
      hash,
      size,
      sourceDir: file.dir
    };
    
    processedFiles.push(processedFile);
    
    // Track variant groups
    if (!variantGroups.has(baseName)) {
      variantGroups.set(baseName, []);
    }
    variantGroups.get(baseName).push(processedFile);
  }
  
  console.log(`\nFound ${variantGroups.size} variant groups`);
  
  // Ensure all variants in a group have the same category
  for (const [_groupName, groupFiles] of variantGroups) {
    const categories = new Set(groupFiles.map(f => f.category));
    if (categories.size > 1) {
      // Use the most common category or the first non-marketing category
      const categoryCounts = {};
      for (const f of groupFiles) {
        categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
      }
      const dominantCategory = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      for (const f of groupFiles) {
        f.category = dominantCategory;
        f.targetOriginalPath = `public/original-images/${dominantCategory}/${f.filename}`;
        f.targetOptimizedPath = `public/optimized/${dominantCategory}/${f.filename}`;
      }
    }
  }
  
  // Detect conflicts
  const conflicts = [];
  const targetPaths = new Map();
  
  for (const file of processedFiles) {
    const targets = [file.targetOriginalPath, file.targetOptimizedPath];
    
    for (const target of targets) {
      if (targetPaths.has(target)) {
        const existing = targetPaths.get(target);
        if (existing.hash !== file.hash) {
          conflicts.push({
            targetPath: target,
            file1: existing.sourcePath,
            file2: file.sourcePath,
            hash1: existing.hash,
            hash2: file.hash
          });
        }
      } else {
        targetPaths.set(target, file);
      }
    }
  }
  
  console.log(`Found ${conflicts.length} conflicts`);
  
  // Build categories summary
  const categories = {
    logos: { count: 0, files: [] },
    products: { count: 0, files: [] },
    stores: { count: 0, files: [] },
    team: { count: 0, files: [] },
    icons: { count: 0, files: [] },
    locations: { count: 0, files: [] },
    blog: { count: 0, files: [] },
    marketing: { count: 0, files: [] }
  };
  
  for (const file of processedFiles) {
    if (categories[file.category]) {
      categories[file.category].count++;
      categories[file.category].files.push(file.sourcePath);
    }
  }
  
  // Build final manifest
  const manifest = {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    files: processedFiles.map(f => ({
      sourcePath: f.sourcePath,
      filename: f.filename,
      baseName: f.baseName,
      category: f.category,
      isVariant: f.isVariant,
      variantGroup: f.variantGroup,
      targetOriginalPath: f.targetOriginalPath,
      targetOptimizedPath: f.targetOptimizedPath,
      hash: f.hash,
      size: f.size
    })),
    categories,
    conflicts,
    stats: {
      totalFiles: processedFiles.length,
      variantGroups: variantGroups.size,
      categorized: processedFiles.filter(f => f.category).length
    }
  };
  
  // Write manifest
  const manifestPath = path.join(process.cwd(), 'migration-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`\n✅ Manifest generated: ${manifestPath}`);
  console.log(`\nSummary:`);
  console.log(`  Total files: ${manifest.stats.totalFiles}`);
  console.log(`  Variant groups: ${manifest.stats.variantGroups}`);
  console.log(`  Conflicts: ${conflicts.length}`);
  console.log(`\nCategories:`);
  for (const [cat, data] of Object.entries(categories)) {
    console.log(`  ${cat}: ${data.count}`);
  }
  
  return manifest;
}

generateManifest().catch(console.error);
