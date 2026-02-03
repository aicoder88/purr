import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import {
  fetchPublicSheet,
  transformSheetRowToLead,
  type SheetRow
} from '@/lib/google-sheets';
import { LeadStatus } from '@/generated/client/client';

function getPrisma() {
  if (!prisma) {
    throw new Error('Database not configured');
  }
  return prisma;
}

interface SyncResult {
  success: boolean;
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
  lastSyncedAt: string;
}

export async function POST() {
  // Auth check
  const { authorized } = await requireAuth();
  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sheetId = process.env.GOOGLE_SHEETS_ID;
  
  if (!sheetId) {
    return Response.json({ 
      error: 'Google Sheets not configured. Set GOOGLE_SHEETS_ID environment variable.' 
    }, { status: 400 });
  }

  try {
    // Fetch data from Google Sheets
    const sheetResult = await fetchPublicSheet(sheetId);
    
    if (!sheetResult.success) {
      return Response.json({ 
        error: sheetResult.error || 'Failed to fetch sheet data' 
      }, { status: 500 });
    }

    const rows = sheetResult.data || [];
    const db = getPrisma();

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    // Process each row
    for (const row of rows) {
      try {
        // Skip rows without store name
        if (!row.store_name || !row.store_name.trim()) {
          skipped++;
          continue;
        }

        const leadData = transformSheetRowToLead(row);

        // Check if lead exists (by company name and city)
        const existingLead = await db.lead.findFirst({
          where: {
            companyName: leadData.companyName,
            city: leadData.city || undefined
          }
        });

        if (existingLead) {
          // Update existing lead
          await db.lead.update({
            where: { id: existingLead.id },
            data: {
              ...leadData,
              status: leadData.status as LeadStatus,
              // Don't overwrite manual changes to these fields
              notes: existingLead.notes || leadData.notes,
              lastSyncedAt: new Date()
            }
          });
          updated++;
        } else {
          // Create new lead
          await db.lead.create({
            data: {
              ...leadData,
              status: leadData.status as LeadStatus
            }
          });
          created++;
        }
      } catch (error) {
        const rowName = (row as SheetRow).store_name || 'Unknown';
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Row "${rowName}": ${errorMsg}`);
        skipped++;
      }
    }

    const result: SyncResult = {
      success: true,
      created,
      updated,
      skipped,
      errors: errors.slice(0, 10), // Limit error messages
      lastSyncedAt: new Date().toISOString()
    };

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error('Error syncing leads:', error);
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Failed to sync leads' 
    }, { status: 500 });
  }
}
