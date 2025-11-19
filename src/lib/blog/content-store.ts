import fs from 'fs';
import path from 'path';
import type { BlogPost, Category, Tag } from '@/types/blog';
import { ContentValidator, type ValidationResult } from './content-validator';

export interface SaveOptions {
  skipValidation?: boolean;
  allowWarnings?: boolean;
}

export interface SaveResult {
  success: boolean;
  validation: ValidationResult;
  post?: BlogPost;
}

/**
 * Filesystem-backed content store for blog posts
 * Reads JSON files from /content/blog/{locale}/
 */
export class ContentStore {
  private contentDir: string;
  private validator: ContentValidator;

  constructor() {
    this.contentDir = path.join(process.cwd(), 'content', 'blog');
    this.validator = new ContentValidator();
  }

  async getPost(slug: string, locale: string): Promise<BlogPost | null> {
    try {
      const filePath = path.join(this.contentDir, locale, `${slug}.json`);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      const post = JSON.parse(content) as BlogPost;

      // Validate post before returning
      const validation = this.validator.validatePost(post);
      if (!validation.valid) {
        console.warn(`Post ${slug} has validation errors:`, validation.errors);
        // Still return the post but log the issues
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
      console.error(`Error reading post ${slug}:`, error);
      return null;
    }
  }

  async getAllPosts(locale: string, includeUnpublished = false): Promise<BlogPost[]> {
    try {
      const localeDir = path.join(this.contentDir, locale);
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

          // Validate post
          const validation = this.validator.validatePost(post);
          if (!validation.valid) {
            console.warn(`Skipping invalid post ${file}:`, validation.errors);
            continue; // Skip invalid posts
          }

          if (includeUnpublished) {
            posts.push(post);
          } else if (post.status === 'published') {
            posts.push(post);
          } else if (post.status === 'scheduled' && post.scheduledDate) {
            const scheduledDate = new Date(post.scheduledDate);
            if (scheduledDate <= now) {
              posts.push(post);
            }
          }
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          // Continue processing other files
        }
      }

      // Sort by publish date, newest first
      posts.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      return posts;
    } catch (error) {
      console.error(`Error reading posts for locale ${locale}:`, error);
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
    const { skipValidation = false, allowWarnings = true } = options;

    // Validate post unless explicitly skipped
    let validation: ValidationResult = { valid: true, errors: [], warnings: [] };
    
    if (!skipValidation) {
      validation = this.validator.validatePost(post);
      
      if (!validation.valid) {
        console.error(`Validation failed for post ${post.slug}:`, validation.errors);
        return {
          success: false,
          validation,
        };
      }

      if (!allowWarnings && validation.warnings.length > 0) {
        console.warn(`Post ${post.slug} has warnings:`, validation.warnings);
        return {
          success: false,
          validation,
        };
      }

      // Check for duplicate titles
      try {
        const existingPosts = await this.getAllPosts(post.locale, true);
        const existingTitles = existingPosts
          .filter(p => p.slug !== post.slug) // Exclude current post if updating
          .map(p => p.title);
        
        if (this.validator.checkDuplicate(post.title, existingTitles)) {
          console.error(`Duplicate post detected: ${post.title}`);
          return {
            success: false,
            validation: {
              valid: false,
              errors: [{
                field: 'title',
                message: 'A post with a similar title already exists',
                value: post.title
              }],
              warnings: []
            },
          };
        }
      } catch (error) {
        console.warn('Could not check for duplicates:', error);
        // Continue with save if duplicate check fails
      }

      // Run quality validation
      const qualityValidation = this.validator.validateQuality(post);
      if (qualityValidation.warnings.length > 0) {
        console.warn(`Quality warnings for post ${post.slug}:`, qualityValidation.warnings);
        validation.warnings.push(...qualityValidation.warnings);
      }
    }

    try {
      const localeDir = path.join(this.contentDir, post.locale);
      if (!fs.existsSync(localeDir)) {
        fs.mkdirSync(localeDir, { recursive: true });
      }
      const filePath = path.join(localeDir, `${post.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2));

      console.log(`✅ Successfully saved post: ${post.slug}`);
      
      return {
        success: true,
        validation,
        post,
      };
    } catch (error) {
      console.error(`Error saving post ${post.slug}:`, error);
      return {
        success: false,
        validation: {
          valid: false,
          errors: [{ field: 'system', message: `Failed to save post: ${error}` }],
          warnings: [],
        },
      };
    }
  }

  /**
   * Validate an existing post without saving
   */
  async validateExistingPost(slug: string, locale: string): Promise<ValidationResult> {
    try {
      const post = await this.getPost(slug, locale);
      if (!post) {
        return {
          valid: false,
          errors: [{ field: 'post', message: 'Post not found' }],
          warnings: [],
        };
      }
      return this.validator.validatePost(post);
    } catch (error) {
      return {
        valid: false,
        errors: [{ field: 'system', message: `Error validating post: ${error}` }],
        warnings: [],
      };
    }
  }

  async deletePost(slug: string, locale: string): Promise<void> {
    const filePath = path.join(this.contentDir, locale, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const filePath = path.join(this.contentDir, 'categories.json');
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
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
  }

  async saveTags(tags: Tag[]): Promise<void> {
    const filePath = path.join(this.contentDir, 'tags.json');
    fs.writeFileSync(filePath, JSON.stringify(tags, null, 2));
  }
}
