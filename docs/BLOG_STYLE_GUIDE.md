# Purrify Blog Post Style Guide

**The complete reference for writing, structuring, and optimizing blog posts.**

---

## Quick Reference Card

```
WORD COUNT BY TYPE:
  Tier 1 Listicles:     2,400-2,800 words
  Tier 1 Problem-Solve: 2,200-2,600 words
  Tier 2 Litter-Specific: 1,800-2,200 words
  Tier 3 Lifestyle/Story: 2,000-2,400 words
  Tier 4 City-Specific:   1,600-2,000 words

IMAGES PER POST: 4
  1. Hero (1200×630px) - social sharing, after H1
  2. Problem - emotional connection, early in post
  3. Science/Solution - authority building, mid-article
  4. Result/CTA - conversion driver, before final CTA

VALIDATION MINIMUMS:
  Title:   10-100 characters
  Excerpt: 50-200 characters
  Content: 500+ characters (after HTML stripped)

SAFETY LANGUAGE:
  NEVER use "safe" → use "non-toxic", "food-grade", "pet-friendly"
```

---

## Table of Contents

1. [Post Types & Word Counts](#1-post-types--word-counts)
2. [Content Structure](#2-content-structure)
3. [Image Requirements](#3-image-requirements)
4. [SEO Requirements](#4-seo-requirements)
5. [Writing Guidelines](#5-writing-guidelines)
6. [Product Positioning](#6-product-positioning)
7. [Legal & Safety Compliance](#7-legal--safety-compliance)
8. [Validation Rules](#8-validation-rules)
9. [Post-Writing Checklist](#9-post-writing-checklist)

---

## 1. Post Types & Word Counts

### Tier 1: High Volume (Posts 1-25)

| Type | Word Count | Search Intent | Example Titles |
|------|------------|---------------|----------------|
| **Best Listicles** | 2,400-2,800 | Commercial investigation | "Top 10 Best Cat Litters for Odor Control (2026)" |
| **Problem-Solution** | 2,200-2,600 | Informational + commercial | "Why Does My House Smell Like Cat Litter? (Complete Fix)" |

### Tier 2: Litter Type Specific (Posts 26-50)

| Type | Word Count | Search Intent | Example Titles |
|------|------------|---------------|----------------|
| **Compatibility Guides** | 1,800-2,200 | Problem-aware, solution-seeking | "Crystal Litter Not Working? Here's Why (And the $10 Fix)" |

### Tier 3: Lifestyle & Stories (Posts 51-75)

| Type | Word Count | Search Intent | Example Titles |
|------|------------|---------------|----------------|
| **Personal Testing** | 2,000-2,400 | Social validation + entertainment | "I Tried Every Litter Deodorizer for 90 Days—Here's What Actually Worked" |

### Tier 4: City-Specific (Posts 76-90)

| Type | Word Count | Search Intent | Example Titles |
|------|------------|---------------|----------------|
| **Local SEO** | 1,600-2,000 | Local + problem-solution | "Vancouver Cat Odor Solutions: Humidity Edition" |

---

## 2. Content Structure

### Standard Structure (All Posts)

```markdown
# [H1 Title with Primary Keyword]

[Hook paragraph - emotional pain point, 2-3 sentences]
[Primary keyword in first 100 words]

**Quick Answer**: [40-60 word direct answer for featured snippet]

**Table of Contents**
- [Link to each H2 section]

## [H2 - Problem/Why Section]
[150-200 words]
[IMAGE: problem image]

## [H2 - Causes/Analysis]
### [H3 - Cause 1]
### [H3 - Cause 2]
[100-150 words each]

## [H2 - Why Common Solutions Don't Work]
[150-200 words - set up the real solution]

## [H2 - The Science/Solution]
[200-250 words]
[Authority hook - water treatment/hospital reference]
[Football field analogy]
[IMAGE: science/solution image]

## [H2 - Step-by-Step Guide/Recommendations]
### Step 1: [Action]
### Step 2: [Action]
[100-150 words per step]

## [H2 - Quick Comparison Table] (if applicable)
[Markdown table]

## [H2 - Frequently Asked Questions]
[5-7 Q&A pairs for schema markup]
[40-60 words per answer]

## [H2 - Conclusion with Keyword Variation]
[150-200 words]
[IMAGE: result/happy image]

## [CTA Section - "Ready to Eliminate Odor?"]
[100-150 words]
[3 benefits: Cat-Friendly, High-Performance, Simple]
[Authority hook]
[CTA button suggestion]
```

### Storytelling Structure (Tier 3 Posts)

```markdown
# [H1 - Compelling Story Hook]

[OPENING HOOK - Dramatic moment]
"The moment I knew I had a problem was when..."

## The Breaking Point
[Personal struggle, 150-200 words]

## What I Tried (And Why It Failed)
### Attempt 1: [Method]
### Attempt 2: [Method]
[50-75 words each, build frustration]

## The Turning Point
[Discovery moment, 150-200 words]

## The Science I Wish I'd Known
[Educational content, 200-250 words]

## My [Timeframe] Results
### Week 1
### Week 2
### Month 1
[Specific results with numbers]

## What I Use Now (My Exact System)
[Step-by-step routine, 150-200 words]

## Lessons Learned
[5-7 bullet points]

## Would I Recommend This?
[Honest assessment, 100-150 words]

## Your Turn
[CTA with low-risk offer]
```

---

## 3. Image Requirements

### Images Per Post: 4

| # | Type | Purpose | Placement | Dimensions |
|---|------|---------|-----------|------------|
| 1 | **Hero** | Social sharing, featured snippet | After H1, before intro | 1200×630px min |
| 2 | **Problem** | Emotional connection | After "The Problem" section | 800×600px min |
| 3 | **Science/Solution** | Authority building | Mid-article | 800×600px min |
| 4 | **Result/CTA** | Conversion driver | Before final CTA | 800×600px min |

### Image SEO Requirements

```
✅ Alt text: Include primary keyword + descriptive context
✅ File naming: {keyword}-{purpose}.webp (e.g., cat-litter-odor-control-hero.webp)
✅ Format: WebP preferred, JPEG fallback
✅ Size: Under 200KB for Core Web Vitals
✅ Lazy loading: All images except hero
✅ Aspect ratio: 16:9 or 3:2
```

### Image Sourcing Priority

1. **First**: AI generation (Fal.ai api, Google NanoBanana). Generate an appropriate prompt based on the page/post and the content before/after it so the image ADDS quality/understanding/emotion/etc to teh post. 
2. **Second**: Use Unsplash, pexels, etc. with proper attribution
3. **Third**: Check `/public/optimized/blog/` for existing assets

---

## 4. SEO Requirements

### Keyword Placement (Mandatory)

| Location | Requirement |
|----------|-------------|
| H1 Title | Include primary keyword, under 60 characters |
| First 100 words | Primary keyword must appear |
| H2 Subheadings | At least 2 H2s with primary keyword |
| Meta description | 150-155 characters, include keyword + CTA |
| URL slug | Short, keyword-focused |
| Conclusion | Primary keyword mentioned |

### Keyword Density

- **Primary keyword**: 1.5-2%
- **Secondary/LSI keywords**: Distributed naturally throughout


### Internal Linking (4-6 per post)
- Related blog posts
- Use descriptive anchor text with keywords

### Meta Tags

| Element | Optimal Length |
|---------|----------------|
| Title | 50-60 characters |
| Description | 150-160 characters |
| Keywords | 3-5 terms |

### SEO Scoring Breakdown (0-100)

| Factor | Weight |
|--------|--------|
| Title optimization | 20% |
| Description quality | 15% |
| Keyword usage | 15% |
| Heading structure | 15% |
| Content quality | 15% |
| Image optimization | 10% |
| Internal/external links | 10% |

**Target Score: 80+**

---

## 5. Writing Guidelines

### Voice & Tone

- **Conversational, first-person, charming, humorous** where appropriate
- **Clinical but warm** - we are professionals who understand cat parents, but we want this to engender warmth, happiness, social sharing, positive emotions, sales.
- **Canadian spelling**: colour, odour, favourite
- **No fluff** - every sentence adds value
- get inspired by famous writers and copywriters.

### Technical Terms Translation

| Avoid (Technical) | Use Instead (Accessible) |
|-------------------|--------------------------|
**Exception**: Use technical terms for cleaning enthusiasts or science-minded readers, then explain simply.

### Sensitive Topics Language

| Avoid | Use Instead |
|-------|-------------|
| Poo, poop | Solid waste, organic matter |
| Pee, urine (overuse) | Liquid waste, ammonia sources |
| Gross, disgusting | Unpleasant, problematic |

### Formatting Standards

- **Short paragraphs**: 2-4 sentences max
- **Bullet points**: For lists of 3+ items
- **Bold key phrases**: For scannability
- **Specific data**: Numbers, percentages, timeframes
- **Proper heading hierarchy**: H1 → H2 → H3 to maximized SEO and AIO impact.

### Storytelling Frameworks

**The Cat Parent Journey** (Personal Narrative):
1. The Struggle - "I tried everything..."
2. The Failed Solutions - Scented litters, baking soda, air fresheners
3. The Discovery - Learning about real odor science
4. The Science - How activated carbon actually works
5. The Result - Fresh home, happy cat, peace of mind

**The Myth vs. Reality** (Educational):
1. Common Belief - What most people think
2. Why It's Wrong - The science behind the myth
3. The Truth - What actually works and why
4. The Solution - How Purrify addresses this

**Problem-Agitate-Solve** (Marketing):
1. Problem - Identify the specific pain point
2. Agitate - Emphasize consequences (embarrassment, stress, health)
3. Solve - Present Purrify as the science-backed solution

---

## 6. Product Positioning

### Core Messaging 

1. **Cat-Friendly First** - No scents or chemicals to irritate paws or noses
2. **High-Performance** - Same standards as water and air filtration
3. **Simple to Use** - Just a sprinkle on top of existing litter

### Secondary Messaging 

4. **Long-Lasting** - 7+ days of freshness
5. **Works with Any Litter** - Clay, crystal, natural, whatever your cat prefers
6. **Eco-Conscious** - Made from renewable coconut shells

### Authority Hooks 

```
"Same activated carbon as municipal water treatment systems"
"Used in hospital operating room air filtration"
"The material inside premium home air purifiers"
"Food-grade quality - meets water filter standards"
"Trusted by aquarium hobbyists to keep tanks crystal clear"
```

### The Football Field Analogy

> "One gram of activated carbon has the surface area of a football field, filled with microscopic tunnels that trap odor molecules on contact"

**Use something similar whenever explaining how activated carbon works.**

### Purrify Mentions

- **3-4 natural mentions** throughout each post
- Position as "the upgrade" not a replacement for litter
- Never suggest they made a wrong litter choice
- Always include: "Works with any litter your cat already loves"

### Phrases to Always Include

**Trust Builders:**
- "Made from coconut shell activated carbon"
- "The same material used in drinking water filters"
- "100% natural and fragrance-free"
- "Works with any litter your cat already loves"

**Differentiators:**
- "Traps odor molecules at the source"
- "Doesn't mask - eliminates"
- "No perfumes to stress your cat"
- "Filtration-grade activated carbon"

---

## 7. Legal & Safety Compliance

### NEVER Use These Words

| Prohibited | Why |
|------------|-----|
| "Safe" | Legally loaded term |
| "Hypoallergenic" | Requires testing |
| "Veterinarian approved" | Unless documented |
| "Clinically proven" | Requires studies |

### ALWAYS Use These Alternatives

| Instead of "Safe" | Use |
|-------------------|-----|
| Food-grade | Implies safety through standards |
| Non-toxic | Factual material property |
| Pet-friendly | Focuses on design intent |
| 100% natural | Material origin |
| Fragrance-free | Absence of irritants |
| Chemical-free | No additives |

### Content Don'ts

- ❌ Claim NASA endorsement or partnership
- ❌ Make medical or health treatment claims
- ❌ Compare directly to competitors by name
- ❌ Fabricate statistics or review counts
- ❌ Reference images that don't exist
- ❌ Promise specific timeframes without "up to" qualifier
- ❌ Use absolute claims ("100% safe")

### Legal Language

- Use conditional language: "may help," "designed for"
- Compare **technologies** not brands
- Include disclaimers when appropriate

### Disclaimer Templates

**For Blog Posts:**
> *Purrify is a Canadian company specializing in activated carbon litter additives. We're cat parents who got nerdy about odor science.*

**For Educational Content:**
> *This article is for informational purposes. Always consult your veterinarian for specific health concerns about your cat.*

---

## 8. Validation Rules

### Title

- **Length**: 10-100 characters
- **No template variables**: `{meta.title}`, `${variable}`
- **No HTML tags**

### Excerpt

- **Length**: 50-200 characters
- **No template variables**
- **No HTML tags**

### Content

- **Minimum text length**: 500 characters (after stripping HTML)
- **No template variables**
- **Valid HTML structure**

### Featured Image

- **Required fields**: url, alt, width, height
- **Valid URL format**
- **No template variables in alt text**

### SEO Metadata

- **Title**: 50-60 characters (recommended)
- **Description**: 150-160 characters (recommended)
- **Keywords**: At least one keyword

---

## 9. Post-Writing Checklist

### SEO Verification

- [ ] Primary keyword in H1 title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in meta description
- [ ] Primary keyword in 2+ H2 headings
- [ ] Keyword density 1.5-2%
- [ ] URL slug is short and keyword-focused
- [ ] 4-6 internal links included
- [ ] 1-2 external authority links
- [ ] FAQ schema content (5-7 questions)

### Content Quality

- [ ] Word count within range for post type
- [ ] Scannable formatting (bullets, bold, short paragraphs)
- [ ] Featured snippet paragraph (direct answer format)
- [ ] Comparison table where relevant
- [ ] Canadian spelling (colour, odour)
- [ ] No competitor brand names
- [ ] No "safe" claims - use "food-grade," "pet-friendly"

### Purrify Integration

- [ ] 3-4 natural mentions
- [ ] At least one authority hook (water treatment, hospital, etc.)
- [ ] "Works with any litter" mentioned
- [ ] Clear CTA section at end
- [ ] Benefits listed: Cat-Friendly, High-Performance, Simple

### Images

- [ ] 4 image placeholders with SEO alt text
- [ ] Hero image for social sharing (1200×630px)
- [ ] All alt text includes primary keyword
- [ ] File naming convention followed
- [ ] All images under 200KB

### Technical

- [ ] Dark mode CSS classes if using styled components
- [ ] Mobile-responsive formatting
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] No broken internal links
- [ ] Title 10-100 characters
- [ ] Excerpt 50-200 characters

---

## CLI Commands

```bash
# Scan all posts for quality issues
npm run repair-blog -- en scan

# Repair all broken posts
npm run repair-blog -- en repair

# Repair a specific post
npm run repair-blog -- en repair-one <slug>

# Generate a new post manually
npm run blog:auto:generate

# Validate images
npm run validate-images
```

---

*Last Updated: January 2026*
