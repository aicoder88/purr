# Ammonia Control Landing Page - Requirements

## Overview

Create a high-converting SEO landing page at `/ammonia-control` targeting users searching for solutions to cat litter ammonia odor. This page will serve middle-of-funnel traffic and drive conversions to the product page.

---

## User Stories

### US-1: Information Seeker
As a cat owner researching ammonia smell solutions, I want to understand why my litter box smells like ammonia and how to fix it, so I can make my home smell fresh again.

### US-2: Solution Evaluator
As a cat owner comparing odor control options, I want to see how Purrify's approach differs from other solutions, so I can decide if it's right for me.

### US-3: Ready Buyer
As a cat owner ready to solve my ammonia problem, I want clear pricing and an easy path to purchase, so I can buy quickly.

---

## Acceptance Criteria

### Page Structure

**AC-1.1: Hero Section**
WHEN user lands on the page THE SYSTEM SHALL display:
- H1 headline containing "ammonia" keyword
- Subheadline explaining the benefit (1-2 sentences)
- Primary CTA button linking to product page
- Secondary CTA link to "How It Works" section
- Hero image (product illustration or lifestyle)

**AC-1.2: Trust Bar**
THE SYSTEM SHALL display a trust bar containing:
- Customer count ("10,000+ cat parents")
- Star rating with review count
- At minimum 1 trust signal (review platform badge or "As seen in")

**AC-1.3: Problem Section**
THE SYSTEM SHALL display a "Status Quo" problem section with:
- Section headline framing the problem
- Three pain point cards (masking vs solving, health concerns, cost)
- Each card with icon, headline, and 1-2 sentence description

**AC-1.4: Solution Section**
THE SYSTEM SHALL display a solution introduction with:
- Section headline introducing Purrify's approach
- Visual diagram or illustration showing how zeolite works
- 2-3 sentences explaining the science simply

**AC-1.5: Benefits Pillars**
THE SYSTEM SHALL display exactly three benefit pillars:
- Each pillar with icon, headline, and description
- Suggested pillars: Natural Science / Long-Lasting / Safe & Gentle
- Each pillar links to relevant content or anchor

**AC-1.6: Testimonials**
THE SYSTEM SHALL display customer testimonials:
- Minimum 3 testimonials in carousel format
- Each with quote, customer name/location, star rating
- "Verified Buyer" badge where applicable

**AC-1.7: Statistics Section**
THE SYSTEM SHALL display key statistics on tinted background:
- 3-4 statistics with large numbers and short labels
- Statistics: days of freshness, litter savings %, customer count, rating

**AC-1.8: FAQ Section**
THE SYSTEM SHALL display 5-8 FAQs in accordion format:
- Questions ordered by buyer journey (how it works → safety → usage → comparison)
- Each answer 2-4 sentences
- Schema markup for FAQPage

**AC-1.9: Related Content**
THE SYSTEM SHALL display 2-3 related items:
- Mix of products and blog articles
- Each with image, title, and CTA

**AC-1.10: Final CTA**
THE SYSTEM SHALL display a final call-to-action section:
- Contrasting background color (brand primary)
- Headline encouraging action
- Primary and secondary CTA buttons
- Trust reinforcements (free shipping, guarantee)

### Visual Design

**AC-2.1: Color Rhythm**
THE SYSTEM SHALL alternate section backgrounds:
- White for Hero, Problem, Features, FAQ
- Light tint for Solution, Testimonials
- Medium tint for Statistics
- Solid primary for Final CTA

**AC-2.2: Image Density**
THE SYSTEM SHALL include visual elements every 2-3 sections:
- Minimum 6 images/illustrations total
- No stock photography
- Consistent illustration style

**AC-2.3: Dark Mode**
THE SYSTEM SHALL support dark mode with appropriate color variants for all sections.

**AC-2.4: Mobile Responsive**
THE SYSTEM SHALL be fully responsive:
- 3-column layouts stack to single column
- Statistics display as 2x2 grid
- Touch targets minimum 44px
- Hero CTA visible without scroll

### SEO Requirements

**AC-3.1: Meta Tags**
THE SYSTEM SHALL include:
- Title tag: "Ammonia Control for Cat Litter | Natural Odor Elimination | Purrify"
- Meta description: 150-160 characters including keyword and CTA
- Canonical URL

**AC-3.2: Schema Markup**
THE SYSTEM SHALL include structured data:
- Product schema with ratings
- FAQPage schema
- BreadcrumbList schema

**AC-3.3: Header Hierarchy**
THE SYSTEM SHALL use proper heading structure:
- Single H1 containing primary keyword
- H2 for each major section
- H3 for subsections/cards

**AC-3.4: Internal Links**
THE SYSTEM SHALL link to:
- Product page (multiple CTAs)
- Related blog articles
- Other landing pages (when created)

### Performance

**AC-4.1: Load Time**
THE SYSTEM SHALL load in under 3 seconds on 3G connection.

**AC-4.2: Image Optimization**
THE SYSTEM SHALL use:
- Next.js Image component with optimization
- Lazy loading for below-fold images
- WebP format where supported

### Analytics

**AC-5.1: Tracking**
THE SYSTEM SHALL track:
- Page views
- Scroll depth
- CTA clicks (by section)
- Time on page

---

## Content Requirements

### Headlines (Draft)
- H1: "Ammonia Control: Eliminate Litter Box Odor at the Source"
- Problem: "Why Scented Litters Don't Work"
- Solution: "The Science of True Odor Elimination"
- Benefits: "Why Cat Parents Choose Purrify"
- FAQ: "Common Questions About Ammonia Control"
- Final CTA: "Ready for a Fresh-Smelling Home?"

### Statistics to Display
- "30+" days of freshness
- "50%" less litter changes needed
- "10,000+" happy cats served
- "4.9★" average customer rating

### FAQ Topics
1. How does Purrify control ammonia?
2. Is zeolite safe for cats?
3. How much Purrify do I use?
4. Does it work with all litter types?
5. How is this different from baking soda?
6. Will it eliminate existing odors?
7. Is it safe for kittens?
8. How long does one bag last?

---

## Out of Scope
- Video content
- Interactive quiz
- Email capture form
- Live chat widget
- Price calculator

---

## Dependencies
- Existing product page for CTA links
- Blog articles for related content links
- Customer reviews data
- Product images/illustrations

---

*Phase 1 Complete*
