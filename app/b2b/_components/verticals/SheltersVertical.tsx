import { Heart, Shield, DollarSign, Cat, Home, Truck } from 'lucide-react';
interface SheltersVerticalProps {
  locale: string;
}
export function SheltersVertical({ locale }: SheltersVerticalProps) {
  const t = {
    hero: {
      badge: locale === 'fr' ? 'Programme de Soutien' : 'Shelter Support Program',
      title: locale === 'fr' ? 'Partenaires pour une Cause' : 'Partner for a Cause',
      subtitle:
        locale === 'fr'
          ? 'Des Refuges Plus Frais, Des Chats Plus Heureux'
          : 'Fresher Shelters, Happier Cats',
      description:
        locale === 'fr'
          ? 'Nous croyons que chaque chat mérite un environnement propre. Notre programme pour refuges aide les organisations de sauvetage.'
          : 'We believe every cat deserves a clean environment. Our shelter program helps rescue organizations.',
    },
    stats: {
      discount: locale === 'fr' ? 'Remise Maximale' : 'Max Discount',
      partners: locale === 'fr' ? 'Refuges Partenaires' : 'Partner Shelters',
      matching: locale === 'fr' ? 'Dons Jumelés' : 'Donation Matching',
    },
    challenges: {
      title:
        locale === 'fr'
          ? 'Nous Comprenons les Défis'
          : 'We Understand Shelter Challenges',
      items: [
        {
          icon: <Cat className="h-6 w-6" />,
          title: locale === 'fr' ? 'Volume Élevé' : 'High Volume of Cats',
          description:
            locale === 'fr'
              ? 'Gérer plusieurs chats dans un espace limité avec contrôle des odeurs constant.'
              : 'Managing many cats in limited space with constant odor control.',
        },
        {
          icon: <DollarSign className="h-6 w-6" />,
          title: locale === 'fr' ? 'Contraintes Budgétaires' : 'Budget Constraints',
          description:
            locale === 'fr'
              ? 'Maximiser chaque dollar tout en maintenant des normes élevées.'
              : 'Stretching every dollar while maintaining high standards.',
        },
        {
          icon: <Home className="h-6 w-6" />,
          title:
            locale === 'fr'
              ? "Environnement d'Adoption"
              : 'Adoption Environment',
          description:
            locale === 'fr'
              ? 'Créer un environnement accueillant pour les adoptants potentiels.'
              : 'Creating a welcoming environment for potential adopters.',
        },
        {
          icon: <Heart className="h-6 w-6" />,
          title: locale === 'fr' ? 'Santé des Chats' : 'Cat Health',
          description:
            locale === 'fr'
              ? "Minimiser l'ammoniaque pour protéger la santé respiratoire."
              : 'Minimizing ammonia to protect cats\' respiratory health.',
        },
      ],
    },
    benefits: {
      title:
        locale === 'fr'
          ? 'Pourquoi Purrify pour les Refuges'
          : 'Why Purrify for Shelters',
      items: [
        {
          icon: <Shield className="h-6 w-6 text-emerald-600 text-emerald-400" />,
          title: locale === 'fr' ? 'Naturel et Sans Danger' : 'Natural and Non-Toxic',
          description:
            locale === 'fr'
              ? 'Charbon actif 100% naturel, sans danger pour les chatons et chats sensibles.'
              : '100% natural activated carbon, safe for kittens and sensitive cats.',
        },
        {
          icon: <DollarSign className="h-6 w-6 text-green-600" />,
          title:
            locale === 'fr' ? 'Rentable en Volume' : 'Cost-Effective at Volume',
          description:
            locale === 'fr'
              ? 'Tarifs volume significatifs. Prolonge la durée de vie de la litière.'
              : 'Significant volume pricing. Extends litter life.',
        },
        {
          icon: <Heart className="h-6 w-6 text-pink-600 text-pink-400" />,
          title:
            locale === 'fr'
              ? "Environnement d'Adoption"
              : 'Better Adoption Environment',
          description:
            locale === 'fr'
              ? 'Un refuge sans odeur encourage les adoptions.'
              : 'An odor-free shelter encourages adoptions.',
        },
      ],
    },
    program: {
      title:
        locale === 'fr'
          ? 'Programme Spécial Refuges'
          : 'Special Shelter Program',
      features: [
        {
          title:
            locale === 'fr'
              ? 'Remises de Volume'
              : 'Significant Volume Discounts',
          description:
            locale === 'fr'
              ? "Jusqu'à 50% de réduction pour les refuges enregistrés."
              : 'Up to 50% off for registered shelters.',
        },
        {
          title: locale === 'fr' ? 'Dons Jumelés' : 'Donation Matching',
          description:
            locale === 'fr'
              ? 'Nous égalons les dons de Purrify faits à votre refuge.'
              : "We'll match Purrify donations made to your shelter.",
        },
        {
          title:
            locale === 'fr'
              ? 'Histoires en Vedette'
              : 'Featured Shelter Stories',
          description:
            locale === 'fr'
              ? 'Votre refuge en vedette sur notre site et réseaux.'
              : 'Get your shelter featured on our website and social.',
        },
      ],
    },
    steps: {
      title: locale === 'fr' ? 'Comment Commencer' : 'Getting Started',
      items: [
        {
          number: '1',
          title: locale === 'fr' ? 'Postulez' : 'Apply',
          description:
            locale === 'fr'
              ? 'Remplissez notre formulaire de partenariat refuge.'
              : 'Fill out our simple shelter partnership application.',
        },
        {
          number: '2',
          title: locale === 'fr' ? 'Vérification' : 'Verification',
          description:
            locale === 'fr'
              ? 'Nous vérifions votre statut de bienfaisance.'
              : 'We verify your registered charity status.',
        },
        {
          number: '3',
          title: locale === 'fr' ? 'Commencez' : 'Start Saving',
          description:
            locale === 'fr'
              ? 'Accédez aux tarifs refuges et planifiez vos livraisons.'
              : 'Access shelter pricing and schedule deliveries.',
        },
      ],
    },
    contact: {
      email: 'shelters@purrify.ca',
      title:
        locale === 'fr'
          ? 'Rejoignez le Programme Refuges'
          : 'Join the Shelter Program',
    },
  };
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 bg-pink-900/30 text-pink-800 text-pink-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Heart className="h-4 w-4" />
          {t.hero.badge}
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-white mb-6">
          {t.hero.title}
        </h2>
        <p className="text-xl text-pink-600 text-pink-400 mb-2 font-semibold">
          {t.hero.subtitle}
        </p>
        <p className="text-lg text-gray-500 text-gray-400 mb-8 max-w-3xl mx-auto">
          {t.hero.description}
        </p>
        {/* Stats */}
        <div className="bg-pink-50 bg-pink-900/20 border border-pink-200 border-pink-800 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600 text-pink-400 mb-2">50%</div>
              <div className="text-sm text-gray-700 text-gray-300">{t.stats.discount}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 text-pink-400 mb-2">100+</div>
              <div className="text-sm text-gray-700 text-gray-300">{t.stats.partners}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 text-pink-400 mb-2">1:1</div>
              <div className="text-sm text-gray-700 text-gray-300">{t.stats.matching}</div>
            </div>
          </div>
        </div>
      </section>
      {/* Challenges */}
      <section>
        <h3 className="font-heading text-3xl font-bold text-gray-900 text-white mb-4 text-center">
          {t.challenges.title}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.challenges.items.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-lg p-6 text-center shadow-sm"
            >
              <div className="w-14 h-14 bg-pink-100 bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600 text-pink-400">
                {item.icon}
              </div>
              <h4 className="font-heading text-lg font-semibold text-gray-900 text-white mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Benefits */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 from-gray-900 to-gray-800 rounded-2xl p-8">
        <h3 className="font-heading text-3xl font-bold text-gray-900 text-white mb-8 text-center">
          {t.benefits.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {t.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg flex gap-4"
            >
              <div className="flex-shrink-0">{benefit.icon}</div>
              <div>
                <h4 className="font-heading font-bold text-lg text-gray-900 text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Program Features */}
      <section>
        <h3 className="font-heading text-3xl font-bold text-gray-900 text-white mb-8 text-center">
          {t.program.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {t.program.features.map((feature, index) => (
            <div key={index} className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg">
              <h4 className="font-heading font-bold text-lg text-gray-900 text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Steps */}
      <section className="bg-gray-50 bg-gray-800 rounded-2xl p-8">
        <h3 className="font-heading text-3xl font-bold text-gray-900 text-white mb-8 text-center">
          {t.steps.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.items.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 bg-pink-100 bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600 text-pink-400">
                  {step.number}
                </span>
              </div>
              <h4 className="font-heading text-xl font-semibold text-gray-900 text-white mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600 text-gray-300">{step.description}</p>
              {index < t.steps.items.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <Truck className="h-6 w-6 text-gray-300 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Contact */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold mb-4">{t.contact.title}</h3>
          <a
            href={`mailto:${t.contact.email}`}
            className="inline-block bg-white bg-gray-900 text-pink-600 text-pink-400 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 hover:bg-gray-800 transition-colors"
          >
            {t.contact.email}
          </a>
        </div>
      </section>
    </div>
  );
}