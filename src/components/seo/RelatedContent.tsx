/**
 * Related Content Component
 * Shared wrapper that computes related pages for internal links
 */

import { getRelatedPages, getClustersForPage } from '@/lib/seo/topic-clusters';
import { sampleBlogPosts } from '@/data/blog-posts';
import { RelatedContentClient } from './RelatedContentClient';

interface RelatedContentProps {
  currentUrl: string;
  maxItems?: number;
  className?: string;
  title?: string;
  readMoreText?: string;
}

const LOCALE_PREFIX_REGEX = /^\/(en|fr|es|zh)(?=\/|$)/;

function resolveLocale(url: string): string {
  const match = url.match(LOCALE_PREFIX_REGEX);
  return match?.[1] || 'en';
}

function buildLocalizedBlogPath(slug: string, locale: string): string {
  return locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
}

function localizeBlogLink(link: string, locale: string): string {
  const slug = link.replace(/^\/blog\//, '').replace(/\/+$/, '');
  return buildLocalizedBlogPath(slug, locale);
}

export function RelatedContent({
  currentUrl,
  maxItems = 8,
  className = '',
  title = 'Related Articles',
  readMoreText = 'Read more',
}: RelatedContentProps) {
  const locale = resolveLocale(currentUrl);
  const fallbackPageMap = new Map<string, string>();

  for (const post of sampleBlogPosts) {
    fallbackPageMap.set(localizeBlogLink(post.link, locale), post.title);
  }

  const fallbackPages = Array.from(fallbackPageMap.entries()).map(([url, title]) => ({ url, title }));
  const relatedPages = getRelatedPages(currentUrl, maxItems, fallbackPages);

  if (relatedPages.length === 0) {
    return null;
  }

  const clusters = getClustersForPage(currentUrl);
  const clusterName = clusters[0]?.name || 'Related Topics';

  return (
    <RelatedContentClient
      relatedPages={relatedPages}
      clusterName={clusterName}
      title={title}
      readMoreText={readMoreText}
      className={className}
    />
  );
}

export default RelatedContent;
