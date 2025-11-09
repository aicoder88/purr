# Design Document

## Overview

The Image Optimization System will be a Node.js-based build-time pipeline that automatically processes images from a source directory and generates optimized variants in multiple formats (AVIF, WebP, JPG) with responsive sizing. The system integrates with the existing Next.js build process and Sharp library infrastructure, extending the current `scripts/optimize-images.js` implementation with enhanced features including configuration profiles, improved error handling, and comprehensive metadata generation.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Build Process Trigger                     │
│              (npm run build / Vercel Deploy)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Image Optimization Pipeline                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Source Discovery                                  │  │
│  │     - Scan public/original-images/                    │  │
│  │     - Detect new/modified files                       │  │
│  │     - Load configuration profiles                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  2. Image Processing                                  │  │
│  │     - Validate image format                           │  │
│  │     - Extract metadata (dimensions, format)           │  │
│  │     - Apply configuration profile                     │  │
│  │     - Generate responsive sizes                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  3. Format Generation (Parallel)                      │  │
│  │     ┌──────────┐  ┌──────────┐  ┌──────────┐        │  │
│  │     │   AVIF   │  │   WebP   │  │ Optimized│        │  │
│  │     │ Generator│  │ Generator│  │   JPG    │        │  │
│  │     └──────────┘  └──────────┘  └──────────┘        │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  4. Metadata Generation                               │  │
│  │     - Create JSON metadata file                       │  │
│  │     - Include dimensions, formats, paths              │  │
│  │     - Generate blur placeholders                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  5. Output & Reporting                                │  │
│  │     - Write to public/optimized/                      │  │
│  │     - Generate processing report                      │  │
│  │     - Log statistics                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Image Component                     │
│              (Serves optimized images)                       │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
public/
├── original-images/          # Source images (input)
│   ├── products/
│   ├── blog/
│   └── marketing/
├── optimized/                # Processed images (output)
│   ├── {filename}.avif
│   ├── {filename}.webp
│   ├── {filename}.jpg
│   ├── {filename}-640w.avif
│   ├── {filename}-640w.webp
│   └── ...
├── image-dimensions.json     # Metadata file
└── image-optimization-report.json  # Processing report
```

## Components and Interfaces

### 1. Configuration Manager

**Purpose**: Load and manage optimization configuration profiles

**Interface**:
```typescript
interface OptimizationProfile {
  name: string;
  quality: number;              // 1-100
  maxWidth: number;             // Maximum width in pixels
  responsiveSizes: number[];    // Array of widths for responsive images
  formats: ('avif' | 'webp' | 'jpg')[];
  compressionLevel: number;     // 0-9 for AVIF/WebP
  preserveMetadata: boolean;
}

interface OptimizationConfig {
  profiles: {
    product: OptimizationProfile;
    blog: OptimizationProfile;
    thumbnail: OptimizationProfile;
    default: OptimizationProfile;
  };
  concurrency: number;          // Max parallel operations
  skipOnCI: boolean;            // Skip on CI/Vercel
  errorThreshold: number;       // Max % of failures before halting
}

class ConfigurationManager {
  loadConfig(): OptimizationConfig;
  getProfile(imagePath: string): OptimizationProfile;
  validateConfig(config: OptimizationConfig): boolean;
}
```

**Configuration File** (`image-optimization.config.js`):
```javascript
module.exports = {
  profiles: {
    product: {
      name: 'product',
      quality: 85,
      maxWidth: 1920,
      responsiveSizes: [640, 828, 1080, 1200, 1920],
      formats: ['avif', 'webp', 'jpg'],
      compressionLevel: 6,
      preserveMetadata: false
    },
    blog: {
      name: 'blog',
      quality: 80,
      maxWidth: 1200,
      responsiveSizes: [640, 828, 1200],
      formats: ['avif', 'webp', 'jpg'],
      compressionLevel: 7,
      preserveMetadata: false
    },
    thumbnail: {
      name: 'thumbnail',
      quality: 75,
      maxWidth: 400,
      responsiveSizes: [200, 400],
      formats: ['avif', 'webp'],
      compressionLevel: 8,
      preserveMetadata: false
    },
    default: {
      name: 'default',
      quality: 80,
      maxWidth: 1920,
      responsiveSizes: [640, 828, 1080, 1200, 1920],
      formats: ['avif', 'webp', 'jpg'],
      compressionLevel: 7,
      preserveMetadata: false
    }
  },
  concurrency: 2,
  skipOnCI: true,
  errorThreshold: 0.1  // 10%
};
```

### 2. Image Processor

**Purpose**: Core image processing logic using Sharp

**Interface**:
```typescript
interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  aspectRatio: number;
}

