import fs from 'fs/promises';
import path from 'node:path';
import { ContentStore } from './content-store';
import type { Category, Tag } from '@/types/blog';

export interface CategoryWithStats extends Category {
  postCount: number;
  lastUsed: string | null;
}

export interface TagWithStats extends Tag {
  postCount: number;
  lastUsed: string | null;
  relatedTags: string[];
}

export class CategoryManager {
  private contentStore: ContentStore;
  private categoriesPath = path.join(process.cwd(), 'content', 'categories.json');
  private tagsPath = path.join(process.cwd(), 'content', 'tags.json');

  constructor() {
    this.contentStore = new ContentStore();
  }

  /**
   * Get categories with usage statistics
   */
  async getCategoriesWithStats(): Promise<CategoryWithStats[]> {
    const categories = await this.contentStore.getCategories();
    const locales = ['en', 'fr', 'zh'];
    
    const categoriesWithStats: CategoryWithStats[] = [];

    for (const category of categories) {
      let postCount = 0;
      let lastUsed: string | null = null;

      for (const locale of locales) {
        const posts = await this.contentStore.getAllPosts(locale, true);
        const categoryPosts = posts.filter(p => p.categories.includes(category.id));
        
        postCount += categoryPosts.length;

        if (categoryPosts.length > 0) {
          const latestPost = categoryPosts.sort((a, b) => 
            new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
          )[0];
          
          if (!lastUsed || new Date(latestPost.modifiedDate) > new Date(lastUsed)) {
            lastUsed = latestPost.modifiedDate;
          }
        }
      }

      categoriesWithStats.push({
        ...category,
        postCount,
        lastUsed
      });
    }

    return categoriesWithStats;
  }

  /**
   * Get tags with usage statistics
   */
  async getTagsWithStats(): Promise<TagWithStats[]> {
    const tags = await this.contentStore.getTags();
    const locales = ['en', 'fr', 'zh'];
    
    const tagsWithStats: TagWithStats[] = [];

    for (const tag of tags) {
      let postCount = 0;
      let lastUsed: string | null = null;
      const relatedTagsMap = new Map<string, number>();

      for (const locale of locales) {
        const posts = await this.contentStore.getAllPosts(locale, true);
        const tagPosts = posts.filter(p => p.tags.includes(tag.id));
        
        postCount += tagPosts.length;

        if (tagPosts.length > 0) {
          const latestPost = tagPosts.sort((a, b) => 
            new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
          )[0];
          
          if (!lastUsed || new Date(latestPost.modifiedDate) > new Date(lastUsed)) {
            lastUsed = latestPost.modifiedDate;
          }

          // Find related tags (tags that appear together)
          for (const post of tagPosts) {
            for (const otherTag of post.tags) {
              if (otherTag !== tag.id) {
                relatedTagsMap.set(otherTag, (relatedTagsMap.get(otherTag) || 0) + 1);
              }
            }
          }
        }
      }

      // Get top 5 related tags
      const relatedTags = Array.from(relatedTagsMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tagId]) => tagId);

