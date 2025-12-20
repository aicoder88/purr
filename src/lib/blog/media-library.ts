import fs from 'fs/promises';
import path from 'node:path';
import { ContentStore } from './content-store';

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number; // bytes
  uploadDate: string;
  usedIn: string[]; // Array of post slugs
  alt?: string;
}

export class MediaLibrary {
  private optimizedDir = path.join(process.cwd(), 'public', 'optimized', 'blog');
  private metadataPath = path.join(process.cwd(), 'content', 'media-library.json');
  private contentStore: ContentStore;

  constructor() {
    this.contentStore = new ContentStore();
  }

  /**
   * Get all media items
   */
  async getAllMedia(): Promise<MediaItem[]> {
    try {
      // Ensure directory exists
      await fs.mkdir(this.optimizedDir, { recursive: true });

      // Scan directory for images
      const files = await fs.readdir(this.optimizedDir);
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file)
      );

      // Load existing metadata
      const metadata = await this.loadMetadata();

      // Build media items
      const mediaItems: MediaItem[] = [];

      for (const filename of imageFiles) {
        const filePath = path.join(this.optimizedDir, filename);
        const stats = await fs.stat(filePath);
        
        // Check if we have metadata for this file
        let item = metadata.find(m => m.filename === filename);
        
        if (!item) {
          // Create new metadata entry
          item = {
            id: this.generateId(filename),
            filename,
            url: `/optimized/blog/${filename}`,
            thumbnailUrl: `/optimized/blog/${filename}`,
            width: 0,
            height: 0,
            size: stats.size,
            uploadDate: stats.birthtime.toISOString(),
            usedIn: []
          };
        }

        // Update usage information
        item.usedIn = await this.getMediaUsage(filename);

        mediaItems.push(item);
      }

      // Save updated metadata
      await this.saveMetadata(mediaItems);

      return mediaItems.sort((a, b) => 
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
    } catch (error) {
      console.error('Error getting all media:', error);
      return [];
    }
  }

  /**
   * Get posts that use a specific image
   */
  async getMediaUsage(filename: string): Promise<string[]> {
    try {
      const locales = ['en', 'fr', 'zh'];
      const usedIn: string[] = [];

      for (const locale of locales) {
        const posts = await this.contentStore.getAllPosts(locale, true);
        
        for (const post of posts) {
          // Check if image is used in content or as featured image
          const imageUrl = `/optimized/blog/${filename}`;
          
          if (post.content.includes(imageUrl) || 
              post.featuredImage?.url === imageUrl) {
            usedIn.push(post.slug);
          }
        }
      }

      return [...new Set(usedIn)]; // Remove duplicates
    } catch (error) {
      console.error(`Error getting usage for ${filename}:`, error);
      return [];
    }
  }

  /**
   * Delete a media item
   */
  async deleteMedia(id: string): Promise<void> {
    try {
      const media = await this.getAllMedia();
      const item = media.find(m => m.id === id);

      if (!item) {
        throw new Error(`Media item not found: ${id}`);
      }

      // Check if image is in use
      if (item.usedIn.length > 0) {
        throw new Error(
          `Cannot delete image: used in ${item.usedIn.length} post(s)`
        );
      }

      // Delete all variants of the image
      const baseName = item.filename.replace(/-(640|828|1200|1920)w\.(avif|webp|jpg)$/, '');
      const files = await fs.readdir(this.optimizedDir);
      
      for (const file of files) {
        if (file.startsWith(baseName)) {
          await fs.unlink(path.join(this.optimizedDir, file));
        }
      }

      // Update metadata
      const updatedMedia = media.filter(m => m.id !== id);
      await this.saveMetadata(updatedMedia);
    } catch (error) {
      console.error(`Error deleting media ${id}:`, error);
      throw error;
    }
  }

  /**
   * Update media metadata
   */
  async updateMediaMetadata(
    id: string,
    updates: Partial<MediaItem>
  ): Promise<void> {
    try {
      const media = await this.getAllMedia();
      const index = media.findIndex(m => m.id === id);

      if (index === -1) {
        throw new Error(`Media item not found: ${id}`);
      }

      media[index] = { ...media[index], ...updates };
      await this.saveMetadata(media);
    } catch (error) {
      console.error(`Error updating media ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search media by filename
   */
  async searchMedia(query: string): Promise<MediaItem[]> {
    const allMedia = await this.getAllMedia();
    const lowerQuery = query.toLowerCase();

    return allMedia.filter(item =>
      item.filename.toLowerCase().includes(lowerQuery) ||
      item.alt?.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Load metadata from file
   */
  private async loadMetadata(): Promise<MediaItem[]> {
    try {
      const content = await fs.readFile(this.metadataPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      // File doesn't exist yet
      return [];
    }
  }

  /**
   * Save metadata to file
   */
  private async saveMetadata(media: MediaItem[]): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.metadataPath), { recursive: true });
      await fs.writeFile(
        this.metadataPath,
        JSON.stringify(media, null, 2),
        'utf-8'
      );
    } catch (error) {
      console.error('Error saving metadata:', error);
      throw error;
    }
  }

  /**
   * Generate unique ID for media item
   */
  private generateId(filename: string): string {
    return `${Date.now()}-${filename.replace(/[^a-z0-9]/gi, '-')}`;
  }
}
