import fs from 'fs/promises';
import path from 'path';
import type { BlogPost, Category, Tag } from '@/types/blog';

export class ContentStore {
  private contentDir = path.join(process.cwd(), 'content', 'blog');
  private categoriesPath = path.join(process.cwd(), 'content', 'categories.json');
  private tagsPath = path.join(process.cwd(), 'content', 'tags.json');

  /**
   * Get a single blog post by slug and locale
   */
  async getPost(slug: string, locale: string): Promise<BlogPost | null> {
    try {
      const filePath = path.join(this.contentDir, locale, `${slug}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      const post = JSON.parse(content) as BlogPost;

      // Filter out unpublished posts in production
      if (post.status !== 'published' && process.env.NODE_ENV === 'production') {
        // Check if scheduled post should be published
        if (post.status === 'scheduled' && post.scheduledDate) {
          if (new Date(post.scheduledDate) <= new Date()) {
            post.status = 'published';
            await this.savePost(post);
            return post;
          }
        }
        return null;
      }

      return post;
    } catch (error) {
      console.error(`Error reading post ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get all blog posts for a locale
   */
  async getAllPosts(locale: string, includeUnpublished = false): Promise<BlogPost[]> {
    try {
      const dirPath = path.join(this.contentDir, locale);
      
      // Create directory if it doesn't exist
      try {
        await fs.access(dirPath);
      } catch {
        await fs.mkdir(dirPath, { recursive: true });
        return [];
      }

      const files = await fs.readdir(dirPath);

      const posts = await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(async file => {
            const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
            return JSON.parse(content) as BlogPost;
          })
      );

      // Filter and sort
      const filteredPosts = posts.filter(post => {
        if (includeUnpublished) return true;
        if (post.status === 'published') return true;
        if (post.status === 'scheduled' && post.scheduledDate) {
          return new Date(post.scheduledDate) <= new Date();
        }
        return false;
      });

      return filteredPosts.sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    } catch (error) {
      console.error(`Error reading posts for locale ${locale}:`, error);
      return [];
    }
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string, locale: string): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts(locale);
    return allPosts.filter(post => post.categories.includes(category));
  }

  /**
   * Get posts by tag
   */
  async getPostsByTag(tag: string, locale: string): Promise<BlogPost[]> {
    const allPosts = await this.getAllPosts(locale);
    return allPosts.filter(post => post.tags.includes(tag));
  }

  /**
   * Save a blog post
   */
  async savePost(post: BlogPost): Promise<void> {
    try {
      const filePath = path.join(this.contentDir, post.locale, `${post.slug}.json`);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(post, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error saving post ${post.slug}:`, error);
      throw error;
    }
  }

  /**
   * Delete a blog post
   */
  async deletePost(slug: string, locale: string): Promise<void> {
    try {
      const filePath = path.join(this.contentDir, locale, `${slug}.json`);
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting post ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      const content = await fs.readFile(this.categoriesPath, 'utf-8');
      return JSON.parse(content) as Category[];
    } catch (error) {
      console.error('Error reading categories:', error);
      return [];
    }
  }

  /**
   * Get all tags
   */
  async getTags(): Promise<Tag[]> {
    try {
      const content = await fs.readFile(this.tagsPath, 'utf-8');
      return JSON.parse(content) as Tag[];
    } catch (error) {
      console.error('Error reading tags:', error);
      return [];
    }
  }

  /**
   * Save categories
   */
  async saveCategories(categories: Category[]): Promise<void> {
    try {
      await fs.writeFile(this.categoriesPath, JSON.stringify(categories, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving categories:', error);
      throw error;
    }
  }

  /**
   * Save tags
   */
  async saveTags(tags: Tag[]): Promise<void> {
    try {
      await fs.writeFile(this.tagsPath, JSON.stringify(tags, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving tags:', error);
      throw error;
    }
  }
}
