'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ThumbsUp, ThumbsDown, User, CheckCircle, Filter, SortAsc, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

// ============================================================================
// Types
// ============================================================================

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';

interface ReviewData {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  productSize: string | null;
  catCount: number | null;
  usageDuration: string | null;
  wouldRecommend: boolean;
}

interface AggregateData {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
  recommendPercentage: number;
}

interface ReviewSystemProps {
  productId?: string;
  showFilters?: boolean;
  maxReviews?: number;
  compact?: boolean;
  includeSchema?: boolean;
}

// ============================================================================
// Helpers
// ============================================================================

const STAR_SIZE_CLASSES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function StarRating({ rating, size = 'md', interactive, onRate }: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${STAR_SIZE_CLASSES[size]} ${
            star <= (hovered || rating)
              ? 'text-yellow-400 dark:text-yellow-300 fill-current'
              : 'text-gray-300 dark:text-gray-600'
          } ${interactive ? 'cursor-pointer transition-colors' : ''}`}
          onClick={() => interactive && onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Review Form
// ============================================================================

function ReviewForm({ productId, onSubmitted, t }: {
  productId?: string;
  onSubmitted: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    authorName: '',
    authorEmail: '',
    rating: 0,
    title: '',
    content: '',
    productSize: '',
    catCount: '',
    usageDuration: '',
    wouldRecommend: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.rating === 0) {
      setError(t('reviewSystem.form.selectRating'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          authorName: form.authorName,
          authorEmail: form.authorEmail,
          rating: form.rating,
          title: form.title,
          content: form.content,
          productSize: form.productSize || undefined,
          catCount: form.catCount ? parseInt(form.catCount) : undefined,
          usageDuration: form.usageDuration || undefined,
          wouldRecommend: form.wouldRecommend,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      setSuccess(true);
      setForm({ authorName: '', authorEmail: '', rating: 0, title: '', content: '', productSize: '', catCount: '', usageDuration: '', wouldRecommend: true });
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
        <p className="text-green-800 dark:text-green-200 font-medium">{t('reviewSystem.form.thankYou')}</p>
        <p className="text-green-600 dark:text-green-400 text-sm mt-1">{t('reviewSystem.form.pendingModeration')}</p>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#5B2EFF] hover:bg-[#4920cc] text-white dark:text-gray-100"
      >
        <Send className="w-4 h-4 mr-2" />
        {t('reviewSystem.form.writeReview')}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 space-y-4">
      <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
        {t('reviewSystem.form.writeReview')}
      </h3>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('reviewSystem.form.yourRating')} *
        </label>
        <StarRating rating={form.rating} size="lg" interactive onRate={(r) => setForm(f => ({ ...f, rating: r }))} />
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('reviewSystem.form.name')} *
          </label>
          <input
            id="review-name"
            type="text"
            required
            maxLength={100}
            value={form.authorName}
            onChange={(e) => setForm(f => ({ ...f, authorName: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="review-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('reviewSystem.form.email')} *
          </label>
          <input
            id="review-email"
            type="email"
            required
            value={form.authorEmail}
            onChange={(e) => setForm(f => ({ ...f, authorEmail: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder={t('reviewSystem.form.emailNote')}
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('reviewSystem.form.reviewTitle')} *
        </label>
        <input
          id="review-title"
          type="text"
          required
          maxLength={200}
          value={form.title}
          onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder={t('reviewSystem.form.titlePlaceholder')}
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('reviewSystem.form.reviewContent')} *
        </label>
        <textarea
          id="review-content"
          required
          maxLength={2000}
          rows={4}
          value={form.content}
          onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
          placeholder={t('reviewSystem.form.contentPlaceholder')}
        />
      </div>

      {/* Optional context fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="review-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('reviewSystem.form.productSize')}
          </label>
          <select
            id="review-size"
            value={form.productSize}
            onChange={(e) => setForm(f => ({ ...f, productSize: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">{t('reviewSystem.filters.allSizes')}</option>
            <option value="12g">{t('reviewSystem.filters.trial')}</option>
            <option value="50g">{t('reviewSystem.filters.regular')}</option>
            <option value="120g">{t('reviewSystem.filters.large')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="review-cats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('reviewSystem.form.numberOfCats')}
          </label>
          <input
            id="review-cats"
            type="number"
            min={1}
            max={20}
            value={form.catCount}
            onChange={(e) => setForm(f => ({ ...f, catCount: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="review-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('reviewSystem.form.usageDuration')}
          </label>
          <input
            id="review-duration"
            type="text"
            maxLength={50}
            value={form.usageDuration}
            onChange={(e) => setForm(f => ({ ...f, usageDuration: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder={t('reviewSystem.form.durationPlaceholder')}
          />
        </div>
      </div>

      {/* Would recommend */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.wouldRecommend}
          onChange={(e) => setForm(f => ({ ...f, wouldRecommend: e.target.checked }))}
          className="w-4 h-4 text-[#5B2EFF] rounded border-gray-300 dark:border-gray-600"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">{t('reviewSystem.review.recommendsProduct')}</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-[#5B2EFF] hover:bg-[#4920cc] text-white dark:text-gray-100"
        >
          {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          {t('reviewSystem.form.submit')}
        </Button>
        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
          {t('reviewSystem.form.cancel')}
        </Button>
      </div>
    </form>
  );
}

// ============================================================================
// Rating Summary
// ============================================================================

function RatingSummary({ aggregate, t }: { aggregate: AggregateData; t: ReturnType<typeof useTranslations> }) {
  const maxCount = Math.max(...Object.values(aggregate.ratingDistribution), 1);

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      {/* Big average */}
      <div className="text-center sm:text-left">
        <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          {aggregate.averageRating.toFixed(1)}
        </div>
        <StarRating rating={Math.round(aggregate.averageRating)} size="md" />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t('reviewSystem.basedOn')} {aggregate.totalReviews} {t('reviewSystem.reviews')}
        </p>
        {aggregate.recommendPercentage > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            {aggregate.recommendPercentage}% {t('reviewSystem.wouldRecommend')}
          </p>
        )}
      </div>

      {/* Distribution bars */}
      <div className="flex-1 w-full space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = aggregate.ratingDistribution[star] || 0;
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-4 text-right text-gray-600 dark:text-gray-400">{star}</span>
              <Star className="w-3.5 h-3.5 text-yellow-400 dark:text-yellow-300 fill-current flex-shrink-0" />
              <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 dark:bg-yellow-300 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-500 dark:text-gray-400">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export const ReviewSystem: React.FC<ReviewSystemProps> = ({
  productId,
  showFilters = true,
  maxReviews,
  compact = false,
  includeSchema = false,
}) => {
  const t = useTranslations();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [aggregate, setAggregate] = useState<AggregateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterSize, setFilterSize] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [votedReviews, setVotedReviews] = useState<Set<string>>(new Set());

  const limit = maxReviews || 10;

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (productId) params.set('productId', productId);
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      params.set('sort', sortBy);
      if (filterRating) params.set('rating', filterRating.toString());
      if (filterSize) params.set('size', filterSize);

      const res = await fetch(`/api/reviews?${params}`);
      if (!res.ok) return;

      const data = await res.json();
      setReviews(data.reviews);
      setAggregate(data.aggregate);
      setTotalPages(data.pagination.totalPages);
    } catch {
      // Silently fail - show empty state
    } finally {
      setLoading(false);
    }
  }, [productId, page, limit, sortBy, filterRating, filterSize]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleVote = async (reviewId: string, isHelpful: boolean) => {
    if (votedReviews.has(reviewId)) return;

    try {
      const res = await fetch('/api/reviews/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, isHelpful }),
      });

      if (!res.ok) return;

      const { helpfulCount, unhelpfulCount } = await res.json();
      setReviews(prev =>
        prev.map(r =>
          r.id === reviewId ? { ...r, helpfulCount, unhelpfulCount } : r
        )
      );
      setVotedReviews(prev => new Set(prev).add(reviewId));
    } catch {
      // Silently fail
    }
  };

  // Schema.org markup for SEO
  const schemaMarkup = includeSchema && aggregate && aggregate.totalReviews > 0 ? {
    '@type': 'AggregateRating',
    ratingValue: aggregate.averageRating,
    reviewCount: aggregate.totalReviews,
    bestRating: 5,
    worstRating: 1,
  } : null;

  // Loading state
  if (loading && reviews.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-[#5B2EFF]" />
        </div>
      </div>
    );
  }

  // Empty state (no reviews yet)
  if (!loading && reviews.length === 0 && !aggregate?.totalReviews) {
    return (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
          <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('reviewSystem.customerReviews')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {t('reviewSystem.noReviewsYet')}
          </p>
          <ReviewForm productId={productId} onSubmitted={fetchReviews} t={t} />
        </div>
      </div>
    );
  }

  // Compact mode (for product cards / homepage)
  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('reviewSystem.customerReviews')}
          </h3>
          {aggregate && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(aggregate.averageRating)} size="sm" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {aggregate.averageRating.toFixed(1)} ({aggregate.totalReviews})
              </span>
            </div>
          )}
        </div>

        {/* Show first few reviews */}
        <div className="space-y-3">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <StarRating rating={review.rating} size="sm" />
                {review.verified && (
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" />
                    {t('reviewSystem.review.verifiedPurchase')}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{review.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{review.content}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{review.authorName} - {formatDate(review.date)}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button
            variant="outline"
            className="w-full border-[#5B2EFF] text-[#5B2EFF] dark:text-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white dark:hover:text-gray-100"
          >
            {t('reviewSystem.viewAllReviews')}
          </Button>
        </div>
      </div>
    );
  }

  // Full review system
  return (
    <>
      {/* Schema markup for SEO */}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
      )}

      <div className="space-y-6">
        {/* Rating Summary + Write Review */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
          <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t('reviewSystem.customerReviews')}
          </h3>
          {aggregate && <RatingSummary aggregate={aggregate} t={t} />}
          <div className="mt-6">
            <ReviewForm productId={productId} onSubmitted={fetchReviews} t={t} />
          </div>
        </div>

        {/* Filters and Sorting */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <select
                    value={filterRating || ''}
                    onChange={(e) => { setFilterRating(e.target.value ? parseInt(e.target.value) : null); setPage(1); }}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">{t('reviewSystem.filters.allRatings')}</option>
                    <option value="5">5 {t('reviewSystem.filters.stars')}</option>
                    <option value="4">4 {t('reviewSystem.filters.stars')}</option>
                    <option value="3">3 {t('reviewSystem.filters.stars')}</option>
                    <option value="2">2 {t('reviewSystem.filters.stars')}</option>
                    <option value="1">1 {t('reviewSystem.filters.star')}</option>
                  </select>
                </div>
                <select
                  value={filterSize || ''}
                  onChange={(e) => { setFilterSize(e.target.value || null); setPage(1); }}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="">{t('reviewSystem.filters.allSizes')}</option>
                  <option value="12g">{t('reviewSystem.filters.trial')}</option>
                  <option value="50g">{t('reviewSystem.filters.regular')}</option>
                  <option value="120g">{t('reviewSystem.filters.large')}</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value as SortOption); setPage(1); }}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="newest">{t('reviewSystem.sort.newestFirst')}</option>
                  <option value="oldest">{t('reviewSystem.sort.oldestFirst')}</option>
                  <option value="highest">{t('reviewSystem.sort.highestRated')}</option>
                  <option value="lowest">{t('reviewSystem.sort.lowestRated')}</option>
                  <option value="helpful">{t('reviewSystem.sort.mostHelpful')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#5B2EFF] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white dark:text-gray-100" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {review.authorName}
                      </span>
                      {review.verified && (
                        <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs">{t('reviewSystem.review.verifiedPurchase')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  {review.productSize && <div>{t('reviewSystem.review.size')}: {review.productSize}</div>}
                  {review.catCount && <div>{review.catCount} {review.catCount > 1 ? t('reviewSystem.review.cats') : t('reviewSystem.review.cat')}</div>}
                  {review.usageDuration && <div>{t('reviewSystem.review.usingFor')} {review.usageDuration}</div>}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{review.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{review.content}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleVote(review.id, true)}
                    disabled={votedReviews.has(review.id)}
                    className={`flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors ${votedReviews.has(review.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`Mark review as helpful (${review.helpfulCount} votes)`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{t('reviewSystem.review.helpful')} ({review.helpfulCount})</span>
                  </button>
                  <button
                    onClick={() => handleVote(review.id, false)}
                    disabled={votedReviews.has(review.id)}
                    className={`flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors ${votedReviews.has(review.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`Mark review as not helpful (${review.unhelpfulCount} votes)`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm">({review.unhelpfulCount})</span>
                  </button>
                </div>
                {review.wouldRecommend && (
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('reviewSystem.review.recommendsProduct')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              {t('reviewSystem.pagination.previous')}
            </Button>
            <span className="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              {t('reviewSystem.pagination.next')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewSystem;
