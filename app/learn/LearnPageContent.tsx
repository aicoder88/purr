'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import {
  ChevronRight,
  Home,
  Sparkles,
  HelpCircle,
  FlaskConical,
  Shield,
  Leaf,
  BookOpen,
  Settings2,
  Scale,
  Wind,
  Building2,
  Cat,
  Users,
  Heart,
} from 'lucide-react';

interface LearnCard {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MAIN_GUIDES: LearnCard[] = [
  {
    title: 'How It Works',
    description: "Discover the science behind Purrify's activated carbon technology and how it eliminates odors at the molecular level.",
    href: '/learn/how-it-works',
    image: '/optimized/marketing/micropores-magnified-view.webp',
    alt: 'How Purrify activated carbon works',
    icon: Sparkles,
  },
  {
    title: 'FAQ',
    description: 'Get answers to the most common questions about Purrify, from usage instructions to safety concerns.',
    href: '/learn/faq',
    image: '/optimized/blog/cat-owner-questions-ghibli-828w.webp',
    alt: 'Frequently asked questions about Purrify',
    icon: HelpCircle,
  },
  {
    title: 'The Science',
    description: 'Deep dive into the scientific principles behind activated carbon and molecular adsorption.',
    href: '/learn/science',
    image: '/optimized/blog/activated-carbon-science-benefits-ghibli.webp',
    alt: 'Science of activated carbon',
    icon: FlaskConical,
  },
  {
    title: 'Safety Information',
    description: 'Learn why Purrify is safe for cats, kittens, and humans. No toxic chemicals, just pure activated carbon.',
    href: '/learn/safety',
    image: '/optimized/marketing/pet-safety-home.webp',
    alt: 'Safety information for Purrify',
    icon: Shield,
  },
  {
    title: 'Activated Carbon Benefits',
    description: 'Explore all the benefits of activated carbon for cat litter odor control and beyond.',
    href: '/blog/activated-carbon-litter-additive-benefits',
    image: '/optimized/blog/activated-carbon-benefits.webp',
    alt: 'Benefits of activated carbon',
    icon: Leaf,
  },
  {
    title: 'Cat Litter Guide',
    description: 'The complete guide to choosing and using cat litter, with tips for every type of household.',
    href: '/learn/cat-litter-guide',
    image: '/optimized/blog/litter-guide-hero-setup.webp',
    alt: 'Complete cat litter guide',
    icon: BookOpen,
  },
  {
    title: 'How to Use',
    description: 'Step-by-step instructions for getting the most out of Purrify with any litter type.',
    href: '/blog/how-to-use-cat-litter-deodorizer',
    image: '/optimized/blog/application-technique-ghibli.webp',
    alt: 'How to use Purrify deodorizer',
    icon: Settings2,
  },
  {
    title: 'Technology Comparison',
    description: 'See how activated carbon compares to baking soda and other deodorizer technologies.',
    href: '/blog/activated-carbon-vs-baking-soda-comparison',
    image: '/optimized/blog/activated-carbon-vs-baking-soda-comparison.webp',
    alt: 'Activated carbon vs baking soda comparison',
    icon: Scale,
  },
];

const SOLUTIONS: LearnCard[] = [
  {
    title: 'Ammonia Smell Control',
    description: 'That sharp ammonia smell? Learn why bacteria convert urine to ammonia gas and how activated carbon neutralizes it.',
    href: '/blog/how-to-neutralize-ammonia-cat-litter',
    image: '/optimized/blog/ammonia-hero.webp',
    alt: 'Stop ammonia smell from cat litter',
    icon: Wind,
  },
  {
    title: 'Apartment Living',
    description: 'Living in a small space with your cat? Specialized tips for keeping apartments fresh without overwhelming scents.',
    href: '/blog/best-litter-odor-remover-small-apartments',
    image: '/optimized/blog/apartment-hero.webp',
    alt: 'Fresh apartment living with cats',
    icon: Building2,
  },
  {
    title: 'Litter Box Odor',
    description: 'Complete guide to eliminating litter box odors. From daily maintenance to deep cleaning strategies.',
    href: '/blog/how-to-eliminate-cat-litter-odor',
    image: '/optimized/blog/litter-box-hero.webp',
    alt: 'Clean litter box in a fresh home',
    icon: Cat,
  },
  {
    title: 'Multiple Cats',
    description: 'Managing odor with multiple cats is challenging. Learn proven strategies that work for multi-cat households.',
    href: '/blog/best-cat-litter-multiple-cats-odor-control',
    image: '/optimized/blog/ammonia-fresh-home.webp',
    alt: 'Multi-cat household odor solutions',
    icon: Users,
  },
  {
    title: 'Natural Additive',
    description: 'Looking for natural solutions? Compare natural additives and learn which ones actually work for odor control.',
    href: '/blog/best-natural-cat-litter-odor-control',
    image: '/optimized/blog/ammonia-happy-cat.webp',
    alt: 'Natural cat care solutions',
    icon: Leaf,
  },
  {
    title: 'Senior Cats',
    description: 'Older cats have unique needs. Gentle solutions that work for senior cats with sensitive health conditions.',
    href: '/blog/best-cat-litter-multiple-cats-odor-control',
    image: '/optimized/marketing/apartment-living-room.webp',
    alt: 'Comfortable solutions for senior cats',
    icon: Heart,
  },
];

export default function LearnPageContent() {
  const { schema, additionalSchemas } = useEnhancedSEO({
    path: '/learn',
    title: 'Cat Litter Odor Guides & Science',
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.',
    targetKeyword: 'cat litter odor control',
    schemaType: 'article',
    schemaData: {
      headline: 'Learn - Cat Litter Odor Control Guides & Science',
      description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover the science behind Purrify.',
      image: 'https://www.purrify.ca/optimized/marketing/micropores-magnified-view.webp',
      datePublished: '2024-01-01T10:00:00Z',
      dateModified: new Date().toISOString(),
      category: 'Education',
      keywords: ['cat litter odor control', 'activated carbon guide', 'how to eliminate litter box smell', 'cat litter tips', 'ammonia smell solutions', 'multi-cat odor control'],
    },
    image: 'https://www.purrify.ca/optimized/marketing/micropores-magnified-view.webp',
    keywords: ['cat litter odor control', 'activated carbon guide', 'how to eliminate litter box smell', 'cat litter tips', 'ammonia smell solutions', 'multi-cat odor control'],
  });

  // Collection page schema for learn hub
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Learn - Cat Litter Odor Control Guides & Science',
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover the science behind Purrify.',
    url: 'https://www.purrify.ca/learn/',
    inLanguage: 'en-CA',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: 'https://www.purrify.ca/learn/how-it-works/',
          name: 'How It Works',
          description: "Discover the science behind Purrify's activated carbon technology.",
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: 'https://www.purrify.ca/learn/faq/',
          name: 'FAQ',
          description: 'Get answers to the most common questions about Purrify.',
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: 'https://www.purrify.ca/learn/science/',
          name: 'The Science',
          description: 'Deep dive into the scientific principles behind activated carbon.',
        },
        {
          '@type': 'ListItem',
          position: 4,
          url: 'https://www.purrify.ca/learn/safety/',
          name: 'Safety Information',
          description: 'Learn why Purrify is safe for cats, kittens, and humans.',
        },
        {
          '@type': 'ListItem',
          position: 5,
          url: 'https://www.purrify.ca/blog/activated-carbon-litter-additive-benefits/',
          name: 'Activated Carbon Benefits',
          description: 'Explore all the benefits of activated carbon for cat litter odor control.',
        },
        {
          '@type': 'ListItem',
          position: 6,
          url: 'https://www.purrify.ca/learn/cat-litter-guide/',
          name: 'Cat Litter Guide',
          description: 'The complete guide to choosing and using cat litter.',
        },
        {
          '@type': 'ListItem',
          position: 7,
          url: 'https://www.purrify.ca/blog/how-to-use-cat-litter-deodorizer/',
          name: 'How to Use',
          description: 'Step-by-step instructions for getting the most out of Purrify.',
        },
        {
          '@type': 'ListItem',
          position: 8,
          url: 'https://www.purrify.ca/blog/activated-carbon-vs-baking-soda-comparison/',
          name: 'Technology Comparison',
          description: 'See how activated carbon compares to baking soda and other deodorizers.',
        },
        {
          '@type': 'ListItem',
          position: 9,
          url: 'https://www.purrify.ca/blog/',
          name: 'All Guides',
          description: 'Targeted guides for every cat litter odor problem.',
        },
      ],
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.purrify.ca',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learn',
        item: 'https://www.purrify.ca/learn/',
      },
    ],
  };

  const allSchemas = [schema, collectionPageSchema, breadcrumbSchema, ...additionalSchemas].filter(Boolean);

  const proofSection = (
    <section className="pb-8 px-4">
      <Container>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100">
            Understand the science first, then choose the right solution.
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#03E46A] dark:text-[#04D162]">Fragrance-free</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">No perfumes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#03E46A] dark:text-[#04D162]">Any litter</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Additive, not a litter</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#03E46A] dark:text-[#04D162]">Citations</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Science hub</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );

  return (
    <>
      {allSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              allSchemas.length === 1
                ? allSchemas[0]
                : { '@context': 'https://schema.org', '@graph': allSchemas }
            ),
          }}
        />
      )}
      <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb */}
        <div className="bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
          <Container>
            <nav className="flex items-center gap-2 py-3 text-sm">
              <Link href="/" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">Learn</span>
            </nav>
          </Container>
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Learn Everything About Cat Litter Odor Control
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Explore our comprehensive guides, scientific explanations, and targeted solutions to keep your home fresh and your cat happy.
              </p>
            </div>
          </Container>
        </section>

        {proofSection}

        {/* Main Guides Section */}
        <section className="pb-8 px-4">
          <Container>
            <h2 className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Essential Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MAIN_GUIDES.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#03E46A] dark:hover:border-[#03E46A]"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={guide.image}
                        alt={guide.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-lg">
                          <Icon className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-heading font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {guide.description}
                      </p>
                      <div className="mt-3 flex items-center text-[#03E46A] dark:text-[#3694FF] font-medium text-sm">
                        Read guide
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>



        {/* Solutions Section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800/50">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100">
                Solutions by Problem
              </h2>
              <Link
                href="/blog"
                className="flex items-center text-[#5B2EFF] dark:text-[#3694FF] hover:text-[#03E46A] dark:hover:text-[#03E46A] font-medium text-sm transition-colors"
              >
                View all guides
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOLUTIONS.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link
                    key={solution.href}
                    href={solution.href}
                    className="group block bg-[#FFFFF5] dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#03E46A] dark:hover:border-[#03E46A]"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={solution.image}
                        alt={solution.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-lg">
                          <Icon className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-heading font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {solution.description}
                      </p>
                      <div className="mt-3 flex items-center text-[#03E46A] dark:text-[#3694FF] font-medium text-sm">
                        Learn more
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#5B2EFF]/10 to-[#03E46A]/10 dark:from-[#5B2EFF]/20 dark:to-[#03E46A]/20">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Put what you&apos;ve learned into practice. Try Purrify risk-free with our trial size and see why thousands of cat parents swear by it.
              </p>
              <Link
                href="/products/trial-size"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#03E46A] dark:bg-[#04D162] hover:bg-[#02c75b] dark:hover:bg-[#04D162]/90 text-white dark:text-gray-900 font-bold rounded-full transition-colors shadow-lg hover:shadow-xl"
              >
                Try Purrify Risk-Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <RelatedArticles currentPath="/learn" limit={6} />
      </div>
    </>
  );
}
