#!/usr/bin/env node
/**
 * Fix broken image references to use categorized paths
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Map of flat filenames to their categories
const fileCategoryMap = new Map();

// Categories and their typical file patterns
const categoryPatterns = {
  'blog': [
    'ammonia', 'apartment', 'carbon', 'cat-litter', 'curious-cat', 'happy-cat', 
    'ghibli', 'multi-cat', '90day', 'powder', 'spray', 'summer', 'winter',
    'embarrassed', 'tried', 'frequency', 'deodorizer', 'guide', 'science',
    'fresh', 'vet', 'strong', 'odor', 'smell', 'usa', 'tips', 'myths',
    'placement', 'types', 'natural', 'clay', 'crystal', 'clumping', 'covered',
    'sensitive', 'fragrance-free', 'kitten', 'enzyme', 'blacklight', 'hardwood',
    'applying', 'technique', 'scooping', 'reading', 'label', 'cost', 'benefit',
    'coconut', 'chemistry', 'molecular', 'micropores', 'realistic', 'litter-box',
    'cat-peek', 'cat-using', 'nose', 'ph-scale', 'sparkling', 'airy', 'hidden',
    'landlord', 'lavender', 'joyful', 'content-cat', 'mother-cat', 'cat-coco',
    'catonbed', 'cats-and-filters', 'certification', 'coffee', 'comparison',
    'diagram', 'fresh-home', 'gigi', 'hamster', 'hero', 'iss', 'panel',
    'pet-safety', 'prevention', 'sarah', 'toxic', 'ventilation'
  ],
  'marketing': [
    'slide-', 'mission', 'happy-owner', 'retailer', 'senior-cat', 'dr-michael',
    'step-', 'quality-control', 'micropores', 'activated-carbon', 'standard-',
    'usa-', 'summer-', 'winter-', 'tried-', 'embarrassed-', 'strength-',
    'testimonial', 'vet-check', 'how-it-works', 'versatile', 'subtle',
    'market', 'economics', 'platform', 'case-study', 'infrastructure',
    'affiliate', 'before-after', 'purrify-demo', 'social-', 'applying-purrify'
  ],
  'products': [
    '140g', '17g', '60g', 'purrify-standard', 'samplebag', 'three-bags',
    'carbon-granules', 'activated-carbon-granules', 'masking-products'
  ],
  'team': [
    'cassian', 'david', 'dorian', 'dr-michael', 'ezekiel', 'finnegan',
    'gideon', 'leland', 'mark', 'merrick', 'michael-rodriguez', 'orion',
    'sage', 'silas', 'team-avatar', 'trenton'
  ],
  'logos': [
    'logo-', 'social-logo', 'purrify-logo', 'purr-pink', 'purrify-team'
  ],
  'icons': [
    'icon-', 'favicon', 'apple-touch'
  ],
  'locations': [
    'alberta', 'ontario', 'quebec', 'british-columbia', 'atlantic', 'prairies', 'north'
  ],
  'stores': [
    'woofmiao', 'viva-pets', 'pitou', 'pattes', 'nathamo', 'little-bit',
    'lamifidel', 'kong', 'kk', 'doghaus', 'coquette', 'camlachie', 'bestcat',
    'animalerie'
  ]
};

// Scan optimized folders to build file-to-category map
function buildFileMap() {
  const categories = Object.keys(categoryPatterns);
  for (const category of categories) {
    const dir = path.join(__dirname, '../public/optimized', category);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const baseName = path.basename(file, path.extname(file));
        fileCategoryMap.set(file, category);
        fileCategoryMap.set(baseName, category);
      }
    }
  }
  console.log(`Mapped ${fileCategoryMap.size / 2} files to categories`);
}

function getCategoryForFile(filename) {
  // Check exact match first
  if (fileCategoryMap.has(filename)) {
    return fileCategoryMap.get(filename);
  }
  
  const baseName = path.basename(filename, path.extname(filename));
  if (fileCategoryMap.has(baseName)) {
    return fileCategoryMap.get(baseName);
  }
  
  // Try pattern matching
  const lowerName = filename.toLowerCase();
  for (const [category, patterns] of Object.entries(categoryPatterns)) {
    for (const pattern of patterns) {
      if (lowerName.includes(pattern.toLowerCase())) {
        return category;
      }
    }
  }
  
  return null;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix /optimized/misc/ references
  content = content.replace(/\/optimized\/misc\/([^"'\s]+)/g, (match, filename) => {
    const category = getCategoryForFile(filename);
    if (category) {
      modified = true;
      return `/optimized/${category}/${filename}`;
    }
    return match;
  });
  
  // Fix flat /optimized/ references (without category)
  content = content.replace(/\/optimized\/([a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg|avif|gif))/g, (match, filename) => {
    const category = getCategoryForFile(filename);
    if (category) {
      modified = true;
      return `/optimized/${category}/${filename}`;
    }
    return match;
  });
  
  // Fix https://www.purrify.ca/optimized/ references (without category)
  content = content.replace(/https:\/\/www\.purrify\.ca\/optimized\/([a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg|avif|gif))/g, (match, filename) => {
    const category = getCategoryForFile(filename);
    if (category) {
      modified = true;
      return `https://www.purrify.ca/optimized/${category}/${filename}`;
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function main() {
  buildFileMap();
  
  // Find all TS/TSX files
  const files = glob.sync('{app,components,src}/**/*.{ts,tsx}', {
    cwd: path.join(__dirname, '..')
  });
  
  let fixedCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    try {
      const fullPath = path.join(__dirname, '..', file);
      if (fixFile(fullPath)) {
        console.log(`Fixed: ${file}`);
        fixedCount++;
      }
    } catch (err) {
      console.error(`Error fixing ${file}:`, err.message);
      errorCount++;
    }
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Files fixed: ${fixedCount}`);
  console.log(`Errors: ${errorCount}`);
}

main();
