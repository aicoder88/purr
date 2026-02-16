// TikTok Events API - Server-side tracking endpoint
// POST /api/tracking/tiktok

import { trackTikTokEvent, TikTokEventData, TikTokEventType } from '@/lib/tiktok-tracking';

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

interface _TrackingResponse {
  success: boolean;
  error?: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json() as TrackingRequest;

    if (!body.event) {
      return Response.json({ success: false, error: 'Event type required' }, { status: 400 });
    }

    // Validate event type
    const validEvents: TikTokEventType[] = ['ViewContent', 'AddToCart', 'InitiateCheckout', 'Purchase'];
    if (!validEvents.includes(body.event)) {
      return Response.json({ success: false, error: 'Invalid event type' }, { status: 400 });
    }

    // Extract IP and user agent from request
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

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
      return Response.json({ success: true });
    } else {
      // Log error but return success to client (don't block UX for tracking failures)
      console.error('TikTok tracking failed:', result.error);
      return Response.json({ success: true });
    }
  } catch (error) {
    console.error('TikTok tracking endpoint error:', error);
    // Return success to avoid blocking user experience
    return Response.json({ success: true });
  }
}
