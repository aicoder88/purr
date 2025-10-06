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
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

export default function FamilyPackPage() {
  const { t, locale } = useTranslation();
  const { generateBreadcrumbs, generateProductData } = useStructuredData();
  
  const pageTitle = `${SITE_NAME} Family Pack - 120g Activated Carbon Cat Litter Additive`;
  const pageDescription = "Perfect for multi-cat households. Two months of freshness with Purrify's 120g family pack activated carbon cat litter additive. Best value size.";
  const canonicalUrl = `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/products/family-pack`;

  // Family pack lifestyle images
  const heroImage = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80'; // Multiple cats happy home
  const sectionImage1 = 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=80'; // Multi-cat household
  const solutionImage = 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1600&q=80'; // Happy multi-cat family

  // Generate structured data for this product
  const productData = generateProductData('purrify-120g');
  const breadcrumbs = generateBreadcrumbs('/products/family-pack');

  const benefits = [
    "Perfect for multi-cat households",
    "Two months of continuous odor control",
    "Best value per gram of activated carbon",
    "Handles heavy litter box usage",
    "Reduces ordering frequency"
  ];

  const testimonials = [
    {
      name: "Kai L., Outremont",
      text: "Eco-conscious cat parent here! Love that it's just activated charcoal - no weird chemicals for my cats to inhale. The 120g size is perfect for my two-cat household.",
      rating: 5,
      petName: "Luna & Shadow"
    },
    {
      name: "Noor A., West Island",
      text: "Three cats in a small townhouse. You can imagine the chaos! The 120g size handles all three beautifully. My mother-in-law finally visits again! 😂",
      rating: 5,
      petName: "Muffin, Simba & Cleo"
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
              url: 'https://www.purrify.ca/optimized/140g.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify 120g Family Pack Package (WebP)',
              type: 'image/webp'
            },
            {
              url: 'https://www.purrify.ca/purrify-family-140g.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify 120g Family Pack Package',
              type: 'image/jpeg'
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
      <ProductSchema productId='purrify-120g' locale={locale as 'en' | 'fr' | 'zh'} />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
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
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Family Pack</li>
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
                    src="/optimized/140g.webp"
                    alt="Purrify 120g Family Pack"
                    width={400}
                    height={400}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    BEST VALUE
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    Purrify Family Pack
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    120g Activated Carbon Cat Litter Additive
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">(127 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF]">
                      $29.99 CAD
                    </div>
                    <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      $39.98
                    </div>
                    <div className="bg-[#03E46A] text-white dark:text-gray-100 px-2 py-1 rounded text-sm font-bold">
                      SAVE 25%
                    </div>
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
                    Buy Family Pack Now
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
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Free shipping included
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Ships within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Value Proposition Section */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Maximum Value for Multi-Cat Homes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our 120g family pack provides unbeatable value and convenience for households with multiple cats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">60</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Days of Coverage</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Two full months of odor control for multi-cat households
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">25%</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Cost Savings</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Save 25% compared to buying two standard sizes
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white dark:text-gray-100 font-bold text-xl">3+</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Perfect for 3+ Cats</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Handles the odor control needs of large cat families
                </p>
              </div>
            </div>

            {/* Value Comparison */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
                Family Pack Savings Calculator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Two Standard Sizes (50g each)
                  </div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    $39.98
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    $19.99 × 2 = $39.98
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    One Family Pack (120g)
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    $29.99
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    You Save $9.99!
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Multi-Cat Success Stories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">- {testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pet parent to {testimonial.petName}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`}>
                <Button variant="outline" size="lg">
                  Read All Multi-Cat Stories
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Size Comparison */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50 cv-auto cis-720">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Find Your Perfect Size
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose the right amount for your household
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Trial Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">12g - Single use test</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">$6.99</div>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button variant="outline" className="w-full">View Trial Size</Button>
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Standard Size</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">50g - One month supply</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">$19.99</div>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/standard`}>
                  <Button variant="outline" className="w-full">View Standard Size</Button>
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-[#03E46A]/10 to-[#5B2EFF]/10 dark:from-[#03E46A]/10 dark:to-[#3694FF]/10 p-6 rounded-xl shadow-lg text-center border-2 border-[#03E46A] dark:border-[#03E46A]">
                <div className="bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  BEST VALUE
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">Family Pack</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">120g - Two month supply</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">$29.99</div>
                <Button className="w-full">Currently Viewing</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8 cv-auto cis-480">
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

        {/* Multi-Cat Lifestyle Image 1 */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <NextImage
                src={heroImage}
                alt="Happy multiple cats in fresh, odor-free home with Purrify Family Pack"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-bold mb-2">Perfect for Multi-Cat Families</h2>
                  <p className="text-xl opacity-90">Best value for 2-3 months of freshness</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Multi-Cat Household Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <NextImage
                src={sectionImage1}
                alt="Multi-cat household enjoying Purrify Family Pack odor control"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Handles Heavy Usage</h3>
                  <p className="text-lg opacity-90">Powerful enough for 3+ cats</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Happy Family Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <NextImage
                src={solutionImage}
                alt="Happy cat family enjoying fresh home with Purrify Family Pack"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-2">Best Value, Happiest Cats</h3>
                  <p className="text-lg opacity-90">Save 25% with our Family Pack</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/family-pack" />
          </Container>
        </section>
      </main>
    </>
  );
}
