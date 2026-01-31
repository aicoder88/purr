export const locales = ['en', 'fr', 'zh', 'es'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split('/')[1];
  return isValidLocale(locale) ? locale : defaultLocale;
}
