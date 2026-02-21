#!/usr/bin/env node
/**
 * Hreflang Redirect Issue Detector
 * 
 * Finds hreflang links that return 3xx redirects instead of 200 OK.
 * This is an SEO issue because hreflang alternate URLs should be the
 * canonical final URLs, not redirecting URLs.
 * 
 * Usage:
 *   node find-hreflang-redirects.js --sitemap https://example.com/sitemap.xml
 *   node find-hreflang-redirects.js --url https://example.com/page
 *   node find-hreflang-redirects.js --sitemap https://example.com/sitemap.xml --concurrency 10
 */

const { parseStringPromise } = require('xml2js');
const cheerio = require('cheerio');

// CLI argument parsing
const args = process.argv.slice(2);
const options = {
  sitemap: null,
  url: null,
  concurrency: 5,
  timeout: 10000,
  userAgent: 'HreflangBot/1.0 (SEO Audit Bot)',
  output: 'hreflang-report.json',
  checkCanonical: true,
  followRedirects: false // Important: don't follow redirects, we want to detect them
};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--sitemap':
      options.sitemap = args[++i];
      break;
    case '--url':
      options.url = args[++i];
      break;
    case '--concurrency':
      options.concurrency = parseInt(args[++i], 10);
      break;
    case '--timeout':
      options.timeout = parseInt(args[++i], 10);
      break;
    case '--output':
      options.output = args[++i];
      break;
    case '--user-agent':
      options.userAgent = args[++i];
      break;
    case '--check-canonical':
      options.checkCanonical = true;
      break;
    case '--no-check-canonical':
      options.checkCanonical = false;
      break;
  }
}

if (!options.sitemap && !options.url) {
  console.error('Usage: node find-hreflang-redirects.js --sitemap <url> [--concurrency 5]');
  console.error('   or: node find-hreflang-redirects.js --url <url> [--concurrency 5]');
  process.exit(1);
}

const results = {
  scanned: 0,
  issues: [],
  errors: [],
  summary: {
    totalHreflangLinks: 0,
    redirectingHreflangs: 0,
    errorUrls: 0
  }
};

