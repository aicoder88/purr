import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import NextImage from '../../components/NextImage';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users } from 'lucide-react';
import { ComprehensiveStructuredData, useStructuredData } from '../../src/components/seo/comprehensive-structured-data';
import { ProductSchema } from '../../src/components/seo/json-ld-schema';

export default function TrialSizePage() {
  const { t, locale } = useTranslation();
  const { generateBreadcrumbs, generateProductData } = useStructuredData();
  
  const pageTitle = `${SITE_NAME} Trial Size - 17g Activated Carbon Cat Litter Additive`;
  const pageDescription = "Try Purrify risk-free with our 17g trial size. Perfect for one litter box change. See why thousands of cat owners love Purrify's odor elimination power.";
  const canonicalUrl = `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/products/trial-size`;
  
  // Generate structured data for this product
  const productData = generateProductData('purrify-17g');
  const breadcrumbs = generateBreadcrumbs('/products/trial-size');

  const benefits = [
    "Perfect for testing with your cat",
    "Enough for one complete litter box change",
    "Risk-free way to experience Purrify",
    "Same powerful formula as full-size products",
    "Fast shipping - try it this week"
  ];

  const testimonials = [
    {
      name: "Fatima R., Côte-des-Neiges",
      text: "Started with the 17g trial for my kitten Ziggy. Worked so well I immediately ordered the 60g! No more embarrassing smells when friends come over.",
      rating: 5,
      petName: "Ziggy"
    },
    {
      name: "Zara K., Plateau", 
      text: "My rescue cat Biscuit is super picky about litter changes, but with Purrify I can keep his box fresh way longer. The trial size was perfect to test it out first.",
      rating: 5,
      petName: "Biscuit"
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
          type: 'product',
          images: [
            {
              url: 'https://purrify.ca/purrify-trial-17g.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify 17g Trial Size Package'
            }
          ]
        }}
      />
      
      {/* Comprehensive Product Structured Data */}
      <ComprehensiveStructuredData 
        pageType="product" 
        pageData={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          product: productData || undefined,
          breadcrumbs: breadcrumbs
        }}
      />
      
      {/* Advanced JSON-LD Schema for Product */}
      <ProductSchema productId='purrify-17g' locale={locale as 'en' | 'fr' | 'zh'} />

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
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Trial Size</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <NextImage
                    src="/optimized/20g.webp"
                    alt="Purrify 17g Trial Size"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-[#FF3131] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    TRIAL SIZE
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    Purrify Trial Size
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-2">
                    17g Activated Carbon Cat Litter Additive
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300 dark:text-yellow-300" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">(127 reviews)</span>
                  </div>
                  <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-6">
                    $6.99 CAD
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#03E46A] flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy Trial Size Now
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Heart className="w-5 h-5 mr-2" />
                      Add to Wishlist
                    </Button>
                    <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`}>
                      <Button variant="outline" size="lg" className="flex-1">
                        <Users className="w-5 h-5 mr-2" />
                        Read Reviews
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="border-t pt-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Free shipping on orders over $25
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Ships within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                How Trial Size Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
                Perfect for first-time users who want to test Purrify's effectiveness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50 dark:text-gray-100">Order Trial</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get your 17g trial size delivered to your door
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50 dark:text-gray-100">Test & Experience</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use for one complete litter box change and see the difference
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50 dark:text-gray-100">Love It & Reorder</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of satisfied customers with a full-size order
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}>
                <Button variant="outline" size="lg">
                  Learn More About How Purrify Works
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                What Trial Users Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">- {testimonial.name}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`}>
                <Button variant="outline" size="lg">
                  Read All Customer Stories
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Ready for More?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300">
                Upgrade to our full-size products for ongoing odor control
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50 dark:text-gray-100">Regular Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">60g - Perfect for regular use</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">$19.99</div>
                <Button className="w-full">View Regular Size</Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50 dark:text-gray-100">Large Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">120g - Best value for multiple cats</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">$29.99</div>
                <Button className="w-full">View Large Size</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to All Products
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
