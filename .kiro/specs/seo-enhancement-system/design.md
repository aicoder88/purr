# Design Document

## Overview

The SEO Enhancement System automates SEO optimization tasks including keyword suggestions, structured data generation, meta tag optimization, sitemap management, and internal linking recommendations. It integrates with the existing keyword research file and provides automated audits to ensure all pages follow SEO best practices.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Keyword Research Database                   │
│              (docs/cat odor keywords.xlsx)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  SEO Enhancement Pipeline                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Keyword    │  │  Structured  │  │  Meta Tag    │     │
│  │  Optimizer   │  │    Data      │  │  Generator   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Sitemap    │  │   Internal   │  │  SEO Audit   │     │
│  │  Generator   │  │   Linking    │  │   Engine     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Broken Link  │  │  Canonical   │  │  Redirect    │     │
│  │  Detector    │  │  Validator   │  │  Analyzer    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Search Console Integration               │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Keyword Optimizer

**Purpose**: Suggest and validate keyword usage

**Interface**:
```typescript
interface Keyword {
  term: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  difficulty: number;
  category: string;
}

interface KeywordSuggestion {
  keyword: Keyword;
  relevanceScore: number;
  currentUsage: number;
  recommendedPlacement: ('title' | 'h1' | 'meta-description' | 'content')[];
}

class KeywordOptimizer {
  async loadKeywords(): Promise<Keyword[]>;
  async suggestKeywords(content: string, category: string): Promise<KeywordSuggestion[]>;
  async validateKeywordUsage(content: string, targetKeywords: string[]): Promise<ValidationResult>;
  calculateKeywordDensity(content: string, keyword: string): number;
}
```

**Implementation**:
```typescript
import xlsx from 'xlsx';

class KeywordOptimizer {
  private keywords: Keyword[] = [];
  
  async loadKeywords(): Promise<Keyword[]> {
    const workbook = xlsx.readFile('docs/cat odor keywords.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    this.keywords = data.map(row => ({
      term: row['Keyword'],
      searchVolume: row['Search Volume'],
      competition: row['Competition'],
      difficulty: row['Difficulty'],
      category: row['Category']
    }));
    
    return this.keywords;
  }
  
  async suggestKeywords(content: string, category: string): Promise<KeywordSuggestion[]> {
    const relevantKeywords = this.keywords
      .filter(k => k.category === category)
      .filter(k => k.competition === 'low' || k.competition === 'medium')
      .sort((a, b) => b.searchVolume - a.searchVolume);
    
    return relevantKeywords.slice(0, 10).map(keyword => ({
      keyword,
      relevanceScore: this.calculateRelevance(content, keyword.term),
      currentUsage: this.countOccurrences(content, keyword.term),
      recommendedPlacement: this.getRecommendedPlacements(content, keyword.term)
    }));
  }
  
  calculateKeywordDensity(content: string, keyword: string): number {
    const words = content.toLowerCase().split(/\s+/).length;
    const occurrences = this.countOccurrences(content, keyword);
    return (occurrences / words) * 100;
  }
}
```

### 2. Structured Data Generator

**Purpose**: Generate Schema.org JSON-LD markup

**Interface**:
```typescript
interface StructuredDataConfig {
  type: 'Product' | 'BlogPosting' | 'Organization' | 'BreadcrumbList' | 'FAQPage';
  data: Record<string, any>;
}

class StructuredDataGenerator {
  generateProduct(product: ProductData): string;
  generateBlogPosting(post: BlogPostData): string;
  generateOrganization(org: OrganizationData): string;
  generateBreadcrumbs(path: string[]): string;
  validateSchema(schema: string): boolean;
}
```

**Implementation**:
```typescript
class StructuredDataGenerator {
  generateProduct(product: ProductData): string {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'description': product.description,
      'image': product.images,
      'brand': {
        '@type': 'Brand',
        'name': 'Purrify'
      },
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': 'CAD',
        'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'url': product.url
      },
      'aggregateRating': product.rating ? {
        '@type': 'AggregateRating',
        'ratingValue': product.rating.value,
        'reviewCount': product.rating.count
      } : undefined
    };
    
    return JSON.stringify(schema, null, 2);
  }
  
  generateBlogPosting(post: BlogPostData): string {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'image': [post.featuredImage],
      'datePublished': post.publishDate,
      'dateModified': post.modifiedDate || post.publishDate,
      'author': {
        '@type': 'Person',
        'name': post.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Purrify',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://purrify.ca/purrify-logo.png'
        }
      },
      'description': post.excerpt,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': post.url
      }
    };
    
    return JSON.stringify(schema, null, 2);
  }
}
```

