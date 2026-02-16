'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import { Shield, FlaskConical, Heart, DollarSign, CheckCircle } from 'lucide-react';

interface VeterinariansVerticalProps {
  locale: string;
}

export function VeterinariansVertical({ locale }: VeterinariansVerticalProps) {
  const t = {
    hero: {
      badge:
        locale === 'fr'
          ? 'Programme Partenariat Vétérinaire'
          : 'Veterinary Partnership Program',
      titleLine1:
        locale === 'fr' ? 'Recommandez Avec' : 'Recommend With',
      titleLine2: locale === 'fr' ? 'Confiance' : 'Confidence',
      description:
        locale === 'fr'
          ? 'Offrez à vos clients une solution'
          : 'Give your clients a health-focused odor solution that\'s',
      highlight: locale === 'fr' ? '100% naturelle et sans parfum' : '100% natural and fragrance-free',
      stats: {
        natural: locale === 'fr' ? 'Naturel' : 'Natural',
        chemicals: locale === 'fr' ? 'Produits Chimiques' : 'Chemicals',
        days: locale === 'fr' ? 'Jours Protection' : 'Days Protection',
      },
      cta: {
        primary:
          locale === 'fr'
            ? "Demander un Kit Échantillon"
            : 'Request Sample Kit',
      },
    },
    benefits: {
      badge:
        locale === 'fr'
          ? 'Pourquoi les Vétérinaires Choisissent Purrify'
          : 'Why Veterinarians Choose Purrify',
      titleLine1:
        locale === 'fr'
          ? 'Un Produit Que Vous Pouvez'
          : 'A Product You Can',
      titleLine2:
        locale === 'fr'
          ? 'Recommander en Confiance'
          : 'Recommend With Confidence',
      subtitle:
        locale === 'fr'
          ? "Donnez à vos clients une solution éprouvée qui s'aligne avec votre approche santé."
          : 'Give your clients a science-backed solution that aligns with your health-first approach.',
      items: [
        {
          title:
            locale === 'fr'
              ? 'Charbon Actif 100% Naturel'
              : '100% Natural Activated Carbon',
          description:
            locale === 'fr'
              ? "Fabriqué à partir de charbon de noix de coco pure. Le même matériau utilisé en filtration d'eau."
              : 'Made from pure coconut shell activated carbon. Same material used in water purification.',
          color: 'from-emerald-500 to-green-500',
        },
        {
          title:
            locale === 'fr'
              ? 'Sans Parfums Ni Produits Chimiques'
              : 'No Fragrances or Chemicals',
          description:
            locale === 'fr'
              ? "Zéro parfums artificiels. Idéal pour les chats avec sensibilités ou conditions respiratoires."
              : 'Zero artificial scents. Ideal for cats with sensitivities or respiratory conditions.',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          title:
            locale === 'fr'
              ? 'Sûr pour Chats Sensibles'
              : 'Safe for Sensitive Cats',
          description:
            locale === 'fr'
              ? 'Formule sans parfum ne déclenche pas lasthme. Tous les âges peuvent utiliser Purrify.'
              : "Fragrance-free formula won't trigger asthma. All ages can use Purrify.",
          color: 'from-pink-500 to-rose-500',
        },
        {
          title:
            locale === 'fr'
              ? "Réduit l'Exposition à l'Ammoniac"
              : 'Reduces Ammonia Exposure',
          description:
            locale === 'fr'
              ? "Le charbon actif piège l'ammoniac au niveau moléculaire, améliorant la qualité de l'air."
              : 'Activated carbon traps ammonia at molecular level, improving air quality.',
          color: 'from-amber-500 to-yellow-500',
        },
      ],
    },
    partnership: {
      badge: locale === 'fr' ? 'Options de Partenariat' : 'Partnership Options',
      titleLine1: locale === 'fr' ? 'Choisissez Votre' : 'Choose Your',
      titleLine2: locale === 'fr' ? 'Niveau de Partenariat' : 'Partnership Level',
      subtitle:
        locale === 'fr'
          ? 'Options flexibles pour cliniques de toutes tailles. Commencez avec échantillons.'
          : 'Flexible options for practices of all sizes. Start with samples.',
      tiers: [
        {
          name: locale === 'fr' ? 'Débutant' : 'Starter',
          description:
            locale === 'fr'
              ? 'Parfait pour cliniques voulant essayer'
              : 'Perfect for clinics wanting to try',
          features: [
            locale === 'fr'
              ? "Kit échantillon gratuit (5 unités)"
              : 'Free sample kit (5 units)',
            locale === 'fr'
              ? '15% remise de gros'
              : '15% wholesale discount',
            locale === 'fr'
              ? "Matériel éducation clients"
              : 'Client education materials',
          ],
        },
        {
          name: locale === 'fr' ? 'Partenaire Pro' : 'Professional Partner',
          description:
            locale === 'fr'
              ? 'Pour cliniques prêtes à recommander'
              : 'For clinics ready to recommend',
          popular: true,
          features: [
            locale === 'fr'
              ? '25% remise de gros'
              : '25% wholesale discount',
            locale === 'fr'
              ? 'Réapprovisionnement prioritaire'
              : 'Priority restocking',
            locale === 'fr'
              ? 'Session formation personnel'
              : 'Staff training session',
            locale === 'fr'
              ? 'Matériel co-brandé'
              : 'Co-branded materials',
          ],
        },
        {
          name: locale === 'fr' ? 'Entreprise' : 'Enterprise',
          description:
            locale === 'fr'
              ? 'Pour réseaux de cliniques'
              : 'For clinic networks',
          features: [
            locale === 'fr'
              ? '30%+ remises volume'
              : '30%+ volume discounts',
            locale === 'fr'
              ? 'Options emballage personnalisé'
              : 'Custom packaging options',
            locale === 'fr'
              ? "Accès prioritaire nouveaux produits"
              : 'First access to new products',
          ],
        },
      ],
    },
  };

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-500/15 to-blue-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 dark:border-emerald-500/20 mb-6">
          <Shield className="h-4 w-4" />
          {t.hero.badge}
        </div>

        <h2 className="font-heading text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
          <span className="block">{t.hero.titleLine1}</span>
          <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
            {t.hero.titleLine2}
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          {t.hero.description}{' '}
          <strong className="text-emerald-600 dark:text-emerald-400">
            {t.hero.highlight}
          </strong>
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {t.hero.stats.natural}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">0</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {t.hero.stats.chemicals}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">7+</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {t.hero.stats.days}
            </div>
          </div>
        </div>

        <Button
          onClick={() => scrollToSection('vet-contact')}
          size="lg"
          className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-black py-6 px-10 rounded-2xl shadow-2xl"
        >
          {t.hero.cta.primary}
        </Button>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-700 dark:text-emerald-300 font-semibold text-sm mb-6">
            {t.benefits.badge}
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {t.benefits.titleLine1}
            <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              {t.benefits.titleLine2}
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-start">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0`}
                >
                  <FlaskConical className="h-8 w-8 text-white dark:text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-xl text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-200">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Tiers */}
      <section id="vet-contact">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-700 dark:text-emerald-300 font-semibold text-sm mb-6">
            {t.partnership.badge}
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {t.partnership.titleLine1}
            <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              {t.partnership.titleLine2}
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.partnership.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.partnership.tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 ${tier.popular
                  ? 'border-emerald-500 dark:border-emerald-400 transform md:-translate-y-4'
                  : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {locale === 'fr' ? 'Plus Populaire' : 'Most Popular'}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h4 className="font-heading text-2xl font-black text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-4 font-bold rounded-xl ${tier.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
              >
                {locale === 'fr' ? 'En Savoir Plus' : 'Learn More'}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
