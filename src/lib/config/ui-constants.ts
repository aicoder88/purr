/**
 * UI Constants - Centralized configuration for magic values
 * 
 * This file contains hardcoded values that should be configurable.
 * Update these values here rather than scattering magic numbers throughout the codebase.
 */

// =============================================================================
// Discount Codes
// =============================================================================

/** Default welcome discount code for new subscribers */
export const WELCOME_DISCOUNT_CODE = 'WELCOME10';

/** Default welcome discount percentage (10 = 10% off) */
export const WELCOME_DISCOUNT_PERCENT = 10;

// =============================================================================
// Referral Program
// =============================================================================

/** Maximum referral credits a single user can accumulate (prevents gaming) */
export const REFERRAL_MAX_CREDITS_PER_USER = 50; // $250 max in $5 credits

/** Credit amount awarded per successful referral ($5.00) */
export const REFERRAL_CREDIT_AMOUNT = 5.00;

/** Milestone interval - every N referrals triggers a bonus reward */
export const REFERRAL_MILESTONE_INTERVAL = 3; // Every 3 referrals = free product

// =============================================================================
// Currency Conversion
// =============================================================================

/** CAD to USD conversion rate - UPDATE THIS when rates change */
export const CAD_TO_USD_RATE = 0.74;

/** USD to CAD conversion rate (derived from CAD_TO_USD_RATE) */
export const USD_TO_CAD_RATE = 1 / CAD_TO_USD_RATE;

// =============================================================================
// Rate Limits (requests per minute)
// =============================================================================

/** Generous rate limit for public read APIs */
export const RATE_LIMIT_GENEROUS = 100; // req/min

/** Standard rate limit for general routes */
export const RATE_LIMIT_STANDARD = 20;  // req/min

/** Sensitive rate limit for critical routes (contact, checkout) */
export const RATE_LIMIT_SENSITIVE = 5;  // req/min

// =============================================================================
// Video Paths
// =============================================================================

/** Hero background video path */
export const HERO_VIDEO_PATH = '/videos/hero-background.mp4';