### 3. Meta Tag Generator

**Purpose**: Generate optimized meta tags with emotional copywriting

**Interface**:
```typescript
interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

class MetaTagGenerator {
  generateTitle(content: string, keywords: string[]): string;
  generateDescription(content: string, keywords: string[], maxLength: number): string;
  generateOpenGraphTags(config: MetaTagsConfig): Record<string, string>;
  generateTwitterTags(config: MetaTagsConfig): Record<string, string>;
  validateMetaTags(tags: Record<string, string>): ValidationResult;
}
```

**Emotional Copywriting Templates**:
```typescript
const titleTemplates = [
  '{keyword}: Stop Being Embarrassed About {problem}',
  '{number} Ways to Eliminate {problem} (That Actually Work)',
  'Why {solution} Destroys {problem} Better Than {alternative}',
  'Finally: {solution} That Eliminates {problem} in {timeframe}'
];

const descriptionTemplates = [
  'Tired of {problem}? Discover how {solution} eliminates {problem} at the source. {benefit}. Try risk-free today.',
  '{problem} making you embarrassed? {solution} destroys odors instantly. {social_proof}. Shop now.',
  'Stop masking {problem}. {solution} eliminates it permanently. {benefit}. {cta}.'
];
```

### 4. Sitemap Generator

**Purpose**: Generate and maintain XML sitemaps

**Interface**:
```typescript
interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

class SitemapGenerator {
  async generateSitemap(): Promise<SitemapEntry[]>;
  async submitToSearchEngines(sitemapUrl: string): Promise<void>;
  calculatePriority(pageType: string, traffic: number): number;
  calculateChangeFreq(pageType: string, updateFrequency: number): string;
}
```

**Priority Calculation**:
```typescript
const priorityRules = {
  homepage: 1.0,
  products: 0.9,
  'product-category': 0.8,
  blog: 0.7,
  'blog-category': 0.6,
  static: 0.5,
  legal: 0.3
};

const changeFreqRules = {
  homepage: 'daily',
  products: 'weekly',
  blog: 'monthly',
  static: 'yearly'
};
```

### 5. Internal Linking Analyzer

**Purpose**: Suggest internal linking opportunities

**Interface**:
```typescript
interface InternalLink {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  relevanceScore: number;
}

interface LinkingSuggestion {
  currentPage: string;
  suggestedLinks: InternalLink[];
  orphanPages: string[];
  overlinkedPages: string[];
}

class InternalLinkingAnalyzer {
  async analyzeSiteStructure(): Promise<LinkingSuggestion[]>;
  async findOrphanPages(): Promise<string[]>;
  async suggestLinks(pageContent: string, pageUrl: string): Promise<InternalLink[]>;
  calculateRelevance(sourcePage: string, targetPage: string): number;
}
```

### 6. SEO Audit Engine

**Purpose**: Validate SEO compliance before deployment

**Interface**:
```typescript
interface SEOAuditResult {
  page: string;
  score: number;
  issues: SEOIssue[];
  warnings: SEOWarning[];
  passed: boolean;
}

interface SEOIssue {
  type: 'missing-title' | 'duplicate-title' | 'missing-meta' | 'broken-link' | 'missing-alt' | 'no-h1' | 'multiple-h1';
  severity: 'critical' | 'error' | 'warning';
  message: string;
  location: string;
  suggestion: string;
}

class SEOAuditEngine {
  async auditPage(url: string): Promise<SEOAuditResult>;
  async auditSite(): Promise<SEOAuditResult[]>;
  validateTitle(title: string): SEOIssue[];
  validateMetaDescription(description: string): SEOIssue[];
  validateHeadings(html: string): SEOIssue[];
  validateImages(html: string): SEOIssue[];
  validateLinks(html: string): Promise<SEOIssue[]>;
}
```

### 7. Broken Link Detector

**Purpose**: Identify and report broken internal and external links

