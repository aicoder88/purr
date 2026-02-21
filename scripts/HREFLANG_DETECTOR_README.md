# Hreflang Redirect Issue Detector

These scripts detect when `hreflang` alternate language links return 3xx redirects instead of 200 OK status codes. This is an SEO issue because hreflang URLs should point directly to the canonical final URLs.

## The Problem

When a page has hreflang annotations like:

```html
<link rel="alternate" hreflang="en" href="https://example.com/page" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />
```

The French URL (`/fr/page`) should return a **200 OK** response. If it returns a redirect (like 301, 302, or 308), search engines may not correctly process the hreflang relationship.

### Example Issue

```
Page URL: https://www.purrify.ca/learn/cat-litter-guide/
Issue Type: Hreflang redirect (308)
Link URL: https://www.purrify.ca/fr/learn/cat-litter-guide/
```

This indicates that the French alternate link is redirecting (308 Permanent Redirect) instead of serving content directly.

---

## Scripts

### 1. Node.js Version: `find-hreflang-redirects.js`

A comprehensive, concurrent scanner with detailed reporting.

#### Prerequisites

```bash
npm install xml2js cheerio
```

#### Usage

```bash
# Check a single page
node find-hreflang-redirects.js --url https://example.com/page

# Check all pages from a sitemap
node find-hreflang-redirects.js --sitemap https://example.com/sitemap.xml

# Custom concurrency (default: 5)
node find-hreflang-redirects.js --sitemap https://example.com/sitemap.xml --concurrency 10

# Custom timeout in ms (default: 10000)
node find-hreflang-redirects.js --sitemap https://example.com/sitemap.xml --timeout 5000

# Custom output file (default: hreflang-report.json)
node find-hreflang-redirects.js --sitemap https://example.com/sitemap.xml --output my-report.json
```

#### Features

- Concurrent scanning (configurable)
- Supports sitemap indexes
- Detailed JSON report
- Detects all 3xx redirects (301, 302, 307, 308)
- Shows redirect destination
- Distinguishes errors from warnings

#### Output Example

```
[OK] https://example.com/page (3 hreflangs)
[ISSUES: 1] https://example.com/another-page (2 hreflangs)
  → fr: Hreflang redirect (308)
    https://example.com/fr/another-page
    Redirects to: https://example.com/fr/autre-page/
```

---

### 2. Bash Version: `find-hreflang-redirects.sh`

A lightweight script for quick manual checks without Node.js dependencies.

#### Usage

```bash
# Make executable first
chmod +x find-hreflang-redirects.sh

# Check a single page
./find-hreflang-redirects.sh https://example.com/page

# Check all pages from a sitemap
./find-hreflang-redirects.sh --sitemap https://example.com/sitemap.xml
```

#### Features

- No dependencies (uses curl and grep)
- Color-coded output
- Supports sitemap indexes
- Shows redirect destinations

#### Output Example

```
Checking: https://example.com/page
  OK (200): en → https://example.com/page
  ISSUE: Hreflang redirect (308)
    hreflang: fr
    URL: https://example.com/fr/page
    Redirects to: https://example.com/fr/autre-page/
  ✗ Found 1 hreflang issue(s)
```

---

## Interpreting Results

### Severity Levels

| Status | Severity | Description |
|--------|----------|-------------|
| 308 | Error | Permanent Redirect - hreflang should point to final URL |
| 301 | Error | Moved Permanently - hreflang should point to final URL |
| 302 | Warning | Found (temporary) - may cause inconsistent indexing |
| 307 | Warning | Temporary Redirect - may cause inconsistent indexing |
| 4xx/5xx | Error | Page not accessible - broken hreflang link |

### Common Causes

1. **Trailing slashes** - URL redirects from `/fr/page` to `/fr/page/`
2. **URL case** - `/FR/page` redirects to `/fr/page`
3. **Outdated URLs** - Content moved but hreflang not updated
4. **Language redirects** - Server redirects based on IP/language detection
5. **Missing pages** - Alternate language page doesn't exist

### Fixes

Update the hreflang links to point directly to the final URL after any redirects:

```html
<!-- Before (redirects) -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />

<!-- After (direct) -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page/" />
```

---

## Exit Codes

Both scripts return:
- `0` if no issues found
- `1` if hreflang redirect issues detected

This allows integration with CI/CD pipelines.
