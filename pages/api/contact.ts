import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import nodemailer from 'nodemailer';

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

// Debug log SMTP config on startup
console.log('[Contact API] SMTP Configuration Status:', {
  userSet: !!process.env.SMTP_USER,
  passSet: !!process.env.SMTP_PASS,
  hostSet: !!process.env.SMTP_HOST,
  portSet: !!process.env.SMTP_PORT,
});

/**
 * Send email via Nodemailer SMTP
 */
async function sendEmailViaSMTP(
  name: string,
  email: string,
  message: string,
  subject: string
): Promise<{ success: boolean; message: string }> {
  // Check for required SMTP config
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_HOST) {
    console.error('SMTP not properly configured. Missing SMTP_USER, SMTP_PASS, or SMTP_HOST.');
    return {
      success: false,
      message: 'Email service not available. Please contact us directly at support@purrify.ca'
    };
  }

  try {
    console.log('Sending email via SMTP...', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      userSet: !!process.env.SMTP_USER,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@purrify.ca',
      to: 'support@purrify.ca',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <pre>${message}</pre>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Date: ${new Date().toLocaleString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
    });

    return {
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Error sending email via SMTP:', error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'Failed to send email. Please try again later.'
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

    console.log('Processing contact form submission:', {
      name,
      email,
      messageLength: message.length,
      timestamp: new Date().toISOString()
    });

    // Send email via SMTP
    const emailResult = await sendEmailViaSMTP(
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