import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import net from 'node:net';
import { chromium, type Browser, type Page } from '@playwright/test';

const DEFAULT_PUBLIC_ORIGIN = 'https://www.purrify.ca';
const DEFAULT_HOSTNAME = '127.0.0.1';
const DEFAULT_PORT = 3123;
const DEFAULT_CONCURRENCY = 4;
const DEFAULT_TIMEOUT_MS = 120_000;
const VALID_HREFLANG_PATTERN = /^(?:x-default|[a-z]{2,3}(?:-[A-Za-z]{2,4})?)$/;

type RenderedSeoIssueType =
  | 'status'
  | 'canonical'
  | 'robots'
  | 'hreflang'
  | 'json-ld'
  | 'head';

type RenderedSeoIssueSeverity = 'error' | 'warning';

type JsonLdRecord = Record<string, unknown>;

export interface RenderedSeoIssue {
  url: string;
  inspectedUrl: string;
  severity: RenderedSeoIssueSeverity;
  type: RenderedSeoIssueType;
  message: string;
}

interface HreflangLink {
  hreflang: string;
  href: string;
}

interface RenderedHeadSnapshot {
  titleCount: number;
  metaDescriptionCount: number;
  canonicalHrefs: string[];
  ogUrls: string[];
  robotsMetaContents: string[];
  googlebotMetaContents: string[];
  hreflangLinks: HreflangLink[];
  jsonLdBlocks: string[];
}

export interface RenderedSeoPageResult {
  url: string;
  inspectedUrl: string;
  status: number | null;
  finalUrl: string | null;
  issues: RenderedSeoIssue[];
}

export interface RenderedSeoValidationResult {
  passed: boolean;
  sitemapUrl: string;
  sitemapUrls: string[];
  pagesChecked: number;
  pagesWithIssues: number;
  issues: RenderedSeoIssue[];
  pageResults: RenderedSeoPageResult[];
}

export interface RenderedSeoValidationOptions {
  baseUrl?: string;
  sitemapUrl?: string;
  publicOrigin?: string;
  startServer?: boolean;
  port?: number;
  concurrency?: number;
  maxUrls?: number;
  timeoutMs?: number;
}

interface LocalServerHandle {
  baseUrl: string;
  stop: () => Promise<void>;
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`;
}

function isAbsoluteUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeUrlForComparison(value: string): string {
  const parsed = new URL(value);
  const pathname = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '') || '/';
  return `${parsed.origin}${pathname}${parsed.search}`;
}

function mapToInspectionUrl(publicUrl: string, baseUrl: string): string {
  const nextUrl = new URL(publicUrl);
  const localBase = new URL(ensureTrailingSlash(baseUrl));
  return new URL(`${nextUrl.pathname.replace(/^\//, '')}${nextUrl.search}${nextUrl.hash}`, localBase).toString();
}

async function fetchText(url: string): Promise<{ status: number; body: string }> {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent': 'purrify-rendered-seo-validator',
    },
  });

  return {
    status: response.status,
    body: await response.text(),
  };
}

export function extractLocValues(xml: string): string[] {
  const matches = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)];
  return [...new Set(matches.map((match) => match[1].trim()).filter(Boolean))];
}

function parseSitemapKind(xml: string): 'urlset' | 'sitemapindex' | 'unknown' {
  if (/<sitemapindex[\s>]/i.test(xml)) {
    return 'sitemapindex';
  }

  if (/<urlset[\s>]/i.test(xml)) {
    return 'urlset';
  }

  return 'unknown';
}

async function discoverSitemapUrls(
  sitemapUrl: string,
  baseUrl: string,
  visited = new Set<string>(),
): Promise<string[]> {
  const inspectableSitemapUrl = mapToInspectionUrl(sitemapUrl, baseUrl);

  if (visited.has(inspectableSitemapUrl)) {
    return [];
  }

  visited.add(inspectableSitemapUrl);

  const { status, body } = await fetchText(inspectableSitemapUrl);
  if (status !== 200) {
    throw new Error(`Sitemap fetch failed for ${inspectableSitemapUrl} with status ${status}`);
  }

  const locs = extractLocValues(body);
  const kind = parseSitemapKind(body);

  if (kind === 'sitemapindex') {
    const nestedResults = await Promise.all(
      locs.map((loc) => discoverSitemapUrls(loc, baseUrl, visited))
    );
    return [...new Set(nestedResults.flat())];
  }

  if (kind !== 'urlset') {
    throw new Error(`Unsupported sitemap format at ${inspectableSitemapUrl}`);
  }

  return locs;
}

