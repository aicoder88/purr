import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/lib/locale';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async () => {
  // Get locale from user preference or default
  const userLocale = await getUserLocale();
  
  // Validate locale
  const locale: Locale = locales.includes(userLocale as Locale) 
    ? (userLocale as Locale) 
    : defaultLocale;

  const messages = (await import(`../translations/${locale}.ts`))[locale];

  return {
    locale,
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