/**
 * Fetch with timeout and redirect handling
 */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      redirect: options.followRedirects ? 'follow' : 'manual',
      headers: {
        'User-Agent': options.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Extract hreflang links from HTML
 */
function extractHreflangs(html, baseUrl) {
  const $ = cheerio.load(html);
  const hreflangs = [];
  
  // Check link rel="alternate" hreflang="..."
  $('link[rel="alternate"][hreflang]').each((_, elem) => {
    const hreflang = $(elem).attr('hreflang');
    const href = $(elem).attr('href');
    
    if (href && hreflang) {
      // Resolve relative URLs
      const absoluteUrl = new URL(href, baseUrl).toString();
      hreflangs.push({
        hreflang,
        href: absoluteUrl,
        originalHref: href
      });
    }
  });
  
  // Also check for x-default
  $('link[rel="alternate"][hreflang="x-default"]').each((_, elem) => {
    const href = $(elem).attr('href');
    if (href) {
      const absoluteUrl = new URL(href, baseUrl).toString();
      hreflangs.push({
        hreflang: 'x-default',
        href: absoluteUrl,
        originalHref: href
      });
    }
  });
  
  return hreflangs;
}

/**
 * Check if a URL returns a redirect status
 */
async function checkRedirectStatus(url) {
  try {
    const response = await fetchWithTimeout(url, {
      timeout: options.timeout,
      followRedirects: false
    });
    
    const isRedirect = response.status >= 300 && response.status < 400;
    const redirectLocation = response.headers.get('location');
    
    return {
      url,
      status: response.status,
      statusText: response.statusText,
      isRedirect,
      redirectLocation,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    return {
      url,
      status: 'error',
      statusText: error.message,
      isRedirect: false,
      error: error.message
    };
  }
}

/**
 * Scan a single page for hreflang issues
 */
async function scanPage(pageUrl) {
  const issues = [];
  
  try {
    // Fetch the page
    const response = await fetchWithTimeout(pageUrl, {
      timeout: options.timeout,
      followRedirects: true // Follow redirects for the main page
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const finalUrl = response.url;
    const html = await response.text();
    
    // Extract hreflang links
    const hreflangs = extractHreflangs(html, finalUrl);
    
    if (hreflangs.length === 0) {
      return { pageUrl: finalUrl, hreflangs: [], issues: [] };
    }
    
    // Check each hreflang link
    for (const hreflang of hreflangs) {
      const statusCheck = await checkRedirectStatus(hreflang.href);
      
      if (statusCheck.isRedirect) {
        issues.push({
          pageUrl: finalUrl,
          linkUrl: hreflang.href,
          hreflang: hreflang.hreflang,
          issueType: `Hreflang redirect (${statusCheck.status})`,
          redirectLocation: statusCheck.redirectLocation,
          severity: statusCheck.status === 308 ? 'error' : 'warning',
          details: `Hreflang link returns ${statusCheck.status} ${statusCheck.statusText}. ` +
                   `Redirects to: ${statusCheck.redirectLocation || 'unknown'}`
        });
      } else if (statusCheck.status === 'error') {
        issues.push({
          pageUrl: finalUrl,
          linkUrl: hreflang.href,
          hreflang: hreflang.hreflang,
          issueType: 'Hreflang unreachable',
          severity: 'error',
          details: `Failed to fetch hreflang URL: ${statusCheck.error}`
        });
      }
    }
    
    return { pageUrl: finalUrl, hreflangs, issues };
    
  } catch (error) {
    return {
      pageUrl,
      hreflangs: [],
      issues: [],
      error: error.message
    };
  }
}

/**
 * Fetch URLs from sitemap
 */
async function fetchSitemapUrls(sitemapUrl) {
  try {
    const response = await fetch(sitemapUrl, {
      headers: { 'User-Agent': options.userAgent }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`);
    }
    
    const xml = await response.text();
    const parsed = await parseStringPromise(xml);
    
    const urls = [];
    
    // Standard sitemap
    if (parsed.urlset && parsed.urlset.url) {
      for (const urlEntry of parsed.urlset.url) {
        if (urlEntry.loc && urlEntry.loc[0]) {
          urls.push(urlEntry.loc[0]);
        }
      }
    }
    
    // Sitemap index
    if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
      console.log('Sitemap index detected. Fetching child sitemaps...');
      for (const sitemapEntry of parsed.sitemapindex.sitemap) {
        if (sitemapEntry.loc && sitemapEntry.loc[0]) {
          const childUrls = await fetchSitemapUrls(sitemapEntry.loc[0]);
          urls.push(...childUrls);
        }
      }
    }
    
    return urls;
  } catch (error) {
    console.error(`Error parsing sitemap ${sitemapUrl}:`, error.message);
    return [];
  }
}

/**
 * Process URLs with concurrency limit
 */
async function processWithConcurrency(urls, processor, concurrency) {
  const queue = [...urls];
  const active = new Set();
  const results = [];
  
  async function processNext() {
    if (queue.length === 0) return;
    
    const url = queue.shift();
    const promise = processor(url).then(result => {
      results.push(result);
      active.delete(promise);
    });
    
    active.add(promise);
    
    if (active.size >= concurrency) {
      await Promise.race(active);
    }
    
    await processNext();
  }
  
  // Start initial batch
  const workers = Array(Math.min(concurrency, urls.length))
    .fill(null)
    .map(() => processNext());
  
  await Promise.all(workers);
  
  // Wait for remaining
  while (active.size > 0) {
    await Promise.race(active);
  }
  
  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Hreflang Redirect Issue Detector');
  console.log('='.repeat(60));
  console.log(`Concurrency: ${options.concurrency}`);
  console.log(`Timeout: ${options.timeout}ms`);
  console.log(`Follow redirects (main pages): true`);
  console.log(`Follow redirects (hreflang checks): false`);
  console.log('-'.repeat(60));
  
  let urlsToScan = [];
  
  if (options.sitemap) {
    console.log(`\nFetching sitemap: ${options.sitemap}`);
    urlsToScan = await fetchSitemapUrls(options.sitemap);
    console.log(`Found ${urlsToScan.length} URLs to scan`);
  } else if (options.url) {
    urlsToScan = [options.url];
  }
  
  if (urlsToScan.length === 0) {
    console.error('No URLs to scan!');
    process.exit(1);
  }
  
  console.log('\nScanning pages...\n');
  
  const scanResults = await processWithConcurrency(
    urlsToScan,
    async (url) => {
      const result = await scanPage(url);
      results.scanned++;
      
      if (result.error) {
        results.errors.push({ url, error: result.error });
        console.log(`[ERROR] ${url}: ${result.error}`);
      } else {
        const issueCount = result.issues.length;
        const hreflangCount = result.hreflangs.length;
        results.summary.totalHreflangLinks += hreflangCount;
        
        if (issueCount > 0) {
          results.summary.redirectingHreflangs += issueCount;
          results.issues.push(...result.issues);
          console.log(`[ISSUES: ${issueCount}] ${url} (${hreflangCount} hreflangs)`);
          for (const issue of result.issues) {
            console.log(`  → ${issue.hreflang}: ${issue.issueType}`);
            console.log(`    ${issue.linkUrl}`);
            if (issue.redirectLocation) {
              console.log(`    Redirects to: ${issue.redirectLocation}`);
            }
          }
        } else if (hreflangCount > 0) {
          console.log(`[OK] ${url} (${hreflangCount} hreflangs)`);
        } else {
          console.log(`[SKIP] ${url} (no hreflangs)`);
        }
      }
      
      return result;
    },
    options.concurrency
  );
  
  // Generate summary
  results.summary.errorUrls = results.errors.length;
  
  console.log('\n' + '='.repeat(60));
  console.log('SCAN COMPLETE');
  console.log('='.repeat(60));
  console.log(`Pages scanned: ${results.scanned}`);
  console.log(`Total hreflang links found: ${results.summary.totalHreflangLinks}`);
  console.log(`Redirecting hreflangs: ${results.summary.redirectingHreflangs}`);
  console.log(`Errors: ${results.summary.errorUrls}`);
  console.log('-'.repeat(60));
  
  if (results.issues.length > 0) {
    console.log('\nIssues by type:');
    const byType = {};
    for (const issue of results.issues) {
      byType[issue.issueType] = (byType[issue.issueType] || 0) + 1;
    }
    for (const [type, count] of Object.entries(byType)) {
      console.log(`  ${type}: ${count}`);
    }
    
    console.log('\nIssues by severity:');
    const bySeverity = { error: 0, warning: 0 };
    for (const issue of results.issues) {
      bySeverity[issue.severity] = (bySeverity[issue.severity] || 0) + 1;
    }
    console.log(`  Errors: ${bySeverity.error}`);
    console.log(`  Warnings: ${bySeverity.warning}`);
  }
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    options,
    results
  };
  
  const fs = require('fs');
  fs.writeFileSync(options.output, JSON.stringify(report, null, 2));
  console.log(`\nReport saved to: ${options.output}`);
  
  // Exit with error code if issues found
  process.exit(results.issues.length > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
