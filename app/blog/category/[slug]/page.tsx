import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { ContentStore } from '@/lib/blog/content-store';
import type { BlogPost } from '@/types/blog';

interface CategoryArchivePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const store = new ContentStore();
  const categories = await store.getCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }: CategoryArchivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = new ContentStore();
  const categories = await store.getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} | ${SITE_NAME} Blog`,
    description: category.description || `Browse all posts in ${category.name}`,
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} - ${SITE_NAME} Blog`,
      description: category.description || `Browse all posts in ${category.name}`,
      url: `${SITE_URL}/blog/category/${slug}`,
      type: 'website',
    },
  };
}

interface PostSummary {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
}

async function getCategoryData(slug: string): Promise<{
  category: { id: string; name: string; slug: string; description: string } | null;
  posts: PostSummary[];
}> {
  const store = new ContentStore();

  // Get category
  const categories = await store.getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { category: null, posts: [] };
  }

  // Get posts in this category
  const allPosts = await store.getPostsByCategory(category.id, 'en');

  const posts = allPosts.map((post: BlogPost) => ({
    title: post.title,
    excerpt: post.excerpt,
    author: post.author.name,
    date: new Date(post.publishDate).toISOString().split('T')[0],
    image: post.featuredImage.url,
    link: `/blog/${post.slug}`,
  }));

  return {
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    },
    posts,
  };
}

export default async function CategoryArchivePage({ params }: CategoryArchivePageProps) {
  const { slug } = await params;
  const { category, posts } = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/blog/category/${slug}`;

  // Build CollectionPage schema with category posts
  const categoryCollectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: `${category.name} - ${SITE_NAME} Blog`,
        description: category.description || `Browse all posts in ${category.name}`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts.slice(0, 10).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}${post.link}`,
            name: post.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.name, path: `/blog/category/${slug}` },
  ];

  return (
    <>
      {/* Structured Data - CollectionPage with Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryCollectionSchema) }}
      />

      <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          {/* Visual Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {breadcrumbItems.map((item, index) => (
                <li key={item.path} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {index === breadcrumbItems.length - 1 ? (
                    <span aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="hover:text-[#03E46A] dark:hover:text-[#03E46A] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              Category
            </div>
            <h1 className="font-heading text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-600 dark:text-gray-300 text-lg">{category.description}</p>
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
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#03E46A] font-medium">{post.author}</span>
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
            <Link href="/blog" className="text-[#03E46A] hover:text-[#03E46A]/80 font-medium">
              ← Back to all posts
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
