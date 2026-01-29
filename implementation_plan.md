# Blog & Page Visual/Content Improvement Plan

## Goal Description
The site has two content types with quality variance:
1.  **Blog posts** (`content/blog/en/*.json`) – 31 files
2.  **Static pages** (`pages/learn/*.tsx`) – 22 files (FAQ, solutions, glossary, etc.)

Issues:
- **Visual**: Clustered images, "wall of text" sections.
- **Content**: Thin posts, weak hooks, missing viral/SEO elements.
- **Technical**: Potential duplication, thin content, performance gaps.

This plan systematically audits and improves **both content types**.

## User Review Required
> [!IMPORTANT]
> - **Iterative Execution**: To prevent context window overflow, I will process content in **batches of 1-3 files**.
> - **State Tracking**: I will maintain an `audit_progress.json` artifact to track which files are `pending`, `in_progress`, and `completed`.

---

## Workflow Strategy: The "One-at-a-Time" Loop

To maintain high quality and avoid context limits, execution will follow this strict loop:

1.  **Select Target**: Pick the highest-priority "Needs Enhancement" file from `audit_progress.json`.
2.  **Analyze & Plan**: Read *only* that file and relevant context. Determine specific fixes (visual, content, SEO).
3.  **Execute**: Apply changes (redistribute images, rewrite hook, optimize SEO).
4.  **Verify**: Check syntax and local preview.
5.  **Commit**: Mark as `completed` in tracker.
6.  **Rotate**: Clear context (if possible) or proceed to next single file.

---

## Scope

### Blog Posts (31 files)
`content/blog/en/*.json`

### Static Pages (22 files)
| Category | Files |
|----------|-------|
| **Root Learn** | `faq.tsx`, `glossary.tsx`, `safety.tsx`, `science.tsx`, `how-it-works.tsx`, etc. |
| **Solutions** | `apartment-cat-smell-solution.tsx`, `multiple-cats-odor-control.tsx`, etc. (7 files) |
| **Alternatives** | `arm-and-hammer-cat-litter-deodorizer-alternative.tsx` |

---

## Phase 1: Comprehensive Audit

### Visual Audit
| Rating | Criteria |
|--------|----------|
| **Front-loaded** | Images in first 25% only |
| **Sparse** | < 1 image per 400 words |
| **Good** | Well-distributed |

### Content Quality Audit
| Criteria | What to Check |
|----------|---------------|
| **Word Count** | ≥ 800 words (blog), ≥ 500 words (pages) |
| **Hook** | Grabs attention in first 2 sentences? |
| **Viral Factor** | Surprising stats, share-worthy nuggets? |
| **SEO Keywords** | Target keyword in H1, H2s, first 100 words? |
| **Readability** | Short paragraphs, bullet points? |
| **CTA Strength** | Clear action at end? |

### Uniqueness Audit
| Check | Purpose |
|-------|---------|
| **Title Similarity** | Flag posts with > 70% similar titles (cannibalization risk) |
| **Content Overlap** | Identify duplicate paragraphs across posts |
| **Intent Differentiation** | Ensure each page has unique search intent |

### Technical SEO Audit
| Check | What to Verify |
|-------|----------------|
| **Meta Title** | 50-60 chars, includes keyword |
| **Meta Description** | 150-160 chars, compelling |
| **Heading Hierarchy** | Single H1, logical H2/H3 structure |
| **Image Alt Text** | All images have descriptive alt |
| **Internal Links** | Links to related content |
| **Canonical URL** | Properly set |

Posts/pages scoring < 3 average = **Needs Enhancement**.

---

## Phase 2: Visual Enhancement
*(For "Front-loaded" or "Sparse" items)*

#### [MODIFY] Blog: `content/blog/en/*.json`
#### [MODIFY] Pages: `pages/learn/*.tsx`
- Redistribute existing images.
- **Resize/Constraint Images**: Ensure images are not proportionally too large on desktop (e.g., use `max-w-3xl` or `aspect-video`).
- Generate new Ghibli-style images for text-heavy sections.
- Target: 1 image per ~300 words.

---

## Phase 3: Content Enhancement
*(For items scoring < 3)*

1.  **Expand Thin Content** – Minimum 800 words (blog), 500 words (pages).
2.  **Strengthen Hook** – Add surprising stat or bold claim.
3.  **Inject Viral Elements** – Add quotable callouts, myth-busting.
4.  **SEO Optimization** – Keywords in H1, first H2, first 100 words.
5.  **Improve Readability** – Break long paragraphs, add bullets.
6.  **Strengthen CTA** – Clear benefit-focused action.
7.  **Differentiate from Similar Content** – Unique angle, distinct keywords.

---

## Phase 4: Technical SEO & Performance
*(For items failing technical audit)*

1.  **Fix Meta Tags** – Optimize title/description length and keywords.
2.  **Heading Structure** – Ensure single H1, logical hierarchy.
3.  **Image Optimization** – Add missing alt text, ensure lazy loading.
4.  **Internal Linking** – Add 2-3 relevant internal links per page.
5.  **Canonical URLs** – Verify correct canonical for similar content.
6.  **Schema Markup** – Ensure FAQ, HowTo, Article schema where appropriate.

---

## Strategic Recommendations
1.  **Topic Clustering**: Rather than optimizing pages in isolation, we will link related pages to form "clusters" (e.g., all "Apartment" pages link to each other).
2.  **Schema Validation**: We will validate `HowTo` and `FAQ` schema to ensure rich snippets in Google.
3.  **Performance**: We will ensure all new images use `Next/Image` or equivalent optimized loading to prevent Layout Shift (CLS).

---

## Files to be Modified
**Blog posts**: ~10-15 visual, ~5-10 content, ~5 technical.
**Static pages**: ~5-10 needing improvements (TBD after audit).

---

## Verification Plan

### Automated
- **Tracker**: `audit_progress.json` will require manual "CHECK" confirmation before marking as complete.
- **Audit Script**: Run before and after each batch to verify metrics.

### Manual
- Browser preview for *every* modified page in the batch.
- Verify internal links point to valid URLs.
