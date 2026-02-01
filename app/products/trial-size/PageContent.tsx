"use client";

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import { useCurrency } from '@/lib/currency-context';
import { getSEOMeta } from '@/translations/seo-meta';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, AlertCircle, TrendingUp, MapPin, Store } from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { generateFAQSchema } from '@/lib/seo-utils';
import { getProductPrice, formatProductPrice } from '@/lib/pricing';
import { useEffect, useRef } from 'react';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { useAggregateReview } from '@/hooks/useAggregateReview';

export default function TrialSizePage() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();
  const viewTracked = useRef(false);

  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const productKey = 'trial';
  const productName = 'Purrify Trial Size (12g)';

  // Track ViewContent on page load
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    const numericPrice = getProductPrice(productKey, currency);
    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: numericPrice,
      currency: 'CAD',
    });
  }, [currency, productKey, productName]);

  // Track AddToCart + InitiateCheckout when user clicks buy
  const handleBuyClick = () => {
    const price = getProductPrice(productKey, currency);
    trackTikTokClientEvent('AddToCart', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value: price,
      currency: 'CAD',
    });

    trackTikTokClientEvent('InitiateCheckout', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value: price,
      currency: 'CAD',
    });
  };

  // Use optimized SEO meta content
  const seoMeta = getSEOMeta(locale as 'en' | 'fr' | 'zh' | 'es', 'products', 'trial');
  const pageTitle = seoMeta?.title || "FREE Cat Litter Freshener Trial - Activated Charcoal Additive | Purrify";
  const pageDescription = seoMeta?.description || "FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% of customers upgrade within 7 days. ★ 4.8 rating. Ships to USA & Canada. Risk-free guarantee.";

  const trialPriceValue = getProductPrice('trial', currency);
  const trialPriceString = trialPriceValue.toFixed(2);
  const trialPrice = formatProductPrice('trial', currency, locale);

  // Get aggregate review data
  const { data: reviewData } = useAggregateReview(productKey, locale);

  // Use enhanced SEO hook
  const { schema } = useEnhancedSEO({
    path: '/products/trial-size',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter freshener',
    schemaType: 'product',
    schemaData: {
      name: "Purrify 12g Trial - Natural Cat Litter Freshener & Charcoal Additive",
      description: "FREE trial of our activated charcoal cat litter additive. Natural coconut shell carbon litter freshener eliminates ammonia odors instantly. Pet-friendly, fragrance-free formula.",
      image: ["https://www.purrify.ca/optimized/17gpink.webp"],
      price: trialPriceString,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      sku: 'purrify-12g',
      mpn: 'PURRIFY-12G',
      shippingRate: '4.76',
      rating: {
        value: reviewData.ratingValue,
        count: reviewData.reviewCount,
      },
    },
    image: 'https://www.purrify.ca/optimized/17gpink.webp',
    keywords: ['cat litter freshener', 'charcoal litter additive', 'cat litter deodorizer', 'free trial'],
  });

  return (
    <>
      {/* Enhanced Product JSON-LD from useEnhancedSEO hook */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                schema,
                // FAQ Schema for product page
                generateFAQSchema(locale),
              ],
            }),
          }}
        />
      )}

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
                <Link href={`${locale !== 'en' ? `/${locale}` : ''}/#products`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Trial Size</li>
            </ol>
          </nav>
        </Container>

        {/* Attention-Grabbing Headline */}
        <section className="py-8 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border-y border-green-100 dark:border-green-900/50">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-green-600 dark:bg-green-700 text-white dark:text-gray-100 px-4 py-2 rounded-full text-sm font-bold mb-4 uppercase tracking-wide animate-pulse">
                🎁 LIMITED TIME OFFER - FREE TRIAL
              </div>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                <span className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl lg:text-3xl font-medium italic">&quot;I Thought My Litter Box Would Always Smell...&quot;</span><br />
                Until I tried this. Now it&apos;s <span className="text-green-600 dark:text-green-400">FREE</span> for you to test.
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold mb-4">
                In 60 seconds, your litter box smell disappears.<br className="hidden md:block" />
                Not masked. Not covered up. <span className="text-green-600 dark:text-green-400">Actually gone.</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                *Just $4.76 shipping &amp; handling anywhere in Canada. Limit one per customer.
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
                      src="/optimized/17gpink.webp"
                      alt="Purrify 12g Trial Size"
                      width={300}
                      height={300}
                      className="w-full max-w-sm mx-auto h-auto object-contain"
                      priority
                    />
                    <div className="absolute -top-4 -right-4 bg-green-600 dark:bg-green-700 text-white dark:text-gray-100 px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12 transform hover:rotate-0 transition-transform">
                      FREE TRIAL
                    </div>
                  </div>
                </div>
              </div>

              {/* Compelling Copy - John Carlton Style */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="bg-green-100 dark:bg-green-900/20 border-l-4 border-green-600 dark:border-green-500 p-4 mb-6">
                  <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-1">
                    🎁 FREE TRIAL - LIMITED TIME OFFER
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>87% of trial users</strong> upgrade to full-size within 7 days. See why for FREE!
                  </p>
                </div>

                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Get Your <span className="text-green-600 dark:text-green-400">FREE</span> 12g Trial That&apos;s Transforming Litter Boxes Across Canada
                </h2>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">4.8/5 from 127 verified buyers</span>
                </div>

                <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-4xl font-black text-green-600 dark:text-green-400">FREE</span>
                    <span className="text-gray-500 dark:text-gray-400 line-through text-xl">$14.99</span>
                    <span className="bg-green-500 dark:bg-green-600 text-white dark:text-gray-100 px-2 py-1 rounded text-sm font-bold">
                      100% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Just {trialPrice} shipping &amp; handling anywhere in Canada
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    One-time trial • Limit one per customer • Works with ANY litter
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

                  <a href="https://buy.stripe.com/8x2bJ1dSg6kqafO3oe6Na0a" target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="block w-full">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 dark:from-green-600 dark:to-green-500 dark:hover:from-green-500 dark:hover:to-green-400 text-white dark:text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <ShoppingCart className="w-6 h-6 mr-2" />
                      SEND MY FREE TRIAL
                    </Button>
                  </a>
                  <p className="mt-4 text-xs font-medium text-gray-500 dark:text-gray-400 text-center italic">
                    * {t.pricing?.stripeShippingNote}
                  </p>

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
                      <span>Shipping &amp; handling anywhere in Canada included in {trialPrice}</span>
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

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-900 dark:text-amber-300 mb-1">⏰ Limited Time Free Trial Offer</p>
                    <p className="text-sm text-amber-800 dark:text-amber-300">This free trial offer won&apos;t last forever. <strong>Limit one per customer.</strong></p>
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
              <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8 text-center">
                That Moment When Guests Walk In<br />And You Pray They Don&apos;t Smell It...
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-red-600 dark:border-red-500">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-3">❌ The Problem:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Ammonia buildup starts <strong>immediately</strong> after your cat uses the box</li>
                    <li>• By hour 24: <strong>Noticeable smell</strong></li>
                    <li>• By hour 48: <strong>Health-hazard levels</strong></li>
                    <li>• Guests smell it the second they walk in</li>
                    <li>• Your clothes and furniture absorb the odor</li>
                    <li>• You&apos;ve become &quot;nose blind&quot; to how bad it really is</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-green-600 dark:border-green-500">
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-3">✅ The Solution:</h3>
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
                  The question isn&apos;t &quot;Will Purrify work for my cat?&quot;
                </p>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  The question is: <span className="text-red-600 dark:text-red-400 font-bold">&quot;How much longer can I tolerate this smell?&quot;</span>
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-4">
                Real Results From Real Cat Owners
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
                (These people started with the 12g trial, just like you&apos;re about to...)
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 italic">
                    &quot;I was skeptical about a &apos;12g trial&apos; making any difference. But holy cow... the smell was GONE in less than a minute. Not masked. GONE. I ordered the 50g bottle the same day.&quot;
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
                    &quot;My boyfriend told me he could smell the litter box from the hallway. I was MORTIFIED. Got the trial size. He walked in the next day and said &apos;Did you get rid of the cat?&apos; LOL. Game changer.&quot;
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
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Free trials shipped this month</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works - Simple & Clear */}
        <section className="py-16 bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 dark:from-indigo-950/20 dark:via-gray-950 dark:to-purple-950/20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-12">
                Here&apos;s Exactly How This Works
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg shadow-green-500/20">
                    1
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">Claim Your FREE Trial</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Click the button, just {trialPrice} shipping &amp; handling anywhere in Canada. Done. Your FREE trial ships within 24 hours. You&apos;ll get tracking immediately.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-electric-indigo-500 dark:bg-electric-indigo-600 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg shadow-electric-indigo-500/20">
                    2
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">Use It During Your Next Litter Change</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Clean the box, add fresh litter, sprinkle in the Purrify. That&apos;s it. No complicated instructions. No weird rituals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-electric-indigo-600 dark:bg-electric-indigo-700 rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg shadow-electric-indigo-500/20">
                    3
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">Watch The Magic Happen</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      In 60 seconds (we timed it), the ammonia smell vanishes. Not covered up. <strong>Actually gone.</strong> Your cat uses the box. Still no smell. Day 2. Still fresh. Day 7. You&apos;re ordering the full-size.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border-2 border-indigo-100 dark:border-indigo-900/50">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  &quot;But what if it doesn&apos;t work for MY cat?&quot;
                </p>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                  <p className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" /> Try it for 30 days</p>
                  <p className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" /> If it doesn&apos;t work: full refund, no questions</p>
                  <p className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" /> Keep the product anyway (we can&apos;t resell it)</p>
                  <p className="font-bold text-gray-900 dark:text-white mt-4">You literally risk nothing.</p>
                </div>
                <a href="https://buy.stripe.com/8x2bJ1dSg6kqafO3oe6Na0a" target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="inline-block">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 dark:from-green-600 dark:to-green-500 dark:hover:from-green-500 dark:hover:to-green-400 text-white dark:text-white font-bold py-6 px-12 text-lg shadow-xl hover:shadow-green-500/20 transform hover:scale-[1.02] transition-all"
                  >
                    Get My FREE Trial Now
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Product-Specific FAQ */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ProductFAQ productType="trial" productName="Trial Size (12g)" />
            </div>
          </Container>
        </section>

        {/* Final CTA - Gary Bencivenga Style */}
        <section className="py-20 bg-gradient-to-br from-green-900 to-slate-900 dark:from-green-950 dark:to-slate-950">
          <Container>
            <div className="max-w-4xl mx-auto text-center text-white dark:text-gray-100">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-6">
                Your FREE Trial Is Waiting<br />Just Pay Shipping
              </h2>

              <p className="text-xl mb-8 opacity-90">
                Look, you&apos;ve read this far. You know your litter box situation needs help.
                You know those &quot;air fresheners&quot; and &quot;scented litters&quot; are just Band-Aids.
              </p>

              <p className="text-2xl font-bold mb-8">
                So here&apos;s what happens next...
              </p>

              <div className="bg-white/10 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8 text-left">
                <h3 className="font-heading text-2xl font-bold mb-6 text-center">Two Paths:</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="text-red-400 dark:text-red-300 text-3xl font-black">❌</div>
                    <div>
                      <p className="font-bold text-xl mb-2">PATH 1: Do Nothing</p>
                      <p className="opacity-90">
                        Close this page. Tomorrow, a guest comes over. You apologize for the smell before they even mention it.
                        You light another candle. Spray another air freshener. Wonder why nothing works.
                        Same cycle. Same embarrassment. Same smell.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-green-400 dark:text-green-300 text-3xl font-black">✅</div>
                    <div>
                      <p className="font-bold text-xl mb-2">PATH 2: Claim Your FREE Trial</p>
                      <p className="opacity-90">
                        Click below. Just {trialPrice} shipping &amp; handling anywhere in Canada. Get it in 2-3 days. Use it once.
                        Watch the smell disappear. Join the 87% who upgrade. Finally solve this problem forever.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center gap-3 bg-green-400 dark:bg-green-500 text-gray-900 dark:text-gray-900 px-6 py-3 rounded-full font-bold text-lg mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <span>🎁 LIMITED TIME - FREE TRIAL OFFER</span>
                </div>
              </div>

              <a href="https://buy.stripe.com/8x2bJ1dSg6kqafO3oe6Na0a" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 dark:bg-green-600 dark:text-white dark:hover:bg-green-500 font-black py-8 px-16 text-2xl shadow-2xl shadow-black/20 transform hover:scale-[1.02] transition-all duration-300 w-full md:w-auto"
                >
                  GET MY FREE TRIAL - Just {trialPrice} S&amp;H anywhere in Canada
                </Button>
              </a>
              <p className="mb-6 text-sm font-bold text-white/90 dark:text-white/80 max-w-lg mx-auto italic uppercase tracking-tight">
                {t.pricing?.stripeShippingNote}
              </p>

              <p className="text-sm opacity-75 mb-2">
                ✓ 30-Day Money-Back Guarantee • ✓ Ships in 24 Hours • ✓ Limit One Per Customer
              </p>

              <p className="text-xs opacity-60 mb-2">
                *{trialPrice} covers shipping &amp; handling anywhere in Canada only. Product is FREE. Secure checkout with 256-bit SSL encryption.
              </p>

              <p className="text-xs opacity-50">
                Payment options: Card • Apple Pay • Google Pay • Klarna • Link
              </p>
            </div>
          </Container>
        </section>

        {/* Urgency Footer */}
        <section className="py-8 bg-green-600 dark:bg-green-700">
          <Container>
            <div className="text-center text-white dark:text-gray-100">
              <p className="text-xl font-bold mb-2">
                🎁 FREE TRIAL OFFER - Limited Time Only
              </p>
              <p className="text-sm opacity-90">
                Product is FREE • Just {trialPrice} shipping &amp; handling anywhere in Canada • Limit one per customer
              </p>
            </div>
          </Container>
        </section>

        {/* Retailer Note */}
        <section className="py-8 bg-blue-50 dark:bg-blue-900/20 border-y border-blue-100 dark:border-blue-900/50">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
                  {locale === 'fr' ? 'Pour les détaillants' : 'For Retailers'}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {locale === 'fr'
                  ? 'Commandez un échantillon gratuit pour essayer avant de stocker. Seulement 4,76 $ de frais de port.'
                  : 'Order a free sample to try before stocking. Just $4.76 shipping & handling.'}
              </p>
              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/retailers`}>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30">
                  <MapPin className="w-4 h-4 mr-2" />
                  {locale === 'fr' ? 'En savoir plus sur notre programme détaillant' : 'Learn About Our Retailer Program'}
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center">
              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/#products`}>
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
            <RelatedContent currentUrl="/products/trial-size" />
          </Container>
        </section>
      </main>
    </>
  );
}
