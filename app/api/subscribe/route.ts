import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';

interface SubscribeRequest {
  email: string;
  source?: string;
  locale?: string;
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handler(request: NextRequest) {
  try {
    const body = await request.json() as SubscribeRequest;
    const { email, source = 'unknown', locale = 'en' } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if prisma is available
    if (!prisma) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

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
            source: source,
            locale: locale,
            unsubscribedAt: null,
          },
        });

        return NextResponse.json(
          { success: true, message: 'Welcome back! You have been resubscribed.' },
          { status: 200 }
        );
      }

      // Already active subscriber
      return NextResponse.json(
        { success: true, message: 'You are already subscribed!' },
        { status: 200 }
      );
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
    
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed! Check your email for your discount code.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);

    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.CREATE, handler);
