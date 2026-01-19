import { useEffect, useRef, useState } from 'react';
import { formatCurrencyValue } from '@/lib/pricing';

/**
 * Common utilities and hooks for React components.
 * Provides reusable functionality for intersection observation, animations,
 * UI components, and utility functions.
 */

/**
 * Custom hook for intersection observer with consistent options.
 * Triggers a callback when the referenced element enters or exits the viewport.
 *
 * @param callback - Function to call when intersection state changes
 * @param options - IntersectionObserver options (default: { threshold: 0.1 })
 * @returns Ref to attach to the element you want to observe
 *
 * @example
 * ```typescript
 * const sectionRef = useIntersectionObserver((isIntersecting) => {
 *   setIsVisible(isIntersecting);
 * });
 *
 * return <section ref={sectionRef}>Content</section>
 * ```
 */
export const useIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, options]);

  return elementRef;
};

/**
 * Creates staggered animation styles for lists and grids.
 * Applies increasing delays to create smooth sequential animations.
 *
 * @param index - The item index in the list/grid
 * @param baseDelay - Base delay in milliseconds (default: 100)
 * @returns CSS-in-JS style object with transition delay
 *
 * @example
 * ```typescript
 * const items = data.map((item, index) => (
 *   <div key={item.id} style={createStaggeredAnimation(index)}>
 *     {item.content}
 *   </div>
 * ));
 * ```
 */
export const createStaggeredAnimation = (index: number, baseDelay = 100) => ({
  transitionDelay: `${index * baseDelay}ms`,
  transform: 'translateY(0)',
  opacity: 1
});

/**
 * Generates avatar URLs with gender detection for testimonials and reviews.
 * Uses randomuser.me API with French name detection logic.
 *
 * @param name - The person's name to analyze for gender
 * @param index - Index for avatar variety (1-99)
 * @returns Complete URL to the avatar image
 *
 * @example
 * ```typescript
 * const avatarUrl = generateAvatarUrl('Marie Dubois', 5);
 * // Returns: "https://randomuser.me/api/portraits/women/6.jpg"
 *
 * const maleAvatar = generateAvatarUrl('Jean François', 2);
 * // Returns: "https://randomuser.me/api/portraits/men/3.jpg"
 * ```
 */
const localAvatarPool = [
  '/optimized/cat_rose_thumbnail.webp',
  '/optimized/multi-cat-household.webp',
  '/optimized/purrify-logo-icon.webp',
  '/optimized/deodorizers-with-kittens.webp',
];

export const generateAvatarUrl = (_name: string, index: number) => {
  return localAvatarPool[index % localAvatarPool.length];
};

/**
 * Generates star rating components with consistent styling.
 * Creates an array of filled star SVG elements.
 *
 * @param stars - Number of stars to display (default: 5)
 * @returns Array of React SVG elements representing stars
 *
 * @example
 * ```typescript
 * const StarRating = ({ rating }: { rating: number }) => (
 *   <div className="flex">
 *     {generateStarRating(rating)}
 *   </div>
 * );
 * ```
 */
export const generateStarRating = (stars: number = 5) =>
  Array(stars).fill(0).map((_, i) => {
    return (
      <svg
        key={i}
        className="w-4 h-4 text-yellow-400 dark:text-yellow-300 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
      </svg>
    );
  });

/**
 * Quote icon SVG component for testimonials and review sections.
 *
 * @param props - Configuration object
 * @param props.color - The fill color for the quote icon
 * @param props.size - The size of the icon in pixels (default: 60)
 * @returns React SVG element representing quotation marks
 *
 * @example
 * ```typescript
 * <QuoteIcon color="#FF3131" size={40} />
 * <QuoteIcon color="currentColor" />
 * ```
 */
export const QuoteIcon = ({ color, size = 60 }: { color: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 11C10 13.2091 8.20914 15 6 15C3.79086 15 2 13.2091 2 11C2 8.79086 3.79086 7 6 7C8.20914 7 10 8.79086 10 11Z"
      fill={color}
    />
    <path
      d="M22 11C22 13.2091 20.2091 15 18 15C15.7909 15 14 13.2091 14 11C14 8.79086 15.7909 7 18 7C20.2091 7 22 8.79086 22 11Z"
      fill={color}
    />
  </svg>
);

/**
 * Custom hook for debouncing values to improve performance.
 * Delays updating the returned value until after the specified delay period.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before updating the debounced value
 * @returns The debounced value
 *
 * @example
 * ```typescript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   // This will only run 300ms after the user stops typing
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Loading spinner component with customizable size.
 * Shows an animated spinning border for loading states.
 *
 * @param props - Configuration object
 * @param props.size - Tailwind CSS size classes (default: 'w-4 h-4')
 * @returns React element with spinning animation
 *
 * @example
 * ```typescript
 * <LoadingSpinner size="w-6 h-6" />
 * <LoadingSpinner />  // Uses default w-4 h-4
 * ```
 */
export const LoadingSpinner = ({ size = 'w-4 h-4' }: { size?: string }) => (
  <div className={`animate-spin rounded-full ${size} border-b-2 border-white`} />
);

/**
 * Success checkmark icon component with customizable size.
 * Shows a checkmark SVG for success states and confirmations.
 *
 * @param props - Configuration object
 * @param props.size - Tailwind CSS size classes (default: 'w-4 h-4')
 * @returns React SVG element with checkmark
 *
 * @example
 * ```typescript
 * <CheckIcon size="w-6 h-6" />
 * <CheckIcon />  // Uses default w-4 h-4
 * ```
 */
export const CheckIcon = ({ size = 'w-4 h-4' }: { size?: string }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * Formats a price number as a localized currency string.
 * Re-exported from utils for convenience in component files.
 *
 * @param price - The numeric price value
 * @param currency - The currency code (default: 'CAD')
 * @param locale - Optional locale override (default: 'en-CA')
 * @returns Formatted currency string for Canadian locale
 *
 * @example
 * ```typescript
 * formatPrice(19.99);        // Returns: "$19.99"
 * formatPrice(25.50, 'USD'); // Returns: "$25.50"
 * ```
 */
export const formatPrice = (price: number, currency = 'CAD', locale = 'en-CA'): string => {
  // Always pass both currency and locale to formatCurrencyValue
  return formatCurrencyValue(price, currency, locale);
};
