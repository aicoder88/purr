import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Always use canonical domain with localized paths (no subdomains)
  const canonicalDomain = 'https://www.purrify.ca';

  const robots = `# *
User-agent: *
Allow: /

# *
User-agent: *
Disallow: /api/*
Disallow: /admin/*
Disallow: /_next/*
Disallow: /static/*

# Host
Host: ${canonicalDomain}

# Sitemaps
Sitemap: ${canonicalDomain}/sitemap.xml
Sitemap: ${canonicalDomain}/server-sitemap.xml
Sitemap: ${canonicalDomain}/sitemap-0.xml
`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
