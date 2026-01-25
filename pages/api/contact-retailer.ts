import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '../../src/lib/resend-config';

// Define validation schema for retailer contact form
const retailerContactSchema = z.object({
  businessName: z.string().min(2).max(100).trim(),
  contactName: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().max(20).trim().optional()
    .transform(val => val === '' ? undefined : val)
    .refine(val => val === undefined || val.length >= 10, {
      message: 'Phone number must be at least 10 characters'
    }),
  position: z.string().min(2).max(100).trim().optional(),
  businessType: z.string().min(2).max(100).trim().optional(),
  locations: z.string().max(50).trim().optional(),
  currentProducts: z.string().max(500).trim().optional(),
  message: z.string().min(10).max(2000).trim(),
});

type ResponseData = {
  success: boolean;
  message: string;
};

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Stricter for retailer forms
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

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
  const clientIp = (req.headers['x-forwarded-for'] as string) || 'unknown';
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
    const validationResult = retailerContactSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
      });
    }

    const data = validationResult.data;

    console.log('Processing retailer contact form submission:', {
      businessName: data.businessName,
      contactName: data.contactName,
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    // Send email via Resend
    if (isResendConfigured()) {
      const resend = new Resend(RESEND_CONFIG.apiKey);

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #5B2EFF; margin-bottom: 20px;">New Retailer Partnership Application</h2>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Business Information</h3>
            <p style="margin: 5px 0;"><strong>Business Name:</strong> ${data.businessName}</p>
            <p style="margin: 5px 0;"><strong>Contact Name:</strong> ${data.contactName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #5B2EFF;">${data.email}</a></p>
            ${data.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.position ? `<p style="margin: 5px 0;"><strong>Position:</strong> ${data.position}</p>` : ''}
            ${data.businessType ? `<p style="margin: 5px 0;"><strong>Business Type:</strong> ${data.businessType}</p>` : ''}
            ${data.locations ? `<p style="margin: 5px 0;"><strong>Locations:</strong> ${data.locations}</p>` : ''}
          </div>

          ${data.currentProducts ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Current Products</h3>
            <p style="white-space: pre-wrap;">${data.currentProducts}</p>
          </div>
          ` : ''}

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #999; font-size: 12px;">
            <p>Received: ${new Date().toLocaleString()}</p>
            <p>This email was sent from the Purrify Retailer Contact Form</p>
          </div>
        </div>
      `;

      const { error } = await resend.emails.send({
        from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
        to: RESEND_CONFIG.toEmail,
        replyTo: data.email,
        subject: `Retailer Partnership Application: ${data.businessName}`,
        html: emailHtml,
        text: `
New Retailer Partnership Application

Business Information:
- Business Name: ${data.businessName}
- Contact Name: ${data.contactName}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.position ? `- Position: ${data.position}` : ''}
${data.businessType ? `- Business Type: ${data.businessType}` : ''}
${data.locations ? `- Locations: ${data.locations}` : ''}

${data.currentProducts ? `Current Products:\n${data.currentProducts}\n` : ''}

Message:
${data.message}

---
Received: ${new Date().toLocaleString()}
        `.trim(),
      });

      if (error) {
        console.error('Failed to send retailer contact email:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to send your message. Please try again or contact us directly.',
        });
      }

      console.log('Retailer contact email sent successfully');
    } else {
      console.warn('Resend not configured, retailer contact form logged but not emailed');
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest! We will contact you within 1-2 business days.',
    });
  } catch (error) {
    console.error(
      'Error processing retailer contact form:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again.',
    });
  }
}
