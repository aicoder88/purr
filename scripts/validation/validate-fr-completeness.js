#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, 'reports');
const JSON_REPORT_PATH = path.join(REPORTS_DIR, 'fr-translation-completeness.json');
const MD_REPORT_PATH = path.join(REPORTS_DIR, 'fr-translation-completeness.md');

const EN_NAMESPACE_DIR = path.join(ROOT, 'src', 'translations', 'namespaces', 'en');
const FR_NAMESPACE_DIR = path.join(ROOT, 'src', 'translations', 'namespaces', 'fr');
const BLOG_EN_DIR = path.join(ROOT, 'content', 'blog', 'en');
const BLOG_FR_DIR = path.join(ROOT, 'content', 'blog', 'fr');

const ENGLISH_LEAK_PATTERNS = [
  /\bTL;DR\b/i,
  /\bQuick Answer\b/i,
  /\bTable of Contents\b/i,
  /\bRead More\b/i,
  /\bRelated Guides?\b/i,
  /\bTry Purrify free\b/i,
  /\bBest Cat Litter\b/i,
  /\bHow to\b/i,
  /\bWhy does my\b/i,
  /\bWhat is the\b/i,
];

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    namespaceFilesScanned: 0,
    blogEnglishFiles: 0,
    blogFrenchFiles: 0,
    errors: 0,
    warnings: 0,
    errorCategories: {},
    warningCategories: {},
  },
  errors: [],
  warnings: [],
};

function addIssue(level, category, file, pathKey, message) {
  report[level].push({
    category,
    file,
    path: pathKey,
    message,
  });
  report.summary[level === 'errors' ? 'errors' : 'warnings'] += 1;
  const categoryBucket = level === 'errors'
    ? report.summary.errorCategories
    : report.summary.warningCategories;
  categoryBucket[category] = (categoryBucket[category] || 0) + 1;
}

function ensureReportsDir() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function relativePath(absolutePath) {
  return path.relative(ROOT, absolutePath) || absolutePath;
}

function readJson(filePath, bucket, category) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    addIssue(
      bucket,
      category,
      relativePath(filePath),
      '',
      `Failed to parse JSON: ${error.message}`,
    );
    return null;
  }
}

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .sort();
}

function valueType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  return typeof value;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function stripHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\/[a-z0-9-/_]+/gi, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function looksLikeHumanText(value) {
  const normalized = normalizeWhitespace(value);
  if (!normalized || normalized.length < 6) {
    return false;
  }

  return /[A-Za-z]/.test(normalized);
}

function detectEnglishLeakage(value) {
  const text = stripHtml(value);
  if (!looksLikeHumanText(text)) {
    return null;
  }

  for (const pattern of ENGLISH_LEAK_PATTERNS) {
    if (pattern.test(text)) {
      return `Possible English copy leak matched ${pattern}`;
    }
  }

  return null;
}

function compareStructures(baseValue, targetValue, ctx) {
  const baseType = valueType(baseValue);
  const targetType = valueType(targetValue);

  if (baseType !== targetType) {
    addIssue(
      'errors',
      ctx.category,
      ctx.file,
      ctx.pathKey,
      `Type mismatch: expected ${baseType}, found ${targetType}`,
    );
    return;
  }

  if (baseType === 'string') {
    if (normalizeWhitespace(targetValue).length === 0) {
      addIssue('errors', ctx.category, ctx.file, ctx.pathKey, 'French value is empty');
      return;
    }

    const leakage = detectEnglishLeakage(targetValue);
    if (leakage) {
      addIssue('warnings', ctx.category, ctx.file, ctx.pathKey, leakage);
    }

    return;
  }

  if (baseType === 'array') {
    if (targetValue.length < baseValue.length) {
      for (let index = targetValue.length; index < baseValue.length; index += 1) {
        addIssue(
          'errors',
          ctx.category,
          ctx.file,
          `${ctx.pathKey}[${index}]`,
          'Missing French array item',
        );
      }
    }

    if (targetValue.length > baseValue.length) {
      addIssue(
        'warnings',
        ctx.category,
        ctx.file,
        ctx.pathKey,
        `French array has ${targetValue.length - baseValue.length} extra item(s)`,
      );
    }

    const limit = Math.min(baseValue.length, targetValue.length);
    for (let index = 0; index < limit; index += 1) {
      compareStructures(baseValue[index], targetValue[index], {
        ...ctx,
        pathKey: `${ctx.pathKey}[${index}]`,
      });
    }
    return;
  }

  if (baseType === 'object') {
    const baseKeys = Object.keys(baseValue);
    const targetKeys = Object.keys(targetValue);

    for (const key of baseKeys) {
      const childPath = ctx.pathKey ? `${ctx.pathKey}.${key}` : key;
      if (!Object.prototype.hasOwnProperty.call(targetValue, key)) {
        addIssue('errors', ctx.category, ctx.file, childPath, 'Missing French key');
        continue;
      }

      compareStructures(baseValue[key], targetValue[key], {
        ...ctx,
        pathKey: childPath,
      });
    }

    for (const key of targetKeys) {
      if (!Object.prototype.hasOwnProperty.call(baseValue, key)) {
        const childPath = ctx.pathKey ? `${ctx.pathKey}.${key}` : key;
        addIssue('warnings', ctx.category, ctx.file, childPath, 'Extra French key not present in English');
      }
    }
  }
}

