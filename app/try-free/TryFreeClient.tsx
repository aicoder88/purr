'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Check, Star, Truck, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import type { TranslationType } from '@/translations/types';





export function TryFreeClient() {
  const t = useTranslations();
  const locale = useLocale();

  // Fallback to empty object if translation is missing to prevent crash
  // In a real app we might want to ensure types guarantee this exists
  const copy = (t.raw('tryFreePage') as NonNullable<TranslationType['tryFreePage']>) || {
    urgencyBadge: '',
    shippingSuffix: '',
    valueLabel: '',
    freeLabel: '',
    shippingOnlyLabel: '',
    guaranteeLabel: '',
    productImageAlt: '',
    freeBadgeLabel: '',
    benefitsHeading: '',
    benefits: [],
    socialProofLabels: [],
    howItWorksHeading: '',
    steps: [],
    testimonialQuote: '',
    testimonialAttribution: '',
    finalHeading: '',
    finalDescriptionPrefix: '',
    finalDescriptionSuffix: '',
    limitNotice: '',
    title: '',
    description: '',
    cta: '',
    claimCta: ''
  };

  const trialPrice = formatProductPrice('trial', locale);
  const checkoutUrl = getPaymentLink('trialSingle') || '/products/trial-size';

  const benefits = [
    { icon: Sparkles, text: copy.benefits?.[0] || '' },
    { icon: ShieldCheck, text: copy.benefits?.[1] || '' },
    { icon: Truck, text: copy.benefits?.[2] || '' },
    { icon: Clock, text: copy.benefits?.[3] || '' },
  ];

  const socialProof = [
    { stat: '87%', label: copy.socialProofLabels?.[0] || '' },
    { stat: '4.8', label: copy.socialProofLabels?.[1] || '' },
    { stat: '2-3', label: copy.socialProofLabels?.[2] || '' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 from-gray-900 to-gray-950">
      <section className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

        <Container>
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-red-100 bg-red-900/30 text-red-700 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 bg-red-400" />
                </span>
                {copy.urgencyBadge}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-gray-50 mb-4 leading-tight">
                {copy.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 text-gray-300 mb-6">
                {copy.description}
                <strong className="text-gray-900 text-gray-100"> {trialPrice} {copy.shippingSuffix}</strong>
              </p>

              <>
                <div className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-2xl p-6 mb-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 text-gray-400 line-through">{copy.valueLabel}</p>
                      <p className="text-3xl font-bold text-gray-900 text-gray-50">{copy.freeLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 text-gray-400">{copy.shippingOnlyLabel}</p>
                      <p className="text-2xl font-bold text-[#03E46A] text-[#04D162]">{trialPrice}</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#03E46A] bg-[#04D162] hover:bg-[#02C55A] hover:bg-[#04D162]/90 text-gray-900 text-gray-900 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <a href={checkoutUrl}>
                      {copy.cta}
                    </a>
                  </Button>

                  <p className="text-center text-sm text-gray-500 text-gray-400 mt-3">
                    <ShieldCheck className="inline h-4 w-4 mr-1" />
                    {copy.guaranteeLabel}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {socialProof.map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-[#03E46A] text-[#04D162]">{item.stat}</p>
                      <p className="text-xs md:text-sm text-gray-600 text-gray-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 md:w-80 aspect-[3/4]">
                <Image
                  src="/optimized/products/17g-transparent.webp"
                  alt={copy.productImageAlt || ''}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
                <div className="absolute -top-2 -right-2 bg-[#FF3131] bg-[#FF5050] text-white text-gray-100 font-bold px-4 py-2 rounded-full text-sm shadow-lg transform rotate-12">
                  {copy.freeBadgeLabel}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white bg-gray-900">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 text-gray-50 mb-8">
            {copy.benefitsHeading}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="text-center p-4 bg-gray-50 bg-gray-800 rounded-xl"
              >
                <benefit.icon className="h-10 w-10 mx-auto mb-3 text-[#03E46A] text-[#04D162]" />
                <p className="text-sm md:text-base font-medium text-gray-700 text-gray-200">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-gray-50 bg-gray-950">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 text-gray-50 mb-8">
            {copy.howItWorksHeading}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(copy.steps || []).map((item: { step?: string; title: string; description?: string; desc?: string }, i: number) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#03E46A] bg-[#04D162] text-gray-900 text-gray-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-gray-50 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white bg-gray-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400 fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 text-gray-300 italic mb-4">
              {copy.testimonialQuote}
            </blockquote>
            <p className="text-gray-500 text-gray-400">
              {copy.testimonialAttribution}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#03E46A] to-[#02C55A] from-[#04D162]/80 to-[#04D162]/60">
        <Container>
          <div className="text-center text-white text-gray-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {copy.finalHeading}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {copy.finalDescriptionPrefix} {trialPrice} {copy.finalDescriptionSuffix}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white bg-gray-900 text-[#03E46A] text-[#04D162] hover:bg-gray-100 hover:bg-gray-800 font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              <a href={checkoutUrl}>
                {copy.claimCta}
              </a>
            </Button>
            <p className="mt-4 text-sm opacity-80">
              <Check className="inline h-4 w-4 mr-1" />
              {copy.limitNotice}
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
