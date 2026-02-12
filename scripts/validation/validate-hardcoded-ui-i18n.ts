import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import fg from 'fast-glob';

type ViolationKind = 'jsx-text' | 'jsx-attribute';

interface Violation {
  file: string;
  line: number;
  column: number;
  kind: ViolationKind;
  text: string;
}

interface BaselineFile {
  version: 1;
  generatedAt: string;
  violations: string[];
}

const BASELINE_PATH = path.resolve('scripts/validation/i18n-hardcoded-baseline.json');
const JSON_REPORT_PATH = path.resolve('reports/i18n-hardcoded-sweep.json');
const MD_REPORT_PATH = path.resolve('reports/i18n-hardcoded-sweep.md');

const INCLUDE_PATTERNS = [
  'app/**/*.tsx',
  'src/components/**/*.tsx',
];

const EXCLUDE_PATTERNS = [
  'app/api/**',
  'app/admin/**',
  'app/**/route.tsx',
  'app/**/route.ts',
  'app/**/opengraph-image.tsx',
  'app/**/icon.tsx',
  'src/components/admin/**',
  '**/*.test.tsx',
  '**/*.test.ts',
  '**/*.spec.tsx',
  '**/*.spec.ts',
  '**/*.stories.tsx',
  '**/__tests__/**',
  'node_modules/**',
];

const TRANSLATABLE_ATTRIBUTES = new Set([
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'aria-description',
  'aria-roledescription',
  'label',
]);

interface CliOptions {
  strict: boolean;
  updateBaseline: boolean;
  filesFrom?: string;
}

function parseCliOptions(argv: string[]): CliOptions {
  let strict = false;
  let updateBaseline = false;
  let filesFrom: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--strict') {
      strict = true;
      continue;
    }

    if (arg === '--update-baseline') {
      updateBaseline = true;
      continue;
    }

    if (arg.startsWith('--files-from=')) {
      filesFrom = arg.slice('--files-from='.length);
      continue;
    }

    if (arg === '--files-from') {
      const nextArg = argv[index + 1];
      if (!nextArg) {
        throw new Error('Missing value for --files-from');
      }
      filesFrom = nextArg;
      index += 1;
      continue;
    }
  }

  return {
    strict,
    updateBaseline,
    filesFrom,
  };
}

const CLI = parseCliOptions(process.argv.slice(2));
const SHOULD_UPDATE_BASELINE = CLI.updateBaseline;
const STRICT_MODE = CLI.strict;

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function shouldSkipByPath(relativeFile: string): boolean {
  return relativeFile.includes('/app/customer/')
    || relativeFile.includes('/app/affiliate/')
    || relativeFile.includes('/src/components/customer/')
    || relativeFile.includes('/src/components/auth/');
}