**Interface**:
```typescript
interface BrokenLink {
  sourceUrl: string;
  targetUrl: string;
  statusCode: number;
  linkText: string;
  linkType: 'internal' | 'external';
  suggestedFix?: string;
}

interface LinkCheckResult {
  totalLinks: number;
  brokenLinks: BrokenLink[];
  redirects: BrokenLink[];
  validLinks: number;
}

class BrokenLinkDetector {
  async crawlSite(baseUrl: string): Promise<LinkCheckResult>;
  async checkUrl(url: string): Promise<{ statusCode: number; finalUrl: string }>;
  async findBrokenLinks(): Promise<BrokenLink[]>;
  async suggestReplacement(brokenUrl: string): Promise<string | null>;
  async validateSitemapUrls(sitemapUrl: string): Promise<BrokenLink[]>;
}
```

**Implementation**:
```typescript
import axios from 'axios';
import cheerio from 'cheerio';

class BrokenLinkDetector {
  private visited = new Set<string>();
  private brokenLinks: BrokenLink[] = [];
  
  async crawlSite(baseUrl: string): Promise<LinkCheckResult> {
    const queue = [baseUrl];
    const allLinks: string[] = [];
    
    while (queue.length > 0) {
      const url = queue.shift()!;
      if (this.visited.has(url)) continue;
      this.visited.add(url);
      
      try {
        const response = await axios.get(url, { 
          maxRedirects: 0,
          validateStatus: () => true 
        });
        
        if (response.status === 200) {
          const $ = cheerio.load(response.data);
          
          // Extract all links
          $('a[href]').each((_, el) => {
            const href = $(el).attr('href');
            if (href) {
              const absoluteUrl = new URL(href, url).href;
              allLinks.push(absoluteUrl);
              
              // Add internal links to queue
              if (absoluteUrl.startsWith(baseUrl)) {
                queue.push(absoluteUrl);
              }
            }
          });
        }
      } catch (error) {
        console.error(`Error crawling ${url}:`, error);
      }
    }
    
    // Check all found links
    for (const link of allLinks) {
      const result = await this.checkUrl(link);
      if (result.statusCode >= 400) {
        this.brokenLinks.push({
          sourceUrl: '', // Will be filled by caller
          targetUrl: link,
          statusCode: result.statusCode,
          linkText: '',
          linkType: link.startsWith(baseUrl) ? 'internal' : 'external'
        });
      }
    }
    
    return {
      totalLinks: allLinks.length,
      brokenLinks: this.brokenLinks,
      redirects: this.brokenLinks.filter(l => l.statusCode >= 300 && l.statusCode < 400),
      validLinks: allLinks.length - this.brokenLinks.length
    };
  }
  
  async checkUrl(url: string): Promise<{ statusCode: number; finalUrl: string }> {
    try {
      const response = await axios.get(url, {
        maxRedirects: 5,
        validateStatus: () => true,
        timeout: 10000
      });
      
      return {
        statusCode: response.status,
        finalUrl: response.request.res.responseUrl || url
      };
    } catch (error) {
      return { statusCode: 0, finalUrl: url };
    }
  }
  
  async suggestReplacement(brokenUrl: string): Promise<string | null> {
    // Try common variations
    const variations = [
      brokenUrl.replace(/\/$/, ''), // Remove trailing slash
      brokenUrl + '/', // Add trailing slash
      brokenUrl.replace(/\.html$/, ''), // Remove .html
      brokenUrl.toLowerCase() // Lowercase
    ];
    
    for (const variant of variations) {
      const result = await this.checkUrl(variant);
      if (result.statusCode === 200) {
        return variant;
      }
    }
    
    return null;
  }
}
```

### 8. Canonical Validator

**Purpose**: Ensure canonical URLs are valid and don't point to redirects

**Interface**:
```typescript
interface CanonicalIssue {
  pageUrl: string;
  canonicalUrl: string;
  issueType: 'points-to-redirect' | 'missing' | 'conflict' | 'invalid-protocol' | 'self-reference-mismatch';
  statusCode?: number;
  finalUrl?: string;
  suggestion: string;
}

class CanonicalValidator {
  async validateCanonicals(siteUrl: string): Promise<CanonicalIssue[]>;
  async checkCanonicalUrl(pageUrl: string, canonicalUrl: string): Promise<CanonicalIssue | null>;
  async findCanonicalConflicts(): Promise<CanonicalIssue[]>;
  async fixCanonicalUrl(pageUrl: string, correctCanonical: string): Promise<void>;
}
```

