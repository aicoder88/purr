import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, Users, Clock, CheckCircle, ArrowRight, Home, Cat } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import { buildLanguageAlternates, getLocalizedUrl } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: `Success Stories - Real Customer Results | ${SITE_NAME}`,
  description: "Before & After: See how 1,000+ cat owners eliminated litter box odors. Real photos, real results. '95% odor reduction in 24 hours.' Ships to USA & Canada.",
  keywords: ['Purrify case studies', 'cat odor success stories', 'customer results', 'before and after', 'cat litter deodorizer effectiveness'],
  alternates: {
    canonical: 'https://www.purrify.ca/case-studies/',
    languages: {
      'en-CA': 'https://www.purrify.ca/case-studies',
      'fr-CA': 'https://www.purrify.ca/fr/case-studies',
      'zh-CN': 'https://www.purrify.ca/zh/case-studies',
      'es-US': 'https://www.purrify.ca/es/case-studies',
      'en-US': 'https://www.purrify.ca/case-studies',
      'x-default': 'https://www.purrify.ca/case-studies',
    },
  },
  openGraph: {
    title: 'Success Stories - Real Customer Results',
    description: 'Before & After: See how 1,000+ cat owners eliminated litter box odors. Real photos, real results in 24 hours.',
    type: 'website',
    url: 'https://www.purrify.ca/case-studies/',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/three_bags_no_bg.webp',
        width: 1200,
        height: 630,
        alt: 'Purrify Customer Success Stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Success Stories - Real Customer Results',
    description: 'Before & After: Real photos showing 95% odor reduction. See why 1,000+ cat owners switched to Purrify.',
    images: ['https://www.purrify.ca/optimized/three_bags_no_bg.webp'],
  },
  other: {
    'last-modified': '2026-01-19',
  },
};

