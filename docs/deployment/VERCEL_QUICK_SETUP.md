# Vercel Environment Variables - Quick Setup

## Copy-Paste Ready

### In Vercel Dashboard

**Settings → Environment Variables → Add New**

---

### Variable 1: Claude API

**Name:**
```
ANTHROPIC_API_KEY
```

**Value:** (paste your Claude API key)
```
sk-ant-api03-[your-key]
```

**Environments:** ✅ Production, ✅ Preview

---

### Variable 2: fal.ai API

**Name:**
```
FAL_API_KEY
```

**Value:** (paste your fal.ai API key)
```
[your-fal-key]
```

**Environments:** ✅ Production, ✅ Preview

---

## After Adding Variables

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

---

## Get Your API Keys

**Claude:** https://console.anthropic.com/ → API Keys → Create Key

**fal.ai:** https://fal.ai/ → Dashboard → API Keys → Create API Key

---

## Test It Works

1. Go to: `https://your-site.vercel.app/admin/blog/new`
2. Click "Generate with AI"
3. Fill in topic
4. Click "Generate Content"
5. ✅ Content and image should generate

---

## Costs

- **Claude:** ~$0.015 per blog post
- **fal.ai:** ~$0.05 per image
- **Total:** ~$6.50 for 100 blog posts/month

---

## Troubleshooting

**Not working?**
- Check variable names are EXACT (case-sensitive)
- Make sure you redeployed after adding
- Check keys are valid in API dashboards

**Need help?** See `docs/VERCEL_ENV_SETUP.md` for detailed guide.
