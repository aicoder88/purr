# Design Document

## Overview

The Custom Blog System is a native, high-performance blog management solution built directly into the Purrify Next.js application. It eliminates external CMS dependencies while providing enterprise-grade SEO, performance optimization, and multi-language support. Content is stored as structured files, making it portable, version-controllable, and easy to backup.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Interface                           │
│              (/admin/blog - Protected)                       │
│         Rich Text Editor + Image Upload                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Content Manager                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Content    │  │    Image     │  │     SEO      │     │
│  │   Storage    │  │  Optimizer   │  │   Generator  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              File System Storage                             │
│         content/blog/{locale}/{slug}.json                    │
│         public/optimized/blog/{images}                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js ISR Pages                               │
│         /blog/[slug] - Revalidate: 3600s                    │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Content Storage Layer

**Purpose**: Store and retrieve blog post data

**File Structure**:
```
content/
├── blog/
│   ├── en/
│   │   ├── cat-litter-odor-control.json
│   │   ├── activated-carbon-benefits.json
│   │   └── ...
│   ├── fr/
│   │   ├── controle-odeur-litiere.json
│   │   └── ...
│   └── zh/
│       ├── 猫砂除臭.json
│       └── ...
├── categories.json
└── tags.json
```

**Post Schema**:
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;  // HTML or Markdown
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;  // ISO 8601
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
    [locale: string]: string;  // slug in other languages
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonical?: string;
  };
  readingTime: number;  // minutes
}
```

**Interface**:
```typescript
class ContentStore {
  async getPost(slug: string, locale: string): Promise<BlogPost | null>;
  async getAllPosts(locale: string, includeUnpublished?: boolean): Promise<BlogPost[]>;
  async getPostsByCategory(category: string, locale: string): Promise<BlogPost[]>;
  async getPostsByTag(tag: string, locale: string): Promise<BlogPost[]>;
  async savePost(post: BlogPost): Promise<void>;
  async deletePost(slug: string, locale: string): Promise<void>;
  async getCategories(): Promise<Category[]>;
  async getTags(): Promise<Tag[]>;
}
```

**Implementation**:
```typescript
import fs from 'fs/promises';
import path from 'path';

class ContentStore {
  private contentDir = path.join(process.cwd(), 'content', 'blog');
  
  async getPost(slug: string, locale: string): Promise<BlogPost | null> {
    try {
      const filePath = path.join(this.contentDir, locale, `${slug}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      const post = JSON.parse(content);
      
      // Filter out unpublished posts in production
      if (post.status !== 'published' && process.env.NODE_ENV === 'production') {
        // Check if scheduled post should be published
        if (post.status === 'scheduled' && new Date(post.scheduledDate) <= new Date()) {
          post.status = 'published';
          await this.savePost(post);
        } else {
          return null;
        }
      }
      
      return post;
    } catch (error) {
      console.error(`Error reading post ${slug}:`, error);
      return null;
    }
  }
  
  async getAllPosts(locale: string, includeUnpublished = false): Promise<BlogPost[]> {
    try {
      const dirPath = path.join(this.contentDir, locale);
      const files = await fs.readdir(dirPath);
      
      const posts = await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(async file => {
            const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
            return JSON.parse(content);
          })
      );
      
      // Filter and sort
      return posts
        .filter(post => {
          if (includeUnpublished) return true;
          if (post.status === 'published') return true;
          if (post.status === 'scheduled' && new Date(post.scheduledDate) <= new Date()) {
            return true;
          }
          return false;
        })
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    } catch (error) {
      console.error(`Error reading posts for locale ${locale}:`, error);
      return [];
    }
  }
  
  async savePost(post: BlogPost): Promise<void> {
    const filePath = path.join(this.contentDir, post.locale, `${post.slug}.json`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(post, null, 2), 'utf-8');
  }
}
```

### 2. SEO Generator

**Purpose**: Generate optimized meta tags and structured data

**Interface**:
```typescript
interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  keywords: string[];
  jsonLd: object;
  hreflang: Array<{ locale: string; url: string }>;
}

class SEOGenerator {
  generateMetadata(post: BlogPost, locale: string): SEOMetadata;
  generateJSONLD(post: BlogPost): object;
  generateHreflangTags(post: BlogPost): Array<{ locale: string; url: string }>;
  optimizeTitle(title: string): string;
  optimizeDescription(description: string): string;
}
```

**Implementation**:
```typescript
class SEOGenerator {
  generateMetadata(post: BlogPost, locale: string): SEOMetadata {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca';
    const url = `${baseUrl}/${locale}/blog/${post.slug}`;
    
    return {
      title: this.optimizeTitle(post.seo.title || post.title),
      description: this.optimizeDescription(post.seo.description || post.excerpt),
      canonical: post.seo.canonical || url,
      ogTitle: post.seo.title || post.title,
      ogDescription: post.seo.description || post.excerpt,
      ogImage: post.seo.ogImage || post.featuredImage.url,
      ogType: 'article',
      twitterCard: 'summary_large_image',
      keywords: post.seo.keywords,
      jsonLd: this.generateJSONLD(post),
      hreflang: this.generateHreflangTags(post)
    };
  }
  
  generateJSONLD(post: BlogPost): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage.url,
      datePublished: post.publishDate,
      dateModified: post.modifiedDate,
      author: {
        '@type': 'Person',
        name: post.author.name
      },
      publisher: {
        '@type': 'Organization',
        name: 'Purrify',
        logo: {
          '@type': 'ImageObject',
          url: 'https://purrify.ca/purrify-logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://purrify.ca/blog/${post.slug}`
      }
    };
  }
  
