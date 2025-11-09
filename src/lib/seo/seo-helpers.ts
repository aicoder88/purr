/**
 * SEO Helper Functions
 * 
 * Utilities for extracting and formatting data for SEO components
 */

import type { ProductData, BlogPostData, OrganizationData } from './structured-data-generator';

/**
 * Create product structured data from product information
 */
export function createProductData(config: {
  name: string;
  description: string;
  images: string[];
  price: number;
  currency?: string;
  inStock?: boolean;
  url: string;
  sku?: string;
  brand?: string;
  rating?: {
    value: number;
    count: number;
  };
}): ProductData {
  return {
    name: config.name,
    description: config.description,
    images: config.images,
    price: config.price,
    currency: config.currency || 'CAD',
    inStock: config.inStock !== false,
    url: config.url,
    sku: config.sku,
    brand: config.brand || 'Purrify',
    rating: config.rating,
  };
}

/**
 * Create blog post structured data from post information
 */
export function createBlogPostData(config: {
  title: string;
  excerpt: string;
  featuredImage: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  authorImage?: string;
  url: string;
  categories?: string[];
  tags?: string[];
  wordCount?: number;
}): BlogPostData {
  return {
    title: config.title,
    excerpt: config.excerpt,
    featuredImage: config.featuredImage,
    publishDate: config.publishDate,
    modifiedDate: config.modifiedDate,
    author: config.author,
    authorImage: config.authorImage,
    url: config.url,
    categories: config.categories,
    tags: config.tags,
    wordCount: config.wordCount,
  };
}

/**
 * Create organization structured data
 */
export function createOrganizationData(config: {
  name: string;
  url: string;
  logo: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialProfiles?: string[];
  foundingDate?: string;
}): OrganizationData {
  return config;
}

/**
 * Extract word count from content
 */
export function getWordCount(content: string): number {
  return content.split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Format date to ISO 8601
 */
export function formatDateISO(date: Date | string): string {
  if (typeof date === 'string') {
    return new Date(date).toISOString();
  }
  return date.toISOString();
}

/**
 * Get full URL from path
 */
export function getFullUrl(path: string, baseUrl: string = 'https://purrify.ca'): string {
  if (path.startsWith('http')) {
    return path;
  }
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Extract reading time from content (words per minute)
 */
export function getReadingTime(content: string, wordsPerMinute: number = 200): number {
  const wordCount = getWordCount(content);
  return Math.ceil(wordCount / wordsPerMinute);
}
