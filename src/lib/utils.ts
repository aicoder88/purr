import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatCurrencyValue } from './pricing';

// Core utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Improved scroll utility with better element targeting
// Accounts for sticky header offset
export const scrollToSection = (id: string) => {
  if (!id) return;

  const element = document.getElementById(id);
  if (!element) return;

  // Get the sticky header height to offset the scroll position
  const header = document.querySelector('header');
  const headerHeight = header?.offsetHeight || 80;

  // Calculate the target position accounting for header
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + (window as unknown as { scrollY: number }).scrollY - headerHeight - 16; // 16px extra padding

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

// Additional common utilities
export const formatPrice = (price: number, currency = 'CAD', locale = 'en-CA'): string => {
  // Always pass both currency and locale to formatCurrencyValue
  return formatCurrencyValue(price, currency, locale);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replaceAll(/[^\w\s-]/g, '')
    .replaceAll(/[\s_-]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
};
