'use client';
import { ReactNode, useEffect, useMemo, useCallback, useState } from 'react';
import type { TranslationType } from '../translations/types';
import type { Locale } from '@/i18n/config';
import { localizePath } from '@/lib/i18n/locale-path';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useMessages } from 'next-intl';

type TranslationContextType = {
  t: TranslationType;
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  setLocaleClient: (locale: Locale) => void;
};

const VALID_LOCALES: Locale[] = ['en', 'fr'];

export function TranslationProvider({
  children,
  language: _language,
}: {
  children: ReactNode;
  language: string;
}) {
  return <>{children}</>;
}

export function useTranslation() {
  const router = useRouter();
  const pathname = usePathname();
  const intlLocale = useLocale();
  const locale = VALID_LOCALES.includes(intlLocale as Locale) ? (intlLocale as Locale) : 'en';
  const t = useMessages() as unknown as TranslationType;

  const changeLocale = useCallback((newLocale: Locale) => {
    if (typeof globalThis.window === 'undefined') {
      return;
    }

    const targetLocale: Locale = VALID_LOCALES.includes(newLocale) ? newLocale : 'en';
    const secure = window.location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000;SameSite=Strict${secure}`;

    const currentPath = pathname || '/';
    const query = window.location.search;
    const currentUrl = query ? `${currentPath}${query}` : currentPath;
    const nextPath = localizePath(currentPath, targetLocale);
    const nextUrl = query ? `${nextPath}${query}` : nextPath;

    if (nextUrl !== currentUrl) {
      router.push(nextUrl);
      return;
    }

    router.refresh();
  }, [pathname, router]);

  const setLocaleClient = useCallback((_newLocale: Locale) => {
    // Locale now comes from the active next-intl provider; local client overrides
    // are intentionally ignored to keep the shared bundle lean.
  }, []);

  return useMemo<TranslationContextType>(() => ({
    t,
    locale,
    changeLocale,
    setLocaleClient,
  }), [t, locale, changeLocale, setLocaleClient]);
}

// Helper hook for checking if component is hydrated
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
