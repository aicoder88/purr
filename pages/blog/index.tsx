import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME, SITE_DESCRIPTION } from '../../src/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useTranslation } from '../../src/lib/translation-context';
import { ContentStore } from '../../src/lib/blog/content-store';
import type { BlogPost as BlogPostType } from '../../src/types/blog';
import { sampleBlogPosts } from '../../src/data/blog-posts';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  locale: string;
}

// This function gets called at build time on server-side
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log(`[BlogIndex] getStaticProps called for locale: ${locale}`);
  try {
    const store = new ContentStore();
    const currentLocale = (locale || 'en') as string;
    console.log(`[BlogIndex] Calling getAllPosts for locale: ${currentLocale}`);

    // Fetch all published posts from ContentStore
    let posts = await store.getAllPosts(currentLocale, false);
    console.log(`[BlogIndex] getAllPosts returned ${posts.length} posts`);

    // Fallback to sampleBlogPosts if ContentStore returns empty (Vercel serverless filesystem issue)
    if (posts.length === 0) {
      console.log('[BlogIndex] ContentStore empty, falling back to sampleBlogPosts');
      const blogPosts: BlogPost[] = sampleBlogPosts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        date: post.date,
        image: post.image,
        link: post.link,
        locale: post.locale || 'en',
      }));

      return {
        props: {
          blogPosts,
          locale: currentLocale,
        },
        revalidate: 3600,
      };
    }

    // Transform to match the component's expected format
    const blogPosts: BlogPost[] = posts.map((post: BlogPostType) => ({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author.name,
      date: new Date(post.publishDate).toISOString().split('T')[0],
      image: post.featuredImage.url,
      link: `/blog/${post.slug}`,
      locale: post.locale,
    }));

    return {
      props: {
        blogPosts,
        locale: currentLocale,
      },
      // Re-generate the page at most once per hour
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    // Fallback to sampleBlogPosts on error
    console.log('[BlogIndex] Error occurred, falling back to sampleBlogPosts');
    const blogPosts: BlogPost[] = sampleBlogPosts.map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      image: post.image,
      link: post.link,
      locale: post.locale || 'en',
    }));

    return {
      props: {
        blogPosts,
        locale: (locale || 'en') as string,
      },
      revalidate: 3600,
    };
  }
}

const POSTS_PER_PAGE = 20;

export default function Blog({ blogPosts, locale }: { blogPosts: BlogPost[], locale: string }) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const blogListRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const displayedPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (blogListRef.current) {
      const offset = 80; // Offset for header
      const elementPosition = blogListRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add noindex to French/Chinese blog pages until we have translated content
  const shouldNoindex = blogPosts.length === 0 && (locale === 'fr' || locale === 'zh');

  // Use enhanced SEO hook for optimized meta tags, breadcrumbs, and structured data
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/blog',
    title: `Blog | ${SITE_NAME} - Cat Care Tips & Insights`,
    description: 'Expert cat care guides: litter box odor solutions, multi-cat tips, apartment hacks. Learn why activated carbon beats baking soda. New articles weekly.',
    targetKeyword: 'cat litter odor tips',
    schemaType: 'organization',
    schemaData: {
      description: `Tips, tricks, and insights for cat owners who want a fresh-smelling home and happy, healthy cats. ${SITE_DESCRIPTION}`,
    },
    image: 'https://www.purrify.ca/images/purrify-logo.png',
    keywords: ['cat care tips', 'litter box odor', 'activated carbon', 'cat litter deodorizer', 'multi-cat tips'],
    noindex: shouldNoindex,
  });

  // Build CollectionPage schema with blog posts
  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.purrify.ca/blog',
        url: 'https://www.purrify.ca/blog',
        name: `${SITE_NAME} Blog - Cat Care Tips & Insights`,
        description: 'Expert cat care guides: litter box odor solutions, multi-cat tips, apartment hacks.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.purrify.ca/#website',
          name: SITE_NAME,
          url: 'https://www.purrify.ca',
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: blogPosts.slice(0, 10).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://www.purrify.ca${post.link}`,
            name: post.title,
          })),
        },
      },
      ...(breadcrumb ? [breadcrumb.schema] : []),
    ],
  };

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Structured Data - CollectionPage with Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />

      <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          {/* Visual Breadcrumb Navigation */}
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
                {breadcrumb.items.map((item, index) => (
                  <li key={item.path} className="flex items-center">
                    {index > 0 && (
                      <svg className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {index === breadcrumb.items.length - 1 ? (
                      <span aria-current="page" className="text-gray-900 dark:text-gray-50 dark:text-gray-100 font-medium">
                        {item.name}
                      </span>
                    ) : (
                      <Link href={item.path} className="hover:text-[#03E46A] dark:hover:text-[#03E46A] transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              {t.blogSection.catCareTips}
            </div>
            <h1 className="font-heading text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
              Purrify Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-300 dark:text-gray-400 dark:text-gray-500 dark:text-gray-300 dark:text-gray-400 dark:text-gray-500 text-lg">
              {t.blogSection.description}
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-300 dark:text-gray-400 dark:text-gray-500">No blog posts found. Check back soon!</p>
            </div>
          ) : (
            <div ref={blogListRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 cv-auto cis-960">
              {displayedPosts.map((post) => (
                <article
                  key={post.link}
                  className="bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-800/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-700 transition-all duration-500 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-gray-700/50 hover:-translate-y-2 group"
                >
                  <Link
                    href={post.link}
                    prefetch={true}
                    className="block cursor-pointer"
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={post.image || '/optimized/purrify-logo.avif'}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            // Fallback to Purrify logo if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = '/optimized/purrify-logo.avif';
                            target.onerror = null; // Prevent infinite loop
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="font-heading font-bold text-xl mb-3 text-[#5B2EFF] dark:text-[#3694FF] group-hover:text-[#5B2EFF]/80 dark:group-hover:text-[#3694FF]/80 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 dark:text-gray-400 dark:text-gray-500 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm mb-4">
                        <span className="text-[#03E46A] font-medium">
                          {post.author}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-500">{post.date}</span>
                      </div>
                      <div className="text-[#03E46A] font-medium flex items-center hover:text-[#03E46A]/80 transition-colors">
                        {t.blogSection.readFullArticle}
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700'
                    : 'bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-800 text-[#03E46A] hover:bg-[#03E46A] hover:text-white dark:text-gray-100 border border-[#E0EFC7] dark:border-gray-700 hover:border-transparent active:scale-95'
                  }`}
                aria-label="Previous Page"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-[#E0EFC7] dark:border-gray-700 shadow-md">
                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-500">Page</span>
                <span className="font-bold text-[#5B2EFF] dark:text-[#3694FF] min-w-[1.5rem] text-center">{currentPage}</span>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <span className="text-gray-600 dark:text-gray-300 dark:text-gray-400 dark:text-gray-500 font-medium">{totalPages}</span>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700'
                    : 'bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-900 dark:bg-white dark:bg-gray-800 text-[#03E46A] hover:bg-[#03E46A] hover:text-white dark:text-gray-100 border border-[#E0EFC7] dark:border-gray-700 hover:border-transparent active:scale-95'
                  }`}
                aria-label="Next Page"
              >
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
