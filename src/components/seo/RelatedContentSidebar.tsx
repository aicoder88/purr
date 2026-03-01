import Link from 'next/link';
import { getRelatedPages } from '@/lib/seo/topic-clusters';

interface RelatedContentSidebarProps {
  currentUrl: string;
  maxItems?: number;
  title?: string;
}

export function RelatedContentSidebar({
  currentUrl,
  maxItems = 3,
  title = 'Related Articles',
}: RelatedContentSidebarProps) {
  const relatedPages = getRelatedPages(currentUrl, maxItems);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 text-gray-50 mb-4">
        {title}
      </h3>

      <ul className="space-y-3">
        {relatedPages.map((page) => (
          <li key={page.url}>
            <Link prefetch={false}
              href={page.url}
              className="text-blue-600 text-blue-400 hover:text-blue-700 hover:text-blue-300 hover:underline"
            >
              {page.title}
              {page.type === 'hub' && (
                <span className="ml-2 text-xs text-gray-500 text-gray-400">
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

export default RelatedContentSidebar;