function parseRobotsContent(content: string): Set<string> {
  return new Set(
    content
      .split(',')
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean)
  );
}

function collectDirectiveConflicts(
  directives: Set<string>,
  label: string,
  url: string,
  inspectedUrl: string,
): RenderedSeoIssue[] {
  const issues: RenderedSeoIssue[] = [];

  const contradictoryPairs: Array<[string, string]> = [
    ['index', 'noindex'],
    ['follow', 'nofollow'],
    ['archive', 'noarchive'],
    ['snippet', 'nosnippet'],
    ['imageindex', 'noimageindex'],
  ];

  for (const [left, right] of contradictoryPairs) {
    if (directives.has(left) && directives.has(right)) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'robots',
        message: `${label} contains contradictory directives: ${left}, ${right}`,
      });
    }
  }

  return issues;
}

function collectRobotsIssues(
  snapshot: RenderedHeadSnapshot,
  url: string,
  inspectedUrl: string,
): RenderedSeoIssue[] {
  const issues: RenderedSeoIssue[] = [];
  const robotsMeta = snapshot.robotsMetaContents.map((content) => content.trim()).filter(Boolean);
  const googlebotMeta = snapshot.googlebotMetaContents.map((content) => content.trim()).filter(Boolean);

  const uniqueRobotsMeta = [...new Set(robotsMeta)];
  const uniqueGooglebotMeta = [...new Set(googlebotMeta)];

  if (uniqueRobotsMeta.length > 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'robots',
      message: `Multiple conflicting meta robots tags found: ${uniqueRobotsMeta.join(' | ')}`,
    });
  }

  if (uniqueGooglebotMeta.length > 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'robots',
      message: `Multiple conflicting googlebot robots tags found: ${uniqueGooglebotMeta.join(' | ')}`,
    });
  }

  const robotsDirectives = uniqueRobotsMeta.length > 0
    ? parseRobotsContent(uniqueRobotsMeta[0])
    : new Set<string>();
  const googlebotDirectives = uniqueGooglebotMeta.length > 0
    ? parseRobotsContent(uniqueGooglebotMeta[0])
    : new Set<string>();

  issues.push(...collectDirectiveConflicts(robotsDirectives, 'meta robots', url, inspectedUrl));
  issues.push(...collectDirectiveConflicts(googlebotDirectives, 'googlebot robots', url, inspectedUrl));

  const consistencyPairs: Array<[string, string]> = [
    ['index', 'noindex'],
    ['follow', 'nofollow'],
  ];

  for (const [positive, negative] of consistencyPairs) {
    if (
      (robotsDirectives.has(positive) && googlebotDirectives.has(negative)) ||
      (robotsDirectives.has(negative) && googlebotDirectives.has(positive))
    ) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'robots',
        message: `meta robots and googlebot robots disagree on ${positive}/${negative}`,
      });
    }
  }

  return issues;
}

function flattenJsonLdNodes(value: unknown): JsonLdRecord[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenJsonLdNodes(item));
  }

  if (typeof value !== 'object' || value === null) {
    return [];
  }

  const record = value as JsonLdRecord;
  const nodes: JsonLdRecord[] = [];

  if (Array.isArray(record['@graph'])) {
    nodes.push(...flattenJsonLdNodes(record['@graph']));
  }

  if (record['@type']) {
    nodes.push(record);
  }

  return nodes;
}

function getJsonLdTypes(node: JsonLdRecord): string[] {
  const value = node['@type'];
  if (typeof value === 'string') {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  return [];
}

function hasTruthyField(node: JsonLdRecord, field: string): boolean {
  const value = node[field];
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value);
}

