/**
 * Affiliate Tracking Utilities
 * Cookie helpers, click tracking, and conversion attribution
 */

import { createHash, randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

// Cookie configuration
const AFFILIATE_COOKIE_NAME = 'affiliate_ref';
const SESSION_COOKIE_NAME = 'affiliate_session';
const COOKIE_MAX_AGE = 90 * 24 * 60 * 60; // 90 days in seconds

interface AffiliateTrackingData {
  affiliateCode: string | null;
  sessionId: string | null;
}

/**
 * Hash an IP address for privacy-compliant storage
 */
export function hashIP(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

/**
 * Get the client IP from request headers
 */
export function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * Parse affiliate cookies from request
 */
export function getAffiliateTrackingData(req: NextApiRequest): AffiliateTrackingData {
  return {
    affiliateCode: req.cookies[AFFILIATE_COOKIE_NAME] || null,
    sessionId: req.cookies[SESSION_COOKIE_NAME] || null,
  };
}

/**
 * Set affiliate tracking cookies
 */
export function setAffiliateTrackingCookies(
  res: NextApiResponse,
  affiliateCode: string,
  sessionId?: string
): string {
  const newSessionId = sessionId || randomUUID();
  const isProduction = process.env.NODE_ENV === 'production';
  const secure = isProduction ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `${AFFILIATE_COOKIE_NAME}=${affiliateCode}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${secure}`,
    `${SESSION_COOKIE_NAME}=${newSessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${secure}`,
  ]);

  return newSessionId;
}

/**
 * Clear affiliate tracking cookies
 */
export function clearAffiliateTrackingCookies(res: NextApiResponse): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const secure = isProduction ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `${AFFILIATE_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
    `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
  ]);
}

/**
 * Record an affiliate click
 */
export async function recordAffiliateClick(
  affiliateId: string,
  sessionId: string,
  req: NextApiRequest
): Promise<string> {
  if (!prisma) {
    throw new Error('Database connection not established');
  }

  const ipHash = hashIP(getClientIP(req));
  const userAgent = req.headers['user-agent'] || null;
  const referrer = req.headers['referer'] || null;
  const landingPage = req.url || '/';

  const click = await prisma.affiliateClick.create({
    data: {
      affiliateId,
      sessionId,
      ipHash,
      userAgent,
      referrer,
      landingPage,
    },
  });

  // Update affiliate click count
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      totalClicks: { increment: 1 },
    },
  });

  return click.id;
}

/**
 * Create a conversion when an order is completed with affiliate attribution
 */
export async function createAffiliateConversion(
  affiliateCode: string,
  orderId: string,
  orderSubtotal: number,
  sessionId?: string
): Promise<{ conversionId: string; commissionAmount: number } | null> {
  if (!prisma) {
    return null;
  }

  // Find the affiliate
  const affiliate = await prisma.affiliate.findUnique({
    where: { code: affiliateCode },
    select: { id: true, status: true },
  });

  if (!affiliate || affiliate.status !== 'ACTIVE') {
    return null;
  }

  // Check if conversion already exists for this order
  const existingConversion = await prisma.affiliateConversion.findUnique({
    where: { orderId },
  });

  if (existingConversion) {
    return {
      conversionId: existingConversion.id,
      commissionAmount: existingConversion.commissionAmount,
    };
  }

  // Calculate commission (30%)
  const commissionRate = 0.30;
  const commissionAmount = Math.round(orderSubtotal * commissionRate * 100) / 100;

  // Create conversion
  const conversion = await prisma.affiliateConversion.create({
    data: {
      affiliateId: affiliate.id,
      orderId,
      orderSubtotal,
      commissionRate,
      commissionAmount,
      status: 'PENDING',
    },
  });

  // Update affiliate stats
  await prisma.affiliate.update({
    where: { id: affiliate.id },
    data: {
      totalConversions: { increment: 1 },
      pendingEarnings: { increment: commissionAmount },
    },
  });

  // If we have a session ID, update the click that led to this conversion
  if (sessionId) {
    await prisma.affiliateClick.updateMany({
      where: {
        affiliateId: affiliate.id,
        sessionId,
        convertedAt: null,
      },
      data: {
        convertedAt: new Date(),
        orderId,
      },
    });
  }

  return {
    conversionId: conversion.id,
    commissionAmount,
  };
}

/**
 * Get affiliate tracking data from Stripe checkout session metadata
 */
export function parseAffiliateMetadata(metadata: Record<string, string> | null): AffiliateTrackingData {
  if (!metadata) {
    return { affiliateCode: null, sessionId: null };
  }

  return {
    affiliateCode: metadata.affiliate_code || null,
    sessionId: metadata.affiliate_session || null,
  };
}

/**
 * Generate metadata object for Stripe checkout session
 */
export function generateAffiliateMetadata(
  affiliateCode: string | null,
  sessionId: string | null
): Record<string, string> {
  const metadata: Record<string, string> = {};

  if (affiliateCode) {
    metadata.affiliate_code = affiliateCode;
  }
  if (sessionId) {
    metadata.affiliate_session = sessionId;
  }

  return metadata;
}
