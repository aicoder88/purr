import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';
import { clearPendingConversions } from '@/lib/affiliate/clearing';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const MINIMUM_PAYOUT = 50; // $50 minimum

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  const { affiliateId } = req.affiliate;

  try {
    // First, clear any pending conversions that are past hold period
    await clearPendingConversions(affiliateId);

    // Fetch fresh affiliate data
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        name: true,
        email: true,
        availableBalance: true,
        payoutMethod: true,
        payoutEmail: true,
      },
    });

    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Check for existing pending payout request
    const existingRequest = await prisma.affiliatePayout.findFirst({
      where: {
        affiliateId,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      return res.status(400).json({
        error: 'You already have a pending payout request',
        pendingAmount: existingRequest.amount,
      });
    }

    // Check minimum balance
    if (affiliate.availableBalance < MINIMUM_PAYOUT) {
      return res.status(400).json({
        error: `Minimum payout amount is $${MINIMUM_PAYOUT}. Your available balance is $${affiliate.availableBalance.toFixed(2)}.`,
        minimumPayout: MINIMUM_PAYOUT,
        availableBalance: affiliate.availableBalance,
      });
    }

    // Check payout method is configured
    if (!affiliate.payoutMethod || !affiliate.payoutEmail) {
      return res.status(400).json({
        error: 'Please configure your payout method and email in Settings before requesting a payout.',
      });
    }

    const payoutAmount = affiliate.availableBalance;

    // Create payout request in a transaction
    const payout = await prisma.$transaction(async (tx) => {
      // Create the payout record
      const newPayout = await tx.affiliatePayout.create({
        data: {
          affiliateId,
          amount: payoutAmount,
          status: 'PENDING',
          method: affiliate.payoutMethod!,
          payoutEmail: affiliate.payoutEmail!,
        },
      });

      // Deduct from available balance
      await tx.affiliate.update({
        where: { id: affiliateId },
        data: {
          availableBalance: {
            decrement: payoutAmount,
          },
        },
      });

      return newPayout;
    });

    // Send notification email to admin
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Purrify Affiliate Program <affiliates@purrify.ca>',
          to: 'admin@purrify.ca',
          subject: `[Action Required] New Payout Request - ${affiliate.name}`,
          html: `
            <h2>New Affiliate Payout Request</h2>
            <p>A new payout request has been submitted and requires your attention.</p>

            <h3>Details:</h3>
            <ul>
              <li><strong>Affiliate:</strong> ${affiliate.name}</li>
              <li><strong>Email:</strong> ${affiliate.email}</li>
              <li><strong>Amount:</strong> $${payoutAmount.toFixed(2)} CAD</li>
              <li><strong>Method:</strong> ${affiliate.payoutMethod}</li>
              <li><strong>Payout Email:</strong> ${affiliate.payoutEmail}</li>
              <li><strong>Request ID:</strong> ${payout.id}</li>
              <li><strong>Requested At:</strong> ${new Date().toLocaleString()}</li>
            </ul>

            <p>Please process this payout request in the admin dashboard:</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/ops/affiliates/payouts">View Payout Requests</a></p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Send confirmation email to affiliate
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Purrify Affiliate Program <affiliates@purrify.ca>',
          to: affiliate.email,
          subject: 'Payout Request Received - Purrify Affiliate Program',
          html: `
            <h2>Payout Request Received</h2>
            <p>Hi ${affiliate.name},</p>

            <p>We've received your payout request for <strong>$${payoutAmount.toFixed(2)} CAD</strong>.</p>

            <h3>Payout Details:</h3>
            <ul>
              <li><strong>Amount:</strong> $${payoutAmount.toFixed(2)} CAD</li>
              <li><strong>Method:</strong> ${affiliate.payoutMethod}</li>
              <li><strong>Payout Email:</strong> ${affiliate.payoutEmail}</li>
            </ul>

            <p>Your request is being processed. You'll receive a confirmation email once the payment has been sent. This typically takes 3-5 business days.</p>

            <p>You can track your payout status in your dashboard:</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard/payouts">View Payout Status</a></p>

            <p>Thank you for being a Purrify affiliate!</p>
            <p>The Purrify Team</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send affiliate confirmation email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Payout request submitted successfully',
      payout: {
        id: payout.id,
        amount: payout.amount,
        status: payout.status,
        method: payout.method,
        requestedAt: payout.requestedAt,
      },
    });
  } catch (error) {
    console.error('Failed to create payout request:', error);
    return res.status(500).json({ error: 'Failed to submit payout request' });
  }
}

export default withAffiliateAuth(handler);