  optimizeTitle(title: string): string {
    // Ensure title is 50-60 characters
    if (title.length > 60) {
      return title.substring(0, 57) + '...';
    }
    return title;
  }
  
  optimizeDescription(description: string): string {
    // Ensure description is 150-160 characters
    if (description.length > 160) {
      return description.substring(0, 157) + '...';
    }
    if (description.length < 150) {
      // Pad if too short (optional)
    }
    return description;
  }
}
```

### 3. Image Optimizer

**Purpose**: Automatically optimize uploaded images

**Interface**:
```typescript
interface ImageOptimizationResult {
  original: string;
  optimized: {
    avif: string[];
    webp: string[];
    jpg: string[];
  };
  sizes: number[];
  width: number;
  height: number;
}

class ImageOptimizer {
  async optimizeImage(file: File, slug: string): Promise<ImageOptimizationResult>;
  async generateResponsiveSizes(buffer: Buffer, sizes: number[]): Promise<Map<number, Buffer>>;
  async convertToFormat(buffer: Buffer, format: 'avif' | 'webp' | 'jpg'): Promise<Buffer>;
}
```

**Implementation**:
```typescript
import sharp from 'sharp';

class ImageOptimizer {
  private sizes = [640, 828, 1200, 1920];
  private outputDir = path.join(process.cwd(), 'public', 'optimized', 'blog');
  
  async optimizeImage(file: File, slug: string): Promise<ImageOptimizationResult> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    
    const result: ImageOptimizationResult = {
      original: file.name,
      optimized: { avif: [], webp: [], jpg: [] },
      sizes: this.sizes,
      width: metadata.width!,
      height: metadata.height!
    };
    
    // Generate responsive sizes
    for (const size of this.sizes) {
      if (size > metadata.width!) continue;
      
      const resized = await sharp(buffer)
        .resize(size, null, { withoutEnlargement: true })
        .toBuffer();
      
      // Generate AVIF
      const avif = await sharp(resized).avif({ quality: 80 }).toBuffer();
      const avifPath = `${slug}-${size}w.avif`;
      await fs.writeFile(path.join(this.outputDir, avifPath), avif);
      result.optimized.avif.push(`/optimized/blog/${avifPath}`);
      
      // Generate WebP
      const webp = await sharp(resized).webp({ quality: 85 }).toBuffer();
      const webpPath = `${slug}-${size}w.webp`;
      await fs.writeFile(path.join(this.outputDir, webpPath), webp);
      result.optimized.webp.push(`/optimized/blog/${webpPath}`);
      
      // Generate JPG fallback
      const jpg = await sharp(resized).jpeg({ quality: 85 }).toBuffer();
      const jpgPath = `${slug}-${size}w.jpg`;
      await fs.writeFile(path.join(this.outputDir, jpgPath), jpg);
      result.optimized.jpg.push(`/optimized/blog/${jpgPath}`);
    }
    
    return result;
  }
}
```

### 4. Admin Interface (WordPress-Inspired)

**Purpose**: Beautiful, intuitive web-based UI for content management with zero learning curve

**Design Philosophy**:
- **Familiar**: WordPress-like layout and workflows
- **Beautiful**: Modern, clean design with smooth animations
- **Intuitive**: Self-explanatory UI with helpful tooltips
- **Fast**: Instant feedback and auto-save
- **Accessible**: Keyboard shortcuts and screen reader support

**Visual Design**:
- Clean white/light gray background
- Accent color: Purrify brand purple (#8B5CF6)
- Smooth transitions and micro-interactions
- Generous whitespace
- Clear typography hierarchy
- Subtle shadows and rounded corners

**Layout Structure**:

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Blog Admin                    [Preview] [Publish ▼] │ ← Top Bar
├─────────────────────────────────────────────────────────────┤
│ ┌─────┐                                                      │
│ │Posts│  Categories  Tags  Media  Settings                  │ ← Tabs
│ └─────┘                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [+ New Post]                    [🔍 Search] [Filter ▼]    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📄 How to Eliminate Cat Litter Odor                │    │
│  │    Published • 2 days ago • 1.2k views              │    │
│  │    Categories: Tips, Odor Control                   │    │
│  │    [Edit] [Quick Edit] [Trash]                      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📄 Best Practices for Multi-Cat Households         │    │
│  │    Draft • Modified 1 hour ago                      │    │
│  │    [Edit] [Preview] [Trash]                         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Post Editor Layout** (WordPress Gutenberg-style):

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Posts              [Save Draft] [Preview] [Publish]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Add title...                                               │ ← Large, clean title input
│  ────────────────────────────────────────────────────────   │
│                                                              │
│  [+] Click to add content                                   │ ← Block-based editor
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ ## Heading 2                                        │    │
│  │                                                      │    │
│  │ Start writing your content here...                  │    │
│  │                                                      │    │
│  │ [+ Add block]                                       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 🖼️  [Click to upload image or drag & drop]         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Right Sidebar (Collapsible):
┌──────────────────────┐
│ 📊 Post Settings     │
├──────────────────────┤
│ Status: Draft ▼      │
│ Visibility: Public ▼ │
│ Publish: Now ▼       │
│                      │
│ 🏷️ Categories        │
│ ☑ Tips               │
│ ☐ Odor Control       │
│ + Add New            │
│                      │
│ 🔖 Tags              │
│ [cat litter] [×]     │
│ [odor control] [×]   │
│ + Add tag            │
│                      │
│ 🖼️ Featured Image    │
│ [Upload Image]       │
│                      │
│ 🌐 Languages         │
│ 🇬🇧 English (current)│
│ 🇫🇷 French [Add]     │
│ 🇨🇳 Chinese [Add]    │
│                      │
│ 🎯 SEO Preview       │
│ Title: 52 chars ✓    │
│ Desc: 155 chars ✓    │
│ [Edit SEO]           │
└──────────────────────┘
```

