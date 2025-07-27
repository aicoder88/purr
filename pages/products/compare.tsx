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
  DollarSign, 
  Users,
  ChevronRight,
  Home,
  Star,
  Award,
  Zap
} from 'lucide-react';

const ProductComparePage: NextPage = () => {
  const { t, locale } = useTranslation();

  const products = [
    {
      id: 'trial',
      name: '17g Trial Size',
      subtitle: 'Perfect for First-Time Users',
      price: '$6.99',
      originalPrice: null,
      savings: null,
      duration: '1 litter box change',
      cats: '1 cat',
      features: [
        'Try before you commit',
        'Risk-free introduction',
        'Perfect portion size',
        'Same powerful formula',
        'Money-back guarantee'
      ],
      bestFor: 'New customers who want to test Purrify',
      popular: false,
      recommended: false,
      cta: 'Start Your Trial',
      ctaLink: '/products/trial-size',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'small',
      name: '60g Regular Size',
      subtitle: 'Great for Single Cat Households',
      price: '$19.99',
      originalPrice: '$22.99',
      savings: '$3.00',
      duration: '3-4 litter box changes',
      cats: '1 cat',
      features: [
        'Economical choice',
        'Extends litter life 3-4x',
        'Eliminates odors completely',
        'Works with any litter',
        'Eco-friendly formula'
      ],
      bestFor: 'Single cat owners looking for value',
      popular: true,
      recommended: false,
      cta: 'Choose Small Size',
      ctaLink: '/#products',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'large',
      name: '120g Large Size',
      subtitle: 'Best Value for Multi-Cat Homes',
      price: '$29.99',
      originalPrice: '$34.99',
      savings: '$5.00',
      duration: '8-10 litter box changes',
      cats: '2-3 cats',
      features: [
        'Maximum value per gram',
        'Bulk savings included',
        'Perfect for multiple cats',
        'Long-lasting supply',
        'Free shipping included'
      ],
      bestFor: 'Multi-cat households seeking maximum value',
      popular: false,
      recommended: true,
      cta: 'Get Best Value',
      ctaLink: '/#products',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const comparisonFeatures = [
    {
      feature: 'Odor Elimination',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Works with Any Litter',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Extends Litter Life',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Money-Back Guarantee',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Free Shipping',
      trial: false,
      small: false,
      large: true
    },
    {
      feature: 'Bulk Savings',
      trial: false,
      small: true,
      large: true
    },
    {
      feature: 'Multi-Cat Suitable',
      trial: false,
      small: true,
      large: true
    }
  ];

  const usageCalculator = [
    {
      cats: 1,
      litterChanges: 'Weekly',
      trial: '1 week',
      small: '3-4 weeks',
      large: '8-10 weeks'
    },
    {
      cats: 2,
      litterChanges: '2x per week',
      trial: '3-4 days',
      small: '1.5-2 weeks',
      large: '4-5 weeks'
    },
    {
      cats: 3,
      litterChanges: '3x per week',
      trial: '2-3 days',
      small: '1 week',
      large: '2.5-3 weeks'
    }
  ];

  return (
    <>
      <Head>
        <title>Compare Purrify Products - Find the Perfect Size for Your Needs | Purrify</title>
        <meta 
          name="description" 
          content="Compare all Purrify activated carbon litter additive sizes. Find the perfect option for your household - from trial size to bulk savings for multi-cat homes." 
        />
        <meta name="keywords" content="Purrify comparison, cat litter additive sizes, trial size, bulk savings, multi-cat, product comparison" />
        <link rel="canonical" href={`https://purrify.com${locale === 'fr' ? '/fr' : ''}/products/compare`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Compare Purrify Products - Find the Perfect Size" />
        <meta property="og:description" content="Compare all Purrify sizes and find the perfect activated carbon litter additive for your household needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://purrify.com${locale === 'fr' ? '/fr' : ''}/products/compare`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Compare Purrify Products",
              "description": "Compare all Purrify activated carbon litter additive sizes and find the perfect option for your household.",
              "url": `https://purrify.com${locale === 'fr' ? '/fr' : ''}/products/compare`,
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
                    "priceCurrency": "USD"
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
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Products
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Compare</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-4xl mx-auto">
              <Package className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Compare Purrify Products
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Find the perfect size for your household - from trial to bulk savings
              </p>
            </div>
          </Container>
        </section>

        {/* Product Comparison Cards */}
        <section className="py-16">
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
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </div>
                  )}
                  
                  {/* Recommended Badge */}
                  {product.recommended && (
                    <div className="absolute top-4 right-4 bg-[#FF3131] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Best Value
                    </div>
                  )}

                  {/* Header */}
                  <div className={`bg-gradient-to-r ${product.color} p-6 text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
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
                        <p className="text-sm text-gray-600 dark:text-gray-300">Duration</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.duration}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-[#5B2EFF]" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Best For</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.cats}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="mb-6 p-4 bg-[#E0EFC7]/30 dark:bg-gray-700/30 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Best for:</span> {product.bestFor}
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
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Feature Comparison
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See how our products compare side by side
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#5B2EFF] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Feature</th>
                      <th className="px-6 py-4 text-center font-bold">17g Trial</th>
                      <th className="px-6 py-4 text-center font-bold">60g Regular</th>
                      <th className="px-6 py-4 text-center font-bold">120g Large</th>
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
                            <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.small ? (
                            <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.large ? (
                            <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
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
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                How Long Will Each Size Last?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Estimate duration based on your household size
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Number of Cats</th>
                      <th className="px-6 py-4 text-center font-bold">Typical Changes</th>
                      <th className="px-6 py-4 text-center font-bold">17g Trial</th>
                      <th className="px-6 py-4 text-center font-bold">60g Regular</th>
                      <th className="px-6 py-4 text-center font-bold">120g Large</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageCalculator.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-bold text-[#5B2EFF]">
                          {row.cats} Cat{row.cats > 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {row.litterChanges}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.trial}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.small}
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
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <Zap className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Still Not Sure Which Size to Choose?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with our risk-free trial size and experience the Purrify difference for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Try Risk-Free - $6.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
                    Get Personal Advice
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Learn More About Purrify
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Discover the science behind our activated carbon technology and why it's so effective.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Customer Reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    See what thousands of satisfied customers are saying about their Purrify experience.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/cat-litter-guide`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Cat Litter Guide
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn about different litter types and how to choose the best option for your cat.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default ProductComparePage;
