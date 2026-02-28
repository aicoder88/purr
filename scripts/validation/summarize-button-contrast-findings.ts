#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';

interface Finding {
  url: string;
  text?: string;
  normalizedText?: string;
  className?: string;
  href?: string;
  selector?: string;
  theme?: 'light' | 'dark' | string;
  foreground?: string;
  background?: string;
  ratio?: number;
  required?: number;
  contrastRatio?: number;
  requiredContrast?: number;
}

interface AuditReport {
  scannedAt: string;
  scannedPageCount: number;
  findingsCount: number;
  pageErrorCount: number;
  findings: Finding[];
  settings?: Record<string, unknown>;
}

interface CliOptions {
  inputPath: string;
  outputPath: string;
  evidenceLimit: number;
  topLimit: number;
}

function parseArgs(argv: string[]): CliOptions {
  let inputPath = '';
  let outputPath = '';
  let evidenceLimit = 60;
  let topLimit = 15;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--input' && argv[index + 1]) {
      inputPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--input=')) {
      inputPath = arg.slice('--input='.length);
      continue;
    }

    if (arg === '--output' && argv[index + 1]) {
      outputPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith('--output=')) {
      outputPath = arg.slice('--output='.length);
      continue;
    }

    if (arg === '--evidence-limit' && argv[index + 1]) {
      const parsed = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        evidenceLimit = parsed;
      }
      index += 1;
      continue;
    }

    if (arg.startsWith('--evidence-limit=')) {
      const parsed = Number.parseInt(arg.slice('--evidence-limit='.length), 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        evidenceLimit = parsed;
      }
      continue;
    }

    if (arg === '--top-limit' && argv[index + 1]) {
      const parsed = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        topLimit = parsed;
      }
      index += 1;
      continue;
    }

    if (arg.startsWith('--top-limit=')) {
      const parsed = Number.parseInt(arg.slice('--top-limit='.length), 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        topLimit = parsed;
      }
    }
  }

  if (!inputPath) {
    throw new Error('Missing required --input <path>');
  }

  const resolvedInputPath = path.resolve(inputPath);
  const resolvedOutputPath = outputPath
    ? path.resolve(outputPath)
    : path.resolve('reports/contrast-fixes', `${path.basename(resolvedInputPath, path.extname(resolvedInputPath))}.summary.md`);

  return {
    inputPath: resolvedInputPath,
    outputPath: resolvedOutputPath,
    evidenceLimit,
    topLimit,
  };
}

function normalizeText(input: string): string {
  return input.replace(/\s+/g, ' ').trim().toLowerCase();
}

