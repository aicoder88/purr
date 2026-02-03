import { requireAuth } from '@/lib/auth/session';
import { MediaLibrary } from '@/lib/blog/media-library';

interface Params {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const mediaLibrary = new MediaLibrary();

  try {
    // Delete media item
    await mediaLibrary.deleteMedia(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error handling media request:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const mediaLibrary = new MediaLibrary();

  try {
    // Update media metadata
    const updates = await request.json();
    await mediaLibrary.updateMediaMetadata(id, updates);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error handling media request:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
