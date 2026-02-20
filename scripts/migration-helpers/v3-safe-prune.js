#!/usr/bin/env node

/**
 * V3 safe image pruning:
 * - Build deterministic keep-set from runtime references
 * - Build SHA-256 index and basename conflict report
 * - Prune only safe files (exact-byte duplicates, unreferenced extension duplicates)
 *
 * Usage:
 *   node scripts/migration-helpers/v3-safe-prune.js --dry-run
 *   node scripts/migration-helpers/v3-safe-prune.js --apply
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { globSync } = require('glob');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const REPORT_DIR_DEFAULT = path.join(ROOT, 'reports', 'migration-v3');

const KEEPSET_SCAN_TARGETS = [
  { root: 'app', pattern: 'app/**/*.{ts,tsx,js,jsx,mjs,cjs,md,mdx,json}' },
  { root: 'src', pattern: 'src/**/*.{ts,tsx,js,jsx,mjs,cjs,md,mdx,json}' },
  { root: 'content/blog', pattern: 'content/blog/**/*.json', jsonOnly: true },
  { root: 'scripts', pattern: 'scripts/**/*.{ts,tsx,js,jsx,mjs,cjs,json}' },
];

const HASH_INDEX_ROOTS = [
  path.join(ROOT, 'public', 'original-images'),
  path.join(ROOT, 'public', 'optimized'),
  path.join(ROOT, 'public', 'images'),
];

const IMAGE_EXTS = new Set([
  '.avif',
  '.webp',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
]);

const PRUNABLE_EXTS = new Set(['.avif', '.webp', '.png', '.jpg', '.jpeg']);
const EXT_PREFERENCE = ['.avif', '.webp', '.png', '.jpg', '.jpeg'];

const EXPLICIT_KEEP_WEB_PATHS = [
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/optimized/icons/favicon.svg',
  '/optimized/icons/favicon.ico',
  '/optimized/icons/favicon.png',
  '/optimized/icons/apple-touch-icon.png',
  '/optimized/icons/icon-192.png',
  '/optimized/icons/icon-512.png',
  '/optimized/logos/purrify-logo.png',
];

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const reportDirArg = args.find((arg) => arg.startsWith('--report-dir='))?.split('=')[1];
const reportDir = path.resolve(ROOT, reportDirArg || REPORT_DIR_DEFAULT);

function toPosix(p) {
  return p.replaceAll(path.sep, '/');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sha256(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function listFilesRecursive(dirPath) {
  const files = [];

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        files.push(full);
      }
    }
  }

  if (fs.existsSync(dirPath)) {
    walk(dirPath);
  }

  return files;
}

