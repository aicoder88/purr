// Blog Post Types

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string; // ISO 8601
  modifiedDate: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  categories: string[];
  tags: string[];
  locale: string;
  translations: {
    [locale: string]: string; // slug in other languages
  };
  seo: SEOMetadata;
  readingTime: number; // minutes
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null;
  translations: {
    [locale: string]: {
      name: string;
      description: string;
    };
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  translations: {
    [locale: string]: string;
  };
}

// Editor Types

export interface Block {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'code';
  content: string;
  attributes?: Record<string, any>;
}

// Image Optimization Types

export interface ImageOptimizationResult {
  original: string;
  optimized: {
    avif: string[];
    webp: string[];
    jpg: string[];
  };
  sizes: number[];
  width: number;
  height: number;
}

// SEO Types

export interface SEOGuidelines {
  titleLength: { min: number; max: number };
  descriptionLength: { min: number; max: number };
  keywordDensity: number;
  headingStructure: string[];
  internalLinks: number;
}

export interface FullSEOMetadata extends SEOMetadata {
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  jsonLd: object;
  hreflang: Array<{ locale: string; url: string }>;
}

// Content Generation Types

export interface ContentGenerationConfig {
  topics: string[];
  tone: string;
  targetWordCount: number;
  includeImages: boolean;
  seoGuidelines: SEOGuidelines;
}

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  categories: string[];
  tags: string[];
  seoKeywords: string[];
}
