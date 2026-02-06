#!/usr/bin/env node
/**
 * Image Reference Validator and Fixer
 * Scans all source files for image references and checks if they exist.
 * Can auto-fix common issues like underscore/hyphen mismatches.
 * 
 * Usage:
 *   node scripts/find-fix-broken-images.js          # Just report issues
 *   node scripts/find-fix-broken-images.js --fix    # Auto-fix common issues
 *   node scripts/find-fix-broken-images.js --json   # Output JSON for CI
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceDirs: ['app', 'src', 'pages', 'components'],
  imageRoot: 'public/optimized',
  extensions: ['.tsx', '.ts', '.jsx', '.js'],
  imageExtensions: ['.webp', '.avif', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
};

// Parse CLI args
const shouldFix = process.argv.includes('--fix');
const jsonOutput = process.argv.includes('--json');
const verbose = process.argv.includes('--verbose');

// Stats
const stats = {
  filesScanned: 0,
  imagesFound: 0,
  brokenReferences: [],
  autoFixed: [],
  skipped: [],
};

// Get all existing images
function getExistingImages() {
  const imageDir = path.resolve(CONFIG.imageRoot);
  if (!fs.existsSync(imageDir)) {
    console.error(`Image directory not found: ${imageDir}`);
    process.exit(1);
  }
  
  const images = new Map(); // normalized name -> actual filename
  const files = fs.readdirSync(imageDir);
  
  for (const file of files) {
    const normalized = normalizeFilename(file);
    images.set(normalized, file);
    // Also store with extension stripped for fuzzy matching
    const withoutExt = normalized.replace(/\.[a-z0-9]+$/, '');
    images.set(withoutExt, file);
  }
  
  return images;
}

// Normalize filename for comparison
function normalizeFilename(filename) {
  return filename.toLowerCase()
    .replace(/_/g, '-')      // underscores to hyphens
    .replace(/\s+/g, '-')     // spaces to hyphens
    .replace(/-+/g, '-');     // collapse multiple hyphens
}

// Find similar image names
function findSimilarImages(basename, existingImages) {
  const normalized = normalizeFilename(basename);
  const withoutExt = normalized.replace(/\.[a-z0-9]+$/, '');
  const matches = [];
  
  for (const [key, actualFile] of existingImages.entries()) {
    // Exact match
    if (key === normalized || key === withoutExt) {
      matches.push({ type: 'exact', file: actualFile });
      continue;
    }
    
    // Fuzzy match: starts with same name
    if (key.startsWith(withoutExt) || withoutExt.startsWith(key.replace(/\.[a-z0-9]+$/, ''))) {
      matches.push({ type: 'similar', file: actualFile, score: 0.8 });
    }
  }
  
  // Remove duplicates
  return matches.filter((m, i, arr) => arr.findIndex(t => t.file === m.file) === i);
}

// Extract image references from file content
function extractImageReferences(content, filePath) {
  const references = [];
  const lines = content.split('\n');
  
  // Patterns to match various image reference styles
  const patterns = [
    // src="/optimized/filename.webp"
    { regex: /src\s*=\s*["'](\/optimized\/[^"']+)["']/g, type: 'src' },
    // src: '/optimized/filename.webp'
    { regex: /src\s*:\s*["'](\/optimized\/[^"']+)["']/g, type: 'src-colon' },
    // "/optimized/filename.webp" in arrays/objects
    { regex: /["'](\/optimized\/[^"']+\.(?:webp|avif|png|jpg|jpeg|gif|svg))["']/g, type: 'string' },
  ];
  
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    
    for (const { regex, type } of patterns) {
      let match;
      regex.lastIndex = 0; // Reset regex
      
      while ((match = regex.exec(line)) !== null) {
        const fullPath = match[1];
        const basename = path.basename(fullPath);
        
        references.push({
          line: lineNum + 1,
          column: match.index + 1,
          fullPath,
          basename,
          original: match[0],
          lineContent: line.trim(),
        });
      }
    }
  }
  
  return references;
}

// Scan a single file
function scanFile(filePath, existingImages) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const references = extractImageReferences(content, filePath);
  const issues = [];
  
  for (const ref of references) {
    stats.imagesFound++;
    
    // Check if image exists
    const exists = fs.existsSync(path.join('public', ref.fullPath));
    if (exists) continue;
    
    // Image doesn't exist - try to find similar
    const similar = findSimilarImages(ref.basename, existingImages);
    const exactMatch = similar.find(s => s.type === 'exact');
    
    const issue = {
      file: filePath,
      line: ref.line,
      column: ref.column,
      referenced: ref.fullPath,
      basename: ref.basename,
      lineContent: ref.lineContent,
      suggestions: similar.map(s => s.file),
      autoFixable: !!exactMatch,
      fixTo: exactMatch ? `/optimized/${exactMatch.file}` : null,
    };
    
    issues.push(issue);
    
    if (exactMatch && shouldFix) {
      // Perform auto-fix
      const fixed = autoFixFile(filePath, ref, issue.fixTo);
      if (fixed) {
        stats.autoFixed.push({
          file: filePath,
          from: ref.fullPath,
          to: issue.fixTo,
        });
      }
    }
  }
  
  return issues;
}

// Auto-fix a file
function autoFixFile(filePath, ref, newPath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const line = lines[ref.line - 1];
    
    // Replace the broken reference with the correct one
    // Use regex to ensure we only replace the exact reference
    const escapedRef = ref.fullPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedRef, 'g');
    
    if (!line.includes(ref.fullPath)) {
      // Try to find partial match
      const basename = path.basename(ref.fullPath);
      if (line.includes(basename)) {
        lines[ref.line - 1] = line.replace(basename, path.basename(newPath));
      } else {
        return false;
      }
    } else {
      lines[ref.line - 1] = line.replace(regex, newPath);
    }
    
    fs.writeFileSync(filePath, lines.join('\n'));
    return true;
  } catch (err) {
    console.error(`Failed to fix ${filePath}: ${err.message}`);
    return false;
  }
}

// Recursively get all source files
function getSourceFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      getSourceFiles(fullPath, files);
    } else if (stat.isFile() && CONFIG.extensions.includes(path.extname(item))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
function main() {
  const existingImages = getExistingImages();
  
  if (!jsonOutput) {
    console.log(`📁 Found ${existingImages.size / 2} unique images in ${CONFIG.imageRoot}`);
    console.log('🔍 Scanning source files...\n');
  }
  
  // Collect all source files
  const sourceFiles = [];
  for (const dir of CONFIG.sourceDirs) {
    sourceFiles.push(...getSourceFiles(dir));
  }
  
  stats.filesScanned = sourceFiles.length;
  
  // Scan each file
  const allIssues = [];
  for (const file of sourceFiles) {
    const issues = scanFile(file, existingImages);
    allIssues.push(...issues);
  }
  
  stats.brokenReferences = allIssues;
  
  // Output results
  if (jsonOutput) {
    console.log(JSON.stringify(stats, null, 2));
    process.exit(allIssues.length > 0 ? 1 : 0);
  }
  
  // Human-readable output
  if (allIssues.length === 0) {
    console.log('✅ All image references are valid!');
    if (stats.autoFixed.length > 0) {
      console.log(`\n🔧 Auto-fixed ${stats.autoFixed.length} issues:`);
      for (const fix of stats.autoFixed) {
        console.log(`   ${fix.file}: ${fix.from} → ${fix.to}`);
      }
    }
    process.exit(0);
  }
  
  console.log(`❌ Found ${allIssues.length} broken image reference(s):\n`);
  
  // Group by file
  const byFile = {};
  for (const issue of allIssues) {
    if (!byFile[issue.file]) byFile[issue.file] = [];
    byFile[issue.file].push(issue);
  }
  
  for (const [file, issues] of Object.entries(byFile)) {
    console.log(`\n📄 ${file}`);
    console.log('─'.repeat(60));
    
    for (const issue of issues) {
      const status = issue.autoFixable ? (shouldFix ? '✅ FIXED' : '🔧 AUTO-FIXABLE') : '❌';
      console.log(`\n   Line ${issue.line}: ${status}`);
      console.log(`   Reference: ${issue.referenced}`);
      
      if (issue.suggestions.length > 0) {
        console.log(`   Suggestions:`);
        for (const suggestion of issue.suggestions.slice(0, 3)) {
          console.log(`     • /optimized/${suggestion}`);
        }
      } else {
        console.log(`   ⚠️  No similar images found`);
      }
      
      if (verbose) {
        console.log(`   Code: ${issue.lineContent.substring(0, 80)}...`);
      }
    }
  }
  
  console.log(`\n\n📊 Summary:`);
  console.log(`   Files scanned: ${stats.filesScanned}`);
  console.log(`   Image references: ${stats.imagesFound}`);
  console.log(`   Broken references: ${allIssues.length}`);
  console.log(`   Auto-fixable: ${allIssues.filter(i => i.autoFixable).length}`);
  
  if (stats.autoFixed.length > 0) {
    console.log(`   Fixed: ${stats.autoFixed.length}`);
  }
  
  if (!shouldFix && allIssues.some(i => i.autoFixable)) {
    console.log(`\n💡 Run with --fix to auto-fix ${allIssues.filter(i => i.autoFixable).length} issue(s)`);
  }
  
  process.exit(allIssues.length > 0 ? 1 : 0);
}

main();
