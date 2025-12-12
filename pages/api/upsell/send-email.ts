import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '../../../src/lib/resend-config';
import { UpsellDeclinedEmailHTML, getUpsellDeclinedEmailSubject } from '../../../src/emails/upsell-declined';
import { UpsellExpiredEmailHTML, getUpsellExpiredEmailSubject } from '../../../src/emails/upsell-expired';

type EmailType = 'declined' | 'expired';

interface SendUpsellEmailRequest {
  email: string;
  type: EmailType;
  customerName?: string;
  locale?: string;
  sessionId?: string;
}

interface SendUpsellEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  emailId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendUpsellEmailResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  // Verify Resend is configured
  if (!isResendConfigured()) {
    console.error('[Upsell Email] Resend is not configured');
    return res.status(500).json({
      success: false,
      error: 'Email service not configured'
    });
  }

  try {
    const { email, type, customerName, locale = 'en', sessionId }: SendUpsellEmailRequest = req.body;

    // Validate required fields
    if (!email || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email and type'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate type
    if (!['declined', 'expired'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email type. Must be "declined" or "expired"'
      });
    }

    // Initialize Resend
    const resend = new Resend(RESEND_CONFIG.apiKey);

    // Get email content based on type
    let htmlContent: string;
    let subject: string;

    if (type === 'declined') {
      htmlContent = UpsellDeclinedEmailHTML({ customerName, locale });
      subject = getUpsellDeclinedEmailSubject(locale);
    } else {
      htmlContent = UpsellExpiredEmailHTML({ customerName, locale });
      subject = getUpsellExpiredEmailSubject(locale);
    }

    // Send email
    const result = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: email,
      subject,
      html: htmlContent,
      tags: [
        { name: 'type', value: 'upsell' },
        { name: 'email_type', value: type },
        { name: 'locale', value: locale },
        ...(sessionId ? [{ name: 'session_id', value: sessionId }] : [])
      ]
    });

    // Check for errors
    if (result.error) {
      console.error(`[Upsell Email] Error sending ${type} email:`, result.error);
      return res.status(500).json({
        success: false,
        error: result.error.message || 'Failed to send email'
      });
    }

    // Log success
    console.log(`[Upsell Email] Sent ${type} email to ${email}`, {
      emailId: result.data?.id,
      locale,
      customerName
    });

    return res.status(200).json({
      success: true,
      message: `${type} email sent successfully`,
      emailId: result.data?.id
    });

  } catch (error) {
    console.error('[Upsell Email] Error sending email:', error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    });
  }
}
