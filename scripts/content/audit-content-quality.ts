#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import { auditContentQuality } from '../../src/lib/content-quality/audit';
import type { AuditOptions, ContentClass, Locale } from '../../src/lib/content-quality/types';

type ArgMap = {
  locale?: Locale;
  limit?: number;
  contentClass?: ContentClass;
  gscCsvPath?: string;
};

function parseArgs(argv: string[]): ArgMap {
  const args: ArgMap = {};

  for (const arg of argv) {
    if (arg.startsWith('--locale=')) {
      const locale = arg.split('=')[1] as Locale;
      if (locale === 'en' || locale === 'fr') {
        args.locale = locale;
      }
    } else if (arg.startsWith('--limit=')) {
      const limit = Number(arg.split('=')[1]);
      if (Number.isFinite(limit) && limit > 0) {
        args.limit = Math.floor(limit);
      }
    } else if (arg.startsWith('--class=')) {
      const contentClass = arg.split('=')[1] as ContentClass;
      if (['pillar_guide', 'comparison', 'how_to', 'quick_answer'].includes(contentClass)) {
        args.contentClass = contentClass;
      }
    } else if (arg.startsWith('--gsc=')) {
      const gscCsvPath = arg.split('=')[1];
      if (gscCsvPath) {
        args.gscCsvPath = path.resolve(process.cwd(), gscCsvPath);
      }
    }
  }

  return args;
}

function buildMarkdown(report: ReturnType<typeof auditContentQuality>): string {
  const lines: string[] = [];
  lines.push('# Content Quality Audit');
  lines.push('');
  lines.push(`- Generated: ${report.summary.scannedAt}`);
  lines.push(`- Total pages: ${report.summary.totalPages}`);
  lines.push(`- Priority tiers: P0=${report.summary.p0}, P1=${report.summary.p1}, P2=${report.summary.p2}`);
  lines.push('');
  lines.push('## Locale Summary');
  lines.push('');
  for (const localeRow of report.summary.localeSummary) {
    lines.push(
      `- ${localeRow.locale}: pages=${localeRow.pages}, P0=${localeRow.p0}, P1=${localeRow.p1}, P2=${localeRow.p2}, belowWordTarget=${localeRow.belowWordTarget}, missingImageTarget=${localeRow.missingImageTarget}, missingLinkTarget=${localeRow.missingLinkTarget}`
    );
  }

  lines.push('');
  lines.push('## Top Priority Pages');
  lines.push('');

  const topEntries = report.entries.slice(0, 40);
  for (const entry of topEntries) {
    const firstAction = entry.recommendations[0]?.message ?? 'No immediate action.';
    lines.push(
      `- [${entry.priorityTier}] ${entry.url} (${entry.locale}, ${entry.sourceType}, class=${entry.contentClass}, score=${entry.score.overall}, priority=${entry.priorityScore})`
    );
    lines.push(
      `  metrics: words=${entry.metrics.words}, h2=${entry.metrics.h2}, h3=${entry.metrics.h3}, inlineImages=${entry.metrics.inlineImages}, internalLinks=${entry.metrics.internalLinks}, externalLinks=${entry.metrics.externalLinks}`
    );
    lines.push(`  firstAction: ${firstAction}`);
  }

  return `${lines.join('\n')}\n`;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const options: AuditOptions = {
    locale: args.locale,
    limit: args.limit,
    contentClass: args.contentClass,
    gscCsvPath: args.gscCsvPath,
  };

  const report = auditContentQuality(options);
  const outputDir = path.join(process.cwd(), 'reports', 'content-quality');
  fs.mkdirSync(outputDir, { recursive: true });
  const timestamp = Date.now();

  const jsonPath = path.join(outputDir, `audit-${timestamp}.json`);
  const mdPath = path.join(outputDir, `audit-${timestamp}.md`);
  const latestJsonPath = path.join(outputDir, 'latest-audit.json');
  const latestMdPath = path.join(outputDir, 'latest-audit.md');

  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(mdPath, buildMarkdown(report), 'utf-8');
  fs.writeFileSync(latestJsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(latestMdPath, buildMarkdown(report), 'utf-8');

  console.log(`Audit complete: ${report.summary.totalPages} pages scanned`);
  console.log(`Priority tiers: P0=${report.summary.p0}, P1=${report.summary.p1}, P2=${report.summary.p2}`);
  console.log(`Reports: ${mdPath}`);
}

main();
