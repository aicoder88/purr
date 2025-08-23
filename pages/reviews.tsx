import Head from 'next/head';
import { Container } from '../src/components/ui/container';
import { SITE_NAME } from '../src/lib/constants';
import Link from 'next/link';
import { Star, Quote, CheckCircle, Users, Calendar, MapPin } from 'lucide-react';

export default function Reviews() {
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
      productUsed: "60g Regular Size",
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
      title: "Safe for my sensitive kitten",
      review: "My 4-month-old kitten has respiratory sensitivities, so I was worried about using any additives. Purrify is completely fragrance-free and natural - no reactions at all. It's gentle but incredibly effective. I wish I had found this sooner!",
      verified: true,
      productUsed: "17g Trial Size",
      catsOwned: 1,
      useCase: "Kitten safety"
    },
    {
      id: 4,
      name: "David K.",
      location: "Calgary, AB",
      rating: 5,
      date: "December 2023",
      title: "Better value than I expected",
      review: "Initially thought it was expensive, but when I calculated cost per day, it's actually cheaper than buying Arm & Hammer every week. One 60g bag lasts me almost 2 months with one cat. The convenience alone is worth it.",
      verified: true,
      productUsed: "60g Regular Size",
      catsOwned: 1,
      useCase: "Cost-effective solution"
    },
    {
      id: 5,
      name: "Lisa T.",
      location: "Ottawa, ON",
      rating: 5,
      date: "January 2024",
      title: "Eco-friendly and effective",
      review: "Love that it's made from coconut shells and completely natural. As someone who tries to buy sustainable products, Purrify checks all the boxes - effective, eco-friendly, and Canadian-made. My cats don't mind the change at all.",
      verified: true,
      productUsed: "60g Regular Size",
      catsOwned: 2,
      useCase: "Eco-conscious choice"
    },
    {
      id: 6,
      name: "Robert H.",
      location: "Halifax, NS",
      rating: 5,
      date: "February 2024",
      title: "Veterinarian recommended",
      review: "My vet actually recommended Purrify when I mentioned litter box odors. She said activated carbon is the safest and most effective option for cats. Been using it for 3 months now and couldn't be happier with the results.",
      verified: true,
      productUsed: "120g Large Size",
      catsOwned: 2,
      useCase: "Veterinarian recommended"
    }
  ];

  const stats = [
    { label: "Average Rating", value: "4.9/5", icon: Star },
    { label: "Verified Reviews", value: "500+", icon: CheckCircle },
    { label: "Happy Customers", value: "2,000+", icon: Users },
    { label: "Months in Market", value: "18", icon: Calendar }
  ];

  return (
    <>
      <Head>
        <title>Purrify Reviews - Real Customer Testimonials & Success Stories | {SITE_NAME}</title>
        <meta name="description" content="Read verified customer reviews of Purrify cat litter deodorizer. Real testimonials from Canadian cat owners who eliminated litter box odors naturally." />
        <meta name="keywords" content="Purrify reviews, cat litter deodorizer reviews, customer testimonials, verified reviews, cat odor eliminator reviews" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Purrify Reviews - Real Customer Testimonials & Success Stories" />
        <meta property="og:description" content="Read verified customer reviews from Canadian cat owners who eliminated litter box odors with Purrify's natural activated carbon formula." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.ca/reviews" />
        <meta property="og:image" content="https://purrify.ca/optimized/three_bags_no_bg.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Purrify Reviews - Real Customer Success Stories" />
        <meta name="twitter:description" content="See why 2,000+ Canadian cat owners choose Purrify for natural odor elimination." />
        <meta name="twitter:image" content="https://purrify.ca/optimized/three_bags_no_bg.webp" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://purrify.ca/reviews" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Purrify Cat Litter Deodorizer",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": reviews.slice(0, 3).map(review => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": review.name
              },
              "reviewBody": review.review,
              "datePublished": review.date
            }))
          })}
        </script>
      </Head>

      <div className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-[#FF3131]">Home</Link></li>
                <li>/</li>
                <li className="text-[#FF3131]">Reviews</li>
              </ol>
            </nav>

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                Customer Reviews
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                Real Stories from Happy Cat Owners
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                See why thousands of Canadian cat owners trust Purrify to eliminate litter box odors naturally. 
                Read verified reviews from real customers across Canada.
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">{review.title}</h3>

                  {/* Review */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-[#FF3131]/20" />
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed pl-4">
                      {review.review}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    <div><strong>Product:</strong> {review.productUsed}</div>
                    <div><strong>Cats:</strong> {review.catsOwned}</div>
                    <div><strong>Use Case:</strong> {review.useCase}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-16">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Customers Trust Purrify</h2>
                <div className="grid md:grid-cols-3 gap-6 text-blue-800">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Verified Reviews</h3>
                    <p className="text-sm">All reviews are from verified purchasers who have used Purrify products.</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">4.9/5 Rating</h3>
                    <p className="text-sm">Consistently high ratings across all product sizes and customer types.</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">2,000+ Customers</h3>
                    <p className="text-sm">Growing community of satisfied cat owners across Canada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  Join Thousands of Happy Cat Owners
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  Experience the same results as our verified customers. Try Purrify risk-free 
                  and see why it's Canada's most trusted natural cat litter deodorizer.
                </p>
                <div className="space-x-4">
                  <Link 
                    href="/products" 
                    className="inline-block bg-[#FF3131] text-white dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                  >
                    Shop Now
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

            {/* Related Links */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">Learn More About Purrify</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/blog/activated-carbon-vs-baking-soda-additives" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Product Comparison</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">See how Purrify compares</p>
                </Link>
                <Link href="/customers/case-studies" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Case Studies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Detailed success stories</p>
                </Link>
                <Link href="/blog/safe-for-kittens" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Safety Information</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Safe for cats and kittens</p>
                </Link>
                <Link href="/montreal" className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow text-center">
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Store Locations</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Find Purrify near you</p>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
