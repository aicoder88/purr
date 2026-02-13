import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';

type Command = 'enrich' | 'queue';

interface BaseOptions {
  outputDir: string;
}

interface EnrichOptions extends BaseOptions {
  command: 'enrich';
  inputCsv: string;
  concurrency: number;
  limit: number | null;
  timeoutMs: number;
  maxPagesPerSite: number;
  userAgent: string;
  refresh: boolean;
}

interface QueueOptions extends BaseOptions {
  command: 'queue';
  limit: number;
  markSent: boolean;
  sequenceDays: number[];
}

type Options = EnrichOptions | QueueOptions;

interface CsvRow {
  [key: string]: string;
}

interface Prospect {
  rank: number;
  domain: string;
  tier: string;
  opportunityScore: number;
  sourceTab: string;
  sourceGid: string;
  topicCategory: string;
  outreachAngle: string;
}

interface ContactCandidate {
  value: string;
  sourceUrl: string;
  score: number;
}

interface EnrichedContact {
  domain: string;
  status: 'ok' | 'error';
  error: string;
  crawledUrls: string[];
  bestEmail: string;
  bestPhone: string;
  bestName: string;
  contactPage: string;
  allEmails: string[];
  allPhones: string[];
  allNames: string[];
}

interface EnrichedRecord extends Prospect, EnrichedContact {
  notes: string;
}

interface OutreachState {
  domain: string;
  status: 'Prospect' | 'Contacted' | 'No Response' | 'Replied' | 'Do Not Contact' | 'Closed';
  emailSequenceStage: number;
  lastContactDate: string;
  followUpDate: string;
  attempts: number;
}

interface QueueRecord {
  queueRank: number;
  domain: string;
  email: string;
  phone: string;
  name: string;
  tier: string;
  opportunityScore: number;
  topicCategory: string;
  sourceTab: string;
  contactPage: string;
  recordStatus: string;
  recordError: string;
  notes: string;
  status: string;
  emailSequenceStage: number;
  lastContactDate: string;
  followUpDate: string;
  nextTemplate: string;
}

const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), 'reports', 'pr-machine');
const DEFAULT_INPUT_CSV = path.join(DEFAULT_OUTPUT_DIR, 'deduped-prospects.csv');
const DEFAULT_USER_AGENT = 'PurrifyPROutreachBot/1.0 (+mailto:meow@purrify.ca)';

function printHelp(): void {
  console.log(`
PR Outreach System

Commands:
  enrich   Crawl publication websites and discover contact details
  queue    Build today's outreach queue with follow-up cadence/state

Examples:
  pnpm pr:outreach:enrich
  pnpm pr:outreach:enrich --limit 200 --concurrency 6
  pnpm pr:outreach:queue --limit 80
  pnpm pr:outreach:queue --limit 80 --mark-sent
`);
}

function parseArgs(argv: string[]): Options {
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const command = argv[0] as Command;
  if (command !== 'enrich' && command !== 'queue') {
    throw new Error(`Unknown command: ${argv[0]}`);
  }

  const base: BaseOptions = {
    outputDir: DEFAULT_OUTPUT_DIR
  };

  if (command === 'enrich') {
    const options: EnrichOptions = {
      ...base,
      command,
      inputCsv: DEFAULT_INPUT_CSV,
      concurrency: 5,
      limit: null,
      timeoutMs: 12000,
      maxPagesPerSite: 4,
      userAgent: DEFAULT_USER_AGENT,
      refresh: false
    };

    for (let i = 1; i < argv.length; i += 1) {
      const arg = argv[i];
      if (arg === '--input') {
        options.inputCsv = argv[i + 1] ?? options.inputCsv;
        i += 1;
      } else if (arg === '--output-dir') {
        options.outputDir = argv[i + 1] ?? options.outputDir;
        i += 1;
      } else if (arg === '--concurrency') {
        options.concurrency = Math.max(1, Number(argv[i + 1] ?? options.concurrency));
        i += 1;
      } else if (arg === '--limit') {
        const value = Number(argv[i + 1]);
        options.limit = Number.isFinite(value) && value > 0 ? Math.floor(value) : null;
        i += 1;
      } else if (arg === '--timeout-ms') {
        options.timeoutMs = Math.max(1000, Number(argv[i + 1] ?? options.timeoutMs));
        i += 1;
      } else if (arg === '--max-pages') {
        options.maxPagesPerSite = Math.max(1, Number(argv[i + 1] ?? options.maxPagesPerSite));
        i += 1;
      } else if (arg === '--user-agent') {
        options.userAgent = argv[i + 1] ?? options.userAgent;
        i += 1;
      } else if (arg === '--refresh') {
        options.refresh = true;
      } else {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }

    return options;
  }

  const queueOptions: QueueOptions = {
    ...base,
    command,
    limit: 100,
    markSent: false,
    sequenceDays: [0, 3, 7, 14, 21]
  };

  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--output-dir') {
      queueOptions.outputDir = argv[i + 1] ?? queueOptions.outputDir;
      i += 1;
    } else if (arg === '--limit') {
      queueOptions.limit = Math.max(1, Number(argv[i + 1] ?? queueOptions.limit));
      i += 1;
    } else if (arg === '--mark-sent') {
      queueOptions.markSent = true;
    } else if (arg === '--sequence-days') {
      const raw = (argv[i + 1] ?? '').split(',').map((n) => Number(n.trim()));
      const clean = raw.filter((n) => Number.isFinite(n) && n >= 0).map((n) => Math.floor(n));
      if (clean.length > 0) {
        queueOptions.sequenceDays = clean;
      }
      i += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return queueOptions;
}

function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const next = content[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
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
      if (char === '\r' && next === '\n') {
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

function csvRowsToObjects(rows: string[][]): CsvRow[] {
  if (rows.length === 0) {
    return [];
  }
  const header = rows[0];
  return rows.slice(1).map((row) => {
    const obj: CsvRow = {};
    header.forEach((name, idx) => {
      obj[name] = row[idx] ?? '';
    });
    return obj;
  });
}

function normalizeDomain(domain: string): string {
  return domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .replace(/[:?#].*$/, '');
}

function asNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function parseProspects(csvRows: CsvRow[]): Prospect[] {
  return csvRows
    .map((row) => ({
      rank: asNumber(row.rank),
      domain: normalizeDomain(row.domain),
      tier: row.tier || '',
      opportunityScore: asNumber(row.opportunity_score),
      sourceTab: row.source_tab || '',
      sourceGid: row.source_gid || '',
      topicCategory: row.topic_category || '',
      outreachAngle: row.outreach_angle || ''
    }))
    .filter((row) => row.domain.length > 0);
}

function cleanEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .replace(/^mailto:/, '')
    .split('?')[0];
}

function isValidEmail(email: string): boolean {
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
    return false;
  }
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }
  const host = parts[1];
  const tld = host.split('.').pop() ?? '';
  const blockedTlds = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'css', 'js', 'ico', 'woff', 'woff2', 'map']);
  if (blockedTlds.has(tld.toLowerCase())) {
    return false;
  }
  return true;
}

