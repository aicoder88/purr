'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { 
  Package,
  RefreshCw, 
  Home,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = useTranslations();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Products Section Error:', {
        error: error.message,
        stack: error.stack,
        digest: error.digest,
        locale
      });
    }
  }, [error, locale]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <Container className="px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-purple-100 bg-purple-900/30">
              <Package className="w-10 h-10 text-purple-500 text-purple-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-gray-50">
            {t('errorPages.products.title')}
          </h1>

          {/* Message */}
          <p className="text-base md:text-lg mb-6 text-gray-600 text-gray-300">
            {t('errorPages.products.message')}
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
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
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
              <Link href={`/${locale}`}>
                <Home className="w-4 h-4 mr-2" />
                {t('errorPages.common.goHome')}
              </Link>
            </Button>
          </div>

          {/* Back to Products */}
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center text-sm text-gray-500 text-gray-400 hover:text-[#5B2EFF] hover:text-[#8B5CF6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t('errorPages.products.backToProducts')}
          </Link>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 border-gray-700">
            <p className="text-sm text-gray-500 text-gray-400 mb-3">
              {t('errorPages.products.popularPages')}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href={`/${locale}/try-free`}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-[#FF3131]/10 hover:bg-[#FF3131]/20 text-[#FF3131] rounded-full transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                  {t('errorPages.products.tryFree')}
                </Link>
              <Link
                href={`/${locale}/support`}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 bg-gray-800 hover:bg-gray-200 hover:bg-gray-700 rounded-full text-gray-700 text-gray-300 transition-colors"
              >
                {t('errorPages.products.contactSupport')}
              </Link>
            </div>
          </div>

          {/* Development Details */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-gray-500 text-gray-400 cursor-pointer py-2">
                {t('errorPages.common.debugInfo')}
              </summary>
              <div className="mt-2 text-xs bg-gray-100 bg-gray-800 rounded-lg p-4 text-left">
                <p className="font-semibold text-gray-800 text-gray-200 mb-1">
                  {error.name}: {error.message}
                </p>
                <pre className="text-gray-600 text-gray-400 whitespace-pre-wrap font-mono text-[10px] mt-2">
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
