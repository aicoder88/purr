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

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
