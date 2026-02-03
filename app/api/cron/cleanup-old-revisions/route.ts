import type { NextRequest } from 'next/server';
import { RevisionManager } from '@/lib/blog/revision-manager';

/**
 * Extract cron secret from request headers or query params
 */
function extractCronSecret(req: NextRequest): string | null {
  const headerSecret = req.headers.get('x-cron-secret');
  if (headerSecret) return headerSecret;
  
  const { searchParams } = new URL(req.url);
  return searchParams.get('secret');
}

export async function GET(req: NextRequest): Promise<Response> {
  return handleCleanup(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handleCleanup(req);
}

async function handleCleanup(req: NextRequest): Promise<Response> {
  // Verify cron secret
  const cronSecret = extractCronSecret(req);
  
  if (cronSecret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const revisionManager = new RevisionManager();
    const deletedCount = await revisionManager.cleanupOldRevisions(90);

    return Response.json({
      success: true,
      deletedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cleanup cron error:', error);
    return Response.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
