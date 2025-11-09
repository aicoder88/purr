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
