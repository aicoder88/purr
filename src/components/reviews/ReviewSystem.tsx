import { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, User, CheckCircle, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

// ============================================================================
// Types & Interfaces
// ============================================================================

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  productSize: '12g' | '50g' | '120g';
  catCount: number;
  usageDuration: string;
  wouldRecommend: boolean;
  images?: string[];
}
interface ReviewSystemProps {
  productId?: string;
  showFilters?: boolean;
  maxReviews?: number;
  compact?: boolean;
  includeSchema?: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const STAR_SIZE_CLASSES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const SAMPLE_REVIEWS: Review[] = [];

// ============================================================================
// Component
// ============================================================================

export const ReviewSystem: React.FC<ReviewSystemProps> = ({
  showFilters = true,
  maxReviews,
  compact = false,
  includeSchema = false
}) => {
  const t = useTranslations();
  const [reviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterSize, setFilterSize] = useState<string | null>(null);

  const totalReviews = reviews.length;

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews];

    // Apply rating filter
    if (filterRating) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    // Apply size filter
    if (filterSize) {
      filtered = filtered.filter(review => review.productSize === filterSize);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    // Apply max reviews limit
    if (maxReviews) {
      filtered = filtered.slice(0, maxReviews);
    }

    setFilteredReviews(filtered);
  }, [reviews, sortBy, filterRating, filterSize, maxReviews]);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${STAR_SIZE_CLASSES[size]} ${star <= rating
              ? 'text-yellow-400 text-yellow-300 fill-current'
              : 'text-gray-300 text-gray-600'
              }`}
          />
        ))}
      </div>
    );
  };

  // Reviews are intentionally not rendered until backed by a real review system.
  // `includeSchema` is ignored to avoid emitting Review/AggregateRating schema.
  void includeSchema;

  if (totalReviews === 0) {
    return (
      <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] border-gray-700">
        <h3 className="font-heading text-xl font-bold text-gray-900 text-gray-100 mb-2">
          {t('reviewSystem.customerReviews')}
        </h3>
        <p className="text-gray-600 text-gray-300 text-sm">
          {t('reviewSystem.comingSoon')}
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <>
        <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl font-bold text-gray-900 text-gray-100">
              {t('reviewSystem.customerReviews')}
            </h3>
          </div>

          <p className="text-gray-600 text-gray-300 text-sm">
            {t('reviewSystem.comingSoon')}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100 border-gray-700">
            <Button
              variant="outline"
              className="w-full border-[#5B2EFF] text-[#5B2EFF] text-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white hover:text-gray-100"
            >
              {t('reviewSystem.viewAllReviews')}
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Review Summary */}
        <div className="bg-white bg-gray-800 rounded-xl p-8 shadow-lg border border-[#E0EFC7] border-gray-700">
          <div>
            <h3 className="font-heading text-2xl font-bold text-gray-900 text-gray-100 mb-2">
              {t('reviewSystem.customerReviews') || "Customer Reviews"}
            </h3>
            <p className="text-gray-600 text-gray-300">
              {t('reviewSystem.comingSoon') || 'Customer reviews will appear here once our review system is live.'}
            </p>
          </div>


        </div>

        {/* Filters and Sorting */}
        {showFilters && (
          <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-4">
                {/* Rating Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500 text-gray-400" />
                  <select
                    value={filterRating || ''}
                    onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                    className="border border-gray-300 border-gray-600 rounded-lg px-3 py-2 text-sm bg-white bg-gray-700 text-gray-900 text-gray-100"
                  >
                    <option value="">{t('reviewSystem.filters.allRatings')}</option>
                    <option value="5">5 {t('reviewSystem.filters.stars')}</option>
                    <option value="4">4 {t('reviewSystem.filters.stars')}</option>
                    <option value="3">3 {t('reviewSystem.filters.stars')}</option>
                    <option value="2">2 {t('reviewSystem.filters.stars')}</option>
                    <option value="1">1 {t('reviewSystem.filters.star')}</option>
                  </select>
                </div>

                {/* Size Filter */}
                <select
                  value={filterSize || ''}
                  onChange={(e) => setFilterSize(e.target.value || null)}
                  className="border border-gray-300 border-gray-600 rounded-lg px-3 py-2 text-sm bg-white bg-gray-700 text-gray-900 text-gray-100"
                >
                  <option value="">{t('reviewSystem.filters.allSizes')}</option>
                  <option value="12g">{t('reviewSystem.filters.trial')}</option>
                  <option value="50g">{t('reviewSystem.filters.regular')}</option>
                  <option value="120g">{t('reviewSystem.filters.large')}</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-gray-500 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 border-gray-600 rounded-lg px-3 py-2 text-sm bg-white bg-gray-700 text-gray-900 text-gray-100"
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
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] border-gray-700">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#5B2EFF] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white text-gray-100" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 text-gray-100">
                        {review.userName}
                      </span>
                      {review.verified && (
                        <div className="flex items-center space-x-1 text-green-600 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs">{t('reviewSystem.review.verifiedPurchase')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating, 'sm')}
                      <span className="text-sm text-gray-500 text-gray-400">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500 text-gray-400">
                  <div>{t('reviewSystem.review.size')}: {review.productSize}</div>
                  <div>{review.catCount} {review.catCount > 1 ? (t('reviewSystem.review.cats')) : (t('reviewSystem.review.cat'))}</div>
                  <div>{t('reviewSystem.review.usingFor')} {review.usageDuration}</div>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-gray-100 mb-2">
                  {review.title}
                </h4>
                <p className="text-gray-600 text-gray-300 leading-relaxed">
                  {review.content}
                </p>
              </div>

              {/* Review Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 border-gray-700">
                <div className="flex items-center space-x-4">
                  <button
                    className="flex items-center space-x-1 text-gray-500 text-gray-400 hover:text-green-600 hover:text-green-400 transition-colors"
                    aria-label={`Mark review as helpful (${review.helpful} votes)`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{t('reviewSystem.review.helpful')} ({review.helpful})</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 text-gray-500 text-gray-400 hover:text-red-600 hover:text-red-400 transition-colors"
                    aria-label={`Mark review as not helpful (${review.notHelpful} votes)`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm">({review.notHelpful})</span>
                  </button>
                </div>

                {review.wouldRecommend && (
                  <div className="flex items-center space-x-1 text-green-600 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('reviewSystem.review.recommendsProduct')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredReviews.length < reviews.length && (
          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#5B2EFF] text-[#5B2EFF] text-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white hover:text-gray-100"
            >
              {t('reviewSystem.loadMoreReviews')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewSystem;
