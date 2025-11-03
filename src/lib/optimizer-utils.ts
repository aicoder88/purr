/**
 * Shared Optimizer Utilities
 * Common functions and helpers used across all optimizer modules
 * Eliminates code duplication and ensures consistent behavior
 */

// ============================================================================
// Environment Detection
// ============================================================================

/**
 * Check if code is running in browser environment
 */
export const isBrowser = (): boolean => typeof window !== 'undefined';

/**
 * Detect if user is in Montreal based on multiple signals
 */
export const isMontrealUser = (): boolean => {
  if (!isBrowser()) return false;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone.includes('Montreal') ||
         timezone.includes('Toronto') || // Often used in Montreal
         window.location.pathname.includes('/montreal');
};

/**
 * Detect user's preferred language
 */
export const getUserLanguage = (): 'en' | 'fr' => {
  if (!isBrowser()) return 'en';

  const browserLang = navigator.language.split('-')[0];
  const urlLang = window.location.pathname.startsWith('/fr') ? 'fr' : 'en';
  return urlLang || (browserLang === 'fr' ? 'fr' : 'en');
};

/**
 * Detect current season for Montreal
 */
export const getCurrentSeason = (): 'winter' | 'spring' | 'summer' | 'fall' => {
  const month = new Date().getMonth();
  if (month >= 11 || month <= 1) return 'winter';
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  return 'fall';
};

// ============================================================================
// User Identification
// ============================================================================

/**
 * Get or create unique user ID
 */
export const getUserId = (): string => {
  if (!isBrowser()) return '';

  const stored = localStorage.getItem('purrify_user_id');
  if (stored) return stored;

  const newId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem('purrify_user_id', newId);
  return newId;
};

/**
 * Generate transaction ID
 */
