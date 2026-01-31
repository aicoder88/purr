import { en } from './en';
import { fr } from './fr';
import { zh } from './zh';
import { es } from './es';
import { TranslationType } from './types';
import type { Locale } from '@/i18n/config';

// Export SEO meta content (optimized titles & descriptions)
export * from './seo-meta';

export const translations: Record<Locale, TranslationType> = {
  en,
  fr,
  zh,
  es
};

export type { Locale };

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale];
}

export function useTranslation(locale: Locale) {
  const t = getTranslation(locale);
  return { t };
}
