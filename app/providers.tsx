'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { CurrencyProvider } from '@/lib/currency-context';
import { TranslationProvider } from '@/lib/translation-context';
import { ClientLogic } from '@/components/layout/ClientLogic';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="America/Toronto"
      getMessageFallback={({ namespace, key }) => `${namespace ? namespace + '.' : ''}${key}`}
      onError={(error) => console.warn('i18n client error:', error)}
    >
      <SessionProvider>
        <ThemeProvider
          defaultTheme="system"
          storageKey="purrify-ui-theme"
        >
          <CurrencyProvider detectedCurrency="CAD">
            <TranslationProvider language={locale}>
              <ClientLogic />
              {children}
            </TranslationProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
