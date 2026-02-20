import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost } from '@/types/blog';
import { ContentStore } from './content-store';
import { ContentValidator } from './content-validator';
import { AutomatedContentGenerator } from './automated-content-generator';

export interface PostIssue {
  slug: string;
  issues: string[];
  severity: 'error' | 'warning';
}

export interface ScanReport {
  totalPosts: number;
  validPosts: number;
  postsWithIssues: PostIssue[];
}

export interface RepairResult {
  success: boolean;
  originalPost: BlogPost;
  repairedPost?: BlogPost;
  issues: string[];
}

export interface RepairReport {
  totalScanned: number;
  totalRepaired: number;
  failed: string[];
  details: RepairResult[];
}

export class BlogRepairUtility {
  private contentStore: ContentStore;
  private validator: ContentValidator;
  private generator: AutomatedContentGenerator;

  constructor() {
    this.contentStore = new ContentStore();
    this.validator = new ContentValidator();
    this.generator = new AutomatedContentGenerator();
  }

  /**
   * Scan all posts for issues
   */
  async scanAllPosts(locale: string): Promise<ScanReport> {
    const contentDir = path.join(process.cwd(), 'content', 'blog', locale);
    
    if (!fs.existsSync(contentDir)) {
      return {
        totalPosts: 0,
        validPosts: 0,
        postsWithIssues: []
      };
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
    const postsWithIssues: PostIssue[] = [];
    let validPosts = 0;

    for (const file of files) {
      try {
        const filePath = path.join(contentDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const post = JSON.parse(content) as BlogPost;

        const validation = this.validator.validatePost(post);
        
        if (!validation.valid) {
          const issues = validation.errors.map(e => `${e.field}: ${e.message}`);
          postsWithIssues.push({
            slug: post.slug,
            issues,
            severity: 'error'
          });
        } else if (validation.warnings.length > 0) {
          const issues = validation.warnings.map(w => `${w.field}: ${w.message}`);
          postsWithIssues.push({
            slug: post.slug,
            issues,
            severity: 'warning'
          });
        } else {
          validPosts++;
        }
      } catch (error) {
        postsWithIssues.push({
          slug: file.replace('.json', ''),
          issues: [`Failed to parse: ${error}`],
          severity: 'error'
        });
      }
    }

    return {
      totalPosts: files.length,
      validPosts,
      postsWithIssues
    };
  }

  /**
   * Repair a specific post
   */
  async repairPost(slug: string, locale: string): Promise<RepairResult> {
    
    try {
      const post = await this.contentStore.getPost(slug, locale);
      
      if (!post) {
        return {
          success: false,
          originalPost: {} as BlogPost,
          issues: ['Post not found']
        };
      }

      const validation = this.validator.validatePost(post);
      
      if (validation.valid) {
        return {
          success: true,
          originalPost: post,
          repairedPost: post,
          issues: []
        };
      }

      const issues = validation.errors.map(e => `${e.field}: ${e.message}`);
      const repairedPost = { ...post };
      let repaired = false;

      // Fix template variables in title
      if (this.validator.containsTemplateVariables(post.title)) {
        // Extract topic from slug
        const topic = slug.replaceAll(/-/g, ' ');
        repairedPost.title = this.capitalizeWords(topic);
        repaired = true;
      }

      // Fix template variables in excerpt
      if (this.validator.containsTemplateVariables(post.excerpt)) {
        // Generate excerpt from content
        const textContent = this.validator.stripHTML(post.content);
        repairedPost.excerpt = textContent.substring(0, 157).trim() + '...';
        repaired = true;
      }

      // Fix broken image
      if (post.featuredImage && !this.validator.isValidURL(post.featuredImage.url)) {
        repairedPost.featuredImage = {
          url: '/optimized/logos/purrify-logo.avif',
          alt: post.title,
          width: 1200,
          height: 630
        };
        repaired = true;
      }

      // Fix template variables in image alt
      if (post.featuredImage?.alt && this.validator.containsTemplateVariables(post.featuredImage.alt)) {
        repairedPost.featuredImage.alt = post.title;
        repaired = true;
      }

      if (repaired) {
        // Save the repaired post
        const saveResult = await this.contentStore.savePost(repairedPost, { skipValidation: false });
        
        if (saveResult.success) {
          return {
            success: true,
            originalPost: post,
            repairedPost,
            issues
          };
        } else {
          return {
            success: false,
            originalPost: post,
            issues: [...issues, 'Failed to save repaired post']
          };
        }
      }

      return {
        success: false,
        originalPost: post,
        issues: [...issues, 'Could not automatically repair']
      };

    } catch (error) {
      console.error(`❌ Error repairing post ${slug}:`, error);
      return {
        success: false,
        originalPost: {} as BlogPost,
        issues: [`Error: ${error}`]
      };
    }
  }

  /**
   * Repair all broken posts
   */
  async repairAllPosts(locale: string): Promise<RepairReport> {
    
    const scanReport = await this.scanAllPosts(locale);
    const details: RepairResult[] = [];
    const failed: string[] = [];
    let totalRepaired = 0;

    for (const postWithIssue of scanReport.postsWithIssues) {
      if (postWithIssue.severity === 'error') {
        const repairResult = await this.repairPost(postWithIssue.slug, locale);
        details.push(repairResult);
        
        if (repairResult.success) {
          totalRepaired++;
        } else {
          failed.push(postWithIssue.slug);
        }
      }
    }

    return {
      totalScanned: scanReport.totalPosts,
      totalRepaired,
      failed,
      details
    };
  }

  /**
   * Capitalize words for title generation
   */
  private capitalizeWords(text: string): string {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Generate a detailed report
   */
  generateReport(scanReport: ScanReport): string {
    let report = '# Blog Post Quality Report\n\n';
    report += `**Total Posts:** ${scanReport.totalPosts}\n`;
    report += `**Valid Posts:** ${scanReport.validPosts}\n`;
    report += `**Posts with Issues:** ${scanReport.postsWithIssues.length}\n\n`;

    if (scanReport.postsWithIssues.length > 0) {
      report += '## Posts with Issues\n\n';
      
      for (const post of scanReport.postsWithIssues) {
        report += `### ${post.slug} (${post.severity})\n`;
        for (const issue of post.issues) {
          report += `- ${issue}\n`;
        }
        report += '\n';
      }
    }

    return report;
  }

  /**
   * Generate repair report
   */
  generateRepairReport(repairReport: RepairReport): string {
    let report = '# Blog Post Repair Report\n\n';
    report += `**Total Scanned:** ${repairReport.totalScanned}\n`;
    report += `**Total Repaired:** ${repairReport.totalRepaired}\n`;
    report += `**Failed:** ${repairReport.failed.length}\n\n`;

    if (repairReport.failed.length > 0) {
      report += '## Failed Repairs\n\n';
      for (const slug of repairReport.failed) {
        report += `- ${slug}\n`;
      }
      report += '\n';
    }

    if (repairReport.details.length > 0) {
      report += '## Repair Details\n\n';
      
      for (const detail of repairReport.details) {
        report += `### ${detail.originalPost.slug}\n`;
        report += `**Status:** ${detail.success ? '✅ Success' : '❌ Failed'}\n`;
        report += `**Issues:**\n`;
        for (const issue of detail.issues) {
          report += `- ${issue}\n`;
        }
        report += '\n';
      }
    }

    return report;
  }
}
