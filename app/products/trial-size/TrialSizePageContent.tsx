"use client";

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/lib/currency-context';
import { getSEOMeta } from '@/translations/seo-meta';
import Image from 'next/image';
import { Check, Star, Lock } from 'lucide-react';
import { generateFAQSchema } from '@/lib/seo-utils';
import { getProductPrice, formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import { ecommerceEvents } from '@/lib/gtm-events';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { useAggregateReview } from '@/hooks/useAggregateReview';
import { useEffect, useRef } from 'react';

const PRICE_VALID_UNTIL = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

type TrialSizePageContentProps = {
  locale: 'en' | 'fr';
};

export default function TrialSizePageContent({ locale }: TrialSizePageContentProps) {
  const { currency } = useCurrency();
  const viewTracked = useRef(false);

  const productKey = 'trial';
  const productName = 'Purrify Trial Size (12g)';
  const seoLocale = locale === 'fr' ? 'fr' : 'en';
  const checkoutUrl = getPaymentLink('trialSingle') ?? '/products/trial-size/';

  const trackTikTokFallback = (event: 'ViewContent' | 'AddToCart' | 'InitiateCheckout', value: number) => {
    if (typeof window === 'undefined' || !window.ttq?.track) {
      return;
    }

    window.ttq.track(event, {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value,
      currency: 'CAD',
      quantity: 1,
    });
  };

  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    const numericPrice = getProductPrice(productKey, currency);
    ecommerceEvents.viewItem({
      item_id: productKey,
      item_name: productName,
      category: 'products',
      price: numericPrice,
      currency: 'CAD',
    });
    trackTikTokFallback('ViewContent', numericPrice);
  }, [currency, productKey, productName]);

  const handleBuyClick = () => {
    const price = getProductPrice(productKey, currency);
    const checkoutItem = {
      item_id: productKey,
      item_name: productName,
      category: 'products',
      price,
      quantity: 1,
    };

    ecommerceEvents.addToCart({
      ...checkoutItem,
      currency: 'CAD',
    });
    ecommerceEvents.beginCheckout([checkoutItem], price, 'CAD');

    trackTikTokFallback('AddToCart', price);
    trackTikTokFallback('InitiateCheckout', price);
  };

  // Use optimized SEO meta content
  const seoMeta = getSEOMeta(seoLocale, 'products', 'trial');
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
      image: ["https://www.purrify.ca/optimized/products/17g-transparent-v2.webp"],
      price: trialPriceString,
      priceValidUntil: PRICE_VALID_UNTIL,
      availability: 'https://schema.org/InStock',
      sku: 'purrify-12g',
      mpn: 'PURRIFY-12G',
      shippingRate: '4.76',
      rating: {
        value: reviewData.ratingValue,
        count: reviewData.reviewCount,
      },
    },
    image: 'https://www.purrify.ca/optimized/products/17g-transparent-v2.webp',
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

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* Top Banner */}
        <div className="bg-black text-white text-center py-2 text-sm font-bold tracking-widest uppercase dark:bg-black/90 dark:text-gray-100">
          FREE TRIAL - LIMITED TIME
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-gray-900">
          <div className="absolute inset-0 z-0">
            <Image
              src="/optimized/marketing/cat-clean-home.avif"
              alt="Clean modern apartment with a subtle litter box"
              fill
              className="object-cover opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
          </div>

          <Container className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-24 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight font-serif">
              The Litter Box Problem<br />Every Cat Owner Has.<br />
              <span className="text-gray-500 dark:text-gray-400">And Almost Nobody Talks About.</span>
            </h1>

            <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto text-gray-800 dark:text-gray-200 mb-12">
              <p className="font-medium">You love your cat completely.<br />The smell? That&apos;s a different story.</p>
              <p>Not because you&apos;re not clean. Not because you don&apos;t try.<br />
                It&apos;s because the ammonia in cat urine is invisible, relentless, and almost impossible to eliminate with anything currently on the market.</p>

              <ul className="list-none pl-0 space-y-2 text-base md:text-lg my-8 font-medium">
                <li>Scented litters trap it under perfume.</li>
                <li>Baking soda absorbs it - briefly - then stops working entirely.</li>
                <li>Air fresheners push it around the room.</li>
              </ul>

              <p className="text-2xl font-bold mt-8">None of them actually eliminate it.<br />Purrify does.<br />And right now, your first bag is free.</p>
            </div>

            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="inline-block">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold py-6 px-12 text-lg rounded-none shadow-xl transform hover:-translate-y-1 transition-all uppercase tracking-widest"
              >
                Get My Free Trial
              </Button>
            </a>
          </Container>
        </section>

        {/* Transition - The Science */}
        <section className="bg-gray-100 dark:bg-gray-950 py-20">
          <Container className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/optimized/products/carbon-granules-detailed.webp"
                  alt="Water-filter grade activated carbon from coconut shells"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm text-white text-sm text-center font-medium">
                  Water-filter grade activated carbon. From coconut shells.
                </div>
              </div>

              <div className="order-1 md:order-2 space-y-6">
                <p className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">The Science, Simply Put</p>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 dark:text-white leading-tight">
                  This Isn&apos;t a Cover-Up.<br />It&apos;s a Filter.
                </h2>
                <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                  <p>Activated carbon is the same material used in water purification systems to remove contaminants at the molecular level.</p>
                  <p>Purrify brings that same technology to your litter box.</p>
                  <p>When ammonia molecules - the compound responsible for the sharp, unmistakable smell of cat urine - rise from the litter, the carbon in Purrify captures and holds them.</p>
                  <p className="font-bold text-black dark:text-white text-xl">Not masked. Not perfumed over. Removed.</p>
                  <p>It works with every litter. Clumping, crystal, natural, pine. All of it.<br />Sprinkle it in. That&apos;s the entire process.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Flat Lay Visual */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <Container className="max-w-5xl mx-auto text-center">
            <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] mb-12">
              <Image
                src="/optimized/marketing/step-02-sprinkle.avif"
                alt="Purrify sprinkled on litter"
                fill
                className="object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 className="text-4xl md:text-5xl font-black text-white dark:text-gray-100 drop-shadow-2xl font-serif">Works with any litter.<br />Any cat. Any box.</h3>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof */}
        <section className="py-24 bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
          <Container className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">What People Are Saying</p>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 dark:text-white">
                The Moment You&apos;ve Been Waiting For.
              </h2>
            </div>

            <div className="space-y-16">
              {/* Testimonial 1 */}
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                <div className="flex-1 space-y-4">
                  <div className="flex text-yellow-500 dark:text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed font-serif italic">
                    &quot;My boyfriend walked in, looked around the apartment, and asked - completely seriously - if I&apos;d gotten rid of my cat. I had not. I just had Purrify.&quot;
                  </p>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Jessica K., Vancouver</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trial customer - now monthly subscriber</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 relative aspect-square rounded-xl overflow-hidden shadow-inner">
                  <Image src="/optimized/marketing/happy-owner.avif" alt="Happy couple arriving home" fill className="object-cover" />
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                <div className="flex-1 space-y-4">
                  <div className="flex text-yellow-500 dark:text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed font-serif italic">
                    &quot;I&apos;ll be honest - I assumed it was just another gimmick. I&apos;ve tried everything. Purrify was the first thing that actually worked. The smell was gone. Not reduced. Gone.&quot;
                  </p>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Sarah M., Toronto</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Upgraded to full-size within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 rounded-xl text-center shadow-xl">
                <div className="text-3xl font-black mb-2 flex items-center justify-center gap-1 font-serif">4.8 <Star className="w-6 h-6 fill-current" /></div>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide">From 127 verified buyers across Canada</p>
              </div>
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 rounded-xl text-center shadow-xl">
                <div className="text-3xl font-black mb-2 font-serif">87%</div>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide">Of trial customers upgrade within 7 days</p>
              </div>
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 rounded-xl text-center shadow-xl">
                <div className="text-3xl font-black mb-2 font-serif">20+</div>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wide">Retail partners coast to coast</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Nothing Else Works */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <Container className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">Why Nothing Else Works</p>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 dark:text-white mb-6">
                You&apos;ve Already Tried Everything.<br />Here&apos;s Why It Kept Failing.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <p><strong className="text-black dark:text-white font-serif">Scented cat litter</strong> doesn&apos;t eliminate odor. It competes with it. The result is something arguably worse - a synthetic floral smell layered over ammonia. Your guests notice both.</p>
                <p><strong className="text-black dark:text-white font-serif">Baking soda</strong> - a standard recommendation for cat litter odor control - has a surface area too small to trap ammonia effectively. It helps for a few hours, then it&apos;s done.</p>
                <p><strong className="text-black dark:text-white font-serif">Air fresheners</strong> and plug-ins are the equivalent of cleaning your home by hiding things in closets. The smell is still there. You&apos;ve just diluted it temporarily.</p>
              </div>
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-950 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg">
                <h3 className="text-2xl font-black font-serif text-black dark:text-white mb-4">The problem isn&apos;t effort.<br />It&apos;s mechanism.</h3>
                <p>Ammonia requires actual molecular capture - not perfume, not powder, not spray.</p>
                <p>That&apos;s what activated coconut carbon does. That&apos;s what Purrify is.</p>
                <p className="font-bold text-black dark:text-white underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4">No other cat litter additive in Canada uses the same grade of carbon.</p>
              </div>
            </div>

            {/* Diagram Comparison Placeholder mapping to existing images */}
            <div className="space-y-4">
              <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <Image
                  src="/optimized/marketing/micropores_magnified_view.webp"
                  alt="Molecular capture diagram"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium px-4">
                At the microscopic level, activated carbon features a vast network of pores that physically trap and permanently bond with ammonia molecules.
              </p>
            </div>
          </Container>
        </section>

        {/* The Offer Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <Container className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="order-2 md:order-1 space-y-8">
                <div>
                  <p className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">The Offer</p>
                  <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-white leading-tight">
                    Your First Bag Is Free.<br />Just Cover Shipping.
                  </h2>
                </div>

                <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                  <p>For a limited time, you can try Purrify&apos;s 12g trial bag at no charge.</p>
                  <p>The bag normally retails for <span className="line-through opacity-70">$14.99</span>.</p>
                  <p className="font-bold text-xl text-black dark:text-white bg-white dark:bg-gray-900 p-4 border-l-4 border-black dark:border-white rounded-r-lg shadow-sm">Yours free. You cover the {trialPrice} shipping to anywhere in Canada.</p>
                  <p>That&apos;s it. One-time. No subscription trap. No hidden fees.</p>
                  <p>It ships within 24 hours, arrives in 2-3 business days, and comes with one of the most straightforward guarantees in the pet care category:</p>
                  <div className="bg-black text-white dark:bg-white dark:text-black p-6 rounded-xl shadow-lg mt-6">
                    <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Lock className="w-5 h-5" /> The 30-Day Guarantee</h4>
                    <p className="text-base text-gray-300 dark:text-gray-700 font-medium">If you don&apos;t love it, you pay nothing. Full refund. No questions asked. Keep the product - we can&apos;t resell it anyway. You have 30 days. Use them.</p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800 text-center">
                  <div className="absolute top-6 right-6 bg-black text-white dark:bg-white dark:text-black font-bold px-4 py-2 rounded-full transform rotate-3 shadow-xl z-20 font-serif">
                    FREE
                  </div>
                  <div className="relative aspect-square mb-8">
                    <Image
                      src="/optimized/products/17g-transparent-v2.webp"
                      alt="Purrify Trial Bag"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>

                  <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-8 flex-wrap">
                    <span>Ships 24H</span>
                    <span>•</span>
                    <span>30-Day Guarantee</span>
                    <span>•</span>
                    <span>Made in Canada</span>
                  </div>

                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="block w-full">
                    <Button
                      size="lg"
                      className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold py-8 text-lg md:text-xl rounded-xl shadow-xl transform hover:-translate-y-1 transition-all flex flex-col items-center justify-center h-auto"
                    >
                      <span>GET MY FREE TRIAL</span>
                      <span className="text-xs md:text-sm font-normal opacity-80 mt-1 capitalize tracking-normal">Just {trialPrice} Shipping Anywhere In Canada</span>
                    </Button>
                  </a>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">$14.99 value - FREE for a limited time. Limit one.</p>

                  <ul className="mt-6 space-y-2 text-sm text-left font-medium text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2 justify-center"><Check className="w-5 h-5 opacity-50" /> Works With ANY Litter</li>
                    <li className="flex items-center gap-2 justify-center"><Check className="w-5 h-5 opacity-50" /> Safe for Kittens & Senior Cats</li>
                    <li className="flex items-center gap-2 justify-center"><Check className="w-5 h-5 opacity-50" /> No Subscription Required</li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex justify-center flex-wrap gap-4 text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>Apple Pay</span>
                      <span>Google Pay</span>
                      <span>Klarna</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <Image src="/optimized/logos/chico-logo.svg" alt="Chico" width={100} height={32} className="h-8 w-auto dark:invert" />
                  {/* other logos would go here */}
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* The Close */}
        <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <Container className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">The Two Paths</p>
            <h2 className="text-4xl font-serif font-black text-gray-900 dark:text-white mb-8">
              This Is the Last Time You&apos;ll Read About This.
            </h2>

            <div className="prose prose-lg dark:prose-invert mx-auto text-gray-700 dark:text-gray-300 mb-12">
              <p>You can close this tab. Light a candle. Spray something. Hope for the best before your next guest arrives.</p>
              <p className="font-bold text-xl text-black dark:text-white my-8">Or you can spend {trialPrice} - less than a coffee - and find out why 87% of the people who tried this never went back to their old routine.</p>
              <p>The litter box odor problem is solvable.<br />Purrify solves it.<br />The trial is free.<br />What are you waiting for?</p>
            </div>

            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={handleBuyClick} className="inline-block">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold py-6 px-16 text-lg rounded-none shadow-xl transform hover:-translate-y-1 transition-all uppercase tracking-widest"
              >
                Claim My Free Trial
              </Button>
            </a>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">{trialPrice} shipping anywhere in Canada. Limited quantities. Limit one per customer.</p>
          </Container>
        </section>

        {/* Aspirational Footer Image */}
        <section className="relative h-[60vh] min-h-[400px]">
          <Image
            src="/optimized/marketing/cat-clean-home-1080w.avif"
            alt="Calm cat in a clean home"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <Container className="absolute inset-0 flex flex-col justify-end pb-16 z-10 text-white dark:text-gray-100 text-center md:text-left max-w-5xl mx-auto">
            <div className="max-w-2xl bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h3 className="font-serif font-black text-2xl mb-4 text-white dark:text-gray-100">We&apos;re Purrify.</h3>
              <p className="text-lg font-medium text-gray-200 dark:text-gray-300 mb-2">A Canadian company obsessed with one thing: making sure your home smells exactly the way you want it to.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Water-filter grade activated carbon. No perfumes. No chemicals. No compromises.</p>
            </div>
          </Container>
        </section>

        {/* PS Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <Container className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 border-l-4 border-black dark:border-white p-8 shadow-lg text-gray-700 dark:text-gray-300 italic">
              <strong className="text-black dark:text-white font-serif text-lg not-italic">P.S.</strong> - Ammonia from cat urine doesn&apos;t just smell. At sustained exposure levels, it irritates airways and is particularly hard on cats with respiratory sensitivities. Eliminating it isn&apos;t just about what your guests think. It&apos;s about the air you and your cat breathe every day. Purrify removes it at the source. <a href={checkoutUrl} className="font-bold text-black dark:text-white underline underline-offset-4 decoration-2">Your first bag is free.</a>
            </div>
          </Container>
        </section>

      </main>
    </>
  );
}
