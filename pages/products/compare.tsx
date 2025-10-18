import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { 
  CheckCircle, 
  Package, 
  Clock, 
  // DollarSign, 
  Users,
  ChevronRight,
  Home,
  Star,
  Award,
  Zap
} from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { buildAvailabilityUrl, getPriceValidityDate } from '../../src/lib/seo-utils';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../src/lib/pricing';

const ProductComparePage: NextPage = () => {
  const { locale, t } = useTranslation();

  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const standardPriceAmount = getProductPrice('standard');
  const familyPriceAmount = getProductPrice('family');

  const priceDetails = {
    trial: {
      price: trialPrice,
      originalPrice: null as string | null,
      savings: null as string | null,
    },
    standard: {
      price: standardPrice,
      originalPrice: formatCurrencyValue(standardPriceAmount + 3, locale),
      savings: formatCurrencyValue(3, locale),
    },
    large: {
      price: familyPrice,
      originalPrice: formatCurrencyValue(familyPriceAmount + 5, locale),
      savings: formatCurrencyValue(5, locale),
    },
  } as const;

  const products = t.productComparison.products.map((product) => ({
    ...product,
    price: priceDetails[product.id as 'trial' | 'standard' | 'large'].price,
    originalPrice: priceDetails[product.id as 'trial' | 'standard' | 'large'].originalPrice,
    savings: priceDetails[product.id as 'trial' | 'standard' | 'large'].savings,
    popular: product.id === 'standard',
    recommended: product.id === 'large',
    ctaLink: product.id === 'trial' ? '/products/trial-size' : '/#products',
    color: product.id === 'trial' ? 'from-blue-500 to-blue-600' : product.id === 'standard' ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600'
  }));

  const comparisonFeatures = t.productComparison.comparisonFeatures.map((item, index) => ({
    feature: item.feature,
    trial: index < 4,
    standard: index === 0 || index === 1 || index === 2 || index === 3 || index === 5 || index === 6,
    large: true
  }));

  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  const usageCalculator = [
    {
      cats: 1,
      litterChanges: locale === 'fr' ? 'Hebdomadaire' : locale === 'zh' ? '每周' : 'Weekly',
      trial: locale === 'fr' ? '1 semaine' : locale === 'zh' ? '1周' : '1 week',
      standard: locale === 'fr' ? '3-4 semaines' : locale === 'zh' ? '3-4周' : '3-4 weeks',
      large: locale === 'fr' ? '8-10 semaines' : locale === 'zh' ? '8-10周' : '8-10 weeks'
    },
    {
      cats: 2,
      litterChanges: locale === 'fr' ? '2x par semaine' : locale === 'zh' ? '每周2次' : '2x per week',
      trial: locale === 'fr' ? '3-4 jours' : locale === 'zh' ? '3-4天' : '3-4 days',
      standard: locale === 'fr' ? '1,5-2 semaines' : locale === 'zh' ? '1.5-2周' : '1.5-2 weeks',
      large: locale === 'fr' ? '4-5 semaines' : locale === 'zh' ? '4-5周' : '4-5 weeks'
    },
    {
      cats: 3,
      litterChanges: locale === 'fr' ? '3x par semaine' : locale === 'zh' ? '每周3次' : '3x per week',
      trial: locale === 'fr' ? '2-3 jours' : locale === 'zh' ? '2-3天' : '2-3 days',
      standard: locale === 'fr' ? '1 semaine' : locale === 'zh' ? '1周' : '1 week',
      large: locale === 'fr' ? '2,5-3 semaines' : locale === 'zh' ? '2.5-3周' : '2.5-3 weeks'
    }
  ];

  return (
    <>
      <Head>
        <title>{`${t.productComparison.title} - ${locale === 'fr' ? 'Trouvez la Taille Parfaite' : locale === 'zh' ? '找到完美尺寸' : 'Find the Perfect Size'} | Purrify`}</title>
        <meta 
          name="description" 
          content={t.productComparison.subtitle} 
        />
        <meta name="keywords" content="Purrify comparison, cat litter additive sizes, trial size, bulk savings, multi-cat, product comparison" />
        <link rel="canonical" href={`https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/compare`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Compare Purrify Products - Find the Perfect Size" />
        <meta property="og:description" content="Compare all Purrify sizes and find the perfect activated carbon litter additive for your household needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/compare`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Compare Purrify Products",
              "description": "Compare all Purrify activated carbon litter additive sizes and find the perfect option for your household.",
              "url": `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/compare`,
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": products.map((product, index) => ({
                  "@type": "Product",
                  "position": index + 1,
                  "name": product.name,
                  "description": product.subtitle,
                  "offers": {
                    "@type": "Offer",
                    "price": product.price.replace('$', ''),
                    "priceCurrency": "USD",
                    "priceValidUntil": priceValidUntil,
                    "availability": availabilityUrl
                  }
                }))
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">
              <Link href={locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/#products`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                {t.nav.products}
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-50 dark:text-gray-100">{t.nav.compareSizes}</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <Package className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.productComparison.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {t.productComparison.subtitle}
              </p>
            </div>
          </Container>
        </section>

        {/* Product Comparison Cards */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 ${
                    product.recommended 
                      ? 'border-[#FF3131] dark:border-[#FF5050]' 
                      : 'border-[#E0EFC7] dark:border-gray-700'
                  } overflow-hidden transform hover:scale-105 transition-transform duration-300`}
                >
                  {/* Popular Badge */}
                  {product.popular && (
                    <div className="absolute top-4 right-4 bg-green-500 dark:bg-green-600 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {t.productComparison.popular}
                    </div>
                  )}
                  
                  {/* Recommended Badge */}
                  {product.recommended && (
                    <div className="absolute top-4 right-4 bg-[#FF3131] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {t.productComparison.bestValue}
                    </div>
                  )}

                  {/* Header */}
                  <div className={`bg-gradient-to-r ${product.color} p-6 text-white`}>
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <p className="opacity-90 mb-4">{product.subtitle}</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-lg line-through opacity-70">{product.originalPrice}</span>
                      )}
                    </div>
                    {product.savings && (
                      <p className="text-sm mt-1 opacity-90">Save {product.savings}</p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-[#5B2EFF]" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">{t.productComparison.duration}</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.duration}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-[#5B2EFF]" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">{t.productComparison.idealFor}</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.cats}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="font-bold mb-3 text-gray-900 dark:text-gray-100">{t.productComparison.features}:</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 dark:text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="mb-6 p-4 bg-[#E0EFC7]/30 dark:bg-gray-700/30 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">{t.productComparison.idealFor}:</span> {product.bestFor}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link href={`${locale === 'fr' ? '/fr' : ''}${product.ctaLink}`}>
                      <Button 
                        size="lg" 
                        className={`w-full ${
                          product.recommended 
                            ? 'bg-[#FF3131] hover:bg-[#FF3131]/90 text-white' 
                            : 'bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white'
                        }`}
                      >
                        {product.cta}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t.productComparison.featuresComparison}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t.productComparison.seeHowProductsCompare}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#5B2EFF] text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">{locale === 'fr' ? 'Caractéristique' : locale === 'zh' ? '特性' : 'Feature'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Essai 12g' : locale === 'zh' ? '12g 试用' : '12g Trial'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Moyen 50g' : locale === 'zh' ? '50g 标准' : '50g Regular'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Grand 120g' : locale === 'zh' ? '120g 大号' : '120g Large'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.trial ? (
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 dark:text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.standard ? (
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 dark:text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.large ? (
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 dark:text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* Usage Calculator */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t.productComparison.howLongWillEachSizeLast}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t.productComparison.usageCalculator.subtitle}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">{t.productComparison.usageCalculator.numberOfCats}</th>
                      <th className="px-6 py-4 text-center font-bold">{t.productComparison.usageCalculator.typicalChanges}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Essai 12g' : locale === 'zh' ? '12g 试用' : '12g Trial'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Moyen 50g' : locale === 'zh' ? '50g 标准' : '50g Regular'}</th>
                      <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Grand 120g' : locale === 'zh' ? '120g 大号' : '120g Large'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageCalculator.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-bold text-[#5B2EFF]">
                          {row.cats} {locale === 'fr' ? `Chat${row.cats > 1 ? 's' : ''}` : locale === 'zh' ? '只猫' : `Cat${row.cats > 1 ? 's' : ''}`}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {row.litterChanges}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.trial}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.standard}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.large}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131] cv-auto cis-720">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <Zap className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.productComparison.stillUnsure}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {locale === 'fr' ? 'Commencez avec notre taille d\'essai sans risque et découvrez la différence Purrify par vous-même.' : locale === 'zh' ? '从我们的无风险试用装开始，亲身体验 Purrify 的不同。' : 'Start with our risk-free trial size and experience the Purrify difference for yourself.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    {t.productComparison.tryRiskFree}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/support/contact`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                    {t.productComparison.getPersonalizedAdvice}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {t.productComparison.learnMoreAboutPurrify}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    {t.nav.howItWorksPage}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'fr' ? 'Découvrez la science derrière notre technologie au charbon actif et pourquoi elle est si efficace.' : locale === 'zh' ? '发现我们活性炭技术背后的科学及其如此有效的原因。' : 'Discover the science behind our activated carbon technology and why it\'s so effective.'}
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    {locale === 'fr' ? 'Avis Clients' : locale === 'zh' ? '客户评价' : 'Customer Reviews'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'fr' ? 'Voyez ce que 1 000+ clients satisfaits disent de leur expérience avec Purrify.' : locale === 'zh' ? '看看 1,000+ 名满意客户对他们的 Purrify 体验的评价。' : 'See what 1,000+ satisfied customers are saying about their Purrify experience.'}
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}/learn/cat-litter-guide`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    {locale === 'fr' ? 'Guide de Litière' : locale === 'zh' ? '猫砂指南' : 'Cat Litter Guide'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {locale === 'fr' ? 'Apprenez sur les différents types de litière et comment choisir la meilleure option pour votre chat.' : locale === 'zh' ? '了解不同类型的猫砂，以及如何为您的猫咪选择最佳选项。' : 'Learn about different litter types and how to choose the best option for your cat.'}
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/compare" />
          </Container>
        </section>
      </main>
    </>
  );
};

export default ProductComparePage;
