'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../../src/components/ui/container';
import { RelatedArticles } from '../../../src/components/blog/RelatedArticles';
import { ChevronRight, Home, Sparkles, Wind, Cat, Building2, Users, Leaf, Heart } from 'lucide-react';

interface SolutionCard {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SOLUTIONS: SolutionCard[] = [
  {
    title: 'Ammonia Smell Solutions',
    description: 'That sharp ammonia smell? Learn why bacteria convert urine to ammonia gas and how activated carbon neutralizes it at the molecular level.',
    href: '/learn/solutions/ammonia-smell-cat-litter',
    image: '/optimized/blog/ammonia-hero.webp',
    alt: 'Stop ammonia smell from cat litter',
    icon: Wind,
  },
  {
    title: 'How to Neutralize Ammonia',
    description: 'Step-by-step guide to neutralizing ammonia in your cat litter. Discover why baking soda fails and what actually works.',
    href: '/learn/solutions/how-to-neutralize-ammonia-cat-litter',
    image: '/optimized/blog/ammonia-science.webp',
    alt: 'Scientific approach to ammonia neutralization',
    icon: Sparkles,
  },
  {
    title: 'Apartment Cat Smell Solutions',
    description: 'Living in a small space with your cat? Specialized tips for keeping apartments fresh without overwhelming scents.',
    href: '/learn/solutions/apartment-cat-smell-solution',
    image: '/optimized/blog/apartment-hero.webp',
    alt: 'Fresh apartment living with cats',
    icon: Building2,
  },
  {
    title: 'Litter Box Smell Elimination',
    description: 'Complete guide to eliminating litter box odors. From daily maintenance to deep cleaning strategies.',
    href: '/learn/solutions/litter-box-smell-elimination',
    image: '/optimized/blog/litter-box-hero.webp',
    alt: 'Clean litter box in a fresh home',
    icon: Cat,
  },
  {
    title: 'Multiple Cats Odor Control',
    description: 'Managing odor with multiple cats is challenging. Learn proven strategies that work for multi-cat households.',
    href: '/learn/solutions/multiple-cats-odor-control',
    image: '/optimized/blog/ammonia-fresh-home.webp',
    alt: 'Multi-cat household odor solutions',
    icon: Users,
  },
  {
    title: 'Natural Cat Litter Additives',
    description: 'Looking for natural solutions? Compare natural additives and learn which ones actually work for odor control.',
    href: '/learn/solutions/natural-cat-litter-additive',
    image: '/optimized/blog/ammonia-happy-cat.webp',
    alt: 'Natural cat care solutions',
    icon: Leaf,
  },
  {
    title: 'Senior Cat Litter Solutions',
    description: 'Older cats have unique needs. Gentle solutions that work for senior cats with sensitive health conditions.',
    href: '/learn/solutions/senior-cat-litter-solutions',
    image: '/optimized/marketing/apartment-living-room.webp',
    alt: 'Comfortable solutions for senior cats',
    icon: Heart,
  },
];

export default function SolutionsPageClient() {
  return (
    <div className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <Container>
          <nav className="flex items-center gap-2 py-3 text-sm">
            <Link href="/" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <Link href="/learn/how-it-works/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              Learn
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">Solutions</span>
          </nav>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
              Find Your Perfect Odor Solution
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Every cat household is different. Whether you&apos;re dealing with ammonia smell, living in a small apartment,
              or managing multiple cats, we have targeted solutions for your specific situation.
            </p>
          </div>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section className="pb-16 px-4">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((solution) => {
              const Icon = solution.icon;
              return (
                <Link
                  key={solution.href}
                  href={solution.href}
                  className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#03E46A] dark:hover:border-[#03E46A]"
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
                  <div className="p-6">
                    <h2 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors">
                      {solution.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                    <div className="mt-4 flex items-center text-[#03E46A] dark:text-[#3694FF] font-medium text-sm">
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
              Ready to Try the Solution?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              All our solutions feature Purrify&apos;s activated carbon technology. Start with our risk-free trial size.
            </p>
            <Link
              href="/products/trial-size/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#03E46A] dark:bg-[#04D162] hover:bg-[#02c75b] dark:hover:bg-[#04D162]/90 text-white dark:text-gray-900 font-bold rounded-full transition-colors shadow-lg hover:shadow-xl"
            >
              Try Purrify Risk-Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      <RelatedArticles currentPath="/learn/solutions" limit={6} />
    </div>
  );
}
