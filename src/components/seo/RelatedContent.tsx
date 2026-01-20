/**
 * Related Content Component
 * Displays related articles/pages based on topic clusters for internal linking
 */

import Link from 'next/link';
import { getRelatedPages, getClustersForPage } from '@/lib/seo/topic-clusters';

interface RelatedContentProps {
  currentUrl: string;
  maxItems?: number;
  className?: string;
}

export function RelatedContent({
  currentUrl,
  maxItems = 5,
  className = '',
}: RelatedContentProps) {
  const relatedPages = getRelatedPages(currentUrl, maxItems);

  if (relatedPages.length === 0) {
    return null;
  }

  const clusters = getClustersForPage(currentUrl);
  const clusterName = clusters[0]?.name || 'Related Topics';

  return (
    <section className={`related-content ${className}`}>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
          Related Articles
        </h2>

        <div className="space-y-4">
          {relatedPages.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  {page.type === 'hub' && (
                    <span className="inline-block mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {clusterName} Hub
                    </span>
                  )}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {clusters.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Part of our <strong className="text-gray-900 dark:text-gray-100">{clusterName}</strong> guide series
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Compact version for sidebars
 */
export function RelatedContentSidebar({
  currentUrl,
  maxItems = 3,
}: RelatedContentProps) {
  const relatedPages = getRelatedPages(currentUrl, maxItems);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">
        Related Articles
      </h3>

      <ul className="space-y-3">
        {relatedPages.map((page) => (
          <li key={page.url}>
            <Link
              href={page.url}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
            >
              {page.title}
              {page.type === 'hub' && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  (Guide)
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Inline version for within content
 */
export function RelatedContentInline({
  currentUrl,
  context = '',
}: RelatedContentProps & { context?: string }) {
  const relatedPages = getRelatedPages(currentUrl, 3);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <aside className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg">
      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-3">
        {context || 'Learn More'}
      </h4>

      <ul className="space-y-2">
        {relatedPages.map((page) => (
          <li key={page.url}>
            <Link
              href={page.url}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
            >
              → {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
