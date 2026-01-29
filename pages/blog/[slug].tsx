import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME, SITE_URL } from '../../src/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '../../src/data/blog-posts';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { SocialFollowCTA } from '../../src/components/blog/SocialFollowCTA';
import { TrialCTA } from '../../src/components/blog/TrialCTA';
import { sampleBlogPosts, getBlogPostContent } from '../../src/data/blog-posts';
import prisma from '../../src/lib/prisma';
import fs from 'node:fs';
import path from 'node:path';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

type TocEntry = { title: string; id: string };
type FaqEntry = { question: string; answerHtml: string };

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

// This function gets called at build time to generate static paths
export function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'pages', 'blog');
  const staticPageExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mdx'];
  const staticSlugSet = new Set(
    fs
      .readdirSync(blogDir)
      .filter((file) => file !== '[slug].tsx' && file !== 'index.tsx')
      .map((file) => {
        const matchedExt = staticPageExtensions.find((ext) => file.endsWith(ext));
        return matchedExt ? file.slice(0, -matchedExt.length) : file;
      })
  );

  // Get the paths we want to pre-render based on posts
  const paths = sampleBlogPosts
    .map((post) => {
      // Remove locale prefixes, leading slash, and blog segment from the link
      const slug = post.link
        .replace(/^\/(en|fr|zh)\//, '')
        .replace(/^\//, '')
        .replace(/^blog\//, '');
      if (staticSlugSet.has(slug)) {
        return null;
      }
      return {
        params: { slug },
      };
    })
    .filter((value): value is { params: { slug: string } } => Boolean(value));

  // We'll pre-render only these paths at build time
  // { fallback: 'blocking' } means other routes will be rendered at request time
  return { paths, fallback: 'blocking' };
}

// This function gets called at build time on server-side
export async function getStaticProps({ params, locale }: { params: { slug: string }; locale?: string }) {
  try {
    // First, try our new ContentStore
    const { ContentStore } = await import('../../src/lib/blog/content-store');

    const store = new ContentStore();
    const currentLocale = locale || 'en';

    let blogPost = await store.getPost(params.slug, currentLocale);

    // Fallback to English if localized post doesn't exist to prevent 404
    if (!blogPost && currentLocale !== 'en') {
      console.log(`Blog post ${params.slug} not found in ${currentLocale}, falling back to English`);
      blogPost = await store.getPost(params.slug, 'en');
    }

    if (blogPost) {
      // Transform to match existing BlogPost interface
      const post: BlogPost = {
        title: blogPost.title,
        excerpt: blogPost.excerpt,
        author: blogPost.author.name,
        date: new Date(blogPost.publishDate).toISOString().split('T')[0],
        image: blogPost.featuredImage.url,
        heroImageAlt: blogPost.featuredImage.alt,
        link: `/blog/${blogPost.slug}`,
        content: blogPost.content,
        locale: blogPost.locale as 'en' | 'fr' | 'zh',
        // Include howTo data if present (for step-by-step tutorials)
        // Use null fallback to avoid JSON serialization error with undefined
        howTo: (blogPost as unknown as { howTo?: BlogPost['howTo'] }).howTo ?? null
      };

      return {
        props: { post },
        revalidate: 3600 // Revalidate every hour
      };
    }

    // Fallback to database
    let dbPost = null;
    if (prisma) {
      dbPost = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
        include: { secondaryImages: true },
      });
    }

    if (dbPost) {
      const toc = asArray<TocEntry>(dbPost.toc);
      const faq = asArray<FaqEntry>(dbPost.faq);
      return {
        props: {
          post: {
            title: dbPost.title,
            excerpt: dbPost.excerpt,
            author: dbPost.author ?? 'Purrify Research Lab',
            date: (dbPost.publishedAt ?? dbPost.createdAt).toISOString().split('T')[0],
            image: dbPost.heroImageUrl,
            heroImageAlt: dbPost.heroImageAlt,
            heroImageCaption: dbPost.heroImageCaption ?? undefined,
            heroImageCredit: dbPost.heroImageCredit ?? undefined,
            secondaryImages: dbPost.secondaryImages.map((image) => ({
              url: image.url,
              alt: image.alt,
              caption: image.caption ?? undefined,
              credit: image.credit ?? undefined,
            })),
            toc,
            faq,
            cta: dbPost.ctaText && dbPost.ctaUrl ? { text: dbPost.ctaText, url: dbPost.ctaUrl } : undefined,
            link: `/blog/${dbPost.slug}`,
            content: dbPost.content,
            locale: (dbPost.locale as 'en' | 'fr' | 'zh' | undefined) ?? 'en',
            howTo: null, // Database posts don't have howTo schema data
          },
        },
        revalidate: 21600,
      };
    }

    // WordPress API URL - replace with your WordPress site URL
    const wpApiUrl = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

    // Check if WordPress API URL is configured
    if (!process.env.WORDPRESS_API_URL || process.env.WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      // If WordPress is not configured yet, use sample data
      console.log('WordPress API not configured, using sample data');

      // Find the post that matches the slug, handling language prefixes
      const foundPost = sampleBlogPosts.find((post) => {
        // Remove language prefix from the post link for comparison
        const postSlug = post.link.replace(/^\/(en|fr|zh)\//, '').replace(/^\//, '');
        return postSlug === `blog/${params.slug}` || postSlug.endsWith(`/${params.slug}`);
      });

      if (!foundPost) {
        console.error(`Blog post not found for slug: ${params.slug}`);
        return {
          notFound: true, // This will show the 404 page
        };
      }

      // Create a copy of the post to avoid modifying the original
      // Ensure howTo is null instead of undefined to avoid JSON serialization errors
      const post = { ...foundPost, howTo: foundPost.howTo ?? null };

      // Add content to the post
      post.content = getBlogPostContent();

      // Return the post data as props
      return {
        props: {
          post,
        },
        // Re-generate the page at most once per day
        revalidate: 86400,
      };
    }

    // Fetch post from WordPress by slug
    const response = await fetch(`${wpApiUrl}/posts?slug=${params.slug}&_embed`);

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const wpPosts = await response.json();

    if (wpPosts.length === 0) {
      return {
        notFound: true,
      };
    }

    const wpPost = wpPosts[0];

    // Transform WordPress post to match our BlogPost interface
    const post: BlogPost = {
      title: wpPost.title.rendered,
      excerpt: wpPost.excerpt.rendered.replaceAll(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...",
      author: wpPost._embedded?.author?.[0]?.name || "",
      date: new Date(wpPost.date).toISOString().split('T')[0],
      image: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "",
      link: `/blog/${wpPost.slug}`,
      content: wpPost.content.rendered,
      locale: 'en',
      howTo: null, // WordPress posts don't have howTo schema data
    };

    // Return the post data as props
    return {
      props: {
        post,
      },
      // Re-generate the page at most once per hour
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Error fetching blog post:', err);

    // Fallback to sample data in case of error
    try {
      const foundPost = sampleBlogPosts.find((post) =>
        post.link.includes(params.slug)
      );

      if (!foundPost) {
        return {
          notFound: true,
        };
      }

      // Ensure howTo is null instead of undefined to avoid JSON serialization errors
      const post = { ...foundPost, howTo: foundPost.howTo ?? null };
      post.content = getBlogPostContent();

      return {
        props: {
          post,
        },
        revalidate: 86400,
      };
    } catch {
      return {
        notFound: true,
      };
    }
  }
}

export default function BlogPost({ post }: { post: BlogPost }) {
  const router = useRouter();
  const locale = post.locale ?? 'en';
  const localizedCopy = {
    tocTitle:
      locale === 'fr' ? 'Dans cet article' : locale === 'zh' ? '本页导读' : 'On this page',
    ctaHeading:
      locale === 'fr'
        ? 'Prêt à éliminer les odeurs de litière ?'
        : locale === 'zh'
          ? '现在就解决猫砂异味'
          : 'Ready to fix litter odor?',
    ctaButton: locale === 'fr' ? 'Commander maintenant ->' : locale === 'zh' ? '立即订购 ->' : 'Shop now ->',
    shareHeading: locale === 'fr' ? "Partager l'article" : locale === 'zh' ? '分享本文' : 'Share this article',
  };

  // Noindex for fallback content when locale doesn't match
  const shouldNoindex = post.locale !== (router.locale || 'en');

  // Use enhanced SEO hook for optimized meta tags and structured data
  const { nextSeoProps } = useEnhancedSEO({
    path: post.link,
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt,
    schemaType: 'article',
    schemaData: {
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      dateModified: post.date,
      category: 'Cat Care',
    },
    image: post.image,
    noindex: shouldNoindex,
  });

  // Breadcrumb items for navigation and schema
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: post.link },
  ];

  // Build comprehensive schema with BlogPosting, Breadcrumbs, and optional HowTo
  const buildSchemaGraph = () => {
    const schemas: object[] = [];

    // BlogPosting schema
    schemas.push({
      '@type': 'BlogPosting',
      '@id': `${SITE_URL}${post.link}#article`,
      url: `${SITE_URL}${post.link}`,
      headline: post.title,
      image: [post.image],
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.purrify.ca/images/purrify-logo.png',
        },
      },
      description: post.excerpt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${post.link}`,
      },
    });

    // HowTo schema for tutorial posts
    if (post.howTo) {
      schemas.push({
        '@type': 'HowTo',
        name: post.howTo.name,
        description: post.howTo.description,
        ...(post.howTo.totalTime && { totalTime: post.howTo.totalTime }),
        ...(post.howTo.estimatedCost && {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: post.howTo.estimatedCost.currency,
            value: post.howTo.estimatedCost.value,
          },
        }),
        ...(post.howTo.supply && {
          supply: post.howTo.supply.map((item) => ({
            '@type': 'HowToSupply',
            name: item,
          })),
        }),
        ...(post.howTo.tool && {
          tool: post.howTo.tool.map((item) => ({
            '@type': 'HowToTool',
            name: item,
          })),
        }),
        step: post.howTo.steps.map((step) => ({
          '@type': 'HowToStep',
          name: step.name,
          text: step.text,
          position: step.position,
          ...(step.image && { image: step.image }),
        })),
      });
    }

    // Breadcrumb schema
    schemas.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    });

    return {
      '@context': 'https://schema.org',
      '@graph': schemas,
    };
  };

  // If the page is still generating via fallback, show loading
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3131]"></div>
      </div>
    );
  }

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Structured Data - BlogPosting with Breadcrumbs and optional HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchemaGraph()) }}
      />

      <article className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Visual Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {breadcrumbItems.map((item, index) => (
                  <li key={item.path} className="flex items-center">
                    {index > 0 && (
                      <svg className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {index === breadcrumbItems.length - 1 ? (
                      <span aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]">
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

            <Link
              href="/blog"
              className="inline-flex items-center text-[#5B2EFF] dark:text-[#3694FF] hover:text-[#5B2EFF]/80 dark:hover:text-[#3694FF]/80 mb-8"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>

            <div className="mb-8">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-[#5B2EFF] dark:text-[#3694FF]">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400 mb-6">
                <span className="mr-4">{post.date}</span>
                <span>By {post.author}</span>
              </div>
            </div>

            <div className="relative w-full h-auto mb-8">
              <Image
                src={post.image}
                alt={post.heroImageAlt || post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-2xl shadow-lg"
                priority
              />
            </div>
            {(post.heroImageCaption || post.heroImageCredit) && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
                {post.heroImageCaption}
                {post.heroImageCredit ? (
                  <>
                    {post.heroImageCaption ? ' | ' : ''}
                    <span className="italic">{post.heroImageCredit}</span>
                  </>
                ) : null}
              </p>
            )}

            {post.toc && post.toc.length > 0 && (
              <div className="mb-8 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/70 shadow-lg border border-[#E0EFC7]/70">
                <p className="text-xs uppercase font-semibold tracking-widest text-[#5B2EFF] dark:text-[#3694FF]">
                  {localizedCopy.tocTitle}
                </p>
                <ul className="mt-4 space-y-2">
                  {post.toc.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="text-[#03E46A] hover:text-[#03E46A]/80 dark:text-[#03E46A] font-medium"
                      >
                        {entry.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.secondaryImages && post.secondaryImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {post.secondaryImages.map((image, index) => (
                  <figure
                    key={`${image.url}-${index}`}
                    className="rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-800/70 border border-[#E0EFC7]/60"
                  >
                    <div className="relative w-full aspect-video">
                      <Image src={image.url} alt={image.alt} fill className="object-cover" />
                    </div>
                    {(image.caption || image.credit) && (
                      <figcaption className="p-4 text-sm text-gray-600 dark:text-gray-300">
                        {image.caption}
                        {image.credit ? (
                          <>
                            {' '}
                            <span className="italic">{image.credit}</span>
                          </>
                        ) : null}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:text-[#5B2EFF] dark:prose-headings:text-[#3694FF] prose-a:text-[#FF3131] dark:prose-a:text-[#FF6B6B] prose-a:no-underline hover:prose-a:underline dark:hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {post.cta && (
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#03E46A]/15 via-[#5B2EFF]/10 to-[#FF3131]/10 border border-[#E0EFC7]/80">
                <h3 className="font-heading text-2xl font-bold mb-3 text-[#5B2EFF] dark:text-[#3694FF]">{localizedCopy.ctaHeading}</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">{post.cta.text}</p>
                <a
                  href={post.cta.url}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-[#FF3131] text-white dark:text-gray-100 font-semibold shadow-lg hover:bg-[#FF3131]/90 transition-colors"
                >
                  {localizedCopy.ctaButton}
                </a>
              </div>
            )}

            {post.faq && post.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-3xl font-bold mb-6 text-[#5B2EFF] dark:text-[#3694FF]">FAQ</h2>
                <div className="space-y-6">
                  {post.faq.map((entry, index) => (
                    <div key={`${entry.question}-${index}`} className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/80 border border-[#E0EFC7]/60">
                      <h3 className="font-heading text-xl font-semibold mb-2 text-[#03E46A]">{entry.question}</h3>
                      <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: entry.answerHtml }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-[#E0EFC7]">
              <h3 className="font-heading text-xl font-bold mb-4 text-[#5B2EFF] dark:text-[#3694FF]">{localizedCopy.shareHeading}</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1DA1F2] text-white dark:text-white dark:text-gray-100 dark:text-gray-100 p-3 rounded-full hover:bg-[#1DA1F2]/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] text-white dark:text-white dark:text-gray-100 p-3 rounded-full hover:bg-[#1877F2]/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&title=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0A66C2] text-white dark:text-white dark:text-gray-100 p-3 rounded-full hover:bg-[#0A66C2]/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Follow CTA */}
            <div className="mt-10">
              <SocialFollowCTA variant="card" />
            </div>

            {/* Trial CTA */}
            <TrialCTA variant="compact" />

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
              <RelatedContent currentUrl={post.link} />
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
