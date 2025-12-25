import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
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

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.status(200).send(robots);
}
