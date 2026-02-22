import fs from 'node:fs';
import path from 'node:path';
import type { SemrushIssueBucket } from './issue-map';

export interface UnresolvedIssue {
  url: string;
  bucket: SemrushIssueBucket;
  reason: string;
}

export function writeUnresolvedReports(reportDir: string, unresolved: UnresolvedIssue[]): void {
  const jsonPath = path.join(reportDir, 'unresolved-manual.json');
  const mdPath = path.join(reportDir, 'remediation-report.md');

  fs.writeFileSync(jsonPath, JSON.stringify(unresolved, null, 2), 'utf-8');

  const lines: string[] = [];
  lines.push('# SEMrush Remediation Report');
  lines.push('');

  if (unresolved.length === 0) {
    lines.push('All CSV issues were handled by scripted remediations.');
  } else {
    lines.push('## Manual Follow-up Checklist');
    lines.push('');
    for (const item of unresolved) {
      lines.push(`- [ ] ${item.bucket}: ${item.url} (${item.reason})`);
    }
  }

  fs.writeFileSync(mdPath, `${lines.join('\n')}\n`, 'utf-8');
}
