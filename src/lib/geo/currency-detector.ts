import type { NextApiRequest } from 'next';
import type { IncomingMessage } from 'http';

export type Currency = 'CAD' | 'USD';

/**
 * Detects currency based on Vercel's x-vercel-ip-country header
 * US visitors get USD, all others get CAD (including fallback)
 *
 * @param req - Next.js API request or HTTP incoming message
 * @returns 'USD' for US visitors, 'CAD' for everyone else
 */
export function detectCurrencyFromRequest(req?: NextApiRequest | IncomingMessage): Currency {
  if (!req) return 'CAD';

  const country = req.headers['x-vercel-ip-country'] as string | undefined;
  return country === 'US' ? 'USD' : 'CAD';
}

/**
 * Returns currency symbol (always $ for both CAD and USD)
 * Never show currency codes per design requirements
 *
 * @returns '$' symbol
 */
export function getCurrencySymbol(): string {
  return '$';
}
