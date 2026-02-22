/**
 * Image SEO Validator
 * Validates images for alt text, dimensions, and file sizes
 */

import fg from 'fast-glob';
import path from 'path';
import fs from 'fs';
import imageSize from 'image-size';

export interface ImageValidationOptions {
  mode?: 'runtime' | 'inventory';
  includeLegacyBacklog?: boolean;
}

export interface ImageIssue {
  filePath: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'alt-text' | 'dimensions' | 'file-size' | 'format';
  message: string;
  fix?: string;
  details?: {
    width?: number;
    height?: number;
    fileSize?: number;
    format?: string;
  };
}

export interface ImageValidationResult {
  totalImages: number;
  validImages: number;
  issues: ImageIssue[];
  actionableIssues: ImageIssue[];
  legacyBacklog?: ImageIssue[];
  stats: {
    missingAlt: number;
    oversized: number;
    wrongFormat: number;
    totalFileSize: number;
  };
}

interface ImageReference {
  imagePath: string;
  sourceFile: string;
  hasAlt: boolean;
  altText?: string;
  line?: number;
}

interface RuntimeImageReference {
  imagePath: string;
  sourceFile: string;
  resolvedPath?: string;
}

const MAX_IMAGE_SIZE_KB = 500; // 500KB max recommended
const MAX_WIDTH = 3200; // Max width in pixels
const MAX_HEIGHT = 3200; // Max height in pixels
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif']);
const RUNTIME_SOURCE_GLOBS = [
  'app/**/*.{ts,tsx,js,jsx,json,md,mdx,yml,yaml}',
  'src/**/*.{ts,tsx,js,jsx,json,md,mdx,yml,yaml}',
  'content/**/*.{ts,tsx,js,jsx,json,md,mdx,yml,yaml}',
];

