'use client';
import { createContext, useContext, ReactNode, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { translations } from '../translations';
import type { TranslationType } from '../translations/types';
import type { Locale } from '@/i18n/config';

// Pages Router import (conditionally used)
import type { NextRouter } from 'next/router';

// App Router import (conditionally used)
import { useRouter as useAppRouter } from 'next/navigation';

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
  // Use App Router hook only for App Router mode
  const appRouter = isAppRouter ? useAppRouter() : null;
  // Pages Router will be set via ref after mount
  const pagesRouterRef = useRef<NextRouter | null>(null);

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
  const appRouterRef = useRef(appRouter);

  // Keep refs in sync
  useEffect(() => {
    appRouterRef.current = appRouter;
  }, [appRouter]);

  useEffect(() => {
    isHydratedRef.current = isHydrated;
  }, [isHydrated]);

  // For Pages Router, try to get the router after mount
  useEffect(() => {
    if (!isAppRouter && typeof window !== 'undefined') {
      // Dynamically import Next.js router for Pages Router
      import('next/router').then(({ useRouter }) => {
        try {
          // This won't work directly in useEffect, so we use window location instead
        } catch {
          // Ignore router errors
        }
      }).catch(() => {
        // Router not available (App Router)
      });
    }
  }, [isAppRouter]);

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
    const currentAppRouter = appRouterRef.current;
    if (currentAppRouter) {
      // For App Router, we navigate to the same page with new locale
      // Store locale preference in cookie via setUserLocale
      import('@/lib/locale').then(({ setUserLocale }) => {
        setUserLocale(targetLocale).then(() => {
          // Refresh the page to apply new locale
          window.location.reload();
        });
      });
      return;
    }

    // Pages Router handling
    try {
      // Access the Next.js router from window if available
      // This is a fallback for Pages Router
      const w = window as unknown as { __NEXT_DATA__?: { locale?: string } };
      if (w.__NEXT_DATA__) {
        // We're in Pages Router
        // Force page reload with new locale
        const url = new URL(window.location.href);
        url.searchParams.set('lang', targetLocale);
        window.location.href = url.toString();
      } else {
        // Fallback: just update state
        setLocale(targetLocale);
      }
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
