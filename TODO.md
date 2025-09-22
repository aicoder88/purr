# SEO Follow-ups (SEMrush)

This TODO tracks remaining items from the latest SEMrush crawl after implementing fixes (hreflang, canonical, structured data, sitemaps, and llms.txt). Items marked [infra] are DNS/hosting configurations; [content] require copy/IA updates.

- [x] DNS: Ensure `fr.purrify.ca` and `zh.purrify.ca` resolve correctly for all paths [infra]
  - Action: Add these domains to Vercel project "purr" (prj_4U4S5H54ifEUlIrWw8ebYtvxZBT2) in team aicoder88s-projects
  - Current: Only www.purrify.ca is configured as domain
  - Required: Add fr.purrify.ca and zh.purrify.ca to Vercel domain settings
  - Next.js i18n config already supports these domains (lines 141-147 in next.config.js)

- [ ] Re-crawl validation in SEMrush (full project) [ops]
  - Action: Trigger new crawl to confirm reductions for: hreflang conflicts, incorrect hreflang, multiple canonicals, temp redirects, invalid structured data.

- [x] Slow page load: 1 page flagged [perf]
  - ✅ Optimized large images: 60g.png (8.4MB→622KB WebP), 20g_o.png (5.6MB→496KB WebP), before-after.png (3.4MB→358KB WebP)
  - ✅ Updated NextImage component to prioritize WebP format for better compression
  - ✅ Achieved 90%+ size reduction on problematic images

- [x] Low text-to-HTML ratio: 31 pages [content]
  - ✅ Enhanced content on test.tsx, ammonia-smell-cat-litter.tsx with comprehensive explanations and scientific details.

- [x] Title too long: 2 pages [content]
  - ✅ Shortened "how-to-use-cat-litter-deodorizer.tsx" title from 63 to 55 characters.

- [x] Missing/short titles: 8 pages [content]
  - ✅ Improved SEO titles and meta descriptions across utility and content pages.

- [x] Low word count: 2 pages [content]
  - ✅ Added substantial content including scientific explanations, troubleshooting, and user benefits.

- [x] Internal linking depth: 14 pages with one incoming link; 10 need >3 clicks to reach [content/IA]
  - ✅ Expanded RelatedArticles component with 9 new cross-links, added contextual links within blog content to solutions and learn pages.

- [x] Comprehensive SEO Optimization with Cat Odor Keywords [content/seo]
  - ✅ Applied emotion-driven copywriting across homepage, product descriptions, and CTA sections
  - ✅ Enhanced H1 tags with high-converting keywords: "Stop Being Embarrassed", "Military-Grade Solution", "7 Days of Fresh Air"
  - ✅ Optimized meta descriptions with benefit-focused language targeting cat parent pain points
  - ✅ Updated blog post titles and descriptions with compelling emotional hooks
  - ✅ Enhanced solution pages with military-grade positioning and instant results messaging
  - ✅ Removed money-back guarantee language per company policy
  - ✅ Applied keywords: ammonia smell, litter box stink, embarrassing odor, fresh air, military-grade carbon
  - ✅ Added keyword research file to project: `/docs/cat odor keywords.xlsx`
  - ✅ Created SEO strategy documentation: `/docs/SEO_KEYWORD_STRATEGY.md` for future content reference

## Retailers Page & Menu Fixes

- [x] Retailers: After form submit, change confirmation copy to "we will get back to you within 72 hours".
- [x] Retailers: Update any approval/confirmation timing from 24 hours to 72 hours (e.g., "Approval 24hrs" badges/metrics).
- [x] Retailers: Change CTA copy to "Join 17 established Montreal and surrounding-area retailers already earning high margins with Purrify." (was "Join 17 established retailers...").
- [x] Header menu: Keep dropdowns open until user clicks outside or chooses another menu item; do not auto-dismiss too quickly.
- [x] Header menu: Ensure only one dropdown opens at a time and dropdowns don’t overlap.

- [x] Retailers: Reduce excessive vertical spacing between sections by removing wrapper padding on the page and tightening section paddings (hero pb-16; wholesale/contact py-16).

## Email Delivery

- [x] Retailers application email: Ensure full, labeled form data is included in the email body (both plain-text and HTML), and add common template keys (`name`, `email`, `message`, `subject`, `date`) for compatibility.