**Pages**:

1. **`/admin/blog`** - Post Listing (WordPress-style)
   - Grid/List view toggle
   - Bulk actions (delete, change status)
   - Inline quick edit
   - Status filters (All, Published, Draft, Scheduled)
   - Search and filter by category/tag
   - Sortable columns

2. **`/admin/blog/new`** - Create New Post
   - Block-based editor (like Gutenberg)
   - Drag-and-drop image upload
   - Auto-save every 30 seconds
   - Real-time character count
   - SEO score indicator
   - Live preview mode

3. **`/admin/blog/edit/[slug]`** - Edit Post
   - Same as new post editor
   - Revision history
   - Restore previous versions

4. **`/admin/blog/categories`** - Category Management
   - Tree view for hierarchical categories
   - Drag-and-drop reordering
   - Inline editing
   - Bulk operations

5. **`/admin/blog/tags`** - Tag Management
   - Tag cloud visualization
   - Merge tags
   - Bulk delete

6. **`/admin/blog/media`** - Media Library
   - Grid view of all images
   - Upload multiple files
   - Image details and alt text editing
   - Search and filter

**Key Features**:

1. **Block-Based Editor** (Gutenberg-style)
   - Paragraph blocks
   - Heading blocks (H2, H3, H4)
   - Image blocks with captions
   - List blocks (ordered/unordered)
   - Quote blocks
   - Code blocks
   - Embed blocks (YouTube, Twitter)
   - Custom blocks (Call-to-action, Product showcase)

2. **Smart Auto-Save**
   - Saves every 30 seconds
   - Visual indicator when saving
   - Never lose work

3. **Drag-and-Drop Everything**
   - Reorder blocks
   - Upload images
   - Organize categories

4. **Real-Time Feedback**
   - SEO score (0-100)
   - Readability score
   - Character counts
   - Estimated reading time

5. **Keyboard Shortcuts**
   - `Cmd/Ctrl + S` - Save
   - `Cmd/Ctrl + P` - Preview
   - `Cmd/Ctrl + Shift + P` - Publish
   - `/` - Insert block
   - `Cmd/Ctrl + B` - Bold
   - `Cmd/Ctrl + I` - Italic

6. **Helpful Tooltips**
   - Hover over any icon for explanation
   - First-time user guide
   - Contextual help

**Components**:

```typescript
// Block-based rich text editor
interface BlockEditorProps {
  value: Block[];
  onChange: (blocks: Block[]) => void;
  onImageUpload: (file: File) => Promise<string>;
  placeholder?: string;
}

interface Block {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'code';
  content: string;
  attributes?: Record<string, any>;
}

// Post editor with sidebar
interface PostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => Promise<void>;
  onDelete?: (slug: string) => Promise<void>;
  onAutoSave?: (post: BlogPost) => Promise<void>;
}

// SEO panel component
interface SEOPanelProps {
  title: string;
  description: string;
  keywords: string[];
  onUpdate: (seo: SEOMetadata) => void;
  score: number;  // 0-100
}

// Media uploader with drag-and-drop
interface MediaUploaderProps {
  onUpload: (files: File[]) => Promise<string[]>;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}
```

**Implementation Stack**:
- **Editor**: Novel (Notion-style editor) or TipTap with custom blocks
- **Drag-and-Drop**: dnd-kit for smooth interactions
- **Forms**: React Hook Form for form management
- **Validation**: Zod for schema validation
- **UI**: Shadcn/UI components (customized for WordPress feel)
- **Icons**: Lucide React (clean, consistent icons)
- **Animations**: Framer Motion for smooth transitions
- **Auth**: NextAuth.js for authentication
- **Toast Notifications**: Sonner for elegant notifications

**Color Palette**:
```css
--primary: #8B5CF6;        /* Purrify purple */
--primary-hover: #7C3AED;
--success: #10B981;        /* Green for published */
--warning: #F59E0B;        /* Orange for draft */
--danger: #EF4444;         /* Red for delete */
--background: #FFFFFF;
--surface: #F9FAFB;
--border: #E5E7EB;
--text: #111827;
--text-muted: #6B7280;
```

**Responsive Design**:
- Desktop: Full sidebar + editor
- Tablet: Collapsible sidebar
- Mobile: Bottom sheet for settings

**Accessibility**:
- ARIA labels on all interactive elements
- Keyboard navigation
- Screen reader announcements
- High contrast mode support
- Focus indicators

### 5. Multi-Language Manager

**Purpose**: Handle translated content

**Interface**:
```typescript
class MultiLanguageManager {
  async getTranslations(postId: string): Promise<Map<string, string>>;
  async linkTranslations(posts: Map<string, string>): Promise<void>;
  generateLanguageRoutes(post: BlogPost): string[];
  getAvailableLocales(postId: string): string[];
}
```

### 6. Automated Content Generator

**Purpose**: Automatically generate and publish SEO-optimized blog posts every 3 days

**Architecture**:
- **Vercel Cron Jobs**: Scheduled function that runs every 3 days
- **AI Content Generation**: Uses OpenAI/Claude API to generate blog posts
- **Unsplash Integration**: Fetches relevant images automatically
- **SEO Optimization**: Follows existing SEO rules and guidelines

