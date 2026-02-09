# PAA Automation Quickstart Guide

## 🚀 Easiest Option: Full Auto Pipeline (Recommended)

### Step 1: Get API Keys

**OpenRouter** (FREE - $5 credit to start):
```bash
# Sign up at https://openrouter.ai/
# Get API key (free, pay-as-you-go)
# Add to .env.local:
echo "OPENROUTER_API_KEY=your_key_here" >> .env.local
```

**AlsoAsked** (Optional - $15-50/month):
```bash
# Sign up at https://alsoasked.com/
# For full auto mode:
echo "ALSOASKED_API_KEY=your_key_here" >> .env.local
```

### Step 2: Run Full Automation

```bash
# Full auto: discover questions → generate answers → create pages
cd scripts/paa-automation
node paa-pipeline.js --alsoasked "cat litter odor control"
```

This single command does everything:
1. ✅ Fetches PAA questions from AlsoAsked API
2. ✅ Generates ~120 word answers using OpenRouter (cheap LLM)
3. ✅ Creates Next.js pages with proper schema markup
4. ✅ Outputs instructions for next steps

### Step 3: Finish Up

```bash
# 1. Update the hub page with new questions (manual step)
#    Edit: app/learn/cat-litter-answers/page.tsx

# 2. Check types
pnpm check-types

# 3. Build
pnpm build

# 4. Submit to Google Search Console
#    https://search.google.com/search-console
```

---

## 💰 Budget Options

### Free Tier (Manual + AI)
```bash
# 1. Get questions manually from Answer Socrates (50 free/day)
#    https://answersocrates.com/
#    Export to CSV: questions.csv

# 2. Generate answers
node generate-answers.js questions.csv

# 3. Create pages
node bulk-page-generator.js questions-answers.json
```

**Cost:** FREE (just your time)
**Time:** ~30 mins for 20 questions

### Low Budget ($5/month)
```bash
# Use OpenRouter for answers ($0.001 per question)
# Use Answer Socrates free tier for questions
```

**Cost:** ~$5 for 5,000 answers
**Time:** ~10 mins for 20 questions

### Full Automation ($20-60/month)
```bash
# AlsoAsked API ($15-50) + OpenRouter ($5)
node paa-pipeline.js --alsoasked "your query"
```

**Cost:** ~$20-60/month
**Time:** ~2 mins for 20 questions

---

## 📊 Comparison Table

| Method | Cost | Time/20 Qs | Reliability | Best For |
|--------|------|------------|-------------|----------|
| Manual + Perplexity | Free* | 60 mins | High | Testing |
| Answer Socrates + OpenRouter | ~$5/mo | 15 mins | Medium | Small scale |
| AlsoAsked API + OpenRouter | ~$25/mo | 5 mins | High | Production |
| Full Pipeline | ~$25/mo | 2 mins | High | Scaling |

*Your time has value!

---

## 📁 Script Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `paa-pipeline.js` | Master automation | `node paa-pipeline.js --alsoasked "query"` |
| `alsoasked-api.js` | Fetch PAA questions | `node alsoasked-api.js "query"` |
| `generate-answers.js` | Generate answers | `node generate-answers.js questions.csv` |
| `bulk-page-generator.js` | Create pages | `node bulk-page-generator.js answers.json` |
| `scrape-paa-playwright.js` | Scrape Google (⚠️ risky) | `node scrape-paa-playwright.js "query"` |

---

## 🎯 Example Workflows

### Workflow 1: Content Sprint (1 Hour)
```bash
# Discover 50 PAA questions
node alsoasked-api.js --bulk example-queries.txt

# Generate all answers (takes ~5 mins, ~$0.15 cost)
node generate-answers.js alsoasked-results-XXX.csv

# Create all pages
node bulk-page-generator.js alsoasked-results-XXX-answers.json

# Manual: Update hub page, submit to GSC
```

### Workflow 2: Weekly Content (15 Mins)
```bash
# Single full-auto command
node paa-pipeline.js --alsoasked "cat litter odor control"

# Done! Just review and deploy.
```

### Workflow 3: Strategic Topics (30 Mins)
```bash
# Create seed queries file
cat > my-topics.txt << EOF
cat litter odor control apartment
best cat litter for multiple cats
how to eliminate ammonia smell
cat litter for small spaces
EOF

# Bulk process
node alsoasked-api.js --bulk my-topics.txt --depth=3
node generate-answers.js alsoasked-results-XXX.csv
node bulk-page-generator.js alsoasked-results-XXX-answers.json
```

---

## ⚠️ Important Notes

### Google Scraping Warning
The `scrape-paa-playwright.js` script:
- ❌ Violates Google's Terms of Service
- ❌ Will likely get your IP blocked
- ❌ Requires residential proxies ($50+/mo)
- ❌ High maintenance

**Recommendation:** Use AlsoAsked API or Answer Socrates instead.

### Rate Limits
- **OpenRouter:** ~20 requests/minute on free tier
- **AlsoAsked:** Depends on your plan (check docs)
- **Answer Socrates:** 50 searches/day free

### Content Quality
AI-generated answers need editing:
- Remove em-dashes (—)
- Remove AI phrases ("It's important to note...")
- Add brand voice
- Verify scientific accuracy
- Add product mentions naturally

---

## 🔧 Troubleshooting

### "OPENROUTER_API_KEY not found"
```bash
export OPENROUTER_API_KEY=your_key_here
# Or add to .env.local
```

### "AlsoAsked API error"
- Check your API key
- Check your subscription status
- Try with `--depth=1` first

### "Page already exists"
The bulk generator skips existing pages. Delete manually if you want to overwrite.

### Type errors
```bash
pnpm check-types
# Fix any errors manually
```

---

## 📈 Expected Output

After running the pipeline, you'll have:

```
app/learn/answers/
├── how-to-keep-litter-box-from-smelling/
│   └── page.tsx
├── does-activated-carbon-work-for-cat-litter/
│   └── page.tsx
├── how-often-should-i-change-cat-litter/
│   └── page.tsx
└── ... (more pages)
```

Plus CSV/JSON files for reference:
```
alsoasked-results-XXX.csv
alsoasked-results-XXX-answers.json
```

---

## 🎓 Pro Tips

1. **Start small:** Test with 5-10 questions first
2. **Edit answers:** AI output needs brand voice tuning
3. **Batch by topic:** Group similar questions for hub organization
4. **Track performance:** Use GSC to see which pages rank
5. **Expand winners:** Add more content to top-performing pages

---

## 🆘 Support

- OpenRouter: https://openrouter.ai/docs
- AlsoAsked: https://alsoasked.com/support
- Answer Socrates: https://answersocrates.com/help

---

**Ready to start?** Run:
```bash
node paa-pipeline.js --help
```
