/**
 * Hub-Spoke Navigation Component
 * Shows "In This Guide" section for hub pages, listing all spoke pages
 * Improves internal linking and helps users navigate topic clusters
 */

import Link from 'next/link';
import { TOPIC_CLUSTERS, TopicCluster } from '@/lib/seo/topic-clusters';

interface HubSpokeNavProps {
  /** The cluster ID to display spokes for */
  clusterId: string;
  /** Current page URL to highlight/exclude */
  currentUrl?: string;
  /** Optional title override */
  title?: string;
  /** Optional class name */
  className?: string;
}

/**
 * Convert URL to human-readable title
 */
function urlToTitle(url: string): string {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1];

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Group spokes by type (blog, learn, products)
 */
function groupSpokesByType(
  spokes: string[]
): Record<string, { url: string; title: string }[]> {
  const groups: Record<string, { url: string; title: string }[]> = {
    blog: [],
    learn: [],
    products: [],
    other: [],
  };

  for (const url of spokes) {
    const item = { url, title: urlToTitle(url) };

    if (url.startsWith('/blog/')) {
      groups.blog.push(item);
    } else if (url.startsWith('/learn/')) {
      groups.learn.push(item);
    } else if (url.startsWith('/products/')) {
      groups.products.push(item);
    } else {
      groups.other.push(item);
    }
  }

  return groups;
}

/**
 * HubSpokeNav component
 * Displays all spoke pages for a topic cluster hub
 */
export function HubSpokeNav({
  clusterId,
  currentUrl,
  title,
  className = '',
}: HubSpokeNavProps) {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === clusterId);

  if (!cluster) {
    return null;
  }

  // Filter out current page from spokes
  const spokes = cluster.spokes.filter((url) => url !== currentUrl);

  if (spokes.length === 0) {
    return null;
  }

  const groups = groupSpokesByType(spokes);

  return (
    <nav
      aria-label="Guide contents"
      className={`hub-spoke-nav bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/80 rounded-xl p-6 ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        {title || 'In This Guide'}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {cluster.description}
      </p>

      <div className="space-y-4">
        {/* Blog Articles */}
        {groups.blog.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
              Related Articles
            </h4>
            <ul className="space-y-1">
              {groups.blog.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="group flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learn Guides */}
        {groups.learn.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
              Guides
            </h4>
            <ul className="space-y-1">
              {groups.learn.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="group flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Products */}
        {groups.products.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
              Products
            </h4>
            <ul className="space-y-1">
              {groups.products.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="group flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * Compact sidebar version of HubSpokeNav
 */
export function HubSpokeNavSidebar({
  clusterId,
  currentUrl,
}: Omit<HubSpokeNavProps, 'className'>) {
  const cluster = TOPIC_CLUSTERS.find((c) => c.id === clusterId);

  if (!cluster) {
    return null;
  }

  const spokes = cluster.spokes.filter((url) => url !== currentUrl);

  if (spokes.length === 0) {
    return null;
  }

  return (
    <aside className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-3">
        {cluster.name}
      </h4>
      <ul className="space-y-2">
        {spokes.slice(0, 5).map((url) => (
          <li key={url}>
            <Link
              href={url}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
            >
              {urlToTitle(url)}
            </Link>
          </li>
        ))}
      </ul>
      {spokes.length > 5 && (
        <Link
          href={cluster.hubPage}
          className="block mt-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          +{spokes.length - 5} more articles
        </Link>
      )}
    </aside>
  );
}

/**
 * Get the cluster that a page belongs to (for use in pages)
 */
export function getClusterForHub(
  hubUrl: string
): TopicCluster | null {
  return TOPIC_CLUSTERS.find((c) => c.hubPage === hubUrl) || null;
}

export default HubSpokeNav;
