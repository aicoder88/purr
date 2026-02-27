import Link from 'next/link';
import { getRelatedPages } from '@/lib/seo/topic-clusters';

interface RelatedContentInlineProps {
  currentUrl: string;
  context?: string;
  maxItems?: number;
}

export function RelatedContentInline({
  currentUrl,
  context = 'Learn More',
  maxItems = 3,
}: RelatedContentInlineProps) {
  const relatedPages = getRelatedPages(currentUrl, maxItems);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <aside className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg">
      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-3">
        {context}
      </h4>

      <ul className="space-y-2">
        {relatedPages.map((page) => (
          <li key={page.url}>
            <Link prefetch={false}
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

export default RelatedContentInline;