interface ProcessingResult {
  success: boolean;
  originalPath: string;
  outputs: {
    format: string;
    width: number;
    path: string;
    size: number;
  }[];
  metadata: ImageMetadata;
  processingTime: number;
  error?: string;
}

class ImageProcessor {
  async processImage(
    sourcePath: string,
    profile: OptimizationProfile
  ): Promise<ProcessingResult>;
  
  async generateFormat(
    sourcePath: string,
    format: 'avif' | 'webp' | 'jpg',
    width: number,
    quality: number
  ): Promise<Buffer>;
  
  async extractMetadata(sourcePath: string): Promise<ImageMetadata>;
  
  async generateBlurPlaceholder(sourcePath: string): Promise<string>;
}
```

### 3. File System Manager

**Purpose**: Handle file operations and directory management

**Interface**:
```typescript
interface FileSystemManager {
  scanSourceDirectory(): Promise<string[]>;
  needsUpdate(sourcePath: string, outputPaths: string[]): Promise<boolean>;
  writeOptimizedImage(buffer: Buffer, outputPath: string): Promise<void>;
  ensureDirectoryExists(dirPath: string): void;
  getRelativePath(absolutePath: string): string;
}
```

### 4. Metadata Generator

**Purpose**: Create and maintain image metadata JSON file

**Interface**:
```typescript
interface ImageDimensions {
  [relativePath: string]: {
    width: number;
    height: number;
    aspectRatio: number;
    formats: {
      avif: string[];      // Paths to AVIF variants
      webp: string[];      // Paths to WebP variants
      jpg: string[];       // Paths to JPG variants
    };
    blurDataURL?: string;  // Base64 blur placeholder
    sizes: string;         // Responsive sizes string
  };
}

class MetadataGenerator {
  async generateMetadata(
    results: ProcessingResult[]
  ): Promise<ImageDimensions>;
  
  async writeMetadataFile(metadata: ImageDimensions): Promise<void>;
  
  async updateMetadata(
    existingMetadata: ImageDimensions,
    newResults: ProcessingResult[]
  ): Promise<ImageDimensions>;
}
```

### 5. Error Handler

**Purpose**: Manage errors and generate processing reports

**Interface**:
```typescript
interface ProcessingError {
  filePath: string;
  error: string;
  timestamp: number;
}

interface ProcessingReport {
  totalImages: number;
  successful: number;
  failed: number;
  skipped: number;
  errors: ProcessingError[];
  statistics: {
    totalSizeReduction: number;
    averageProcessingTime: number;
    formatBreakdown: {
      avif: number;
      webp: number;
      jpg: number;
    };
  };
}

