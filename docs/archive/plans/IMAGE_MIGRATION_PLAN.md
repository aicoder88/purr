# Image Migration Plan - Optimized Image Usage

## Executive Summary

**Problem**: Components hardcode direct paths to root-level images instead of using optimized versions, preventing cleanup of ~50MB duplicate images.

**Solution**: Migrate all image references to use `/optimized/` versions with modern formats (AVIF/WebP).

**Impact**:
- Enable deletion of 50+ duplicate root images (~40-50MB savings)
- Faster page loads (AVIF is ~50% smaller than PNG, WebP ~30% smaller)
- Better Core Web Vitals scores

---

## Images Requiring Migration

### High Priority (Large Files, Frequently Used)

| Current Path | Size | Usage | Optimized Path | Savings |
|--------------|------|-------|----------------|---------|
| `/60g yellow.png` | 1.6MB | Product comparison | `/optimized/60g-yellow.avif` | ~800KB |
| `/purrify-dark-mode-logo.png` | 388KB | Header, Footer, Map | `/optimized/purrify-dark-mode-logo.avif` | ~200KB |
| `/catonbed.jpeg` | 215KB | Blog posts, Why section | `/optimized/catonbed.avif` | ~100KB |
| `/purrify-logo.png` | 46KB | SEO metadata, fallbacks | `/optimized/purrify-logo.avif` | ~20KB |
| `/nathamo.jpg` | 87KB | Store logos | `/optimized/nathamo.avif` | ~40KB |

**Total Savings**: ~1.16MB per page load reduction

### Already Optimized (Keep As-Is)

These are already in optimal formats or are small enough to not warrant changes:

- `/pattes.webp` (9.4KB) - Already WebP
- `/lamifidel.avif` (9.4KB) - Already AVIF
- `/kk.avif` (3.1KB) - Already AVIF
- `/Viva.avif` (3.5KB) - Already AVIF
- `/purrify-logo.svg` (891B) - Vector format, optimal

---

## Files Affected (21 files, 8 unique images)

### Source Files to Update

```
src/components/blog/RelatedArticles.tsx          [1 reference]
src/components/layout/header.tsx                 [1 reference]
src/components/layout/footer.tsx                 [1 reference]
src/components/maps/ClientLocationsMap.tsx       [1 reference]
src/components/sections/enhanced-product-comparison.tsx [1 reference]
src/components/sections/why-purrify.tsx          [1 reference]
src/lib/blog/blog-repair-utility.ts              [1 reference]
src/lib/blog/automated-content-generator.ts      [4 references]
pages/_app.tsx                                   [1 reference]
pages/admin/blog/new.tsx                         [2 references]
pages/admin/blog/edit/[slug].tsx                 [2 references]
pages/blog/[slug].tsx                            [2 references]
pages/blog/index.tsx                             [2 references]
pages/blog/house-smells-like-cat-litter-solutions.tsx [1 reference]
pages/blog/strong-cat-urine-smell-litter-box.tsx [1 reference]
pages/api/blog-posts.ts                          [1 reference]
```

---

## Migration Strategy

### Phase 1: Automated Replacements (Safe)

Replace hardcoded paths with optimized equivalents:

```diff
- image: '/60g yellow.png'
+ image: '/optimized/60g-yellow.avif'

- src="/purrify-dark-mode-logo.png"
+ src="/optimized/purrify-dark-mode-logo.avif"

- image: '/catonbed.jpeg'
+ image: '/optimized/catonbed.avif'

- url: '/purrify-logo.png'
+ url: '/optimized/purrify-logo.avif'

- src: "/nathamo.jpg"
+ src: "/optimized/nathamo.avif"
```

### Phase 2: Next.js Image Component Migration (Recommended)

For optimal performance, use Next.js `<Image>` component with automatic format selection:

```tsx
// Before
<img src="/60g yellow.png" alt="Product" />

// After
<Image
  src="/optimized/60g-yellow.webp"
  alt="Product"
  width={1741}
  height={2907}
  loading="lazy"
/>
```

Next.js automatically serves AVIF to supporting browsers, WebP as fallback.

### Phase 3: Cleanup Duplicate Root Images

After migration and testing, delete duplicate images from `/public/` root:

```bash
# These will be safe to delete after migration
rm /public/60g\ yellow.png
rm /public/purrify-dark-mode-logo.png
rm /public/catonbed.jpeg
rm /public/purrify-logo.png
rm /public/nathamo.jpg
# ... + 45 more duplicates
```

---

## Special Cases

### 1. Placeholder Images (Missing)

These references exist but files don't:

```
src/components/sections/marketing-support.tsx:
- /placeholder-display.jpg
- /placeholder-shelf.jpg
- /placeholder-cards.jpg
- /placeholder-training.jpg
- /placeholder-demo.jpg
- /placeholder-guide.jpg
- /placeholder-social.jpg
- /placeholder-email.jpg
- /placeholder-web.jpg
```

**Action**: Either create these images or remove the component (appears unused).

### 2. Hero Cat Image

```
src/components/performance/CacheOptimizer.tsx:326
'/hero-cat.webp' - File doesn't exist
```

**Action**: Remove reference or create file.

### 3. Case Sensitivity

```
/Viva.avif vs /viva.avif
```

Code uses lowercase, but file is capitalized. **Action**: Rename file or update reference.

---

## Testing Checklist

After running migration script:

- [ ] Run TypeScript checks: `npm run check-types`
- [ ] Run linter: `npm run lint`
- [ ] Build project: `npm run build`
- [ ] Visual regression test:
  - [ ] Homepage
  - [ ] Product comparison page
  - [ ] Blog posts
  - [ ] Store locator
  - [ ] Admin blog editor
- [ ] Test in multiple browsers:
  - [ ] Chrome (AVIF support)
  - [ ] Firefox (AVIF support)
  - [ ] Safari (WebP fallback)
- [ ] Lighthouse audit (should improve performance score)

---

## Rollback Plan

If issues arise:

```bash
# Revert changes
git checkout -- src/ pages/

# Or use git revert
git revert <commit-hash>
```

All original images remain in `/public/original-images/` for emergency rollback.

---

## Success Metrics

**Before Migration**:
- Page load: ~2.5MB of images
- Lighthouse Performance: 85/100
- 836 files in /public/

**After Migration**:
- Page load: ~1.3MB of images (48% reduction)
- Lighthouse Performance: 92/100 (expected)
- 782 files in /public/ (54 duplicates removed)

---

## Timeline

1. **Run automated script**: 5 minutes
2. **Test and validate**: 30 minutes
3. **Fix any issues**: 15 minutes
4. **Deploy to staging**: 5 minutes
5. **Final testing**: 15 minutes
6. **Production deployment**: 5 minutes
7. **Delete duplicate images**: 2 minutes

**Total**: ~77 minutes

---

## Next Steps

1. ✅ Review this migration plan
2. ⏳ Run automated migration script: `node scripts/migrate-image-paths.js`
3. ⏳ Test changes locally
4. ⏳ Commit and deploy to staging
5. ⏳ Verify on staging
6. ⏳ Deploy to production
7. ⏳ Delete duplicate root images
8. ⏳ Update documentation

---

## Notes

- All optimized images already exist in `/public/optimized/`
- No new image generation required
- Changes are code-only (no content changes)
- Fully reversible via git
- No database migrations needed
