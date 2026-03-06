import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getFreshnessProfileBySessionId,
  upsertFreshnessProfile,
} from '@/lib/freshness-profile';
import { FRESHNESS_SESSION_COOKIE } from '@/lib/freshness-session';

const FRESHNESS_PROFILE_GET_CACHE_CONTROL = 'private, max-age=300, stale-while-revalidate=600';

const sessionIdSchema = z
  .string()
  .trim()
  .min(8)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/);

const freshnessProfileSchema = z.object({
  sessionId: sessionIdSchema,
  locale: z.enum(['en', 'fr']).optional(),
  source: z.enum(['quiz', 'chat']),
  email: z.string().email().optional(),
  catCount: z.number().int().min(1).max(20).optional(),
  litterType: z.string().trim().min(1).max(64).optional(),
  homeType: z.string().trim().min(1).max(64).optional(),
  odorSeverity: z.string().trim().min(1).max(64).optional(),
  currentRemedy: z.string().trim().min(1).max(64).optional(),
  riskLevel: z.string().trim().min(1).max(32).optional(),
  score: z.number().int().min(0).max(100).optional(),
  recommendedProductId: z.string().trim().min(1).max(64).optional(),
  recommendationReason: z.string().trim().min(1).max(280).optional(),
  confidence: z.number().int().min(0).max(100).optional(),
  answers: z.record(z.string(), z.string()).optional(),
});

function getSessionIdFromRequest(request: NextRequest): string | null {
  const querySessionId = request.nextUrl.searchParams.get('sessionId');
  if (querySessionId) {
    return querySessionId;
  }

  return request.cookies.get(FRESHNESS_SESSION_COOKIE)?.value ?? null;
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    if (!sessionId) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    const parsedSessionId = sessionIdSchema.safeParse(sessionId);
    if (!parsedSessionId.success) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    const profile = await getFreshnessProfileBySessionId(parsedSessionId.data);
    return NextResponse.json(
      { profile },
      {
        status: 200,
        headers: {
          'Cache-Control': FRESHNESS_PROFILE_GET_CACHE_CONTROL,
        },
      }
    );
  } catch {
    return NextResponse.json({ profile: null }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = freshnessProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid freshness profile payload.', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const profile = await upsertFreshnessProfile(parsed.data);
    return NextResponse.json({ profile }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to save freshness profile.' },
      { status: 500 }
    );
  }
}
