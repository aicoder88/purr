import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import { generateJSONLD } from '../../src/lib/seo-utils';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Award, Leaf, CheckCircle2, FileCheck, Home, ChevronRight } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import Image from 'next/image';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

export default function SafetyInformationPage() {
  const { locale } = useTranslation();

  const pageTitle = `${SITE_NAME} - Safety Information & Technical Specifications`;
  const pageDescription = "Comprehensive technical datasheet and safety information for Purrify™ Activated Carbon. Learn about certifications, specifications, and safe usage guidelines.";

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/learn/safety',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'activated carbon safety',
    schemaType: 'article',
    schemaData: {
      headline: pageTitle,
      description: pageDescription,
      datePublished: '2024-01-10T10:00:00Z',
      dateModified: new Date().toISOString(),
      image: 'https://www.purrify.ca/optimized/140g.webp',
      category: 'Product Safety & Specifications',
      wordCount: 2400,
    },
    image: 'https://www.purrify.ca/optimized/140g.webp',
    keywords: ['activated carbon safety', 'pet-safe deodorizer', 'food grade carbon', 'NSF certified', 'technical specifications'],
    includeBreadcrumb: true,
  });

  const specifications = [
    { property: "Iodine Number", value: "≥ 1000 mg/g" },
    { property: "Moisture (as packed)", value: "≤ 5%" },
    { property: "CTC Adsorption", value: "≥ 50%" },
    { property: "Ash Content", value: "≤ 4%" },
    { property: "Hardness", value: "≥ 98%" },
    { property: "Apparent Density", value: "~430–540 kg/m³" },
    { property: "BET Surface Area", value: "~1050 m²/g" }
  ];

  const features = [
    {
      icon: Leaf,
      title: "Ultra-Microporous Structure",
      description: "Superior adsorption of small molecules for maximum odor control"
    },
    {
      icon: ShieldCheck,
      title: "Exceptional Hardness",
      description: "Low attrition ensures long service life and consistent performance"
    },
    {
      icon: CheckCircle2,
      title: "Low Dust Content",
      description: "Clean to handle with minimal airborne particles"
    },
    {
      icon: Award,
      title: "Consistent Particle Sizing",
      description: "Predictable flow characteristics and minimal pressure drop"
    }
  ];

  const certifications = [
    "Meets NSF/ANSI 61 and AWWA B604 guidelines for potable water",
    "Food Chemicals Codex (FCC) compliant",
    "Halal & Kosher compliant",
    "Manufactured using sustainable coconut shells"
  ];

  const applications = [
    {
      text: "Odor elimination (cat litter additive, waste management, air treatment)",
      links: [
        { text: "apartment cat smell solution", href: "/learn/solutions/apartment-cat-smell-solution" },
        { text: "litter box smell elimination", href: "/learn/solutions/litter-box-smell-elimination" }
      ]
    },
    {
      text: "Multi-cat household odor control",
      links: [
        { text: "multiple cats odor control", href: "/learn/solutions/multiple-cats-odor-control" },
        { text: "how to use deodorizer", href: "/learn/how-to-use-deodorizer" }
      ]
    },
    {
      text: "Water purification and air filtration",
      links: [
        { text: "activated carbon benefits", href: "/learn/activated-carbon-benefits" },
        { text: "the science behind Purrify", href: "/learn/science" }
      ]
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
                <FileCheck className="w-8 h-8 text-white dark:text-gray-100" />
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
                Safety Information & Technical Datasheet
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Purrify™ Activated Carbon – Granular Coconut Shell Based Activated Carbon (8×30 mesh)
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                Premium granular activated carbon produced from sustainable coconut shell with highly microporous structure.
                The same type of activated carbon used in hospital water filters, municipal water treatment, and air purification systems.
                Learn more about <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/science`} className="text-[#FF3131] dark:text-[#FF5050] hover:underline font-semibold">how activated carbon works</Link>.
              </p>
            </div>

            {/* Hero Images */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/optimized/quality-control-lab.webp"
                  alt="Quality control laboratory testing for activated carbon"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="font-heading text-2xl font-bold mb-2">Laboratory-Tested Quality</h3>
                    <p className="text-lg opacity-90">Meets NSF/ANSI 61 and FCC standards</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/optimized/activated-carbon-granules.webp"
                  alt="Premium coconut shell activated carbon granules"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white dark:text-gray-100">
                    <h3 className="font-heading text-2xl font-bold mb-2">Premium Coconut Shell Carbon</h3>
                    <p className="text-lg opacity-90">8×30 mesh granular activated carbon</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features & Benefits */}
        <section className="py-16 bg-white dark:bg-gray-800/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Features & Benefits
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Engineered for high hardness, low dust, and consistent particle sizing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-6 border-l-4 border-green-600 dark:border-green-400">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Best Practices for Small Pet Environments:</h4>
              <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                When using Purrify™ activated carbon for rodent odor control (hamsters, mice, rats), keep it contained in sealed pouches or cartridges
                to minimize dust exposure and ensure proper ventilation. The carbon meets NSF/ANSI 61 and Food Chemicals Codex standards—
                the same guidelines used for potable water systems. Rinse thoroughly to remove any loose particles before placement.
                As with any pet product, observe your pet's behavior and discontinue use if any adverse reactions occur.
              </p>
            </div>
          </Container>
        </section>

        {/* Technical Specifications */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Typical Specifications
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Values shown are typical and for general reference only.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                For precise purchase specifications, contact Purrify technical support.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] text-white dark:text-gray-100">
                        <th className="px-6 py-4 text-left font-bold">Property</th>
                        <th className="px-6 py-4 text-left font-bold">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {specifications.map((spec, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {spec.property}
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-3">Available Particle Sizes</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  • <strong>8×30 mesh (2.36 – 0.60 mm)</strong> — standard size for odor and water applications
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  • Other mesh sizes available upon request
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-gradient-to-r from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-900 rounded-full mb-6">
                <Award className="w-8 h-8 text-[#5B2EFF]" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Certifications & Standards
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Purrify™ meets the highest safety and quality standards in the industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-start space-x-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {cert}
                  </p>
                </div>
              ))}
            </div>

            {/* Certification Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/optimized/certification-quality.webp"
                  alt="Quality certification and standards compliance"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/optimized/coconut-shell-natural.webp"
                  alt="Sustainable coconut shell natural material"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/optimized/safe-cat-litter.webp"
                  alt="Safe cat litter with activated carbon"
                  width={1600}
                  height={1067}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Applications */}
        <section className="py-16 bg-white dark:bg-gray-800/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Applications
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Versatile activated carbon for multiple use cases
              </p>
            </div>

            {/* Applications Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 max-w-5xl mx-auto">
              <Image
                src="/optimized/versatile-applications.webp"
                alt="Pet safety and home odor control with activated carbon"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-3xl font-bold mb-2">Multiple Applications</h3>
                  <p className="text-xl opacity-90">From cat litter to air purification—versatile odor control</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-200 text-lg mb-2">
                        {app.text}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {app.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            href={`${locale === 'fr' ? '/fr' : ''}${link.href}`}
                            className="text-sm text-[#FF3131] dark:text-[#FF5050] hover:underline"
                          >
                            → {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
              <h3 className="font-heading text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                Available Package Sizes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:border-[#FF3131] dark:hover:border-[#FF5050] h-full">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5050] mb-2">12g</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trial Size</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Perfect for testing with one cat</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 litter box change</p>
                    </div>
                  </div>
                </Link>

                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/standard`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-[#FF3131] dark:border-[#FF5050] h-full relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF3131] dark:bg-[#FF5050] text-white dark:text-gray-100 text-xs px-3 py-1 rounded-full font-bold">
                      MOST POPULAR
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5050] mb-2">50g</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Standard Size</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Ideal for single-cat homes</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 month supply</p>
                    </div>
                  </div>
                </Link>

                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/family-pack`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:border-[#5B2EFF] dark:hover:border-[#5B2EFF] h-full">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#5B2EFF] mb-2">120g</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Family Pack</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Best value for multi-cat homes</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 months supply</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="text-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products`}>
                  <Button size="lg" className="bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] hover:from-[#FF3131]/90 hover:to-[#5B2EFF]/90 text-white dark:text-gray-100 font-bold">
                    Compare All Sizes
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Description Section */}
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900/50 rounded-2xl p-10 shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Product Description
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200">
                  <p className="mb-4 leading-relaxed">
                    Purrify™ Activated Carbon is a premium granular activated carbon produced from sustainable coconut shell.
                    Its highly microporous structure provides exceptional surface area and adsorption capacity, making it ideal
                    for removing low molecular weight organic compounds, chlorine, ozone, and odor-causing molecules from cat
                    litter environments, air filtration, and water purification.
                  </p>
                  <p className="leading-relaxed">
                    This carbon is engineered for high hardness, low dust, and consistent particle sizing, ensuring clean handling,
                    long service life, and excellent performance across a wide range of applications.
                  </p>
                </div>
              </div>

              {/* Rodent-Friendly */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-10 shadow-xl border border-green-200 dark:border-green-700">
                {/* Rodent Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                  <Image
                    src="/optimized/hamster-rodent-pet.webp"
                    alt="Hamster and small pet rodent care with activated carbon"
                    width={1600}
                    height={1067}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-8 text-white dark:text-gray-100">
                      <h3 className="font-heading text-2xl font-bold mb-2">Small Pet Odor Control</h3>
                      <p className="text-lg opacity-90">Hospital-grade carbon suitable for rodent environments</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white dark:text-gray-100" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
                      Rodent-Friendly Odor Control
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                      Using Purrify™ with hamsters, mice, rats, and other small pets
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200">
                  <p className="mb-4 leading-relaxed font-semibold text-green-800 dark:text-green-200">
                    Purrify™ uses the same type of coconut-shell activated carbon found in hospital water systems, municipal water treatment,
                    and veterinary applications. With proper handling and precautions, it can be suitable for odor control in small pet environments.
                  </p>

                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Product Characteristics</h3>
                  <ul className="space-y-2 mb-6">
                    <li><strong>Pure carbon:</strong> Steam-activated coconut shell carbon with no chemical activators or binders
                      (no phosphoric acid, no zinc chloride).</li>
                    <li><strong>Industry standards:</strong> Meets NSF/ANSI 61, AWWA B604, and Food Chemicals Codex (FCC) guidelines—
                      the same standards used for potable water and food-adjacent applications.</li>
                    <li><strong>Low dust:</strong> Heavy de-dusting process and high hardness minimize airborne particles.</li>
                    <li><strong>Hospital-grade carbon:</strong> The same type of activated carbon used in medical water filtration systems
                      and veterinary applications.</li>
                  </ul>

                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-3">Practical Cautions</h3>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️</span>
                        <div>
                          <strong className="text-gray-900 dark:text-white">Inhalation:</strong>
                          <span className="text-gray-700 dark:text-gray-200"> Fine dust can irritate lungs if animals burrow or chew bags.
                            Keep bags out of your rodent's reach. Some dust may settle during shipping—if the bag looks dusty, either remove your pet
                            from the cage for a few minutes while applying, or give the carbon a quick rinse and air-dry before use.</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️</span>
                        <div>
                          <strong className="text-gray-900 dark:text-white">Ingestion:</strong>
                          <span className="text-gray-700 dark:text-gray-200"> Small incidental ingestion isn't toxic, but continuous chewing
                            can cause GI upset or blockages.</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️</span>
                        <div>
                          <strong className="text-gray-900 dark:text-white">Housing use:</strong>
                          <span className="text-gray-700 dark:text-gray-200"> Safe if in a container (filter box, pouch) that rodents
                            can't chew through. Avoid loose piles they can dig into and inhale.</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️</span>
                        <div>
                          <strong className="text-gray-900 dark:text-white">Moisture:</strong>
                          <span className="text-gray-700 dark:text-gray-200"> Carbon will adsorb odors and moisture — keep dry
                            to avoid mold growth.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-700">
                    <div className="flex items-start space-x-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-white">Additional Benefits</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                          <li>• Rapid chlorine and ozone removal</li>
                          <li>• Excellent odor reduction performance</li>
                          <li>• Clean handling and minimal pressure drop</li>
                          <li>• Safe for pets and household use</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/learn/safety" />
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
              Back to Learn
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
