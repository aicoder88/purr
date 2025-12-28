# Blog Content Quality System

## Overview

The Blog Content Quality System ensures all blog posts meet high standards for content, images, and user experience. It provides validation, error handling, and automated repair capabilities.

## Components

### 1. ContentValidator

Validates blog post data before saving or displaying.

**Location:** `src/lib/blog/content-validator.ts`

**Key Features:**
- Template variable detection (e.g., `{meta.title}`)
- HTML tag detection in excerpts
- Length validation for title, excerpt, and content
- Image URL validation
- Duplicate post detection
- Content quality assessment

**Usage:**
```typescript
import { ContentValidator } from '@/lib/blog/content-validator';

const validator = new ContentValidator();
const result = validator.validatePost(post);

if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

### 2. Enhanced ContentStore

Filesystem-backed storage with built-in validation.

**Location:** `src/lib/blog/content-store.ts`

**Key Features:**
- Validates posts before saving
- Filters invalid posts from listings
- Checks for duplicate titles
- Runs quality validation
- Comprehensive error logging

**Usage:**
```typescript
import { ContentStore } from '@/lib/blog/content-store';

const store = new ContentStore();

// Save with validation
const result = await store.savePost(post);
if (!result.success) {
  console.error('Save failed:', result.validation.errors);
}

// Get all valid posts
const posts = await store.getAllPosts('en');
```

### 3. Enhanced AutomatedContentGenerator

AI-powered blog post generation with validation and retry logic.

**Location:** `src/lib/blog/automated-content-generator.ts`

**Key Features:**
- Validates AI-generated content
- Retries on validation failures (up to 3 attempts)
- Ensures valid featured images
- Returns structured validation reports

**Usage:**
```typescript
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';

const generator = new AutomatedContentGenerator();

const result = await generator.generateBlogPost('Cat Litter Tips');

if (result.success && result.post) {
  await generator.publishPost(result.post);
  console.log(`Published: ${result.post.title}`);
} else {
  console.error('Generation failed:', result.validation.errors);
}
```

### 4. BlogRepairUtility

Scans and repairs broken blog posts.

**Location:** `src/lib/blog/blog-repair-utility.ts`

**Key Features:**
- Scans all posts for issues
- Repairs template variables
- Fixes broken images
- Generates detailed reports

**Usage:**
```typescript
import { BlogRepairUtility } from '@/lib/blog/blog-repair-utility';

const utility = new BlogRepairUtility();

// Scan for issues
const scanReport = await utility.scanAllPosts('en');
console.log(`Found ${scanReport.postsWithIssues.length} posts with issues`);

// Repair all posts
const repairReport = await utility.repairAllPosts('en');
console.log(`Repaired ${repairReport.totalRepaired} posts`);
```

## CLI Commands

### Scan Blog Posts

Check all posts for quality issues:

```bash
npm run repair-blog -- en scan
```

### Repair All Posts

Automatically fix all broken posts:

```bash
npm run repair-blog -- en repair
```

### Repair Single Post

Fix a specific post by slug:

```bash
npm run repair-blog -- en repair-one <slug>
```

## Validation Rules

### Title
- **Length:** 10-100 characters
- **No template variables:** `{meta.title}`, `${variable}`
- **No HTML tags**

### Excerpt
- **Length:** 50-200 characters
- **No template variables**
- **No HTML tags**

### Content
- **Minimum text length:** 500 characters (after stripping HTML)
- **No template variables**
- **Valid HTML structure**

### Featured Image
- **Required fields:** url, alt, width, height
- **Valid URL format**
- **No template variables in alt text**

### SEO Metadata
- **Title:** 50-60 characters (recommended)
- **Description:** 150-160 characters (recommended)
- **Keywords:** At least one keyword

## Error Handling

### Validation Errors

When validation fails, you'll receive detailed error messages:

```typescript
{
  valid: false,
  errors: [
    {
      field: 'title',
      message: 'Title contains template variables',
      value: '{meta.title}'
    }
  ],
  warnings: []
}
```

### Common Issues and Fixes

#### Template Variables in Content

**Issue:** Post displays `{meta.title}` instead of actual title

**Fix:**
```bash
npm run repair-blog -- en repair-one <slug>
```

Or manually edit the JSON file to replace template variables with actual content.

#### Broken Featured Image

**Issue:** Image fails to load

**Fix:** The system automatically falls back to `/purrify-logo.png`. To use a different image:

```typescript
post.featuredImage = {
  url: '/path/to/image.jpg',
  alt: 'Descriptive alt text',
  width: 1200,
  height: 630
};
```

#### Duplicate Post Detection

**Issue:** Cannot save post with similar title

**Fix:** Modify the title to be more unique, or update the existing post instead of creating a new one.

## Best Practices

### 1. Always Validate Before Saving

```typescript
const validation = validator.validatePost(post);
if (!validation.valid) {
  // Handle errors before saving
  return;
}
await store.savePost(post);
```

### 2. Use the Automated Generator

The generator includes built-in validation and retry logic:

```typescript
const result = await generator.generateBlogPost(topic);
// Post is already validated and ready to publish
```

### 3. Run Regular Scans

Schedule periodic scans to catch issues early:

```bash
# Add to cron or CI/CD pipeline
npm run repair-blog -- en scan
```

### 4. Monitor Logs

All validation failures are logged with context:

```
✅ Successfully saved post: how-to-eliminate-cat-litter-odor
⚠️ Post has warnings: most-powerful-odor-absorber
❌ Validation failed for post: broken-post
```

## Integration with Existing Systems

### Blog Index Page

The blog index automatically filters invalid posts:

```typescript
// pages/blog/index.tsx
const posts = await store.getAllPosts(locale);
// Only valid posts are returned
```

### Automated Blog Generation

The cron job uses the enhanced generator:

```typescript
// pages/api/cron/generate-blog-post.ts
const result = await generator.generateBlogPost(topic);
if (result.success) {
  await generator.publishPost(result.post);
}
```

### Image Fallback

Blog post cards handle broken images gracefully:

```tsx
<Image
  src={post.image || '/purrify-logo.png'}
  alt={post.title}
  onError={(e) => {
    e.target.src = '/purrify-logo.png';
  }}
/>
```

## Troubleshooting

### Posts Not Appearing on Blog Index

1. Check if post is published: `status: 'published'`
2. Run validation: `npm run repair-blog -- en scan`
3. Check console logs for validation errors

### Generator Failing

1. Check API keys: `ANTHROPIC_API_KEY`, `FAL_API_KEY`
2. Review validation errors in logs
3. Try with `force` flag: `?force=true`

### Repair Utility Not Fixing Issues

Some issues require manual intervention:
- Complex content structure problems
- Missing required fields
- Corrupted JSON files

For these cases, manually edit the JSON file or regenerate the post.

## Future Enhancements

- [ ] Property-based testing for validation rules
- [ ] Automated image generation for posts without images
- [ ] Content quality scoring system
- [ ] A/B testing for titles and excerpts
- [ ] Automated SEO optimization suggestions
