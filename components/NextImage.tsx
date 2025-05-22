import Image, { ImageProps } from 'next/image';
import { useState, useEffect, useRef } from 'react';

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
let imageDimensionsCache: ImageDimensions | null = null;

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
  }, [src, propWidth, propHeight]);

  // Try to get image dimensions from the optimized images data
  const tryGetImageDimensions = () => {
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
  };

  // Handle external URLs and local images
  const isExternal = src.startsWith('http') || src.startsWith('https');
  
  // For local images, ensure they start with a slash
  let imageSrc = !isExternal && !src.startsWith('/') ? `/${src}` : src;

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
        const optimizedWebP = `/optimized/${encodedBaseName}.webp`;
        const optimizedSanitizedWebP = `/optimized/${sanitizedBaseName}.webp`;
        const optimizedJpg = `/optimized/${encodedBaseName}.jpg`;
        const optimizedOriginal = `/optimized/${encodedBaseName}.${ext}`;
        
        // Try to use WebP format first, then fallback to JPG
        // Prefer sanitized filenames for better compatibility
        if (baseName.includes(' ')) {
          imageSrc = optimizedSanitizedWebP;
        } else {
          imageSrc = optimizedWebP;
        }
        
        // Log for debugging
        if (typeof window !== 'undefined') {
          console.log(`Using optimized image: ${imageSrc} (original: ${src})`);
          if (baseName.includes(' ')) {
            console.log(`Using sanitized filename for image with spaces: ${sanitizedBaseName}`);
          }
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
        // If using WebP, try JPG
        if (ext === 'webp') {
          const jpgPath = imageSrc.replace('.webp', '.jpg');
          console.log(`WebP failed, trying JPG: ${jpgPath}`);
          setImgSrc(jpgPath);
          return; // Exit early to try this fallback first
        }
        
        // If using a sanitized filename, try the original encoded version
        if (!baseName.includes('-') && baseName.includes('%20')) {
          const originalName = decodeURIComponent(baseName);
          const sanitizedName = originalName.replace(/\s+/g, '-');
          const sanitizedPath = imageSrc.replace(baseName, sanitizedName);
          console.log(`Encoded name failed, trying sanitized: ${sanitizedPath}`);
          setImgSrc(sanitizedPath);
          return; // Exit early to try this fallback first
        }
        
        // If using an encoded name with spaces, try the sanitized version
        if (baseName.includes('%20')) {
          const decodedName = decodeURIComponent(baseName);
          const sanitizedName = decodedName.replace(/\s+/g, '-');
          const sanitizedPath = imageSrc.replace(baseName, sanitizedName);
          console.log(`Encoded name failed, trying sanitized: ${sanitizedPath}`);
          setImgSrc(sanitizedPath);
          return; // Exit early to try this fallback first
        }
      }
      
      // If all optimized versions fail, fall back to the original
      const originalSrc = src.startsWith('/') ? src : `/${src}`;
      setImgSrc(originalSrc);
      console.error(`All optimized versions failed for: ${imageSrc}. Falling back to original: ${originalSrc}`);
      
      // Add more detailed logging for debugging
      console.error(`Image error details:
        - Original src: ${src}
        - Attempted optimized src: ${imageSrc}
        - Fallback src: ${originalSrc}
        - Is external: ${isExternal}
        - Environment: ${typeof window !== 'undefined' ? 'client' : 'server'}
        - URL encoded version: ${encodeURIComponent(imageSrc)}
      `);
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
  const finalWidth = width || (fill ? undefined : 100);
  const finalHeight = height || (fill ? undefined : 100);

  return (
    <figure className={`relative ${isLoading ? 'animate-pulse bg-gray-200/30' : ''}`}>
      <Image
        ref={imageRef}
        src={imgSrc}
        alt={safeAlt}
        width={finalWidth}
        height={finalHeight}
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        fill={fill}
        style={style}
        loading={loading}
        fetchPriority={finalFetchPriority}
        decoding={decoding}
        onError={handleError}
        onLoad={handleLoad}
        {...(error ? { 'aria-hidden': 'true' } : {})}
        {...rest}
      />
      
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 italic">
          {caption}
        </figcaption>
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
    </figure>
  );
}