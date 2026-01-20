/**
 * TypeScript types for SEO utilities
 * Provides type safety for all SEO-related data structures
 */

export type LocaleCode = 'en' | 'fr' | 'zh' | 'es';

export type PageType = 'homepage' | 'product' | 'blog' | 'learn' | 'location' | 'other';

export type SitemapChangefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

/**
 * Comprehensive SEO metadata for a page
 */
export interface PageSEOMetadata {
  path: string;
  locale: LocaleCode;

  // Meta tags
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  keywords: string[];
  targetKeyword?: string;

  // Canonical & alternates
  canonicalUrl: string;
  languageAlternates: LanguageAlternate[];

  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: OGImage;
  ogType: 'website' | 'article' | 'product';
  ogLocale: string;

  // Twitter
  twitterCard: 'summary' | 'summary_large_image';
  twitterSite: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Structured data
  schemas: Array<{
    type: string;
    data: object;
  }>;

  // Internal linking
  internalLinks: Array<{
    targetPath: string;
    anchorText: string;
  }>;

  // Validation status
  validation: {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    lastValidated: string;
  };
}

/**
 * Open Graph image metadata
 */
export interface OGImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
}

/**
 * Language alternate metadata
 */
export interface LanguageAlternate {
  locale: LocaleCode;
  hrefLang: string;
  href: string;
}

/**
 * Sitemap entry
 */
export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: SitemapChangefreq;
  priority: number;

  // Internationalization
  alternates: Array<{
    hrefLang: string;
    href: string;
  }>;

  // Metadata for management
  pageType: PageType;
  isIndexable: boolean;
  hasNoindex: boolean;
  statusCode?: number;
}

/**
 * Link graph node representing a page and its connections
 */
export interface LinkGraphNode {
  path: string;
  incomingLinks: Array<{
    fromPath: string;
    anchorText: string;
  }>;
  outgoingLinks: Array<{
    toPath: string;
    anchorText: string;
  }>;

  // Metrics
  authorityScore: number; // PageRank-style score
  incomingLinkCount: number;
  outgoingLinkCount: number;

  // Flags
  isOrphan: boolean; // 0 incoming links
  isWeak: boolean; // 1 incoming link
  isDeadEnd: boolean; // 0 outgoing links
}

/**
 * Validation error
 */
export interface ValidationError {
  page?: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'meta' | 'schema' | 'links' | 'images' | 'sitemap';
  field: string;
  message: string;
  fix?: string;
}

/**
 * Validation warning (non-blocking)
 */
export interface ValidationWarning extends ValidationError {
  severity: 'warning';
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * Optimized meta title result
 */
export interface OptimizedMetaTitle {
  title: string;
  isTruncated: boolean;
  length: number;
  warnings: string[];
}

/**
 * Optimized meta description result
 */
export interface OptimizedMetaDescription {
  description: string;
  isTruncated: boolean;
  length: number;
  warnings: string[];
}

/**
 * Meta content validation result
 */
export interface MetaContentValidation {
  isValid: boolean;
  score: number; // 0-100
  suggestions: string[];
}

/**
 * Scanned page information
 */
export interface ScannedPage {
  filePath: string;
  routePath: string;
  pageType: 'static' | 'dynamic' | 'catch-all';
  isIndexable: boolean;
  reason?: string; // If not indexable
}

/**
 * Dynamic route information
 */
export interface DynamicRoute {
  pattern: string;
  routes: string[];
}

/**
 * Sitemap generation stats
 */
export interface SitemapStats {
  totalPages: number;
  indexablePages: number;
  excludedPages: number;
  blogPosts: number;
  productPages: number;
  learnPages: number;
  locationPages: number;
}

/**
 * Sitemap validation issue
 */
export interface SitemapIssue {
  url: string;
  issue: 'redirect' | '404' | 'noindex' | 'non-canonical' | 'slow' | 'hreflang-broken';
  details: string;
}

/**
 * Link suggestion
 */
export interface LinkSuggestion {
  targetPage: string;
  anchorText: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  relevanceScore: number;
}

/**
 * SEO health stats
 */
export interface SEOHealthStats {
  overallScore: number; // 0-100
  metaCompliance: number; // Percentage
  richResultsEligible: number; // Percentage
  schemaErrors: number;
  orphanPages: number;
  pagesWithIssues: number;
  recentIssues: ValidationError[];
}
