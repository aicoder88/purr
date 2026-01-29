# Design Document

## Overview

The Blog CMS Integration connects the Purrify platform with WordPress as a headless CMS, enabling non-technical content creators to manage blog posts through a user-friendly interface. The system implements Incremental Static Regeneration (ISR) for optimal performance, supports multi-language content, and provides graceful fallbacks when the CMS is unavailable.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WordPress CMS                             │
│              (Content Management)                            │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  CMS Integration Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Content    │  │    Cache     │  │   Fallback   │     │
│  │   Fetcher    │  │   Manager    │  │   Handler    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js ISR (pages/blog/[slug].tsx)            │
│                  Revalidate: 3600s                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Blog Pages (Static)                         │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. WordPress API Client

**Purpose**: Fetch content from WordPress REST API

**Interface**:
```typescript
interface WordPressPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  status: 'publish' | 'draft' | 'future';
  _embedded?: {
    author: Array<{ name: string }>;
    'wp:featuredmedia': Array<{ source_url: string }>;
    'wp:term': Array<Array<{ name: string; slug: string }>>;
  };
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

class WordPressClient {
  private baseUrl: string;
  private cache: Map<string, any>;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }
  
  async getPost(slug: string, locale: string = 'en'): Promise<WordPressPost | null>;
  async getPosts(params: PostQueryParams): Promise<WordPressPost[]>;
  async getCategories(): Promise<WordPressCategory[]>;
  async getTags(): Promise<WordPressTag[]>;
  async getPostsByCategory(categorySlug: string): Promise<WordPressPost[]>;
  async getPostsByTag(tagSlug: string): Promise<WordPressPost[]>;
}
```

**Implementation**:
```typescript
class WordPressClient {
  async getPost(slug: string, locale: string = 'en'): Promise<WordPressPost | null> {
    const cacheKey = `post:${slug}:${locale}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      const url = `${this.baseUrl}/posts?slug=${slug}&_embed&lang=${locale}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      const posts = await response.json();
      
      if (posts.length === 0) {
        return null;
      }
      
      const post = posts[0];
      this.cache.set(cacheKey, post);
      
      return post;
    } catch (error) {
      console.error('Error fetching post from WordPress:', error);
      return null;
    }
  }
  
  async getPosts(params: PostQueryParams): Promise<WordPressPost[]> {
    const queryString = new URLSearchParams({
      _embed: 'true',
      per_page: params.perPage?.toString() || '10',
      page: params.page?.toString() || '1',
      orderby: params.orderBy || 'date',
      order: params.order || 'desc',
      ...(params.categories && { categories: params.categories.join(',') }),
      ...(params.tags && { tags: params.tags.join(',') }),
      ...(params.lang && { lang: params.lang })
    }).toString();
    
    const url = `${this.baseUrl}/posts?${queryString}`;
    
    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 }
      });
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts from WordPress:', error);
      return [];
    }
  }
}
```

### 2. Content Transformer

**Purpose**: Transform WordPress data to application format

**Interface**:
```typescript
interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  content: string;
  categories: string[];
  tags: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

class ContentTransformer {
  transformPost(wpPost: WordPressPost, locale: string): BlogPost;
  transformPosts(wpPosts: WordPressPost[], locale: string): BlogPost[];
  extractSEOMetadata(wpPost: WordPressPost): SEOMetadata;
  sanitizeContent(html: string): string;
}
```

**Implementation**:
```typescript
class ContentTransformer {
  transformPost(wpPost: WordPressPost, locale: string): BlogPost {
    return {
      title: wpPost.title.rendered,
      excerpt: this.sanitizeContent(wpPost.excerpt.rendered).substring(0, 150) + '...',
      author: wpPost._embedded?.author?.[0]?.name || 'Purrify Team',
      date: new Date(wpPost.date).toISOString().split('T')[0],
      image: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/purrify-logo.png',
      link: `/${locale}/blog/${wpPost.slug}`,
      content: wpPost.content.rendered,
      categories: wpPost._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
      tags: wpPost._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
      seo: this.extractSEOMetadata(wpPost)
    };
  }
  
  sanitizeContent(html: string): string {
    // Remove HTML tags
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }
  
  extractSEOMetadata(wpPost: WordPressPost): SEOMetadata {
    // Extract from Yoast SEO or similar plugin
    const yoastMeta = wpPost.yoast_head_json;
    
    return {
      title: yoastMeta?.title || wpPost.title.rendered,
      description: yoastMeta?.description || this.sanitizeContent(wpPost.excerpt.rendered),
      keywords: yoastMeta?.keywords || [],
      ogImage: yoastMeta?.og_image?.[0]?.url || wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url
    };
  }
}
```

### 3. Cache Manager

**Purpose**: Manage content caching and revalidation

**Interface**:
```typescript
interface CacheConfig {
  revalidateInterval: number;  // seconds
  staleWhileRevalidate: boolean;
  maxAge: number;
}

class CacheManager {
  private cache: Map<string, CachedContent>;
  
  async get(key: string): Promise<any | null>;
  async set(key: string, value: any, ttl: number): Promise<void>;
  async invalidate(key: string): Promise<void>;
  async invalidatePattern(pattern: string): Promise<void>;
  isStale(key: string): boolean;
}
```

