# Design Document

## Overview

The Blog Content Quality System addresses critical issues in the Purrify blog where template variables are displayed instead of actual content, images fail to load, and user interactions are limited. This design implements comprehensive validation, error handling, and repair mechanisms to ensure high-quality blog content both for manually created and AI-generated posts.

The system consists of four main components:
1. **Content Validator** - Validates blog post data before saving
2. **Enhanced ContentStore** - Adds validation to save operations
3. **Enhanced AutomatedContentGenerator** - Adds validation to AI generation
4. **Blog Repair Utility** - Scans and fixes existing broken posts

## Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Blog System                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  Blog Index Page │────────▶│  ContentStore    │          │
│  │  (pages/blog/)   │         │  (Enhanced)      │          │
│  └──────────────────┘         └────────┬─────────┘          │
│           │                             │                     │
│           │                             ▼                     │
│           │                    ┌──────────────────┐          │
│           │                    │ Content Validator│          │
│           │                    └──────────────────┘          │
│           │                             ▲                     │
│           │                             │                     │
│           ▼                             │                     │
│  ┌──────────────────┐         ┌────────┴─────────┐          │
│  │ Blog Post Card   │         │ Automated Content│          │
│  │ (Clickable)      │         │ Generator        │          │
│  └──────────────────┘         │ (Enhanced)       │          │
│                                └──────────────────┘          │
│                                         │                     │
│                                         ▼                     │
│                                ┌──────────────────┐          │
│                                │ Blog Repair      │          │
│                                │ Utility          │          │
│                                └──────────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Content Creation Flow**:
   - AutomatedContentGenerator creates post → ContentValidator validates → ContentStore saves
   
2. **Content Display Flow**:
   - Blog Index requests posts → ContentStore loads and validates → Blog Index renders with error handling
   
3. **Content Repair Flow**:
   - Repair Utility scans posts → Identifies issues → Regenerates/fixes → Saves corrected posts

## Components and Interfaces

### 1. Content Validator

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

interface ValidationWarning {
  field: string;
  message: string;
}

class ContentValidator {
  // Validate complete blog post
  validatePost(post: BlogPost): ValidationResult
  
  // Individual field validators
  validateTitle(title: string): ValidationResult
  validateExcerpt(excerpt: string): ValidationResult
  validateContent(content: string): ValidationResult
  validateFeaturedImage(image: FeaturedImage): Promise<ValidationResult>
  
  // Check for template variables
  containsTemplateVariables(text: string): boolean
  
  // Check for HTML in excerpt
  containsHTML(text: string): boolean
  
  // Validate URL accessibility
  validateImageURL(url: string): Promise<boolean>
}
```

### 2. Enhanced ContentStore

```typescript
class ContentStore {
  private validator: ContentValidator;
  
  // Enhanced save with validation
  async savePost(post: BlogPost, options?: SaveOptions): Promise<SaveResult>
  
  // Load with error handling
  async getPost(slug: string, locale: string): Promise<BlogPost | null>
  
  // Load all with error handling
  async getAllPosts(locale: string, includeUnpublished?: boolean): Promise<BlogPost[]>
  
  // Validate existing post
  async validateExistingPost(slug: string, locale: string): Promise<ValidationResult>
}

interface SaveOptions {
  skipValidation?: boolean;
  allowWarnings?: boolean;
}

interface SaveResult {
  success: boolean;
  validation: ValidationResult;
  post?: BlogPost;
}
```

### 3. Enhanced AutomatedContentGenerator

```typescript
class AutomatedContentGenerator {
  private validator: ContentValidator;
  private maxRetries: number = 3;
  
  // Generate with validation
  async generateBlogPost(topic: string): Promise<GenerationResult>
  
  // Validate generated content
  private validateGeneratedContent(content: GeneratedContent): ValidationResult
  
  // Retry logic for failed generation
  private async retryGeneration(topic: string, attempt: number): Promise<GeneratedContent>
  
  // Ensure valid featured image
  private async ensureValidFeaturedImage(topic: string): Promise<FeaturedImage>
}

