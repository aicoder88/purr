/**
 * Affiliate Program Library
 * Central exports for all affiliate-related utilities
 */

// Code generation
export {
  generateAffiliateCode,
  isValidAffiliateCodeFormat,
  validateAffiliateCode,
} from './code-generator';

// Commission clearing
export {
  clearPendingConversions,
  recalculateTotalEarnings,
  voidConversion,
} from './clearing';

// Click and conversion tracking
export {
  hashIP,
  getClientIP,
  getAffiliateTrackingData,
  setAffiliateTrackingCookies,
  clearAffiliateTrackingCookies,
  recordAffiliateClick,
  createAffiliateConversion,
  parseAffiliateMetadata,
  generateAffiliateMetadata,
} from './tracking';

// Authentication middleware
export {
  withAffiliateAuth,
  getAffiliateSession,
  isAffiliateSession,
} from './middleware';

export type { AffiliateSession, AffiliateApiRequest } from './middleware';