function validateJsonLdNode(node: JsonLdRecord, type: string): string[] {
  switch (type) {
    case 'Product': {
      const missing = ['name', 'description', 'offers'].filter((field) => !hasTruthyField(node, field));
      return missing.map((field) => `Product missing required field "${field}"`);
    }
    case 'Offer': {
      const missing = ['priceCurrency', 'availability'].filter((field) => !hasTruthyField(node, field));
      return missing.map((field) => `Offer missing required field "${field}"`);
    }
    case 'Article':
    case 'BlogPosting':
    case 'NewsArticle': {
      const missing = ['headline', 'datePublished'].filter((field) => !hasTruthyField(node, field));
      return missing.map((field) => `${type} missing required field "${field}"`);
    }
    case 'FAQPage': {
      if (!Array.isArray(node.mainEntity) || node.mainEntity.length === 0) {
        return ['FAQPage must contain a non-empty "mainEntity" array'];
      }
      return [];
    }
    case 'BreadcrumbList': {
      if (!Array.isArray(node.itemListElement) || node.itemListElement.length === 0) {
        return ['BreadcrumbList must contain a non-empty "itemListElement" array'];
      }
      return [];
    }
    case 'Organization': {
      const missing = ['name'].filter((field) => !hasTruthyField(node, field));
      return missing.map((field) => `Organization missing required field "${field}"`);
    }
    case 'WebSite':
    case 'WebPage': {
      const missing = ['name', 'url'].filter((field) => !hasTruthyField(node, field));
      return missing.map((field) => `${type} missing required field "${field}"`);
    }
    default:
      return [];
  }
}

