'use client';

import { LazyTranslationProvider as Provider } from '@/lib/translation-context-lazy';
import type { Locale } from '@/i18n/config';
import type { TranslationNamespace } from '@/i18n/namespaces';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  locale: Locale;
  initialNamespaces?: TranslationNamespace[];
  enableLazyLoading?: boolean;
}

/**
 * LazyTranslationProvider
 * 
 * Wraps the lazy translation context for use in the app.
 * This enables route-based code splitting for translations.
 * 
 * @example
 * ```tsx
 * // In your layout or page
 * <LazyTranslationProvider locale="en" initialNamespaces={['common', 'home']}>
 *   <YourComponent />
 * </LazyTranslationProvider>
 * ```
 */
export function LazyTranslationProvider({
  children,
  locale,
  initialNamespaces = ['common'],
  enableLazyLoading = true,
}: Props) {
  return (
    <Provider
      locale={locale}
      initialNamespaces={initialNamespaces}
      enableLazyLoading={enableLazyLoading}
    >
      {children}
    </Provider>
  );
}

// Re-export hooks for convenience
export {
  useLazyTranslation,
  useNamespaceLoaded,
  useTranslationWithNamespace,
  usePrefetchTranslation,
} from '@/lib/translation-context-lazy';
