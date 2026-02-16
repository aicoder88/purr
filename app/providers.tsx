'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { TranslationProvider } from '@/lib/translation-context';
import { LazyTranslationProvider } from '@/components/providers/LazyTranslationProvider';
import { CurrencyProvider } from '@/lib/currency-context';
import { ClientLogic } from '@/components/layout/ClientLogic';
import type { Locale } from '@/i18n/config';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
  /**
   * Enable lazy loading for translations.
   * When true, translations are loaded on-demand by route.
   * When false, all translations are loaded eagerly (legacy behavior).
   * @default false - Enable after testing migration
   */
  enableLazyTranslations?: boolean;
}

export function Providers({ 
  children, 
  locale, 
  messages,
  enableLazyTranslations = false 
}: ProvidersProps) {
  const validLocale = (locale === 'en' || locale === 'fr' || locale === 'zh' || locale === 'es') 
    ? locale 
    : 'en';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>
        <ThemeProvider
          defaultTheme="system"
          storageKey="purrify-ui-theme"
        >
          <CurrencyProvider detectedCurrency="CAD">
            {enableLazyTranslations ? (
              <LazyTranslationProvider 
                locale={validLocale as Locale} 
                initialNamespaces={['common']}
                enableLazyLoading={true}
              >
                <ClientLogic />
                {children}
              </LazyTranslationProvider>
            ) : (
              <TranslationProvider language={validLocale}>
                <ClientLogic />
                {children}
              </TranslationProvider>
            )}
          </CurrencyProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