interface GenerationResult {
  success: boolean;
  post?: BlogPost;
  validation: ValidationResult;
  attempts: number;
}
```

### 4. Blog Repair Utility

```typescript
class BlogRepairUtility {
  private contentStore: ContentStore;
  private generator: AutomatedContentGenerator;
  private validator: ContentValidator;
  
  // Scan all posts for issues
  async scanAllPosts(locale: string): Promise<ScanReport>
  
  // Repair specific post
  async repairPost(slug: string, locale: string): Promise<RepairResult>
  
  // Repair all broken posts
  async repairAllPosts(locale: string): Promise<RepairReport>
  
  // Fix template variables
  private async fixTemplateVariables(post: BlogPost): Promise<BlogPost>
  
  // Fix broken images
  private async fixBrokenImage(post: BlogPost): Promise<BlogPost>
}

interface ScanReport {
  totalPosts: number;
  validPosts: number;
  postsWithIssues: PostIssue[];
}

interface PostIssue {
  slug: string;
  issues: string[];
  severity: 'error' | 'warning';
}

interface RepairResult {
  success: boolean;
  originalPost: BlogPost;
  repairedPost?: BlogPost;
  issues: string[];
}

interface RepairReport {
  totalScanned: number;
  totalRepaired: number;
  failed: string[];
  details: RepairResult[];
}
```

### 5. Enhanced Blog Index Component

```typescript
// pages/blog/index.tsx enhancements

interface BlogIndexProps {
  blogPosts: BlogPost[];
  errors?: PostError[];
}

interface PostError {
  slug: string;
  error: string;
}

// Enhanced getStaticProps with error handling
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const store = new ContentStore();
  const errors: PostError[] = [];
  
  try {
    const posts = await store.getAllPosts(locale || 'en', false);
    
    // Filter out invalid posts and collect errors
    const validPosts = posts.filter(post => {
      const validation = validator.validatePost(post);
      if (!validation.valid) {
        errors.push({ slug: post.slug, error: validation.errors[0].message });
        return false;
      }
      return true;
    });
    
    return {
      props: {
        blogPosts: validPosts,
        errors: errors.length > 0 ? errors : undefined
      },
      revalidate: 3600
    };
  } catch (err) {
    console.error('Error in blog index:', err);
    return {
      props: {
        blogPosts: [],
        errors: [{ slug: 'system', error: 'Failed to load blog posts' }]
      },
      revalidate: 3600
    };
  }
}
```

## Data Models

### BlogPost (Enhanced)

```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;  // Must not contain template variables
  excerpt: string;  // Must not contain HTML or template variables
  content: string;  // Must be valid HTML with minimum length
  author: Author;
  publishDate: string;
  modifiedDate: string;
  status: 'draft' | 'published' | 'scheduled';
  featuredImage: FeaturedImage;  // Must be valid and accessible
  categories: string[];
  tags: string[];
  locale: string;
  translations: Record<string, string>;
  seo: SEOMetadata;
  readingTime: number;
  
  // New validation metadata
  _validation?: {
    lastValidated: string;
    isValid: boolean;
    issues?: string[];
  };
}

interface FeaturedImage {
  url: string;  // Must be accessible URL
  alt: string;  // Must not contain template variables
  width: number;
  height: number;
}
```

### Validation Rules

```typescript
const VALIDATION_RULES = {
  title: {
    minLength: 10,
    maxLength: 100,
    noTemplateVars: true,
    noHTML: true
  },
  excerpt: {
    minLength: 50,
    maxLength: 200,
    noTemplateVars: true,
    noHTML: true
  },
  content: {
    minTextLength: 500,  // After stripping HTML
    validHTML: true,
    noTemplateVars: true
  },
  featuredImage: {
    requiredFields: ['url', 'alt', 'width', 'height'],
    validateURL: true,
    noTemplateVars: true
  }
};

