"use client";

import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Star, Quote, CheckCircle, Users, Calendar, MapPin, Home, ChevronRight } from 'lucide-react';
import { getPaymentLink } from '@/lib/payment-links';

// Metadata is defined in page.tsx (Server Component)

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
    review: "Made from coconut-shell activated carbon and completely fragrance-free. Works really well and I like how straightforward it is. My cats didn't mind the change at all.",
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
  { label: 'Average Rating', value: "4.9/5", icon: Star },
  { label: 'Verified Reviews', value: "138", icon: CheckCircle },
  { label: 'Happy Customers', value: "1,000+", icon: Users },
  { label: 'Months in Market', value: "18", icon: Calendar }
];

export default function Reviews() {
  const locale = 'en';
  
  // Schema for structured data - Fixed to meet Google Rich Results requirements
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Purrify Cat Litter Deodorizer",
    "description": "Activated carbon cat litter additive that eliminates odors naturally",
    "image": [
      "https://www.purrify.ca/optimized/60g-transparent.webp",
      "https://www.purrify.ca/optimized/120g-transparent.webp",
      "https://www.purrify.ca/images/Logos/purrify-logo.png"
    ],
    "brand": {
      "@type": "Brand",
      "name": "Purrify"
    },
    "offers": {
      "@type": "Offer",
      "price": "4.76",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.purrify.ca",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "review": reviews.slice(0, 3).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewBody": review.review,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "datePublished": new Date(review.date).toISOString(),
      "itemReviewed": {
        "@type": "Product",
        "name": "Purrify Cat Litter Deodorizer"
      }
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.purrify.ca"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Reviews",
        "item": "https://www.purrify.ca/reviews"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <span className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Reviews
                </span>
              </span>
            </nav>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                Customer Reviews
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                What Our Customers Are Saying
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Real reviews from real cat owners who have transformed their homes with Purrify.
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
                        Verified
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
                    <div><strong>Product:</strong> {review.productUsed}</div>
                    <div><strong>Cats:</strong> {review.catsOwned}</div>
                    <div><strong>Use Case:</strong> {review.useCase}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-8 mb-16 cv-auto cis-480">
              <div className="text-center">
                <h2 className="font-heading text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Why Trust Our Reviews?</h2>
                <div className="grid md:grid-cols-3 gap-6 text-blue-800 dark:text-blue-200">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">Verified Purchases</h3>
                    <p className="text-sm">All reviews are from verified customers</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">Honest Ratings</h3>
                    <p className="text-sm">We never filter or edit negative reviews</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">Real Customers</h3>
                    <p className="text-sm">Reviews from cat owners across Canada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center cv-auto cis-480">
              <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  Ready to Experience the Difference?
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  Join thousands of satisfied cat owners who have eliminated litter box odors for good.
                </p>
                <div className="space-x-4">
                <Link
                    href="/products"
                    className="inline-block bg-[#FF3131] text-white dark:text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                  >
                    Shop Now
                  </Link>
                  <a
                    href={getPaymentLink('trialSingle') || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#FF3131] text-[#FF3131] px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 transition-colors"
                  >
                    Try Free Sample
                  </a>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600 cv-auto cis-480">
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">Learn More</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Comparison Guide</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">See how Purrify compares to alternatives</p>
                </Link>
                <Link href="/case-studies" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Case Studies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Real results from real customers</p>
                </Link>
                <Link href="/blog/using-deodorizers-with-kittens" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Usage Tips</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">How to use with kittens and cats</p>
                </Link>
                <Link href="/locations/montreal" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Store Locations</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Find a retailer near you</p>
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
