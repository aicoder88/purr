import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleBlogPosts, BlogPost } from '../../src/data/blog-posts';
import prisma from '../../src/lib/prisma';

interface WpPost {
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    author?: { name: string }[];
    'wp:featuredmedia'?: { source_url: string }[];
  };
  date: string;
  slug: string;
  content: {
    rendered: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { limit } = req.query;
  const limitNum = limit ? parseInt(limit as string, 10) : undefined;

  try {
    const take = limitNum || 6;

    // Check if database is configured
    if (!prisma) {
      console.warn('Database not configured, returning empty blog posts');
      return res.status(200).json([]);
    }

    const automatedPosts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        heroImageUrl: true,
        publishedAt: true,
        createdAt: true,
        author: true,
        locale: true,
      },
    });

    if (automatedPosts.length > 0) {
      return res.status(200).json(
        automatedPosts.map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          author: post.author ?? 'Purrify Research Lab',
          date: (post.publishedAt ?? post.createdAt).toISOString().split('T')[0],
          image: post.heroImageUrl,
          link: `/blog/${post.slug}`,
          content: post.content,
          locale: (post.locale as 'en' | 'fr' | 'zh' | undefined) ?? 'en',
        }))
      );
    }

    // WordPress API URL - replace with your WordPress site URL
    const wpApiUrl = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

    // Check if WordPress API URL is configured
    if (!process.env.WORDPRESS_API_URL || process.env.WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      // If WordPress is not configured yet, return sample data
      console.log('WordPress API not configured, returning sample data');
      const posts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
      return res.status(200).json(posts);
    }

    // Fetch posts from WordPress
    const postsUrl = `${wpApiUrl}/posts?_embed&per_page=${take}`;
    const response = await fetch(postsUrl);

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const wpPosts = await response.json();

    // Transform WordPress posts to match our BlogPost interface
    const posts: BlogPost[] = wpPosts.map((post: WpPost) => ({
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replaceAll(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...",
      author: post._embedded?.author?.[0]?.name || "Purrify Team",
      date: new Date(post.date).toISOString().split('T')[0],
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/optimized/purrify-logo.avif",
      link: `/blog/${post.slug}`,
      content: post.content.rendered,
      locale: 'en'
    }));

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    // If all else fails, return sample data
    const fallbackPosts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
    return res.status(200).json(fallbackPosts);
  }
}