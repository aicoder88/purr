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
      title: "Molecular Adsorption",
      description: "Activated carbon has millions of microscopic pores that trap odor molecules through physical and chemical adsorption, removing them from the air permanently."
    },
    {
      icon: Microscope,
      title: "Surface Area Power",
      description: "Just one gram of activated carbon has a surface area of 500-1500 square meters - equivalent to 6-18 tennis courts of odor-fighting power."
    },
    {
      icon: Zap,
      title: "Instant Action",
      description: "Unlike masking agents that cover smells, activated carbon physically captures and holds odor molecules, providing immediate and lasting results."
    },
    {
      icon: Shield,
      title: "Fragrance-Free & Natural",
      description: "Made from coconut shells through controlled heating, our activated carbon is the same type used in household water and air filters, with no added fragrances or dyes."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Odor Molecules Released",
      description: "When cats use the litter box, ammonia and other odor compounds are released into the air."
    },
    {
      step: "2", 
      title: "Carbon Activation",
      description: "Purrify's activated carbon particles immediately begin attracting these odor molecules to their porous surface."
    },
    {
      step: "3",
      title: "Molecular Capture",
      description: "Odor molecules are trapped in the carbon's microscopic pores through van der Waals forces and chemical bonds."
    },
    {
      step: "4",
      title: "Permanent Elimination",
      description: "Once captured, odor molecules remain locked in the carbon structure, eliminating smells rather than masking them."
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
                The Science Behind Purrify
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
                Discover how activated carbon technology eliminates odors at the molecular level, 
                providing superior odor control that's both fragrance-free and effective for your feline friends.
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                <Button size="lg" className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  Try the Science - $6.99
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Science Facts Grid */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-50 dark:text-white">
                How Activated Carbon Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                Understanding the molecular science that makes Purrify so effective at eliminating odors.
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
                The Odor Elimination Process
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                Follow the journey of odor molecules from release to permanent elimination.
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
                Proven by Science, Loved by Cats
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Our activated carbon formula has been tested and proven effective in eliminating 
                ammonia, hydrogen sulfide, and other common litter box odors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-lg opacity-90">Odor Elimination</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-lg opacity-90">Safe & Natural</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-lg opacity-90">Continuous Protection</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Experience the Science
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}>
                  <Button size="lg" variant="outline" className="border-white text-white dark:text-gray-100 hover:bg-white hover:text-[#5B2EFF] transition-colors">
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
