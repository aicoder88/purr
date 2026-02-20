#!/usr/bin/env ts-node
/**
 * Image Size Validation Script
 *
 * Validates that images in the project don't exceed recommended dimensions
 * to prevent performance issues and oversized downloads.
 *
 * Usage:
 *   npm run validate-images
 *   npx ts-node scripts/validate-image-sizes.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

// Image size limits (in pixels)
interface ImageLimit {
  maxWidth: number;
  maxHeight: number;
  description: string;
  exclude?: string[];
}

const IMAGE_LIMITS: Record<string, ImageLimit> = {
  // Blog preview images should be optimized for preview cards
  'public/optimized/blog': {
    maxWidth: 800,
    maxHeight: 800,
    description: 'Blog preview images'
  },
  // Hero and product images can be larger (allow tall portrait orientation)
  'public/optimized': {
    maxWidth: 3200,
    maxHeight: 3200,
    description: 'Hero and feature images',
    exclude: ['blog'] // Exclude blog subfolder (has stricter limits)
  },
  // Product images should be reasonable (allow portrait)
  'public/original-images/products': {
    maxWidth: 1200,
    maxHeight: 1800,
    description: 'Product images'
  }
};

interface ImageIssue {
  file: string;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
  category: string;
}

interface ResizeResult {
  file: string;
  oldWidth: number;
  oldHeight: number;
  newWidth: number;
  newHeight: number;
}

function getImageDimensions(imagePath: string): { width: number; height: number } | null {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${imagePath}"`, {
      encoding: 'utf8'
    });

    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);

    if (widthMatch && heightMatch) {
      return {
        width: parseInt(widthMatch[1], 10),
        height: parseInt(heightMatch[1], 10)
      };
    }
  } catch (error) {
    // sips not available or image read failed
    return null;
  }
  return null;
}

function findImages(dir: string, exclude: string[] = []): string[] {
  const images: string[] = [];

  if (!fs.existsSync(dir)) {
    return images;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip excluded directories
      if (!exclude.includes(entry.name)) {
        images.push(...findImages(fullPath, exclude));
      }
    } else if (entry.isFile()) {
      // Check if it's an image file
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

function validateImages(): ImageIssue[] {
  const issues: ImageIssue[] = [];

  for (const [directory, limits] of Object.entries(IMAGE_LIMITS)) {
    const images = findImages(directory, limits.exclude || []);

    console.log(`\nChecking ${images.length} images in ${directory}...`);
    console.log(`Limits: ${limits.maxWidth}x${limits.maxHeight}px (${limits.description})`);

    for (const imagePath of images) {
      const dimensions = getImageDimensions(imagePath);

      if (!dimensions) {
        console.log(`⚠️  Could not read dimensions: ${imagePath}`);
        continue;
      }

      if (dimensions.width > limits.maxWidth || dimensions.height > limits.maxHeight) {
        issues.push({
          file: imagePath,
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: limits.maxWidth,
          maxHeight: limits.maxHeight,
          category: limits.description
        });
      }
    }
  }

  return issues;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

function getScaleFactor(width: number, height: number, maxWidth: number, maxHeight: number): number {
  const widthScale = maxWidth / width;
  const heightScale = maxHeight / height;
  return Math.min(widthScale, heightScale, 1);
}

async function resizeImage(
  issue: ImageIssue,
  dryRun: boolean
): Promise<ResizeResult | null> {
  const scale = getScaleFactor(issue.width, issue.height, issue.maxWidth, issue.maxHeight);

  if (scale >= 1) {
    return null;
  }

  const targetWidth = Math.max(1, Math.floor(issue.width * scale));
  const targetHeight = Math.max(1, Math.floor(issue.height * scale));

  if (dryRun) {
    return {
      file: issue.file,
      oldWidth: issue.width,
      oldHeight: issue.height,
      newWidth: targetWidth,
      newHeight: targetHeight
    };
  }

  const ext = path.extname(issue.file).toLowerCase();
  const tempPath = `${issue.file}.resize-tmp`;
  let pipeline = sharp(issue.file).resize({
    width: targetWidth,
    height: targetHeight,
    fit: 'inside',
    withoutEnlargement: true
  });

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 85, effort: 6 });
  } else if (ext === '.avif') {
    pipeline = pipeline.avif({ quality: 70, effort: 6 });
  }

  await pipeline.toFile(tempPath);
  fs.renameSync(tempPath, issue.file);

  const updated = getImageDimensions(issue.file);
  return {
    file: issue.file,
    oldWidth: issue.width,
    oldHeight: issue.height,
    newWidth: updated?.width || targetWidth,
    newHeight: updated?.height || targetHeight
  };
}

async function applyFixes(issues: ImageIssue[], dryRun: boolean): Promise<ResizeResult[]> {
  const results: ResizeResult[] = [];

  for (const issue of issues) {
    try {
      const result = await resizeImage(issue, dryRun);
      if (result) {
        results.push(result);
      }
    } catch (error) {
      console.log(`⚠️  Failed to resize: ${issue.file}`);
      console.log(`   ${(error as Error).message}`);
    }
  }

  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const fixMode = args.includes('--fix');
  const dryRun = args.includes('--dry-run');

  console.log('🔍 Validating image sizes...\n');
  if (fixMode) {
    console.log(`🛠️  Fix mode enabled${dryRun ? ' (dry-run)' : ''}\n`);
  }

  const issues = validateImages();

  if (issues.length === 0) {
    console.log('\n✅ All images are within size limits!');
    process.exit(0);
  }

  console.log(`\n❌ Found ${issues.length} oversized image(s):\n`);

  for (const issue of issues) {
    const fileSize = fs.statSync(issue.file).size;
    console.log(`📸 ${issue.file}`);
    console.log(`   Current: ${issue.width}x${issue.height}px (${formatFileSize(fileSize)})`);
    console.log(`   Maximum: ${issue.maxWidth}x${issue.maxHeight}px`);
    console.log(`   Category: ${issue.category}`);

    // Suggest resize command
    const maxDim = Math.max(issue.maxWidth, issue.maxHeight);
    console.log(`   Fix: sips -Z ${maxDim} "${issue.file}"`);
    console.log();
  }

  console.log('💡 To resize all images automatically:');
  console.log('   npm run optimize-images:enhanced\n');

  if (fixMode) {
    console.log(`🔧 ${dryRun ? 'Would resize' : 'Resizing'} ${issues.length} image(s)...\n`);
    const resized = await applyFixes(issues, dryRun);
    console.log(`✅ ${dryRun ? 'Would resize' : 'Resized'} ${resized.length} image(s)\n`);

    if (resized.length > 0) {
      resized.slice(0, 20).forEach((item) => {
        console.log(
          `  ${item.file}: ${item.oldWidth}x${item.oldHeight} -> ${item.newWidth}x${item.newHeight}`
        );
      });
      if (resized.length > 20) {
        console.log(`  ... and ${resized.length - 20} more`);
      }
      console.log('');
    }

    if (!dryRun) {
      const remaining = validateImages();
      if (remaining.length === 0) {
        console.log('✅ All oversized images were fixed');
        process.exit(0);
      }
      console.log(`⚠️  ${remaining.length} oversized image(s) remain after fix`);
      process.exit(1);
    }

    process.exit(0);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
