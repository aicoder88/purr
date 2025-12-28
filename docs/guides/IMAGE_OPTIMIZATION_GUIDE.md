# Image Optimization System Guide

## Overview

The Image Optimization System automatically processes images and generates optimized variants in multiple formats (AVIF, WebP, JPG) with responsive sizing. This guide covers configuration, usage, and troubleshooting.

## Quick Start

### 1. Add Images

Place your original images in `public/original-images/`:

```
public/original-images/
├── products/
│   └── my-product.jpg
├── blog/
│   └── article-hero.png
└── thumbnails/
    └── avatar.jpg
```

### 2. Run Optimization

```bash
# Run optimization once
npm run optimize-images:enhanced

# Watch for changes (development)
npm run optimize-images:watch
```

### 3. Use Optimized Images

```tsx
import Image from 'next/image';
import { getImageProps } from '@/lib/image-utils';

function MyComponent() {
  const imageProps = getImageProps('products/my-product.jpg', 'Product image');
  
  if (!imageProps) {
    return <div>Image not found</div>;
  }
  
  return <Image {...imageProps} />;
}
```

## Configuration

### Optimization Profiles

Edit `image-optimization.config.js` to customize optimization settings:

```javascript
module.exports = {
  profiles: {
    product: {
      name: 'product',
      quality: 85,                    // JPEG/WebP quality (1-100)
      maxWidth: 1920,                 // Maximum width in pixels
      responsiveSizes: [640, 828, 1080, 1200, 1920],  // Responsive breakpoints
      formats: ['avif', 'webp', 'jpg'],  // Output formats
      compressionLevel: 6,            // AVIF/WebP compression (0-6)
      preserveMetadata: false         // Strip EXIF data
    },
    // ... other profiles
  },
  concurrency: 2,                     // Max parallel operations
  skipOnCI: true,                     // Skip on CI/Vercel
  errorThreshold: 0.1                 // Halt if >10% fail
};
```

### Profile Selection

Profiles are automatically selected based on image path:

- `/products/` or `/product/` → **product** profile
- `/blog/` or `/articles/` → **blog** profile
- `/thumb` or `/avatar` → **thumbnail** profile
- Everything else → **default** profile

## Usage

### Using Image Utilities

```tsx
import {
  getImageMetadata,
  getImageProps,
  getOptimizedImagePath,
  getBlurDataURL,
  generateSrcSet
} from '@/lib/image-utils';

// Get complete metadata
const metadata = getImageMetadata('products/my-product.jpg');
console.log(metadata);
// {
//   width: 1920,
//   height: 1080,
//   aspectRatio: 1.78,
//   formats: { avif: [...], webp: [...], jpg: [...] },
//   sizes: "(max-width: 640px) 100vw, ...",
//   blurDataURL: "data:image/jpeg;base64,..."
// }

// Get props for Next.js Image
const props = getImageProps('products/my-product.jpg', 'Alt text', true);
<Image {...props} />

// Get specific format
const webpPath = getOptimizedImagePath('products/my-product.jpg', 'webp', 1200);

// Generate srcSet
const srcSet = generateSrcSet('products/my-product.jpg', 'webp');
```

### Manual Image Component

```tsx
import Image from 'next/image';
import imageDimensions from '@/public/image-dimensions.json';

function OptimizedImage({ src, alt }) {
  const metadata = imageDimensions[src];
  
  return (
    <Image
      src={`/optimized/${src}`}
      alt={alt}
      width={metadata.width}
      height={metadata.height}
      sizes={metadata.sizes}
      placeholder={metadata.blurDataURL ? 'blur' : undefined}
      blurDataURL={metadata.blurDataURL}
    />
  );
}
```

## Output Structure

After optimization, images are organized as follows:

```
public/
├── original-images/          # Source images (backed up)
│   └── products/
│       └── my-product.jpg
├── optimized/                # Optimized variants
│   ├── my-product-640w.avif
│   ├── my-product-640w.webp
│   ├── my-product-640w.jpg
│   ├── my-product-828w.avif
│   └── ...
├── image-dimensions.json     # Metadata file
└── image-optimization-report.json  # Processing report
```

## Metadata File

The `image-dimensions.json` file contains metadata for all optimized images:

```json
{
  "products/my-product.jpg": {
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.78,
    "formats": {
      "avif": [
        "optimized/my-product-640w.avif",
        "optimized/my-product-828w.avif",
        ...
      ],
      "webp": [...],
      "jpg": [...]
    },
    "sizes": "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw",
    "blurDataURL": "data:image/jpeg;base64,..."
  }
}
```

