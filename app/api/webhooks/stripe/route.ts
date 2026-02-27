/**
 * Stripe Webhook Handler
 * 
 * Processes Stripe webhook events with:
 * - Signature verification
 * - Idempotency checks
 * - Modular event handlers
 * - Comprehensive error handling
 */
import type { NextRequest } from 'next/server';
import type Stripe from 'stripe';
import {
  getStripe,
  getWebhookSecret,
  isEventProcessed,
  recordEventProcessed,
  handleCheckoutSessionCompleted,
  handleCheckoutSessionExpired,
  HANDLED_EVENT_TYPES,
} from '@/lib/webhooks/stripe';

export async function POST(req: NextRequest): Promise<Response> {
  // Get raw body for signature verification
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return Response.json({ message: 'Missing stripe-signature header' }, { status: 400 });
  }

  // Verify webhook signature with environment-appropriate secret
  let event: Stripe.Event;
  try {
    const secret = getWebhookSecret();
    event = getStripe().webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // Idempotency: check if this event was already processed
  const alreadyProcessed = await isEventProcessed(event.id);
  if (alreadyProcessed) {
    return Response.json({ received: true, deduplicated: true });
  }

  // Check if we handle this event type
  if (!HANDLED_EVENT_TYPES.includes(event.type as typeof HANDLED_EVENT_TYPES[number])) {
    // Unhandled event type - acknowledge but don't process
    return Response.json({ received: true, handled: false });
  }

  try {
    // Route to appropriate handler
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionExpired(session);
        break;
      }

      default:
        // This should not happen due to the check above
        break;
    }

    // Record successful processing for idempotency
    await recordEventProcessed(event.id, event.type);

    return Response.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error processing event:', error);
    return Response.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
