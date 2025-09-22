import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container } from '../../src/components/ui/container';
import { SITE_NAME } from '../../src/lib/constants';
import NextImage from '../../components/NextImage';
import Link from 'next/link';
import type { BlogPost } from '../../src/data/blog-posts';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { sampleBlogPosts, getBlogPostContent } from '../../src/data/blog-posts';

// This function gets called at build time to generate static paths
export function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = sampleBlogPosts.map((post) => {
    // Remove locale prefixes, leading slash, and blog segment from the link
    const slug = post.link
      .replace(/^\/(en|fr|zh)\//, '')
      .replace(/^\//, '')
      .replace(/^blog\//, '');
    return {
      params: { slug },
    };
  });
  
  // We'll pre-render only these paths at build time
  // { fallback: 'blocking' } means other routes will be rendered at request time
  return { paths, fallback: 'blocking' };
}

// This function gets called at build time on server-side
export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
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
      const post = { ...foundPost };
      
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
      excerpt: wpPost.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...",
      author: wpPost._embedded?.author?.[0]?.name || "Purrify Team",
      date: new Date(wpPost.date).toISOString().split('T')[0],
      image: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/purrify-logo.png",
      link: `/blog/${wpPost.slug}`,
      content: wpPost.content.rendered
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
      
      const post = { ...foundPost };
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
      <Head>
        <title>{post.title} | {SITE_NAME} Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={post.link} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={post.link} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />
        <meta property="twitter:image" content={post.image} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={post.link} />

        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              'headline': post.title,
              'image': [post.image],
              'datePublished': post.date,
              'dateModified': post.date,
              'author': {
                '@type': 'Person',
                'name': post.author
              },
              'publisher': {
                '@type': 'Organization',
                'name': SITE_NAME,
                'logo': {
                  '@type': 'ImageObject',
                  'url': '/purrify-logo.png'
                }
              },
              'description': post.excerpt,
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': post.link
              }
            })
          }}
        />
      </Head>

      <article className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[#5B2EFF] hover:text-[#5B2EFF]/80 mb-8"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#5B2EFF]">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400 mb-6">
                <span className="mr-4">{post.date}</span>
                <span>By {post.author}</span>
              </div>
            </div>
            
            <div className="relative h-[500px] mb-8">
              <NextImage
                src={post.image}
                alt={post.title}
                fill
                className="object-contain scale-75"
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:text-[#5B2EFF] prose-a:text-[#FF3131] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
            
            <div className="mt-12 pt-8 border-t border-[#E0EFC7]">
              <h3 className="text-xl font-bold mb-4 text-[#5B2EFF]">Share this article</h3>
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
            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
              <RelatedArticles />
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
