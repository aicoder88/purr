import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

import {
  ISSUE_COLUMN_TO_BUCKET,
  MANUAL_BUCKETS,
  SCRIPT_FIXABLE_BUCKETS,
  type SemrushIssueBucket,
} from './lib/issue-map';
import { buildRouteManifest } from './lib/route-manifest';
import { applyMetadataUrlFix } from './lib/fix-metadata-urls';
import { applyTitleBrandingFix } from './lib/fix-title-branding';
import { fixSitemapConfig } from './lib/fix-sitemap-config';
import { fixLinkTargetsInFile } from './lib/fix-link-targets';
import { writeUnresolvedReports, type UnresolvedIssue } from './lib/report-unresolved';

export interface SemrushIssueRow {
  pageUrl: string;
  raw: Record<string, string>;
}

export interface FixAction {
  type:
    | 'fix-metadata-urls'
    | 'fix-title-branding'
    | 'fix-sitemap-config'
    | 'fix-link-targets';
  target: string;
  changed: boolean;
  details?: Record<string, unknown>;
}

interface ParsedArgs {
  csv: string;
  mode: 'dry-run' | 'apply';
  baseUrl: string;
  reportDir: string;
}

const DEFAULT_BASE_URL = 'https://www.purrify.ca';
const DEFAULT_REPORT_ROOT = path.resolve(process.cwd(), 'reports/semrush');

function parseArgs(argv: string[]): ParsedArgs {
  const argMap = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value?.startsWith('--')) continue;

    const [key, inline] = value.split('=', 2);
    if (inline) {
      argMap.set(key, inline);
      continue;
    }

    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      argMap.set(key, next);
      i += 1;
    }
  }

  const csv = argMap.get('--csv');
  if (!csv) {
    throw new Error('Missing required flag: --csv <absolute_csv_path>');
  }

  const modeValue = argMap.get('--mode') ?? 'dry-run';
  if (modeValue !== 'dry-run' && modeValue !== 'apply') {
    throw new Error('Invalid --mode. Use dry-run or apply.');
  }

  const today = new Date().toISOString().slice(0, 10);

  return {
    csv: path.resolve(csv),
    mode: modeValue,
    baseUrl: argMap.get('--base-url') ?? DEFAULT_BASE_URL,
    reportDir: path.resolve(argMap.get('--report-dir') ?? path.join(DEFAULT_REPORT_ROOT, today)),
  };
}

function isPositiveFlag(raw: string | undefined): boolean {
  if (!raw) return false;
  const value = raw.trim().toLowerCase();
  if (value === '0' || value === '') return false;
  return value === '1' || value === 'true' || Number(value) > 0;
}

function parseCsvRows(csvPath: string): SemrushIssueRow[] {
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    bom: true,
  }) as Record<string, string>[];

  return records
    .filter((record) => typeof record['Page URL'] === 'string' && record['Page URL'].trim().length > 0)
    .map((record) => ({
      pageUrl: record['Page URL'].trim(),
      raw: record,
    }));
}

function normalizeToBase(url: string, baseUrl: string): string {
  try {
    const parsed = new URL(url);
    const base = new URL(baseUrl);
    const normalizedPath = parsed.pathname === '/' ? '/' : `${parsed.pathname.replace(/\/+$/, '')}/`;
    return `${base.origin}${normalizedPath}`;
  } catch {
    return url;
  }
}

function buildBuckets(rows: SemrushIssueRow[], baseUrl: string): Map<SemrushIssueBucket, Set<string>> {
  const buckets = new Map<SemrushIssueBucket, Set<string>>();

  for (const [column, bucket] of Object.entries(ISSUE_COLUMN_TO_BUCKET)) {
    buckets.set(bucket, new Set<string>());

    for (const row of rows) {
      if (isPositiveFlag(row.raw[column])) {
        buckets.get(bucket)?.add(normalizeToBase(row.pageUrl, baseUrl));
      }
    }
  }

  return buckets;
}

function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

function collectCodeFiles(rootDir: string): string[] {
  const out: string[] = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        out.push(fullPath);
      }
    }
  }

  return out;
}

