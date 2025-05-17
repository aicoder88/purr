import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

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
}

export default function NextImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  fallbackSrc = '/images/icon-64.png',
  ...rest
}: NextImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Handle external URLs and local images
  const isExternal = imgSrc.startsWith('http') || imgSrc.startsWith('https');
  
  // For local images, ensure they start with a slash
  const imageSrc = !isExternal && !imgSrc.startsWith('/') ? `/${imgSrc}` : imgSrc;

  // Handle image load error
  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  // Handle image load complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width || 100}
        height={fill ? undefined : height || 100}
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        fill={fill}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        {...rest}
      />
    </div>
  );
}