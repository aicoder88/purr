import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost, Category, Tag } from '@/types/blog';

export interface SaveOptions {
  skipValidation?: boolean;
  allowWarnings?: boolean;
}


export interface SaveResult {
  success: boolean;
  validation: { valid: boolean; errors: any[]; warnings: any[] };
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
        console.error(`[SECURITY] Path traversal attempt detected: ${filePath}`);
        return null;
      }

      if (!fs.existsSync(filePath)) {
        return null;
      }

      let post: BlogPost;
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        post = JSON.parse(content) as BlogPost;
      } catch (parseError) {
        console.error(`[ContentStore] Error parsing JSON for ${slug}:`, parseError);
        return null;
      }

      // Basic validation
      if (!post || typeof post !== 'object') {
        console.error(`[ContentStore] Invalid post structure for ${slug}`);
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
    } catch (error) {
      if (error instanceof Error && error.message.includes('path traversal')) {
        console.error(`[SECURITY] Blocked path traversal attempt for slug: ${slug}`);
        return null;
      }
      console.error(`Error reading post ${slug}:`, error);
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
        console.error(`[SECURITY] Path traversal attempt detected in getAllPosts: ${localeDir}`);
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
            console.error(`[getAllPosts] Skipping invalid post in ${file}: missing title or slug`);
            continue;
          }

          if (includeUnpublished) {
            // console.log(`[getAllPosts] Adding ${file} (includeUnpublished)`);
            posts.push(post);
          } else if (post.status === 'published') {
            // console.log(`[getAllPosts] Adding ${file} (status=published)`);
            posts.push(post);
          } else if (post.status === 'scheduled' && post.scheduledDate) {
            const scheduledDate = new Date(post.scheduledDate);
            if (scheduledDate <= now) {
              posts.push(post);
            } else {
              // console.log(`[getAllPosts] Skipping ${file} (future scheduled)`);
            }
          } else {
            // console.log(`[getAllPosts] Skipping ${file} (status=${post.status})`);
          }
        } catch (error) {
          console.error(`Error processing blog post file ${file}:`, error);
          // Continue processing other files
        }
      }



      // Sort by publish date, newest first
      posts.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      return posts;
    } catch (error) {
      if (error instanceof Error && error.message.includes('path traversal')) {
        console.error(`[SECURITY] Blocked path traversal attempt for locale: ${locale} `);
        return [];
      }
      console.error(`Error reading posts for locale ${locale}: `, error);
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

  async savePost(post: BlogPost, options: SaveOptions = {}): Promise<SaveResult> {
    try {
      // Sanitize slug and locale
      const safeSlug = sanitizeSlug(post.slug);
      const safeLocale = sanitizeLocale(post.locale);

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

      fs.writeFileSync(filePath, JSON.stringify(post, null, 2));



      return {
        success: true,
        validation: { valid: true, errors: [], warnings: [] },
        post,
      };
    } catch (error) {
      console.error(`Error saving post ${post.slug}: `, error);
      return {
        success: false,
        validation: {
          valid: false,
          errors: [{ field: 'system', message: `Failed to save post: ${error} ` }],
          warnings: [],
        },
      };
    }
  }

  async validateExistingPost(slug: string, locale: string): Promise<{ valid: boolean; errors: any[]; warnings: any[] }> {
    // Validation disabled for now
    return { valid: true, errors: [], warnings: [] };
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
        console.error(`[SECURITY] Path traversal attempt detected in deletePost: ${filePath} `);
        throw new Error('Path traversal detected');
      }

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Path traversal')) {
        console.error(`[SECURITY] Blocked path traversal attempt in deletePost for slug: ${slug} `);
        throw error;
      }
      console.error(`Error deleting post ${slug}: `, error);
      throw error;
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
    } catch (error) {
      console.error('Error reading categories:', error);
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
    } catch (error) {
      console.error('Error reading tags:', error);
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
