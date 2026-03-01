import Link from 'next/link';
import { getRelatedPages, getClustersForPage } from '@/lib/seo/topic-clusters';

interface RelatedContentListProps {
  currentUrl: string;
  maxItems?: number;
  className?: string;
  title?: string;
}

export function RelatedContentList({
  currentUrl,
  maxItems = 5,
  className = '',
  title = 'Related Articles',
}: RelatedContentListProps) {
  const relatedPages = getRelatedPages(currentUrl, maxItems);

  if (relatedPages.length === 0) {
    return null;
  }

  const clusters = getClustersForPage(currentUrl);
  const clusterName = clusters[0]?.name || 'Related Topics';

  return (
    <section className={`related-content ${className}`}>
      <div className="border-t border-gray-200 border-gray-700 pt-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 text-gray-50 mb-6">
          {title}
        </h2>

        <div className="space-y-4">
          {relatedPages.map((page) => (
            <Link prefetch={false}
              key={page.url}
              href={page.url}
              className="block p-4 rounded-lg border border-gray-200 border-gray-700 hover:border-blue-500 hover:border-blue-400 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 text-gray-50 group-hover:text-blue-600 group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  {page.type === 'hub' && (
                    <span className="inline-block mt-2 text-xs font-medium text-blue-600 text-blue-400 bg-blue-50 bg-blue-900/30 px-2 py-1 rounded">
                      {clusterName} Hub
                    </span>
                  )}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 text-gray-500 group-hover:text-blue-600 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-3"
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
          <div className="mt-6 text-sm text-gray-600 text-gray-400">
            <p>
              Part of our{' '}
              <strong className="text-gray-900 text-gray-100">
                {clusterName}
              </strong>{' '}
              guide series
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RelatedContentList;