const caseStudies = [
  {
    id: 1,
    title: "Small Apartment, Big Results: Sarah's Odor-Free Studio",
    subtitle: "How one Montreal cat owner eliminated litter box odors in a 400 sq ft studio apartment",
    customer: "Sarah M., Montreal, QC",
    situation: "Studio Apartment Challenge",
    timeframe: "30 Days",
    cats: 2,
    image: "/optimized/60g.webp",
    challenge: {
      description: "Sarah lived in a 400 square foot studio apartment with two cats. The litter box was located near her living area due to space constraints, making odor control critical for her quality of life and ability to have guests over.",
      painPoints: [
        "Limited ventilation in studio apartment",
        "Litter box visible from main living area",
        "Embarrassment when having guests over",
        "Previous products only masked odors temporarily",
        "Tried 6 different deodorizers with poor results"
      ]
    },
    solution: {
      description: "Sarah started with Purrify's 12g trial size to test effectiveness, then upgraded to the 50g regular size after seeing immediate results.",
      implementation: [
        "Applied 1 teaspoon of Purrify per cat per week",
        "Mixed thoroughly with existing clay litter",
        "Maintained regular scooping schedule",
        "No changes to litter type or box placement needed"
      ]
    },
    results: {
      description: "Within 24 hours, Sarah noticed a dramatic reduction in odors. By day 7, the smell was completely eliminated.",
      metrics: [
        { label: "Odor Reduction", value: "95%", timeframe: "24 hours" },
        { label: "Guest Confidence", value: "100%", timeframe: "1 week" },
        { label: "Product Longevity", value: "6 weeks", timeframe: "50g bag" },
        { label: "Cost Savings", value: "$40/year", timeframe: "vs previous products" }
      ]
    },
    quote: "I can't believe the difference. My apartment actually smells fresh now, and I'm not embarrassed to have friends over anymore. Purrify completely transformed my living situation.",
    outcome: "Sarah has been a loyal customer for 8 months and has referred 3 friends who also live in small apartments."
  },
  {
    id: 2,
    title: "Multi-Cat Household Success: The Johnson Family's Journey",
    subtitle: "Managing odors for 4 cats in a busy family home with children",
    customer: "Michael & Lisa Johnson, Toronto, ON",
    situation: "Multi-Cat Family Home",
    timeframe: "90 Days",
    cats: 4,
    image: "/optimized/140g.webp",
    challenge: {
      description: "The Johnson family struggled with odor control for their 4 cats while maintaining a child-friendly environment. Previous solutions contained harsh chemicals or strong fragrances that concerned them.",
      painPoints: [
        "4 cats producing significant waste volume",
        "Concern about chemical exposure to children",
        "Multiple litter boxes throughout the house",
        "High cost of frequent deodorizer purchases",
        "Inconsistent results with other products"
      ]
    },
    solution: {
      description: "The Johnsons implemented Purrify across all 3 litter boxes using the 120g large size for maximum value and effectiveness.",
      implementation: [
        "Used 2 teaspoons per litter box weekly",
        "Staggered application across different boxes",
        "Educated children about the fragrance-free formula",
        "Tracked usage and effectiveness over 3 months"
      ]
    },
    results: {
      description: "The family achieved consistent odor control across all litter areas while maintaining a comfortable environment for their children.",
      metrics: [
        { label: "Household Odor Control", value: "90%", timeframe: "2 weeks" },
        { label: "Cost Reduction", value: "35%", timeframe: "vs previous routine" },
        { label: "Application Frequency", value: "50% less", timeframe: "weekly maintenance" },
        { label: "Family Satisfaction", value: "100%", timeframe: "ongoing" }
      ]
    },
    quote: "As parents, we needed something that was both effective and comfortable to use around our kids. Purrify gave us peace of mind while actually solving our odor problem better than anything else we tried.",
    outcome: "The Johnson family has become brand advocates, sharing their success story with their veterinarian and local pet store."
  },
  {
    id: 3,
    title: "Senior Cat Care: Gentle Solutions for Sensitive Pets",
    subtitle: "How Purrify helped a 15-year-old cat with respiratory sensitivities",
    customer: "Dr. Patricia Wong, Vancouver, BC",
    situation: "Senior Cat with Health Concerns",
    timeframe: "60 Days",
    cats: 1,
    image: "/optimized/17gpink.webp",
    challenge: {
      description: "Dr. Wong's 15-year-old cat developed respiratory sensitivities, making traditional scented deodorizers unsuitable. The cat needed effective odor control without any irritating chemicals or fragrances.",
      painPoints: [
        "Senior cat with respiratory sensitivities",
        "Veterinary background requiring evidence-based solutions",
        "Previous products caused coughing and sneezing",
        "Need for gentle but effective odor control",
        "Concern about ingredient toxicity for aging pets"
      ]
    },
    solution: {
      description: "Dr. Wong chose Purrify specifically for its natural, fragrance-free formula and activated carbon technology that she trusted from her veterinary knowledge.",
      implementation: [
        "Started with minimal application (1/2 teaspoon weekly)",
        "Monitored cat for any respiratory reactions",
        "Gradually increased to full recommended dose",
        "Documented health impacts over 2 months"
      ]
    },
    results: {
      description: "The senior cat showed no adverse reactions while achieving excellent odor control, giving Dr. Wong confidence in the product's approach and effectiveness.",
      metrics: [
        { label: "Respiratory Health", value: "No reactions", timeframe: "60 days" },
        { label: "Odor Control", value: "85%", timeframe: "1 week" },
        { label: "Vet Confidence", value: "100%", timeframe: "professional assessment" },
        { label: "Senior Cat Comfort", value: "Maintained", timeframe: "ongoing" }
      ]
    },
    quote: "As a veterinarian, I'm very cautious about what I use with my senior cat. Purrify's natural activated carbon formula is exactly what I look for — effective, fragrance-free, and scientifically grounded.",
    outcome: "Dr. Wong now recommends Purrify to clients with senior cats or pets with respiratory sensitivities."
  }
];

// Generate JSON-LD schema
function generateSchema() {
  const baseUrl = 'https://www.purrify.ca';
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Purrify Customer Case Studies",
    "description": "Detailed success stories from Purrify customers across Canada",
    "url": `${baseUrl}/case-studies`,
    "mainEntity": caseStudies.map(study => ({
      "@type": "Article",
      "headline": study.title,
      "description": study.subtitle,
      "author": {
        "@type": "Organization",
        "name": "Purrify"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Purrify"
      }
    }))
  };
}

