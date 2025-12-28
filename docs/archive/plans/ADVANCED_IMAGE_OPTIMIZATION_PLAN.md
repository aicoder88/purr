# Advanced Image Optimization Plan

## Overview

Comprehensive image optimization to achieve maximum performance through AVIF migration, lazy-loading, and responsive images.

---

## Phase 1: Migrate Remaining Images to AVIF

### Current State
- **252 PNG/JPG files** still in `/public/optimized/`
- Mix of unoptimized and partially optimized images
- Some images only have WebP, missing AVIF

### Action Plan
1. Run batch optimization on all `/public/original-images/`
2. Ensure every image has AVIF + WebP + fallback
3. Update `image-dimensions.json` with all metadata

### Expected Results
- **All images** have AVIF versions
- **50% smaller** file sizes on average
- **Faster page loads** across all pages

---

## Phase 2: Lazy-Loading Implementation

### Strategy
Use **native browser lazy-loading** + **Intersection Observer** for optimal performance.

### Components to Update

#### 1. OptimizedImage Component Enhancement
```tsx
// Add lazy-loading prop
export interface OptimizedImageProps {
  // ... existing props
  loading?: 'lazy' | 'eager';
  priority?: boolean;  // existing
}
```

**Rules:**
- `priority=true` → `loading="eager"` (above-fold)
- `priority=false` → `loading="lazy"` (below-fold)
- Default: `loading="lazy"`

#### 2. Image Classification

**Above-fold (Eager Loading):**
- Hero images
- Logo in header
- First product in view
- Featured blog post image

**Below-fold (Lazy Loading):**
- Testimonial images
- Related articles
- Product grid items (beyond first 3)
- Footer images
- All blog content images

### Implementation

```tsx
<OptimizedImage
  src="/optimized/hero.avif"
  alt="Hero"
  priority={true}  // Above-fold
  loading="eager"
/>

<OptimizedImage
  src="/optimized/testimonial.avif"
  alt="Testimonial"
  loading="lazy"  // Below-fold
/>
```

---

## Phase 3: Responsive Images (srcset)

### Strategy
Generate multiple sizes for each image and use `srcset` + `sizes` for responsive delivery.

### Size Breakpoints

| Viewport | Max Width | Use Case |
|----------|-----------|----------|
| Mobile | 640px | Phone portrait |
| Tablet | 828px | Phone landscape / small tablet |
| Desktop | 1080px | Laptop / tablet landscape |
| Large | 1200px | Desktop |
| XL | 1920px | Large desktop / 4K |

### Image Size Matrix

```
Hero Images:
- 640w, 828w, 1080w, 1200w, 1920w (5 sizes)

Product Images:
- 640w, 828w, 1080w, 1200w (4 sizes)

Thumbnails:
- 320w, 640w (2 sizes)

Blog Images:
- 640w, 828w, 1080w (3 sizes)
```

### Sizes Attribute Strategy

```tsx
// Hero (full width)
sizes="100vw"

// Product grid (3 cols on desktop, 1 on mobile)
sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

// Sidebar image (max 400px)
sizes="(min-width: 1024px) 400px, 100vw"

// Thumbnail (max 200px)
sizes="(min-width: 640px) 200px, 100vw"
```

### Implementation in OptimizedImage

```tsx
export interface OptimizedImageProps {
  // ... existing
  srcset?: string;  // Custom srcset
  sizes?: string;   // Responsive sizes
  responsive?: 'hero' | 'product' | 'thumbnail' | 'blog';  // Auto-generate srcset
}
```

---

## Phase 4: Enhanced image-dimensions.json

### Current Structure
```json
{
  "image.png": {
    "width": 1200,
    "height": 800,
    "webp": "optimized/image.webp",
    "avif": "optimized/image.avif"
  }
}
```

### Enhanced Structure
```json
{
  "image.png": {
    "width": 1200,
    "height": 800,
    "formats": {
      "avif": "optimized/image.avif",
      "webp": "optimized/image.webp",
      "fallback": "optimized/image.png"
    },
    "srcset": {
      "avif": [
        "optimized/image-640w.avif 640w",
        "optimized/image-828w.avif 828w",
        "optimized/image-1080w.avif 1080w",
        "optimized/image-1200w.avif 1200w"
      ],
      "webp": [
        "optimized/image-640w.webp 640w",
        "optimized/image-828w.webp 828w",
        "optimized/image-1080w.webp 1080w",
        "optimized/image-1200w.webp 1200w"
      ]
    },
    "sizes": {
      "hero": "100vw",
      "product": "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
      "thumbnail": "(min-width: 640px) 200px, 100vw"
    }
  }
}
```

