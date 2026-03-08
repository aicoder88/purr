import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  getBlogSitemapPosts,
  getLatestContentDate,
  getStaticRouteLastModified,
} from '@/lib/seo/sitemap-lastmod';

function writeFile(rootDir: string, relativePath: string, content: string, modifiedAt: string) {
  const absolutePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, 'utf-8');

  const modifiedDate = new Date(modifiedAt);
  fs.utimesSync(absolutePath, modifiedDate, modifiedDate);
}

describe('sitemap lastModified helpers', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'purr-sitemap-lastmod-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('uses blog content dates before filesystem mtimes', () => {
    writeFile(
      tempDir,
      'content/blog/en/with-modified.json',
      JSON.stringify({
        modifiedDate: '2026-02-14',
        publishDate: '2026-01-10',
        translations: {
          fr: 'https://www.purrify.ca/fr/blog/avec-modified/',
        },
      }),
      '2026-03-01T08:00:00.000Z'
    );
    writeFile(
      tempDir,
      'content/blog/en/with-publish-only.json',
      JSON.stringify({
        publishDate: '2026-01-11',
      }),
      '2026-03-02T08:00:00.000Z'
    );
    writeFile(
      tempDir,
      'content/blog/en/mtime-fallback.json',
      '{not valid json',
      '2025-12-01T15:30:00.000Z'
    );

    const postsBySlug = new Map(
      getBlogSitemapPosts('en', tempDir).map((post) => [post.slug, post])
    );

    expect(postsBySlug.get('with-modified')).toMatchObject({
      slug: 'with-modified',
      lastmod: '2026-02-14',
      frTranslationSlug: 'avec-modified',
    });
    expect(postsBySlug.get('with-publish-only')).toMatchObject({
      slug: 'with-publish-only',
      lastmod: '2026-01-11',
      frTranslationSlug: null,
    });
    expect(postsBySlug.get('mtime-fallback')).toMatchObject({
      slug: 'mtime-fallback',
      lastmod: '2025-12-01',
      frTranslationSlug: null,
    });
  });

  it('derives stable static route dates from source mtimes instead of now', () => {
    writeFile(tempDir, 'app/support/page.tsx', 'export default function Page() { return null; }', '2026-02-02T09:00:00.000Z');
    writeFile(tempDir, 'app/support/SupportPageClient.tsx', 'export function SupportPageClient() { return null; }', '2026-02-05T11:00:00.000Z');
    writeFile(tempDir, 'app/locations/[citySlug]/page.tsx', 'export default function City() { return null; }', '2026-01-20T12:00:00.000Z');

    expect(getStaticRouteLastModified('/support/', tempDir)).toBe('2026-02-05');
    expect(getStaticRouteLastModified('/support/', tempDir)).toBe('2026-02-05');
    expect(getStaticRouteLastModified('/locations/toronto/', tempDir)).toBe('2026-01-20');
  });

  it('returns undefined when no trusted source exists and picks the newest content date', () => {
    expect(getStaticRouteLastModified('/missing-route/', tempDir)).toBeUndefined();

    expect(getLatestContentDate([
      { publishDate: '2026-01-05', modifiedDate: '2026-01-10' },
      { publishDate: '2026-02-03' },
      { publishDate: 'invalid-date', modifiedDate: null },
    ])).toBe('2026-02-03');
  });
});
