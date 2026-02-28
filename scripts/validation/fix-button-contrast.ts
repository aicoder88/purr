#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';

type Mode = 'dry-run' | 'apply';

type RuleId =
  | 'blog-wrap-not-prose'
  | 'blog-red-cta-class-normalization'
  | 'tsx-brand-red-darker-bg'
  | 'tsx-indigo-chip-darker-text';

interface CliOptions {
  mode: Mode;
  includeGlobs: string[];
  locales: Set<string>;
  maxEdits: number;
}

interface FileChangeSummary {
  file: string;
  edits: number;
  rules: Partial<Record<RuleId, number>>;
}

interface MutableRunContext {
  editsUsed: number;
  maxEdits: number;
  mode: Mode;
  perRuleCounts: Record<RuleId, number>;
}

const DEFAULT_INCLUDE_GLOBS = [
  'content/blog/**/*.json',
  'app/learn/glossary/GlossaryPageClient.tsx',
  'app/stores/PageContent.tsx',
  'src/components/maps/LeafletRetailerMap.tsx',
];

const OUTPUT_DIR = path.resolve('reports/contrast-fixes');

function parseCliArgs(argv: string[]): CliOptions {
  let mode: Mode = 'dry-run';
  const includeGlobs: string[] = [];
  let locales = new Set<string>(['en', 'fr']);
  let maxEdits = Number.POSITIVE_INFINITY;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--apply') {
      mode = 'apply';
      continue;
    }

    if (arg === '--dry-run') {
      mode = 'dry-run';
      continue;
    }

    if (arg === '--include-glob' && argv[index + 1]) {
      includeGlobs.push(argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg.startsWith('--include-glob=')) {
      includeGlobs.push(arg.slice('--include-glob='.length));
      continue;
    }

    if (arg === '--locales' && argv[index + 1]) {
      locales = new Set(argv[index + 1].split(',').map((value) => value.trim()).filter(Boolean));
      index += 1;
      continue;
    }

    if (arg.startsWith('--locales=')) {
      locales = new Set(arg.slice('--locales='.length).split(',').map((value) => value.trim()).filter(Boolean));
      continue;
    }

    if (arg === '--max-edits' && argv[index + 1]) {
      const parsed = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        maxEdits = parsed;
      }
      index += 1;
      continue;
    }

    if (arg.startsWith('--max-edits=')) {
      const parsed = Number.parseInt(arg.slice('--max-edits='.length), 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        maxEdits = parsed;
      }
    }
  }

  return {
    mode,
    includeGlobs: includeGlobs.length > 0 ? includeGlobs : DEFAULT_INCLUDE_GLOBS,
    locales,
    maxEdits,
  };
}

function uniqueTokens(tokens: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  for (const token of tokens) {
    const normalized = token.trim();
    if (!normalized) {
      continue;
    }

    if (!seen.has(normalized)) {
      out.push(normalized);
      seen.add(normalized);
    }
  }

  return out;
}

