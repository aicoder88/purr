import React from 'react';

interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
}

export default function MockImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  onLoad,
  onError,
  ...props
}: MockImageProps) {
  // Trigger onLoad immediately for testing
  React.useEffect(() => {
    if (onLoad) {
      // Use setTimeout to simulate async image loading
      setTimeout(onLoad, 0);
    }
  }, [onLoad]);

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      data-testid="next-image"
      onError={onError}
      {...props}
    />
  );
}
