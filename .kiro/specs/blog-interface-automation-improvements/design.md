# Design Document

## Overview

This design document outlines the technical architecture and implementation approach for enhancing the Purrify blog system's admin interface and automation capabilities. The improvements focus on completing missing features, enhancing user experience, and providing better tools for content management and monitoring.

## Architecture

### System Components

The blog system follows a layered architecture:

1. **Presentation Layer** - React components in `pages/admin/blog/` and `src/components/admin/`
2. **API Layer** - Next.js API routes in `pages/api/admin/blog/`
3. **Business Logic Layer** - Service classes in `src/lib/blog/`
4. **Data Layer** - File-based JSON storage in `content/blog/`

### New Components

```
src/
├── lib/blog/
│   ├── revision-manager.ts          # NEW: Version control for posts
│   ├── media-library.ts              # NEW: Image management
│   ├── analytics-service.ts          # NEW: Performance metrics
│   ├── translation-manager.ts        # NEW: Multi-language workflow
│   ├── category-manager.ts           # NEW: Taxonomy management
│   └── webhook-monitor.ts            # NEW: Automation tracking
│
├── components/admin/
│   ├── MediaLibrary.tsx              # NEW: Image browser
│   ├── BulkActionsToolbar.tsx        # NEW: Multi-select operations
│   ├── SchedulingCalendar.tsx        # NEW: Content calendar
│   ├── AnalyticsDashboard.tsx        # NEW: Performance metrics
│   ├── TranslationEditor.tsx         # NEW: Side-by-side translation
│   ├── CategoryManager.tsx           # NEW: Taxonomy UI
│   └── WebhookMonitor.tsx            # NEW: Automation logs
│
└── pages/admin/blog/
    ├── edit/[slug].tsx               # ENHANCED: Full edit capability
    ├── analytics.tsx                 # NEW: Analytics dashboard
    ├── media.tsx                     # NEW: Media library
    ├── categories.tsx                # NEW: Category management
    └── webhooks.tsx                  # NEW: Webhook monitoring
```

## Components and Interfaces

### 1. Edit Post Functionality

**Component**: `pages/admin/blog/edit/[slug].tsx`


**Implementation Approach**:
- Reuse existing `new.tsx` component structure
- Pre-populate form fields from existing post data
- Preserve original `id`, `slug`, and `publishDate`
- Update `modifiedDate` on save
- Support status transitions (draft → published, etc.)

**Key Functions**:
```typescript
// Load existing post
async function loadPost(slug: string, locale: string): Promise<BlogPost>

// Update post preserving metadata
async function updatePost(post: BlogPost): Promise<void>

// Handle slug changes (create redirect)
async function updateSlug(oldSlug: string, newSlug: string): Promise<void>
```

### 2. Media Library Management

**Component**: `src/components/admin/MediaLibrary.tsx`

**Data Structure**:
```typescript
interface MediaItem {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number; // bytes
  uploadDate: string;
  usedIn: string[]; // Array of post slugs
  alt?: string;
}

interface MediaLibraryState {
  items: MediaItem[];
  selectedItems: string[];
  searchQuery: string;
  sortBy: 'date' | 'name' | 'size';
  filterBy: 'all' | 'used' | 'unused';
}
```

**Service**: `src/lib/blog/media-library.ts`

```typescript
class MediaLibrary {
  async getAllMedia(): Promise<MediaItem[]>
  async getMediaUsage(filename: string): Promise<string[]>
  async deleteMedia(id: string): Promise<void>
  async updateMediaMetadata(id: string, metadata: Partial<MediaItem>): Promise<void>
  async searchMedia(query: string): Promise<MediaItem[]>
}
```

**Storage**:
- Media metadata stored in `content/media-library.json`
- Scan `public/optimized/blog/` directory on load
- Track usage by parsing post content for image URLs

### 3. Enhanced Auto-save with Visual Feedback

**Component Enhancement**: Update `pages/admin/blog/new.tsx` and `edit/[slug].tsx`

