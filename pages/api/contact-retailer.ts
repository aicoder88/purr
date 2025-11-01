import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Define validation schema for retailer contact form
const retailerContactSchema = z.object({
  businessName: z.string().min(2).max(100).trim(),
  contactName: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().min(10).max(20).trim().optional(),
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

    // TODO: Configure email service (SendGrid, AWS SES, or Mailgun)
    // For now, log the retailer contact submission
    console.log('Retailer contact form submission:', {
      businessName: data.businessName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      businessType: data.businessType,
      locations: data.locations,
      timestamp: new Date().toISOString(),
    });

    // In production, you would send an email here:
    // await sendEmail({
    //   to: process.env.RETAILER_CONTACT_EMAIL,
    //   subject: `Retailer Partnership Application from ${data.businessName}`,
    //   body: formatRetailerEmail(data)
    // });

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
