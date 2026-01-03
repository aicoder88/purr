# Blog Post Generation Prompts - SEO Optimized

## Image Strategy for SEO Blog Posts

### The Image Problem & Solution

**Problem**: External image URLs (Unsplash, Pexels) can fail, slow down pages, and hurt SEO.

**Solution**: Use a hybrid approach:

1. **For Generation**: Reference image concepts in the content
2. **For Production**: Use images from `/public/optimized/blog/` or generate with AI
3. **Fallback**: Always have `/optimized/purrify-product.webp` as backup

### Image Requirements Per Post (SEO Best Practices)

| Image | Purpose | Placement | SEO Impact |
|-------|---------|-----------|------------|
| **Hero Image** | Social sharing, featured snippet | After H1, before intro | Critical for CTR |
| **Problem Image** | Emotional connection | After "The Problem" section | Engagement |
| **Solution/Science Image** | Authority building | Mid-article | Trust signals |
| **Result/CTA Image** | Conversion | Before final CTA | Action driver |

### Image SEO Requirements

```
✅ Alt text: Include primary keyword + descriptive context
✅ File naming: {keyword}-{purpose}.webp (e.g., cat-litter-odor-control-hero.webp)
✅ Dimensions: 1200x630px minimum for social, 800x600px for inline
✅ Format: WebP preferred, JPEG fallback
✅ Size: Under 200KB for Core Web Vitals
✅ Lazy loading: All images except hero
✅ Aspect ratio: Consistent 16:9 or 3:2
```

### Image Sourcing Strategy

**Option A: Stock Photo Keywords** (for manual sourcing)
```
Hero images: "cat owner home fresh", "clean modern apartment cat"
Problem images: "frustrated person smell", "holding nose"
Science images: "water filter carbon", "laboratory clean"
Solution images: "happy cat owner", "fresh home interior"
```

**Option B: AI Generation Prompts** (for Midjourney/DALL-E)
```
Hero: "Lifestyle photo of happy cat owner in modern bright apartment, cat nearby, clean minimalist interior, natural lighting, 16:9 aspect ratio"
Problem: "Person looking frustrated near cat litter box, soft focus background, warm lighting, editorial style"
Solution: "Fresh clean home interior with cat relaxing, sunlight streaming in, scandinavian design, peaceful atmosphere"
```

**Option C: Use Existing Assets**
Check `/public/optimized/blog/` for existing images that match the topic.

---

## PROMPT 1: TIER 1 - HIGH VOLUME "BEST" LISTICLES

Use this prompt for posts #1-10 (Best Cat Litter for Odor Control, Best Multi-Cat, Best Clumping, etc.)

```
You are an expert SEO content writer specializing in pet care. Create a comprehensive, Google-ranking blog post for Purrify, a Canadian company selling activated carbon cat litter deodorizer.

## POST DETAILS
**Title**: [INSERT TITLE - e.g., "Top 10 Best Cat Litters for Odor Control (2026)"]
**Primary Keyword**: [INSERT - e.g., "best cat litter for odor control"]
**Secondary Keywords**: [INSERT 3-5 related keywords]
**Target Word Count**: 2,400-2,800 words
**Search Intent**: Commercial investigation / Product comparison

## CRITICAL SEO REQUIREMENTS

### Title & Meta
- H1 title: Include primary keyword naturally, under 60 characters
- Meta description: 150-155 characters, include primary keyword + CTA
- URL slug: Short, keyword-focused (e.g., /blog/best-cat-litter-odor-control-2026)

### Keyword Placement (MANDATORY)
- Primary keyword in first 100 words
- Primary keyword in H1
- Primary keyword in at least 2 H2 subheadings (naturally)
- Primary keyword density: 1.5-2%
- LSI/secondary keywords distributed throughout
- Primary keyword in conclusion

### Content Structure (Exact Format)
```
# [H1 Title with Primary Keyword]

[Hook paragraph - emotional pain point, 2-3 sentences, primary keyword in first 100 words]

[Quick answer paragraph - for featured snippet capture, direct answer to search query]

**Table of Contents**
- [Link to each H2 section]

## Why [Problem] Matters (H2 with secondary keyword)
[Establish the problem, 150-200 words]
[IMAGE PLACEHOLDER: problem-image.webp - Alt: "{keyword} problem - {description}"]

