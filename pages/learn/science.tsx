import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { useCurrency } from '../../src/lib/currency-context';
import { formatProductPrice } from '../../src/lib/pricing';
import { generateJSONLD } from '../../src/lib/seo-utils';
import Link from 'next/link';
import { ArrowLeft, Atom, Zap, Shield, Microscope, FlaskConical, BarChart3, Home, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

export default function SciencePage() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();

  const pageTitle = t.sciencePage?.seo.title || "";
  const pageDescription = t.sciencePage?.seo.description || "";

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/learn/science',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'activated carbon science',
    schemaType: 'article',
    schemaData: {
      headline: pageTitle,
      description: pageDescription,
      datePublished: '2024-01-15T10:00:00Z',
      dateModified: new Date().toISOString(),
      image: 'https://www.purrify.ca/optimized/benefits-hero-science.webp',
      category: 'Pet Care Science',
      wordCount: 3200,
    },
    image: 'https://www.purrify.ca/optimized/benefits-hero-science.webp',
    keywords: ['activated carbon science', 'cat litter odor control', 'micropores', 'ammonia elimination', 'mercaptan removal'],
    includeBreadcrumb: true,
  });

  const scienceFacts = t.sciencePage?.scienceFacts.facts.map((fact, index) => ({
    icon: [Atom, Microscope, Zap, Shield][index],
    title: fact.title,
    description: fact.description
  })) || [
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

  const processSteps = t.sciencePage?.processTimeline.steps.map((step, index) => ({
    step: String(index + 1),
    title: step.title,
    description: step.description
  })) || [
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
      <NextSeo {...nextSeoProps} />

      {/* Auto-generated Article Schema */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJSONLD(schema) }}
        />
      )}

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href={locale === 'fr' ? '/fr' : '/'}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
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
        <section className="py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full mb-6">
                <FlaskConical className="w-8 h-8 text-white dark:text-gray-100" />
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
                {t.sciencePage?.hero.heading || ""}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t.sciencePage?.hero.description || ""}
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                <Button size="lg" className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  {`${t.sciencePage?.hero.ctaButton || ""} - ${formatProductPrice('trial', locale)}`}
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Understanding the Enemy */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.sciencePage?.understanding.sectionTitle || ""}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.sciencePage?.understanding.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-red-200 dark:border-red-900">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                    <span className="text-3xl">💧</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.sciencePage?.understanding.ammonia.title || ""}</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 font-semibold">{t.sciencePage?.understanding.ammonia.subtitle || ""}</p>
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 dark:text-red-400 mt-1">•</span>
                    <span><strong>The Smell:</strong> {t.sciencePage?.understanding.ammonia.smell || ""}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 dark:text-red-400 mt-1">•</span>
                    <span><strong>Molecule Size:</strong> {t.sciencePage?.understanding.ammonia.moleculeSize || ""}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 dark:text-red-400 mt-1">•</span>
                    <span><strong>The Problem:</strong> {t.sciencePage?.understanding.ammonia.problem || ""}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-500 dark:text-red-400 mt-1">•</span>
                    <span><strong>Why It's Hard:</strong> {t.sciencePage?.understanding.ammonia.whyHard || ""}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-yellow-200 dark:border-yellow-900">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
                    <span className="text-3xl">💩</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.sciencePage?.understanding.mercaptans.title || ""}</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">{t.sciencePage?.understanding.mercaptans.subtitle || ""}</p>
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                    <span><strong>The Smell:</strong> {t.sciencePage?.understanding.mercaptans.smell || ""}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                    <span><strong>Molecule Size:</strong> {t.sciencePage?.understanding.mercaptans.moleculeSize || ""}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                    <span><strong>The Problem:</strong> {t.sciencePage?.understanding.mercaptans.problem || ""}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 dark:text-yellow-400 mt-1">•</span>
                    <span><strong>Why It's Hard:</strong> {t.sciencePage?.understanding.mercaptans.whyHard || ""}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                {t.sciencePage?.understanding.breakthrough || ""}
              </p>
            </div>

            {/* Visual Images - Happy Cat */}
            <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/optimized/happy-cat-fresh-home.webp"
                  alt="Happy cat in clean, fresh home environment"
                  width={1600}
                  height={900}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="font-heading text-2xl font-bold mb-2">{t.sciencePage?.imageCaptions.freshHome.title || ""}</h3>
                    <p className="text-lg opacity-90">{t.sciencePage?.imageCaptions.freshHome.description || ""}</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/optimized/content-cat-owner.webp"
                  alt="Content cat enjoying clean, odor-free environment"
                  width={1600}
                  height={900}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="font-heading text-2xl font-bold mb-2">{t.sciencePage?.imageCaptions.noOdors.title || ""}</h3>
                    <p className="text-lg opacity-90">{t.sciencePage?.imageCaptions.noOdors.description || ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Pore Size Visualization */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
          <Container>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <BarChart3 className="w-8 h-8 text-white dark:text-gray-100" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.sciencePage?.poreSize.sectionTitle || ""}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.sciencePage?.poreSize.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-blue-200 dark:border-blue-800">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{t.sciencePage?.poreSize.micropores.size || ""}</div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">{t.sciencePage?.poreSize.micropores.title || ""}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.sciencePage?.poreSize.micropores.specialist || ""}</p>
                </div>
                <div className="space-y-3 text-gray-700 dark:text-gray-200">
                  <p><strong>Target:</strong> {t.sciencePage?.poreSize.micropores.target || ""}</p>
                  <p><strong>Density:</strong> {t.sciencePage?.poreSize.micropores.density || ""}</p>
                  <p><strong>Function:</strong> {t.sciencePage?.poreSize.micropores.function || ""}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-purple-200 dark:border-purple-800">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{t.sciencePage?.poreSize.mesopores.size || ""}</div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">{t.sciencePage?.poreSize.mesopores.title || ""}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.sciencePage?.poreSize.mesopores.specialist || ""}</p>
                </div>
                <div className="space-y-3 text-gray-700 dark:text-gray-200">
                  <p><strong>Target:</strong> {t.sciencePage?.poreSize.mesopores.target || ""}</p>
                  <p><strong>Density:</strong> {t.sciencePage?.poreSize.mesopores.density || ""}</p>
                  <p><strong>Function:</strong> {t.sciencePage?.poreSize.mesopores.function || ""}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-indigo-200 dark:border-indigo-800">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{t.sciencePage?.poreSize.macropores.size || ""}</div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">{t.sciencePage?.poreSize.macropores.title || ""}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.sciencePage?.poreSize.macropores.specialist || ""}</p>
                </div>
                <div className="space-y-3 text-gray-700 dark:text-gray-200">
                  <p><strong>Target:</strong> {t.sciencePage?.poreSize.macropores.target || ""}</p>
                  <p><strong>Density:</strong> {t.sciencePage?.poreSize.macropores.density || ""}</p>
                  <p><strong>Function:</strong> {t.sciencePage?.poreSize.macropores.function || ""}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {t.sciencePage?.poreSize.surfaceArea.title || ""}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-lg">
                {t.sciencePage?.poreSize.surfaceArea.description || ""}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">≥1000</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Iodine Number mg/g</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">≥50%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">CTC Adsorption</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">≥98%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Hardness</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">≤5%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Moisture</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Science Facts Grid */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.sciencePage?.scienceFacts.sectionTitle || ""}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.sciencePage?.scienceFacts.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {scienceFacts.map((fact) => (
                <div
                  key={fact.title}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-lg flex items-center justify-center">
                        <fact.icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-white">
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

            {/* Microscopic View Visualization */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/optimized/science-microscope-research.webp"
                      alt="Laboratory microscope for activated carbon research"
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white dark:text-gray-100 text-sm font-medium">{t.sciencePage?.microscopicView.imageCaptions.microscope || ""}</p>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/optimized/chemistry-lab-testing.webp"
                      alt="Chemistry laboratory testing activated carbon samples"
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white dark:text-gray-100 text-sm font-medium">{t.sciencePage?.microscopicView.imageCaptions.labTesting || ""}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/optimized/molecular-structure-pore.webp"
                      alt="Molecular structure visualization showing pore architecture"
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white dark:text-gray-100 text-sm font-medium">{t.sciencePage?.microscopicView.imageCaptions.molecular || ""}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-[#FF3131]/20 dark:to-[#5B2EFF]/20 rounded-2xl p-6 border border-[#FF3131]/20 dark:border-[#5B2EFF]/30">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {t.sciencePage?.microscopicView.whatYoureLookingAt.title || ""}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                      {t.sciencePage?.microscopicView.whatYoureLookingAt.description || ""}
                    </p>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                      <li className="flex items-start space-x-2">
                        <span className="text-[#FF3131] mt-1">→</span>
                        <span>{t.sciencePage?.microscopicView.whatYoureLookingAt.bullets?.[0] || ""}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#5B2EFF] mt-1">→</span>
                        <span>{t.sciencePage?.microscopicView.whatYoureLookingAt.bullets?.[1] || ""}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#FF3131] mt-1">→</span>
                        <span>{t.sciencePage?.microscopicView.whatYoureLookingAt.bullets?.[2] || ""}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-200 italic">
                      {t.sciencePage?.microscopicView.quote.text || ""}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">{t.sciencePage?.microscopicView.quote.attribution || ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Technical Performance Data */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.sciencePage?.technicalPerformance.sectionTitle || ""}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.sciencePage?.technicalPerformance.description || ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Particle Size Data */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </span>
                  {t.sciencePage?.technicalPerformance.particleSize.title || ""}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Effective Size:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{t.sciencePage?.technicalPerformance.particleSize.effectiveSize || ""}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Mean Diameter:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{t.sciencePage?.technicalPerformance.particleSize.meanDiameter || ""}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Uniformity Coefficient:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{t.sciencePage?.technicalPerformance.particleSize.uniformityCoefficient || ""}</span>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>Why this matters:</strong> {t.sciencePage?.technicalPerformance.particleSize.whyMatters || ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Adsorption Performance */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </span>
                  {t.sciencePage?.technicalPerformance.adsorption.title || ""}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Half-Length Value:</span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{t.sciencePage?.technicalPerformance.adsorption.halfLength || ""}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Apparent Density:</span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{t.sciencePage?.technicalPerformance.adsorption.apparentDensity || ""}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">BET Surface Area:</span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{t.sciencePage?.technicalPerformance.adsorption.betSurface || ""}</span>
                  </div>
                  <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <strong>Why this matters:</strong> {t.sciencePage?.technicalPerformance.adsorption.whyMatters || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pressure Loss & Bed Expansion Note */}
            <div className="mt-12 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t.sciencePage?.engineeredPerformance.title || ""}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                    {t.sciencePage?.engineeredPerformance.description || ""}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{t.sciencePage?.engineeredPerformance.stats.temperatureRange || ""}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{t.sciencePage?.engineeredPerformance.stats.temperatureLabel || ""}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Stable</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{t.sciencePage?.engineeredPerformance.stats.performanceLabel || ""}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Minimal</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{t.sciencePage?.engineeredPerformance.stats.pressureLossLabel || ""}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Process Timeline */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t.sciencePage?.processTimeline.sectionTitle || ""}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t.sciencePage?.processTimeline.description || ""}
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF3131] to-[#5B2EFF] rounded-full hidden md:block"></div>

              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <div
                    key={step.step}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-white">
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {t.sciencePage?.researchSection.title || ""}
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                {t.sciencePage?.researchSection.description || ""}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{t.sciencePage?.researchSection.stats.ammoniaSize || ""}</div>
                  <div className="text-lg opacity-90">{t.sciencePage?.researchSection.stats.ammoniaSizeLabel || ""}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{t.sciencePage?.researchSection.stats.poreTypes || ""}</div>
                  <div className="text-lg opacity-90">{t.sciencePage?.researchSection.stats.poreTypesLabel || ""}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{t.sciencePage?.researchSection.stats.surfaceArea || ""}</div>
                  <div className="text-lg opacity-90">{t.sciencePage?.researchSection.stats.surfaceAreaLabel || ""}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    {t.sciencePage?.researchSection.buttons.experience || ""}
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-white dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#5B2EFF] transition-colors">
                    {t.sciencePage?.researchSection.buttons.learnMore || ""}
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
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.sciencePage?.backToLearn || ""}
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
