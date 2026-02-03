import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { clearPendingConversions } from '@/lib/affiliate/clearing';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const MINIMUM_PAYOUT = 50; // $50 minimum

export async function POST(): Promise<Response> {
  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Authenticate affiliate
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = session.user as { role?: string; affiliateId?: string };
    if (user.role !== 'affiliate' || !user.affiliateId) {
      return Response.json({ error: 'Not authorized as affiliate' }, { status: 403 });
    }

    const affiliateId = user.affiliateId;

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
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Check for existing pending payout request
    const existingRequest = await prisma.affiliatePayout.findFirst({
      where: {
        affiliateId,
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      return Response.json({
        error: 'You already have a pending payout request',
        pendingAmount: existingRequest.amount,
      }, { status: 400 });
    }

    // Check minimum balance
    if (affiliate.availableBalance < MINIMUM_PAYOUT) {
      return Response.json({
        error: `Minimum payout amount is $${MINIMUM_PAYOUT}. Your available balance is $${affiliate.availableBalance.toFixed(2)}.`,
        minimumPayout: MINIMUM_PAYOUT,
        availableBalance: affiliate.availableBalance,
      }, { status: 400 });
    }

    // Check payout method is configured
    if (!affiliate.payoutMethod || !affiliate.payoutEmail) {
      return Response.json({
        error: 'Please configure your payout method and email in Settings before requesting a payout.',
      }, { status: 400 });
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
              <li><strong>Amount:</strong> $${payoutAmount.toFixed(2)}</li>
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

            <p>We've received your payout request for <strong>$${payoutAmount.toFixed(2)}</strong>.</p>

            <h3>Payout Details:</h3>
            <ul>
              <li><strong>Amount:</strong> $${payoutAmount.toFixed(2)}</li>
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

    return Response.json({
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
    return Response.json({ error: 'Failed to submit payout request' }, { status: 500 });
  }
}
