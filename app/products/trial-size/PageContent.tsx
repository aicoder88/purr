'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { useCurrency } from '@/lib/currency-context';
import { localizePath } from '@/lib/i18n/locale-path';
import { formatProductPrice, getProductPrice } from '@/lib/pricing';
import { stripContext, generateFAQSchema } from '@/lib/seo-utils';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';
import { useTranslation } from '@/lib/translation-context';
import { getPaymentLink } from '@/lib/payment-links';
import { getSEOMeta } from '@/translations/seo-meta';
import { useAggregateReview } from '@/hooks/useAggregateReview';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';

type TryFreeStep = {
  number?: string;
  title?: string;
  description?: string;
};

type TryFreeTestimonial = {
  text?: string;
  author?: string;
  location?: string;
};

export default function TrialSizePage() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();

  const tryFreePage = t.tryFreePage || {};
  const viewTracked = useRef(false);
  const productKey = 'trial';
  const productName = t.products?.['purrify-12g']?.name || 'Purrify Trial Size';
  const checkoutUrl = getPaymentLink('trialSingle') || '/products/trial-size';

  const [priceValidUntil, setPriceValidUntil] = useState('');
  useEffect(() => {
    setPriceValidUntil(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  }, []);

  const seoMeta = getSEOMeta(locale as 'en' | 'fr' | 'zh' | 'es', 'products', 'trial');
  const pageTitle = seoMeta?.title || '';
  const pageDescription = seoMeta?.description || '';

  const trialPriceValue = getProductPrice(productKey, currency);
  const trialPrice = formatProductPrice(productKey, currency, locale);
  const trialPriceString = trialPriceValue.toFixed(2);

  const steps = ((tryFreePage?.howItWorks?.steps as TryFreeStep[]) || []).filter(Boolean);
  const points = ((tryFreePage?.problem?.points as string[]) || []).filter(Boolean);
  // Disable on-site testimonial rendering until backed by a real, verifiable review system.
  const testimonials: TryFreeTestimonial[] = [];
  const trustItems = tryFreePage?.trust ? Object.values(tryFreePage.trust) as string[] : [];

  const { data: reviewData } = useAggregateReview(productKey, locale);

  const { schema } = useEnhancedSEO({
    path: '/products/trial-size',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter freshener',
    schemaType: 'product',
    schemaData: {
      name: t.products?.['purrify-12g']?.name || 'Purrify Trial Size',
      description: pageDescription,
      image: ['https://www.purrify.ca/optimized/17g-transparent-v2.webp'],
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
    image: 'https://www.purrify.ca/optimized/17g-transparent-v2.webp',
    keywords: ['cat litter freshener', 'charcoal litter additive', 'cat litter deodorizer', 'free trial'],
  });

  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: trialPriceValue,
      currency: 'CAD',
    });
  }, [productName, trialPriceValue]);

  const handleBuyClick = () => {
    const value = getProductPrice(productKey, currency);
    trackTikTokClientEvent('AddToCart', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value,
      currency: 'CAD',
    });

    trackTikTokClientEvent('InitiateCheckout', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value,
      currency: 'CAD',
    });
  };

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                stripContext(schema),
                stripContext(generateFAQSchema(locale)),
              ],
            }),
          }}
        />
      )}

      <main className="min-h-screen bg-white dark:bg-gray-900">
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav className="text-sm">
              <ol className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <li>
                  <Link href={localizePath('/', locale)} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                    {t.nav.home}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={localizePath('/products', locale)} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                    {t.nav.products}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">{t.nav.trialSize}</li>
              </ol>
            </nav>
          </Container>
        </section>

        <section className="py-16 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
          <Container>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <Image
                    src="/optimized/17g-transparent-v2.webp"
                    alt={pageTitle}
                    width={320}
                    height={320}
                    className="w-full max-w-sm mx-auto h-auto object-contain"
                    priority
                  />
                  <div className="absolute -top-4 -right-4 bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12">
                    {tryFreePage?.hero?.badge}
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  {tryFreePage?.hero?.headline}
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  {tryFreePage?.hero?.subheadline}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {tryFreePage?.hero?.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>{tryFreePage?.guarantee?.headline || t.hero?.simplified?.moneyBackGuarantee || 'Money-Back Guarantee'}</span>
                </div>

                <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-4xl font-black text-green-600 dark:text-green-400">{tryFreePage?.freeTrialPage?.free || t.freeTrialPage.free}</span>
                    <span className="text-gray-500 dark:text-gray-400 line-through text-xl">$14.99</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {trialPrice}
                  </p>

                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="block">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-6 text-lg shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="w-6 h-6 mr-2" />
                      {tryFreePage?.hero?.cta}
                    </Button>
                  </a>

                  <p className="mt-4 text-xs font-medium text-gray-500 dark:text-gray-400 text-center italic">
                    {t.pricing?.stripeShippingNote}
                  </p>
                </div>

                {trustItems.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {trustItems.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 text-center">
                {tryFreePage?.problem?.headline}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
                {tryFreePage?.problem?.subheadline}
              </p>

              {points.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {points.map((point) => (
                    <div key={point} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-200">{point}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>

        <section className="py-14 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-4">
                {tryFreePage?.howItWorks?.headline}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
                {tryFreePage?.howItWorks?.subheadline}
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {steps.map((step) => (
                  <article key={`${step.number}-${step.title}`} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-electric-indigo dark:bg-electric-indigo text-white dark:text-white flex items-center justify-center font-bold mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-2">{tryFreePage?.guarantee?.headline}</h3>
                <p className="text-gray-700 dark:text-gray-300">{tryFreePage?.guarantee?.description}</p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-gradient-to-br from-green-900 to-slate-900 dark:from-green-950 dark:to-slate-950">
          <Container>
            <div className="max-w-4xl mx-auto text-center text-white dark:text-white">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">
                {tryFreePage?.finalCta?.headline}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {tryFreePage?.finalCta?.description}
              </p>

              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="inline-block mb-4">
                <Button
                  size="lg"
                  className="bg-white dark:bg-white text-green-700 dark:text-green-700 hover:bg-green-50 dark:hover:bg-green-50 font-black py-8 px-14 text-xl shadow-2xl transition-all duration-300"
                >
                  {tryFreePage?.finalCta?.buttonText}
                </Button>
              </a>
              <p className="text-sm opacity-80 mb-2">{tryFreePage?.finalCta?.note}</p>
              <p className="text-sm opacity-80 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{tryFreePage?.guarantee?.badge}</span>
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ProductFAQ productType="trial" productName={t.nav.trialSize} />
            </div>
          </Container>
        </section>

        <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <div className="text-center">
              <Link href={localizePath('/products', locale)}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t.nav.viewAllProducts}
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
          <Container>
            <RelatedContent currentUrl="/products/trial-size" />
          </Container>
        </section>
      </main>
    </>
  );
}
