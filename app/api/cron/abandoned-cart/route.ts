/**
 * Abandoned Cart Recovery Cron Job
 *
 * Triggered by an external scheduler (e.g. Vercel Cron or cron-job.org).
 * Sends recovery emails to users who abandoned their carts.
 *
 * Security: protected by CRON_SECRET environment variable.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  getCartsNeedingRecoveryEmails,
  recordRecoveryEmailSent,
  generateDiscountCode,
  calculateCartTotal,
} from '@/lib/cart-tracking';
import { AbandonedCartEmailHTML, getAbandonedCartEmailSubject } from '@/emails/abandoned-cart';
import { resend } from '@/lib/resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { getFreshnessProfileBySessionId } from '@/lib/freshness-profile';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Validate cron secret to prevent unauthorized invocations
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!isResendConfigured()) {
    return NextResponse.json({ message: 'Email service not configured' }, { status: 503 });
  }

  const carts = await getCartsNeedingRecoveryEmails();

  if (carts.length === 0) {
    return NextResponse.json({ processed: 0 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
  let sent = 0;
  let failed = 0;

  for (const cart of carts) {
    if (!cart.email) continue;

    const isSecondEmail = cart.emailsSent === 1;
    const discountCode = isSecondEmail ? generateDiscountCode() : undefined;
    const totalAmount = calculateCartTotal(cart.items);
    const locale = cart.locale === 'fr' ? 'fr' : 'en';
    const freshnessProfile = await getFreshnessProfileBySessionId(cart.sessionId);
    const fallbackProductId = typeof cart.items[0]?.productId === 'string' ? cart.items[0].productId : undefined;

    const recoveryUrl = `${siteUrl}${locale === 'fr' ? '/fr' : ''}/`;

    const html = AbandonedCartEmailHTML({
      customerName: undefined,
      items: cart.items,
      totalAmount,
      discountCode,
      discountPercentage: 10,
      locale,
      recoveryUrl,
      isSecondEmail,
      catCount: freshnessProfile?.catCount ?? undefined,
      homeType: freshnessProfile?.homeType ?? undefined,
      odorSeverity: freshnessProfile?.odorSeverity ?? undefined,
      currentRemedy: freshnessProfile?.currentRemedy ?? undefined,
      riskLevel: freshnessProfile?.riskLevel ?? undefined,
      score: freshnessProfile?.score ?? undefined,
      recommendedProductId: freshnessProfile?.recommendedProductId ?? fallbackProductId,
    });

    const subject = getAbandonedCartEmailSubject(locale, isSecondEmail);

    try {
      const { error } = await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: cart.email,
        subject,
        html,
      });

      if (error) {
        console.error(`[AbandonedCart] Failed to send to ${cart.email}:`, error);
        failed++;
      } else {
        await recordRecoveryEmailSent(cart.id);
        sent++;
      }
    } catch (err) {
      console.error(`[AbandonedCart] Unexpected error for cart ${cart.id}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ processed: carts.length, sent, failed });
}
