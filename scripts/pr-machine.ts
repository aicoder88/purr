import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

interface CliOptions {
  inputPath?: string;
  outputDir: string;
  sourceUrl: string;
  maxProspects: number;
  batchSize: number;
}

interface SheetTabMeta {
  name: string;
  gid: string;
}

interface SourceTab {
  name: string;
  gid: string | null;
  csvUrl: string;
  csvText: string;
}

interface LoadedSource {
  tabs: SourceTab[];
  skippedTabs: SheetTabMeta[];
  inputMode: string;
}

interface ColumnMap {
  headerRowIndex: number | null;
  dataStartRow: number;
  domainCol: number;
  topicCol: number | null;
  monthlyVisitsCol: number | null;
  trustFlowCol: number | null;
  citationFlowCol: number | null;
  asScoreCol: number | null;
  referringDomainsCol: number | null;
}

interface ProspectRow {
  sourceTab: string;
  sourceGid: string | null;
  sourceRow: number;
  domain: string;
  topicRaw: string;
  topicCategory: string | null;
  topicTrustFlow: number | null;
  monthlyVisits: number | null;
  trustFlow: number | null;
  citationFlow: number | null;
  asScore: number | null;
  referringDomains: number | null;
  dataCoverage: number;
  authorityScore: number;
  relevanceScore: number;
  opportunityScore: number;
  tier: 'A' | 'B' | 'C' | 'D';
  outreachAngle: string;
}

interface RejectedRow {
  sourceTab: string;
  sourceGid: string | null;
  sourceRow: number;
  reason: string;
  raw: string[];
}

interface TabParseStats {
  tabName: string;
  gid: string | null;
  totalRows: number;
  parsedRows: number;
  rejectedRows: number;
  domainColumn: number;
  usedHeader: boolean;
}

type MetricDistribution = number[];

const DEFAULT_SOURCE_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5drZnYWA85zXUySwAxxfdaWs2kNhWFZl8Uy021KqPm7NAvv6NSKLMaAM6qvvKgiYSHBrpi7lgosrw/pubhtml';

const AUTHORITY_WEIGHTS = {
  monthlyVisits: 0.35,
  trustFlow: 0.2,
  citationFlow: 0.2,
  asScore: 0.15,
  referringDomains: 0.1
} as const;

const TOTAL_AUTHORITY_WEIGHT = Object.values(AUTHORITY_WEIGHTS).reduce((sum, value) => sum + value, 0);

const HEADER_SYNONYMS = {
  domain: ['url', 'publication'],
  topic: ['topic', 'topical trust flow'],
  monthlyVisits: ['traffic', 'monthly visits'],
  trustFlow: ['tf', 'trust flow'],
  citationFlow: ['cf', 'citation flow'],
  asScore: ['as', 'as score'],
  referringDomains: ['rd', 'referring', 'referring domains']
} as const;

function printHelp(): void {
  console.log(`
PR Machine: download, clean, score, and queue PR outreach domains.

Usage:
  pnpm pr:machine
  pnpm pr:machine --source-url "https://.../pubhtml"
  pnpm pr:machine --input /tmp/purr_pr_machine.csv
  pnpm pr:machine --max-prospects 120 --batch-size 20

Options:
  --input <path>          Read a single local CSV file.
  --source-url <url>      Source URL. If pubhtml, all PR tabs are fetched.
  --output-dir <path>     Output directory (default: reports/pr-machine).
  --max-prospects <n>     Max rows in outreach queue (default: 150).
  --batch-size <n>        Contacts per batch/day (default: 25).
  --help                  Show this message.
`);
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    outputDir: path.join(process.cwd(), 'reports', 'pr-machine'),
    sourceUrl: DEFAULT_SOURCE_URL,
    maxProspects: 150,
    batchSize: 25
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    if (arg === '--input') {
      options.inputPath = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === '--source-url') {
      options.sourceUrl = argv[i + 1] ?? options.sourceUrl;
      i += 1;
      continue;
    }

    if (arg === '--output-dir') {
      options.outputDir = argv[i + 1] ?? options.outputDir;
      i += 1;
      continue;
    }

    if (arg === '--max-prospects') {
      const value = Number(argv[i + 1]);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error('--max-prospects must be a positive number.');
      }
      options.maxProspects = Math.floor(value);
      i += 1;
      continue;
    }

    if (arg === '--batch-size') {
      const value = Number(argv[i + 1]);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error('--batch-size must be a positive number.');
      }
      options.batchSize = Math.floor(value);
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function toCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((field) => {
          if (field.includes('"') || field.includes(',') || field.includes('\n') || field.includes('\r')) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        })
        .join(',')
    )
    .join('\n');
}

