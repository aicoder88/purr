/**
 * Related Content Component
 * Server-rendered to keep internal links visible in static HTML
 */

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { getPageImage } from '@/lib/seo/page-images';

interface RelatedContentClientProps {
  relatedPages: Array<{ url: string; title: string; type: 'hub' | 'spoke' }>;
  clusterName: string;
  title: string;
  readMoreText: string;
  className?: string;
}

export function RelatedContentClient({
  relatedPages,
  clusterName,
  title,
  readMoreText,
  className = '',
}: RelatedContentClientProps) {
  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <section aria-label="Related articles" className={`py-12 ${className}`}>
      <Container>
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {title}
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
                    <p className="text-sm text-electric-indigo-600 dark:text-indigo-400 mt-2">
                      {readMoreText} →
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default RelatedContentClient;
