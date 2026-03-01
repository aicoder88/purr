/**
 * Theme utilities for consistent styling across components.
 * Dark-only defaults are used throughout the app.
 */
export const COLORS = {
  primary: {
    red: {
      light: '#FF5050',
      gradient: 'from-[#FF5050] to-[#FF5050]/80',
      gradientDark: '',
      bg: 'bg-[#FF5050]/10',
      border: 'border-[#FF5050]/30',
      text: 'text-[#FF5050]',
    },
    purple: {
      light: '#3694FF',
      gradient: 'from-[#3694FF] to-[#3694FF]/80',
      gradientDark: '',
      bg: 'bg-[#3694FF]/10',
      border: 'border-[#3694FF]/30',
      text: 'text-[#3694FF]',
    },
    green: {
      light: '#03E46A',
      gradient: 'from-[#03E46A] to-[#03E46A]/80',
      gradientDark: '',
      bg: 'bg-[#03E46A]/20',
      border: 'border-[#03E46A]/40',
      text: 'text-[#03E46A]',
    },
  },
  surface: {
    light: 'bg-gray-800',
    lightAlpha: 'bg-gray-800/90',
    card: 'bg-gray-900',
    cardAlpha: 'bg-gray-900/90',
    muted: 'bg-gray-800',
    purple: 'bg-purple-900/20',
  },
  text: {
    primary: 'text-gray-50',
    secondary: 'text-gray-200',
    tertiary: 'text-gray-300',
    muted: 'text-gray-400',
    error: 'text-red-400',
    purple: 'text-purple-400',
  },
  border: {
    default: 'border-gray-700',
    accent: 'border-gray-800',
    input: 'border-gray-600 focus:border-[#FF5050]',
  },
} as const;

export const GRADIENTS = {
  background: {
    light: 'bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900',
    primary: 'bg-gradient-to-r from-[#FF5050] to-[#3694FF]',
    cta: 'bg-gradient-to-r from-[#3694FF] to-[#FF5050]',
    purpleToRed: 'bg-gradient-to-r from-[#3694FF] to-[#FF5050]',
    purpleToRedLight: 'bg-gradient-to-r from-[#3694FF]/20 to-[#FF5050]/20',
  },
  text: {
    primary: 'bg-gradient-to-r from-[#FF5050] to-[#3694FF] bg-clip-text text-transparent',
    primaryDark: '',
    purple: 'bg-gradient-to-br from-[#9333EA] via-[#A855F7] to-[#C084FC] bg-clip-text text-transparent',
  },
} as const;

export const TRANSITIONS = {
  default: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  transform: 'transition-transform duration-300',
  colors: 'transition-colors duration-300',
} as const;

export const SHADOWS = {
  card: 'shadow-xl shadow-gray-900/60',
  cardHover: 'hover:shadow-[#3694FF]/30',
  button: 'shadow-lg hover:shadow-xl',
} as const;

export const ANIMATIONS = {
  fadeInUp: 'opacity-100 translate-y-0',
  fadeOutDown: 'opacity-0 translate-y-8',
  hover: {
    lift: 'hover:-translate-y-2',
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
  },
} as const;

export const createColorClasses = (colorScheme: 'red' | 'purple' | 'green') => {
  const color = COLORS.primary[colorScheme];
  return {
    bg: color.bg,
    border: color.border,
    text: color.text,
    iconColor: color.light,
  };
};

export const createButtonClasses = (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
  const baseClasses = `font-bold py-3 px-6 rounded-lg ${SHADOWS.button} ${TRANSITIONS.default} active:scale-95 border-0`;

  switch (variant) {
    case 'primary':
      return `${baseClasses} bg-gradient-to-r from-[#991D1D] to-[#CC2727] hover:from-[#7A1717] hover:to-[#991D1D] text-gray-100`;
    case 'secondary':
      return `${baseClasses} ${COLORS.surface.light} ${COLORS.text.primary}`;
    case 'outline':
      return `${baseClasses} bg-gray-800 text-[#FF5050] border-2 border-[#FF5050] hover:bg-[#FF5050] hover:text-white`;
    default:
      return baseClasses;
  }
};

export const createCardClasses = (withHover = true) => {
  const baseClasses = `${COLORS.surface.cardAlpha} backdrop-blur-sm p-8 rounded-2xl ${SHADOWS.card} ${COLORS.border.accent} ${TRANSITIONS.slow}`;
  return withHover ? `${baseClasses} ${SHADOWS.cardHover} ${ANIMATIONS.hover.lift} group` : baseClasses;
};

export const createSectionClasses = (variant: 'light' | 'alternate' = 'light') => {
  const baseClasses = `py-12 ${TRANSITIONS.colors}`;
  return variant === 'light'
    ? `${baseClasses} ${GRADIENTS.background.light}`
    : `${baseClasses} bg-gradient-to-br from-gray-900 to-gray-950`;
};
