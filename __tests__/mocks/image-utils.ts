/**
 * Mock for @/lib/image-utils
 */

export interface ImageMetadata {
  width: number;
  height: number;
  sizes?: string;
  blurDataURL?: string;
}

export function getImageMetadata(_src: string): ImageMetadata | null {
  // Return default metadata for testing
  return {
    width: 800,
    height: 600,
    sizes: '100vw',
  };
}

export function generateBlurDataURL(_src: string): string {
  return 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
}
