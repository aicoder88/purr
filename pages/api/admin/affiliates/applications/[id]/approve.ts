import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateAffiliateCode } from '@/lib/affiliate/code-generator';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';

// Generate a random password
function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

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

    // Check if affiliate already exists with this email
    const existingAffiliate = await prisma.affiliate.findUnique({
      where: { email: application.email },
    });

    if (existingAffiliate) {
      return res.status(400).json({ error: 'An affiliate with this email already exists' });
    }

    // Generate affiliate code and password
    const code = await generateAffiliateCode(application.name);
    const tempPassword = generatePassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    // Create affiliate and update application in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the affiliate
      const affiliate = await tx.affiliate.create({
        data: {
          code,
          name: application.name,
          email: application.email,
          passwordHash,
          website: application.website,
          status: 'ACTIVE',
          applicationId: application.id,
        },
      });

      // Update the application status
      await tx.affiliateApplication.update({
        where: { id: application.id },
        data: {
          status: 'APPROVED',
          reviewedAt: new Date(),
          reviewedBy: session.user?.email || 'admin',
        },
      });

      return affiliate;
    });

    // Send welcome email with credentials
    if (isResendConfigured()) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/login`;
      const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/affiliate/dashboard`;

      const welcomeEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Welcome to the Purrify Affiliate Program!</h2>

          <p>Hi ${application.name},</p>

          <p>Great news! Your application to become a Purrify affiliate has been <strong>approved</strong>.</p>

          <h3 style="color: #1a1a1a;">Your Affiliate Details:</h3>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 8px 0;"><strong>Affiliate Code:</strong> ${code}</p>
            <p style="margin: 8px 0;"><strong>Login Email:</strong> ${application.email}</p>
            <p style="margin: 8px 0;"><strong>Temporary Password:</strong> ${tempPassword}</p>
          </div>

          <p style="color: #dc2626;"><strong>Important:</strong> Please change your password after your first login.</p>

          <h3 style="color: #1a1a1a;">Getting Started:</h3>
          <ol style="line-height: 1.8;">
            <li><a href="${loginUrl}" style="color: #0d9488;">Log in to your affiliate dashboard</a></li>
            <li>Change your temporary password</li>
            <li>Get your unique referral link</li>
            <li>Start sharing and earning commissions!</li>
          </ol>

          <h3 style="color: #1a1a1a;">Commission Structure:</h3>
          <ul style="line-height: 1.8;">
            <li><strong>Starter:</strong> 20% commission</li>
            <li><strong>Active (3+ sales):</strong> 25% commission</li>
            <li><strong>Partner (5+/mo for 2 months):</strong> 30% commission</li>
          </ul>

          <p>Your referral link format: <code style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${process.env.NEXT_PUBLIC_SITE_URL}?ref=${code}</code></p>

          <div style="margin: 24px 0;">
            <a href="${dashboardUrl}" style="display: inline-block; background-color: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Go to Your Dashboard
            </a>
          </div>

          <p>If you have any questions, just reply to this email. We're here to help!</p>

          <p>Best regards,<br/>The Purrify Team</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #666; font-size: 12px;">
            You received this email because you were approved for the Purrify Affiliate Program.
          </p>
        </div>
      `;

      await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: application.email,
        subject: 'Welcome to the Purrify Affiliate Program! Your Account is Ready',
        html: welcomeEmailContent,
      });

      console.log('Welcome email sent to:', application.email);
    }

    return res.status(200).json({
      success: true,
      affiliate: {
        id: result.id,
        code: result.code,
        email: result.email,
      },
    });
  } catch (error) {
    console.error('Failed to approve application:', error);
    return res.status(500).json({ error: 'Failed to approve application' });
  }
}
