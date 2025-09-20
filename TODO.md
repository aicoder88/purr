# SEO Follow-ups (SEMrush)

This TODO tracks remaining items from the latest SEMrush crawl after implementing fixes (hreflang, canonical, structured data, sitemaps, and llms.txt). Items marked [infra] are DNS/hosting configurations; [content] require copy/IA updates.

- [ ] DNS: Ensure `fr.purrify.ca` and `zh.purrify.ca` resolve correctly for all paths [infra]
  - Action: Verify A/ALIAS or CNAME in DNS and Vercel domain mappings for both subdomains.

- [ ] Re-crawl validation in SEMrush (full project) [ops]
  - Action: Trigger new crawl to confirm reductions for: hreflang conflicts, incorrect hreflang, multiple canonicals, temp redirects, invalid structured data.

- [ ] Slow page load: 1 page flagged [perf]
  - Likely heavy content page. Action: capture core web vitals on production and identify specific offenders (LCP/CLS/TTI). Optimize image sizes or defer non-critical sections further if needed.

- [ ] Low text-to-HTML ratio: 31 pages [content]
  - Action: add short, unique intro/outro copy to thin sections; ensure dynamic/utility pages are noindex where appropriate.

- [ ] Title too long: 2 pages [content]
  - Action: shorten titles to ~50–60 chars without truncation; confirm in each page’s Head/NextSeo.

- [ ] Missing/short titles: 8 pages [content]
  - Action: audit all routes with `NextSeo`/`Head` to ensure explicit `title`. (Most are covered; re-check after crawl.)

- [ ] Low word count: 2 pages [content]
  - Action: add supporting text (100–200 words) or set `noindex` if intentionally thin.

- [ ] Internal linking depth: 14 pages with one incoming link; 10 need >3 clicks to reach [content/IA]
  - Action: add Related Articles to Learn pages; add contextual links in product and support pages; ensure footer nav links include key leaf pages.

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
- [ ] Products grid: Replace inline handlers in `src/components/sections/products.tsx` with memoized callbacks (JS-0417) [perf].
- [ ] Blog cards: Replace inline handlers in `src/components/sections/blog-preview.tsx` and `pages/blog/index.tsx` (JS-0417) [perf].
- [ ] Enable ESLint rules and auto-fixes: `no-return-await`, `react/jsx-no-bind`, `@typescript-eslint/no-unused-vars` (warn first), then clean remaining manually [tooling].
- [ ] TypeScript: Trial `noUnusedLocals` / `noUnusedParameters` in a branch; measure impact and fix hotspots (JS-0356) [perf].
- [ ] A11y: Re-scan for interactive-role mismatches; ensure only semantic roles are used and `aria-*` pairs are valid [a11y].
- [ ] RegExp: Review any flagged `.match/.exec` patterns; prefer `regex.test` for boolean checks and ensure global flags are correct (JS-D007) [perf].
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
- [ ] Implement lazy loading for refactored components [perf]
- [ ] Optimize image loading in new component structure [perf]
- [ ] Add performance monitoring for component render times [perf]
- [ ] Implement code splitting for utility modules [perf]
- [ ] Optimize CSS-in-JS patterns for better caching [perf]

### 🧪 Testing & Quality Assurance
- [ ] Set up automated testing for component reusability [testing]
- [ ] Add visual regression tests for refactored components [testing]
- [ ] Create integration tests for theme utility functions [testing]
- [ ] Set up accessibility testing for new component patterns [a11y]
- [ ] Add performance regression testing [testing]
