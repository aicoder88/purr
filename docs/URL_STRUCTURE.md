# Purrify URL Structure Guide

This document defines the URL architecture for purrify.ca, providing consistent patterns for SEO optimization and content organization.

---

## URL Pattern Reference

| URL Pattern | Purpose | Examples |
|-------------|---------|----------|
| `/` (root level) | High-value SEO landing pages | `/ammonia-control`, `/odor-control` |
| `/products/` | Product catalog and individual products | `/products`, `/products/standard`, `/products/trial-size` |
| `/learn/` | Educational content hub | `/learn/how-it-works`, `/learn/science`, `/learn/faq` |
| `/learn/solutions/` | Problem-specific solution guides | `/learn/solutions/multi-cat-odor`, `/learn/solutions/ammonia-smell-cat-litter` |
| `/blog/` | Blog posts and articles | `/blog/[slug]`, `/blog/category/[slug]` |
| `/locations/` | Geographic landing pages | `/locations/on`, `/locations/montreal` |
| `/support/` | Customer support pages | `/support/shipping`, `/support/subscription` |

---

## Content Placement Guidelines

### Root-Level Pages (`/`)
**Use for:** High-value SEO landing pages targeting specific keywords with high commercial intent.

**Characteristics:**
- Conversion-focused content
- Strong CTAs to products
- Comprehensive coverage of a single topic
- Targets competitive keywords

**Examples:**
- `/ammonia-control` - Targets "ammonia control cat litter"
- Future: `/odor-control`, `/multi-cat-solutions`

**Why root level?** Shorter URLs have slight SEO advantage and are easier to share. Reserve for your most important keyword targets.

---

### `/products/` Directory
**Use for:** Product catalog and individual product pages.

**Structure:**
```
/products/              # Main catalog (lists all products, helps users choose)
/products/standard      # Individual product detail page
/products/family-pack   # Individual product detail page
/products/trial-size    # Individual product detail page
```

**Note:** The `/products` page serves as both a catalog and a comparison tool. There is no separate `/products/compare` page.

---

### `/learn/` Directory
**Use for:** Educational content that establishes expertise and helps users understand the product category.

**Structure:**
```
/learn/                        # (if index exists) Learning hub
/learn/how-it-works            # Product mechanics
/learn/science                 # Deep-dive technical content
/learn/safety                  # Safety information
/learn/faq                     # Frequently asked questions
/learn/cat-litter-guide        # Category education
/learn/solutions/              # Problem-specific guides (see below)
```

---

### `/learn/solutions/` Subdirectory
**Use for:** SEO content targeting specific problems users search for.

**Characteristics:**
- Informational intent (user researching a problem)
- Links to products as solutions
- Part of topic clusters that support root-level landing pages

**Examples:**
```
/learn/solutions/ammonia-smell-cat-litter
/learn/solutions/multi-cat-odor-control
/learn/solutions/apartment-cat-smell-solution
/learn/solutions/natural-cat-litter-additive
```

**Relationship to root pages:**
- Root page (`/ammonia-control`) = commercial intent, conversion-focused
- Solution page (`/learn/solutions/ammonia-smell-cat-litter`) = informational intent, education-focused
- They should link to each other to create topic clusters

---

### `/blog/` Directory
**Use for:** Time-sensitive content, news, guides, and long-form articles.

**Structure:**
```
/blog/                         # Blog index
/blog/[slug]                   # Individual posts
/blog/category/[slug]          # Category archives
/blog/tag/[slug]               # Tag archives
```

**Difference from `/learn/`:**
- Blog = dated content, can be more casual, news-oriented
- Learn = evergreen reference content, more formal

---

## Decision Framework: Where Does New Content Go?

```
Is it about a specific product?
  YES → /products/[product-slug]
  NO ↓

Is it targeting a high-value keyword with commercial intent?
  YES → / (root level)
  NO ↓

Is it answering a specific problem/question users search for?
  YES → /learn/solutions/[problem-slug]
  NO ↓

Is it educational/evergreen reference content?
  YES → /learn/[topic-slug]
  NO ↓

Is it timely, news-oriented, or a casual guide?
  YES → /blog/[slug]
```

---

## Internal Linking Strategy

### Topic Clusters
Create clusters around main topics:

```
AMMONIA CONTROL CLUSTER:
├── /ammonia-control (pillar - commercial intent)
├── /learn/solutions/ammonia-smell-cat-litter (informational)
├── /learn/solutions/how-to-neutralize-ammonia-cat-litter (informational)
├── /blog/ammonia-cat-litter-facts (blog content)
└── /products (product solution)
```

### Link Flow
1. **Pillar pages** link to all related content
2. **Solution pages** link to pillar and products
3. **Blog posts** link to relevant learn and product pages
4. **Product pages** link to relevant learn content

---

## Canonical URLs

- Always use `https://www.purrify.ca` (with www)
- Localized pages use `/fr/` and `/zh/` prefixes
- Set canonical URLs explicitly on all pages

---

## Redirects

Old URLs should redirect to new locations. Current redirects are maintained in `next.config.js`.

Key redirect:
- `/products/compare` → `/products` (permanent redirect)

---

## Future Considerations

When adding new content types, consider:

1. **Search intent** - What is the user trying to accomplish?
2. **Keyword competition** - Is this a high-value target?
3. **Content relationship** - What does this support?
4. **User journey** - Where does this fit in the funnel?

---

*Last updated: December 2024*