**Interface**:
```typescript
interface ContentGenerationConfig {
  topics: string[];  // Topics related to cat litter, odor control, etc.
  tone: string;
  targetWordCount: number;
  includeImages: boolean;
  seoGuidelines: SEOGuidelines;
}

interface SEOGuidelines {
  titleLength: { min: number; max: number };
  descriptionLength: { min: number; max: number };
  keywordDensity: number;
  headingStructure: string[];
  internalLinks: number;
}

class AutomatedContentGenerator {
  async generateBlogPost(topic: string): Promise<BlogPost>;
  async fetchRelevantImages(topic: string, count: number): Promise<string[]>;
  async optimizeSEO(content: string, topic: string): Promise<SEOMetadata>;
  async publishPost(post: BlogPost): Promise<void>;
}
```

**Implementation**:
```typescript
import OpenAI from 'openai';
import { createApi } from 'unsplash-js';

class AutomatedContentGenerator {
  private openai: OpenAI;
  private unsplash: ReturnType<typeof createApi>;
  private contentStore: ContentStore;
  private imageOptimizer: ImageOptimizer;
  
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
    this.contentStore = new ContentStore();
    this.imageOptimizer = new ImageOptimizer();
  }
  
  async generateBlogPost(topic: string): Promise<BlogPost> {
    // Load SEO guidelines from documentation
    const seoGuidelines = await this.loadSEOGuidelines();
    
    // Generate content using AI
    const prompt = this.buildPrompt(topic, seoGuidelines);
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer for Purrify, a cat litter deodorizer company. Write SEO-optimized blog posts about cat care, odor control, and pet wellness.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7
    });
    
    const generatedContent = completion.choices[0].message.content;
    const parsedContent = this.parseGeneratedContent(generatedContent);
    
    // Fetch relevant images from Unsplash
    const images = await this.fetchRelevantImages(topic, 3);
    
    // Download and optimize images
    const optimizedImages = await Promise.all(
      images.map(url => this.downloadAndOptimizeImage(url, topic))
    );
    
    // Create blog post object
    const post: BlogPost = {
      id: this.generateId(),
      slug: this.generateSlug(parsedContent.title),
      title: parsedContent.title,
      excerpt: parsedContent.excerpt,
      content: parsedContent.content,
      author: {
        name: 'Purrify Team',
        avatar: '/team-avatar.png'
      },
      publishDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      status: 'published',
      featuredImage: {
        url: optimizedImages[0].url,
        alt: optimizedImages[0].alt,
        width: optimizedImages[0].width,
        height: optimizedImages[0].height
      },
      categories: parsedContent.categories,
      tags: parsedContent.tags,
      locale: 'en',
      translations: {},
      seo: await this.optimizeSEO(parsedContent.content, topic),
      readingTime: this.calculateReadingTime(parsedContent.content)
    };
    
    return post;
  }
  
  private buildPrompt(topic: string, guidelines: SEOGuidelines): string {
    return `
Write a comprehensive blog post about "${topic}" for Purrify's blog.

Requirements:
- Title: ${guidelines.titleLength.min}-${guidelines.titleLength.max} characters
- Meta description: ${guidelines.descriptionLength.min}-${guidelines.descriptionLength.max} characters
- Word count: 1200-1500 words
- Include H2 and H3 headings for structure
- Focus on cat owners dealing with litter box odor
- Mention Purrify's activated carbon solution naturally (not salesy)
- Include actionable tips and advice
- Write in a friendly, informative tone
- Include 3-5 relevant categories and 5-8 tags

Format your response as JSON:
{
  "title": "...",
  "excerpt": "...",
  "content": "... (HTML format with proper headings)",
  "categories": ["..."],
  "tags": ["..."],
  "seoKeywords": ["..."]
}
    `.trim();
  }
  
  async fetchRelevantImages(topic: string, count: number): Promise<string[]> {
    const searchQuery = this.buildImageSearchQuery(topic);
    
    const result = await this.unsplash.search.getPhotos({
      query: searchQuery,
      perPage: count,
      orientation: 'landscape'
    });
    
    if (result.type === 'success') {
      return result.response.results.map(photo => photo.urls.regular);
    }
    
    return [];
  }
  
  private buildImageSearchQuery(topic: string): string {
    // Convert topic to image-friendly search terms
    const keywords = topic.toLowerCase();
    if (keywords.includes('litter') || keywords.includes('cat')) {
      return 'cat litter box clean home';
    }
    if (keywords.includes('odor') || keywords.includes('smell')) {
      return 'fresh clean home interior';
    }
    return 'happy cat home';
  }
  
  private async downloadAndOptimizeImage(url: string, topic: string): Promise<any> {
    // Download image
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    // Create File object
    const file = new File([buffer], 'featured-image.jpg', { type: 'image/jpeg' });
    
    // Optimize
    const slug = this.generateSlug(topic);
    const optimized = await this.imageOptimizer.optimizeImage(file, slug);
    
    return {
      url: optimized.optimized.webp[0],
      alt: `${topic} - Purrify Blog`,
      width: optimized.width,
      height: optimized.height
    };
  }
  
  async optimizeSEO(content: string, topic: string): Promise<SEOMetadata> {
    // Extract keywords from content
    const keywords = this.extractKeywords(content, topic);
    
    return {
      title: this.optimizeTitle(topic),
      description: this.generateMetaDescription(content),
      keywords,
      ogImage: undefined,  // Will be set from featured image
      canonical: undefined
    };
  }
  
  async publishPost(post: BlogPost): Promise<void> {
    // Save to content store
    await this.contentStore.savePost(post);
    
    // Update sitemap
    const sitemapGen = new SitemapGenerator();
    await sitemapGen.updateSitemap();
    
    // Trigger ISR revalidation
    await this.revalidateBlogPages();
    
    console.log(`Published new blog post: ${post.title}`);
  }
  
  private async loadSEOGuidelines(): Promise<SEOGuidelines> {
    // Load from claude.md or documentation
    // For now, return defaults
    return {
      titleLength: { min: 50, max: 60 },
      descriptionLength: { min: 150, max: 160 },
      keywordDensity: 0.02,
      headingStructure: ['h1', 'h2', 'h3'],
      internalLinks: 3
    };
  }
}
```

