/**
 * React Hook for UTM Attribution Tracking
 *
 * Automatically captures UTM parameters on mount and provides
 * access to UTM data throughout the application.
 */

import { useEffect, useState, useCallback } from 'react';
import {
  captureUTM,
  getUTM,
  clearUTM as clearUTMStorage,
  hasUTM,
  getUTMForAnalytics,
  type UTMData,
} from '@/lib/tracking/utm';

interface UseUTMReturn {
  /** Current UTM data if available */
  utmData: UTMData | null;
  /** Whether UTM data exists in storage */
  hasUTMData: boolean;
  /** Clears UTM data (call after conversion) */
  clearUTM: () => void;
  /** Gets UTM data formatted for analytics/API calls */
  getAnalyticsData: () => Record<string, string> | null;
  /** Whether the hook has finished initializing */
  isReady: boolean;
}

/**
 * Hook for UTM attribution tracking.
 *
 * Automatically captures UTM parameters from the URL on initial mount.
 * Provides access to stored UTM data and methods to manage it.
 *
 * @example
 * ```tsx
 * function CheckoutPage() {
 *   const { utmData, clearUTM, getAnalyticsData } = useUTM();
 *
 *   const handlePurchase = async () => {
 *     const analytics = getAnalyticsData();
 *     await submitOrder({ ...orderData, attribution: analytics });
 *     clearUTM(); // Clear after successful conversion
 *   };
 *
 *   return (
 *     <div>
 *       {utmData?.source && <p>Source: {utmData.source}</p>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useUTM(): UseUTMReturn {
  const [utmData, setUtmData] = useState<UTMData | null>(null);
  const [hasUTMData, setHasUTMData] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Capture UTM on mount (client-side only)
  useEffect(() => {
    // Capture any UTM params from current URL
    captureUTM();

    // Load stored UTM data
    const data = getUTM();
    setUtmData(data);
    setHasUTMData(hasUTM());
    setIsReady(true);
  }, []);

  // Clear UTM data
  const clearUTM = useCallback(() => {
    clearUTMStorage();
    setUtmData(null);
    setHasUTMData(false);
  }, []);

  // Get analytics-formatted data
  const getAnalyticsData = useCallback(() => {
    return getUTMForAnalytics();
  }, []);

  return {
    utmData,
    hasUTMData,
    clearUTM,
    getAnalyticsData,
    isReady,
  };
}
