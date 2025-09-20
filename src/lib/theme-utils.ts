/**
 * Theme utilities for consistent styling across components.
 * Provides centralized color, gradient, transition, and animation definitions
 * to ensure design system consistency throughout the application.
 */

/**
 * Color palette with light/dark mode support and semantic color definitions.
 * All colors include variants for different use cases (background, text, borders).
 */
export const COLORS = {
  primary: {
    red: {
      light: '#FF3131',
      dark: '#FF5050',
      gradient: 'from-[#FF3131] to-[#FF3131]/80',
      gradientDark: 'dark:from-[#FF5050] dark:to-[#FF5050]/80',
      bg: 'bg-[#FF3131]/10 dark:bg-[#FF5050]/10',
      border: 'border-[#FF3131]/30 dark:border-[#FF5050]/30',
      text: 'text-[#FF3131] dark:text-[#FF5050]'
    },
    purple: {
      light: '#5B2EFF',
      dark: '#3694FF',
      gradient: 'from-[#5B2EFF] to-[#5B2EFF]/80',
      gradientDark: 'dark:from-[#3694FF] dark:to-[#3694FF]/80',
      bg: 'bg-[#5B2EFF]/10 dark:bg-[#3694FF]/10',
      border: 'border-[#5B2EFF]/30 dark:border-[#3694FF]/30',
      text: 'text-[#5B2EFF] dark:text-[#3694FF]'
    },
    green: {
      light: '#03E46A',
      dark: '#03E46A',
      gradient: 'from-[#03E46A] to-[#03E46A]/80',
      gradientDark: 'dark:from-[#03E46A] dark:to-[#03E46A]/80',
      bg: 'bg-[#03E46A]/10 dark:bg-[#03E46A]/20',
      border: 'border-[#03E46A]/30 dark:border-[#03E46A]/40',
      text: 'text-[#03E46A] dark:text-[#03E46A]'
    }
  },
  surface: {
    light: 'bg-white dark:bg-gray-800',
    lightAlpha: 'bg-white/90 dark:bg-gray-800/90',
    card: 'bg-white dark:bg-gray-900',
    cardAlpha: 'bg-white/90 dark:bg-gray-900/90'
  },
  text: {
    primary: 'text-gray-900 dark:text-gray-50',
    secondary: 'text-gray-700 dark:text-gray-200',
    tertiary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400'
  },
  border: {
    default: 'border-gray-100 dark:border-gray-700',
    accent: 'border-[#E0EFC7] dark:border-gray-800'
  }
} as const;

/**
 * Gradient definitions for backgrounds and text effects.
 * Includes light/dark mode variants and semantic usage patterns.
 */
export const GRADIENTS = {
  background: {
    light: 'bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]',
    dark: 'dark:from-gray-900 dark:via-gray-950 dark:to-gray-900',
    primary: 'bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF]',
    cta: 'bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050]'
  },
  text: {
    primary: 'bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent',
    primaryDark: 'dark:from-[#FF5050] dark:to-[#3694FF]',
    purple: 'bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent'
  }
} as const;

/**
 * Transition and animation timing definitions for consistent motion design.
 */
export const TRANSITIONS = {
  default: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  transform: 'transition-transform duration-300',
  colors: 'transition-colors duration-300'
} as const;

/**
 * Shadow definitions for depth and hierarchy in the design system.
 */
export const SHADOWS = {
  card: 'shadow-xl dark:shadow-gray-800',
  cardHover: 'hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30',
  button: 'shadow-lg hover:shadow-xl'
} as const;

/**
 * Animation and transformation classes for interactive elements.
 */
export const ANIMATIONS = {
  fadeInUp: 'opacity-100 translate-y-0',
  fadeOutDown: 'opacity-0 translate-y-8',
  hover: {
    lift: 'hover:-translate-y-2',
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105'
  }
} as const;

