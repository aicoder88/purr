import { requireAuth } from '@/lib/auth/session';
import { SEOScorer } from '@/lib/blog/seo-scorer';
import { ContentStore } from '@/lib/blog/content-store';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, slug, data } = await request.json();

  if (!action) {
    return Response.json({ error: 'Action is required' }, { status: 400 });
  }

  const scorer = new SEOScorer();
  const store = new ContentStore();

  try {
    let result;

    switch (action) {
      case 'generate-alt-text':
        result = scorer.generateAltText(data.imageUrl);
        break;

      case 'generate-meta-description':
        result = scorer.generateMetaDescription(data.content, data.keywords);
        break;

      case 'optimize-title':
        result = scorer.optimizeTitle(data.title, data.keywords);
        break;

      case 'suggest-internal-links':
        if (!slug) {
          return Response.json({ error: 'Slug is required for internal link suggestions' }, { status: 400 });
        }
        const currentPost = await store.getPost(slug, 'en');
        if (!currentPost) {
          return Response.json({ error: 'Post not found' }, { status: 404 });
        }
        const allPosts = await store.getAllPosts('en', false);
        result = await scorer.suggestInternalLinks(currentPost, allPosts);
        break;

      case 'check-cannibalization':
        if (!slug) {
          return Response.json({ error: 'Slug is required for cannibalization check' }, { status: 400 });
        }
        const post = await store.getPost(slug, 'en');
        if (!post) {
          return Response.json({ error: 'Post not found' }, { status: 404 });
        }
        const posts = await store.getAllPosts('en', false);
        result = await scorer.checkKeywordCannibalization(post, posts);
        break;

      case 'validate-schema':
        if (!slug) {
          return Response.json({ error: 'Slug is required for schema validation' }, { status: 400 });
        }
        const postToValidate = await store.getPost(slug, 'en');
        if (!postToValidate) {
          return Response.json({ error: 'Post not found' }, { status: 404 });
        }
        result = scorer.validateSchema(postToValidate);
        break;

      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    return Response.json({ result }, { headers: rateLimitHeaders });
  } catch (_error) {
    return Response.json({
      error: _error instanceof Error ? _error.message : 'Internal server error'
    }, { status: 500, headers: rateLimitHeaders });
  }
}