**Implementation**:
```typescript
import axios from 'axios';
import cheerio from 'cheerio';

class CanonicalValidator {
  async validateCanonicals(siteUrl: string): Promise<CanonicalIssue[]> {
    const issues: CanonicalIssue[] = [];
    const pages = await this.getAllPages(siteUrl);
    
    for (const pageUrl of pages) {
      try {
        const response = await axios.get(pageUrl);
        const $ = cheerio.load(response.data);
        const canonicalUrl = $('link[rel="canonical"]').attr('href');
        
        if (!canonicalUrl) {
          issues.push({
            pageUrl,
            canonicalUrl: '',
            issueType: 'missing',
            suggestion: `Add canonical tag: <link rel="canonical" href="${pageUrl}" />`
          });
          continue;
        }
        
        // Check if canonical points to redirect
        const canonicalCheck = await axios.get(canonicalUrl, {
          maxRedirects: 0,
          validateStatus: () => true
        });
        
        if (canonicalCheck.status >= 300 && canonicalCheck.status < 400) {
          const finalUrl = canonicalCheck.headers.location;
          issues.push({
            pageUrl,
            canonicalUrl,
            issueType: 'points-to-redirect',
            statusCode: canonicalCheck.status,
            finalUrl,
            suggestion: `Update canonical to point directly to ${finalUrl}`
          });
        }
        
        // Check protocol
        if (canonicalUrl.startsWith('http://')) {
          issues.push({
            pageUrl,
            canonicalUrl,
            issueType: 'invalid-protocol',
            suggestion: `Update canonical to use https:// instead of http://`
          });
        }
        
        // Check self-reference
        if (pageUrl === canonicalUrl) {
          const normalizedPage = this.normalizeUrl(pageUrl);
          const normalizedCanonical = this.normalizeUrl(canonicalUrl);
          
          if (normalizedPage !== normalizedCanonical) {
            issues.push({
              pageUrl,
              canonicalUrl,
              issueType: 'self-reference-mismatch',
              suggestion: `Ensure canonical exactly matches page URL: ${normalizedPage}`
            });
          }
        }
      } catch (error) {
        console.error(`Error validating canonical for ${pageUrl}:`, error);
      }
    }
    
    return issues;
  }
  
  private normalizeUrl(url: string): string {
    return url.toLowerCase().replace(/\/$/, '');
  }
  
  private async getAllPages(siteUrl: string): Promise<string[]> {
    // Fetch from sitemap
    const sitemapUrl = `${siteUrl}/sitemap.xml`;
    const response = await axios.get(sitemapUrl);
    const $ = cheerio.load(response.data, { xmlMode: true });
    
    const urls: string[] = [];
    $('url > loc').each((_, el) => {
      urls.push($(el).text());
    });
    
    return urls;
  }
}
```

### 9. Redirect Analyzer

**Purpose**: Detect and optimize redirect chains

**Interface**:
```typescript
interface RedirectChain {
  startUrl: string;
  chain: RedirectHop[];
  finalUrl: string;
  totalHops: number;
  suggestion: string;
}

interface RedirectHop {
  url: string;
  statusCode: number;
  redirectType: 'permanent' | 'temporary';
}

class RedirectAnalyzer {
  async analyzeRedirects(siteUrl: string): Promise<RedirectChain[]>;
  async followRedirectChain(url: string): Promise<RedirectChain>;
  async findTemporaryRedirects(): Promise<RedirectHop[]>;
  async generateRedirectMap(): Promise<Map<string, string>>;
}
```

**Implementation**:
```typescript
import axios from 'axios';

