/**
 * Related Content Component
 * Shared wrapper that computes related pages and passes to client component for lazy loading
 */

import { getRelatedPages, getClustersForPage } from '@/lib/seo/topic-clusters';
import { RelatedContentClient } from './RelatedContentClient';

interface RelatedContentProps {
  currentUrl: string;
  maxItems?: number;
  className?: string;
  title?: string;
  readMoreText?: string;
}

export function RelatedContent({
  currentUrl,
  maxItems = 3,
  className = '',
  title = 'Related Articles',
  readMoreText = 'Read more',
}: RelatedContentProps) {
  const relatedPages = getRelatedPages(currentUrl, maxItems);

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
