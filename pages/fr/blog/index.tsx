import { NextSeo } from 'next-seo';
import { Layout } from '../../../src/components/layout/layout';
import { Container } from '../../../src/components/ui/container';
import Link from 'next/link';
import { useTranslation } from '../../../src/lib/translation-context';
import Script from 'next/script';
import { GetStaticProps } from 'next';
import NextImage from '../../../components/NextImage';
import type { BlogPost } from '../../../src/data/blog-posts';
import { sampleBlogPosts } from '../../../src/data/blog-posts';

// This function gets called at build time on server-side
export async function getStaticProps() {
  try {
    // WordPress API URL - replace with your WordPress site URL
    const wpApiUrl = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';
    
    // Check if WordPress API URL is configured
    if (!process.env.WORDPRESS_API_URL || process.env.WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      // If WordPress is not configured yet, use sample data
      console.log('WordPress API not configured, using sample data');
      return {
        props: {
          blogPosts: sampleBlogPosts,
          locale: 'fr',
        },
        // Re-generate the page at most once per day
        revalidate: 86400,
      };
    }
    
    // Fetch posts from WordPress
    const response = await fetch(`${wpApiUrl}/posts?_embed&per_page=10`);
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }
    
    const wpPosts = await response.json();
    
    // Transform WordPress posts to match our BlogPost interface
    const blogPosts: BlogPost[] = wpPosts.map((post: any) => ({
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...",
      author: post._embedded?.author?.[0]?.name || "Équipe Purrify",
      date: new Date(post.date).toISOString().split('T')[0],
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/purrify-logo.png",
      link: `/fr/blog/${post.slug}`,
    }));
    
    return {
      props: {
        blogPosts,
        locale: 'fr',
      },
      // Re-generate the page at most once per hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    // Fallback to sample data in case of error
    return {
      props: {
        blogPosts: sampleBlogPosts,
        locale: 'fr',
      },
      revalidate: 86400,
    };
  }
}

export default function BlogIndex({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { t } = useTranslation();
  const pageTitle = `Blog | ${t.siteName}`;
  const canonicalUrl = 'https://purrify.ca/fr/blog/';
  const description = "Découvrez nos articles de blog sur les soins pour chats, les conseils de litière et plus encore.";

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: pageTitle,
          description: description,
          images: [
            {
              url: 'https://purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: t.siteName,
              type: 'image/png',
            },
          ],
        }}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://purrify.ca/blog/',
          },
          {
            hrefLang: 'fr',
            href: canonicalUrl,
          },
        ]}
      />

      {/* BreadcrumbList Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Accueil',
                'item': 'https://purrify.ca/fr/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': canonicalUrl
              }
            ]
          })
        }}
      />

      <Layout>
        <Container className="py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              Conseils et astuces pour chats
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
              Blog Purrify
            </h1>
            <p className="text-gray-600 text-lg">
              Conseils, astuces et informations pour les propriétaires de chats qui souhaitent une maison fraîche
              et des chats heureux et en bonne santé.
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Aucun article de blog trouvé. Revenez bientôt!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="aspect-video overflow-hidden">
                      <NextImage
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-bold text-xl mb-3 text-[#5B2EFF] group-hover:text-[#5B2EFF]/80 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#03E46A] font-medium">
                        {post.author}
                      </span>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={post.link}
                      className="text-[#03E46A] font-medium flex items-center hover:text-[#03E46A]/80 transition-colors"
                      prefetch={true}
                    >
                      Lire l'article complet
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
        </Container>
      </Layout>
    </>
  );
}
