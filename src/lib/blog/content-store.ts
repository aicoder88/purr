// Stubbed for security testing - Prisma models not yet created
import type { BlogPost, Category, Tag } from '@/types/blog';

/**
 * Database-backed content store for Vercel deployment
 * NOTE: Temporarily stubbed for security testing
 */
export class ContentStore {
  async getPost(slug: string, locale: string): Promise<BlogPost | null> {
    return null;
  }

  async getAllPosts(locale: string, includeUnpublished = false): Promise<BlogPost[]> {
    return [];
  }

  async getPostsByCategory(category: string, locale: string): Promise<BlogPost[]> {
    return [];
  }

  async getPostsByTag(tag: string, locale: string): Promise<BlogPost[]> {
    return [];
  }

  async savePost(post: BlogPost): Promise<void> {
    // Stubbed
  }

  async deletePost(slug: string, locale: string): Promise<void> {
    // Stubbed
  }

  async getCategories(): Promise<Category[]> {
    return [];
  }

  async getTags(): Promise<Tag[]> {
    return [];
  }

  async saveCategories(categories: Category[]): Promise<void> {
    // Stubbed
  }

  async saveTags(tags: Tag[]): Promise<void> {
    // Stubbed
  }
}
