"use client";

/**
 * A/B Testing Framework
 *
 * Client-side utilities for running A/B tests.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Import types from server-safe module
import type { ABVariant, ABTestResult } from './ab-testing-server';
export type { ABVariant, ABTestResult };

// Import constants from server-safe module
import {
  AB_COOKIE_PREFIX,
  AB_VIEWED_PREFIX,
  AB_TEST_SLUGS,
  calculateSignificance,
} from './ab-testing-server';
export {
  AB_COOKIE_PREFIX,
  AB_VIEWED_PREFIX,
  AB_TEST_SLUGS,
  calculateSignificance,
};

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