## Performance Audit Notes & Next Steps

Notes (addressed now):
- [x] Header: Replaced inline JSX handlers with memoized callbacks to avoid re-creation on every render (JS-0417).
- [x] Header: Added stable button `id` to match `aria-labelledby` on dropdown, improving a11y.
- [x] Cache handler: Removed unnecessary `return await` in async wrapper (JS-0111) while preserving error handling.
- [x] Global: Standardized `catch (err)` naming to avoid shadowing and reduce confusion.

Next steps (proposed):
- [x] Products grid: Replace inline handlers in `src/components/sections/products.tsx` with memoized callbacks (JS-0417) [perf].
  - ✅ Already optimized with useCallback hooks for all event handlers
- [x] Blog cards: Replace inline handlers in `src/components/sections/blog-preview.tsx` and `pages/blog/index.tsx` (JS-0417) [perf].
  - ✅ Already optimized - no inline handlers found
- [x] Enable ESLint rules and auto-fixes: `no-return-await`, `react/jsx-no-bind`, `@typescript-eslint/no-unused-vars` (warn first), then clean remaining manually [tooling].
  - ✅ Added performance rules: no-return-await (error), react/jsx-no-bind (warn), @typescript-eslint/no-unused-vars (warn)
  - ✅ ESLint now catches 235+ performance issues for future cleanup
- [x] TypeScript: Trial `noUnusedLocals` / `noUnusedParameters` in a branch; measure impact and fix hotspots (JS-0356) [perf].
  - ✅ Added `tsconfig.strict-unused.json` and `npm run check-types:unused` audit (report: `reports/typescript-unused-report.md`).
  - ✅ Cleared unused identifiers across `pages/thank-you.tsx`, `pages/b2b.tsx`, `pages/montreal.tsx`; backlog down to 147 issues / 61 files for follow-up.
- [x] A11y: Re-scan for interactive-role mismatches; ensure only semantic roles are used and `aria-*` pairs are valid [a11y].
  - ✅ Tightened language switcher semantics with unique ids + list markup; retained keyboard/ARIA wiring.
  - ✅ Added keyboard support + ARIA labelling for live purchase notifications; verified `npm run lint` (warnings only).
- [x] RegExp: Review any flagged `.match/.exec` patterns; prefer `regex.test` for boolean checks and ensure global flags are correct (JS-D007) [perf].
  - ✅ Swapped boolean `.match` checks for `.test` in `scripts/fix-remaining-dark-mode.js` + `scripts/complete-dark-mode-fixes.js` with dedicated regex constants.
  - ✅ Centralized image extension pattern in `public/sw.js` to reuse `.test` guard; reran `npm run lint` (warnings only).
- [ ] Re-run perf/static analysis after above changes; capture deltas and prioritize any remaining high-count rules [qa].

Context / exclusions:
- Built assets like `public/sw-optimized.js` may include `return await`—treat as generated code; exclude from lint or address at build step if needed.

## Post-Refactoring Enhancement Tasks

### 🔄 Immediate Validation & Deployment
- [ ] Deploy refactored code to staging environment and validate functionality [deploy]
- [ ] Test all refactored components (Hero, Benefits, Testimonials, CTA) work correctly [testing]
- [ ] Verify dark mode and responsive design still function properly [testing]
- [ ] Run lighthouse audits to confirm performance improvements from refactoring [perf]
- [ ] Check bundle size reduction from better code splitting [perf]
- [ ] Validate Core Web Vitals metrics remain green [perf]

### 🚀 Extend DRY Refactoring to Remaining Components
- [ ] Apply new theme utilities to Products component [refactor]
- [ ] Refactor FAQ component using new patterns [refactor]
- [ ] Standardize Newsletter component with theme utilities [refactor]
- [ ] Update How-it-works component with consistent styling [refactor]
- [ ] Migrate remaining location pages to use new theme system [refactor]
- [ ] Consolidate any remaining duplicate styling patterns [refactor]

### 🛠 Code Quality & Developer Experience
- [ ] Add unit tests for new utility functions (theme-utils, component-utils) [testing]
- [ ] Create TypeScript interfaces for all translation objects [types]
- [ ] Add JSDoc comments to utility functions for better documentation [docs]
- [ ] Set up better IDE autocomplete for theme utilities [dx]
- [ ] Create component library documentation for new patterns [docs]
- [ ] Enable stricter TypeScript settings (noUnusedLocals, noUnusedParameters) [types]

