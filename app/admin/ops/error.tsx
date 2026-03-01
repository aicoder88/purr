'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { 
  Server,
  RefreshCw, 
  ArrowLeft,
  LayoutDashboard,
  AlertTriangle
} from 'lucide-react';

interface AdminOpsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminOpsError({ error, reset }: AdminOpsErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Admin Operations Error:', {
        error: error.message,
        stack: error.stack,
        digest: error.digest
      });
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm border-gray-700 bg-gray-800">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-orange-100 bg-orange-900/30">
            <Server className="w-8 h-8 text-orange-500 text-orange-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 text-gray-100">
          Operations Error
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-600 text-gray-300">
          An error occurred while loading the operations section. Please try again or return to the dashboard.
        </p>

        {/* Error Digest */}
        {error.digest && (
          <p className="mt-3 text-xs text-gray-500 text-gray-400 font-mono">
            Ref: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 bg-gray-100 text-gray-900 hover:bg-gray-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>

          <Button
            asChild
            variant="outline"
            className="border-gray-300 border-gray-600"
          >
            <Link href="/admin">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Back Link */}
        <Link
          href="/admin"
          className="mt-4 inline-flex items-center text-sm text-gray-500 text-gray-400 hover:text-gray-700 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Admin Dashboard
        </Link>

        {/* Development Details */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="text-xs text-gray-500 text-gray-400 cursor-pointer py-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Debug Details
            </summary>
            <div className="mt-2 text-xs bg-gray-100 bg-gray-700 rounded p-3 overflow-auto">
              <p className="font-semibold text-gray-800 text-gray-200">
                {error.name}: {error.message}
              </p>
              <pre className="mt-2 text-gray-600 text-gray-400 whitespace-pre-wrap font-mono text-[10px]">
                {error.stack}
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
