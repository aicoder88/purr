import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { SITE_NAME } from '../../../src/lib/constants';
import { ContentStore } from '../../../src/lib/blog/content-store';
import { SEOGenerator } from '../../../src/lib/blog/seo-generator';
import type { BlogPost, Category } from '../../../src/types/blog';

interface CategoryArchiveProps {
  category: Category;
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

export default function CategoryArchive({ category, posts, seo }: CategoryArchiveProps) {
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={seo.canonical} />
      </Head>

      <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              Category
            </div>
            <h1 className="font-heading text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {category.description}
              </p>
            )}
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-300">No posts found in this category.</p>
              <Link
                href="/blog"
                className="text-[#03E46A] hover:text-[#03E46A]/80 mt-4 inline-block"
              >
                ← Back to all posts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div
                  key={index}
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
  const categories = await store.getCategories();
  const locales = ['en', 'fr', 'zh'];

  const paths = [];
  for (const locale of locales) {
    for (const category of categories) {
      paths.push({
        params: { slug: category.slug },
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
  const seoGenerator = new SEOGenerator();

  // Get category
  const categories = await store.getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      notFound: true,
    };
  }

  // Get posts in this category
  const allPosts = await store.getPostsByCategory(category.id, currentLocale);

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
    title: `${category.name} | ${SITE_NAME} Blog`,
    description: category.description || `Browse all posts in ${category.name}`,
    canonical: `${baseUrl}/${currentLocale}/blog/category/${slug}`,
  };

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      posts,
      seo,
    },
    revalidate: 3600,
  };
};
