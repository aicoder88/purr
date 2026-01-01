/**
 * UTM Attribution Storage Utility
 *
 * Captures and stores UTM parameters from URLs for attribution tracking.
 * Used to optimize ad spend by tracking which campaigns drive conversions.
 */

const UTM_STORAGE_KEY = 'purrify_utm';
const UTM_EXPIRY_DAYS = 30;

/**
 * UTM data structure captured from URL parameters
 */
export interface UTMData {
  /** Traffic source (e.g., google, facebook, newsletter) */
  source: string | null;
  /** Marketing medium (e.g., cpc, email, social) */
  medium: string | null;
  /** Campaign name for identification */
  campaign: string | null;
  /** Paid search keywords */
  term: string | null;
  /** Content variant for A/B testing */
  content: string | null;
  /** ISO timestamp when UTM data was captured */
  capturedAt: string;
  /** The page URL where the user landed */
  landingPage: string;
}

interface StoredUTMData extends UTMData {
  /** Expiry timestamp in milliseconds */
  expiresAt: number;
}

/**
 * Checks if code is running in a browser environment
 */
function isBrowser(): boolean {
  return typeof globalThis.window !== 'undefined';
}

/**
 * Parses URL search params to extract UTM parameters
 */
function parseUTMFromURL(): Omit<UTMData, 'capturedAt' | 'landingPage'> | null {
  if (!isBrowser()) return null;

  const searchParams = new URLSearchParams(window.location.search);

  const source = searchParams.get('utm_source');
  const medium = searchParams.get('utm_medium');
  const campaign = searchParams.get('utm_campaign');
  const term = searchParams.get('utm_term');
  const content = searchParams.get('utm_content');

  // Only return if at least one UTM param is present
  if (!source && !medium && !campaign && !term && !content) {
    return null;
  }

  return {
    source,
    medium,
    campaign,
    term,
    content,
  };
}

/**
 * Captures UTM parameters from current URL and stores in localStorage.
 * Only captures if UTM params are present in the URL.
 * Will overwrite existing UTM data with new data.
 */
export function captureUTM(): void {
  if (!isBrowser()) return;

  const utmParams = parseUTMFromURL();

  // No UTM params in URL, nothing to capture
  if (!utmParams) return;

  const utmData: StoredUTMData = {
    ...utmParams,
    capturedAt: new Date().toISOString(),
    landingPage: window.location.href,
    expiresAt: Date.now() + UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  };

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  } catch (error) {
    // localStorage may be full or unavailable in private browsing
    console.debug('[UTM] Failed to store UTM data:', error);
  }
}

/**
 * Retrieves stored UTM data if it exists and hasn't expired.
 * Returns null if no data exists, data is expired, or on SSR.
 */
export function getUTM(): UTMData | null {
  if (!isBrowser()) return null;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;

    const data: StoredUTMData = JSON.parse(stored);

    // Check if data has expired
    if (Date.now() > data.expiresAt) {
      clearUTM();
      return null;
    }

    // Return UTMData without the internal expiresAt field
    const { expiresAt: _expiresAt, ...utmData } = data;
    return utmData;
  } catch (error) {
    console.debug('[UTM] Failed to retrieve UTM data:', error);
    return null;
  }
}

/**
 * Clears stored UTM data from localStorage.
 * Typically called after a conversion (purchase, signup) is completed.
 */
export function clearUTM(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(UTM_STORAGE_KEY);
  } catch (error) {
    console.debug('[UTM] Failed to clear UTM data:', error);
  }
}

/**
 * Checks if UTM data exists in storage (without retrieving it).
 * Useful for conditional logic without full data retrieval.
 */
export function hasUTM(): boolean {
  if (!isBrowser()) return false;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return false;

    const data: StoredUTMData = JSON.parse(stored);

    // Check expiry
    if (Date.now() > data.expiresAt) {
      clearUTM();
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Gets UTM data formatted for analytics or checkout integration.
 * Returns a flat object suitable for sending to analytics or backend.
 */
export function getUTMForAnalytics(): Record<string, string> | null {
  const utm = getUTM();
  if (!utm) return null;

  const result: Record<string, string> = {};

  if (utm.source) result.utm_source = utm.source;
  if (utm.medium) result.utm_medium = utm.medium;
  if (utm.campaign) result.utm_campaign = utm.campaign;
  if (utm.term) result.utm_term = utm.term;
  if (utm.content) result.utm_content = utm.content;
  result.utm_captured_at = utm.capturedAt;
  result.utm_landing_page = utm.landingPage;

  return result;
}
