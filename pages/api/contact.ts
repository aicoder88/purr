import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { EMAILJS_CONFIG, isEmailJSServerConfigured } from '../../src/lib/emailjs-config';

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
 * Send email via EmailJS API
 */
async function sendEmailViaEmailJS(
  name: string,
  email: string,
  message: string,
  subject: string
): Promise<{ success: boolean; message: string }> {
  // Log configuration status for debugging
  console.log('EmailJS Config Status:', {
    hasPublicKey: !!EMAILJS_CONFIG.publicKey,
    hasServiceId: !!EMAILJS_CONFIG.serviceId,
    hasTemplateId: !!EMAILJS_CONFIG.templateId,
    hasPrivateKey: !!EMAILJS_CONFIG.privateKey,
    publicKeyLength: EMAILJS_CONFIG.publicKey?.length || 0,
    serviceIdLength: EMAILJS_CONFIG.serviceId?.length || 0,
    templateIdLength: EMAILJS_CONFIG.templateId?.length || 0,
    privateKeyLength: EMAILJS_CONFIG.privateKey?.length || 0,
  });

  if (!isEmailJSServerConfigured()) {
    console.error('EmailJS not properly configured. Missing credentials.');
    console.error('Missing:', {
      publicKey: !EMAILJS_CONFIG.publicKey,
      serviceId: !EMAILJS_CONFIG.serviceId,
      templateId: !EMAILJS_CONFIG.templateId,
      privateKey: !EMAILJS_CONFIG.privateKey,
    });
    return {
      success: false,
      message: 'Email service not available. Please contact us directly at support@purrify.ca'
    };
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.templateId,
        user_id: EMAILJS_CONFIG.publicKey,
        accessToken: EMAILJS_CONFIG.privateKey,
        template_params: {
          to_email: 'support@purrify.ca',
          from_name: name,
          from_email: email,
          subject: subject || 'Contact Form Submission',
          message: message,
          date: new Date().toLocaleString(),
          reply_to: email,
        },
      }),
    });

    const data = await response.json();

    console.log('EmailJS API Response:', {
      status: response.status,
      ok: response.ok,
      data: data,
    });

    if (response.ok && data.status === 200) {
      console.log('Email sent successfully via EmailJS');
      return {
        success: true,
        message: 'Message sent successfully!'
      };
    } else {
      console.error('EmailJS API error:', {
        responseStatus: response.status,
        responseOk: response.ok,
        dataStatus: data.status,
        errorMessage: data.message || data.error,
      });
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }
  } catch (error) {
    console.error('Error sending email via EmailJS:', error instanceof Error ? error.message : 'Unknown error');
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

    // Send email via EmailJS
    const emailResult = await sendEmailViaEmailJS(
      name,
      email,
      message,
      'New Contact Form Submission from Purrify'
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: emailResult.message
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