# PAA SEO Strategy Implementation Guide for Purrify.ca

## Overview
This guide implements the "People Also Ask" (PAA) topical authority strategy to capture high-intent search traffic and build domain authority in the cat litter/odor control niche.

---

## What Was Built

### 1. Hub Page
**URL:** `/learn/cat-litter-answers`
- Central hub linking to all PAA question pages
- Category-filtered navigation
- FAQPage schema markup for rich snippets
- CTA to product trial

### 2. Individual Question Pages (Spokes)
Created 4 starter pages following the template:

| Page | URL | Target Keyword |
|------|-----|----------------|
| Keep litter box from smelling | `/learn/answers/how-to-keep-litter-box-from-smelling` | "how to keep litter box from smelling" |
| Activated carbon effectiveness | `/learn/answers/does-activated-carbon-work-for-cat-litter` | "does activated carbon work for cat litter" |
| Litter change frequency | `/learn/answers/how-often-should-i-change-cat-litter` | "how often should i change cat litter" |
| House smells like cat pee | `/learn/answers/why-does-my-house-smell-like-cat-pee` | "why does my house smell like cat pee" |

Each page includes:
- ~120-word plain text answer (editable in Google Doc style)
- QAPage schema markup
- Related questions (internal linking)
- CTA section
- Mobile-optimized design

### 3. Footer Integration
- Added "Cat Litter Q&A" link in the Learn section
- Provides sitewide internal linking equity

---

## Phase 1: Discover More PAA Questions

Run these searches on Google and screenshot the "People Also Ask" sections:

### Core Keywords
1. `cat litter odor control`
2. `how to stop litter box smell`
3. `best cat litter for smell`
4. `cat litter deodorizer`
5. `litter box smells apartment`
6. `cat pee smell in house`
7. `baking soda cat litter`
8. `activated carbon cat litter`
9. `multi cat litter box solutions`
10. `natural cat litter odor control`

### How to Expand PAA
For each search:
1. Click the first PAA question
2. This reveals 2-3 MORE questions
3. Screenshot or copy these questions
4. Click each new question to go deeper
5. Build a tree of 20-30 related questions

---

## Phase 2: Create Content at Scale

### Using Perplexity AI
Prompt template:
```
Write around 120-word plain text answers for each question below. 
Return inside a single code block with no citations.

Questions:
1. [Paste PAA question]
2. [Paste PAA question]
3. [Paste PAA question]
```

### Editing Checklist
- Remove em-dashes (—) and replace with commas or periods
- Remove AI phrases like "It's important to note" or "In conclusion"
- Add brand voice (helpful, scientific, no-nonsense)
- Verify accuracy of scientific claims
- Add product mention naturally in extended section

---

## Phase 3: Technical Setup

### Create New Question Pages

For each new PAA question:
1. Create directory: `app/learn/answers/[slug]/`
2. Copy template from existing page
3. Update:
   - Title and meta description
   - The ~120 word answer
   - Related questions (3-5 internal links)
   - Schema markup

### URL Slug Formula
```
Question: "How do I keep my litter box from smelling?"
Slug: how-to-keep-litter-box-from-smelling
```

### Add to Hub Page
Update `paaQuestions` array in `/learn/cat-litter-answers/page.tsx`

---

## Phase 4: Indexing & Monitoring

### Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Select purrify.ca property
3. URL Inspection > Enter: `https://www.purrify.ca/learn/cat-litter-answers`
4. Click "Request Indexing"
5. Repeat for each new question page

### Bulk URL Submission
Use the URL Inspection API or create a sitemap specifically for PAA pages.

### Track Performance
Monitor these metrics in GSC:
- Impressions for each question page
- Click-through rate (CTR) from SERP
- Average position
- Queries that trigger your pages

---

## Phase 5: Expansion Strategy

### Winner Expansion
For pages that rank (position 1-20):
1. Add 300-500 more words
2. Include images/graphics
3. Add video if available
4. Expand related questions section
5. Strengthen internal links
6. Add comparison tables

### Content Upgrade Template
```
Original: 120-word answer
Phase 2: Add "Why This Works" section (200 words)
Phase 3: Add "Common Mistakes" section (200 words)
Phase 4: Add "Expert Tips" section (150 words)
Phase 5: Add product CTA with social proof
```

---

## Expected Results

### Timeline
- **Week 1-2:** Initial indexing
- **Week 3-4:** First impressions in GSC
- **Month 2-3:** Ranking for long-tail queries
- **Month 4-6:** Topical authority established

### SEO Benefits
- Rich snippet eligibility (FAQ, QAPage)
- Increased SERP real estate
- Higher click-through rates
- Lower bounce rates (direct answers)
- Topical authority signals

### Business Benefits
- Captures high-intent traffic
- Positions Purrify as the expert
- Natural product integration
- Conversion-optimized pages
- Content asset that compounds

---

## Maintenance

### Quarterly Review
1. Check GSC for new PAA questions appearing
2. Update existing answers with new information
3. Refresh schema markup
4. Add new question pages based on trending queries

### Content Refresh Signals
- Drop in rankings
- New competing content
- Product formula changes
- Seasonal relevance (summer humidity, winter windows closed)

---

## File Structure
```
app/learn/
├── cat-litter-answers/
│   └── page.tsx          # Hub page
└── answers/
    ├── how-to-keep-litter-box-from-smelling/
    │   └── page.tsx
    ├── does-activated-carbon-work-for-cat-litter/
    │   └── page.tsx
    ├── how-often-should-i-change-cat-litter/
    │   └── page.tsx
    └── why-does-my-house-smell-like-cat-pee/
        └── page.tsx
```

---

## Next Steps

1. **Run PAA searches** (see Phase 1 keywords)
2. **Create 10-15 more question pages** using the template
3. **Submit all URLs to GSC**
4. **Monitor for 30 days**
5. **Expand winners** with more content
6. **Rinse and repeat**

---

*Generated for purrify.ca PAA SEO Strategy*
