import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');
const REPORTS_DIR = path.join(ROOT, 'reports');
const JSON_REPORT_PATH = path.join(REPORTS_DIR, 'ahrefs-issue-inventory.json');
const MARKDOWN_REPORT_PATH = path.join(REPORTS_DIR, 'ahrefs-issue-inventory.md');

const CONTENT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 155;

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeRoutePath(input) {
  if (!input) {
    return '/';
  }

  const withLeadingSlash = input.startsWith('/') ? input : `/${input}`;
  const collapsed = withLeadingSlash.replace(/\/+/g, '/');
  if (collapsed === '/') {
    return '/';
  }

  return `${collapsed.replace(/\/+$/, '')}/`;
}

function walkFiles(dirPath, out = []) {
  if (!fs.existsSync(dirPath)) {
    return out;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, out);
      continue;
    }

    if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(fullPath);
    }
  }

  return out;
}

function collectMetadataFiles() {
  return walkFiles(APP_DIR).filter((filePath) => {
    const relative = path.relative(APP_DIR, filePath);
    return /(?:^|\/)(?:page|layout|metadata)\.(?:t|j)sx?$/.test(relative);
  });
}

function routeFromFile(filePath) {
  const relative = path.relative(APP_DIR, filePath);
  const withoutExtension = relative.replace(/\.(?:t|j)sx?$/, '');
  const withoutLeaf = withoutExtension
    .replace(/\/page$/, '')
    .replace(/\/layout$/, '')
    .replace(/\/metadata$/, '');

  const cleaned = withoutLeaf
    .split(path.sep)
    .filter(Boolean)
    .filter((segment) => !/^\(.*\)$/.test(segment))
    .join('/');

  return normalizeRoutePath(cleaned ? `/${cleaned}` : '/');
}

function extractLiteralValues(content, key) {
  const matches = [];
  const patterns = [
    new RegExp(`${key}:\\s*'([^'\\\\]*(?:\\\\.[^'\\\\]*)*)'`, 'g'),
    new RegExp(`${key}:\\s*"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"`, 'g'),
    new RegExp(`${key}:\\s*\`([^\\\`\\\\]*(?:\\\\.[^\\\`\\\\]*)*)\``, 'g'),
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      matches.push(match[1]);
    }
  }

  return matches;
}

