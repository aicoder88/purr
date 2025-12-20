import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Container } from '../../../src/components/ui/container';
import { ContentStore } from '../../../src/lib/blog/content-store';
import type { BlogPost } from '../../../src/types/blog';

interface PreviewPageProps {
  post: BlogPost;
  isPreview: boolean;
}

export default function PreviewPage({ post, isPreview }: PreviewPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} - Preview</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {isPreview && (
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border-b border-yellow-300 dark:border-yellow-700 py-2">
          <Container>
            <p className="text-center text-yellow-800 dark:text-yellow-200 text-sm font-medium">
              ⚠️ Preview Mode - This post is not published yet
            </p>
          </Container>
        </div>
      )}

      <article className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{post.author.name}</span>
                <span>•</span>
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString()}
                </time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Categories and Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              {post.categories.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    Categories:
                  </span>
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm mr-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              {post.tags.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const token = params?.token as string;

  if (!token) {
    return {
      notFound: true,
    };
  }

  try {
    // Validate preview token
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/blog/preview?token=${token}`);

    if (!response.ok) {
      return {
        notFound: true,
      };
    }

    const { slug, locale } = await response.json();

    // Get the post
    const store = new ContentStore();
    const post = await store.getPost(slug, locale);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: structuredClone(post),
        isPreview: true,
      },
    };
  } catch (error) {
    console.error('Preview error:', error);
    return {
      notFound: true,
    };
  }
};