// Template variable patterns to detect
const TEMPLATE_VAR_PATTERNS = [
  /\{meta\.\w+\}/g,
  /\{\w+\.\w+\}/g,
  /\$\{\w+\}/g
];
```

## C
orrectness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: No template variables in displayed content
*For any* blog post displayed on the blog index, the title and excerpt should not contain template variable patterns like `{meta.title}` or `${variable}`
**Validates: Requirements 1.1, 1.2**

### Property 2: Content validation rejects template variables
*For any* blog post data with template variables in title or excerpt, calling ContentStore.savePost should return a validation error
**Validates: Requirements 1.3**

### Property 3: Generator output contains no template variables
*For any* topic provided to AutomatedContentGenerator, the generated post should not contain template variable patterns in any field
**Validates: Requirements 1.4**

### Property 4: Invalid posts are excluded from listings
*For any* set of blog posts where some contain template variables, calling ContentStore.getAllPosts should return only the valid posts
**Validates: Requirements 1.5**

### Property 5: Featured images are always present
*For any* blog post displayed on the blog index, the featured image element should have a valid src attribute
**Validates: Requirements 2.1**

### Property 6: Broken images use fallback
*For any* blog post with an invalid featured image URL, the displayed image should be the fallback Purrify logo
**Validates: Requirements 2.2**

### Property 7: Generated posts have valid image URLs
*For any* post created by AutomatedContentGenerator, the featured image URL should be non-empty and properly formatted
**Validates: Requirements 2.3**

### Property 8: Image validation checks accessibility
*For any* blog post being saved, if the featured image URL is invalid, the validation should fail or use a fallback
**Validates: Requirements 2.5**

### Property 9: Post cards are fully clickable
*For any* blog post card rendered on the blog index, clicking anywhere on the card should navigate to the post URL
**Validates: Requirements 3.2**

### Property 10: Post cards are wrapped in links
*For any* blog post card in the DOM, the entire card should be wrapped in an anchor element
**Validates: Requirements 3.3**

### Property 11: Post cards are keyboard accessible
*For any* blog post card, it should be focusable and activatable via keyboard
**Validates: Requirements 3.5**

### Property 12: Generator validates all required fields
*For any* topic input to AutomatedContentGenerator, all required fields (title, excerpt, content, featuredImage) should be non-empty and valid
**Validates: Requirements 4.1**

### Property 13: Generator rejects content with template variables
*For any* AI-generated content containing template variables, the generator should reject it and retry
**Validates: Requirements 4.2**

### Property 14: Save operation runs all validations
*For any* blog post data, calling ContentStore.savePost should validate title, excerpt, content, and featured image
**Validates: Requirements 4.3**

### Property 15: Validation failures prevent publication
*For any* invalid blog post, attempting to save should not create the JSON file
**Validates: Requirements 4.4**

### Property 16: Generator returns validation report
*For any* generation attempt, AutomatedContentGenerator should return a structured report with success status and validation details
**Validates: Requirements 4.5**

### Property 17: Title length validation
*For any* title string, validation should accept titles between 10-100 characters and reject those outside this range
**Validates: Requirements 5.1**

### Property 18: Excerpt length validation
*For any* excerpt string, validation should accept excerpts between 50-200 characters and reject those outside this range
**Validates: Requirements 5.2**

### Property 19: Content minimum length validation
*For any* content string, after stripping HTML tags, validation should require at least 500 characters
**Validates: Requirements 5.3**

### Property 20: Validation errors are specific
*For any* validation failure, the error message should contain the field name and reason for failure
**Validates: Requirements 5.5**

### Property 21: Repair utility regenerates posts with template variables
*For any* blog post with template variables, the repair utility should attempt to regenerate the content
**Validates: Requirements 6.2**

### Property 22: Repair utility fixes broken images
*For any* blog post with an invalid image URL, the repair utility should replace it with a valid fallback
**Validates: Requirements 6.3**

### Property 23: Unrepairable posts are flagged
*For any* post that cannot be automatically repaired, it should be marked in the repair report
**Validates: Requirements 6.5**

### Property 24: Malformed posts don't break the index
*For any* set of posts where one has malformed JSON, the blog index should render the valid posts
**Validates: Requirements 7.1**

### Property 25: Image load failures use fallback
*For any* blog post with a broken image, the fallback image should display without breaking the layout
**Validates: Requirements 7.2**

### Property 26: Malformed JSON is excluded
*For any* malformed JSON file in the content directory, ContentStore.getAllPosts should skip it and log an error
**Validates: Requirements 7.3**

### Property 27: Generator failures return errors
*For any* generator failure scenario, AutomatedContentGenerator should return an error object without throwing
**Validates: Requirements 7.4**

### Property 28: Operations log errors with context
*For any* blog operation that fails, the error log should contain sufficient context for debugging
**Validates: Requirements 7.5**

### Property 29: Duplicate detection identifies similar titles
*For any* new post title and set of existing posts, the duplicate check should identify titles with >50% word overlap
**Validates: Requirements 8.1**

### Property 30: Duplicates prevent publication
*For any* duplicate post, the save operation should fail with a specific duplicate error
**Validates: Requirements 8.2**

### Property 31: Content quality validation
*For any* content string, quality checks should validate minimum word count and proper HTML structure
**Validates: Requirements 8.3**

### Property 32: SEO metadata is optimized
*For any* generated SEO metadata, the title should be 50-60 characters and description should be 150-160 characters
**Validates: Requirements 8.4**

### Property 33: Quality failures provide feedback
*For any* post failing quality checks, the validation result should contain specific, actionable feedback
**Validates: Requirements 8.5**

## Error Handling

### Error Categories

1. **Validation Errors** - Data doesn't meet quality standards
   - Template variables in content
   - Invalid field lengths
   - Missing required fields
   - Broken image URLs

2. **System Errors** - Infrastructure failures
   - File system errors
   - Network errors (image validation, AI API)
   - JSON parsing errors

3. **Generation Errors** - AI content creation failures
   - API rate limits
   - Invalid AI responses
   - Timeout errors

### Error Handling Strategy

```typescript
// Graceful degradation for blog index
try {
  const posts = await store.getAllPosts(locale);
  // Filter and validate
} catch (error) {
  console.error('Blog index error:', error);
  // Return empty array, show user-friendly message
  return { props: { blogPosts: [], errors: ['Unable to load posts'] } };
}