function collectJsonLdIssues(
  snapshot: RenderedHeadSnapshot,
  url: string,
  inspectedUrl: string,
): RenderedSeoIssue[] {
  const issues: RenderedSeoIssue[] = [];

  snapshot.jsonLdBlocks.forEach((block, index) => {
    let parsed: unknown;

    try {
      parsed = JSON.parse(block);
    } catch (error) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'json-ld',
        message: `JSON-LD block ${index + 1} is not parseable: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
      return;
    }

    const nodes = flattenJsonLdNodes(parsed);
    if (nodes.length === 0) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'warning',
        type: 'json-ld',
        message: `JSON-LD block ${index + 1} did not expose any typed schema nodes`,
      });
      return;
    }

    for (const node of nodes) {
      const types = getJsonLdTypes(node);
      for (const type of types) {
        for (const message of validateJsonLdNode(node, type)) {
          issues.push({
            url,
            inspectedUrl,
            severity: 'error',
            type: 'json-ld',
            message,
          });
        }
      }
    }
  });

  return issues;
}

export function validateRenderedHeadSnapshot(
  snapshot: RenderedHeadSnapshot,
  url: string,
  inspectedUrl: string,
): RenderedSeoIssue[] {
  const issues: RenderedSeoIssue[] = [];

  const canonicalHrefs = snapshot.canonicalHrefs.filter(Boolean);
  const uniqueCanonicals = [...new Set(canonicalHrefs)];

  if (uniqueCanonicals.length === 0) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'canonical',
      message: 'Missing canonical tag',
    });
  } else {
    uniqueCanonicals.forEach((canonicalHref) => {
      if (!isAbsoluteUrl(canonicalHref)) {
        issues.push({
          url,
          inspectedUrl,
          severity: 'error',
          type: 'canonical',
          message: `Canonical URL must be absolute: ${canonicalHref}`,
        });
      }
    });
  }

  if (snapshot.titleCount !== 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'head',
      message: `Expected exactly one <title> tag, found ${snapshot.titleCount}`,
    });
  }

  if (snapshot.metaDescriptionCount > 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'head',
      message: `Expected at most one meta description tag, found ${snapshot.metaDescriptionCount}`,
    });
  }

  if (uniqueCanonicals.length > 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'canonical',
      message: `Multiple canonical tags found with different values: ${uniqueCanonicals.join(' | ')}`,
    });
  }

  const uniqueOgUrls = [...new Set(snapshot.ogUrls.filter(Boolean))];
  uniqueOgUrls.forEach((ogUrl) => {
    if (!isAbsoluteUrl(ogUrl)) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'head',
        message: `og:url must be absolute: ${ogUrl}`,
      });
    }
  });

  if (uniqueOgUrls.length > 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'head',
      message: `Multiple og:url tags found with different values: ${uniqueOgUrls.join(' | ')}`,
    });
  }

  if (uniqueCanonicals.length === 1 && uniqueOgUrls.length === 1) {
    const canonical = uniqueCanonicals[0];
    const ogUrl = uniqueOgUrls[0];

    if (isAbsoluteUrl(canonical) && isAbsoluteUrl(ogUrl)) {
      if (normalizeUrlForComparison(canonical) !== normalizeUrlForComparison(ogUrl)) {
        issues.push({
          url,
          inspectedUrl,
          severity: 'error',
          type: 'head',
          message: `canonical and og:url disagree: ${canonical} vs ${ogUrl}`,
        });
      }
    }
  }

  const hreflangByCode = new Map<string, string>();
  let xDefaultCount = 0;

  for (const link of snapshot.hreflangLinks) {
    const code = link.hreflang.trim();
    const href = link.href.trim();

    if (!VALID_HREFLANG_PATTERN.test(code)) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'hreflang',
        message: `Invalid hreflang value: ${code}`,
      });
    }

    if (!isAbsoluteUrl(href)) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'hreflang',
        message: `hreflang "${code}" must use an absolute URL: ${href}`,
      });
    }

    if (code.toLowerCase() === 'x-default') {
      xDefaultCount += 1;
    }

    const previousHref = hreflangByCode.get(code.toLowerCase());
    if (previousHref && previousHref !== href) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'hreflang',
        message: `hreflang "${code}" points to multiple URLs: ${previousHref} and ${href}`,
      });
    } else {
      hreflangByCode.set(code.toLowerCase(), href);
    }
  }

  if (xDefaultCount > 1) {
    issues.push({
      url,
      inspectedUrl,
      severity: 'error',
      type: 'hreflang',
      message: `Expected at most one x-default hreflang, found ${xDefaultCount}`,
    });
  }

  const canonical = uniqueCanonicals.length === 1 ? uniqueCanonicals[0] : null;
  if (canonical && snapshot.hreflangLinks.length > 0 && isAbsoluteUrl(canonical)) {
    const hasSelfAlternate = snapshot.hreflangLinks.some((link) => {
      if (!isAbsoluteUrl(link.href)) {
        return false;
      }
      return normalizeUrlForComparison(link.href) === normalizeUrlForComparison(canonical);
    });

    if (!hasSelfAlternate) {
      issues.push({
        url,
        inspectedUrl,
        severity: 'warning',
        type: 'hreflang',
        message: 'hreflang set is missing a self-referential alternate for the canonical URL',
      });
    }
  }

  issues.push(...collectRobotsIssues(snapshot, url, inspectedUrl));
  issues.push(...collectJsonLdIssues(snapshot, url, inspectedUrl));

  return issues;
}

async function collectRenderedHeadSnapshot(
  page: Page
): Promise<RenderedHeadSnapshot> {
  return page.evaluate(() => {
    const head = document.head;

    return {
      titleCount: head.querySelectorAll('title').length,
      metaDescriptionCount: head.querySelectorAll('meta[name="description"]').length,
      canonicalHrefs: Array.from(head.querySelectorAll('link[rel="canonical"]'))
        .map((element) => element.getAttribute('href')?.trim() ?? '')
        .filter(Boolean),
      ogUrls: Array.from(head.querySelectorAll('meta[property="og:url"]'))
        .map((element) => element.getAttribute('content')?.trim() ?? '')
        .filter(Boolean),
      robotsMetaContents: Array.from(head.querySelectorAll('meta[name="robots"]'))
        .map((element) => element.getAttribute('content')?.trim() ?? '')
        .filter(Boolean),
      googlebotMetaContents: Array.from(head.querySelectorAll('meta[name="googlebot"]'))
        .map((element) => element.getAttribute('content')?.trim() ?? '')
        .filter(Boolean),
      hreflangLinks: Array.from(head.querySelectorAll('link[rel="alternate"][hreflang]'))
        .map((element) => ({
          hreflang: element.getAttribute('hreflang')?.trim() ?? '',
          href: element.getAttribute('href')?.trim() ?? '',
        }))
        .filter((entry) => entry.hreflang.length > 0),
      jsonLdBlocks: Array.from(head.querySelectorAll('script[type="application/ld+json"]'))
        .map((element) => element.textContent?.trim() ?? '')
        .filter(Boolean),
    };
  });
}

async function inspectRenderedPage(
  browser: Browser,
  url: string,
  inspectedUrl: string,
  timeoutMs: number,
): Promise<RenderedSeoPageResult> {
  const page = await browser.newPage();

  try {
    const response = await page.goto(inspectedUrl, {
      waitUntil: 'domcontentloaded',
      timeout: timeoutMs,
    });

    try {
      await page.waitForLoadState('networkidle', {
        timeout: 5_000,
      });
    } catch {
      // Some pages intentionally keep connections open; domcontentloaded is enough for head inspection.
    }

    const status = response?.status() ?? null;
    const snapshot = await collectRenderedHeadSnapshot(page);
    const issues = validateRenderedHeadSnapshot(snapshot, url, inspectedUrl);

    if (status !== 200) {
      issues.unshift({
        url,
        inspectedUrl,
        severity: 'error',
        type: 'status',
        message: `Expected HTTP 200, received ${status ?? 'no response'}`,
      });
    }

    return {
      url,
      inspectedUrl,
      status,
      finalUrl: page.url(),
      issues,
    };
  } catch (error) {
    return {
      url,
      inspectedUrl,
      status: null,
      finalUrl: null,
      issues: [
        {
          url,
          inspectedUrl,
          severity: 'error',
          type: 'status',
          message: `Rendered inspection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
    };
  } finally {
    await page.close();
  }
}