---

## Phase 5: Picture Element for Maximum Control

For critical images, use `<picture>` with explicit format support:

```tsx
<picture>
  <source
    srcSet="/optimized/hero-640w.avif 640w, /optimized/hero-1080w.avif 1080w, /optimized/hero-1920w.avif 1920w"
    sizes="100vw"
    type="image/avif"
  />
  <source
    srcSet="/optimized/hero-640w.webp 640w, /optimized/hero-1080w.webp 1080w, /optimized/hero-1920w.webp 1920w"
    sizes="100vw"
    type="image/webp"
  />
  <img
    src="/optimized/hero-1080w.jpg"
    alt="Hero"
    loading="eager"
    className="w-full h-auto"
  />
</picture>
```

---

## Implementation Priority

### High Priority (Immediate)
1. ✅ **Migrate all images to AVIF** (~30 min)
2. ✅ **Add lazy-loading to OptimizedImage** (~15 min)
3. ✅ **Audit and mark above-fold images** (~20 min)

### Medium Priority (Next)
4. ⏳ **Generate responsive sizes (640w, 828w, 1080w, 1200w)** (~1 hour)
5. ⏳ **Update image-dimensions.json with srcset** (~30 min)
6. ⏳ **Implement srcset in OptimizedImage** (~30 min)

### Low Priority (Future)
7. ⏳ **Create PictureImage component** (~20 min)
8. ⏳ **Add WebP fallback generation** (~15 min)
9. ⏳ **Implement progressive loading** (~30 min)

---

## Expected Performance Gains

### Before Optimizations
- **Largest image**: 3.4MB (cost effective.png)
- **Average size**: ~500KB per image
- **Page load**: 2.5MB images total
- **LCP**: ~2.5s

### After AVIF Migration
- **Largest image**: 1.7MB (50% reduction)
- **Average size**: ~250KB per image (50% reduction)
- **Page load**: 1.25MB images (50% reduction)
- **LCP**: ~1.8s

### After Lazy-Loading
- **Initial load**: Only above-fold images (~3-5 images)
- **Deferred**: 20+ below-fold images
- **FCP**: ~0.8s (40% faster)
- **TTI**: ~1.2s (35% faster)

### After Responsive Images
- **Mobile savings**: 70% (640w vs 1920w)
- **Tablet savings**: 40% (828w vs 1920w)
- **Desktop**: Optimal size per viewport
- **Bandwidth saved**: ~1.5MB per mobile page load

### Combined Impact
- **Total page size**: 2.5MB → 0.4MB (84% reduction on mobile)
- **LCP**: 2.5s → 0.9s (64% improvement)
- **Lighthouse Performance**: 85 → 98 (expected)

---

## Testing Checklist

### After Each Phase
- [ ] Build succeeds without errors
- [ ] All images display correctly
- [ ] No 404 errors in console
- [ ] Dark mode compatibility
- [ ] Mobile responsiveness

### Performance Testing
- [ ] Lighthouse audit (target: 95+)
- [ ] Network tab inspection (verify AVIF served)
- [ ] LCP < 1.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms

### Browser Compatibility
- [ ] Chrome (AVIF support)
- [ ] Firefox (AVIF support)
- [ ] Safari (WebP fallback)
- [ ] Edge (AVIF support)

---

## Rollback Plan

Each phase has independent rollback:

### Phase 1 (AVIF)
```bash
# Keep old formats, just add AVIF alongside
# No code changes needed, non-breaking
```

### Phase 2 (Lazy-loading)
```bash
git revert <commit>  # Revert lazy-loading changes
```

### Phase 3 (Responsive)
```bash
git revert <commit>  # Revert srcset implementation
```

---

## Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Page Weight | 2.5MB | 0.4MB | Chrome DevTools |
| LCP | 2.5s | <1.5s | Lighthouse |
| FCP | 1.2s | <0.8s | Lighthouse |
| Lighthouse Score | 85 | 95+ | Lighthouse |
| Mobile Load | 4.5s | <2s | 3G throttling |

---

## Next Steps

1. Run AVIF batch optimization
2. Enhance OptimizedImage component
3. Audit all image usage for lazy-loading
4. Generate responsive sizes
5. Update image-dimensions.json
6. Deploy and test

**Estimated Total Time**: 3-4 hours
**Expected Performance Gain**: 84% page size reduction on mobile
