import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts } from '@/data/blog-posts';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
  description: `Expert advice on cat litter boxes, odor control, and pet care. ${SITE_DESCRIPTION}`,
  keywords: 'cat litter blog, pet care tips, litter box advice, cat odor solutions, feline health',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
    description: `Expert advice on cat litter boxes, odor control, and pet care.`,
    url: 'https://www.purrify.ca/blog',
    type: 'website',
  },
};

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  locale: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const store = new ContentStore();
    const posts = await store.getAllPosts('en', false);

    // Fallback to sampleBlogPosts if ContentStore returns empty
    if (posts.length === 0) {
      return sampleBlogPosts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        date: post.date,
        image: post.image,
        link: post.link,
        locale: post.locale || 'en',
      }));
    }

    // Transform to match the expected format
    return posts.map((post) => {
      // Safely parse date with fallback
      let dateStr: string;
      try {
        const parsedDate = post.publishDate ? new Date(post.publishDate) : null;
        dateStr = parsedDate && !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
      } catch {
        dateStr = new Date().toISOString().split('T')[0];
      }

      return {
        title: post.title,
        excerpt: post.excerpt,
        author: post.author?.name || 'Purrify Team',
        date: dateStr,
        image: post.featuredImage?.url || '/optimized/cat-litter-hero.webp',
        link: `/blog/${post.slug}`,
        locale: post.locale || 'en',
      };
    });
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    // Fallback to sampleBlogPosts on error
    return sampleBlogPosts.map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      image: post.image,
      link: post.link,
      locale: post.locale || 'en',
    }));
  }
}

// ... imports

const POSTS_PER_PAGE = 15;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const allBlogPosts = await getBlogPosts();

  const currentPage = Number(searchParams.page) || 1;
  const totalPosts = allBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, endIndex);

  // Generate lastUpdated date within last 90 days
  const lastUpdated = '2025-11-15';
  
  // Generate Blog schema with CollectionPage and BlogPosting items
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Blog schema - represents the blog as a whole
      {
        '@type': 'Blog',
        '@id': 'https://www.purrify.ca/blog',
        name: 'Purrify Blog - Cat Care Tips & Litter Box Advice',
        url: 'https://www.purrify.ca/blog',
        description: 'Expert advice on cat litter boxes, odor control, and pet care. Tips, guides, and science-backed solutions for cat owners.',
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          url: 'https://www.purrify.ca',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.purrify.ca/optimized/logo-icon-512.webp',
            width: 512,
            height: 512
          }
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://www.purrify.ca/images/purrify-logo.png',
          width: 1200,
          height: 630
        },
        inLanguage: 'en-CA',
        dateModified: lastUpdated
      },
      // CollectionPage schema - represents this listing page
      {
        '@type': 'CollectionPage',
        '@id': `https://www.purrify.ca/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        url: `https://www.purrify.ca/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        name: `Blog - Cat Care Tips & Litter Box Advice | Page ${currentPage}`,
        description: `Expert advice on cat litter boxes, odor control, and pet care. Page ${currentPage} of ${totalPages}.`,
        isPartOf: {
          '@type': 'Blog',
          '@id': 'https://www.purrify.ca/blog'
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: currentPosts.map((post, index) => ({
            '@type': 'ListItem',
            position: startIndex + index + 1,
            item: {
              '@type': 'BlogPosting',
              '@id': `https://www.purrify.ca${post.link}`,
              url: `https://www.purrify.ca${post.link}`,
              headline: post.title,
              name: post.title,
              description: post.excerpt,
              image: post.image.startsWith('http') ? post.image : `https://www.purrify.ca${post.image}`,
              author: {
                '@type': 'Person',
                name: post.author
              },
              publisher: {
                '@type': 'Organization',
                name: 'Purrify',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.purrify.ca/optimized/logo-icon-512.webp'
                }
              },
              datePublished: post.date,
              dateModified: post.date,
              inLanguage: post.locale === 'fr' ? 'fr-CA' : post.locale === 'zh' ? 'zh-CN' : 'en-CA',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.purrify.ca${post.link}`
              }
            }
          }))
        },
        pagination: totalPages > 1 ? {
          '@type': 'PropertyValue',
          name: 'pagination',
          value: `Page ${currentPage} of ${totalPages}`
        } : undefined,
        dateModified: lastUpdated
      },
      // BreadcrumbList schema
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.purrify.ca'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.purrify.ca/blog'
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-white to-[#FFFFF5] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* ... Hero Section ... */}

        {/* Blog Posts Grid */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post) => (
                <article
                  key={post.link}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                >
                  <Link href={post.link} className="block relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {(() => {
                          try {
                            const d = new Date(post.date);
                            if (isNaN(d.getTime())) return post.date || 'Unknown date';
                            return d.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            });
                          } catch {
                            return post.date || 'Unknown date';
                          }
                        })()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-electric-indigo transition-colors line-clamp-2">
                      <Link href={post.link}>{post.title}</Link>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <Link
                      href={post.link}
                      className="inline-flex items-center gap-2 text-electric-indigo font-semibold hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                {currentPage > 1 ? (
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2"
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-400 dark:text-gray-600 font-medium flex items-center gap-2 cursor-not-allowed">
                    ← Previous
                  </span>
                )}

                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-400 dark:text-gray-600 font-medium flex items-center gap-2 cursor-not-allowed">
                    Next →
                  </span>
                )}
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