**State Management**:
```typescript
interface AutoSaveState {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
  error: string | null;
  pendingChanges: boolean;
}
```

**Implementation**:
- Debounce auto-save to 30 seconds after last edit
- Show animated "Saving..." indicator during save
- Display "Saved at HH:MM:SS" for 3 seconds after success
- Persist to localStorage as backup
- Offer recovery on page load if localStorage has newer content

**Visual States**:
```typescript
const AutoSaveIndicator = ({ state }: { state: AutoSaveState }) => {
  if (state.status === 'saving') return <Spinner /> + "Saving...";
  if (state.status === 'saved') return <Check /> + `Saved at ${formatTime(state.lastSaved)}`;
  if (state.status === 'error') return <Alert /> + "Save failed - Draft in localStorage";
  return null;
}
```

### 4. Bulk Operations Interface

**Component**: `src/components/admin/BulkActionsToolbar.tsx`

**State Management**:
```typescript
interface BulkOperationsState {
  selectedPosts: string[]; // Array of post slugs
  operation: BulkOperation | null;
  progress: {
    total: number;
    completed: number;
    failed: string[];
  };
}

type BulkOperation = 
  | { type: 'delete' }
  | { type: 'changeStatus'; status: 'published' | 'draft' | 'scheduled' }
  | { type: 'assignCategories'; categories: string[] }
  | { type: 'assignTags'; tags: string[] }
  | { type: 'export'; format: 'json' | 'csv' };
```

**API Endpoint**: `pages/api/admin/blog/bulk-operations.ts`

```typescript
POST /api/admin/blog/bulk-operations
{
  operation: BulkOperation;
  postSlugs: string[];
}

Response:
{
  success: boolean;
  results: {
    successful: string[];
    failed: Array<{ slug: string; error: string }>;
  };
}
```

### 5. Content Scheduling Interface

**Component**: `src/components/admin/SchedulingCalendar.tsx`

**Library**: Use `react-big-calendar` for calendar view

**Data Structure**:
```typescript
interface ScheduledPost {
  slug: string;
  title: string;
  scheduledDate: string;
  status: 'scheduled';
  locale: string;
}
```

**Cron Job**: `pages/api/cron/publish-scheduled-posts.ts`

```typescript
// Runs every hour via Vercel cron
export default async function handler(req, res) {
  const store = new ContentStore();
  const now = new Date();
  
  // Get all scheduled posts across all locales
  const locales = ['en', 'fr', 'zh'];
  for (const locale of locales) {
    const posts = await store.getAllPosts(locale, true);
    const toPublish = posts.filter(p => 
      p.status === 'scheduled' && 
      p.scheduledDate && 
      new Date(p.scheduledDate) <= now
    );
    
    for (const post of toPublish) {
      post.status = 'published';
      await store.savePost(post);
      await logger.log({ action: 'auto-publish', resourceId: post.slug });
    }
  }
  
  return res.json({ published: toPublish.length });
}
```

**Vercel Cron Configuration**:
```json
{
  "crons": [
    {
      "path": "/api/cron/publish-scheduled-posts",
      "schedule": "0 * * * *"
    }
  ]
}
```

### 6. Advanced Content Analytics Dashboard

**Component**: `pages/admin/blog/analytics.tsx`

**Data Structure**:
```typescript
interface PostAnalytics {
  slug: string;
  title: string;
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number; // seconds
  bounceRate: number; // percentage
  sources: {
    organic: number;
    direct: number;
    social: number;
    referral: number;
  };
  topKeywords: Array<{ keyword: string; impressions: number; clicks: number }>;
  conversionRate: number; // percentage
}

interface DashboardMetrics {
  totalViews: number;
  totalPosts: number;
  avgSEOScore: number;
  topPosts: PostAnalytics[];
  trendingCategories: Array<{ category: string; views: number }>;
  recentActivity: Array<{ action: string; timestamp: string; user: string }>;
}
```

