import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ContentStore } from '@/lib/blog/content-store';
import { sampleBlogPosts } from '@/data/blog-posts';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
  description: `Expert advice on cat litter boxes, odor control, and pet care. ${SITE_DESCRIPTION}`,
  keywords: 'cat litter blog, pet care tips, litter box advice, cat odor solutions, feline health',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
    description: `Expert advice on cat litter boxes, odor control, and pet care.`,
    url: 'https://www.purrify.ca/blog',
    type: 'website',
  },
};

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  locale: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const store = new ContentStore();
    const posts = await store.getAllPosts('en', false);

    // Fallback to sampleBlogPosts if ContentStore returns empty
    if (posts.length === 0) {
      return sampleBlogPosts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        date: post.date,
        image: post.image,
        link: post.link,
        locale: post.locale || 'en',
      }));
    }

    // Transform to match the expected format
    return posts.map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author.name,
      date: new Date(post.publishDate).toISOString().split('T')[0],
      image: post.featuredImage.url,
      link: `/blog/${post.slug}`,
      locale: post.locale,
    }));
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    // Fallback to sampleBlogPosts on error
    return sampleBlogPosts.map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      image: post.image,
      link: post.link,
      locale: post.locale || 'en',
    }));
  }
}

export default async function BlogIndexPage() {
  const blogPosts = await getBlogPosts();

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Blog - Cat Care Tips & Litter Box Advice | ${SITE_NAME}`,
    description: `Expert advice on cat litter boxes, odor control, and pet care.`,
    url: 'https://www.purrify.ca/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `https://www.purrify.ca${post.link}`,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          image: post.image.startsWith('http') ? post.image : `https://www.purrify.ca${post.image}`,
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-white to-[#FFFFF5] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-electric-indigo/10 to-deep-coral/10 dark:from-electric-indigo/5 dark:to-deep-coral/5">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Purrify Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Expert advice on cat care, litter box tips, and odor control solutions. Helping you create a fresher
                home for you and your feline friend.
              </p>
            </div>
          </Container>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
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
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
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
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
