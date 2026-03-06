#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import fg from 'fast-glob';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const ORIGINAL_IMAGES_DIR = path.join(PUBLIC_DIR, 'original-images');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const APPLY = process.argv.includes('--apply');

const SOURCE_FILE_GLOBS = [
  'app/**/*.{ts,tsx,js,jsx}',
  'src/**/*.{ts,tsx,js,jsx,json}',
  'content/**/*.json',
  'public/documents/**/*.html',
  'public/*.html',
];

const SOURCE_FILE_IGNORES = [
  '**/node_modules/**',
  '**/.next/**',
  'public/optimized/**',
  'public/original-images/**',
  'public/images/**',
];

const LOCAL_IMAGE_RE = /["'`(](\/(?:images|original-images|optimized)\/[^"'`\s)>]+\.(?:avif|webp|jpg|jpeg|png|gif|svg)|https:\/\/(?:www\.)?purrify\.ca\/(?:images|original-images|optimized)\/[^"'`\s)>]+\.(?:avif|webp|jpg|jpeg|png|gif|svg))/gi;

const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg'];
const OPTIMIZED_EXTENSION_PREFERENCE = ['.webp', '.avif', '.jpg', '.jpeg', '.png', '.svg'];
const KNOWN_CATEGORIES = ['blog', 'marketing', 'products', 'stores', 'logos', 'icons', 'locations', 'team'];

const CATEGORY_PATTERNS: Record<string, string[]> = {
  blog: [
    'ammonia', 'apartment', 'carbon', 'cat-litter', 'curious-cat', 'happy-cat',
    'ghibli', 'multi-cat', '90day', 'powder', 'spray', 'summer', 'winter',
    'embarrassed', 'tried', 'frequency', 'deodorizer', 'guide', 'science',
    'fresh', 'vet', 'strong', 'odor', 'smell', 'tips', 'myths', 'types',
    'natural', 'clay', 'crystal', 'clumping', 'covered', 'sensitive',
    'fragrance-free', 'kitten', 'enzyme', 'blacklight', 'hardwood', 'applying',
    'technique', 'scooping', 'label', 'benefit', 'coconut', 'chemistry',
    'molecular', 'micropores', 'realistic', 'litter-box', 'ph-scale', 'lavender',
    'joyful', 'content-cat', 'comparison', 'diagram', 'fresh-home', 'hero',
    'iss', 'ventilation', 'miyazaki'
  ],
  marketing: [
    'mission', 'happy-owner', 'retailer', 'step-', 'quality-control',
    'activated-carbon', 'testimonial', 'affiliate', 'before-after', 'purrify-demo',
    'social-', 'holdnose', 'market', 'economics', 'platform', 'case-study',
    'infrastructure', 'michael-rodriguez', 'catonbed', 'cats-and-filters',
    'cost-effective', 'strong-cat-urine-smell'
  ],
  products: [
    '140g', '17g', '20g', '60g', 'samplebag', 'three-bags',
    'carbon-granules', 'activated-carbon-granules', 'purrify-standard'
  ],
  team: ['cassian', 'david', 'ezekiel', 'finnegan', 'gideon', 'leland', 'mark', 'merrick', 'orion', 'sage', 'trenton'],
  logos: ['logo', 'purrify-logo', 'chico'],
  icons: ['icon-', 'favicon', 'apple-touch'],
  locations: ['alberta', 'ontario', 'quebec', 'british-columbia', 'atlantic', 'prairies', 'north'],
  stores: ['woofmiao', 'viva-pets', 'pitou', 'pattes', 'nathamo', 'little-bit', 'lamifidel', 'kong', 'kk', 'doghaus', 'coquette', 'camlachie', 'bestcat', 'animalerie'],
};

const FIXED_REFERENCE_OVERRIDES = new Map<string, string>([
  ['/images/140g.jpg', '/optimized/products/140g.webp'],
  ['/images/Logos/icon-512.png', '/optimized/icons/icon-512.png'],
  ['/images/logo.png', '/optimized/logos/purrify-logo.png'],
]);

type ExistingAssetIndex = {
  byFileName: Map<string, string>;
  byBaseName: Map<string, string>;
};

type ImageReference = {
  sourceFile: string;
  originalPath: string;
  localPath: string;
};

function normalizeToLocalPath(imagePath: string): string {
  return imagePath.replace(/^https:\/\/(?:www\.)?purrify\.ca/i, '');
}

function ensureDirectoryExists(directoryPath: string): void {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function sanitizeBaseName(fileName: string): string {
  return path.basename(fileName, path.extname(fileName)).replace(/\s+/g, '-');
}

function filesAreIdentical(firstPath: string, secondPath: string): boolean {
  const firstBuffer = fs.readFileSync(firstPath);
  const secondBuffer = fs.readFileSync(secondPath);
  return firstBuffer.equals(secondBuffer);
}

function buildExistingAssetIndex(baseDirectory: string): ExistingAssetIndex {
  const byFileName = new Map<string, string>();
  const byBaseName = new Map<string, string>();

  if (!fs.existsSync(baseDirectory)) {
    return { byFileName, byBaseName };
  }

  const files = fg.sync('**/*.{png,jpg,jpeg,gif,webp,avif,svg}', {
    cwd: baseDirectory,
    onlyFiles: true,
    dot: false,
    ignore: ['**/.DS_Store', '**/Old Versions/**'],
  });

  for (const relativeFile of files) {
    const category = relativeFile.split('/')[0];
    if (!KNOWN_CATEGORIES.includes(category)) {
      continue;
    }

    const fileName = path.basename(relativeFile).toLowerCase();
    const baseName = sanitizeBaseName(relativeFile).toLowerCase();

    if (!byFileName.has(fileName)) {
      byFileName.set(fileName, category);
    }

    if (!byBaseName.has(baseName)) {
      byBaseName.set(baseName, category);
    }
  }

  return { byFileName, byBaseName };
}

function inferCategory(filePath: string, indexes: ExistingAssetIndex[]): string | null {
  const normalizedPath = filePath.replaceAll('\\', '/');
  const parts = normalizedPath.split('/');
  const knownCategory = parts.find((part) => KNOWN_CATEGORIES.includes(part));
  if (knownCategory) {
    return knownCategory;
  }

  const fileName = path.basename(filePath).toLowerCase();
  const baseName = sanitizeBaseName(filePath).toLowerCase();

  for (const index of indexes) {
    const fromFileName = index.byFileName.get(fileName);
    if (fromFileName) {
      return fromFileName;
    }

    const fromBaseName = index.byBaseName.get(baseName);
    if (fromBaseName) {
      return fromBaseName;
    }
  }

  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (patterns.some((pattern) => normalizedPath.toLowerCase().includes(pattern))) {
      return category;
    }
  }

  return null;
}

async function collectImageReferences(): Promise<ImageReference[]> {
  const sourceFiles = await fg(SOURCE_FILE_GLOBS, {
    cwd: ROOT,
    ignore: SOURCE_FILE_IGNORES,
  });

  const references: ImageReference[] = [];

  for (const sourceFile of sourceFiles) {
    const fullPath = path.join(ROOT, sourceFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    let match: RegExpExecArray | null;

    while ((match = LOCAL_IMAGE_RE.exec(content)) !== null) {
      const originalPath = match[1];
      references.push({
        sourceFile,
        originalPath,
        localPath: normalizeToLocalPath(originalPath),
      });
    }
  }

  return references;
}

function getStrandedImageFiles(): string[] {
  if (!fs.existsSync(IMAGES_DIR)) {
    return [];
  }

  return fg.sync('**/*.{png,jpg,jpeg,gif,webp,avif,svg}', {
    cwd: IMAGES_DIR,
    onlyFiles: true,
    dot: false,
    ignore: ['**/.DS_Store'],
  }).map((relativeFile) => path.join(IMAGES_DIR, relativeFile));
}

function findMatchingSource(localOptimizedPath: string): string | null {
  const relativeOptimizedPath = localOptimizedPath.replace(/^\/optimized\//, '');
  const segments = relativeOptimizedPath.split('/');
  const category = segments[0];
  const fileName = segments.at(-1);

  if (!fileName || !KNOWN_CATEGORIES.includes(category)) {
    return null;
  }

  const withoutSizeSuffix = fileName.replace(/-\d+w(?=\.[^.]+$)/, '');
  const baseName = sanitizeBaseName(withoutSizeSuffix).toLowerCase();

  const candidateDirectories = [
    path.join(ORIGINAL_IMAGES_DIR, category),
    path.join(IMAGES_DIR, category),
    IMAGES_DIR,
  ];

  for (const directoryPath of candidateDirectories) {
    if (!fs.existsSync(directoryPath)) {
      continue;
    }

    const matches = fg.sync(`**/${baseName}.{png,jpg,jpeg,gif,webp,avif,svg}`, {
      cwd: directoryPath,
      onlyFiles: true,
      caseSensitiveMatch: false,
      ignore: ['**/.DS_Store', '**/Old Versions/**'],
    });

    if (matches.length > 0) {
      return path.join(directoryPath, matches[0]);
    }
  }

  return null;
}

function pickOptimizedReference(localSourcePath: string, indexes: ExistingAssetIndex[]): string | null {
  const override = FIXED_REFERENCE_OVERRIDES.get(localSourcePath);
  if (override) {
    return override;
  }

  const category = inferCategory(localSourcePath, indexes);
  if (!category) {
    return null;
  }

  const sourceName = path.basename(localSourcePath);
  const sourceExt = path.extname(sourceName).toLowerCase();
  const sanitizedBaseName = sanitizeBaseName(sourceName);
  const optimizedCategoryDir = path.join(OPTIMIZED_DIR, category);

  if (!fs.existsSync(optimizedCategoryDir)) {
    return null;
  }

  const candidateFileNames = [
    `${sanitizedBaseName}${sourceExt}`,
    ...OPTIMIZED_EXTENSION_PREFERENCE.map((extension) => `${sanitizedBaseName}${extension}`),
  ];

  for (const candidateFileName of candidateFileNames) {
    const candidatePath = path.join(optimizedCategoryDir, candidateFileName);
    if (fs.existsSync(candidatePath)) {
      return `/optimized/${category}/${candidateFileName}`;
    }
  }

  return null;
}

function maybeMoveStrandedImage(filePath: string, indexes: ExistingAssetIndex[]): { movedTo?: string; removedDuplicateOf?: string; warning?: string } {
  const relativeFromImages = path.relative(IMAGES_DIR, filePath);
  const category = inferCategory(relativeFromImages, indexes);

  if (!category) {
    return { warning: `Could not infer category for ${path.relative(ROOT, filePath)}` };
  }

  const targetPath = path.join(ORIGINAL_IMAGES_DIR, category, path.basename(filePath));
  if (path.normalize(filePath) === path.normalize(targetPath)) {
    return {};
  }

  if (fs.existsSync(targetPath)) {
    if (filesAreIdentical(filePath, targetPath)) {
      if (APPLY) {
        fs.unlinkSync(filePath);
      }
      return { removedDuplicateOf: targetPath };
    }
    return { warning: `Skipped move because target already exists: ${path.relative(ROOT, targetPath)}` };
  }

  if (APPLY) {
    ensureDirectoryExists(path.dirname(targetPath));
    fs.renameSync(filePath, targetPath);
  }

  return { movedTo: targetPath };
}

function rewriteFileReferences(filePath: string, replacements: Map<string, string>): boolean {
  if (replacements.size === 0) {
    return false;
  }

  const originalContent = fs.readFileSync(filePath, 'utf8');
  let nextContent = originalContent;

  for (const [fromPath, toPath] of replacements.entries()) {
    const absoluteFromPath = `https://www.purrify.ca${fromPath}`;
    const absoluteToPath = `https://www.purrify.ca${toPath}`;
    nextContent = nextContent.split(absoluteFromPath).join(absoluteToPath);
    nextContent = nextContent.split(fromPath).join(toPath);
  }

  if (nextContent === originalContent) {
    return false;
  }

  if (APPLY) {
    fs.writeFileSync(filePath, nextContent);
  }

  return true;
}