## Processing Report

The `image-optimization-report.json` file contains statistics:

```json
{
  "timestamp": "2025-11-09T12:00:00.000Z",
  "totalImages": 150,
  "successful": 148,
  "failed": 2,
  "skipped": 0,
  "errors": [
    {
      "filePath": "public/corrupted.jpg",
      "error": "Input file is corrupt",
      "timestamp": 1699531200000
    }
  ],
  "statistics": {
    "totalSizeReduction": 45678900,
    "averageProcessingTime": 1250,
    "formatBreakdown": {
      "avif": 740,
      "webp": 740,
      "jpg": 740
    }
  }
}
```

## Best Practices

### 1. Image Naming

- Use descriptive, lowercase names with hyphens
- Avoid spaces in filenames
- Example: `cat-litter-product-hero.jpg`

### 2. Source Image Quality

- Use high-quality source images (at least 1920px wide for products)
- Save as PNG for graphics with transparency
- Save as JPG for photographs

### 3. Organization

- Organize images by type in subdirectories
- Use consistent naming conventions
- Keep source images in `original-images/`

### 4. Performance

- Run optimization during development, not on every build
- Use blur placeholders for large images (>100KB)
- Serve AVIF to modern browsers, WebP as fallback

### 5. Workflow

```bash
# Development workflow
1. Add images to public/original-images/
2. Run: npm run optimize-images:enhanced
3. Commit both source and optimized images
4. Use image utilities in components

# Production workflow
1. Images are pre-optimized and committed
2. Build process uses existing optimized images
3. No optimization runs on CI/Vercel
```

## Troubleshooting

### Error: "Input file is corrupt"

**Cause**: Image file is damaged or invalid format

**Solution**:
- Verify the image opens in an image viewer
- Re-export the image from your editor
- Check file extension matches actual format

### Error: "Failed to read image metadata"

**Cause**: Unsupported image format or permissions issue

**Solution**:
- Ensure image is PNG, JPG, JPEG, or GIF
- Check file permissions
- Try converting to a supported format

### Build Halted: "Error threshold exceeded"

**Cause**: More than 10% of images failed to process

**Solution**:
1. Check the processing report for specific errors
2. Fix or remove problematic images
3. Run optimization again

### Images Not Updating

**Cause**: Cached optimized versions

**Solution**:
```bash
# Clear optimized directory
rm -rf public/optimized/*

# Re-run optimization
npm run optimize-images:enhanced
```

### Memory Issues

**Cause**: Processing too many large images

**Solution**:
- Reduce `concurrency` in config (default: 2)
- Process images in smaller batches
- Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`

### Slow Processing

**Cause**: Large images or many responsive sizes

**Solution**:
- Reduce `maxWidth` in profile config
- Reduce number of `responsiveSizes`
- Lower `compressionLevel` (faster but larger files)

## Advanced Usage

### Custom Profile for Specific Images

Create a custom profile and modify the path detection in `ConfigurationManager.js`:

```javascript
// In ConfigurationManager.js
getProfile(imagePath) {
  if (imagePath.includes('/hero/')) {
    return this.config.profiles.hero;  // Custom profile
  }
  // ... existing logic
}
```

### Skip Optimization for Specific Images

Add images to the skip list in `optimize-images-enhanced.js`:

```javascript
// Skip specific files
const skipFiles = ['purrify-logo.png', 'favicon.ico'];
if (skipFiles.includes(filename)) {
  stats.skipped++;
  return null;
}
```

### Generate Only Specific Formats

Modify the profile to include only desired formats:

```javascript
{
  formats: ['webp'],  // Only generate WebP
  // ...
}
```

## Performance Impact

### File Size Reduction

Typical savings:
- AVIF: 60-80% smaller than JPG
- WebP: 40-60% smaller than JPG
- Optimized JPG: 20-40% smaller than original

### Processing Time

- Small images (<500KB): ~200-500ms
- Medium images (500KB-2MB): ~500-1500ms
- Large images (>2MB): ~1500-3000ms

### Build Time

- First run: 2-5 minutes for 100 images
- Incremental: Only processes changed images
- CI/Vercel: Skipped (uses pre-optimized images)

## Support

For issues or questions:
1. Check this documentation
2. Review the processing report
3. Check error logs in console
4. Verify configuration is valid

## Related Documentation

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [AVIF Format](https://avif.io/)
- [WebP Format](https://developers.google.com/speed/webp)
