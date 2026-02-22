#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';

type BlogPostFile = {
  slug?: string;
  content?: string;
  featuredImage?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  seo?: {
    ogImage?: string;
  };
};

type ReplaceResult = {
  changed: boolean;
  nextUrl: string;
  bytesSaved: number;
};

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');
const PUBLIC_ROOT = path.join(process.cwd(), 'public');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const VERBOSE = args.includes('--verbose');
const localeArg = args.find((arg) => arg.startsWith('--locales='));
const requestedLocales = localeArg
  ? localeArg
      .split('=')[1]
      .split(',')
      .map((locale) => locale.trim())
      .filter(Boolean)
  : null;

let scannedPosts = 0;
let changedPosts = 0;
let featuredImageUpdates = 0;
let seoImageUpdates = 0;
let contentPathUpdates = 0;
let contentImgAttributeUpdates = 0;
let duplicateHeroContentImageCount = 0;
let estimatedBytesSaved = 0;

function toRelative(filePath: string): string {
  return path.relative(process.cwd(), filePath);
}

function normalizeAssetPath(imagePath?: string): string {
  if (!imagePath) {
    return '';
  }
  return imagePath.split('?')[0].split('#')[0].trim();
}

function assetFilePath(imagePath: string): string {
  return path.join(PUBLIC_ROOT, imagePath.replace(/^\//, ''));
}

function exists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function replacePngWithWebpIfAvailable(imagePath?: string): ReplaceResult {
  const normalized = normalizeAssetPath(imagePath);
  if (!normalized || !normalized.endsWith('.png')) {
    return { changed: false, nextUrl: imagePath ?? '', bytesSaved: 0 };
  }

  const webpPath = normalized.replace(/\.png$/i, '.webp');
  const pngAbsPath = assetFilePath(normalized);
  const webpAbsPath = assetFilePath(webpPath);

  if (!exists(webpAbsPath)) {
    return { changed: false, nextUrl: imagePath ?? '', bytesSaved: 0 };
  }

  let bytesSaved = 0;
  try {
    const pngSize = fs.statSync(pngAbsPath).size;
    const webpSize = fs.statSync(webpAbsPath).size;
    bytesSaved = Math.max(0, pngSize - webpSize);
  } catch {
    bytesSaved = 0;
  }

  if (normalized === imagePath) {
    return { changed: true, nextUrl: webpPath, bytesSaved };
  }

  return {
    changed: true,
    nextUrl: (imagePath ?? '').replace(normalized, webpPath),
    bytesSaved,
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function addOrNormalizeContentImageAttributes(content: string): { next: string; updates: number } {
  let updates = 0;

  const next = content.replace(/<img\b[^>]*>/gi, (tag) => {
    let updatedTag = tag;
    let changed = false;

    if (/\sloading\s*=/i.test(updatedTag)) {
      const replaced = updatedTag.replace(/\sloading\s*=\s*(['"])[^'"]*\1/i, ' loading="lazy"');
      changed = changed || replaced !== updatedTag;
      updatedTag = replaced;
    } else {
      updatedTag = updatedTag.replace('<img', '<img loading="lazy"');
      changed = true;
    }

    if (/\sdecoding\s*=/i.test(updatedTag)) {
      const replaced = updatedTag.replace(/\sdecoding\s*=\s*(['"])[^'"]*\1/i, ' decoding="async"');
      changed = changed || replaced !== updatedTag;
      updatedTag = replaced;
    } else {
      updatedTag = updatedTag.replace('<img', '<img decoding="async"');
      changed = true;
    }

    if (/\sfetchpriority\s*=/i.test(updatedTag)) {
      const replaced = updatedTag.replace(/\sfetchpriority\s*=\s*(['"])[^'"]*\1/i, ' fetchpriority="low"');
      changed = changed || replaced !== updatedTag;
      updatedTag = replaced;
    } else {
      updatedTag = updatedTag.replace('<img', '<img fetchpriority="low"');
      changed = true;
    }

    if (changed) {
      updates += 1;
    }

    return updatedTag;
  });

  return { next, updates };
}

function firstContentImageSrc(content?: string): string {
  if (!content) {
    return '';
  }
  const match = /<img\b[^>]*\bsrc\s*=\s*(['"])(.*?)\1/i.exec(content);
  return match?.[2]?.trim() ?? '';
}

function getLocaleDirectories(): string[] {
  if (!exists(BLOG_ROOT)) {
    return [];
  }

  const all = fs
    .readdirSync(BLOG_ROOT)
    .filter((name) => exists(path.join(BLOG_ROOT, name)) && fs.statSync(path.join(BLOG_ROOT, name)).isDirectory())
    .sort();

  if (!requestedLocales || requestedLocales.length === 0) {
    return all;
  }

  return all.filter((locale) => requestedLocales.includes(locale));
}

function processPostFile(locale: string, filePath: string): void {
  scannedPosts += 1;

  let post: BlogPostFile;
  try {
    post = JSON.parse(fs.readFileSync(filePath, 'utf8')) as BlogPostFile;
  } catch (error) {
    console.error(`Failed to parse ${toRelative(filePath)}:`, error);
    return;
  }

  const changes: string[] = [];
  let content = post.content ?? '';

  const featuredOriginal = post.featuredImage?.url ?? '';
  const featuredReplace = replacePngWithWebpIfAvailable(featuredOriginal);
  if (featuredReplace.changed && post.featuredImage?.url) {
    post.featuredImage.url = featuredReplace.nextUrl;
    estimatedBytesSaved += featuredReplace.bytesSaved;
    featuredImageUpdates += 1;
    changes.push('featuredImage.url: png->webp');

    if (content && featuredOriginal) {
      const featuredRegex = new RegExp(escapeRegExp(featuredOriginal), 'g');
      const replaced = content.replace(featuredRegex, featuredReplace.nextUrl);
      if (replaced !== content) {
        content = replaced;
        contentPathUpdates += 1;
        changes.push('content: matched featured image src updated');
      }
    }
  }

  const ogOriginal = post.seo?.ogImage ?? '';
  const ogReplace = replacePngWithWebpIfAvailable(ogOriginal);
  if (ogReplace.changed && post.seo) {
    post.seo.ogImage = ogReplace.nextUrl;
    estimatedBytesSaved += ogReplace.bytesSaved;
    seoImageUpdates += 1;
    changes.push('seo.ogImage: png->webp');
  }

  if (content) {
    const contentImageAttrResult = addOrNormalizeContentImageAttributes(content);
    if (contentImageAttrResult.next !== content) {
      content = contentImageAttrResult.next;
      contentImgAttributeUpdates += contentImageAttrResult.updates;
      changes.push(`content: normalized img attrs (${contentImageAttrResult.updates})`);
    }
  }

  const firstImg = normalizeAssetPath(firstContentImageSrc(content));
  const featuredNow = normalizeAssetPath(post.featuredImage?.url ?? '');
  if (firstImg && featuredNow && firstImg === featuredNow) {
    duplicateHeroContentImageCount += 1;
  }

  if (content !== (post.content ?? '')) {
    post.content = content;
  }

  if (changes.length > 0) {
    changedPosts += 1;
    if (WRITE) {
      fs.writeFileSync(filePath, `${JSON.stringify(post, null, 2)}\n`, 'utf8');
    }
    if (VERBOSE) {
      console.log(`${WRITE ? 'UPDATED' : 'WOULD UPDATE'} ${locale}/${post.slug ?? path.basename(filePath, '.json')}`);
      for (const change of changes) {
        console.log(`  - ${change}`);
      }
    }
  }
}

function main(): void {
  const locales = getLocaleDirectories();
  if (locales.length === 0) {
    console.error('No locales found under content/blog.');
    process.exit(1);
  }

  for (const locale of locales) {
    const localeDir = path.join(BLOG_ROOT, locale);
    const files = fs
      .readdirSync(localeDir)
      .filter((name) => name.endsWith('.json'))
      .sort()
      .map((name) => path.join(localeDir, name));

    for (const filePath of files) {
      processPostFile(locale, filePath);
    }
  }

  const mode = WRITE ? 'write' : 'dry-run';
  console.log(`Blog LCP image optimization (${mode})`);
  console.log(`Locales scanned: ${locales.join(', ')}`);
  console.log(`Posts scanned: ${scannedPosts}`);
  console.log(`Posts ${WRITE ? 'updated' : 'needing updates'}: ${changedPosts}`);
  console.log(`featuredImage.url updates: ${featuredImageUpdates}`);
  console.log(`seo.ogImage updates: ${seoImageUpdates}`);
  console.log(`content image src updates: ${contentPathUpdates}`);
  console.log(`content <img> attr updates: ${contentImgAttributeUpdates}`);
  console.log(`posts with duplicate hero as first content image: ${duplicateHeroContentImageCount}`);
  console.log(`estimated image byte savings: ${(estimatedBytesSaved / 1024).toFixed(1)}KB`);

  if (!WRITE) {
    console.log('No files were modified. Re-run with --write to apply changes.');
  }
}

main();
