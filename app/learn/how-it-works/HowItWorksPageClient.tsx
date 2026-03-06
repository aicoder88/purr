'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

import { useCurrency } from '@/lib/currency-context';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Microscope, Zap, Shield, Leaf, ChevronRight, Home } from 'lucide-react';
import { useLocale } from 'next-intl';

type SupportedLocale = 'en' | 'fr';

interface SciencePoint {
  title: string;
  description: string;
  detail: string;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
  image: string;
  tip: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HowItWorksCopy {
  breadcrumbAriaLabel: string;
  breadcrumbHome: string;
  breadcrumbLearn: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroDescription: string;
  heroImageAlt: string;
  heroImageCaption: string;
  scienceHeading: string;
  scienceSubheading: string;
  usageHeading: string;
  usageSubheading: string;
  proTipLabel: string;
  faqHeading: string;
  faqSubheading: string;
  faqPrompt: string;
  faqContactButton: string;
  ctaTitle: string;
  ctaDescription: string;
  viewProductsButton: string;
  backToHomepage: string;
  trialPrefix: string;
  sciencePoints: SciencePoint[];
  steps: StepItem[];
  faqs: FaqItem[];
}

const HOW_IT_WORKS_COPY: Record<SupportedLocale, HowItWorksCopy> = {
  en: {
    breadcrumbAriaLabel: 'Breadcrumb',
    breadcrumbHome: 'Home',
    breadcrumbLearn: 'Learn',
    breadcrumbCurrent: 'How It Works',
    heroTitle: 'The Science Behind Purrify',
    heroDescription: "Discover how activated carbon technology eliminates odors at the molecular level, providing superior odor control for your cat's litter box.",
    heroImageAlt: 'Activated Carbon Micropores Under Magnification',
    heroImageCaption: 'Micropores magnified 1000x',
    scienceHeading: 'How Activated Carbon Works',
    scienceSubheading: 'Understanding the molecular science that makes Purrify so effective',
    usageHeading: 'How to Use Purrify',
    usageSubheading: 'Simple steps for maximum odor control effectiveness',
    proTipLabel: 'Pro Tip:',
    faqHeading: 'Common Questions',
    faqSubheading: 'Everything you need to know about activated carbon technology',
    faqPrompt: 'Have more questions about how Purrify works?',
    faqContactButton: 'Contact Our Experts',
    ctaTitle: 'Ready to Experience the Science?',
    ctaDescription: "Try Purrify's activated carbon technology risk-free with our trial size",
    viewProductsButton: 'View All Products',
    backToHomepage: 'Back to Homepage',
    trialPrefix: 'Send My FREE Trial',
    sciencePoints: [
      {
        title: 'Activated Carbon Structure',
        description: 'Our activated carbon contains millions of microscopic pores that create an enormous surface area - up to 1,500 square meters per gram.',
        detail: "These pores are specifically sized to trap odor molecules while allowing air to flow freely through your cat's litter box.",
      },
      {
        title: 'Molecular Adsorption',
        description: "Odor molecules are physically trapped within the carbon's pore structure through a process called adsorption.",
        detail: "Unlike air fresheners that mask odors, Purrify actually captures and holds odor molecules, preventing them from reaching your nose.",
      },
      {
        title: 'Long-Lasting Protection',
        description: 'Once trapped, odor molecules remain locked in the carbon structure until the litter is changed.',
        detail: 'This provides continuous odor control without the need for frequent reapplication or chemical additives.',
      },
      {
        title: 'Natural & Fragrance-Free',
        description: 'Made from coconut shells, our activated carbon is the same type used in household water and air filters.',
        detail: 'No added fragrances or dyes - just pure activated carbon doing the work.',
      },
    ],
    steps: [
      {
        number: '1',
        title: 'Sprinkle Purrify',
        description: 'Add a thin layer of Purrify on top of fresh or existing litter',
        image: '/optimized/marketing/step-1-sprinkle.webp',
        tip: 'A little goes a long way - just 1-2 teaspoons per litter box change',
      },
      {
        number: '2',
        title: 'Mix Gently',
        description: 'Lightly mix Purrify into the top layer of litter',
        image: '/optimized/marketing/step-2-mix.webp',
        tip: 'No need to completely blend - surface coverage is most effective',
      },
      {
        number: '3',
        title: 'Enjoy Freshness',
        description: 'Experience immediate and long-lasting odor control',
        image: '/optimized/marketing/step-3-enjoy.webp',
        tip: 'Reapply when adding fresh litter or doing a complete change',
      },
    ],
    faqs: [
      {
        question: 'How quickly does Purrify start working?',
        answer: 'Purrify begins trapping odor molecules immediately upon contact. Most customers notice a significant reduction in odors within the first few hours of application.',
      },
      {
        question: 'What if my cat ingests some activated carbon?',
        answer: 'Activated carbon used in household filtration is biologically inert. Purrify is designed to stay in the litter; monitor your cat as usual and consult your veterinarian if you have concerns.',
      },
      {
        question: 'How does this compare to baking soda?',
        answer: 'While baking soda neutralizes acids, activated carbon physically traps a much wider range of odor molecules. Carbon is more effective and longer-lasting than baking soda.',
      },
      {
        question: "Will this affect my cat's litter box habits?",
        answer: "No, Purrify is odorless and doesn't change the texture or feel of your cat's litter. Most cats don't even notice it's there.",
      },
    ],
  },
  fr: {
    breadcrumbAriaLabel: "Fil d'Ariane",
    breadcrumbHome: 'Accueil',
    breadcrumbLearn: 'Apprendre',
    breadcrumbCurrent: 'Comment ca marche',
    heroTitle: 'La science derriere Purrify',
    heroDescription: 'Decouvrez comment la technologie du charbon actif elimine les odeurs au niveau moleculaire pour un controle superieur des odeurs de litiere.',
    heroImageAlt: 'Micropores de charbon actif sous grossissement',
    heroImageCaption: 'Micropores grossis 1000x',
    scienceHeading: 'Comment fonctionne le charbon actif',
    scienceSubheading: 'Comprendre la science moleculaire qui rend Purrify si efficace',
    usageHeading: 'Comment utiliser Purrify',
    usageSubheading: 'Des etapes simples pour un maximum de controle des odeurs',
    proTipLabel: 'Conseil pro :',
    faqHeading: 'Questions frequentes',
    faqSubheading: 'Tout ce que vous devez savoir sur la technologie du charbon actif',
    faqPrompt: 'Vous avez dautres questions sur le fonctionnement de Purrify?',
    faqContactButton: 'Contacter nos experts',
    ctaTitle: 'Pret a decouvrir la science?',
    ctaDescription: 'Essayez la technologie Purrify sans risque avec notre format essai',
    viewProductsButton: 'Voir tous les produits',
    backToHomepage: "Retour a l'accueil",
    trialPrefix: 'Envoyer Mon Essai GRATUIT',
    sciencePoints: [
      {
        title: 'Structure du charbon actif',
        description: 'Notre charbon actif contient des millions de pores microscopiques qui creent une surface enorme, jusqua 1 500 m2 par gramme.',
        detail: 'Ces pores sont dimensionnes pour pieger les molecules odorantes tout en laissant circuler lair dans le bac.',
      },
      {
        title: 'Adsorption moleculaire',
        description: 'Les molecules odorantes sont piegees dans la structure poreuse du carbone via ladsorption.',
        detail: 'Contrairement aux parfums qui masquent les odeurs, Purrify capture et retient les molecules.',
      },
      {
        title: 'Protection longue duree',
        description: 'Une fois piegees, les molecules restent bloquees jusquau remplacement de la litiere.',
        detail: 'Vous obtenez un controle continu sans reappliquer constamment ni ajouter de produits chimiques.',
      },
      {
        title: 'Naturel et sans parfum',
        description: 'Fabrique a partir de coques de noix de coco, notre charbon actif est du meme type que celui utilise dans les filtres domestiques.',
        detail: 'Sans parfum ni colorant, uniquement du charbon actif pur.',
      },
    ],
    steps: [
      {
        number: '1',
        title: 'Saupoudrer Purrify',
        description: 'Ajoutez une fine couche de Purrify sur une litiere neuve ou existante',
        image: '/optimized/marketing/step-1-sprinkle.webp',
        tip: 'Une petite quantite suffit, environ 1 a 2 cuilleres a cafe par changement de bac',
      },
      {
        number: '2',
        title: 'Melanger doucement',
        description: 'Melangez legerement Purrify dans la couche superieure',
        image: '/optimized/marketing/step-2-mix.webp',
        tip: 'Pas besoin de melanger en profondeur, la surface est la zone la plus efficace',
      },
      {
        number: '3',
        title: 'Profiter de la fraicheur',
        description: 'Profitez dun controle des odeurs immediat et durable',
        image: '/optimized/marketing/step-3-enjoy.webp',
        tip: 'Reappliquez lors de lajout de litiere propre ou dun changement complet',
      },
    ],
    faqs: [
      {
        question: 'A quelle vitesse Purrify agit-il?',
        answer: 'Purrify commence a pieger les molecules odorantes immediatement. La plupart des clients remarquent une baisse nette des odeurs en quelques heures.',
      },
      {
        question: 'Que faire si mon chat ingere un peu de charbon actif?',
        answer: 'Le charbon actif utilise en filtration domestique est biologiquement inerte. Purrify reste dans la litiere; surveillez votre chat et consultez votre veterinaire en cas de doute.',
      },
      {
        question: 'Comment cela se compare-t-il au bicarbonate?',
        answer: 'Le bicarbonate neutralise certains acides, alors que le charbon actif piege un spectre beaucoup plus large de molecules odorantes.',
      },
      {
        question: 'Est-ce que cela modifie les habitudes de litiere de mon chat?',
        answer: "Non, Purrify est inodore et ne modifie pas la texture de la litiere. La plupart des chats ne remarquent aucune difference.",
      },
    ],
  },
};


const SCIENCE_ICONS = [Microscope, Zap, Shield, Leaf];

export default function HowItWorksPageClient() {
  const locale = useLocale();
  const { currency } = useCurrency();

  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const copy = HOW_IT_WORKS_COPY[locale as SupportedLocale] || HOW_IT_WORKS_COPY.en;

  const trialPrice = formatProductPrice('trial', currency, locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || `${localePrefix}/products/trial-size`;
  const trialSizeCtaLabel = `${copy.trialPrefix} - ${trialPrice}`;

  const breadcrumbItems = [
    { name: copy.breadcrumbLearn, path: `${localePrefix}/learn` },
    { name: copy.breadcrumbCurrent, path: `${localePrefix}/learn/how-it-works` },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b border-gray-200 dark:border-gray-800">
        <Container>
          <nav aria-label={copy.breadcrumbAriaLabel} className="flex items-center space-x-2 text-sm">
            <Link
              href={localePrefix || '/'}
              aria-label={copy.breadcrumbHome}
              className="flex items-center justify-center min-h-11 min-w-11 p-2 text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            {breadcrumbItems.map((item, index, arr) => (
              <span key={item.path} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                {index === arr.length - 1 ? (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="inline-flex items-center min-h-11 px-2 text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Container>
      </section>

      {/* Hero Section */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
              {copy.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {copy.heroDescription}
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative">
                <Image
                  src="/optimized/marketing/micropores-magnified.webp"
                  alt={copy.heroImageAlt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white dark:text-gray-100 px-3 py-1 rounded-lg text-sm">
                  {copy.heroImageCaption}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Science Explanation */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {copy.scienceHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {copy.scienceSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {copy.sciencePoints.map((point, index) => {
              const Icon = SCIENCE_ICONS[index] || Microscope;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* Step-by-Step Usage */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {copy.usageHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {copy.usageSubheading}
            </p>
          </div>

          <div className="space-y-16">
            {copy.steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-gray-100 font-bold text-2xl">{step.number}</span>
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-[#E0EFC7]/50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      💡 <strong>{copy.proTipLabel}</strong> {step.tip}
                    </p>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                    <div className="relative">
                      <Image
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
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {copy.faqHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {copy.faqSubheading}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {copy.faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="font-heading text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
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
              {copy.faqPrompt}
            </p>
            <Link href={`${localePrefix}/contact`}>
              <Button size="lg" variant="outline">
                {copy.faqContactButton}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] rounded-3xl p-12 text-center text-white dark:text-gray-100">
            <h2 className="font-heading text-4xl font-bold mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {copy.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={trialCheckoutUrl}>
                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                  {trialSizeCtaLabel}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href={`${localePrefix}/#products`}>
                <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                  {copy.viewProductsButton}
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
            <Link href={`${localePrefix}/#how-it-works`}>
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {copy.backToHomepage}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <Container>
          <RelatedContent currentUrl="/learn/how-it-works" />
        </Container>
      </section>
    </main>
  );
}
