/** @jest-environment node */

import http from 'node:http';
import {
  extractLocValues,
  validateRenderedHeadSnapshot,
  validateRenderedSeo,
} from '../../scripts/seo/validate-rendered-seo';

describe('validate-rendered-seo', () => {
  it('extracts sitemap <loc> values', () => {
    const xml = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://www.purrify.ca/one/</loc></url>
        <url><loc>https://www.purrify.ca/two/</loc></url>
      </urlset>
    `;

    expect(extractLocValues(xml)).toEqual([
      'https://www.purrify.ca/one/',
      'https://www.purrify.ca/two/',
    ]);
  });

  it('flags contradictory rendered head tags', () => {
    const issues = validateRenderedHeadSnapshot(
      {
        titleCount: 2,
        metaDescriptionCount: 2,
        canonicalHrefs: ['/relative-canonical', 'https://www.purrify.ca/other/'],
        ogUrls: ['https://www.purrify.ca/page/'],
        robotsMetaContents: ['index, noindex'],
        googlebotMetaContents: ['nofollow'],
        hreflangLinks: [
          { hreflang: 'en-CA', href: 'https://www.purrify.ca/page/' },
          { hreflang: 'en-CA', href: 'https://www.purrify.ca/other/' },
          { hreflang: 'bad_code', href: '/relative' },
        ],
        jsonLdBlocks: ['{"@context":"https://schema.org","@type":"Article"}'],
      },
      'https://www.purrify.ca/page/',
      'http://127.0.0.1:3123/page/'
    );

    expect(issues.some((issue) => issue.type === 'canonical')).toBe(true);
    expect(issues.some((issue) => issue.type === 'robots')).toBe(true);
    expect(issues.some((issue) => issue.type === 'hreflang')).toBe(true);
    expect(issues.some((issue) => issue.type === 'head')).toBe(true);
    expect(issues.some((issue) => issue.type === 'json-ld')).toBe(true);
  });

  it('crawls sitemap-discovered pages with Playwright rendering', async () => {
    const server = http.createServer((request, response) => {
      const { url = '/' } = request;

      if (url === '/sitemap.xml') {
        response.writeHead(200, { 'content-type': 'application/xml' });
        response.end(`
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url><loc>https://www.purrify.ca/ok/</loc></url>
            <url><loc>https://www.purrify.ca/bad/</loc></url>
            <url><loc>https://www.purrify.ca/missing/</loc></url>
          </urlset>
        `);
        return;
      }

      if (url === '/ok/') {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end(`
          <!doctype html>
          <html>
            <head>
              <title>OK</title>
              <meta name="description" content="Valid page" />
              <link rel="canonical" href="https://www.purrify.ca/ok/" />
              <link rel="alternate" hreflang="en-CA" href="https://www.purrify.ca/ok/" />
              <link rel="alternate" hreflang="fr-CA" href="https://www.purrify.ca/fr/ok/" />
              <link rel="alternate" hreflang="x-default" href="https://www.purrify.ca/ok/" />
              <meta name="robots" content="index, follow" />
              <meta name="googlebot" content="index, follow" />
              <meta property="og:url" content="https://www.purrify.ca/ok/" />
              <script type="application/ld+json">
                {"@context":"https://schema.org","@type":"Article","headline":"Valid","datePublished":"2026-03-08"}
              </script>
            </head>
            <body><h1>Valid</h1></body>
          </html>
        `);
        return;
      }

      if (url === '/bad/') {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end(`
          <!doctype html>
          <html>
            <head>
              <title>Bad</title>
              <link rel="canonical" href="/bad/" />
              <meta name="robots" content="index, noindex" />
              <meta name="googlebot" content="follow, nofollow" />
              <link rel="alternate" hreflang="en-CA" href="https://www.purrify.ca/bad/" />
              <link rel="alternate" hreflang="en-CA" href="https://www.purrify.ca/bad-alt/" />
              <script type="application/ld+json">{"@context":"https://schema.org","@type":"Product"}</script>
            </head>
            <body><h1>Bad</h1></body>
          </html>
        `);
        return;
      }

      response.writeHead(404, { 'content-type': 'text/html' });
      response.end(`
        <!doctype html>
        <html>
          <head><title>Missing</title></head>
          <body><h1>Not found</h1></body>
        </html>
      `);
    });

    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => resolve());
    });

    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Could not bind test server');
    }

    const baseUrl = `http://127.0.0.1:${address.port}`;

    try {
      const result = await validateRenderedSeo({
        baseUrl,
        startServer: false,
        sitemapUrl: 'https://www.purrify.ca/sitemap.xml',
        timeoutMs: 15_000,
        concurrency: 1,
      });

      expect(result.pagesChecked).toBe(3);
      expect(result.passed).toBe(false);
      expect(result.issues.some((issue) => issue.url.endsWith('/bad/') && issue.type === 'canonical')).toBe(true);
      expect(result.issues.some((issue) => issue.url.endsWith('/bad/') && issue.type === 'robots')).toBe(true);
      expect(result.issues.some((issue) => issue.url.endsWith('/bad/') && issue.type === 'json-ld')).toBe(true);
      expect(result.issues.some((issue) => issue.url.endsWith('/missing/') && issue.type === 'status')).toBe(true);
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }
  });
});
