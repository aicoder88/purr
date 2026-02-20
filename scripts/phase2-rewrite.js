#!/usr/bin/env node
/**
 * Phase 2: Image Reference Rewrite Script
 * 
 * Rewrites all image references in the codebase from old paths to new categorized paths.
 * Uses reference-manifest.json for accurate file/line/column targeting.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const REFERENCE_MANIFEST = path.join(__dirname, '..', 'reference-manifest.json');
const MIGRATION_MANIFEST = path.join(__dirname, '..', 'migration-manifest.json');
const REPORT_PATH = path.join(__dirname, '..', 'phase2-report.json');

// Statistics tracking
const stats = {
  phase: "2",
  completedAt: null,
  filesModified: 0,
  referencesRewritten: 0,
  byCategory: {
    logos: 0,
    products: 0,
    team: 0,
    icons: 0,
    locations: 0,
    stores: 0,
    marketing: 0,
    blog: 0,
    misc: 0
  },
  errors: []
};

// Load JSON file safely
function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error.message);
    process.exit(1);
  }
}

// Build path mapping from migration manifest
function buildPathMap(migrationManifest) {
  const pathMap = new Map();
  
  for (const file of migrationManifest.files) {
    // Map from old web path to new web path
    // Source path: public/images/... or public/optimized/...
    // Target path: public/optimized/<category>/...
    
    const filename = file.filename;
    const category = file.category;
    
    // Build various old paths that might be referenced
    const oldPaths = [
      `/images/${filename}`,
      `/optimized/${filename}`,
      `/images/Logos/${filename}`,
      `/images/team/${filename}`,
      `/images/locations/provinces/${filename}`,
      `/images/products/${filename}`,
      `/images/pitchdeck/${filename}`
    ];
    
    // New path is always /optimized/<category>/<filename>
    const newPath = `/optimized/${category}/${filename}`;
    
    for (const oldPath of oldPaths) {
      if (!pathMap.has(oldPath)) {
        pathMap.set(oldPath, newPath);
      }
    }
    
    // Also handle full URL variants
    const baseUrl = 'https://www.purrify.ca';
    for (const oldPath of oldPaths) {
      pathMap.set(`${baseUrl}${oldPath}`, `${baseUrl}${newPath}`);
    }
  }
  
  return pathMap;
}

// Extract category from new path for statistics
function getCategoryFromPath(newPath) {
  const match = newPath.match(/\/optimized\/(\w+)\//);
  return match ? match[1] : 'misc';
}

// Group references by file
function groupByFile(references) {
  const groups = new Map();
  
  for (const ref of references) {
    if (!ref.needsRewrite) continue;
    
    const filePath = ref.file;
    if (!groups.has(filePath)) {
      groups.set(filePath, []);
    }
    groups.get(filePath).push(ref);
  }
  
  return groups;
}

// Sort references by position (line descending, then column descending)
// This allows us to replace from end to start without position shifts
function sortReferencesByPosition(refs) {
  return refs.sort((a, b) => {
    if (b.line !== a.line) {
      return b.line - a.line; // Descending line
    }
    return b.column - a.column; // Descending column
  });
}

// Perform string replacement at specific position
function replaceAtPosition(content, oldPath, newPath, line, column) {
  const lines = content.split('\n');
  
  if (line < 1 || line > lines.length) {
    throw new Error(`Line ${line} out of range (1-${lines.length})`);
  }
  
  const lineIndex = line - 1;
  const lineContent = lines[lineIndex];
  
  if (column < 1 || column > lineContent.length) {
    throw new Error(`Column ${column} out of range (1-${lineContent.length}) on line ${line}`);
  }
  
  const columnIndex = column - 1;
  
  // Check if the old path exists at this position
  const actualText = lineContent.substring(columnIndex, columnIndex + oldPath.length);
  if (actualText !== oldPath) {
    // Try to find the path nearby (within 5 chars)
    const searchStart = Math.max(0, columnIndex - 5);
    const searchEnd = Math.min(lineContent.length, columnIndex + oldPath.length + 5);
    const nearbyText = lineContent.substring(searchStart, searchEnd);
    
    if (nearbyText.includes(oldPath)) {
      // Found nearby, adjust column
      const adjustedColumn = lineContent.indexOf(oldPath, searchStart);
      lines[lineIndex] = lineContent.substring(0, adjustedColumn) + 
                         newPath + 
                         lineContent.substring(adjustedColumn + oldPath.length);
      return lines.join('\n');
    }
    
    throw new Error(`Path mismatch at line ${line}, col ${column}. Expected "${oldPath}", found "${actualText}". Context: "${lineContent.substring(Math.max(0, columnIndex - 20), columnIndex + oldPath.length + 20)}"`);
  }
  
  lines[lineIndex] = lineContent.substring(0, columnIndex) + 
                     newPath + 
                     lineContent.substring(columnIndex + oldPath.length);
  
  return lines.join('\n');
}

// Simple string replacement as fallback
function simpleReplace(content, oldPath, newPath) {
  // Escape special regex characters
  const escaped = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  return content.replace(regex, newPath);
}

// Process a single file
function processFile(filePath, references, pathMap) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    stats.errors.push({
      file: filePath,
      error: 'File not found'
    });
    return 0;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalContent = content;
  let rewriteCount = 0;
  
  // Sort references by position for end-to-start replacement
  const sortedRefs = sortReferencesByPosition([...references]);
  
  for (const ref of sortedRefs) {
    const { originalPath, suggestedNewPath, line, column } = ref;
    
    // Determine the new path
    let newPath = suggestedNewPath;
    if (!newPath) {
      newPath = pathMap.get(originalPath);
    }
    
    if (!newPath) {
      // Try to determine from context
      console.warn(`  Warning: No mapping for "${originalPath}" in ${filePath}:${line}:${column}`);
      continue;
    }
    
    try {
      // Try position-based replacement first
      content = replaceAtPosition(content, originalPath, newPath, line, column);
      rewriteCount++;
      
      // Update category stats
      const category = getCategoryFromPath(newPath);
      if (stats.byCategory[category] !== undefined) {
        stats.byCategory[category]++;
      }
    } catch (error) {
      // Fall back to simple replacement
      console.warn(`  Position-based replace failed, using fallback: ${error.message}`);
      const newContent = simpleReplace(content, originalPath, newPath);
      if (newContent !== content) {
        content = newContent;
        rewriteCount++;
        
        const category = getCategoryFromPath(newPath);
        if (stats.byCategory[category] !== undefined) {
          stats.byCategory[category]++;
        }
      } else {
        stats.errors.push({
          file: filePath,
          line,
          column,
          originalPath,
          error: error.message
        });
      }
    }
  }
  
  // Write back if changed
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    return rewriteCount;
  }
  
  return 0;
}

// Process JSON files with special handling
function processJsonFile(filePath, references, pathMap) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    stats.errors.push({
      file: filePath,
      error: 'File not found'
    });
    return 0;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalContent = content;
  let rewriteCount = 0;
  
  for (const ref of references) {
    if (!ref.needsRewrite) continue;
    
    const { originalPath, suggestedNewPath } = ref;
    
    let newPath = suggestedNewPath;
    if (!newPath) {
      newPath = pathMap.get(originalPath);
    }
    
    if (!newPath) continue;
    
    // Handle escaped backslashes in JSON content
    const escapedOldPath = originalPath.replace(/\\/g, '');
    const escapedNewPath = newPath.replace(/\\/g, '');
    
    // Try both escaped and unescaped versions
    const variations = [
      originalPath,
      escapedOldPath,
      originalPath.replace(/\\/g, '\\\\'),
      originalPath.replace(/\//g, '\\/'),
    ];
    
    let replaced = false;
    for (const oldVariation of variations) {
      if (content.includes(oldVariation)) {
        content = content.split(oldVariation).join(newPath);
        replaced = true;
      }
    }
    
    // Also try with URL encoding variations
    const newContent = simpleReplace(content, originalPath, newPath);
    if (newContent !== content) {
      content = newContent;
      replaced = true;
    }
    
    if (replaced) {
      rewriteCount++;
      const category = getCategoryFromPath(newPath);
      if (stats.byCategory[category] !== undefined) {
        stats.byCategory[category]++;
      }
    }
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    return rewriteCount;
  }
  
  return 0;
}

// Main execution
function main() {
  console.log('=== Phase 2: Image Reference Migration ===\n');
  
  // Load manifests
  console.log('Loading manifests...');
  const referenceManifest = loadJson(REFERENCE_MANIFEST);
  const migrationManifest = loadJson(MIGRATION_MANIFEST);
  
  // Build path mapping
  console.log('Building path mapping...');
  const pathMap = buildPathMap(migrationManifest);
  console.log(`  Mapped ${pathMap.size} path variations\n`);
  
  // Group references by file
  console.log('Grouping references by file...');
  const fileGroups = groupByFile(referenceManifest.references);
  console.log(`  Found ${fileGroups.size} files to process\n`);
  
  // Process each file
  console.log('Processing files...\n');
  
  let fileCount = 0;
  for (const [filePath, references] of fileGroups) {
    fileCount++;
    const isJson = filePath.endsWith('.json');
    
    process.stdout.write(`[${fileCount}/${fileGroups.size}] ${filePath}... `);
    
    try {
      const count = isJson 
        ? processJsonFile(filePath, references, pathMap)
        : processFile(filePath, references, pathMap);
      
      if (count > 0) {
        stats.filesModified++;
        stats.referencesRewritten += count;
        process.stdout.write(`✓ (${count} rewrites)\n`);
      } else {
        process.stdout.write(`(no changes)\n`);
      }
    } catch (error) {
      process.stdout.write(`✗ ERROR\n`);
      stats.errors.push({
        file: filePath,
        error: error.message
      });
    }
  }
  
  // Save report
  stats.completedAt = new Date().toISOString();
  fs.writeFileSync(REPORT_PATH, JSON.stringify(stats, null, 2));
  
  // Print summary
  console.log('\n=== Migration Summary ===');
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`References rewritten: ${stats.referencesRewritten}`);
  console.log('\nBy category:');
  for (const [category, count] of Object.entries(stats.byCategory)) {
    if (count > 0) {
      console.log(`  ${category}: ${count}`);
    }
  }
  console.log(`\nErrors: ${stats.errors.length}`);
  if (stats.errors.length > 0) {
    console.log('First 5 errors:');
    for (const err of stats.errors.slice(0, 5)) {
      console.log(`  - ${err.file}: ${err.error}`);
    }
  }
  
  console.log(`\nReport saved to: ${REPORT_PATH}`);
}

main();
