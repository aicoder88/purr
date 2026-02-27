'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home,
  ArrowLeft
} from 'lucide-react';

interface LocaleErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LocaleError({ error, reset }: LocaleErrorProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = useTranslations();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Locale Router Error:', {
        error: error.message,
        stack: error.stack,
        digest: error.digest,
        locale
      });
    }
  }, [error, locale]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center px-4">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            {t('errorPages.locale.title')}
          </h1>

          {/* Message */}
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t('errorPages.locale.message')}
          </p>

          {/* Error Digest (if available) */}
          {error.digest && (
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 font-mono">
              {t('errorPages.locale.reference')}: {error.digest}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={reset}
              size="lg"
              className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131]/70 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('errorPages.common.tryAgain')}
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-[#5B2EFF] dark:hover:border-[#5B2EFF] hover:text-[#5B2EFF] dark:hover:text-[#8B5CF6] font-medium py-3 px-8 rounded-full transition-all duration-300"
            >
              <Link href={`/${locale}`}>
                <Home className="w-4 h-4 mr-2" />
                {t('errorPages.common.goHome')}
              </Link>
            </Button>
          </div>

          {/* Back Link */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-[#5B2EFF] dark:hover:text-[#8B5CF6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t('errorPages.locale.backToHome')}
          </Link>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
                <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors py-2">
                {t('errorPages.locale.developerDetails')}
              </summary>
              <div className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-auto">
                <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                  {error.name}: {error.message}
                </div>
                <div className="mb-2 text-gray-600 dark:text-gray-400">
                  {t('errorPages.locale.localeLabel')}: {locale} | {t('errorPages.locale.digestLabel')}: {error.digest || t('errorPages.locale.notAvailable')}
                </div>
                <pre className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words font-mono text-[11px]">
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
