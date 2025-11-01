/**
 * CLS-Optimized Image Component
 * Prevents Cumulative Layout Shift by reserving space during image load
 */
import React, { useCallback, useState } from 'react';
import Image from 'next/image';

interface CLSOptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

export const CLSOptimizedImage: React.FC<CLSOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  sizes,
  className = '',
  style,
  objectFit = 'contain',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const aspectRatio = width / height;
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio.toString(),
        width: '100%',
        maxWidth: width,
        ...style
      }}
    >
      {/* Placeholder with exact dimensions to prevent CLS */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: aspectRatio.toString()
          }}
        >
          <div className="w-6 h-6 border-2 border-gray-400 dark:border-gray-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400"
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: aspectRatio.toString()
          }}
        >
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Failed to load</span>
          </div>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes || `${width}px`}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          aspectRatio: aspectRatio.toString()
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

// Specialized components for specific use cases
export const HeroCLSImage: React.FC<Omit<CLSOptimizedImageProps, 'priority'>> = (props) => (
  <CLSOptimizedImage {...props} priority={true} quality={90} />
);

export const ProductCLSImage: React.FC<CLSOptimizedImageProps> = (props) => (
  <CLSOptimizedImage 
    {...props} 
    sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
    objectFit="contain"
  />
);

export const ThumbnailCLSImage: React.FC<CLSOptimizedImageProps> = (props) => (
  <CLSOptimizedImage 
    {...props} 
    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
    objectFit="cover"
    quality={75}
  />
);

export default CLSOptimizedImage;