**Service**: `src/lib/blog/analytics-service.ts`

```typescript
class AnalyticsService {
  // Integration with Google Analytics 4
  async getPostAnalytics(slug: string, dateRange: DateRange): Promise<PostAnalytics>
  async getDashboardMetrics(dateRange: DateRange): Promise<DashboardMetrics>
  async exportReport(format: 'csv' | 'pdf', dateRange: DateRange): Promise<Buffer>
  
  // Internal metrics
  async trackPostView(slug: string, metadata: ViewMetadata): Promise<void>
  async calculateEngagementScore(slug: string): Promise<number>
}
```

**Storage**:
- Use Google Analytics 4 API for traffic data
- Store internal metrics in `content/analytics/` as JSON files
- Cache dashboard data for 1 hour

### 7. Improved AI Content Generation Controls

**Component**: `src/components/admin/AIContentGenerator.tsx`

**Data Structure**:
```typescript
interface AIGenerationConfig {
  topic: string;
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  length: 'short' | 'medium' | 'long'; // 500-800, 1000-1500, 2000-2500 words
  targetAudience: 'beginners' | 'intermediate' | 'experts';
  keywords: string[];
  template?: ContentTemplate;
  includeImages: boolean;
  imageCount: number;
}

interface ContentTemplate {
  id: string;
  name: string;
  structure: Array<{
    type: 'heading' | 'paragraph' | 'list' | 'callout';
    content: string;
    required: boolean;
  }>;
}

interface GenerationResult {
  id: string;
  config: AIGenerationConfig;
  content: string;
  variations: string[]; // Alternative versions
  timestamp: string;
  approved: boolean;
}
```

**Service Enhancement**: `src/lib/blog/automated-content-generator.ts`

```typescript
class AutomatedContentGenerator {
  async generateWithConfig(config: AIGenerationConfig): Promise<GenerationResult>
  async regenerateSection(postId: string, sectionIndex: number): Promise<string>
  async getVariations(topic: string, count: number): Promise<string[]>
  async applyTemplate(template: ContentTemplate, data: any): Promise<string>
  async saveGenerationHistory(result: GenerationResult): Promise<void>
}
```

**Prompt Engineering**:
```typescript
function buildAdvancedPrompt(config: AIGenerationConfig): string {
  return `
Write a ${config.length} blog post about "${config.topic}" for Purrify's blog.

Tone: ${config.tone}
Target Audience: ${config.targetAudience}
Keywords to include: ${config.keywords.join(', ')}

${config.template ? `Follow this structure:\n${formatTemplate(config.template)}` : ''}

Requirements:
- Title: 50-60 characters, engaging and keyword-rich
- Excerpt: 150-160 characters
- Content: ${getWordCount(config.length)} words in HTML format
- Include H2 and H3 headings
- Focus on practical, actionable advice
- Natural keyword integration (1-2% density)
- Include internal linking opportunities
- Write in ${config.tone} tone suitable for ${config.targetAudience}

Format as JSON: { title, excerpt, content, categories, tags, seoKeywords }
`;
}
```

### 8. Translation Workflow Management

**Component**: `src/components/admin/TranslationEditor.tsx`

**Layout**: Side-by-side editor with original on left, translation on right

**Data Structure**:
```typescript
interface TranslationStatus {
  locale: string;
  status: 'missing' | 'draft' | 'published' | 'outdated';
  lastModified: string;
  translatedBy?: string;
}

interface TranslationWorkflow {
  originalPost: BlogPost;
  translations: Map<string, BlogPost>;
  statuses: Map<string, TranslationStatus>;
}
```

**Service**: `src/lib/blog/translation-manager.ts`

```typescript
class TranslationManager {
  async getTranslationStatus(slug: string): Promise<Map<string, TranslationStatus>>
  async createTranslation(originalSlug: string, targetLocale: string): Promise<BlogPost>
  async linkTranslations(slugs: Map<string, string>): Promise<void>
  async markOutdated(originalSlug: string): Promise<void>
  async getUntranslatedPosts(locale: string): Promise<BlogPost[]>
}
```

