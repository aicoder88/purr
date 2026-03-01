#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import type { AuditReport, ProposalReport } from '../../src/lib/content-quality/types';

function parseArgs(argv: string[]): { reportPath?: string; limit: number } {
  let reportPath: string | undefined;
  let limit = 25;

  for (const arg of argv) {
    if (arg.startsWith('--report=')) {
      reportPath = path.resolve(process.cwd(), arg.split('=')[1]);
    } else if (arg.startsWith('--limit=')) {
      const parsed = Number(arg.split('=')[1]);
      if (Number.isFinite(parsed) && parsed > 0) {
        limit = Math.floor(parsed);
      }
    }
  }

  return { reportPath, limit };
}

function resolveAuditPath(providedPath?: string): string {
  if (providedPath && fs.existsSync(providedPath)) {
    return providedPath;
  }
  const fallback = path.join(process.cwd(), 'reports', 'content-quality', 'latest-audit.json');
  if (!fs.existsSync(fallback)) {
    throw new Error('No audit report found. Run `pnpm content:audit` first.');
  }
  return fallback;
}

function buildMarkdown(report: ProposalReport): string {
  const lines: string[] = [];
  lines.push('# Content Improvement Proposal');
  lines.push('');
  lines.push(`- Generated: ${report.generatedAt}`);
  lines.push(`- Source audit: ${report.sourceAuditPath}`);
  lines.push(`- Total candidates: ${report.totalCandidates}`);
  lines.push('');
  lines.push('## Top Candidates');
  lines.push('');

  for (const item of report.topCandidates) {
    lines.push(
      `- [${item.priorityTier}] ${item.url} (${item.locale}, ${item.sourceType}, class=${item.contentClass}, priority=${item.priorityScore})`
    );
    lines.push(`  source: ${item.sourcePath}`);
    lines.push(
      `  metrics: words=${item.metricsSnapshot.words}, h2=${item.metricsSnapshot.h2}, h3=${item.metricsSnapshot.h3}, inlineImages=${item.metricsSnapshot.inlineImages}, internalLinks=${item.metricsSnapshot.internalLinks}, externalLinks=${item.metricsSnapshot.externalLinks}`
    );
    if (item.topActions.length > 0) {
      lines.push(`  actions: ${item.topActions.map((action) => `[${action.priority}] ${action.message}`).join(' | ')}`);
    } else {
      lines.push('  actions: none');
    }
  }

  lines.push('');
  lines.push('## Suggested Workflow');
  lines.push('');
  lines.push('1. Address all `P0` pages first with full editorial rewrites where needed.');
  lines.push('2. Apply low-risk SEO/link/image adjustments on `P1` pages.');
  lines.push('3. Re-run `pnpm content:audit` and compare trend lines against this proposal.');

  return `${lines.join('\n')}\n`;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const auditPath = resolveAuditPath(args.reportPath);
  const raw = fs.readFileSync(auditPath, 'utf-8');
  const auditReport = JSON.parse(raw) as AuditReport;

  const candidates = [...auditReport.entries]
    .filter((entry) => entry.priorityTier !== 'P2' || entry.recommendations.length > 0)
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, args.limit);

  const proposal: ProposalReport = {
    generatedAt: new Date().toISOString(),
    sourceAuditPath: auditPath,
    totalCandidates: candidates.length,
    topCandidates: candidates.map((entry) => ({
      id: entry.id,
      url: entry.url,
      locale: entry.locale,
      sourceType: entry.sourceType,
      sourcePath: entry.sourcePath,
      priorityTier: entry.priorityTier,
      priorityScore: entry.priorityScore,
      contentClass: entry.contentClass,
      topActions: entry.recommendations.slice(0, 3),
      metricsSnapshot: entry.metrics,
    })),
  };

  const outputDir = path.join(process.cwd(), 'reports', 'content-quality');
  fs.mkdirSync(outputDir, { recursive: true });
  const timestamp = Date.now();
  const jsonPath = path.join(outputDir, `proposal-${timestamp}.json`);
  const mdPath = path.join(outputDir, `proposal-${timestamp}.md`);
  const latestJsonPath = path.join(outputDir, 'latest-proposal.json');
  const latestMdPath = path.join(outputDir, 'latest-proposal.md');

  fs.writeFileSync(jsonPath, `${JSON.stringify(proposal, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(mdPath, buildMarkdown(proposal), 'utf-8');
  fs.writeFileSync(latestJsonPath, `${JSON.stringify(proposal, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(latestMdPath, buildMarkdown(proposal), 'utf-8');

  console.log(`Proposal complete: ${proposal.totalCandidates} candidates`);
  console.log(`Top candidate: ${proposal.topCandidates[0]?.url ?? 'none'}`);
  console.log(`Reports: ${mdPath}`);
}

main();
