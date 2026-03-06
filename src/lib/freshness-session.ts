export const FRESHNESS_SESSION_COOKIE = 'purrify_freshness_session';
export const FRESHNESS_SESSION_STORAGE_KEY = 'purrify_freshness_session';
export const FRESHNESS_PROFILE_STORAGE_KEY = 'purrify_freshness_profile';

export interface StoredFreshnessProfileSummary {
  sessionId: string;
  recommendedProductId: string | null;
  recommendationReason: string | null;
  source: 'QUIZ' | 'CHAT';
}

function readCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  const [, value = ''] = cookie.split('=');
  return value ? decodeURIComponent(value) : null;
}

function persistSessionId(sessionId: string) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(FRESHNESS_SESSION_STORAGE_KEY, sessionId);
  } catch {
    // Ignore storage failures and rely on the cookie fallback.
  }

  const secure = window.location.protocol === 'https:' ? ';Secure' : '';
  document.cookie = `${FRESHNESS_SESSION_COOKIE}=${encodeURIComponent(sessionId)};path=/;max-age=31536000;SameSite=Lax${secure}`;
}

export function getStoredFreshnessProfile(
  sessionId?: string | null
): StoredFreshnessProfileSummary | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(FRESHNESS_PROFILE_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<StoredFreshnessProfileSummary> | null;
    if (
      !parsed
      || typeof parsed.sessionId !== 'string'
      || (sessionId && parsed.sessionId !== sessionId)
      || (parsed.source !== 'QUIZ' && parsed.source !== 'CHAT')
    ) {
      return null;
    }

    return {
      sessionId: parsed.sessionId,
      recommendedProductId:
        typeof parsed.recommendedProductId === 'string' ? parsed.recommendedProductId : null,
      recommendationReason:
        typeof parsed.recommendationReason === 'string' ? parsed.recommendationReason : null,
      source: parsed.source,
    };
  } catch {
    return null;
  }
}

export function persistFreshnessProfileSummary(profile: StoredFreshnessProfileSummary): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(FRESHNESS_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage failures and keep the network fallback path available.
  }
}

export function getFreshnessSessionId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  let storedSessionId: string | null = null;
  try {
    storedSessionId = window.localStorage.getItem(FRESHNESS_SESSION_STORAGE_KEY);
  } catch {
    storedSessionId = null;
  }
  const cookieSessionId = readCookieValue(FRESHNESS_SESSION_COOKIE);
  const sessionId = storedSessionId || cookieSessionId;

  if (sessionId) {
    persistSessionId(sessionId);
    return sessionId;
  }

  return null;
}

export function getOrCreateFreshnessSessionId(): string {
  const existingSessionId = getFreshnessSessionId();
  if (existingSessionId) {
    return existingSessionId;
  }

  const sessionId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  persistSessionId(sessionId);
  return sessionId;
}
