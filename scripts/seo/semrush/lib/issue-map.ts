export type SemrushIssueBucket =
  | 'structured-data'
  | 'broken-links'
  | 'sitemap'
  | 'duplicate-title'
  | 'duplicate-meta-description'
  | 'hreflang'
  | 'http-4xx'
  | 'temporary-redirect'
  | 'long-title'
  | 'missing-h1'
  | 'low-word-count'
  | 'low-text-html-ratio'
  | 'uncached-assets';

export type SemrushIssueColumnMap = Record<string, SemrushIssueBucket>;

export const ISSUE_COLUMN_TO_BUCKET: SemrushIssueColumnMap = {
  'Structured data that contains markup errors': 'structured-data',
  'Broken internal links': 'broken-links',
  'Incorrect pages found in sitemap.xml': 'sitemap',
  'Duplicate title tag': 'duplicate-title',
  'Duplicate meta descriptions': 'duplicate-meta-description',
  'Issues with incorrect hreflang links': 'hreflang',
  'Issues with hreflang values': 'hreflang',
  'Hreflang conflicts within page source code': 'hreflang',
  '4xx errors': 'http-4xx',
  'Temporary redirects': 'temporary-redirect',
  'Title element is too long': 'long-title',
  'Missing h1': 'missing-h1',
  'Low word count': 'low-word-count',
  'Low text to HTML ratio': 'low-text-html-ratio',
  'Uncached JavaScript and CSS files': 'uncached-assets',
};

export const SCRIPT_FIXABLE_BUCKETS: ReadonlySet<SemrushIssueBucket> = new Set([
  'broken-links',
  'sitemap',
  'duplicate-title',
  'duplicate-meta-description',
  'hreflang',
  'http-4xx',
  'temporary-redirect',
  'long-title',
  'missing-h1',
  'low-word-count',
  'uncached-assets',
]);

export const MANUAL_BUCKETS: ReadonlySet<SemrushIssueBucket> = new Set([
  'structured-data',
  'low-text-html-ratio',
]);
