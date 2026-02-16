'use client';

import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import { Scissors, MessageCircle, Award, TrendingUp, Sparkles, DollarSign, Package, Users } from 'lucide-react';
import Link from 'next/link';

interface GroomersVerticalProps {
  locale: string;
}

export function GroomersVertical({ locale }: GroomersVerticalProps) {
  const t = {
    hero: {
      badge: locale === 'fr' ? 'Partenariat Toiletteurs' : 'Groomer Partnership',
      title:
        locale === 'fr'
          ? 'Offrez Plus de Valeur - Ajoutez Purrify'
          : 'Offer More Value - Add Purrify to Your Services',
      subtitle:
        locale === 'fr' ? 'Nouvelle Source de Revenus' : 'New Revenue Stream',
      description:
        locale === 'fr'
          ? "Les propriétaires demandent des solutions d'odeur. Recommandez et vendez Purrify - revenu additionnel à chaque rendez-vous."
          : 'Cat owners ask about litter smell during grooming. Recommend and sell Purrify - additional revenue with every appointment.',
    },
    stats: {
      satisfaction: locale === 'fr' ? 'Satisfaction Client' : 'Customer Satisfaction',
      margin: locale === 'fr' ? 'Marge Maximale' : 'Maximum Margin',
      freshness: locale === 'fr' ? 'Jours de Fraîcheur' : 'Days of Freshness',
    },
    opportunity: {
      title:
        locale === 'fr'
          ? "L'Opportunité pour les Toiletteurs"
          : 'The Opportunity for Groomers',
      intro:
        locale === 'fr'
          ? 'Chaque rendez-vous est une opportunité de résoudre la plainte #1 de vos clients.'
          : 'Every grooming appointment is an opportunity to solve your clients\' #1 complaint.',
      items: [
        {
          icon: <MessageCircle className="h-6 w-6" />,
          title:
            locale === 'fr'
              ? 'Les Clients Demandent Déjà'
              : 'Clients Already Ask',
          description:
            locale === 'fr'
              ? "Les propriétaires mentionnent souvent l'odeur de la litière. Vous avez maintenant une solution à recommander."
              : 'Cat owners frequently mention litter box odor during appointments.',
        },
        {
          icon: <Award className="h-6 w-6" />,
          title:
            locale === 'fr' ? 'Positionnez-vous Expert' : 'Position as the Expert',
          description:
            locale === 'fr'
              ? 'En recommandant Purrify, vous devenez le conseiller de confiance pour tous leurs besoins.'
              : 'When you recommend Purrify, you become the trusted advisor.',
        },
        {
          icon: <TrendingUp className="h-6 w-6" />,
          title:
            locale === 'fr'
              ? 'Potentiel de Revenus Récurrents'
              : 'Repeat Purchase Potential',
          description:
            locale === 'fr'
              ? "Purrify est un produit consommable. Les clients reviennent mensuellement."
              : 'Purrify is a consumable product. Clients return monthly.',
        },
        {
          icon: <Sparkles className="h-6 w-6" />,
          title:
            locale === 'fr' ? 'Résultats Démontrables' : 'Demonstrable Results',
          description:
            locale === 'fr'
              ? 'Montrez la différence dans votre salon. Une démo crée un client à vie.'
              : 'Show clients the difference right in your salon.',
        },
      ],
    },
    benefits: {
      title:
        locale === 'fr'
          ? 'Avantages du Partenariat'
          : 'Partnership Benefits',
      items: [
        {
          icon: <DollarSign className="h-6 w-6 text-green-600" />,
          title: locale === 'fr' ? 'Prix de Gros' : 'Wholesale Pricing',
          description:
            locale === 'fr'
              ? 'Marges premium sur chaque vente. Remises volume disponibles.'
              : 'Premium margins on every sale. Volume discounts available.',
        },
        {
          icon: <Package className="h-6 w-6 text-blue-600" />,
          title:
            locale === 'fr'
              ? 'Matériel de Présentation'
              : 'Retail Display Materials',
          description:
            locale === 'fr'
              ? 'Présentoirs de comptoir gratuits, shelf talkers et matériel promotionnel.'
              : 'Free counter displays, shelf talkers, and promotional materials.',
        },
        {
          icon: <Users className="h-6 w-6 text-purple-600" />,
          title: locale === 'fr' ? 'Formation Produit' : 'Product Training',
          description:
            locale === 'fr'
              ? 'Formation rapide sur les avantages pour parler en confiance aux clients.'
              : 'Quick training on product benefits.',
        },
      ],
    },
    cta: {
      primary:
        locale === 'fr'
          ? 'Commencer à Vendre Purrify'
          : 'Start Retailing Purrify',
    },
  };

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Scissors className="h-4 w-4" />
          {t.hero.badge}
        </div>

        <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t.hero.title}
        </h2>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t.hero.description}
        </p>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">96%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{t.stats.satisfaction}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">45%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{t.stats.margin}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">7+</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{t.stats.freshness}</div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => scrollToSection('groomer-contact')}
          size="lg"
          className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700"
        >
          {t.cta.primary}
        </Button>
      </section>

      {/* Opportunity */}
      <section>
        <div className="text-center mb-12">
          <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.opportunity.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.opportunity.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.opportunity.items.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                {item.icon}
              </div>
              <h4 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
        <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t.benefits.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {t.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-sm"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h4 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {benefit.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="groomer-contact" className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="font-heading text-2xl font-bold mb-4">
            {locale === 'fr'
              ? 'Prêt à Ajouter Purrify à Votre Salon?'
              : 'Ready to Add Purrify to Your Salon?'}
          </h3>
          <p className="mb-6 max-w-xl mx-auto">
            {locale === 'fr'
              ? 'Contactez notre équipe partenariat pour commencer avec des prix de gros et du matériel de présentation.'
              : 'Contact our partnership team to get started with wholesale pricing and display materials.'}
          </p>
          <Link
            href="mailto:partners@purrify.ca"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            {locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </div>
  );
}
