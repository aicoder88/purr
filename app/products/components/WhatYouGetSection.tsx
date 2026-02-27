'use client';

import { CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function WhatYouGetSection() {
  const t = useTranslations();
  const locale = useLocale();

  const benefits = [
    { title: t('productsPage.whatYouGet.benefits.0.title') || "Water-Filter Grade Activated Carbon", description: t('productsPage.whatYouGet.benefits.0.description') || "The exact same material used in Brita filters and hospital air purification. Not 'similar to.' The same." },
    { title: t('productsPage.whatYouGet.benefits.1.title') || "Zero Fragrances. Zero Chemicals. Zero Worries.", description: t('productsPage.whatYouGet.benefits.1.description') || "Cats have 200 million scent receptors. Artificial fragrances stress them. Purrify works invisibly." },
    { title: t('productsPage.whatYouGet.benefits.2.title') || "Clay, Crystal, Clumping, Natural... We Don't Judge", description: t('productsPage.whatYouGet.benefits.2.description') || "Works with whatever litter your cat has trained you to buy. No switching drama." },
    { title: t('productsPage.whatYouGet.benefits.3.title') || "Open. Sprinkle. Done.", description: t('productsPage.whatYouGet.benefits.3.description') || "A thin layer on top. 30 seconds of effort for 7 days of results." }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {locale === 'fr'
                ? "En résumé: Ce que vous obtenez"
                : "The Bottom Line: What You Get"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {locale === 'fr'
                ? "(Votre chat ne remarquera rien. C'est le but.)"
                : "(Your cat won't notice a thing. That's the point.)"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Transition to calculator */}
          <p className="text-center mt-12 text-lg text-gray-700 dark:text-gray-300">
            {locale === 'fr'
              ? "Combien de temps chaque format dure-t-il? Ça dépend de vos chats..."
              : "How long will each size last? That depends on your cats..."}
          </p>
        </div>
      </Container>
    </section>
  );
}
