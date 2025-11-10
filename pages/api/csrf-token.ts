import type { NextApiRequest, NextApiResponse } from 'next';
import { setCSRFToken } from '@/lib/security/csrf';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = setCSRFToken(res);
  
  return res.status(200).json({ csrfToken: token });
}