function normalizePhone(phone: string): string {
  const decoded = phone.includes('%') ? decodeURIComponent(phone) : phone;
  return decoded.replace(/\s+/g, ' ').trim();
}

function isLikelyPhone(value: string, raw: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return false;
  }

  if (/\b\d{4}-\d{2}-\d{2}\b/.test(raw)) {
    return false;
  }
  if (digits === '0123456789' || digits === '1234567890') {
    return false;
  }
  if (/^(\d)\1{9,}$/.test(digits)) {
    return false;
  }

  if (digits.length === 10) {
    return true;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return true;
  }
  if (digits.length >= 11 && raw.includes('+')) {
    return true;
  }

  return false;
}

function absoluteUrl(baseUrl: string, href: string): string | null {
  try {
    const url = new URL(href, baseUrl);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function isSameDomain(urlValue: string, domain: string): boolean {
  try {
    const host = new URL(urlValue).hostname.toLowerCase();
    return host === domain || host === `www.${domain}` || domain === `www.${host}`;
  } catch {
    return false;
  }
}

function pickBestEmail(candidates: ContactCandidate[], domain: string): string {
  if (candidates.length === 0) {
    return '';
  }

  const scored = candidates.map((candidate) => {
    const [local, host = ''] = candidate.value.split('@');
    let score = candidate.score;

    if (host === domain || host.endsWith(`.${domain}`)) {
      score += 15;
    }

    if (/^(press|media|editor|news|newsroom|tips|desk|contact|hello|info)/i.test(local)) {
      score += 20;
    }

    if (/^(support|admin|office|marketing|team)/i.test(local)) {
      score += 8;
    }

    if (/^(noreply|no-reply|donotreply|do-not-reply)/i.test(local)) {
      score -= 50;
    }

    return { ...candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].value;
}

function pickBestPhone(candidates: ContactCandidate[]): string {
  if (candidates.length === 0) {
    return '';
  }
  const ranked = [...candidates].sort((a, b) => b.score - a.score);
  return ranked[0].value;
}

function extractNameCandidates(text: string): string[] {
  const names = new Set<string>();

  const patterns = [
    /\b(?:editor|publisher|reporter|newsroom|contact|author)\s*[:\-]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})/g,
    /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\s*[,|-]\s*(?:editor|publisher|reporter|journalist)\b/g
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null = pattern.exec(text);
    while (match) {
      const candidate = match[1].trim();
      if (candidate.length >= 5 && candidate.split(' ').length <= 3) {
        names.add(candidate);
      }
      match = pattern.exec(text);
    }
  }

  return [...names];
}

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) {
    return { first: '', last: '' };
  }
  if (parts.length === 1) {
    return { first: parts[0], last: '' };
  }
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

async function fetchHtml(url: string, timeoutMs: number, userAgent: string): Promise<{ url: string; html: string } | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml'
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
    if (!contentType.includes('text/html')) {
      return null;
    }

    const html = await response.text();
    return { url: response.url, html };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function collectFromHtml(
  html: string,
  pageUrl: string,
  targetDomain: string
): {
  emails: ContactCandidate[];
  phones: ContactCandidate[];
  names: string[];
  contactLinks: string[];
} {
  const $ = cheerio.load(html);
  const text = $('body').text().replace(/\s+/g, ' ');
  const emails = new Map<string, ContactCandidate>();
  const phones = new Map<string, ContactCandidate>();
  const names = new Set<string>();
  const contactLinks = new Set<string>();

  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
  const phoneRegex = /(?:\+?\d[\d().\-\s]{7,}\d)/g;

  const textEmails = text.match(emailRegex) ?? [];
  for (const raw of textEmails) {
    const email = cleanEmail(raw);
    if (!isValidEmail(email)) {
      continue;
    }
    if (!emails.has(email)) {
      emails.set(email, { value: email, sourceUrl: pageUrl, score: 5 });
    }
  }

  $('a[href^="mailto:"]').each((_i, element) => {
    const href = $(element).attr('href') ?? '';
    const email = cleanEmail(href);
    if (!isValidEmail(email)) {
      return;
    }
    const baseScore = 25;
    const existing = emails.get(email);
    if (!existing || existing.score < baseScore) {
      emails.set(email, { value: email, sourceUrl: pageUrl, score: baseScore });
    }

    const linkText = $(element).text().trim();
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}$/.test(linkText)) {
      names.add(linkText);
    }
  });

  const textPhones = text.match(phoneRegex) ?? [];
  for (const raw of textPhones) {
    if (!/[+\-().\s]/.test(raw)) {
      continue;
    }
    const phone = normalizePhone(raw);
    if (!isLikelyPhone(phone, raw)) {
      continue;
    }
    if (!phones.has(phone)) {
      phones.set(phone, { value: phone, sourceUrl: pageUrl, score: 6 });
    }
  }

  $('a[href^="tel:"]').each((_i, element) => {
    const href = $(element).attr('href') ?? '';
    const phone = normalizePhone(href.replace(/^tel:/i, ''));
    if (!isLikelyPhone(phone, href)) {
      return;
    }
    const baseScore = 20;
    const existing = phones.get(phone);
    if (!existing || existing.score < baseScore) {
      phones.set(phone, { value: phone, sourceUrl: pageUrl, score: baseScore });
    }
  });

  const extractedNames = extractNameCandidates(text);
  extractedNames.forEach((name) => names.add(name));

  $('a[href]').each((_i, element) => {
    const href = $(element).attr('href') ?? '';
    const anchorText = $(element).text().toLowerCase().trim();
    const abs = absoluteUrl(pageUrl, href);
    if (!abs || !isSameDomain(abs, targetDomain)) {
      return;
    }

    const lowerHref = href.toLowerCase();
    const pathName = new URL(abs).pathname.toLowerCase();
    const hrefHasContactKeyword = /(contact|about|staff|team|editor|newsroom|press|advertis|contributor|write[- ]for[- ]us)/.test(
      lowerHref
    );
    const textSuggestsContact = /(contact|about|staff|team|editor|newsroom|press|advertis)/.test(anchorText);
    const looksLikeArticlePath = /\/(article|news|story)\//.test(pathName) || pathName.split('/').filter(Boolean).length > 6;

    if (
      hrefHasContactKeyword ||
      (textSuggestsContact && !looksLikeArticlePath)
    ) {
      contactLinks.add(abs.split('#')[0]);
    }
  });

  return {
    emails: [...emails.values()],
    phones: [...phones.values()],
    names: [...names],
    contactLinks: [...contactLinks]
  };
}

