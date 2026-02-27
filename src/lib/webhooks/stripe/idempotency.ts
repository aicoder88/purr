/**
 * Stripe Webhook Idempotency Service
 * Handles idempotency checks to prevent duplicate processing
 */
import prisma from '@/lib/prisma';

/**
 * Check if a webhook event has already been processed
 */
export async function isEventProcessed(eventId: string): Promise<boolean> {
  if (!prisma) return false;

  const alreadyProcessed = await prisma.auditLog.findFirst({
    where: {
      entity: 'stripe_webhook',
      entityId: eventId,
      action: 'PAYMENT_PROCESSED',
    },
  });

  return !!alreadyProcessed;
}

/**
 * Record that a webhook event has been processed
 */
export async function recordEventProcessed(
  eventId: string,
  eventType: string
): Promise<void> {
  if (!prisma) return;

  try {
    await prisma.auditLog.create({
      data: {
        action: 'PAYMENT_PROCESSED',
        entity: 'stripe_webhook',
        entityId: eventId,
        changes: { eventType },
      },
    });
  } catch (err) {
    // Non-fatal: Failed to write idempotency audit log
    console.error('[Webhook] Failed to record event processing:', err);
  }
}
