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
  /* 
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
  */

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
 * Escape HTML special characters to prevent XSS
 * Use this when embedding user input in HTML content (emails, etc.)
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';

  return unsafe
    .replace(/&/g, '&amp;')   // FIRST - encode & before creating other entities
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')  // LAST - decode &amp; after other entities to avoid breaking them
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
  faq?: Array<{ question?: string; answerHtml?: string }>;
  [key: string]: unknown;
}

/**
 * Sanitize FAQ items (question + answerHtml)
 */
function sanitizeFAQItem(item: { question?: string; answerHtml?: string }): { question: string; answerHtml: string } {
  return {
    question: sanitizeText(item.question || ''),
    answerHtml: sanitizeHTML(item.answerHtml || ''),
  };
}

/**
 * Sanitize blog post data before saving
 * Covers content, FAQ answers, and all text fields
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
    faq: Array.isArray(post.faq)
      ? post.faq.map(sanitizeFAQItem)
      : undefined,
  };
}

/**
 * Validate sanitized blog post shape
 * Ensures required fields exist and have valid content
 */
export function validateSanitizedBlogPost(post: Partial<BlogPost>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!post.title || post.title.trim().length === 0) {
    errors.push('Title is required');
  }
  if (!post.slug || post.slug.trim().length === 0) {
    errors.push('Slug is required');
  }
  if (!post.content || post.content.trim().length === 0) {
    errors.push('Content is required');
  }
  if (!post.excerpt || post.excerpt.trim().length === 0) {
    errors.push('Excerpt is required');
  }

  // Validate FAQ structure if present
  if (post.faq !== undefined) {
    if (!Array.isArray(post.faq)) {
      errors.push('FAQ must be an array');
    } else {
      post.faq.forEach((item, index) => {
        if (!item.question || item.question.trim().length === 0) {
          errors.push(`FAQ[${index}]: question is required`);
        }
        if (typeof item.answerHtml !== 'string') {
          errors.push(`FAQ[${index}]: answerHtml must be a string`);
        }
      });
    }
  }

  // Content should not contain dangerous patterns after sanitization
  if (post.content) {
    const dangerousPatterns = [
      /<script\b/i,
      /<iframe\b/i,
      /<object\b/i,
      /<embed\b/i,
      /javascript:/i,
      /on\w+\s*=/i,
    ];
    for (const pattern of dangerousPatterns) {
      if (pattern.test(post.content)) {
        errors.push('Content contains dangerous HTML patterns after sanitization');
        break;
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
