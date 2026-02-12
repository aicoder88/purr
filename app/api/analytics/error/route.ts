import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit-app';

/**
 * API endpoint for client-side error tracking
 * Receives error reports from the frontend and logs them
 */
async function handler(request: NextRequest) {
    try {
        const body = await request.json();

        // Input validation
        const message = body.message ? String(body.message).substring(0, 5000) : '';
        const stack = body.stack ? String(body.stack).substring(0, 10000) : '';
        const url = body.url ? String(body.url).substring(0, 2048) : '';

        // Log the error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('[Client Error]:', {
                message,
                stack,
                url,
                timestamp: new Date().toISOString(),
            });
        }

        // In production, you might want to send this to a logging service
        // like Sentry, LogRocket, or your own logging infrastructure

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error processing error report:', error);
        return NextResponse.json(
            { error: 'Failed to process error report' },
            { status: 500 }
        );
    }
}

export const POST = withRateLimit(RATE_LIMITS.CREATE, handler);
