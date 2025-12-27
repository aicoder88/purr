import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import {
  fetchPublicSheet,
  transformSheetRowToLead,
  type SheetRow
} from '@/lib/google-sheets';
import { LeadStatus } from '@prisma/client';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SyncResult | { error: string }>
) {
  // Auth check
  const { authorized } = await requireAuth(req, res);
  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sheetId = process.env.GOOGLE_SHEETS_ID;
  
  if (!sheetId) {
    return res.status(400).json({ 
      error: 'Google Sheets not configured. Set GOOGLE_SHEETS_ID environment variable.' 
    });
  }

  try {
    // Fetch data from Google Sheets
    const sheetResult = await fetchPublicSheet(sheetId);
    
    if (!sheetResult.success) {
      return res.status(500).json({ 
        error: sheetResult.error || 'Failed to fetch sheet data' 
      });
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

    res.status(200).json(result);
  } catch (error) {
    console.error('Error syncing leads:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to sync leads' 
    });
  }
}
