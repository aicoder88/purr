import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';
import { getLocaleFromPath } from '@/lib/i18n/locale-path';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const resolvedRequestLocale = await requestLocale;
  const pathnameLocale = getLocaleFromPath((await headers()).get('x-pathname') ?? '');
  const candidateLocale = locale ?? resolvedRequestLocale ?? pathnameLocale;
  const resolvedLocale: Locale = locales.includes(candidateLocale as Locale)
    ? (candidateLocale as Locale)
    : defaultLocale;

  const messages = (await import(`../translations/${resolvedLocale}.ts`))[resolvedLocale];

  return {
    locale: resolvedLocale,
    messages,
    timeZone: 'America/Toronto',
    onError: (error) => {
      console.warn('i18n error:', error);
    },
    getMessageFallback: ({ namespace, key }) => {
      return `${namespace}.${key}`;
    },
  };
});
