import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10_000;

type CliOptions = {
  siteUrl: string;
  sitemapUrl: string;
  endpoint: string;
  key?: string;
  keyLocation?: string;
  urls: string[];
  batchSize: number;
  dryRun: boolean;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    siteUrl: normalizeBaseUrl(DEFAULT_SITE_URL),
    sitemapUrl: `${normalizeBaseUrl(DEFAULT_SITE_URL)}/sitemap.xml`,
    endpoint: DEFAULT_ENDPOINT,
    urls: [],
    batchSize: MAX_URLS_PER_REQUEST,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--url' && argv[i + 1]) {
      options.urls.push(...splitUrlValues(argv[i + 1]));
      i++;
      continue;
    }

    if (arg.startsWith('--url=')) {
      options.urls.push(...splitUrlValues(arg.slice('--url='.length)));
      continue;
    }

    if (arg === '--site-url' && argv[i + 1]) {
      const siteUrl = normalizeBaseUrl(argv[i + 1]);
      options.siteUrl = siteUrl;
      options.sitemapUrl = `${siteUrl}/sitemap.xml`;
      i++;
      continue;
    }

    if (arg.startsWith('--site-url=')) {
      const siteUrl = normalizeBaseUrl(arg.slice('--site-url='.length));
      options.siteUrl = siteUrl;
      options.sitemapUrl = `${siteUrl}/sitemap.xml`;
      continue;
    }

    if (arg === '--sitemap-url' && argv[i + 1]) {
      options.sitemapUrl = argv[i + 1].trim();
      i++;
      continue;
    }

    if (arg.startsWith('--sitemap-url=')) {
      options.sitemapUrl = arg.slice('--sitemap-url='.length).trim();
      continue;
    }

    if (arg === '--endpoint' && argv[i + 1]) {
      options.endpoint = argv[i + 1].trim();
      i++;
      continue;
    }

    if (arg.startsWith('--endpoint=')) {
      options.endpoint = arg.slice('--endpoint='.length).trim();
      continue;
    }

    if (arg === '--key' && argv[i + 1]) {
      options.key = argv[i + 1].trim();
      i++;
      continue;
    }

    if (arg.startsWith('--key=')) {
      options.key = arg.slice('--key='.length).trim();
      continue;
    }

    if (arg === '--key-location' && argv[i + 1]) {
      options.keyLocation = argv[i + 1].trim();
      i++;
      continue;
    }

    if (arg.startsWith('--key-location=')) {
      options.keyLocation = arg.slice('--key-location='.length).trim();
      continue;
    }

    if (arg === '--batch-size' && argv[i + 1]) {
      options.batchSize = Number(argv[i + 1]);
      i++;
      continue;
    }

    if (arg.startsWith('--batch-size=')) {
      options.batchSize = Number(arg.slice('--batch-size='.length));
      continue;
    }
  }

  return options;
}

function splitUrlValues(value: string): string[] {
  return value
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);
}

function normalizeBaseUrl(value: string): string {
  const normalized = value.trim().replace(/\/+$/, '');
  return normalized;
}

function isValidIndexNowKey(key: string): boolean {
  return /^[A-Za-z0-9-]{8,128}$/.test(key);
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractLocValues(xml: string): string[] {
  const matches = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)];
  return matches
    .map((match) => decodeXmlEntities(match[1].trim()))
    .filter(Boolean);
}

async function detectIndexNowKeyFromPublicDir(): Promise<string | null> {
  const publicDir = path.join(process.cwd(), 'public');
  const entries = await readdir(publicDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.txt')) {
      continue;
    }

    const key = entry.name.slice(0, -4);
    if (!isValidIndexNowKey(key)) {
      continue;
    }

    const filePath = path.join(publicDir, entry.name);
    const content = (await readFile(filePath, 'utf8')).trim();

    if (content === key) {
      return key;
    }
  }

  return null;
}

