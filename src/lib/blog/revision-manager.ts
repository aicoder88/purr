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
 * Validate version number
 */
function validateVersion(version: number): void {
  if (!Number.isInteger(version) || version < 1) {
    throw new Error('Invalid version: must be a positive integer');
  }
}

/**
 * Sanitize author string
 */
function sanitizeAuthor(author: string): string {
  if (!author || typeof author !== 'string') {
    throw new Error('Invalid author: must be a non-empty string');
  }
  
  const trimmed = author.trim();
  
  if (trimmed.length === 0 || trimmed.length > 100) {
    throw new Error('Invalid author: length must be between 1 and 100 characters');
  }

  // Check for path traversal attempts
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) {
    throw new Error('Invalid author: contains invalid characters');
  }

  return trimmed;
}

export class RevisionManager {
  private revisionsDir = path.join(process.cwd(), 'content', 'revisions');

  /**
   * Verify a resolved path is within the revisions directory
   */
  private verifySafePath(resolvedPath: string): void {
    const resolvedRevisionsDir = path.resolve(this.revisionsDir);
    if (!resolvedPath.startsWith(resolvedRevisionsDir)) {
      throw new Error('Path traversal detected: path is outside revisions directory');
    }
  }

  /**
   * Create a new revision
   */
  async createRevision(
    post: BlogPost,
    author: string,
    changesSummary?: string
  ): Promise<Revision> {
    try {
      // Sanitize inputs
      const safeSlug = sanitizeSlug(post.slug);
      const safeAuthor = sanitizeAuthor(author);

      const history = await this.getRevisionHistory(safeSlug);
      const version = history.currentVersion + 1;

      validateVersion(version);

      const revision: Revision = {
        id: `${safeSlug}-v${version}`,
        postSlug: safeSlug,
        version,
        content: post,
        author: safeAuthor,
        timestamp: new Date().toISOString(),
        changesSummary: changesSummary ? sanitizeSlug(changesSummary) : 'Post updated'
      };

      // Save revision
      const revisionPath = path.join(
        this.revisionsDir,
        safeSlug,
        `v${version}.json`
      );
      
      // Verify the resolved path is safe
      const resolvedRevisionPath = path.resolve(revisionPath);
      this.verifySafePath(resolvedRevisionPath);

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
      // Sanitize slug
      const safeSlug = sanitizeSlug(slug);

      const historyPath = path.join(this.revisionsDir, safeSlug, 'history.json');
      
      // Verify the resolved path is safe
      const resolvedHistoryPath = path.resolve(historyPath);
      this.verifySafePath(resolvedHistoryPath);
      
      try {
        const content = await fs.readFile(historyPath, 'utf-8');
        return JSON.parse(content);
      } catch {
        // No history exists yet, create new
        return {
          postSlug: safeSlug,
          revisions: [],
          currentVersion: 0
        };
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Path traversal')) {
        console.error(`[SECURITY] Blocked path traversal attempt in getRevisionHistory for slug: ${slug}`);
        throw error;
      }
      console.error('Error getting revision history:', error);
      throw error;
    }
  }

  /**
   * Get a specific revision
   */
  async getRevision(slug: string, version: number): Promise<Revision | null> {
    try {
      // Sanitize inputs
      const safeSlug = sanitizeSlug(slug);
      validateVersion(version);

      const revisionPath = path.join(
        this.revisionsDir,
        safeSlug,
        `v${version}.json`
      );
      
      // Verify the resolved path is safe
      const resolvedRevisionPath = path.resolve(revisionPath);
      this.verifySafePath(resolvedRevisionPath);

      const content = await fs.readFile(revisionPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Path traversal')) {
        console.error(`[SECURITY] Blocked path traversal attempt in getRevision for slug: ${slug}`);
        return null;
      }
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
      // Sanitize slug and validate versions
      sanitizeSlug(slug);
      validateVersion(version1);
      validateVersion(version2);

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
      // Sanitize inputs
      const safeSlug = sanitizeSlug(slug);
      validateVersion(version);

      const revision = await this.getRevision(safeSlug, version);
      
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
      if (!Number.isInteger(daysToKeep) || daysToKeep < 1 || daysToKeep > 365) {
        throw new Error('Invalid daysToKeep: must be an integer between 1 and 365');
      }

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
      let deletedCount = 0;

      const slugs = await fs.readdir(this.revisionsDir);

      for (const slug of slugs) {
        try {
          // Validate each slug to prevent path traversal during cleanup
          const safeSlug = sanitizeSlug(slug);
          const history = await this.getRevisionHistory(safeSlug);
          const revisionsToKeep: Revision[] = [];

          for (const revision of history.revisions) {
            const revisionDate = new Date(revision.timestamp);
            
            if (revisionDate >= cutoffDate) {
              revisionsToKeep.push(revision);
            } else {
              // Delete old revision file
              const revisionPath = path.join(
                this.revisionsDir,
                safeSlug,
                `v${revision.version}.json`
              );
              
              // Verify the resolved path is safe
              const resolvedRevisionPath = path.resolve(revisionPath);
              this.verifySafePath(resolvedRevisionPath);

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
        } catch (error) {
          if (error instanceof Error && error.message.includes('Invalid slug')) {
            console.warn(`[SECURITY] Skipping invalid slug during cleanup: ${slug}`);
            continue;
          }
          console.error(`Error processing slug ${slug} during cleanup:`, error);
        }
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
    // Sanitize slug
    const safeSlug = sanitizeSlug(history.postSlug);

    const historyPath = path.join(
      this.revisionsDir,
      safeSlug,
      'history.json'
    );
    
    // Verify the resolved path is safe
    const resolvedHistoryPath = path.resolve(historyPath);
    this.verifySafePath(resolvedHistoryPath);

    await fs.mkdir(path.dirname(historyPath), { recursive: true });
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2), 'utf-8');
  }
}
