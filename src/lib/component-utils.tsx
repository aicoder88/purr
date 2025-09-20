import React, { useEffect, useRef, useState } from 'react';

// Common hook for intersection observer with consistent options
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

// Staggered animation utility
export const createStaggeredAnimation = (index: number, baseDelay = 100) => ({
  transitionDelay: `${index * baseDelay}ms`,
  transform: 'translateY(0)',
  opacity: 1
});

// Generate avatar URL with gender detection
export const generateAvatarUrl = (name: string, index: number) => {
  const maleNames = ['Jean', 'François', 'Mathieu', 'Robert', 'Stéphane', 'Marc', 'Samuel'];
  const gender = maleNames.some(maleName => name.includes(maleName)) ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/${gender}/${index + 1}.jpg`;
};

// Common star rating component props
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

// Common quote icon SVG
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

// Debounce hook for performance
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

// Common loading states
export const LoadingSpinner = ({ size = 'w-4 h-4' }: { size?: string }) => (
  <div className={`animate-spin rounded-full ${size} border-b-2 border-white`} />
);

// Common success checkmark
export const CheckIcon = ({ size = 'w-4 h-4' }: { size?: string }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);