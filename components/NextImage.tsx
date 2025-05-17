import Image from 'next/image';

interface NextImageProps {
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
}

export default function NextImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes,
  fill = false,
  style,
}: NextImageProps) {
  // Handle external URLs and local images
  const isExternal = src.startsWith('http') || src.startsWith('https');
  
  // For local images, ensure they start with a slash
  const imageSrc = !isExternal && !src.startsWith('/') ? `/${src}` : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width || 100}
      height={fill ? undefined : height || 100}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      fill={fill}
      style={style}
      // Ensure proper loading behavior
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}