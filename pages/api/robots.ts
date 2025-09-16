import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the host from the request
  const host = req.headers.host || 'www.purrify.ca';

  // Determine the appropriate domain based on the subdomain
  let canonicalDomain = 'https://www.purrify.ca';

  if (host.includes('fr.purrify.ca')) {
    canonicalDomain = 'https://fr.purrify.ca';
  } else if (host.includes('zh.purrify.ca')) {
    canonicalDomain = 'https://zh.purrify.ca';
  }

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