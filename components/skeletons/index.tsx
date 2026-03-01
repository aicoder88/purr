/**
 * Skeleton Loading Components
 * Reusable loading states for dynamic imports
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

/**
 * Base skeleton with pulse animation
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        className
      )}
    />
  );
}

/**
 * Multi-line text skeleton
 */
export function TextSkeleton({ lines = 3, className }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn('space-y-2', className)}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton for blog posts, products, etc.
 */
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse',
        className
      )}
    >
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-3">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-full" />
        <TextSkeleton lines={3} />
      </div>
    </div>
  );
}

/**
 * Grid of card skeletons
 */
export function CardGridSkeleton({ count = 6, className }: SkeletonProps & { count?: number }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8', className)}>
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Section header skeleton
 */
export function SectionHeaderSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('text-center mb-12 space-y-4 animate-pulse', className)}>
      <Skeleton className="h-4 w-32 mx-auto" />
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
  );
}

/**
 * Form field skeleton
 */
export function FormFieldSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('space-y-2 animate-pulse', className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

/**
 * Contact form skeleton
 */
export function ContactFormSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 animate-pulse',
        className
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldSkeleton />
          <FormFieldSkeleton />
        </div>
        <FormFieldSkeleton />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Contact method card skeleton
 */
export function ContactMethodCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl animate-pulse',
        className
      )}
    >
      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl mx-auto mb-6" />
      <Skeleton className="h-8 w-32 mx-auto mb-4" />
      <Skeleton className="h-6 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-full mx-auto mb-6" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

/**
 * Citation card skeleton for science page
 */
export function CitationCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <TextSkeleton lines={2} />
        </div>
      </div>
    </div>
  );
}

/**
 * Citations section skeleton
 */
export function CitationsSectionSkeleton({ className }: SkeletonProps) {
  return (
    <section className={cn('mb-16 animate-pulse', className)}>
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <CitationCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Team member card skeleton
 */
export function TeamMemberCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse',
        className
      )}
    >
      <div className="h-64 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-16 w-full" />
        <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * Team section skeleton
 */
export function TeamSectionSkeleton({ className }: SkeletonProps) {
  return (
    <section className={cn('py-20 animate-pulse', className)}>
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <TeamMemberCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Stats section skeleton
 */
export function StatsSectionSkeleton({ className }: SkeletonProps) {
  return (
    <section className={cn('py-20 bg-electric-indigo animate-pulse', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center px-4 py-4">
            <Skeleton className="h-12 w-24 mx-auto mb-2 bg-white/20" />
            <Skeleton className="h-6 w-32 mx-auto mb-2 bg-white/20" />
            <Skeleton className="h-4 w-48 mx-auto bg-white/20" />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Related content card skeleton
 */
export function RelatedContentCardSkeleton({ className }: SkeletonProps) {
  return (
    <article
      className={cn(
        'rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse',
        className
      )}
    >
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </article>
  );
}

/**
 * Related content section skeleton
 */
export function RelatedContentSkeleton({ className }: SkeletonProps) {
  return (
    <section className={cn('py-12 animate-pulse', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <RelatedContentCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Blog post content skeleton
 */
export function BlogPostContentSkeleton({ className }: SkeletonProps) {
  return (
    <article className={cn('max-w-4xl mx-auto animate-pulse', className)}>
      <div className="space-y-4 mb-8">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8" />
      <div className="space-y-4">
        <TextSkeleton lines={5} />
        <Skeleton className="h-8 w-1/2" />
        <TextSkeleton lines={8} />
      </div>
    </article>
  );
}

/**
 * FAQ section skeleton
 */
export function FAQSectionSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 animate-pulse', className)}>
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <TextSkeleton lines={3} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Page layout skeleton
 */
export function PageLayoutSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('min-h-screen bg-[#FFFFF5] dark:bg-gray-900 animate-pulse', className)}>
      <div className="h-16 bg-gray-200 dark:bg-gray-800" />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <TextSkeleton lines={10} />
      </main>
      <div className="h-32 bg-gray-200 dark:bg-gray-800 mt-auto" />
    </div>
  );
}
