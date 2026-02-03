/**
 * A/B Testing Server Utilities
 *
 * Server-safe utilities that don't depend on React.
 * These can be imported by both server and client code.
 */

export type ABVariant = 'control' | 'variant';

export interface ABTestResult {
  testSlug: string;
  variant: ABVariant;
  config: Record<string, unknown> | null;
}

export const AB_COOKIE_PREFIX = 'purrify_ab_';
export const AB_VIEWED_PREFIX = 'purrify_ab_viewed_';

// Test slugs as constants for type safety
export const AB_TEST_SLUGS = {
  HOMEPAGE_HERO: 'homepage-hero-test',
  CTA_BUTTON_COLOR: 'cta-button-color-test',
  SOCIAL_PROOF_POSITION: 'social-proof-position-test',
} as const;

/**
 * Calculate statistical significance (simplified z-test)
 * Returns confidence level (0-100%)
 */
export function calculateSignificance(
  controlViews: number,
  controlConversions: number,
  variantViews: number,
  variantConversions: number
): { confidence: number; winner: 'control' | 'variant' | 'none' } {
  // Need minimum sample size
  if (controlViews < 100 || variantViews < 100) {
    return { confidence: 0, winner: 'none' };
  }

  const controlRate = controlConversions / controlViews;
  const variantRate = variantConversions / variantViews;

  // Pooled proportion
  const pooledProp =
    (controlConversions + variantConversions) / (controlViews + variantViews);

  // Standard error
  const se = Math.sqrt(
    pooledProp * (1 - pooledProp) * (1 / controlViews + 1 / variantViews)
  );

  if (se === 0) {
    return { confidence: 0, winner: 'none' };
  }

  // Z-score
  const zScore = Math.abs(variantRate - controlRate) / se;

  // Convert to confidence level (approximation)
  // z=1.96 -> 95%, z=2.58 -> 99%
  let confidence = 0;
  if (zScore >= 2.58) confidence = 99;
  else if (zScore >= 1.96) confidence = 95;
  else if (zScore >= 1.65) confidence = 90;
  else if (zScore >= 1.28) confidence = 80;
  else confidence = Math.round(zScore * 40); // rough approximation

  // Determine winner
  let winner: 'control' | 'variant' | 'none' = 'none';
  if (confidence >= 90) {
    winner = variantRate > controlRate ? 'variant' : 'control';
  }

  return { confidence: Math.min(99, confidence), winner };
}
