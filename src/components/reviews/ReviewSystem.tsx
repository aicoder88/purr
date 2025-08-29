import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, User, Calendar, CheckCircle, Filter, SortAsc } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { useTranslation } from '../../lib/translation-context';

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
  productSize: '17g' | '60g' | '120g';
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
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Life-changing for my multi-cat household!',
    content: 'I have 3 cats and the litter box smell was becoming unbearable. Purrify completely eliminated the odor within hours. I can\'t believe how well this works! My guests don\'t even know I have cats anymore.',
    date: '2024-01-15',
    verified: true,
    helpful: 24,
    notHelpful: 1,
    productSize: '120g',
    catCount: 3,
    usageDuration: '6 months',
    wouldRecommend: true
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Mike R.',
    rating: 5,
    title: 'Skeptical at first, now a believer',
    content: 'I was doubtful about activated carbon making such a difference, but wow! The science really works. My apartment stays fresh all week instead of needing daily litter changes.',
    date: '2024-01-12',
    verified: true,
    helpful: 18,
    notHelpful: 0,
    productSize: '60g',
    catCount: 1,
    usageDuration: '3 months',
    wouldRecommend: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Jennifer L.',
    rating: 4,
    title: 'Great product, wish I found it sooner',
    content: 'Works exactly as advertised. The trial size convinced me to buy the large size. Only wish is that it came in even larger quantities for bulk savings.',
    date: '2024-01-10',
    verified: true,
    helpful: 15,
    notHelpful: 2,
    productSize: '17g',
    catCount: 2,
    usageDuration: '2 months',
    wouldRecommend: true
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'David K.',
    rating: 5,
    title: 'Perfect for automatic litter boxes',
    content: 'I use this with my Litter-Robot and it\'s a perfect combination. The activated carbon doesn\'t interfere with the mechanism and keeps everything odor-free.',
    date: '2024-01-08',
    verified: true,
    helpful: 12,
    notHelpful: 0,
    productSize: '120g',
    catCount: 2,
    usageDuration: '4 months',
    wouldRecommend: true
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Amanda T.',
    rating: 4,
    title: 'Good value for money',
    content: 'Makes my litter last much longer, so it pays for itself. The 120g size is definitely the best value. Easy to use and effective.',
    date: '2024-01-05',
    verified: true,
    helpful: 9,
    notHelpful: 1,
    productSize: '120g',
    catCount: 1,
    usageDuration: '5 months',
    wouldRecommend: true
  },
  {
    id: '6',
    userId: 'user6',
    userName: 'Robert H.',
    rating: 5,
    title: 'Veterinarian approved!',
    content: 'As a vet, I\'m always cautious about new products. Purrify is safe, effective, and I now recommend it to all my clients with odor concerns.',
    date: '2024-01-03',
    verified: true,
    helpful: 31,
    notHelpful: 0,
    productSize: '60g',
    catCount: 2,
    usageDuration: '8 months',
    wouldRecommend: true
  }
];

export const ReviewSystem: React.FC<ReviewSystemProps> = ({ 
  showFilters = true, 
  maxReviews, 
  compact = false 
}) => {
  const [reviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterSize, setFilterSize] = useState<string | null>(null);

  // Calculate review statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

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
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'text-yellow-400 dark:text-yellow-300 dark:text-yellow-400 fill-current' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-2">
            {renderStars(averageRating)}
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ({totalReviews} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating, 'sm')}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {review.userName}
                  </span>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(review.date)}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {review.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {review.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button 
            variant="outline" 
            className="w-full border-[#5B2EFF] text-[#5B2EFF] dark:text-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white dark:hover:text-gray-100"
          >
            View All Reviews
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
              <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                {averageRating.toFixed(1)}
              </span>
              <div>
                {renderStars(averageRating, 'lg')}
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{Math.round((reviews.filter(r => r.wouldRecommend).length / totalReviews) * 100)}% would recommend</span>
              <span>•</span>
              <span>{reviews.filter(r => r.verified).length} verified purchases</span>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Filters and Sorting */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Rating Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <select
                  value={filterRating || ''}
                  onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Size Filter */}
              <select
                value={filterSize || ''}
                onChange={(e) => setFilterSize(e.target.value || null)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Sizes</option>
                <option value="17g">17g Trial</option>
                <option value="60g">60g Regular</option>
                <option value="120g">120g Large</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#5B2EFF] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white dark:text-gray-100" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {review.userName}
                    </span>
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(review.rating, 'sm')}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                <div>Size: {review.productSize}</div>
                <div>{review.catCount} cat{review.catCount > 1 ? 's' : ''}</div>
                <div>Using for {review.usageDuration}</div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {review.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {review.content}
              </p>
            </div>

            {/* Review Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">({review.notHelpful})</span>
                </button>
              </div>
              
              {review.wouldRecommend && (
                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Recommends this product</span>
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
            className="border-[#5B2EFF] text-[#5B2EFF] dark:text-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white dark:hover:text-gray-100"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewSystem;
