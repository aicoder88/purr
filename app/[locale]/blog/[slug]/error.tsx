'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { 
  FileText,
  RefreshCw, 
  ArrowLeft,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

interface BlogPostErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogPostError({ error, reset }: BlogPostErrorProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const slug = params?.slug as string;
  const t = useTranslations();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Blog Post Error:', {
        error: error.message,
        stack: error.stack,
        digest: error.digest,
        locale,
        slug
      });
    }
  }, [error, locale, slug]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <Container className="px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-amber-100 bg-amber-900/30">
              <FileText className="w-10 h-10 text-amber-600 text-amber-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-gray-50">
            {t('errorPages.blogPost.title')}
          </h1>

          {/* Message */}
          <p className="text-base md:text-lg mb-6 text-gray-600 text-gray-300">
            {t('errorPages.blogPost.message')}
          </p>

          {/* Error Digest */}
          {error.digest && (
            <div className="mb-6 p-3 bg-gray-100 bg-gray-800 rounded-lg inline-block">
              <p className="text-xs text-gray-500 text-gray-400 font-mono">
                {t('errorPages.common.errorId')}: {error.digest}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button
              onClick={reset}
              variant="default"
              className="bg-[#FF3131] hover:bg-[#FF3131]/90 text-white rounded-full px-6"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('errorPages.common.tryAgain')}
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-gray-300 border-gray-600 hover:border-[#5B2EFF] hover:border-[#5B2EFF] rounded-full px-6"
            >
              <Link href={`/${locale}/blog`}>
                <BookOpen className="w-4 h-4 mr-2" />
                {t('errorPages.blogPost.allArticles')}
              </Link>
            </Button>
          </div>

          {/* Back to Blog */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center text-sm text-gray-500 text-gray-400 hover:text-[#5B2EFF] hover:text-[#8B5CF6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t('errorPages.blogPost.backToBlog')}
          </Link>

          {/* Development Details */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-gray-500 text-gray-400 cursor-pointer py-2 flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t('errorPages.common.debugInfo')}
              </summary>
              <div className="mt-2 text-xs bg-gray-100 bg-gray-800 rounded-lg p-4 text-left">
                <p className="font-semibold text-gray-800 text-gray-200 mb-1">
                  {error.name}: {error.message}
                </p>
                <p className="text-gray-600 text-gray-400 mb-2">
                  {t('errorPages.blogPost.slugLabel')}: {slug || t('errorPages.blogPost.notAvailable')} | {t('errorPages.blogPost.localeLabel')}: {locale}
                </p>
                <pre className="text-gray-600 text-gray-400 whitespace-pre-wrap font-mono text-[10px]">
                  {error.stack}
                </pre>
              </div>
            </details>
          )}
        </div>
      </Container>
    </div>
  );
}