export const generateTransactionId = (): string => {
  return `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// ============================================================================
// Hashing & Bucketing
// ============================================================================

/**
 * Hash a string to a consistent number for A/B test bucketing
 */
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

/**
 * Hash user ID for consistent experiment assignment
 */
export const hashUserId = (seed: string): number => {
  if (!isBrowser()) return 0;

  const userId = getUserId();
  const userAgent = navigator.userAgent;
  const str = `${userId}-${userAgent}-${seed}`;
  return hashString(str);
};

// ============================================================================
// Performance Utilities
// ============================================================================

/**
 * Debounce function to limit execution rate
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit execution frequency
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
};

/**
 * Request animation frame with fallback
 */
export const requestAnimationFramePolyfill = (callback: FrameRequestCallback): number => {
  if (!isBrowser()) return 0;
  return window.requestAnimationFrame?.(callback) ||
         window.setTimeout(callback, 16);
};

// ============================================================================
// Browser Feature Detection
// ============================================================================

/**
 * Detect if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Detect if device has touch support
 */
export const hasTouchSupport = (): boolean => {
  if (!isBrowser()) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Detect if haptic feedback is supported
 */
export const hasHapticFeedback = (): boolean => {
  if (!isBrowser()) return false;
  return 'vibrate' in navigator;
};

/**
 * Detect screen reader usage
 */
export const hasScreenReader = (): boolean => {
  if (!isBrowser()) return false;
  return window.speechSynthesis !== undefined ||
         navigator.userAgent.includes('NVDA') ||
         navigator.userAgent.includes('JAWS');
};

/**
 * Detect high contrast preference
 */
export const prefersHighContrast = (): boolean => {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// ============================================================================
// Image Format Detection
// ============================================================================

/**
 * Test if browser supports an image format
 */
export const testImageFormat = (dataUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isBrowser()) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(img.width > 0 && img.height > 0);
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
};

/**
 * Detect best supported image format
 */
export const detectBestImageFormat = async (): Promise<'avif' | 'webp' | 'jpg'> => {
  if (!isBrowser()) return 'jpg';

  // Test AVIF support
  const avifSupported = await testImageFormat(
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
  );
  if (avifSupported) return 'avif';

  // Test WebP support
  const webpSupported = await testImageFormat(
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  );
  if (webpSupported) return 'webp';

  return 'jpg';
};

// ============================================================================
// Device & Network Detection
// ============================================================================

/**
 * Detect device type
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (!isBrowser()) return 'desktop';

  const userAgent = navigator.userAgent;
  if (/Mobile|Android|iPhone/i.test(userAgent)) return 'mobile';
  if (/iPad|Tablet/i.test(userAgent)) return 'tablet';
  return 'desktop';
};

/**
 * Get device pixel ratio
 */
export const getDevicePixelRatio = (): number => {
  if (!isBrowser()) return 1;
  return window.devicePixelRatio || 1;
};

/**
 * Detect network quality
 */
export const getNetworkQuality = (): 'slow' | 'medium' | 'fast' => {
  if (!isBrowser()) return 'fast';

  const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  if (!connection || !connection.effectiveType) return 'fast';

  const effectiveType = connection.effectiveType;
  if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow';
  if (effectiveType === '3g') return 'medium';
  return 'fast';
};

// ============================================================================
// Storage Utilities
// ============================================================================

/**
 * Safe localStorage get with fallback
 */
export const getLocalStorage = (key: string, fallback: string = ''): string => {
  if (!isBrowser()) return fallback;

  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safe localStorage set
 */
export const setLocalStorage = (key: string, value: string): boolean => {
  if (!isBrowser()) return false;

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safe sessionStorage get with fallback
 */
export const getSessionStorage = (key: string, fallback: string = ''): string => {
  if (!isBrowser()) return fallback;

  try {
    return sessionStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safe sessionStorage set
 */
export const setSessionStorage = (key: string, value: string): boolean => {
  if (!isBrowser()) return false;

  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

// ============================================================================
// Montreal-Specific Utilities
// ============================================================================

/**
 * Montreal-specific configuration
 */
export const MONTREAL_CONFIG = {
  // Geographic detection
  location: {
    city: 'Montreal',
    province: 'QC',
    country: 'CA',
    timezone: 'America/Toronto',
    coordinates: { lat: 45.5017, lng: -73.5673 }
  },

  // Language preferences
  language: {
    primary: 'fr',
    secondary: 'en',
    bilingual: true,
    defaultLanguage: 'fr' as 'fr' | 'en'
  },

  // Seasonal settings
  seasonal: {
    winterMonths: [11, 0, 1, 2], // Nov-Feb
    summerMonths: [5, 6, 7, 8], // Jun-Sep
    currentSeason: getCurrentSeason()
  },

  // Performance settings
  performance: {
    winterOptimizations: true, // Slower networks in winter
    mobileFirst: true, // High mobile usage
    bilingualPrefetch: true, // Prefetch both languages
    preferCanadianCDN: true
  },

  // Marketing settings
  marketing: {
    targetCPM: 2.50, // $2.50 CPM in Canadian market
    targetCPC: 0.85, // $0.85 CPC for cat litter keywords
    targetCPA: 15.00, // $15 cost per acquisition target
    targetROAS: 4.0, // 4:1 return on ad spend
    monthlyBudget: 1500 // $1500 monthly marketing budget
  },

  // Cultural preferences
  cultural: {
    colors: ['#0072CE', '#FF3131', '#FFFFFF'], // Quebec flag colors
    dateFormat: 'YYYY-MM-DD', // Canadian date format
    priceFormat: 'quebec', // 19,99 $ vs $19.99
    currency: 'CAD'
  }
} as const;

/**
 * Get Montreal-optimized settings based on context
 */
export const getMontrealContext = () => {
  return {
    isMontrealUser: isMontrealUser(),
    language: getUserLanguage(),
    season: getCurrentSeason(),
    deviceType: getDeviceType(),
    networkQuality: getNetworkQuality(),
    config: MONTREAL_CONFIG
  };
};

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Canadian postal code
 */
export const isValidPostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i;
  return postalCodeRegex.test(postalCode);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// ============================================================================
// Formatting Utilities
// ============================================================================

/**
 * Format date for Montreal (Canadian format)
 */
export const formatDateMontreal = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format price for Quebec market (19,99 $ vs $19.99)
 */
export const formatPriceQuebec = (amount: number, language: 'en' | 'fr' = 'fr'): string => {
  if (language === 'fr') {
    return `${amount.toFixed(2).replace('.', ',')} $`;
  }
  return `$${amount.toFixed(2)}`;
};

// ============================================================================
// Export all utilities
// ============================================================================

export default {
  // Environment
  isBrowser,
  isMontrealUser,
  getUserLanguage,
  getCurrentSeason,

  // User identification
  getUserId,
  generateTransactionId,

  // Hashing
  hashString,
  hashUserId,

  // Performance
  debounce,
  throttle,
  requestAnimationFramePolyfill,

  // Feature detection
  prefersReducedMotion,
  hasTouchSupport,
  hasHapticFeedback,
  hasScreenReader,
  prefersHighContrast,

  // Image formats
  testImageFormat,
  detectBestImageFormat,

  // Device & network
  getDeviceType,
  getDevicePixelRatio,
  getNetworkQuality,

  // Storage
  getLocalStorage,
  setLocalStorage,
  getSessionStorage,
  setSessionStorage,

  // Montreal-specific
  MONTREAL_CONFIG,
  getMontrealContext,

  // Validation
  isValidEmail,
  isValidPostalCode,
  isValidPhone,

  // Formatting
  formatDateMontreal,
  formatPriceQuebec
};
