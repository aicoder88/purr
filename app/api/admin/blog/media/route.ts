import { requireAuth } from '@/lib/auth/session';
import { MediaLibrary } from '@/lib/blog/media-library';

export async function GET(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const mediaLibrary = new MediaLibrary();

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    
    const media = query
      ? await mediaLibrary.searchMedia(query)
      : await mediaLibrary.getAllMedia();

    return Response.json(media);
  } catch (error) {
    console.error('Error handling media request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
