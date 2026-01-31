import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts, getBlogPostContent, type BlogPost } from '@/data/blog-posts';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const store = new ContentStore();
  const posts = await store.getAllPosts('en', false);

  // Combine with sample blog posts
  const allSlugs = new Set<string>();

  // Add posts from ContentStore
  posts.forEach((post) => {
    allSlugs.add(post.slug);
  });

  // Add posts from sampleBlogPosts
  sampleBlogPosts.forEach((post) => {
    const slug = post.link.replace(/^\/blog\//, '').replace(/\/$/, '');
    allSlugs.add(slug);
  });

  return Array.from(allSlugs).map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'en-CA': `${SITE_URL}/blog/${slug}`,
        'fr-CA': `${SITE_URL}/fr/blog/${slug}`,
        'zh-CN': `${SITE_URL}/zh/blog/${slug}`,
        'es': `${SITE_URL}/es/blog/${slug}`,
        'x-default': `${SITE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.heroImageAlt || post.title,
        },
      ],
    },
  };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  // First, try ContentStore
  try {
    const store = new ContentStore();
    const blogPost = await store.getPost(slug, 'en');

    if (blogPost) {
      return {
        title: blogPost.title,
        excerpt: blogPost.excerpt,
        author: blogPost.author.name,
        date: new Date(blogPost.publishDate).toISOString().split('T')[0],
        image: blogPost.featuredImage.url,
        heroImageAlt: blogPost.featuredImage.alt,
        link: `/blog/${blogPost.slug}`,
        content: blogPost.content,
        locale: blogPost.locale as 'en' | 'fr' | 'zh',
        howTo: (blogPost as unknown as { howTo?: BlogPost['howTo'] }).howTo ?? null,
        faq: blogPost.faq ?? null,
        citations: blogPost.citations ?? null,
      };
    }
  } catch (error) {
    console.error('Error fetching from ContentStore:', error);
  }

  // Fallback to sampleBlogPosts
  const samplePost = sampleBlogPosts.find((p) => {
    const postSlug = p.link.replace(/^\/blog\//, '').replace(/\/$/, '');
    return postSlug === slug;
  });

  if (samplePost) {
    const content = getBlogPostContent();
    return {
      ...samplePost,
      content: content || samplePost.excerpt,
      locale: samplePost.locale || 'en',
    };
  }

  return null;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/optimized/purrify-logo.avif`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };

  // Add HowTo schema if present
  const schemas: unknown[] = [articleSchema];
  if (post.howTo) {
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: post.howTo.name,
      description: post.howTo.description,
      totalTime: post.howTo.totalTime,
      estimatedCost: post.howTo.estimatedCost
        ? {
          '@type': 'MonetaryAmount',
          currency: post.howTo.estimatedCost.currency,
          value: post.howTo.estimatedCost.value,
        }
        : undefined,
      supply: post.howTo.supply?.map((s) => ({ '@type': 'HowToSupply', name: s })),
      tool: post.howTo.tool?.map((t) => ({ '@type': 'HowToTool', name: t })),
      step: post.howTo.steps.map((step) => ({
        '@type': 'HowToStep',
        name: step.name,
        text: step.text,
        position: step.position,
        image: step.image ? { '@type': 'ImageObject', url: step.image } : undefined,
      })),
    };
    schemas.push(howToSchema);
  }

  // Add FAQ schema if present
  if (post.faq && post.faq.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answerHtml,
        },
      })),
    };
    schemas.push(faqSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-white to-[#FFFFF5] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Back Navigation */}
        <section className="py-4 border-b border-gray-100 dark:border-gray-800">
          <Container>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-electric-indigo transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                {post.content && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(post.content.split(' ').length / 200)} min read
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</p>

              {/* Featured Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={post.image}
                  alt={post.heroImageAlt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {(post.heroImageCaption || post.heroImageCredit) && (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {post.heroImageCaption && <span>{post.heroImageCaption}</span>}
                  {post.heroImageCredit && <span className="ml-2">Credit: {post.heroImageCredit}</span>}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Content Section */}
        <section className="py-8 md:py-12">
          <Container>
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-a:text-electric-indigo max-w-none">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                )}
              </article>

              {/* Citations */}
              {post.citations && post.citations.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">References</h2>
                  <ol className="space-y-2">
                    {post.citations.map((citation, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        {citation.url ? (
                          <a
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-electric-indigo hover:underline"
                          >
                            {citation.text}
                          </a>
                        ) : (
                          citation.text
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* FAQ Section */}
              {post.faq && post.faq.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {post.faq.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                        <div
                          className="text-gray-600 dark:text-gray-300 prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Content */}
              <RelatedContent currentUrl={`/blog/${slug}`} className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700" />
            </div>
          </Container>
        </section>

        {/* Navigation Footer */}
        <section className="py-8 border-t border-gray-100 dark:border-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-electric-indigo transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Articles
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-electric-indigo transition-colors"
              >
                Visit Store
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
