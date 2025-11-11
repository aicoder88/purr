import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { MediaLibrary } from '@/lib/blog/media-library';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const mediaLibrary = new MediaLibrary();

  try {
    if (req.method === 'DELETE') {
      // Delete media item
      await mediaLibrary.deleteMedia(id as string);
      return res.status(200).json({ success: true });
    }

    if (req.method === 'PATCH') {
      // Update media metadata
      const updates = req.body;
      await mediaLibrary.updateMediaMetadata(id as string, updates);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error handling media request:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