**Vercel Cron Job Setup**:

```typescript
// pages/api/cron/generate-blog-post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify cron secret to prevent unauthorized access
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const generator = new AutomatedContentGenerator();
    
    // Topic rotation - cycle through relevant topics
    const topics = [
      'How to Eliminate Cat Litter Odor Naturally',
      'Best Practices for Multi-Cat Households',
      'Understanding Activated Carbon for Pet Odor Control',
      'Apartment Living with Cats: Odor Management Tips',
      'Eco-Friendly Cat Litter Solutions',
      'Cat Health and Litter Box Hygiene',
      'Seasonal Cat Care Tips',
      'DIY Cat Litter Box Maintenance'
    ];
    
    // Select topic based on current date (rotates automatically)
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const topicIndex = daysSinceEpoch % topics.length;
    const selectedTopic = topics[topicIndex];
    
    // Generate and publish post
    const post = await generator.generateBlogPost(selectedTopic);
    await generator.publishPost(post);
    
    return res.status(200).json({
      success: true,
      post: {
        title: post.title,
        slug: post.slug,
        publishDate: post.publishDate,
        url: `https://purrify.ca/blog/${post.slug}`
      }
    });
  } catch (error) {
    console.error('Error generating blog post:', error);
    return res.status(500).json({ error: 'Failed to generate blog post' });
  }
}
```

**Vercel Configuration** (`vercel.json`):

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-blog-post",
      "schedule": "0 0 */3 * *"
    }
  ]
}
```

This runs at midnight every 3 days.

### 8. Make.com Webhook Integration

**Purpose**: Allow external automation tools (Make.com) to trigger blog post generation on-demand

**Architecture**:
- **Webhook Endpoint**: Public API endpoint that accepts POST requests
- **Authentication**: Secret token validation to prevent abuse
- **Flexible Input**: Accept custom topics, keywords, or full content
- **Duplicate Prevention**: Check for existing posts with similar titles
- **Response**: Return published post details for further automation

**Webhook Payload Schema**:
```typescript
interface WebhookPayload {
  secret: string;  // Authentication token
  mode: 'generate' | 'publish';  // Generate new content or publish provided content
  
  // For 'generate' mode
  topic?: string;
  keywords?: string[];
  targetWordCount?: number;
  locale?: string;
  
  // For 'publish' mode
  post?: {
    title: string;
    content: string;  // HTML or Markdown
    excerpt?: string;
    categories?: string[];
    tags?: string[];
    featuredImageUrl?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
}

interface WebhookResponse {
  success: boolean;
  post?: {
    id: string;
    slug: string;
    title: string;
    url: string;
    publishDate: string;
  };
  error?: string;
}
```

**Implementation**:

```typescript
// pages/api/webhooks/generate-blog-post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';
import { ContentStore } from '@/lib/blog/content-store';
import { z } from 'zod';

// Validation schema
const webhookSchema = z.object({
  secret: z.string(),
  mode: z.enum(['generate', 'publish']),
  topic: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  targetWordCount: z.number().optional(),
  locale: z.string().optional(),
  post: z.object({
    title: z.string(),
    content: z.string(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    featuredImageUrl: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
    }).optional()
  }).optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Validate payload
    const payload = webhookSchema.parse(req.body);
    
    // Verify webhook secret
    if (payload.secret !== process.env.WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Invalid secret' });
    }
    
    const generator = new AutomatedContentGenerator();
    const store = new ContentStore();
    
    let post;
    
    if (payload.mode === 'generate') {
      // Generate new content with AI
      const topic = payload.topic || 'Cat Litter Odor Control Tips';
      const locale = payload.locale || 'en';
      
      // Check for duplicate posts
      const existingPosts = await store.getAllPosts(locale);
      const isDuplicate = existingPosts.some(p => 
        p.title.toLowerCase().includes(topic.toLowerCase())
      );
      
      if (isDuplicate) {
        return res.status(409).json({ 
          error: 'Similar post already exists',
          suggestion: 'Try a different topic or check existing posts'
        });
      }
      
      // Generate post
      post = await generator.generateBlogPost(topic, {
        keywords: payload.keywords,
        targetWordCount: payload.targetWordCount || 1200,
        locale
      });
      
    } else if (payload.mode === 'publish') {
      // Publish provided content
      if (!payload.post) {
        return res.status(400).json({ error: 'Post data required for publish mode' });
      }
      
      // Create post object from provided data
      post = await generator.createPostFromContent(payload.post);
    }
    
    // Publish the post
    await generator.publishPost(post);
    
    // Return success response
    return res.status(200).json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        url: `https://purrify.ca/blog/${post.slug}`,
        publishDate: post.publishDate
      }
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid payload',
        details: error.errors
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to process webhook',
      message: error.message
    });
  }
}

// Disable body parsing to handle raw body if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};
```

**Extended AutomatedContentGenerator Methods**:

```typescript
class AutomatedContentGenerator {
  // ... existing methods ...
  
