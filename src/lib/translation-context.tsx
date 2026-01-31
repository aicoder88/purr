'use client';
import { createContext, useContext, ReactNode, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { translations, Locale } from '../translations';
import { TranslationType } from '../translations/types';

type TranslationContextType = {
  t: TranslationType;
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const VALID_LOCALES: Locale[] = ['en', 'fr', 'zh', 'es'];

export function TranslationProvider({
  children,
  language,
  isAppRouter = false,
}: {
  children: ReactNode;
  language: string; // receives from _app.tsx or layout.tsx
  isAppRouter?: boolean;
}) {
  const router = isAppRouter ? null : useRouter();

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
  // This prevents recreating the callback when router properties change
  const routerRef = useRef(router);
  const isHydratedRef = useRef(isHydrated);

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

  // Stable changeLocale function that uses refs instead of direct dependencies
  // This prevents the function from being recreated on every router change
  const changeLocale = useCallback((newLocale: Locale) => {
    // Only execute on client-side after hydration
    if (typeof globalThis.window === 'undefined' || !isHydratedRef.current) {
      return;
    }

    // Validate locale before navigation
    let targetLocale = newLocale;
    if (!VALID_LOCALES.includes(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}. Using 'en' instead.`);
      targetLocale = 'en';
    }

    const currentRouter = routerRef.current;
    if (!currentRouter) {
      // Fallback for App Router
      setLocale(targetLocale);
      return;
    }

    try {
      currentRouter.push(
        { pathname: currentRouter.pathname, query: currentRouter.query },
        currentRouter.asPath,
        {
          locale: targetLocale === 'en' ? false : targetLocale,
          scroll: false, // Prevent scroll jump
        }
      );
    } catch (err) {
      console.error('Failed to change locale:', err);
      // Fallback: update state without navigation
      setLocale(targetLocale);
    }
  }, []); // Empty deps - uses refs for current values

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