function auditNamespaces() {
  const englishFiles = listJsonFiles(EN_NAMESPACE_DIR);
  report.summary.namespaceFilesScanned = englishFiles.length;

  for (const filename of englishFiles) {
    const enPath = path.join(EN_NAMESPACE_DIR, filename);
    const frPath = path.join(FR_NAMESPACE_DIR, filename);

    if (!fs.existsSync(frPath)) {
      addIssue(
        'errors',
        'namespace',
        relativePath(frPath),
        '',
        'Missing French namespace file',
      );
      continue;
    }

    const enJson = readJson(enPath, 'errors', 'namespace');
    const frJson = readJson(frPath, 'errors', 'namespace');
    if (!enJson || !frJson) {
      continue;
    }

    compareStructures(enJson, frJson, {
      category: 'namespace',
      file: relativePath(frPath),
      pathKey: '',
    });
  }
}

function auditBlogCollections() {
  const englishFiles = listJsonFiles(BLOG_EN_DIR);
  const frenchFiles = listJsonFiles(BLOG_FR_DIR);
  report.summary.blogEnglishFiles = englishFiles.length;
  report.summary.blogFrenchFiles = frenchFiles.length;

  const frenchSet = new Set(frenchFiles);
  const englishSet = new Set(englishFiles);

  for (const filename of englishFiles) {
    if (!frenchSet.has(filename)) {
      addIssue(
        'errors',
        'blog-slug',
        relativePath(path.join(BLOG_FR_DIR, filename)),
        '',
        'Missing French blog translation for English slug',
      );
    }
  }

  for (const filename of frenchFiles) {
    if (!englishSet.has(filename)) {
      addIssue(
        'warnings',
        'blog-slug',
        relativePath(path.join(BLOG_FR_DIR, filename)),
        '',
        'French blog post has no English source counterpart',
      );
    }
  }

  for (const filename of englishFiles) {
    if (!frenchSet.has(filename)) {
      continue;
    }

    const enPath = path.join(BLOG_EN_DIR, filename);
    const frPath = path.join(BLOG_FR_DIR, filename);
    const enJson = readJson(enPath, 'errors', 'blog-structure');
    const frJson = readJson(frPath, 'errors', 'blog-structure');
    if (!enJson || !frJson) {
      continue;
    }

    compareStructures(enJson, frJson, {
      category: 'blog-structure',
      file: relativePath(frPath),
      pathKey: '',
    });

    validateFrenchBlogContent(enJson, frJson, frPath);
  }
}

function validateFrenchBlogContent(enJson, frJson, frPath) {
  const file = relativePath(frPath);

  if (frJson.locale !== 'fr') {
    addIssue('errors', 'blog-quality', file, 'locale', `Expected locale "fr", found "${frJson.locale}"`);
  }

  if (frJson.slug !== enJson.slug) {
    addIssue('errors', 'blog-quality', file, 'slug', 'French slug does not match English source slug');
  }

  if (frJson.seo && typeof frJson.seo.title === 'string' && /(\.\.\.|…)$/.test(frJson.seo.title.trim())) {
    addIssue('warnings', 'blog-quality', file, 'seo.title', 'French SEO title looks truncated');
  }

  if (frJson.seo && typeof frJson.seo.description === 'string' && /(\.\.\.|…)$/.test(frJson.seo.description.trim())) {
    addIssue('warnings', 'blog-quality', file, 'seo.description', 'French SEO description looks truncated');
  }

  if (isObject(frJson.translations) && Object.keys(frJson.translations).length === 0) {
    addIssue('warnings', 'blog-quality', file, 'translations', 'French blog post has an empty translations map');
  }

  if (typeof enJson.content === 'string' && typeof frJson.content === 'string') {
    const enLength = stripHtml(enJson.content).length;
    const frLength = stripHtml(frJson.content).length;

    if (enLength >= 2000 && frLength / enLength < 0.45) {
      addIssue(
        'warnings',
        'blog-quality',
        file,
        'content',
        `French content is much shorter than English source (${frLength} vs ${enLength} chars)`,
      );
    }
  }
}

