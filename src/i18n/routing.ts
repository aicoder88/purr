import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'zh', 'es'],
  defaultLocale: 'en'
});

// Re-export for convenience
export const { locales, defaultLocale } = routing;