**Workflow**:
1. User clicks "Add Translation" on a post
2. System creates draft in target language with structure copied
3. Side-by-side editor opens with original and translation
4. User translates content section by section
5. System validates translation completeness
6. On save, posts are linked via `translations` field
7. When original is updated, translations marked "needs review"


### 9. Enhanced SEO Recommendations Engine

**Component**: Enhancement to `src/lib/blog/seo-scorer.ts`

**New Features**:
```typescript
interface SEOAnalysis {
  score: number;
  breakdown: {
    title: { score: number; issues: string[] };
    description: { score: number; issues: string[] };
    keywords: { score: number; issues: string[]; density: number };
    headings: { score: number; issues: string[] };
    content: { score: number; issues: string[]; wordCount: number };
    images: { score: number; issues: string[] };
    links: { score: number; issues: string[]; internal: number; external: number };
  };
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    issue: string;
    suggestion: string;
    autoFixable: boolean;
  }>;
  competitorAnalysis?: {
    topRankingContent: string[];
    commonKeywords: string[];
    avgWordCount: number;
  };
  internalLinkSuggestions: Array<{
    postSlug: string;
    postTitle: string;
    relevanceScore: number;
    suggestedAnchorText: string;
  }>;
  keywordCannibalization: Array<{
    keyword: string;
    competingPosts: string[];
  }>;
}
```

**Enhanced Service**:
```typescript
class EnhancedSEOScorer extends SEOScorer {
  async analyzeCompetitors(keywords: string[]): Promise<CompetitorAnalysis>
  async suggestInternalLinks(content: string, currentSlug: string): Promise<LinkSuggestion[]>
  async checkKeywordCannibalization(keywords: string[]): Promise<CannibalizationReport>
  async generateAutoFixes(post: BlogPost): Promise<BlogPost>
  async validateSchema(post: BlogPost): Promise<SchemaValidation>
}
```

**Auto-fix Capabilities**:
- Add missing alt text to images
- Insert internal links at relevant anchor text
- Optimize title length (truncate or suggest expansion)
- Generate meta description from content if missing
- Add H2/H3 headings to long paragraphs
- Fix keyword density (suggest synonyms)

### 10. Webhook Automation Monitoring

**Component**: `pages/admin/blog/webhooks.tsx`

**Data Structure**:
```typescript
interface WebhookExecution {
  id: string;
  timestamp: string;
  source: 'make.com' | 'zapier' | 'manual' | 'cron';
  mode: 'generate' | 'publish';
  payload: any;
  response: {
    status: number;
    success: boolean;
    postSlug?: string;
    error?: string;
  };
  duration: number; // milliseconds
}

interface WebhookMetrics {
  totalExecutions: number;
  successRate: number;
  avgDuration: number;
  errorsByType: Map<string, number>;
  executionsByHour: Map<number, number>;
  recentFailures: WebhookExecution[];
}
```

**Service**: `src/lib/blog/webhook-monitor.ts`

```typescript
class WebhookMonitor {
  async logExecution(execution: WebhookExecution): Promise<void>
  async getMetrics(dateRange: DateRange): Promise<WebhookMetrics>
  async getExecutionHistory(limit: number): Promise<WebhookExecution[]>
  async retryFailed(executionId: string): Promise<WebhookExecution>
  async sendAlertEmail(execution: WebhookExecution): Promise<void>
}
```

**Storage**:
- Log executions to `logs/webhooks/YYYY-MM-DD.json`
- Rotate logs monthly
- Keep last 90 days of logs

**Alert System**:
```typescript
interface AlertConfig {
  enabled: boolean;
  recipients: string[];
  conditions: {
    failureThreshold: number; // Alert after N consecutive failures
    slowResponseThreshold: number; // Alert if duration > N ms
  };
}
```

### 11. Content Revision History

