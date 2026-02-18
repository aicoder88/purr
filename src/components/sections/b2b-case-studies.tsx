'use client';

import { Container } from '@/components/ui/container';
import { useTranslation } from '@/lib/translation-context';
import { Sparkles, Building2, Shield, Clock, Leaf, DollarSign, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export interface B2BPartnerBenefit {
  id: string;
  businessType: 'veterinarian' | 'catCafe' | 'shelter' | 'groomer' | 'hospitality';
  challenge: string;
  benefits: string[];
  idealFor: string;
  testimonialIndex?: number; // Index in TESTIMONIALS array for real customer quote
}

// B2B Partner Benefits by Business Type
export const b2bPartnerBenefits: B2BPartnerBenefit[] = [
  {
    id: 'veterinarian',
    businessType: 'veterinarian',
    challenge: 'Veterinary clinics need fragrance-free odor control that won\'t irritate cats with respiratory sensitivities during boarding stays.',
    benefits: [
      'Fragrance-free formula safe for sensitive patients',
      'Reduces ammonia exposure for staff and animals',
      'Simple application fits into existing cleaning routines',
      'Wholesale pricing for clinics',
    ],
    idealFor: 'Clinics with boarding facilities, cat-only practices, and animal hospitals',
    testimonialIndex: 7, // Dr. Amara Chen, veterinarian
  },
  {
    id: 'catCafe',
    businessType: 'catCafe',
    challenge: 'Cat cafes must maintain fresh air quality while serving food and beverages alongside resident cats throughout the day.',
    benefits: [
      'Keeps cafe environment fresh for guests',
      'No competing fragrances near food service areas',
      'Quick application between service periods',
      'Helps maintain positive guest reviews',
    ],
    idealFor: 'Cat cafes, cat lounges, and cat-themed restaurants',
    testimonialIndex: 3, // François B. - about keeping spaces fresh
  },
  {
    id: 'shelter',
    businessType: 'shelter',
    challenge: 'Shelters need budget-friendly odor control that creates a welcoming adoption environment for visitors.',
    benefits: [
      'Volume discounts for nonprofits',
      'Creates inviting first impressions for adopters',
      'Natural ingredients safe for kittens',
      'Extends litter life to reduce costs',
    ],
    idealFor: 'Animal shelters, rescue organizations, and foster networks',
    testimonialIndex: 11, // Noor A. - three cats
  },
];

interface B2BPartnerBenefitsProps {
  /** Filter by business type to show relevant benefits */
  businessType?: B2BPartnerBenefit['businessType'];
  /** Maximum number of cards to show */
  limit?: number;
  /** Title override */
  title?: string;
  /** Subtitle override */
  subtitle?: string;
}

const businessTypeLabels: Record<string, string> = {
  veterinarian: 'Veterinary Clinics',
  catCafe: 'Cat Cafes',
  shelter: 'Animal Shelters',
  groomer: 'Grooming Salons',
  hospitality: 'Pet-Friendly Rentals',
};

const businessTypeIcons: Record<string, React.ReactNode> = {
  veterinarian: <Shield className="w-6 h-6" />,
  catCafe: <Sparkles className="w-6 h-6" />,
  shelter: <Building2 className="w-6 h-6" />,
  groomer: <Leaf className="w-6 h-6" />,
  hospitality: <Clock className="w-6 h-6" />,
};

export function B2BCaseStudies({
  businessType,
  limit = 3,
  title,
  subtitle,
}: B2BPartnerBenefitsProps) {
  const { t, locale } = useTranslation();
  const challengeLabel =
    locale === 'fr'
      ? 'Le defi'
      : 'The Challenge';
  const helpsLabel =
    locale === 'fr'
      ? 'Comment Purrify aide'
      : 'How Purrify Helps';

  // Filter and limit benefits
  const filteredBenefits = businessType
    ? b2bPartnerBenefits.filter((benefit) => benefit.businessType === businessType)
    : b2bPartnerBenefits;
  const displayBenefits = filteredBenefits.slice(0, limit);

  // If filtering by type and no matches, show all
  const benefitsToShow = displayBenefits.length > 0 ? displayBenefits : b2bPartnerBenefits.slice(0, limit);

  const sectionTitle = title || t.b2bCaseStudies?.title || 'Partner Benefits by Business Type';
  const sectionSubtitle = subtitle || t.b2bCaseStudies?.subtitle || 'See how Purrify helps businesses like yours';

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 dark:from-[#10B981]/20 dark:to-[#3694FF]/20 text-brand-green-700 dark:text-[#34D399] font-bold text-sm mb-4">
              <DollarSign className="w-4 h-4 mr-2" />
              {t.b2bCaseStudies?.badge || 'Wholesale Program'}
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-50 mb-4">
              {sectionTitle}
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefitsToShow.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 dark:from-[#10B981]/20 dark:to-[#3694FF]/20 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#10B981] to-[#3694FF] flex items-center justify-center text-white dark:text-gray-100">
                      {businessTypeIcons[benefit.businessType]}
                    </div>
                    <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">
                      {businessTypeLabels[benefit.businessType]}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.idealFor}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Challenge */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      {challengeLabel}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {benefit.challenge}
                    </p>
                  </div>

                  {/* Benefits List */}
                  <div>
                    <h4 className="text-sm font-bold text-brand-green-700 dark:text-[#34D399] uppercase tracking-wide mb-3">
                      {helpsLabel}
                    </h4>
                    <ul className="space-y-2">
                      {benefit.benefits.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-brand-green-700 dark:text-[#34D399] mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real Customer Testimonial */}
                  {benefit.testimonialIndex !== undefined && TESTIMONIALS[benefit.testimonialIndex] && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-start gap-3">
                        <Quote className="w-5 h-5 text-[#3694FF] dark:text-[#60A5FA] flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">
                            “{TESTIMONIALS[benefit.testimonialIndex].text}”
                          </p>
                          <p className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                            — {TESTIMONIALS[benefit.testimonialIndex].name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.b2bCaseStudies?.cta || 'Interested in wholesale pricing for your business?'}
            </p>
            <a
              href="mailto:wholesale@purrify.ca"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#3694FF] hover:from-[#059669] hover:to-[#2563EB] text-white dark:text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.b2bCaseStudies?.ctaButton || 'Contact Our Partnership Team'}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default B2BCaseStudies;
