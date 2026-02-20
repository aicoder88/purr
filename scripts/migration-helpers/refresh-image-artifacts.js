#!/usr/bin/env node

/**
 * Refresh image artifacts from current filesystem state without regenerating images.
 * Writes:
 * - public/image-dimensions.json
 * - public/image-optimization-report.json
 */

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { globSync } = require('glob');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const ORIGINAL_DIR = path.join(PUBLIC_DIR, 'original-images');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const DIMENSIONS_OUT = path.join(PUBLIC_DIR, 'image-dimensions.json');
const REPORT_OUT = path.join(PUBLIC_DIR, 'image-optimization-report.json');

const SOURCE_EXTS = new Set(['.avif', '.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']);
const FORMAT_EXTS = new Set(['.avif', '.webp', '.jpg', '.jpeg']);

function toPosix(p) {
  return p.replaceAll(path.sep, '/');
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return globSync('**/*', { cwd: dir, nodir: true }).map((rel) => path.join(dir, rel)).sort();
}

async function getDimensions(absPath) {
  try {
    const { width, height } = await sharp(absPath).metadata();
    return {
      width: width || 0,
      height: height || 0,
    };
  } catch {
    return { width: 0, height: 0 };
  }
}

function parseResponsiveWidth(fileName) {
  const match = fileName.match(/-(\d+)w\.[^.]+$/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return Number.parseInt(match[1], 10);
}

function buildOptimizedIndex() {
  const map = new Map();
  const optimizedFiles = listFiles(OPTIMIZED_DIR);

  for (const absPath of optimizedFiles) {
    const relPublic = toPosix(path.relative(PUBLIC_DIR, absPath));
    const ext = path.extname(absPath).toLowerCase();
    if (!FORMAT_EXTS.has(ext)) continue;

    const relDir = toPosix(path.dirname(path.relative(OPTIMIZED_DIR, absPath)));
    const fileName = path.basename(absPath);
    const stem = fileName.replace(/-\d+w\.[^.]+$/, '').replace(/\.[^.]+$/, '');
    const key = `${relDir}::${stem}`;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push({
      relPublic,
      fileName,
      ext,
      widthHint: parseResponsiveWidth(fileName),
    });
  }

  for (const group of map.values()) {
    group.sort((a, b) => {
      if (a.ext !== b.ext) return a.ext.localeCompare(b.ext);
      if (a.widthHint !== b.widthHint) return a.widthHint - b.widthHint;
      return a.fileName.localeCompare(b.fileName);
    });
  }

  return map;
}

function preferredFormatPath(files, ext) {
  const matching = files.filter((f) => f.ext === ext);
  if (matching.length === 0) return null;
  const exact = matching.find((f) => !/-\d+w\.[^.]+$/.test(f.fileName));
  return (exact || matching[0]).relPublic;
}

async function main() {
  const originalFiles = listFiles(ORIGINAL_DIR)
    .filter((absPath) => SOURCE_EXTS.has(path.extname(absPath).toLowerCase()));
  const optimizedIndex = buildOptimizedIndex();

  const dimensions = {};
  let metadataFailures = 0;

  for (const originalAbs of originalFiles) {
    const relOriginal = toPosix(path.relative(PUBLIC_DIR, originalAbs));
    const originalRelFromRoot = toPosix(path.relative(ORIGINAL_DIR, originalAbs));
    const relDir = toPosix(path.dirname(originalRelFromRoot));
    const stem = path.basename(originalAbs, path.extname(originalAbs));
    const origExt = path.extname(originalAbs).toLowerCase();

    const key = `${relDir}::${stem}`;
    const optimizedCandidates = optimizedIndex.get(key) || [];
    const dims = await getDimensions(originalAbs);
    if (dims.width === 0 || dims.height === 0) metadataFailures++;

    const avifFormats = optimizedCandidates
      .filter((f) => f.ext === '.avif')
      .map((f) => f.relPublic);
    const webpFormats = optimizedCandidates
      .filter((f) => f.ext === '.webp')
      .map((f) => f.relPublic);
    const jpgFormats = optimizedCandidates
      .filter((f) => f.ext === '.jpg' || f.ext === '.jpeg')
      .map((f) => f.relPublic);

    const webpPath = preferredFormatPath(optimizedCandidates, '.webp');
    const avifPath = preferredFormatPath(optimizedCandidates, '.avif');
    const optimizedOriginalPath = optimizedCandidates.find((f) => f.ext === origExt)?.relPublic || null;

    dimensions[relOriginal] = {
      width: dims.width,
      height: dims.height,
      aspectRatio: dims.height > 0 ? dims.width / dims.height : 0,
      formats: {
        avif: avifFormats,
        webp: webpFormats,
        jpg: jpgFormats,
      },
      sizes: '100vw',
      ...(webpPath ? { webp: webpPath } : {}),
      ...(webpPath ? { webpSanitized: webpPath } : {}),
      ...(avifPath ? { avif: avifPath } : {}),
      ...(avifPath ? { avifSanitized: avifPath } : {}),
      ...(optimizedOriginalPath ? { optimized: optimizedOriginalPath } : {}),
    };
  }

  const sortedEntries = Object.entries(dimensions).sort(([a], [b]) => a.localeCompare(b));
  const sortedDimensions = Object.fromEntries(sortedEntries);
  fs.writeFileSync(DIMENSIONS_OUT, `${JSON.stringify(sortedDimensions, null, 2)}\n`, 'utf8');

  const optimizedFiles = listFiles(OPTIMIZED_DIR);
  const formatBreakdown = { avif: 0, webp: 0, jpg: 0 };
  for (const abs of optimizedFiles) {
    const ext = path.extname(abs).toLowerCase();
    if (ext === '.avif') formatBreakdown.avif += 1;
    if (ext === '.webp') formatBreakdown.webp += 1;
    if (ext === '.jpg' || ext === '.jpeg') formatBreakdown.jpg += 1;
  }

  const report = {
    timestamp: new Date().toISOString(),
    totalImages: originalFiles.length,
    successful: originalFiles.length - metadataFailures,
    failed: metadataFailures,
    skipped: 0,
    errors: [],
    statistics: {
      totalSizeReduction: 0,
      averageProcessingTime: 0,
      formatBreakdown,
    },
  };

  fs.writeFileSync(REPORT_OUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${toPosix(path.relative(ROOT, DIMENSIONS_OUT))} (${originalFiles.length} entries)`);
  console.log(`Wrote ${toPosix(path.relative(ROOT, REPORT_OUT))}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
