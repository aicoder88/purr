import fs from 'fs/promises';
import path from 'node:path';

export interface AuditLogDetails {
  title?: string;
  slug?: string;
  previousStatus?: string;
  newStatus?: string;
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface AuditLog {
  timestamp: string;
  userId: string;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'bulk_delete' | 'bulk_status_change' | 'bulk_assign_categories' | 'bulk_assign_tags';
  resourceType: 'post' | 'category' | 'tag' | 'media';
  resourceId: string;
  details?: AuditLogDetails;
}

export class AuditLogger {
  private logDir = path.join(process.cwd(), 'logs', 'audit');

  /**
   * Log an action
   */
  async log(entry: Omit<AuditLog, 'timestamp'>): Promise<void> {
    const log: AuditLog = {
      ...entry,
      timestamp: new Date().toISOString()
    };

    try {
      // Ensure log directory exists
      await fs.mkdir(this.logDir, { recursive: true });

      // Create log file name based on date (one file per day)
      const date = new Date().toISOString().split('T')[0];
      const logFile = path.join(this.logDir, `${date}.json`);

      // Read existing logs
      let logs: AuditLog[] = [];
      try {
        const content = await fs.readFile(logFile, 'utf-8');
        logs = JSON.parse(content);
      } catch {
        // File doesn't exist yet, start with empty array
      }

      // Append new log
      logs.push(log);

      // Write back to file
      await fs.writeFile(logFile, JSON.stringify(logs, null, 2), 'utf-8');

    } catch (_error) {
      // Failed to write audit log, ignore
    }
  }

  /**
   * Get logs for a specific date
   */
  async getLogsForDate(date: string): Promise<AuditLog[]> {
    try {
      const logFile = path.join(this.logDir, `${date}.json`);
      const content = await fs.readFile(logFile, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  /**
   * Get logs for a specific resource
   */
  async getLogsForResource(
    resourceType: AuditLog['resourceType'],
    resourceId: string
  ): Promise<AuditLog[]> {
    const allLogs: AuditLog[] = [];

    try {
      const files = await fs.readdir(this.logDir);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.readFile(path.join(this.logDir, file), 'utf-8');
          const logs: AuditLog[] = JSON.parse(content);
          allLogs.push(
            ...logs.filter(
              log => log.resourceType === resourceType && log.resourceId === resourceId
            )
          );
        }
      }
    } catch (_error) {
      // Failed to read audit logs, ignore
    }

    return allLogs.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Get recent logs (last N entries)
   */
  async getRecentLogs(limit: number = 50): Promise<AuditLog[]> {
    const allLogs: AuditLog[] = [];

    try {
      const files = await fs.readdir(this.logDir);
      const sortedFiles = files
        .filter(file => file.endsWith('.json'))
        .sort()
        .reverse()
        .slice(0, 7); // Last 7 days

      for (const file of sortedFiles) {
        const content = await fs.readFile(path.join(this.logDir, file), 'utf-8');
        const logs: AuditLog[] = JSON.parse(content);
        allLogs.push(...logs);
      }
    } catch (_error) {
      // Failed to read audit logs, ignore
    }

    return allLogs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}
