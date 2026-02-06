import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for client-side error tracking
 * Receives error reports from the frontend and logs them
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Log the error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('[Client Error]:', {
                message: body.message,
                stack: body.stack,
                url: body.url,
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
