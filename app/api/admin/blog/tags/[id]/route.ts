import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import fs from 'fs/promises';
import path from 'node:path';

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
  const store = new ContentStore();
  const tagsPath = path.join(process.cwd(), 'content', 'tags.json');

  try {
    // Read existing tags
    const tags = await store.getTags();

    // Filter out the tag to delete
    const filteredTags = tags.filter(tag => tag.id !== id);

    if (filteredTags.length === tags.length) {
      return Response.json({ error: 'Tag not found' }, { status: 404 });
    }

    // Save to file
    await fs.writeFile(tagsPath, JSON.stringify(filteredTags, null, 2));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error handling tag request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
