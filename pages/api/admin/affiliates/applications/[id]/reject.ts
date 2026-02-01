import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { reason } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Application ID required' });
  }

  if (!prisma) {
    return res.status(500).json({ error: 'Database connection error' });
  }

  try {
    // Fetch the application
    const application = await prisma.affiliateApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status !== 'PENDING') {
      return res.status(400).json({ error: 'Application is not pending' });
    }

    // Update application status
    await prisma.affiliateApplication.update({
      where: { id },
      data: {
        status: 'REJECTED',
        reviewedAt: new Date(),
        reviewedBy: session.user?.email || 'admin',
        rejectionReason: reason || null,
      },
    });

    // Send rejection email if reason provided and Resend is configured
    if (isResendConfigured()) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const reapplyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate`;

      const rejectionEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Affiliate Application Update</h2>

          <p>Hi ${application.name},</p>

          <p>Thank you for your interest in joining the Purrify Affiliate Program.</p>

          <p>After reviewing your application, we regret to inform you that we are unable to approve it at this time.</p>

          ${reason ? `
            <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0;"><strong>Reason:</strong> ${reason}</p>
            </div>
          ` : ''}

          <p>This decision may be due to:</p>
          <ul style="line-height: 1.8;">
            <li>Audience alignment with our product</li>
            <li>Content quality or reach</li>
            <li>Market focus</li>
          </ul>

          <p>If you believe your situation has changed or you have additional information that may be relevant, you're welcome to <a href="${reapplyUrl}" style="color: #0d9488;">reapply</a> in the future.</p>

          <p>If you have any questions, feel free to reply to this email.</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email because you applied to the Purrify Affiliate Program.
          </p>
        </div>
      `;

      await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: application.email,
        subject: 'Update on Your Purrify Affiliate Application',
        html: rejectionEmailContent,
      });

      console.log('Rejection email sent to:', application.email);
    }

    return res.status(200).json({
      success: true,
      message: 'Application rejected',
    });
  } catch (error) {
    console.error('Failed to reject application:', error);
    return res.status(500).json({ error: 'Failed to reject application' });
  }
}
