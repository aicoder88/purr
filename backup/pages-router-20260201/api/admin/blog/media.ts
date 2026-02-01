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

  const mediaLibrary = new MediaLibrary();

  try {
    if (req.method === 'GET') {
      // Get all media or search
      const query = req.query.q as string | undefined;
      
      const media = query
        ? await mediaLibrary.searchMedia(query)
        : await mediaLibrary.getAllMedia();

      return res.status(200).json(media);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling media request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