function normalizeCapturedPath(raw) {
  if (!raw) return null;
  let candidate = raw.trim();
  candidate = candidate.replace(/^[('"\s`]+/, '').replace(/[)'"\s`.,;:!?]+$/, '');
  candidate = candidate.replace(/\\+$/, '');

  if (!candidate) return null;

  if (/^https?:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);
      if (!/purrify\.(ca|com)$/i.test(url.hostname)) {
        return null;
      }
      candidate = url.pathname || '';
    } catch {
      return null;
    }
  }

  if (!candidate.startsWith('/')) return null;
  const q = candidate.indexOf('?');
  const h = candidate.indexOf('#');
  let cut = candidate.length;
  if (q >= 0) cut = Math.min(cut, q);
  if (h >= 0) cut = Math.min(cut, h);
  candidate = candidate.slice(0, cut);

  try {
    candidate = decodeURIComponent(candidate);
  } catch {
    // Keep raw candidate if decoding fails.
  }

  return candidate || null;
}

function isRelevantAssetPath(webPath) {
  if (!webPath) return false;
  if (/^\/(?:optimized|original-images|images)\//i.test(webPath)) return true;
  if (/^\/(?:favicon\.ico|favicon\.svg|apple-touch-icon\.png|manifest\.json)$/i.test(webPath)) return true;
  if (/^\/icon-\d+\.png$/i.test(webPath)) return true;
  if (/\.(avif|webp|png|jpg|jpeg|gif|svg|ico)$/i.test(webPath)) return true;
  return false;
}

function isDynamicTemplatePath(webPath) {
  return webPath.includes('${');
}

function extractCandidatePaths(text) {
  const found = new Set();
  const patterns = [
    /https?:\/\/(?:www\.)?purrify\.(?:ca|com)\/[^\s"'`)<]+/gi,
    /\/(?:optimized|original-images|images)\/[^\s"'`)<]+/g,
    /\/(?:favicon\.ico|favicon\.svg|apple-touch-icon\.png|icon-\d+\.png|manifest\.json)\b/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const normalized = normalizeCapturedPath(match[0]);
      if (normalized && isRelevantAssetPath(normalized) && !isDynamicTemplatePath(normalized)) {
        found.add(normalized);
      }
    }
  }

  return [...found];
}

function collectStringsFromJson(value, out) {
  if (typeof value === 'string') {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStringsFromJson(item, out);
    return;
  }
  if (value && typeof value === 'object') {
    for (const v of Object.values(value)) collectStringsFromJson(v, out);
  }
}

function resolveWebPathToExistingFiles(webPath) {
  const resolved = [];
  if (!webPath || !webPath.startsWith('/')) {
    return resolved;
  }

  const relative = webPath.slice(1);
  const exactPath = path.join(PUBLIC_DIR, relative);

  if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
    resolved.push(exactPath);
    return resolved;
  }

  const ext = path.extname(webPath).toLowerCase();
  if (ext) {
    return resolved;
  }

  if (webPath.endsWith('/')) {
    return resolved;
  }

  for (const candidateExt of IMAGE_EXTS) {
    const withExt = path.join(PUBLIC_DIR, `${relative}${candidateExt}`);
    if (fs.existsSync(withExt) && fs.statSync(withExt).isFile()) {
      resolved.push(withExt);
    }
  }

  return resolved.sort();
}

function buildRuntimeReferenceScan() {
  const references = [];
  const uniqueReferencePaths = new Set();
  const runtimeRoots = new Set(['app', 'src', 'content/blog']);

  for (const target of KEEPSET_SCAN_TARGETS) {
    const files = globSync(target.pattern, { cwd: ROOT, nodir: true }).sort();

    for (const relFile of files) {
      const absFile = path.join(ROOT, relFile);
      let candidates = [];

      if (target.jsonOnly || relFile.endsWith('.json')) {
        try {
          const raw = fs.readFileSync(absFile, 'utf8');
          if (target.jsonOnly) {
            const parsed = JSON.parse(raw);
            const strings = [];
            collectStringsFromJson(parsed, strings);
            const fromStrings = new Set();
            for (const str of strings) {
              for (const p of extractCandidatePaths(str)) fromStrings.add(p);
            }
            candidates = [...fromStrings];
          } else {
            candidates = extractCandidatePaths(raw);
          }
        } catch {
          // Ignore invalid JSON/non-critical parse errors for keep-set extraction.
          continue;
        }
      } else {
        const raw = fs.readFileSync(absFile, 'utf8');
        candidates = extractCandidatePaths(raw);
      }

      for (const webPath of candidates) {
        uniqueReferencePaths.add(webPath);
        const resolvedFiles = resolveWebPathToExistingFiles(webPath);
        references.push({
          sourceRoot: target.root,
          sourceFile: relFile,
          webPath,
          resolvedFiles: resolvedFiles.map((p) => toPosix(path.relative(ROOT, p))),
          exists: resolvedFiles.length > 0,
        });
      }
    }
  }

  const explicitResults = EXPLICIT_KEEP_WEB_PATHS.map((webPath) => {
    const resolvedFiles = resolveWebPathToExistingFiles(webPath);
    return {
      webPath,
      resolvedFiles: resolvedFiles.map((p) => toPosix(path.relative(ROOT, p))),
      exists: resolvedFiles.length > 0,
    };
  });

  const keepAbs = new Set();
  const keepWeb = new Set();

  for (const ref of references) {
    for (const relResolved of ref.resolvedFiles) {
      keepAbs.add(path.join(ROOT, relResolved));
      keepWeb.add('/' + toPosix(path.relative(PUBLIC_DIR, path.join(ROOT, relResolved))));
    }
  }

  for (const ref of explicitResults) {
    for (const relResolved of ref.resolvedFiles) {
      keepAbs.add(path.join(ROOT, relResolved));
      keepWeb.add('/' + toPosix(path.relative(PUBLIC_DIR, path.join(ROOT, relResolved))));
    }
  }

  const missingReferences = references
    .filter((r) => runtimeRoots.has(r.sourceRoot))
    .filter((r) => /^\/(?:optimized|original-images)\//i.test(r.webPath))
    .filter((r) => !r.exists)
    .map((r) => ({ sourceFile: r.sourceFile, webPath: r.webPath }));

  const missingExplicit = explicitResults
    .filter((r) => !r.exists)
    .map((r) => r.webPath);

  const runtimeReferencePaths = new Set(
    references
      .filter((r) => runtimeRoots.has(r.sourceRoot))
      .map((r) => r.webPath)
  );

  const flatOptimizedRefs = [...runtimeReferencePaths]
    .filter((p) => /^\/optimized\/[^/]+\.[a-z0-9]+$/i.test(p))
    .sort();

  const legacyImagesRefs = [...runtimeReferencePaths]
    .filter((p) => /^\/images\//i.test(p))
    .sort();

  return {
    keepAbs,
    keepWeb,
    references,
    missingReferences,
    missingExplicit,
    flatOptimizedRefs,
    legacyImagesRefs,
    explicitResults,
    uniqueReferenceCount: uniqueReferencePaths.size,
  };
}

function buildHashIndex(keepAbs) {
  const entries = [];
  const missingRoots = [];

  for (const rootDir of HASH_INDEX_ROOTS) {
    if (!fs.existsSync(rootDir)) {
      missingRoots.push(toPosix(path.relative(ROOT, rootDir)));
      continue;
    }

    const files = listFilesRecursive(rootDir).sort();
    for (const absFile of files) {
      const relFromRoot = toPosix(path.relative(ROOT, absFile));
      const relFromPublic = toPosix(path.relative(PUBLIC_DIR, absFile));
      const ext = path.extname(absFile).toLowerCase();

      const stat = fs.statSync(absFile);
      const hash = sha256(absFile);
      entries.push({
        absPath: absFile,
        relPath: relFromRoot,
        webPath: `/${relFromPublic}`,
        root: toPosix(path.relative(ROOT, rootDir)),
        dir: toPosix(path.dirname(relFromPublic)),
        basename: path.basename(absFile),
        stem: path.basename(absFile, path.extname(absFile)),
        ext,
        size: stat.size,
        hash,
        referenced: keepAbs.has(absFile),
      });
    }
  }

  return { entries, missingRoots };
}

function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

function chooseCanonical(entries) {
  const rootScore = (relPath) => {
    if (relPath.startsWith('public/optimized/')) return 0;
    if (relPath.startsWith('public/original-images/')) return 1;
    if (relPath.startsWith('public/images/')) return 2;
    return 3;
  };

  return [...entries].sort((a, b) => {
    const sr = rootScore(a.relPath) - rootScore(b.relPath);
    if (sr !== 0) return sr;
    const len = a.relPath.length - b.relPath.length;
    if (len !== 0) return len;
    return a.relPath.localeCompare(b.relPath);
  })[0];
}

function buildConflictReport(entries) {
  const conflictCandidates = entries.filter((e) => IMAGE_EXTS.has(e.ext));
  const byBasename = groupBy(conflictCandidates, (e) => `${e.root}::${e.basename}`);
  const conflicts = [];

  for (const [compoundKey, group] of byBasename) {
    if (group.length < 2) continue;
    const hashes = new Set(group.map((e) => e.hash));
    if (hashes.size < 2) continue;
    const [root, basename] = compoundKey.split('::');

    conflicts.push({
      root,
      basename,
      fileCount: group.length,
      uniqueHashCount: hashes.size,
      files: group.map((e) => ({
        relPath: e.relPath,
        webPath: e.webPath,
        hash: e.hash,
        size: e.size,
        referenced: e.referenced,
      })),
    });
  }

  conflicts.sort((a, b) => {
    if (b.fileCount !== a.fileCount) return b.fileCount - a.fileCount;
    return a.basename.localeCompare(b.basename);
  });

  return conflicts;
}

function buildCategoryKey(relPath) {
  const parts = relPath.split('/');
  if (parts[0] !== 'public') return 'unknown';
  if (parts[1] === 'optimized' || parts[1] === 'original-images' || parts[1] === 'images') {
    const category = parts[2] || '_root';
    return `${parts[1]}/${category}`;
  }
  return `${parts[1] || 'unknown'}/_root`;
}

function summarizeDeletions(deletions) {
  const byCategoryAndExt = {};
  const byReason = {};

  for (const item of deletions) {
    const ext = path.extname(item.relPath).toLowerCase() || '_noext';
    const categoryKey = buildCategoryKey(item.relPath);
    const key = `${categoryKey}::${ext}`;
    byCategoryAndExt[key] = (byCategoryAndExt[key] || 0) + 1;
    byReason[item.reason] = (byReason[item.reason] || 0) + 1;
  }

  const categoryExtensionCounts = Object.entries(byCategoryAndExt)
    .map(([key, count]) => {
      const [category, ext] = key.split('::');
      return { category, ext, count };
    })
    .sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      if (a.ext !== b.ext) return a.ext.localeCompare(b.ext);
      return a.count - b.count;
    });

  return {
    totalDeleted: deletions.length,
    byReason,
    categoryExtensionCounts,
  };
}

function pruneSafely(hashEntries, keepAbs, doApply) {
  const current = new Map(hashEntries.map((e) => [e.absPath, { ...e }]));
  const deletions = [];

  function removeEntry(entry, reason) {
    if (keepAbs.has(entry.absPath)) return false;
    if (!current.has(entry.absPath)) return false;
    if (doApply) {
      fs.unlinkSync(entry.absPath);
    }
    current.delete(entry.absPath);
    deletions.push({
      relPath: entry.relPath,
      webPath: entry.webPath,
      reason,
      hash: entry.hash,
      ext: entry.ext,
    });
    return true;
  }

  // Pass 1: exact-byte duplicates
  const exactCandidates = [...current.values()].filter((e) => IMAGE_EXTS.has(e.ext));
  const byHash = groupBy(exactCandidates, (e) => e.hash);

  for (const group of byHash.values()) {
    if (group.length < 2) continue;

    const referenced = group.filter((e) => keepAbs.has(e.absPath));
    const keepers = new Set(referenced.map((e) => e.absPath));

    if (keepers.size === 0) {
      keepers.add(chooseCanonical(group).absPath);
    }

    for (const entry of group) {
      if (keepers.has(entry.absPath)) continue;
      removeEntry(entry, 'exact-byte-duplicate');
    }
  }

  // Pass 2: unreferenced extension duplicates for AVIF/WebP/JPG/PNG
  const extCandidates = [...current.values()].filter((e) => PRUNABLE_EXTS.has(e.ext));
  const byStem = groupBy(extCandidates, (e) => e.webPath.replace(/\.[^.]+$/, ''));

  for (const group of byStem.values()) {
    if (group.length < 2) continue;
    const uniqueExtCount = new Set(group.map((e) => e.ext)).size;
    if (uniqueExtCount < 2) continue;

    const referenced = group.filter((e) => keepAbs.has(e.absPath));
    const keepers = new Set(referenced.map((e) => e.absPath));

    if (keepers.size === 0) {
      const modern = group.filter((e) => e.ext === '.avif' || e.ext === '.webp');
      if (modern.length > 0) {
        for (const entry of modern) keepers.add(entry.absPath);
      } else {
        const preferred = [...group].sort((a, b) => {
          const ai = EXT_PREFERENCE.indexOf(a.ext);
          const bi = EXT_PREFERENCE.indexOf(b.ext);
          if (ai !== bi) return ai - bi;
          return chooseCanonical([a, b]).absPath === a.absPath ? -1 : 1;
        })[0];
        keepers.add(preferred.absPath);
      }
    }

    for (const entry of group) {
      if (keepers.has(entry.absPath)) continue;
      removeEntry(entry, 'unreferenced-extension-duplicate');
    }
  }

  return {
    deletions,
    remainingEntries: [...current.values()],
  };
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function main() {
  ensureDir(reportDir);

  const referenceBefore = buildRuntimeReferenceScan();
  const hashIndexBefore = buildHashIndex(referenceBefore.keepAbs);
  const conflicts = buildConflictReport(hashIndexBefore.entries);

  const pruneResult = pruneSafely(hashIndexBefore.entries, referenceBefore.keepAbs, apply);
  const deletionSummary = summarizeDeletions(pruneResult.deletions);

  const referenceAfter = buildRuntimeReferenceScan();

  const keepSetReport = {
    generatedAt: new Date().toISOString(),
    mode: apply ? 'apply' : 'dry-run',
    scanTargets: KEEPSET_SCAN_TARGETS.map((t) => t.root),
    explicitKeepWebPaths: EXPLICIT_KEEP_WEB_PATHS,
    keepSet: {
      uniqueReferenceCount: referenceBefore.uniqueReferenceCount,
      keepFileCount: referenceBefore.keepAbs.size,
      keepWebPathCount: referenceBefore.keepWeb.size,
    },
    referenceScanBefore: {
      missingCount: referenceBefore.missingReferences.length,
      flatOptimizedRefsCount: referenceBefore.flatOptimizedRefs.length,
      legacyImagesRefsCount: referenceBefore.legacyImagesRefs.length,
    },
    referenceScanAfter: {
      missingCount: referenceAfter.missingReferences.length,
      flatOptimizedRefsCount: referenceAfter.flatOptimizedRefs.length,
      legacyImagesRefsCount: referenceAfter.legacyImagesRefs.length,
    },
    missingReferences: referenceAfter.missingReferences,
    missingExplicit: referenceAfter.missingExplicit,
  };

  const hashIndexReport = {
    generatedAt: new Date().toISOString(),
    mode: apply ? 'apply' : 'dry-run',
    scannedRoots: HASH_INDEX_ROOTS.map((p) => toPosix(path.relative(ROOT, p))),
    missingRoots: hashIndexBefore.missingRoots,
    fileCount: hashIndexBefore.entries.length,
    entries: hashIndexBefore.entries.map((entry) => ({
      relPath: entry.relPath,
      webPath: entry.webPath,
      root: entry.root,
      basename: entry.basename,
      ext: entry.ext,
      size: entry.size,
      hash: entry.hash,
      referenced: entry.referenced,
    })),
  };

  const pruneReport = {
    generatedAt: new Date().toISOString(),
    mode: apply ? 'apply' : 'dry-run',
    deletedCount: pruneResult.deletions.length,
    deletionSummary,
    deletedFiles: pruneResult.deletions,
  };

  const conflictReport = {
    generatedAt: new Date().toISOString(),
    mode: apply ? 'apply' : 'dry-run',
    conflictCount: conflicts.length,
    conflicts,
  };

  writeJson(path.join(reportDir, 'keep-set-report.json'), keepSetReport);
  writeJson(path.join(reportDir, 'hash-index-report.json'), hashIndexReport);
  writeJson(path.join(reportDir, 'conflict-report.json'), conflictReport);
  writeJson(path.join(reportDir, 'prune-report.json'), pruneReport);

  console.log(`Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`Report directory: ${toPosix(path.relative(ROOT, reportDir))}`);
  console.log(`Keep-set files: ${referenceBefore.keepAbs.size}`);
  console.log(`Reference scan before: missing=${referenceBefore.missingReferences.length}, flat=/optimized refs=${referenceBefore.flatOptimizedRefs.length}, legacy=/images refs=${referenceBefore.legacyImagesRefs.length}`);
  console.log(`Reference scan after: missing=${referenceAfter.missingReferences.length}, flat=/optimized refs=${referenceAfter.flatOptimizedRefs.length}, legacy=/images refs=${referenceAfter.legacyImagesRefs.length}`);
  console.log(`Hash index entries: ${hashIndexBefore.entries.length}`);
  console.log(`Conflicts (basename+different hash): ${conflicts.length}`);
  console.log(`Deleted files: ${pruneResult.deletions.length}`);
}

main();
