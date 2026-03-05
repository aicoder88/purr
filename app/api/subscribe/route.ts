import { NextRequest, NextResponse } from 'next/server';
import { upsertEmailSubscriber } from '@/lib/email-subscribers';
import { FRESHNESS_SESSION_COOKIE } from '@/lib/freshness-session';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';

interface SubscribeRequest {
  email: string;
  source?: string;
  locale?: string;
  sessionId?: string;
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handler(request: NextRequest) {
  try {
    const body = await request.json() as SubscribeRequest;
    const { email, source = 'unknown', locale = 'en', sessionId } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const sessionIdFromCookie = request.cookies.get(FRESHNESS_SESSION_COOKIE)?.value;
    await upsertEmailSubscriber({
      email,
      source,
      locale,
      sessionId: sessionId ?? sessionIdFromCookie,
    });

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
