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

// Image size limits (in pixels)
const IMAGE_LIMITS = {
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
  'public/images/products': {
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

function main() {
  console.log('🔍 Validating image sizes...\n');

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

  process.exit(1);
}

main();
