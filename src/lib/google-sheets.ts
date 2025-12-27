/**
 * Google Sheets API client for lead sync
 * 
 * This module provides utilities for syncing leads with Google Sheets.
 * Requires the following environment variables:
 * - GOOGLE_SHEETS_ID: The ID of the Google Sheet to sync with
 * - GOOGLE_API_KEY: API key for public sheets OR
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY: For private sheets
 */

interface SheetRow {
  store_name?: string;
  phone?: string;
  owner_manager?: string;
  notes?: string;
  status?: string;
  email_primary?: string;
  email_secondary?: string;
  email_quality?: string;
  email_result?: string;
  email_is_free?: string;
  email_is_role?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  neighborhood?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  opening_hours?: string;
  category?: string;
  sent_status?: string;
  [key: string]: string | undefined;
}

interface FetchSheetsResult {
  success: boolean;
  data?: SheetRow[];
  error?: string;
}

/**
 * Map CSV status values to LeadStatus enum values
 */
export function mapStatusToEnum(status: string | undefined): string {
  if (!status) return 'NEW';
  
  const statusMap: Record<string, string> = {
    'new': 'NEW',
    'contacted': 'CONTACTED',
    'sample sent': 'SAMPLE_SENT',
    'sample_sent': 'SAMPLE_SENT',
    'following up': 'FOLLOWING_UP',
    'following_up': 'FOLLOWING_UP',
    'follow up': 'FOLLOWING_UP',
    'converted': 'CONVERTED',
    'not interested': 'NOT_INTERESTED',
    'not_interested': 'NOT_INTERESTED',
    'no response': 'NO_RESPONSE',
    'no_response': 'NO_RESPONSE'
  };

  return statusMap[status.toLowerCase().trim()] || 'NEW';
}

/**
 * Parse boolean values from spreadsheet
 */
export function parseBooleanField(value: string | undefined): boolean | null {
  if (!value) return null;
  const lower = value.toLowerCase().trim();
  if (lower === 'true' || lower === 'yes' || lower === '1') return true;
  if (lower === 'false' || lower === 'no' || lower === '0') return false;
  return null;
}

/**
 * Fetch data from a public Google Sheet using the Sheets API
 */
export async function fetchPublicSheet(
  sheetId: string,
  range: string = 'Sheet1!A1:Z1000'
): Promise<FetchSheetsResult> {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    return {
      success: false,
      error: 'GOOGLE_API_KEY is not configured'
    };
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Google Sheets API error: ${response.status} - ${errorText}`
      };
    }

    const data = await response.json();
    const rows = data.values || [];
    
    if (rows.length === 0) {
      return {
        success: true,
        data: []
      };
    }

    // First row is headers
    const headers = rows[0].map((h: string) => 
      h.toLowerCase().trim().replace(/\s+/g, '_')
    );
    
    // Convert remaining rows to objects
    const parsedData: SheetRow[] = rows.slice(1).map((row: string[]) => {
      const obj: SheetRow = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index] || undefined;
      });
      return obj;
    });

    return {
      success: true,
      data: parsedData
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error fetching sheet'
    };
  }
}

/**
 * Transform sheet row to lead data format for Prisma
 */
export function transformSheetRowToLead(row: SheetRow) {
  return {
    companyName: row.store_name || 'Unknown',
    phone: row.phone || null,
    contactName: row.owner_manager || null,
    notes: row.notes || null,
    status: mapStatusToEnum(row.status),
    email: row.email_primary || null,
    emailSecondary: row.email_secondary || null,
    emailQuality: row.email_quality || null,
    emailResult: row.email_result || null,
    emailIsFree: parseBooleanField(row.email_is_free),
    emailIsRole: parseBooleanField(row.email_is_role),
    street: row.street || null,
    city: row.city || null,
    province: row.province || null,
    postalCode: row.postal_code || null,
    neighborhood: row.neighborhood || null,
    website: row.website || null,
    facebook: row.facebook || null,
    instagram: row.instagram || null,
    tiktok: row.tiktok || null,
    youtube: row.youtube || null,
    twitter: row.twitter || null,
    openingHours: row.opening_hours || null,
    category: row.category || null,
    sentStatus: row.sent_status || null,
    source: 'google-sheets',
    lastSyncedAt: new Date()
  };
}

export type { SheetRow, FetchSheetsResult };
