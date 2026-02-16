'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import Image from 'next/image';
import { Check, Star, Truck, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { getProductPrice, formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import { useEffect, useRef, useCallback } from 'react';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

const TRY_FREE_UI_COPY: Record<SupportedLocale, {
  urgencyBadge: string;
  shippingSuffix: string;
  valueLabel: string;
  freeLabel: string;
  shippingOnlyLabel: string;
  guaranteeLabel: string;
  productImageAlt: string;
  freeBadgeLabel: string;
  benefitsHeading: string;
  benefits: string[];
  socialProofLabels: string[];
  howItWorksHeading: string;
  steps: Array<{ step: string; title: string; desc: string }>;
  testimonialQuote: string;
  testimonialAttribution: string;
  finalHeading: string;
  finalDescriptionPrefix: string;
  finalDescriptionSuffix: string;
  limitNotice: string;
}> = {
  en: {
    urgencyBadge: 'Limited Time Offer',
    shippingSuffix: 'shipping.',
    valueLabel: '$9.99 value',
    freeLabel: 'FREE',
    shippingOnlyLabel: 'Shipping only',
    guaranteeLabel: '30-day money-back guarantee',
    productImageAlt: 'Purrify 12g Trial Size - Free Sample',
    freeBadgeLabel: 'FREE!',
    benefitsHeading: 'Why Cat Owners Love Purrify',
    benefits: ['Eliminates odor instantly', '100% natural coconut carbon', 'Fast Canada-wide shipping', '30-day money-back guarantee'],
    socialProofLabels: ['upgrade to full size', 'star rating', 'weeks of freshness'],
    howItWorksHeading: 'How It Works',
    steps: [
      { step: '1', title: 'Sprinkle', desc: 'Add to any litter your cat already uses' },
      { step: '2', title: 'Trap', desc: 'Activated carbon traps ammonia molecules' },
      { step: '3', title: 'Enjoy', desc: 'Fresh-smelling home for 2-3 weeks' },
    ],
    testimonialQuote: 'I was skeptical at first, but after trying the free sample, I immediately ordered the full size. My litter box area has never smelled better!',
    testimonialAttribution: '- Sarah M., Toronto',
    finalHeading: 'Ready to eliminate litter box odor?',
    finalDescriptionPrefix: 'Get your free trial today - just pay',
    finalDescriptionSuffix: 'shipping',
    limitNotice: 'Limit 1 per customer | Ships within 24 hours',
  },
  fr: {
    urgencyBadge: 'Offre a duree limitee',
    shippingSuffix: 'de livraison.',
    valueLabel: 'Valeur 9,99 $',
    freeLabel: 'GRATUIT',
    shippingOnlyLabel: 'Livraison seulement',
    guaranteeLabel: 'Garantie de remboursement 30 jours',
    productImageAlt: 'Purrify format essai 12g - echantillon gratuit',
    freeBadgeLabel: 'GRATUIT !',
    benefitsHeading: 'Pourquoi les proprietaires de chats aiment Purrify',
    benefits: ['Elimine les odeurs instantanement', 'Charbon de coco 100% naturel', 'Livraison rapide partout au Canada', 'Garantie de remboursement 30 jours'],
    socialProofLabels: ['passent au format complet', 'note moyenne', 'semaines de fraicheur'],
    howItWorksHeading: 'Comment ca marche',
    steps: [
      { step: '1', title: 'Saupoudrer', desc: 'Ajoutez sur la litiere que votre chat utilise deja' },
      { step: '2', title: 'Pieger', desc: 'Le charbon actif piege les molecules dammoniac' },
      { step: '3', title: 'Profiter', desc: 'Maison fraiche pendant 2 a 3 semaines' },
    ],
    testimonialQuote: 'Jetais sceptique au debut, mais apres lessai gratuit, jai commande le format complet. La zone litiere ne sent plus !',
    testimonialAttribution: '- Sarah M., Toronto',
    finalHeading: 'Pret a eliminer les odeurs de litiere ?',
    finalDescriptionPrefix: 'Obtenez votre essai gratuit aujourdhui - payez seulement',
    finalDescriptionSuffix: 'de livraison',
    limitNotice: 'Limite 1 par client | Expedie sous 24 heures',
  },
  zh: {
    urgencyBadge: '限时优惠',
    shippingSuffix: '运费。',
    valueLabel: '价值 $9.99',
    freeLabel: '免费',
    shippingOnlyLabel: '仅付运费',
    guaranteeLabel: '30天退款保证',
    productImageAlt: 'Purrify 12g 试用装 - 免费样品',
    freeBadgeLabel: '免费！',
    benefitsHeading: '为什么猫主人喜欢 Purrify',
    benefits: ['即时减少异味', '100% 天然椰壳活性炭', '加拿大快速配送', '30天退款保证'],
    socialProofLabels: ['升级到正式装', '星级评分', '周清新体验'],
    howItWorksHeading: '使用方法',
    steps: [
      { step: '1', title: '撒入', desc: '添加到你正在使用的任意猫砂中' },
      { step: '2', title: '捕捉', desc: '活性炭吸附氨分子' },
      { step: '3', title: '享受', desc: '2-3 周持续清新' },
    ],
    testimonialQuote: '我一开始不太相信，但试用后立刻下单正式装。猫砂区从没这么清新过！',
    testimonialAttribution: '- Sarah M., Toronto',
    finalHeading: '准备消除猫砂异味了吗？',
    finalDescriptionPrefix: '立即领取免费试用，仅需支付',
    finalDescriptionSuffix: '运费',
    limitNotice: '每位客户限领 1 份 | 24 小时内发货',
  },
  es: {
    urgencyBadge: 'Oferta por tiempo limitado',
    shippingSuffix: 'de envio.',
    valueLabel: 'Valor de $9.99',
    freeLabel: 'GRATIS',
    shippingOnlyLabel: 'Solo envio',
    guaranteeLabel: 'Garantia de devolucion de 30 dias',
    productImageAlt: 'Purrify tamano de prueba 12g - muestra gratis',
    freeBadgeLabel: 'GRATIS!',
    benefitsHeading: 'Por que los duenos de gatos aman Purrify',
    benefits: ['Elimina olores al instante', 'Carbon de coco 100% natural', 'Envio rapido en Canada', 'Garantia de devolucion de 30 dias'],
    socialProofLabels: ['actualizan al tamano completo', 'calificacion', 'semanas de frescura'],
    howItWorksHeading: 'Como Funciona',
    steps: [
      { step: '1', title: 'Espolvorea', desc: 'Agrega a cualquier arena que tu gato ya usa' },
      { step: '2', title: 'Atrapa', desc: 'El carbon activado atrapa moleculas de amoniaco' },
      { step: '3', title: 'Disfruta', desc: 'Hogar fresco por 2-3 semanas' },
    ],
    testimonialQuote: 'Al principio era esceptica, pero despues de la muestra gratis pedi el tamano completo. El area de la caja de arena nunca habia olido tan bien.',
    testimonialAttribution: '- Sarah M., Toronto',
    finalHeading: 'Listo para eliminar el olor de la caja de arena?',
    finalDescriptionPrefix: 'Obtén tu prueba gratis hoy, solo paga',
    finalDescriptionSuffix: 'de envio',
    limitNotice: 'Limite 1 por cliente | Envio en 24 horas',
  },
};

export function TryFreeClient() {
  const { locale } = useTranslation();
  const viewTracked = useRef(false);

  const copy = TRY_FREE_UI_COPY[locale as SupportedLocale] || TRY_FREE_UI_COPY.en;

  const productKey = 'trial';
  const productName = 'Purrify Trial Size (12g)';
  const trialPrice = formatProductPrice('trial', locale);
  const numericPrice = getProductPrice(productKey);
  const checkoutUrl = getPaymentLink('trialSingle') || '/products/trial-size';

  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: numericPrice,
      currency: 'CAD',
    });
  }, [numericPrice]);

  const handleGetTrial = useCallback(() => {
    trackTikTokClientEvent('AddToCart', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value: numericPrice,
      currency: 'CAD',
    });

    trackTikTokClientEvent('InitiateCheckout', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value: numericPrice,
      currency: 'CAD',
    });
  }, [numericPrice]);

  const benefits = [
    { icon: Sparkles, text: copy.benefits[0] },
    { icon: ShieldCheck, text: copy.benefits[1] },
    { icon: Truck, text: copy.benefits[2] },
    { icon: Clock, text: copy.benefits[3] },
  ];

  const socialProof = [
    { stat: '87%', label: copy.socialProofLabels[0] },
    { stat: '4.8', label: copy.socialProofLabels[1] },
    { stat: '2-3', label: copy.socialProofLabels[2] },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <section className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

        <Container>
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 dark:bg-red-400" />
                </span>
                {copy.urgencyBadge}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 leading-tight">
                Try Purrify FREE
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                Discover why cat owners are switching to activated carbon odor control. Just pay
                <strong className="text-gray-900 dark:text-gray-100"> {trialPrice} {copy.shippingSuffix}</strong>
              </p>

              <>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-through">{copy.valueLabel}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">{copy.freeLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{copy.shippingOnlyLabel}</p>
                      <p className="text-2xl font-bold text-[#03E46A]">{trialPrice}</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#03E46A] hover:bg-[#02C55A] text-white dark:text-gray-900 font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={handleGetTrial}
                  >
                    <a href={checkoutUrl}>
                      Get My Free Trial
                    </a>
                  </Button>

                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                    <ShieldCheck className="inline h-4 w-4 mr-1" />
                    {copy.guaranteeLabel}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {socialProof.map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-[#03E46A]">{item.stat}</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 md:w-80 aspect-[3/4]">
                <Image
                  src="/optimized/17gpink.webp"
                  alt={copy.productImageAlt}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
                <div className="absolute -top-2 -right-2 bg-[#FF3131] text-white dark:text-gray-100 font-bold px-4 py-2 rounded-full text-sm shadow-lg transform rotate-12">
                  {copy.freeBadgeLabel}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-8">
            {copy.benefitsHeading}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <benefit.icon className="h-10 w-10 mx-auto mb-3 text-[#03E46A]" />
                <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-8">
            {copy.howItWorksHeading}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {copy.steps.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#03E46A] text-white dark:text-gray-900 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-4">
              {copy.testimonialQuote}
            </blockquote>
            <p className="text-gray-500 dark:text-gray-400">
              {copy.testimonialAttribution}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#03E46A] to-[#02C55A]">
        <Container>
          <div className="text-center text-white dark:text-gray-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {copy.finalHeading}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {copy.finalDescriptionPrefix} {trialPrice} {copy.finalDescriptionSuffix}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white dark:bg-gray-900 text-[#03E46A] hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={handleGetTrial}
            >
              <a href={checkoutUrl}>
                Claim My Free Trial
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
