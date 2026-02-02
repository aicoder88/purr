/**
 * A/B Testing Framework
 *
 * Client-side utilities for running A/B tests.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export type ABVariant = 'control' | 'variant';

export interface ABTestResult {
  testSlug: string;
  variant: ABVariant;
  config: Record<string, unknown> | null;
}

export const AB_COOKIE_PREFIX = 'purrify_ab_';
export const AB_VIEWED_PREFIX = 'purrify_ab_viewed_';

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get the assigned variant for a user (from cookie or assign new)
 * Client-side function
 */
export function getClientVariant(testSlug: string, trafficSplit: number = 50): ABVariant {
  if (!isBrowser()) return 'control';

  const cookieName = `${AB_COOKIE_PREFIX}${testSlug}`;

  // Check for existing assignment
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value as ABVariant;
    }
  }

  // Assign new variant
  const variant: ABVariant = Math.random() * 100 < trafficSplit ? 'variant' : 'control';

  // Store in cookie (30 days expiry)
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  document.cookie = `${cookieName}=${variant}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

  return variant;
}

/**
 * Track A/B test event via API (client-side)
 */
export async function trackABEvent(
  testSlug: string,
  variant: ABVariant,
  type: 'view' | 'conversion'
): Promise<void> {
  if (!isBrowser()) return;

  try {
    await fetch('/api/ab-test/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testSlug, variant, type }),
    });
  } catch {
    // Silently fail
  }
}

/**
 * Check if view was already tracked for this session
 */
function hasTrackedView(testSlug: string): boolean {
  if (!isBrowser()) return false;
  return sessionStorage.getItem(`${AB_VIEWED_PREFIX}${testSlug}`) === 'true';
}

/**
 * Mark view as tracked for this session
 */
function markViewTracked(testSlug: string): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(`${AB_VIEWED_PREFIX}${testSlug}`, 'true');
}

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

/**
 * React hook for A/B testing (client-side) - basic version
 */
export function useABTest(testSlug: string, trafficSplit: number = 50): {
  variant: ABVariant;
  isVariant: boolean;
} {
  if (!isBrowser()) {
    return { variant: 'control', isVariant: false };
  }

  const variant = getClientVariant(testSlug, trafficSplit);
  return {
    variant,
    isVariant: variant === 'variant',
  };
}

/**
 * Enhanced React hook for A/B testing with automatic view tracking
 */
export function useABTestWithTracking(
  testSlug: string,
  trafficSplit: number = 50
): {
  variant: ABVariant;
  isVariant: boolean;
  trackConversion: () => void;
  isLoaded: boolean;
} {
  const [variant, setVariant] = useState<ABVariant>('control');
  const [isLoaded, setIsLoaded] = useState(false);
  const hasTrackedRef = useRef(false);

  // Initialize variant and track view
  useEffect(() => {
    if (!isBrowser()) return;

    const assignedVariant = getClientVariant(testSlug, trafficSplit);
    setVariant(assignedVariant);
    setIsLoaded(true);

    // Track view once per session
    if (!hasTrackedRef.current && !hasTrackedView(testSlug)) {
      hasTrackedRef.current = true;
      markViewTracked(testSlug);
      trackABEvent(testSlug, assignedVariant, 'view');
    }
  }, [testSlug, trafficSplit]);

  // Track conversion function
  const trackConversion = useCallback(() => {
    if (!isBrowser()) return;
    trackABEvent(testSlug, variant, 'conversion');
  }, [testSlug, variant]);

  return {
    variant,
    isVariant: variant === 'variant',
    trackConversion,
    isLoaded,
  };
}

// Test slugs as constants for type safety
export const AB_TEST_SLUGS = {
  HOMEPAGE_HERO: 'homepage-hero-test',
  CTA_BUTTON_COLOR: 'cta-button-color-test',
  SOCIAL_PROOF_POSITION: 'social-proof-position-test',
} as const;
