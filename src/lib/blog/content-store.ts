import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost, Category, Tag } from '@/types/blog';
import { syncPreviewAndHeroImage } from '@/lib/blog/hero-preview-image-sync';
import type { ValidationResult, ValidationError, ValidationWarning } from './content-validator';

export interface SaveOptions {
  skipValidation?: boolean;
  allowWarnings?: boolean;
}


export interface SaveResult {
  success: boolean;
  validation: ValidationResult;
  post?: BlogPost;
}

// Valid slug pattern: lowercase letters, numbers, hyphens only (no underscores for stricter security)
const VALID_SLUG_PATTERN = /^[a-z0-9-]+$/;
const MAX_SLUG_LENGTH = 100;

/**
 * Sanitize and validate a slug to prevent path traversal attacks
 * Removes any characters that are not lowercase letters, numbers, or hyphens
 * @throws Error if slug is invalid after sanitization
 */
function sanitizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug: must be a non-empty string');
  }

  // Trim whitespace and convert to lowercase
  const trimmed = slug.trim().toLowerCase();

  // Check for path traversal attempts before sanitization
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) {
    throw new Error('Invalid slug: path traversal detected');
  }

  // Sanitize: remove any characters that are not lowercase letters, numbers, or hyphens
  // This is a more restrictive sanitization that prevents any special characters
  const sanitized = trimmed.replace(/[^a-z0-9-]/g, '').substring(0, MAX_SLUG_LENGTH);

  // Validate the sanitized result
  if (sanitized.length === 0) {
    throw new Error('Invalid slug: cannot be empty after sanitization');
  }

  // Final validation against allowed pattern
  if (!VALID_SLUG_PATTERN.test(sanitized)) {
    throw new Error('Invalid slug: only lowercase letters, numbers, and hyphens allowed');
  }

  return sanitized;
}

/**
 * Sanitize locale to prevent path traversal
 */
function sanitizeLocale(locale: string): string {
  if (!locale || typeof locale !== 'string') {
    throw new Error('Invalid locale: must be a non-empty string');
  }

  const trimmed = locale.trim().toLowerCase();

  // Only allow 2-5 character locale codes (e.g., 'en', 'fr', 'zh-cn')
  if (!/^[a-z]{2}(-[a-z]{2,3})?$/.test(trimmed)) {
    throw new Error('Invalid locale format');
  }

  // Check for path traversal
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) {
    throw new Error('Invalid locale: path traversal detected');
  }

  return trimmed;
}

/**
 * Filesystem-backed content store for blog posts
 * Reads JSON files from /content/blog/{locale}/
 */
export class ContentStore {
  private contentDir: string;

  constructor() {
    this.contentDir = path.join(process.cwd(), 'content', 'blog');
  }

