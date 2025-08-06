import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePerformanceTracking } from './PerformanceMonitor';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  responsive?: boolean;
  webpFallback?: boolean;
  avifSupport?: boolean;
  criticalResource?: boolean;
  trackPerformance?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  className = '',
  style,
  onLoad,
  onError,
  lazy = true,
  responsive = true,
  webpFallback = true,
  avifSupport = true,
  criticalResource = false,
  trackPerformance = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { trackCustomMetric } = usePerformanceTracking();
  const loadStartTime = useRef<number>(Date.now());

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (responsive ? 
    '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' : 
    undefined
  );

  // Generate optimized quality based on image type and priority
  const optimizedQuality = criticalResource ? Math.min(quality + 10, 100) : quality;

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (width: number, height: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple gradient blur placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL();
  };

  const handleLoad = () => {
    const endTime = Date.now();
    const duration = endTime - loadStartTime.current;
    
    setIsLoaded(true);
    setLoadTime(duration);
    
    if (trackPerformance) {
      trackCustomMetric('image_load_time', duration, 'ms');
      trackCustomMetric('image_size', imageRef.current?.naturalWidth || 0, 'px');
    }
    
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    
    if (trackPerformance) {
      trackCustomMetric('image_load_error', 1, 'count');
    }
    
    onError?.();
  };

  // Intersection Observer for lazy loading performance tracking
  useEffect(() => {
    if (!trackPerformance || !imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackCustomMetric('image_viewport_entry', Date.now() - loadStartTime.current, 'ms');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [trackPerformance]);

  // Preload critical images
  useEffect(() => {
    if (criticalResource && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [criticalResource, src]);

  const imageProps = {
    src,
    alt,
    quality: optimizedQuality,
    priority: priority || criticalResource,
    placeholder,
    blurDataURL: blurDataURL || (placeholder === 'blur' && width && height ? 
      generateBlurDataURL(width, height) : undefined),
    sizes: responsiveSizes,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    style: {
      ...style,
      ...(hasError ? { display: 'none' } : {})
    },
    onLoad: handleLoad,
    onError: handleError,
    ref: imageRef,
    ...props
  };

  // Add width/height or fill prop with proper typing
  const imagePropsWithDimensions = {
    ...imageProps,
    ...(fill ? { fill: true } : width && height ? { width, height } : {})
  };

  return (
    <div className="relative">
      <Image 
        {...imagePropsWithDimensions}
        alt={alt || ''} // Ensure alt prop is always provided
      />
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Performance debug info (development only) */}
      {process.env.NODE_ENV === 'development' && loadTime && (
        <div className="absolute top-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded">
          {loadTime}ms
        </div>
      )}
    </div>
  );
};

// Specialized components for common use cases
export const HeroImage: React.FC<Omit<OptimizedImageProps, 'priority' | 'criticalResource'>> = (props) => (
  <OptimizedImage
    {...props}
    priority={true}
    criticalResource={true}
    quality={90}
    placeholder="blur"
  />
);

export const ProductImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    {...props}
    quality={85}
    responsive={true}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  />
);

export const ThumbnailImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    {...props}
    quality={75}
    lazy={true}
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 150px"
  />
);

export const BackgroundImage: React.FC<OptimizedImageProps> = (props) => (
  <OptimizedImage
    {...props}
    fill={true}
    quality={80}
    style={{ objectFit: 'cover', ...props.style }}
  />
);

// Image optimization utilities
export const imageOptimizationUtils = {
  // Generate responsive image sizes
  generateSizes: (breakpoints: Record<string, string>): string => {
    return Object.entries(breakpoints)
      .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
      .join(', ');
  },

  // Calculate optimal quality based on image type
  calculateOptimalQuality: (imageType: string, isRetina: boolean = false): number => {
    const baseQuality: Record<string, number> = {
      'image/jpeg': 85,
      'image/webp': 80,
      'image/avif': 75,
      'image/png': 95
    };

    const quality = baseQuality[imageType] || 85;
    return isRetina ? Math.max(quality - 10, 60) : quality;
  },

  // Generate blur data URL for placeholder
  generateBlurDataURL: (color: string = '#f3f4f6'): string => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${color}"/>
      </svg>`
    )}`;
  },

  // Check if browser supports modern image formats
  checkImageFormatSupport: (): Promise<{ webp: boolean; avif: boolean }> => {
    return new Promise((resolve) => {
      const webp = new (window as Window & { Image: new () => HTMLImageElement }).Image();
      const avif = new (window as Window & { Image: new () => HTMLImageElement }).Image();
      const results = { webp: false, avif: false };
      let completed = 0;

      const checkComplete = () => {
        completed++;
        if (completed === 2) {
          resolve(results);
        }
      };

      webp.onload = () => {
        results.webp = true;
        checkComplete();
      };
      webp.onerror = checkComplete;
      webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

      avif.onload = () => {
        results.avif = true;
        checkComplete();
      };
      avif.onerror = checkComplete;
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }
};

export default OptimizedImage;