**Service**: `src/lib/blog/revision-manager.ts`

**Data Structure**:
```typescript
interface Revision {
  id: string;
  postSlug: string;
  version: number;
  content: BlogPost;
  author: string;
  timestamp: string;
  changesSummary: string;
  diff?: {
    added: string[];
    removed: string[];
    modified: string[];
  };
}

interface RevisionHistory {
  postSlug: string;
  revisions: Revision[];
  currentVersion: number;
}
```

**Implementation**:
```typescript
class RevisionManager {
  async createRevision(post: BlogPost, author: string): Promise<Revision>
  async getRevisionHistory(slug: string): Promise<RevisionHistory>
  async getRevision(slug: string, version: number): Promise<Revision>
  async compareRevisions(slug: string, v1: number, v2: number): Promise<Diff>
  async restoreRevision(slug: string, version: number): Promise<BlogPost>
  async cleanupOldRevisions(daysToKeep: number): Promise<number>
}
```

**Storage**:
- Revisions stored in `content/revisions/{slug}/`
- Each revision as `v{number}.json`
- Metadata in `content/revisions/{slug}/history.json`
- Automatic cleanup after 90 days

**Diff Algorithm**:
- Use `diff` library for text comparison
- Highlight changes in side-by-side view
- Show additions in green, deletions in red
- Track field-level changes (title, content, categories, etc.)

### 12. Category and Tag Management Interface

**Component**: `pages/admin/blog/categories.tsx`

**Data Structure**:
```typescript
interface CategoryWithStats extends Category {
  postCount: number;
  lastUsed: string;
  children?: CategoryWithStats[];
}

interface TagWithStats extends Tag {
  postCount: number;
  lastUsed: string;
  relatedTags: string[];
}
```

**Service**: `src/lib/blog/category-manager.ts`

```typescript
class CategoryManager {
  async getCategoriesWithStats(): Promise<CategoryWithStats[]>
  async createCategory(category: Category): Promise<void>
  async updateCategory(id: string, updates: Partial<Category>): Promise<void>
  async deleteCategory(id: string, reassignTo?: string): Promise<void>
  async mergeTags(sourceIds: string[], targetId: string): Promise<void>
  async findSimilarTags(tagName: string): Promise<Tag[]>
  async getUnusedTaxonomy(): Promise<{ categories: string[]; tags: string[] }>
}
```

**Features**:
- Drag-and-drop category hierarchy
- Bulk tag merging for duplicates
- Usage statistics and trends
- Validation before deletion (check for posts)
- Automatic slug generation
- Multi-language translation management

## Data Models

### Enhanced BlogPost Type

```typescript
interface BlogPost {
  // Existing fields
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishDate: string;
  modifiedDate: string;
  status: 'draft' | 'published' | 'scheduled';
  featuredImage: FeaturedImage;
  categories: string[];
  tags: string[];
  locale: string;
  translations: Record<string, string>;
  seo: SEOMetadata;
  readingTime: number;
  
  // New fields
  scheduledDate?: string;
  revisionNumber?: number;
  lastEditedBy?: string;
  viewCount?: number;
  engagementScore?: number;
  aiGenerated?: boolean;
  generationConfig?: AIGenerationConfig;
}
```

### New Types

```typescript
interface Author {
  name: string;
  email?: string;
  avatar?: string;
}

interface FeaturedImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
}

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  schema?: any;
}

interface DateRange {
  start: string;
  end: string;
}

interface ViewMetadata {
  userAgent: string;
  referrer: string;
  country?: string;
  device: 'mobile' | 'tablet' | 'desktop';
}
```

## Error Handling

### Error Types

```typescript
class BlogError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
  }
}

// Specific error types
class PostNotFoundError extends BlogError {
  constructor(slug: string) {
    super(`Post not found: ${slug}`, 'POST_NOT_FOUND', 404);
  }
}

class ValidationError extends BlogError {
  constructor(field: string, message: string) {
    super(`Validation failed: ${field} - ${message}`, 'VALIDATION_ERROR', 400);
  }
}

class DuplicateSlugError extends BlogError {
  constructor(slug: string) {
    super(`Slug already exists: ${slug}`, 'DUPLICATE_SLUG', 409);
  }
}
```

