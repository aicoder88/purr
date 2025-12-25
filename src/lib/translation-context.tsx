import { createContext, useContext, ReactNode, useEffect, useState, useMemo } from 'react';
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

  // Validate and normalize locale to prevent hydration mismatches
  const normalizeLocale = useMemo(() => {
    const validLocales: Locale[] = ['en', 'fr', 'zh'];
    const providedLocale = language as Locale;
    
    // Server-side: Use provided language
    // Client-side: Validate against available translations
    if (validLocales.includes(providedLocale) && translations[providedLocale]) {
      return providedLocale;
    }
    
    // Fallback to English if invalid locale
    return 'en' as Locale;
  }, [language]);

  // Use stable initial state to prevent hydration mismatches
  const [locale, setLocale] = useState<Locale>(normalizeLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // Memoize translation object to prevent unnecessary re-renders
  const t = useMemo(() => {
    return translations[locale] || translations.en;
  }, [locale]);

  // Handle hydration and language changes
  useEffect(() => {
    // Mark as hydrated on first client-side render
    if (!isHydrated) {
      setIsHydrated(true);
    }

    // Update locale only after hydration to prevent mismatches
    const newLocale = normalizeLocale;
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  }, [normalizeLocale, locale, isHydrated]);

  // Prevent router operations during SSR
  const changeLocale = useMemo(() => {
    return (newLocale: Locale) => {
      // Only execute on client-side after hydration
      if (typeof globalThis.window === 'undefined' || !isHydrated) {
        return;
      }

      // Validate locale before navigation
      const validLocales: Locale[] = ['en', 'fr', 'zh'];
      if (!validLocales.includes(newLocale)) {
        console.warn(`Invalid locale: ${newLocale}. Using 'en' instead.`);
        newLocale = 'en';
      }

      try {
        router.push(
          { pathname, query }, 
          asPath, 
          {
            locale: newLocale === 'en' ? false : newLocale,
            scroll: false, // Prevent scroll jump
          }
        );
      } catch (err) {
        console.error('Failed to change locale:', err);
        // Fallback: update state without navigation
        setLocale(newLocale);
      }
    };
  }, [router, pathname, query, asPath, isHydrated]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    t,
    locale,
    changeLocale,
  }), [t, locale, changeLocale]);

  return (
    <TranslationContext.Provider value={contextValue}>
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

// Helper hook for checking if component is hydrated
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
}