async function runWithConcurrency<TInput, TResult>(
  values: TInput[],
  concurrency: number,
  worker: (value: TInput) => Promise<TResult>,
): Promise<TResult[]> {
  const results: TResult[] = new Array(values.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(values[index]);
    }
  });

  await Promise.all(runners);
  return results;
}

function nextAvailablePort(startingPort: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.unref();
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        server.listen(0, DEFAULT_HOSTNAME);
        return;
      }

      reject(error);
    });
    server.listen(startingPort, DEFAULT_HOSTNAME, () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === 'object') {
          resolve(address.port);
          return;
        }

        reject(new Error('Could not resolve an open port'));
      });
    });
  });
}

async function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: {
          'user-agent': 'purrify-rendered-seo-validator',
        },
      });

      if (response.status === 200) {
        return;
      }
    } catch {
      // Ignore until timeout expires.
    }

    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  throw new Error(`Timed out waiting for server readiness at ${url}`);
}

async function stopChildProcess(processHandle: ChildProcessWithoutNullStreams): Promise<void> {
  if (processHandle.killed || processHandle.exitCode !== null) {
    return;
  }

  await new Promise<void>((resolve) => {
    processHandle.once('exit', () => resolve());
    processHandle.kill('SIGTERM');

    setTimeout(() => {
      if (!processHandle.killed && processHandle.exitCode === null) {
        processHandle.kill('SIGKILL');
      }
    }, 5_000).unref();
  });
}

async function startLocalNextServer(
  requestedPort: number,
  timeoutMs: number,
): Promise<LocalServerHandle> {
  const port = await nextAvailablePort(requestedPort);
  const baseUrl = `http://${DEFAULT_HOSTNAME}:${port}`;
  const processHandle = spawn(
    'pnpm',
    ['next', 'dev', '--hostname', DEFAULT_HOSTNAME, '--port', String(port)],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      stdio: 'pipe',
    }
  );

  let stderrBuffer = '';
  processHandle.stderr.on('data', (chunk) => {
    stderrBuffer = `${stderrBuffer}${chunk.toString()}`.slice(-8_000);
  });

  processHandle.stdout.on('data', () => {
    // Keep stdout drained to avoid blocking the child process.
  });

  try {
    await waitForServer(`${baseUrl}/sitemap.xml`, timeoutMs);
  } catch (error) {
    await stopChildProcess(processHandle);
    const lockHint = stderrBuffer.includes('Unable to acquire lock')
      ? 'Another `next dev` is already running in this repo. Reuse it with `--base-url=http://127.0.0.1:<port>` or stop it before running this validator.'
      : '';
    throw new Error(
      `Local Next.js server did not become ready. ${error instanceof Error ? error.message : ''}\n${lockHint}\n${stderrBuffer}`
    );
  }

  return {
    baseUrl,
    stop: async () => stopChildProcess(processHandle),
  };
}

