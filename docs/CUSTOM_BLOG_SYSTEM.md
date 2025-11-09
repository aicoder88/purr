# Custom Blog System Documentation

## Overview

The Purrify Custom Blog System is a native, high-performance blog management solution built directly into the Next.js application. It provides enterprise-grade SEO, performance optimization, and multi-language support without external CMS dependencies.

## Features

- ✅ **File-based Content Storage** - Blog posts stored as JSON files in `content/blog/`
- ✅ **Rich Text Editor** - TipTap-based editor with formatting, images, and links
- ✅ **SEO Optimization** - Automatic meta tags, structured data, and sitemaps
- ✅ **Image Optimization** - Automatic AVIF/WebP generation with Sharp
- ✅ **Multi-language Support** - English, French, and Chinese translations
- ✅ **Auto-save** - Saves drafts every 30 seconds with localStorage backup
- ✅ **Real-time Feedback** - Character counts, SEO scores, reading time
- ✅ **Automated Content Generation** - AI-powered blog posts with OpenAI + Unsplash
- ✅ **Category & Tag Archives** - Dynamic archive pages with ISR
- ✅ **Sitemap Generation** - Automatic XML sitemaps with hreflang tags

## Getting Started

### 1. Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `OPENAI_API_KEY` - For automated content generation (optional)
- `UNSPLASH_ACCESS_KEY` - For automated image fetching (optional)
- `CRON_SECRET` - For securing cron endpoints

### 2. Create Content Directories

```bash
mkdir -p content/blog/en content/blog/fr content/blog/zh
mkdir -p public/optimized/blog
```

### 3. Initialize Categories and Tags

Create `content/categories.json`:

```json
[
  {
    "id": "tips",
    "name": "Tips & Tricks",
    "slug": "tips",
    "description": "Helpful tips for cat owners"
  },
  {
    "id": "odor-control",
    "name": "Odor Control",
    "slug": "odor-control",
    "description": "Solutions for eliminating cat litter odors"
  }
]
```

Create `content/tags.json`:

```json
[
  {
    "id": "cat-litter",
    "name": "Cat Litter",
    "slug": "cat-litter"
  },
  {
    "id": "odor-elimination",
    "name": "Odor Elimination",
    "slug": "odor-elimination"
  }
]
```

## Admin Interface

### Accessing the Admin

1. Navigate to `/admin/login`
2. Sign in with your admin credentials
3. Access the blog admin at `/admin/blog`

### Creating a Post

1. Click "New Post" in the admin dashboard
2. Enter a title and content
3. Select categories and tags
4. Upload a featured image
5. Click "Save Draft" or "Publish"

### Auto-save

- Posts auto-save every 30 seconds
- Drafts are backed up to localStorage
- Saving indicator shows in the header

### SEO Optimization

The editor provides real-time SEO feedback:
- **Title**: Should be 50-60 characters
- **Excerpt**: Should be 150-160 characters
- **SEO Score**: 0-100 based on optimization

## Content Structure

### Blog Post Format

Posts are stored as JSON files in `content/blog/{locale}/{slug}.json`:

```json
{
  "id": "1699564800000",
  "slug": "eliminate-cat-litter-odor",
  "title": "How to Eliminate Cat Litter Odor Naturally",
  "excerpt": "Discover proven methods to keep your home fresh...",
  "content": "<h2>Understanding Cat Litter Odor</h2><p>...</p>",
  "author": {
    "name": "Purrify Team"
  },
  "publishDate": "2024-11-09T12:00:00.000Z",
  "modifiedDate": "2024-11-09T12:00:00.000Z",
  "status": "published",
  "featuredImage": {
    "url": "/optimized/blog/eliminate-cat-litter-odor-1200w.webp",
    "alt": "Clean cat litter box",
    "width": 1200,
    "height": 630
  },
  "categories": ["tips", "odor-control"],
  "tags": ["cat-litter", "odor-elimination"],
  "locale": "en",
  "translations": {
    "fr": "eliminer-odeur-litiere-chat",
    "zh": "消除猫砂气味"
  },
  "seo": {
    "title": "How to Eliminate Cat Litter Odor Naturally",
    "description": "Discover proven methods to keep your home fresh and odor-free with natural cat litter deodorizing solutions.",
    "keywords": ["cat litter odor", "eliminate smell", "natural deodorizer"]
  },
  "readingTime": 5
}
```

## Automated Content Generation

### How It Works

1. Vercel cron job runs every 3 days at noon
2. Generates blog post using OpenAI GPT-4
3. Fetches relevant images from Unsplash
4. Optimizes images with Sharp
5. Publishes post automatically
6. Updates sitemaps

