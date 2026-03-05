import { PRODUCTS } from '@/lib/constants';

export type CheckoutProductId =
  | 'purrify-12g'
  | 'purrify-50g'
  | 'purrify-120g'
  | 'purrify-240g'
  | 'purrify-50g-autoship'
  | 'purrify-120g-autoship'
  | 'purrify-240g-autoship';

export interface CheckoutProductConfig {
  productId: CheckoutProductId;
  mode: 'payment' | 'subscription';
  price: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  recurringInterval?: 'month';
  recurringIntervalCount?: number;
}

const SUPPORTED_PRODUCT_IDS: CheckoutProductId[] = [
  'purrify-12g',
  'purrify-50g',
  'purrify-120g',
  'purrify-240g',
  'purrify-50g-autoship',
  'purrify-120g-autoship',
  'purrify-240g-autoship',
];

export function isCheckoutProductId(value: string): value is CheckoutProductId {
  return SUPPORTED_PRODUCT_IDS.includes(value as CheckoutProductId);
}

export function getCheckoutProductConfig(
  productId: CheckoutProductId
): CheckoutProductConfig | null {
  const product = PRODUCTS.find((entry) => entry.id === productId);
  if (!product) {
    return null;
  }

  const isSubscription = Boolean(product.subscription);

  return {
    productId,
    mode: isSubscription ? 'subscription' : 'payment',
    price: product.price,
    name: product.name,
    description: product.description,
    image: product.image,
    quantity: 1,
    recurringInterval: isSubscription ? 'month' : undefined,
    recurringIntervalCount: isSubscription ? 3 : undefined,
  };
}
