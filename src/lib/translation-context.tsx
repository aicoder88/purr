'use client';
import { createContext, useContext, ReactNode, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { translations } from '../translations';
import type { TranslationType } from '../translations/types';
import type { Locale } from '@/i18n/config';

// App Router import
import { useRouter } from 'next/navigation';

type TranslationContextType = {
  t: TranslationType;
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  setLocaleClient: (locale: Locale) => void; // New method for client-side only update
};

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const VALID_LOCALES: Locale[] = ['en', 'fr', 'zh', 'es'];

export function TranslationProvider({
  children,
  language,
}: {
  children: ReactNode;
  language: string; // receives from layout.tsx
}) {
  // Use App Router hook
  const router = useRouter();

  // Validate and normalize locale to prevent hydration mismatches
  const normalizedLocale = useMemo((): Locale => {
    const providedLocale = language as Locale;

    // Server-side: Use provided language
    // Client-side: Validate against available translations
    if (VALID_LOCALES.includes(providedLocale) && translations[providedLocale]) {
      return providedLocale;
    }

    // Fallback to English if invalid locale
    return 'en';
  }, [language]);

  // Use stable initial state to prevent hydration mismatches
  const [locale, setLocale] = useState<Locale>(normalizedLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // Use refs to store current values for the changeLocale callback
  const isHydratedRef = useRef(isHydrated);
  const routerRef = useRef(router);

  // Keep refs in sync
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    isHydratedRef.current = isHydrated;
  }, [isHydrated]);

  // Memoize translation object to prevent unnecessary re-renders
  const t = useMemo(() => {
    return translations[locale] || translations.en;
  }, [locale]);

  // Handle hydration - runs once on mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync locale with normalizedLocale after hydration
  // Only runs when normalizedLocale changes (e.g., URL locale change)
  useEffect(() => {
    if (isHydrated && normalizedLocale !== locale) {
      setLocale(normalizedLocale);
    }
    // Intentionally exclude 'locale' from deps to prevent infinite loop
    // We only want to sync when normalizedLocale changes, not when locale changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedLocale, isHydrated]);

  // Stable changeLocale function
  const changeLocale = useCallback((newLocale: Locale) => {
    // Only execute on client-side after hydration
    if (typeof globalThis.window === 'undefined' || !isHydratedRef.current) {
      return;
    }

    // Validate locale before navigation
    const targetLocale: Locale = VALID_LOCALES.includes(newLocale) ? newLocale : 'en';
    if (!VALID_LOCALES.includes(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}. Using 'en' instead.`);
    }

    // App Router handling
    const currentRouter = routerRef.current;
    if (currentRouter) {
      // For App Router, we navigate to the same page with new locale
      // Store locale preference in cookie via setUserLocale
      import('@/lib/locale').then(({ setUserLocale }) => {
        setUserLocale(targetLocale).then(() => {
          // Refresh the page to apply new locale
          window.location.reload();
        });
      });
    }
  }, []); // Empty deps - uses refs for current values

  // Client-side only locale update (no reload)
  const setLocaleClient = useCallback((newLocale: Locale) => {
    if (VALID_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    t,
    locale,
    changeLocale,
    setLocaleClient,
  }), [t, locale, changeLocale, setLocaleClient]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    // During SSR/ISR, provide a fallback to prevent errors
    // This can happen when the component is rendered outside the provider context
    if (typeof globalThis.window === 'undefined') {
      // Return default English translations for server-side rendering
      return {
        t: translations.en,
        locale: 'en' as Locale,
        changeLocale: () => { },
        setLocaleClient: () => { },
      };
    }
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
