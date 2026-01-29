#!/usr/bin/env ts-node
/**
 * Blog Post Migration Script
 * 
 * Migrates existing blog posts from pages/blog/*.tsx files to the new CMS format.
 * Preserves SEO metadata, images, and URLs.
 */

import fs from 'fs/promises';
import path from 'node:path';
import { ContentStore } from '../../src/lib/blog/content-store';

interface ParsedPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  content: string;
  images: string[];
  publishDate: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  articleSection?: string;
  wordCount?: number;
  readingTime?: number;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  modifiedDate: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  categories: string[];
  tags: string[];
  locale: string;
  translations: {
    [locale: string]: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonical?: string;
  };
  readingTime: number;
}

class BlogMigration {
  private blogDir = path.join(process.cwd(), 'pages', 'blog');
  private contentStore: ContentStore;
  
  constructor() {
    this.contentStore = new ContentStore();
  }
  
  async migrate() {
    console.log('🚀 Starting blog post migration...\n');
    
    // Get all blog post files
    const files = await fs.readdir(this.blogDir);
    const postFiles = files.filter(f => 
      f.endsWith('.tsx') && 
      f !== 'index.tsx' && 
      f !== '[slug].tsx' &&
      !f.startsWith('_')
    );
    
    console.log(`📝 Found ${postFiles.length} blog posts to migrate\n`);
    
    const results = {
      success: [] as string[],
      failed: [] as { file: string; error: string }[]
    };
    
    for (const file of postFiles) {
      try {
        const slug = file.replace('.tsx', '');
        console.log(`📄 Migrating: ${slug}`);
        
        const parsed = await this.parsePostFile(file);
        const post = await this.convertToNewFormat(parsed);
        
        await this.contentStore.savePost(post);
        results.success.push(slug);
        
        console.log(`✅ Migrated: ${slug}\n`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Failed: ${file}`, errorMessage, '\n');
        results.failed.push({ file, error: errorMessage });
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary');
    console.log('='.repeat(50));
    console.log(`✅ Success: ${results.success.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    
    if (results.failed.length > 0) {
      console.log('\n❌ Failed posts:');
      results.failed.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
    }
    
    if (results.success.length > 0) {
      console.log('\n✅ Successfully migrated posts:');
      results.success.forEach(slug => console.log(`  - ${slug}`));
    }
    
    return results;
  }
  
  private async parsePostFile(filename: string): Promise<ParsedPost> {
    const filePath = path.join(this.blogDir, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    
    const parsed: ParsedPost = {
      slug: filename.replace('.tsx', ''),
      title: '',
      description: '',
      keywords: [],
      content: '',
      images: [],
      publishDate: ''
    };
    
    // Extract title from <title> tag
    const titleMatch = content.match(/<title>\{?`?([^`}<]+)`?\}?<\/title>/);
    if (titleMatch) {
      parsed.title = this.extractTitle(titleMatch[1]);
    }
    
    // If title is still empty, try to extract from h1
    if (!parsed.title) {
      const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (h1Match) {
        parsed.title = h1Match[1].trim();
      }
    }
    
    // Extract meta description
    const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/);
    if (descMatch) {
      parsed.description = descMatch[1];
    }
    
    // Extract keywords
    const keywordsMatch = content.match(/<meta\s+name="keywords"\s+content="([^"]+)"/);
    if (keywordsMatch) {
      parsed.keywords = keywordsMatch[1].split(',').map(k => k.trim());
    }
    
    // Extract image variable definitions FIRST
    const imageVarMap: Record<string, string> = {};
    const imageVarMatches = content.matchAll(/const\s+(\w+Image)\s*=\s*['"]([^'"]+)['"]/g);
    for (const match of imageVarMatches) {
      imageVarMap[match[1]] = match[2];
    }
    
    // Extract Open Graph data
    const ogTitleMatch = content.match(/<meta\s+property="og:title"\s+content="([^"]+)"/);
    if (ogTitleMatch) {
      parsed.ogTitle = ogTitleMatch[1];
    }
    
    const ogDescMatch = content.match(/<meta\s+property="og:description"\s+content="([^"]+)"/);
    if (ogDescMatch) {
      parsed.ogDescription = ogDescMatch[1];
    }
    
    const ogImageMatch = content.match(/<meta\s+property="og:image"\s+content=\{?`?https:\/\/www\.purrify\.ca\$\{(\w+)\}`?\}?/);
    if (ogImageMatch) {
      // Resolve variable reference
      const varName = ogImageMatch[1];
      if (imageVarMap[varName]) {
        parsed.ogImage = imageVarMap[varName];
      }
    }
    
    // If no og:image found, try without the URL prefix
    if (!parsed.ogImage) {
      const ogImageMatch2 = content.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
      if (ogImageMatch2) {
        parsed.ogImage = ogImageMatch2[1].replace('https://www.purrify.ca', '');
      }
    }
    
    // Extract canonical URL
    const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
    if (canonicalMatch) {
      parsed.canonicalUrl = canonicalMatch[1];
    }
    
    // Extract article section from JSON-LD
    const articleSectionMatch = content.match(/"articleSection":\s*"([^"]+)"/);
    if (articleSectionMatch) {
      parsed.articleSection = articleSectionMatch[1];
    }
    
    // Extract word count from JSON-LD
    const wordCountMatch = content.match(/"wordCount":\s*(\d+)/);
    if (wordCountMatch) {
      parsed.wordCount = parseInt(wordCountMatch[1]);
    }
    
    // Extract reading time from JSON-LD
    const timeRequiredMatch = content.match(/"timeRequired":\s*"PT(\d+)M"/);
    if (timeRequiredMatch) {
      parsed.readingTime = parseInt(timeRequiredMatch[1]);
    }
    
    // Extract publish date from JSON-LD
    const datePublishedMatch = content.match(/"datePublished":\s*"([^"]+)"/);
    if (datePublishedMatch) {
      parsed.publishDate = datePublishedMatch[1];
    } else {
      // Fallback to file creation date
      const stats = await fs.stat(filePath);
      parsed.publishDate = stats.birthtime.toISOString();
    }
    
    // Add images from the variable map
    for (const imagePath of Object.values(imageVarMap)) {
      if (!parsed.images.includes(imagePath)) {
        parsed.images.push(imagePath);
      }
    }
    
    // Also extract images from Image components
    const imgMatches = content.matchAll(/<Image[^>]+src=\{?['"]?([^'"}]+)['"]?\}?/g);
    for (const match of imgMatches) {
      const src = match[1];
      // If it's a variable reference, resolve it
      if (imageVarMap[src]) {
        if (!parsed.images.includes(imageVarMap[src])) {
          parsed.images.push(imageVarMap[src]);
        }
      } else if (!parsed.images.includes(src)) {
        parsed.images.push(src);
      }
    }
    
    // Extract main content (simplified - gets content between article tags)
    const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    if (articleMatch) {
      parsed.content = this.cleanContent(articleMatch[1]);
    } else {
      // Fallback: get content between Container tags
      const containerMatch = content.match(/<Container[^>]*>([\s\S]*?)<\/Container>/);
      if (containerMatch) {
        parsed.content = this.cleanContent(containerMatch[1]);
      }
    }
    
    return parsed;
  }
  
  private extractTitle(rawTitle: string): string {
    // Remove site name and separators
    return rawTitle
      .replaceAll(/\s*\|\s*\$\{SITE_NAME\}/g, '')
      .replace(/\s*\|\s*Purrify.*$/i, '')
      .replace(/\s*-\s*Purrify.*$/i, '')
      .trim();
  }
  
  private cleanContent(rawContent: string): string {
    // Remove JSX-specific syntax and convert to clean HTML
    let content = rawContent;
    
    // Remove Head component and its contents
    content = content.replaceAll(/<Head>[\s\S]*?<\/Head>/g, '');
    
    // Remove breadcrumb navigation
    content = content.replaceAll(/<nav[^>]*>[\s\S]*?<\/nav>/g, '');
    
    // Remove RelatedArticles component
    content = content.replaceAll(/<RelatedArticles[^>]*\/>/g, '');
    content = content.replaceAll(/<RelatedArticles[^>]*>[\s\S]*?<\/RelatedArticles>/g, '');
    
    // Remove Container component tags but keep content
    content = content.replaceAll(/<Container[^>]*>/g, '');
    content = content.replaceAll(/<\/Container>/g, '');
    
    // Remove Link components but keep content
    content = content.replaceAll(/<Link\s+href="([^"]+)"[^>]*>/g, '<a href="$1">');
    content = content.replaceAll(/<\/Link>/g, '</a>');
    
    // Remove Image components and replace with img tags
    content = content.replaceAll(/<Image\s+src=\{?([^}\s]+)\}?[^>]*\/>/g, (match, src) => {
      // Extract alt text if present
      const altMatch = match.match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : '';
      return `<img src="${src}" alt="${alt}" />`;
    });
    
    // Convert className to class
    content = content.replaceAll(/className=/g, 'class=');
    
    // Remove JSX expressions that are just variables
    content = content.replaceAll(/\{heroImage\}/g, '');
    content = content.replaceAll(/\{coconutImage\}/g, '');
    content = content.replaceAll(/\{healthImage\}/g, '');
    content = content.replaceAll(/\{\w+Image\}/g, '');
    
    // Clean up template literals
    content = content.replaceAll(/\{`([^`]+)`\}/g, '$1');
    
    // Remove empty JSX expressions
    content = content.replaceAll(/\{\s*\}/g, '');
    
    // Remove JSX comments
    content = content.replaceAll(/\{\/\*[\s\S]*?\*\/\}/g, '');
    
    // Clean up whitespace
    content = content.replaceAll(/\n\s*\n\s*\n/g, '\n\n');
    content = content.trim();
    
    return content;
  }
  
  private async convertToNewFormat(parsed: ParsedPost): Promise<BlogPost> {
    // Determine categories from keywords and article section
    const categories = this.inferCategories(parsed.keywords, parsed.articleSection);
    
    // Generate excerpt from description or content
    const excerpt = parsed.description || 
      this.generateExcerpt(parsed.content);
    
    // Get featured image (first image in post or from og:image)
    let featuredImageUrl = parsed.ogImage || parsed.images[0] || '/optimized/default.webp';
    
    // Clean up image URL if it has JSX syntax
    featuredImageUrl = featuredImageUrl.replaceAll(/\$\{.*?\}/g, '').trim();
    if (!featuredImageUrl || featuredImageUrl === '') {
      featuredImageUrl = parsed.images[0] || '/optimized/default.webp';
    }
    
    // Calculate reading time if not provided
    const readingTime = parsed.readingTime || this.calculateReadingTime(parsed.content);
    
    const post: BlogPost = {
      id: this.generateId(),
      slug: parsed.slug,
      title: parsed.title,
      excerpt,
      content: parsed.content,
      author: {
        name: 'Purrify Team',
        avatar: '/images/team-avatar.png'
      },
      publishDate: parsed.publishDate,
      modifiedDate: new Date().toISOString(),
      status: 'published',
      featuredImage: {
        url: featuredImageUrl,
        alt: parsed.title,
        width: 1200,
        height: 800
      },
      categories,
      tags: parsed.keywords.slice(0, 8), // Use first 8 keywords as tags
      locale: 'en',
      translations: {},
      seo: {
        title: parsed.ogTitle || parsed.title,
        description: parsed.ogDescription || parsed.description,
        keywords: parsed.keywords,
        ogImage: parsed.ogImage,
        canonical: parsed.canonicalUrl
      },
      readingTime
    };
    
    return post;
  }
  
  private inferCategories(keywords: string[], articleSection?: string): string[] {
    const categories: string[] = [];
    
    // Use article section if available
    if (articleSection) {
      categories.push(articleSection);
    }
    
    // Map keywords to categories
    const categoryMap: Record<string, string[]> = {
      'Tips': ['tips', 'guide', 'how to', 'best practices', 'solutions'],
      'Odor Control': ['odor', 'smell', 'deodorizer', 'eliminate', 'control'],
      'Science & Education': ['science', 'activated carbon', 'molecular', 'benefits'],
      'Multi-Cat': ['multi-cat', 'multiple cats', 'household'],
      'Product Guide': ['product', 'comparison', 'review', 'remover']
    };
    
    for (const [category, terms] of Object.entries(categoryMap)) {
      if (keywords.some(k => terms.some(t => k.toLowerCase().includes(t)))) {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      }
    }
    
    return categories.length > 0 ? categories : ['Tips'];
  }
  
  private generateExcerpt(content: string): string {
    // Strip HTML tags
    const text = content.replaceAll(/<[^>]*>/g, '');
    // Get first 160 characters
    const excerpt = text.substring(0, 157).trim();
    return excerpt + '...';
  }
  
  private calculateReadingTime(content: string): number {
    // Strip HTML tags
    const text = content.replaceAll(/<[^>]*>/g, '');
    // Count words
    const wordCount = text.split(/\s+/).length;
    // Average reading speed: 200 words per minute
    return Math.ceil(wordCount / 200);
  }
  
  private generateId(): string {
    return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Run migration
async function main() {
  try {
    const migration = new BlogMigration();
    const results = await migration.migrate();
    
    if (results.failed.length > 0) {
      console.log('\n⚠️  Migration completed with errors');
      process.exit(1);
    } else {
      console.log('\n🎉 Migration completed successfully!');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  }
}

main();
