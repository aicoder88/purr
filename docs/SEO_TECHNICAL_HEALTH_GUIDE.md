# Technical SEO Health Check Guide

## Overview

The Technical SEO Health Check system automatically detects and reports on critical SEO issues including broken links, canonical problems, redirect chains, and sitemap issues.

## Quick Start

### Run Health Check

```bash
npm run seo:health-check
```

This will:
- Crawl your entire site
- Check all links for 404s and errors
- Validate canonical tags
- Detect redirect chains
- Validate sitemap URLs
- Generate detailed HTML and JSON reports

### Apply Automated Fixes

```bash
npm run seo:fix
```

This will:
- Clean up your sitemap (remove 404s, non-canonical URLs)
- Split large sitemaps if needed
- Generate a clean sitemap file

## Reports

Reports are generated in the `reports/` directory:

- `seo-health-{timestamp}.html` - Visual HTML report
- `seo-health-{timestamp}.json` - Machine-readable JSON report
- `broken-links-{timestamp}.html` - Detailed broken links report
- `broken-links-{timestamp}.json` - Broken links data

## Understanding Issues

### Broken Links (Critical)

**What it means:** Pages on your site link to URLs that return 404 errors.

**Impact:** 
- Poor user experience
- Wasted crawl budget
- Negative SEO signal

**How to fix:**
1. Review the broken links report
2. Update or remove broken links from source pages
3. If the target page moved, add a 301 redirect

**Example:**
```
Source: /blog/cat-litter-guide
Broken URL: /products/old-product (404)
Suggested Fix: /products/standard
```

### Canonical Issues (Warning)

**What it means:** Canonical tags point to URLs that redirect or don't exist.

**Impact:**
- Search engines may ignore canonical tags
- Duplicate content issues
- Indexing problems

**How to fix:**
1. Update canonical tags to point directly to the final URL
2. Ensure canonical URLs return 200 status
3. Use https:// protocol

**Example:**
```html
<!-- Bad: Points to redirect -->
<link rel="canonical" href="https://purrify.ca/products/trial" />
<!-- Redirects to /products/trial-size -->

<!-- Good: Points directly to final URL -->
<link rel="canonical" href="https://purrify.ca/products/trial-size" />
```

### Redirect Chains (Warning)

**What it means:** URLs redirect multiple times before reaching the final destination.

**Impact:**
- Slower page loads
- Wasted crawl budget
- Link equity dilution

**How to fix:**
1. Update redirects to point directly to final URL
2. Change temporary redirects (302) to permanent (301)

**Example:**
```
Bad: /old-page → /temp-page → /new-page (2 hops)
Good: /old-page → /new-page (1 hop)
```

### Sitemap Issues (Warning)

**What it means:** Your sitemap contains URLs that shouldn't be there.

**Impact:**
- Wasted crawl budget
- Indexing of wrong pages
- Search Console errors

**Common issues:**
- 404 pages in sitemap
- Redirecting URLs in sitemap
- Non-canonical URLs in sitemap
- Noindex pages in sitemap

**How to fix:**
Run `npm run seo:fix` to automatically clean your sitemap.

## Health Score

The health score is calculated as:

```
Health Score = 100 - (Total Issues / Total URLs × 100)
```

**Score ranges:**
- 🟢 90-100: Excellent
- 🟡 70-89: Good
- 🟠 50-69: Needs Improvement
- 🔴 0-49: Critical

## Integration with Build Process

To run health checks during build (optional):

```json
{
  "scripts": {
    "build": "next build && npm run seo:health-check"
  }
}
```

**Note:** This will fail the build if critical issues are found.

## Common Workflows

### Weekly Health Check

```bash
# Run health check
npm run seo:health-check

# Review reports in reports/ directory

# Apply automated fixes
npm run seo:fix

# Manually fix remaining issues
```

### Pre-Deployment Check

```bash
# Build site
npm run build

# Run health check
npm run seo:health-check

# If issues found, fix before deploying
```

### Continuous Monitoring

Set up a cron job or GitHub Action:

```yaml
name: SEO Health Check
on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
jobs:
  seo-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run seo:health-check
      - uses: actions/upload-artifact@v2
        with:
          name: seo-reports
          path: reports/
```

## Troubleshooting

### "Cannot reach site"

**Problem:** The crawler can't access your site.

**Solutions:**
- Ensure site is running (`npm run dev` or deployed)
- Check firewall/security settings
- Set `SITE_URL` environment variable

### "Too many requests"

**Problem:** Rate limiting or server overload.

**Solutions:**
- Add delays between requests (modify crawler)
- Run during off-peak hours
- Use production URL instead of localhost

### "Sitemap not found"

**Problem:** Sitemap doesn't exist or isn't accessible.

**Solutions:**
- Generate sitemap: `npm run generate-enhanced-sitemap`
- Check sitemap exists at `/public/sitemap.xml`
- Verify sitemap is accessible at `https://yoursite.com/sitemap.xml`

## Best Practices

1. **Run health checks regularly** - Weekly or before major deployments
2. **Fix critical issues first** - Broken links and canonical errors
3. **Monitor trends** - Track health score over time
4. **Automate fixes** - Use `npm run seo:fix` for sitemap cleanup
5. **Review reports** - Don't just look at the score, understand the issues
6. **Test fixes** - Re-run health check after making changes

## Advanced Configuration

### Custom Site URL

```bash
SITE_URL=https://staging.purrify.ca npm run seo:health-check
```

### Custom Sitemap Path

```bash
SITEMAP_PATH=public/sitemap-custom.xml npm run seo:fix
```

### Exclude Patterns

Modify `src/lib/seo/broken-link-detector.ts` to exclude certain URLs:

```typescript
if (href.includes('/admin/') || href.includes('/api/')) {
  continue; // Skip admin and API routes
}
```

## API Usage

You can also use the SEO health check programmatically:

```typescript
import { BrokenLinkDetector } from '@/lib/seo/broken-link-detector';
import { CanonicalValidator } from '@/lib/seo/canonical-validator';
import { RedirectAnalyzer } from '@/lib/seo/redirect-analyzer';

async function customHealthCheck() {
  const detector = new BrokenLinkDetector();
  const result = await detector.crawlSite('https://purrify.ca');
  
  console.log(`Found ${result.brokenLinks.length} broken links`);
  
  // Process results...
}
```

## Support

For issues or questions:
1. Check this documentation
2. Review generated reports for specific guidance
3. Check the implementation in `src/lib/seo/`
4. Refer to the design document in `.kiro/specs/seo-enhancement-system/`
