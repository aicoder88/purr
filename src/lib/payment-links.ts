export type PaymentLinkKey =
  | 'trialSingle'
  | 'standardSingle'
  | 'standardAutoship'
  | 'familySingle'
  | 'familyAutoship'
  | 'jumboSingle'
  | 'jumboAutoship';

const PAYMENT_LINKS: Record<PaymentLinkKey, string> = {
  trialSingle: '/buy/purrify-12g',
  standardSingle: '/buy/purrify-50g',
  standardAutoship: '/buy/purrify-50g-autoship',
  familySingle: '/buy/purrify-120g',
  familyAutoship: '/buy/purrify-120g-autoship',
  jumboSingle: '/buy/purrify-240g',
  jumboAutoship: '/buy/purrify-240g-autoship',
};

export function getPaymentLink(key: PaymentLinkKey): string | null {
  const link = PAYMENT_LINKS[key];
  if (!link) return null;
  const trimmed = link.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function hasPaymentLink(key: PaymentLinkKey): boolean {
  return getPaymentLink(key) !== null;
}
