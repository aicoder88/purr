# Purrify Site Improvement Plan

**Goal**: Transform Purrify.ca into a high-volume, high-profit B2C e-commerce platform with optimized sales funnels, enhanced trust signals, improved SEO, faster performance, and elegant design.

**Current State**: 60+ pages including 3 product tiers, blog, learn pages, checkout with referral system, i18n support (EN/FR/ZH), Stripe integration.

---

## 1. Sales & Revenue Optimization

### 1.1 Post-Purchase Upsell Flow
- **Current Gap**: Thank-you page only shows order confirmation with no upsells
- **Implementation**:
  - Create `/pages/thank-you/upsell.tsx` - One-time special offer page
  - Add 25% discount on subscription autoship after first purchase
  - "Add to your order" button with one-click purchase (Stripe saved payment)
  - Countdown timer: "This offer expires in 10:00 minutes"

### 1.2 Order Bumps on Checkout
- **Current Gap**: Checkout has no order bump/cross-sell
- **Implementation**:
  - Add "Add Trial Size for $2.99 (Save 40%)" checkbox on step 1
  - Show "Upgrade to Family Pack - Save $15" on cart summary
  - Pre-checked add-on for cat litter scoop ($4.99)

### 1.3 Subscription Push
- **Current**: Subscription offer exists but not prominent
- **Improvements**:
  - Add "Subscribe & Save 20%" badge on all product pages
  - Default to subscription option (not one-time) on product pages
  - Show "Next delivery: auto-calculated date" on checkout

### 1.4 Bundle Pages
- **Create** `/pages/products/bundles.tsx`:
  - "Starter Kit" - Trial + Standard ($29.99)
  - "Multi-Cat Bundle" - 3x Family Pack ($89.99)
  - "Yearly Supply" - 4x Family Pack + Free Scoop ($119.99)

---

## 2. Trust & Social Proof

### 2.1 Real-Time Purchase Notifications
- **Current**: Checkout has notifications but disabled on homepage
- **Enable globally** with smart frequency (every 45-90 seconds)
- Add location data: "Sarah from Toronto just purchased..."

### 2.2 Enhanced Review System
- Add verified purchase badges
- Enable photo reviews with lazy-loaded gallery
- Show "127 verified buyers" with faces near buy buttons
- Add video testimonials section

### 2.3 Trust Badges Upgrade
- Add "As Seen On" media logos section
- Display "10,000 Happy Cats" counter with animation
- Show "Veterinarian Recommended" badge (if applicable)
- Display real-time inventory: "Only 23 left in stock"

### 2.4 Guarantee Section
- Create prominent "30-Day Odor-Free Guarantee" banner
- Add FAQ: "What if it doesn't work?" with clear refund policy
- Show security badges: SSL, secure checkout, privacy

---

## 3. SEO Improvements

### 3.1 Schema.org Enhancements
- **Product Pages**: Add `Review`, `AggregateRating`, `FAQ` schemas
- **Blog Posts**: Add `Article`, `HowTo`, `FAQPage` schemas
- **All Pages**: Add `BreadcrumbList` schema
- **Homepage**: Add `LocalBusiness` and `ItemList` schemas

### 3.2 Technical SEO
- Ensure all images have descriptive alt text
- Add `loading="lazy"` to below-fold images
- Implement proper heading hierarchy (single H1 per page)
- Add canonical URLs to prevent duplicates
- Create XML sitemap for images

### 3.3 Content SEO
- Add related posts section to all blog articles
- Implement internal linking widget
- Create FAQ section on each product page
- Add "People Also Ask" style expandable Q&A

### 3.4 Local SEO
- Enhance location pages with:
  - Store finder map
  - Local testimonials
  - City-specific content
- Add `LocalBusiness` schema to stockist page

---

## 4. Performance Optimization

### 4.1 Core Web Vitals
- **LCP**: Preload hero images, use srcset for responsive images
- **FID**: Reduce JavaScript bundle with more aggressive code splitting
- **CLS**: Set explicit dimensions on all media elements

