import type { FreshnessProfile } from '@/generated/client/client';
import prisma from '@/lib/prisma';

export type FreshnessProfileSource = 'quiz' | 'chat';

export interface FreshnessProfilePayload {
  sessionId: string;
  locale?: string;
  source: FreshnessProfileSource;
  email?: string;
  catCount?: number;
  litterType?: string;
  homeType?: string;
  odorSeverity?: string;
  currentRemedy?: string;
  riskLevel?: string;
  score?: number;
  recommendedProductId?: string;
  recommendationReason?: string;
  confidence?: number;
  answers?: Record<string, string>;
}

export interface FreshnessSnapshot {
  sessionId: string;
  source: 'QUIZ' | 'CHAT';
  score: number | null;
  riskLevel: string | null;
  recommendedProductId: string | null;
  recommendationReason: string | null;
}

function toSourceEnum(source: FreshnessProfileSource): 'QUIZ' | 'CHAT' {
  return source === 'chat' ? 'CHAT' : 'QUIZ';
}

function buildFreshnessProfileUpdate(payload: FreshnessProfilePayload) {
  return {
    locale: payload.locale ?? 'en',
    source: toSourceEnum(payload.source),
    email: payload.email,
    catCount: payload.catCount,
    litterType: payload.litterType,
    homeType: payload.homeType,
    odorSeverity: payload.odorSeverity,
    currentRemedy: payload.currentRemedy,
    riskLevel: payload.riskLevel,
    score: payload.score,
    recommendedProductId: payload.recommendedProductId,
    recommendationReason: payload.recommendationReason,
    confidence: payload.confidence,
    answers: payload.answers,
    lastQuizAt: payload.source === 'quiz' ? new Date() : undefined,
    lastChatAt: payload.source === 'chat' ? new Date() : undefined,
    lastSeenAt: new Date(),
  };
}

export async function upsertFreshnessProfile(
  payload: FreshnessProfilePayload
): Promise<FreshnessProfile | null> {
  if (!prisma) {
    return null;
  }

  const updateData = buildFreshnessProfileUpdate(payload);

  return prisma.freshnessProfile.upsert({
    where: { sessionId: payload.sessionId },
    update: updateData,
    create: {
      sessionId: payload.sessionId,
      ...updateData,
    },
  });
}

export async function getFreshnessProfileBySessionId(
  sessionId: string
): Promise<FreshnessProfile | null> {
  if (!prisma) {
    return null;
  }

  return prisma.freshnessProfile.findUnique({
    where: { sessionId },
  });
}

export async function getFreshnessSnapshotBySessionId(
  sessionId: string
): Promise<FreshnessSnapshot | null> {
  const profile = await getFreshnessProfileBySessionId(sessionId);
  if (!profile) {
    return null;
  }

  return {
    sessionId: profile.sessionId,
    source: profile.source,
    score: profile.score,
    riskLevel: profile.riskLevel,
    recommendedProductId: profile.recommendedProductId,
    recommendationReason: profile.recommendationReason,
  };
}

export async function attachEmailToFreshnessProfile(
  sessionId: string,
  email: string
): Promise<FreshnessProfile | null> {
  if (!prisma) {
    return null;
  }

  return prisma.freshnessProfile.update({
    where: { sessionId },
    data: {
      email,
      lastSeenAt: new Date(),
    },
  }).catch(() => null);
}