function removeQueryAndHash(value: string): string {
  return value.split(/[?#]/, 1)[0];
}

function isExternalReference(value: string): boolean {
  return /^(https?:)?\/\//.test(value) || value.startsWith('data:') || value.startsWith('blob:');
}

function normalizeImageReferenceToFilePath(
  imagePath: string,
  sourceFile: string
): string | undefined {
  const cleanPath = removeQueryAndHash(imagePath.trim());
  if (!cleanPath || isExternalReference(cleanPath)) {
    return undefined;
  }

  const ext = path.extname(cleanPath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) {
    return undefined;
  }

  const cwd = process.cwd();
  if (cleanPath.startsWith('/')) {
    return path.join(cwd, 'public', cleanPath.replace(/^\/+/, ''));
  }

  if (cleanPath.startsWith('public/')) {
    return path.join(cwd, cleanPath);
  }

  if (cleanPath.startsWith('./') || cleanPath.startsWith('../')) {
    return path.resolve(cwd, path.dirname(sourceFile), cleanPath);
  }

  return path.resolve(cwd, cleanPath);
}

async function scanRuntimeImageReferences(): Promise<RuntimeImageReference[]> {
  const references: RuntimeImageReference[] = [];
  const sourceFiles = await fg(RUNTIME_SOURCE_GLOBS, {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  const referenceRegex =
    /(?:["'`(=:\s])((?:\/|\.{1,2}\/)[^"'`\s)]+\.(?:jpe?g|png|gif|webp|svg|avif))(?:[?#][^"'`\s)]*)?/gi;
  const markdownImageRegex = /!\[[^\]]*]\(([^)\s]+)\)/gi;

  for (const sourceFile of sourceFiles) {
    const content = fs.readFileSync(path.join(process.cwd(), sourceFile), 'utf-8');
    const localSeen = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = referenceRegex.exec(content)) !== null) {
      const imagePath = match[1];
      if (localSeen.has(imagePath)) {
        continue;
      }
      localSeen.add(imagePath);
      references.push({
        imagePath,
        sourceFile,
        resolvedPath: normalizeImageReferenceToFilePath(imagePath, sourceFile),
      });
    }

    while ((match = markdownImageRegex.exec(content)) !== null) {
      const imagePath = match[1];
      if (localSeen.has(imagePath)) {
        continue;
      }
      localSeen.add(imagePath);
      references.push({
        imagePath,
        sourceFile,
        resolvedPath: normalizeImageReferenceToFilePath(imagePath, sourceFile),
      });
    }
  }

  return references;
}

/**
 * Scan source files for image references
 */
export async function scanImageReferences(): Promise<ImageReference[]> {
  const references: ImageReference[] = [];

  // Scan TSX/JSX files (include app/ directory for App Router)
  const sourceFiles = await fg(['app/**/*.tsx', 'pages/**/*.tsx', 'src/**/*.tsx'], {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/.next/**'],
  });

  for (const file of sourceFiles) {
    const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
    const lines = content.split('\n');

    // Look for <img> and <Image> tags
    lines.forEach((line, index) => {
      // Match <img src="..." alt="..." />
      const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
      let match;

      while ((match = imgRegex.exec(line)) !== null) {
        const fullTag = match[0];
        const imagePath = match[1];
        const hasAlt = /alt=["'][^"']*["']/.test(fullTag);
        const altMatch = /alt=["']([^"']*)["']/.exec(fullTag);

        references.push({
          imagePath,
          sourceFile: file,
          hasAlt,
          altText: altMatch ? altMatch[1] : undefined,
          line: index + 1,
        });
      }

      // Match Next.js <Image> component
      const nextImageRegex = /<Image\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
      while ((match = nextImageRegex.exec(line)) !== null) {
        const fullTag = match[0];
        const imagePath = match[1];
        const hasAlt = /alt=["'][^"']*["']/.test(fullTag);
        const altMatch = /alt=["']([^"']*)["']/.exec(fullTag);

        references.push({
          imagePath,
          sourceFile: file,
          hasAlt,
          altText: altMatch ? altMatch[1] : undefined,
          line: index + 1,
        });
      }
    });
  }

  return references;
}

/**
 * Scan physical image files
 */
export async function scanImageFiles(): Promise<string[]> {
  const imageFiles = await fg(['public/**/*.{jpg,jpeg,png,gif,webp,svg,avif}'], {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/.next/**', '**/original-images/**', '**/images/**'],
  });

  return imageFiles.map((file) => path.join(process.cwd(), file));
}

function hasModernFormatSibling(filePath: string): boolean {
  const baseName = filePath.replace(/\.(jpe?g)$/i, '');
  return fs.existsSync(`${baseName}.webp`) || fs.existsSync(`${baseName}.avif`);
}

/**
 * Validate a single image file
 */
export function validateImageFile(
  filePath: string,
  options: { checkFormat?: boolean } = {}
): { valid: boolean; issues: ImageIssue[] } {
  const issues: ImageIssue[] = [];
  const checkFormat = options.checkFormat ?? true;

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      issues.push({
        filePath,
        severity: 'error',
        type: 'file-size',
        message: 'Image file not found',
      });
      return { valid: false, issues };
    }

    // Get file stats
    const stats = fs.statSync(filePath);
    const fileSizeKB = stats.size / 1024;

    // Check file size
    if (fileSizeKB > MAX_IMAGE_SIZE_KB) {
      issues.push({
        filePath,
        severity: 'warning',
        type: 'file-size',
        message: `Image file size (${Math.round(fileSizeKB)}KB) exceeds recommended ${MAX_IMAGE_SIZE_KB}KB`,
        fix: 'Compress or optimize the image using image optimization tools',
        details: { fileSize: Math.round(fileSizeKB) },
      });
    }

    // Get image dimensions (skip SVG)
    if (!filePath.endsWith('.svg')) {
      try {
        const buffer = fs.readFileSync(filePath);
        const dimensions = imageSize(buffer);

        if (dimensions.width && dimensions.width > MAX_WIDTH) {
          issues.push({
            filePath,
            severity: 'warning',
            type: 'dimensions',
            message: `Image width (${dimensions.width}px) exceeds maximum ${MAX_WIDTH}px`,
            fix: 'Resize the image to appropriate dimensions',
            details: {
              width: dimensions.width,
              height: dimensions.height,
            },
          });
        }

        if (dimensions.height && dimensions.height > MAX_HEIGHT) {
          issues.push({
            filePath,
            severity: 'warning',
            type: 'dimensions',
            message: `Image height (${dimensions.height}px) exceeds maximum ${MAX_HEIGHT}px`,
            fix: 'Resize the image to appropriate dimensions',
            details: {
              width: dimensions.width,
              height: dimensions.height,
            },
          });
        }
      } catch (err) {
        // Could not get dimensions, skip
      }
    }

    // Check format recommendations
    const ext = path.extname(filePath).toLowerCase();
    if (checkFormat && (ext === '.jpg' || ext === '.jpeg') && !hasModernFormatSibling(filePath)) {
      issues.push({
        filePath,
        severity: 'warning',
        type: 'format',
        message: 'Referenced JPG/JPEG has no same-basename WebP/AVIF sibling',
        fix: 'Add .webp or .avif version with the same basename',
        details: { format: ext },
      });
    }
  } catch (error) {
    issues.push({
      filePath,
      severity: 'error',
      type: 'file-size',
      message: `Failed to validate image: ${error}`,
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Validate alt text quality
 */
export function validateAltText(altText: string | undefined, imagePath: string): ImageIssue[] {
  const issues: ImageIssue[] = [];

  if (!altText || altText.trim() === '') {
    issues.push({
      filePath: imagePath,
      severity: 'error',
      type: 'alt-text',
      message: 'Image is missing alt text',
      fix: 'Add descriptive alt text that describes the image content',
    });
  } else {
    // Check for poor alt text
    const poorAltPatterns = [
      /^image$/i,
      /^img$/i,
      /^picture$/i,
      /^photo$/i,
      /^icon$/i,
      /^logo$/i,
      /^banner$/i,
    ];

    if (poorAltPatterns.some((pattern) => pattern.test(altText))) {
      issues.push({
        filePath: imagePath,
        severity: 'warning',
        type: 'alt-text',
        message: `Alt text "${altText}" is too generic`,
        fix: 'Use more descriptive alt text that explains the image content',
      });
    }

    // Check length
    if (altText.length > 125) {
      issues.push({
        filePath: imagePath,
        severity: 'warning',
        type: 'alt-text',
        message: `Alt text is too long (${altText.length} chars, recommended <125)`,
        fix: 'Shorten alt text while keeping it descriptive',
      });
    }

    if (altText.length < 5) {
      issues.push({
        filePath: imagePath,
        severity: 'warning',
        type: 'alt-text',
        message: `Alt text is too short (${altText.length} chars)`,
        fix: 'Add more descriptive alt text',
      });
    }
  }

  return issues;
}

/**
 * Validate all images in the project
 */
export async function validateAllImages(
  options: ImageValidationOptions = {}
): Promise<ImageValidationResult> {
  const mode = options.mode ?? 'runtime';
  const includeLegacyBacklog = options.includeLegacyBacklog ?? true;

  console.log('🖼️  Validating images...\n');

  const actionableIssues: ImageIssue[] = [];
  const legacyBacklog: ImageIssue[] = [];
  let missingAlt = 0;
  let oversized = 0;
  let wrongFormat = 0;
  let totalFileSize = 0;

  // 1. Scan image references in source code
  console.log('📝 Scanning image references in source code...');
  const references = await scanImageReferences();
  console.log(`  Found ${references.length} image references\n`);

  // 2. Validate alt text for each reference (kept as-is)
  console.log('🏷️  Validating alt text...');
  for (const ref of references) {
    const altIssues = validateAltText(ref.altText, ref.imagePath);
    if (altIssues.length > 0) {
      missingAlt++;
      altIssues.forEach((issue) => {
        actionableIssues.push({
          ...issue,
          filePath: `${ref.sourceFile}:${ref.line} (${ref.imagePath})`,
        });
      });
    }
  }
  console.log(`  Found ${missingAlt} images with alt text issues\n`);

  // 3. Scan physical image files
  console.log('📂 Scanning physical image files...');
  const imageFiles = await scanImageFiles();
  console.log(`  Found ${imageFiles.length} image files\n`);

  // 4. Resolve runtime image files
  const runtimeReferences = await scanRuntimeImageReferences();
  const runtimeFileSet = new Set<string>();
  let unresolvedRuntimeRefs = 0;

  if (mode === 'runtime') {
    runtimeReferences.forEach((ref) => {
      if (!ref.resolvedPath) {
        return;
      }
      if (fs.existsSync(ref.resolvedPath)) {
        runtimeFileSet.add(ref.resolvedPath);
      } else {
        unresolvedRuntimeRefs += 1;
      }
    });
    console.log(`🎯 Runtime mode: ${runtimeFileSet.size} referenced image files\n`);
    if (unresolvedRuntimeRefs > 0) {
      console.log(`ℹ️  Runtime scan skipped ${unresolvedRuntimeRefs} unresolved references\n`);
    }
  }

  // 5. Validate actionable image files
  console.log('✅ Validating actionable image files...');
  const actionableFiles = mode === 'runtime' ? [...runtimeFileSet] : imageFiles;
  let validCount = 0;

  for (const filePath of actionableFiles) {
    const result = validateImageFile(filePath);

    if (result.valid) {
      validCount++;
    } else {
      actionableIssues.push(...result.issues);

      result.issues.forEach((issue) => {
        if (issue.type === 'file-size' && issue.details?.fileSize) {
          oversized++;
          totalFileSize += issue.details.fileSize;
        }
        if (issue.type === 'format') {
          wrongFormat++;
        }
      });
    }
  }

  console.log(`  ${validCount}/${actionableFiles.length} actionable images passed validation\n`);

  // 6. Optional inventory backlog (non-blocking)
  if (mode === 'runtime' && includeLegacyBacklog) {
    const legacyFiles = imageFiles.filter((filePath) => !runtimeFileSet.has(filePath));
    console.log(`📚 Inventory backlog scan: ${legacyFiles.length} unreferenced image files...`);

    for (const filePath of legacyFiles) {
      const result = validateImageFile(filePath);
      if (!result.valid) {
        legacyBacklog.push(...result.issues);
      }
    }
    console.log(`  Legacy backlog issues: ${legacyBacklog.length}\n`);
  }

  return {
    totalImages: actionableFiles.length,
    validImages: validCount,
    issues: actionableIssues,
    actionableIssues,
    legacyBacklog: includeLegacyBacklog ? legacyBacklog : undefined,
    stats: {
      missingAlt,
      oversized,
      wrongFormat,
      totalFileSize: Math.round(totalFileSize),
    },
  };
}

/**
 * Generate image validation report
 */
export function generateImageReport(result: ImageValidationResult): string {
  const lines: string[] = [];

  lines.push('# Image SEO Validation Report\n');
  lines.push(`Generated: ${new Date().toISOString()}\n`);
  lines.push('---\n\n');

  lines.push('## Summary\n');
  lines.push(`- **Total Images**: ${result.totalImages}\n`);
  lines.push(`- **Valid Images**: ${result.validImages}\n`);
  lines.push(`- **Actionable Issues**: ${result.actionableIssues.length}\n`);
  lines.push(`- **Missing Alt Text**: ${result.stats.missingAlt}\n`);
  lines.push(`- **Oversized Images**: ${result.stats.oversized}\n`);
  lines.push(`- **Suboptimal Formats**: ${result.stats.wrongFormat}\n\n`);

  if (result.actionableIssues.length > 0) {
    // Group by severity
    const criticalIssues = result.actionableIssues.filter((i) => i.severity === 'critical');
    const errorIssues = result.actionableIssues.filter((i) => i.severity === 'error');
    const warningIssues = result.actionableIssues.filter((i) => i.severity === 'warning');

    if (criticalIssues.length > 0) {
      lines.push('## Critical Issues\n\n');
      criticalIssues.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.filePath}**\n`);
        lines.push(`   - Type: ${issue.type}\n`);
        lines.push(`   - Message: ${issue.message}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
    }

    if (errorIssues.length > 0) {
      lines.push('## Errors\n\n');
      errorIssues.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.filePath}**\n`);
        lines.push(`   - Type: ${issue.type}\n`);
        lines.push(`   - Message: ${issue.message}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
    }

    if (warningIssues.length > 0) {
      lines.push('## Warnings\n\n');
      warningIssues.slice(0, 20).forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.filePath}**\n`);
        lines.push(`   - Type: ${issue.type}\n`);
        lines.push(`   - Message: ${issue.message}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
      if (warningIssues.length > 20) {
        lines.push(`... and ${warningIssues.length - 20} more warnings\n\n`);
      }
    }
  }

  if (result.legacyBacklog && result.legacyBacklog.length > 0) {
    lines.push('## Legacy Inventory Backlog (Non-Blocking)\n\n');
    lines.push(`- Backlog Issues: ${result.legacyBacklog.length}\n\n`);
  }

  return lines.join('');
}
