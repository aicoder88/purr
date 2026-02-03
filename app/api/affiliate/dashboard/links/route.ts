import { auth } from '@/auth';

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

export async function GET(): Promise<Response> {
  try {
    // Authenticate affiliate
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = session.user as { role?: string; affiliateId?: string };
    if (user.role !== 'affiliate' || !user.affiliateId) {
      return Response.json({ error: 'Not authorized as affiliate' }, { status: 403 });
    }

    // Fetch affiliate code
    const prisma = (await import('@/lib/prisma')).default;
    const affiliate = await prisma?.affiliate.findUnique({
      where: { id: user.affiliateId },
      select: { code: true },
    });

    if (!affiliate) {
      return Response.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    const affiliateCode = affiliate.code;

    // Generate links with affiliate code
    const links = LINK_TEMPLATES.map((template) => ({
      ...template,
      url: `${SITE_URL}${template.path}?ref=${affiliateCode}`,
    }));

    return Response.json({
      affiliateCode,
      baseUrl: SITE_URL,
      links,
      // UTM parameter template for advanced tracking
      utmTemplate: `?ref=${affiliateCode}&utm_source=affiliate&utm_medium=referral&utm_campaign={campaign}`,
    });
  } catch (error) {
    console.error('Failed to fetch affiliate links:', error);
    return Response.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}
