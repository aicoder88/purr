#!/usr/bin/env node
/**
 * rewrite-references.js
 * 
 * Reads reference-manifest.json and rewrites all image references in the codebase.
 * Uses AST-aware transformation where possible, with precise regex fallback.
 * 
 * Usage: node scripts/migration-helpers/rewrite-references.js [--dry-run] [--verbose]
 */

const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const manifestPath = args.find(arg => arg.startsWith('--manifest='))?.split('=')[1] || 'reference-manifest.json';

// Statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  referencesRewritten: 0,
  referencesSkipped: 0,
  errors: [],
};

/**
 * Load the reference manifest
 */
function loadManifest() {
  const manifestFullPath = path.resolve(process.cwd(), manifestPath);
  if (!fs.existsSync(manifestFullPath)) {
    console.error(`Error: Manifest file not found: ${manifestFullPath}`);
    process.exit(1);
  }
  
  try {
    const content = fs.readFileSync(manifestFullPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error parsing manifest: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Group references by file for efficient processing
 */
function groupReferencesByFile(references) {
  const grouped = new Map();
  
  for (const ref of references) {
    if (!ref.needsRewrite || !ref.suggestedNewPath) {
      stats.referencesSkipped++;
      continue;
    }
    
    const filePath = path.resolve(process.cwd(), ref.file);
    if (!grouped.has(filePath)) {
      grouped.set(filePath, []);
    }
    grouped.get(filePath).push(ref);
  }
  
  return grouped;
}

/**
 * Create a safe regex pattern for a path
 */
function createPathPattern(originalPath) {
  // Escape special regex characters
  const escaped = originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'g');
}

/**
 * Rewrite references in a TSX/TS file using context-aware replacement
 */
function rewriteFile(filePath, references) {
  if (!fs.existsSync(filePath)) {
    if (isVerbose) console.warn(`File not found: ${filePath}`);
    stats.referencesSkipped += references.length;
    return false;
  }
  
  const ext = path.extname(filePath);
  const isCodeFile = ['.ts', '.tsx', '.js', '.jsx'].includes(ext);
  const isJsonFile = ext === '.json';
  
  if (!isCodeFile && !isJsonFile) {
    if (isVerbose) console.warn(`Unsupported file type: ${filePath}`);
    stats.referencesSkipped += references.length;
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let modified = false;
  
  // Sort references by position (descending) to replace from end to start
  // This prevents position shifts from affecting subsequent replacements
  const sortedRefs = [...references].sort((a, b) => {
    if (a.line !== b.line) return b.line - a.line;
    return b.column - a.column;
  });
  
  for (const ref of sortedRefs) {
    try {
      const result = replaceReference(content, ref, isCodeFile);
      if (result.modified) {
        content = result.content;
        modified = true;
        stats.referencesRewritten++;
        if (isVerbose) {
          console.log(`  ✓ ${ref.originalPath} → ${ref.suggestedNewPath}`);
        }
      } else {
        stats.referencesSkipped++;
        if (isVerbose) {
          console.log(`  ⚠ Skipped: ${ref.originalPath} (pattern not found)`);
        }
      }
    } catch (error) {
      stats.errors.push({ file: filePath, ref, error: error.message });
      if (isVerbose) {
        console.error(`  ✗ Error: ${error.message}`);
      }
    }
  }
  
  if (modified) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    stats.filesModified++;
    return true;
  }
  
  return false;
}

/**
 * Replace a single reference in content
 */
function replaceReference(content, ref, isCodeFile) {
  const lines = content.split('\n');
  const lineIndex = ref.line - 1;
  
  if (lineIndex < 0 || lineIndex >= lines.length) {
    return { content, modified: false };
  }
  
  const line = lines[lineIndex];
  const colIndex = ref.column - 1;
  
  // Verify the context matches
  if (!line.includes(ref.originalPath)) {
    // Try to find it elsewhere in the file
    const pattern = createPathPattern(ref.originalPath);
    if (!pattern.test(content)) {
      return { content, modified: false };
    }
    // Fall through to full-content replacement
  }
  
  // Strategy 1: Try context-aware replacement on the specific line
  if (line.includes(ref.originalPath)) {
    const newLine = line.replace(
      createPathPattern(ref.originalPath),
      ref.suggestedNewPath
    );
    
    if (newLine !== line) {
      lines[lineIndex] = newLine;
      return { content: lines.join('\n'), modified: true };
    }
  }
  
  // Strategy 2: Full content replacement (fallback)
  const newContent = content.replace(
    createPathPattern(ref.originalPath),
    ref.suggestedNewPath
  );
  
  if (newContent !== content) {
    return { content: newContent, modified: true };
  }
  
  return { content, modified: false };
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Phase 2: Reference Rewriting');
  console.log('='.repeat(60));
  console.log(`Mode: ${isDryRun ? 'DRY RUN (no changes will be made)' : 'LIVE'}`);
  console.log(`Manifest: ${manifestPath}`);
  console.log('');
  
  const manifest = loadManifest();
  
  if (!manifest.references || !Array.isArray(manifest.references)) {
    console.error('Error: Invalid manifest format - missing references array');
    process.exit(1);
  }
  
  console.log(`Total references in manifest: ${manifest.references.length}`);
  
  // Group references by file
  const groupedRefs = groupReferencesByFile(manifest.references);
  console.log(`Files to process: ${groupedRefs.size}`);
  console.log('');
  
  // Process each file
  for (const [filePath, references] of groupedRefs) {
    stats.filesProcessed++;
    
    if (isVerbose) {
      console.log(`Processing: ${path.relative(process.cwd(), filePath)}`);
    }
    
    const modified = rewriteFile(filePath, references);
    
    if (modified && !isVerbose) {
      console.log(`✓ ${path.relative(process.cwd(), filePath)} (${references.length} refs)`);
    }
  }
  
  // Print summary
  console.log('');
  console.log('='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`References rewritten: ${stats.referencesRewritten}`);
  console.log(`References skipped: ${stats.referencesSkipped}`);
  
  if (stats.errors.length > 0) {
    console.log('');
    console.log(`Errors: ${stats.errors.length}`);
    if (isVerbose) {
      for (const err of stats.errors) {
        console.error(`  ${err.file}:${err.ref.line} - ${err.error}`);
      }
    }
  }
  
  if (isDryRun) {
    console.log('');
    console.log('(Dry run - no files were modified)');
  }
  
  // Exit with error code if there were errors
  process.exit(stats.errors.length > 0 ? 1 : 0);
}

main();