### Error Handling Strategy

1. **API Level**: Catch all errors, log, return appropriate HTTP status
2. **Service Level**: Throw specific error types with context
3. **Component Level**: Display user-friendly error messages with recovery options
4. **Logging**: All errors logged to `logs/errors/` with stack traces

### Retry Logic

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  throw new Error('Max retries exceeded');
}
```

## Testing Strategy

### Unit Tests

**Coverage Areas**:
- Service classes (ContentStore, RevisionManager, etc.)
- Utility functions (slug generation, reading time calculation)
- SEO scoring algorithms
- Data validation and sanitization

**Framework**: Jest

**Example**:
```typescript
describe('RevisionManager', () => {
  it('should create revision with correct version number', async () => {
    const manager = new RevisionManager();
    const post = createMockPost();
    const revision = await manager.createRevision(post, 'test@example.com');
    expect(revision.version).toBe(1);
  });
  
  it('should restore previous revision', async () => {
    const manager = new RevisionManager();
    const restored = await manager.restoreRevision('test-post', 2);
    expect(restored.content).toBe(mockRevisionContent);
  });
});
```

### Integration Tests

**Coverage Areas**:
- API endpoints (CRUD operations)
- File system operations
- Webhook integrations
- Cron job execution

**Framework**: Jest + Supertest

**Example**:
```typescript
describe('POST /api/admin/blog/posts', () => {
  it('should create new post and return 201', async () => {
    const response = await request(app)
      .post('/api/admin/blog/posts')
      .send(mockPost)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.post.slug).toBe('test-post');
  });
});
```

### E2E Tests

**Coverage Areas**:
- Complete user workflows (create, edit, publish post)
- Media library operations
- Bulk actions
- Translation workflow

**Framework**: Playwright

**Example**:
```typescript
test('should create and publish blog post', async ({ page }) => {
  await page.goto('/admin/blog/new');
  await page.fill('[placeholder="Add title..."]', 'Test Post');
  await page.fill('.ProseMirror', 'Test content');
  await page.click('button:has-text("Publish")');
  await expect(page).toHaveURL('/admin/blog');
  await expect(page.locator('text=Test Post')).toBeVisible();
});
```

### Performance Tests

**Metrics to Track**:
- Page load time (< 2s)
- API response time (< 500ms)
- Auto-save latency (< 200ms)
- Bulk operation throughput (> 10 posts/second)

**Tools**: Lighthouse, WebPageTest


## Security Considerations

### Authentication & Authorization

- All admin endpoints require authentication via NextAuth
- Role-based access control (admin vs editor permissions)
- Session validation on every request
- JWT token expiration and refresh

### Input Validation

```typescript
// Validate all user inputs
function validateBlogPost(post: Partial<BlogPost>): ValidationResult {
  const errors: string[] = [];
  
  if (!post.title || post.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  
  if (!post.content || post.content.length < 100) {
    errors.push('Content must be at least 100 characters');
  }
  
  if (post.slug && !/^[a-z0-9-]+$/.test(post.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }
  
  return { valid: errors.length === 0, errors };
}
```

### XSS Prevention

- Sanitize all HTML content using `sanitize-html` library
- Whitelist allowed HTML tags and attributes
- Strip dangerous attributes (onclick, onerror, etc.)
- Encode user-generated content in JSON responses

```typescript
import sanitizeHtml from 'sanitize-html';

function sanitizeBlogContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'a', 'img'],
    allowedAttributes: {
      'a': ['href', 'title', 'target'],
      'img': ['src', 'alt', 'width', 'height']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      'a': (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer'
        }
      })
    }
  });
}
```

### CSRF Protection

- Use CSRF tokens for all state-changing operations
- Validate tokens on API endpoints
- SameSite cookie attribute set to 'strict'

### Rate Limiting

```typescript
// Apply rate limits to prevent abuse
const rateLimits = {
  createPost: { maxRequests: 10, windowMs: 60000 }, // 10 posts per minute
  uploadImage: { maxRequests: 20, windowMs: 60000 }, // 20 images per minute
  bulkOperations: { maxRequests: 5, windowMs: 60000 }, // 5 bulk ops per minute
  webhooks: { maxRequests: 10, windowMs: 3600000 } // 10 webhooks per hour
};
```

### File Upload Security

- Validate file types (whitelist: jpg, png, webp, gif)
- Check file size limits (max 10MB)
- Scan for malware using ClamAV or similar
- Generate unique filenames to prevent overwrites
- Store uploads outside web root when possible

## Performance Optimization

### Caching Strategy

**Client-Side**:
- Cache media library data in IndexedDB
- Cache category/tag lists in localStorage
- Implement optimistic UI updates

**Server-Side**:
- Cache post listings for 5 minutes
- Cache analytics data for 1 hour
- Use Redis for session storage (if available)

**CDN**:
- Serve static assets from Vercel Edge Network
- Cache blog post pages with ISR (revalidate every hour)
- Immutable cache headers for optimized images

### Database Optimization

**File System**:
- Index post metadata for faster queries
- Implement pagination for large post lists
- Use streaming for large file operations

**Potential Migration to Database**:
If post volume exceeds 1000 posts, consider migrating to PostgreSQL:

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) NOT NULL,
  locale VARCHAR(5) NOT NULL,
  publish_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_status_locale (status, locale),
  INDEX idx_publish_date (publish_date DESC),
  FULLTEXT INDEX idx_content (title, content)
);
```

