import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts, getBlogPostContent, type BlogPost as DataBlogPost } from '@/data/blog-posts';
import { SITE_URL } from '@/lib/constants';
import { locales, isValidLocale } from '@/i18n/config';
import { generateArticlePageSchema, stripContext } from '@/lib/seo-utils';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

// Force static generation - no dynamic data fetching
export const dynamic = 'force-static';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all blog posts across non-default locales only
// English (default locale) is served at /blog/[slug]/ via app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const store = new ContentStore();
  const params: Array<{ locale: string; slug: string }> = [];

  // Get posts for each locale EXCEPT 'en' (default locale has its own route at /blog/[slug]/)
  for (const locale of locales) {
    if (locale === 'en') continue; // Skip English - handled by app/blog/[slug]/page.tsx
    try {
      const posts = await store.getAllPosts(locale, false);
      posts.forEach((post) => {
        params.push({ locale, slug: post.slug });
      });
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error);
    }
  }

  return params;
}

// Generate metadata for each localized blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = await getPost(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const metaTitle = post.seoTitle || post.title;
  const metaDescription = post.seoDescription || post.excerpt;
  const metaImageUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;

  // Each locale should have its own self-referencing canonical URL
  const canonicalSlugPath = locale === 'en'
    ? `${SITE_URL}/blog/${slug}/`
    : `${SITE_URL}/${locale}/blog/${slug}/`;

  // Build language alternates for hreflang
  const languages: Record<string, string> = {
    'en-CA': `${SITE_URL}/blog/${slug}/`,
    'en-US': `${SITE_URL}/blog/${slug}/`,
    'x-default': `${SITE_URL}/blog/${slug}/`,
  };
  if (locale === 'fr') {
    languages['fr-CA'] = canonicalSlugPath;
  }

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      // Self-referencing canonical for each locale
      canonical: canonicalSlugPath,
      languages,
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
      url: canonicalSlugPath,
      type: 'article',
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
    // Root layout defines default Twitter metadata (site/creator/logo). For blog posts, we
    // override the title/description/image so the link preview matches the hero image.
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImageUrl],
    },
  };
}

// Blog post type for this component
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

async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  // First, try ContentStore
  try {
    const store = new ContentStore();
    const blogPost = await store.getPost(slug, locale);

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
        image: blogPost.featuredImage?.url || '/optimized/blog/cat-litter-hero.webp',
        heroImageAlt: blogPost.featuredImage?.alt || blogPost.title,
        link: `/${locale}/blog/${blogPost.slug}`,
        content: blogPost.content,
        locale: (blogPost.locale as string) || locale,
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

  // Fallback to sampleBlogPosts
  const samplePost = sampleBlogPosts.find((p) => {
    const postSlug = p.link.replace(/^\/blog\//, '').replace(/\/$/, '');
    return postSlug === slug;
  });

  if (samplePost) {
    const content = getBlogPostContent();
    return {
      ...samplePost,
      link: `/${locale}/blog${samplePost.link.replace('/blog', '')}`,
      content: content || samplePost.excerpt,
      locale: samplePost.locale || locale,
    };
  }

  return null;
}

// Locale-specific UI strings
const uiStrings: Record<string, { backToBlog: string; allArticles: string; visitStore: string; references: string; minRead: string; faqTitle: string }> = {
  fr: {
    backToBlog: 'Retour au Blog',
    allArticles: 'Tous les Articles',
    visitStore: 'Visiter la Boutique',
    references: 'Références',
    minRead: 'min de lecture',
    faqTitle: 'Questions Fréquemment Posées',
  },
  en: {
    backToBlog: 'Back to Blog',
    allArticles: 'All Articles',
    visitStore: 'Visit Store',
    references: 'References',
    minRead: 'min read',
    faqTitle: 'Frequently Asked Questions',
  },
};

export default async function LocalizedBlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  // English is served at /blog/ (no locale prefix)
  if (locale === 'en') {
    redirect(`/blog/${slug}/`);
  }

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = uiStrings[locale] || uiStrings.en;
  const post = await getPost(slug, locale);

  if (!post) {
    notFound();
  }

  // Generate comprehensive Article schema using centralized utility
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readingTime = wordCount > 0 ? Math.ceil(wordCount / 200) : 0;

  const articleSchema = generateArticlePageSchema(
    post.title,
    post.excerpt,
    `/${locale}/blog/${slug}/`,
    locale,
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

  // Add HowTo schema if present
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
        };
        // Only add image if provided
        if (step.image) {
          stepData.image = { '@type': 'ImageObject', url: step.image };
        }
        // Only add url if the step has a specific anchor
        const stepUrl = `${SITE_URL}/${locale}/blog/${slug}`;
        stepData.url = stepUrl;
        return stepData;
      }),
    };

    // Only add optional fields if they exist and have content
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

  // Add FAQ schema if present
  if (post.faq && post.faq.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq
        .filter((item) => item.question && item.answerHtml) // Filter out incomplete FAQ items
        .map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answerHtml,
          },
        })),
    };
    // Only add FAQ schema if there are valid questions after filtering
    if (faqSchema.mainEntity.length > 0) {
      schemas.push(faqSchema);
    }
  }

  // Format date based on locale
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(
        locale === 'fr' ? 'fr-FR' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      );
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
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-electric-indigo transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToBlog}
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
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                {post.content && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(post.content.split(' ').length / 200)} {t.minRead}
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
                  {post.heroImageCredit && (
                    <span className="ml-2">
                      {locale === 'fr' ? 'Credit :' : 'Credit:'} {post.heroImageCredit}
                    </span>
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

              {/* Citations */}
              {post.citations && post.citations.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.references}</h2>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.faqTitle}</h2>
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
              <RelatedContent currentUrl={`/${locale}/blog/${slug}`} className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700" />
            </div>
          </Container>
        </section>

        {/* Navigation Footer */}
        <section className="py-8 border-t border-gray-100 dark:border-gray-800">
          <Container>
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-electric-indigo transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.allArticles}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-electric-indigo transition-colors"
              >
                {t.visitStore}
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
