/**
 * Related Content Component
 * Server-rendered to keep internal links visible in static HTML
 */

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { BLOG_FEATURED_IMAGE_MAP } from '@/generated/blog-featured-image-map';


interface RelatedContentClientProps {
  relatedPages: Array<{ url: string; title: string; type: 'hub' | 'spoke' }>;
  clusterName: string;
  title: string;
  readMoreText: string;
  className?: string;
}

function normalizePath(url: string): string {
  const withoutQuery = url.split('?')[0].split('#')[0];
  return withoutQuery.replace(/\/+$/, '') || '/';
}

function getPageImage(url: string): { image: string; alt: string } {
  const normalizedUrl = normalizePath(url);
  const localeAgnosticUrl = normalizedUrl.replace(/^\/(en|fr|es|zh)(?=\/)/, '') || '/';
  const blogImage = BLOG_FEATURED_IMAGE_MAP[normalizedUrl] || BLOG_FEATURED_IMAGE_MAP[localeAgnosticUrl];
  if (blogImage) {
    return blogImage;
  }

  const pageImages: Record<string, { image: string; alt: string }> = {
    '/learn': { image: '/optimized/blog/cat-litter-deodorizer-guide.webp', alt: 'Cat litter box maintenance guide' },
    '/learn/faq': { image: '/optimized/blog/multi-cat-household.webp', alt: 'Multi-cat household tips' },
    '/learn/cat-litter-guide': { image: '/optimized/blog/cat-litter-deodorizer-guide.webp', alt: 'Cat litter substrate guide' },
    '/learn/how-it-works': { image: '/optimized/blog/Carbon-sktech.webp', alt: 'How activated carbon works' },
    '/learn/science': { image: '/optimized/blog/science-molecule-lab.webp', alt: 'Science of activated carbon' },
    '/learn/safety': { image: '/optimized/blog/deodorizers-with-kittens.webp', alt: 'Safety information' },
    '/learn/glossary': { image: '/optimized/blog/cat-litter-deodorizer-guide.webp', alt: 'Glossary of terms' },
    '/learn/alternatives': { image: '/optimized/blog/powder-vs-spray-hero-828w.avif', alt: 'Product alternatives' },
    '/b2b': { image: '/optimized/blog/multi-cat-household.webp', alt: 'B2B wholesale partnership' },
    '/contact': { image: '/optimized/blog/happy-owner-cat-ghibli.webp', alt: 'Contact us' },
  };

  return pageImages[normalizedUrl] || { image: '/optimized/blog/cat-litter-deodorizer-guide.webp', alt: 'Related article' };
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
                      {readMoreText}: {page.title} →
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
