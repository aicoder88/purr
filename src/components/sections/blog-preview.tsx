"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "@/lib/translation-context";
import Image from 'next/image';
import { sampleBlogPosts } from "@/data/blog-posts";

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
}

const FALLBACK_BLOG_IMAGE = '/optimized/logos/purrify-logo.avif';

function normalizeBlogPosts(data: unknown): BlogPost[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item): BlogPost | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const candidate = item as Partial<BlogPost> & Record<string, unknown>;
      const title = typeof candidate.title === 'string' && candidate.title.trim().length > 0
        ? candidate.title
        : 'Purrify Blog';
      const excerpt = typeof candidate.excerpt === 'string'
        ? candidate.excerpt
        : '';
      const author = typeof candidate.author === 'string' && candidate.author.trim().length > 0
        ? candidate.author
        : 'Purrify Team';
      const date = typeof candidate.date === 'string' && candidate.date.trim().length > 0
        ? candidate.date
        : '';
      const image = typeof candidate.image === 'string' && candidate.image.trim().length > 0
        ? candidate.image
        : FALLBACK_BLOG_IMAGE;
      const link = typeof candidate.link === 'string' && candidate.link.trim().length > 0
        ? candidate.link
        : '/blog';

      return { title, excerpt, author, date, image, link };
    })
    .filter((post): post is BlogPost => post !== null);
}

export function BlogPreview() {
  const { t } = useTranslation();
  // Initialize with static data immediately to prevent blinking
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(sampleBlogPosts.slice(0, 3));

  useEffect(() => {
    let isMounted = true;
    async function fetchBlogPosts() {
      try {
        const response = await fetch("/api/blog-posts?limit=3");
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts (status ${response.status})`);
        }
        const data = await response.json();
        const normalizedPosts = normalizeBlogPosts(data);
        // Only update if we got different data to avoid unnecessary re-renders
        if (isMounted && normalizedPosts.length > 0) {
          setBlogPosts(normalizedPosts);
        }
      } catch (_err) {
        // Already initialized with static data, no need to update on error
        // Silently fall back to static content
      }
    }
    fetchBlogPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="py-12 bg-[linear-gradient(180deg,#fffdf8_0%,#f8fafc_100%)] dark:bg-[linear-gradient(180deg,#0b1220_0%,#111827_100%)] transition-colors duration-300"
      id="blog"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 font-medium text-sm mb-4">
            {t.blogSection.catCareTips}
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            {t.blogSection.fromOurBlog}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            {t.blogSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            const slug = post.link.split('/').filter(Boolean).pop();
            const href = slug ? `/blog/${slug}` : '/blog';
            const imageSrc = post.image && post.image.trim().length > 0 ? post.image : FALLBACK_BLOG_IMAGE;

            return (
            <Link
              key={`${post.link || post.title || 'blog-post'}-${index}`}
              href={href}
              className="block bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 dark:hover:border-gray-700 group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 to-blue-100/10 dark:from-amber-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-[200px] sm:h-[250px]">
                  <Image
                    src={imageSrc}
                    alt={`Featured image for blog post: ${post.title} - Purrify cat litter knowledge`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`w-full h-full ${imageSrc.includes('carbon_magnified') ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                    priority={index === 0}
                    quality={75}
                  />
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-amber-500 dark:bg-amber-300 px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-md text-xs text-gray-50 dark:text-gray-900 font-medium">
                  {t.blogSection.newPost}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-heading font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-amber-700 dark:text-amber-300 font-medium">
                    {post.author}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{post.date}</span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center hover:text-gray-900 dark:hover:text-white transition-colors">
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
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button
            asChild
            className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-gray-50 dark:text-gray-900 font-semibold py-4 px-8 rounded-full transition-colors duration-300 border-0"
          >
            <Link href={typeof window !== 'undefined' && window.location.pathname.startsWith('/fr') ? '/fr/blog' : '/blog'}>
              {t.blogSection.viewAllArticles}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
