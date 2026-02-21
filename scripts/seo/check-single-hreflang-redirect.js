#!/usr/bin/env node
/**
 * Find hreflang redirect issues on one page or many pages.
 *
 * Usage:
 *   node scripts/seo/check-single-hreflang-redirect.js --page <pageUrl>
 *   node scripts/seo/check-single-hreflang-redirect.js --page <pageUrl> --page <pageUrl>
 *   node scripts/seo/check-single-hreflang-redirect.js --sitemap <sitemapUrl>
 *   node scripts/seo/check-single-hreflang-redirect.js --sitemap <sitemapUrl> --output hreflang-report.json
 */

const fs = require('node:fs');
const cheerio = require('cheerio');

const DEFAULT_PAGE_URL = 'https://www.purrify.ca/learn/cat-litter-guide/';
const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_CONCURRENCY = 5;

function parseArgs(argv) {
  const parsed = {
    pageUrls: [],
    sitemap: null,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    concurrency: DEFAULT_CONCURRENCY,
    output: null,
    showHelp: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      parsed.showHelp = true;
    } else if (arg === '--page') {
      if (argv[index + 1]) {
        parsed.pageUrls.push(argv[index + 1]);
        index += 1;
      }
    } else if (arg === '--sitemap') {
      parsed.sitemap = argv[index + 1] ?? null;
      index += 1;
    } else if (arg === '--timeout') {
      const timeoutMs = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
        parsed.timeoutMs = timeoutMs;
      }
      index += 1;
    } else if (arg === '--concurrency') {
      const concurrency = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(concurrency) && concurrency > 0) {
        parsed.concurrency = concurrency;
      }
      index += 1;
    } else if (arg === '--output') {
      parsed.output = argv[index + 1] ?? null;
      index += 1;
    }
  }

  if (parsed.pageUrls.length === 0 && !parsed.sitemap && !parsed.showHelp) {
    parsed.pageUrls.push(DEFAULT_PAGE_URL);
  }

  return parsed;
}

function printHelp() {
  console.log('Hreflang redirect issue checker');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/seo/check-single-hreflang-redirect.js --page <pageUrl>');
  console.log('  node scripts/seo/check-single-hreflang-redirect.js --page <pageUrl> --page <pageUrl>');
  console.log('  node scripts/seo/check-single-hreflang-redirect.js --sitemap <sitemapUrl>');
  console.log('');
  console.log('Options:');
  console.log('  --page <url>         Page to scan (repeatable)');
  console.log('  --sitemap <url>      Sitemap XML or sitemap index URL');
  console.log('  --timeout <ms>       Request timeout in milliseconds (default: 10000)');
  console.log('  --concurrency <n>    Number of pages scanned in parallel (default: 5)');
  console.log('  --output <path>      Write full JSON report to a file');
}

function normalizeUrl(url) {
  const parsed = new URL(url);
  if (parsed.pathname.length > 1) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, '');
  }
  return parsed.toString();
}