  async getPost(slug: string, locale: string): Promise<BlogPost | null> {
    try {
      // Sanitize inputs to prevent path traversal
      const safeSlug = sanitizeSlug(slug);
      const safeLocale = sanitizeLocale(locale);

      const filePath = path.join(this.contentDir, safeLocale, `${safeSlug}.json`);

      // Verify the resolved path is within the content directory
      const resolvedPath = path.resolve(filePath);
      const resolvedContentDir = path.resolve(this.contentDir);
      if (!resolvedPath.startsWith(resolvedContentDir)) {
        // Security: Path traversal attempt blocked
        return null;
      }

      if (!fs.existsSync(filePath)) {
        return null;
      }

      let post: BlogPost;
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        post = JSON.parse(content) as BlogPost;
      } catch (_parseError) {
        // Failed to parse JSON file
        return null;
      }

      // Basic validation
      if (!post || typeof post !== 'object') {
        // Invalid post structure
        return null;
      }

      // Only return published posts (or scheduled posts whose date has passed)
      if (post.status === 'published') {
        return post;
      }
      if (post.status === 'scheduled' && post.scheduledDate) {
        const scheduledDate = new Date(post.scheduledDate);
        if (scheduledDate <= new Date()) {
          return post;
        }
      }
      return null;
    } catch (_error) {
      if (_error instanceof Error && _error.message.includes('path traversal')) {
        // Security: Path traversal attempt blocked
        return null;
      }
      // Failed to read post
      return null;
    }
  }

  async getAllPosts(locale: string, includeUnpublished = false): Promise<BlogPost[]> {
    try {
      // Sanitize locale
      const safeLocale = sanitizeLocale(locale);

      const localeDir = path.join(this.contentDir, safeLocale);

      // Verify the resolved path is within the content directory
      const resolvedLocaleDir = path.resolve(localeDir);
      const resolvedContentDir = path.resolve(this.contentDir);
      if (!resolvedLocaleDir.startsWith(resolvedContentDir)) {
        // Security: Path traversal attempt blocked
        return [];
      }

      if (!fs.existsSync(localeDir)) {
        return [];
      }

      const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
      const posts: BlogPost[] = [];
      const now = new Date();

      for (const file of files) {
        try {
          const filePath = path.join(localeDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const post = JSON.parse(content) as BlogPost;

          // Validate required fields
          if (!post.title || !post.slug) {
            // Skipping invalid post: missing title or slug
            continue;
          }

          if (includeUnpublished) {
            // console.log(`[getAllPosts] Adding ${file} (includeUnpublished)`);
            posts.push(post);
          } else if (post.status === 'published') {
            posts.push(post);
          } else if (post.status === 'scheduled' && post.scheduledDate) {
            const scheduledDate = new Date(post.scheduledDate);
            if (scheduledDate <= now) {
              posts.push(post);
            }
          }
        } catch (_error) {
          // Failed to process blog post file
          // Continue processing other files
        }
      }



      // Sort by publish date, newest first
      posts.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      return posts;
    } catch (_error) {
      if (_error instanceof Error && _error.message.includes('path traversal')) {
        // Security: Path traversal attempt blocked
        return [];
      }
      // Failed to read posts for locale
      return [];
    }
  }

  async getPostsByCategory(category: string, locale: string): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts(locale, false);
    return allPosts.filter(post => post.categories.includes(category));
  }

  async getPostsByTag(tag: string, locale: string): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts(locale, false);
    return allPosts.filter(post => post.tags.includes(tag));
  }

  async savePost(post: BlogPost, _options: SaveOptions = {}): Promise<SaveResult> {
    try {
      // Keep the first content image (hero) and preview image in sync.
      const syncResult = syncPreviewAndHeroImage(post);
      const syncedPost = syncResult.post as BlogPost;

      // Sanitize slug and locale
      const safeSlug = sanitizeSlug(syncedPost.slug);
      const safeLocale = sanitizeLocale(syncedPost.locale);

      const localeDir = path.join(this.contentDir, safeLocale);

      // Verify the resolved path is within the content directory
      const resolvedLocaleDir = path.resolve(localeDir);
      const resolvedContentDir = path.resolve(this.contentDir);
      if (!resolvedLocaleDir.startsWith(resolvedContentDir)) {
        throw new Error('Path traversal detected: invalid locale');
      }

      if (!fs.existsSync(localeDir)) {
        fs.mkdirSync(localeDir, { recursive: true });
      }

      const filePath = path.join(localeDir, `${safeSlug}.json`);

      // Verify the final file path is within the content directory
      const resolvedFilePath = path.resolve(filePath);
      if (!resolvedFilePath.startsWith(resolvedContentDir)) {
        throw new Error('Path traversal detected: invalid file path');
      }

      fs.writeFileSync(filePath, JSON.stringify(syncedPost, null, 2));



      return {
        success: true,
        validation: { valid: true, errors: [] as ValidationError[], warnings: [] as ValidationWarning[] },
        post: syncedPost,
      };
    } catch (_error) {
      // Failed to save post
      return {
        success: false,
        validation: {
          valid: false,
          errors: [{ field: 'system', message: `Failed to save post: ${error} ` }] as ValidationError[],
          warnings: [] as ValidationWarning[],
        },
      };
    }
  }

  async validateExistingPost(_slug: string, _locale: string): Promise<ValidationResult> {
    // Validation disabled for now
    return { valid: true, errors: [] as ValidationError[], warnings: [] as ValidationWarning[] };
  }

  async deletePost(slug: string, locale: string): Promise<void> {
    try {
      // Sanitize inputs
      const safeSlug = sanitizeSlug(slug);
      const safeLocale = sanitizeLocale(locale);

      const filePath = path.join(this.contentDir, safeLocale, `${safeSlug}.json`);

      // Verify the resolved path is within the content directory
      const resolvedPath = path.resolve(filePath);
      const resolvedContentDir = path.resolve(this.contentDir);
      if (!resolvedPath.startsWith(resolvedContentDir)) {
        // Security: Path traversal attempt blocked
        throw new Error('Path traversal detected');
      }

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (_error) {
      if (_error instanceof Error && _error.message.includes('Path traversal')) {
        // Security: Path traversal attempt blocked
        throw _error;
      }
      // Failed to delete post
      throw _error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const filePath = path.join(this.contentDir, 'categories.json');

      // Verify the resolved path is within the content directory
      const resolvedPath = path.resolve(filePath);
      const resolvedContentDir = path.resolve(this.contentDir);
      if (!resolvedPath.startsWith(resolvedContentDir)) {
        return [];
      }

      if (!fs.existsSync(filePath)) {
        return [];
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as Category[];
    } catch (_error) {
      // Failed to read categories
      return [];
    }
  }

  async getTags(): Promise<Tag[]> {
    try {
      const filePath = path.join(this.contentDir, 'tags.json');

      // Verify the resolved path is within the content directory
      const resolvedPath = path.resolve(filePath);
      const resolvedContentDir = path.resolve(this.contentDir);
      if (!resolvedPath.startsWith(resolvedContentDir)) {
        return [];
      }

      if (!fs.existsSync(filePath)) {
        return [];
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as Tag[];
    } catch (_error) {
      // Failed to read tags
      return [];
    }
  }

  async saveCategories(categories: Category[]): Promise<void> {
    const filePath = path.join(this.contentDir, 'categories.json');

    // Verify the resolved path is within the content directory
    const resolvedPath = path.resolve(filePath);
    const resolvedContentDir = path.resolve(this.contentDir);
    if (!resolvedPath.startsWith(resolvedContentDir)) {
      throw new Error('Path traversal detected');
    }

    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
  }

  async saveTags(tags: Tag[]): Promise<void> {
    const filePath = path.join(this.contentDir, 'tags.json');

    // Verify the resolved path is within the content directory
    const resolvedPath = path.resolve(filePath);
    const resolvedContentDir = path.resolve(this.contentDir);
    if (!resolvedPath.startsWith(resolvedContentDir)) {
      throw new Error('Path traversal detected');
    }

    fs.writeFileSync(filePath, JSON.stringify(tags, null, 2));
  }
}
