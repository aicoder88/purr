# Ammonia Control Page - Architecture Design

## Overview

Build `/ammonia-control` as a static Next.js page using existing component patterns from the codebase. The page will reuse existing section components where possible and create minimal new components.

---

## File Structure

```
pages/
└── ammonia-control.tsx              # Main page file

src/components/sections/
├── landing/                          # New folder for landing page sections
│   ├── LandingHero.tsx              # Configurable hero for landing pages
│   ├── ProblemSection.tsx           # "Status quo" problem cards
│   ├── SolutionSection.tsx          # How it works with diagram
│   ├── BenefitPillars.tsx           # Three-column benefits
│   ├── StatsBar.tsx                 # Statistics on colored background
│   └── FinalCTA.tsx                 # Contrasting CTA section

src/translations/
├── en.ts                             # Add ammonia.* keys
├── fr.ts                             # Add ammonia.* keys
└── zh.ts                             # Add ammonia.* keys

public/images/landing/
└── ammonia-diagram.webp              # How zeolite works diagram
```

---

## Component Architecture

### Page Composition

```tsx
// pages/ammonia-control.tsx

<>
  <NextSeo {...seoConfig} />
  <JsonLd {...structuredData} />

  <LandingHero
    headline={t.ammonia.hero.headline}
    subheadline={t.ammonia.hero.subheadline}
    primaryCTA={{ label: t.ammonia.hero.cta, href: "/products" }}
    secondaryCTA={{ label: t.ammonia.hero.secondaryCta, href: "#how-it-works" }}
    image="/images/landing/ammonia-hero.webp"
  />

  <TrustBar
    customerCount="10,000+"
    rating={4.9}
    reviewCount={500}
  />

  <ProblemSection
    headline={t.ammonia.problem.headline}
    problems={problemCards}
  />

  <SolutionSection
    id="how-it-works"
    headline={t.ammonia.solution.headline}
    description={t.ammonia.solution.description}
    diagramSrc="/images/landing/ammonia-diagram.webp"
  />

  <BenefitPillars
    headline={t.ammonia.benefits.headline}
    pillars={benefitPillars}
  />

  <Testimonials testimonials={filteredTestimonials} />

  <StatsBar stats={ammoniaStats} />

  <FAQ
    headline={t.ammonia.faq.headline}
    items={ammoniaFaqItems}
  />

  <BlogPreview posts={relatedPosts} />

  <FinalCTA
    headline={t.ammonia.cta.headline}
    subheadline={t.ammonia.cta.subheadline}
    primaryCTA={{ label: t.ammonia.cta.button, href: "/products" }}
    benefits={[t.ammonia.cta.benefit1, t.ammonia.cta.benefit2]}
  />
</>
```

---

## New Components

### 1. LandingHero

**Purpose:** Configurable hero section for landing pages (different from homepage hero)

**Props:**
```typescript
interface LandingHeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  image: string;
  imageAlt?: string;
}
```

**Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  [Breadcrumb: Home > Ammonia Control]                      │
│                                                            │
│  ┌─────────────────────────┐  ┌─────────────────────────┐ │
│  │ H1 Headline             │  │                         │ │
│  │                         │  │      [Hero Image]       │ │
│  │ Subheadline text        │  │                         │ │
│  │                         │  │                         │ │
│  │ [Primary CTA] [Link]    │  │                         │ │
│  └─────────────────────────┘  └─────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**Styling:**
- bg-white dark:bg-gray-900
- Two-column layout (text left, image right)
- Stacks on mobile

---

### 2. TrustBar

**Purpose:** Compact social proof strip below hero

**Props:**
```typescript
interface TrustBarProps {
  customerCount: string;
  rating: number;
  reviewCount: number;
  badges?: Array<{ src: string; alt: string }>;
}
```

**Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  ★★★★★ 4.9 (500 reviews)  •  10,000+ happy cats  •  [Badge]│
└────────────────────────────────────────────────────────────┘
```

**Styling:**
- bg-gray-50 dark:bg-gray-800
- Centered, horizontal layout
- py-4

---

### 3. ProblemSection

**Purpose:** Frame the problem with three pain point cards

**Props:**
```typescript
interface ProblemSectionProps {
  headline: string;
  problems: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}
