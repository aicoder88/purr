import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { MouseEvent } from 'react';
import { ArrowLeft, Star, Quote, Heart, Users, ChevronRight } from 'lucide-react';

import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { SITE_NAME } from '../../src/lib/constants';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { formatProductPrice } from '../../src/lib/pricing';

export default function TestimonialsPage() {
  const { t, locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const handleCategoryButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { categoryId } = event.currentTarget.dataset;
    if (!categoryId) return;
    setSelectedCategory(categoryId);
  }, []);
  
  const pageTitle = `Customer Testimonials - ${SITE_NAME} Reviews & Success Stories`;
  const pageDescription = "Read real customer testimonials and success stories from cat owners who've experienced Purrify's odor elimination power. See why 1,000+ trust Purrify.";
  const canonicalPath = '/customers/testimonials';
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  const categories = [
    { id: 'all', name: 'All Reviews', count: 127 },
    { id: 'trial', name: 'Trial Users', count: 43 },
    { id: 'multiple-cats', name: 'Multiple Cats', count: 38 },
    { id: 'sensitive-cats', name: 'Sensitive Cats', count: 22 },
    { id: 'long-term', name: 'Long-term Users', count: 24 }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Fatima R.",
      location: "Côte-des-Neiges, QC",
      catNames: ["Ziggy"],
      rating: 5,
      category: ['trial'],
      date: "2024-01-15",
      title: "Trial size convinced me immediately!",
      text: "Started with the 12g trial for my kitten Ziggy. Worked so well I immediately ordered the 50g! No more embarrassing smells when friends come over.",
      verified: true,
      helpful: 28,
      productUsed: "12g Trial → 50g Regular"
    },
    {
      id: 2,
      name: "Priya S.",
      location: "Saint-Laurent, QC",
      catNames: ["Mochi", "Noodle"],
      rating: 5,
      category: ['multiple-cats'],
      date: "2023-11-08",
      title: "Game changer for two cats!",
      text: "My cats Mochi and Noodle used to make the whole basement smell terrible. Started using the 120g size for both of them - game changer! Guests don't even know we have cats now.",
      verified: true,
      helpful: 18,
      productUsed: "Standard Size"
    },
    {
      id: 3,
      name: "Jennifer Chen",
      location: "Calgary, AB",
      catNames: ["Mittens", "Boots", "Socks"],
      rating: 5,
      category: ['multiple-cats', 'long-term'],
      date: "2023-09-22",
      title: "Three cats, zero odors!",
      text: "With three indoor cats, our house was starting to smell no matter how often I cleaned the litter boxes. A friend recommended Purrify and I'm so grateful! I use it in all three boxes and the difference is night and day. Even my mother-in-law, who has the most sensitive nose, can't tell we have cats when she visits.",
      verified: true,
      helpful: 31,
      productUsed: "Bulk Size"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Montreal, QC",
      catNames: ["Ginger"],
      rating: 5,
      category: ['trial'],
      date: "2024-02-03",
      title: "Skeptic turned believer",
      text: "I'll be honest - I thought this was just another gimmick. But my wife insisted we try the trial size after reading reviews online. I'm eating my words now! The science actually works. You can literally smell the difference within the first day. We're customers for life now.",
      verified: true,
      helpful: 15,
      productUsed: "Trial Size"
    },
    {
      id: 5,
      name: "Lisa Park",
      location: "Ottawa, ON",
      catNames: ["Cleo"],
      rating: 5,
      category: ['sensitive-cats'],
      date: "2024-01-28",
      title: "No more embarrassing odors",
      text: "I work from home and was so embarrassed when clients would come over because of the litter box smell. Cleo is very sensitive to fragrances, so most products were out of the question. Purrify has been a game-changer - completely natural, no fragrances, and it actually works! I can have meetings at home again without worry.",
      verified: true,
      helpful: 27,
      productUsed: "Standard Size"
    },
    {
      id: 6,
      name: "Robert Kim",
      location: "Edmonton, AB",
      catNames: ["Max", "Ruby"],
      rating: 5,
      category: ['multiple-cats', 'long-term'],
      date: "2023-08-14",
      title: "Best investment for cat owners",
      text: "After 6 months of using Purrify, I can confidently say it's the best money I've spent on cat supplies. Two cats in a small apartment used to mean constant odor management. Now I just sprinkle Purrify when I change the litter and forget about odors completely. My apartment actually smells fresh again!",
      verified: true,
      helpful: 19,
      productUsed: "Standard Size"
    },
    {
      id: 7,
      name: "Amanda Foster",
      location: "Halifax, NS",
      catNames: ["Smokey"],
      rating: 5,
      category: ['trial', 'long-term'],
      date: "2023-12-10",
      title: "From trial to loyal customer",
      text: "Started with the trial size just to test it out. Smokey can be finicky about changes to his routine, but he didn't mind Purrify at all. The odor control was so impressive that I immediately ordered the bulk size. Eight months later, I'm still amazed at how well it works. Will never go back to regular litter alone.",
      verified: true,
      helpful: 22,
      productUsed: "Trial Size → Bulk Size"
    },
    {
      id: 8,
      name: "Carlos Mendez",
      location: "Winnipeg, MB",
      catNames: ["Luna", "Star"],
      rating: 5,
      category: ['multiple-cats'],
      date: "2024-01-05",
      title: "Finally found something that works",
      text: "I've tried everything - different litters, air purifiers, baking soda, you name it. Nothing worked for our two-cat household until Purrify. The activated carbon technology actually traps the odor molecules instead of just masking them. It's science that works! Our house finally smells like a home, not a litter box.",
      verified: true,
      helpful: 25,
      productUsed: "Standard Size"
    }
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category.includes(selectedCategory));

  const stats = [
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "127+", label: "Verified Reviews", icon: Users },
    { number: "98%", label: "Would Recommend", icon: Heart },
    { number: "24hrs", label: "Average Results Time", icon: Quote }
  ];

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'website',
          images: [
            {
              url: 'https://www.purrify.ca/customer-testimonials-hero.jpg',
              width: 1200,
              height: 630,
              alt: 'Happy Purrify Customers and Their Cats'
            }
          ]
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Customers
                </span>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Testimonials</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
                Real Stories, Real Results
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                Discover why 1,000+ cat owners trust Purrify to eliminate litter box odors. 
                Read authentic testimonials from customers who've experienced the difference.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white dark:text-gray-100" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white dark:bg-gray-800/50 dark:bg-gray-800/50">
          <Container>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  data-category-id={category.id}
                  onClick={handleCategoryButtonClick}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#FF3131] text-white dark:text-gray-100 shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#FF3131]/10 dark:hover:bg-[#FF5050]/10 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                        ))}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                        {testimonial.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.name} • {testimonial.location}
                      </p>
                    </div>
                    {testimonial.verified && (
                      <div className="bg-[#03E46A] text-white dark:text-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#FF3131]/20 dark:text-[#FF5050]/20" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Cat(s): {testimonial.catNames.join(', ')}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#5B2EFF] dark:text-[#3694FF] font-medium">
                        Used: {testimonial.productUsed}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {testimonial.helpful} found helpful
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white dark:bg-gray-800/50 dark:bg-gray-800/50">
          <Container>
            <div className="bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] rounded-3xl p-12 text-center text-white dark:text-gray-100">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Join Our Happy Customers?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Experience the same odor elimination results that our customers rave about
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-800 text-[#5B2EFF] hover:bg-gray-100 dark:bg-gray-700 font-bold">
                    {`Start with Trial Size - ${trialPrice} (shipping included)`}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white dark:text-gray-100 hover:bg-white dark:bg-gray-800 hover:text-gray-900 dark:text-gray-50 transition-colors">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Share Your Story */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Share Your Purrify Story
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Have you experienced great results with Purrify? We'd love to hear from you!
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                <Button size="lg" variant="outline">
                  Submit Your Review
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#testimonials`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
