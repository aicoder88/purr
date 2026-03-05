import prisma from '@/lib/prisma';
import {
  attachEmailToFreshnessProfile,
  getFreshnessSnapshotBySessionId,
} from '@/lib/freshness-profile';

export async function upsertEmailSubscriber({
  email,
  source,
  locale = 'en',
  sessionId,
}: {
  email: string;
  source: string;
  locale?: string;
  sessionId?: string | null;
}) {
  if (!prisma) {
    throw new Error('Database not configured');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const freshness = sessionId
    ? await getFreshnessSnapshotBySessionId(sessionId)
    : null;

  if (sessionId) {
    await attachEmailToFreshnessProfile(sessionId, normalizedEmail);
  }

  const freshnessFields = freshness
    ? {
        freshnessSessionId: freshness.sessionId,
        freshnessSource: freshness.source,
        freshnessScore: freshness.score,
        freshnessRiskLevel: freshness.riskLevel,
        freshnessRecommendedProductId: freshness.recommendedProductId,
      }
    : {};

  const existing = await prisma.emailSubscriber.findUnique({
    where: { email: normalizedEmail },
  });

  if (existing) {
    if (existing.status === 'UNSUBSCRIBED') {
      return prisma.emailSubscriber.update({
        where: { email: normalizedEmail },
        data: {
          status: 'ACTIVE',
          source,
          locale,
          unsubscribedAt: null,
          ...freshnessFields,
        },
      });
    }

    return prisma.emailSubscriber.update({
      where: { email: normalizedEmail },
      data: {
        source,
        locale,
        ...freshnessFields,
      },
    });
  }

  return prisma.emailSubscriber.create({
    data: {
      email: normalizedEmail,
      source,
      locale,
      status: 'ACTIVE',
      welcomeEmailSent: false,
      ...freshnessFields,
    },
  });
}