class RedirectAnalyzer {
  async followRedirectChain(url: string): Promise<RedirectChain> {
    const chain: RedirectHop[] = [];
    let currentUrl = url;
    let hops = 0;
    const maxHops = 10;
    
    while (hops < maxHops) {
      try {
        const response = await axios.get(currentUrl, {
          maxRedirects: 0,
          validateStatus: () => true
        });
        
        if (response.status >= 300 && response.status < 400) {
          const redirectType = [301, 308].includes(response.status) ? 'permanent' : 'temporary';
          
          chain.push({
            url: currentUrl,
            statusCode: response.status,
            redirectType
          });
          
          currentUrl = response.headers.location;
          hops++;
        } else {
          // Reached final destination
          break;
        }
      } catch (error) {
        break;
      }
    }
    
    const suggestion = chain.length > 1 
      ? `Update ${url} to redirect directly to ${currentUrl} (currently ${chain.length} hops)`
      : chain.length === 1 && chain[0].redirectType === 'temporary'
      ? `Change redirect from ${chain[0].statusCode} to 301 (permanent)`
      : 'No issues';
    
    return {
      startUrl: url,
      chain,
      finalUrl: currentUrl,
      totalHops: chain.length,
      suggestion
    };
  }
  
  async analyzeRedirects(siteUrl: string): Promise<RedirectChain[]> {
    const pages = await this.getAllPages(siteUrl);
    const chains: RedirectChain[] = [];
    
    for (const page of pages) {
      const chain = await this.followRedirectChain(page);
      if (chain.totalHops > 0) {
        chains.push(chain);
      }
    }
    
    return chains;
  }
  
  private async getAllPages(siteUrl: string): Promise<string[]> {
    // Implementation similar to CanonicalValidator
    return [];
  }
}
```

## Technical SEO Workflow

### Automated Link Health Check

```typescript
// Run during build or as scheduled task
async function checkLinkHealth() {
  const detector = new BrokenLinkDetector();
  const validator = new CanonicalValidator();
  const analyzer = new RedirectAnalyzer();
  
  // 1. Find broken links
  const brokenLinks = await detector.findBrokenLinks();
  console.log(`Found ${brokenLinks.length} broken links`);
  
  // 2. Validate canonicals
  const canonicalIssues = await validator.validateCanonicals('https://purrify.ca');
  console.log(`Found ${canonicalIssues.length} canonical issues`);
  
  // 3. Analyze redirects
  const redirectChains = await analyzer.analyzeRedirects('https://purrify.ca');
  const problematicChains = redirectChains.filter(c => c.totalHops > 1);
  console.log(`Found ${problematicChains.length} redirect chains`);
  
  // 4. Generate report
  const report = {
    timestamp: new Date().toISOString(),
    brokenLinks,
    canonicalIssues,
    redirectChains: problematicChains
  };
  
  // 5. Fail build if critical issues
  if (brokenLinks.length > 0 || canonicalIssues.length > 0) {
    console.error('Critical SEO issues found!');
    process.exit(1);
  }
  
  return report;
}
```

### Sitemap Cleanup Process

```typescript
async function cleanupSitemap() {
  const detector = new BrokenLinkDetector();
  const validator = new CanonicalValidator();
  
  // 1. Load current sitemap
  const sitemap = await loadSitemap('public/sitemap.xml');
  
  // 2. Validate each URL
  const validUrls: string[] = [];
  const invalidUrls: string[] = [];
  
  for (const url of sitemap.urls) {
    const result = await detector.checkUrl(url);
    
    // Only include 200 OK responses
    if (result.statusCode === 200) {
      // Check if it's the canonical version
      const canonical = await getCanonicalUrl(url);
      if (canonical === url) {
        validUrls.push(url);
      } else {
        invalidUrls.push(url);
        console.log(`Removing non-canonical URL: ${url} (canonical: ${canonical})`);
      }
    } else {
      invalidUrls.push(url);
      console.log(`Removing invalid URL: ${url} (status: ${result.statusCode})`);
    }
  }
  
  // 3. Generate clean sitemap
  await generateSitemap(validUrls);
  
  console.log(`Sitemap cleaned: ${validUrls.length} valid, ${invalidUrls.length} removed`);
}
```

## Data Models

### SEO Audit Report Schema

```json
{
  "timestamp": "2025-11-09T12:00:00.000Z",
  "summary": {
    "totalPages": 267,
    "passed": 245,
    "failed": 22,
    "averageScore": 87
  },
  "criticalIssues": [
    {
      "page": "/products/standard",
      "type": "duplicate-title",
      "message": "Title tag duplicates homepage title",
      "suggestion": "Use unique title: 'Purrify Standard Size - 60g Cat Litter Deodorizer'"
    }
  ],
  "keywordOpportunities": [
    {
      "page": "/blog/cat-litter-smell",
      "keyword": "eliminate cat litter odor",
      "searchVolume": 2400,
      "currentRank": null,
      "difficulty": "low",
      "recommendation": "Add to title and first paragraph"
    }
  ]
}
```

### Technical SEO Health Report Schema

```json
{
  "timestamp": "2025-11-11T12:00:00.000Z",
  "summary": {
    "totalUrls": 267,
    "brokenLinks": 197,
    "canonicalIssues": 48,
    "redirectChains": 15,
    "sitemapIssues": 40,
    "healthScore": 42
  },
  "brokenLinks": [
    {
      "sourceUrl": "/blog/cat-litter-guide",
      "targetUrl": "/products/old-product",
      "statusCode": 404,
      "linkText": "View Product",
      "linkType": "internal",
      "suggestedFix": "/products/standard"
    }
  ],
  "canonicalIssues": [
    {
      "pageUrl": "/products/trial-size",
      "canonicalUrl": "/products/trial",
      "issueType": "points-to-redirect",
      "statusCode": 301,
      "finalUrl": "/products/trial-size",
      "suggestion": "Update canonical to point directly to /products/trial-size"
    }
  ],
  "redirectChains": [
    {
      "startUrl": "/old-page",
      "chain": [
        {
          "url": "/old-page",
          "statusCode": 301,
          "redirectType": "permanent"
        },
        {
          "url": "/temp-page",
          "statusCode": 301,
          "redirectType": "permanent"
        }
      ],
      "finalUrl": "/new-page",
      "totalHops": 2,
      "suggestion": "Update /old-page to redirect directly to /new-page"
    }
  ],
  "sitemapIssues": [
    {
      "url": "/products/discontinued",
      "issue": "returns-404",
      "action": "remove-from-sitemap"
    },
    {
      "url": "/blog/draft-post",
      "issue": "non-canonical",
      "canonicalUrl": "/blog/published-post",
      "action": "replace-with-canonical"
    }
  ]
}
```

## Error Handling

- Graceful fallback if keyword file is missing
- Continue audit even if individual pages fail
- Log errors without blocking build
- Provide partial results with warnings

## Testing Strategy

### Unit Tests
- Keyword density calculation
- Meta tag generation
- Structured data validation
- Sitemap priority calculation

### Integration Tests
- Full site audit
- Keyword suggestion pipeline
- Sitemap generation and submission

## Performance Considerations

- Cache keyword database in memory
- Batch sitemap submissions
- Parallel page audits
- Incremental audits for changed pages only

## Integration Points

### Build Process

```javascript
// scripts/seo-optimization.js
const { SEOAuditEngine } = require('../src/lib/seo/audit-engine');
const { SitemapGenerator } = require('../src/lib/seo/sitemap-generator');

