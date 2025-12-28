# Vercel Environment Variables Setup

## Required Environment Variables for Blog AI Features

Add these environment variables in your Vercel project settings:

**Project Settings → Environment Variables**

---

## 1. Claude API (Content Generation)

**Variable Name:**
```
ANTHROPIC_API_KEY
```

**Value:**
```
sk-ant-api03-[your-key-here]
```

**Where to get it:**
1. Go to https://console.anthropic.com/
2. Sign in or create account
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-api03-`)

**Used for:**
- Generating blog post content
- Creating titles, excerpts, and body text
- SEO keyword optimization
- Content templates

**Cost:** ~$0.015 per blog post

---

## 2. fal.ai API (Image Generation)

**Variable Name:**
```
FAL_API_KEY
```

**Value:**
```
[your-fal-key-here]
```

**Where to get it:**
1. Go to https://fal.ai/
2. Sign in or create account
3. Navigate to "Dashboard" → "API Keys"
4. Click "Create API Key"
5. Copy the key

**Used for:**
- Generating AI featured images for blog posts
- Creating professional landscape images (16:9)
- Automatic image optimization

**Cost:** ~$0.05 per image

**Note:** If not set, system will use default Purrify logo for featured images.

---

## Environment Selection

When adding each variable in Vercel, select which environments to apply to:

- ✅ **Production** - Always enable
- ✅ **Preview** - Enable for testing in preview deployments
- ⚠️ **Development** - Optional (use local `.env.local` instead)

---

## Vercel Setup Steps

### Step 1: Access Environment Variables

1. Go to your Vercel dashboard
2. Select your project (purrify)
3. Click "Settings" tab
4. Click "Environment Variables" in sidebar

### Step 2: Add ANTHROPIC_API_KEY

1. Click "Add New" button
2. **Key:** `ANTHROPIC_API_KEY`
3. **Value:** Paste your Claude API key
4. **Environments:** Check Production and Preview
5. Click "Save"

### Step 3: Add FAL_API_KEY

1. Click "Add New" button
2. **Key:** `FAL_API_KEY`
3. **Value:** Paste your fal.ai API key
4. **Environments:** Check Production and Preview
5. Click "Save"

### Step 4: Redeploy

After adding environment variables:
1. Go to "Deployments" tab
2. Click "..." menu on latest deployment
3. Click "Redeploy"
4. Or push a new commit to trigger deployment

---

## Local Development Setup

For local development, create a `.env.local` file in your project root:

```bash
# .env.local (DO NOT COMMIT THIS FILE)

# Claude API for content generation
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# fal.ai for AI image generation
FAL_API_KEY=your-fal-key-here
```

**Important:** `.env.local` is already in `.gitignore` - never commit API keys!

---

## Testing the Setup

### Test in Vercel

After deployment, test the AI features:

1. Go to your deployed site: `https://your-site.vercel.app/admin/blog/new`
2. Click "Generate with AI" button
3. Fill in topic and options
4. Click "Generate Content"
5. Verify content and image are generated

### Check Logs

If something fails:
1. Go to Vercel dashboard → Deployments
2. Click on your deployment
3. Click "Functions" tab
4. Find `/api/admin/blog/generate-content`
5. Check logs for errors

Common errors:
- `ANTHROPIC_API_KEY not configured` - Variable not set or misspelled
- `Claude API error: 401` - Invalid API key
- `Claude API error: 429` - Rate limit exceeded
- `FAL_API_KEY not configured` - Warning only, will use default image

---

## Security Best Practices

### ✅ DO:
- Store keys in Vercel environment variables
- Use different keys for production and development
- Rotate keys every 90 days
- Monitor usage in API dashboards
- Set spending limits

### ❌ DON'T:
- Commit keys to Git
- Share keys in Slack/email
- Use production keys in development
- Expose keys in client-side code
- Leave unused keys active

---

## Cost Monitoring

### Claude API (Anthropic)
- Dashboard: https://console.anthropic.com/
- View usage: Settings → Billing
- Set limits: Settings → Billing → Usage Limits

### fal.ai
- Dashboard: https://fal.ai/dashboard
- View credits: Dashboard → Credits
- Add credits: Dashboard → Add Credits

### Estimated Monthly Costs

For 100 blog posts/month:
- Content: ~$1.50 (Claude)
- Images: ~$5.00 (fal.ai)
- **Total: ~$6.50/month**

---

## Troubleshooting

### Variables Not Working After Adding

**Solution:** Redeploy the project
```bash
# Option 1: Via Vercel dashboard
Deployments → Latest → ... → Redeploy

# Option 2: Push new commit
git commit --allow-empty -m "Trigger redeploy"
git push
```

### "Environment variable not found"

**Checklist:**
- [ ] Variable name is exactly `ANTHROPIC_API_KEY` (case-sensitive)
- [ ] Variable name is exactly `FAL_API_KEY` (case-sensitive)
- [ ] Variable is enabled for Production environment
- [ ] Project has been redeployed after adding variable
- [ ] No extra spaces in variable name or value

### API Key Invalid

**Claude:**
- Key should start with `sk-ant-api03-`
- Generate new key at https://console.anthropic.com/

**fal.ai:**
- Check key is active in dashboard
- Generate new key at https://fal.ai/dashboard

### Rate Limits

**Claude (429 error):**
- Free tier: 50 requests/day
- Upgrade at https://console.anthropic.com/settings/plans

**fal.ai (402 error):**
- Add credits at https://fal.ai/dashboard

---

## Quick Reference

| Variable | Required | Used For | Cost | Get Key |
|----------|----------|----------|------|---------|
| `ANTHROPIC_API_KEY` | Yes | Content generation | $0.015/post | [console.anthropic.com](https://console.anthropic.com/) |
| `FAL_API_KEY` | Recommended | AI images | $0.05/image | [fal.ai](https://fal.ai/) |

---

## Support

- **Vercel Issues:** https://vercel.com/support
- **Claude API:** https://support.anthropic.com/
- **fal.ai:** https://discord.gg/fal-ai

---

## Next Steps

After setting up environment variables:

1. ✅ Add both API keys to Vercel
2. ✅ Redeploy project
3. ✅ Test content generation
4. ✅ Test image generation
5. ✅ Monitor usage and costs
6. ✅ Set up billing alerts

Your blog AI features are now ready to use! 🎉
