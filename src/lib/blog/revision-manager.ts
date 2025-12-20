import fs from 'fs/promises';
import path from 'node:path';
import type { BlogPost } from '@/types/blog';

export interface Revision {
  id: string;
  postSlug: string;
  version: number;
  content: BlogPost;
  author: string;
  timestamp: string;
  changesSummary: string;
}

export interface RevisionHistory {
  postSlug: string;
  revisions: Revision[];
  currentVersion: number;
}

export class RevisionManager {
  private revisionsDir = path.join(process.cwd(), 'content', 'revisions');

  /**
   * Create a new revision
   */
  async createRevision(
    post: BlogPost,
    author: string,
    changesSummary?: string
  ): Promise<Revision> {
    try {
      const history = await this.getRevisionHistory(post.slug);
      const version = history.currentVersion + 1;

      const revision: Revision = {
        id: `${post.slug}-v${version}`,
        postSlug: post.slug,
        version,
        content: post,
        author,
        timestamp: new Date().toISOString(),
        changesSummary: changesSummary || 'Post updated'
      };

      // Save revision
      const revisionPath = path.join(
        this.revisionsDir,
        post.slug,
        `v${version}.json`
      );
      await fs.mkdir(path.dirname(revisionPath), { recursive: true });
      await fs.writeFile(revisionPath, JSON.stringify(revision, null, 2), 'utf-8');

      // Update history metadata
      history.revisions.push(revision);
      history.currentVersion = version;
      await this.saveHistory(history);

      return revision;
    } catch (error) {
      console.error('Error creating revision:', error);
      throw error;
    }
  }

  /**
   * Get revision history for a post
   */
  async getRevisionHistory(slug: string): Promise<RevisionHistory> {
    try {
      const historyPath = path.join(this.revisionsDir, slug, 'history.json');
      
      try {
        const content = await fs.readFile(historyPath, 'utf-8');
        return JSON.parse(content);
      } catch {
        // No history exists yet, create new
        return {
          postSlug: slug,
          revisions: [],
          currentVersion: 0
        };
      }
    } catch (error) {
      console.error('Error getting revision history:', error);
      throw error;
    }
  }

  /**
   * Get a specific revision
   */
  async getRevision(slug: string, version: number): Promise<Revision | null> {
    try {
      const revisionPath = path.join(
        this.revisionsDir,
        slug,
        `v${version}.json`
      );
      const content = await fs.readFile(revisionPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error getting revision v${version}:`, error);
      return null;
    }
  }

  /**
   * Compare two revisions
   */
  async compareRevisions(
    slug: string,
    version1: number,
    version2: number
  ): Promise<{
    revision1: Revision;
    revision2: Revision;
    changes: {
      title: boolean;
      content: boolean;
      excerpt: boolean;
      categories: boolean;
      tags: boolean;
      featuredImage: boolean;
    };
  } | null> {
    try {
      const rev1 = await this.getRevision(slug, version1);
      const rev2 = await this.getRevision(slug, version2);

      if (!rev1 || !rev2) {
        return null;
      }

      return {
        revision1: rev1,
        revision2: rev2,
        changes: {
          title: rev1.content.title !== rev2.content.title,
          content: rev1.content.content !== rev2.content.content,
          excerpt: rev1.content.excerpt !== rev2.content.excerpt,
          categories: JSON.stringify(rev1.content.categories) !== JSON.stringify(rev2.content.categories),
          tags: JSON.stringify(rev1.content.tags) !== JSON.stringify(rev2.content.tags),
          featuredImage: rev1.content.featuredImage?.url !== rev2.content.featuredImage?.url
        }
      };
    } catch (error) {
      console.error('Error comparing revisions:', error);
      return null;
    }
  }

  /**
   * Restore a previous revision
   */
  async restoreRevision(slug: string, version: number): Promise<BlogPost | null> {
    try {
      const revision = await this.getRevision(slug, version);
      
      if (!revision) {
        throw new Error(`Revision v${version} not found`);
      }

      // Return the post content from the revision
      // The caller should save this as a new revision
      return revision.content;
    } catch (error) {
      console.error('Error restoring revision:', error);
      throw error;
    }
  }

  /**
   * Clean up old revisions (keep last 90 days)
   */
  async cleanupOldRevisions(daysToKeep: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      let deletedCount = 0;

      const slugs = await fs.readdir(this.revisionsDir);

      for (const slug of slugs) {
        const history = await this.getRevisionHistory(slug);
        const revisionsToKeep: Revision[] = [];

        for (const revision of history.revisions) {
          const revisionDate = new Date(revision.timestamp);
          
          if (revisionDate >= cutoffDate) {
            revisionsToKeep.push(revision);
          } else {
            // Delete old revision file
            const revisionPath = path.join(
              this.revisionsDir,
              slug,
              `v${revision.version}.json`
            );
            try {
              await fs.unlink(revisionPath);
              deletedCount++;
            } catch (error) {
              console.error(`Failed to delete revision ${revision.id}:`, error);
            }
          }
        }

        // Update history
        history.revisions = revisionsToKeep;
        await this.saveHistory(history);
      }

      return deletedCount;
    } catch (error) {
      console.error('Error cleaning up revisions:', error);
      return 0;
    }
  }

  /**
   * Save revision history metadata
   */
  private async saveHistory(history: RevisionHistory): Promise<void> {
    const historyPath = path.join(
      this.revisionsDir,
      history.postSlug,
      'history.json'
    );
    await fs.mkdir(path.dirname(historyPath), { recursive: true });
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2), 'utf-8');
  }
}
