import { requireAuth } from '@/lib/auth/session';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';

export async function POST(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const generator = new SitemapGenerator();
    await generator.updateAllSitemaps();

    return Response.json({
      success: true,
      message: 'Sitemaps updated successfully'
    });
  } catch (error) {
    console.error('Error updating sitemaps:', error);
    return Response.json({
      error: 'Failed to update sitemaps',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
