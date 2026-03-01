/**
 * Related Content Component
 * Server Component wrapper that fetches data and passes to client component for lazy loading
 */

import { getRelatedPages, getClustersForPage } from '@/lib/seo/topic-clusters';
import { RelatedContentClient } from './RelatedContentClient';
import { ContentStore } from '@/lib/blog/content-store';

interface RelatedContentProps {
  currentUrl: string;
  maxItems?: number;
  className?: string;
  title?: string;
  readMoreText?: string;
}

export async function RelatedContent({
  currentUrl,
  maxItems = 3,
  className = '',
  title = 'Related Articles',
  readMoreText = 'Read more',
}: RelatedContentProps) {
  const localeMatch = currentUrl.match(/^\/(en|fr|es|zh)(?=\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  let fallbackPages: Array<{ url: string; title: string }> = [];

  try {
    const store = new ContentStore();
    const posts = await store.getAllPosts(locale, false);
    const blogBasePath = locale === 'en' ? '/blog' : `/${locale}/blog`;
    fallbackPages = posts.map((post) => ({
      url: `${blogBasePath}/${post.slug}`,
      title: post.title,
    }));
  } catch {
    // Fall back to static related pages when live content loading fails
    fallbackPages = [];
  }

  const relatedPages = getRelatedPages(currentUrl, maxItems, fallbackPages);

  if (relatedPages.length === 0) {
    return null;
  }

  const clusters = getClustersForPage(currentUrl);
  const clusterName = clusters[0]?.name || 'Related Topics';

  return (
    <RelatedContentClient
      currentUrl={currentUrl}
      relatedPages={relatedPages}
      clusterName={clusterName}
      title={title}
      readMoreText={readMoreText}
      className={className}
    />
  );
}

export default RelatedContent;