### Topic Rotation

Topics are defined in `/pages/api/cron/generate-blog-post.ts`:

```typescript
const topics = [
  'How to Eliminate Cat Litter Odor Naturally',
  'Best Practices for Multi-Cat Households',
  'Understanding Activated Carbon for Pet Odor Control',
  // ... more topics
];
```

### Manual Trigger

To manually generate a post:

```bash
curl -X POST https://your-domain.com/api/cron/generate-blog-post \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Image Optimization

### Upload Process

1. Images uploaded through the editor
2. Automatically optimized with Sharp
3. Generates AVIF, WebP, and JPG formats
4. Creates responsive sizes: 640w, 828w, 1200w, 1920w
5. Stores in `public/optimized/blog/`

### Manual Optimization

```bash
npm run optimize-images:enhanced
```

## SEO Features

### Meta Tags

Automatically generated for each post:
- Title (50-60 characters)
- Description (150-160 characters)
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Structured Data

JSON-LD schema for BlogPosting:
- Article metadata
- Author information
- Publisher details
- Publication dates

### Sitemaps

Generated automatically:
- `/sitemap-blog.xml` - All blog posts
- `/sitemap-blog-categories.xml` - Category archives
- `/sitemap-blog-tags.xml` - Tag archives

Update sitemaps manually:

```bash
curl -X POST https://your-domain.com/api/admin/blog/update-sitemap \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```

## Multi-language Support

### Creating Translations

1. Create post in English first
2. In the editor sidebar, click "Add Translation"
3. Select language (French or Chinese)
4. Create translated version
5. Link translations in the `translations` field

### Language Routes

- English: `/blog/post-slug`
- French: `/fr/blog/post-slug`
- Chinese: `/zh/blog/post-slug`

### Hreflang Tags

Automatically generated for translated posts to help search engines understand language variants.

## Performance

### Static Generation

- All blog pages use Next.js ISR
- Revalidation period: 3600 seconds (1 hour)
- Fallback: 'blocking' for new posts

### Image Optimization

- AVIF format (best compression)
- WebP format (wide support)
- JPG fallback (universal)
- Lazy loading below the fold
- Proper width/height to prevent CLS

### Caching

- Static assets: 1 year cache
- Blog pages: 1 hour revalidation
- Images: Immutable cache headers

## API Endpoints

### Admin Endpoints

- `GET /api/admin/blog/posts` - List all posts
- `POST /api/admin/blog/posts` - Create new post
- `PUT /api/admin/blog/posts` - Update post
- `GET /api/admin/blog/posts/[slug]` - Get single post
- `DELETE /api/admin/blog/posts/[slug]` - Delete post
- `POST /api/admin/blog/upload-image` - Upload image
- `POST /api/admin/blog/update-sitemap` - Regenerate sitemaps

### Public Endpoints

- `GET /blog` - Blog listing page
- `GET /blog/[slug]` - Single post page
- `GET /blog/category/[slug]` - Category archive
- `GET /blog/tag/[slug]` - Tag archive

### Cron Endpoints

- `POST /api/cron/generate-blog-post` - Generate automated post

## Troubleshooting

### Posts Not Showing

1. Check post status is "published"
2. Verify file exists in `content/blog/{locale}/`
3. Check ISR revalidation (wait up to 1 hour)
4. Clear Next.js cache: `rm -rf .next`

### Images Not Loading

1. Verify images in `public/optimized/blog/`
2. Check file permissions
3. Run image optimization: `npm run optimize-images:enhanced`

### Auto-save Not Working

1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check authentication session

### Automated Posts Failing

1. Verify `OPENAI_API_KEY` is set
2. Check `UNSPLASH_ACCESS_KEY` is configured
3. Review cron job logs in Vercel dashboard
4. Verify `CRON_SECRET` matches

## Development

### Local Development

```bash
npm run dev
```

Access admin at: `http://localhost:3000/admin/blog`

### Type Checking

```bash
npm run check-types
```

### Building

```bash
npm run build
```

## Deployment

### Vercel

1. Push to GitHub
2. Vercel auto-deploys
3. Cron jobs run automatically
4. Set environment variables in Vercel dashboard

### Environment Variables

Required in Vercel:
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `OPENAI_API_KEY` (optional)
- `UNSPLASH_ACCESS_KEY` (optional)
- `CRON_SECRET`

## Support

For issues or questions:
- Check this documentation
- Review the design document: `.kiro/specs/custom-blog-system/design.md`
- Check requirements: `.kiro/specs/custom-blog-system/requirements.md`