function runScopedOptimizer(sourceFiles: string[]): void {
  if (sourceFiles.length === 0) {
    return;
  }

  const env = {
    ...process.env,
    OPTIMIZE_ONLY_SOURCES: sourceFiles.join('\n'),
  };

  const result = spawnSync('node', ['scripts/images/optimize-images-enhanced.js'], {
    cwd: ROOT,
    stdio: 'inherit',
    env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function main(): Promise<void> {
  const originalIndex = buildExistingAssetIndex(ORIGINAL_IMAGES_DIR);
  const optimizedIndex = buildExistingAssetIndex(OPTIMIZED_DIR);
  const indexes = [originalIndex, optimizedIndex];

  const references = await collectImageReferences();
  const strandedImageFiles = getStrandedImageFiles();
  const warnings: string[] = [];
  const movedFiles: string[] = [];
  const removedDuplicates: string[] = [];
  const sourcesToOptimize = new Set<string>();
  const rewritesByFile = new Map<string, Map<string, string>>();
  const missingOptimizedRefs: string[] = [];

  for (const filePath of strandedImageFiles) {
    const result = maybeMoveStrandedImage(filePath, indexes);

    if (result.warning) {
      warnings.push(result.warning);
    }

    if (result.removedDuplicateOf) {
      removedDuplicates.push(result.removedDuplicateOf);
    }

    if (result.movedTo) {
      movedFiles.push(result.movedTo);
      sourcesToOptimize.add(result.movedTo);
    }
  }

  for (const reference of references) {
    if (reference.localPath.startsWith('/optimized/')) {
      const diskPath = path.join(PUBLIC_DIR, reference.localPath.slice(1));
      if (!fs.existsSync(diskPath)) {
        missingOptimizedRefs.push(`${reference.sourceFile}: ${reference.localPath}`);
        const sourceFile = findMatchingSource(reference.localPath);
        if (sourceFile) {
          sourcesToOptimize.add(sourceFile);
        } else {
          warnings.push(`Could not find source for missing optimized reference ${reference.localPath} in ${reference.sourceFile}`);
        }
      }
      continue;
    }

    const replacement = pickOptimizedReference(reference.localPath, indexes);
    if (!replacement) {
      warnings.push(`Could not map ${reference.localPath} in ${reference.sourceFile} to /optimized/...`);
      continue;
    }

    const fileReplacements = rewritesByFile.get(reference.sourceFile) ?? new Map<string, string>();
    fileReplacements.set(reference.localPath, replacement);
    rewritesByFile.set(reference.sourceFile, fileReplacements);
  }

  if (APPLY) {
    runScopedOptimizer([...sourcesToOptimize]);
  }

  let rewrittenFiles = 0;
  for (const [relativeFilePath, replacements] of rewritesByFile.entries()) {
    const didRewrite = rewriteFileReferences(path.join(ROOT, relativeFilePath), replacements);
    if (didRewrite) {
      rewrittenFiles += 1;
    }
  }

  console.log('\nImage Pipeline Sync');
  console.log('='.repeat(48));
  console.log(`Mode: ${APPLY ? 'apply' : 'dry-run'}`);
  console.log(`Referenced local images scanned: ${references.length}`);
  console.log(`Stranded files in public/images: ${strandedImageFiles.length}`);
  console.log(`Moved to public/original-images: ${movedFiles.length}`);
  console.log(`Duplicate raw files removed from public/images: ${removedDuplicates.length}`);
  console.log(`Sources queued for optimization: ${sourcesToOptimize.size}`);
  console.log(`Files with rewritten references: ${rewrittenFiles}`);
  console.log(`Missing optimized references found: ${missingOptimizedRefs.length}`);

  if (movedFiles.length > 0) {
    console.log('\nMoved files:');
    for (const filePath of movedFiles) {
      console.log(`  - ${path.relative(ROOT, filePath)}`);
    }
  }

  if (removedDuplicates.length > 0) {
    console.log('\nRemoved duplicate raw files:');
    for (const filePath of removedDuplicates) {
      console.log(`  - public/images duplicate of ${path.relative(ROOT, filePath)}`);
    }
  }

  if (missingOptimizedRefs.length > 0) {
    console.log('\nMissing optimized references:');
    for (const entry of missingOptimizedRefs) {
      console.log(`  - ${entry}`);
    }
  }

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
  }

  if (!APPLY) {
    console.log('\nRun with --apply to move raw files, generate missing optimized assets, and rewrite stale references.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