function extractSitemapRoutes() {
  const sitemapPath = path.join(APP_DIR, 'sitemap.ts');
  if (!fs.existsSync(sitemapPath)) {
    return [];
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...content.matchAll(/entry\(\s*['"`]([^'"`]+)['"`]/g)];
  return matches.map((match) => normalizeRoutePath(match[1]));
}

function pushIssue(collection, issue) {
  collection.push(issue);
}

function buildMarkdown(report) {
  const lines = [
    '# Ahrefs Issue Inventory',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Summary',
    '',
    `- Files scanned: ${report.summary.filesScanned}`,
    `- Metadata files scanned: ${report.summary.metadataFilesScanned}`,
    `- Remaining unsupported hreflang hits: ${report.summary.unsupportedHreflangHits}`,
    `- Noindex routes also present in sitemap: ${report.summary.noindexRoutesInSitemap}`,
    `- Client pages rendering head tags in body: ${report.summary.clientHeadTagPages}`,
    `- Malformed canonical templates: ${report.summary.malformedCanonicalTemplates}`,
    `- Long literal titles: ${report.summary.longLiteralTitles}`,
    `- Short literal descriptions: ${report.summary.shortLiteralDescriptions}`,
    `- Long literal descriptions: ${report.summary.longLiteralDescriptions}`,
    `- Missing openGraph on metadata exports: ${report.summary.missingOpenGraph}`,
    `- Missing H1 in page components: ${report.summary.missingH1}`,
    '',
  ];

  const sections = [
    ['Unsupported hreflang', report.unsupportedHreflangHits, (item) => `- ${item.file}: ${item.matches.join(', ')}`],
    ['Noindex routes in sitemap', report.noindexRoutesInSitemap, (item) => `- ${item.route} (${item.file})`],
    ['Client-side head tags', report.clientHeadTagPages, (item) => `- ${item.file}`],
    ['Malformed canonical templates', report.malformedCanonicalTemplates, (item) => `- ${item.file}`],
    ['Literal title length issues', report.longLiteralTitles, (item) => `- ${item.file}: ${item.length} chars`],
    ['Literal description too short', report.shortLiteralDescriptions, (item) => `- ${item.file}: ${item.length} chars`],
    ['Literal description too long', report.longLiteralDescriptions, (item) => `- ${item.file}: ${item.length} chars`],
    ['Metadata exports missing openGraph', report.missingOpenGraph, (item) => `- ${item.file}`],
    ['Page files missing H1', report.missingH1, (item) => `- ${item.file}`],
  ];

  for (const [title, items, formatter] of sections) {
    lines.push(`## ${title}`);
    lines.push('');

    if (items.length === 0) {
      lines.push('- None');
      lines.push('');
      continue;
    }

    for (const item of items) {
      lines.push(formatter(item));
    }

    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function main() {
  const allFiles = walkFiles(APP_DIR);
  const metadataFiles = collectMetadataFiles();
  const sitemapRoutes = new Set(extractSitemapRoutes());

  const unsupportedHreflangHits = [];
  const noindexRoutesInSitemap = [];
  const clientHeadTagPages = [];
  const malformedCanonicalTemplates = [];
  const longLiteralTitles = [];
  const shortLiteralDescriptions = [];
  const longLiteralDescriptions = [];
  const missingOpenGraph = [];
  const missingH1 = [];

  for (const filePath of metadataFiles) {
    const relative = path.relative(ROOT, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const route = routeFromFile(filePath);

    if (
      /languages\s*:\s*\{[\s\S]{0,1200}en-US/.test(content) ||
      /hrefLang\s*:\s*['"]en-US['"]/.test(content)
    ) {
      const matches = [...content.matchAll(/en-US/g)].map(() => 'en-US');
      pushIssue(unsupportedHreflangHits, {
        file: relative,
        route,
        matches,
      });
    }

    if (
      /robots:\s*\{[\s\S]*index:\s*false/i.test(content) &&
      sitemapRoutes.has(route)
    ) {
      pushIssue(noindexRoutesInSitemap, {
        file: relative,
        route,
      });
    }

    if (
      (content.startsWith("'use client';") || content.startsWith('"use client";')) &&
      (/<title>[\s\S]*<\/title>/.test(content) ||
        /<meta\s/i.test(content) ||
        /rel="canonical"/.test(content))
    ) {
      pushIssue(clientHeadTagPages, {
        file: relative,
        route,
      });
    }

    if (/\$\/\{/.test(content)) {
      pushIssue(malformedCanonicalTemplates, {
        file: relative,
        route,
      });
    }

    for (const title of extractLiteralValues(content, 'title')) {
      if (title.length > TITLE_MAX) {
        pushIssue(longLiteralTitles, {
          file: relative,
          route,
          length: title.length,
          title,
        });
      }
    }

    for (const description of extractLiteralValues(content, 'description')) {
      if (description.length < DESCRIPTION_MIN) {
        pushIssue(shortLiteralDescriptions, {
          file: relative,
          route,
          length: description.length,
          description,
        });
      } else if (description.length > DESCRIPTION_MAX) {
        pushIssue(longLiteralDescriptions, {
          file: relative,
          route,
          length: description.length,
          description,
        });
      }
    }

    if (
      /export\s+const\s+metadata\s*:\s*Metadata\s*=/.test(content) &&
      !/openGraph\s*:/.test(content)
    ) {
      pushIssue(missingOpenGraph, {
        file: relative,
        route,
      });
    }

    if (
      /\/page\.(?:t|j)sx?$/.test(filePath) &&
      !/<h1[\s>]/i.test(content) &&
      !/generateMetadata/.test(content)
    ) {
      pushIssue(missingH1, {
        file: relative,
        route,
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      filesScanned: allFiles.length,
      metadataFilesScanned: metadataFiles.length,
      unsupportedHreflangHits: unsupportedHreflangHits.length,
      noindexRoutesInSitemap: noindexRoutesInSitemap.length,
      clientHeadTagPages: clientHeadTagPages.length,
      malformedCanonicalTemplates: malformedCanonicalTemplates.length,
      longLiteralTitles: longLiteralTitles.length,
      shortLiteralDescriptions: shortLiteralDescriptions.length,
      longLiteralDescriptions: longLiteralDescriptions.length,
      missingOpenGraph: missingOpenGraph.length,
      missingH1: missingH1.length,
    },
    unsupportedHreflangHits,
    noindexRoutesInSitemap,
    clientHeadTagPages,
    malformedCanonicalTemplates,
    longLiteralTitles,
    shortLiteralDescriptions,
    longLiteralDescriptions,
    missingOpenGraph,
    missingH1,
  };

  ensureDir(REPORTS_DIR);
  fs.writeFileSync(JSON_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(MARKDOWN_REPORT_PATH, buildMarkdown(report), 'utf8');

  console.log(`Wrote ${path.relative(ROOT, JSON_REPORT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, MARKDOWN_REPORT_PATH)}`);
  console.log(JSON.stringify(report.summary, null, 2));
}

main();
