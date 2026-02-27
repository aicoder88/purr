import { Building2, Star, CheckCircle, Phone, Mail } from 'lucide-react';
interface HospitalityVerticalProps {
  locale: string;
}
export function HospitalityVertical({ locale }: HospitalityVerticalProps) {
  const t = {
    hero: {
      badge: locale === 'fr' ? 'Solution Hospitalité' : 'Hospitality Solution',
      title:
        locale === 'fr'
          ? 'Locations Acceptant les Animaux Sans Odeurs'
          : 'Pet-Friendly Rentals Without the Smell',
      subtitle:
        locale === 'fr'
          ? 'Acceptez les animaux, facturez des frais premium, ne vous inquiétez jamais des odeurs'
          : 'Accept pets, charge premium fees, and never worry about lingering odors',
    },
    stats: {
      bookings: locale === 'fr' ? 'Plus de Réservations' : 'More Bookings',
      bookingsDesc:
        locale === 'fr'
          ? 'Annonces acceptant animaux = plus de réservations'
          : 'Pet-friendly listings get more reservations',
      fragranceFree: locale === 'fr' ? 'Sans Parfum' : 'Fragrance-free',
      reviews: locale === 'fr' ? 'Meilleurs Avis' : 'Better Reviews',
      revenue: locale === 'fr' ? "Revenus d'Animaux" : 'Pet Fee Revenue',
    },
    challenges: {
      title: locale === 'fr' ? 'Le Défi des Hôtes' : 'The Host Challenge',
      subtitle:
        locale === 'fr'
          ? 'Vous voulez accepter les animaux pour plus de réservations'
          : 'You want to accept pets for more bookings, but worry about consequences',
      items: [
        {
          title:
            locale === 'fr'
              ? "Peur des Odeurs d'Animaux"
              : 'Fear of Pet Odors',
          description:
            locale === 'fr'
              ? 'Inquiétude que les odeurs affectent les futurs clients et avis'
              : 'Worried about lingering pet smells affecting future guests',
        },
        {
          title: locale === 'fr' ? 'Rotation Rapide' : 'Quick Turnaround',
          description:
            locale === 'fr'
              ? 'Besoin d\'éliminer les odeurs rapidement entre départ et arrivée'
              : 'Need to eliminate odors fast between check-out and check-in',
        },
        {
          title:
            locale === 'fr'
              ? 'Anxiété des Avis'
              : 'Review Anxiety',
          description:
            locale === 'fr'
              ? 'Un mauvais avis sur les odeurs peut nuire à votre annonce'
              : 'One bad review about smell can tank your listing',
        },
      ],
    },
    solution: {
      title: locale === 'fr' ? 'La Solution Purrify' : 'The Purrify Solution',
      subtitle:
        locale === 'fr'
          ? 'Élimination professionnelle des odeurs conçue pour l\'hospitalité'
          : 'Professional-grade odor elimination designed for hospitality',
      items: [
        {
          title:
            locale === 'fr'
              ? 'Élimination Instantanée'
              : 'Instant Odor Elimination',
          description:
            locale === 'fr'
              ? 'Le charbon actif piège les odeurs au niveau moléculaire en heures'
              : 'Activated carbon traps odors at molecular level within hours',
        },
        {
          title:
            locale === 'fr'
              ? 'Formule Adaptée aux Invités'
              : 'Guest-Friendly Formula',
          description:
            locale === 'fr'
              ? 'Sans parfum et non toxique, adapté aux invités sensibles'
              : 'Fragrance-free and non-toxic, suitable for sensitive guests',
        },
        {
          title:
            locale === 'fr' ? 'Application Rapide' : 'Quick Application',
          description:
            locale === 'fr'
              ? '60 secondes à ajouter à votre liste de nettoyage'
              : 'Add to your cleaning checklist. Takes 60 seconds',
        },
      ],
    },
    pricing: {
      title: locale === 'fr' ? 'Prix en Volume' : 'Volume Pricing',
      tiers: [
        {
          name: locale === 'fr' ? 'Pack Démarrage' : 'Starter Pack',
          properties: locale === 'fr' ? '1-5 propriétés' : '1-5 properties',
          discount: '15%',
        },
        {
          name: locale === 'fr' ? 'Professionnel' : 'Professional',
          properties: locale === 'fr' ? '6-20 propriétés' : '6-20 properties',
          discount: '25%',
          popular: true,
        },
        {
          name: locale === 'fr' ? 'Entreprise' : 'Enterprise',
          properties: locale === 'fr' ? '20+ propriétés' : '20+ properties',
          discount: '35%',
        },
      ],
    },
    contact: {
      email: 'hospitality@purrify.ca',
      title:
        locale === 'fr'
          ? 'Questions sur le Programme Hospitalité?'
          : 'Questions About the Hospitality Program?',
    },
  };
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Building2 className="h-4 w-4" />
          {t.hero.badge}
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t.hero.title}
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>
        {/* Stats */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">+60%</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.stats.bookings}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t.stats.bookingsDesc}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">100%</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.stats.fragranceFree}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">+$50</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.stats.revenue}</div>
            </div>
          </div>
        </div>
      </section>
      {/* Challenges */}
      <section>
        <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          {t.challenges.title}
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t.challenges.subtitle}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {t.challenges.items.map((item, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Solution */}
      <section className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-8">
        <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          {t.solution.title}
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t.solution.subtitle}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {t.solution.items.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Pricing */}
      <section>
        <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t.pricing.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricing.tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                tier.popular
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-600 shadow-lg'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="text-center mb-4">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {locale === 'fr' ? 'Plus Populaire' : 'Most Popular'}
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h4 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.properties}</div>
                <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">{tier.discount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'fr' ? 'de réduction' : 'off retail'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Contact */}
      <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
        <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t.contact.title}
        </h3>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href={`mailto:${t.contact.email}`}
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline"
          >
            <Mail className="h-5 w-5" />
            {t.contact.email}
          </a>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline"
          >
            <Phone className="h-5 w-5" />
            1-800-PURRIFY
          </a>
        </div>
      </section>
    </div>
  );
}