function normalizeHeaderCell(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function isBlankRow(row: string[]): boolean {
  return row.every((cell) => cell.trim().length === 0);
}

function decodeJsString(value: string): string {
  return value
    .replace(/\\x([0-9A-Fa-f]{2})/g, (_match, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\u([0-9A-Fa-f]{4})/g, (_match, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'tab';
}

function cleanDomain(value: string): string {
  let domain = value.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, '');
  domain = domain.replace(/^www\./, '');
  domain = domain.replace(/\/.*$/, '');
  domain = domain.replace(/[:?#].*$/, '');
  return domain;
}

function isDomain(value: string): boolean {
  return /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(value);
}

function parseCompactNumber(value: string): number | null {
  const normalized = value.trim().toLowerCase().replace(/,/g, '');
  const match = normalized.match(/^(-?\d+(?:\.\d+)?)([kmb])?$/i);
  if (!match) {
    return null;
  }

  const numeric = Number(match[1]);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  const suffix = match[2]?.toLowerCase();
  const multiplier = suffix === 'k' ? 1_000 : suffix === 'm' ? 1_000_000 : suffix === 'b' ? 1_000_000_000 : 1;
  return numeric * multiplier;
}

function parseMetric(rawValue: string): number | null {
  const value = rawValue.trim();
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase().replace(/\*/g, '').trim();
  if (
    normalized === 'n/a' ||
    normalized === 'na' ||
    normalized === 'pr' ||
    normalized === 'pr seo' ||
    normalized === 'trust flow' ||
    normalized === 'citation flow'
  ) {
    return null;
  }

  if (normalized.includes('-')) {
    const parts = normalized
      .split('-')
      .map((part) => parseCompactNumber(part.trim()))
      .filter((metric): metric is number => metric !== null);

    if (parts.length > 0) {
      return Math.max(...parts);
    }
  }

  return parseCompactNumber(normalized);
}

function parseTopic(rawTopic: string): { category: string | null; topicTrustFlow: number | null } {
  const topic = rawTopic.trim();
  if (!topic || topic.toLowerCase() === 'topic' || topic.toLowerCase() === 'topical trust flow') {
    return { category: null, topicTrustFlow: null };
  }

  const match = topic.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
  if (match) {
    return {
      category: match[2].trim(),
      topicTrustFlow: Number(match[1])
    };
  }

  return {
    category: topic,
    topicTrustFlow: null
  };
}

function getMetricDistribution(rows: ProspectRow[], key: keyof ProspectRow): MetricDistribution {
  return rows
    .map((row) => row[key])
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
    .sort((a, b) => a - b);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeMetric(value: number | null, distribution: MetricDistribution): number | null {
  if (value === null) {
    return null;
  }

  if (distribution.length <= 1) {
    return 1;
  }

  let low = 0;
  let high = distribution.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (distribution[mid] <= value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return clamp(high / (distribution.length - 1), 0, 1);
}

function scoreRelevance(topicCategory: string | null): number {
  if (!topicCategory) {
    return 0.35;
  }

  const category = topicCategory.toLowerCase();
  let score = 0.35;

  const highRelevance = ['pets', 'pet care', 'cats', 'home', 'family', 'health', 'news', 'lifestyle', 'science'];
  const mediumRelevance = ['society', 'reference', 'education', 'shopping', 'recreation'];
  const lowRelevance = ['agriculture', 'textiles', 'financial services', 'business / real estate'];

  if (highRelevance.some((keyword) => category.includes(keyword))) {
    score += 0.35;
  }
  if (mediumRelevance.some((keyword) => category.includes(keyword))) {
    score += 0.15;
  }
  if (lowRelevance.some((keyword) => category.includes(keyword))) {
    score -= 0.12;
  }

  return clamp(score, 0.1, 1);
}

function pickOutreachAngle(topicCategory: string | null): string {
  const category = topicCategory?.toLowerCase() ?? '';

  if (category.includes('pets')) {
    return 'Pet-owner outcome story: cleaner litter boxes and calmer homes.';
  }
  if (category.includes('home') || category.includes('family')) {
    return 'Home hygiene story: practical litter box odor control for busy households.';
  }
  if (category.includes('health') || category.includes('science')) {
    return 'Science angle: activated carbon adsorption versus fragrance masking.';
  }
  if (category.includes('news')) {
    return 'Local consumer trend: healthier home routines for cat owners.';
  }
  if (category.includes('business')) {
    return 'Retail trend: premium cat-care additive with repeat-purchase behavior.';
  }

  return 'Consumer utility story: easy odor-control habit for cat owners.';
}

function applyRankTiers(prospects: ProspectRow[]): void {
  const ranked = [...prospects].sort((a, b) => b.opportunityScore - a.opportunityScore);
  const total = ranked.length;

  ranked.forEach((prospect, index) => {
    const rankPct = total <= 1 ? 1 : index / (total - 1);
    if (rankPct <= 0.15) {
      prospect.tier = 'A';
      return;
    }
    if (rankPct <= 0.4) {
      prospect.tier = 'B';
      return;
    }
    if (rankPct <= 0.75) {
      prospect.tier = 'C';
      return;
    }
    prospect.tier = 'D';
  });
}

function formatNumber(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return '';
  }
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function formatScore(value: number): string {
  return value.toFixed(2);
}

function parsePublishedTabs(html: string): SheetTabMeta[] {
  const tabs: SheetTabMeta[] = [];
  const seen = new Set<string>();
  const regex = /items\.push\(\{name:\s*"((?:\\.|[^"\\])*)".*?gid:\s*"(-?\d+)"/g;
  let match: RegExpExecArray | null = regex.exec(html);

  while (match) {
    const name = decodeJsString(match[1]).trim();
    const gid = match[2].trim();
    if (name && gid && !seen.has(gid)) {
      tabs.push({ name, gid });
      seen.add(gid);
    }
    match = regex.exec(html);
  }

  return tabs;
}

function extractPublishId(sourceUrl: string): string | null {
  const match = sourceUrl.match(/\/d\/e\/([^/]+)/);
  return match ? match[1] : null;
}

function shouldIncludeTab(tabName: string): boolean {
  return tabName.toLowerCase().includes('press release');
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.text();
}

async function loadSource(options: CliOptions): Promise<LoadedSource> {
  if (options.inputPath) {
    const csvText = await readFile(options.inputPath, 'utf8');
    return {
      tabs: [{ name: 'LOCAL INPUT', gid: null, csvUrl: options.inputPath, csvText }],
      skippedTabs: [],
      inputMode: `local file (${options.inputPath})`
    };
  }

  if (options.sourceUrl.includes('/pubhtml')) {
    const publishId = extractPublishId(options.sourceUrl);
    if (!publishId) {
      throw new Error('Could not parse publish id from source URL.');
    }

    const html = await fetchText(options.sourceUrl);
    const allTabs = parsePublishedTabs(html);
    if (allTabs.length === 0) {
      throw new Error('Could not detect sheet tabs from pubhtml.');
    }

    const includedTabs = allTabs.filter((tab) => shouldIncludeTab(tab.name));
    const tabsToLoad = includedTabs.length > 0 ? includedTabs : allTabs;
    const skippedTabs = allTabs.filter((tab) => !tabsToLoad.some((included) => included.gid === tab.gid));

    const tabs = await Promise.all(
      tabsToLoad.map(async (tab) => {
        const csvUrl = `https://docs.google.com/spreadsheets/d/e/${publishId}/pub?gid=${tab.gid}&single=true&output=csv`;
        const csvText = await fetchText(csvUrl);
        return {
          name: tab.name,
          gid: tab.gid,
          csvUrl,
          csvText
        };
      })
    );

    return {
      tabs,
      skippedTabs,
      inputMode: `remote pubhtml (${tabs.length} tabs)`
    };
  }

  const csvText = await fetchText(options.sourceUrl);
  return {
    tabs: [{ name: 'REMOTE CSV', gid: null, csvUrl: options.sourceUrl, csvText }],
    skippedTabs: [],
    inputMode: 'remote csv'
  };
}

function indexByAliases(row: string[], aliases: readonly string[]): number | null {
  for (let i = 0; i < row.length; i += 1) {
    const cell = normalizeHeaderCell(row[i] ?? '');
    if (!cell) {
      continue;
    }
    for (const alias of aliases) {
      const normalizedAlias = normalizeHeaderCell(alias);
      if (cell === normalizedAlias || cell.startsWith(`${normalizedAlias} `) || cell.includes(normalizedAlias)) {
        return i;
      }
    }
  }
  return null;
}

function inferDomainColumn(rows: string[][]): number {
  const maxCols = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const counts = new Array<number>(Math.max(maxCols, 1)).fill(0);

  for (const row of rows) {
    for (let col = 0; col < counts.length; col += 1) {
      const raw = row[col] ?? '';
      const domain = cleanDomain(raw);
      if (isDomain(domain)) {
        counts[col] += 1;
      }
    }
  }

  let bestCol = 0;
  let bestCount = -1;
  counts.forEach((count, index) => {
    if (count > bestCount) {
      bestCount = count;
      bestCol = index;
    }
  });

  return bestCol;
}

function resolveColumnMap(rows: string[][]): ColumnMap {
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const domainCol = indexByAliases(row, HEADER_SYNONYMS.domain);

    if (domainCol === null) {
      continue;
    }

    return {
      headerRowIndex: rowIndex,
      dataStartRow: rowIndex + 1,
      domainCol,
      topicCol: indexByAliases(row, HEADER_SYNONYMS.topic),
      monthlyVisitsCol: indexByAliases(row, HEADER_SYNONYMS.monthlyVisits),
      trustFlowCol: indexByAliases(row, HEADER_SYNONYMS.trustFlow),
      citationFlowCol: indexByAliases(row, HEADER_SYNONYMS.citationFlow),
      asScoreCol: indexByAliases(row, HEADER_SYNONYMS.asScore),
      referringDomainsCol: indexByAliases(row, HEADER_SYNONYMS.referringDomains)
    };
  }

  return {
    headerRowIndex: null,
    dataStartRow: 0,
    domainCol: inferDomainColumn(rows),
    topicCol: null,
    monthlyVisitsCol: null,
    trustFlowCol: null,
    citationFlowCol: null,
    asScoreCol: null,
    referringDomainsCol: null
  };
}

function readCell(row: string[], column: number | null): string {
  if (column === null) {
    return '';
  }
  return row[column] ?? '';
}

function computeScores(prospects: ProspectRow[]): void {
  const monthlyVisitsDistribution = getMetricDistribution(prospects, 'monthlyVisits');
  const trustFlowDistribution = getMetricDistribution(prospects, 'trustFlow');
  const citationFlowDistribution = getMetricDistribution(prospects, 'citationFlow');
  const asScoreDistribution = getMetricDistribution(prospects, 'asScore');
  const referringDomainsDistribution = getMetricDistribution(prospects, 'referringDomains');

  for (const prospect of prospects) {
    const normalized = {
      monthlyVisits: normalizeMetric(prospect.monthlyVisits, monthlyVisitsDistribution),
      trustFlow: normalizeMetric(prospect.trustFlow, trustFlowDistribution),
      citationFlow: normalizeMetric(prospect.citationFlow, citationFlowDistribution),
      asScore: normalizeMetric(prospect.asScore, asScoreDistribution),
      referringDomains: normalizeMetric(prospect.referringDomains, referringDomainsDistribution)
    };

    let weightedAuthority = 0;
    let availableWeight = 0;

    for (const [metric, weight] of Object.entries(AUTHORITY_WEIGHTS) as Array<[keyof typeof AUTHORITY_WEIGHTS, number]>) {
      const metricValue = normalized[metric];
      if (metricValue !== null) {
        weightedAuthority += metricValue * weight;
        availableWeight += weight;
      }
    }

    const authorityScore = availableWeight > 0 ? weightedAuthority / availableWeight : 0;
    const dataCoverage = availableWeight / TOTAL_AUTHORITY_WEIGHT;
    const authorityWithCoveragePenalty = authorityScore * (0.75 + dataCoverage * 0.25);
    const relevanceScore = scoreRelevance(prospect.topicCategory);
    const opportunityScore = clamp(authorityWithCoveragePenalty * 0.7 + relevanceScore * 0.3, 0, 1);

    prospect.dataCoverage = dataCoverage * 100;
    prospect.authorityScore = authorityWithCoveragePenalty * 100;
    prospect.relevanceScore = relevanceScore * 100;
    prospect.opportunityScore = opportunityScore * 100;
    prospect.tier = 'D';
    prospect.outreachAngle = pickOutreachAngle(prospect.topicCategory);
  }
}

function parseTab(tab: SourceTab): { prospects: ProspectRow[]; rejected: RejectedRow[]; stats: TabParseStats } {
  const rows = parseCsv(tab.csvText);
  const map = resolveColumnMap(rows);
  const prospects: ProspectRow[] = [];
  const rejected: RejectedRow[] = [];

  for (let rowIndex = map.dataStartRow; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    if (!row || isBlankRow(row)) {
      continue;
    }

    const rawDomain = readCell(row, map.domainCol);
    const domain = cleanDomain(rawDomain);

    if (!domain) {
      rejected.push({
        sourceTab: tab.name,
        sourceGid: tab.gid,
        sourceRow: rowIndex + 1,
        reason: 'Missing domain',
        raw: row
      });
      continue;
    }

    if (domain === 'url' || domain === 'publication' || domain === 'item') {
      rejected.push({
        sourceTab: tab.name,
        sourceGid: tab.gid,
        sourceRow: rowIndex + 1,
        reason: 'Header-like row',
        raw: row
      });
      continue;
    }

    if (!isDomain(domain)) {
      rejected.push({
        sourceTab: tab.name,
        sourceGid: tab.gid,
        sourceRow: rowIndex + 1,
        reason: 'Invalid domain format',
        raw: row
      });
      continue;
    }

    const topicRaw = readCell(row, map.topicCol).trim();
    const { category, topicTrustFlow } = parseTopic(topicRaw);

    prospects.push({
      sourceTab: tab.name,
      sourceGid: tab.gid,
      sourceRow: rowIndex + 1,
      domain,
      topicRaw,
      topicCategory: category,
      topicTrustFlow,
      monthlyVisits: parseMetric(readCell(row, map.monthlyVisitsCol)),
      trustFlow: parseMetric(readCell(row, map.trustFlowCol)),
      citationFlow: parseMetric(readCell(row, map.citationFlowCol)),
      asScore: parseMetric(readCell(row, map.asScoreCol)),
      referringDomains: parseMetric(readCell(row, map.referringDomainsCol)),
      dataCoverage: 0,
      authorityScore: 0,
      relevanceScore: 0,
      opportunityScore: 0,
      tier: 'D',
      outreachAngle: ''
    });
  }

  const stats: TabParseStats = {
    tabName: tab.name,
    gid: tab.gid,
    totalRows: rows.length,
    parsedRows: prospects.length,
    rejectedRows: rejected.length,
    domainColumn: map.domainCol,
    usedHeader: map.headerRowIndex !== null
  };

  return { prospects, rejected, stats };
}

function dedupeProspects(prospects: ProspectRow[]): ProspectRow[] {
  const domainMap = new Map<string, ProspectRow>();

  for (const prospect of prospects) {
    const existing = domainMap.get(prospect.domain);
    if (!existing) {
      domainMap.set(prospect.domain, prospect);
      continue;
    }

    if (
      prospect.opportunityScore > existing.opportunityScore ||
      (prospect.opportunityScore === existing.opportunityScore && prospect.authorityScore > existing.authorityScore) ||
      (prospect.opportunityScore === existing.opportunityScore &&
        prospect.authorityScore === existing.authorityScore &&
        (prospect.monthlyVisits ?? 0) > (existing.monthlyVisits ?? 0))
    ) {
      domainMap.set(prospect.domain, prospect);
    }
  }

  return [...domainMap.values()].sort((a, b) => {
    if (b.opportunityScore !== a.opportunityScore) {
      return b.opportunityScore - a.opportunityScore;
    }
    if (b.authorityScore !== a.authorityScore) {
      return b.authorityScore - a.authorityScore;
    }
    return (b.monthlyVisits ?? 0) - (a.monthlyVisits ?? 0);
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSummary(
  options: CliOptions,
  source: LoadedSource,
  tabStats: TabParseStats[],
  totalParsed: number,
  deduped: ProspectRow[],
  rejectedRows: RejectedRow[],
  queue: ProspectRow[]
): string {
  const tierCounts = deduped.reduce<Record<string, number>>(
    (acc, prospect) => {
      acc[prospect.tier] = (acc[prospect.tier] ?? 0) + 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0 }
  );

  const topTen = deduped.slice(0, 10);
  const generatedAt = new Date().toISOString();
  const topTable = topTen
    .map(
      (row, index) =>
        `| ${index + 1} | ${row.domain} | ${formatScore(row.opportunityScore)} | ${row.tier} | ${row.sourceTab} | ${row.topicCategory ?? 'n/a'} |`
    )
    .join('\n');
  const tabLines = tabStats
    .map(
      (tab) =>
        `- ${tab.tabName} (${tab.gid ?? 'n/a'}): parsed ${tab.parsedRows}, rejected ${tab.rejectedRows}, rows ${tab.totalRows}`
    )
    .join('\n');
  const skippedLines =
    source.skippedTabs.length > 0
      ? source.skippedTabs.map((tab) => `- ${tab.name} (${tab.gid})`).join('\n')
      : '- none';

  return `# PR Machine Summary

- Generated at: ${generatedAt}
- Source URL: ${options.sourceUrl}
- Input mode: ${source.inputMode}
- Tabs processed: ${source.tabs.length}
- Parsed rows: ${totalParsed}
- Deduped domains: ${deduped.length}
- Rejected rows: ${rejectedRows.length}
- Outreach queue size: ${queue.length}

## Tabs processed

${tabLines}

## Tabs skipped

${skippedLines}

## Tier distribution

- Tier A: ${tierCounts.A}
- Tier B: ${tierCounts.B}
- Tier C: ${tierCounts.C}
- Tier D: ${tierCounts.D}

## Top 10 opportunities

| Rank | Domain | Opportunity Score | Tier | Source Tab | Topic |
|---:|---|---:|:---:|---|---|
${topTable}
`;
}

function buildDashboardHtml(
  source: LoadedSource,
  tabStats: TabParseStats[],
  deduped: ProspectRow[],
  queue: ProspectRow[],
  rejectedRows: RejectedRow[]
): string {
  const generatedAt = new Date().toISOString();
  const tierCounts = deduped.reduce<Record<string, number>>(
    (acc, prospect) => {
      acc[prospect.tier] = (acc[prospect.tier] ?? 0) + 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0 }
  );

  const tabRows = tabStats
    .map(
      (tab) => `<tr>
<td>${escapeHtml(tab.tabName)}</td>
<td>${escapeHtml(tab.gid ?? 'n/a')}</td>
<td>${tab.totalRows}</td>
<td>${tab.parsedRows}</td>
<td>${tab.rejectedRows}</td>
</tr>`
    )
    .join('');

  const queueRows = queue
    .slice(0, 150)
    .map(
      (row, index) => `<tr>
<td>${index + 1}</td>
<td>${escapeHtml(row.domain)}</td>
<td>${escapeHtml(row.tier)}</td>
<td>${formatScore(row.opportunityScore)}</td>
<td>${escapeHtml(row.sourceTab)}</td>
<td>${escapeHtml(row.topicCategory ?? '')}</td>
<td>${escapeHtml(row.outreachAngle)}</td>
</tr>`
    )
    .join('');

  const skipped = source.skippedTabs
    .map((tab) => `<li>${escapeHtml(tab.name)} (${escapeHtml(tab.gid)})</li>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>PR Machine Dashboard</title>
<style>
  :root {
    --bg: #f4f6f8;
    --panel: #ffffff;
    --text: #17212b;
    --muted: #5f6b77;
    --line: #dde3ea;
    --accent: #005a9c;
  }
  body {
    margin: 0;
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
  }
  .wrap {
    max-width: 1200px;
    margin: 24px auto;
    padding: 0 16px;
  }
  h1, h2 { margin: 0 0 12px; }
  .meta { color: var(--muted); margin-bottom: 16px; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }
  .card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 14px;
  }
  .label {
    font-size: 12px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .value {
    font-size: 22px;
    font-weight: 700;
    margin-top: 6px;
  }
  .section {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 16px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  th, td {
    border: 1px solid var(--line);
    padding: 8px;
    text-align: left;
    vertical-align: top;
  }
  th { background: #f8fafc; }
  .muted { color: var(--muted); }
  a { color: var(--accent); }
</style>
</head>
<body>
  <div class="wrap">
    <h1>PR Machine Dashboard</h1>
    <div class="meta">Generated: ${escapeHtml(generatedAt)} | Input mode: ${escapeHtml(source.inputMode)}</div>

    <div class="grid">
      <div class="card"><div class="label">Tabs Processed</div><div class="value">${source.tabs.length}</div></div>
      <div class="card"><div class="label">Parsed Rows</div><div class="value">${tabStats.reduce((sum, tab) => sum + tab.parsedRows, 0)}</div></div>
      <div class="card"><div class="label">Deduped Domains</div><div class="value">${deduped.length}</div></div>
      <div class="card"><div class="label">Queue Rows</div><div class="value">${queue.length}</div></div>
      <div class="card"><div class="label">Rejected Rows</div><div class="value">${rejectedRows.length}</div></div>
    </div>

    <div class="section">
      <h2>Tier Distribution</h2>
      <p class="muted">A: ${tierCounts.A} | B: ${tierCounts.B} | C: ${tierCounts.C} | D: ${tierCounts.D}</p>
    </div>

    <div class="section">
      <h2>Tabs</h2>
      <table>
        <thead><tr><th>Tab</th><th>GID</th><th>Total Rows</th><th>Parsed</th><th>Rejected</th></tr></thead>
        <tbody>${tabRows}</tbody>
      </table>
      <p class="muted">Skipped tabs (non-PR):</p>
      <ul>${skipped || '<li>none</li>'}</ul>
    </div>

    <div class="section">
      <h2>Top Outreach Queue</h2>
      <table>
        <thead>
          <tr><th>#</th><th>Domain</th><th>Tier</th><th>Score</th><th>Source Tab</th><th>Topic</th><th>Angle</th></tr>
        </thead>
        <tbody>${queueRows}</tbody>
      </table>
      <p class="muted">CSV outputs are in this folder: <code>reports/pr-machine</code></p>
    </div>
  </div>
</body>
</html>`;
}

async function run(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const source = await loadSource(options);

  const prospects: ProspectRow[] = [];
  const rejectedRows: RejectedRow[] = [];
  const tabStats: TabParseStats[] = [];

  for (const tab of source.tabs) {
    const parsed = parseTab(tab);
    prospects.push(...parsed.prospects);
    rejectedRows.push(...parsed.rejected);
    tabStats.push(parsed.stats);
  }

  computeScores(prospects);
  applyRankTiers(prospects);

  const deduped = dedupeProspects(prospects);
  applyRankTiers(deduped);
  const queue = deduped.slice(0, options.maxProspects);

  await mkdir(options.outputDir, { recursive: true });
  await mkdir(path.join(options.outputDir, 'source-tabs'), { recursive: true });

  const normalizedCsvRows: string[][] = [
    [
      'source_tab',
      'source_gid',
      'source_row',
      'domain',
      'topic_raw',
      'topic_category',
      'topic_trust_flow',
      'monthly_visits',
      'trust_flow',
      'citation_flow',
      'as_score',
      'referring_domains',
      'data_coverage_pct',
      'authority_score',
      'relevance_score',
      'opportunity_score',
      'tier',
      'outreach_angle'
    ],
    ...prospects.map((row) => [
      row.sourceTab,
      row.sourceGid ?? '',
      String(row.sourceRow),
      row.domain,
      row.topicRaw,
      row.topicCategory ?? '',
      formatNumber(row.topicTrustFlow),
      formatNumber(row.monthlyVisits),
      formatNumber(row.trustFlow),
      formatNumber(row.citationFlow),
      formatNumber(row.asScore),
      formatNumber(row.referringDomains),
      formatScore(row.dataCoverage),
      formatScore(row.authorityScore),
      formatScore(row.relevanceScore),
      formatScore(row.opportunityScore),
      row.tier,
      row.outreachAngle
    ])
  ];

  const dedupedCsvRows: string[][] = [
    [
      'rank',
      'domain',
      'tier',
      'opportunity_score',
      'authority_score',
      'relevance_score',
      'source_tab',
      'source_gid',
      'monthly_visits',
      'trust_flow',
      'citation_flow',
      'as_score',
      'referring_domains',
      'topic_category',
      'outreach_angle'
    ],
    ...deduped.map((row, index) => [
      String(index + 1),
      row.domain,
      row.tier,
      formatScore(row.opportunityScore),
      formatScore(row.authorityScore),
      formatScore(row.relevanceScore),
      row.sourceTab,
      row.sourceGid ?? '',
      formatNumber(row.monthlyVisits),
      formatNumber(row.trustFlow),
      formatNumber(row.citationFlow),
      formatNumber(row.asScore),
      formatNumber(row.referringDomains),
      row.topicCategory ?? '',
      row.outreachAngle
    ])
  ];

  const outreachCsvRows: string[][] = [
    [
      'queue_rank',
      'batch',
      'batch_position',
      'domain',
      'tier',
      'opportunity_score',
      'source_tab',
      'source_gid',
      'topic_category',
      'outreach_angle',
      'suggested_subject'
    ],
    ...queue.map((row, index) => {
      const batch = Math.floor(index / options.batchSize) + 1;
      const batchPosition = (index % options.batchSize) + 1;
      const subject = `Story opportunity: ${row.topicCategory ?? 'consumer trends'} + cat-owner odor control data`;

      return [
        String(index + 1),
        String(batch),
        String(batchPosition),
        row.domain,
        row.tier,
        formatScore(row.opportunityScore),
        row.sourceTab,
        row.sourceGid ?? '',
        row.topicCategory ?? '',
        row.outreachAngle,
        subject
      ];
    })
  ];

  const rejectedCsvRows: string[][] = [
    ['source_tab', 'source_gid', 'source_row', 'reason', 'raw_row'],
    ...rejectedRows.map((row) => [row.sourceTab, row.sourceGid ?? '', String(row.sourceRow), row.reason, row.raw.join(' | ')])
  ];

  const tabStatsCsvRows: string[][] = [
    ['tab_name', 'gid', 'total_rows', 'parsed_rows', 'rejected_rows', 'domain_column', 'used_header'],
    ...tabStats.map((tab) => [
      tab.tabName,
      tab.gid ?? '',
      String(tab.totalRows),
      String(tab.parsedRows),
      String(tab.rejectedRows),
      String(tab.domainColumn),
      tab.usedHeader ? 'true' : 'false'
    ])
  ];

  const sourceManifestCsvRows: string[][] = [
    ['tab_name', 'gid', 'csv_url', 'output_file'],
    ...source.tabs.map((tab) => {
      const filename = `${slugify(tab.name)}-${tab.gid ?? 'local'}.csv`;
      return [tab.name, tab.gid ?? '', tab.csvUrl, `source-tabs/${filename}`];
    })
  ];

  const summary = buildSummary(options, source, tabStats, prospects.length, deduped, rejectedRows, queue);
  const dashboardHtml = buildDashboardHtml(source, tabStats, deduped, queue, rejectedRows);

  const writes: Array<Promise<void>> = [
    writeFile(path.join(options.outputDir, 'normalized-prospects.csv'), toCsv(normalizedCsvRows), 'utf8'),
    writeFile(path.join(options.outputDir, 'deduped-prospects.csv'), toCsv(dedupedCsvRows), 'utf8'),
    writeFile(path.join(options.outputDir, 'outreach-queue.csv'), toCsv(outreachCsvRows), 'utf8'),
    writeFile(path.join(options.outputDir, 'rejected-rows.csv'), toCsv(rejectedCsvRows), 'utf8'),
    writeFile(path.join(options.outputDir, 'tab-stats.csv'), toCsv(tabStatsCsvRows), 'utf8'),
    writeFile(path.join(options.outputDir, 'source-manifest.csv'), toCsv(sourceManifestCsvRows), 'utf8'),
    writeFile(path.join(options.outputDir, 'summary.md'), summary, 'utf8'),
    writeFile(path.join(options.outputDir, 'dashboard.html'), dashboardHtml, 'utf8')
  ];

  source.tabs.forEach((tab) => {
    const filename = `${slugify(tab.name)}-${tab.gid ?? 'local'}.csv`;
    writes.push(writeFile(path.join(options.outputDir, 'source-tabs', filename), tab.csvText, 'utf8'));
  });

  await Promise.all(writes);

  console.log(`PR machine completed.
Output directory: ${options.outputDir}
Input mode: ${source.inputMode}
Tabs processed: ${source.tabs.length}
Parsed rows: ${prospects.length}
Deduped domains: ${deduped.length}
Queue size: ${queue.length}
Rejected rows: ${rejectedRows.length}
Dashboard: ${path.join(options.outputDir, 'dashboard.html')}`);
}

run().catch((error) => {
  console.error(`PR machine failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
