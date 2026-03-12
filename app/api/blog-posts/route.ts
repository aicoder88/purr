import { sampleBlogPosts, BlogPost } from '@/data/blog-posts';
import prisma from '@/lib/prisma';
import { ContentStore } from '@/lib/blog/content-store';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getPublicEditorialName } from '@/lib/editorial/entities';
import { unstable_cache } from 'next/cache';

export const revalidate = 3600;
const BLOG_POSTS_CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400';

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
  content?: {
    rendered: string;
  };
}

const getCachedPosts = unstable_cache(
  async (locale: string) => {
    const store = new ContentStore();
    return store.getAllPosts(locale, false, { includeContent: false });
  },
  ['blog-posts-filesystem'],
  { revalidate: 3600 }
);

type BlogPostResponse = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  locale: Locale;
  content?: string;
};

function normalizeLocale(locale: string | null | undefined): Locale {
  const normalizedLocale = String(locale ?? '').toLowerCase();
  return isValidLocale(normalizedLocale) ? normalizedLocale : 'en';
}

function shouldIncludeContent(value: string | null): boolean {
  return value === '1' || value === 'true';
}

function jsonResponse(body: BlogPostResponse[]) {
  return Response.json(body, {
    headers: {
      'Cache-Control': BLOG_POSTS_CACHE_CONTROL,
    },
  });
}

function buildBlogPostResponse(
  post: {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    link: string;
    locale?: string;
    content?: string;
  },
  includeContent: boolean
): BlogPostResponse {
  return {
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    image: post.image,
    link: post.link,
    locale: normalizeLocale(post.locale),
    ...(includeContent && post.content ? { content: post.content } : {}),
  };
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit');
  const limitNum = limit ? parseInt(limit, 10) : undefined;
  const localeParam = searchParams.get('locale') || 'en';
  const locale = normalizeLocale(localeParam);
  const includeContent = shouldIncludeContent(searchParams.get('includeContent'));

  try {
    const take = limitNum || 6;

    // Prefer filesystem-backed content (content/blog/{locale}) so blog cards always
    // use each post's featured image (canonical for hero/cards/social sharing).
    try {
      const posts = includeContent
        ? await new ContentStore().getAllPosts(locale, false, { includeContent: true })
        : await getCachedPosts(locale);
      if (posts.length > 0) {
        return jsonResponse(
          posts.slice(0, take).map((post) =>
            buildBlogPostResponse(
              {
                title: post.title,
                excerpt: post.excerpt,
                author: getPublicEditorialName(post.author?.name),
                date: post.publishDate?.includes('T') ? post.publishDate.split('T')[0] : post.publishDate,
                image: post.featuredImage.url,
                link: `/${locale}/blog/${post.slug}`,
                locale: post.locale,
                content: post.content,
              },
              includeContent
            )
          )
        );
      }
    } catch (error) {
      console.error('Error fetching filesystem blog posts:', error);
    }

    // Check if database is configured
    if (!prisma) {
      console.warn('Database not configured, returning empty blog posts');
      return jsonResponse([]);
    }

    const automatedPosts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        heroImageUrl: true,
        publishedAt: true,
        createdAt: true,
        author: true,
        locale: true,
        ...(includeContent ? { content: true } : {}),
      },
    });

    if (automatedPosts.length > 0) {
      return jsonResponse(
        automatedPosts.map((post) =>
          buildBlogPostResponse(
            {
              title: post.title,
              excerpt: post.excerpt,
              author: getPublicEditorialName(post.author ?? 'Purrify Research Lab'),
              date: (post.publishedAt ?? post.createdAt).toISOString().split('T')[0],
              image: post.heroImageUrl,
              link: `/${normalizeLocale(post.locale)}/blog/${post.slug}`,
              locale: post.locale as string,
              ...('content' in post && typeof post.content === 'string' ? { content: post.content } : {}),
            },
            includeContent
          )
        )
      );
    }

    // WordPress API URL - replace with your WordPress site URL
    const wpApiUrl = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

    // Check if WordPress API URL is configured
    if (!process.env.WORDPRESS_API_URL || process.env.WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      // If WordPress is not configured yet, return sample data
      const posts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
      return jsonResponse(
        posts.map((post) => buildBlogPostResponse(post, includeContent))
      );
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
      author: getPublicEditorialName(post._embedded?.author?.[0]?.name || "Purrify Team"),
      date: new Date(post.date).toISOString().split('T')[0],
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/optimized/logos/purrify-logo.avif",
      link: `/${locale}/blog/${post.slug}`,
      ...(includeContent && post.content?.rendered ? { content: post.content.rendered } : {}),
      locale: 'en'
    }));

    return jsonResponse(
      posts.map((post) => buildBlogPostResponse(post, includeContent))
    );
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    // If all else fails, return sample data
    const fallbackPosts = limitNum ? sampleBlogPosts.slice(0, limitNum) : sampleBlogPosts;
    return jsonResponse(
      fallbackPosts.map((post) => buildBlogPostResponse(post, includeContent))
    );
  }
}
