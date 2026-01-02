/**
 * API: Email Newsletter Subscription
 *
 * Handles email subscriptions from various sources:
 * - Exit-intent popup
 * - Footer newsletter form
 * - Checkout email capture
 *
 * Stores in EmailSubscriber table and can trigger welcome email.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';
import prisma from '@/lib/prisma';

interface SubscribeRequest {
  email: string;
  source?: string; // exit-intent, footer, checkout, etc.
  locale?: string;
}

interface SubscribeResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  const { email, source = 'unknown', locale = 'en' } = req.body as SubscribeRequest;

  // Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address',
    });
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();

  // Check if prisma is available
  if (!prisma) {
    return res.status(500).json({
      success: false,
      error: 'Database not configured',
    });
  }

  try {
    // Check if already subscribed
    const existing = await prisma.emailSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      // If previously unsubscribed, reactivate
      if (existing.status === 'UNSUBSCRIBED') {
        await prisma.emailSubscriber.update({
          where: { email: normalizedEmail },
          data: {
            status: 'ACTIVE',
            source: source, // Update source
            locale: locale,
            unsubscribedAt: null,
          },
        });

        return res.status(200).json({
          success: true,
          message: 'Welcome back! You have been resubscribed.',
        });
      }

      // Already active subscriber
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed!',
      });
    }

    // Create new subscriber
    await prisma.emailSubscriber.create({
      data: {
        email: normalizedEmail,
        source,
        locale,
        status: 'ACTIVE',
        welcomeEmailSent: false,
      },
    });

    // Log successful subscription
    Sentry.addBreadcrumb({
      category: 'subscription',
      message: `New email subscriber from ${source}`,
      level: 'info',
      data: { source, locale },
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Check your email for your discount code.',
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Subscription error:', error);

    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again.',
    });
  }
}
