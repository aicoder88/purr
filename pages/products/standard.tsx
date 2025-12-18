import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users, Zap, ShieldCheck, Truck } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { buildAvailabilityUrl, buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate, generateFAQSchema } from '../../src/lib/seo-utils';
import { formatProductPrice, getProductPrice } from '../../src/lib/pricing';
import { getPaymentLink } from '../../src/lib/payment-links';
import { cn } from '@/lib/utils';

export default function RegularSizePage() {
  const { t, locale } = useTranslation();

  const productKey = 'family'; // 120g Regular Size
  const productName = t.products?.["purrify-120g"]?.name || "Purrify Regular Size (120g)";
  const productPrice = formatProductPrice(productKey, locale);
  const productPriceValue = getProductPrice(productKey).toFixed(2);

  const pageTitle = `${productName} - Maximum Odor Control for Multi-Cat Homes`;
  const pageDescription = t.products?.["purrify-120g"]?.description || "Perfect for homes with 2+ cats. Double-strength 120g Regular Size eliminates even the strongest ammonia smells instantly.";

  const canonicalUrl = getLocalizedUrl('/products/standard', locale);
  const languageAlternates = buildLanguageAlternates('/products/standard');
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  const singleCheckoutUrl = getPaymentLink('familySingle') || '#';
  const autoshipCheckoutUrl = getPaymentLink('familyAutoship') || '#';

  // Optimized images
  const heroImage = "/optimized/regular_size_hero.png";
  const lifestyleImage = "/optimized/regular_size_lifestyle_cat.png";
  const solutionImage = "/optimized/regular_size_solution.png";
  const productImage = "/optimized/140g.webp";

  const benefits = [
    "Perfect for multi-cat households (2+ cats)",
    "3 months of continuous odor control",
    "Double-strength activated carbon formula",
    "100% natural, fragrance-free, and safe",
    "Works instantly on even the strongest smells"
  ];

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'product',
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
          images: [
            {
              url: 'https://www.purrify.ca' + productImage,
              width: 1200,
              height: 630,
              alt: productName,
              type: 'image/webp'
            }
          ]
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-6 text-sm">
            <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-deep-coral transition-colors">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="hover:text-deep-coral transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-deep-coral font-semibold">{productName}</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="pb-16 pt-4">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Product Image Stage */}
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-tr from-electric-indigo/20 to-deep-coral/20 rounded-[40px] blur-3xl opacity-60 animate-pulse"></div>
                <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-[32px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                  <Image
                    src={productImage}
                    alt={productName}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-8 right-8">
                    <div className="bg-deep-coral text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="font-heading text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                    <span className="bg-gradient-to-r from-deep-coral to-electric-indigo bg-clip-text text-transparent">
                      {productName}
                    </span>
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">4.9</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">138+ Verified Home Stories</span>
                  </div>

                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                    The ultimate solution for multi-cat households. 120 grams of high-surface-area activated carbon that traps ammonia before it ever reaches your nose.
                  </p>
                </div>

                {/* Purchase Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Autoship Option */}
                  <div className="relative group overflow-hidden bg-white dark:bg-gray-900 border-2 border-deep-coral rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-2 bg-deep-coral text-white text-[10px] font-black uppercase tracking-tighter rounded-bl-xl">
                      Save 30%
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Subscribe & Save</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">{formatProductPrice('familyAutoship', locale)}</span>
                      <span className="text-xs text-gray-500">/ 3 months</span>
                    </div>
                    <Button asChild className="w-full bg-deep-coral hover:bg-deep-coral/90 text-white font-bold py-6 rounded-2xl shadow-lg shadow-deep-coral/20">
                      <a href={autoshipCheckoutUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Get Autoship <Zap className="w-4 h-4 fill-current" />
                      </a>
                    </Button>
                    <p className="text-[10px] text-center mt-3 text-gray-400 font-medium">Cancel anytime. Ships free.</p>
                  </div>

                  {/* One-time Option */}
                  <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">One-Time</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">{productPrice}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full border-2 border-gray-900 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 font-bold py-6 rounded-2xl">
                      <a href={singleCheckoutUrl} target="_blank" rel="noopener noreferrer">
                        Buy Now
                      </a>
                    </Button>
                    <p className="text-[10px] text-center mt-3 text-gray-400 font-medium">+ $6.99 Shipping</p>
                  </div>
                </div>

                {/* Quick Trust */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    7-Day Money Back
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Truck className="w-5 h-5 text-electric-indigo" />
                    Ships Next Business Day
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Feature/Lifestyle Section 1 */}
        <section className="py-24 bg-white/50 dark:bg-black/20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
                <Image
                  src={heroImage}
                  alt="Purrify Regular Size in action"
                  width={800}
                  height={600}
                  className="relative rounded-[40px] shadow-2xl border-8 border-white dark:border-gray-800"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Scientifically Proven
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  Stop Masking. <br />
                  <span className="text-electric-indigo">Start Eliminating.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Most deodorizers use heavy perfumes to hide smells. Purrify works like a magnet—trapping ammonia gas molecules inside millions of microscopic pores. It is the same principle NASA uses to keep air fresh in space stations.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values Block */}
        <section className="py-24">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-electric-indigo/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-electric-indigo" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">Professional Grade</h3>
                <p className="text-gray-600 dark:text-gray-400">Used by vets and professional cleaning services across Canada.</p>
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-deep-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-deep-coral" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">100% Cat Safe</h3>
                <p className="text-gray-600 dark:text-gray-400">Fragrance-free, chemical-free, and safe if accidentally ingested.</p>
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">Best Value</h3>
                <p className="text-gray-600 dark:text-gray-400">One regular size replaces 4-5 spray cans or expensive plugins.</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Product Detail Image */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-electric-indigo/20 to-deep-coral/20 opacity-40"></div>
          <Container className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="font-heading text-4xl md:text-5xl font-black leading-tight">
                  High-Surface Area <br />
                  <span className="text-deep-coral">Molecular Filtration</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Our activated carbon is sourced from premium coconut shells, processed to maximize the surface area that "captures" odor particles. Just one gram has a surface area equivalent to a tennis court.
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                  <p className="text-deep-coral font-black mb-2 uppercase tracking-widest text-sm">Real Results</p>
                  <p className="italic text-lg">"My husband used to complain the second he walked through the door. Since we started using the Regular Size, he doesn't even notice the litter area anymore! Game changer for our small apartment."</p>
                  <p className="mt-4 font-bold">— Sarah L., Toronto</p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={solutionImage}
                  alt="Purrify carbon granules close-up"
                  width={800}
                  height={800}
                  className="rounded-[40px] shadow-2xl grayscale brightness-110 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-white dark:bg-gray-950">
          <Container>
            <div className="bg-gradient-to-r from-deep-coral/5 to-electric-indigo/5 border border-gray-100 dark:border-gray-800 rounded-[48px] p-12 md:p-24 text-center space-y-10">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-white">
                  Experience Fresh Air Again
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Join 1,000+ happy Canadians who have reclaimed their homes from stubborn litter box odors.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="h-20 px-12 text-xl font-black bg-deep-coral hover:bg-deep-coral/90 text-white rounded-[24px] shadow-2xl shadow-deep-coral/20 min-w-[280px]">
                  <a href={autoshipCheckoutUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    Start Your Fresh Journey <Zap className="w-5 h-5 fill-current" />
                  </a>
                </Button>
              </div>
              <p className="text-sm font-bold text-gray-400">30-Day Happiness Guarantee • Free Shipping on Autoship</p>
            </div>
          </Container>
        </section>

        {/* Back navigation */}
        <section className="py-12 border-t border-gray-100 dark:border-gray-900">
          <Container className="text-center">
            <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`} className="inline-flex items-center text-gray-500 hover:text-deep-coral font-bold gap-2 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to all sizes
            </Link>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-24 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/products/standard" />
          </Container>
        </section>
      </main>
    </>
  );
}
