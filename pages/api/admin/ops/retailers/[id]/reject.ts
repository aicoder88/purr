import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { reason } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Retailer ID required' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    // Fetch the retailer
    const retailer = await prisma.retailer.findUnique({
      where: { id },
    });

    if (!retailer) {
      return res.status(404).json({ error: 'Retailer not found' });
    }

    if (retailer.status !== 'PENDING') {
      return res.status(400).json({ error: 'Retailer is not pending approval' });
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

    return res.status(200).json({
      success: true,
      retailer: {
        id: updatedRetailer.id,
        businessName: updatedRetailer.businessName,
        status: updatedRetailer.status,
      },
    });
  } catch (error) {
    console.error('Failed to reject retailer:', error);
    return res.status(500).json({ error: 'Failed to reject retailer' });
  }
}