// Retry logic for generator
async generateWithRetry(topic: string, maxAttempts: number = 3): Promise<GenerationResult> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const post = await this.generateBlogPost(topic);
      const validation = this.validator.validatePost(post);
      
      if (validation.valid) {
        return { success: true, post, validation, attempts: attempt };
      }
      
      console.warn(`Attempt ${attempt} failed validation:`, validation.errors);
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === maxAttempts) {
        return {
          success: false,
          validation: { valid: false, errors: [{ field: 'system', message: error.message }], warnings: [] },
          attempts: attempt
        };
      }
    }
  }
}

// Fallback for broken images
<Image
  src={post.image}
  alt={post.title}
  width={600}
  height={400}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/purrify-logo.png';
  }}
/>
```

### Logging Strategy

```typescript
// Structured logging for debugging
logger.error('Blog post validation failed', {
  slug: post.slug,
  errors: validation.errors,
  timestamp: new Date().toISOString(),
  context: 'ContentStore.savePost'
});

// Warning for non-critical issues
logger.warn('Post has warnings but is valid', {
  slug: post.slug,
  warnings: validation.warnings
});

// Info for successful operations
logger.info('Post repaired successfully', {
  slug: post.slug,
  issuesFixed: repairResult.issues
});
```

## Testing Strategy

### Unit Testing

Unit tests will cover specific validation logic and error handling:

1. **ContentValidator tests**
   - Test each validation rule individually
   - Test template variable detection with various patterns
   - Test HTML detection in excerpts
   - Test boundary conditions for length validation

2. **ContentStore tests**
   - Test save with valid and invalid posts
   - Test error handling for malformed JSON
   - Test filtering of invalid posts in getAllPosts

3. **AutomatedContentGenerator tests**
   - Test retry logic with mocked failures
   - Test validation of generated content
   - Test fallback image handling

4. **BlogRepairUtility tests**
   - Test scanning logic
   - Test repair operations for various issue types
   - Test report generation

### Property-Based Testing

Property-based tests will verify universal properties across many inputs using **fast-check** library for TypeScript/JavaScript. Each test will run a minimum of 100 iterations.

1. **Content validation properties**
   - Generate random blog posts and verify validation rules
   - Generate posts with template variables and verify rejection
   - Generate posts with various lengths and verify boundary checks

2. **Display properties**
   - Generate random posts and verify no template variables in rendered output
   - Generate posts with broken images and verify fallback display

3. **Generator properties**
   - Generate posts for random topics and verify all fields are valid
   - Verify no template variables in any generated content

4. **Repair properties**
   - Generate broken posts and verify repair fixes them
   - Verify repair report accuracy

### Integration Testing

Integration tests will verify end-to-end workflows:

1. **Blog index rendering** - Test that the page renders with mixed valid/invalid posts
2. **Post generation workflow** - Test complete flow from topic to published post
3. **Repair workflow** - Test scanning and repairing multiple posts
4. **Click interaction** - Test that post cards are fully clickable

### Test Configuration

```typescript
// fast-check configuration for property tests
import fc from 'fast-check';