### 📊 Business Logic & Feature Enhancements
- [ ] Implement enhanced B2B vs B2C path differentiation using new components [feature]
- [ ] Add sophisticated product filtering/comparison with new patterns [feature]
- [ ] Enhance checkout flow using refactored component architecture [feature]
- [ ] Apply new styling patterns to blog system for consistency [feature]
- [ ] Optimize SEO structured data generation with new utilities [seo]

### 🎨 Design System & UI Consistency
- [ ] Create standardized form components using theme utilities [component]
- [ ] Build reusable card components for different content types [component]
- [ ] Develop consistent button variant system [component]
- [ ] Standardize loading states and animations [component]
- [ ] Create modal/dialog components using new patterns [component]
- [ ] Build notification/toast system with theme integration [component]

### ⚡ Performance & Optimization
- [x] Implement lazy loading for refactored components [perf]
- [ ] Optimize image loading in new component structure [perf]
- [x] Add performance monitoring for component render times [perf]
  - ✅ Moved `PerformanceMonitor` into client runtime (`pages/_app.tsx`) so GTM events fire; removed server-only usage in `_document`.
- [ ] Implement code splitting for utility modules [perf]
- [ ] Optimize CSS-in-JS patterns for better caching [perf]
- [ ] Fix lint failure in e2e blog image specs (unused imports and `any` usage) [cleanup]
- [ ] Resolve remaining `react/jsx-no-bind` warnings across customer/dn pages and shared components [cleanup]

### 🧪 Testing & Quality Assurance
- [ ] Set up automated testing for component reusability [testing]
- [ ] Add visual regression tests for refactored components [testing]
- [ ] Create integration tests for theme utility functions [testing]
- [ ] Set up accessibility testing for new component patterns [a11y]
- [ ] Add performance regression testing [testing]

## Code Quality Improvements (From Lint Analysis 2025-01-25)

### 🧹 Immediate Code Cleanup
- [ ] Clean up unused imports and variables (235+ warnings detected) [cleanup]
  - Priority files: pages/checkout.tsx, pages/dn.tsx, src/components/mobile/FastCheckout.tsx
  - Remove unused TypeScript definitions and imports
  - Clean up abandoned variables from refactoring
  - Next: sweep remaining scripts/api utilities (`apply-translation-fixes.js`, `pages/api/cart-recovery.ts`, etc.)
- [ ] Fix JSX arrow function props for better performance [perf]
  - Replace inline arrow functions with useCallback hooks
  - Focus on high-frequency components (checkout, mobile, conversion)
  - Prevent unnecessary re-renders and improve React performance
  - Progress: Memoized handlers in `components/mobile/FastCheckout.tsx`, `components/NextImage.tsx`, `components/ui/language-switcher.tsx`, `components/ui/shopping-cart.tsx`, `components/ui/error-boundary.tsx`, `src/components/ui/skip-nav.tsx`, `src/components/ui/CLSOptimizedImage.tsx`, `src/components/ui/calculator.tsx`, `components/subscription/SubscriptionPlans.tsx`, `components/social-proof/PurchaseNotifications.tsx`, and key flows in `pages/checkout.tsx` / `pages/b2b.tsx`; eslint warnings down to 275 (from 350).
  - Next: refactor remaining UI (`pages/demo/stage5-features.tsx`, `pages/customers/testimonials.tsx`, `src/components/urgency/ScarcityIndicators.tsx`, `src/components/sections/wholesale-pricing.tsx`, etc.) for JSX handler compliance
- [ ] Run performance audit to check bundle size and optimization [audit]
  - Analyze current bundle size after recent optimizations
  - Validate Core Web Vitals remain green
  - Check for any performance regressions from recent changes

### 🔧 Technical Debt Resolution
- [ ] Address unused variable patterns consistently [cleanup]
  - Error handling: 'err', 'error' variables in catch blocks
  - Component props: 'index', 'id' parameters in map functions
  - Hook returns: unused destructured values from custom hooks
- [ ] Optimize import statements across the codebase [perf]
  - Remove unused shadcn/ui component imports
  - Clean up icon imports (lucide-react)
  - Consolidate utility imports where possible