      tagsWithStats.push({
        ...tag,
        postCount,
        lastUsed,
        relatedTags
      });
    }

    return tagsWithStats;
  }

  /**
   * Create a new category
   */
  async createCategory(category: Category): Promise<void> {
    const categories = await this.contentStore.getCategories();
    
    // Check for duplicate slug
    if (categories.some(c => c.slug === category.slug)) {
      throw new Error(`Category with slug "${category.slug}" already exists`);
    }

    categories.push(category);
    await this.saveCategories(categories);
  }

  /**
   * Update a category
   */
  async updateCategory(id: string, updates: Partial<Category>): Promise<void> {
    const categories = await this.contentStore.getCategories();
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) {
      throw new Error(`Category not found: ${id}`);
    }

    categories[index] = { ...categories[index], ...updates };
    await this.saveCategories(categories);
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string, reassignTo?: string): Promise<void> {
    const categories = await this.contentStore.getCategories();
    const category = categories.find(c => c.id === id);

    if (!category) {
      throw new Error(`Category not found: ${id}`);
    }

    // Check if category is in use
    const stats = await this.getCategoriesWithStats();
    const categoryStats = stats.find(c => c.id === id);

    if (categoryStats && categoryStats.postCount > 0) {
      if (!reassignTo) {
        throw new Error(`Cannot delete category "${category.name}": used in ${categoryStats.postCount} post(s). Provide reassignTo parameter.`);
      }

      // Reassign posts to new category
      const locales = ['en', 'fr', 'zh'];
      for (const locale of locales) {
        const posts = await this.contentStore.getAllPosts(locale, true);
        
        for (const post of posts) {
          if (post.categories.includes(id)) {
            post.categories = post.categories.filter(c => c !== id);
            if (!post.categories.includes(reassignTo)) {
              post.categories.push(reassignTo);
            }
            await this.contentStore.savePost(post);
          }
        }
      }
    }

    // Remove category
    const updatedCategories = categories.filter(c => c.id !== id);
    await this.saveCategories(updatedCategories);
  }

  /**
   * Create a new tag
   */
  async createTag(tag: Tag): Promise<void> {
    const tags = await this.contentStore.getTags();
    
    // Check for duplicate slug
    if (tags.some(t => t.slug === tag.slug)) {
      throw new Error(`Tag with slug "${tag.slug}" already exists`);
    }

    tags.push(tag);
    await this.saveTags(tags);
  }

  /**
   * Update a tag
   */
  async updateTag(id: string, updates: Partial<Tag>): Promise<void> {
    const tags = await this.contentStore.getTags();
    const index = tags.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error(`Tag not found: ${id}`);
    }

    tags[index] = { ...tags[index], ...updates };
    await this.saveTags(tags);
  }

  /**
   * Delete a tag
   */
  async deleteTag(id: string): Promise<void> {
    const tags = await this.contentStore.getTags();
    const tag = tags.find(t => t.id === id);

    if (!tag) {
      throw new Error(`Tag not found: ${id}`);
    }

    // Remove tag from all posts
    const locales = ['en', 'fr', 'zh'];
    for (const locale of locales) {
      const posts = await this.contentStore.getAllPosts(locale, true);
      
      for (const post of posts) {
        if (post.tags.includes(id)) {
          post.tags = post.tags.filter(t => t !== id);
          await this.contentStore.savePost(post);
        }
      }
    }

    // Remove tag
    const updatedTags = tags.filter(t => t.id !== id);
    await this.saveTags(updatedTags);
  }

  /**
   * Merge multiple tags into one
   */
  async mergeTags(sourceIds: string[], targetId: string): Promise<void> {
    const tags = await this.contentStore.getTags();
    const target = tags.find(t => t.id === targetId);

    if (!target) {
      throw new Error(`Target tag not found: ${targetId}`);
    }

    // Update all posts using source tags
    const locales = ['en', 'fr', 'zh'];
    for (const locale of locales) {
      const posts = await this.contentStore.getAllPosts(locale, true);
      
      for (const post of posts) {
        const hasSourceTag = post.tags.some(t => sourceIds.includes(t));
        
        if (hasSourceTag) {
          // Remove source tags and add target tag
          post.tags = post.tags.filter(t => !sourceIds.includes(t));
          if (!post.tags.includes(targetId)) {
            post.tags.push(targetId);
          }
          await this.contentStore.savePost(post);
        }
      }
    }

    // Remove source tags
    const updatedTags = tags.filter(t => !sourceIds.includes(t.id));
    await this.saveTags(updatedTags);
  }

  /**
   * Find similar tags (for duplicate detection)
   */
  async findSimilarTags(tagName: string): Promise<Tag[]> {
    const tags = await this.contentStore.getTags();
    const normalized = tagName.toLowerCase().trim();

    return tags.filter(tag => {
      const tagNormalized = tag.name.toLowerCase().trim();
      
      // Exact match
      if (tagNormalized === normalized) return true;
      
      // Very similar (Levenshtein distance <= 2)
      const distance = this.levenshteinDistance(tagNormalized, normalized);
      return distance <= 2;
    });
  }

  /**
   * Get unused categories and tags
   */
  async getUnusedTaxonomy(): Promise<{ categories: string[]; tags: string[] }> {
    const categoryStats = await this.getCategoriesWithStats();
    const tagStats = await this.getTagsWithStats();

    return {
      categories: categoryStats.filter(c => c.postCount === 0).map(c => c.id),
      tags: tagStats.filter(t => t.postCount === 0).map(t => t.id)
    };
  }

  /**
   * Save categories to file
   */
  private async saveCategories(categories: Category[]): Promise<void> {
    await fs.writeFile(
      this.categoriesPath,
      JSON.stringify(categories, null, 2),
      'utf-8'
    );
  }

  /**
   * Save tags to file
   */
  private async saveTags(tags: Tag[]): Promise<void> {
    await fs.writeFile(
      this.tagsPath,
      JSON.stringify(tags, null, 2),
      'utf-8'
    );
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}
