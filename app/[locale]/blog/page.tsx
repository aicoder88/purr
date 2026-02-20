import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts } from '@/data/blog-posts';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { locales, isValidLocale } from '@/i18n/config';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogIndexPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate static params for non-default locales only
// English (default locale) is served at /blog/ via app/blog/page.tsx
export async function generateStaticParams() {
  return locales.filter((locale) => locale !== 'en').map((locale) => ({
    locale,
  }));
}

// Generate metadata for the localized blog index
export async function generateMetadata({ params }: BlogIndexPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: 'Not Found',
    };
  }

  // Locale-specific titles and descriptions
  const metadataByLocale: Record<string, { title: string; description: string }> = {
    fr: {
      title: `Blog - Conseils pour Chats & Litière | ${SITE_NAME}`,
      description: `Conseils d'experts sur les bacs à litière, le contrôle des odeurs et les soins pour animaux. ${SITE_DESCRIPTION}`,
    },
  };

  const localeMeta = metadataByLocale[locale] || {
    title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
    description: `Expert advice on cat litter boxes, odor control, and pet care. ${SITE_DESCRIPTION}`,
  };

  // Build hreflang alternates with self-referencing support
  const hrefLang = locale === 'en' ? 'en-CA' :
    locale === 'fr' ? 'fr-CA' : 'en-CA';

  const canonicalPath = locale === 'en' ? `${SITE_URL}/blog/` : `${SITE_URL}/${locale}/blog/`;

  return {
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: ['cat care blog', 'litter box tips', 'pet care advice', 'odor control', 'cat health'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${SITE_URL}/blog/`,
        'fr-CA': `${SITE_URL}/fr/blog/`,
        'en-US': `${SITE_URL}/blog/`,
        'x-default': `${SITE_URL}/blog/`,
        // Self-reference for the current locale
        [hrefLang]: canonicalPath,
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
      title: localeMeta.title,
      description: localeMeta.description,
      url: canonicalPath,
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 630,
          alt: localeMeta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: localeMeta.title,
      description: localeMeta.description,
      images: [`${SITE_URL}/optimized/logos/purrify-logo.png`],
    },
  };
}

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  locale: string;
}

async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const store = new ContentStore();
    const posts = await store.getAllPosts(locale, false);

    // Fallback to sampleBlogPosts if ContentStore returns empty
    if (posts.length === 0) {
      // Filter sample posts by locale if available, otherwise default to en
      return sampleBlogPosts
        .filter((post) => (locale === 'en' ? true : post.locale === locale || !post.locale))
        .map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date,
          image: post.image,
          link: `/${locale}/blog${post.link.replace('/blog', '')}`,
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
        image: post.featuredImage?.url || '/optimized/blog/cat-litter-hero.webp',
        link: `/${locale}/blog/${post.slug}`,
        locale: post.locale || locale,
      };
    });
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    // Fallback to sampleBlogPosts on error
    return sampleBlogPosts
      .filter((post) => (locale === 'en' ? true : post.locale === locale || !post.locale))
      .map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        date: post.date,
        image: post.image,
        link: `/${locale}/blog${post.link.replace('/blog', '')}`,
        locale: post.locale || 'en',
      }));
  }
}

const POSTS_PER_PAGE = 15;

// Locale-specific UI strings
const uiStrings: Record<string, { backToBlog: string; readMore: string; previous: string; next: string; page: string; of: string }> = {
  fr: {
    backToBlog: 'Retour au Blog',
    readMore: 'Lire la Suite',
    previous: '← Précédent',
    next: 'Suivant →',
    page: 'Page',
    of: 'sur',
  },
  en: {
    backToBlog: 'Back to Blog',
    readMore: 'Read More',
    previous: '← Previous',
    next: 'Next →',
    page: 'Page',
    of: 'of',
  },
};

export default async function LocalizedBlogIndexPage({
  params,
  searchParams,
}: BlogIndexPageProps) {
  const { locale } = await params;

  // English is served at /blog/ (no locale prefix)
  if (locale === 'en') {
    redirect('/blog/');
  }

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = uiStrings[locale] || uiStrings.en;
  const allBlogPosts = await getBlogPosts(locale);

  const paramsResolved = await searchParams;
  const currentPage = Number(paramsResolved.page) || 1;
  const totalPosts = allBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, endIndex);

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog - ${locale.toUpperCase()}`,
    url: `${SITE_URL}/${locale}/blog/`,  // non-English locales only reach here
    description: SITE_DESCRIPTION,
    blogPost: currentPosts.map((post) => {
      // Ensure date is in ISO 8601 format
      const datePublished = post.date?.includes('T')
        ? post.date
        : new Date(post.date).toISOString();

      return {
        '@type': 'BlogPosting',
        headline: post.title?.length > 110 ? post.title.substring(0, 107) + '...' : post.title,
        description: post.excerpt,
        url: `${SITE_URL}${post.link}`,
        image: post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        datePublished,
        dateModified: datePublished,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
            width: 400,
            height: 400,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}${post.link}`,
        },
      };
    }),
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
                {locale === 'en' && 'Purrify Blog'}
                {locale === 'fr' && 'Blog Purrify'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {locale === 'en' && 'Expert tips on cat care, litter odor control, and a healthier home.'}
                {locale === 'fr' && 'Conseils d\'experts sur les soins pour chats, le contrôle des odeurs de litière et plus encore.'}
              </p>
            </div>
          </Container>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post, index) => (
                <article
                  key={post.link}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                >
                  <Link href={post.link} className="block relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                      {...(index === 0 ? { fetchPriority: "high" } : {})}
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
                            return d.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
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
                      className="inline-flex items-center gap-2 text-electric-indigo-600 font-semibold hover:gap-3 transition-all"
                      aria-label={`${t.readMore}: ${post.title}`}
                    >
                      {t.readMore}
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
                    href={`/${locale}/blog?page=${currentPage - 1}`}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2"
                  >
                    {t.previous}
                  </Link>
                ) : (
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 dark:text-gray-600 font-medium flex items-center gap-2 cursor-not-allowed">
                    {t.previous}
                  </span>
                )}

                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {t.page} {currentPage} {t.of} {totalPages}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={`/${locale}/blog?page=${currentPage + 1}`}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2"
                  >
                    {t.next}
                  </Link>
                ) : (
                  <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 dark:text-gray-600 font-medium flex items-center gap-2 cursor-not-allowed">
                    {t.next}
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
