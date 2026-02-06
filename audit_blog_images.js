#!/usr/bin/env node
/**
 * Comprehensive Blog Image Audit Script
 * Analyzes all image references across blog posts in all locales
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = 'content/blog';
const OPTIMIZED_DIR = 'public/optimized';
const IMAGES_DIR = 'public/images';
const LOCALES = ['en', 'fr', 'zh', 'es'];

// Results storage
const results = {
  allReferences: new Set(),
  byLocale: { en: new Set(), fr: new Set(), zh: new Set(), es: new Set() },
  byPost: {},
  inOptimized: new Set(),
  inImages: new Set(),
  missing: new Set(),
  legacyReferences: new Set(),
  mismatches: {}
};

// Get all files in a directory
function getFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => !f.startsWith('.') && !f.startsWith('_'))
      .filter(f => {
        const stat = fs.statSync(path.join(dir, f));
        return stat.isFile();
      })
      .map(f => f.toLowerCase());
  } catch (e) {
    return [];
  }
}

// Extract image references from blog post JSON
function extractImagesFromPost(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(content);
    const images = [];
    
    // Featured image
    if (post.featuredImage?.url) {
      images.push({ type: 'featured', path: post.featuredImage.url });
    }
    
    // OG image
    if (post.seo?.ogImage) {
      images.push({ type: 'ogImage', path: post.seo.ogImage });
    }
    
    // Author avatar
    if (post.author?.avatar) {
      images.push({ type: 'avatar', path: post.author.avatar });
    }
    
    // Content images - extract src from img tags
    if (post.content) {
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      while ((match = imgRegex.exec(post.content)) !== null) {
        images.push({ type: 'content', path: match[1] });
      }
    }
    
    return images;
  } catch (e) {
    console.error(`Error reading ${filePath}: ${e.message}`);
    return [];
  }
}

// Get basename from image path
function getImageBasename(imgPath) {
  return path.basename(imgPath).toLowerCase();
}

// Check if image exists in optimized or images folder
function checkImageExistence(basename, optimizedFiles, imagesFiles) {
  const baseNoExt = basename.replace(/\.[^.]+$/, '');
  
  // Check exact match in optimized
  if (optimizedFiles.includes(basename)) {
    return { exists: true, location: 'optimized', file: basename };
  }
  
  // Check exact match in images
  if (imagesFiles.includes(basename)) {
    return { exists: true, location: 'images', file: basename };
  }
  
  // Check with different extension in optimized
  const optimizedMatch = optimizedFiles.find(f => {
    const fNoExt = f.replace(/\.[^.]+$/, '');
    return fNoExt === baseNoExt;
  });
  if (optimizedMatch) {
    return { exists: true, location: 'optimized', file: optimizedMatch };
  }
  
  // Check with different extension in images
  const imagesMatch = imagesFiles.find(f => {
    const fNoExt = f.replace(/\.[^.]+$/, '');
    return fNoExt === baseNoExt;
  });
  if (imagesMatch) {
    return { exists: true, location: 'images', file: imagesMatch };
  }
  
  return { exists: false, location: null, file: null };
}

// Main analysis
function runAudit() {
  console.log('🔍 Starting comprehensive blog image audit...\n');
  
  const optimizedFiles = getFiles(OPTIMIZED_DIR);
  const imagesFiles = getFiles(IMAGES_DIR);
  
  console.log(`📁 Found ${optimizedFiles.length} files in ${OPTIMIZED_DIR}`);
  console.log(`📁 Found ${imagesFiles.length} files in ${IMAGES_DIR}\n`);
  
  // Track errors
  const errors = [];
  
  for (const locale of LOCALES) {
    const localeDir = path.join(BLOG_DIR, locale);
    
    if (!fs.existsSync(localeDir)) {
      console.log(`⚠️  Directory not found: ${localeDir}`);
      continue;
    }
    
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
    console.log(`📝 Processing ${files.length} posts in ${locale}/`);
    
    for (const file of files) {
      const slug = file.replace('.json', '');
      const filePath = path.join(localeDir, file);
      
      let images;
      try {
        images = extractImagesFromPost(filePath);
      } catch (e) {
        errors.push({ file: filePath, error: e.message });
        continue;
      }
      
      if (!results.byPost[slug]) {
        results.byPost[slug] = {};
      }
      results.byPost[slug][locale] = images;
      
      for (const img of images) {
        const basename = getImageBasename(img.path);
        results.byLocale[locale].add(basename);
        results.allReferences.add(basename);
        
        if (img.path.includes('/images/') && !img.path.includes('/optimized/')) {
          results.legacyReferences.add(img.path);
        }
        
        const existence = checkImageExistence(basename, optimizedFiles, imagesFiles);
        if (existence.exists) {
          if (existence.location === 'optimized') {
            results.inOptimized.add(basename);
          } else {
            results.inImages.add(basename);
          }
        } else {
          results.missing.add(basename);
        }
      }
    }
  }
  
  // Detect mismatches
  console.log('\n🔍 Detecting cross-locale mismatches...');
  for (const [slug, locales] of Object.entries(results.byPost)) {
    const enImages = locales.en || [];
    const enBasenames = enImages.map(i => getImageBasename(i.path));
    
    const mismatches = [];
    
    for (const [locale, images] of Object.entries(locales)) {
      if (locale === 'en') continue;
      
      const localeBasenames = images.map(i => getImageBasename(i.path));
      
      const missingInLocale = enImages.filter(img => 
        !localeBasenames.includes(getImageBasename(img.path))
      );
      
      const extraInLocale = images.filter(img => 
        !enBasenames.includes(getImageBasename(img.path))
      );
      
      if (missingInLocale.length > 0 || extraInLocale.length > 0) {
        mismatches.push({ locale, missing: missingInLocale, extra: extraInLocale });
      }
    }
    
    if (mismatches.length > 0) {
      results.mismatches[slug] = mismatches;
    }
  }
  
  generateReport(optimizedFiles, imagesFiles, errors);
}

function generateReport(optimizedFiles, imagesFiles, errors) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE BLOG IMAGE AUDIT REPORT');
  console.log('='.repeat(80));
  
  // Summary
  console.log('\n📈 SUMMARY STATISTICS');
  console.log('-'.repeat(50));
  console.log(`Total unique image references: ${results.allReferences.size}`);
  console.log(`  ✅ Found in /optimized/: ${results.inOptimized.size}`);
  console.log(`  ⚠️  Found in /images/: ${results.inImages.size}`);
  console.log(`  🚨 Missing entirely: ${results.missing.size}`);
  console.log(`  📂 Legacy /images/ references: ${results.legacyReferences.size}`);
  console.log(`  🌍 Posts with cross-locale mismatches: ${Object.keys(results.mismatches).length}`);
  console.log(`  ❌ JSON parse errors: ${errors.length}`);
  
  // By locale
  console.log('\n📊 REFERENCES BY LOCALE');
  console.log('-'.repeat(50));
  for (const locale of LOCALES) {
    console.log(`  ${locale.toUpperCase()}: ${results.byLocale[locale].size} unique images`);
  }
  
  // Parse errors
  if (errors.length > 0) {
    console.log('\n❌ JSON PARSE ERRORS (Could not process these files)');
    console.log('-'.repeat(50));
    errors.forEach(e => console.log(`  - ${e.file}`));
  }
  
  // Missing images
  if (results.missing.size > 0) {
    console.log('\n🚨 MISSING IMAGES (Critical - need to be created)');
    console.log('-'.repeat(50));
    const missingList = [...results.missing].sort();
    console.log(`Total: ${missingList.length}\n`);
    
    const byExt = {};
    for (const img of missingList) {
      const ext = path.extname(img) || 'unknown';
      byExt[ext] = byExt[ext] || [];
      byExt[ext].push(img);
    }
    
    for (const [ext, files] of Object.entries(byExt).sort()) {
      console.log(`\n${ext.toUpperCase()} files (${files.length}):`);
      files.forEach(f => console.log(`  - ${f}`));
    }
  }
  
  // Legacy references
  if (results.legacyReferences.size > 0) {
    console.log('\n⚠️  LEGACY /images/ REFERENCES (Should migrate to /optimized/)');
    console.log('-'.repeat(50));
    const legacyList = [...results.legacyReferences].sort();
    console.log(`Total: ${legacyList.length}\n`);
    
    legacyList.forEach(ref => {
      const basename = getImageBasename(ref);
      const existence = checkImageExistence(basename, optimizedFiles, imagesFiles);
      if (existence.exists && existence.location === 'optimized') {
        console.log(`  ${ref}`);
        console.log(`    → /optimized/${existence.file}`);
      } else if (existence.exists && existence.location === 'images') {
        console.log(`  ${ref}`);
        console.log(`    ⚠️  Only exists in /images/`);
      } else {
        console.log(`  ${ref}`);
        console.log(`    🚨 MISSING!`);
      }
    });
  }
  
  // Cross-locale mismatches
  if (Object.keys(results.mismatches).length > 0) {
    console.log('\n🌍 CROSS-LOCALE MISMATCHES (EN = Golden Standard)');
    console.log('-'.repeat(50));
    
    for (const [slug, mismatches] of Object.entries(results.mismatches)) {
      const enImgs = (results.byPost[slug].en || []).map(i => getImageBasename(i.path));
      console.log(`\n📄 ${slug}`);
      console.log(`   EN: ${enImgs.join(', ') || '(none)'}`);
      
      for (const m of mismatches) {
        const missing = m.missing.map(i => getImageBasename(i.path));
        const extra = m.extra.map(i => getImageBasename(i.path));
        console.log(`   ${m.locale.toUpperCase()}:`);
        if (missing.length > 0) console.log(`     Missing: ${missing.join(', ')}`);
        if (extra.length > 0) console.log(`     Extra: ${extra.join(', ')}`);
      }
    }
  }
  
  // Golden Standard
  console.log('\n👑 GOLDEN STANDARD (EN Version Image Mapping)');
  console.log('-'.repeat(50));
  console.log('EN version images by post:\n');
  
  const sortedPosts = Object.keys(results.byPost).sort();
  for (const slug of sortedPosts) {
    const enImages = results.byPost[slug].en || [];
    if (enImages.length > 0) {
      console.log(`${slug}:`);
      enImages.forEach(img => {
        const basename = getImageBasename(img.path);
        const existence = checkImageExistence(basename, optimizedFiles, imagesFiles);
        const status = existence.exists 
          ? (existence.location === 'optimized' ? '✅' : '⚠️ ')
          : '🚨';
        console.log(`  ${status} [${img.type}] ${img.path}`);
      });
    }
  }
  
  // Recommended mappings
  console.log('\n📝 RECOMMENDED LEGACY TO OPTIMIZED MAPPINGS');
  console.log('-'.repeat(50));
  const mappings = [];
  
  for (const ref of results.legacyReferences) {
    const basename = getImageBasename(ref);
    const existence = checkImageExistence(basename, optimizedFiles, imagesFiles);
    
    if (existence.exists && existence.location === 'optimized') {
      mappings.push({ from: ref, to: `/optimized/${existence.file}`, priority: 'HIGH' });
    } else if (existence.exists && existence.location === 'images') {
      mappings.push({ from: ref, to: null, priority: 'MEDIUM', note: 'Needs optimization' });
    } else {
      mappings.push({ from: ref, to: null, priority: 'CRITICAL', note: 'Create missing image' });
    }
  }
  
  const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2 };
  mappings.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  for (const m of mappings) {
    console.log(`\n[${m.priority}] ${m.from}`);
    console.log(`    → ${m.to || m.note}`);
  }
  
  // Priority fix list
  console.log('\n🔧 PRIORITY FIX LIST');
  console.log('-'.repeat(50));
  console.log(`1. CRITICAL: Create ${results.missing.size} missing images`);
  console.log(`2. HIGH: Migrate ${results.legacyReferences.size} legacy references to /optimized/`);
  console.log(`3. MEDIUM: Optimize ${results.inImages.size} images still in /images/`);
  console.log(`4. LOW: Fix ${Object.keys(results.mismatches).length} cross-locale mismatches`);
  
  // Save JSON report
  const jsonReport = {
    summary: {
      totalReferences: results.allReferences.size,
      inOptimized: results.inOptimized.size,
      inImages: results.inImages.size,
      missing: results.missing.size,
      legacyReferences: results.legacyReferences.size,
      mismatchedPosts: Object.keys(results.mismatches).length,
      parseErrors: errors.length
    },
    byLocale: {
      en: [...results.byLocale.en],
      fr: [...results.byLocale.fr],
      zh: [...results.byLocale.zh],
      es: [...results.byLocale.es]
    },
    missing: [...results.missing].sort(),
    legacyReferences: [...results.legacyReferences].sort(),
    mismatches: results.mismatches,
    goldenStandard: Object.fromEntries(
      sortedPosts.map(slug => [slug, results.byPost[slug]])
    ),
    recommendedMappings: mappings,
    parseErrors: errors
  };
  
  fs.writeFileSync('blog_image_audit_report.json', JSON.stringify(jsonReport, null, 2));
  console.log('\n💾 Detailed JSON report saved to: blog_image_audit_report.json');
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ Audit complete!');
  console.log('='.repeat(80));
}

runAudit();
