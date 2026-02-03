import { requireAuth } from '@/lib/auth/session';
import { GenerationHistoryManager } from '@/lib/blog/generation-history';

export async function GET(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const historyManager = new GenerationHistoryManager();

  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '10');
    const history = await historyManager.getRecentGenerations(count);

    return Response.json(history);
  } catch (error) {
    console.error('History API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const historyManager = new GenerationHistoryManager();

  try {
    const body = await request.json();
    const record = await historyManager.saveGeneration(body);
    return Response.json(record, { status: 201 });
  } catch (error) {
    console.error('History save error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
