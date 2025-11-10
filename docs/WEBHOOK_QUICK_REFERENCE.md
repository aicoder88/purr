# Webhook Quick Reference Card

## Endpoint
```
POST https://purrify.ca/api/webhooks/generate-blog-post
```

## Generate Mode (AI Content)
```json
{
  "secret": "your-webhook-secret",
  "mode": "generate",
  "topic": "Your Blog Topic Here",
  "keywords": ["keyword1", "keyword2"],
  "targetWordCount": 1200,
  "locale": "en"
}
```

## Publish Mode (Custom Content)
```json
{
  "secret": "your-webhook-secret",
  "mode": "publish",
  "post": {
    "title": "Your Title",
    "content": "<h2>Heading</h2><p>Content...</p>",
    "excerpt": "Brief summary (150-160 chars)",
    "categories": ["Tips", "Odor Control"],
    "tags": ["tag1", "tag2"],
    "featuredImageUrl": "https://example.com/image.jpg"
  }
}
```

## Success Response
```json
{
  "success": true,
  "post": {
    "id": "1762817354142",
    "slug": "your-blog-post-slug",
    "title": "Your Blog Post Title",
    "url": "https://purrify.ca/blog/your-blog-post-slug",
    "publishDate": "2024-11-10T23:29:14.142Z"
  }
}
```

## Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": {}
}
```

## Status Codes
- `200` - Success
- `400` - Bad request
- `401` - Invalid secret
- `409` - Duplicate post
- `500` - Server error
- `503` - Automation disabled

## Environment Variables
```env
WEBHOOK_SECRET=your-secret-here
ENABLE_WEBHOOK_AUTOMATION=true
OPENAI_API_KEY=sk-...
UNSPLASH_ACCESS_KEY=...
```

## cURL Test
```bash
curl -X POST https://purrify.ca/api/webhooks/generate-blog-post \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-secret","mode":"generate","topic":"Test Post"}'
```

## Make.com Setup
1. HTTP Module → POST
2. URL: `https://purrify.ca/api/webhooks/generate-blog-post`
3. Body: JSON with secret + mode + data
4. Router: Handle 200 (success) vs 4xx/5xx (error)

## Tips
- Title: 50-60 characters
- Description: 150-160 characters
- Content: 1000-1500 words
- Keywords: 5-8 relevant terms
- Check for duplicates first
- Wait 5+ minutes between requests
