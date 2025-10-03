import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
// import NextImage from '../components/NextImage';
import Link from 'next/link';
import { ArrowLeft, Atom, Zap, Shield, Microscope, FlaskConical } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

export default function SciencePage() {
  const { locale } = useTranslation();
  
  const pageTitle = `The Science Behind ${SITE_NAME} - Activated Carbon Technology`;
  const pageDescription = "Discover how Purrify's activated carbon technology eliminates odors at the molecular level. Learn about the science that makes our cat litter additive so effective.";
  const canonicalUrl = `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/science`;

  const scienceFacts = [
    {
      icon: Atom,
      title: "Engineered Pore Architecture",
      description: "Working with research scientists, we optimized the exact ratio of micropores (< 2nm), mesopores (2-50nm), and macropores (> 50nm) to create the perfect trap for cat litter odor molecules."
    },
    {
      icon: Microscope,
      title: "Ammonia Capture Mastery",
      description: "Ammonia molecules (NH₃) from cat urine are tiny—only 0.26 nanometers. Our micropore-rich structure creates millions of perfectly sized capture sites that lock away ammonia before you can smell it."
    },
    {
      icon: Zap,
      title: "Mercaptan Elimination",
      description: "Mercaptans (sulfur compounds) give feces that distinctive rotten-egg smell. Our mesopore channels are specifically sized to trap these larger, more complex molecules permanently."
    },
    {
      icon: Shield,
      title: "Triple-Pore Synergy",
      description: "Macropores act as highways delivering odor molecules deep into the carbon. Mesopores catch medium-sized sulfur compounds. Micropores trap the smallest ammonia molecules. Nothing escapes."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "The Culprits: Ammonia & Mercaptans",
      description: "Cat urine breaks down into ammonia (NH₃)—that sharp, eye-watering smell. Feces releases mercaptans—sulfur compounds that smell like rotten eggs or sewage. These are the molecules we engineered Purrify to capture."
    },
    {
      step: "2",
      title: "Macropores: The Express Lanes",
      description: "Large macropores (> 50nm) act as highways, rapidly transporting odor molecules deep into the carbon structure. Think of them as the entry points that prevent bottlenecks."
    },
    {
      step: "3",
      title: "Mesopores: The Mercaptan Traps",
      description: "Medium-sized mesopores (2-50nm) are perfectly sized to capture mercaptans and other sulfur compounds from feces. These pores create a tight grip that won't let go."
    },
    {
      step: "4",
      title: "Micropores: The Ammonia Eliminators",
      description: "Tiny micropores (< 2nm) are optimized for ammonia's 0.26nm size. With millions of these capture sites per gram, ammonia molecules get locked away permanently before you can smell them."
    }
  ];

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'article',
          images: [
            {
              url: 'https://purrify.ca/optimized/science-hero.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify Activated Carbon Science',
            },
          ],
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container className="pt-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 dark:text-gray-300 dark:text-gray-400">
              <li>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Learn
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Science</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full mb-6">
                <FlaskConical className="w-8 h-8 text-white dark:text-gray-100 dark:text-gray-100" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
                Engineered to Eliminate Cat Litter Odor
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
                Working with research scientists, we engineered the perfect pore structure to capture ammonia from urine
                and mercaptans from feces—the two molecules responsible for that unmistakable litter box smell.
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                <Button size="lg" className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  Try the Science - $6.99
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Understanding the Enemy */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Understanding Litter Box Odor: The Two Culprits
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                That unmistakable litter box smell comes from two specific molecules. To eliminate them, you need to understand them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-red-200 dark:border-red-900">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                    <span className="text-3xl">💧</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ammonia (NH₃)</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 font-semibold">From Cat Urine</p>
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span><strong>The Smell:</strong> Sharp, pungent, eye-watering—like cleaning chemicals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span><strong>Molecule Size:</strong> Tiny at 0.26 nanometers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span><strong>The Problem:</strong> Forms when bacteria break down urea in urine</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span><strong>Why It's Hard:</strong> Most carbon has pores too large to trap such small molecules</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-yellow-200 dark:border-yellow-900">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
                    <span className="text-3xl">💩</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mercaptans</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">From Cat Feces</p>
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>The Smell:</strong> Rotten eggs, sewage, sulfur—that gagging sensation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>Molecule Size:</strong> Larger, more complex sulfur compounds</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>The Problem:</strong> Released when proteins in feces decompose</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>Why It's Hard:</strong> Sticky molecules that require specific pore sizes to capture</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Here's the breakthrough:</strong> Most activated carbon is designed for water filtration or general air purification.
                We worked with research scientists to engineer carbon specifically for these two molecules—creating the perfect trap for cat litter odor.
              </p>
            </div>
          </Container>
        </section>

        {/* Science Facts Grid */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-50 dark:text-white">
                Precision-Engineered Pore Structure
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                Not all activated carbon is created equal. We worked with scientists to optimize every detail for cat litter odor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scienceFacts.map((fact, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-lg flex items-center justify-center">
                        <fact.icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-white">
                        {fact.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {fact.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process Timeline */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-white">
                How the Three Pore Types Work Together
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                Our research-backed pore architecture creates a capture system specifically engineered for cat litter odors.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF3131] to-[#5B2EFF] rounded-full hidden md:block"></div>

              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Step number */}
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg z-10 my-4 md:my-0">
                      {step.step}
                    </div>

                    <div className="w-full md:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Research & Testing */}
        <section className="py-16 bg-gradient-to-r from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Most Effective Cat Litter Odor Solution in the World
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                By engineering the perfect micropore-mesopore-macropore ratio, we created activated carbon
                specifically optimized to capture ammonia and mercaptans—the exact molecules that make litter boxes smell.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">0.26nm</div>
                  <div className="text-lg opacity-90">Ammonia Molecule Size - Perfectly Matched Micropores</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">3 Pore Types</div>
                  <div className="text-lg opacity-90">Micro + Meso + Macro = Complete Capture</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">1050 m²/g</div>
                  <div className="text-lg opacity-90">Surface Area - Millions of Capture Sites</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    Experience the Science
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-white dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#5B2EFF] transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/learn/science" />
          </Container>
        </section>

        {/* Back to Learn */}
        <section className="py-8 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <Link 
              href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}
              className="inline-flex items-center text-gray-600 dark:text-gray-300 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learn
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
