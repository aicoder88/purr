# Next Steps for Further Cleanup

## Immediate Actions (Safe)

### 1. Test the Build
```bash
npm run build
npm start
```
Verify everything still works after cleanup.

### 2. Remove Montreal Duplicate
Since you have dynamic city routing, the hardcoded Montreal page is redundant:
```bash
rm pages/montreal.tsx
rm src/lib/montreal-seo-config.ts
```
Update `eslint.config.mjs` to remove montreal-seo-config.ts reference.

### 3. Clean Up Package.json Scripts
Remove scripts for deleted files:
```json
// Remove these from package.json scripts:
"validate-dark-mode": "node scripts/dark-mode-validator.js",
"validate-blog-images": "node scripts/validate-blog-images.js",
```

## Dependency Audit (Requires Testing)

### Check These Dependencies

Run: `npx depcheck`

Likely unused:
- `critters` - Check if used in build process
- `micro` - Only used in one webhook file
- `next-auth` - Only used in 2 API routes (orders.ts, validate.ts)
- `@emailjs/browser` - Check if email service is active
- `vaul` - Drawer component (check if used)
- `cmdk` - Command palette (check if used)
- `embla-carousel-react` - Carousel (check if used)
- `react-resizable-panels` - Resizable panels (check if used)

### Radix UI Audit
You have 20+ Radix UI packages. Check which are actually used:
```bash
# Search for each package usage
grep -r "@radix-ui/react-accordion" src/ pages/
grep -r "@radix-ui/react-alert-dialog" src/ pages/
# ... etc for each package
```

## Code Consolidation

### 1. Image Components (Pick One)
You have multiple:
- `src/components/performance/OptimizedImage.tsx`
- `src/components/ui/CLSOptimizedImage.tsx`
- `components/NextImage.tsx`

**Action**: Audit usage, pick the best one, migrate others to it, delete duplicates.

### 2. SEO Components (Already Cleaned)
✅ Done - removed 4 duplicates, kept 3 used ones.

### 3. Analytics Files
Multiple analytics implementations:
- `src/lib/analytics.ts`
- `src/lib/gtm-events.ts`
- `src/components/analytics/HeatmapIntegration.tsx`
- `src/components/analytics/ReferralAnalyticsDashboard.tsx`

**Action**: Consolidate into one analytics approach.

## Config File Cleanup

### TypeScript Configs
You have:
- `tsconfig.json` (main)
- `tsconfig.node.json` (for Node scripts)
- `tsconfig.strict-unused.json` (???)

**Action**: Check if tsconfig.strict-unused.json is used, if not delete it.

### Deployment Configs
- `vercel.json`
- `netlify.toml`
- `windsurf_deployment.yaml`

**Action**: Pick one deployment platform, remove others.

## Performance Optimizations

### 1. Bundle Analysis
```bash
npm run analyze
```
Check what's taking up space in your bundles.

### 2. Image Optimization
```bash
# Check image sizes
du -sh public/images/*
```
Optimize large images.

### 3. Remove Unused Translations
Check if all translation keys are actually used:
```bash
# Search for unused translation keys
grep -r "t\('someKey'" src/ pages/
```

## API Route Audit

Check if all API routes are actually used:
- `pages/api/cart-recovery.ts` - Is cart recovery implemented?
- `pages/api/trial-conversion.ts` - Is trial conversion active?
- `pages/api/trial-users.ts` - Is this used?
- `pages/api/order-management.ts` - Is this used?
- `pages/api/security/risk-assessment.ts` - Is this used?

## Component Audit

### Potentially Unused Components
Check usage of:
- `src/components/bundles/SmartBundles.tsx`
- `src/components/conversion/ABTesting.tsx`
- `src/components/conversion/ConversionOptimizer.tsx`
- `src/components/conversion/ExitIntentPopup.tsx`
- `src/components/mobile/FastCheckout.tsx`
- `src/components/mobile/MobilePayment.tsx`
- `src/components/mobile/TouchGallery.tsx`
- `src/components/optimization/ABTesting.tsx`
- `src/components/performance/CacheOptimizer.tsx`
- `src/components/performance/PerformanceMonitor.tsx`
- `src/components/urgency/ScarcityIndicators.tsx`

### How to Check
```bash
# For each component, search for imports
grep -r "SmartBundles" src/ pages/
```

## Database Cleanup

### Prisma
Check if Prisma is actually used:
```bash
grep -r "@prisma/client" pages/ src/
```

If only used in a few places, consider if you need it.

### Supabase
✅ Already removed - was unused.

## Final Checklist

- [ ] Build passes: `npm run build`
- [ ] Remove montreal.tsx and montreal-seo-config.ts
- [ ] Run `npx depcheck` and remove unused deps
- [ ] Audit Radix UI packages
- [ ] Consolidate image components
- [ ] Remove unused API routes
- [ ] Remove unused components
- [ ] Pick one deployment config
- [ ] Clean up tsconfig files
- [ ] Run bundle analyzer
- [ ] Test in production

## Estimated Impact

After full cleanup:
- **node_modules**: 992MB → ~600-700MB (30% reduction)
- **Source code**: Cleaner, more maintainable
- **Build time**: Faster (less to process)
- **Bundle size**: Smaller (less unused code)
- **Developer experience**: Much better (clear what's used)

## When to Stop

Stop when:
1. Build is fast
2. Bundle size is reasonable
3. You understand what every file does
4. No duplicate functionality
5. No unused dependencies

Don't over-optimize - focus on removing obvious bloat first.