function toAbsoluteUrl(url, baseUrl) {
  return new URL(url, baseUrl).toString();
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function extractLocUrlsFromSitemapXml(xml) {
  const urls = [];
  const regex = /<loc>([\s\S]*?)<\/loc>/gi;
  let match = regex.exec(xml);

  while (match) {
    const value = decodeXml(match[1].trim());
    if (value) {
      urls.push(value);
    }
    match = regex.exec(xml);
  }

  return urls;
}

function dedupeUrls(urls) {
  const seen = new Set();
  const deduped = [];

  for (const url of urls) {
    try {
      const normalized = normalizeUrl(url);
      if (!seen.has(normalized)) {
        seen.add(normalized);
        deduped.push(url);
      }
    } catch {
      // Ignore invalid URL entries.
    }
  }

  return deduped;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      redirect: options.redirect ?? 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'HreflangIssueChecker/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

function extractHreflangs(html, finalPageUrl) {
  const $ = cheerio.load(html);
  const items = [];

  $('link[rel="alternate"][hreflang]').each((_, element) => {
    const hreflang = $(element).attr('hreflang');
    const href = $(element).attr('href');

    if (!hreflang || !href) {
      return;
    }

    items.push({
      hreflang,
      href: toAbsoluteUrl(href, finalPageUrl),
    });
  });

  return items;
}

async function getPageUrls(args) {
  if (!args.sitemap) {
    return dedupeUrls(args.pageUrls);
  }

  const topLevel = await fetchWithTimeout(args.sitemap, {
    timeoutMs: args.timeoutMs,
    redirect: 'follow',
  });

  if (!topLevel.ok) {
    throw new Error(`Failed to fetch sitemap (${topLevel.status} ${topLevel.statusText})`);
  }

  const topLevelXml = await topLevel.text();
  const topLevelLocs = extractLocUrlsFromSitemapXml(topLevelXml);
  const isIndex = /<sitemapindex[\s>]/i.test(topLevelXml);

  if (!isIndex) {
    return dedupeUrls(topLevelLocs);
  }

  const nestedResults = await Promise.all(
    topLevelLocs.map(async (sitemapUrl) => {
      try {
        const response = await fetchWithTimeout(sitemapUrl, {
          timeoutMs: args.timeoutMs,
          redirect: 'follow',
        });

        if (!response.ok) {
          return [];
        }

        const xml = await response.text();
        return extractLocUrlsFromSitemapXml(xml);
      } catch {
        return [];
      }
    })
  );

  return dedupeUrls(nestedResults.flat());
}

async function checkHreflangUrl(url, timeoutMs) {
  try {
    const response = await fetchWithTimeout(url, {
      timeoutMs,
      redirect: 'manual',
    });

    return {
      status: response.status,
      location: response.headers.get('location'),
      error: null,
    };
  } catch (error) {
    return {
      status: 0,
      location: null,
      error: error.message,
    };
  }
}

async function scanPage(pageUrl, timeoutMs) {
  const result = {
    pageUrl,
    finalPageUrl: pageUrl,
    hreflangCount: 0,
    issues: [],
    pageError: null,
  };

  try {
    const pageResponse = await fetchWithTimeout(pageUrl, {
      timeoutMs,
      redirect: 'follow',
    });

    if (!pageResponse.ok) {
      result.pageError = `Failed to fetch page (${pageResponse.status} ${pageResponse.statusText})`;
      return result;
    }

    result.finalPageUrl = pageResponse.url;
    const html = await pageResponse.text();
    const hreflangs = extractHreflangs(html, result.finalPageUrl);
    result.hreflangCount = hreflangs.length;

    for (const hreflang of hreflangs) {
      const check = await checkHreflangUrl(hreflang.href, timeoutMs);

      if (check.status >= 300 && check.status < 400) {
        result.issues.push({
          pageUrl: result.finalPageUrl,
          issueType: `Hreflang redirect (${check.status})`,
          linkUrl: hreflang.href,
          hreflang: hreflang.hreflang,
          redirectTarget: check.location ? toAbsoluteUrl(check.location, hreflang.href) : null,
        });
      } else if (check.status >= 400 || check.status === 0) {
        result.issues.push({
          pageUrl: result.finalPageUrl,
          issueType: check.status === 0 ? 'Hreflang unreachable' : `Hreflang error (${check.status})`,
          linkUrl: hreflang.href,
          hreflang: hreflang.hreflang,
          redirectTarget: null,
          error: check.error,
        });
      }
    }

    return result;
  } catch (error) {
    result.pageError = error.message;
    return result;
  }
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runWorker() {
    while (cursor < items.length) {
      const currentIndex = cursor;
      cursor += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  }

  const workerCount = Math.min(concurrency, items.length || 1);
  const runners = Array.from({ length: workerCount }, () => runWorker());
  await Promise.all(runners);
  return results;
}

function printIssue(issue) {
  console.log(`Page URL: ${issue.pageUrl}`);
  console.log(`Issue Type: ${issue.issueType}`);
  console.log(`Link URL: ${issue.linkUrl}`);
  if (issue.hreflang) {
    console.log(`Hreflang: ${issue.hreflang}`);
  }
  if (issue.redirectTarget) {
    console.log(`Redirect Target: ${issue.redirectTarget}`);
  }
  if (issue.error) {
    console.log(`Error: ${issue.error}`);
  }
  console.log('');
}

function printSummary(report) {
  console.log('Summary');
  console.log(`Pages scanned: ${report.summary.pagesScanned}`);
  console.log(`Pages failed: ${report.summary.pagesFailed}`);
  console.log(`Total hreflang links checked: ${report.summary.hreflangLinksChecked}`);
  console.log(`Total issues found: ${report.summary.issuesFound}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.showHelp) {
    printHelp();
    return;
  }

  const pageUrls = await getPageUrls(args);
  if (pageUrls.length === 0) {
    throw new Error('No page URLs found to scan.');
  }

  const pageResults = await mapWithConcurrency(pageUrls, args.concurrency, (pageUrl) =>
    scanPage(pageUrl, args.timeoutMs)
  );

  const report = {
    generatedAt: new Date().toISOString(),
    input: {
      pageCount: pageUrls.length,
      sitemap: args.sitemap,
      timeoutMs: args.timeoutMs,
      concurrency: args.concurrency,
    },
    pages: pageResults,
    issues: [],
    summary: {
      pagesScanned: 0,
      pagesFailed: 0,
      hreflangLinksChecked: 0,
      issuesFound: 0,
    },
  };

  for (const page of pageResults) {
    report.summary.pagesScanned += 1;
    report.summary.hreflangLinksChecked += page.hreflangCount;

    if (page.pageError) {
      report.summary.pagesFailed += 1;
      console.log(`[ERROR] ${page.pageUrl} -> ${page.pageError}`);
      console.log('');
      continue;
    }

    if (page.issues.length === 0) {
      console.log(`[OK] ${page.finalPageUrl} (${page.hreflangCount} hreflangs)`);
      continue;
    }

    console.log(`[ISSUES: ${page.issues.length}] ${page.finalPageUrl}`);
    console.log('');
    for (const issue of page.issues) {
      report.issues.push(issue);
      printIssue(issue);
    }
  }

  report.summary.issuesFound = report.issues.length;
  printSummary(report);

  if (args.output) {
    fs.writeFileSync(args.output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    console.log(`Report written to: ${args.output}`);
  }

  if (report.summary.issuesFound > 0 || report.summary.pagesFailed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 2;
});
