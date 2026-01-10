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

    // Find the affiliate by code
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        code: affiliateCode.toUpperCase(),
        status: 'ACTIVE',
      },
      select: {
        id: true,
        code: true,
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
      console.log(`Conversion already exists for order: ${orderId}`);
      return { success: true, conversionId: existingConversion.id };
    }

    // Calculate commission
    const commissionAmount = orderSubtotal * commissionRate;

    // Create the conversion record
    const conversion = await prisma.affiliateConversion.create({
      data: {
        affiliateId: affiliate.id,
        orderId,
        orderSubtotal,
        commissionRate,
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

    console.log(`Affiliate conversion recorded: ${conversion.id} for affiliate ${affiliateCode}, commission: $${commissionAmount.toFixed(2)}`);

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
