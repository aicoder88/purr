/**
 * Process Affiliate Payout API
 *
 * POST: Mark a payout as completed with transaction reference
 */

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { z } from 'zod';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

// Input validation schema
const processPayoutSchema = z.object({
  transactionRef: z.string().min(1, 'Transaction reference is required').max(100),
  notes: z.string().max(1000).optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Validate input
    const body = await req.json();
    const validationResult = processPayoutSchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json({
        error: 'Invalid request data',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const { transactionRef, notes } = validationResult.data;
    const adminEmail = session.user?.email || 'admin';

    // Fetch the payout with affiliate info
    const payout = await prisma.affiliatePayout.findUnique({
      where: { id },
      include: {
        affiliate: {
          select: {
            id: true,
            name: true,
            email: true,
            code: true,
            availableBalance: true,
          },
        },
      },
    });

    if (!payout) {
      return Response.json({ error: 'Payout not found' }, { status: 404 });
    }

    if (payout.status === 'COMPLETED') {
      return Response.json({ error: 'Payout already completed' }, { status: 400 });
    }

    if (payout.status === 'REJECTED') {
      return Response.json({ error: 'Cannot process rejected payout' }, { status: 400 });
    }

    // Update payout and affiliate balance in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update the payout status
      const updatedPayout = await tx.affiliatePayout.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
          processedBy: adminEmail,
          transactionRef,
          notes: notes || null,
        },
      });

      // Reduce affiliate's available balance
      await tx.affiliate.update({
        where: { id: payout.affiliateId },
        data: {
          availableBalance: {
            decrement: payout.amount,
          },
        },
      });

      return updatedPayout;
    });

    // Send confirmation email to affiliate
    if (isResendConfigured()) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard`;

      const methodLabel = payout.method === 'PAYPAL' ? 'PayPal' : 'E-Transfer';

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Your Payout Has Been Processed!</h2>

          <p>Hi ${payout.affiliate.name},</p>

          <p>Great news! Your payout request has been processed and the funds have been sent.</p>

          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Payout Details:</h3>
            <p style="margin: 8px 0;"><strong>Amount:</strong> $${payout.amount.toFixed(2)}</p>
            <p style="margin: 8px 0;"><strong>Method:</strong> ${methodLabel}</p>
            <p style="margin: 8px 0;"><strong>Sent to:</strong> ${payout.payoutEmail}</p>
            <p style="margin: 8px 0;"><strong>Transaction Reference:</strong> ${transactionRef}</p>
            <p style="margin: 8px 0;"><strong>Processed on:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <p>
            ${payout.method === 'PAYPAL'
              ? 'The funds should appear in your PayPal account within 24 hours.'
              : 'The E-Transfer should arrive within 1-2 business days. Please check your email for the transfer notification.'}
          </p>

          <p>Keep up the great work! The more you share Purrify, the more you earn.</p>

          <div style="margin: 24px 0;">
            <a href="${dashboardUrl}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              View Your Dashboard
            </a>
          </div>

          <p>If you have any questions about this payout, just reply to this email.</p>

          <p>Thank you for being a Purrify affiliate!</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email because you have an active Purrify affiliate account.
          </p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
          to: payout.affiliate.email,
          subject: `Your $${payout.amount.toFixed(2)} Purrify Payout Has Been Sent!`,
          html: emailContent,
        });

      } catch (emailError) {
        // Log but don't fail the request if email fails
        console.error('Failed to send payout confirmation email:', emailError);
      }
    }

    return Response.json({
      success: true,
      payout: {
        id: result.id,
        status: result.status,
        processedAt: result.processedAt?.toISOString(),
        transactionRef: result.transactionRef,
      },
    }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Failed to process payout:', error);
    return Response.json({ error: 'Failed to process payout' }, { status: 500, headers: rateLimitHeaders });
  }
}