function normalizeClassTokens(classValue: string): string[] {
  return classValue
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function incrementRule(ctx: MutableRunContext, fileRules: Partial<Record<RuleId, number>>, rule: RuleId): boolean {
  if (ctx.editsUsed >= ctx.maxEdits) {
    return false;
  }

  ctx.editsUsed += 1;
  ctx.perRuleCounts[rule] += 1;
  fileRules[rule] = (fileRules[rule] || 0) + 1;
  return true;
}

function getBlogLocale(relativeFile: string): string | null {
  const normalized = relativeFile.replaceAll('\\', '/');
  const match = normalized.match(/^content\/blog\/([^/]+)\//);
  return match ? match[1] : null;
}

function runBlogRules(content: string, ctx: MutableRunContext, fileRules: Partial<Record<RuleId, number>>): string {
  let nextContent = content;

  nextContent = nextContent.replace(
    /<div class="([^"]*?)">(\s*<(?:a|button)\b[^>]*class="[^"]*(?:bg-\[#FF3131\]|bg-brand-red(?:-\d{2,3})?)[^"]*"[\s\S]*?<\/(?:a|button)>\s*)<\/div>/g,
    (fullMatch, classValue: string, innerContent: string) => {
      const classTokens = normalizeClassTokens(classValue);
      if (classTokens.includes('not-prose')) {
        return fullMatch;
      }

      if (!incrementRule(ctx, fileRules, 'blog-wrap-not-prose')) {
        return fullMatch;
      }

      const updatedClass = uniqueTokens([...classTokens, 'not-prose']).join(' ');
      return `<div class="${updatedClass}">${innerContent}</div>`;
    }
  );

  nextContent = nextContent.replace(
    /<(a|button)\b([^>]*?)class="([^"]*)"([^>]*)>/g,
    (fullMatch, tagName: string, beforeClass: string, classValue: string, afterClass: string) => {
      const classTokens = normalizeClassTokens(classValue);

      const hasRedCtaPattern = classTokens.some((token) => (
        token === 'bg-[#FF3131]'
        || token === 'bg-brand-red'
        || /^bg-brand-red\/\d+$/.test(token)
        || /^bg-brand-red-\d{2,3}$/.test(token)
        || token === 'hover:bg-[#E62E2E]'
        || token === 'hover:bg-[#FF3131]/90'
        || token === 'hover:bg-brand-red'
        || token === 'hover:bg-brand-red/90'
      ));

      if (!hasRedCtaPattern) {
        return fullMatch;
      }

      const updatedTokens = classTokens.map((token) => {
        if (token === 'bg-[#FF3131]' || token === 'bg-brand-red' || /^bg-brand-red\/\d+$/.test(token)) {
          return 'bg-brand-red-600';
        }

        if (token === 'hover:bg-[#E62E2E]' || token === 'hover:bg-[#FF3131]/90' || token === 'hover:bg-brand-red' || token === 'hover:bg-brand-red/90') {
          return 'hover:bg-brand-red-700';
        }

        if (token === 'text-white') {
          return '!text-white';
        }

        if (token === 'dark:text-white') {
          return 'dark:!text-white';
        }

        return token;
      });

      if (!updatedTokens.includes('!text-white')) {
        updatedTokens.push('!text-white');
      }

      if (!updatedTokens.includes('dark:!text-white')) {
        updatedTokens.push('dark:!text-white');
      }

      const deduped = uniqueTokens(updatedTokens);
      const normalizedOriginal = uniqueTokens(classTokens).join(' ');
      const normalizedUpdated = deduped.join(' ');

      if (normalizedOriginal === normalizedUpdated) {
        return fullMatch;
      }

      if (!incrementRule(ctx, fileRules, 'blog-red-cta-class-normalization')) {
        return fullMatch;
      }

      return `<${tagName}${beforeClass}class="${normalizedUpdated}"${afterClass}>`;
    }
  );

  return nextContent;
}

function transformClassString(classValue: string, ctx: MutableRunContext, fileRules: Partial<Record<RuleId, number>>): string {
  let tokens = normalizeClassTokens(classValue);
  const original = uniqueTokens(tokens).join(' ');

  const hasBrandRedButton = tokens.includes('bg-brand-red') && tokens.some((token) => token.includes('text-white'));
  if (hasBrandRedButton && ctx.editsUsed < ctx.maxEdits) {
    const updated = tokens.map((token) => {
      if (token === 'bg-brand-red') {
        return 'bg-brand-red-600';
      }

      if (token === 'hover:bg-brand-red/90' || token === 'hover:bg-brand-red') {
        return 'hover:bg-brand-red-700';
      }

      return token;
    });

    const next = uniqueTokens(updated).join(' ');
    if (next !== uniqueTokens(tokens).join(' ')) {
      if (incrementRule(ctx, fileRules, 'tsx-brand-red-darker-bg')) {
        tokens = uniqueTokens(updated);
      }
    }
  }

  const hasIndigoChipPattern = tokens.includes('bg-electric-indigo/10') && tokens.includes('text-electric-indigo');
  if (hasIndigoChipPattern && ctx.editsUsed < ctx.maxEdits) {
    const updated = tokens.map((token) => {
      if (token === 'text-electric-indigo') {
        return 'text-electric-indigo-700';
      }

      if (token === 'dark:text-electric-indigo-400') {
        return 'dark:text-electric-indigo-300';
      }

      return token;
    });

    const next = uniqueTokens(updated).join(' ');
    if (next !== uniqueTokens(tokens).join(' ')) {
      if (incrementRule(ctx, fileRules, 'tsx-indigo-chip-darker-text')) {
        tokens = uniqueTokens(updated);
      }
    }
  }

  const normalized = uniqueTokens(tokens).join(' ');
  return normalized || original;
}

