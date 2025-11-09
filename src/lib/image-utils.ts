/**
 * Image Utilities
 * 
 * Helper functions for working with optimized images and Next.js Image component.
 */

import imageDimensions from '@/public/image-dimensions.json';

/**
 * Image metadata interface
 */
export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  formats: {
    avif?: string[];
    webp?: string[];
    jpg?: string[];
  };
  sizes: string;
  blurDataURL?: string;
}

/**
 * Get metadata for an image
 * @param imagePath - Relative path to the image
 * @returns Image metadata or null if not found
 */
export function getImageMetadata(imagePath: string): ImageMetadata | null {
  const metadata = (imageDimensions as Record<string, ImageMetadata>)[imagePath];
  return metadata || null;
}

/**
 * Get optimized image path for a specific format
 * @param imagePath - Relative path to the image
 * @param format - Desired format (avif, webp, jpg)
 * @param width - Desired width (optional, returns first available if not specified)
 * @returns Path to optimized image or null
 */
export function getOptimizedImagePath(
  imagePath: string,
  format: 'avif' | 'webp' | 'jpg' = 'webp',
  width?: number
): string | null {
  const metadata = getImageMetadata(imagePath);
  if (!metadata || !metadata.formats[format]) {
    return null;
  }

  const paths = metadata.formats[format];
  if (!paths || paths.length === 0) {
    return null;
  }

  // If width specified, find closest match
  if (width) {
    const pathWithWidth = paths.find(p => p.includes(`-${width}w.`));
    if (pathWithWidth) {
      return `/${pathWithWidth}`;
    }
  }

  // Return first available path
  return `/${paths[0]}`;
}

/**
 * Get all available formats for an image
 * @param imagePath - Relative path to the image
 * @returns Array of available formats
 */
export function getAvailableFormats(imagePath: string): string[] {
  const metadata = getImageMetadata(imagePath);
  if (!metadata) {
    return [];
  }

  return Object.keys(metadata.formats).filter(
    format => metadata.formats[format as keyof typeof metadata.formats]?.length > 0
  );
}

/**
 * Get responsive sizes string for Next.js Image component
 * @param imagePath - Relative path to the image
 * @returns Sizes string or default
 */
export function getImageSizes(imagePath: string): string {
  const metadata = getImageMetadata(imagePath);
  return metadata?.sizes || '100vw';
}

/**
 * Get blur placeholder data URL
 * @param imagePath - Relative path to the image
 * @returns Blur data URL or undefined
 */
export function getBlurDataURL(imagePath: string): string | undefined {
  const metadata = getImageMetadata(imagePath);
  return metadata?.blurDataURL;
}

/**
 * Check if image has optimized versions
 * @param imagePath - Relative path to the image
 * @returns True if optimized versions exist
 */
export function hasOptimizedVersions(imagePath: string): boolean {
  const metadata = getImageMetadata(imagePath);
  return metadata !== null;
}

/**
 * Get image dimensions
 * @param imagePath - Relative path to the image
 * @returns Object with width and height or null
 */
export function getImageDimensions(imagePath: string): { width: number; height: number } | null {
  const metadata = getImageMetadata(imagePath);
  if (!metadata) {
    return null;
  }

  return {
    width: metadata.width,
    height: metadata.height
  };
}

/**
 * Get aspect ratio for an image
 * @param imagePath - Relative path to the image
 * @returns Aspect ratio or null
 */
export function getImageAspectRatio(imagePath: string): number | null {
  const metadata = getImageMetadata(imagePath);
  return metadata?.aspectRatio || null;
}

/**
 * Generate srcSet for responsive images
 * @param imagePath - Relative path to the image
 * @param format - Desired format
 * @returns srcSet string or empty string
 */
export function generateSrcSet(imagePath: string, format: 'avif' | 'webp' | 'jpg' = 'webp'): string {
  const metadata = getImageMetadata(imagePath);
  if (!metadata || !metadata.formats[format]) {
    return '';
  }

  const paths = metadata.formats[format];
  if (!paths || paths.length === 0) {
    return '';
  }

  // Extract width from filename and create srcSet entries
  const srcSetEntries = paths
    .map(path => {
      const widthMatch = path.match(/-(\d+)w\./);
      if (widthMatch) {
        const width = widthMatch[1];
        return `/${path} ${width}w`;
      }
      return null;
    })
    .filter(Boolean);

  return srcSetEntries.join(', ');
}

/**
 * Get props for Next.js Image component
 * @param imagePath - Relative path to the image
 * @param alt - Alt text for the image
 * @param priority - Whether to prioritize loading
 * @returns Props object for Next.js Image component
 */
export function getImageProps(
  imagePath: string,
  alt: string,
  priority: boolean = false
): {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  placeholder?: 'blur';
  blurDataURL?: string;
  priority: boolean;
} | null {
  const metadata = getImageMetadata(imagePath);
  if (!metadata) {
    return null;
  }

  // Get the best available format path
  const src = getOptimizedImagePath(imagePath, 'webp') || 
              getOptimizedImagePath(imagePath, 'jpg') ||
              `/${imagePath}`;

  const props: any = {
    src,
    alt,
    width: metadata.width,
    height: metadata.height,
    sizes: metadata.sizes,
    priority
  };

  // Add blur placeholder if available
  if (metadata.blurDataURL) {
    props.placeholder = 'blur';
    props.blurDataURL = metadata.blurDataURL;
  }

  return props;
}
