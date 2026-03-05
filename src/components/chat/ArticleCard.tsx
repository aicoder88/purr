'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import { localizePath } from '@/lib/i18n/locale-path';
import type { SuggestArticleToolInput } from '@/lib/chat/tools';

interface ArticleCardProps {
  locale: Locale;
  article: SuggestArticleToolInput;
  readArticleLabel: string;
}

function formatArticleTitle(slug: string): string {
  return slug
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function ArticleCard({ locale, article, readArticleLabel }: ArticleCardProps) {
  const articlePath = localizePath(`/blog/${article.article_slug}`, locale);

  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {formatArticleTitle(article.article_slug)}
      </p>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{article.reason}</p>
      <Button asChild size="sm" variant="outline" className="mt-3 h-8 border-gray-300 dark:border-gray-600">
        <Link href={articlePath}>{readArticleLabel}</Link>
      </Button>
    </div>
  );
}
