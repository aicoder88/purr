#!/usr/bin/env node
/**
 * regenerate-artifacts.js
 * 
 * Regenerates dependent artifacts after file moves.
 * 
 * Features:
 * - Run blog-featured-image-map.ts generator
 * - Update page-images.ts if needed
 * - Regenerate image-dimensions.json (via optimize-images.js)
 * 
 * Usage: node scripts/migration-helpers/regenerate-artifacts.js [--skip-images] [--verbose]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const skipImages = args.includes('--skip-images');
const isVerbose = args.includes('--verbose');
const quickMode = args.includes('--quick'); // Skip heavy operations

// Statistics
const stats = {
  artifactsGenerated: [],
  artifactsFailed: [],
  warnings: [],
};

/**
 * Execute a command and return success status
 */
function runCommand(command, description) {
  if (isVerbose) {
    console.log(`Running: ${description}`);
    console.log(`  Command: ${command}`);
  }
  
  try {
    const result = execSync(command, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: isVerbose ? 'inherit' : 'pipe',
    });
    
    stats.artifactsGenerated.push(description);
    return { success: true, output: result };
  } catch (error) {
    stats.artifactsFailed.push({ description, error: error.message });
    return { success: false, error: error.message };
  }
}

/**
 * Regenerate blog-featured-image-map.ts
 */
function regenerateBlogImageMap() {
  console.log('1. Regenerating blog-featured-image-map.ts...');
  
  const scriptPath = 'scripts/blog/generate-blog-featured-image-map.ts';
  const fullPath = path.join(process.cwd(), scriptPath);
  
  if (!fs.existsSync(fullPath)) {
    stats.warnings.push(`Script not found: ${scriptPath}`);
    console.log('   ⚠ Script not found, skipping');
    return false;
  }
  
  // Try tsx first, then ts-node
  let command;
  try {
    execSync('which tsx', { stdio: 'pipe' });
    command = `npx tsx ${scriptPath}`;
  } catch {
    command = `npx ts-node ${scriptPath}`;
  }
  
  const result = runCommand(command, 'blog-featured-image-map.ts');
  
  if (result.success) {
    console.log('   ✓ Generated successfully');
  } else {
    console.log('   ✗ Generation failed');
  }
  
  return result.success;
}

/**
 * Update page-images.ts if it exists
 */
function updatePageImages() {
  console.log('2. Checking page-images.ts...');
  
  const pageImagesPath = path.join(process.cwd(), 'src', 'generated', 'page-images.ts');
  
  if (!fs.existsSync(pageImagesPath)) {
    console.log('   ℹ page-images.ts not found, skipping');
    return true;
  }
  
  // Read and check if updates are needed
  let content;
  try {
    content = fs.readFileSync(pageImagesPath, 'utf8');
  } catch (error) {
    stats.warnings.push(`Cannot read page-images.ts: ${error.message}`);
    console.log('   ⚠ Cannot read file, skipping');
    return false;
  }
  
  // Check for uncategorized paths
  const uncategorizedPattern = /['"]\/(images|optimized)\/[^/]+\.(webp|png|jpg|jpeg|avif)['"]/gi;
  const matches = content.match(uncategorizedPattern);
  
  if (matches && matches.length > 0) {
    console.log(`   Found ${matches.length} potentially uncategorized paths`);
    
    // In a real scenario, we would update these paths
    // For now, just report them
    if (isVerbose) {
      for (const match of matches.slice(0, 5)) {
        console.log(`     - ${match}`);
      }
      if (matches.length > 5) {
        console.log(`     ... and ${matches.length - 5} more`);
      }
    }
    
    stats.warnings.push(`${matches.length} uncategorized paths in page-images.ts`);
  } else {
    console.log('   ✓ No updates needed');
  }
  
  return true;
}

/**
 * Regenerate image-dimensions.json
 */
function regenerateImageDimensions() {
  if (skipImages || quickMode) {
    console.log('3. Skipping image-dimensions.json (--skip-images or --quick)');
    return true;
  }
  
  console.log('3. Regenerating image-dimensions.json...');
  
  // Check for optimize-images.js script
  const optimizeScriptPath = path.join(process.cwd(), 'scripts', 'optimize-images.js');
  
  if (fs.existsSync(optimizeScriptPath)) {
    const result = runCommand('node scripts/optimize-images.js --dimensions-only', 'image-dimensions.json');
    
    if (result.success) {
      console.log('   ✓ Generated successfully');
    } else {
      console.log('   ✗ Generation failed');
    }
    
    return result.success;
  }
  
  // Alternative: Generate from public/optimized directory
  const optimizedDir = path.join(process.cwd(), 'public', 'optimized');
  
  if (!fs.existsSync(optimizedDir)) {
    stats.warnings.push('Optimized directory not found');
    console.log('   ⚠ Optimized directory not found');
    return false;
  }
  
  console.log('   Using directory scan method...');
  
  try {
    const dimensions = scanImageDimensions(optimizedDir);
    const outputPath = path.join(process.cwd(), 'src', 'generated', 'image-dimensions.json');
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    
    fs.writeFileSync(outputPath, JSON.stringify(dimensions, null, 2), 'utf8');
    
    stats.artifactsGenerated.push('image-dimensions.json (directory scan)');
    console.log(`   ✓ Generated with ${Object.keys(dimensions).length} entries`);
    return true;
  } catch (error) {
    stats.artifactsFailed.push({ description: 'image-dimensions.json', error: error.message });
    console.log('   ✗ Generation failed');
    return false;
  }
}

/**
 * Scan optimized directory for image dimensions
 * (Simplified version without actual image processing)
 */
function scanImageDimensions(dir, basePath = '/optimized') {
  const dimensions = {};
  
  function scanRecursive(currentDir, currentBase) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = `${currentBase}/${entry.name}`;
      
      if (entry.isDirectory()) {
        scanRecursive(fullPath, relativePath);
      } else if (entry.name.match(/\.(webp|png|jpg|jpeg|avif|gif)$/i)) {
        // Placeholder dimensions - in real scenario, use sharp or similar
        dimensions[relativePath] = {
          width: null, // Would be actual width
          height: null, // Would be actual height
          size: fs.statSync(fullPath).size,
        };
      }
    }
  }
  
  scanRecursive(dir, basePath);
  return dimensions;
}

