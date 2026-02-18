import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';

interface CityLeadPayload {
  name?: string;
  email: string;
  citySlug: string;
  cityName: string;
  provinceName: string;
  provinceCode?: string;
  marketingConsent?: boolean;
  scentFocus?: string;
}

interface CityLeadRecord extends CityLeadPayload {
  createdAt: string;
  id: string;
}

const leadsLogPath = path.join(process.cwd(), 'reports', 'city-leads-log.json');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

async function forwardToWebhook(record: CityLeadRecord) {
  const webhookUrl = process.env.CITY_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CITY_LEAD_WEBHOOK_AUTH
          ? { Authorization: process.env.CITY_LEAD_WEBHOOK_AUTH }
          : {}),
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      console.error('City lead webhook returned non-200 status', response.statusText);
    }
  } catch (error) {
    console.error('City lead webhook forwarding failed:', error);
  }
}

async function notifySlack(record: CityLeadRecord) {
  const slackWebhook = process.env.CITY_LEAD_SLACK_WEBHOOK_URL;
  if (!slackWebhook) {
    return;
  }

  const message = {
    text: `🐾 *New city lead captured*\n• City: ${record.cityName}, ${record.provinceName}\n• Email: ${record.email}\n• Consent: ${record.marketingConsent ? 'Yes' : 'No'}\n• Focus: ${record.scentFocus ?? 'n/a'}`,
  };

  try {
    const response = await fetch(slackWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error('Slack notification failed:', response.statusText);
    }
  } catch (error) {
    console.error('Slack notification error:', error);
  }
}

async function appendLead(record: CityLeadRecord) {
  await fs.mkdir(path.dirname(leadsLogPath), { recursive: true });

  let existing: CityLeadRecord[] = [];
  try {
    const current = await fs.readFile(leadsLogPath, 'utf8');
    const parsed = JSON.parse(current);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code && code !== 'ENOENT') {
      console.error('Failed to read leads log:', error);
    }
  }

  existing.push(record);
  await fs.writeFile(leadsLogPath, JSON.stringify(existing, null, 2));
}

export async function POST(request: NextRequest) {
  const headers = new Headers();
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');

  try {
    const payload = await request.json() as Partial<CityLeadPayload> | undefined;

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Missing payload' },
        { status: 400, headers }
      );
    }

    const {
      name,
      email,
      citySlug,
      cityName,
      provinceName,
      provinceCode,
      marketingConsent = false,
      scentFocus,
    } = payload;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email is required.' },
        { status: 400, headers }
      );
    }

    if (!citySlug || !cityName || !provinceName) {
      return NextResponse.json(
        { success: false, error: 'City information is required to process the lead.' },
        { status: 400, headers }
      );
    }

    const record: CityLeadRecord = {
      id: `${citySlug}-${Date.now()}`,
      name: name?.trim(),
      email: email.toLowerCase(),
      citySlug,
      cityName,
      provinceName,
      provinceCode,
      marketingConsent: Boolean(marketingConsent),
      scentFocus,
      createdAt: new Date().toISOString(),
    };

    await appendLead(record);
    await Promise.allSettled([
      forwardToWebhook(record),
      notifySlack(record),
    ]);
    
    console.info('City lead captured:', {
      citySlug: record.citySlug,
      email: record.email,
      marketingConsent: record.marketingConsent,
    });

    return NextResponse.json(
      { success: true },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Failed to persist city lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save lead.' },
      { status: 500, headers }
    );
  }
}
