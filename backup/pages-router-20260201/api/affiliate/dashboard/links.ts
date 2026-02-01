import type { NextApiResponse } from 'next';
import { withAffiliateAuth, AffiliateApiRequest } from '@/lib/affiliate/middleware';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca';

// Predefined link templates for common destinations
const LINK_TEMPLATES = [
  {
    id: 'homepage',
    name: 'Homepage',
    description: 'Main landing page',
    path: '/',
  },
  {
    id: 'products',
    name: 'All Products',
    description: 'Products overview page',
    path: '/products',
  },
  {
    id: 'trial-size',
    name: 'Trial Size',
    description: 'Trial size product page',
    path: '/products/trial-size',
  },
  {
    id: 'standard',
    name: 'Standard Pouch',
    description: 'Standard product page',
    path: '/products/standard',
  },
  {
    id: 'family-pack',
    name: 'Family Pack',
    description: 'Family pack product page',
    path: '/products/family-pack',
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Blog articles',
    path: '/blog',
  },
  {
    id: 'reviews',
    name: 'Reviews',
    description: 'Customer reviews page',
    path: '/reviews',
  },
];

async function handler(req: AffiliateApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { affiliateCode } = req.affiliate;

  // Generate links with affiliate code
  const links = LINK_TEMPLATES.map((template) => ({
    ...template,
    url: `${SITE_URL}${template.path}?ref=${affiliateCode}`,
  }));

  return res.status(200).json({
    affiliateCode,
    baseUrl: SITE_URL,
    links,
    // UTM parameter template for advanced tracking
    utmTemplate: `?ref=${affiliateCode}&utm_source=affiliate&utm_medium=referral&utm_campaign={campaign}`,
  });
}

export default withAffiliateAuth(handler);
