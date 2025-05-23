import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { translations, Locale } from '../translations';

type TranslationContextType = {
  t: typeof translations.en;
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  
  // Default to 'en' if locale is not supported
  const currentLocale = (locale as Locale) || 'en';
  const t = translations[currentLocale] || translations.en;

  const changeLocale = (newLocale: Locale) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <TranslationContext.Provider value={{ t, locale: currentLocale, changeLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
}