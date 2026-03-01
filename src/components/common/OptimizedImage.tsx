/**
 * OptimizedImage Component
 * 
 * Unified image component that replaces OptimizedImage, CLSOptimizedImage, and NextImage.
 * Integrates with the image optimization system and provides CLS prevention,
 * loading states, error handling, and blur placeholders.
 */

import { useState } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { getImageMetadata } from '@/lib/image-utils';

const imageVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        hero: 'w-full h-[400px] md:h-[500px] lg:h-[600px]',
        product: 'w-full h-[300px] md:h-[400px]',
        thumbnail: 'w-full h-[150px] md:h-[200px]',
        avatar: 'rounded-full w-[100px] h-[100px]',
        default: 'w-full h-auto'
      },
      objectFit: {
        cover: '',
        contain: '',
        fill: '',
        none: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      objectFit: 'cover'
    }
  }
);

const imageObjectFitClasses: Record<string, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none'
};

/**
 * Get responsive sizes attribute based on variant
 */
function getSizesForVariant(variant?: string): string {
  const sizeMap: Record<string, string> = {
    hero: '100vw',
    product: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
    thumbnail: '(min-width: 640px) 200px, 100vw',
    avatar: '100px',
    default: '100vw'
  };
  return sizeMap[variant || 'default'] || '100vw';
}

export interface OptimizedImageProps extends VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  variant,
  objectFit = 'cover',
  priority = false,
  className,
  onLoad,
  onError,
  fill = false,
  loading,
  sizes: customSizes,
  quality = 85
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Load metadata from image-dimensions.json
  const metadata = getImageMetadata(src);

  // Use provided dimensions or fall back to metadata
  const imageWidth = width || metadata?.width || 800;
  const imageHeight = height || metadata?.height || 600;

  // Responsive sizes - use custom or fall back to variant-based defaults
  const imageSizes = customSizes || metadata?.sizes || getSizesForVariant(variant ?? undefined);

  // Loading strategy: priority overrides loading prop
  const loadingStrategy = priority ? 'eager' : (loading || 'lazy');

  const blurDataURL = metadata?.blurDataURL;

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn(imageVariants({ variant }), className)}>
      {/* Loading placeholder */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 bg-gray-700 animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-gray-800">
          <svg
            className="w-12 h-12 text-gray-400 text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-500 text-gray-400">
            Failed to load image
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          {...(fill ? { fill: true } : { width: imageWidth, height: imageHeight })}
          className={cn(
            imageObjectFitClasses[objectFit || 'cover'],
            'transition-opacity duration-300',
            {
              'opacity-0': isLoading,
              'opacity-100': !isLoading
            }
          )}
          priority={priority}
          loading={loadingStrategy}
          sizes={imageSizes}
          quality={quality}
          {...(blurDataURL && {
            placeholder: 'blur' as const,
            blurDataURL
          })}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

// Specialized variant exports for convenience
export const HeroImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="hero" priority={props.priority ?? true} />
);

export const ProductImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="product" loading={props.loading ?? 'lazy'} />
);

export const ThumbnailImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="thumbnail" loading={props.loading ?? 'lazy'} />
);

export const AvatarImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="avatar" objectFit="cover" loading={props.loading ?? 'lazy'} />
);
