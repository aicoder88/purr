#!/usr/bin/env node
/**
 * Phase 1 Image Migration Script
 * Stages all files to categorized target locations
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MANIFEST_PATH = '/Users/macmini/dev/purr/migration-manifest.json';
const REPORT_PATH = '/Users/macmini/dev/purr/phase1-report.json';
const PUBLIC_DIR = '/Users/macmini/dev/purr/public';

// Categories to ensure exist
const CATEGORIES = [
  'logos',
  'products',
  'stores',
  'team',
  'icons',
  'locations',
  'blog',
  'marketing'
];

// Report structure
const report = {
  phase: '1',
  completedAt: '',
  directoriesCreated: [],
  filesStaged: 0,
  conflictsResolved: [],
  conflictsPending: [],
  errors: []
};

/**
 * Get priority score for a source path (higher = more preferred)
 * Priority: original-images > images > optimized
 */
function getSourcePriority(sourcePath) {
  if (sourcePath.includes('/original-images/')) return 3;
  if (sourcePath.includes('/images/')) return 2;
  if (sourcePath.includes('/optimized/')) return 1;
  return 0;
}

/**
 * Get file modification time
 */
function getFileMtime(sourcePath) {
  try {
    const fullPath = path.join(PUBLIC_DIR, '..', sourcePath);
    const stats = fs.statSync(fullPath);
    return stats.mtime.getTime();
  } catch (_err) {
    return 0;
  }
}

/**
 * Resolve conflict between files targeting same destination
 * Priority: canonical-root > newest mtime > highest resolution (file size as proxy)
 */
function resolveConflict(files) {
  if (files.length === 1) return { winner: files[0], losers: [] };

  // Sort by priority criteria
  const scored = files.map(f => ({
    file: f,
    priority: getSourcePriority(f.sourcePath),
    mtime: getFileMtime(f.sourcePath),
    size: f.size || 0
  }));

  // Sort: priority desc, mtime desc, size desc
  scored.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    if (a.mtime !== b.mtime) return b.mtime - a.mtime;
    return b.size - a.size;
  });

  const winner = scored[0].file;
  const losers = scored.slice(1).map(s => ({
    file: s.file,
    reason: `Lost to ${winner.sourcePath} (priority: ${scored[0].priority} vs ${s.priority}, mtime: ${scored[0].mtime} vs ${s.mtime}, size: ${scored[0].size} vs ${s.size})`
  }));

  return { winner, losers };
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      return true;
    }
  } catch (err) {
    report.errors.push(`Failed to create directory ${dirPath}: ${err.message}`);
  }
  return false;
}

/**
 * Copy file from source to target
 */
function copyFile(sourcePath, targetPath) {
  try {
    const fullSource = path.join(PUBLIC_DIR, '..', sourcePath);
    const fullTarget = path.join(PUBLIC_DIR, '..', targetPath);

    // Ensure target directory exists
    const targetDir = path.dirname(fullTarget);
    ensureDir(targetDir);

    // Copy file
    fs.copyFileSync(fullSource, fullTarget);
    return true;
  } catch (err) {
    report.errors.push(`Failed to copy ${sourcePath} to ${targetPath}: ${err.message}`);
    return false;
  }
}

/**
 * Main migration function
 */
async function runMigration() {
  console.log('Starting Phase 1 migration...');
  const startTime = Date.now();

  // Read manifest
  let manifest;
  try {
    const manifestData = fs.readFileSync(MANIFEST_PATH, 'utf8');
    manifest = JSON.parse(manifestData);
  } catch (err) {
    console.error('Failed to read manifest:', err.message);
    process.exit(1);
  }

  console.log(`Loaded manifest with ${manifest.files.length} files`);

  // Create category directories
  console.log('Creating category directories...');
  for (const category of CATEGORIES) {
    const originalDir = path.join(PUBLIC_DIR, 'original-images', category);
    const optimizedDir = path.join(PUBLIC_DIR, 'optimized', category);

    if (ensureDir(originalDir)) {
      report.directoriesCreated.push(`public/original-images/${category}`);
    }
    if (ensureDir(optimizedDir)) {
      report.directoriesCreated.push(`public/optimized/${category}`);
    }
  }

  // Group files by target original path
  console.log('Grouping files by target path...');
  const targetGroups = new Map();

  for (const file of manifest.files) {
    const targetKey = file.targetOriginalPath;
    if (!targetGroups.has(targetKey)) {
      targetGroups.set(targetKey, []);
    }
    targetGroups.get(targetKey).push(file);
  }

  console.log(`Found ${targetGroups.size} unique target paths`);

  // Process each target group
  console.log('Processing files and resolving conflicts...');
  let processedCount = 0;

  for (const [targetPath, files] of targetGroups) {
    // Resolve conflicts
    const { winner, losers } = resolveConflict(files);

    if (losers.length > 0) {
      report.conflictsResolved.push({
        targetPath,
        winner: winner.sourcePath,
        losers: losers.map(l => ({
          sourcePath: l.file.sourcePath,
          reason: l.reason
        }))
      });
    }

    // Copy winner to target original location
    if (copyFile(winner.sourcePath, winner.targetOriginalPath)) {
      processedCount++;
    }

    // Also copy to optimized target location if different
    if (winner.targetOptimizedPath && winner.targetOptimizedPath !== winner.targetOriginalPath) {
      // For optimized path, we use the same source file (this is staging)
      if (copyFile(winner.sourcePath, winner.targetOptimizedPath)) {
        // Counted as part of same file
      }
    }

    // Progress indicator
    if (processedCount % 100 === 0) {
      console.log(`  Processed ${processedCount} files...`);
    }
  }

  report.filesStaged = processedCount;

  // Handle variant groups - ensure all variants of a base name go to same category
  console.log('Verifying variant group consistency...');
  const variantGroups = new Map();
  for (const file of manifest.files) {
    if (!variantGroups.has(file.variantGroup)) {
      variantGroups.set(file.variantGroup, new Set());
    }
    variantGroups.get(file.variantGroup).add(file.category);
  }

  for (const [group, categories] of variantGroups) {
    if (categories.size > 1) {
      report.conflictsPending.push({
        type: 'variant_category_mismatch',
        variantGroup: group,
        categories: Array.from(categories),
        note: 'Variants of same base name are in different categories'
      });
    }
  }

  // Write report
  report.completedAt = new Date().toISOString();
  try {
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    console.log(`\nReport written to ${REPORT_PATH}`);
  } catch (err) {
    console.error('Failed to write report:', err.message);
  }

  const duration = Date.now() - startTime;
  console.log(`\nPhase 1 migration complete!`);
  console.log(`  Duration: ${duration}ms`);
  console.log(`  Directories created: ${report.directoriesCreated.length}`);
  console.log(`  Files staged: ${report.filesStaged}`);
  console.log(`  Conflicts resolved: ${report.conflictsResolved.length}`);
  console.log(`  Pending issues: ${report.conflictsPending.length}`);
  console.log(`  Errors: ${report.errors.length}`);
}

// Run migration
runMigration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
