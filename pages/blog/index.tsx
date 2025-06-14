import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME, SITE_DESCRIPTION } from '../../src/lib/constants';
import NextImage from '../../components/NextImage';
import Link from 'next/link';
import type { BlogPost } from '../../src/data/blog-posts';
import { sampleBlogPosts } from '../../src/data/blog-posts';
import { useTranslation } from '../../src/lib/translation-context';

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
      author: post._embedded?.author?.[0]?.name || "Purrify Team",
      date: new Date(post.date).toISOString().split('T')[0],
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/purrify-logo.png",
      link: `/blog/${post.slug}`,
    }));
    
    return {
      props: {
        blogPosts,
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
      },
      revalidate: 86400,
    };
  }
}

export default function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Blog | {SITE_NAME} - Cat Care Tips & Insights</title>
        <meta name="description" content={`Tips, tricks, and insights for cat owners who want a fresh-smelling home and happy, healthy cats. ${SITE_DESCRIPTION}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.ca/blog" />
        <meta property="og:title" content={`Blog | ${SITE_NAME} - Cat Care Tips & Insights`} />
        <meta property="og:description" content={`Tips, tricks, and insights for cat owners who want a fresh-smelling home and happy, healthy cats. ${SITE_DESCRIPTION}`} />
        <meta property="og:image" content="https://purrify.ca/purrify-logo.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://purrify.ca/blog" />
        <meta property="twitter:title" content={`Blog | ${SITE_NAME} - Cat Care Tips & Insights`} />
        <meta property="twitter:description" content={`Tips, tricks, and insights for cat owners who want a fresh-smelling home and happy, healthy cats. ${SITE_DESCRIPTION}`} />
        <meta property="twitter:image" content="https://purrify.ca/purrify-logo.png" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://purrify.ca/blog" />
      </Head>

      <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              {t.blogSection.catCareTips}
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
              Purrify Blog
            </h1>
            <p className="text-gray-600 text-lg">
              {t.blogSection.description}
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No blog posts found. Check back soon!</p>
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
                      {t.blogSection.readFullArticle}
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
      </section>
    </>
  );
}