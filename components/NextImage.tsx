import Image, { ImageProps } from 'next/image';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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
  const fallbackCandidatesRef = useRef<string[]>([]);
  const [prefersReducedData, setPrefersReducedData] = useState<boolean>(false);

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

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return;
    }

    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    };
    const connection = nav.connection;

    if (!connection) {
      return;
    }

    const updateSaveData = () => {
      setPrefersReducedData(Boolean(connection.saveData));
    };

    updateSaveData();

    if (typeof connection.addEventListener === 'function') {
      connection.addEventListener('change', updateSaveData);
      return () => connection.removeEventListener?.('change', updateSaveData);
    }

    return undefined;
  }, []);

  const isExternal = src.startsWith('http') || src.startsWith('https');
  const isIOSChrome = typeof window !== 'undefined' &&
    /CriOS/.test(navigator.userAgent) &&
    /iPhone|iPad|iPod/.test(navigator.userAgent);

  // Reset states when src changes and compute optimized candidates
  useEffect(() => {
    const normalizedSrc = isExternal ? src : (src.startsWith('/') ? src : `/${src}`);

    const candidateList: string[] = [];

    if (!isExternal) {
      const fileName = normalizedSrc.split('/').pop();
      const baseName = fileName ? fileName.replace(/\.[^/.]+$/, '') : '';

      if (baseName) {
        const encodedBaseName = encodeURIComponent(baseName);
        const sanitizedBaseName = baseName.replace(/\s+/g, '-');
        const formatPriority = isIOSChrome
          ? ['png', 'jpg', 'webp']
          : useModernFormat
            ? ['avif', 'webp', 'jpg', 'png']
            : ['jpg', 'png', 'webp'];

        const addCandidate = (value?: string | null) => {
          if (!value) {
            return;
          }
          if (candidateList.includes(value)) {
            return;
          }
          candidateList.push(value);
        };

        if (normalizedSrc.includes('/optimized/')) {
          const basePath = normalizedSrc.replace(/\.[^/.]+$/, '');
          formatPriority.forEach((ext) => addCandidate(`${basePath}.${ext}`));
        } else {
          formatPriority.forEach((ext) => {
            addCandidate(`/optimized/${encodedBaseName}.${ext}`);
            if (sanitizedBaseName && sanitizedBaseName !== encodedBaseName) {
              addCandidate(`/optimized/${sanitizedBaseName}.${ext}`);
            }
          });
        }
      }
    }

    if (!candidateList.includes(normalizedSrc)) {
      candidateList.push(normalizedSrc);
    }

    if (fallbackSrc && !candidateList.includes(fallbackSrc)) {
      candidateList.push(fallbackSrc);
    }

    const [initialCandidate, ...fallbacks] = candidateList.length
      ? candidateList
      : [normalizedSrc];

    setImgSrc(initialCandidate);
    fallbackCandidatesRef.current = fallbacks;
    setIsLoading(true);
    setError(false);

    if (!propWidth || !propHeight) {
      tryGetImageDimensions();
    } else {
      setWidth(propWidth);
      setHeight(propHeight);
    }
  }, [fallbackSrc, isExternal, isIOSChrome, propHeight, propWidth, src, tryGetImageDimensions, useModernFormat]);
  
  const resolvedImgSrc = isExternal || imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`;

  const computedSizes = useMemo(() => {
    if (sizes) {
      return sizes;
    }

    if (fill) {
      return '100vw';
    }

    const targetWidth = propWidth ?? width;

    if (!targetWidth) {
      return '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw';
    }

    if (targetWidth <= 180) {
      const smallViewportWidth = Math.min(targetWidth * 1.6, 320);
      return `(max-width: 640px) ${Math.round(smallViewportWidth)}px, ${Math.round(targetWidth)}px`;
    }

    if (targetWidth <= 480) {
      return `(max-width: 640px) 90vw, (max-width: 1024px) ${Math.round(targetWidth * 0.8)}px, ${Math.round(targetWidth)}px`;
    }

    return `(max-width: 768px) 90vw, (max-width: 1280px) ${Math.round(targetWidth * 0.75)}px, ${Math.round(targetWidth)}px`;
  }, [fill, propWidth, sizes, width]);

  const computedLoading = useMemo(() => (
    loadingProp ?? (priority ? 'eager' : 'lazy')
  ), [loadingProp, priority]);

  const computedFetchPriority = useMemo(() => {
    if (priority) {
      return 'high';
    }

    if (fetchPriority && fetchPriority !== 'auto') {
      return fetchPriority;
    }

    return computedLoading === 'lazy' ? 'low' : 'auto';
  }, [computedLoading, fetchPriority, priority]);

  const effectiveQuality = useMemo(() => (
    prefersReducedData ? Math.min(quality, 60) : quality
  ), [prefersReducedData, quality]);

  const imageStyle = useMemo(() => ({
    ...style,
    objectFit: style?.objectFit ?? (fill ? 'cover' : 'contain')
  }), [fill, style]);

  const structuredDataUrl = isExternal ? resolvedImgSrc : (src.startsWith('/') ? src : `/${src}`);

  const attemptOptimizedFallback = useCallback(() => {
    while (fallbackCandidatesRef.current.length) {
      const candidate = fallbackCandidatesRef.current.shift();
      if (!candidate || candidate === imgSrc) {
        continue;
      }

      setIsLoading(true);
      setError(false);
      setImgSrc(candidate);
      return true;
    }

    return false;
  }, [imgSrc]);

  // Handle image load error
  const handleError = useCallback(() => {
    if (attemptOptimizedFallback()) {
      return;
    }

    setError(true);
    console.error(`Image load failed for ${src} (last attempted: ${imgSrc})`);
  }, [attemptOptimizedFallback, imgSrc, src]);

  // Handle image load complete
  const handleLoad = useCallback(() => {
    setIsLoading(false);

    if ((!propWidth || !propHeight) && imageRef.current) {
      setWidth(imageRef.current.naturalWidth);
      setHeight(imageRef.current.naturalHeight);
    }
  }, [propHeight, propWidth]);

  // Generate a descriptive alt text if none provided
  const safeAlt = alt || 'Image';

  // Extract filename for structured data
  const filename = typeof src === 'string'
    ? src.split('/').pop()?.split('.')[0].replace(/-/g, ' ')
    : '';

  // Ensure we have width and height for proper layout
  const finalWidth = fill ? undefined : (width ?? propWidth ?? 100);
  const finalHeight = fill ? undefined : (height ?? propHeight ?? 100);

  return (
    <div className={`relative${className ? ` ${className}` : ''}`} style={style}>
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
          src={resolvedImgSrc}
          alt={safeAlt}
          width={finalWidth}
          height={finalHeight}
          className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          priority={priority}
          quality={effectiveQuality}
          sizes={computedSizes}
          fill={fill}
          style={imageStyle}
          onError={handleError}
          onLoad={handleLoad}
          fetchPriority={computedFetchPriority}
          decoding={decoding}
          loading={computedLoading}
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
              contentUrl: structuredDataUrl,
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