function escapeTableCell(input: string): string {
  return input.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function truncate(input: string, max = 90): string {
  if (input.length <= max) {
    return input;
  }

  return `${input.slice(0, max - 1).trim()}…`;
}

function countBy<T>(items: T[], keyOf: (item: T) => string): Array<{ key: string; count: number }> {
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = keyOf(item);
    if (!key) {
      continue;
    }

    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function getRatio(finding: Finding): number {
  return typeof finding.ratio === 'number' ? finding.ratio : (finding.contrastRatio || 0);
}

function getRequired(finding: Finding): number {
  return typeof finding.required === 'number' ? finding.required : (finding.requiredContrast || 0);
}

function run(): void {
  const cli = parseArgs(process.argv.slice(2));
  const report = JSON.parse(fs.readFileSync(cli.inputPath, 'utf8')) as AuditReport;
  const findings = Array.isArray(report.findings) ? report.findings : [];

  const textCounts = countBy(findings, (finding) => (
    finding.normalizedText
      ? normalizeText(finding.normalizedText)
      : normalizeText(finding.text || '')
  ));

  const colorPairCounts = countBy(findings, (finding) => {
    if (!finding.foreground || !finding.background) {
      return '';
    }
    return `${finding.foreground} -> ${finding.background}`;
  });

  const urlCounts = countBy(findings, (finding) => finding.url || '');

  const clusters = [
    {
      name: 'EN/FR blog CTA red-background classes',
      match: (finding: Finding) => finding.url.includes('/blog/')
        && /bg-\[#FF3131\]|bg-brand-red/.test(finding.className || ''),
      suggestedFix: 'Use fixer: darken red CTA background + force white text + not-prose wrapper.',
    },
    {
      name: 'Brand-red button classes in TSX',
      match: (finding: Finding) => /bg-brand-red\b/.test(finding.className || '') && !finding.url.includes('/blog/'),
      suggestedFix: 'Switch to bg-brand-red-600 + hover:bg-brand-red-700 for white text AA.',
    },
    {
      name: 'Electric-indigo on light-indigo chips',
      match: (finding: Finding) => /bg-electric-indigo\/10/.test(finding.className || '')
        && /text-electric-indigo\b/.test(finding.className || ''),
      suggestedFix: 'Darken foreground token to text-electric-indigo-700 (dark:300).',
    },
    {
      name: 'Stores/map action buttons',
      match: (finding: Finding) => finding.url.includes('/stores')
        || (finding.selector || '').includes('leaflet')
        || /Get Directions|Visit Website/i.test(finding.text || ''),
      suggestedFix: 'Darken button backgrounds and hover states in stores/map components.',
    },
  ];

  const clusterRows = clusters
    .map((cluster) => {
      const count = findings.filter(cluster.match).length;
      return {
        cluster: cluster.name,
        count,
        suggestedFix: cluster.suggestedFix,
      };
    })
    .sort((a, b) => b.count - a.count || a.cluster.localeCompare(b.cluster));

  const evidenceRows = [...findings]
    .sort((a, b) => getRatio(a) - getRatio(b))
    .slice(0, cli.evidenceLimit);

  const generatedAt = new Date().toISOString();

  const lines: string[] = [
    '# Button Contrast Findings Summary',
    '',
    `- Generated: ${generatedAt}`,
    `- Input: \`${cli.inputPath}\``,
    `- Scanned pages: ${report.scannedPageCount ?? 0}`,
    `- Total findings: ${report.findingsCount ?? findings.length}`,
    `- Page errors: ${report.pageErrorCount ?? 0}`,
    `- Evidence rows: ${evidenceRows.length} (default target: 50+)`,
    '',
    '## Top Texts',
    '',
    '| Text | Count |',
    '| --- | ---: |',
    ...textCounts.slice(0, cli.topLimit).map((item) => `| ${escapeTableCell(truncate(item.key || '(empty)', 120))} | ${item.count} |`),
    '',
    '## Top Color Pairs',
    '',
    '| Foreground -> Background | Count |',
    '| --- | ---: |',
    ...colorPairCounts.slice(0, cli.topLimit).map((item) => `| ${escapeTableCell(item.key)} | ${item.count} |`),
    '',
    '## Top URLs',
    '',
    '| URL | Count |',
    '| --- | ---: |',
    ...urlCounts.slice(0, cli.topLimit).map((item) => `| ${escapeTableCell(item.key)} | ${item.count} |`),
    '',
    '## Fixable Clusters',
    '',
    '| Cluster | Count | Suggested remediation |',
    '| --- | ---: | --- |',
    ...clusterRows.map((row) => `| ${escapeTableCell(row.cluster)} | ${row.count} | ${escapeTableCell(row.suggestedFix)} |`),
    '',
    '## Evidence (Top Failing Examples)',
    '',
    '| # | URL | Theme | Text | Ratio | Required | Class | Selector |',
    '| ---: | --- | --- | --- | ---: | ---: | --- | --- |',
    ...evidenceRows.map((finding, index) => `| ${index + 1} | ${escapeTableCell(truncate(finding.url || '', 100))} | ${escapeTableCell(finding.theme || '')} | ${escapeTableCell(truncate((finding.normalizedText || finding.text || '').trim(), 80))} | ${getRatio(finding).toFixed(2)} | ${getRequired(finding).toFixed(2)} | ${escapeTableCell(truncate(finding.className || '', 80))} | ${escapeTableCell(truncate(finding.selector || '', 80))} |`),
    '',
  ];

  fs.mkdirSync(path.dirname(cli.outputPath), { recursive: true });
  fs.writeFileSync(cli.outputPath, lines.join('\n'));

  console.log(`Input findings: ${findings.length}`);
  console.log(`Summary markdown: ${cli.outputPath}`);
}

run();
