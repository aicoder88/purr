import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import NextImage from '../../components/NextImage';
import Link from 'next/link';
import { ArrowLeft, Microscope, Zap, Shield, Leaf, ChevronRight } from 'lucide-react';
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';

export default function HowItWorksPage() {
  const { t, locale } = useTranslation();
  
  const pageTitle = `How Purrify Works - ${SITE_NAME} Activated Carbon Science`;
  const pageDescription = "Discover the science behind Purrify's activated carbon technology. Learn how micropores trap odor molecules at the source for superior cat litter odor control.";
  const canonicalUrl = `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`;

  const sciencePoints = [
    {
      icon: Microscope,
      title: "Activated Carbon Structure",
      description: "Our activated carbon contains millions of microscopic pores that create an enormous surface area - up to 1,500 square meters per gram.",
      detail: "These pores are specifically sized to trap odor molecules while allowing air to flow freely through your cat's litter box."
    },
    {
      icon: Zap,
      title: "Molecular Adsorption",
      description: "Odor molecules are physically trapped within the carbon's pore structure through a process called adsorption.",
      detail: "Unlike air fresheners that mask odors, Purrify actually captures and holds odor molecules, preventing them from reaching your nose."
    },
    {
      icon: Shield,
      title: "Long-Lasting Protection",
      description: "Once trapped, odor molecules remain locked in the carbon structure until the litter is changed.",
      detail: "This provides continuous odor control without the need for frequent reapplication or chemical additives."
    },
    {
      icon: Leaf,
      title: "Natural & Safe",
      description: "Made from coconut shells, our activated carbon is completely natural and safe for cats and humans.",
      detail: "No chemicals, fragrances, or artificial additives - just pure activated carbon doing what nature intended."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sprinkle Purrify",
      description: "Add a thin layer of Purrify on top of fresh or existing litter",
      image: "/optimized/panel_1.webp",
      tip: "A little goes a long way - just 1-2 teaspoons per litter box change"
    },
    {
      number: "2", 
      title: "Mix Gently",
      description: "Lightly mix Purrify into the top layer of litter",
      image: "/optimized/panel_2.webp",
      tip: "No need to completely blend - surface coverage is most effective"
    },
    {
      number: "3",
      title: "Enjoy Freshness",
      description: "Experience immediate and long-lasting odor control",
      image: "/optimized/panel_3.webp",
      tip: "Reapply when adding fresh litter or doing a complete change"
    }
  ];

  const faqs = [
    {
      question: "How quickly does Purrify start working?",
      answer: "Purrify begins trapping odor molecules immediately upon contact. Most customers notice a significant reduction in odors within the first few hours of application."
    },
    {
      question: "Is activated carbon safe if my cat ingests it?",
      answer: "Yes, activated carbon is completely safe for cats. It's actually used in veterinary medicine to treat poisoning. However, Purrify is designed to stay in the litter, not be consumed."
    },
    {
      question: "How does this compare to baking soda?",
      answer: "While baking soda neutralizes acids, activated carbon physically traps a much wider range of odor molecules. Carbon is more effective and longer-lasting than baking soda."
    },
    {
      question: "Will this affect my cat's litter box habits?",
      answer: "No, Purrify is odorless and doesn't change the texture or feel of your cat's litter. Most cats don't even notice it's there."
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
              url: 'https://purrify.ca/optimized/micropores_magnified_view.webp',
              width: 1200,
              height: 630,
              alt: 'Activated Carbon Micropores Under Magnification (WebP)',
              type: 'image/webp'
            },
            {
              url: 'https://purrify.ca/micropores_magnified_view.jpeg',
              width: 1200,
              height: 630,
              alt: 'Activated Carbon Micropores Under Magnification',
              type: 'image/jpeg'
            }
          ]
        }}
      />
      
      {/* Advanced JSON-LD Schema for Article */}
      <ArticleSchema
        title={pageTitle}
        description={pageDescription}
        path='/learn/how-it-works'
        locale={locale as 'en' | 'fr' | 'zh'}
        options={{
          category: 'Pet Care Science',
          keywords: ['how activated carbon works', 'cat litter odor control', 'activated carbon science', 'molecular adsorption', 'pet odor elimination'],
          datePublished: '2024-01-20T10:00:00Z',
          dateModified: new Date().toISOString(),
          wordCount: 2200,
          readingTime: 10,
          image: 'https://purrify.ca/images/how-purrify-works-science.jpg'
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Learn
                </span>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">How It Works</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
                The Science Behind Purrify
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Discover how activated carbon technology eliminates odors at the molecular level, 
                providing superior odor control for your cat's litter box.
              </p>
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative">
                        <NextImage
                          src="/optimized/micropores_magnified_view.webp"
                          alt="Activated Carbon Micropores Under Magnification"
                          width={600}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white dark:text-gray-100 px-3 py-1 rounded-lg text-sm">
                    Micropores magnified 1000x
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Science Explanation */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                How Activated Carbon Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Understanding the molecular science that makes Purrify so effective
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {sciencePoints.map((point, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-xl flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {point.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {point.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Step-by-Step Usage */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                How to Use Purrify
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple steps for maximum odor control effectiveness
              </p>
            </div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
                        <span className="text-white dark:text-gray-100 font-bold text-2xl">{step.number}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 dark:text-gray-100">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="bg-[#E0EFC7]/50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300">
                        💡 <strong>Pro Tip:</strong> {step.tip}
                      </p>
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                      <div className="relative">
                        <NextImage
                          src={step.image}
                          alt={step.title}
                          width={500}
                          height={400}
                          className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Common Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Everything you need to know about activated carbon technology
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Have more questions about how Purrify works?
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                <Button size="lg" variant="outline">
                  Contact Our Experts
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <Container>
            <div className="bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] rounded-3xl p-12 text-center text-white dark:text-gray-100">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Experience the Science?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Try Purrify's activated carbon technology risk-free with our trial size
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Try Trial Size - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-gray-50 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#how-it-works`}>
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
