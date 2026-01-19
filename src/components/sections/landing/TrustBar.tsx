'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useTranslation } from '../../../lib/translation-context';

interface TrustBarProps {
  customerCount: string;
  rating: number;
  reviewCount: number;
  badges?: Array<{ src: string; alt: string }>;
}

export function TrustBar({
  customerCount,
  rating,
  reviewCount,
  badges = [],
}: TrustBarProps) {
  const { t } = useTranslation();
  // Generate filled/empty stars based on rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-4 border-y border-gray-200 dark:border-gray-700">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex" aria-label={`${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < fullStars
                      ? 'text-yellow-400 fill-yellow-400'
                      : i === fullStars && hasHalfStar
                      ? 'text-yellow-400 fill-yellow-400/50'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {rating}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ({reviewCount.toLocaleString()} {t.trustBar?.reviews || ""})
            </span>
          </div>

          {/* Divider */}
          <span className="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-600" />

          {/* Customer Count */}
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {customerCount}
            </span>
            <span>{t.trustBar?.happyCats || ""}</span>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <>
              <span className="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-4">
                {badges.map((badge, index) => (
                  <Image
                    key={index}
                    src={badge.src}
                    alt={badge.alt}
                    width={80}
                    height={32}
                    className="h-6 w-auto opacity-70 dark:opacity-60 dark:invert"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
