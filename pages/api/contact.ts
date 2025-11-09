import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '../../src/lib/resend-config';

// Define validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().trim().toLowerCase(),
  message: z.string().min(10).max(1000).trim(),
});

type ResponseData = {
  success: boolean;
  message: string;
};

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Send email via Resend API
 */
async function sendEmailViaResend(
  name: string,
  email: string,
  message: string,
  subject: string
): Promise<{ success: boolean; message: string }> {
  // Check for required config
  if (!isResendConfigured()) {
    console.error('Resend not properly configured. Missing API key.');
    console.error('Config:', {
      hasApiKey: !!RESEND_CONFIG.apiKey,
      apiKeyPrefix: RESEND_CONFIG.apiKey ? RESEND_CONFIG.apiKey.substring(0, 8) + '...' : 'NOT SET',
    });
    return {
      success: false,
      message: 'Email service not available. Please contact us directly at support@purrify.ca'
    };
  }

  try {
    const resend = new Resend(RESEND_CONFIG.apiKey);

    console.log('Sending email via Resend:', {
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: RESEND_CONFIG.toEmail,
      replyTo: email,
      subject,
    });

    const { data, error } = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: RESEND_CONFIG.toEmail,
      replyTo: email,
      subject: subject || `Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #FF3131; margin-bottom: 20px;">New Contact Form Submission</h2>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF3131;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
            <p>This email was sent from the Purrify contact form</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
This email was sent from the Purrify contact form
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }

    console.log('Email sent successfully via Resend:', data);
    return {
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Error sending email via Resend:', error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again or contact us directly at support@purrify.ca'
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Apply rate limiting
  const clientIp = req.headers['x-forwarded-for'] as string || 'unknown';
  const now = Date.now();
  const ipData = ipRequestCounts.get(clientIp);

  if (ipData) {
    if (now < ipData.resetTime) {
      if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
        });
      }
      ipData.count += 1;
    } else {
      ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  try {
    // Validate form data with Zod
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
      });
    }

    const { name, email, message } = validationResult.data;

    // Generate subject line for the contact form email
    const subject = `Contact Form Submission from ${name}`;

    console.log('Processing contact form submission:', {
      name,
      email,
      messageLength: message.length,
      subject,
      timestamp: new Date().toISOString()
    });

    // Send email via Resend
    const emailResult = await sendEmailViaResend(
      name,
      email,
      message,
      subject
    );

    console.log('Email result:', emailResult);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again or contact us directly at support@purrify.ca'
      });
    }

    // Log successful submission
    console.log('Contact form submitted successfully:', {
      name,
      email,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again or contact us directly at support@purrify.ca'
    });
  }
}