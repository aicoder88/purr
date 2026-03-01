#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost } from '@/types/blog';
import { locales as activeLocales } from '@/i18n/config';
import {
  extractFirstContentImage,
  normalizeImagePath,
  syncPreviewAndHeroImage,
} from '@/lib/blog/hero-preview-image-sync';

type IssueCode =
  | 'missing-featured-image'
  | 'missing-content-image'
  | 'hero-preview-mismatch'
  | 'featured-og-mismatch'
  | 'missing-image-file';

type Issue = {
  code: IssueCode;
  filePath: string;
  locale: string;
  slug: string;
  details: string;
};

const FIX_MODE = process.argv.includes('--fix');
const VERBOSE = process.argv.includes('--verbose');

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');
const PUBLIC_ROOT = path.join(process.cwd(), 'public');

function isDirectory(fullPath: string): boolean {
  try {
    return fs.statSync(fullPath).isDirectory();
  } catch {
    return false;
  }
}

function getLocaleDirectories(): string[] {
  if (!fs.existsSync(BLOG_ROOT)) {
    return [];
  }

  const activeLocaleSet = new Set<string>(activeLocales as readonly string[]);

  return fs
    .readdirSync(BLOG_ROOT)
    .filter((entry) => isDirectory(path.join(BLOG_ROOT, entry)) && activeLocaleSet.has(entry))
    .sort();
}

function getPostFilesForLocale(locale: string): string[] {
  const localeDir = path.join(BLOG_ROOT, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => path.join(localeDir, file));
}

function imagePathExists(imagePath: string): boolean {
  if (!imagePath) {
    return false;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return true;
  }

  const normalized = normalizeImagePath(imagePath);
  if (!normalized.startsWith('/')) {
    return true;
  }

  const fullPath = path.join(PUBLIC_ROOT, normalized.replace(/^\//, ''));
  return fs.existsSync(fullPath);
}

function collectIssuesForPost(
  post: BlogPost,
  locale: string,
  slug: string,
  filePath: string
): Issue[] {
  const issues: Issue[] = [];
  const featuredImageUrl = post.featuredImage?.url ?? '';
  const firstContentImage = extractFirstContentImage(post.content);
  const ogImage = post.seo?.ogImage ?? '';

  if (!featuredImageUrl) {
    issues.push({
      code: 'missing-featured-image',
      filePath,
      locale,
      slug,
      details: 'featuredImage.url is missing',
    });
  }

  if (!firstContentImage?.src) {
    issues.push({
      code: 'missing-content-image',
      filePath,
      locale,
      slug,
      details: 'No <img> tag found in post.content',
    });
  }

  if (featuredImageUrl && firstContentImage?.src) {
    const featuredNormalized = normalizeImagePath(featuredImageUrl);
    const firstImageNormalized = normalizeImagePath(firstContentImage.src);

    if (featuredNormalized !== firstImageNormalized) {
      issues.push({
        code: 'hero-preview-mismatch',
        filePath,
        locale,
        slug,
        details: `featuredImage.url=${featuredImageUrl} firstContentImage.src=${firstContentImage.src}`,
      });
    }
  }

  if (featuredImageUrl && normalizeImagePath(ogImage) !== normalizeImagePath(featuredImageUrl)) {
    issues.push({
      code: 'featured-og-mismatch',
      filePath,
      locale,
      slug,
      details: `featuredImage.url=${featuredImageUrl} seo.ogImage=${ogImage || '(missing)'}`,
    });
  }

  const imageRefs: Array<{ name: string; value: string }> = [
    { name: 'featuredImage.url', value: featuredImageUrl },
    { name: 'seo.ogImage', value: ogImage },
    { name: 'firstContentImage.src', value: firstContentImage?.src ?? '' },
  ];

  for (const ref of imageRefs) {
    if (!ref.value) {
      continue;
    }

    if (!imagePathExists(ref.value)) {
      issues.push({
        code: 'missing-image-file',
        filePath,
        locale,
        slug,
        details: `${ref.name} points to missing file: ${ref.value}`,
      });
    }
  }

  return issues;
}

function formatIssue(issue: Issue): string {
  const relativePath = path.relative(process.cwd(), issue.filePath);
  return `[${issue.code}] ${issue.locale}/${issue.slug} (${relativePath}) - ${issue.details}`;
}

function main() {
  const locales = getLocaleDirectories();
  if (locales.length === 0) {
    console.error('No locale directories found under content/blog.');
    process.exit(1);
  }

  let totalPosts = 0;
  let fixedPosts = 0;
  let parseFailures = 0;
  const issues: Issue[] = [];
  const issueCounts = new Map<IssueCode, number>();

  for (const locale of locales) {
    const postFiles = getPostFilesForLocale(locale);

    for (const filePath of postFiles) {
      totalPosts += 1;
      const slug = path.basename(filePath, '.json');

      let post: BlogPost;
      try {
        post = JSON.parse(fs.readFileSync(filePath, 'utf8')) as BlogPost;
      } catch (error) {
        parseFailures += 1;
        console.error(`Failed to parse ${path.relative(process.cwd(), filePath)}:`, error);
        continue;
      }

      if (FIX_MODE) {
        const syncResult = syncPreviewAndHeroImage(post);
        if (syncResult.changes.length > 0) {
          post = syncResult.post as BlogPost;
          fs.writeFileSync(filePath, `${JSON.stringify(post, null, 2)}\n`);
          fixedPosts += 1;

          if (VERBOSE) {
            const changeList = syncResult.changes.join(', ');
            console.log(`Fixed ${locale}/${slug}: ${changeList}`);
          }
        }
      }

      const postIssues = collectIssuesForPost(post, locale, slug, filePath);
      for (const issue of postIssues) {
        issues.push(issue);
        issueCounts.set(issue.code, (issueCounts.get(issue.code) ?? 0) + 1);
      }
    }
  }

  console.log('Blog Hero/Preview Image Consistency Check');
  console.log(`Mode: ${FIX_MODE ? 'fix' : 'check'}`);
  console.log(`Locales scanned: ${locales.join(', ')}`);
  console.log(`Posts scanned: ${totalPosts}`);
  console.log(`Posts fixed: ${fixedPosts}`);
  console.log(`Parse failures: ${parseFailures}`);

  if (issues.length === 0) {
    console.log('Result: PASS - preview/hero image consistency is valid for all scanned posts.');
    process.exit(0);
  }

  console.log(`Result: FAIL - found ${issues.length} issue(s).`);
  const sortedCodes: IssueCode[] = [
    'hero-preview-mismatch',
    'featured-og-mismatch',
    'missing-featured-image',
    'missing-content-image',
    'missing-image-file',
  ];

  for (const code of sortedCodes) {
    const count = issueCounts.get(code) ?? 0;
    if (count > 0) {
      console.log(`- ${code}: ${count}`);
    }
  }

  for (const issue of issues) {
    console.log(formatIssue(issue));
  }

  process.exit(1);
}

main();
