import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts } from '@/data/blog-posts';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { getUserLocale } from '@/lib/locale';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
  description: `Expert advice on cat litter boxes, odor control, and pet care. ${SITE_DESCRIPTION}`,
  keywords: 'cat litter blog, pet care tips, litter box advice, cat odor solutions, feline health',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      'en-CA': `${SITE_URL}/blog`,
      'fr-CA': `${SITE_URL}/fr/blog`,
      'zh-CN': `${SITE_URL}/zh/blog`,
      'es': `${SITE_URL}/es/blog`,
      'x-default': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
    description: `Expert advice on cat litter boxes, odor control, and pet care.`,
    url: `${SITE_URL}/blog`,
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
    const locale = await getUserLocale();
    const store = new ContentStore();
    const posts = await store.getAllPosts(locale, false);

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

const POSTS_PER_PAGE = 15;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const locale = await getUserLocale();
  const allBlogPosts = await getBlogPosts();

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const totalPosts = allBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, endIndex);

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    description: SITE_DESCRIPTION,
    blogPost: currentPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}${post.link}`,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-white to-[#FFFFF5] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-16 border-b border-gray-100 dark:border-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Purrify Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Expert tips on cat care, litter box odor control, and more.
              </p>
            </div>
          </Container>
        </section>

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
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 dark:text-gray-600 font-medium flex items-center gap-2 cursor-not-allowed">
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
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 dark:text-gray-600 font-medium flex items-center gap-2 cursor-not-allowed">
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
