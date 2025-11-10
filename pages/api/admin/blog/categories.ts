import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import type { Category } from '@/types/blog';
import fs from 'fs/promises';
import path from 'path';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const store = new ContentStore();
  const categoriesPath = path.join(process.cwd(), 'content', 'categories.json');

  try {
    if (req.method === 'GET') {
      const categories = await store.getCategories();
      return res.status(200).json(categories);
    }

    if (req.method === 'POST') {
      const newCategory: Category = req.body;

      if (!newCategory.name || !newCategory.slug) {
        return res.status(400).json({ error: 'Name and slug are required' });
      }

      // Read existing categories
      const categories = await store.getCategories();

      // Check for duplicate slug
      if (categories.some(cat => cat.slug === newCategory.slug)) {
        return res.status(400).json({ error: 'Category with this slug already exists' });
      }

      // Add new category
      categories.push(newCategory);

      // Save to file
      await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));

      return res.status(201).json({ success: true, category: newCategory });
    }

    if (req.method === 'PUT') {
      const updatedCategory: Category = req.body;

      if (!updatedCategory.id || !updatedCategory.name || !updatedCategory.slug) {
        return res.status(400).json({ error: 'ID, name, and slug are required' });
      }

      // Read existing categories
      const categories = await store.getCategories();

      // Find and update category
      const index = categories.findIndex(cat => cat.id === updatedCategory.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Category not found' });
      }

      categories[index] = { ...categories[index], ...updatedCategory };

      // Save to file
      await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));

      return res.status(200).json({ success: true, category: categories[index] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling categories request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, handler);
