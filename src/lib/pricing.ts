import { PRODUCTS, USD_PRICES } from './constants';
import type { Currency } from './geo/currency-detector';

export type ProductCatalogId = typeof PRODUCTS[number]['id'];

type ProductPriceKey = 'trial' | 'standard' | 'family' | 'jumbo' | 'standardAutoship' | 'familyAutoship' | 'jumboAutoship';

const PRODUCT_ID_ALIAS: Record<ProductPriceKey, ProductCatalogId> = {
  trial: 'purrify-12g',
  standard: 'purrify-50g',
  standardAutoship: 'purrify-50g-autoship',
  family: 'purrify-120g',
  familyAutoship: 'purrify-120g-autoship',
  jumbo: 'purrify-240g',
  jumboAutoship: 'purrify-240g-autoship',
};

const priceById = PRODUCTS.reduce<Record<ProductCatalogId, number>>((acc, product) => {
  acc[product.id as ProductCatalogId] = product.price;
  return acc;
}, {} as Record<ProductCatalogId, number>);

const resolveLocale = (locale?: string) => {
  if (locale === 'fr') return 'fr-CA';
  return locale ?? 'en-CA';
};

const formatCurrency = (value: number, currency: Currency = 'CAD', locale: string = 'en-CA') => {
  const resolvedLocale = resolveLocale(locale);
  const formatter = new Intl.NumberFormat(resolvedLocale, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  });

  const parts = formatter.formatToParts(value);
  const formatted = parts
    .map(part => {
      if (part.type === 'currency') {
        const symbol = part.value.replaceAll(/[A-Za-z]/g, '').trim();
        return symbol || '$';
      }
      return part.value;
    })
    .join('');

  // Normalize any lingering multiple spaces without disturbing locale-specific formatting
  return formatted.replaceAll(/\s+/g, match => (match.includes('\u00A0') ? match : ' ')).trim();
};

export const getProductPrice = (idOrKey: ProductCatalogId | ProductPriceKey, currency: Currency = 'CAD'): number => {
  const catalogId = (PRODUCT_ID_ALIAS[idOrKey as ProductPriceKey] ?? idOrKey) as ProductCatalogId;

  // Use USD prices when currency is USD
  if (currency === 'USD' && USD_PRICES[catalogId]) {
    return USD_PRICES[catalogId];
  }

  return priceById[catalogId];
};

export const formatProductPrice = (
  idOrKey: ProductCatalogId | ProductPriceKey,
  currencyOrLocale: Currency | string = 'CAD',
  locale?: string
): string => {
  // Backward compatibility: if currencyOrLocale looks like a locale, treat it as such
  // Explicitly check for all known locale codes and locale patterns
  const knownLocales = ['en', 'fr'];
  const isLocale = currencyOrLocale !== 'CAD' && currencyOrLocale !== 'USD' &&
    (currencyOrLocale.includes('-') ||
      currencyOrLocale.includes('_') ||
      knownLocales.includes(currencyOrLocale));

  if (isLocale) {
    // Old signature: formatProductPrice(idOrKey, locale)
    return formatCurrency(getProductPrice(idOrKey, 'CAD'), 'CAD', currencyOrLocale);
  }

  // New signature: formatProductPrice(idOrKey, currency, locale)
  const currency = currencyOrLocale as Currency;
  const resolvedLocale = locale ?? 'en-CA';
  return formatCurrency(getProductPrice(idOrKey, currency), currency, resolvedLocale);
};


export const getPriceRange = (currencyOrLocale: Currency | string = 'CAD', locale?: string) => {
  // Backward compatibility: if first param looks like a locale, treat it as such
  const knownLocales = ['en', 'fr'];
  const isLocale = currencyOrLocale !== 'CAD' && currencyOrLocale !== 'USD' &&
    (currencyOrLocale.includes('-') ||
      currencyOrLocale.includes('_') ||
      knownLocales.includes(currencyOrLocale));

  let currency: Currency;
  let resolvedLocale: string;

  if (isLocale) {
    // Old signature: getPriceRange(locale)
    currency = 'CAD';
    resolvedLocale = currencyOrLocale;
  } else {
    // New signature: getPriceRange(currency, locale)
    currency = currencyOrLocale as Currency;
    resolvedLocale = locale ?? 'en-CA';
  }

  const allValues = (Object.values(PRODUCT_ID_ALIAS) as ProductCatalogId[]).map(id => getProductPrice(id, currency));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  return {
    min,
    max,
    formatted: `${formatCurrency(min, currency, resolvedLocale)} - ${formatCurrency(max, currency, resolvedLocale)}`,
  };
};

export const PRODUCT_PRICES = (Object.keys(PRODUCT_ID_ALIAS) as ProductPriceKey[]).reduce(
  (acc, key) => {
    acc[key] = {
      id: PRODUCT_ID_ALIAS[key],
      amount: getProductPrice(key, 'CAD'),
      formatted: formatProductPrice(key, 'CAD'),
    };
    return acc;
  },
  {} as Record<ProductPriceKey, { id: ProductCatalogId; amount: number; formatted: string }>
);

export const formatCurrencyValue = (value: number, currencyOrLocale: Currency | string = 'CAD', locale?: string): string => {
  // Backward compatibility: if second param looks like a locale, treat it as such
  const knownLocales = ['en', 'fr'];
  const isLocale = currencyOrLocale !== 'CAD' && currencyOrLocale !== 'USD' &&
    (currencyOrLocale.includes('-') ||
      currencyOrLocale.includes('_') ||
      knownLocales.includes(currencyOrLocale));

  if (isLocale) {
    // Old signature: formatCurrencyValue(value, locale)
    return formatCurrency(value, 'CAD', currencyOrLocale);
  }

  // New signature: formatCurrencyValue(value, currency, locale)
  const currency = currencyOrLocale as Currency;
  const resolvedLocale = locale ?? 'en-CA';
  return formatCurrency(value, currency, resolvedLocale);
};

export const resolveLocaleForCurrency = resolveLocale;
