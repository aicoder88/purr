import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { SITE_NAME } from '../src/lib/constants';
import Link from 'next/link';
import { Star, Quote, CheckCircle, Users, Calendar, MapPin, Home, ChevronRight } from 'lucide-react';
import { useTranslation } from '../src/lib/translation-context';
import { generateJSONLD } from '../src/lib/seo-utils';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';

export default function Reviews() {
  const { t, locale } = useTranslation();
  const reviewsPage = t.reviewsPage!; // Non-null assertion - all translations have this
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Montreal, QC",
      rating: 5,
      date: "January 2024",
      title: "Game changer for my apartment!",
      review: "I live in a small studio apartment with two cats, and the litter box smell was becoming unbearable. Purrify completely eliminated the odor within 24 hours. I was skeptical about the price at first, but it lasts so much longer than other products I've tried. Worth every penny!",
      verified: true,
      productUsed: "50g Regular Size",
      catsOwned: 2,
      useCase: "Small apartment odor control"
    },
    {
      id: 2,
      name: "Michael R.",
      location: "Toronto, ON",
      rating: 5,
      date: "February 2024",
      title: "Finally found something that works",
      review: "After trying Arm & Hammer, Fresh Step, and countless other deodorizers, Purrify is the only one that actually eliminates odors instead of just masking them. My guests can't even tell I have cats anymore. The activated carbon technology really works.",
      verified: true,
      productUsed: "120g Large Size",
      catsOwned: 3,
      useCase: "Multi-cat household"
    },
    {
      id: 3,
      name: "Jennifer L.",
      location: "Vancouver, BC",
      rating: 5,
      date: "March 2024",
      title: "Worked well for my sensitive kitten",
      review: "My 4-month-old kitten has respiratory sensitivities, so I was cautious about additives. Purrify is fragrance-free — no issues noticed after a gradual intro. Gentle approach and very effective.",
      verified: true,
      productUsed: "12g Trial Size",
      catsOwned: 1,
      useCase: "Use with kittens"
    },
    {
      id: 4,
      name: "David K.",
      location: "Calgary, AB",
      rating: 5,
      date: "December 2023",
      title: "Better value than I expected",
      review: "Initially thought it was expensive, but when I calculated cost per day, it's actually cheaper than buying Arm & Hammer every week. One 50g bag lasts me almost 2 months with one cat. The convenience alone is worth it.",
      verified: true,
      productUsed: "50g Regular Size",
      catsOwned: 1,
      useCase: "Cost-effective solution"
    },
    {
      id: 5,
      name: "Lisa T.",
      location: "Ottawa, ON",
      rating: 5,
      date: "January 2024",
      title: "Simple and effective",
      review: "Made from coconut-shell activated carbon and completely fragrance-free. Works really well and I like how straightforward it is. My cats didn’t mind the change at all.",
      verified: true,
      productUsed: "50g Regular Size",
      catsOwned: 2,
      useCase: "Fragrance-free choice"
    },
    {
      id: 6,
      name: "Robert H.",
      location: "Halifax, NS",
      rating: 5,
      date: "February 2024",
      title: "Veterinarian recommended",
      review: "My vet actually recommended Purrify when I mentioned litter box odors. She said activated carbon is well-established and most effective option for cats - the same type used in water filters. Been using it for 3 months now and couldn't be happier with the results.",
      verified: true,
      productUsed: "120g Large Size",
      catsOwned: 2,
      useCase: "Veterinarian recommended"
    }
  ];

  const stats = [
    { label: reviewsPage.stats.averageRating, value: "4.9/5", icon: Star },
    { label: reviewsPage.stats.verifiedReviews, value: "138", icon: CheckCircle },
    { label: reviewsPage.stats.happyCustomers, value: "1,000+", icon: Users },
    { label: reviewsPage.stats.monthsInMarket, value: "18", icon: Calendar }
  ];

  const pageTitle = `${reviewsPage.pageTitle} | ${SITE_NAME}`;
  const pageDescription = reviewsPage.metaDescription;

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/reviews',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'purrify reviews',
    schemaType: 'product',
    schemaData: {
      name: 'Purrify Cat Litter Deodorizer',
      description: 'Activated carbon cat litter additive that eliminates odors naturally',
      brand: 'Purrify',
      price: '4.76',
      priceCurrency: 'CAD',
      availability: 'InStock',
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 138,
        bestRating: 5,
        worstRating: 1,
      },
      reviews: reviews.slice(0, 3).map(review => ({
        author: review.name,
        reviewBody: review.review,
        reviewRating: review.rating,
        datePublished: review.date,
      })),
    },
    keywords: [
      'purrify reviews',
      'cat litter deodorizer reviews',
      'customer testimonials',
      'verified reviews',
      'cat odor eliminator reviews',
    ],
    includeBreadcrumb: true,
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Auto-generated Product Schema with Breadcrumb */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJSONLD(schema) }}
        />
      )}

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href={locale === 'fr' ? '/fr' : '/'}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                {reviewsPage.badge}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                {reviewsPage.heading}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                {reviewsPage.description}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF3131]/10 rounded-full mb-3">
                        <IconComponent className="h-6 w-6 text-[#FF3131]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 cv-auto cis-960">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-[#FF3131]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#FF3131] font-semibold text-sm">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-50">{review.name}</div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          {review.location}
                        </div>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {reviewsPage.reviewCard.verified}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{review.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-gray-50 mb-3">{review.title}</h3>

                  {/* Review */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-[#FF3131]/20" />
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed pl-4">
                      {review.review}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    <div><strong>{reviewsPage.reviewCard.product}:</strong> {review.productUsed}</div>
                    <div><strong>{reviewsPage.reviewCard.cats}:</strong> {review.catsOwned}</div>
                    <div><strong>{reviewsPage.reviewCard.useCase}:</strong> {review.useCase}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-8 mb-16 cv-auto cis-480">
              <div className="text-center">
                <h2 className="font-heading text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">{reviewsPage.trustSection.heading}</h2>
                <div className="grid md:grid-cols-3 gap-6 text-blue-800 dark:text-blue-200">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">{reviewsPage.trustSection.verifiedTitle}</h3>
                    <p className="text-sm">{reviewsPage.trustSection.verifiedDesc}</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">{reviewsPage.trustSection.ratingTitle}</h3>
                    <p className="text-sm">{reviewsPage.trustSection.ratingDesc}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">{reviewsPage.trustSection.customersTitle}</h3>
                    <p className="text-sm">{reviewsPage.trustSection.customersDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center cv-auto cis-480">
              <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  {reviewsPage.ctaSection.heading}
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  {reviewsPage.ctaSection.description}
                </p>
                <div className="space-x-4">
                <Link
                    href="/products"
                    className="inline-block bg-[#FF3131] text-white dark:text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                  >
                    {reviewsPage.ctaSection.shopNow}
                  </Link>
                  <Link
                    href="/free"
                    className="inline-block border border-[#FF3131] text-[#FF3131] px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 transition-colors"
                  >
                    {reviewsPage.ctaSection.tryFreeSample}
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600 cv-auto cis-480">
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">{reviewsPage.relatedLinks.heading}</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{reviewsPage.relatedLinks.comparison}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{reviewsPage.relatedLinks.comparisonDesc}</p>
                </Link>
                <Link href="/case-studies" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{reviewsPage.relatedLinks.caseStudies}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{reviewsPage.relatedLinks.caseStudiesDesc}</p>
                </Link>
                <Link href="/blog/using-deodorizers-with-kittens" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{reviewsPage.relatedLinks.usageInfo}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{reviewsPage.relatedLinks.usageInfoDesc}</p>
                </Link>
                <Link href="/locations/montreal" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{reviewsPage.relatedLinks.storeLocations}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{reviewsPage.relatedLinks.storeLocationsDesc}</p>
                </Link>
              </div>
            </div>
          </div>
        </Container>
        </section>
      </main>
    </>
  );
}
