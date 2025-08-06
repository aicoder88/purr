import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { translations, Locale } from '../translations';
import { TranslationType } from '../translations/types';

type TranslationContextType = {
  t: TranslationType;
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
  children,
  language,
}: {
  children: ReactNode;
  language: string; // receives from _app.tsx
}) {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  // Use provided language prop instead of router.locale directly
  const currentLocale = (language as Locale) || 'en';

  const [locale, setLocale] = useState<Locale>(currentLocale);
  const [t, setT] = useState(translations[currentLocale] || translations.en);

  // 🔄 Update translation when language changes
  useEffect(() => {
    const newLocale = (language as Locale) || 'en';
    setLocale(newLocale);
    setT(translations[newLocale] || translations.en);
  }, [language]);

  const changeLocale = (newLocale: Locale) => {
    router.push({ pathname, query }, asPath, {
      locale: newLocale === 'en' ? false : newLocale,
    });
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLocale }}>
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