function runTsxRules(content: string, ctx: MutableRunContext, fileRules: Partial<Record<RuleId, number>>): string {
  return content.replace(/\bclassName\s*=\s*"([^"]*)"/g, (fullMatch, classValue: string) => {
    const updated = transformClassString(classValue, ctx, fileRules);
    if (updated === classValue) {
      return fullMatch;
    }

    return fullMatch.replace(classValue, updated);
  });
}

function buildOutputPath(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return path.join(OUTPUT_DIR, `fix-button-contrast-${timestamp}.json`);
}

async function run(): Promise<void> {
  const cli = parseCliArgs(process.argv.slice(2));
  const cwd = process.cwd();

  const files = await fg(cli.includeGlobs, {
    cwd,
    absolute: true,
    onlyFiles: true,
    unique: true,
    ignore: ['node_modules/**', '.next/**', 'reports/**'],
  });

  const sortedFiles = files.sort((a, b) => a.localeCompare(b));

  const ctx: MutableRunContext = {
    editsUsed: 0,
    maxEdits: cli.maxEdits,
    mode: cli.mode,
    perRuleCounts: {
      'blog-wrap-not-prose': 0,
      'blog-red-cta-class-normalization': 0,
      'tsx-brand-red-darker-bg': 0,
      'tsx-indigo-chip-darker-text': 0,
    },
  };

  const changedFiles: FileChangeSummary[] = [];
  let scannedFileCount = 0;
  let skippedByLocale = 0;

  for (const absoluteFile of sortedFiles) {
    const relativeFile = path.relative(cwd, absoluteFile);
    const locale = getBlogLocale(relativeFile);

    if (locale && !cli.locales.has(locale)) {
      skippedByLocale += 1;
      continue;
    }

    const original = fs.readFileSync(absoluteFile, 'utf8');
    let next = original;
    const fileRules: Partial<Record<RuleId, number>> = {};

    scannedFileCount += 1;

    if (relativeFile.endsWith('.json') && locale) {
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(original) as Record<string, unknown>;
      } catch {
        continue;
      }

      const content = typeof data.content === 'string' ? data.content : null;
      if (!content) {
        continue;
      }

      const updatedContent = runBlogRules(content, ctx, fileRules);
      if (updatedContent !== content) {
        data.content = updatedContent;
        next = `${JSON.stringify(data, null, 2)}\n`;
      }
    } else if (relativeFile.endsWith('.tsx')) {
      next = runTsxRules(original, ctx, fileRules);
    }

    if (next === original) {
      continue;
    }

    const fileEdits = Object.values(fileRules).reduce((sum, count) => sum + (count || 0), 0);
    changedFiles.push({
      file: relativeFile,
      edits: fileEdits,
      rules: fileRules,
    });

    if (cli.mode === 'apply') {
      fs.writeFileSync(absoluteFile, next);
    }

    if (ctx.editsUsed >= ctx.maxEdits) {
      break;
    }
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = buildOutputPath();

  const summary = {
    generatedAt: new Date().toISOString(),
    mode: cli.mode,
    options: {
      includeGlobs: cli.includeGlobs,
      locales: Array.from(cli.locales),
      maxEdits: Number.isFinite(cli.maxEdits) ? cli.maxEdits : null,
    },
    scannedFileCount,
    skippedByLocale,
    changedFileCount: changedFiles.length,
    edits: ctx.editsUsed,
    perRuleCounts: ctx.perRuleCounts,
    changedFiles,
  };

  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log(`Mode: ${cli.mode}`);
  console.log(`Scanned files: ${scannedFileCount}`);
  console.log(`Skipped by locale: ${skippedByLocale}`);
  console.log(`Changed files: ${changedFiles.length}`);
  console.log(`Edits ${cli.mode === 'apply' ? 'applied' : 'detected'}: ${ctx.editsUsed}`);
  console.log(`Summary JSON: ${outputPath}`);
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
