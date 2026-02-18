import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

// Re-export for convenience
export const { locales, defaultLocale } = routing;
