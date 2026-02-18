'use client';

import { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SITE_NAME } from '@/lib/constants';
import {
  Home,
  ShoppingBag,
  BookOpen,
  Mail,
  HeadphonesIcon,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  ServerCrash,
  Lock,
  FileSearch,
  Clock
} from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}

// Error message mapping for different status codes
interface ErrorInfo {
  title: string;
  message: string;
  icon: React.ReactNode;
}

const getErrorMessage = (statusCode: number): ErrorInfo => {
  switch (statusCode) {
    case 400:
      return {
        title: '400 - Bad Request',
        message: 'The request could not be understood by the server due to malformed syntax. Please check the URL and try again.',
        icon: <AlertCircle className="w-12 h-12 text-orange-500 dark:text-orange-400" />
      };
    case 401:
      return {
        title: '401 - Unauthorized',
        message: 'You need to authenticate to access this resource. Please sign in to continue.',
        icon: <Lock className="w-12 h-12 text-orange-500 dark:text-orange-400" />
      };
    case 403:
      return {
        title: '403 - Access Denied',
        message: 'You do not have permission to access this resource. Contact support if you believe this is an error.',
        icon: <Lock className="w-12 h-12 text-red-500 dark:text-red-400" />
      };
    case 404:
      return {
        title: '404 - Page Not Found',
        message: 'The page you are looking for might have been moved, deleted, or perhaps never existed.',
        icon: <FileSearch className="w-12 h-12 text-blue-500 dark:text-blue-400" />
      };
    case 429:
      return {
        title: '429 - Too Many Requests',
        message: 'You have sent too many requests in a given amount of time. Please wait a moment and try again.',
        icon: <Clock className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
      };
    case 500:
      return {
        title: '500 - Internal Server Error',
        message: 'Something went wrong on our end. Our team has been notified and is working on a fix.',
        icon: <ServerCrash className="w-12 h-12 text-red-500 dark:text-red-400" />
      };
    case 502:
      return {
        title: '502 - Bad Gateway',
        message: 'We are experiencing temporary issues connecting to our servers. Please try again in a few minutes.',
        icon: <ServerCrash className="w-12 h-12 text-red-500 dark:text-red-400" />
      };
    case 503:
      return {
        title: '503 - Service Unavailable',
        message: 'The service is temporarily unavailable. We are likely performing maintenance. Please try again later.',
        icon: <ServerCrash className="w-12 h-12 text-orange-500 dark:text-orange-400" />
      };
    case 504:
      return {
        title: '504 - Gateway Timeout',
        message: 'The request took too long to complete. This could be due to high traffic. Please try again.',
        icon: <Clock className="w-12 h-12 text-orange-500 dark:text-orange-400" />
      };
    default:
      return {
        title: `${statusCode} - Error`,
        message: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
        icon: <AlertTriangle className="w-12 h-12 text-red-500" />
      };
  }
};

// Default error message when status code cannot be determined
const getDefaultErrorInfo = (): ErrorInfo => ({
  title: 'Something Went Wrong',
  message: 'We apologize for the inconvenience. An unexpected error occurred while processing your request.',
  icon: <AlertTriangle className="w-12 h-12 text-red-500" />
});

// Suggested pages for different error types
interface Suggestion {
  title: string;
  path: string;
  description: string;
  icon: React.ReactNode;
}

