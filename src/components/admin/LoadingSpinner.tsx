'use client'

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-600 text-purple-400`} />
      {text && (
        <p className="text-sm text-gray-600 text-gray-400">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Skeleton loader for content
export function SkeletonLoader({ lines = 3 }: { lines?: number }) {
  // Fixed widths for consistent rendering
  const widths = [85, 92, 78, 88, 95, 73, 90];

  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 bg-gray-700 rounded"
          style={{ width: `${widths[i % widths.length]}%` }}
        />
      ))}
    </div>
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-6 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-4 h-4 bg-gray-200 bg-gray-700 rounded" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 bg-gray-700 rounded w-5/6" />
          <div className="flex space-x-4">
            <div className="h-3 bg-gray-200 bg-gray-700 rounded w-20" />
            <div className="h-3 bg-gray-200 bg-gray-700 rounded w-20" />
            <div className="h-3 bg-gray-200 bg-gray-700 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
