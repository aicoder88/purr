/**
 * Affiliate Conversion Processing
 *
 * Handles recording conversions when orders are completed.
 * Uses tier-based commission rates.
 */

import prisma from '@/lib/prisma';
import { getCommissionRate, onNewSale, COMMISSION_RATES } from './tiers';

// Default commission rate for STARTER tier
const DEFAULT_COMMISSION_RATE = COMMISSION_RATES.STARTER;

interface AffiliateConversionData {
  affiliateCode: string;
  affiliateSessionId: string;
  orderId: string;
  orderSubtotal: number; // In dollars (not cents)
  commissionRate?: number; // If not provided, uses affiliate's tier rate
}

interface ConversionResult {
  success: boolean;
  conversionId?: string;
  error?: string;
}

/**
 * Record an affiliate conversion when an order is completed
 */
export async function recordAffiliateConversion(
  data: AffiliateConversionData
): Promise<ConversionResult> {
  const { affiliateCode, affiliateSessionId, orderId, orderSubtotal, commissionRate = DEFAULT_COMMISSION_RATE } = data;

  try {
    // Validate we have a database connection
    if (!prisma) {
      return { success: false, error: 'Database connection not established' };
    }

    // Find the affiliate by code (include tier info for commission rate)
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        code: affiliateCode.toUpperCase(),
        status: 'ACTIVE',
      },
      select: {
        id: true,
        code: true,
        tier: true,
        commissionRate: true,
      },
    });

    if (!affiliate) {
      console.warn(`Affiliate not found or inactive for conversion: ${affiliateCode}`);
      return { success: false, error: 'Affiliate not found or inactive' };
    }

    // Check if conversion already exists for this order
    const existingConversion = await prisma.affiliateConversion.findUnique({
      where: { orderId },
    });

    if (existingConversion) {
      return { success: true, conversionId: existingConversion.id };
    }

    // Use affiliate's tier-based commission rate if not explicitly provided
    const effectiveCommissionRate = commissionRate || affiliate.commissionRate || getCommissionRate(affiliate.tier);

    // Calculate commission using the tier-based rate
    const commissionAmount = orderSubtotal * effectiveCommissionRate;

    // Create the conversion record
    const conversion = await prisma.affiliateConversion.create({
      data: {
        affiliateId: affiliate.id,
        orderId,
        orderSubtotal,
        commissionRate: effectiveCommissionRate,
        commissionAmount,
        status: 'PENDING',
        purchasedAt: new Date(),
      },
    });

    // Update the click record if we can find it
    await prisma.affiliateClick.updateMany({
      where: {
        affiliateId: affiliate.id,
        sessionId: affiliateSessionId,
        convertedAt: null,
      },
      data: {
        convertedAt: new Date(),
        orderId,
      },
    });

    // Track this sale for monthly metrics (lazy tier system)
    await onNewSale(affiliate.id);

    // Affiliate conversion recorded silently

    return { success: true, conversionId: conversion.id };
  } catch (error) {
    console.error('Error recording affiliate conversion:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Parse affiliate metadata from Stripe session
 * Expects format: "CODE:SESSION_ID"
 */
export function parseAffiliateMetadata(metadata: string | undefined): { code: string; sessionId: string } | null {
  if (!metadata) return null;

  try {
    const [code, sessionId] = metadata.split(':');
    if (code && sessionId) {
      return { code, sessionId };
    }
  } catch {
    return null;
  }

  return null;
}