function isLocalizationAwareFile(content: string, relativeFile: string): boolean {
  if (relativeFile.includes('/app/[locale]/')) {
    return true;
  }

  return /useTranslation\s*\(/.test(content) || /useTranslations\s*\(/.test(content);
}

function isHumanText(value: string): boolean {
  const trimmed = normalizeWhitespace(value);
  if (!trimmed) {
    return false;
  }

  if (trimmed.length <= 1) {
    return false;
  }

  // Ignore formulas, simple units and symbol-only content.
  if (/^[\d\s.,:%+\-/()]+$/.test(trimmed)) {
    return false;
  }

  if (/^[A-Z0-9\s×x\-_.]{1,10}$/.test(trimmed) && !/[a-z]/.test(trimmed)) {
    return false;
  }

  return /[A-Za-z]/.test(trimmed);
}

function getLineAndColumn(sourceFile: ts.SourceFile, node: ts.Node): { line: number; column: number } {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return { line: line + 1, column: character + 1 };
}

function collectViolationsForFile(absoluteFile: string, rootDir: string): Violation[] {
  const relativeFile = path.relative(rootDir, absoluteFile);

  if (shouldSkipByPath(`/${relativeFile}`)) {
    return [];
  }

  const content = fs.readFileSync(absoluteFile, 'utf8');
  if (!isLocalizationAwareFile(content, `/${relativeFile}`)) {
    return [];
  }

  const sourceFile = ts.createSourceFile(
    absoluteFile,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const violations: Violation[] = [];

  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node)) {
      const text = normalizeWhitespace(node.getText(sourceFile));
      if (isHumanText(text)) {
        const { line, column } = getLineAndColumn(sourceFile, node);
        violations.push({
          file: relativeFile,
          line,
          column,
          kind: 'jsx-text',
          text,
        });
      }
    }

    if (ts.isJsxAttribute(node)) {
      const attributeName = node.name.getText(sourceFile);
      if (node.initializer && ts.isStringLiteral(node.initializer) && TRANSLATABLE_ATTRIBUTES.has(attributeName)) {
        const text = normalizeWhitespace(node.initializer.text);
        if (isHumanText(text)) {
          const { line, column } = getLineAndColumn(sourceFile, node.initializer);
          violations.push({
            file: relativeFile,
            line,
            column,
            kind: 'jsx-attribute',
            text: `${attributeName}="${text}"`,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return violations;
}

function getViolationFingerprint(violation: Violation): string {
  return `${violation.file}|${violation.kind}|${violation.text}`;
}

function writeReports(violations: Violation[], rootDir: string): void {
  const grouped = new Map<string, Violation[]>();
  for (const violation of violations) {
    const existing = grouped.get(violation.file) || [];
    existing.push(violation);
    grouped.set(violation.file, existing);
  }

  const topFiles = Array.from(grouped.entries())
    .map(([file, items]) => ({ file, count: items.length }))
    .sort((a, b) => b.count - a.count);

  const jsonReport = {
    generatedAt: new Date().toISOString(),
    totalFiles: grouped.size,
    totalViolations: violations.length,
    topFiles,
    violations,
  };

  fs.mkdirSync(path.dirname(JSON_REPORT_PATH), { recursive: true });
  fs.writeFileSync(JSON_REPORT_PATH, JSON.stringify(jsonReport, null, 2));

  const markdownLines: string[] = [
    '# Hardcoded UI String Sweep',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `- Total files with violations: ${grouped.size}`,
    `- Total violations: ${violations.length}`,
    '',
    '## Top Files',
    '',
    '| File | Count |',
    '| --- | ---: |',
    ...topFiles.slice(0, 100).map((item) => `| \`${item.file}\` | ${item.count} |`),
    '',
    '## Sample Violations',
    '',
    '| File | Line | Kind | Text |',
    '| --- | ---: | --- | --- |',
    ...violations.slice(0, 300).map((item) => `| \`${item.file}\` | ${item.line} | ${item.kind} | ${item.text.replace(/\|/g, '\\|')} |`),
    '',
    `Reports written relative to \`${rootDir}\`:`,
    `- \`${path.relative(rootDir, JSON_REPORT_PATH)}\``,
    `- \`${path.relative(rootDir, MD_REPORT_PATH)}\``,
  ];

  fs.writeFileSync(MD_REPORT_PATH, markdownLines.join('\n'));
}

function updateBaseline(violations: Violation[]): void {
  const fingerprints = Array.from(new Set(violations.map(getViolationFingerprint))).sort();
  const payload: BaselineFile = {
    version: 1,
    generatedAt: new Date().toISOString(),
    violations: fingerprints,
  };

  fs.mkdirSync(path.dirname(BASELINE_PATH), { recursive: true });
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(payload, null, 2));
}

function readBaseline(): BaselineFile {
  if (!fs.existsSync(BASELINE_PATH)) {
    throw new Error(`Baseline file not found at ${BASELINE_PATH}. Run with --update-baseline first.`);
  }

  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')) as BaselineFile;
}

function resolveRequestedFiles(rootDir: string, filesFrom: string): string[] {
  const filesFromPath = path.resolve(rootDir, filesFrom);
  if (!fs.existsSync(filesFromPath)) {
    throw new Error(`--files-from path does not exist: ${filesFromPath}`);
  }

  const requested = fs.readFileSync(filesFromPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line.endsWith('.tsx'));

  const uniqueRequested = Array.from(new Set(requested));
  return uniqueRequested;
}

async function run(): Promise<void> {
  const rootDir = process.cwd();
  const requestedFiles = CLI.filesFrom
    ? resolveRequestedFiles(rootDir, CLI.filesFrom)
    : null;

  const files = await fg(requestedFiles || INCLUDE_PATTERNS, {
    cwd: rootDir,
    absolute: true,
    onlyFiles: true,
    ignore: EXCLUDE_PATTERNS,
  });

  if (STRICT_MODE && requestedFiles && files.length === 0) {
    console.log('No matching TSX files to validate for strict changed-files mode.');
    return;
  }

  const violations = files
    .flatMap((file) => collectViolationsForFile(file, rootDir))
    .sort((a, b) => {
      if (a.file !== b.file) return a.file.localeCompare(b.file);
      if (a.line !== b.line) return a.line - b.line;
      return a.column - b.column;
    });

  writeReports(violations, rootDir);

  if (SHOULD_UPDATE_BASELINE) {
    updateBaseline(violations);
    console.log(`Updated hardcoded i18n baseline with ${violations.length} violations.`);
    console.log(`JSON report: ${path.relative(rootDir, JSON_REPORT_PATH)}`);
    console.log(`Markdown report: ${path.relative(rootDir, MD_REPORT_PATH)}`);
    return;
  }

  if (STRICT_MODE) {
    if (requestedFiles) {
      const baseline = readBaseline();
      const baselineSet = new Set(baseline.violations);
      const currentFingerprints = Array.from(new Set(violations.map(getViolationFingerprint)));
      const regressions = currentFingerprints.filter((fingerprint) => !baselineSet.has(fingerprint));

      if (regressions.length > 0) {
        console.error(`Found ${regressions.length} strict changed-file regressions.`);
        console.error('Top regressions:');
        regressions.slice(0, 30).forEach((item) => console.error(`  - ${item}`));
        console.error(`See: ${path.relative(rootDir, MD_REPORT_PATH)}`);
        process.exit(1);
      }

      console.log(`No strict changed-file regressions detected. Checked files: ${files.length}.`);
      return;
    }

    if (violations.length > 0) {
      console.error(`Found ${violations.length} hardcoded UI string violations in strict mode.`);
      console.error(`See: ${path.relative(rootDir, MD_REPORT_PATH)}`);
      process.exit(1);
    }

    console.log('No hardcoded UI string violations found in strict mode.');
    return;
  }

  const baseline = readBaseline();
  const baselineSet = new Set(baseline.violations);
  const currentFingerprints = Array.from(new Set(violations.map(getViolationFingerprint)));

  const regressions = currentFingerprints.filter((fingerprint) => !baselineSet.has(fingerprint));

  if (regressions.length > 0) {
    console.error(`Detected ${regressions.length} new hardcoded UI string violations (regressions).`);
    console.error('Top regressions:');
    regressions.slice(0, 30).forEach((item) => console.error(`  - ${item}`));
    console.error(`See full report: ${path.relative(rootDir, MD_REPORT_PATH)}`);
    process.exit(1);
  }

  console.log(`No hardcoded UI i18n regressions detected. Current violations: ${violations.length} (baseline: ${baseline.violations.length}).`);
  console.log(`Report: ${path.relative(rootDir, MD_REPORT_PATH)}`);
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