  async generateBlogPost(
    topic: string, 
    options?: {
      keywords?: string[];
      targetWordCount?: number;
      locale?: string;
    }
  ): Promise<BlogPost> {
    const locale = options?.locale || 'en';
    const targetWordCount = options?.targetWordCount || 1200;
    
    // Load SEO guidelines
    const seoGuidelines = await this.loadSEOGuidelines();
    
    // Build enhanced prompt with keywords
    const prompt = this.buildPrompt(topic, seoGuidelines, {
      keywords: options?.keywords,
      targetWordCount
    });
    
    // ... rest of generation logic ...
  }
  
  async createPostFromContent(data: any): Promise<BlogPost> {
    // Create post from provided content (for Make.com publish mode)
    const slug = this.generateSlug(data.title);
    
    // Download and optimize featured image if URL provided
    let featuredImage;
    if (data.featuredImageUrl) {
      featuredImage = await this.downloadAndOptimizeImage(
        data.featuredImageUrl,
        slug
      );
    } else {
      // Fetch default image from Unsplash
      const images = await this.fetchRelevantImages(data.title, 1);
      featuredImage = await this.downloadAndOptimizeImage(images[0], slug);
    }
    
    // Calculate reading time
    const readingTime = this.calculateReadingTime(data.content);
    
    // Generate SEO if not provided
    const seo = data.seo || await this.optimizeSEO(data.content, data.title);
    
    const post: BlogPost = {
      id: this.generateId(),
      slug,
      title: data.title,
      excerpt: data.excerpt || this.generateExcerpt(data.content),
      content: data.content,
      author: {
        name: 'Purrify Team',
        avatar: '/team-avatar.png'
      },
      publishDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      status: 'published',
      featuredImage,
      categories: data.categories || ['Tips'],
      tags: data.tags || [],
      locale: 'en',
      translations: {},
      seo,
      readingTime
    };
    
    return post;
  }
  
  private generateExcerpt(content: string): string {
    // Extract first 160 characters from content
    const text = content.replace(/<[^>]*>/g, ''); // Strip HTML
    return text.substring(0, 157) + '...';
  }
}
```

**Make.com Scenario Setup**:

1. **Trigger**: Schedule (every 3 days) OR Manual button OR RSS feed OR Google Sheets
2. **HTTP Module**: Make a POST request
   - URL: `https://purrify.ca/api/webhooks/generate-blog-post`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "secret": "{{env.WEBHOOK_SECRET}}",
     "mode": "generate",
     "topic": "{{topic}}",
     "keywords": ["cat litter", "odor control"],
     "locale": "en"
   }
   ```
3. **Router**: Check response status
4. **Success Path**: 
   - Send notification (email/Slack)
   - Log to Google Sheets
   - Share on social media
5. **Error Path**:
   - Send alert
   - Retry with different topic

**Environment Variables Required**:
```env
OPENAI_API_KEY=sk-...
UNSPLASH_ACCESS_KEY=...
CRON_SECRET=your-secret-key-here
WEBHOOK_SECRET=your-webhook-secret-here
ENABLE_CRON_AUTOMATION=true
ENABLE_WEBHOOK_AUTOMATION=true
```

**Duplicate Prevention Strategy**:
```typescript
class AutomatedContentGenerator {
  private async checkDuplicates(title: string, locale: string): Promise<boolean> {
    const store = new ContentStore();
    const existingPosts = await store.getAllPosts(locale);
    
    // Check for similar titles (fuzzy matching)
    const titleWords = title.toLowerCase().split(' ');
    
    for (const post of existingPosts) {
      const postWords = post.title.toLowerCase().split(' ');
      const commonWords = titleWords.filter(word => postWords.includes(word));
      
      // If more than 50% of words match, consider it a duplicate
      if (commonWords.length / titleWords.length > 0.5) {
        return true;
      }
    }
    
    return false;
  }
}
```

### 7. Sitemap Generator

**Purpose**: Automatically generate XML sitemaps

**Interface**:
```typescript
class SitemapGenerator {
  async generateBlogSitemap(): Promise<string>;
  async updateSitemap(): Promise<void>;
}
```

**Implementation**:
```typescript
class SitemapGenerator {
  async generateBlogSitemap(): Promise<string> {
    const store = new ContentStore();
    const locales = ['en', 'fr', 'zh'];
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca';
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
    
    for (const locale of locales) {
      const posts = await store.getAllPosts(locale);
      
      for (const post of posts) {
        const url = `${baseUrl}/${locale}/blog/${post.slug}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${post.modifiedDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        
        // Add hreflang links
        for (const [lang, slug] of Object.entries(post.translations)) {
          const altUrl = `${baseUrl}/${lang}/blog/${slug}`;
          xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}" />\n`;
        }
        
        xml += `  </url>\n`;
      }
    }
    
    xml += '</urlset>';
    
    return xml;
  }
  
  async updateSitemap(): Promise<void> {
    const xml = await this.generateBlogSitemap();
    await fs.writeFile(
      path.join(process.cwd(), 'public', 'sitemap-blog.xml'),
      xml,
      'utf-8'
    );
  }
}
```

## Data Models

### Category Schema
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent?: string;
  translations: {
    [locale: string]: {
      name: string;
      description: string;
    };
  };
}
```

### Tag Schema
```typescript
interface Tag {
  id: string;
  name: string;
  slug: string;
  translations: {
    [locale: string]: string;
  };
}
```

## Error Handling

1. **File System Errors**
   - Graceful fallback to empty arrays
   - Log errors for debugging
   - Show user-friendly messages in admin

