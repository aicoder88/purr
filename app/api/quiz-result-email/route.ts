import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resend } from '@/lib/resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { QuizResultEmailHTML, getQuizResultEmailSubject } from '@/emails/quiz-result';
import { PRODUCTS } from '@/lib/constants';
import { localizePath } from '@/lib/i18n/locale-path';
import { withRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { upsertEmailSubscriber } from '@/lib/email-subscribers';
import { upsertFreshnessProfile } from '@/lib/freshness-profile';
import { FRESHNESS_SESSION_COOKIE } from '@/lib/freshness-session';

const quizResultEmailSchema = z.object({
  email: z.string().email(),
  locale: z.enum(['en', 'fr']).default('en'),
  sessionId: z
    .string()
    .trim()
    .min(8)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
  score: z.number().int().min(0).max(100),
  riskLevel: z.string().trim().min(1).max(32),
  catCount: z.number().int().min(1).max(20).optional(),
  homeType: z.string().trim().min(1).max(64).optional(),
  odorSeverity: z.string().trim().min(1).max(64).optional(),
  currentRemedy: z.string().trim().min(1).max(64).optional(),
  recommendedProductId: z.string().trim().min(1).max(64),
  recommendationReason: z.string().trim().min(1).max(280).optional(),
});

async function handler(request: NextRequest) {
  if (!isResendConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Email service not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const parsed = quizResultEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request payload', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const {
      email,
      locale,
      score,
      riskLevel,
      catCount,
      homeType,
      odorSeverity,
      currentRemedy,
      recommendedProductId,
      recommendationReason,
    } = parsed.data;
    const sessionId = parsed.data.sessionId ?? request.cookies.get(FRESHNESS_SESSION_COOKIE)?.value;
    const normalizedEmail = email.toLowerCase().trim();

    if (sessionId) {
      await upsertFreshnessProfile({
        sessionId,
        locale,
        source: 'quiz',
        email: normalizedEmail,
        catCount,
        homeType,
        odorSeverity,
        currentRemedy,
        score,
        riskLevel,
        recommendedProductId,
        recommendationReason,
      });
    }

    await upsertEmailSubscriber({
      email: normalizedEmail,
      source: 'quiz-result',
      locale,
      sessionId,
    });

    const product = PRODUCTS.find((entry) => entry.id === recommendedProductId);
    const productName = product?.name ?? 'Purrify';
    const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca'}${localizePath(
      recommendedProductId === 'purrify-12g' ? '/products/trial-size' : '/products',
      locale
    )}`;

    const { error } = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: normalizedEmail,
      subject: getQuizResultEmailSubject(locale),
      html: QuizResultEmailHTML({
        customerEmail: normalizedEmail,
        locale,
        score,
        riskLevel,
        catCount,
        homeType,
        odorSeverity,
        currentRemedy,
        recommendedProductName: productName,
        recommendationReason,
        productUrl,
      }),
      tags: [
        { name: 'type', value: 'quiz-result' },
        { name: 'locale', value: locale },
        ...(sessionId ? [{ name: 'session_id', value: sessionId }] : []),
      ],
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send quiz result email',
      },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(RATE_LIMITS.CREATE, handler);
