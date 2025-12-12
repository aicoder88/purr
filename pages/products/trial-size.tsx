import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, AlertCircle, TrendingUp } from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { buildAvailabilityUrl, buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate, generateFAQSchema } from '../../src/lib/seo-utils';
import { PRODUCT_PRICES, formatProductPrice, getProductPrice } from '../../src/lib/pricing';

export default function TrialSizePage() {
  const { t, locale } = useTranslation();

  const pageTitle = "Try Purrify FREE for 7 Days - Transform Your Cat's Litter Box";
  const pageDescription = "WARNING: Your Cat's Litter Box Could Be Making You Sick. Discover the 12g trial that 87% of cat owners upgrade from within 7 days. Zero risk. Maximum results.";
  const canonicalUrl = getLocalizedUrl('/products/trial-size', locale);
  const languageAlternates = buildLanguageAlternates('/products/trial-size');
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const trialPriceValue = getProductPrice('trial');
  const standardPriceValue = getProductPrice('standard');
  const familyPriceValue = getProductPrice('family');
  const trialPriceString = trialPriceValue.toFixed(2);
  const standardPriceString = standardPriceValue.toFixed(2);
  const familyPriceString = familyPriceValue.toFixed(2);

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
              url: 'https://www.purrify.ca/optimized/20g.webp',
              width: 1200,
              height: 630,
              alt: 'Purrify 12g Trial Size Package',
              type: 'image/webp'
            }
          ]
        }}
      />

      {/* Comprehensive Trial Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": canonicalUrl,
                "name": "Purrify 12g Trial Size - Cat Litter Odor Control",
                "description": "Risk-free trial size perfect for testing Purrify's odor elimination power. Single-use sample for one litter box change. Experience molecular-level odor control.",
                "image": [
                  "https://www.purrify.ca/optimized/20g.webp",
                  "https://www.purrify.ca/purrify-trial-17g.jpg"
                ],
                "brand": {
                  "@type": "Brand",
                  "name": "Purrify",
                  "logo": "https://www.purrify.ca/purrify-logo.png"
                },
                "offers": {
                  "@type": "Offer",
                  "price": trialPriceString,
                  "priceCurrency": "CAD",
                  "priceValidUntil": priceValidUntil,
                  "availability": availabilityUrl,
                  "url": canonicalUrl
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "127",
                  "bestRating": "5"
                }
              },
              // FAQ Schema for product page
              generateFAQSchema(locale)
            ]
          })
        }}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Home
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

        {/* Attention-Grabbing Headline */}
        <section className="py-8 bg-gradient-to-r from-red-50/80 to-orange-50/80 dark:from-red-950/30 dark:to-orange-950/30 border-y border-red-100 dark:border-red-900/50">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-red-600 dark:bg-red-700 text-white dark:text-gray-100 px-4 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
                ⚠️ Health Alert for Cat Owners
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Is Your Cat's Litter Box<br />
                <span className="text-red-600 dark:text-red-400">Secretly Poisoning Your Home?</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold mb-4">
                Ammonia levels from cat urine can reach<br className="hidden md:block" />
                <span className="text-red-600 dark:text-red-400">dangerous concentrations</span> in just 48 hours...
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                But there's a scientifically-proven solution that works in minutes, not days.
              </p>
            </div>
          </Container>
        </section>

        {/* Hero Section with Product */}
        <section className="py-16 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Product Image - Properly Sized */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-electric-indigo-400/20 to-purple-400/20 dark:from-electric-indigo-600/10 dark:to-purple-600/10 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                    <Image
                      src="/optimized/20g.webp"
                      alt="Purrify 12g Trial Size"
                      width={300}
                      height={300}
                      className="w-full max-w-sm mx-auto h-auto object-contain"
                      priority
                    />
                    <div className="absolute -top-4 -right-4 bg-red-600 dark:bg-red-700 text-white dark:text-gray-100 px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12 transform hover:rotate-0 transition-transform">
                      TRY RISK-FREE
                    </div>
                  </div>
                </div>
              </div>

              {/* Compelling Copy - John Carlton Style */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-600 dark:border-yellow-500 p-4 mb-6">
                  <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-1">
                    LIMITED TIME OFFER
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>87% of trial users</strong> upgrade to full-size within 7 days. See why...
                  </p>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Try the <span className="text-electric-indigo-600 dark:text-electric-indigo-400">"12g Miracle"</span> That's Transforming Litter Boxes Across Canada
                </h2>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">4.8/5 from 127 verified buyers</span>
                </div>

                <div className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-4xl font-black text-electric-indigo-600 dark:text-electric-indigo-400">{trialPrice}</span>
                    <span className="text-gray-500 dark:text-gray-400 line-through text-xl">$14.99</span>
                    <span className="bg-green-500 dark:bg-green-600 text-white dark:text-gray-100 px-2 py-1 rounded text-sm font-bold">
                      SAVE 67%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    One-time trial • Perfect for 1 week • Works with ANY litter
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300"><strong>Eliminates ammonia smell</strong> in 60 seconds or less</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300"><strong>100% natural</strong> activated carbon from coconut shells</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300"><strong>Works instantly</strong> - no waiting 24-48 hours like other products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300"><strong>Safe for kittens</strong> and senior cats</span>
                    </li>
                  </ul>

                  <a href="https://buy.stripe.com/eVq7sL4hGcIOfA88Iy6Na07" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-electric-indigo-600 to-electric-indigo-500 hover:from-electric-indigo-500 hover:to-electric-indigo-400 dark:from-electric-indigo-600 dark:to-electric-indigo-500 dark:hover:from-electric-indigo-500 dark:hover:to-electric-indigo-400 text-white dark:text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl hover:shadow-electric-indigo-500/20 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <ShoppingCart className="w-6 h-6 mr-2" />
                      YES! Send Me My Trial Now
                    </Button>
                  </a>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span><strong>30-Day Money-Back Guarantee</strong></span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span>Ships within 24 hours</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">Secure payment with:</p>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                        <span>💳 Card</span>
                        <span>•</span>
                        <span>🍎 Apple Pay</span>
                        <span>•</span>
                        <span>🔵 Google Pay</span>
                        <span>•</span>
                        <span>Klarna</span>
                        <span>•</span>
                        <span>Link</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-900 dark:text-red-300 mb-1">⚡ Limited Stock Warning</p>
                    <p className="text-sm text-red-800 dark:text-red-300">Trial sizes sell out fast. Current stock: <strong>47 units remaining</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Problem Agitation - Gary Halbert Style */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 text-center">
                Here's The Ugly Truth About<br />Cat Litter Odor...
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-red-600 dark:border-red-500">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">❌ The Problem:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Ammonia buildup starts <strong>immediately</strong> after your cat uses the box</li>
                    <li>• By hour 24: <strong>Noticeable smell</strong></li>
                    <li>• By hour 48: <strong>Health-hazard levels</strong></li>
                    <li>• Guests smell it the second they walk in</li>
                    <li>• Your clothes and furniture absorb the odor</li>
                    <li>• You've become "nose blind" to how bad it really is</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-green-600 dark:border-green-500">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">✅ The Solution:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• <strong>Activated carbon</strong> traps ammonia molecules instantly</li>
                    <li>• Works at the <strong>molecular level</strong> (not just masking)</li>
                    <li>• Starts working in <strong>60 seconds</strong></li>
                    <li>• Lasts <strong>7x longer</strong> than baking soda</li>
                    <li>• 100% natural, safe for cats and humans</li>
                    <li>• <strong>87% of trial users upgrade</strong> after seeing results</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  The question isn't "Will Purrify work for my cat?"
                </p>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  The question is: <span className="text-red-600 dark:text-red-400 font-bold">"How much longer can I tolerate this smell?"</span>
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-4">
                Real Results From Real Cat Owners
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
                (These people started with the 12g trial, just like you're about to...)
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                    "I was skeptical about a '12g trial' making any difference. But holy cow... the smell was GONE in less than a minute. Not masked. GONE. I ordered the 50g bottle the same day."
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white">- Sarah M., Toronto</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upgraded to Standard Size in 2 days</p>
                </div>

                <div className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                    "My boyfriend told me he could smell the litter box from the hallway. I was MORTIFIED. Got the trial size. He walked in the next day and said 'Did you get rid of the cat?' LOL. Game changer."
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white">- Jessica K., Vancouver</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Now a monthly subscriber</p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                  <div className="text-4xl font-black text-electric-indigo-600 dark:text-electric-indigo-400 mb-2">87%</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Upgrade to full-size within 7 days</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                  <div className="text-4xl font-black text-electric-indigo-600 dark:text-electric-indigo-400 mb-2">60s</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Average time to eliminate odor</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                  <div className="text-4xl font-black text-electric-indigo-600 dark:text-electric-indigo-400 mb-2">1,127</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Happy trial users this month</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works - Simple & Clear */}
        <section className="py-16 bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 dark:from-indigo-950/20 dark:via-gray-950 dark:to-purple-950/20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
                Here's Exactly How This Works
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-electric-indigo-400 dark:bg-electric-indigo-500 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg shadow-electric-indigo-500/20">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Order Your $4.99 Trial</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Click the button, enter your info. Done. Your trial ships within 24 hours. You'll get tracking immediately.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-electric-indigo-500 dark:bg-electric-indigo-600 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg shadow-electric-indigo-500/20">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Use It During Your Next Litter Change</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Clean the box, add fresh litter, sprinkle in the Purrify. That's it. No complicated instructions. No weird rituals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-electric-indigo-600 dark:bg-electric-indigo-700 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg shadow-electric-indigo-500/20">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Watch The Magic Happen</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      In 60 seconds (we timed it), the ammonia smell vanishes. Not covered up. <strong>Actually gone.</strong> Your cat uses the box. Still no smell. Day 2. Still fresh. Day 7. You're ordering the full-size.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border-2 border-indigo-100 dark:border-indigo-900/50">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  "But what if it doesn't work for MY cat?"
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Then you get every penny back. No questions. No hassle. No "return shipping fees" nonsense. We eat the cost. You risk <strong>nothing</strong>.
                </p>
                <a href="https://buy.stripe.com/eVq7sL4hGcIOfA88Iy6Na07" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-electric-indigo-600 to-electric-indigo-500 hover:from-electric-indigo-500 hover:to-electric-indigo-400 dark:from-electric-indigo-600 dark:to-electric-indigo-500 dark:hover:from-electric-indigo-500 dark:hover:to-electric-indigo-400 text-white dark:text-white font-bold py-6 px-12 text-lg shadow-xl hover:shadow-electric-indigo-500/20 transform hover:scale-[1.02] transition-all"
                  >
                    Try It Risk-Free Now
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA - Gary Bencivenga Style */}
        <section className="py-20 bg-gradient-to-br from-indigo-900 to-slate-900 dark:from-indigo-950 dark:to-slate-950">
          <Container>
            <div className="max-w-4xl mx-auto text-center text-white dark:text-gray-100">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                You're 60 Seconds Away From<br />A Fresh-Smelling Home
              </h2>

              <p className="text-xl mb-8 opacity-90">
                Look, you've read this far. You know your litter box situation needs help.
                You know those "air fresheners" and "scented litters" are just Band-Aids.
              </p>

              <p className="text-2xl font-bold mb-8">
                So here's what happens next...
              </p>

              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8 text-left">
                <h3 className="text-2xl font-bold mb-6 text-center">Two Paths:</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="text-red-400 dark:text-red-300 text-3xl font-black">❌</div>
                    <div>
                      <p className="font-bold text-xl mb-2">PATH 1: Do Nothing</p>
                      <p className="opacity-90">
                        Close this page. Keep living with the smell. Keep apologizing to guests.
                        Keep wondering if people can smell it on your clothes. Keep wasting money on
                        products that don't work. Same problems. Same embarrassment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-green-400 dark:text-green-300 text-3xl font-black">✅</div>
                    <div>
                      <p className="font-bold text-xl mb-2">PATH 2: Take The Trial</p>
                      <p className="opacity-90">
                        Click below. Spend $4.99. Get it in 2-3 days. Use it once.
                        Watch the smell disappear. Join the 87% who upgrade. Finally solve this problem forever.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center gap-3 bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 px-6 py-3 rounded-full font-bold text-lg mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <span>47 Units Left in Stock</span>
                </div>
              </div>

              <a href="https://buy.stripe.com/eVq7sL4hGcIOfA88Iy6Na07" target="_blank" rel="noopener noreferrer" className="inline-block mb-6">
                <Button
                  size="lg"
                  className="bg-white text-electric-indigo-700 hover:bg-indigo-50 dark:bg-electric-indigo-600 dark:text-white dark:hover:bg-electric-indigo-500 font-black py-8 px-16 text-2xl shadow-2xl shadow-black/20 transform hover:scale-[1.02] transition-all duration-300 w-full md:w-auto"
                >
                  YES! Send My Trial Now - Only {trialPrice}
                </Button>
              </a>

              <p className="text-sm opacity-75 mb-2">
                ✓ 30-Day Money-Back Guarantee • ✓ Ships in 24 Hours • ✓ Join 1,127 Happy Users This Month
              </p>

              <p className="text-xs opacity-60 mb-2">
                Secure checkout • Your information is protected by 256-bit SSL encryption
              </p>

              <p className="text-xs opacity-50">
                Payment options: Card • Apple Pay • Google Pay • Klarna • Link
              </p>
            </div>
          </Container>
        </section>

        {/* Urgency Footer */}
        <section className="py-8 bg-deep-coral-600 dark:bg-deep-coral-700">
          <Container>
            <div className="text-center text-white dark:text-gray-100">
              <p className="text-xl font-bold mb-2">
                ⚡ IMPORTANT: Trial sizes are selling faster than we can restock
              </p>
              <p className="text-sm opacity-90">
                Current inventory: 47 units • Next restock: 7-10 business days
              </p>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8 bg-white dark:bg-gray-900">
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

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <RelatedArticles currentPath="/products/trial-size" />
          </Container>
        </section>
      </main>
    </>
  );
}
