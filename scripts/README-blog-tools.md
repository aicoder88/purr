# Blog Validation Tools

This directory contains Node.js scripts for validating, syncing, and fixing blog post content across all locales (en, fr, zh, es).

## Scripts Overview

### 1. `validate-blog-posts.js`

Comprehensive validation tool that checks all blog posts for errors and inconsistencies.

**What it does:**
- Validates JSON syntax for all blog posts
- Checks required fields (title, slug, content, excerpt, featuredImage, etc.)
- Verifies all referenced images exist in `public/optimized/` or `public/images/`
- Compares content length across translations
- Reports missing translations
- Validates SEO fields and dates

**Usage:**
```bash
# Standard validation with colored console output
node scripts/validate-blog-posts.js

# Output report as JSON (useful for CI/CD)
node scripts/validate-blog-posts.js --json

# Attempt to auto-fix minor issues (coming soon)
node scripts/validate-blog-posts.js --fix
```

**Exit codes:**
- `0` - All validations passed
- `1` - Errors found

---

### 2. `sync-blog-images.js`

Synchronizes image URLs across all translations to match the English version.

**What it does:**
- Reads the English version of each blog post
- Updates FR, ZH, ES versions to use the SAME image URLs as EN
- Updates `featuredImage.url` to match English
- Updates all `<img src="...">` in content to match English
- Preserves translated `alt` text (only changes URLs)
- Updates SEO `ogImage` fields

**Why use this:**
- Ensures consistent image usage across all languages
- Prevents broken images when English content is updated
- Reduces maintenance overhead (update images once in EN)

**Usage:**
```bash
# Preview changes without modifying files (recommended first step)
node scripts/sync-blog-images.js --dry-run

# Apply changes
node scripts/sync-blog-images.js

# Show detailed output for each file
node scripts/sync-blog-images.js --verbose

# Sync only specific locale
node scripts/sync-blog-images.js fr

# Sync specific blog post
node scripts/sync-blog-images.js --dry-run best-cat-litter-for-smell
```

**Exit codes:**
- `0` - Success
- `1` - Errors occurred

---

### 3. `fix-blog-image-paths.js`

Fixes legacy image paths (e.g., `/images/`) and maps them to `/optimized/` alternatives.

**What it does:**
- Finds all references to `/images/` (legacy paths)
- Maps them to appropriate `/optimized/` alternatives
- Handles different file extensions (.webp, .avif, etc.)
- Updates `featuredImage.url`, `seo.ogImage`, `author.avatar`, and content images
- Reports missing files that need attention

**Usage:**
```bash
# Preview changes without modifying files
node scripts/fix-blog-image-paths.js --dry-run

# Apply changes
node scripts/fix-blog-image-paths.js

# Show detailed output
node scripts/fix-blog-image-paths.js --verbose

# Process only specific locale
node scripts/fix-blog-image-paths.js --locale=fr
```

**Exit codes:**
- `0` - Success
- `1` - Errors occurred

---

## Typical Workflow

1. **Validate current state:**
   ```bash
   node scripts/validate-blog-posts.js
   ```

2. **Fix legacy image paths:**
   ```bash
   node scripts/fix-blog-image-paths.js --dry-run
   node scripts/fix-blog-image-paths.js
   ```

3. **Sync images across translations:**
   ```bash
   node scripts/sync-blog-images.js --dry-run
   node scripts/sync-blog-images.js
   ```

4. **Validate again to confirm fixes:**
   ```bash
   node scripts/validate-blog-posts.js
   ```

---

## Blog Post Structure

Blog posts are stored in `content/blog/{locale}/{slug}.json` with the following structure:

```json
{
  "id": "post-slug",
  "slug": "post-slug",
  "title": "Post Title",
  "excerpt": "Brief description",
  "content": "<article>HTML content with <img src=\"/optimized/image.webp\"></article>",
  "author": {
    "name": "Author Name",
    "avatar": "/optimized/avatar.webp"
  },
  "publishDate": "2026-01-01",
  "status": "published",
  "featuredImage": {
    "url": "/optimized/hero-image.webp",
    "alt": "Descriptive alt text",
    "width": 800,
    "height": 800
  },
  "locale": "en",
  "seo": {
    "metaTitle": "SEO Title",
    "metaDescription": "SEO description",
    "ogImage": "/optimized/hero-image.webp"
  }
}
```

---

## Adding to CI/CD

Add the validation script to your CI pipeline:

```yaml
# Example GitHub Actions step
- name: Validate Blog Posts
  run: node scripts/validate-blog-posts.js --json
```
