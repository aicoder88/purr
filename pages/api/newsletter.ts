import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Define validation schema with Zod
const newsletterSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});



interface ResponseData {
  success: boolean;
  message: string;
}

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;
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
    const validationResult = newsletterSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    const { email } = validationResult.data;

    // Log the newsletter subscription for demonstration purposes
    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString(),
      ip: clientIp
    });

    // In a real implementation, you would:
    // 1. Check if the email is already subscribed
    // 2. Add the email to your newsletter service (Mailchimp, ConvertKit, etc.)
    // 3. Send a welcome email
    // 4. Store the subscription in your database

    // For now, we'll just log it and return success
    // You can integrate with services like:
    // - Mailchimp API
    // - ConvertKit API
    // - SendGrid API
    // - Your own email service

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your subscription'
    });
  }
} 