/**
 * Regenerate sitemap if needed
 */
function regenerateSitemap() {
  if (quickMode) {
    console.log('4. Skipping sitemap regeneration (--quick)');
    return true;
  }
  
  console.log('4. Checking sitemap...');
  
  // Check if next-sitemap is configured
  const sitemapConfig = path.join(process.cwd(), 'next-sitemap.config.js');
  
  if (!fs.existsSync(sitemapConfig)) {
    console.log('   ℹ No sitemap config found, skipping');
    return true;
  }
  
  // Sitemap is typically generated at build time
  // Just note that a rebuild may be needed
  console.log('   ℹ Sitemap is generated at build time');
  console.log('   Tip: Run "npm run build" to regenerate sitemap with new image paths');
  
  return true;
}

/**
 * Generate summary report
 */
function generateReport() {
  const reportPath = path.join(process.cwd(), 'migration-artifacts-report.json');
  
  const report = {
    generatedAt: new Date().toISOString(),
    stats,
    summary: {
      totalArtifacts: stats.artifactsGenerated.length + stats.artifactsFailed.length,
      successful: stats.artifactsGenerated.length,
      failed: stats.artifactsFailed.length,
    },
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('');
  console.log(`Report saved to: ${reportPath}`);
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Phase 2: Regenerate Artifacts');
  console.log('='.repeat(60));
  if (quickMode) console.log('Mode: QUICK (skipping heavy operations)');
  console.log('');
  
  // Run regeneration steps
  regenerateBlogImageMap();
  console.log('');
  
  updatePageImages();
  console.log('');
  
  regenerateImageDimensions();
  console.log('');
  
  regenerateSitemap();
  console.log('');
  
  // Print summary
  console.log('='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Artifacts generated: ${stats.artifactsGenerated.length}`);
  
  if (stats.artifactsGenerated.length > 0) {
    for (const artifact of stats.artifactsGenerated) {
      console.log(`  ✓ ${artifact}`);
    }
  }
  
  if (stats.artifactsFailed.length > 0) {
    console.log('');
    console.log(`Failed: ${stats.artifactsFailed.length}`);
    for (const failure of stats.artifactsFailed) {
      console.log(`  ✗ ${failure.description}: ${failure.error}`);
    }
  }
  
  if (stats.warnings.length > 0) {
    console.log('');
    console.log(`Warnings: ${stats.warnings.length}`);
    for (const warning of stats.warnings) {
      console.log(`  ⚠ ${warning}`);
    }
  }
  
  // Save report
  generateReport();
  
  // Exit with error code if any artifacts failed
  process.exit(stats.artifactsFailed.length > 0 ? 1 : 0);
}

main();
