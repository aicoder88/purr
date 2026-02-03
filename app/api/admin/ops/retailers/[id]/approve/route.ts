import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: RouteParams) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (!id || typeof id !== 'string') {
    return Response.json({ error: 'Retailer ID required' }, { status: 400 });
  }

  if (!prisma) {
    return Response.json({ error: 'Database connection error' }, { status: 500 });
  }

  try {
    // Fetch the retailer
    const retailer = await prisma.retailer.findUnique({
      where: { id },
    });

    if (!retailer) {
      return Response.json({ error: 'Retailer not found' }, { status: 404 });
    }

    if (retailer.status !== 'PENDING') {
      return Response.json({ error: 'Retailer is not pending approval' }, { status: 400 });
    }

    // Update retailer status to ACTIVE
    const updatedRetailer = await prisma.retailer.update({
      where: { id },
      data: {
        status: 'ACTIVE',
        approvedAt: new Date(),
        approvedBy: session.user?.email || 'admin',
      },
    });

    // Send approval notification email
    if (isResendConfigured()) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/retailer/login`;

      const approvalEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5B2EFF;">Welcome to the Purrify Wholesale Program!</h2>

          <p>Hi ${retailer.contactName},</p>

          <p>Great news! Your wholesale retailer application for <strong>${retailer.businessName}</strong> has been <strong>approved</strong>.</p>

          <h3 style="color: #1a1a1a;">What's Next:</h3>
          <ol style="line-height: 1.8;">
            <li><a href="${loginUrl}" style="color: #5B2EFF;">Log in to your retailer dashboard</a></li>
            <li>Browse our wholesale catalog with exclusive pricing</li>
            <li>Place your first order</li>
          </ol>

          <h3 style="color: #1a1a1a;">Wholesale Benefits:</h3>
          <ul style="line-height: 1.8;">
            <li>Exclusive wholesale pricing</li>
            <li>Marketing materials and POS displays</li>
            <li>Dedicated account support</li>
            <li>Co-op advertising opportunities</li>
          </ul>

          <div style="margin: 24px 0;">
            <a href="${loginUrl}" style="display: inline-block; background-color: #5B2EFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Access Your Dashboard
            </a>
          </div>

          <p>If you have any questions, just reply to this email. We're here to help!</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email because you were approved for the Purrify Wholesale Program.
          </p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
          to: retailer.email,
          subject: 'Welcome to Purrify Wholesale - Your Account is Approved!',
          html: approvalEmailContent,
        });
        console.log('Approval email sent to retailer:', retailer.email);
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Don't fail the approval if email fails
      }
    }

    return Response.json({
      success: true,
      retailer: {
        id: updatedRetailer.id,
        businessName: updatedRetailer.businessName,
        email: updatedRetailer.email,
        status: updatedRetailer.status,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to approve retailer:', error);
    return Response.json({ error: 'Failed to approve retailer' }, { status: 500 });
  }
}