2. **Image Upload Failures**
   - Validate file types and sizes
   - Show progress indicators
   - Retry failed uploads

3. **Validation Errors**
   - Real-time form validation
   - Clear error messages
   - Prevent invalid data from saving

## Testing Strategy

### Unit Tests
- Content store operations
- SEO metadata generation
- Image optimization
- Multi-language handling

### Integration Tests
- Admin interface workflows
- Post creation and editing
- Image upload and optimization
- Sitemap generation

## Performance Considerations

- Static generation with ISR (revalidate: 3600s)
- Optimized images (AVIF/WebP)
- Lazy loading for images
- Minimal JavaScript on blog pages
- Edge caching for static assets

## Security Considerations

- NextAuth.js authentication for admin
- Role-based access control
- Input sanitization (XSS prevention)
- File upload validation
- CSRF protection
- Audit logging

## Integration Points

### Next.js Pages

```typescript
// pages/blog/[slug].tsx
export async function getStaticProps({ params, locale }) {
  const store = new ContentStore();
  const seoGenerator = new SEOGenerator();
  
  const post = await store.getPost(params.slug, locale);
  
  if (!post) {
    return { notFound: true };
  }
  
  const seo = seoGenerator.generateMetadata(post, locale);
  
  return {
    props: { post, seo },
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const store = new ContentStore();
  const locales = ['en', 'fr', 'zh'];
  
  const paths = [];
  
  for (const locale of locales) {
    const posts = await store.getAllPosts(locale);
    paths.push(...posts.map(post => ({
      params: { slug: post.slug },
      locale
    })));
  }
  
  return {
    paths,
    fallback: 'blocking'
  };
}
```

### API Routes

```typescript
// pages/api/admin/blog/posts.ts
export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const store = new ContentStore();
  
  if (req.method === 'GET') {
    const posts = await store.getAllPosts(req.query.locale, true);
    return res.json(posts);
  }
  
  if (req.method === 'POST') {
    const post = req.body;
    await store.savePost(post);
    
    // Regenerate sitemap
    const sitemapGen = new SitemapGenerator();
    await sitemapGen.updateSitemap();
    
    return res.json({ success: true });
  }
}
```

## Migration Path

If WordPress integration is needed later:
1. Export content to WordPress XML format
2. Import using WordPress importer
3. Switch to WordPress API client
4. Keep file-based system as backup

## Existing Blog Post Migration

### Migration Strategy

**Purpose**: Import all existing blog posts from `pages/blog/*.tsx` files into the new CMS format

**Existing Blog Post Structure**:
- Static TSX files in `pages/blog/` directory
- SEO metadata in `<Head>` component
- JSON-LD structured data
- Optimized images in `/optimized/` directory
- Content as JSX/HTML

**Migration Process**:

1. **Parse TSX Files**: Extract metadata and content from each blog post file
2. **Convert to JSON**: Transform to new BlogPost schema
3. **Preserve SEO**: Maintain all meta tags, descriptions, keywords
4. **Keep URLs**: Use existing slugs to prevent broken links
5. **Optimize Images**: Ensure images are in correct format
6. **Validate**: Check all posts load correctly

**Migration Script**:

