export type PaymentLinkKey =
  | 'trialSingle'
  | 'standardSingle'
  | 'standardAutoship'
  | 'familySingle'
  | 'familyAutoship'
  | 'jumboSingle'
  | 'jumboAutoship';

const DEFAULT_PAYMENT_LINKS: Record<PaymentLinkKey, string> = {
  trialSingle: 'https://buy.stripe.com/5kQ3cw7uEeak1LkcbT5gc04',
  standardSingle: '',
  standardAutoship: '',
  familySingle: '',
  familyAutoship: '',
  jumboSingle: '',
  jumboAutoship: '',
};

const PAYMENT_LINKS: Record<PaymentLinkKey, string> = {
  trialSingle: process.env.NEXT_PUBLIC_STRIPE_LINK_TRIAL_SINGLE ?? DEFAULT_PAYMENT_LINKS.trialSingle,
  standardSingle: process.env.NEXT_PUBLIC_STRIPE_LINK_STANDARD_SINGLE ?? DEFAULT_PAYMENT_LINKS.standardSingle,
  standardAutoship: process.env.NEXT_PUBLIC_STRIPE_LINK_STANDARD_AUTOSHIP ?? DEFAULT_PAYMENT_LINKS.standardAutoship,
  familySingle: process.env.NEXT_PUBLIC_STRIPE_LINK_FAMILY_SINGLE ?? DEFAULT_PAYMENT_LINKS.familySingle,
  familyAutoship: process.env.NEXT_PUBLIC_STRIPE_LINK_FAMILY_AUTOSHIP ?? DEFAULT_PAYMENT_LINKS.familyAutoship,
  jumboSingle: process.env.NEXT_PUBLIC_STRIPE_LINK_JUMBO_SINGLE ?? DEFAULT_PAYMENT_LINKS.jumboSingle,
  jumboAutoship: process.env.NEXT_PUBLIC_STRIPE_LINK_JUMBO_AUTOSHIP ?? DEFAULT_PAYMENT_LINKS.jumboAutoship,
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
