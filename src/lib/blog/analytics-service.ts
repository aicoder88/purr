import fs from 'fs/promises';
import path from 'path';
import { ContentStore } from './content-store';

export interface PostAnalytics {
  slug: string;
  title: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  sources: {
    organic: number;
    direct: number;
    social: number;
    referral: number;
  };
  topKeywords: Array<{ keyword: string; impressions: number; clicks: number }>;
  conversionRate: number;
}

export interface DashboardMetrics {
  totalViews: number;
  totalPosts: number;
  avgSEOScore: number;
  topPosts: PostAnalytics[];
  trendingCategories: Array<{ category: string; views: number }>;
  recentActivity: Array<{ action: string; timestamp: string; user: string; postTitle: string }>;
  periodComparison: {
    viewsChange: number;
    postsChange: number;
    engagementChange: number;
  };
}

export interface DateRange {
  start: string;
  end: string;
}

export class AnalyticsService {
  private analyticsDir = path.join(process.cwd(), 'content', 'analytics');
  private contentStore: ContentStore;

  constructor() {
    this.contentStore = new ContentStore();
  }

  /**
   * Get analytics for a specific post
   */
  async getPostAnalytics(slug: string, _dateRange: DateRange): Promise<PostAnalytics | null> {
    try {
      // Try to load from cache first
      const cached = await this.loadCachedAnalytics(slug);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.data;
      }

      // In a real implementation, this would call Google Analytics 4 API
      // For now, return mock data
      const mockData: PostAnalytics = {
        slug,
        title: 'Post Title',
        views: Math.floor(Math.random() * 1000) + 100,
        uniqueVisitors: Math.floor(Math.random() * 500) + 50,
        avgTimeOnPage: Math.floor(Math.random() * 300) + 60,
        bounceRate: Math.random() * 50 + 20,
        sources: {
          organic: Math.floor(Math.random() * 500),
          direct: Math.floor(Math.random() * 200),
          social: Math.floor(Math.random() * 150),
          referral: Math.floor(Math.random() * 100)
        },
        topKeywords: [
          { keyword: 'cat litter', impressions: 1200, clicks: 45 },
          { keyword: 'odor control', impressions: 800, clicks: 32 },
          { keyword: 'pet care', impressions: 600, clicks: 28 }
        ],
        conversionRate: Math.random() * 5 + 1
      };

      // Cache the result
      await this.cacheAnalytics(slug, mockData);

      return mockData;
    } catch (error) {
      console.error('Error getting post analytics:', error);
      return null;
    }
  }

  /**
   * Get dashboard metrics
   */
  async getDashboardMetrics(_dateRange: DateRange): Promise<DashboardMetrics> {
    try {
      const posts = await this.contentStore.getAllPosts('en', false);

      // Calculate metrics
      const totalViews = Math.floor(Math.random() * 10000) + 5000;
      const totalPosts = posts.length;

      // Calculate average SEO score
      const avgSEOScore = posts.reduce((sum, _post) => {
        // Mock SEO score calculation
        return sum + (Math.random() * 30 + 70);
      }, 0) / posts.length;

      // Get top posts
      const topPosts: PostAnalytics[] = posts.slice(0, 5).map(post => ({
        slug: post.slug,
        title: post.title,
        views: Math.floor(Math.random() * 1000) + 100,
        uniqueVisitors: Math.floor(Math.random() * 500) + 50,
        avgTimeOnPage: Math.floor(Math.random() * 300) + 60,
        bounceRate: Math.random() * 50 + 20,
        sources: {
          organic: Math.floor(Math.random() * 500),
          direct: Math.floor(Math.random() * 200),
          social: Math.floor(Math.random() * 150),
          referral: Math.floor(Math.random() * 100)
        },
        topKeywords: [],
        conversionRate: Math.random() * 5 + 1
      }));

      // Get trending categories
      const categoryViews = new Map<string, number>();
      posts.forEach(post => {
        post.categories.forEach(cat => {
          categoryViews.set(cat, (categoryViews.get(cat) || 0) + Math.floor(Math.random() * 500));
        });
      });

      const trendingCategories = Array.from(categoryViews.entries())
        .map(([category, views]) => ({ category, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Get recent activity from audit logs
      const recentActivity = await this.getRecentActivity();

      return {
        totalViews,
        totalPosts,
        avgSEOScore: Math.round(avgSEOScore),
        topPosts,
        trendingCategories,
        recentActivity,
        periodComparison: {
          viewsChange: Math.random() * 40 - 10,
          postsChange: Math.random() * 20 - 5,
          engagementChange: Math.random() * 30 - 10
        }
      };
    } catch (error) {
      console.error('Error getting dashboard metrics:', error);
      throw error;
    }
  }

  /**
   * Export analytics report
   */
  async exportReport(format: 'csv' | 'pdf', dateRange: DateRange): Promise<Buffer> {
    const metrics = await this.getDashboardMetrics(dateRange);

    if (format === 'csv') {
      return this.generateCSV(metrics);
    } else {
      return this.generatePDF(metrics);
    }
  }

  /**
   * Track post view (internal tracking)
   */
  async trackPostView(slug: string, metadata: {
    userAgent: string;
    referrer: string;
    country?: string;
    device: 'mobile' | 'tablet' | 'desktop';
  }): Promise<void> {
    try {
      const viewsPath = path.join(this.analyticsDir, 'views', `${slug}.json`);
      await fs.mkdir(path.dirname(viewsPath), { recursive: true });

      let views: any[] = [];
      try {
        const content = await fs.readFile(viewsPath, 'utf-8');
        views = JSON.parse(content);
      } catch {
        // File doesn't exist yet
      }

      views.push({
        timestamp: new Date().toISOString(),
        ...metadata
      });

      await fs.writeFile(viewsPath, JSON.stringify(views, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  }

  /**
   * Get recent activity from audit logs
   */
  private async getRecentActivity(): Promise<Array<{
    action: string;
    timestamp: string;
    user: string;
    postTitle: string;
  }>> {
    try {
      const logsDir = path.join(process.cwd(), 'logs', 'audit');
      const today = new Date().toISOString().split('T')[0];
      const logPath = path.join(logsDir, `${today}.log`);

      try {
        const content = await fs.readFile(logPath, 'utf-8');
        const logs = content.split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line))
          .filter(log => log.resourceType === 'post')
          .slice(-10)
          .map(log => ({
            action: log.action,
            timestamp: log.timestamp,
            user: log.userEmail,
            postTitle: log.details?.title || log.resourceId
          }));

        return logs;
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return [];
    }
  }

  /**
   * Cache analytics data
   */
  private async cacheAnalytics(slug: string, data: PostAnalytics): Promise<void> {
    try {
      const cachePath = path.join(this.analyticsDir, 'cache', `${slug}.json`);
      await fs.mkdir(path.dirname(cachePath), { recursive: true });
      await fs.writeFile(
        cachePath,
        JSON.stringify({ data, timestamp: Date.now() }, null, 2),
        'utf-8'
      );
    } catch (error) {
      console.error('Error caching analytics:', error);
    }
  }

  /**
   * Load cached analytics
   */
  private async loadCachedAnalytics(slug: string): Promise<{ data: PostAnalytics; timestamp: number } | null> {
    try {
      const cachePath = path.join(this.analyticsDir, 'cache', `${slug}.json`);
      const content = await fs.readFile(cachePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  /**
   * Check if cache is still valid (1 hour)
   */
  private isCacheValid(timestamp: number): boolean {
    const oneHour = 60 * 60 * 1000;
    return Date.now() - timestamp < oneHour;
  }

  /**
   * Generate CSV report
   */
  private generateCSV(metrics: DashboardMetrics): Buffer {
    const lines = [
      'Metric,Value',
      `Total Views,${metrics.totalViews}`,
      `Total Posts,${metrics.totalPosts}`,
      `Average SEO Score,${metrics.avgSEOScore}`,
      '',
      'Top Posts',
      'Title,Views,Unique Visitors,Avg Time,Bounce Rate',
      ...metrics.topPosts.map(post =>
        `"${post.title}",${post.views},${post.uniqueVisitors},${post.avgTimeOnPage},${post.bounceRate.toFixed(2)}`
      )
    ];

    return Buffer.from(lines.join('\n'), 'utf-8');
  }

  /**
   * Generate PDF report (placeholder)
   */
  private generatePDF(metrics: DashboardMetrics): Buffer {
    // In a real implementation, use a library like pdfkit
    const text = `Analytics Report\n\nTotal Views: ${metrics.totalViews}\nTotal Posts: ${metrics.totalPosts}\nAverage SEO Score: ${metrics.avgSEOScore}`;
    return Buffer.from(text, 'utf-8');
  }
}
