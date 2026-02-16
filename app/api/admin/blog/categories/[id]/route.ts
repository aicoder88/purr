import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';
import fs from 'fs/promises';
import path from 'node:path';

interface Params {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const store = new ContentStore();
  const categoriesPath = path.join(process.cwd(), 'content', 'categories.json');

  try {
    // Read existing categories
    const categories = await store.getCategories();

    // Filter out the category to delete
    const filteredCategories = categories.filter(cat => cat.id !== id);

    if (filteredCategories.length === categories.length) {
      return Response.json({ error: 'Category not found' }, { status: 404 });
    }

    // Save to file
    await fs.writeFile(categoriesPath, JSON.stringify(filteredCategories, null, 2));

    return Response.json({ success: true }, { headers: rateLimitHeaders });
  } catch (error) {
    console.error('Error handling category request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: rateLimitHeaders });
  }
}
