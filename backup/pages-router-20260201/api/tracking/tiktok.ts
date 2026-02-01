// TikTok Events API - Server-side tracking endpoint
// POST /api/tracking/tiktok

import type { NextApiRequest, NextApiResponse } from 'next';
import { trackTikTokEvent, TikTokEventData, TikTokEventType } from '../../../src/lib/tiktok-tracking';

interface TrackingRequest {
  event: TikTokEventType;
  content_id?: string;
  content_name?: string;
  content_type?: string;
  quantity?: number;
  value?: number;
  currency?: string;
  email?: string;
  external_id?: string;
  url?: string;
  referrer?: string;
  ttclid?: string;
  ttp?: string;
}

interface TrackingResponse {
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrackingResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body as TrackingRequest;

    if (!body.event) {
      return res.status(400).json({ success: false, error: 'Event type required' });
    }

    // Validate event type
    const validEvents: TikTokEventType[] = ['ViewContent', 'AddToCart', 'InitiateCheckout', 'Purchase'];
    if (!validEvents.includes(body.event)) {
      return res.status(400).json({ success: false, error: 'Invalid event type' });
    }

    // Extract IP and user agent from request
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
               req.socket.remoteAddress ||
               undefined;
    const userAgent = req.headers['user-agent'];

    // Build event data
    const eventData: TikTokEventData = {
      event: body.event,
      content_id: body.content_id,
      content_name: body.content_name,
      content_type: body.content_type,
      quantity: body.quantity,
      value: body.value,
      currency: body.currency || 'CAD',
      email: body.email,
      external_id: body.external_id,
      url: body.url,
      referrer: body.referrer,
      ip: ip,
      user_agent: userAgent,
      ttclid: body.ttclid,
      ttp: body.ttp,
    };

    const result = await trackTikTokEvent(eventData);

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      // Log error but return success to client (don't block UX for tracking failures)
      console.error('TikTok tracking failed:', result.error);
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('TikTok tracking endpoint error:', error);
    // Return success to avoid blocking user experience
    return res.status(200).json({ success: true });
  }
}
