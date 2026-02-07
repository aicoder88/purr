'use client';

import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import Image from 'next/image';
import {
  CheckCircle,
  XCircle,
  Clock,
  Droplets,
  Shield,
  Heart,
  ChevronRight,
  Home,
  BookOpen,
  Star,
} from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { formatProductPrice } from '../../../src/lib/pricing';
import { getPaymentLink } from '../../../src/lib/payment-links';

export default function CatLitterGuidePageClient() {
  const { locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || '/products/trial-size';
  const trialCtaLabel = locale === 'fr'
    ? `Envoyer Mon Essai GRATUIT - ${trialPrice}`
    : `Send My FREE Trial - ${trialPrice}`;

  // Unique images for cat litter guide - different from all other posts
  const heroImage = '/optimized/litter-guide-hero-setup.webp'; // Modern litter box setup
  const sectionImage1 = '/optimized/safe-cat-litter.webp'; // Different litter types (reused safe litter image)
  const sectionImage2 = '/optimized/step-2-mix.webp'; // Cat owner maintenance (reused mixing image)
  const solutionImage = '/optimized/benefits-happy-cats.avif'; // Happy multi-cat household

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Learn', path: '/learn' },
    { name: 'Cat Litter Guide', path: '/learn/cat-litter-guide' },
  ];

  const litterTypes = [
    {
      name: "Clay Litter",
      pros: ["Affordable", "Good absorption", "Easy to find"],
      cons: ["Dusty", "Heavy", "Not biodegradable", "Poor odor control"],
      rating: 2
    },
    {
      name: "Clumping Clay",
      pros: ["Forms solid clumps", "Easy scooping", "Better odor control"],
      cons: ["Still dusty", "Heavy", "Can be tracked", "Not biodegradable"],
      rating: 3
    },
    {
      name: "Crystal/Silica",
      pros: ["Excellent absorption", "Low dust", "Long-lasting"],
      cons: ["Expensive", "Sharp crystals", "Not flushable"],
      rating: 3
    },
    {
      name: "Natural/Biodegradable",
      pros: ["Plant- or paper-based", "Low dust", "Flushable options"],
      cons: ["More expensive", "Variable quality", "May need frequent changes"],
      rating: 4
    },
    {
      name: "Any Litter + Purrify",
      pros: ["Superior odor elimination", "Extends litter life", "Works with any type", "Fragrance-free additive"],
      cons: ["Additional cost (but saves money overall)"],
      rating: 5
    }
  ];

  const maintenanceTips = [
    {
      icon: Clock,
      title: "Daily Scooping",
      description: "Remove solid waste daily to maintain freshness and prevent odor buildup."
    },
    {
      icon: Droplets,
      title: "Weekly Deep Clean",
      description: "Replace all litter weekly and wash the box with mild soap and water."
    },
    {
      icon: Shield,
      title: "Use Purrify",
      description: "Add Purrify activated carbon to eliminate odors and extend litter life by up to 50%."
    },
    {
      icon: Heart,
      title: "Monitor Health",
      description: "Watch for changes in your cat's bathroom habits as they can indicate health issues."
    }
  ];

  const commonProblems = [
    {
      problem: "Strong Odors",
      solution: "Add Purrify activated carbon additive for superior odor elimination",
      link: "/products/trial-size"
    },
    {
      problem: "Litter Tracking",
      solution: "Use a larger litter mat and consider switching to low-tracking litter types",
      link: null
    },
    {
      problem: "Dust Issues",
      solution: "Choose low-dust litters and pour slowly to minimize airborne particles",
      link: null
    },
    {
      problem: "Frequent Changes",
      solution: "Purrify extends litter life by neutralizing odors, reducing waste and costs",
      link: "/learn/how-it-works"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
            {breadcrumbItems.map((item, index, arr) => (
              <span key={item.path} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                {index === arr.length - 1 ? (
                  <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                ) : (
                  <Link href={item.path} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Container>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
        <Container>
          <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
            <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              The Complete Cat Litter Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Everything you need to know about choosing, using, and maintaining cat litter for a happy, healthy home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                  {trialCtaLabel}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Hero Image */}
      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src={heroImage}
              alt="Modern cat litter box setup showing different litter types and maintenance tools"
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </Container>
      </section>

      {/* Litter Types Comparison */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Cat Litter Types Compared
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Not all litters are created equal. Here&apos;s how different types stack up against each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {litterTypes.map((litter, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
                    {litter.name}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < litter.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                    <ul className="space-y-1">
                      {litter.pros.map((pro, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                    <ul className="space-y-1">
                      {litter.cons.map((con, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 mr-2 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Image - Different Litter Types */}
      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src={sectionImage1}
              alt="Various cat litter types displayed for comparison"
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Container>
      </section>

      {/* Maintenance Tips */}
      <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Essential Maintenance Tips
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Keep your litter box fresh and your cat happy with these proven maintenance practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceTips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Image - Cat Owner Maintenance */}
      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src={sectionImage2}
              alt="Cat owner performing proper litter box maintenance routine"
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Container>
      </section>

      {/* Common Problems & Solutions */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Common Problems & Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Facing litter box issues? Here are the most common problems and their proven solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonProblems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-3 text-red-600 dark:text-red-400">
                  Problem: {item.problem}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> {item.solution}
                </p>
                {item.link && (
                  <Link href={`${locale === 'fr' ? '/fr' : ''}${item.link}`}>
                    <Button variant="outline" size="sm">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Solution Image - Happy Multi-Cat Household */}
      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src={solutionImage}
              alt="Happy multi-cat household with clean, odor-free environment"
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
        <Container>
          <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Upgrade Your Litter Box Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try Purrify&apos;s activated carbon additive and transform any litter into an odor-eliminating powerhouse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                  {trialCtaLabel}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/reviews`}>
                <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                  Read Success Stories
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      <section className="py-16">
        <Container>
          <RelatedContent currentUrl="/learn/cat-litter-guide" />
        </Container>
      </section>
    </main>
  );
}