### Code Splitting

- Lazy load admin components
- Split analytics dashboard into separate chunk
- Load TipTap editor only when needed

```typescript
// Dynamic imports
const MediaLibrary = dynamic(() => import('@/components/admin/MediaLibrary'), {
  loading: () => <Spinner />,
  ssr: false
});
```

### Image Optimization

- Continue using Sharp for server-side optimization
- Generate AVIF, WebP, and JPG formats
- Implement responsive images with srcset
- Lazy load images below the fold
- Use blur-up placeholders

## Deployment Considerations

### Environment Variables

```env
# Required
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://purrify.ca
DATABASE_URL=xxx

# Optional - AI Generation
OPENAI_API_KEY=sk-xxx
UNSPLASH_ACCESS_KEY=xxx

# Optional - Analytics
GOOGLE_ANALYTICS_ID=G-xxx
GA4_PROPERTY_ID=xxx
GA4_SERVICE_ACCOUNT_KEY=xxx

# Optional - Monitoring
SENTRY_DSN=xxx
WEBHOOK_SECRET=xxx

# Optional - Email Alerts
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=xxx
SMTP_PASS=xxx
ALERT_EMAIL=admin@purrify.ca
```

### Vercel Configuration

**vercel.json**:
```json
{
  "crons": [
    {
      "path": "/api/cron/generate-blog-post",
      "schedule": "0 0 */3 * *"
    },
    {
      "path": "/api/cron/publish-scheduled-posts",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/cleanup-old-revisions",
      "schedule": "0 2 * * 0"
    }
  ],
  "functions": {
    "pages/api/admin/blog/**/*.ts": {
      "maxDuration": 30
    },
    "pages/api/cron/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

### Build Process

1. Run type checking: `npm run check-types`
2. Run tests: `npm run test`
3. Build Next.js: `npm run build`
4. Generate sitemaps: `npm run generate-enhanced-sitemap`
5. Optimize images: `npm run optimize-images:enhanced`

### Monitoring & Logging

**Logging Strategy**:
- Application logs: `logs/app/YYYY-MM-DD.log`
- Error logs: `logs/errors/YYYY-MM-DD.log`
- Audit logs: `logs/audit/YYYY-MM-DD.log`
- Webhook logs: `logs/webhooks/YYYY-MM-DD.log`

**Monitoring Tools**:
- Vercel Analytics for performance metrics
- Sentry for error tracking
- Google Analytics 4 for user behavior
- Custom dashboard for blog-specific metrics

**Alerts**:
- Email alerts for webhook failures
- Slack notifications for critical errors
- Daily summary reports for content activity

## Migration Plan

### Phase 1: Core Functionality (Week 1-2)

1. Implement edit post functionality
2. Enhance auto-save with visual feedback
3. Add revision history system
4. Update API endpoints for new features

### Phase 2: Content Management (Week 3-4)

5. Build media library interface
6. Implement bulk operations
7. Create category/tag management UI
8. Add scheduling calendar

### Phase 3: Analytics & Monitoring (Week 5-6)

9. Integrate Google Analytics 4
10. Build analytics dashboard
11. Implement webhook monitoring
12. Add performance tracking

### Phase 4: Advanced Features (Week 7-8)

13. Enhance AI generation controls
14. Build translation workflow
15. Improve SEO recommendations
16. Add automated testing

### Phase 5: Polish & Optimization (Week 9-10)

17. Performance optimization
18. Security hardening
19. Documentation updates
20. User acceptance testing

## Rollback Strategy

### Backup Procedures

- Daily automated backups of `content/` directory
- Version control for all code changes
- Database snapshots before major updates
- Export functionality for all content

### Rollback Steps

1. Identify issue and affected components
2. Revert code changes via Git
3. Restore content from backup if needed
4. Clear caches and rebuild
5. Verify functionality
6. Communicate status to users

## Documentation Updates

### User Documentation

- Update `docs/BLOG_SYSTEM_GUIDE.md` with new features
- Create video tutorials for complex workflows
- Add FAQ section for common issues
- Provide migration guide for existing content

### Developer Documentation

- Update API documentation with new endpoints
- Document new service classes and interfaces
- Add code examples for common tasks
- Create architecture diagrams

### Maintenance Documentation

- Backup and restore procedures
- Troubleshooting guide
- Performance tuning guide
- Security best practices

## Success Metrics

### User Experience Metrics

- Time to create post: < 5 minutes
- Time to edit post: < 2 minutes
- Auto-save success rate: > 99%
- User satisfaction score: > 4.5/5

### Performance Metrics

- Page load time: < 2 seconds
- API response time: < 500ms
- Auto-save latency: < 200ms
- Bulk operation throughput: > 10 posts/second

### Content Quality Metrics

- Average SEO score: > 80
- Posts with featured images: > 95%
- Posts with translations: > 50%
- AI-generated content quality: > 4/5

### System Reliability Metrics

- Uptime: > 99.9%
- Error rate: < 0.1%
- Webhook success rate: > 95%
- Data loss incidents: 0

## Future Enhancements

### Potential Features

1. **Collaborative Editing**: Real-time multi-user editing with conflict resolution
2. **Content Workflow**: Approval process with review stages
3. **A/B Testing**: Test different titles, images, and content variations
4. **Email Newsletter**: Automatic newsletter generation from blog posts
5. **Social Media Integration**: Auto-post to Twitter, LinkedIn, Facebook
6. **Comment System**: Native commenting with moderation tools
7. **Related Posts Algorithm**: ML-based content recommendations
8. **Voice-to-Text**: Dictation support for content creation
9. **Mobile App**: Native iOS/Android app for content management
10. **Advanced Search**: Full-text search with filters and facets

### Technology Upgrades

- Migrate to App Router when stable
- Implement GraphQL API for flexible queries
- Add real-time features with WebSockets
- Integrate headless CMS for enterprise features
- Implement edge computing for global performance

---

**Document Version**: 1.0  
**Last Updated**: November 11, 2025  
**Author**: Kiro AI Assistant  
**Status**: Ready for Review