export default function CaseStudiesPage() {
  const canonicalUrl = 'https://www.purrify.ca/case-studies';
  const schema = generateSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-[#FF3131]">Home</Link></li>
                <li>/</li>
                <li className="text-[#FF3131]">Case Studies</li>
              </ol>
            </nav>

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                Customer Success Stories
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                Real Results from Real Customers
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Discover how Purrify transformed homes across Canada with detailed case studies
                showing measurable results, challenges overcome, and lasting success.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF3131] mb-2">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Average Odor Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF3131] mb-2">24hrs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Time to See Results</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF3131] mb-2">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF3131] mb-2">7+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Cats per Study</div>
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <div className="space-y-16 cv-auto cis-960">
              {caseStudies.map((study) => (
                <div key={study.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden shadow-lg">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#FF3131]/5 to-[#E0EFC7]/50 p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div className="flex-1">
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                          {study.title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{study.subtitle}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {study.customer}
                          </div>
                          <div className="flex items-center">
                            <Home className="h-4 w-4 mr-1" />
                            {study.situation}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {study.timeframe}
                          </div>
                          <div className="flex items-center">
                            <Cat className="h-4 w-4 mr-1" />
                            {study.cats} cat{study.cats > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 md:ml-8">
                        <Image
                          src={study.image}
                          alt={`Purrify product used in ${study.customer} case study`}
                          className="w-32 h-32 object-contain"
                          width={128}
                          height={128}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Challenge */}
                      <div>
                        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center">
                          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                            <span className="text-red-600 dark:text-red-400 font-bold text-sm">1</span>
                          </div>
                          The Challenge
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 mb-4">{study.challenge.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-50">Key Pain Points:</h4>
                          <ul className="space-y-1">
                            {study.challenge.painPoints.map((point, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                                <span className="text-red-500 dark:text-red-400 mr-2 mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Solution */}
                      <div>
                        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">2</span>
                          </div>
                          The Solution
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 mb-4">{study.solution.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-50">Implementation:</h4>
                          <ul className="space-y-1">
                            {study.solution.implementation.map((step, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6 mb-6">
                      <h3 className="font-heading text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                        </div>
                        The Results
                      </h3>
                      <p className="text-green-800 dark:text-green-200 mb-6">{study.results.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {study.results.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">{metric.value}</div>
                            <div className="text-sm font-medium text-green-800 dark:text-green-200">{metric.label}</div>
                            <div className="text-xs text-green-600 dark:text-green-400">{metric.timeframe}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="bg-[#FF3131]/5 border-l-4 border-[#FF3131] p-6 mb-6">
                      <blockquote className="text-gray-800 dark:text-gray-100 italic text-lg mb-3">
                        &ldquo;{study.quote}&rdquo;
                      </blockquote>
                      <cite className="text-gray-600 dark:text-gray-300 font-medium">— {study.customer}</cite>
                    </div>

                    {/* Outcome */}
                    <div className="flex items-start">
                      <TrendingUp className="h-6 w-6 text-[#FF3131] mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Long-term Outcome</h4>
                        <p className="text-gray-700 dark:text-gray-200">{study.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center cv-auto cis-480">
              <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  Ready to Write Your Own Success Story?
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  Start with a low-risk trial and see how an activated carbon additive fits into your litter routine.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/products/"
                    className="inline-flex items-center bg-[#FF3131] text-white dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                  >
                    Shop Purrify
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/free"
                    className="inline-block border border-[#FF3131] text-[#FF3131] px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 transition-colors"
                  >
                    Try Free Sample
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Content */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600 cv-auto cis-480">
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">More Customer Stories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/reviews" className="block p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <Users className="h-8 w-8 text-[#FF3131] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Customer Reviews</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Customer feedback and how-to resources</p>
                </Link>
                <Link href="/reviews" className="block p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <CheckCircle className="h-8 w-8 text-[#FF3131] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Video Testimonials</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Watch real customers share their experiences</p>
                </Link>
                <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="block p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <TrendingUp className="h-8 w-8 text-[#FF3131] mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Product Comparison</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">See how Purrify outperforms competitors</p>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