**Implementation**:
```typescript
class CacheManager {
  private cache: Map<string, CachedContent> = new Map();
  
  async get(key: string): Promise<any | null> {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  async set(key: string, value: any, ttl: number): Promise<void> {
    this.cache.set(key, {
      data: value,
      expiresAt: Date.now() + (ttl * 1000),
      createdAt: Date.now()
    });
  }
  
  async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
  }
  
  async invalidatePattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}
```

### 4. Fallback Handler

**Purpose**: Provide graceful degradation when CMS is unavailable

**Interface**:
```typescript
interface FallbackConfig {
  useSampleData: boolean;
  cacheLastKnownGood: boolean;
  showErrorMessage: boolean;
}

class FallbackHandler {
  private samplePosts: BlogPost[];
  private lastKnownGood: Map<string, BlogPost>;
  
  async handleError(error: Error, slug: string): Promise<BlogPost | null>;
  getSamplePost(slug: string): BlogPost | null;
  getLastKnownGood(slug: string): BlogPost | null;
  shouldUseFallback(): boolean;
}
```

**Implementation**:
```typescript
class FallbackHandler {
  async handleError(error: Error, slug: string): Promise<BlogPost | null> {
    console.error('CMS error, attempting fallback:', error);
    
    // Try last known good version
    const cached = this.getLastKnownGood(slug);
    if (cached) {
      console.log('Using cached version of post');
      return cached;
    }
    
    // Try sample data
    if (this.shouldUseFallback()) {
      const sample = this.getSamplePost(slug);
      if (sample) {
        console.log('Using sample data for post');
        return sample;
      }
    }
    
    // No fallback available
    return null;
  }
  
  shouldUseFallback(): boolean {
    // Check if WordPress API is configured
    const apiUrl = process.env.WORDPRESS_API_URL;
    return !apiUrl || apiUrl === 'https://your-wordpress-site.com/wp-json/wp/v2';
  }
}
```

### 5. Multi-Language Support

**Purpose**: Handle translated content

**Interface**:
```typescript
interface LocaleConfig {
  locale: string;
  wpLocale: string;  // WordPress locale code
  fallbackLocale: string;
}

class MultiLanguageManager {
  async getLocalizedPost(slug: string, locale: string): Promise<BlogPost | null>;
  async getTranslations(postId: number): Promise<Map<string, string>>;
  generateHreflangTags(slug: string, availableLocales: string[]): string[];
}
```

## Data Models

### Blog Post Schema

```typescript
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  modifiedDate: string;
  image: string;
  link: string;
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
    ogImage: string;
    canonical: string;
  };
  status: 'publish' | 'draft' | 'future';
  scheduledDate?: string;
}
```

## Error Handling

1. **API Unavailable**
   - Use cached content
   - Fall back to sample data
   - Log error without exposing to users

2. **Invalid Response**
   - Validate response structure
   - Use default values for missing fields
   - Continue with partial data

3. **Rate Limiting**
   - Implement exponential backoff
   - Cache aggressively
   - Queue requests

## Testing Strategy

### Unit Tests
- WordPress API client
- Content transformation
- Cache management
- Fallback logic

### Integration Tests
- End-to-end content fetching
- ISR revalidation
- Multi-language support
- Error scenarios

## Performance Considerations

- ISR with 1-hour revalidation
- Aggressive caching
- Parallel requests for listings
- Lazy load images in content
- Limit API requests to 100/hour

## Integration Points

### Next.js Page

```typescript
// pages/blog/[slug].tsx
import { WordPressClient } from '@/lib/cms/wordpress-client';
import { ContentTransformer } from '@/lib/cms/content-transformer';
import { FallbackHandler } from '@/lib/cms/fallback-handler';

export async function getStaticProps({ params, locale }) {
  const client = new WordPressClient(process.env.WORDPRESS_API_URL);
  const transformer = new ContentTransformer();
  const fallback = new FallbackHandler();
  
  try {
    const wpPost = await client.getPost(params.slug, locale);
    
    if (!wpPost) {
      return { notFound: true };
    }
    
    const post = transformer.transformPost(wpPost, locale);
    
    return {
      props: { post },
      revalidate: 3600  // Revalidate every hour
    };
  } catch (error) {
    const post = await fallback.handleError(error, params.slug);
    
    if (!post) {
      return { notFound: true };
    }
    
    return {
      props: { post },
      revalidate: 3600
    };
  }
}

export async function getStaticPaths() {
  const client = new WordPressClient(process.env.WORDPRESS_API_URL);
  
  try {
    const posts = await client.getPosts({ perPage: 100 });
    
    const paths = posts.map(post => ({
      params: { slug: post.slug }
    }));
    
    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}
```

### Environment Configuration

```env
# .env.production
WORDPRESS_API_URL=https://blog.purrify.ca/wp-json/wp/v2
WORDPRESS_AUTH_TOKEN=your_auth_token_here
CMS_CACHE_TTL=3600
CMS_USE_FALLBACK=true
```
