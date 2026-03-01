'use client';

import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import { Users, Shield, Zap, Coffee } from 'lucide-react';
import Link from 'next/link';

interface CatCafesVerticalProps {
  locale: string;
}

export function CatCafesVertical({ locale }: CatCafesVerticalProps) {
  const t = {
    hero: {
      title: locale === 'fr' ? 'Cafés à Chats' : 'Cat Cafes',
      subtitle:
        locale === 'fr'
          ? 'Gardez votre café à chats frais toute la journée'
          : 'Keep your cat cafe fresh all day',
      description:
        locale === 'fr'
          ? 'Les lieux à forte visibilité nécessitent une fraîcheur constante. Faites revenir les clients avec Purrify.'
          : 'High-visibility locations need constant freshness. Keep guests coming back with Purrify.',
    },
    stats: {
      days: locale === 'fr' ? 'Jours de Fraîcheur' : 'Days Fresh',
      fragrances: locale === 'fr' ? 'Parfums' : 'Fragrances',
      natural: locale === 'fr' ? 'Naturel' : 'Natural',
    },
    valueProps: [
      {
        icon: <Users className="h-6 w-6 text-white dark:text-white" />,
        title:
          locale === 'fr'
            ? 'Expérience Client Avant Tout'
            : 'Guest Experience First',
        highlight:
          locale === 'fr'
            ? 'Fraîcheur discrète'
            : 'Notice freshness, not products',
        description:
          locale === 'fr'
            ? 'Les clients profitent des chats, pas des odeurs masquées. Purrify agit silencieusement.'
            : 'Guests enjoy the cats, not masked odors. Purrify works silently in the background.',
        color: 'from-blue-500 to-purple-500',
      },
      {
        icon: <Shield className="h-6 w-6 text-white dark:text-white" />,
        title:
          locale === 'fr' ? 'Formule Sans Danger' : 'Cat-Friendly Formula',
        highlight:
          locale === 'fr' ? 'Sans irritants' : 'No irritants or chemicals',
        description:
          locale === 'fr'
            ? 'Charbon actif naturel. Sans parfums qui pourraient irriter les chats ou les clients sensibles.'
            : 'Natural coconut shell activated carbon. No fragrances that could irritate cats or guests.',
        color: 'from-green-500 to-emerald-500',
      },
      {
        icon: <Zap className="h-6 w-6 text-white dark:text-white" />,
        title: locale === 'fr' ? 'Application Rapide' : 'Quick Application',
        highlight:
          locale === 'fr' ? '60 secondes par bac' : '60 seconds per box',
        description:
          locale === 'fr'
            ? "Facile à appliquer entre les services. Pas de configuration compliquée ou d'entretien requis."
            : 'Easy to apply between service rushes. No complicated setup or maintenance required.',
        color: 'from-orange-500 to-red-500',
      },
    ],
    cta: {
      primary:
        locale === 'fr'
          ? 'Demander un Kit Échantillon'
          : 'Request Sample Kit',
      secondary:
        locale === 'fr' ? 'Voir les Prix Gros' : 'View Wholesale Pricing',
    },
    benefits: {
      title:
        locale === 'fr'
          ? 'Avantages Partenariat Café à Chats'
          : 'Cat Cafe Partnership Benefits',
      items: [
        {
          title: locale === 'fr' ? 'Tarifs Volume' : 'Volume Pricing',
          description:
            locale === 'fr'
              ? 'Tarifs spéciaux pour cafés à chats. Plus vous commandez, plus vous économisez.'
              : 'Special pricing tiers for cat cafes. The more you order, the more you save.',
        },
        {
          title:
            locale === 'fr'
              ? 'Livraison Régulière'
              : 'Regular Delivery Scheduling',
          description:
            locale === 'fr'
              ? "Configurez des livraisons automatiques pour ne jamais être à court."
              : 'Set up automatic deliveries so you never run out.',
        },
        {
          title:
            locale === 'fr'
              ? 'Collaboration Marketing'
              : 'Marketing Collaboration',
          description:
            locale === 'fr'
              ? 'Opportunités de promotion croisée. Votre café en vedette sur nos réseaux.'
              : 'Cross-promotion opportunities. Feature your cafe on our social media.',
        },
        {
          title:
            locale === 'fr'
              ? 'Localisateur de Magasins'
              : 'Store Locator Feature',
          description:
            locale === 'fr'
              ? 'Inscrivez-vous sur notre carte des partenaires. Les amoureux des chats peuvent découvrir votre café.'
              : 'Get listed on our partner map. Cat lovers can discover your cafe.',
        },
      ],
    },
    contact: {
      title:
        locale === 'fr'
          ? 'Demandez Votre Kit Échantillon Café'
          : 'Request Your Cafe Sample Kit',
      subtitle:
        locale === 'fr'
          ? 'Faites la différence dans votre café. Nous vous enverrons un kit échantillon.'
          : 'Experience the difference in your cafe. We will send you a sample kit.',
      email: 'wholesale@purrify.ca',
    },
  };

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 dark:border-purple-500/20 mb-6">
          <Coffee className="h-4 w-4" />
          {locale === 'fr' ? 'Partenariat Café à Chats' : 'Cat Cafe Partnership'}
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
          {t.hero.title}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          {t.hero.subtitle}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t.hero.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400">7+</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {t.stats.days}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-black text-green-600 dark:text-green-400">0</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {t.stats.fragrances}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-black text-red-600 dark:text-red-400">100%</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {t.stats.natural}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection('cafe-contact')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-6 px-10 rounded-2xl shadow-xl"
          >
            {t.cta.primary}
          </Button>
          <Link href="#cafe-pricing" passHref legacyBehavior>
            <Button
              size="lg"
              variant="outline"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold py-6 px-10 rounded-2xl border-2 border-purple-500/50 dark:border-purple-500/40"
            >
              {t.cta.secondary}
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="grid md:grid-cols-3 gap-6">
        {t.valueProps.map((prop, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-14 h-14 bg-gradient-to-r ${prop.color} rounded-xl flex items-center justify-center mr-4`}
              >
                {prop.icon}
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-gray-900 dark:text-white">
                  {prop.title}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-bold text-sm">
                  {prop.highlight}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200">{prop.description}</p>
          </div>
        ))}
      </section>

      {/* Benefits */}
      <section id="cafe-pricing" className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8">
        <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t.benefits.title}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {t.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h4 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="cafe-contact" className="text-center">
        <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t.contact.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.contact.subtitle}
        </p>
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 max-w-md mx-auto">
          <a
            href={`mailto:${t.contact.email}`}
            className="text-purple-600 dark:text-purple-400 font-bold text-lg hover:underline"
          >
            {t.contact.email}
          </a>
        </div>
      </section>
    </div>
  );
}