async function enrichDomain(prospect: Prospect, options: EnrichOptions): Promise<EnrichedRecord> {
  const baseCandidates = [`https://${prospect.domain}`, `http://${prospect.domain}`];
  let initialPage: { url: string; html: string } | null = null;

  for (const url of baseCandidates) {
    const page = await fetchHtml(url, options.timeoutMs, options.userAgent);
    if (page) {
      initialPage = page;
      break;
    }
  }

  if (!initialPage) {
    return {
      ...prospect,
      status: 'error',
      error: 'Unable to fetch homepage',
      crawledUrls: [],
      bestEmail: '',
      bestPhone: '',
      bestName: '',
      contactPage: '',
      allEmails: [],
      allPhones: [],
      allNames: [],
      notes: 'No homepage response.'
    };
  }

  const visited = new Set<string>();
  const emailCandidates: ContactCandidate[] = [];
  const phoneCandidates: ContactCandidate[] = [];
  const nameCandidates = new Set<string>();
  const queuedContactPages: string[] = [];

  const first = collectFromHtml(initialPage.html, initialPage.url, prospect.domain);
  visited.add(initialPage.url);
  emailCandidates.push(...first.emails);
  phoneCandidates.push(...first.phones);
  first.names.forEach((name) => nameCandidates.add(name));
  queuedContactPages.push(...first.contactLinks);

  const pagesToVisit = queuedContactPages.slice(0, options.maxPagesPerSite);
  for (const pageUrl of pagesToVisit) {
    if (visited.has(pageUrl)) {
      continue;
    }
    const page = await fetchHtml(pageUrl, options.timeoutMs, options.userAgent);
    if (!page) {
      continue;
    }
    visited.add(page.url);
    const next = collectFromHtml(page.html, page.url, prospect.domain);
    emailCandidates.push(...next.emails.map((e) => ({ ...e, score: e.score + 3 })));
    phoneCandidates.push(...next.phones.map((p) => ({ ...p, score: p.score + 2 })));
    next.names.forEach((name) => nameCandidates.add(name));
  }

  const dedupEmails = new Map<string, ContactCandidate>();
  emailCandidates.forEach((candidate) => {
    const current = dedupEmails.get(candidate.value);
    if (!current || current.score < candidate.score) {
      dedupEmails.set(candidate.value, candidate);
    }
  });

  const dedupPhones = new Map<string, ContactCandidate>();
  phoneCandidates.forEach((candidate) => {
    const current = dedupPhones.get(candidate.value);
    if (!current || current.score < candidate.score) {
      dedupPhones.set(candidate.value, candidate);
    }
  });

  const allEmails = [...dedupEmails.keys()].sort();
  const allPhones = [...dedupPhones.keys()].sort();
  const allNames = [...nameCandidates].sort();
  const bestEmail = pickBestEmail([...dedupEmails.values()], prospect.domain);
  const bestPhone = pickBestPhone([...dedupPhones.values()]);
  const bestName = allNames[0] ?? '';
  const contactPage = pagesToVisit[0] ?? '';

  const notesParts: string[] = [];
  if (bestEmail) {
    notesParts.push(`Email found: ${bestEmail}`);
  } else {
    notesParts.push('No email found; use contact page/manual research.');
  }
  if (contactPage) {
    notesParts.push(`Contact page: ${contactPage}`);
  }
  if (bestPhone) {
    notesParts.push(`Phone found: ${bestPhone}`);
  }
  notesParts.push(`Source: ${prospect.sourceTab} | Tier ${prospect.tier} | Score ${prospect.opportunityScore.toFixed(2)}`);

  return {
    ...prospect,
    status: 'ok',
    error: '',
    crawledUrls: [...visited],
    bestEmail,
    bestPhone,
    bestName,
    contactPage,
    allEmails,
    allPhones,
    allNames,
    notes: notesParts.join(' | ')
  };
}

