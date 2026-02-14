'use client';

/**
 * Related Content Component
 * Displays related articles/pages based on topic clusters for internal linking
 * Enhanced with image support for visual engagement
 * Now with lazy loading using IntersectionObserver
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRelatedPages, getClustersForPage } from '@/lib/seo/topic-clusters';
import { getPageImage } from '@/lib/seo/page-images';
import { Container } from '@/components/ui/container';
import { TranslationContext } from '@/lib/translation-context';
import { useContext } from 'react';

// Default translations for when TranslationProvider is not available
const defaultTranslations = {
  relatedArticles: {
    title: 'Related Articles',
    readMore: 'Read more',
  },
};

interface RelatedContentProps {
  currentUrl: string;
  maxItems?: number;
  className?: string;
}

// Safe hook that correctly uses context without violating rules of hooks
function useSafeTranslation() {
  // Use the exported context directly
  const context = useContext(TranslationContext);

  // If context is undefined (provider missing), return default values
  if (context === undefined) {
    return {
      t: defaultTranslations,
      locale: 'en' as const,
      changeLocale: () => { }
    };
  }

  return context;
}

/**
 * Main RelatedContent component with image cards
 * Replaces static RelatedArticles with dynamic topic-cluster-based recommendations
 * Lazy loads content when entering viewport using IntersectionObserver
 */
export function RelatedContent({
  currentUrl,
  maxItems = 3,
  className = '',
}: RelatedContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Call hooks unconditionally at the top level (React rules of hooks)
  const { t } = useSafeTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Start loading 100px before viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show skeleton placeholder while not visible
  if (!isVisible) {
    return (
      <section ref={sectionRef} aria-label="Related articles" className={`py-12 ${className}`}>
        <Container>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const relatedPages = getRelatedPages(currentUrl, maxItems);

  if (relatedPages.length === 0) {
    return null;
  }

  const clusters = getClustersForPage(currentUrl);
  const clusterName = clusters[0]?.name || 'Related Topics';

  return (
    <section ref={sectionRef} aria-label="Related articles" className={`py-12 ${className}`}>
      <Container>
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {t.relatedArticles?.title || 'Related Articles'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPages.map((page) => {
            const pageImage = getPageImage(page.url);
            return (
              <article
                key={page.url}
                className="group rounded-xl overflow-hidden border border-[#E0EFC7] dark:border-gray-700 bg-white dark:bg-gray-800/80 shadow-sm hover:shadow-md transition-all"
              >
                <Link prefetch={false}
                  href={page.url}
                  className="block focus:outline-none focus:ring-2 focus:ring-[#03E46A]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={pageImage.image}
                      alt={pageImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {page.type === 'hub' && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-block text-xs font-medium text-white dark:text-gray-100 bg-blue-600 dark:bg-blue-500 px-2 py-1 rounded shadow-sm">
                          {clusterName} Hub
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-[#5B2EFF] dark:text-[#3694FF] group-hover:text-[#5B2EFF]/80 dark:group-hover:text-[#3694FF]/80">
                      {page.title}
                    </h3>
                    <p className="text-sm text-[#03E46A] dark:text-[#3694FF] mt-2">
                      {t.relatedArticles?.readMore || 'Read more'} →
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        {clusters.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
            <p>
              Part of our{' '}
              <strong className="text-gray-900 dark:text-gray-100">
                {clusterName}
              </strong>{' '}
              guide series
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * Compact list version without images for sidebars
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
            <Link prefetch={false}
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

/**
 * Simple list version (matches original RelatedContent behavior)
 */
export function RelatedContentList({
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
            <Link prefetch={false}
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
              Part of our{' '}
              <strong className="text-gray-900 dark:text-gray-100">
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

export default RelatedContent;
