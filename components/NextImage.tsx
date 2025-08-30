import Image, { ImageProps } from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

// Define the image dimensions type from the JSON file
interface ImageDimensions {
  [key: string]: {
    width: number;
    height: number;
    webp: string;
    avif: string;
    optimized: string;
  };
}

// Load image dimensions from the JSON file (will only be used server-side)
const imageDimensionsCache: ImageDimensions | null = null;

interface NextImageProps extends Omit<ImageProps, 'src' | 'alt' | 'onError'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  fallbackSrc?: string;
  caption?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'sync' | 'async' | 'auto';
  loading?: 'eager' | 'lazy';
  useModernFormat?: boolean; // Whether to use WebP/AVIF
}

export default function NextImage({
  src,
  alt,
  width: propWidth,
  height: propHeight,
  className,
  priority = false,
  quality = 80,
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, 33vw',
  fill = false,
  style,
  fallbackSrc = '/images/icon-64.png',
  caption,
  fetchPriority = 'auto',
  decoding = 'async',
  loading: loadingProp,
  useModernFormat = true,
  ...rest
}: NextImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [width, setWidth] = useState<number | undefined>(propWidth);
  const [height, setHeight] = useState<number | undefined>(propHeight);
  const imageRef = useRef<HTMLImageElement>(null);

  // Try to get image dimensions from the optimized images data
  const tryGetImageDimensions = useCallback(() => {
    // Skip for external images or if dimensions are already provided
    if (src.startsWith('http') || src.startsWith('https') || (propWidth && propHeight)) {
      return;
    }

    try {
      // In client-side, we can't directly access the file system
      // This is a fallback mechanism for when dimensions aren't provided
      if (typeof window !== 'undefined' && !width && !height) {
        // Create a temporary image to get dimensions
        const img = document.createElement('img');
        img.onload = () => {
          setWidth(img.naturalWidth);
          setHeight(img.naturalHeight);
        };
        img.src = src.startsWith('/') ? src : `/${src}`;
      }
    } catch (error) {
      console.warn(`Could not determine dimensions for ${src}`, error);
    }
  }, [src, propWidth, propHeight, width, height]);

  // Reset states when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setError(false);
    
    // Try to get dimensions from the optimized images data
    if (!propWidth || !propHeight) {
      tryGetImageDimensions();
    } else {
      setWidth(propWidth);
      setHeight(propHeight);
    }
  }, [src, propWidth, propHeight, tryGetImageDimensions]);

  // Handle external URLs and local images
  const isExternal = src.startsWith('http') || src.startsWith('https');
  
  // For local images, ensure they start with a slash
  let imageSrc = !isExternal && !src.startsWith('/') ? `/${src}` : src;

  // Detect iOS Chrome
  const isIOSChrome = typeof window !== 'undefined' && 
    /CriOS/.test(navigator.userAgent) && 
    /iPhone|iPad|iPod/.test(navigator.userAgent);

  // Use optimized image formats if available and requested
  if (!isExternal && useModernFormat) {
    // Check if we have an optimized version
    const baseName = imageSrc.split('/').pop()?.split('.')[0];
    if (baseName) {
      // First check if the path already includes optimized
      if (!imageSrc.includes('/optimized/')) {
        // Try to use the original extension first as a fallback
        const ext = imageSrc.split('.').pop()?.toLowerCase() || 'jpg';
        
        // Create both encoded and sanitized versions of the basename
        const encodedBaseName = encodeURIComponent(baseName);
        const sanitizedBaseName = baseName.replace(/\s+/g, '-');
        
        // Create paths for different formats and naming conventions
        const optimizedJpg = `/optimized/${encodedBaseName}.jpg`;
        const optimizedSanitizedJpg = `/optimized/${sanitizedBaseName}.jpg`;
        const optimizedPng = `/optimized/${encodedBaseName}.png`;
        const optimizedSanitizedPng = `/optimized/${sanitizedBaseName}.png`;
        const optimizedWebP = `/optimized/${encodedBaseName}.webp`;
        const optimizedSanitizedWebP = `/optimized/${sanitizedBaseName}.webp`;
        const optimizedOriginal = `/optimized/${encodedBaseName}.${ext}`;
        
        // For iOS Chrome, use PNG or JPG format for better compatibility
        if (isIOSChrome) {
          if (baseName.includes(' ')) {
            imageSrc = optimizedSanitizedPng;
          } else {
            imageSrc = optimizedPng;
          }
        } else {
          // For other browsers, use JPG as default
          if (baseName.includes(' ')) {
            imageSrc = optimizedSanitizedJpg;
          } else {
            imageSrc = optimizedJpg;
          }
        }
        
        // Enhanced logging for debugging
        if (typeof window !== 'undefined') {
          console.log(`Using optimized image: ${imageSrc} (original: ${src})`);
          console.log(`Browser: ${navigator.userAgent}`);
        }
      }
    }
  }

  // Determine appropriate loading strategy
  // Always use lazy loading for images below the fold
  const loading = loadingProp || (priority ? 'eager' : 'lazy');
  
  // Use fetchPriority to give the browser more hints about image importance
  const finalFetchPriority = priority ? 'high' : fetchPriority;

  // Handle image load error
  const handleError = () => {
    setError(true);
    
    // If the optimized version failed, try alternatives before falling back to original
    if (imageSrc.includes('/optimized/') && !isExternal) {
      // Extract the base filename and extension
      const baseName = imageSrc.split('/').pop()?.split('.')[0];
      const ext = imageSrc.split('.').pop()?.toLowerCase();
      
      // Try different fallback strategies
      if (baseName && ext) {
        // For iOS Chrome, try this fallback chain: PNG -> JPG -> Original
        if (isIOSChrome) {
          if (ext === 'png') {
            const jpgPath = imageSrc.replace('.png', '.jpg');
            console.log(`PNG failed on iOS Chrome, trying JPG: ${jpgPath}`);
            setImgSrc(jpgPath);
            return;
          }
          if (ext === 'jpg') {
            const originalPath = imageSrc.replace('.jpg', `.${src.split('.').pop()}`);
            console.log(`JPG failed on iOS Chrome, trying original: ${originalPath}`);
            setImgSrc(originalPath);
            return;
          }
        } else {
          // For other browsers: JPG -> WebP -> Original
          if (ext === 'jpg') {
            const webpPath = imageSrc.replace('.jpg', '.webp');
            console.log(`JPG failed, trying WebP: ${webpPath}`);
            setImgSrc(webpPath);
            return;
          }
          if (ext === 'webp') {
            const originalPath = imageSrc.replace('.webp', `.${src.split('.').pop()}`);
            console.log(`WebP failed, trying original: ${originalPath}`);
            setImgSrc(originalPath);
            return;
          }
        }
        
        // If using a sanitized filename, try the original encoded version
        if (!baseName.includes('-') && baseName.includes('%20')) {
          const originalName = decodeURIComponent(baseName);
          const sanitizedName = originalName.replace(/\s+/g, '-');
          const sanitizedPath = imageSrc.replace(baseName, sanitizedName);
          console.log(`Encoded name failed, trying sanitized: ${sanitizedPath}`);
          setImgSrc(sanitizedPath);
          return;
        }
        
        // If using a sanitized filename with hyphens, try the original with spaces
        if (baseName.includes('-')) {
          const originalName = baseName.replace(/-/g, ' ');
          const encodedName = encodeURIComponent(originalName);
          const encodedPath = imageSrc.replace(baseName, encodedName);
          console.log(`Sanitized name failed, trying encoded: ${encodedPath}`);
          setImgSrc(encodedPath);
          return;
        }
      }
      
      // If all optimized versions fail, fall back to the original
      const originalSrc = src.startsWith('/') ? src : `/${src}`;
      setImgSrc(originalSrc);
      console.error(`All optimized versions failed for: ${imageSrc}. Falling back to original: ${originalSrc}`);
    } else {
      setImgSrc(fallbackSrc);
      console.error(`Image load failed for: ${src}. Using fallback.`);
    }
  };

  // Handle image load complete
  const handleLoad = () => {
    setIsLoading(false);
    
    // If dimensions weren't provided, try to get them from the loaded image
    if ((!width || !height) && imageRef.current) {
      setWidth(imageRef.current.naturalWidth);
      setHeight(imageRef.current.naturalHeight);
    }
  };

  // Generate a descriptive alt text if none provided
  const safeAlt = alt || 'Image';

  // Extract filename for structured data
  const filename = typeof src === 'string'
    ? src.split('/').pop()?.split('.')[0].replace(/-/g, ' ')
    : '';

  // Ensure we have width and height for proper layout
  const finalWidth = fill ? undefined : (width || 100);
  const finalHeight = fill ? undefined : (height || 100);

  return (
    <div className={`relative ${className || ''}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {error ? (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
          </div>
        </div>
      ) : (
        <Image
          ref={imageRef}
          src={imgSrc}
          alt={safeAlt}
          width={finalWidth}
          height={finalHeight}
          className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          priority={priority}
          quality={quality}
          sizes={sizes || (fill ? "100vw" : undefined)}
          fill={fill}
          style={{
            ...style,
            objectFit: fill ? 'cover' : 'contain'
          }}
          onError={handleError}
          onLoad={handleLoad}
          fetchPriority={finalFetchPriority}
          decoding={decoding}
          loading={loading}
          {...rest}
        />
      )}
      
      {caption && !error && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
          {caption}
        </div>
      )}
      
      {/* Structured data for the image */}
      {!isLoading && !error && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ImageObject',
              contentUrl: isExternal ? imgSrc : imgSrc,
              name: caption || filename || safeAlt,
              description: safeAlt,
              width: finalWidth,
              height: finalHeight,
            })
          }}
        />
      )}
    </div>
  );
}