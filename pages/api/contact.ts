import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { EMAILJS_CONFIG } from '../../src/lib/emailjs-config';

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
  // Check for required config
  if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId) {
    console.error('EmailJS not properly configured. Missing publicKey or serviceId.');
    console.error('Config:', {
      hasPublicKey: !!EMAILJS_CONFIG.publicKey,
      hasServiceId: !!EMAILJS_CONFIG.serviceId,
      hasTemplateId: !!EMAILJS_CONFIG.templateId,
      hasPrivateKey: !!EMAILJS_CONFIG.privateKey,
    });
    return {
      success: false,
      message: 'Email service not available. Please contact us directly at support@purrify.ca'
    };
  }

  try {
    console.log('Sending email via EmailJS with config:', {
      serviceId: EMAILJS_CONFIG.serviceId,
      hasTemplate: !!EMAILJS_CONFIG.templateId,
      publicKeyExists: !!EMAILJS_CONFIG.publicKey,
    });

    // If template ID is configured, use template-based sending
    if (EMAILJS_CONFIG.templateId) {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          accessToken: EMAILJS_CONFIG.privateKey || undefined,
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

      console.log('EmailJS Template Send Response:', {
        status: response.status,
        ok: response.ok,
        statusCode: data.status,
      });

      if (response.ok && (data.status === 200 || data.status === 'success')) {
        console.log('Email sent successfully via EmailJS template');
        return {
          success: true,
          message: 'Message sent successfully!'
        };
      }
    }

    // Fallback: Use sendMail endpoint which doesn't require template
    console.log('Using EmailJS sendMail endpoint (no template required)');

    const mailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        user_id: EMAILJS_CONFIG.publicKey,
        accessToken: EMAILJS_CONFIG.privateKey || undefined,
        template_params: {
          to_email: 'support@purrify.ca',
          to_name: 'Purrify Support',
          from_name: name,
          from_email: email,
          subject: subject || 'Contact Form Submission',
          message: message,
          date: new Date().toLocaleString(),
          reply_to: email,
        },
      }),
    });

    console.log('EmailJS sendMail Response:', {
      status: mailResponse.status,
      ok: mailResponse.ok,
    });

    const mailText = await mailResponse.text();
    console.log('EmailJS sendMail Response Body:', mailText);

    if (mailResponse.ok) {
      console.log('Email sent successfully via EmailJS sendMail');
      return {
        success: true,
        message: 'Message sent successfully!'
      };
    } else {
      console.error('EmailJS sendMail error:', {
        status: mailResponse.status,
        body: mailText,
      });

      // Try one more fallback with the original email/send endpoint
      console.log('Trying email/send endpoint as final fallback');
      try {
        const fallbackResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: EMAILJS_CONFIG.serviceId,
            user_id: EMAILJS_CONFIG.publicKey,
            template_id: 'default',
            template_params: {
              to_email: 'support@purrify.ca',
              to_name: 'Purrify Support',
              from_name: name,
              from_email: email,
              subject: subject || 'Contact Form Submission',
              message: message,
              date: new Date().toLocaleString(),
              reply_to: email,
            },
          }),
        });

        const fallbackText = await fallbackResponse.text();
        console.log('Email/send fallback response:', {
          status: fallbackResponse.status,
          body: fallbackText,
        });

        if (fallbackResponse.ok) {
          return {
            success: true,
            message: 'Message sent successfully!'
          };
        }
      } catch (fallbackError) {
        console.error('Fallback endpoint error:', fallbackError);
      }

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

    // Generate subject line for the contact form email
    const subject = `Contact Form Submission from ${name}`;

    console.log('Processing contact form submission:', {
      name,
      email,
      messageLength: message.length,
      subject,
      timestamp: new Date().toISOString()
    });

    // Send email via EmailJS
    const emailResult = await sendEmailViaEmailJS(
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