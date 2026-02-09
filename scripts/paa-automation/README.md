# PAA Automation System for Purrify.ca

Complete automation toolkit for scraping People Also Ask questions and generating content without manual Google searching or Perplexity.

---

## Option 1: Third-Party APIs (Recommended - Most Reliable)

### AlsoAsked API
AlsoAsked offers an API for programmatic PAA access.

**Pricing:** ~$15-50/month depending on volume
**Pros:** Reliable, no blocking, structured data
**Cons:** Paid, rate limited

### Answer Socrates
Has API access with generous free tier.

**Pricing:** Free tier (50 searches/day), paid plans available
**Pros:** Good free tier, CSV export
**Cons:** Less data depth than AlsoAsked

### SERP APIs (Scalable but Expensive)
- **SerpApi** - $50/month+, very reliable
- **ScraperAPI** - $49/month+, good for high volume
- **DataForSEO** - Pay-as-you-go, great for bulk

---

## Option 2: Browser Automation (Free but Fragile)

Use Playwright to scrape Google PAA. Google actively blocks automation, so you'll need:
- Rotating proxies (residential/mobile)
- Anti-detection measures
- Retry logic

See `scrape-paa-playwright.js` for implementation.

**Warning:** This violates Google's Terms of Service. Use at your own risk.

---

## Option 3: Hybrid Approach (Best Balance)

1. Use **Answer Socrates free tier** to get initial PAA questions
2. Use **OpenRouter API** (cheap LLM access) to generate answers
3. Automate page creation with the existing `generate-paa-page.js` script

This is the recommended approach for cost vs. reliability.

---

## Quick Start: Hybrid Approach

```bash
# 1. Get PAA questions from Answer Socrates (free)
# Visit: https://answersocrates.com/
# Export to CSV: paa-questions.csv

# 2. Generate answers with local script
node scripts/paa-automation/generate-answers.js paa-questions.csv

# 3. Create pages
node scripts/generate-paa-page.js "Your Question Here"
# (then paste the generated answer into the file)
```

---

## File Overview

| File | Purpose |
|------|---------|
| `scrape-paa-playwright.js` | Scrape Google PAA (requires proxies) |
| `generate-answers.js` | Generate answers using OpenRouter API |
| `alsoasked-api.js` | AlsoAsked API integration |
| `bulk-page-generator.js` | Create multiple pages from CSV |

---

## Cost Comparison

| Method | Cost | Reliability | Setup |
|--------|------|-------------|-------|
| Manual + Perplexity | Free* | High | None |
| Answer Socrates + OpenRouter | ~$5/month | Medium | Low |
| AlsoAsked API + OpenRouter | ~$25/month | High | Low |
| SERP API + OpenRouter | ~$75/month | Very High | Medium |
| Playwright + Proxies | ~$50/month | Low | High |

*Your time has value!

---

## Recommended Workflow

1. **Bulk Research Phase:**
   - Use Answer Socrates free tier
   - Export 50 PAA questions to CSV
   - Run `generate-answers.js` to get AI answers

2. **Content Generation Phase:**
   - Review/edit answers (5 mins each)
   - Use `bulk-page-generator.js` to create all pages

3. **Deployment Phase:**
   - Add questions to hub page
   - Submit to GSC
   - Monitor rankings

---

## API Keys Needed

Create `.env.local`:
```
OPENROUTER_API_KEY=your_key_here
ALSOASKED_API_KEY=your_key_here  # Optional
SERP_API_KEY=your_key_here       # Optional
```

Get free OpenRouter API key: https://openrouter.ai/