### 4.2 Bundle Optimization
- Move more sections to dynamic imports
- Implement route-based code splitting
- Lazy load Stripe.js until checkout
- Use `next/dynamic` with loading skeletons

### 4.3 Image Optimization
- Convert all remaining images to WebP/AVIF
- Implement responsive images with srcset
- Use blur placeholder for images
- Lazy load images below fold

### 4.4 Caching Strategy
- Set proper Cache-Control headers
- Implement stale-while-revalidate for API routes
- Use ISR for blog posts

---

## 5. Design & UX Improvements

### 5.1 Mobile-First Enhancements
- Sticky "Buy Now" button on product pages
- Swipeable product image gallery
- Thumb-friendly button placement
- One-tap checkout with Apple/Google Pay

### 5.2 Visual Hierarchy
- Larger product images on PDP
- Price comparison strikethrough styling
- "Most Popular" tag on Standard size
- Progress indicator on checkout

### 5.3 Micro-Animations
- Button hover effects
- Smooth scroll to sections
- Cart "bounce" when item added
- Confetti on order completion

### 5.4 Dark Mode Polish
- Ensure all components have proper dark variants
- Check contrast ratios meet WCAG AA
- Test with system preference detection

---

## 6. Email & Retention

### 6.1 Transactional Emails
- Enhanced order confirmation with product tips
- Shipping notification with tracking
- Delivery confirmation with review request

### 6.2 Marketing Automation
- Cart abandonment email sequence (1hr, 24hr, 72hr)
- Post-purchase sequence: Tips → Review Request → Upsell
- Win-back campaign for lapsed customers

### 6.3 Newsletter
- Exit-intent popup with 10% discount offer
- Preference center for email frequency
- Referral program promotion in footer

---

## 7. New Pages to Create

| Page | Purpose | Priority |
|------|---------|----------|
| `/products/bundles` | Bundle deals for higher AOV | High |
| `/thank-you/upsell` | Post-purchase upsell | High |
| `/compare` | vs competitors comparison | Medium |
| `/guarantee` | Full refund policy details | Medium |
| `/rewards` | Loyalty program landing | Medium |
| `/app` | Mobile app promotion | Low |

---

## 8. Technical Debt & Improvements

### 8.1 Code Quality
- [ ] Migrate from Google Maps Embed to React-Leaflet
- [ ] Create shared ProductCard component
- [ ] Consolidate pricing logic in single module
- [ ] Add E2E tests for checkout flow

### 8.2 Infrastructure
- [ ] Set up A/B testing framework
- [ ] Implement analytics event tracking
- [ ] Add error monitoring (Sentry)
- [ ] Set up uptime monitoring

---

## Implementation Priority

### Phase 1 (Week 1-2): Quick Wins
1. Enable purchase notifications site-wide
2. Add order bump to checkout
3. Enhance thank-you page with upsell CTA
4. Add FAQ schema to product pages

### Phase 2 (Week 3-4): Revenue Focus
1. Create bundle products page
2. Build upsell page flow
3. Add subscription toggle to product pages
4. Implement exit-intent popup

### Phase 3 (Week 5-6): Trust & SEO
1. Add video testimonials section
2. Implement breadcrumb schema everywhere
3. Create /compare page
4. Enhance local SEO for location pages

### Phase 4 (Week 7-8): Performance
1. Audit and fix Core Web Vitals
2. Optimize checkout bundle size
3. Add image srcset everywhere
4. Implement email marketing flows

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Conversion Rate | ~2% | 4%+ |
| Average Order Value | ~$25 | $40+ |
| Subscription Rate | ~5% | 20%+ |
| Cart Abandonment | ~70% | 50% |
| Page Speed Score | ~75 | 90+ |
| SEO Visibility | -- | Top 3 for "cat litter deodorizer" |

---

## Notes for Implementation Agents

- Always use existing translation keys or create new ones in all 3 languages
- Follow current component patterns (see `src/components/ui/`)
- Test dark mode for all new components
- Use `getPaymentLink()` from `src/lib/payment-links.ts` for Stripe links
- All prices should use `formatProductPrice()` from `src/lib/pricing.ts`
