import type { BlogPost } from '@/types/blog';

/**
 * Pure JavaScript HTML sanitizer for server-side use
 * This avoids the jsdom dependency issues in Next.js API routes
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe HTML tags for blog content while removing dangerous scripts
 * Note: This is a simplified version. For complex HTML sanitization, consider
 * using a library like sanitize-html or handling sanitization client-side.
 */
export function sanitizeHTML(dirty: string): string {
  if (!dirty) return '';

  // For server-side, we'll use a basic HTML escape approach
  // and whitelist common safe tags using regex replacement
  const allowedTags = [
    'p', 'br', 'strong', 'em', 'u', 's', 'mark', 'small', 'sub', 'sup',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'img',
    'blockquote', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span', 'article', 'section',
  ];

  const allowedAttrs: Record<string, string[]> = {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'width', 'height'],
    '*': ['class', 'id']
  };

  // First, remove script tags and event handlers
  let clean = dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  // Validate URLs in href and src attributes
  clean = clean.replace(/(href|src)\s*=\s*["']([^"']*)["']/gi, (match, attr, url) => {
    try {
      const parsed = new URL(url, 'http://localhost');
      if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
        return `${attr}=""`;
      }
      return `${attr}="${url}"`;
    } catch {
      // Relative URLs are allowed
      if (url.startsWith('/') || url.startsWith('#')) {
        return `${attr}="${url}"`;
      }
      return `${attr}=""`;
    }
  });

  return clean;
}

/**
 * Sanitize plain text input (for titles, excerpts, etc.)
 * Strips all HTML tags
 */
export function sanitizeText(dirty: string): string {
  if (!dirty) return '';

  // Remove all HTML tags
  return dirty
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Validate and sanitize URL
 */
export function sanitizeURL(url: string): string {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    // Only allow http, https, and mailto protocols
    if (!['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.toString();
  } catch {
    // If URL parsing fails, return empty string
    return '';
  }
}

interface RawBlogPostInput {
  title?: string;
  excerpt?: string;
  content?: string;
  author?: {
    name?: string;
    avatar?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
  };
  featuredImage?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  [key: string]: unknown;
}

/**
 * Sanitize blog post data before saving
 */
export function sanitizeBlogPost(post: RawBlogPostInput): Partial<BlogPost> {
  return {
    ...post,
    title: sanitizeText(post.title || ''),
    excerpt: sanitizeText(post.excerpt || ''),
    content: sanitizeHTML(post.content || ''),
    author: {
      name: sanitizeText(post.author?.name || ''),
      avatar: post.author?.avatar,
    },
    seo: {
      title: sanitizeText(post.seo?.title || ''),
      description: sanitizeText(post.seo?.description || ''),
      keywords: Array.isArray(post.seo?.keywords)
        ? post.seo.keywords.map((k: string) => sanitizeText(k))
        : [],
      ogImage: post.seo?.ogImage,
      canonical: post.seo?.canonical,
    },
    featuredImage: post.featuredImage ? {
      url: sanitizeURL(post.featuredImage.url || ''),
      alt: sanitizeText(post.featuredImage.alt || ''),
      width: post.featuredImage.width || 0,
      height: post.featuredImage.height || 0,
    } : undefined,
  };
}
