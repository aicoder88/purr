/**
 * Affiliate Code Generator
 * Generates unique affiliate codes in format: "FIRSTNAME-XXXX"
 */

import prisma from '@/lib/prisma';

/**
 * Generate a random alphanumeric string
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars: I, O, 0, 1
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Normalize name for code generation
 * - Take first name only
 * - Remove special characters
 * - Convert to uppercase
 * - Limit to 10 characters
 */
function normalizeName(name: string): string {
  const firstName = name.split(' ')[0] || 'AFFILIATE';
  const normalized = firstName
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 10);
  return normalized || 'AFFILIATE';
}

/**
 * Generate a unique affiliate code
 * Format: FIRSTNAME-XXXX (e.g., JOHN-A1B2)
 *
 * @param name - The affiliate's name
 * @returns A unique affiliate code
 */
export async function generateAffiliateCode(name: string): Promise<string> {
  if (!prisma) {
    throw new Error('Database connection not established');
  }

  const normalizedName = normalizeName(name);
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const suffix = generateRandomString(4);
    const code = `${normalizedName}-${suffix}`;

    // Check if code already exists
    const existing = await prisma.affiliate.findUnique({
      where: { code },
      select: { id: true },
    });

    if (!existing) {
      return code;
    }

    attempts++;
  }

  // Fallback: use timestamp-based suffix if we can't find a unique code
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  return `${normalizedName}-${timestamp}`;
}

/**
 * Validate an affiliate code format
 */
export function isValidAffiliateCodeFormat(code: string): boolean {
  // Format: NAME-XXXX where NAME is 1-10 uppercase letters, XXXX is 4 alphanumeric
  const pattern = /^[A-Z]{1,10}-[A-Z0-9]{4}$/;
  return pattern.test(code);
}

/**
 * Check if an affiliate code exists and is active
 */
export async function validateAffiliateCode(code: string): Promise<{
  valid: boolean;
  affiliateId?: string;
  affiliateName?: string;
}> {
  if (!prisma) {
    return { valid: false };
  }

  if (!isValidAffiliateCodeFormat(code)) {
    return { valid: false };
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { code },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });

  if (!affiliate || affiliate.status !== 'ACTIVE') {
    return { valid: false };
  }

  return {
    valid: true,
    affiliateId: affiliate.id,
    affiliateName: affiliate.name,
  };
}
