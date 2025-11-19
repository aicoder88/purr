import fs from 'fs';
import path from 'path';
import type { BlogPost, Category, Tag } from '@/types/blog';

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
      const filePath = path.join(this.contentDir, locale, `${slug}.json`);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      const post = JSON.parse(content) as BlogPost;

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

  async savePost(post: BlogPost): Promise<void> {
    const localeDir = path.join(this.contentDir, post.locale);
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }
    const filePath = path.join(localeDir, `${post.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
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
