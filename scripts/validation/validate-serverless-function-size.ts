import fs from 'node:fs';
import path from 'node:path';

type FunctionStat = {
  traceFile: string;
  tracedFiles: number;
  totalBytes: number;
};

const MAX_UNZIPPED_MB = Number(process.env.MAX_SERVERLESS_UNZIPPED_MB ?? 230);
const MAX_UNZIPPED_BYTES = Math.floor(MAX_UNZIPPED_MB * 1024 * 1024);

function walkTraceFiles(root: string): string[] {
  const out: string[] = [];
  const stack: string[] = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.nft.json')) {
        out.push(fullPath);
      }
    }
  }

  return out;
}

function bytesToMb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function loadFunctionStats(traceFiles: string[]): FunctionStat[] {
  const stats: FunctionStat[] = [];

  for (const traceFile of traceFiles) {
    let parsed: { files?: string[] };
    try {
      parsed = JSON.parse(fs.readFileSync(traceFile, 'utf8')) as { files?: string[] };
    } catch {
      continue;
    }

    const files = parsed.files ?? [];
    const baseDir = path.dirname(traceFile);
    let totalBytes = 0;

    for (const rel of files) {
      const abs = path.resolve(baseDir, rel);
      try {
        const st = fs.statSync(abs);
        if (st.isFile()) {
          totalBytes += st.size;
        }
      } catch {
        // Ignore missing traced file entries.
      }
    }

    stats.push({
      traceFile,
      tracedFiles: files.length,
      totalBytes,
    });
  }

  return stats.sort((a, b) => b.totalBytes - a.totalBytes);
}

function pickTraceRoot(): string | null {
  const candidates = [
    path.join(process.cwd(), '.next', 'standalone', '.next', 'server'),
    path.join(process.cwd(), '.next', 'server'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function relativeToCwd(target: string): string {
  return path.relative(process.cwd(), target) || target;
}

function main(): void {
  const traceRoot = pickTraceRoot();
  if (!traceRoot) {
    console.error('Could not find Next.js trace output. Run `pnpm build` first.');
    process.exit(1);
  }

  const traceFiles = walkTraceFiles(traceRoot);
  if (traceFiles.length === 0) {
    console.error(`No .nft.json trace files found under ${relativeToCwd(traceRoot)}.`);
    process.exit(1);
  }

  const functionStats = loadFunctionStats(traceFiles);
  const failing = functionStats.filter((item) => item.totalBytes > MAX_UNZIPPED_BYTES);

  console.log(`Checked ${functionStats.length} traced server entries (limit: ${MAX_UNZIPPED_MB} MB).`);
  console.log('Largest entries:');
  for (const entry of functionStats.slice(0, 10)) {
    console.log(`  - ${bytesToMb(entry.totalBytes)} | ${entry.tracedFiles} files | ${relativeToCwd(entry.traceFile)}`);
  }

  if (failing.length > 0) {
    console.error('\nServerless size validation failed:');
    for (const entry of failing) {
      console.error(`  - ${bytesToMb(entry.totalBytes)} > ${MAX_UNZIPPED_MB} MB | ${relativeToCwd(entry.traceFile)}`);
    }
    process.exit(1);
  }

  console.log('\nServerless size validation passed.');
}

main();
