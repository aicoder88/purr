import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe HTML tags for blog content while removing dangerous scripts
 */
export function sanitizeHTML(dirty: string): string {
  if (!dirty) return '';

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      // Text formatting
      'p', 'br', 'strong', 'em', 'u', 's', 'mark', 'small', 'sub', 'sup',
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Lists
      'ul', 'ol', 'li',
      // Links and media
      'a', 'img',
      // Quotes and code
      'blockquote', 'code', 'pre',
      // Tables
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      // Semantic
      'div', 'span', 'article', 'section',
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id',
    ],
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
}

/**
 * Sanitize plain text input (for titles, excerpts, etc.)
 * Strips all HTML tags
 */
export function sanitizeText(dirty: string): string {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
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

/**
 * Sanitize blog post data before saving
 */
export function sanitizeBlogPost(post: any): any {
  return {
    ...post,
    title: sanitizeText(post.title || ''),
    excerpt: sanitizeText(post.excerpt || ''),
    content: sanitizeHTML(post.content || ''),
    author: {
      ...post.author,
      name: sanitizeText(post.author?.name || ''),
    },
    seo: {
      ...post.seo,
      title: sanitizeText(post.seo?.title || ''),
      description: sanitizeText(post.seo?.description || ''),
      keywords: Array.isArray(post.seo?.keywords) 
        ? post.seo.keywords.map((k: string) => sanitizeText(k))
        : [],
    },
    featuredImage: post.featuredImage ? {
      ...post.featuredImage,
      url: sanitizeURL(post.featuredImage.url || ''),
      alt: sanitizeText(post.featuredImage.alt || ''),
    } : undefined,
  };
}
