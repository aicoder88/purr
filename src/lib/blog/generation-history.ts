import fs from 'fs/promises';
import path from 'node:path';

export interface GenerationRecord {
  id: string;
  timestamp: string;
  config: {
    topic: string;
    tone: string;
    length: string;
    targetAudience: string;
    keywords: string[];
  };
  result: {
    title: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[];
  };
  variations?: string[];
  approved: boolean;
  usedInPost?: string; // slug of post if used
}

export class GenerationHistoryManager {
  private historyDir = path.join(process.cwd(), 'content', 'generation-history');

  constructor() {
    this.ensureHistoryDir();
  }

  /**
   * Ensure history directory exists
   */
  private async ensureHistoryDir(): Promise<void> {
    try {
      await fs.mkdir(this.historyDir, { recursive: true });
    } catch (error) {
      console.error('Error creating history directory:', error);
    }
  }

  /**
   * Save a generation record
   */
  async saveGeneration(record: Omit<GenerationRecord, 'id' | 'timestamp'>): Promise<GenerationRecord> {
    const id = Date.now().toString();
    const timestamp = new Date().toISOString();

    const fullRecord: GenerationRecord = {
      id,
      timestamp,
      ...record
    };

    try {
      const filePath = path.join(this.historyDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(fullRecord, null, 2), 'utf-8');
      return fullRecord;
    } catch (error) {
      console.error('Error saving generation:', error);
      throw error;
    }
  }

  /**
   * Get all generation records
   */
  async getAllGenerations(): Promise<GenerationRecord[]> {
    try {
      const files = await fs.readdir(this.historyDir);
      const jsonFiles = files.filter(f => f.endsWith('.json'));

      const records = await Promise.all(
        jsonFiles.map(async (file) => {
          const content = await fs.readFile(path.join(this.historyDir, file), 'utf-8');
          return JSON.parse(content) as GenerationRecord;
        })
      );

      // Sort by timestamp, newest first
      return records.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('Error loading generations:', error);
      return [];
    }
  }

  /**
   * Get a specific generation by ID
   */
  async getGeneration(id: string): Promise<GenerationRecord | null> {
    try {
      const filePath = path.join(this.historyDir, `${id}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content) as GenerationRecord;
    } catch {
      return null;
    }
  }

  /**
   * Update a generation record
   */
  async updateGeneration(id: string, updates: Partial<GenerationRecord>): Promise<void> {
    try {
      const existing = await this.getGeneration(id);
      if (!existing) {
        throw new Error('Generation not found');
      }

      const updated = { ...existing, ...updates };
      const filePath = path.join(this.historyDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error updating generation:', error);
      throw error;
    }
  }

  /**
   * Mark a generation as approved
   */
  async approveGeneration(id: string, postSlug: string): Promise<void> {
    await this.updateGeneration(id, {
      approved: true,
      usedInPost: postSlug
    });
  }

  /**
   * Delete old generations (keep last 100)
   */
  async cleanupOldGenerations(): Promise<void> {
    try {
      const all = await this.getAllGenerations();
      
      if (all.length <= 100) {
        return; // Nothing to clean up
      }

      // Delete oldest records
      const toDelete = all.slice(100);
      
      await Promise.all(
        toDelete.map(async (record) => {
          const filePath = path.join(this.historyDir, `${record.id}.json`);
          await fs.unlink(filePath);
        })
      );

      // Cleanup completed silently
    } catch (error) {
      console.error('Error cleaning up generations:', error);
    }
  }

  /**
   * Get generations by topic
   */
  async getGenerationsByTopic(topic: string): Promise<GenerationRecord[]> {
    const all = await this.getAllGenerations();
    return all.filter(g => 
      g.config.topic.toLowerCase().includes(topic.toLowerCase())
    );
  }

  /**
   * Get recent generations (last N)
   */
  async getRecentGenerations(count: number = 10): Promise<GenerationRecord[]> {
    const all = await this.getAllGenerations();
    return all.slice(0, count);
  }
}