```typescript
// scripts/migrate-blog-posts.ts
import fs from 'fs/promises';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { ContentStore } from '../src/lib/blog/content-store';
import type { BlogPost } from '../src/types';

interface ParsedPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  content: string;
  images: string[];
  publishDate: string;
  structuredData: any;
}

class BlogMigration {
  private blogDir = path.join(process.cwd(), 'pages', 'blog');
  private contentStore = new ContentStore();
  
  async migrate() {
    console.log('Starting blog post migration...');
    
    // Get all blog post files
    const files = await fs.readdir(this.blogDir);
    const postFiles = files.filter(f => 
      f.endsWith('.tsx') && 
      f !== 'index.tsx' && 
      f !== '[slug].tsx'
    );
    
    console.log(`Found ${postFiles.length} blog posts to migrate`);
    
    const results = {
      success: [],
      failed: []
    };
    
    for (const file of postFiles) {
      try {
        const slug = file.replace('.tsx', '');
        console.log(`Migrating: ${slug}`);
        
        const parsed = await this.parsePostFile(file);
        const post = await this.convertToNewFormat(parsed);
        
        await this.contentStore.savePost(post);
        results.success.push(slug);
        
        console.log(`✓ Migrated: ${slug}`);
      } catch (error) {
        console.error(`✗ Failed: ${file}`, error);
        results.failed.push({ file, error: error.message });
      }
    }
    
    console.log('\nMigration complete!');
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}`);
    
    if (results.failed.length > 0) {
      console.log('\nFailed posts:');
      results.failed.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
    }
    
    return results;
  }
  
  private async parsePostFile(filename: string): Promise<ParsedPost> {
    const filePath = path.join(this.blogDir, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Parse TSX file
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });
    
    const parsed: ParsedPost = {
      slug: filename.replace('.tsx', ''),
      title: '',
      description: '',
      keywords: [],
      content: '',
      images: [],
      publishDate: '',
      structuredData: null
    };
    
    // Extract metadata from Head component
    traverse(ast, {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        
        // Extract title
        if (openingElement.name.name === 'title') {
          const titleContent = path.node.children[0];
          if (titleContent.type === 'JSXText') {
            parsed.title = this.extractTitle(titleContent.value);
          }
        }
        
        // Extract meta tags
        if (openingElement.name.name === 'meta') {
          const attrs = openingElement.attributes;
          const nameAttr = attrs.find(a => a.name?.name === 'name');
          const contentAttr = attrs.find(a => a.name?.name === 'content');
          
          if (nameAttr && contentAttr) {
            const name = nameAttr.value.value;
            const content = contentAttr.value.value;
            
            if (name === 'description') {
              parsed.description = content;
            } else if (name === 'keywords') {
              parsed.keywords = content.split(',').map(k => k.trim());
            }
          }
        }
        
        // Extract JSON-LD structured data
        if (openingElement.name.name === 'script') {
          const typeAttr = openingElement.attributes.find(
            a => a.name?.name === 'type'
          );
          if (typeAttr?.value?.value === 'application/ld+json') {
            const scriptContent = path.node.children[0];
            if (scriptContent.type === 'JSXExpressionContainer') {
              // Extract structured data
              parsed.structuredData = this.extractStructuredData(scriptContent);
            }
          }
        }
        
        // Extract images
        if (openingElement.name.name === 'Image') {
          const srcAttr = openingElement.attributes.find(
            a => a.name?.name === 'src'
          );
          if (srcAttr) {
            parsed.images.push(srcAttr.value.value);
          }
        }
      }
    });
    
    // Extract main content (everything in Container component)
    parsed.content = await this.extractContent(content);
    
    // Extract publish date from structured data or use file creation date
    if (parsed.structuredData?.datePublished) {
      parsed.publishDate = parsed.structuredData.datePublished;
    } else {
      const stats = await fs.stat(path.join(this.blogDir, filename));
      parsed.publishDate = stats.birthtime.toISOString();
    }
    
    return parsed;
  }
  
  private extractTitle(rawTitle: string): string {
    // Remove site name and separators
    return rawTitle
      .replace(/\s*\|\s*Purrify.*$/i, '')
      .replace(/\s*-\s*Purrify.*$/i, '')
      .trim();
  }
  
  private extractStructuredData(node: any): any {
    // Parse JSON.stringify call to extract structured data
    try {
      // This is simplified - actual implementation would need proper AST parsing
      return null;
    } catch {
      return null;
    }
  }
  
  private async extractContent(fileContent: string): Promise<string> {
    // Extract JSX content between Container tags
    // Convert JSX to HTML
    // This is a simplified version - actual implementation would use proper JSX parser
    
    const containerMatch = fileContent.match(
      /<Container[^>]*>([\s\S]*?)<\/Container>/
    );
    
    if (!containerMatch) {
      return '';
    }
    
    let content = containerMatch[1];
    
    // Convert common JSX patterns to HTML
    content = content
      .replace(/<Image\s+src="([^"]+)"[^>]*\/>/g, '<img src="$1" />')
      .replace(/className=/g, 'class=')
      .replace(/{`([^`]+)`}/g, '$1')
      .replace(/{([^}]+)}/g, '');
    
    return content.trim();
  }
  
  private async convertToNewFormat(parsed: ParsedPost): Promise<BlogPost> {
    // Determine categories from keywords
    const categories = this.inferCategories(parsed.keywords);
    
    // Generate excerpt from description or content
    const excerpt = parsed.description || 
      parsed.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...';
    
    // Get featured image (first image in post)
    const featuredImage = parsed.images[0] || '/optimized/blog/default.webp';
    
    // Calculate reading time
    const wordCount = parsed.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    const post: BlogPost = {
      id: this.generateId(),
      slug: parsed.slug,
      title: parsed.title,
      excerpt,
      content: parsed.content,
      author: {
        name: 'Purrify Team',
        avatar: '/team-avatar.png'
      },
      publishDate: parsed.publishDate,
      modifiedDate: new Date().toISOString(),
      status: 'published',
      featuredImage: {
        url: featuredImage,
        alt: parsed.title,
        width: 1200,
        height: 800
      },
      categories,
      tags: parsed.keywords.slice(0, 8), // Use first 8 keywords as tags
      locale: 'en',
      translations: {},
      seo: {
        title: parsed.title,
        description: parsed.description,
        keywords: parsed.keywords,
        canonical: `https://purrify.ca/blog/${parsed.slug}`
      },
      readingTime
    };
    
    return post;
  }
  
  private inferCategories(keywords: string[]): string[] {
    const categoryMap = {
      'Tips': ['tips', 'guide', 'how to', 'best practices'],
      'Odor Control': ['odor', 'smell', 'deodorizer', 'eliminate'],
      'Science': ['science', 'activated carbon', 'molecular'],
      'Multi-Cat': ['multi-cat', 'multiple cats', 'household'],
      'Product Guide': ['product', 'comparison', 'review']
    };
    
    const categories = [];
    
    for (const [category, terms] of Object.entries(categoryMap)) {
      if (keywords.some(k => terms.some(t => k.toLowerCase().includes(t)))) {
        categories.push(category);
      }
    }
    
    return categories.length > 0 ? categories : ['Tips'];
  }
  
  private generateId(): string {
    return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Run migration
const migration = new BlogMigration();
migration.migrate()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
```

**Migration Checklist**:

1. ✓ Backup existing blog posts
2. ✓ Run migration script
3. ✓ Verify all posts imported correctly
4. ✓ Check SEO metadata preserved
5. ✓ Test URLs still work
6. ✓ Validate images display correctly
7. ✓ Update sitemap
8. ✓ Test ISR revalidation
9. ✓ Archive old TSX files (don't delete yet)
10. ✓ Monitor for broken links

**Post-Migration**:
- Keep old TSX files for 30 days as backup
- Monitor analytics for traffic drops
- Fix any broken internal links
- Update any hardcoded references
