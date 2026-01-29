# Blog AI API Configuration

## Overview

The blog system uses two AI services for content generation and image creation:
1. **Claude API** (Anthropic) - For generating blog post content
2. **fal.ai Flux Pro** - For generating featured images

## Required Environment Variables

Add these to your `.env` or `.env.local` file:

```bash
# Claude API for content generation (REQUIRED)
ANTHROPIC_API_KEY=your_claude_api_key_here

# fal.ai for AI image generation (RECOMMENDED)
FAL_API_KEY=your_fal_api_key_here
```

**Note:** If `FAL_API_KEY` is not set, the system will use the default Purrify logo for featured images.

## Getting API Keys

### Claude API (Anthropic)

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add to `.env` as `ANTHROPIC_API_KEY`

**Model Used**: `claude-3-5-sonnet-20241022`

**Features**:
- High-quality content generation
- 4000 token output for long-form content
- JSON-formatted responses
- Configurable tone, length, and audience

### fal.ai API

1. Go to [https://fal.ai/](https://fal.ai/)
2. Sign up or log in
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy the key and add to `.env` as `FAL_API_KEY`

**Model Used**: `fal-ai/flux-pro`

**Features**:
- Professional quality images
- Landscape 16:9 format (perfect for blog headers)
- Safety checker enabled
- Automatic optimization and WebP conversion



## How It Works

### Content Generation Flow

1. User configures generation options (tone, length, audience, keywords)
2. System builds a detailed prompt based on configuration
3. Claude API generates structured content in JSON format
4. Content includes: title, excerpt, HTML body, categories, tags, SEO keywords
5. Generation is saved to history for reuse

### Image Generation Flow

1. System extracts topic from blog post title
2. Builds image prompt: "Professional blog featured image: [topic]. High quality, clean, modern aesthetic. No text or watermarks."
3. fal.ai Flux Pro generates image (landscape 16:9)
4. Image is downloaded and optimized using existing image optimizer
5. WebP versions created for performance
6. If fal.ai is not configured or fails, uses default Purrify logo

## API Usage & Costs

### Claude API Pricing

- **Model**: Claude 3.5 Sonnet
- **Input**: ~$3 per million tokens
- **Output**: ~$15 per million tokens
- **Typical blog post**: ~1000 output tokens = ~$0.015 per post

### fal.ai Pricing

- **Model**: Flux Pro
- **Cost**: ~$0.05 per image
- **Typical usage**: 1 image per blog post

### Estimated Monthly Costs

For 100 blog posts per month:
- Content generation: ~$1.50
- Image generation: ~$5.00
- **Total**: ~$6.50/month

## Configuration Options

### Content Generation

```typescript
{
  topic: string;                    // Main topic
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  length: 'short' | 'medium' | 'long';  // 500-800, 1000-1500, 2000-2500 words
  targetAudience: 'beginners' | 'intermediate' | 'experts';
  keywords: string[];               // SEO keywords to include
  templateId?: string;              // Optional content template
  includeImages: boolean;           // Generate AI images
  imageCount: number;               // Number of images (1-5)
}
```

### Image Generation

```typescript
{
  prompt: string;                   // Image description
  image_size: 'landscape_16_9';     // Fixed for blog headers
  num_inference_steps: 28;          // Quality (higher = better)
  guidance_scale: 3.5;              // Prompt adherence
  num_images: 1;                    // Always 1 for featured image
  enable_safety_checker: true;      // Content safety
}
```

## Testing the Setup

### Test Content Generation

```bash
# In your terminal
curl -X POST http://localhost:3000/api/admin/blog/generate-content \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "How to Eliminate Cat Litter Odor",
    "tone": "friendly",
    "length": "medium",
    "targetAudience": "beginners",
    "keywords": ["cat litter", "odor control"],
    "includeImages": true,
    "imageCount": 1
  }'
```

### Test Image Generation

The image generation is automatic when creating content with `includeImages: true`. Check the console logs for:
- `Generating AI image for: [topic]`
- `AI image generated successfully`
- Or fallback message if using default image

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"

**Solution**: Add your Claude API key to `.env`:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### "Claude API error: 401"

**Solution**: Your API key is invalid or expired. Generate a new one from the Anthropic console.

### "Claude API error: 429"

**Solution**: You've hit rate limits. Wait a few minutes or upgrade your plan.

### "FAL_API_KEY not configured"

**Solution**: Add your fal.ai API key to `.env`:
```bash
FAL_API_KEY=your-fal-key-here
```

**Note**: This is a warning, not an error. The system will use the default Purrify logo for featured images.

### "fal.ai API error: 402"

**Solution**: You've run out of credits. Add credits to your fal.ai account.

### Images not appearing

**Checklist**:
1. Check `FAL_API_KEY` is set correctly
2. Check fal.ai account has credits
3. Check `public/optimized/` directory exists and is writable
4. Check console logs for error messages
5. Verify default Purrify logo is being used as fallback

### Content quality issues

**Solutions**:
- Adjust `tone` parameter for different writing styles
- Use `templateId` for structured content
- Add more specific `keywords` for better SEO
- Increase `length` for more detailed content
- Change `targetAudience` to match reader level

## Advanced Features

### Content Templates

Use pre-built templates for consistent structure:
- `how-to-guide` - Step-by-step instructions
- `product-comparison` - Compare solutions
- `problem-solution` - Address common issues
- `listicle` - Numbered tips
- `ultimate-guide` - Comprehensive content

### Generation History

All generations are automatically saved to `content/generation-history/`:
- Reuse previous generations
- Compare variations
- Track what works best
- Avoid duplicate content

### Section Regeneration

Regenerate specific sections without losing other content:
```typescript
await generator.regenerateSection(content, sectionIndex);
```

### Multiple Variations

Generate multiple versions for A/B testing:
```typescript
const variations = await generator.getVariations(topic, 3);
```

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate keys regularly** (every 90 days)
4. **Monitor usage** to detect unauthorized access
5. **Set spending limits** in API dashboards
6. **Use separate keys** for development and production

## Production Deployment

### Vercel

Add environment variables in project settings:
1. Go to Project Settings → Environment Variables
2. Add `ANTHROPIC_API_KEY`
3. Add `FAL_API_KEY`
4. Add `UNSPLASH_ACCESS_KEY` (optional)
5. Redeploy

### Other Platforms

Ensure environment variables are set in your hosting platform's configuration.

## Support

For API-specific issues:
- **Claude**: [Anthropic Support](https://support.anthropic.com/)
- **fal.ai**: [fal.ai Discord](https://discord.gg/fal-ai)

For implementation issues, check the blog system documentation or create an issue in the repository.
