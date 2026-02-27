/**
 * Stripe Webhook Configuration
 * Centralized configuration for webhook processing
 */
import Stripe from 'stripe';

// Lazy initialize Stripe client
let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripe = new Stripe(key, {
      apiVersion: '2025-08-27.basil',
    });
  }
  return stripe;
}

// Use environment-appropriate webhook secret
export function getWebhookSecret(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const secret = isProduction
    ? process.env.STRIPE_WEBHOOK_SECRET
    : (process.env.STRIPE_WEBHOOK_SECRET_TEST || process.env.STRIPE_WEBHOOK_SECRET);

  if (!secret) {
    throw new Error(`STRIPE_WEBHOOK_SECRET${isProduction ? '' : '_TEST'} is not configured`);
  }
  return secret;
}

// Admin email for notifications
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@purrify.ca';

// Event types we handle
export const HANDLED_EVENT_TYPES = [
  'checkout.session.completed',
  'checkout.session.expired',
] as const;

export type HandledEventType = typeof HANDLED_EVENT_TYPES[number];
