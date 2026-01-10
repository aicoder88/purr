# SEO Technical Health Check Library

This directory contains the core components for the Technical SEO Health Check system.

## Components

### BrokenLinkDetector
**File:** `broken-link-detector.ts`

Crawls your site and identifies broken links.

```typescript
import { BrokenLinkDetector } from '@/lib/seo/broken-link-detector';

const detector = new BrokenLinkDetector();
const result = await detector.crawlSite('https://purrify.ca');

console.log(`Found ${result.brokenLinks.length} broken links`);
```

### CanonicalValidator
**File:** `canonical-validator.ts`

Validates canonical tags and detects issues.

```typescript
import { CanonicalValidator } from '@/lib/seo/canonical-validator';

const validator = new CanonicalValidator();
const issues = await validator.validateCanonicals('https://purrify.ca');

console.log(`Found ${issues.length} canonical issues`);
```

### RedirectAnalyzer
**File:** `redirect-analyzer.ts`

Analyzes redirect chains and identifies optimization opportunities.

```typescript
import { RedirectAnalyzer } from '@/lib/seo/redirect-analyzer';

const analyzer = new RedirectAnalyzer();
const chain = await analyzer.followRedirectChain('https://purrify.ca/old-page');

console.log(`Redirect chain has ${chain.totalHops} hops`);
```

### SitemapCleaner
**File:** `sitemap-cleaner.ts`

Validates and cleans sitemap files.

```typescript
import { SitemapCleaner } from '@/lib/seo/sitemap-cleaner';

const cleaner = new SitemapCleaner();
const result = await cleaner.cleanSitemap('public/sitemap.xml');

console.log(`Removed ${result.removedUrls} invalid URLs`);
```

### ReportGenerator
**File:** `report-generator.ts`

Generates HTML and JSON reports.

```typescript
import { ReportGenerator } from '@/lib/seo/report-generator';

const generator = new ReportGenerator();
generator.generateTechnicalSEOReport(report, 'reports');
```

## CLI Usage

Instead of using the library directly, use the CLI tools:

```bash
# Run full health check
pnpm seo:health-check

# Apply automated fixes
pnpm seo:fix
```

## Documentation

See `docs/SEO_TECHNICAL_HEALTH_GUIDE.md` for complete documentation.
