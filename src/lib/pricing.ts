import { PRODUCTS } from './constants';

const CURRENCY = 'CAD';

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
  if (locale === 'zh') return 'zh-CN';
  return locale ?? 'en-CA';
};

const formatCurrency = (value: number, locale: string = 'en-CA') => {
  const resolvedLocale = resolveLocale(locale);
  const formatter = new Intl.NumberFormat(resolvedLocale, {
    style: 'currency',
    currency: CURRENCY,
    currencyDisplay: 'narrowSymbol'
  });

  const parts = formatter.formatToParts(value);
  const formatted = parts
    .map(part => {
      if (part.type === 'currency') {
        const symbol = part.value.replace(/[A-Za-z]/g, '').trim();
        return symbol || '$';
      }
      return part.value;
    })
    .join('');

  // Normalize any lingering multiple spaces without disturbing locale-specific formatting
  return formatted.replace(/\s+/g, match => (match.includes('\u00A0') ? match : ' ')).trim();
};

export const getProductPrice = (idOrKey: ProductCatalogId | ProductPriceKey): number => {
  const catalogId = (PRODUCT_ID_ALIAS[idOrKey as ProductPriceKey] ?? idOrKey) as ProductCatalogId;
  return priceById[catalogId];
};

export const formatProductPrice = (
  idOrKey: ProductCatalogId | ProductPriceKey,
  locale: string = 'en-CA'
) => formatCurrency(getProductPrice(idOrKey), locale);

const allProductValues = (Object.values(PRODUCT_ID_ALIAS) as ProductCatalogId[]).map(id => getProductPrice(id));

const MIN_PRICE = Math.min(...allProductValues);
const MAX_PRICE = Math.max(...allProductValues);

export const getPriceRange = (locale: string = 'en-CA') => ({
  min: MIN_PRICE,
  max: MAX_PRICE,
  formatted: `${formatCurrency(MIN_PRICE, locale)} - ${formatCurrency(MAX_PRICE, locale)}`,
});

export const PRODUCT_PRICES = (Object.keys(PRODUCT_ID_ALIAS) as ProductPriceKey[]).reduce(
  (acc, key) => {
    acc[key] = {
      id: PRODUCT_ID_ALIAS[key],
      amount: getProductPrice(key),
      formatted: formatProductPrice(key),
    };
    return acc;
  },
  {} as Record<ProductPriceKey, { id: ProductCatalogId; amount: number; formatted: string }>
);

export const CURRENCY_CODE = CURRENCY;

export const formatCurrencyValue = formatCurrency;

export const resolveLocaleForCurrency = resolveLocale;
