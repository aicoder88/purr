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
  const { reason } = await req.json();

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

    // Update retailer status to REJECTED
    const updatedRetailer = await prisma.retailer.update({
      where: { id },
      data: {
        status: 'REJECTED',
        notes: reason ? `Rejection reason: ${reason}` : 'Application rejected',
      },
    });

    // Send rejection notification email
    if (isResendConfigured()) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const rejectionEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Purrify Wholesale Application Update</h2>

          <p>Hi ${retailer.contactName},</p>

          <p>Thank you for your interest in becoming a Purrify wholesale partner for <strong>${retailer.businessName}</strong>.</p>

          <p>After careful review, we're unable to approve your application at this time.</p>

          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}

          <p>This decision may be based on factors such as:</p>
          <ul style="line-height: 1.8;">
            <li>Geographic coverage in your area</li>
            <li>Current partner capacity</li>
            <li>Business requirements alignment</li>
          </ul>

          <p>If you believe this was in error or would like to discuss your application further, please reply to this email.</p>

          <p>We appreciate your interest in Purrify and wish you success in your business endeavors.</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email regarding your Purrify wholesale application.
          </p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
          to: retailer.email,
          subject: 'Purrify Wholesale Application Update',
          html: rejectionEmailContent,
        });
        console.log('Rejection email sent to retailer:', retailer.email);
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
        // Don't fail the rejection if email fails
      }
    }

    return Response.json({
      success: true,
      retailer: {
        id: updatedRetailer.id,
        businessName: updatedRetailer.businessName,
        status: updatedRetailer.status,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to reject retailer:', error);
    return Response.json({ error: 'Failed to reject retailer' }, { status: 500 });
  }
}
