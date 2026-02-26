#!/usr/bin/env tsx
/**
 * Image Compliance Audit
 *
 * Checks that every image used in the codebase is properly optimized.
 * Run manually:  pnpm audit-images
 * Run in CI:     pnpm audit-images --strict
 *
 * Checks performed:
 *   1. Source code references point to /optimized/ (not /images/ or /original-images/)
 *   2. Referenced optimized files actually exist on disk
 *   3. Every image in public/optimized/ has its required responsive variants (avif + webp per profile)
 *   4. Source images in public/images/ and public/original-images/ have optimized outputs
 *   5. Optimized file sizes are within per-format limits
 */

import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const OPTIMIZED_DIR = path.join(PUBLIC, 'optimized');
const SOURCE_DIRS = [
  path.join(PUBLIC, 'original-images'),
  path.join(PUBLIC, 'images'),
];

// ─── Profile definitions (mirrors image-optimization.config.js) ──────────────

interface Profile {
  responsiveSizes: number[];
  formats: string[];
}

const PROFILES: Record<string, Profile> = {
  blog:      { responsiveSizes: [640, 828, 1200],            formats: ['avif', 'webp', 'jpg'] },
  product:   { responsiveSizes: [640, 828, 1080, 1200, 1920], formats: ['avif', 'webp', 'jpg'] },
  thumbnail: { responsiveSizes: [200, 400],                   formats: ['avif', 'webp'] },
  default:   { responsiveSizes: [640, 828, 1080, 1200, 1920], formats: ['avif', 'webp', 'jpg'] },
};

// Directory name → profile
const DIR_PROFILE: Record<string, string> = {
  blog:       'blog',
  products:   'product',
  logos:      'thumbnail',
  icons:      'thumbnail',
  team:       'default',
  stores:     'default',
  locations:  'default',
  marketing:  'default',
};

