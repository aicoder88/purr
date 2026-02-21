'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export interface StickyAddToCartProps {
  /** Product name to display */
  productName: string;
  /** Product size (e.g., "50g", "120g") */
  productSize: string;
  /** Formatted price string (e.g., "$14.99") */
  price: string;
  /** Checkout URL for the add to cart action */
  checkoutUrl: string;
  /** Callback when user clicks add to cart, receives quantity */
  onAddToCart?: (quantity: number) => void;
  /** Reference to the main CTA element to observe */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Optional className for the container */
  className?: string;
}

/**
 * StickyAddToCart - A sticky bottom bar that appears when the main CTA is out of view
 *
 * Uses Intersection Observer to detect when the main product CTA scrolls out of view,
 * then displays a compact add-to-cart bar fixed to the bottom of the screen.
 *
 * Features:
 * - Quantity selector with +/- buttons
 * - Smooth slide-up animation
 * - Full dark mode support
 * - Responsive design (full width mobile, centered desktop)
 * - z-index 40 (below modals at 50)
 */
export function StickyAddToCart({
  productName,
  productSize,
  price,
  checkoutUrl,
  onAddToCart,
  targetRef,
  className,
}: StickyAddToCartProps) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    if (!isClient || !targetRef.current) return;

    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0, // trigger when any part enters/leaves
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      // Show sticky bar when target is NOT intersecting (scrolled past)
      setIsVisible(!entry.isIntersecting);
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isClient, targetRef]);

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(quantity);
    }
  }, [onAddToCart, quantity]);

  // Don't render during SSR
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={cn(
        // Base styles
        'fixed bottom-0 left-0 right-0 z-40',
        // Background and border with dark mode
        'bg-white dark:bg-gray-900',
        'border-t border-gray-200 dark:border-gray-700',
        'shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]',
        // Animation
        'transition-transform duration-300 ease-out',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        className
      )}
      role="complementary"
      aria-label={t('productsSection.stickyCart') || 'Quick add to cart'}
      aria-hidden={!isVisible}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Product Info - Hidden on very small screens */}
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="font-bold text-gray-900 dark:text-white truncate text-sm sm:text-base">
              {productName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {productSize}
            </span>
          </div>

          {/* Price - Always visible */}
          <div className="flex-shrink-0">
            <span className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
              {price}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className={cn(
                'p-1.5 sm:p-2 rounded-md transition-colors',
                'text-gray-700 dark:text-gray-300',
                'hover:bg-gray-200 dark:hover:bg-gray-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'focus:outline-none focus:ring-2 focus:ring-deep-coral focus:ring-offset-1',
                'dark:focus:ring-offset-gray-800'
              )}
              aria-label={t('productsSection.decreaseQuantity') || 'Decrease quantity'}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-6 sm:w-8 text-center font-bold text-gray-900 dark:text-white text-sm sm:text-base"
              aria-live="polite"
              aria-atomic="true"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className={cn(
                'p-1.5 sm:p-2 rounded-md transition-colors',
                'text-gray-700 dark:text-gray-300',
                'hover:bg-gray-200 dark:hover:bg-gray-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'focus:outline-none focus:ring-2 focus:ring-deep-coral focus:ring-offset-1',
                'dark:focus:ring-offset-gray-800'
              )}
              aria-label={t('productsSection.increaseQuantity') || 'Increase quantity'}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            asChild
            size="lg"
            className={cn(
              'flex-shrink-0',
              'bg-deep-coral hover:bg-deep-coral/90',
              'text-white dark:text-white',
              'font-bold',
              'px-4 sm:px-6 py-2.5 sm:py-3',
              'rounded-xl',
              'shadow-lg shadow-deep-coral/20',
              'transition-all duration-200',
              'hover:scale-105 hover:shadow-xl'
            )}
          >
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAddToCart}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline sm:inline">
                {t('productsSection.addToCart') || 'Add to Cart'}
              </span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StickyAddToCart;
