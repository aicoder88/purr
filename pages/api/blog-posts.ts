import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleBlogPosts, BlogPost } from '../../src/data/blog-posts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost[]>
) {
  try {
    const { limit } = req.query;
    const limitNum = limit ? parseInt(limit as string) : undefined;
    
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
    const postsUrl = `${wpApiUrl}/posts?_embed&per_page=${limitNum || 10}`;
    const response = await fetch(postsUrl);
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }
    
    const wpPosts = await response.json();
    
    // Transform WordPress posts to match our BlogPost interface
    const posts: BlogPost[] = wpPosts.map((post: any) => ({
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...",
      author: post._embedded?.author?.[0]?.name || "Purrify Team",
      date: new Date(post.date).toISOString().split('T')[0],
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/purrify-logo.png",
      link: `/blog/${post.slug}`,
      content: post.content.rendered
    }));
    
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    // Fallback to sample data in case of error
    const { limit } = req.query;
    const limitNum = limit ? parseInt(limit as string) : undefined;
    const posts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
    res.status(200).json(posts);
  }
}