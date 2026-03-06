import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const candidateLocale = locale ?? await requestLocale;
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
