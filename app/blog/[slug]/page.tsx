import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts, getBlogPostContent, type BlogPost as DataBlogPost } from '@/data/blog-posts';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { generateArticlePageSchema, stripContext } from '@/lib/seo-utils';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export const dynamic = 'force-static';

const LOCALE = 'en';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const store = new ContentStore();
  const slugs = new Set<string>();

  // Try to get slugs from ContentStore (filesystem)
  try {
    const posts = await store.getAllPosts(LOCALE, false);
    posts.forEach((post) => slugs.add(post.slug));
  } catch {
    // ContentStore failed, continue with fallback
  }

  // Fallback: Add slugs from sampleBlogPosts to ensure critical pages are generated
  // This ensures pages linked in the menu are always available
  try {
    sampleBlogPosts.forEach((post) => {
      const slug = post.link.replace(/^\/blog\//, '').replace(/\/$/, '');
      if (slug) slugs.add(slug);
    });
  } catch {
    // sampleBlogPosts not available
  }

  // Critical menu-linked pages that MUST be generated
  const criticalSlugs = [
    'how-to-eliminate-cat-litter-odor',
    'how-to-neutralize-ammonia-cat-litter',
    'best-litter-odor-remover-small-apartments',
    'best-cat-litter-multiple-cats-odor-control',
    'best-natural-cat-litter-odor-control',
    'activated-carbon-litter-additive-benefits',
    'activated-carbon-vs-baking-soda-comparison',
    'how-to-use-cat-litter-deodorizer',
    'house-smells-like-cat-litter-solutions',
    'multi-cat-litter-deodorizer-guide',
    'tried-everything-cat-litter-smell-solutions',
    'most-powerful-odor-absorber',
  ];
  criticalSlugs.forEach((slug) => slugs.add(slug));

  return Array.from(slugs).map((slug) => ({ slug }));
}

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  heroImageCredit?: string;
  link: string;
  content?: string;
  locale?: string;
  canonicalUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  howTo?: DataBlogPost['howTo'];
  faq?: DataBlogPost['faq'];
  citations?: DataBlogPost['citations'];
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const store = new ContentStore();
    const blogPost = await store.getPost(slug, LOCALE);

    if (blogPost) {
      let dateStr: string;
      try {
        const parsedDate = new Date(blogPost.publishDate);
        dateStr = !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
      } catch {
        dateStr = new Date().toISOString().split('T')[0];
      }

      return {
        title: blogPost.title,
        excerpt: blogPost.excerpt,
        author: blogPost.author?.name || 'Purrify Team',
        date: dateStr,
        image: blogPost.featuredImage?.url || '/optimized/cat-litter-hero.webp',
        heroImageAlt: blogPost.featuredImage?.alt || blogPost.title,
        link: `/blog/${blogPost.slug}`,
        content: blogPost.content,
        locale: (blogPost.locale as string) || LOCALE,
        canonicalUrl: blogPost.seo?.canonical || undefined,
        seoTitle: blogPost.seo?.title || undefined,
        seoDescription: blogPost.seo?.description || undefined,
        howTo: (blogPost as unknown as { howTo?: BlogPost['howTo'] }).howTo ?? null,
        faq: blogPost.faq ?? null,
        citations: blogPost.citations ?? null,
      };
    }
  } catch (error) {
    console.error('Error fetching from ContentStore:', error);
  }

  const samplePost = sampleBlogPosts.find((p) => {
    const postSlug = p.link.replace(/^\/blog\//, '').replace(/\/$/, '');
    return postSlug === slug;
  });

  if (samplePost) {
    const content = getBlogPostContent();
    return {
      ...samplePost,
      link: `/blog${samplePost.link.replace('/blog', '')}`,
      content: content || samplePost.excerpt,
      locale: samplePost.locale || LOCALE,
    };
  }

  return null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const metaTitle = post.seoTitle || post.title;
  const metaDescription = post.seoDescription || post.excerpt;
  const metaImageUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
  const canonicalUrl = post.canonicalUrl || `${SITE_URL}/blog/${slug}/`;

  return {
    title: `${metaTitle} | ${SITE_NAME}`,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': `${SITE_URL}/blog/${slug}/`,
        'fr-CA': `${SITE_URL}/fr/blog/${slug}/`,
        'zh-CN': `${SITE_URL}/zh/blog/${slug}/`,
        'es-US': `${SITE_URL}/es/blog/${slug}/`,
        'en-US': `${SITE_URL}/blog/${slug}/`,
        'x-default': `${SITE_URL}/blog/${slug}/`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: SITE_NAME,
      locale: 'en_CA',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: metaImageUrl,
          width: 1200,
          height: 630,
          alt: post.heroImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readingTime = wordCount > 0 ? Math.ceil(wordCount / 200) : 0;

  const articleSchema = generateArticlePageSchema(
    post.title,
    post.excerpt,
    `/blog/${slug}/`,
    LOCALE,
    {
      author: post.author,
      datePublished: post.date,
      dateModified: post.date,
      keywords: undefined,
      category: undefined,
      image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
      wordCount: wordCount > 0 ? wordCount : undefined,
      readingTime: readingTime > 0 ? readingTime : undefined,
    }
  );

  const schemas: unknown[] = [articleSchema];

  if (post.howTo) {
    const howToSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: post.howTo.name,
      description: post.howTo.description,
      step: post.howTo.steps.map((step) => {
        const stepData: Record<string, unknown> = {
          '@type': 'HowToStep',
          name: step.name,
          text: step.text,
          position: step.position,
          url: `${SITE_URL}/blog/${slug}`,
        };
        if (step.image) {
          stepData.image = { '@type': 'ImageObject', url: step.image };
        }
        return stepData;
      }),
    };

    if (post.howTo.totalTime) {
      howToSchema.totalTime = post.howTo.totalTime;
    }
    if (post.howTo.estimatedCost?.currency && post.howTo.estimatedCost?.value) {
      howToSchema.estimatedCost = {
        '@type': 'MonetaryAmount',
        currency: post.howTo.estimatedCost.currency,
        value: post.howTo.estimatedCost.value,
      };
    }
    if (post.howTo.supply && post.howTo.supply.length > 0) {
      howToSchema.supply = post.howTo.supply.map((s) => ({ '@type': 'HowToSupply', name: s }));
    }
    if (post.howTo.tool && post.howTo.tool.length > 0) {
      howToSchema.tool = post.howTo.tool.map((t) => ({ '@type': 'HowToTool', name: t }));
    }

    schemas.push(howToSchema);
  }

  if (post.faq && post.faq.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq
        .filter((item) => item.question && item.answerHtml)
        .map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answerHtml,
          },
        })),
    };
    if (faqSchema.mainEntity.length > 0) {
      schemas.push(faqSchema);
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': schemas.map((s) => stripContext(s)),
          }),
        }}
      />

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
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
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

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</p>

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={post.image}
                  alt={post.heroImageAlt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
              {(post.heroImageCaption || post.heroImageCredit) && (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {post.heroImageCaption && <span>{post.heroImageCaption}</span>}
                  {post.heroImageCredit && (
                    <span className="ml-2">Credit: {post.heroImageCredit}</span>
                  )}
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
