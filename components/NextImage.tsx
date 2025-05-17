import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

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
}

export default function NextImage({
  src,
  alt,
  width,
  height,
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
  ...rest
}: NextImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Reset states when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setError(false);
  }, [src]);

  // Handle external URLs and local images
  const isExternal = imgSrc.startsWith('http') || imgSrc.startsWith('https');
  
  // For local images, ensure they start with a slash
  const imageSrc = !isExternal && !imgSrc.startsWith('/') ? `/${imgSrc}` : imgSrc;

  // Determine appropriate loading strategy
  const loading = loadingProp || (priority ? 'eager' : 'lazy');

  // Handle image load error
  const handleError = () => {
    setError(true);
    setImgSrc(fallbackSrc);
    console.warn(`Image load failed for: ${src}. Using fallback.`);
  };

  // Handle image load complete
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate a descriptive alt text if none provided
  const safeAlt = alt || 'Image';

  // Extract filename for structured data
  const filename = typeof src === 'string'
    ? src.split('/').pop()?.split('.')[0].replace(/-/g, ' ')
    : '';

  return (
    <figure className={`relative ${isLoading ? 'animate-pulse bg-gray-200/30' : ''}`}>
      <Image
        src={imageSrc}
        alt={safeAlt}
        width={fill ? undefined : width || 100}
        height={fill ? undefined : height || 100}
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        fill={fill}
        style={style}
        loading={loading}
        fetchPriority={fetchPriority}
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
              contentUrl: isExternal ? imageSrc : `https://purrify.ca${imageSrc}`,
              name: caption || filename || safeAlt,
              description: safeAlt,
              width: width,
              height: height,
            })
          }}
        />
      )}
    </figure>
  );
}