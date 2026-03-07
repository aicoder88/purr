/**
 * @jest-environment node
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  findInlineHeadViolationsInSource,
  validateNoInlineHeadTags,
} from '../../scripts/seo/validate-no-inline-head-tags';

describe('validate-no-inline-head-tags', () => {
  describe('findInlineHeadViolationsInSource', () => {
    it('flags raw title, meta, and canonical link tags in page JSX', () => {
      const source = `
        export default function Page() {
          return (
            <>
              <title>Bad</title>
              <meta name="description" content="Bad" />
              <link rel="canonical" href="https://example.com/bad/" />
            </>
          );
        }
      `;

      const result = findInlineHeadViolationsInSource(source, 'app/example/page.tsx');

      expect(result.allowedExceptions).toBe(0);
      expect(result.issues).toHaveLength(3);
      expect(result.issues.map((issue) => issue.tag)).toEqual([
        'title',
        'meta',
        'canonical-link',
      ]);
    });

    it('ignores non-canonical link tags', () => {
      const source = `
        export default function Page() {
          return <link rel="preload" href="/fonts/demo.woff2" as="font" />;
        }
      `;

      const result = findInlineHeadViolationsInSource(source, 'app/example/page.tsx');

      expect(result.issues).toHaveLength(0);
    });

    it('allows documented exceptions only when explicitly annotated', () => {
      const source = `
        export default function Page() {
          return (
            <>
              {/* seo-inline-head-allow: third-party embed injects this title requirement */}
              <title>Allowed</title>
            </>
          );
        }
      `;

      const result = findInlineHeadViolationsInSource(source, 'app/example/page.tsx');

      expect(result.issues).toHaveLength(0);
      expect(result.allowedExceptions).toBe(1);
    });
  });

  describe('validateNoInlineHeadTags', () => {
    it('scans page files only and reports violations', async () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'inline-head-guard-'));
      try {
        fs.mkdirSync(path.join(tempRoot, 'app', 'good'), { recursive: true });
        fs.mkdirSync(path.join(tempRoot, 'app', 'bad'), { recursive: true });

        fs.writeFileSync(
          path.join(tempRoot, 'app', 'good', 'page.tsx'),
          `
            export default function GoodPage() {
              return <main>ok</main>;
            }
          `,
        );
        fs.writeFileSync(
          path.join(tempRoot, 'app', 'bad', 'page.tsx'),
          `
            export default function BadPage() {
              return <meta name="description" content="bad" />;
            }
          `,
        );
        fs.writeFileSync(
          path.join(tempRoot, 'app', 'bad', 'layout.tsx'),
          `
            export default function Layout({ children }) {
              return (
                <html>
                  <head>
                    <title>Allowed in layout test fixture</title>
                  </head>
                  <body>{children}</body>
                </html>
              );
            }
          `,
        );

        const result = await validateNoInlineHeadTags(tempRoot);

        expect(result.scannedFiles).toBe(2);
        expect(result.passed).toBe(false);
        expect(result.issues).toHaveLength(1);
        expect(result.issues[0]).toMatchObject({
          file: 'app/bad/page.tsx',
          tag: 'meta',
        });
      } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
      }
    });
  });
});