// Maximum file sizes per format (bytes) — independent of width
const MAX_BYTES: Record<string, number> = {
  avif: 500_000,   // 500 KB
  webp: 600_000,   // 600 KB
  jpg:  800_000,   // 800 KB
  jpeg: 800_000,
  png: 1_500_000,  // 1.5 MB (PNG fallbacks are larger by design)
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Issue {
  severity: 'error' | 'warn';
  check: string;
  message: string;
  file?: string;
  fix?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rel(filePath: string): string {
  return path.relative(ROOT, filePath);
}

function fmt(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1_048_576).toFixed(1)}MB`;
}

/** Infer profile from optimized subdirectory (e.g. public/optimized/blog/foo → blog) */
function profileForOptimizedPath(filePath: string): Profile {
  const relative = path.relative(OPTIMIZED_DIR, filePath);
  const topDir = relative.split(path.sep)[0];
  const profileName = DIR_PROFILE[topDir] ?? 'default';
  return PROFILES[profileName];
}

/**
 * Parse a filename like "cat-on-bed-fresh-640w.avif"
 * Returns { base: "cat-on-bed-fresh", width: 640, ext: "avif" } or null if not a variant file.
 */
function parseVariantFilename(filename: string): { base: string; width: number; ext: string } | null {
  const m = filename.match(/^(.+)-(\d+)w\.(avif|webp|jpg|jpeg|png)$/i);
  if (!m) return null;
  return { base: m[1], width: parseInt(m[2], 10), ext: m[3].toLowerCase() };
}

// ─── Check 1: source code references ─────────────────────────────────────────

async function checkSourceCodeReferences(): Promise<Issue[]> {
  const issues: Issue[] = [];

  const sourceFiles = await fg([
    'app/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    'content/**/*.json',
  ], { cwd: ROOT, ignore: ['**/node_modules/**', '**/.next/**'] });

  // Regex: any image path in src=, href=, or plain string assignment
  const imagePathRe = /["'`(](\/((?:images|original-images|optimized)[^"'`\s)>]+\.(?:avif|webp|jpg|jpeg|png|gif|svg)))["'`\s)>]/gi;

  for (const sourceFile of sourceFiles) {
    const content = fs.readFileSync(path.join(ROOT, sourceFile), 'utf-8');
    let m: RegExpExecArray | null;

    while ((m = imagePathRe.exec(content)) !== null) {
      const imgPath = m[1];

      // Flag non-optimized paths
      if (imgPath.startsWith('/images/') || imgPath.startsWith('/original-images/')) {
        issues.push({
          severity: 'error',
          check: 'non-optimized-path',
          message: `Image referenced from unoptimized path: ${imgPath}`,
          file: sourceFile,
          fix: `Move source to public/original-images/, run pnpm optimize-images:enhanced, then reference /optimized/...`,
        });
        continue;
      }

      // Flag referenced files that don't exist
      if (imgPath.startsWith('/optimized/')) {
        const diskPath = path.join(PUBLIC, imgPath.slice(1));
        if (!fs.existsSync(diskPath)) {
          issues.push({
            severity: 'error',
            check: 'missing-file',
            message: `Referenced image does not exist on disk: ${imgPath}`,
            file: sourceFile,
            fix: `Run pnpm optimize-images:enhanced to generate missing optimized images`,
          });
        }
      }
    }
  }

  return issues;
}

// ─── Check 2: responsive variant completeness ─────────────────────────────────

async function checkResponsiveVariants(): Promise<Issue[]> {
  const issues: Issue[] = [];

  const optimizedFiles = await fg('**/*.{avif,webp,jpg,jpeg,png}', {
    cwd: OPTIMIZED_DIR,
    ignore: ['**/node_modules/**'],
  });

  // Group by (directory, base) to find all existing variants
  const groups = new Map<string, { ext: string; width: number }[]>();

  for (const file of optimizedFiles) {
    const dir = path.dirname(file);
    const filename = path.basename(file);
    const parsed = parseVariantFilename(filename);
    if (!parsed) continue; // non-variant file (e.g. a flat name without size suffix)

    const key = `${dir}::${parsed.base}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push({ ext: parsed.ext, width: parsed.width });
  }

  // For each group, check required variants per profile
  for (const [key, variants] of groups) {
    const [dir, base] = key.split('::');
    const samplePath = path.join(OPTIMIZED_DIR, dir, `${base}-640w.avif`);
    const profile = profileForOptimizedPath(samplePath);

    const existingSet = new Set(variants.map(v => `${v.width}w.${v.ext}`));

    // Only require sizes up to the largest width that was successfully generated.
    // If the source image is narrower than a profile size, the optimizer correctly
    // skips it — don't flag that as missing.
    const maxExistingWidth = Math.max(...variants.map(v => v.width));

    // Only check avif and webp (jpg is optional fallback)
    for (const format of profile.formats.filter(f => f === 'avif' || f === 'webp')) {
      for (const size of profile.responsiveSizes) {
        if (size > maxExistingWidth) continue; // source too small — not a real gap

        const variantName = `${size}w.${format}`;
        if (!existingSet.has(variantName)) {
          const fullBase = path.join(dir === '.' ? '' : dir, base).replace(/^\//, '');
          issues.push({
            severity: 'warn',
            check: 'missing-variant',
            message: `Missing responsive variant: public/optimized/${fullBase}-${variantName}`,
            fix: `Run pnpm optimize-images:enhanced to regenerate responsive variants`,
          });
        }
      }
    }
  }

  return issues;
}

// ─── Check 3: source images without optimized output ─────────────────────────

async function checkUnoptimizedSources(): Promise<Issue[]> {
  const issues: Issue[] = [];
  // Only check "raw" source formats — webp/avif in source dirs are typically
  // already-processed icon/logo outputs placed there by the optimizer itself.
  const imageExts = ['png', 'jpg', 'jpeg', 'gif'];

  for (const sourceDir of SOURCE_DIRS) {
    if (!fs.existsSync(sourceDir)) continue;

    const sourceFiles = await fg(`**/*.{${imageExts.join(',')}}`, {
      cwd: sourceDir,
      ignore: ['**/node_modules/**', '**/.DS_Store', '**/Old Versions/**'],
    });

    for (const sourceFile of sourceFiles) {
      const basename = path.basename(sourceFile, path.extname(sourceFile))
        .replace(/\s+/g, '-'); // optimizer sanitizes spaces → dashes

      const subdir = path.dirname(sourceFile);
      const searchDir = subdir === '.' ? OPTIMIZED_DIR : path.join(OPTIMIZED_DIR, subdir);

      // Check if at least one optimized variant exists
      if (!fs.existsSync(searchDir)) {
        issues.push({
          severity: 'warn',
          check: 'unoptimized-source',
          message: `Source image has no optimized output: ${path.join(path.relative(PUBLIC, sourceDir), sourceFile)}`,
          fix: `Run pnpm optimize-images:enhanced`,
        });
        continue;
      }

      const pattern = `${basename}-*w.{avif,webp,jpg}`;
      const matches = await fg(pattern, { cwd: searchDir });
      if (matches.length === 0) {
        issues.push({
          severity: 'warn',
          check: 'unoptimized-source',
          message: `Source image has no optimized output: ${path.join(path.relative(PUBLIC, sourceDir), sourceFile)}`,
          fix: `Run pnpm optimize-images:enhanced`,
        });
      }
    }
  }

  return issues;
}

// ─── Check 4: file size limits ───────────────────────────────────────────────

async function checkFileSizes(): Promise<Issue[]> {
  const issues: Issue[] = [];

  const optimizedFiles = await fg('**/*.{avif,webp,jpg,jpeg,png}', {
    cwd: OPTIMIZED_DIR,
  });

  for (const file of optimizedFiles) {
    const ext = path.extname(file).slice(1).toLowerCase();
    const limit = MAX_BYTES[ext];
    if (!limit) continue;

    const fullPath = path.join(OPTIMIZED_DIR, file);
    const { size } = fs.statSync(fullPath);

    if (size > limit) {
      issues.push({
        severity: 'warn',
        check: 'file-size',
        message: `Optimized image exceeds ${fmt(limit)} limit: ${rel(fullPath)} (${fmt(size)})`,
        fix: `Re-optimize with lower quality: pnpm optimize-images:enhanced`,
      });
    }
  }

  return issues;
}

// ─── Reporter ─────────────────────────────────────────────────────────────────

function printIssues(label: string, issues: Issue[]): void {
  if (issues.length === 0) return;

  const errors = issues.filter(i => i.severity === 'error');
  const warns  = issues.filter(i => i.severity === 'warn');

  if (errors.length > 0) {
    console.log(`\n  Errors (${errors.length}):`);
    for (const issue of errors) {
      console.log(`    ❌ ${issue.message}`);
      if (issue.file) console.log(`       in ${issue.file}`);
      if (issue.fix)  console.log(`       fix: ${issue.fix}`);
    }
  }

  if (warns.length > 0) {
    console.log(`\n  Warnings (${warns.length}):`);
    for (const issue of warns.slice(0, 20)) {
      console.log(`    ⚠️  ${issue.message}`);
      if (issue.fix) console.log(`       fix: ${issue.fix}`);
    }
    if (warns.length > 20) {
      console.log(`    ... and ${warns.length - 20} more warnings`);
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const strict = process.argv.includes('--strict');

  console.log('🖼️  Image Compliance Audit\n' + '═'.repeat(50));

  const [
    refIssues,
    variantIssues,
    sourceIssues,
    sizeIssues,
  ] = await Promise.all([
    checkSourceCodeReferences(),
    checkResponsiveVariants(),
    checkUnoptimizedSources(),
    checkFileSizes(),
  ]);

  const checks = [
    { name: 'Source code references',        issues: refIssues },
    { name: 'Responsive variant completeness', issues: variantIssues },
    { name: 'Unoptimized source images',      issues: sourceIssues },
    { name: 'File size limits',               issues: sizeIssues },
  ];

  let totalErrors = 0;
  let totalWarns  = 0;

  for (const { name, issues } of checks) {
    const errors = issues.filter(i => i.severity === 'error').length;
    const warns  = issues.filter(i => i.severity === 'warn').length;
    totalErrors += errors;
    totalWarns  += warns;

    const icon = errors > 0 ? '❌' : warns > 0 ? '⚠️ ' : '✅';
    const detail = errors > 0 ? ` (${errors} errors, ${warns} warns)` : warns > 0 ? ` (${warns} warns)` : '';
    console.log(`\n${icon} ${name}${detail}`);
    printIssues(name, issues);
  }

  console.log('\n' + '═'.repeat(50));
  console.log(`\nSummary: ${totalErrors} error(s), ${totalWarns} warning(s)`);

  if (totalErrors > 0) {
    console.log('\n❌ Audit FAILED — fix errors before deploying\n');
    process.exit(1);
  }

  if (strict && totalWarns > 0) {
    console.log('\n❌ Audit FAILED — warnings not allowed in strict mode\n');
    process.exit(1);
  }

  if (totalWarns > 0) {
    console.log('\n⚠️  Audit passed with warnings — run pnpm optimize-images:enhanced to resolve\n');
  } else {
    console.log('\n✅ All images are properly optimized and compliant\n');
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
