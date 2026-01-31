import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';

export const dynamic = 'force-dynamic';

/**
 * Generate a cryptographically secure CSRF token
 */
function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Set CSRF token in a secure cookie
 */
async function setCSRFToken(): Promise<string> {
  const token = generateCSRFToken();
  const cookieStore = await cookies();
  
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return token;
}

export async function GET() {
  const token = await setCSRFToken();
  
  return NextResponse.json(
    { csrfToken: token },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    }
  );
}
