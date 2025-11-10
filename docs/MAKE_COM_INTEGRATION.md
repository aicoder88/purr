# Make.com Webhook Integration Guide

## Overview

The Purrify blog system supports automated blog post generation via Make.com webhooks. This allows you to trigger blog post creation from your existing Make.com scenarios.

## Webhook Endpoint

```
POST https://purrify.ca/api/webhooks/generate-blog-post
```

## Authentication

All webhook requests must include a secret token for authentication:

```json
{
  "secret": "your-webhook-secret"
}
```

Set the `WEBHOOK_SECRET` environment variable in your Vercel project settings.

## Operation Modes

### Mode 1: Generate (AI-Generated Content)

Let the AI generate complete blog post content from a topic.

**Request:**
```json
{
  "secret": "your-webhook-secret",
  "mode": "generate",
  "topic": "How to Eliminate Cat Litter Odor Naturally",
  "keywords": ["cat litter", "odor control", "natural solutions"],
  "targetWordCount": 1200,
  "locale": "en"
}
```

**Response (Success):**
```json
{
  "success": true,
  "post": {
    "id": "1762817354142",
    "slug": "how-to-eliminate-cat-litter-odor-naturally",
    "title": "How to Eliminate Cat Litter Odor Naturally",
    "url": "https://purrify.ca/blog/how-to-eliminate-cat-litter-odor-naturally",
    "publishDate": "2024-11-10T23:29:14.142Z"
  }
}
```

**Response (Duplicate Detected):**
```json
{
  "success": false,
  "error": "Similar post already exists",
  "details": {
    "suggestion": "Try a different topic or check existing posts"
  }
}
```

### Mode 2: Publish (Provided Content)

Publish blog post content that you provide.

**Request:**
```json
{
  "secret": "your-webhook-secret",
  "mode": "publish",
  "post": {
    "title": "Your Custom Blog Post Title",
    "content": "<h2>Introduction</h2><p>Your HTML content here...</p>",
    "excerpt": "A brief summary of your post (150-160 characters)",
    "categories": ["Tips", "Odor Control"],
    "tags": ["cat litter", "odor elimination", "pet care"],
    "featuredImageUrl": "https://example.com/image.jpg",
    "seo": {
      "title": "SEO-Optimized Title (50-60 chars)",
      "description": "SEO description (150-160 chars)",
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "post": {
    "id": "1762817354142",
    "slug": "your-custom-blog-post-title",
    "title": "Your Custom Blog Post Title",
    "url": "https://purrify.ca/blog/your-custom-blog-post-title",
    "publishDate": "2024-11-10T23:29:14.142Z"
  }
}
```

## Make.com Scenario Setup

### Step 1: Create HTTP Module

1. Add an **HTTP** module to your scenario
2. Set **Method**: POST
3. Set **URL**: `https://purrify.ca/api/webhooks/generate-blog-post`
4. Set **Headers**:
   ```
   Content-Type: application/json
   ```

### Step 2: Configure Request Body

For **Generate Mode**:
```json
{
  "secret": "{{env.WEBHOOK_SECRET}}",
  "mode": "generate",
  "topic": "{{topic}}",
  "keywords": {{keywords}},
  "locale": "en"
}
```

For **Publish Mode**:
```json
{
  "secret": "{{env.WEBHOOK_SECRET}}",
  "mode": "publish",
  "post": {
    "title": "{{title}}",
    "content": "{{content}}",
    "excerpt": "{{excerpt}}",
    "categories": {{categories}},
    "tags": {{tags}},
    "featuredImageUrl": "{{imageUrl}}"
  }
}
```

### Step 3: Handle Response

Add a **Router** module to handle success/error responses:

**Success Path** (status 200):
- Send notification (Email, Slack, etc.)
- Log to Google Sheets
- Share on social media
- Update your content calendar

**Error Path** (status 4xx/5xx):
- Send alert notification
- Log error details
- Retry with different parameters

### Example Scenario Flow

```
[Trigger: Schedule/Manual/RSS]
    ↓
[Data Processing: Prepare topic/content]
    ↓
[HTTP: Call webhook]
    ↓
[Router: Check response]
    ├─ Success → [Notify] → [Log] → [Share]
    └─ Error → [Alert] → [Retry]
```

## Environment Variables

Set these in your Vercel project:

