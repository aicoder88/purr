import prisma from '@/lib/prisma';
import type { BlogPost, Category, Tag } from '@/types/blog';

/**
 * Database-backed content store for Vercel deployment
 * Replaces file-based storage with PostgreSQL
 */
export class ContentStore {
  /**
   * Get a single blog post by slug and locale
   */
  async getPost(slug: string, locale: string): Promise<BlogPost | null> {
    try {
      const post = await prisma.blogPost.findFirst({
        where: { slug, locale }
      });

      if (!post) return null;

      // Filter out unpublished posts in production
      if (post.status !== 'PUBLISHED' && process.env.NODE_ENV === 'production') {
        // Check if scheduled post should be published
        if (post.status === 'SCHEDULED' && post.scheduledFor) {
          if (new Date(post.scheduledFor) <= new Date()) {
            const updated = await prisma.blogPost.update({
              where: { id: post.id },
              data: { 
                status: 'PUBLISHED',
                publishedAt: new Date()
              }
            });
            return this.mapToPost(updated);
          }
        }
        return null;
      }

      return this.mapToPost(post);
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
      const where: any = { locale };

      if (!includeUnpublished) {
        where.OR = [
          { status: 'PUBLISHED' },
          {
            status: 'SCHEDULED',
            scheduledFor: { lte: new Date() }
          }
        ];
      }

      const posts = await prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' }
      });

      return posts.map(post => this.mapToPost(post));
    } catch (error) {
      console.error(`Error reading posts for locale ${locale}:`, error);
      return [];
    }
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string, locale: string): Promise<BlogPost[]> {
    try {
      const posts = await prisma.blogPost.findMany({
        where: {
          locale,
          status: 'PUBLISHED'
        },
        orderBy: { publishedAt: 'desc' }
      });

      return posts.map(post => this.mapToPost(post));
    } catch (error) {
      console.error(`Error reading posts by category:`, error);
      return [];
    }
  }

  /**
   * Get posts by tag
   */
  async getPostsByTag(tag: string, locale: string): Promise<BlogPost[]> {
    try {
      const posts = await prisma.blogPost.findMany({
        where: {
          locale,
          keywords: { has: tag },
          status: 'PUBLISHED'
        },
        orderBy: { publishedAt: 'desc' }
      });

      return posts.map(post => this.mapToPost(post));
    } catch (error) {
      console.error(`Error reading posts by tag:`, error);
      return [];
    }
  }

  /**
   * Save a blog post
   */
  async savePost(post: BlogPost): Promise<void> {
    try {
      const data = {
        slug: post.slug,
        locale: post.locale || 'en',
        title: post.title,
        author: post.author || 'Purrify Research Lab',
        excerpt: post.excerpt || '',
        content: post.content,
        heroImageUrl: post.featuredImage || '',
        heroImageAlt: post.title,
        keywords: post.tags || [],
        metaDescription: post.seoDescription || post.excerpt || null,
        wordCount: Math.ceil((post.content?.length || 0) / 5), // Rough estimate
        status: post.status.toUpperCase() as any,
        scheduledFor: post.scheduledDate ? new Date(post.scheduledDate) : null,
        publishedAt: post.status === 'published' ? new Date(post.publishDate) : null
      };

      await prisma.blogPost.upsert({
        where: {
          slug: post.slug
        },
        update: data,
        create: data
      });
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
      await prisma.blogPost.deleteMany({
        where: { slug, locale }
      });
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
      const categories = await prisma.blogCategory.findMany({
        orderBy: { name: 'asc' }
      });

      return categories.map(cat => ({
        slug: cat.slug,
        name: cat.name,
        description: cat.description || undefined
      }));
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
      const tags = await prisma.blogTag.findMany({
        orderBy: { name: 'asc' }
      });

      return tags.map(tag => ({
        slug: tag.slug,
        name: tag.name
      }));
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
      // Delete all and recreate (simple approach)
      await prisma.blogCategory.deleteMany({});
      
      await prisma.blogCategory.createMany({
        data: categories.map(cat => ({
          slug: cat.slug,
          name: cat.name,
          description: cat.description || null
        }))
      });
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
      // Delete all and recreate (simple approach)
      await prisma.blogTag.deleteMany({});
      
      await prisma.blogTag.createMany({
        data: tags.map(tag => ({
          slug: tag.slug,
          name: tag.name
        }))
      });
    } catch (error) {
      console.error('Error saving tags:', error);
      throw error;
    }
  }

  /**
   * Map database model to BlogPost type
   */
  private mapToPost(dbPost: any): BlogPost {
    return {
      slug: dbPost.slug,
      locale: dbPost.locale || 'en',
      title: dbPost.title,
      excerpt: dbPost.excerpt || undefined,
      content: dbPost.content,
      featuredImage: dbPost.heroImageUrl || undefined,
      author: dbPost.author || 'Purrify Research Lab',
      publishDate: (dbPost.publishedAt || dbPost.createdAt).toISOString(),
      modifiedDate: dbPost.updatedAt.toISOString(),
      status: dbPost.status.toLowerCase(),
      scheduledDate: dbPost.scheduledFor?.toISOString(),
      categories: [], // Not in current schema
      tags: dbPost.keywords || [],
      seoTitle: dbPost.title,
      seoDescription: dbPost.metaDescription || undefined,
      seoKeywords: dbPost.keywords || [],
      readingTime: Math.ceil(dbPost.wordCount / 200) || undefined,
      viewCount: 0 // Not tracked yet
    };
  }
}
