/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import {
  OptimizedImage,
  HeroImage,
  ProductImage,
  ThumbnailImage,
  AvatarImage,
} from '@/components/common/OptimizedImage';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    width,
    height,
    className,
    onLoad,
    onError,
    fill,
    priority,
    loading,
    sizes,
    quality,
    ...props
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
    fill?: boolean;
    priority?: boolean;
    loading?: 'eager' | 'lazy';
    sizes?: string;
    quality?: number;
  }) {
    // Trigger onLoad immediately for testing
    React.useEffect(() => {
      if (onLoad) {
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
        data-priority={priority}
        data-loading={loading}
        data-sizes={sizes}
        data-quality={quality}
        onError={onError}
        {...props}
      />
    );
  },
}));

// Mock @/lib/image-utils
jest.mock('@/lib/image-utils', () => ({
  getImageMetadata: jest.fn((src: string) => ({
    width: 800,
    height: 600,
    sizes: '100vw',
    blurDataURL: 'data:image/webp;base64,test',
  })),
}));

import React from 'react';

describe('OptimizedImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image with correct src and alt', () => {
    render(
      <OptimizedImage
        src="/test-image.webp"
        alt="Test image"
        width={400}
        height={300}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/test-image.webp');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('uses provided dimensions', () => {
    render(
      <OptimizedImage
        src="/test-image.webp"
        alt="Test image"
        width={400}
        height={300}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '400');
    expect(image).toHaveAttribute('height', '300');
  });

  it('falls back to metadata dimensions when not provided', () => {
    render(
      <OptimizedImage
        src="/test-image.webp"
        alt="Test image"
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '600');
  });

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        variant="hero"
      />
    );

    expect(container.firstChild).toHaveClass('relative');
    expect(container.firstChild).toHaveClass('overflow-hidden');

    rerender(<OptimizedImage src="/test.webp" alt="Test" variant="product" />);
    expect(container.firstChild).toHaveClass('relative');

    rerender(<OptimizedImage src="/test.webp" alt="Test" variant="thumbnail" />);
    expect(container.firstChild).toHaveClass('overflow-hidden');
  });

  it('applies object-fit classes', () => {
    const { rerender } = render(
      <OptimizedImage src="/test.webp" alt="Test" objectFit="cover" />
    );
    let image = screen.getByTestId('next-image');
    expect(image).toHaveClass('object-cover');

    rerender(<OptimizedImage src="/test.webp" alt="Test" objectFit="contain" />);
    image = screen.getByTestId('next-image');
    expect(image).toHaveClass('object-contain');
  });

  it('sets priority loading correctly', () => {
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        priority
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-priority', 'true');
    expect(image).toHaveAttribute('data-loading', 'eager');
  });

  it('sets lazy loading by default', () => {
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-loading', 'lazy');
  });

  it('allows custom loading prop', () => {
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        loading="eager"
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-loading', 'eager');
  });

  it('passes custom sizes attribute', () => {
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        sizes="(min-width: 800px) 50vw, 100vw"
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-sizes', '(min-width: 800px) 50vw, 100vw');
  });

  it('passes quality attribute', () => {
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        quality={90}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-quality', '90');
  });

  it('calls onLoad callback when image loads', async () => {
    const onLoad = jest.fn();
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        onLoad={onLoad}
      />
    );

    // Wait for the setTimeout in mock
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(onLoad).toHaveBeenCalled();
  });

  it('calls onError callback when image fails', () => {
    const onError = jest.fn();
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        onError={onError}
      />
    );

    const image = screen.getByTestId('next-image');
    fireEvent.error(image);
    expect(onError).toHaveBeenCalled();
  });

  it('shows error state when image fails to load', () => {
    render(
      <OptimizedImage
        src="/invalid.webp"
        alt="Test"
      />
    );

    const image = screen.getByTestId('next-image');
    fireEvent.error(image);

    expect(screen.getByText('Failed to load image')).toBeInTheDocument();
  });

  it('shows loading placeholder initially', () => {
    // Override the mock to not auto-trigger onLoad
    jest.resetModules();
    jest.doMock('next/image', () => ({
      __esModule: true,
      default: function MockImage({ onLoad }: { onLoad?: () => void }) {
        return <img data-testid="next-image" />;
      },
    }));

    const { container } = render(
      <OptimizedImage src="/test.webp" alt="Test" />
    );

    const placeholder = container.querySelector('.animate-pulse');
    expect(placeholder).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        className="custom-image"
      />
    );

    expect(container.firstChild).toHaveClass('custom-image');
  });

  it('handles fill mode', () => {
    render(
      <OptimizedImage
        src="/test.webp"
        alt="Test"
        fill
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).not.toHaveAttribute('width');
    expect(image).not.toHaveAttribute('height');
  });
});

describe('HeroImage', () => {
  it('renders with hero variant and priority by default', () => {
    render(<HeroImage src="/hero.webp" alt="Hero image" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('allows overriding priority', () => {
    render(<HeroImage src="/hero.webp" alt="Hero image" priority={false} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-priority', 'false');
  });
});

describe('ProductImage', () => {
  it('renders with product variant and lazy loading by default', () => {
    render(<ProductImage src="/product.webp" alt="Product image" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-loading', 'lazy');
  });

  it('allows overriding loading', () => {
    render(<ProductImage src="/product.webp" alt="Product image" loading="eager" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-loading', 'eager');
  });
});

describe('ThumbnailImage', () => {
  it('renders with thumbnail variant and lazy loading', () => {
    render(<ThumbnailImage src="/thumb.webp" alt="Thumbnail" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-loading', 'lazy');
    expect(image).toHaveAttribute('alt', 'Thumbnail');
  });
});

describe('AvatarImage', () => {
  it('renders with avatar variant and cover object-fit', () => {
    render(<AvatarImage src="/avatar.webp" alt="Avatar" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('object-cover');
  });

  it('renders with lazy loading by default', () => {
    render(<AvatarImage src="/avatar.webp" alt="Avatar" />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-loading', 'lazy');
  });
});
