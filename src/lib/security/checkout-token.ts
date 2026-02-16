import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Checkout token utility for order ownership verification.
 * 
 * This provides stateless order verification using HMAC signatures.
 * The token proves the caller created the order without requiring a DB lookup.
 * 
 * Why HMAC instead of DB column:
 * - No schema migration needed
 * - Stateless verification (derived from orderId + server secret)
 * - Timing-safe comparison prevents timing attacks
 * - Works seamlessly with guest checkout (no user authentication required)
 */

const SECRET = process.env.NEXTAUTH_SECRET;

if (!SECRET) {
  console.error('[SECURITY] NEXTAUTH_SECRET is not set. Checkout tokens will fail.');
}

/**
 * Creates an HMAC signature of the orderId
 * @param orderId - The UUID of the order
 * @returns Hex-encoded HMAC signature
 */
export function signOrderId(orderId: string): string {
  if (!SECRET) {
    throw new Error('NEXTAUTH_SECRET is not configured');
  }
  
  return createHmac('sha256', SECRET).update(orderId).digest('hex');
}

/**
 * Verifies a checkout token matches the expected HMAC of the orderId
 * Uses timing-safe comparison to prevent timing attacks
 * 
 * @param orderId - The UUID of the order
 * @param token - The token to verify (from client)
 * @returns True if the token is valid, false otherwise
 */
export function verifyCheckoutToken(orderId: string, token: string): boolean {
  if (!SECRET) {
    console.error('[SECURITY] Cannot verify checkout token: NEXTAUTH_SECRET not set');
    return false;
  }
  
  // Validate inputs
  if (!orderId || !token) {
    return false;
  }
  
  try {
    const expectedToken = signOrderId(orderId);
    
    // Timing-safe comparison to prevent timing attacks
    const tokenBuffer = Buffer.from(token, 'hex');
    const expectedBuffer = Buffer.from(expectedToken, 'hex');
    
    // Guard against buffer length mismatch (timingSafeEqual requires equal length)
    if (tokenBuffer.length !== expectedBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(tokenBuffer, expectedBuffer);
  } catch (error) {
    // Invalid hex encoding or other crypto errors
    console.error('[SECURITY] Token verification error:', error);
    return false;
  }
}

/**
 * Maximum age of an order for checkout (1 hour in milliseconds)
 * This limits the window of opportunity for replay attacks
 */
export const ORDER_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

/**
 * Checks if an order has expired based on its creation time
 * 
 * @param createdAt - The order's creation timestamp
 * @returns True if the order has expired, false otherwise
 */
export function isOrderExpired(createdAt: Date): boolean {
  return Date.now() - createdAt.getTime() > ORDER_MAX_AGE_MS;
}
