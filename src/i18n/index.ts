// next-intl i18n configuration for App Router

export { routing, locales, defaultLocale } from './routing';
export { locales as availableLocales, defaultLocale as fallbackLocale } from './config';
export type { Locale } from './config';
export { isValidLocale, getLocaleFromPathname } from './config';

// Re-export routing helpers from next-intl
export { createNavigation } from 'next-intl/navigation';