const getErrorSuggestions = (statusCode: number, isAuthenticated: boolean): Suggestion[] => {
  const commonPages: Suggestion[] = [
    {
      title: 'Home',
      path: '/',
      description: 'Return to our homepage',
      icon: <Home className="w-5 h-5" />
    },
    {
      title: 'Products',
      path: '/#products',
      description: 'Browse our cat litter additives',
      icon: <ShoppingBag className="w-5 h-5" />
    },
    {
      title: 'Blog',
      path: '/blog',
      description: 'Read our latest articles on cat care',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: 'Contact',
      path: '/#contact',
      description: 'Get in touch with our team',
      icon: <Mail className="w-5 h-5" />
    }
  ];

  if (statusCode === 401 || statusCode === 403) {
    return [
      {
        title: 'Home',
        path: '/',
        description: 'Return to our homepage',
        icon: <Home className="w-5 h-5" />
      },
      {
        title: 'Sign In',
        path: '/api/auth/signin',
        description: isAuthenticated ? 'Return to your account' : 'Sign in to your account',
        icon: <Lock className="w-5 h-5" />
      },
      ...commonPages.slice(1)
    ];
  }

  if (statusCode >= 500) {
    return [
      {
        title: 'Home',
        path: '/',
        description: 'Return to our homepage',
        icon: <Home className="w-5 h-5" />
      },
      {
        title: 'Support',
        path: '/support',
        description: 'Contact our support team',
        icon: <HeadphonesIcon className="w-5 h-5" />
      },
      commonPages[1], // Products
      commonPages[2]  // Blog
    ];
  }

  return commonPages;
};

// Extract status code from error or digest
const extractStatusCode = (error: Error & { digest?: string; statusCode?: number }): number => {
  // Check for explicit statusCode property
  if (error.statusCode && typeof error.statusCode === 'number') {
    return error.statusCode;
  }

  // Try to extract from error message
  const messageMatch = error.message?.match(/\b(\d{3})\b/);
  if (messageMatch) {
    const code = parseInt(messageMatch[1], 10);
    if (code >= 400 && code < 600) {
      return code;
    }
  }

  // Try to extract from digest (Next.js error digest often contains status info)
  if (error.digest) {
    const digestMatch = error.digest.match(/\b(\d{3})\b/);
    if (digestMatch) {
      const code = parseInt(digestMatch[1], 10);
      if (code >= 400 && code < 600) {
        return code;
      }
    }
  }

  // Check error name for common patterns
  if (error.name?.includes('404') || error.message?.toLowerCase().includes('not found')) {
    return 404;
  }
  if (error.name?.includes('403') || error.message?.toLowerCase().includes('forbidden')) {
    return 403;
  }
  if (error.name?.includes('401') || error.message?.toLowerCase().includes('unauthorized')) {
    return 401;
  }

  // Default to 500 for unknown errors
  return 500;
};