class ErrorHandler {
  logError(filePath: string, error: Error): void;
  shouldHaltBuild(errorCount: number, totalCount: number): boolean;
  generateReport(results: ProcessingResult[]): ProcessingReport;
  writeReport(report: ProcessingReport): Promise<void>;
}
```

## Data Models

### Image Metadata Schema

```json
{
  "products/cat-litter-bag.jpg": {
    "width": 1920,
    "height": 1080,
    "aspectRatio": 1.78,
    "formats": {
      "avif": [
        "optimized/cat-litter-bag-640w.avif",
        "optimized/cat-litter-bag-828w.avif",
        "optimized/cat-litter-bag-1080w.avif",
        "optimized/cat-litter-bag-1200w.avif",
        "optimized/cat-litter-bag-1920w.avif"
      ],
      "webp": [
        "optimized/cat-litter-bag-640w.webp",
        "optimized/cat-litter-bag-828w.webp",
        "optimized/cat-litter-bag-1080w.webp",
        "optimized/cat-litter-bag-1200w.webp",
        "optimized/cat-litter-bag-1920w.webp"
      ],
      "jpg": [
        "optimized/cat-litter-bag-640w.jpg",
        "optimized/cat-litter-bag-828w.jpg",
        "optimized/cat-litter-bag-1080w.jpg",
        "optimized/cat-litter-bag-1200w.jpg",
        "optimized/cat-litter-bag-1920w.jpg"
      ]
    },
    "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "sizes": "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }
}
```

### Processing Report Schema

```json
{
  "timestamp": "2025-11-09T12:00:00.000Z",
  "totalImages": 150,
  "successful": 148,
  "failed": 2,
  "skipped": 0,
  "errors": [
    {
      "filePath": "public/original-images/corrupted.jpg",
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

## Error Handling

### Error Categories

1. **File System Errors**
   - Missing source directory
   - Permission denied
   - Disk space full
   - **Handling**: Log error, skip file, continue processing

2. **Image Processing Errors**
   - Corrupted image file
   - Unsupported format
   - Invalid dimensions
   - **Handling**: Log error, retain previous version if exists, continue processing

3. **Configuration Errors**
   - Invalid configuration file
   - Missing required fields
   - Invalid profile settings
   - **Handling**: Fall back to default configuration, log warning

4. **Build Errors**
   - Error threshold exceeded (>10% failures)
   - Critical system error
   - **Handling**: Halt build, report detailed error information

### Error Recovery Strategy

```typescript
async function processWithRetry(
  imagePath: string,
  maxRetries: number = 3
): Promise<ProcessingResult> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await processImage(imagePath);
    } catch (error) {
      if (attempt === maxRetries) {
        return {
          success: false,
          originalPath: imagePath,
          outputs: [],
          error: error.message
        };
      }
      await delay(1000 * attempt); // Exponential backoff
    }
  }
}
```

## Testing Strategy

### Unit Tests

1. **Configuration Manager Tests**
   - Load valid configuration
   - Handle missing configuration file
   - Validate configuration schema
   - Select correct profile based on image path

2. **Image Processor Tests**
   - Process valid images
   - Handle corrupted images
   - Generate correct formats
   - Apply quality settings correctly
   - Generate blur placeholders

3. **Metadata Generator Tests**
   - Generate correct metadata structure
   - Update existing metadata
   - Handle missing images
   - Validate JSON output

### Integration Tests

1. **End-to-End Pipeline Test**
   - Place test images in source directory
   - Run optimization pipeline
   - Verify all formats generated
   - Validate metadata file
   - Check processing report

2. **Error Handling Test**
   - Process batch with corrupted images
   - Verify error logging
   - Ensure build continues
   - Validate error threshold behavior

3. **Performance Test**
   - Process 100 images
   - Measure total processing time
   - Verify concurrency limits
   - Check memory usage

### Test Data

```
test-images/
├── valid/
│   ├── product-1.jpg (1920x1080)
│   ├── blog-1.png (1200x800)
│   └── thumbnail-1.jpg (400x400)
├── invalid/
│   ├── corrupted.jpg
│   ├── unsupported.bmp
│   └── zero-size.jpg
└── edge-cases/
    ├── very-large.jpg (8000x6000)
    ├── very-small.jpg (10x10)
    └── unusual-aspect.jpg (100x1000)
```

## Performance Considerations

### Optimization Strategies

1. **Parallel Processing**
   - Process multiple images concurrently (limit: 2)
   - Generate formats in parallel for each image
   - Use worker threads for CPU-intensive operations

2. **Caching**
   - Skip processing if output files are newer than source
   - Cache metadata to avoid re-reading files
   - Implement incremental builds

3. **Memory Management**
   - Disable Sharp cache to reduce memory footprint
   - Process images in batches
   - Stream large files instead of loading into memory

4. **Build Time Optimization**
   - Skip optimization on CI/Vercel (use pre-optimized images)
   - Implement watch mode for development
   - Only process changed files

### Performance Targets

- Process 100 images in < 5 minutes
- Memory usage < 512MB peak
- File size reduction: 60-80%
- Build time impact: < 2 minutes for typical deployment

## Integration Points

### Next.js Build Process

```javascript
// next.config.js
module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      // Run image optimization during server build
      require('./scripts/optimize-images-enhanced.js');
    }
    return config;
  }
};
```

### Next.js Image Component

```typescript
import Image from 'next/image';
import imageDimensions from '@/public/image-dimensions.json';

function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  const metadata = imageDimensions[src];
  
  return (
    <Image
      src={`/optimized/${src}`}
      alt={alt}
      width={metadata.width}
      height={metadata.height}
      sizes={metadata.sizes}
      placeholder="blur"
      blurDataURL={metadata.blurDataURL}
    />
  );
}
```

### Vercel Deployment

```javascript
// vercel.json
{
  "buildCommand": "npm run optimize-images && npm run build",
  "env": {
    "SKIP_IMAGE_OPTIMIZATION": "true"
  }
}
```

## Security Considerations

1. **Input Validation**
   - Validate image file formats before processing
   - Check file sizes to prevent DoS attacks
   - Sanitize file names to prevent path traversal

2. **Resource Limits**
   - Limit maximum image dimensions
   - Cap processing time per image
   - Enforce memory limits

3. **Output Validation**
   - Verify generated files are valid images
   - Check output file sizes are reasonable
   - Validate metadata JSON structure
