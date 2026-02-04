import fs from 'node:fs';
import path from 'node:path';

export interface TrialConversionEvent {
  email: string;
  productId: string;
  source?: string;
  userAgent?: string;
  ip?: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

/**
 * Records a trial conversion event. In production/serverless, this logs and
 * returns a normalized payload. In local/dev, it also appends to a JSON file
 * at reports/trial-conversions.json for analysis.
 */
export async function recordTrialConversion(event: Omit<TrialConversionEvent, 'occurredAt'>): Promise<TrialConversionEvent> {
  const normalized: TrialConversionEvent = {
    ...event,
    occurredAt: new Date().toISOString(),
  };

  // Logging is handled by the analytics system

  // Best-effort local persistence for dev analysis
  try {
    if (process.env.NODE_ENV !== 'production') {
      const reportsDir = path.join(process.cwd(), 'reports');
      const filePath = path.join(reportsDir, 'trial-conversions.json');
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

      let existing: TrialConversionEvent[] = [];
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        try { existing = JSON.parse(raw); } catch { existing = []; }
      }
      existing.push(normalized);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    }
  } catch {
    // Non-fatal in serverless
  }

  return normalized;
}

// Lightweight tracker used by API routes for metrics and trial user flows.
export interface TrialUserRecord {
  id: string;
  email: string;
  source?: string;
  campaign?: string;
  createdAt: string;
  convertedAt?: string;
}

function usersFile(): string {
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  return path.join(reportsDir, 'trial-users.json');
}

function loadUsers(): TrialUserRecord[] {
  try {
    const file = usersFile();
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8')) as TrialUserRecord[];
  } catch {
    return [];
  }
}

function saveUsers(users: TrialUserRecord[]): void {
  try {
    fs.writeFileSync(usersFile(), JSON.stringify(users, null, 2));
  } catch {
    // ignore
  }
}

export class TrialConversionTracker {
  static async createTrialUser(input: { email: string; source?: string; campaign?: string; }): Promise<TrialUserRecord> {
    const users = loadUsers();
    const existing = users.find(u => u.email.toLowerCase() === input.email.toLowerCase());
    if (existing) return existing;
    const rec: TrialUserRecord = {
      id: `trial_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      email: input.email,
      source: input.source,
      campaign: input.campaign,
      createdAt: new Date().toISOString(),
    };
    users.push(rec);
    saveUsers(users);
    return rec;
  }

  static async getTrialUserByEmail(email: string): Promise<TrialUserRecord | null> {
    const users = loadUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  static async updateTrialSource(userId: string, source?: string, campaign?: string): Promise<boolean> {
    const users = loadUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx].source = source ?? users[idx].source;
    users[idx].campaign = campaign ?? users[idx].campaign;
    saveUsers(users);
    return true;
  }

  static async convertTrialUser(userId: string): Promise<boolean> {
    const users = loadUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx].convertedAt = new Date().toISOString();
    saveUsers(users);
    return true;
  }

  static async getConversionMetrics(timeframeDays: number = 30): Promise<{
    totalTrialUsers: number;
    convertedUsers: number;
    conversionRate: number;
    avgTimeToConversion: number;
    topSources: Array<{ source: string; conversions: number }>;
  }> {
    const users = loadUsers();
    const since = Date.now() - timeframeDays * 24 * 60 * 60 * 1000;
    const within = users.filter(u => new Date(u.createdAt).getTime() >= since);

    const converted = within.filter(u => u.convertedAt);
    const conversionRate = within.length > 0 ? (converted.length / within.length) * 100 : 0;

    let avgTimeToConversion = 0;
    if (converted.length > 0) {
      const sum = converted.reduce((acc, u) => acc + (new Date(u.convertedAt!).getTime() - new Date(u.createdAt).getTime()), 0);
      avgTimeToConversion = sum / converted.length;
    }

    const sourceMap = new Map<string, number>();
    converted.forEach(u => {
      const s = (u.source || 'unknown').toLowerCase();
      sourceMap.set(s, (sourceMap.get(s) || 0) + 1);
    });
    const topSources = Array.from(sourceMap.entries())
      .map(([source, conversions]) => ({ source, conversions }))
      .sort((a, b) => b.conversions - a.conversions)
      .slice(0, 10);

    return {
      totalTrialUsers: within.length,
      convertedUsers: converted.length,
      conversionRate,
      avgTimeToConversion,
      topSources,
    };
  }
}