/**
 * Creates a set of color classes for a given color scheme.
 *
 * @param colorScheme - The color scheme to use ('red', 'purple', or 'green')
 * @returns Object containing background, border, text, and icon color classes
 *
 * @example
 * ```typescript
 * const redClasses = createColorClasses('red');
 * // Returns: { bg: 'bg-[#FF3131]/10...', border: '...', text: '...', iconColor: '#FF3131' }
 * ```
 */
export const createColorClasses = (colorScheme: 'red' | 'purple' | 'green') => {
  const color = COLORS.primary[colorScheme];
  return {
    bg: color.bg,
    border: color.border,
    text: color.text,
    iconColor: color.light
  };
};

/**
 * Creates standardized button classes with consistent styling and hover effects.
 *
 * @param variant - The button variant ('primary', 'secondary', or 'outline')
 * @returns Complete Tailwind CSS class string for the button
 *
 * @example
 * ```typescript
 * const primaryButton = createButtonClasses('primary');
 * // Returns: "font-bold py-3 px-6 rounded-lg ... bg-gradient-to-r from-[#FF3131] ..."
 *
 * const secondaryButton = createButtonClasses('secondary');
 * // Returns: "font-bold py-3 px-6 rounded-lg ... bg-white dark:bg-gray-800 ..."
 * ```
 */
export const createButtonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
  const baseClasses = `font-bold py-3 px-6 rounded-lg ${SHADOWS.button} ${TRANSITIONS.default} active:scale-95 border-0`;

  switch (variant) {
    case 'primary':
      return `${baseClasses} bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100`;
    case 'secondary':
      return `${baseClasses} ${COLORS.surface.light} ${COLORS.text.primary}`;
    case 'outline':
      return `${baseClasses} bg-white dark:bg-gray-800 text-[#FF3131] dark:text-[#FF5050] border-2 border-[#FF3131] dark:border-[#FF5050] hover:bg-[#FF3131] dark:hover:bg-[#FF5050] hover:text-white dark:hover:text-white`;
    default:
      return baseClasses;
  }
};

/**
 * Creates standardized card classes with consistent styling, shadows, and optional hover effects.
 *
 * @param withHover - Whether to include hover effects and transforms (default: true)
 * @returns Complete Tailwind CSS class string for the card
 *
 * @example
 * ```typescript
 * const interactiveCard = createCardClasses(true);
 * // Returns: "bg-white/90 dark:bg-gray-900/90 ... hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group"
 *
 * const staticCard = createCardClasses(false);
 * // Returns: "bg-white/90 dark:bg-gray-900/90 ... rounded-2xl shadow-xl"
 * ```
 */
export const createCardClasses = (withHover = true) => {
  const baseClasses = `${COLORS.surface.cardAlpha} backdrop-blur-sm p-8 rounded-2xl ${SHADOWS.card} ${COLORS.border.accent} ${TRANSITIONS.slow}`;
  return withHover ? `${baseClasses} ${SHADOWS.cardHover} ${ANIMATIONS.hover.lift} group` : baseClasses;
};

/**
 * Creates standardized section classes with consistent background gradients and spacing.
 *
 * @param variant - The section variant ('light' or 'alternate')
 * @returns Complete Tailwind CSS class string for the section
 *
 * @example
 * ```typescript
 * const lightSection = createSectionClasses('light');
 * // Returns: "py-12 transition-colors duration-300 bg-gradient-to-br from-[#FFFFFF] ..."
 *
 * const alternateSection = createSectionClasses('alternate');
 * // Returns: "py-12 transition-colors duration-300 bg-gradient-to-br from-[#FFFFF5] ..."
 * ```
 */
export const createSectionClasses = (variant: 'light' | 'alternate' = 'light') => {
  const baseClasses = `py-12 ${TRANSITIONS.colors}`;
  return variant === 'light'
    ? `${baseClasses} ${GRADIENTS.background.light} ${GRADIENTS.background.dark}`
    : `${baseClasses} bg-gradient-to-br from-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:to-gray-950`;
};