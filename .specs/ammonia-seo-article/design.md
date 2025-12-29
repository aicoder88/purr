# Architecture Design: Ammonia-Focused SEO Blog Article

## Overview
A new blog post optimized for ammonia-related search queries, following existing blog content patterns and leveraging reusable image assets.

## Content Architecture

### Article Structure
```
how-to-neutralize-ammonia-cat-litter.json
├── Header Section
│   ├── Category badge: "Odor Control"
│   ├── H1: "How to Neutralize Ammonia in Cat Litter: 5 Proven Methods"
│   ├── Subtitle with direct answer (featured snippet bait)
│   └── Meta: Date, Reading time
│
├── Hero Image
│   └── New image from Unsplash/Pexels (cat in fresh home)
│
├── Section 1: Why Cat Litter Smells Like Ammonia
│   ├── Science explanation (urea → bacteria → ammonia)
│   ├── Image: NEW - Ammonia molecule (NH3) diagram
│   └── Links to: /blog/cat-litter-odor-myths
│
├── Section 2: 5 Methods to Neutralize Ammonia
│   ├── Method 1: Activated Carbon (most effective)
│   ├── Method 2: Improved ventilation
│   ├── Method 3: Frequent scooping schedule
│   ├── Method 4: Enzyme cleaners for deep cleaning
│   ├── Method 5: Litter box placement optimization
│   └── Image: /optimized/activated-carbon-granules.webp
│
├── Section 3: Why Purrify's Carbon is Optimized for Ammonia ⭐ NEW
│   ├── Ammonia molecule size (~0.26nm)
│   ├── Pore size distribution explanation:
│   │   ├── Micropores (<2nm) - trap ammonia
│   │   ├── Mesopores (2-50nm) - allow access
│   │   └── Macropores (>50nm) - entry points
│   ├── Image: NEW - Pore structure visualization
│   ├── Surface area comparison (1,150 m²/g vs baking soda 0.2 m²/g)
│   └── Testimonials box (4 from hero-testimonials.ts):
│       ├── "No more ammonia smell hitting you in the face!"
│       ├── "The activated carbon actually bonds with ammonia molecules!"
│       ├── "Zero smell itself and actually eliminates the ammonia!"
│       └── "Tried baking soda for months - this is 10x better!"
│
├── Section 4: Method Comparison Table
│   ├── Effectiveness rating
│   ├── Cost comparison
│   └── Duration of effect
│
├── Section 5: Why Baking Soda Doesn't Work
│   ├── pH science (alkaline vs alkaline)
│   └── Links to: /blog/activated-carbon-litter-additive-benefits
│
├── Section 6: FAQ (Schema markup ready)
│   ├── Q1: How do I neutralize ammonia in cat litter?
│   ├── Q2: Why does my cat litter smell like ammonia?
│   ├── Q3: What is the best cat litter for ammonia smell?
│   ├── Q4: How do you stop ammonia smell in cat litter?
│   └── Q5: What neutralizes ammonia naturally?
│
├── CTA Section
│   ├── Purrify product highlight
│   └── Link to: /products/compare
│
└── Related Articles
    ├── /blog/strong-cat-urine-smell-litter-box
    ├── /blog/activated-carbon-litter-additive-benefits
    └── /blog/cat-litter-odor-myths
```

## Image Assets

### New Images to Source (Unsplash/Pexels/Web)

| Image Need | Search Query | Alt Text (SEO optimized) |
|------------|--------------|--------------------------|
| Hero | "cat clean home fresh indoor" | "Fresh home with no cat litter ammonia smell" |
| Ammonia Molecule | "ammonia molecule NH3 structure diagram" | "Ammonia NH3 molecule structure - the odor Purrify neutralizes" |
| Pore Structure | "activated carbon micropore mesopore structure" | "Purrify's optimized micropore and mesopore distribution for trapping ammonia" |

### Reusable Existing Assets

| Image Need | Existing Asset | Alt Text (SEO optimized) |
|------------|----------------|--------------------------|
| Methods | `/optimized/activated-carbon-granules.webp` | "Activated carbon granules - best solution for cat litter ammonia smell" |
| Fallback | `/optimized/carbon_magnified_image.webp` | "Activated carbon pores that neutralize ammonia" |

## Data Model

```typescript
// Following existing blog post schema
interface BlogPost {
  id: string;
  slug: "how-to-neutralize-ammonia-cat-litter";
  title: "How to Neutralize Ammonia in Cat Litter: 5 Proven Methods";
  excerpt: string; // 150-160 chars with primary keyword
  content: string; // HTML with dark mode classes
  author: { name: "Purrify Team"; avatar: "/team-avatar.png" };
  publishDate: string; // ISO date
  modifiedDate: string;
  status: "published";
  featuredImage: {
    url: "/optimized/cat-clean-home.jpg";
    alt: string;
    width: 1200;
    height: 630;
  };
  categories: ["Odor Control"];
  tags: string[]; // All target keywords
  locale: "en";
  translations: {};
  seo: {
    title: string; // Under 60 chars
    description: string; // Under 160 chars
    keywords: string[]; // All 10 GSC queries
    ogImage: string;
    canonical: string;
  };
  readingTime: number;
}
```

## SEO Metadata Design

```json
{
  "seo": {
    "title": "How to Neutralize Ammonia in Cat Litter (5 Proven Methods)",
    "description": "Cat litter smells like ammonia? Learn what neutralizes ammonia and the best methods to stop ammonia smell in cat litter permanently.",
    "keywords": [
      "how to neutralize ammonia in cat litter",
      "cat litter smells like ammonia",
      "how to stop ammonia smell in cat litter",
      "how to neutralize ammonia smell in cat litter",
      "cat litter ammonia smell",
      "what neutralizes ammonia",
      "best cat litter for ammonia smell",
      "litter traps ammonia smells effectively",
      "ammonia cats",
      "cats ammonia"
    ],
    "ogImage": "/optimized/cat-clean-home.jpg",
    "canonical": "https://www.purrify.ca/blog/how-to-neutralize-ammonia-cat-litter"
  }
}
```

## Content Styling

Following existing blog patterns with dark mode support:

```html
<!-- Heading styles -->
<h2 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">

<!-- Body text -->
<p class="text-gray-700 dark:text-gray-200 mb-6">

<!-- Info boxes -->
<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 mb-8">

<!-- FAQ cards -->
<div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">

<!-- CTA section -->
<div class="bg-[#FF3131]/10 border border-[#FF3131]/20 rounded-lg p-8 mb-8 text-center">
```

## Internal Linking Strategy

| Link Target | Anchor Text | Context |
|-------------|-------------|---------|
| `/blog/strong-cat-urine-smell-litter-box` | "layered cleaning routine" | In methods section |
| `/blog/activated-carbon-litter-additive-benefits` | "science behind activated carbon" | In carbon section |
| `/blog/cat-litter-odor-myths` | "common myths that don't work" | In baking soda section |
| `/products/compare` | "Shop Purrify Products" | CTA button |

## File Location

```
content/blog/en/how-to-neutralize-ammonia-cat-litter.json
```

## Word Count Target

1,800-2,200 words (optimal for SEO pillar content)

---

Ready for approval? Reply `y` to proceed to Implementation Plan, or `refine [feedback]` to iterate.