function writeJson(targetPath: string, payload: unknown): void {
  fs.writeFileSync(targetPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');
}

function hasBucket(buckets: Map<SemrushIssueBucket, Set<string>>, bucket: SemrushIssueBucket): boolean {
  return (buckets.get(bucket)?.size ?? 0) > 0;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const workspaceRoot = process.cwd();

  ensureDir(args.reportDir);

  const rows = parseCsvRows(args.csv);
  const buckets = buildBuckets(rows, args.baseUrl);
  const routeManifest = buildRouteManifest(workspaceRoot);

  const summary = {
    sourceCsv: args.csv,
    mode: args.mode,
    totalRows: rows.length,
    buckets: Object.fromEntries(
      [...buckets.entries()].map(([bucket, urls]) => [bucket, { count: urls.size, urls: [...urls].sort() }])
    ),
  };

  const unresolved: UnresolvedIssue[] = [];
  const plannedEdits: FixAction[] = [];

  for (const [bucket, urls] of buckets) {
    if (urls.size === 0) continue;

    const scriptFixable = SCRIPT_FIXABLE_BUCKETS.has(bucket);
    if (!scriptFixable || MANUAL_BUCKETS.has(bucket)) {
      for (const url of urls) {
        unresolved.push({
          url,
          bucket,
          reason: 'manual semantic/content validation required',
        });
      }
    }
  }

  const shouldApply = args.mode === 'apply';

  if (hasBucket(buckets, 'hreflang') || hasBucket(buckets, 'duplicate-meta-description')) {
    const metadataTargets = [
      path.join(workspaceRoot, 'app'),
      path.join(workspaceRoot, 'src/lib/seo-utils.ts'),
    ];

    const files = [
      ...collectCodeFiles(metadataTargets[0]),
      metadataTargets[1],
    ];

    for (const filePath of files) {
      const result = shouldApply ? applyMetadataUrlFix(filePath) : { changed: false, mutations: 0 };
      if (shouldApply && result.changed) {
        plannedEdits.push({
          type: 'fix-metadata-urls',
          target: filePath,
          changed: true,
          details: { mutations: result.mutations },
        });
      }
    }
  }

  if (hasBucket(buckets, 'duplicate-title') || hasBucket(buckets, 'long-title')) {
    const files = collectCodeFiles(path.join(workspaceRoot, 'app'));

    for (const filePath of files) {
      const result = shouldApply ? applyTitleBrandingFix(filePath) : { changed: false, mutations: 0 };
      if (shouldApply && result.changed) {
        plannedEdits.push({
          type: 'fix-title-branding',
          target: filePath,
          changed: true,
          details: { mutations: result.mutations },
        });
      }
    }
  }

  if (hasBucket(buckets, 'sitemap')) {
    const sitemapPath = path.join(workspaceRoot, 'next-sitemap.config.js');
    const result = shouldApply ? fixSitemapConfig(sitemapPath, routeManifest) : { changed: false, removed: [] as string[] };

    plannedEdits.push({
      type: 'fix-sitemap-config',
      target: sitemapPath,
      changed: result.changed,
      details: { removed: result.removed },
    });
  }

  if (hasBucket(buckets, 'broken-links') || hasBucket(buckets, 'temporary-redirect')) {
    const files = collectCodeFiles(path.join(workspaceRoot, 'app'));

    for (const filePath of files) {
      const result = shouldApply ? fixLinkTargetsInFile(filePath, routeManifest) : { changed: false, mutations: 0 };
      if (shouldApply && result.changed) {
        plannedEdits.push({
          type: 'fix-link-targets',
          target: filePath,
          changed: true,
          details: { mutations: result.mutations },
        });
      }
    }
  }

  writeJson(path.join(args.reportDir, 'summary.json'), summary);
  writeJson(path.join(args.reportDir, 'planned-edits.json'), plannedEdits);
  writeUnresolvedReports(args.reportDir, unresolved);

  console.log(`SEMrush remediation run complete (${args.mode}).`);
  console.log(`Report directory: ${args.reportDir}`);
  console.log(`Rows parsed: ${rows.length}`);
  console.log(`Planned edits: ${plannedEdits.length}`);
  console.log(`Unresolved manual items: ${unresolved.length}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`SEMrush remediation failed: ${message}`);
  process.exit(1);
});
