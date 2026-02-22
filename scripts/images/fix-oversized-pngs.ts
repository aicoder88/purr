import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { validateAllImages } from '../seo/lib/image-validator';

const MAX_SIZE_BYTES = 500 * 1024;
const MIN_LONGEST_SIDE = 1600;
const SCALE_FACTOR = 0.9;
const REPORT_PATH = path.join(process.cwd(), 'reports/images/png-oversize-fix-report.json');

interface Dimensions {
  width: number;
  height: number;
}

interface ReportEntry {
  filePath: string;
  beforeBytes: number;
  afterBytes: number;
  beforeDimensions: Dimensions;
  afterDimensions: Dimensions;
  passes: number;
  reason?: string;
}

interface FixReport {
  generatedAt: string;
  thresholdBytes: number;
  candidates: number;
  fixed: ReportEntry[];
  unchanged: ReportEntry[];
  failed: Array<ReportEntry & { error: string }>;
}

async function getDimensions(filePath: string): Promise<Dimensions> {
  const metadata = await sharp(filePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error('Unable to read image dimensions');
  }

  return {
    width: metadata.width,
    height: metadata.height,
  };
}

async function writeOptimizedPng(
  filePath: string,
  dimensions: Dimensions
): Promise<void> {
  const tempPath = `${filePath}.pngfix.tmp`;

  await sharp(filePath)
    .resize(dimensions.width, dimensions.height, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      quality: 80,
      effort: 10,
    })
    .toFile(tempPath);

  fs.renameSync(tempPath, filePath);
}

async function optimizePngInPlace(filePath: string): Promise<ReportEntry> {
  const beforeBytes = fs.statSync(filePath).size;
  const beforeDimensions = await getDimensions(filePath);

  let currentBytes = beforeBytes;
  let currentDimensions = { ...beforeDimensions };
  let passes = 0;

  // Pass 1: recompress at same dimensions
  await writeOptimizedPng(filePath, currentDimensions);
  passes += 1;
  currentBytes = fs.statSync(filePath).size;
  currentDimensions = await getDimensions(filePath);

  // Pass 2+: if still too large, scale down by 10% each pass
  while (currentBytes > MAX_SIZE_BYTES) {
    const longestSide = Math.max(currentDimensions.width, currentDimensions.height);
    if (longestSide <= MIN_LONGEST_SIDE) {
      break;
    }

    const nextDimensions: Dimensions = {
      width: Math.max(1, Math.floor(currentDimensions.width * SCALE_FACTOR)),
      height: Math.max(1, Math.floor(currentDimensions.height * SCALE_FACTOR)),
    };

    if (
      nextDimensions.width === currentDimensions.width &&
      nextDimensions.height === currentDimensions.height
    ) {
      break;
    }

    await writeOptimizedPng(filePath, nextDimensions);
    passes += 1;
    currentBytes = fs.statSync(filePath).size;
    currentDimensions = await getDimensions(filePath);
  }

  return {
    filePath,
    beforeBytes,
    afterBytes: currentBytes,
    beforeDimensions,
    afterDimensions: currentDimensions,
    passes,
  };
}

function toRuntimePngCandidates(imageIssueFilePaths: string[]): string[] {
  const candidates = new Set<string>();

  imageIssueFilePaths.forEach((filePath) => {
    const normalized = filePath.trim();
    if (!normalized.toLowerCase().endsWith('.png')) {
      return;
    }
    if (!path.isAbsolute(normalized)) {
      return;
    }
    if (!fs.existsSync(normalized)) {
      return;
    }
    candidates.add(normalized);
  });

  return [...candidates];
}

async function main() {
  console.log('🛠️  Fixing oversized runtime-referenced PNG images...');

  const validation = await validateAllImages({
    mode: 'runtime',
    includeLegacyBacklog: false,
  });

  const oversizedPngIssuePaths = validation.actionableIssues
    .filter((issue) => issue.type === 'file-size')
    .map((issue) => issue.filePath);

  const pngFiles = toRuntimePngCandidates(oversizedPngIssuePaths);

  const report: FixReport = {
    generatedAt: new Date().toISOString(),
    thresholdBytes: MAX_SIZE_BYTES,
    candidates: pngFiles.length,
    fixed: [],
    unchanged: [],
    failed: [],
  };

  for (const filePath of pngFiles) {
    try {
      const result = await optimizePngInPlace(filePath);

      if (result.afterBytes <= MAX_SIZE_BYTES) {
        report.fixed.push(result);
        console.log(`✅ ${filePath} -> ${result.beforeBytes}B to ${result.afterBytes}B`);
      } else if (result.afterBytes < result.beforeBytes) {
        report.unchanged.push({
          ...result,
          reason: 'Reduced but still above 500KB after optimization constraints',
        });
        console.log(`⚠️  ${filePath} still above limit after optimization`);
      } else {
        report.unchanged.push({
          ...result,
          reason: 'No meaningful size reduction achieved',
        });
        console.log(`⚠️  ${filePath} unchanged`);
      }
    } catch (error) {
      const beforeBytes = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;
      let beforeDimensions: Dimensions = { width: 0, height: 0 };

      try {
        beforeDimensions = await getDimensions(filePath);
      } catch {
        // keep zeros when dimensions cannot be read
      }

      report.failed.push({
        filePath,
        beforeBytes,
        afterBytes: beforeBytes,
        beforeDimensions,
        afterDimensions: beforeDimensions,
        passes: 0,
        error: (error as Error).message,
      });
      console.log(`❌ Failed to optimize ${filePath}: ${(error as Error).message}`);
    }
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  console.log('');
  console.log(`Candidates: ${report.candidates}`);
  console.log(`Fixed: ${report.fixed.length}`);
  console.log(`Unchanged: ${report.unchanged.length}`);
  console.log(`Failed: ${report.failed.length}`);
  console.log(`Report: ${REPORT_PATH}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
