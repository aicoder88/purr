import Image from 'next/image';

interface OptimizedProductImageProps {
  productId: 'trial' | 'regular' | 'large';
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Optimized Product Image Component
 *
 * Automatically serves the best image format and size based on:
 * - Browser support (AVIF > WebP > PNG)
 * - Device screen size (320w, 480w, 640w, 828w, 1200w)
 * - Network conditions (via Next.js Image optimization)
 */
export function OptimizedProductImage({
  productId,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 320px, (max-width: 768px) 480px, (max-width: 1024px) 640px, 828px',
}: OptimizedProductImageProps) {
  // Product image paths
  const imagePaths = {
    trial: '/optimized/17gpink.webp',
    regular: '/optimized/60g.webp',
    large: '/optimized/140g-640w.avif', // Primary - browser will fall back automatically
  };

  // For the large product, Next.js Image will automatically:
  // 1. Serve AVIF to browsers that support it
  // 2. Fall back to WebP for browsers that don't support AVIF
  // 3. Select the appropriate size based on viewport
  // 4. Generate additional sizes as needed

  return (
    <Image
      src={imagePaths[productId]}
      alt={alt}
      width={640}
      height={960}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9Ijk2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9Ijk2MCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
    />
  );
}