export default function Error({ error, reset }: ErrorPageProps) {
  const [statusCode, setStatusCode] = useState<number>(500);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Extract status code on mount
  useEffect(() => {
    const code = extractStatusCode(error);
    setStatusCode(code);

    // Check if user is authenticated (simplified check)
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        setIsAuthenticated(!!session?.user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [error]);

  // Log analytics

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('App Router Error:', {
        error: error.message,
        stack: error.stack,
        digest: error.digest,
        statusCode
      });
    }

    // Log to analytics
    const logError = () => {
      const errorData = {
        statusCode,
        errorMessage: error.message,
        errorName: error.name,
        url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        timestamp: new Date().toISOString(),
        digest: error.digest
      };

      // Send to analytics endpoint if available
      if (typeof window !== 'undefined') {
        // Using sendBeacon for reliable delivery
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/analytics/error', JSON.stringify(errorData));
        }

        // Also log to console for debugging
        console.error('Error Analytics Log:', errorData);
      }
    };

    logError();
  }, [error, statusCode]);

  const errorInfo = statusCode ? getErrorMessage(statusCode) : getDefaultErrorInfo();
  const suggestions = getErrorSuggestions(statusCode, isAuthenticated);
  const isServerError = statusCode >= 500;
  const isClientError = statusCode >= 400 && statusCode < 500;

  const navigateHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          {/* Animated Logo */}
          <div className="mb-8 flex justify-center">
            <div className={`relative ${isServerError ? 'animate-pulse' : 'animate-bounce'}`}>
              <Image
                src="/optimized/purrify-logo.webp"
                alt={`${SITE_NAME} Logo`}
                width={120}
                height={120}
                className="h-20 w-auto dark:hidden"
                priority
              />
              <Image
                src="/optimized/logo-dark.webp"
                alt={`${SITE_NAME} Logo`}
                width={120}
                height={120}
                className="h-20 w-auto hidden dark:block"
                priority
              />
            </div>
          </div>

          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${isServerError
              ? 'bg-red-100 dark:bg-red-900/30'
              : isClientError && statusCode !== 404
                ? 'bg-orange-100 dark:bg-orange-900/30'
                : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
              {errorInfo.icon}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            {errorInfo.title}
          </h1>

          {/* Message */}
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {errorInfo.message}
          </p>

          {/* Status Code Display */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Error Code:</span>
            <span className={`text-sm font-bold ${isServerError
              ? 'text-red-600 dark:text-red-400'
              : 'text-orange-600 dark:text-orange-400'
              }`}>
              {statusCode}
            </span>
          </div>

          {/* Server Error Help Section */}
          {isServerError && (
            <div className="mb-8 p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/50">
              <h2 className="font-heading text-lg font-semibold mb-3 text-red-800 dark:text-red-200 flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                What can you do?
              </h2>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Try refreshing the page in a few minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Clear your browser cache and cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>Contact our support team if the issue persists</span>
                </li>
              </ul>
            </div>
          )}

          {/* Client Error Help Section (non-404) */}
          {isClientError && statusCode !== 404 && (
            <div className="mb-8 p-5 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800/50">
              <h2 className="font-heading text-lg font-semibold mb-3 text-orange-800 dark:text-orange-200 flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                What can you do?
              </h2>
              <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 dark:text-orange-400 mt-0.5">•</span>
                  <span>Check the URL for any typos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 dark:text-orange-400 mt-0.5">•</span>
                  <span>Make sure you are logged in if required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 dark:text-orange-400 mt-0.5">•</span>
                  <span>Try accessing the resource again</span>
                </li>
                {(statusCode === 401 || statusCode === 403) && (
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 dark:text-orange-400 mt-0.5">•</span>
                    <span>Sign out and sign back in to refresh your session</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={reset}
              size="lg"
              className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131]/70 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg min-w-[180px]"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={navigateHome}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-[#5B2EFF] dark:hover:border-[#5B2EFF] hover:text-[#5B2EFF] dark:hover:text-[#8B5CF6] font-medium py-3 px-8 rounded-full transition-all duration-300 min-w-[180px]"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Suggested Pages */}
          <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="font-heading text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              You might be looking for:
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="group p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:border-[#5B2EFF]/30 dark:hover:border-[#5B2EFF]/30 transition-all duration-300 text-left flex items-start gap-3"
                >
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 group-hover:bg-[#5B2EFF]/10 group-hover:text-[#5B2EFF] dark:group-hover:text-[#8B5CF6] transition-colors">
                    {page.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] dark:group-hover:text-[#8B5CF6] transition-colors flex items-center gap-1">
                      {page.title}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mt-0.5">
                      {page.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left">
              <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors py-2">
                Developer Details
              </summary>
              <div className="mt-3 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-auto">
                <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                  {error.name}: {error.message}
                </div>
                <div className="mb-2 text-gray-600 dark:text-gray-400">
                  Status Code: {statusCode} | Digest: {error.digest || 'N/A'}
                </div>
                <pre className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words font-mono text-[11px]">
                  {error.stack}
                </pre>
              </div>
            </details>
          )}

          {/* Footer Message */}
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            If this problem persists, please{' '}
            <Link
              href="/support"
              className="text-[#5B2EFF] hover:text-[#4B1EEF] dark:text-[#8B5CF6] dark:hover:text-[#A78BFA] underline underline-offset-2 transition-colors"
            >
              contact our support team
            </Link>
            {' '}for assistance.
          </p>
        </div>
      </Container>
    </div>
  );
}
