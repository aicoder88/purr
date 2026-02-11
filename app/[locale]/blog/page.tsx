import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts } from '@/data/blog-posts';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { locales, isValidLocale, defaultLocale } from '@/i18n/config';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogIndexPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate static params for all supported locales (including default 'en')
export async function generateStaticParams() {
  return locales.map((locale) => ({
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
    es: {
      title: `Blog - Consejos para Gatos & Arena | ${SITE_NAME}`,
      description: `Asesoramiento experto sobre areneros, control de olores y cuidado de mascotas. ${SITE_DESCRIPTION}`,
    },
    zh: {
      title: `博客 - 猫咪护理与猫砂建议 | ${SITE_NAME}`,
      description: `关于猫砂盆、除臭和宠物护理的专家建议。${SITE_DESCRIPTION}`,
    },
  };

  const localeMeta = metadataByLocale[locale] || {
    title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
    description: `Expert advice on cat litter boxes, odor control, and pet care. ${SITE_DESCRIPTION}`,
  };

  // Build hreflang alternates with self-referencing support
  const hrefLang = locale === 'en' ? 'en-CA' : 
                   locale === 'fr' ? 'fr-CA' : 
                   locale === 'zh' ? 'zh-CN' : 
                   locale === 'es' ? 'es-US' : 'en-CA';
  
  return {
    title: localeMeta.title,
    description: localeMeta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: {
        'en-CA': `${SITE_URL}/blog`,
        'fr-CA': `${SITE_URL}/fr/blog`,
        'zh-CN': `${SITE_URL}/zh/blog`,
        'es-US': `${SITE_URL}/es/blog`,
        'en-US': `${SITE_URL}/blog`,
        'x-default': `${SITE_URL}/blog`,
        // Self-reference for the current locale
        [hrefLang]: `${SITE_URL}/${locale}/blog`,
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
      url: `${SITE_URL}/${locale}/blog`,
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_US' : 'en_CA',
      images: [
        {
          url: `${SITE_URL}/images/Logos/purrify-logo.png`,
          width: 1200,
          height: 630,
          alt: localeMeta.title,
        },
      ],
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
        image: post.featuredImage?.url || '/optimized/cat-litter-hero.webp',
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
  es: {
    backToBlog: 'Volver al Blog',
    readMore: 'Leer Más',
    previous: '← Anterior',
    next: 'Siguiente →',
    page: 'Página',
    of: 'de',
  },
  zh: {
    backToBlog: '返回博客',
    readMore: '阅读更多',
    previous: '← 上一页',
    next: '下一页 →',
    page: '页',
    of: '/',
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
    url: `${SITE_URL}/${locale}/blog`,
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
            url: `${SITE_URL}/images/Logos/purrify-logo.png`,
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
                {locale === 'fr' && 'Blog Purrify'}
                {locale === 'es' && 'Blog Purrify'}
                {locale === 'zh' && 'Purrify 博客'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {locale === 'fr' && 'Conseils d\'experts sur les soins pour chats, le contrôle des odeurs de litière et plus encore.'}
                {locale === 'es' && 'Consejos expertos sobre el cuidado de gatos, control de olores de arena y más.'}
                {locale === 'zh' && '关于猫咪护理、猫砂除臭等方面的专家建议。'}
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
                            return d.toLocaleDateString(locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : locale === 'zh' ? 'zh-CN' : 'en-US', {
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