// Arbitraries for generating test data
const blogPostArbitrary = fc.record({
  title: fc.string({ minLength: 10, maxLength: 100 }),
  excerpt: fc.string({ minLength: 50, maxLength: 200 }),
  content: fc.string({ minLength: 500 }),
  featuredImage: fc.record({
    url: fc.webUrl(),
    alt: fc.string(),
    width: fc.integer({ min: 400, max: 2000 }),
    height: fc.integer({ min: 300, max: 1500 })
  })
});

// Property test example
describe('ContentValidator', () => {
  it('should reject posts with template variables', () => {
    fc.assert(
      fc.property(blogPostArbitrary, (post) => {
        // Inject template variable
        const invalidPost = { ...post, title: '{meta.title}' };
        const result = validator.validatePost(invalidPost);
        return !result.valid;
      }),
      { numRuns: 100 }
    );
  });
});
```

## Implementation Notes

### Phase 1: Core Validation
1. Implement ContentValidator class
2. Add validation to ContentStore.savePost
3. Update blog index to filter invalid posts

### Phase 2: Generator Enhancement
1. Add validation to AutomatedContentGenerator
2. Implement retry logic
3. Add validation reporting

### Phase 3: Repair Utility
1. Implement BlogRepairUtility
2. Add scanning and repair logic
3. Create CLI tool for running repairs

### Phase 4: UI Improvements
1. Make blog post cards fully clickable
2. Improve image error handling
3. Add loading states and error messages

### Dependencies

- **fast-check** - Property-based testing library
- **zod** (optional) - Runtime type validation
- **sharp** - Image validation and optimization
- Existing: Next.js, React, TypeScript

### Performance Considerations

1. **Image validation** - Cache validation results to avoid repeated HTTP requests
2. **Batch operations** - Process multiple posts in parallel during repair
3. **Lazy validation** - Only validate on save, not on every read
4. **Incremental builds** - Use Next.js ISR to avoid rebuilding all posts

### Security Considerations

1. **XSS Prevention** - Sanitize HTML content before rendering
2. **Path Traversal** - Validate file paths in ContentStore
3. **API Key Protection** - Ensure AI API keys are not exposed
4. **Rate Limiting** - Implement rate limiting for AI generation

## Migration Plan

### Fixing Existing Broken Posts

1. Run BlogRepairUtility scan to identify all broken posts
2. Review scan report and prioritize repairs
3. Run automated repair for posts with template variables
4. Manually review posts that couldn't be auto-repaired
5. Verify all posts display correctly on blog index

### Deployment Strategy

1. Deploy validation logic first (non-breaking)
2. Run repair utility on staging environment
3. Verify repairs in staging
4. Deploy to production
5. Run repair utility in production
6. Monitor logs for any new validation errors

### Rollback Plan

If issues arise:
1. Revert code changes
2. Restore backup of content/blog directory
3. Investigate and fix issues
4. Redeploy with fixes