async function resolveKey(options: CliOptions): Promise<string> {
  const cliOrEnvKey = options.key || process.env.INDEXNOW_KEY;

  if (cliOrEnvKey) {
    if (!isValidIndexNowKey(cliOrEnvKey)) {
      throw new Error('Provided key is invalid. Key must match IndexNow format rules.');
    }
    return cliOrEnvKey;
  }

  const detectedKey = await detectIndexNowKeyFromPublicDir();
  if (detectedKey) {
    return detectedKey;
  }

  throw new Error(
    'No IndexNow key found. Pass --key, set INDEXNOW_KEY, or place {key}.txt in public/ with the key as file content.'
  );
}

async function fetchSitemapUrls(sitemapUrl: string, visited: Set<string>): Promise<string[]> {
  if (visited.has(sitemapUrl)) {
    return [];
  }

  visited.add(sitemapUrl);

  const response = await fetch(sitemapUrl, {
    headers: {
      'User-Agent': 'PurrifyIndexNowBot/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch sitemap ${sitemapUrl}: HTTP ${response.status}`);
  }

  const xml = await response.text();
  const locValues = extractLocValues(xml);

  if (/<sitemapindex[\s>]/i.test(xml)) {
    const nestedResults = await Promise.all(
      locValues.map((nestedSitemapUrl) => fetchSitemapUrls(nestedSitemapUrl, visited))
    );

    return nestedResults.flat();
  }

  if (/<urlset[\s>]/i.test(xml)) {
    return locValues;
  }

  throw new Error(`Unsupported sitemap format at ${sitemapUrl}`);
}

async function resolveUrlList(options: CliOptions): Promise<string[]> {
  if (options.urls.length > 0) {
    return options.urls;
  }

  return fetchSitemapUrls(options.sitemapUrl, new Set<string>());
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
}

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls.map((url) => url.trim()).filter(Boolean))];
}

async function submitBatch(params: {
  endpoint: string;
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}): Promise<Response> {
  return fetch(params.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: params.host,
      key: params.key,
      keyLocation: params.keyLocation,
      urlList: params.urlList,
    }),
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!Number.isInteger(options.batchSize) || options.batchSize < 1 || options.batchSize > MAX_URLS_PER_REQUEST) {
    throw new Error(`--batch-size must be an integer between 1 and ${MAX_URLS_PER_REQUEST}.`);
  }

  const key = await resolveKey(options);
  const site = new URL(options.siteUrl);
  const host = site.host;
  const keyLocation = options.keyLocation || `${options.siteUrl}/${key}.txt`;
  const urls = uniqueUrls(await resolveUrlList(options));

  if (urls.length === 0) {
    throw new Error('No URLs found to submit.');
  }

  const invalidUrl = urls.find((url) => {
    try {
      const parsed = new URL(url);
      return parsed.host !== host;
    } catch {
      return true;
    }
  });

  if (invalidUrl) {
    throw new Error(`Invalid URL or host mismatch detected: ${invalidUrl}`);
  }

  console.log(`IndexNow endpoint: ${options.endpoint}`);
  console.log(`Host: ${host}`);
  console.log(`Key file: ${keyLocation}`);
  console.log(`URLs to submit: ${urls.length}`);

  if (options.dryRun) {
    console.log('\nDry run only. No submission sent.');
    return;
  }

  const batches = chunkArray(urls, options.batchSize);
  let submittedCount = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const response = await submitBatch({
      endpoint: options.endpoint,
      host,
      key,
      keyLocation,
      urlList: batch,
    });

    const body = (await response.text()).trim();
    const accepted = response.status === 200 || response.status === 202;

    if (!accepted) {
      throw new Error(
        `Batch ${i + 1}/${batches.length} failed with HTTP ${response.status}${body ? `: ${body}` : ''}`
      );
    }

    submittedCount += batch.length;
    console.log(`Submitted batch ${i + 1}/${batches.length}: ${batch.length} URLs (HTTP ${response.status})`);
  }

  console.log(`\nIndexNow submission complete. Submitted ${submittedCount} URL(s).`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`IndexNow submission failed: ${message}`);
  process.exit(1);
});
