'use client';

import { Shield, Leaf, Droplets } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function TrustSignalsSection() {
  const t = useTranslations();
  const locale = useLocale();

  const trustSignals = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('productsPage.trustSignals.waterFilter.title') || "The Same Stuff in Your Brita",
      description: t('productsPage.trustSignals.waterFilter.description') || "Meets NSF/ANSI 61 standards. If it's good enough to make tap water drinkable, imagine what it does to ammonia.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('productsPage.trustSignals.ingredients.title') || "Ingredients: Coconut Shells. That's It.",
      description: t('productsPage.trustSignals.ingredients.description') || "No fragrance to stress your cat. No chemicals to worry about. Just pure, activated carbon from coconut shells.",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: t('productsPage.trustSignals.science.title') || "Science, Not Perfume",
      description: t('productsPage.trustSignals.science.description') || "One gram has the surface area of a football field. Those microscopic tunnels trap odor molecules permanently. Gone. Not hiding.",
    },
  ];

  return (
    <section className="py-12 bg-white bg-gray-800 border-b border-gray-200 border-gray-700">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trustSignals.map((signal, index) => (
            <div key={index} className="text-center">
              <div className="text-brand-purple text-purple-400 mb-3 flex justify-center">
                {signal.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 text-gray-100 mb-2">
                {signal.title}
              </h3>
              <p className="text-sm text-gray-600 text-gray-300">
                {signal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition to size selection */}
        <p className="text-center mt-12 text-xl font-medium text-gray-800 text-gray-200">
          {locale === 'fr'
            ? "Maintenant, quelle taille vous convient le mieux?"
            : "Now, which size is right for you?"}
        </p>
      </Container>
    </section>
  );
}