```env
# Required
WEBHOOK_SECRET=your-secure-random-string
ENABLE_WEBHOOK_AUTOMATION=true

# For AI generation
OPENAI_API_KEY=sk-...
UNSPLASH_ACCESS_KEY=...

# Optional: Disable cron if using only webhooks
ENABLE_CRON_AUTOMATION=false
```

## Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 200 | Success | Post created successfully |
| 400 | Bad Request | Invalid payload format |
| 401 | Unauthorized | Invalid secret token |
| 405 | Method Not Allowed | Only POST requests accepted |
| 409 | Conflict | Duplicate post detected |
| 500 | Internal Server Error | Server error during processing |
| 503 | Service Unavailable | Webhook automation disabled |

## Duplicate Prevention

The system automatically checks for duplicate posts by comparing titles:

- Compares significant words (> 3 characters)
- If > 50% of words match an existing post, it's considered a duplicate
- Returns 409 status code with suggestion to try a different topic

## Rate Limiting

**Recommendations:**
- Maximum 10 requests per hour
- Wait at least 5 minutes between requests
- Implement exponential backoff for retries

## Testing

### Test with cURL

**Generate Mode:**
```bash
curl -X POST https://purrify.ca/api/webhooks/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-webhook-secret",
    "mode": "generate",
    "topic": "Test Blog Post",
    "keywords": ["test", "blog"]
  }'
```

**Publish Mode:**
```bash
curl -X POST https://purrify.ca/api/webhooks/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-webhook-secret",
    "mode": "publish",
    "post": {
      "title": "Test Post",
      "content": "<p>Test content</p>",
      "categories": ["Tips"],
      "tags": ["test"]
    }
  }'
```

## Best Practices

### Topic Selection (Generate Mode)
- Be specific: "How to Reduce Cat Litter Odor in Small Apartments"
- Include keywords: "activated carbon", "odor control", "natural"
- Avoid duplicates: Check existing posts first
- Rotate topics: Don't repeat the same topic too often

### Content Quality (Publish Mode)
- Use proper HTML formatting
- Include H2 and H3 headings
- Keep paragraphs short (2-3 sentences)
- Add internal links to Purrify products
- Optimize images before uploading

### SEO Optimization
- Title: 50-60 characters
- Description: 150-160 characters
- Keywords: 5-8 relevant terms
- Featured image: High quality, relevant
- Content: 1000-1500 words

## Monitoring

### Success Metrics
- Check response status code
- Verify post URL is accessible
- Monitor Google Search Console for indexing
- Track traffic in Google Analytics

### Error Handling
- Log all webhook calls
- Alert on failures
- Retry with exponential backoff
- Review error details in logs

## Troubleshooting

### "Invalid secret" Error
- Check `WEBHOOK_SECRET` environment variable
- Ensure secret matches in Make.com and Vercel
- No extra spaces or quotes

### "Similar post already exists" Error
- Check existing posts: https://purrify.ca/blog
- Try a different topic or angle
- Add more specific keywords

### "Webhook automation is disabled" Error
- Set `ENABLE_WEBHOOK_AUTOMATION=true` in Vercel
- Redeploy after changing environment variables

### Timeout Errors
- AI generation can take 30-60 seconds
- Set Make.com timeout to 120 seconds
- Implement retry logic

## Integration Examples

### Example 1: RSS Feed to Blog
```
[RSS Trigger: New item]
    ↓
[Extract: Title, description]
    ↓
[HTTP: Generate blog post]
    ↓
[Success: Share on social media]
```

### Example 2: Google Sheets to Blog
```
[Google Sheets: New row]
    ↓
[Parse: Topic, keywords]
    ↓
[HTTP: Generate blog post]
    ↓
[Update Sheet: Add URL]
```

### Example 3: Manual Content Publishing
```
[Manual Trigger: Button]
    ↓
[Input: Title, content]
    ↓
[HTTP: Publish blog post]
    ↓
[Notify: Email confirmation]
```

## Support

For issues or questions:
1. Check the error response details
2. Review Vercel function logs
3. Test with cURL first
4. Verify environment variables

## Next Steps

1. Set up your Make.com scenario
2. Test with a simple topic
3. Monitor the results
4. Automate your content workflow
5. Scale up production

---

**Last Updated**: November 10, 2024  
**Version**: 1.0.0
