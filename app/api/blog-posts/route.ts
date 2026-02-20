import { sampleBlogPosts, BlogPost } from '@/data/blog-posts';
import prisma from '@/lib/prisma';
import { ContentStore } from '@/lib/blog/content-store';
import { isValidLocale } from '@/i18n/config';

export const revalidate = 3600;

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

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit');
  const limitNum = limit ? parseInt(limit, 10) : undefined;
  const localeParam = searchParams.get('locale') || 'en';
  const locale = isValidLocale(localeParam) ? localeParam : 'en';

  try {
    const take = limitNum || 6;

    // Prefer filesystem-backed content (content/blog/{locale}) so blog cards always
    // use each post's featured image (canonical for hero/cards/social sharing).
    try {
      const store = new ContentStore();
      const posts = await store.getAllPosts(locale, false);
      if (posts.length > 0) {
        return Response.json(
          posts.slice(0, take).map((post) => ({
            title: post.title,
            excerpt: post.excerpt,
            author: post.author?.name || 'Purrify Team',
            date: post.publishDate?.includes('T') ? post.publishDate.split('T')[0] : post.publishDate,
            image: post.featuredImage.url,
            link: `/${locale}/blog/${post.slug}`,
            content: post.content,
            locale: post.locale,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching filesystem blog posts:', error);
    }

    // Check if database is configured
    if (!prisma) {
      console.warn('Database not configured, returning empty blog posts');
      return Response.json([]);
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
      return Response.json(
        automatedPosts.map((post) => ({
          title: post.title,
          excerpt: post.excerpt,
          author: post.author ?? 'Purrify Research Lab',
          date: (post.publishedAt ?? post.createdAt).toISOString().split('T')[0],
          image: post.heroImageUrl,
          link: `/${isValidLocale(String(post.locale || '').toLowerCase()) ? String(post.locale).toLowerCase() : 'en'}/blog/${post.slug}`,
          content: post.content,
          locale: (post.locale as 'en' | 'fr' | 'zh' | 'es' | undefined) ?? 'en',
        }))
      );
    }

    // WordPress API URL - replace with your WordPress site URL
    const wpApiUrl = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

    // Check if WordPress API URL is configured
    if (!process.env.WORDPRESS_API_URL || process.env.WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      // If WordPress is not configured yet, return sample data
      const posts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
      return Response.json(posts);
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
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/optimized/logos/purrify-logo.avif",
      link: `/${locale}/blog/${post.slug}`,
      content: post.content.rendered,
      locale: 'en'
    }));

    return Response.json(posts);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    // If all else fails, return sample data
    const fallbackPosts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
    return Response.json(fallbackPosts);
  }
}