## How We Evaluated [Topic] (H2 - builds trust)
[Methodology section - what criteria matter, 200-250 words]
[Mention: "We tested using the same standards as water treatment facilities"]

## Top [X] Best [Keyword] (H2 with primary keyword)

### 1. [Category/Type] - Best for [Use Case] (H3)
[200-300 words per item]
[Include pros, cons, who it's for]
[INTERNAL LINK to related content]

### 2. [Continue pattern...]

## The Missing Ingredient Most People Overlook (H2)
[Transition to activated carbon solution, 200-250 words]
[Authority hook: "The same activated carbon used in municipal water treatment..."]
[IMAGE PLACEHOLDER: solution-science.webp - Alt: "activated carbon {keyword}"]

## How Activated Carbon Enhances Any Litter (H2)
[Science explanation with football field analogy, 200-250 words]
[Purrify positioning: works with ANY litter type]

## Quick Comparison Table (H2)
[Markdown table comparing options]
[Include Purrify as "The Upgrade" row]

## Frequently Asked Questions (H2)
[5-7 FAQ items in Q&A format for schema markup]
[Each answer 40-60 words, direct and helpful]

## The Bottom Line (H2 with keyword variation)
[Summary, 150-200 words]
[Clear recommendation]
[IMAGE PLACEHOLDER: result-happy.webp - Alt: "{keyword} success - happy cat owner"]

## Ready to Eliminate Odor for Good? (CTA Section)
[Purrify pitch, 100-150 words]
[Feature 3 benefits: Cat-Friendly, High-Performance, Simple]
[Authority hook: "Same filtration as hospital air systems"]
[CTA button text suggestion]
```

### Purrify Positioning Rules
- Mention Purrify 3-4 times naturally throughout
- Position as "the upgrade" not a replacement for litter
- Use authority hooks (rotate these):
  * "Same carbon as municipal water treatment systems"
  * "Used in hospital operating room air filtration"
  * "The material inside premium home air purifiers"
  * "Food-grade quality - meets water filter standards"
- Never claim "safe" - use "food-grade," "non-toxic," "pet-friendly"
- Always include: "Works with any litter your cat already loves"

### Content Quality Standards
- Conversational, first-person voice where appropriate
- Specific data points (numbers, percentages, timeframes)
- Scannable formatting (bullets, bold key phrases, short paragraphs)
- No fluff - every sentence adds value
- Address objections and alternatives honestly
- Canadian spelling (colour, odour, favourite)

### Internal Linking (Include 4-6)
- Link to: /learn/activated-carbon-vs-baking-soda
- Link to: /learn/how-it-works
- Link to: /blog/[related-post]
- Link to: /products/standard
- Use descriptive anchor text with keywords

### Image Placeholders (Include 4)
Format each as:
```
[IMAGE: filename.webp]
Alt: "{primary keyword} - {descriptive context with emotion/action}"
Caption: "{Keyword-rich description} | Suggested source: Unsplash/AI"
```

### FAQ Schema Content (Include 5-7 questions)
- What is the best cat litter for odor control?
- How often should I change odor control cat litter?
- Why does my cat litter smell so bad?
- Is activated carbon safe for cats?
- How does activated carbon eliminate odor?
- [2-3 topic-specific questions]

### Legal Compliance
- NO competitor brand names
- NO absolute safety claims ("100% safe")
- NO medical claims
- Use conditional language ("may help," "designed for")
- Compare TECHNOLOGIES not brands

## OUTPUT FORMAT
Provide the complete blog post in markdown format, ready for implementation. Include all image placeholders with SEO-optimized alt text. Mark any sections that need human review with [REVIEW NEEDED].
```

---

## PROMPT 2: TIER 1 - PROBLEM-SOLUTION POSTS

Use this prompt for posts #11-15 (House Smells Like Cat, Get Rid of Smell, Ammonia Guide, etc.)

```
You are an expert SEO content writer. Create a comprehensive problem-solution blog post for Purrify, a Canadian activated carbon cat litter deodorizer company.

## POST DETAILS
**Title**: [INSERT TITLE - e.g., "Why Does My House Smell Like Cat Litter? (Complete Fix)"]
**Primary Keyword**: [INSERT - e.g., "house smells like cat litter"]
**Secondary Keywords**: [INSERT 3-5 related keywords]
**Target Word Count**: 2,200-2,600 words
**Search Intent**: Problem-solution / Informational with commercial undertones

## CRITICAL SEO REQUIREMENTS

### Featured Snippet Optimization
This post should capture the featured snippet. Structure the first section as a direct answer:

```
[H1 Title as question or problem statement]

**Quick Answer**: [40-60 word direct answer to the search query - this is what Google pulls for featured snippets]

If your house smells like cat litter, the most common causes are: [bullet list of 3-5 causes]. The permanent solution is... [brief answer mentioning molecular trapping].

[Rest of intro paragraph with primary keyword]
```

### Content Structure (Problem-Solution Format)
```
# [H1 - Problem Statement with Primary Keyword]

**Quick Answer**: [Featured snippet paragraph]

[Emotional hook - "I know exactly how you feel..." 2-3 sentences]
[Primary keyword in first 100 words]

## Why Your [Problem] (And Why It's Not Your Fault) (H2)
[Validation + science of the problem, 200-250 words]
[IMAGE PLACEHOLDER: problem.webp]

## The 3 Hidden Causes of [Problem] (H2 with secondary keyword)
### 1. [Cause] (H3)
[100-150 words with actionable insight]

### 2. [Cause] (H3)
[100-150 words]

### 3. [Cause] (H3)
[100-150 words]
[INTERNAL LINK to related post]

## Why Common Solutions Don't Work (H2)
[Address failed solutions: air fresheners, baking soda, scented products]
[150-200 words]
[Set up the real solution]

## The Science of Permanent Odor Elimination (H2)
[Molecular trapping explanation, 200-250 words]
[Authority hook: "The same technology used in water treatment plants..."]
[Football field analogy]
[IMAGE PLACEHOLDER: science.webp - Alt: "activated carbon {keyword} science"]

## [Number] Proven Steps to [Solve Problem] (H2 with primary keyword)
### Step 1: [Action] (H3)
[Specific, actionable step, 100-150 words]

### Step 2: [Action] (H3)
[Include Purrify naturally as part of the solution]

### Step 3-5: [Continue...]
[IMAGE PLACEHOLDER: solution.webp]

## What to Expect: Timeline for Results (H2)
[Set expectations: Day 1, Week 1, Month 1]
[150-200 words]

## Common Mistakes to Avoid (H2)
[Bullet list of 5-7 mistakes]
[Each with brief explanation]

## Frequently Asked Questions (H2)
[5-7 Q&A pairs for schema]

## Your Fresh Home Starts Today (H2 - Conclusion)
[Summary + encouragement, 150 words]
[IMAGE PLACEHOLDER: result.webp - Alt: "{keyword} solved - fresh home"]

## The Solution That Actually Works (CTA)
[Purrify pitch with 3 benefits]
[Authority hook]
[CTA]
```

### Emotional Engagement Elements
- Open with empathy ("I've been there...")
- Acknowledge frustration with failed solutions
- Build hope before presenting solution
- Use sensory language (describe the smell problem vividly)
- End with transformation vision

### Purrify Positioning
- Present as part of a complete system, not magic bullet
- "The missing ingredient in your odor control routine"
- Emphasize it works WITH existing litter
- 3-4 natural mentions throughout

### Authority Hooks (Use 2-3)
- "The same activated carbon that purifies drinking water for millions"
- "Hospital-grade air filtration technology"
- "The material inside your water pitcher filter"
- "One gram = football field of surface area"

### Internal Linking (4-6 links)
- Related problem posts
- Science/how-it-works page
- Product pages
- Other blog posts

## OUTPUT FORMAT
Complete markdown blog post with all image placeholders, internal link suggestions, and FAQ schema content.
```

---

## PROMPT 3: TIER 2 - LITTER TYPE COMPATIBILITY & EQUIPMENT

Use this prompt for posts #26-50 (Clay Litter Odor, Crystal Litter Fix, Self-Cleaning Box, etc.)

```
You are an expert SEO content writer. Create a targeted, solution-focused blog post for Purrify about a specific litter type or equipment category.

## POST DETAILS
**Title**: [INSERT - e.g., "Crystal Litter Not Working? Here's Why (And the $10 Fix)"]
**Primary Keyword**: [INSERT - e.g., "crystal litter smell"]
**Secondary Keywords**: [INSERT]
**Target Word Count**: 1,800-2,200 words
**Search Intent**: Problem-aware, seeking specific solution

## CONTENT STRUCTURE

```
# [H1 - Specific Problem with Primary Keyword]

[Hook: Validate their specific frustration with this litter type/equipment]
[Primary keyword in first 50 words]

**The Short Answer**: [50-word direct solution for featured snippet]

## Why [Specific Litter/Equipment] [Has This Problem] (H2)
[Science of why this specific type struggles with odor]
[150-200 words]
[IMAGE PLACEHOLDER: problem-specific.webp]

## What [Litter Type] Does Well (H2)
[Acknowledge benefits - builds trust by being balanced]
[100-150 words]

## The Odor Gap: What's Missing (H2)
[Explain the limitation without bashing the product]
[Transition to carbon solution]
[150-200 words]

## How Activated Carbon Completes the System (H2)
[Specific pairing advice for this litter type]
[Authority hook about water/hospital filtration]
[IMAGE PLACEHOLDER: solution.webp]

## Step-by-Step: Using [Purrify/Carbon] with [Litter Type] (H2)
### Step 1: [Specific instruction]
### Step 2: [Specific instruction]
### Step 3: [Specific instruction]
[150-200 words total]

## Expected Results Timeline (H2)
[Day 1, Week 1, ongoing]
[100-150 words]

## Tips for [Litter Type] Users (H2)
[5-7 bullet points of practical advice]
[Include one about optimal carbon usage]

## FAQ: [Litter Type] Odor Questions (H2)
[4-5 specific Q&As]

## The Bottom Line (H2)
[Specific recommendation for this litter type]
[100-150 words]

## Complete Your [Litter Type] System (CTA)
[Purrify as the perfect companion]
[Specific benefit for this litter type]
```

### Litter-Type Specific Angles

**For Clay Litter Posts:**
- Emphasize "works with what your cat already knows"
- Address clumping efficiency + odor gap
- "Upgrade without switching brands"

**For Crystal/Silica Posts:**
- Address saturation point issue
- "Extend your crystal litter investment"
- Cost savings angle

**For Natural Litters (Pine, Corn, Tofu, Wheat):**
- Emphasize natural + natural = fully eco-friendly
- "100% coconut shell carbon - completely natural"
- Address specific odor profiles of each

**For Equipment Posts (Self-cleaning, Covered boxes):**
- Compatibility assurance
- Address unique challenges of enclosed/automated systems
- "Works with any litter box design"

### Purrify Positioning
- Position as the "completion" of their current system
- Never suggest they made a wrong litter choice
- "The upgrade that makes great litter even better"
- 2-3 natural mentions

## OUTPUT FORMAT
Complete markdown post with image placeholders and FAQ schema content.
```

---

## PROMPT 4: TIER 3 - LIFESTYLE & PERSONAL STORY POSTS

Use this prompt for posts #51-75 (Personal testing stories, lifestyle guides, seasonal content)

```
You are an expert content writer creating engaging, shareable blog content for Purrify. This post should feel personal, relatable, and story-driven while still ranking for SEO.

## POST DETAILS
**Title**: [INSERT - e.g., "I Tried Every Litter Deodorizer for 90 Days—Here's What Actually Worked"]
**Primary Keyword**: [INSERT]
**Secondary Keywords**: [INSERT]
**Target Word Count**: 2,000-2,400 words
**Search Intent**: Informational / Social validation / Entertainment with commercial intent

## CONTENT STRUCTURE (Story Arc Format)

```
# [H1 - Compelling Story Hook with Keyword]

[OPENING HOOK - Dramatic moment, 2-3 sentences]
"The moment I knew I had a problem was when..."

[Set the stakes - what was at risk]
[Primary keyword within first 100 words]

## The Breaking Point (H2)
[Personal struggle narrative]
[Emotional details that readers relate to]
[150-200 words]
[IMAGE PLACEHOLDER: struggle.webp - authentic, relatable]

## What I Tried (And Why It Failed) (H2)
### Attempt 1: [Method]
[What happened, why it didn't work]
[50-75 words each]

### Attempt 2: [Method]
### Attempt 3: [Method]
[Build frustration narrative]
[IMAGE PLACEHOLDER: failed-attempts.webp]

## The Turning Point (H2)
[Discovery moment]
[What changed my understanding]
[150-200 words]

## The Science I Wish I'd Known Earlier (H2)
[Educational content woven into story]
[Authority hook about water treatment/hospitals]
[200-250 words]
[IMAGE PLACEHOLDER: science-discovery.webp]

## My [Timeframe] Results (H2)
### Week 1
### Week 2
### Month 1
[Specific, believable results]
[Include numbers where possible]
[150-200 words]

## What I Use Now (My Exact System) (H2)
[Step-by-step current routine]
[Purrify naturally included]
[150-200 words]
[IMAGE PLACEHOLDER: current-system.webp]

## Lessons Learned (H2)
[5-7 bullet points]
[Shareable insights]

## Would I Recommend This? (H2)
[Honest assessment]
[Who it's for, who should skip]
[100-150 words]

## FAQ (H2)
[3-5 questions readers might have after reading]

## Your Turn (CTA)
[Invitation to try]
[Low-risk offer mention]
```

### Story-Driven SEO Balance
- Primary keyword in H1, first 100 words, 2+ H2s
- But prioritize narrative flow
- Data points add credibility to story
- Emotional beats + SEO requirements

### Shareability Elements
- Surprising statistics or results
- Quotable one-liners
- Relatable struggles
- Clear transformation arc
- Specific numbers ("90 days," "$300 wasted")

### Voice & Tone
- First-person, conversational
- Vulnerable about failures
- Specific details (city, apartment size, cat names)
- Canadian references where natural
- Humor where appropriate

### Purrify Integration
- Discover naturally in the story
- Not positioned as paid promotion
- Genuine recommendation feeling
- 2-3 mentions woven into narrative

## OUTPUT FORMAT
Complete markdown with story structure, image placeholders, and social sharing hooks highlighted.
```

---

## PROMPT 5: TIER 4 - CITY-SPECIFIC CANADIAN CONTENT

Use this prompt for posts #76-90 (Vancouver, Toronto, Calgary, Montreal, etc.)

```
You are an expert local SEO content writer. Create a city-specific cat litter odor control guide for Purrify targeting Canadian cat owners.

## POST DETAILS
**Title**: [INSERT - e.g., "Vancouver Cat Odor Solutions: Humidity Edition"]
**Target City**: [INSERT - e.g., Vancouver]
**Primary Keyword**: [INSERT - e.g., "cat litter smell vancouver"]
**Secondary Keywords**: [INSERT - e.g., "vancouver apartment cat odor", "cat litter humidity"]
**Target Word Count**: 1,600-2,000 words
**Search Intent**: Local + problem-solution

## LOCAL SEO REQUIREMENTS

### Geographic Keyword Integration
- City name in H1 title
- City name in first 100 words
- City name in 2-3 H2 subheadings
- Province/region references
- Local neighborhood mentions where relevant
- Climate-specific language

### Local Trust Signals
- "Made in Canada" emphasis
- "Ships from [nearby city]"
- Local climate understanding
- Regional lifestyle references

## CONTENT STRUCTURE

```
# [H1 - City Name + Primary Problem/Solution]

[Hook addressing city-specific challenge]
[City name + primary keyword in first 50 words]

**Quick Answer for [City] Cat Owners**: [50-word local solution summary]

## The [City] Cat Owner's Challenge (H2)
[Climate-specific problem]
[Housing type considerations (condos, apartments, houses)]
[150-200 words]
[IMAGE PLACEHOLDER: city-lifestyle.webp]

## Why [Climate Factor] Makes Litter Odor Worse (H2)
[Science of how local climate affects odor]

### [City-Specific Factor 1] (H3)
[e.g., Humidity for Vancouver, Dry air for Calgary, Sealed homes for Winnipeg]
[100-150 words]

### [City-Specific Factor 2] (H3)
[100-150 words]

## What [City] Cat Owners Are Doing Wrong (H2)
[Common local mistakes]
[100-150 words]

## The Solution That Works in [City's] Climate (H2)
[Activated carbon explanation with local relevance]
[Authority hook: municipal water treatment]
[200-250 words]
[IMAGE PLACEHOLDER: solution.webp]

## [City] Cat Owner's Odor Control Guide (H2)
### For [Housing Type 1 - e.g., Condo Owners]
[Specific advice, 100 words]

### For [Housing Type 2 - e.g., Apartment Renters]
[Specific advice, 100 words]

### For [Housing Type 3 - e.g., House Owners]
[Specific advice, 100 words]

## Seasonal Tips for [City/Region] (H2)
### [Season 1 - e.g., Rainy Season / Winter]
### [Season 2]
[Climate-specific seasonal advice]
[150-200 words]

## Where to Get Activated Carbon in [City] (H2)
[Online ordering emphasis - "ships directly to [City]"]
[Local delivery expectations]
[100 words]

## [City] Cat Owner FAQ (H2)
[4-5 location-specific questions]
- Is activated carbon safe in [City's] humidity?
- How often should I use it in [City's] climate?
- [Local lifestyle question]

## Join [City's] Fresh Home Cat Owners (CTA)
[Local community feeling]
[Canadian company emphasis]
[Fast shipping to their region]
```

### City-Specific Angles

**Vancouver/Victoria (Coastal BC):**
- Humidity focus
- Condo living
- Eco-conscious audience
- Rainy season challenges
- "Coastal humidity makes bacteria thrive"

**Toronto (GTA):**
- Condo density
- Small space living
- Diverse neighborhoods
- "Downtown condo living with cats"

**Calgary/Edmonton (Alberta):**
- Dry climate effects
- Winter sealed homes
- Static electricity mention
- "Prairie dry air has different challenges"

**Montreal/Quebec City:**
- Bilingual considerations
- Historic building challenges
- Humid summers
- Cold winters

**Ottawa:**
- Government worker WFH angle
- Four-season extremes
- "Capital city living"

**Winnipeg/Prairie cities:**
- Extreme temperature swings
- Long winter sealed homes
- Continental climate

**Halifax/Maritime:**
- Coastal humidity
- Older housing stock
- Salt air considerations

### Purrify Positioning
- "Canadian-made for Canadian homes"
- "Ships fast to [City]"
- "Designed for [Climate challenge]"
- 2-3 natural mentions

### Local Testimonial Style (Include 1-2)
```
"Living in [City] with two cats in my [housing type] was impossible until I found this solution."
— [First Name], [Neighborhood/Area]
```

## OUTPUT FORMAT
Complete markdown with local SEO optimization, city-specific content, and image placeholders.
```

---

## IMAGE SOURCING QUICK GUIDE

### For Each Blog Post, You Need:

| # | Image Type | Suggested AI Prompt | Stock Search Terms |
|---|------------|--------------------|--------------------|
| 1 | Hero | "Modern bright apartment with cat, clean minimalist interior, happy owner, lifestyle photography" | "cat owner apartment modern" |
| 2 | Problem | "Person looking concerned near litter box, soft lighting, editorial style" | "frustrated pet owner" "holding nose" |
| 3 | Science/Solution | "Activated carbon granules close-up, clean laboratory aesthetic" OR "water filtration system" | "water filter carbon" "air purifier" |
| 4 | Result/Happy | "Relaxed cat in clean bright home, sunlight, peaceful atmosphere" | "happy cat home" "fresh apartment" |

### Image Implementation Checklist

```markdown
For each image in the post:

□ Filename: {primary-keyword}-{purpose}.webp
□ Alt text: "{Primary keyword} - {descriptive action/emotion}"
□ Width: 1200px minimum
□ Height: 630px minimum (16:9 ratio)
□ File size: Under 200KB
□ Lazy loading: Yes (except hero)
□ Caption: Optional keyword-rich description
```

### Existing Image Assets to Check First

Before creating/sourcing new images, check:
- `/public/optimized/blog/` - existing blog images
- `/public/optimized/` - product and general images
- `/public/images/` - additional assets

---

## POST-GENERATION CHECKLIST

Before publishing any generated post:

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
- [ ] Word count: 1,800-2,800
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
- [ ] Benefits: Cat-Friendly, High-Performance, Simple

### Images
- [ ] 4 image placeholders with SEO alt text
- [ ] Hero image for social sharing
- [ ] All alt text includes primary keyword
- [ ] File naming convention followed

### Technical
- [ ] Dark mode CSS classes if using styled components
- [ ] Mobile-responsive formatting
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] No broken internal links
