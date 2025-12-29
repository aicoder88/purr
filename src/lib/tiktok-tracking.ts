// TikTok Events API tracking utility with GDPR compliance
// Server-side tracking for reliable conversion attribution

import { hasConsent, ConsentType } from './analytics';
import crypto from 'crypto';

const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

// Event types supported
export type TikTokEventType =
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase';

export interface TikTokEventData {
  event: TikTokEventType;
  event_id?: string;
  timestamp?: string;
  // Content data
  content_id?: string;
  content_name?: string;
  content_type?: string;
  quantity?: number;
  value?: number;
  currency?: string;
  // Page data
  url?: string;
  referrer?: string;
  // User data (will be hashed)
  email?: string;
  phone?: string;
  external_id?: string;
  // Request data
  ip?: string;
  user_agent?: string;
  ttclid?: string;
  ttp?: string;
}

// Hash sensitive data as per TikTok requirements
function sha256Hash(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

// Generate unique event ID for deduplication
function generateEventId(): string {
  return `${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
}

// Server-side tracking (more reliable, recommended)
export async function trackTikTokEvent(eventData: TikTokEventData): Promise<{ success: boolean; error?: string }> {
  if (!TIKTOK_PIXEL_ID || !TIKTOK_ACCESS_TOKEN) {
    console.debug('TikTok tracking skipped: Missing pixel ID or access token');
    return { success: false, error: 'Missing configuration' };
  }

  try {
    const eventId = eventData.event_id || generateEventId();
    const timestamp = eventData.timestamp || new Date().toISOString();

    // Build user data with hashed PII
    const userData: Record<string, string> = {};

    if (eventData.email) {
      userData.email = sha256Hash(eventData.email);
    }
    if (eventData.phone) {
      userData.phone = sha256Hash(eventData.phone);
    }
    if (eventData.external_id) {
      userData.external_id = sha256Hash(eventData.external_id);
    }
    if (eventData.ip) {
      userData.ip = eventData.ip;
    }
    if (eventData.user_agent) {
      userData.user_agent = eventData.user_agent;
    }
    if (eventData.ttclid) {
      userData.ttclid = eventData.ttclid;
    }
    if (eventData.ttp) {
      userData.ttp = eventData.ttp;
    }

    // Build properties
    const properties: Record<string, unknown> = {};

    if (eventData.value !== undefined) {
      properties.value = eventData.value;
    }
    if (eventData.currency) {
      properties.currency = eventData.currency;
    }
    if (eventData.content_id) {
      properties.content_id = eventData.content_id;
    }
    if (eventData.content_name) {
      properties.content_name = eventData.content_name;
    }
    if (eventData.content_type) {
      properties.content_type = eventData.content_type;
    }
    if (eventData.quantity !== undefined) {
      properties.quantity = eventData.quantity;
    }

    // Build page data
    const page: Record<string, string> = {};

    if (eventData.url) {
      page.url = eventData.url;
    }
    if (eventData.referrer) {
      page.referrer = eventData.referrer;
    }

    const payload = {
      pixel_code: TIKTOK_PIXEL_ID,
      event: eventData.event,
      event_id: eventId,
      timestamp: timestamp,
      context: {
        user: userData,
        page: Object.keys(page).length > 0 ? page : undefined,
        user_agent: eventData.user_agent,
        ip: eventData.ip,
      },
      properties: Object.keys(properties).length > 0 ? properties : undefined,
    };

    const response = await fetch(TIKTOK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify({ data: [payload] }),
    });

    const result = await response.json();

    if (result.code === 0) {
      console.debug(`TikTok ${eventData.event} event tracked successfully`);
      return { success: true };
    } else {
      console.error('TikTok tracking error:', result);
      return { success: false, error: result.message || 'API error' };
    }
  } catch (error) {
    console.error('TikTok tracking failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Client-side tracking (for page views, uses browser pixel)
export function trackTikTokClientEvent(
  event: TikTokEventType,
  data?: {
    content_id?: string;
    content_name?: string;
    content_type?: string;
    quantity?: number;
    value?: number;
    currency?: string;
  }
): void {
  if (typeof globalThis.window === 'undefined') return;

  // Check for marketing consent (TikTok is an ad platform)
  if (!hasConsent(ConsentType.MARKETING)) {
    console.debug('TikTok client tracking blocked: No marketing consent');
    return;
  }

  try {
    if (window.ttq) {
      window.ttq.track(event, {
        ...data,
        event_id: generateEventId(),
      });
      console.debug(`TikTok client ${event} event tracked`);
    }
  } catch (error) {
    console.debug('TikTok client tracking failed:', error);
  }
}

// Initialize TikTok pixel (call in _app.tsx)
export function initTikTokPixel(): void {
  if (typeof globalThis.window === 'undefined') return;

  if (!TIKTOK_PIXEL_ID) {
    console.debug('TikTok pixel not initialized: Missing pixel ID');
    return;
  }

  // Check for marketing consent before initializing
  if (!hasConsent(ConsentType.MARKETING)) {
    console.debug('TikTok pixel blocked: No marketing consent');
    return;
  }

  try {
    if (window.ttq) {
      window.ttq.load(TIKTOK_PIXEL_ID);
      window.ttq.page();
      console.debug('TikTok pixel initialized');
    }
  } catch (error) {
    console.debug('TikTok pixel initialization failed:', error);
  }
}
