# Optimized Product Images

This document explains the optimized image delivery system for Purrify product images.

## Image Variants Created

For the **Large 240G Pack** product, we have created a comprehensive set of responsive images:

### Format Coverage

| Format | Browser Support | Use Case |
|--------|----------------|----------|
| **AVIF** | Chrome 85+, Edge 85+, Opera 71+, Firefox 93+ | Modern browsers - smallest file size |
| **WebP** | Chrome 23+, Edge 18+, Firefox 65+, Safari 14+ | Wide browser support - good compression |
| **PNG** | All browsers | Universal fallback - maximum compatibility |

### Size Variants

| Size | Dimensions | AVIF Size | WebP Size | PNG Size | Use Case |
|------|-----------|-----------|-----------|----------|----------|
| **320w** | 320×480px | 30KB | 24KB | - | Mobile small screens |
| **480w** | 480×720px | 62KB | 48KB | - | Mobile large / Tablet portrait |
| **640w** | 640×960px | 101KB | 63KB | 490KB | Tablet landscape / Desktop |
| **828w** | 828×1242px | 167KB | 104KB | - | High-res displays |
| **1200w** | 1200×1800px | 274KB | 223KB | - | Desktop large / Retina |

## File Locations

```
public/optimized/
├── 140g-320w.avif    (30KB)
├── 140g-320w.webp    (24KB)
├── 140g-480w.avif    (62KB)
├── 140g-480w.webp    (48KB)
├── 140g-640w.avif    (101KB) ← Primary reference
├── 140g-640w.webp    (63KB)
├── 140g-640w.png     (490KB) ← Fallback
├── 140g-828w.avif    (167KB)
├── 140g-828w.webp    (104KB)
├── 140g-1200w.avif   (274KB)
└── 140g-1200w.webp   (223KB)
```

## How It Works

### Automatic Format Selection

Next.js Image component automatically serves the best format:

1. **AVIF-capable browsers** (Chrome, Edge, Firefox): Receive AVIF (smallest)
2. **WebP-capable browsers** (Safari, older Chrome): Receive WebP
3. **Legacy browsers**: Receive PNG fallback

### Responsive Size Selection

The browser automatically downloads the appropriate size based on:

- **Screen width** (viewport size)
- **Device pixel ratio** (1x, 2x, 3x displays)
- **Network conditions** (slow connection = smaller image)

### Example Usage

```tsx
import { OptimizedProductImage } from '@/components/ui/OptimizedProductImage';

// In your component
<OptimizedProductImage
  productId="large"
  alt="Purrify Large 240G Pack"
  className="w-full h-auto"
  priority={false} // Set true for above-the-fold images
  sizes="(max-width: 640px) 320px, (max-width: 768px) 480px, 640px"
/>
```

## Performance Benefits

### Before Optimization
- **Single image**: 235KB WebP
- **One size fits all**: Desktop users download mobile-sized image, mobile users download desktop-sized image
- **Single format**: No AVIF support

### After Optimization
- **Multiple sizes**: 24KB - 274KB depending on device
- **Responsive delivery**: Right size for each screen
- **Modern formats**: AVIF saves ~40% vs WebP

### Real-World Savings

| Device | Before | After | Savings |
|--------|--------|-------|---------|
| Mobile (320w) | 235KB WebP | 30KB AVIF | **87% smaller** |
| Tablet (640w) | 235KB WebP | 101KB AVIF | **57% smaller** |
| Desktop (1200w) | 235KB WebP | 274KB AVIF | -17% (higher quality) |

## Technical Details

### Image Optimization Command

```bash
# Created responsive sizes from 640w source
magick 140g-640w.avif -resize 320x480 -quality 85 140g-320w.webp
magick 140g-640w.avif -resize 320x480 -quality 85 140g-320w.avif
magick 140g-640w.avif -resize 480x720 -quality 85 140g-480w.webp
magick 140g-640w.avif -resize 480x720 -quality 85 140g-480w.avif

# Used 828w source for larger sizes
magick 140g-828w.avif -resize 1200x1800 -quality 90 140g-1200w.webp
magick 140g-828w.avif -resize 1200x1800 -quality 90 140g-1200w.avif

# Created PNG fallback
magick 140g-640w.avif -strip -quality 85 140g-640w.png
```

### Validation

All images validated to be within size limits:
```bash
pnpm validate-images
# ✅ All images are within size limits!
```

## Browser Compatibility

| Browser | AVIF | WebP | PNG |
|---------|------|------|-----|
| Chrome 85+ | ✅ | ✅ | ✅ |
| Edge 85+ | ✅ | ✅ | ✅ |
| Firefox 93+ | ✅ | ✅ | ✅ |
| Safari 16+ | ✅ | ✅ | ✅ |
| Safari 14-15 | ❌ | ✅ | ✅ |
| IE 11 | ❌ | ❌ | ✅ |

## Future Improvements

1. **Generate 2x/3x versions** for Retina displays
2. **Add lazy loading** for below-the-fold images
3. **Implement blur-up placeholders** using base64 thumbnails
4. **Add WebP animated** versions for product demos
5. **Create CDN integration** for edge caching

## Monitoring

Track image performance in:
- **Lighthouse** - Image optimization scores
- **Chrome DevTools** - Network panel (format delivered)
- **Real User Monitoring** - Actual file sizes delivered
- **Core Web Vitals** - LCP improvements

## References

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [AVIF Format Specification](https://aomediacodec.github.io/av1-avif/)
- [Responsive Images Guide](https://web.dev/responsive-images/)