export async function validateRenderedSeo(
  options: RenderedSeoValidationOptions = {},
): Promise<RenderedSeoValidationResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const concurrency = options.concurrency ?? DEFAULT_CONCURRENCY;
  const publicOrigin = trimTrailingSlash(
    options.publicOrigin
      ?? process.env.NEXT_PUBLIC_SITE_URL
      ?? process.env.SITE_URL
      ?? DEFAULT_PUBLIC_ORIGIN
  );

  let localServer: LocalServerHandle | null = null;
  const shouldStartServer = options.startServer ?? !options.baseUrl;
  const configuredBaseUrl = shouldStartServer
    ? undefined
    : trimTrailingSlash(options.baseUrl ?? `http://${DEFAULT_HOSTNAME}:${options.port ?? DEFAULT_PORT}`);

  try {
    if (!configuredBaseUrl) {
      localServer = await startLocalNextServer(options.port ?? DEFAULT_PORT, timeoutMs);
    }

    const resolvedBaseUrl = trimTrailingSlash(configuredBaseUrl ?? localServer?.baseUrl ?? '');
    const sitemapUrl = options.sitemapUrl ?? `${publicOrigin}/sitemap.xml`;
    const sitemapUrls = await discoverSitemapUrls(sitemapUrl, resolvedBaseUrl);
    const urlsToInspect = typeof options.maxUrls === 'number'
      ? sitemapUrls.slice(0, options.maxUrls)
      : sitemapUrls;

    const browser = await chromium.launch({
      headless: true,
    });

    try {
      const pageResults = await runWithConcurrency(urlsToInspect, concurrency, async (url) => {
        const inspectedUrl = mapToInspectionUrl(url, resolvedBaseUrl);
        return inspectRenderedPage(browser, url, inspectedUrl, timeoutMs);
      });

      const issues = pageResults.flatMap((result) => result.issues);
      const errorCount = issues.filter((issue) => issue.severity === 'error').length;

      return {
        passed: errorCount === 0,
        sitemapUrl,
        sitemapUrls: urlsToInspect,
        pagesChecked: pageResults.length,
        pagesWithIssues: pageResults.filter((result) => result.issues.length > 0).length,
        issues,
        pageResults,
      };
    } finally {
      await browser.close();
    }
  } finally {
    if (localServer) {
      await localServer.stop();
    }
  }
}

function parseNumberArg(name: string): number | undefined {
  const prefix = `${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  if (!match) {
    return undefined;
  }

  const value = Number.parseInt(match.slice(prefix.length), 10);
  return Number.isFinite(value) ? value : undefined;
}

function parseStringArg(name: string): string | undefined {
  const prefix = `${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

async function main() {
  const maxUrls = parseNumberArg('--max-urls') ?? Number(process.env.SEO_RENDERED_MAX_URLS || '');
  const timeoutMs = parseNumberArg('--timeout-ms') ?? Number(process.env.SEO_RENDERED_TIMEOUT_MS || '');
  const concurrency = parseNumberArg('--concurrency') ?? Number(process.env.SEO_RENDERED_CONCURRENCY || '');
  const port = parseNumberArg('--port') ?? Number(process.env.SEO_RENDERED_PORT || '');
  const baseUrl = parseStringArg('--base-url') ?? process.env.SEO_RENDERED_BASE_URL;
  const sitemapUrl = parseStringArg('--sitemap-url') ?? process.env.SEO_RENDERED_SITEMAP_URL;

  console.log('Rendered SEO validation');
  console.log('='.repeat(72));

  const result = await validateRenderedSeo({
    baseUrl,
    sitemapUrl,
    maxUrls: Number.isFinite(maxUrls) && maxUrls > 0 ? maxUrls : undefined,
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : undefined,
    concurrency: Number.isFinite(concurrency) && concurrency > 0 ? concurrency : undefined,
    port: Number.isFinite(port) && port > 0 ? port : undefined,
  });

  const errors = result.issues.filter((issue) => issue.severity === 'error');
  const warnings = result.issues.filter((issue) => issue.severity === 'warning');

  console.log(`Sitemap: ${result.sitemapUrl}`);
  console.log(`Pages checked: ${result.pagesChecked}`);
  console.log(`Pages with issues: ${result.pagesWithIssues}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log();

  result.issues.slice(0, 25).forEach((issue) => {
    console.log(`[${issue.severity}] [${issue.type}] ${issue.url}`);
    console.log(`  ${issue.message}`);
  });

  if (result.issues.length > 25) {
    console.log(`... and ${result.issues.length - 25} more issue(s)`);
  }

  console.log();
  if (result.passed) {
    console.log('PASS: rendered SEO validation succeeded');
    process.exit(0);
  }

  console.log('FAIL: rendered SEO validation found blocking issues');
  process.exit(1);
}

if (process.argv[1] && /validate-rendered-seo\.(?:ts|js)$/.test(process.argv[1])) {
  void main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