```

**Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  H2: Why Scented Litters Don't Work                        │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ [Icon]       │ │ [Icon]       │ │ [Icon]       │       │
│  │ Masking      │ │ Health Risks │ │ Costly       │       │
│  │ Description  │ │ Description  │ │ Description  │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
└────────────────────────────────────────────────────────────┘
```

**Styling:**
- bg-white dark:bg-gray-900
- Three-column grid (stacks on mobile)
- Cards with subtle shadow, rounded corners

---

### 4. SolutionSection

**Purpose:** Explain how zeolite works with visual diagram

**Props:**
```typescript
interface SolutionSectionProps {
  id?: string;
  headline: string;
  description: string;
  diagramSrc: string;
  diagramAlt?: string;
}
```

**Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  bg-tint (light blue / dark:gray-800)                      │
│                                                            │
│  H2: The Science of True Odor Elimination                  │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │              [Diagram: How Zeolite Works]            │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Description paragraph explaining the science              │
└────────────────────────────────────────────────────────────┘
```

**Styling:**
- bg-blue-50 dark:bg-gray-800 (tinted background)
- Centered diagram
- Max-width prose for description

---

### 5. BenefitPillars

**Purpose:** Three key benefits with icons

**Props:**
```typescript
interface BenefitPillarsProps {
  headline: string;
  pillars: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    link?: { label: string; href: string };
  }>;
}
```

**Styling:**
- bg-white dark:bg-gray-900
- Three-column grid
- Icons: 64px, brand color
- Cards without background (clean)

---

### 6. StatsBar

**Purpose:** Key statistics on colored background

**Props:**
```typescript
interface StatsBarProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}
```

**Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  bg-tint-medium (stronger blue / dark:gray-700)            │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   30+    │  │   50%    │  │ 10,000+  │  │  4.9★    │   │
│  │  days    │  │  saved   │  │   cats   │  │  rating  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────────────────────────────────────────┘
```

**Styling:**
- bg-blue-100 dark:bg-gray-700
- Four-column grid (2x2 on mobile)
- Numbers: text-5xl font-bold
- Labels: text-sm text-gray-600

---

### 7. FinalCTA

**Purpose:** Contrasting call-to-action section

**Props:**
```typescript
interface FinalCTAProps {
  headline: string;
  subheadline?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  benefits?: string[];
}
```

**Styling:**
- bg-brand-green dark:bg-brand-green (solid primary color)
- White text
- Centered content
- Checkmark icons for benefits

---

## Reused Components

| Component | Location | Usage |
|-----------|----------|-------|
| Container | `src/components/ui/container.tsx` | Wraps all sections |
| FAQ | `src/components/sections/faq.tsx` | FAQ accordion |
| Testimonials | `src/components/sections/testimonials.tsx` | Customer quotes |
| BlogPreview | `src/components/sections/blog-preview.tsx` | Related articles |
| Button | `src/components/ui/Button.tsx` | All CTAs |

---

## Data Models

### Translation Keys

```typescript
// Add to src/translations/en.ts

ammonia: {
  meta: {
    title: "Ammonia Control for Cat Litter | Natural Odor Elimination | Purrify",
    description: "Eliminate litter box ammonia smell with Purrify's natural zeolite formula. Controls odor at the source for 30+ days. Safe for cats.",
  },
  hero: {
    headline: "Ammonia Control: Eliminate Litter Box Odor at the Source",
    subheadline: "Purrify's natural zeolite formula traps ammonia molecules before they become airborne, keeping your home fresh for 30+ days.",
    cta: "Shop Now",
    secondaryCta: "See How It Works",
  },
  problem: {
    headline: "Why Scented Litters Don't Work",
    card1: {
      title: "Masking, Not Solving",
      description: "Fragrances cover up ammonia smell temporarily but don't eliminate the source.",
    },
    card2: {
      title: "Health Concerns",
      description: "Artificial scents can irritate sensitive cats and humans with allergies.",
    },
    card3: {
      title: "Constant Cost",
      description: "Frequent litter changes to manage odor add up quickly.",
    },
  },
  solution: {
    headline: "The Science of True Odor Elimination",
    description: "Zeolite is a natural volcanic mineral with a microporous structure that physically traps ammonia molecules. Unlike masking agents, zeolite captures odor at the molecular level and holds it permanently.",
  },
  benefits: {
    headline: "Why Cat Parents Choose Purrify",
    pillar1: {
      title: "Natural Science",
      description: "100% natural zeolite and activated charcoal. No chemicals, fragrances, or additives.",
    },
    pillar2: {
      title: "Long-Lasting",
      description: "One application protects for 30+ days, reducing litter changes by up to 50%.",
    },
    pillar3: {
      title: "Safe & Gentle",
      description: "Vet-approved formula safe for cats of all ages, including kittens.",
    },
  },
  stats: {
    days: { value: "30+", label: "Days of Freshness" },
    savings: { value: "50%", label: "Less Litter Changes" },
    customers: { value: "10,000+", label: "Happy Cats" },
    rating: { value: "4.9★", label: "Customer Rating" },
  },
  faq: {
    headline: "Common Questions About Ammonia Control",
    // ... faq items
  },
  cta: {
    headline: "Ready for a Fresh-Smelling Home?",
    subheadline: "Join thousands of cat parents who've eliminated litter box odor for good.",
    button: "Shop Purrify",
    benefit1: "Free shipping over $35",
    benefit2: "30-day satisfaction guarantee",
  },
}
```

