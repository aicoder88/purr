const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const reportDir = path.join(projectRoot, 'reports');
const reportPath = path.join(reportDir, 'typescript-unused-report.md');

console.log('🔎 Running strict unused identifier audit (noUnusedLocals / noUnusedParameters)...');

const result = spawnSync('npx', ['tsc', '--project', 'tsconfig.strict-unused.json'], {
  cwd: projectRoot,
  encoding: 'utf-8'
});

const stdout = result.stdout || '';
const stderr = result.stderr || '';
const combinedOutput = `${stdout}${stderr}`;

const lines = combinedOutput.split(/\r?\n/);
const errorLines = lines.filter((line) =>
  line.includes('error TS6133') || line.includes('error TS6192') || line.includes('error TS6196')
);

const fileIssueMap = new Map();

for (const line of errorLines) {
  const match = line.match(/^(.*\.tsx?|.*\.ts)\((\d+,\d+)\):\s+error\s+TS\d+:\s+(.*)$/);
  if (match) {
    const filePath = match[1];
    const [, , location, message] = match;
    if (!fileIssueMap.has(filePath)) {
      fileIssueMap.set(filePath, []);
    }
    fileIssueMap.get(filePath)?.push({ location, message });
  }
}

const sortedEntries = Array.from(fileIssueMap.entries()).sort((a, b) => b[1].length - a[1].length);
const totalIssues = errorLines.length;

const summaryLines = sortedEntries.slice(0, 25).map(([filePath, issues]) => {
  return `- ${filePath}: ${issues.length} issue${issues.length === 1 ? '' : 's'}`;
});

const detailSections = sortedEntries.map(([filePath, issues]) => {
  const details = issues
    .map(({ location, message }) => `  - ${location} — ${message}`)
    .join('\n');
  return `### ${filePath}\n${details}`;
});

const reportContent = [
  '# TypeScript Unused Identifier Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  `- Total issues detected: ${totalIssues}`,
  `- Files impacted: ${sortedEntries.length}`,
  '',
  '## Top Offenders',
  summaryLines.join('\n') || '- None 🎉',
  '',
  '## Detailed Findings',
  detailSections.join('\n\n') || 'No issues detected.',
  '',
  '---',
  '',
  '### Raw TypeScript Output',
  '```',
  combinedOutput.trim(),
  '```'
].join('\n');

fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(reportPath, reportContent, 'utf-8');

if (result.status === 0) {
  console.log('✅ Strict unused identifier audit passed with no issues.');
} else {
  console.warn(`⚠️ Strict unused identifier audit found ${totalIssues} issue(s) across ${sortedEntries.length} file(s).`);
  console.warn(`Detailed report written to ${path.relative(projectRoot, reportPath)}`);
}

process.exit(0);