async function runPromisePool<T, R>(items: T[], concurrency: number, worker: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  async function runWorker(): Promise<void> {
    while (true) {
      const index = currentIndex;
      currentIndex += 1;
      if (index >= items.length) {
        return;
      }
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker());
  await Promise.all(workers);
  return results;
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function isDue(followUpDate: string): boolean {
  if (!followUpDate) {
    return true;
  }
  return followUpDate <= todayIsoDate();
}

function templateForStage(stage: number): string {
  if (stage <= 1) return 'PR-Initial';
  if (stage === 2) return 'PR-FollowUp-1';
  if (stage === 3) return 'PR-FollowUp-2';
  if (stage === 4) return 'PR-FollowUp-3';
  return 'PR-Breakup';
}

function toOutreachStateMap(states: OutreachState[]): Map<string, OutreachState> {
  const map = new Map<string, OutreachState>();
  states.forEach((state) => map.set(state.domain, state));
  return map;
}

async function readJsonIfExists<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const text = await readFile(filePath, 'utf8');
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

function buildCrmRows(records: EnrichedRecord[]): string[][] {
  const rows: string[][] = [
    [
      'ContactID',
      'FirstName',
      'LastName',
      'Email',
      'StoreName',
      'StoreType',
      'City',
      'Province',
      'State',
      'Country',
      'EstimatedSize',
      'Specialty',
      'Phone',
      'Website',
      'GoogleRating',
      'LinkedInURL',
      'Notes',
      'Status',
      'LastContactDate',
      'FollowUpDate',
      'EmailSequenceStage'
    ]
  ];

  records.forEach((record, index) => {
    const split = splitName(record.bestName);
    rows.push([
      String(index + 1),
      split.first,
      split.last,
      record.bestEmail,
      record.domain,
      'Media Outlet',
      '',
      '',
      '',
      '',
      '',
      record.topicCategory,
      record.bestPhone,
      `https://${record.domain}`,
      '',
      '',
      record.notes,
      'Prospect',
      '',
      '',
      '1'
    ]);
  });

  return rows;
}

function buildEnrichmentCsv(records: EnrichedRecord[]): string[][] {
  const rows: string[][] = [
    [
      'rank',
      'domain',
      'tier',
      'opportunity_score',
      'source_tab',
      'source_gid',
      'topic_category',
      'status',
      'best_email',
      'best_phone',
      'best_name',
      'contact_page',
      'all_emails',
      'all_phones',
      'all_names',
      'error',
      'notes'
    ]
  ];

  records.forEach((record) => {
    rows.push([
      String(record.rank),
      record.domain,
      record.tier,
      record.opportunityScore.toFixed(2),
      record.sourceTab,
      record.sourceGid,
      record.topicCategory,
      record.status,
      record.bestEmail,
      record.bestPhone,
      record.bestName,
      record.contactPage,
      record.allEmails.join(';'),
      record.allPhones.join(';'),
      record.allNames.join(';'),
      record.error,
      record.notes
    ]);
  });

  return rows;
}

async function runEnrich(options: EnrichOptions): Promise<void> {
  await mkdir(options.outputDir, { recursive: true });

  const enrichmentJsonPath = path.join(options.outputDir, 'contact-enrichment.json');
  const enrichmentCsvPath = path.join(options.outputDir, 'contact-enrichment.csv');
  // Email-merge tooling expects Email to be populated; keep an email-only export.
  const crmEmailCsvPath = path.join(options.outputDir, 'pr-outreach-crm.csv');
  const crmAllCsvPath = path.join(options.outputDir, 'pr-outreach-crm-all.csv');
  const summaryPath = path.join(options.outputDir, 'contact-enrichment-summary.md');

  const inputCsv = await readFile(options.inputCsv, 'utf8');
  const prospects = parseProspects(csvRowsToObjects(parseCsv(inputCsv)));
  const limited = options.limit ? prospects.slice(0, options.limit) : prospects;

  const existing = options.refresh ? [] : await readJsonIfExists<EnrichedRecord[]>(enrichmentJsonPath, []);
  const existingByDomain = new Map(existing.map((record) => [record.domain, record]));
  const pending = limited.filter((prospect) => !existingByDomain.has(prospect.domain));

  console.log(`Enrich start: total=${limited.length}, cached=${limited.length - pending.length}, pending=${pending.length}`);

  const newlyEnriched = await runPromisePool(pending, options.concurrency, async (prospect, index) => {
    const record = await enrichDomain(prospect, options);
    const progress = index + 1;
    if (progress % 10 === 0 || progress === pending.length) {
      console.log(`Processed ${progress}/${pending.length}: ${prospect.domain}`);
    }
    return record;
  });

  const mergedMap = new Map<string, EnrichedRecord>();
  existing.forEach((record) => mergedMap.set(record.domain, record));
  newlyEnriched.forEach((record) => mergedMap.set(record.domain, record));

  const merged = limited
    .map((prospect) => mergedMap.get(prospect.domain))
    .filter((record): record is EnrichedRecord => Boolean(record));

  const withEmail = merged.filter((record) => record.bestEmail).length;
  const withPhone = merged.filter((record) => record.bestPhone).length;
  const withContactPage = merged.filter((record) => record.contactPage).length;

  const summary = `# Contact Enrichment Summary

- Date: ${new Date().toISOString()}
- Input prospects: ${limited.length}
- Crawled this run: ${pending.length}
- Email found: ${withEmail}
- Phone found: ${withPhone}
- Contact page found: ${withContactPage}
- Needs manual follow-up (no email): ${merged.length - withEmail}
`;

  await Promise.all([
    writeFile(enrichmentJsonPath, JSON.stringify(merged, null, 2), 'utf8'),
    writeFile(enrichmentCsvPath, toCsv(buildEnrichmentCsv(merged)), 'utf8'),
    writeFile(crmEmailCsvPath, toCsv(buildCrmRows(merged.filter((record) => Boolean(record.bestEmail)))), 'utf8'),
    writeFile(crmAllCsvPath, toCsv(buildCrmRows(merged)), 'utf8'),
    writeFile(summaryPath, summary, 'utf8')
  ]);

  console.log(`Enrich complete.
Saved:
- ${enrichmentJsonPath}
- ${enrichmentCsvPath}
- ${crmEmailCsvPath}
- ${crmAllCsvPath}
- ${summaryPath}`);
}

function parseEnrichedRecords(csvRows: CsvRow[]): EnrichedRecord[] {
  return csvRows.map((row) => ({
    rank: asNumber(row.rank),
    domain: normalizeDomain(row.domain),
    tier: row.tier || '',
    opportunityScore: asNumber(row.opportunity_score),
    sourceTab: row.source_tab || '',
    sourceGid: row.source_gid || '',
    topicCategory: row.topic_category || '',
    outreachAngle: row.notes || '',
    status: (row.status as 'ok' | 'error') || 'ok',
    error: row.error || '',
    crawledUrls: [],
    bestEmail: row.best_email || '',
    bestPhone: row.best_phone || '',
    bestName: row.best_name || '',
    contactPage: row.contact_page || '',
    allEmails: row.all_emails ? row.all_emails.split(';').filter(Boolean) : [],
    allPhones: row.all_phones ? row.all_phones.split(';').filter(Boolean) : [],
    allNames: row.all_names ? row.all_names.split(';').filter(Boolean) : [],
    notes: row.notes || ''
  }));
}

function defaultStateFor(record: EnrichedRecord): OutreachState {
  return {
    domain: record.domain,
    status: 'Prospect',
    emailSequenceStage: 1,
    lastContactDate: '',
    followUpDate: '',
    attempts: 0
  };
}

function shouldQueue(record: EnrichedRecord, state: OutreachState): boolean {
  if (!record.bestEmail) {
    return false;
  }
  if (state.status === 'Do Not Contact' || state.status === 'Replied' || state.status === 'Closed') {
    return false;
  }
  return isDue(state.followUpDate);
}

function buildQueue(records: EnrichedRecord[], stateMap: Map<string, OutreachState>, limit: number): QueueRecord[] {
  const eligible = records
    .map((record) => ({ record, state: stateMap.get(record.domain) ?? defaultStateFor(record) }))
    .filter(({ record, state }) => shouldQueue(record, state))
    .sort((a, b) => {
      if (a.record.tier !== b.record.tier) return a.record.tier.localeCompare(b.record.tier);
      return b.record.opportunityScore - a.record.opportunityScore;
    })
    .slice(0, limit);

  return eligible.map(({ record, state }, index) => ({
    queueRank: index + 1,
    domain: record.domain,
    email: record.bestEmail,
    phone: record.bestPhone,
    name: record.bestName,
    tier: record.tier,
    opportunityScore: record.opportunityScore,
    topicCategory: record.topicCategory,
    sourceTab: record.sourceTab,
    contactPage: record.contactPage,
    recordStatus: record.status,
    recordError: record.error,
    notes: record.notes,
    status: state.status,
    emailSequenceStage: state.emailSequenceStage,
    lastContactDate: state.lastContactDate,
    followUpDate: state.followUpDate,
    nextTemplate: templateForStage(state.emailSequenceStage)
  }));
}

function buildManualResearchQueue(records: EnrichedRecord[], stateMap: Map<string, OutreachState>, limit: number): QueueRecord[] {
  const eligible = records
    .map((record) => ({ record, state: stateMap.get(record.domain) ?? defaultStateFor(record) }))
    .filter(({ record, state }) => {
      if (record.bestEmail) {
        return false;
      }
      if (!record.contactPage) {
        return false;
      }
      if (state.status === 'Do Not Contact' || state.status === 'Replied' || state.status === 'Closed') {
        return false;
      }
      return isDue(state.followUpDate);
    })
    .sort((a, b) => {
      if (a.record.tier !== b.record.tier) return a.record.tier.localeCompare(b.record.tier);
      return b.record.opportunityScore - a.record.opportunityScore;
    })
    .slice(0, limit);

  return eligible.map(({ record, state }, index) => ({
    queueRank: index + 1,
    domain: record.domain,
    email: '',
    phone: record.bestPhone,
    name: record.bestName,
    tier: record.tier,
    opportunityScore: record.opportunityScore,
    topicCategory: record.topicCategory,
    sourceTab: record.sourceTab,
    contactPage: record.contactPage,
    recordStatus: record.status,
    recordError: record.error,
    notes: record.notes,
    status: state.status,
    emailSequenceStage: state.emailSequenceStage,
    lastContactDate: state.lastContactDate,
    followUpDate: state.followUpDate,
    nextTemplate: 'Manual-Research'
  }));
}

function queueRows(queue: QueueRecord[]): string[][] {
  const rows: string[][] = [
    [
      'queue_rank',
      'domain',
      'email',
      'phone',
      'name',
      'tier',
      'opportunity_score',
      'topic_category',
      'source_tab',
      'contact_page',
      'record_status',
      'record_error',
      'notes',
      'status',
      'email_sequence_stage',
      'last_contact_date',
      'follow_up_date',
      'next_template'
    ]
  ];

  queue.forEach((q) => {
    rows.push([
      String(q.queueRank),
      q.domain,
      q.email,
      q.phone,
      q.name,
      q.tier,
      q.opportunityScore.toFixed(2),
      q.topicCategory,
      q.sourceTab,
      q.contactPage,
      q.recordStatus,
      q.recordError,
      q.notes,
      q.status,
      String(q.emailSequenceStage),
      q.lastContactDate,
      q.followUpDate,
      q.nextTemplate
    ]);
  });

  return rows;
}

function dashboardHtml(sendQueue: QueueRecord[], manualQueue: QueueRecord[], sentCount: number): string {
  const generatedAt = new Date().toISOString();

  function googleSearchUrl(query: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }

  function domainToUrl(domain: string): string {
    return `https://${domain}`;
  }

  function escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const sendRows = sendQueue
    .map((q) => {
      const site = domainToUrl(q.domain);
      const contact = q.contactPage ? `<a href="${escapeHtml(q.contactPage)}" target="_blank" rel="noreferrer">contact page</a>` : '-';
      return `<tr data-domain="${escapeHtml(q.domain)}" data-tier="${escapeHtml(q.tier)}">
<td><input type="checkbox" class="done" data-domain="${escapeHtml(q.domain)}" /></td>
<td>${q.queueRank}</td>
<td><a href="${escapeHtml(site)}" target="_blank" rel="noreferrer">${escapeHtml(q.domain)}</a></td>
<td>${q.email ? `<a href="mailto:${escapeHtml(q.email)}">${escapeHtml(q.email)}</a>` : '-'}</td>
<td>${q.phone ? escapeHtml(q.phone) : '-'}</td>
<td>${escapeHtml(q.tier)}</td>
<td>${q.opportunityScore.toFixed(2)}</td>
<td>${escapeHtml(q.topicCategory || '')}</td>
<td>${escapeHtml(q.sourceTab || '')}</td>
<td>${contact}</td>
<td>${escapeHtml(q.nextTemplate)}</td>
</tr>`;
    })
    .join('');

  const manualRows = manualQueue
    .map((q) => {
      const site = domainToUrl(q.domain);
      const newsroom = googleSearchUrl(`site:${q.domain} newsroom`);
      const submitTip = googleSearchUrl(`site:${q.domain} "submit a tip" OR "submit tip" OR "send a tip"`);
      const contactSearch = googleSearchUrl(`site:${q.domain} contact OR about OR staff OR team OR editorial`);
      const editorSearch = googleSearchUrl(`site:${q.domain} editor OR newsroom OR "email"`);
      const pressReleaseSearch = googleSearchUrl(`site:${q.domain} "press release" OR "press releases" OR "submit press release"`);
      const contactLink = q.contactPage
        ? `<a href="${escapeHtml(q.contactPage)}" target="_blank" rel="noreferrer">open</a>`
        : `<a href="${escapeHtml(contactSearch)}" target="_blank" rel="noreferrer">search</a>`;

      return `<tr data-domain="${escapeHtml(q.domain)}" data-tier="${escapeHtml(q.tier)}">
<td><input type="checkbox" class="manual-done" data-domain="${escapeHtml(q.domain)}" /></td>
<td>${q.queueRank}</td>
<td><a href="${escapeHtml(site)}" target="_blank" rel="noreferrer">${escapeHtml(q.domain)}</a></td>
<td>${escapeHtml(q.tier)}</td>
<td>${q.opportunityScore.toFixed(2)}</td>
<td>${escapeHtml(q.topicCategory || '')}</td>
<td>${escapeHtml(q.sourceTab || '')}</td>
<td>${q.phone ? escapeHtml(q.phone) : '-'}</td>
<td>${contactLink}</td>
<td class="actions">
<a href="${escapeHtml(newsroom)}" target="_blank" rel="noreferrer">newsroom</a>
<a href="${escapeHtml(submitTip)}" target="_blank" rel="noreferrer">submit tip</a>
<a href="${escapeHtml(editorSearch)}" target="_blank" rel="noreferrer">editor</a>
<a href="${escapeHtml(pressReleaseSearch)}" target="_blank" rel="noreferrer">submit PR</a>
</td>
</tr>`;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PR Outreach Dashboard</title>
  <style>
    :root {
      --bg: #f6f7fb;
      --panel: #ffffff;
      --ink: #0f172a;
      --muted: #475569;
      --line: #e2e8f0;
      --accent: #0f766e;
      --accent2: #1d4ed8;
      --danger: #b91c1c;
    }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; color: var(--ink); background: var(--bg); }
    .wrap { max-width: 1240px; margin: 0 auto; padding: 20px 16px 40px; }
    h1 { margin: 0 0 8px; }
    h2 { margin: 0 0 10px; font-size: 16px; }
    .meta { margin-bottom: 16px; color: var(--muted); }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
    .k { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--muted); }
    .v { margin-top: 6px; font-size: 24px; font-weight: 800; }
    .tabs { display: flex; gap: 10px; margin: 14px 0; }
    .tabbtn { border: 1px solid var(--line); background: var(--panel); padding: 8px 10px; border-radius: 10px; cursor: pointer; font-weight: 700; color: var(--ink); }
    .tabbtn.active { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(15,118,110,.12); }
    .panel { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px; margin-bottom: 14px; }
    .controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 10px; }
    label { font-size: 13px; color: var(--muted); font-weight: 700; }
    select, input[type="search"] { border: 1px solid var(--line); padding: 8px 10px; border-radius: 10px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
    th, td { border: 1px solid var(--line); padding: 8px; text-align: left; vertical-align: top; }
    th { background: #f8fafc; position: sticky; top: 0; z-index: 1; }
    a { color: var(--accent2); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .actions a { margin-right: 10px; white-space: nowrap; }
    .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--line); font-weight: 800; font-size: 11px; }
    .pill.a { border-color: rgba(29,78,216,.35); color: #1d4ed8; background: rgba(29,78,216,.06); }
    .pill.b { border-color: rgba(15,118,110,.35); color: #0f766e; background: rgba(15,118,110,.06); }
    .pill.c { border-color: rgba(148,163,184,.7); color: #334155; background: rgba(148,163,184,.2); }
    .pill.d { border-color: rgba(185,28,28,.2); color: #b91c1c; background: rgba(185,28,28,.06); }
    .note { color: var(--muted); font-size: 13px; line-height: 1.5; }
    .checklist li { margin: 6px 0; }
    .danger { color: var(--danger); font-weight: 800; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>PR Outreach Dashboard</h1>
    <div class="meta">
      Generated: ${escapeHtml(generatedAt)}<br />
      Send queue (email-ready): ${sendQueue.length}<br />
      Manual outreach queue: ${manualQueue.length}<br />
      Marked sent this run: ${sentCount}
    </div>

    <div class="grid">
      <div class="card"><div class="k">Email-Ready</div><div class="v">${sendQueue.length}</div></div>
      <div class="card"><div class="k">Manual Outreach</div><div class="v">${manualQueue.length}</div></div>
      <div class="card"><div class="k">PR Kit Template</div><div class="v"><span class="pill b">docs</span></div><div class="note">See <code>/Users/macmini/dev/purr/docs/PR_KIT_TEMPLATE.md</code></div></div>
      <div class="card"><div class="k">Workflow</div><div class="v"><span class="pill a">Daily</span></div><div class="note">1) Manual queue first 2) Direct outreach 3) Syndicate</div></div>
    </div>

    <div class="panel">
      <h2>Manual Outreach Strategy (Checklist)</h2>
      <div class="note">
        <ul class="checklist">
          <li><strong>Direct Journalist Outreach:</strong> respond to journalist requests (HARO/Featured-style). Provide short expert quotes + 1 supporting source + your credential line.</li>
          <li><strong>“Newsroom” Search:</strong> for smaller outlets, prioritize <em>Newsroom</em>, <em>Submit a Tip</em>, <em>Editorial</em>, <em>Contact</em> pages and pitch a local-angle story.</li>
          <li><strong>Entity Building via Socials:</strong> build interlinked profiles (LinkedIn, X, directories) that rank for your brand and point to purrify.ca.</li>
          <li><strong>Self-Syndication:</strong> publish the story on Medium/Substack/LinkedIn Articles and link to the canonical page on purrify.ca (even if no-follow, it helps discovery and “next hop”).</li>
        </ul>
        <div class="danger">Important:</div>
        Do not assume contact pages/emails exist. Use the per-domain search links below to verify the right contact path.
      </div>
    </div>

    <div class="tabs">
      <button class="tabbtn active" data-tab="send">Email-Ready Send Queue</button>
      <button class="tabbtn" data-tab="manual">Manual Outreach Queue</button>
    </div>

    <div class="panel" id="tab-send">
      <h2>Email-Ready Send Queue</h2>
      <div class="controls">
        <label>Tier</label>
        <select id="send-tier">
          <option value="">All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <label>Search</label>
        <input type="search" id="send-search" placeholder="domain contains..." />
      </div>
      <table>
        <thead>
          <tr>
            <th>Done</th><th>#</th><th>Domain</th><th>Email</th><th>Phone</th><th>Tier</th><th>Score</th><th>Topic</th><th>Source</th><th>Contact</th><th>Template</th>
          </tr>
        </thead>
        <tbody>${sendRows}</tbody>
      </table>
      <div class="note">Checkboxes are stored in your browser only (localStorage).</div>
    </div>

    <div class="panel" id="tab-manual" style="display:none;">
      <h2>Manual Outreach Queue (Newsroom, Tip Pages, Editors)</h2>
      <div class="controls">
        <label>Tier</label>
        <select id="manual-tier">
          <option value="">All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <label>Search</label>
        <input type="search" id="manual-search" placeholder="domain contains..." />
      </div>
      <table>
        <thead>
          <tr>
            <th>Done</th><th>#</th><th>Domain</th><th>Tier</th><th>Score</th><th>Topic</th><th>Source</th><th>Phone</th><th>Contact</th><th>Search Shortcuts</th>
          </tr>
        </thead>
        <tbody>${manualRows}</tbody>
      </table>
      <div class="note">
        Goal: find a <strong>newsroom/editor contact</strong> or <strong>submit-a-tip</strong> workflow and move the domain to an email-ready record.
      </div>
    </div>
  </div>

  <script>
    (function () {
      const LS_SEND = 'purrify_pr_send_done_v1';
      const LS_MANUAL = 'purrify_pr_manual_done_v1';

      function loadSet(key) {
        try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); }
      }
      function saveSet(key, set) {
        localStorage.setItem(key, JSON.stringify(Array.from(set)));
      }

      const sendDone = loadSet(LS_SEND);
      const manualDone = loadSet(LS_MANUAL);

      document.querySelectorAll('input.done').forEach((cb) => {
        const d = cb.getAttribute('data-domain');
        if (!d) return;
        cb.checked = sendDone.has(d);
        cb.addEventListener('change', () => {
          if (cb.checked) sendDone.add(d); else sendDone.delete(d);
          saveSet(LS_SEND, sendDone);
        });
      });

      document.querySelectorAll('input.manual-done').forEach((cb) => {
        const d = cb.getAttribute('data-domain');
        if (!d) return;
        cb.checked = manualDone.has(d);
        cb.addEventListener('change', () => {
          if (cb.checked) manualDone.add(d); else manualDone.delete(d);
          saveSet(LS_MANUAL, manualDone);
        });
      });

      function filterTable(tabId, tierSelId, searchId) {
        const tier = document.getElementById(tierSelId);
        const search = document.getElementById(searchId);
        const tbody = document.querySelector('#' + tabId + ' tbody');
        if (!tbody || !tier || !search) return;

        function apply() {
          const t = (tier.value || '').toUpperCase();
          const q = (search.value || '').toLowerCase();
          tbody.querySelectorAll('tr').forEach((tr) => {
            const rowTier = (tr.getAttribute('data-tier') || '').toUpperCase();
            const rowDomain = (tr.getAttribute('data-domain') || '').toLowerCase();
            const okTier = !t || rowTier === t;
            const okSearch = !q || rowDomain.includes(q);
            tr.style.display = (okTier && okSearch) ? '' : 'none';
          });
        }

        tier.addEventListener('change', apply);
        search.addEventListener('input', apply);
        apply();
      }

      filterTable('tab-send', 'send-tier', 'send-search');
      filterTable('tab-manual', 'manual-tier', 'manual-search');

      function setTab(tab) {
        document.querySelectorAll('.tabbtn').forEach((b) => b.classList.toggle('active', b.getAttribute('data-tab') === tab));
        document.getElementById('tab-send').style.display = (tab === 'send') ? '' : 'none';
        document.getElementById('tab-manual').style.display = (tab === 'manual') ? '' : 'none';
      }

      document.querySelectorAll('.tabbtn').forEach((b) => {
        b.addEventListener('click', () => setTab(b.getAttribute('data-tab')));
      });
    })();
  </script>
</body>
</html>`;
}

async function runQueue(options: QueueOptions): Promise<void> {
  await mkdir(options.outputDir, { recursive: true });

  const enrichmentCsvPath = path.join(options.outputDir, 'contact-enrichment.csv');
  const statePath = path.join(options.outputDir, 'outreach-state.json');
  const queueCsvPath = path.join(options.outputDir, 'outreach-send-queue.csv');
  const manualQueueCsvPath = path.join(options.outputDir, 'outreach-manual-research-queue.csv');
  const dashboardPath = path.join(options.outputDir, 'outreach-dashboard.html');
  const summaryPath = path.join(options.outputDir, 'outreach-summary.md');

  const enrichedCsv = await readFile(enrichmentCsvPath, 'utf8');
  const records = parseEnrichedRecords(csvRowsToObjects(parseCsv(enrichedCsv)));
  const existingState = await readJsonIfExists<OutreachState[]>(statePath, []);
  const stateMap = toOutreachStateMap(existingState);

  records.forEach((record) => {
    if (!stateMap.has(record.domain)) {
      stateMap.set(record.domain, defaultStateFor(record));
    }
  });

  const queue = buildQueue(records, stateMap, options.limit);
  const manualQueue = buildManualResearchQueue(records, stateMap, options.limit);
  let sentCount = 0;

  if (options.markSent) {
    const today = todayIsoDate();
    queue.forEach((item) => {
      const state = stateMap.get(item.domain);
      if (!state) {
        return;
      }
      sentCount += 1;
      state.attempts += 1;
      state.lastContactDate = today;
      state.status = 'Contacted';

      const nextStage = Math.min(state.emailSequenceStage + 1, options.sequenceDays.length);
      state.emailSequenceStage = nextStage;
      const days = options.sequenceDays[Math.min(nextStage - 1, options.sequenceDays.length - 1)];
      state.followUpDate = addDays(today, days);

      if (state.emailSequenceStage >= options.sequenceDays.length && state.attempts >= options.sequenceDays.length) {
        state.status = 'No Response';
      }
    });
  }

  const stateArray = [...stateMap.values()].sort((a, b) => a.domain.localeCompare(b.domain));
  const withEmail = records.filter((r) => r.bestEmail).length;
  const summary = `# Outreach Queue Summary

- Date: ${new Date().toISOString()}
- Total enriched domains: ${records.length}
- Contacts with email: ${withEmail}
- Send queue size: ${queue.length}
- Manual research queue size: ${manualQueue.length}
- Marked sent: ${sentCount}
- State file: ${statePath}
`;

  await Promise.all([
    writeFile(queueCsvPath, toCsv(queueRows(queue)), 'utf8'),
    writeFile(manualQueueCsvPath, toCsv(queueRows(manualQueue)), 'utf8'),
    writeFile(dashboardPath, dashboardHtml(queue, manualQueue, sentCount), 'utf8'),
    writeFile(summaryPath, summary, 'utf8'),
    writeFile(statePath, JSON.stringify(stateArray, null, 2), 'utf8')
  ]);

  console.log(`Queue complete.
Saved:
- ${queueCsvPath}
- ${manualQueueCsvPath}
- ${dashboardPath}
- ${summaryPath}
- ${statePath}
Queue size: ${queue.length}
Marked sent: ${sentCount}`);
}

async function run(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  if (options.command === 'enrich') {
    await runEnrich(options);
    return;
  }
  await runQueue(options);
}

run().catch((error) => {
  console.error(`PR outreach system failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
