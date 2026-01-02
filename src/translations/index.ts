import { en } from './en';
import { fr } from './fr';
import { zh } from './zh';
import { es } from './es';
import { TranslationType } from './types';

export const translations: Record<string, TranslationType> = {
  en,
  fr,
  zh,
  es
};

export type Locale = keyof typeof translations;

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale];
}

export function useTranslation(locale: Locale) {
  const t = getTranslation(locale);
  return { t };
}