### FAQ Data

```typescript
const ammoniaFaqItems = [
  {
    question: t.ammonia.faq.q1,
    answer: t.ammonia.faq.a1,
  },
  // ... 7 more items
];
```

### Statistics Data

```typescript
const ammoniaStats = [
  { value: "30+", label: t.ammonia.stats.days.label },
  { value: "50%", label: t.ammonia.stats.savings.label },
  { value: "10,000+", label: t.ammonia.stats.customers.label },
  { value: "4.9★", label: t.ammonia.stats.rating.label },
];
```

---

## SEO & Structured Data

### NextSeo Config

```typescript
const seoConfig = {
  title: t.ammonia.meta.title,
  description: t.ammonia.meta.description,
  canonical: `https://purrify.ca/${locale === 'en' ? '' : locale + '/'}ammonia-control`,
  openGraph: {
    title: t.ammonia.meta.title,
    description: t.ammonia.meta.description,
    url: `https://purrify.ca/ammonia-control`,
    type: 'website',
    images: [{ url: '/images/og/ammonia-control.jpg', width: 1200, height: 630 }],
  },
};
```

### JSON-LD Schemas

```typescript
// Product Schema
{
  "@type": "Product",
  "name": "Purrify Cat Litter Deodorizer",
  "description": "Natural zeolite-based ammonia control for cat litter",
  "brand": { "@type": "Brand", "name": "Purrify" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500"
  },
  "offers": { ... }
}

// FAQPage Schema
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Purrify control ammonia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    },
    // ... more questions
  ]
}

// BreadcrumbList Schema
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://purrify.ca" },
    { "@type": "ListItem", "position": 2, "name": "Ammonia Control", "item": "https://purrify.ca/ammonia-control" }
  ]
}
```

---

## Routing & Navigation

- **URL:** `/ammonia-control` (English), `/fr/ammonia-control` (French), `/zh/ammonia-control` (Chinese)
- **Breadcrumb:** Home > Ammonia Control
- **Internal Links:**
  - Hero CTA → /products
  - Blog cards → /blog/[slug]
  - Final CTA → /products

---

## Color Mapping

Using existing theme-utils.ts colors:

| Section | Light Mode | Dark Mode |
|---------|------------|-----------|
| Hero | bg-white | bg-gray-900 |
| Trust Bar | bg-gray-50 | bg-gray-800 |
| Problem | bg-white | bg-gray-900 |
| Solution | bg-blue-50 | bg-gray-800 |
| Benefits | bg-white | bg-gray-900 |
| Testimonials | bg-gray-50 | bg-gray-800 |
| Stats | bg-blue-100 | bg-gray-700 |
| FAQ | bg-white | bg-gray-900 |
| Related | bg-gray-50 | bg-gray-800 |
| Final CTA | bg-brand-green | bg-brand-green |

---

## Performance Considerations

1. **Static Generation:** Page will be statically generated at build time
2. **Image Optimization:** Use next/image for all images
3. **Lazy Loading:** Testimonials and BlogPreview can be dynamically imported
4. **Critical CSS:** Above-fold sections (Hero, TrustBar) rendered immediately

---

## Dependencies

- Existing: NextSeo, next/image, Container, Button, FAQ, Testimonials, BlogPreview
- New components: 7 (listed above)
- Translations: 3 files to update
- Images: 2-3 new images needed (hero, diagram)

---

*Phase 2 Complete*
