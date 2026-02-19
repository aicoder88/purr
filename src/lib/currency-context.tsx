'use client';

import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import type { Currency } from './geo/currency-detector';

type CurrencyContextType = {
  currency: Currency;
  formatPrice: (price: number, locale?: string) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
  detectedCurrency,
  children,
}: {
  detectedCurrency: Currency;
  children: ReactNode;
}) {
  // Use stable initial state from server detection to prevent hydration mismatches
  const [currency] = useState<Currency>(detectedCurrency);

  // Memoize formatPrice function
  const formatPrice = useMemo(() => {
    return (price: number, locale?: string): string => {
      const resolvedLocale = locale === 'fr' ? 'fr-CA' : (locale ?? 'en-CA');

      const formatter = new Intl.NumberFormat(resolvedLocale, {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'narrowSymbol'
      });

      const parts = formatter.formatToParts(price);
      const formatted = parts
        .map(part => {
          if (part.type === 'currency') {
            // Always show $ symbol, strip currency codes
            const symbol = part.value.replaceAll(/[A-Za-z]/g, '').trim();
            return symbol || '$';
          }
          return part.value;
        })
        .join('');

      // Normalize spaces
      return formatted.replaceAll(/\s+/g, match => (match.includes('\u00A0') ? match : ' ')).trim();
    };
  }, [currency]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currency,
    formatPrice,
  }), [currency, formatPrice]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }

  return context;
}
