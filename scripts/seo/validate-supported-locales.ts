import fs from 'node:fs';
import path from 'node:path';
import sitemap from '../../app/sitemap';
import { locales as supportedLocales } from '../../src/i18n/config';

type IssueType = 'sitemap' | 'alternates' | 'internal-link';

interface LocaleSurfaceIssue {
  type: IssueType;
  file: string;
  message: string;
  line?: number;
}

interface LocaleSurfaceValidationResult {
  passed: boolean;
  supportedLocales: string[];
  unsupportedLocales: string[];
  issues: LocaleSurfaceIssue[];
}

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const SOURCE_ROOTS = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'src', 'components'),
  path.join(process.cwd(), 'src', 'data'),
  path.join(process.cwd(), 'src', 'lib'),
  path.join(process.cwd(), 'public', 'documents'),
  path.join(process.cwd(), 'public', 'llms.txt'),
];

const SOURCE_FILE_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.txt',
  '.html',
  '.md',
  '.xml',
]);

function getUnsupportedLocales(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const supported = new Set(supportedLocales);

  return fs.readdirSync(BLOG_CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((locale) => !supported.has(locale as (typeof supportedLocales)[number]))
    .sort();
}

function getFilesToScan(rootPath: string): string[] {
  if (!fs.existsSync(rootPath)) {
    return [];
  }

  const stat = fs.statSync(rootPath);
  if (stat.isFile()) {
    return SOURCE_FILE_EXTENSIONS.has(path.extname(rootPath)) ? [rootPath] : [];
  }

  const files: string[] = [];

  for (const entry of fs.readdirSync(rootPath, { withFileTypes: true })) {
    const fullPath = path.join(rootPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getFilesToScan(fullPath));
      continue;
    }

    if (SOURCE_FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getUnsupportedLocalePathPattern(unsupportedLocales: string[]): RegExp | null {
  if (unsupportedLocales.length === 0) {
    return null;
  }

  const localesPattern = unsupportedLocales.map(escapeRegex).join('|');
  return new RegExp(
    String.raw`(?:https?:\/\/(?:www\.)?(?:${localesPattern})\.purrify\.ca\b|\/(?:${localesPattern})(?=\/|\b))`,
    'i',
  );
}

function isUnsupportedHreflang(code: string, unsupportedLocales: string[]): boolean {
  if (code.toLowerCase() === 'x-default') {
    return false;
  }

  const baseLocale = code.toLowerCase().split(/[-_]/)[0];
  return unsupportedLocales.includes(baseLocale);
}

async function scanSitemapForUnsupportedLocales(
  unsupportedLocales: string[],
  issues: LocaleSurfaceIssue[],
) {
  const entries = await sitemap();
  const unsupportedPathPattern = getUnsupportedLocalePathPattern(unsupportedLocales);

  for (const entry of entries) {
    if (unsupportedPathPattern?.test(entry.url)) {
      issues.push({
        type: 'sitemap',
        file: 'app/sitemap.ts',
        message: `Sitemap URL exposes unsupported locale: ${entry.url}`,
      });
    }

    const languages = (entry.alternates?.languages ?? {}) as Record<string, string>;

    for (const [hreflang, url] of Object.entries(languages)) {
      if (isUnsupportedHreflang(hreflang, unsupportedLocales)) {
        issues.push({
          type: 'alternates',
          file: 'app/sitemap.ts',
          message: `Sitemap alternates expose unsupported hreflang "${hreflang}"`,
        });
      }

      if (unsupportedPathPattern?.test(url)) {
        issues.push({
          type: 'alternates',
          file: 'app/sitemap.ts',
          message: `Sitemap alternate URL exposes unsupported locale: ${url}`,
        });
      }
    }
  }
}

function scanFilesForUnsupportedLocales(
  unsupportedLocales: string[],
  issues: LocaleSurfaceIssue[],
) {
  const files = SOURCE_ROOTS.flatMap(getFilesToScan);
  const unsupportedPathPattern = getUnsupportedLocalePathPattern(unsupportedLocales);

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    for (const [index, line] of content.split('\n').entries()) {
      if (unsupportedPathPattern?.test(line)) {
        issues.push({
          type: 'internal-link',
          file: relativePath,
          line: index + 1,
          message: `Unsupported locale path leaked into source: ${line.trim()}`,
        });
      }

      const hreflangMatch = line.match(/hreflang=["']([^"']+)["']/i);
      if (hreflangMatch && isUnsupportedHreflang(hreflangMatch[1], unsupportedLocales)) {
        issues.push({
          type: 'alternates',
          file: relativePath,
          line: index + 1,
          message: `Unsupported hreflang "${hreflangMatch[1]}" found`,
        });
      }
    }
  }
}

export async function validateSupportedLocaleSurface(): Promise<LocaleSurfaceValidationResult> {
  const unsupportedLocales = getUnsupportedLocales();
  const issues: LocaleSurfaceIssue[] = [];

  await scanSitemapForUnsupportedLocales(unsupportedLocales, issues);
  scanFilesForUnsupportedLocales(unsupportedLocales, issues);

  return {
    passed: issues.length === 0,
    supportedLocales: [...supportedLocales],
    unsupportedLocales,
    issues,
  };
}

async function main() {
  console.log('🌐 Validating supported locale SEO surface...\n');

  const result = await validateSupportedLocaleSurface();

  console.log(`Supported locales: ${result.supportedLocales.join(', ')}`);
  console.log(`Unsupported parked locales: ${result.unsupportedLocales.join(', ') || 'none'}`);
  console.log(`Issues found: ${result.issues.length}\n`);

  if (!result.passed) {
    for (const issue of result.issues) {
      const location = issue.line ? `${issue.file}:${issue.line}` : issue.file;
      console.error(`- [${issue.type}] ${location} ${issue.message}`);
    }

    process.exit(1);
  }

  console.log('✅ Supported locale SEO surface is clean\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
