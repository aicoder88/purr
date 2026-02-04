import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Always use canonical domain with localized paths (no subdomains)
  const canonicalDomain = 'https://www.purrify.ca';

  const robots = `# ============================================
# AI & Search Crawlers - Explicitly Allowed
# ============================================

# OpenAI (ChatGPT, GPTBot)
User-agent: GPTBot
Allow: /

# Anthropic (Claude)
User-agent: ClaudeBot
Allow: /

# Perplexity AI
User-agent: PerplexityBot
Allow: /

# Google AI (Bard, SGE, Gemini)
User-agent: Google-Extended
Allow: /

# Bing AI / Copilot
User-agent: Bingbot
Allow: /

# Apple AI (Applebot-Extended)
User-agent: Applebot-Extended
Allow: /

# Common Crawl (used by many AI training datasets)
User-agent: CCBot
Allow: /

# ============================================
# General Rules (All other crawlers)
# ============================================

User-agent: *
Allow: /

# Disallow sensitive/internal paths
Disallow: /api/*
Disallow: /admin/*
Disallow: /_next/*
Disallow: /static/*
Disallow: /checkout/*
Disallow: /cart/*
Disallow: /affiliate/dashboard/*

# ============================================
# Host & Sitemaps
# ============================================

Host: ${canonicalDomain}

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