function writeReports() {
  ensureReportsDir();

  fs.writeFileSync(JSON_REPORT_PATH, JSON.stringify(report, null, 2));

  const errorCategoryLines = Object.entries(report.summary.errorCategories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => `- ${category}: ${count}`);
  const warningCategoryLines = Object.entries(report.summary.warningCategories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => `- ${category}: ${count}`);
  const topErrors = report.errors.slice(0, 80);
  const topWarnings = report.warnings.slice(0, 80);
  const lines = [
    '# French Translation Completeness Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    `- Namespace files scanned: ${report.summary.namespaceFilesScanned}`,
    `- English blog files: ${report.summary.blogEnglishFiles}`,
    `- French blog files: ${report.summary.blogFrenchFiles}`,
    `- Errors: ${report.summary.errors}`,
    `- Warnings: ${report.summary.warnings}`,
    '',
    '## Error Categories',
    '',
    ...(errorCategoryLines.length > 0 ? errorCategoryLines : ['- none']),
    '',
    '## Warning Categories',
    '',
    ...(warningCategoryLines.length > 0 ? warningCategoryLines : ['- none']),
    '',
    '## Error Samples',
    '',
    '| Category | File | Path | Message |',
    '| --- | --- | --- | --- |',
    ...(
      topErrors.length > 0
        ? topErrors.map((issue) => `| ${issue.category} | \`${issue.file}\` | \`${issue.path || '-'}\` | ${issue.message} |`)
        : ['| - | - | - | No errors |']
    ),
    '',
    '## Warning Samples',
    '',
    '| Category | File | Path | Message |',
    '| --- | --- | --- | --- |',
    ...(
      topWarnings.length > 0
        ? topWarnings.map((issue) => `| ${issue.category} | \`${issue.file}\` | \`${issue.path || '-'}\` | ${issue.message} |`)
        : ['| - | - | - | No warnings |']
    ),
    '',
  ];

  fs.writeFileSync(MD_REPORT_PATH, `${lines.join('\n')}\n`);
}

function printSummary() {
  console.log('French translation completeness audit');
  console.log(`- Namespace files scanned: ${report.summary.namespaceFilesScanned}`);
  console.log(`- English blog files: ${report.summary.blogEnglishFiles}`);
  console.log(`- French blog files: ${report.summary.blogFrenchFiles}`);
  console.log(`- Errors: ${report.summary.errors}`);
  console.log(`- Warnings: ${report.summary.warnings}`);
  const errorCategorySummary = Object.entries(report.summary.errorCategories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, count]) => `${category}:${count}`)
    .join(', ');
  const warningCategorySummary = Object.entries(report.summary.warningCategories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, count]) => `${category}:${count}`)
    .join(', ');
  console.log(`- Error categories: ${errorCategorySummary || 'none'}`);
  console.log(`- Warning categories: ${warningCategorySummary || 'none'}`);
  console.log(`- JSON report: ${relativePath(JSON_REPORT_PATH)}`);
  console.log(`- Markdown report: ${relativePath(MD_REPORT_PATH)}`);

  const previewIssues = [...report.errors.slice(0, 10), ...report.warnings.slice(0, 10)];
  if (previewIssues.length > 0) {
    console.log('');
    for (const issue of previewIssues) {
      console.log(`  [${issue.category}] ${issue.file}${issue.path ? ` :: ${issue.path}` : ''} -> ${issue.message}`);
    }
  }
}

function main() {
  auditNamespaces();
  auditBlogCollections();
  writeReports();
  printSummary();

  if (report.summary.errors > 0) {
    process.exit(1);
  }
}

main();