async function runSEOOptimization() {
  // Run audit
  const auditor = new SEOAuditEngine();
  const results = await auditor.auditSite();
  
  // Check for critical issues
  const criticalIssues = results.filter(r => !r.passed);
  if (criticalIssues.length > 0) {
    console.error('SEO audit failed:', criticalIssues);
    process.exit(1);
  }
  
  // Generate sitemap
  const generator = new SitemapGenerator();
  await generator.generateSitemap();
  await generator.submitToSearchEngines('https://purrify.ca/sitemap.xml');
}
```

### Next.js Pages

```typescript
// pages/blog/[slug].tsx
import { KeywordOptimizer } from '@/lib/seo/keyword-optimizer';
import { StructuredDataGenerator } from '@/lib/seo/structured-data';
import { MetaTagGenerator } from '@/lib/seo/meta-tags';

export async function getStaticProps({ params }) {
  const post = await fetchBlogPost(params.slug);
  
  // Get keyword suggestions
  const optimizer = new KeywordOptimizer();
  await optimizer.loadKeywords();
  const keywords = await optimizer.suggestKeywords(post.content, 'blog');
  
  // Generate structured data
  const structuredData = new StructuredDataGenerator();
  const schema = structuredData.generateBlogPosting(post);
  
  // Generate meta tags
  const metaGenerator = new MetaTagGenerator();
  const metaTags = {
    title: metaGenerator.generateTitle(post.content, keywords.map(k => k.keyword.term)),
    description: metaGenerator.generateDescription(post.content, keywords.map(k => k.keyword.term), 160)
  };
  
  return {
    props: {
      post,
      schema,
      metaTags
    }
  };
}
```
