import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { SITE_NAME } from '../../../src/lib/constants';
import { ContentStore } from '../../../src/lib/blog/content-store';
import { useEnhancedSEO } from '../../../src/hooks/useEnhancedSEO';
import type { BlogPost, Tag } from '../../../src/types/blog';

interface TagArchiveProps {
  tag: Tag;
  posts: Array<{
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    link: string;
  }>;
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
}

export default function TagArchive({ tag, posts, seo }: TagArchiveProps) {
  // Use enhanced SEO hook for optimized meta tags, breadcrumbs, and structured data
  const { nextSeoProps, breadcrumb } = useEnhancedSEO({
    path: `/blog/tag/${tag.slug}`,
    title: seo.title,
    description: seo.description,
    schemaType: 'organization',
    schemaData: {
      description: seo.description,
    },
  });

  // Build CollectionPage schema with tag posts
  const tagCollectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': seo.canonical,
        url: seo.canonical,
        name: `#${tag.name} - ${SITE_NAME} Blog`,
        description: seo.description,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.purrify.ca/#website',
          name: SITE_NAME,
          url: 'https://www.purrify.ca',
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts.slice(0, 10).map((post, index) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tagCollectionSchema) }}
      />

      <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          {/* Visual Breadcrumb Navigation */}
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {breadcrumb.items.map((item, index) => (
                  <li key={item.path} className="flex items-center">
                    {index > 0 && (
                      <svg className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {index === breadcrumb.items.length - 1 ? (
                      <span aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">
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
              Tag
            </div>
            <h1 className="font-heading text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
              #{tag.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-300">No posts found with this tag.</p>
              <Link
                href="/blog"
                className="text-[#03E46A] hover:text-[#03E46A]/80 mt-4 inline-block"
              >
                ← Back to all posts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.link}
                  className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-700 transition-all duration-500 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-gray-700/50 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-xl mb-3 text-[#5B2EFF] dark:text-[#3694FF] group-hover:text-[#5B2EFF]/80 dark:group-hover:text-[#3694FF]/80 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#03E46A] font-medium">
                        {post.author}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">{post.date}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={post.link}
                      className="text-[#03E46A] font-medium flex items-center hover:text-[#03E46A]/80 transition-colors"
                    >
                      Read Article
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
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="text-[#03E46A] hover:text-[#03E46A]/80 font-medium"
            >
              ← Back to all posts
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const store = new ContentStore();
  const tags = await store.getTags();
  const locales = ['en', 'fr', 'zh'];

  const paths = [];
  for (const locale of locales) {
    for (const tag of tags) {
      paths.push({
        params: { slug: tag.slug },
        locale,
      });
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const currentLocale = (locale || 'en') as string;

  const store = new ContentStore();

  // Get tag
  const tags = await store.getTags();
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    return {
      notFound: true,
    };
  }

  // Get posts with this tag
  const allPosts = await store.getPostsByTag(tag.id, currentLocale);

  const posts = allPosts.map((post: BlogPost) => ({
    title: post.title,
    excerpt: post.excerpt,
    author: post.author.name,
    date: new Date(post.publishDate).toISOString().split('T')[0],
    image: post.featuredImage.url,
    link: `/blog/${post.slug}`,
  }));

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca';
  const seo = {
    title: `${tag.name} | ${SITE_NAME} Blog`,
    description: `Browse all posts tagged with ${tag.name}`,
    canonical: `${baseUrl}/${currentLocale}/blog/tag/${slug}`,
  };

  return {
    props: {
      tag: structuredClone(tag),
      posts,
      seo,
    },
    revalidate: 3600,
  };
};
