import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from '../src/lib/translation-context';
import {
  Heart,
  Users,
  Shield,
  DollarSign,
  Truck,
  Phone,
  Mail,
  CheckCircle,
  Cat,
  Home,
  Sparkles,
  HeartHandshake,
  Scissors,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';
import { useCallback, useState, FormEvent } from 'react';
import { buildAvailabilityUrl, getPriceValidityDate } from '../src/lib/seo-utils';
import { CONTACT_INFO, PHONE_MESSAGING } from '../src/lib/constants';
import { B2BCaseStudies } from '../src/components/sections/b2b-case-studies';

export default function SheltersPage() {
  const { t, locale } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    organizationType: '',
    catCount: '',
    charityNumber: '',
    message: '',
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact-b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone || undefined,
          businessType: 'shelter',
          location: formData.location || undefined,
          catCount: formData.catCount || undefined,
          message: formData.message || undefined,
          locale,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
      } else {
        setErrorMessage(result.message || 'An error occurred. Please try again.');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, locale]);

  // Get translations with fallbacks
  const shelters = t.shelters || {};
  const seo = shelters.seo || {};
  const hero = shelters.hero || {};
  const challenges = shelters.challenges || {};
  const benefits = shelters.benefits || {};
  const program = shelters.program || {};
  const gettingStarted = shelters.gettingStarted || {};
  const cta = shelters.cta || {};
  const form = shelters.form || {};

  const pageTitle = seo.pageTitle || (locale === 'fr'
    ? 'Purrify pour Refuges - Programme Partenaire pour Refuges Animaliers'
    : 'Purrify for Shelters - Animal Shelter Partner Program');

  const pageDescription = seo.description || (locale === 'fr'
    ? 'Programme exclusif pour refuges et organisations de sauvetage. Tarifs de volume, options de dons et support pour les refuges animaliers au Canada.'
    : 'Exclusive program for animal shelters and rescue organizations. Volume discounts, donation matching, and support for shelters across Canada.');

  const canonicalUrl = `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}shelters`;
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  // Shelter-specific challenges
  const shelterChallenges = [
    {
      icon: <Cat className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
      title: challenges.highVolume?.title || (locale === 'fr' ? 'Volume Elevé de Chats' : 'High Volume of Cats'),
      description: challenges.highVolume?.description || (locale === 'fr'
        ? 'Gérer plusieurs chats dans un espace limité avec un contrôle des odeurs constant.'
        : 'Managing many cats in limited space with constant odor control needs.')
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: challenges.budget?.title || (locale === 'fr' ? 'Contraintes Budgétaires' : 'Budget Constraints'),
      description: challenges.budget?.description || (locale === 'fr'
        ? 'Maximiser chaque dollar tout en maintenant des normes de soins élevées.'
        : 'Stretching every dollar while maintaining high standards of care.')
    },
    {
      icon: <Home className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: challenges.environment?.title || (locale === 'fr' ? 'Environnement d\'Adoption' : 'Adoption Environment'),
      description: challenges.environment?.description || (locale === 'fr'
        ? 'Créer un environnement accueillant pour les adoptants potentiels.'
        : 'Creating a welcoming environment for potential adopters.')
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />,
      title: challenges.health?.title || (locale === 'fr' ? 'Santé des Chats' : 'Cat Health'),
      description: challenges.health?.description || (locale === 'fr'
        ? 'Minimiser l\'ammoniaque pour protéger la santé respiratoire des chats.'
        : 'Minimizing ammonia to protect cats\' respiratory health.')
    }
  ];

  // Why Purrify for Shelters
  const shelterBenefits = [
    {
      icon: <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: benefits.natural?.title || (locale === 'fr' ? 'Naturel et Non-Toxique' : 'Natural and Non-Toxic'),
      description: benefits.natural?.description || (locale === 'fr'
        ? 'Charbon actif de noix de coco 100% naturel, sans danger pour les chatons et les chats sensibles.'
        : '100% natural coconut activated carbon, pet-friendly for kittens and sensitive cats.')
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: benefits.costEffective?.title || (locale === 'fr' ? 'Rentable en Volume' : 'Cost-Effective at Volume'),
      description: benefits.costEffective?.description || (locale === 'fr'
        ? 'Tarifs de volume significatifs pour les refuges. Prolonge la durée de vie de la litière.'
        : 'Significant volume pricing for shelters. Extends litter life, reducing overall costs.')
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      title: benefits.ammonia?.title || (locale === 'fr' ? 'Réduction de l\'Ammoniaque' : 'Ammonia Reduction'),
      description: benefits.ammonia?.description || (locale === 'fr'
        ? 'Réduit l\'ammoniaque pour un environnement plus sain pour les chats et le personnel.'
        : 'Reduces ammonia for healthier environment for cats and staff alike.')
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: benefits.adoption?.title || (locale === 'fr' ? 'Meilleur Environnement d\'Adoption' : 'Better Adoption Environment'),
      description: benefits.adoption?.description || (locale === 'fr'
        ? 'Un refuge sans odeur rend les visiteurs plus à l\'aise et encourage les adoptions.'
        : 'An odor-free shelter makes visitors more comfortable and encourages adoptions.')
    }
  ];

  // Shelter Program Features
  const programFeatures = [
    {
      icon: <DollarSign className="h-6 w-6 text-green-500 dark:text-green-400" />,
      title: program.volumeDiscounts?.title || (locale === 'fr' ? 'Remises de Volume Significatives' : 'Significant Volume Discounts'),
      description: program.volumeDiscounts?.description || (locale === 'fr'
        ? 'Jusqu\'à 50% de réduction pour les refuges enregistrés.'
        : 'Up to 50% off for registered shelters.')
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-red-500 dark:text-red-400" />,
      title: program.donationMatching?.title || (locale === 'fr' ? 'Dons Jumelés' : 'Donation Matching'),
      description: program.donationMatching?.description || (locale === 'fr'
        ? 'Nous égalerons les dons de Purrify faits à votre refuge.'
        : 'We\'ll match Purrify donations made to your shelter.')
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-500 dark:text-pink-400" />,
      title: program.featuredStories?.title || (locale === 'fr' ? 'Histoires de Refuges en Vedette' : 'Featured Shelter Stories'),
      description: program.featuredStories?.description || (locale === 'fr'
        ? 'Présentez votre refuge sur notre site et réseaux sociaux.'
        : 'Get your shelter featured on our website and social media.')
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      title: program.taxDeductible?.title || (locale === 'fr' ? 'Options Déductibles d\'Impôt' : 'Tax-Deductible Options'),
      description: program.taxDeductible?.description || (locale === 'fr'
        ? 'Partenariats structurés pour maximiser les avantages fiscaux.'
        : 'Partnerships structured to maximize tax benefits where applicable.')
    }
  ];

  // Getting Started Steps
  const steps = [
    {
      number: '1',
      title: gettingStarted.step1?.title || (locale === 'fr' ? 'Postulez' : 'Apply'),
      description: gettingStarted.step1?.description || (locale === 'fr'
        ? 'Remplissez notre formulaire de partenariat refuge simple.'
        : 'Fill out our simple shelter partnership application.')
    },
    {
      number: '2',
      title: gettingStarted.step2?.title || (locale === 'fr' ? 'Vérification' : 'Verification'),
      description: gettingStarted.step2?.description || (locale === 'fr'
        ? 'Nous vérifions votre statut d\'organisme de bienfaisance enregistré.'
        : 'We verify your registered charity or rescue status.')
    },
    {
      number: '3',
      title: gettingStarted.step3?.title || (locale === 'fr' ? 'Commencez à Économiser' : 'Start Saving'),
      description: gettingStarted.step3?.description || (locale === 'fr'
        ? 'Accédez aux tarifs refuges et planifiez vos livraisons.'
        : 'Access shelter pricing and schedule your deliveries.')
    }
  ];

  // Structured data for Shelter Program page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Purrify",
      "description": "Premium activated carbon cat litter additive manufacturer offering special programs for animal shelters",
      "offers": {
        "@type": "Offer",
        "name": "Shelter Partnership Program",
        "description": "Volume discounts and donation matching for registered animal shelters and rescues",
        "category": "Nonprofit/Shelter Program",
        "eligibility": "Registered animal shelters, rescues, and humane societies",
        "availability": availabilityUrl,
        "priceValidUntil": priceValidUntil
      }
    }
  };

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://www.purrify.ca/images/shelters-partnership.jpg',
              width: 1200,
              height: 630,
              alt: locale === 'fr'
                ? 'Programme partenaire Purrify pour refuges animaliers'
                : 'Purrify shelter partnership program for animal rescues',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: locale === 'fr'
              ? 'Purrify refuges, charbon actif refuge, litière refuge, programme refuges, don refuge chat, partenariat refuge'
              : 'Purrify shelters, activated carbon shelter, shelter litter additive, shelter program, cat rescue donation, shelter partnership',
          },
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              {hero.badge || (locale === 'fr' ? 'Programme de Soutien aux Refuges' : 'Shelter Support Program')}
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {hero.title || (locale === 'fr'
                ? 'Partenaires pour une Cause'
                : 'Partner for a Cause'
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              {hero.subtitle || (locale === 'fr'
                ? 'Des Refuges Plus Frais, Des Chats Plus Heureux'
                : 'Fresher Shelters, Happier Cats'
              )}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              {hero.description || (locale === 'fr'
                ? 'Nous croyons que chaque chat mérite un environnement propre et sans odeur, surtout ceux qui attendent leur famille pour toujours. Notre programme pour refuges aide les organisations de sauvetage à maintenir des espaces accueillants tout en respectant leur budget.'
                : 'We believe every cat deserves a clean, odor-free environment - especially those waiting for their forever homes. Our shelter program helps rescue organizations maintain welcoming spaces while staying within budget.'
              )}
            </p>

            {/* Stats */}
            <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">50%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Remise Maximale pour Refuges' : 'Max Shelter Discount'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">100+</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Refuges Partenaires' : 'Partner Shelters'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">1:1</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Dons Jumelés' : 'Donation Matching'}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-x-4">
              <Link
                href="#shelter-application"
                className="inline-block bg-pink-600 dark:bg-pink-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 dark:hover:bg-pink-500 transition-colors"
              >
                {cta.primary || (locale === 'fr' ? 'Postuler au Programme Refuges' : 'Apply for Shelter Program')}
              </Link>
              <Link
                href="#shelter-benefits"
                className="inline-block border border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400 bg-white dark:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
              >
                {cta.secondary || (locale === 'fr' ? 'Voir les Avantages' : 'See Benefits')}
              </Link>
            </div>
          </div>
        </section>

        {/* Shelter Challenges */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {challenges.title || (locale === 'fr'
              ? 'Nous Comprenons les Défis des Refuges'
              : 'We Understand Shelter Challenges'
            )}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {challenges.subtitle || (locale === 'fr'
              ? 'Gérer le contrôle des odeurs dans un refuge n\'est pas une mince affaire. Nous sommes là pour vous aider.'
              : 'Managing odor control in a shelter is no small task. We\'re here to help.'
            )}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shelterChallenges.map((challenge, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  {challenge.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {challenge.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Purrify for Shelters */}
        <section id="shelter-benefits" className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {benefits.title || (locale === 'fr'
              ? 'Pourquoi Purrify pour les Refuges'
              : 'Why Purrify for Shelters'
            )}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {benefits.subtitle || (locale === 'fr'
              ? 'Une solution naturelle et abordable qui aide les refuges à créer de meilleurs environnements pour les chats et les visiteurs.'
              : 'A natural, affordable solution that helps shelters create better environments for cats and visitors alike.'
            )}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {shelterBenefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <div className="mb-16">
          <B2BCaseStudies businessType="shelter" limit={1} />
        </div>

        {/* Special Shelter Program */}
        <section className="mb-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-8 md:p-12">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {program.title || (locale === 'fr'
              ? 'Programme Spécial pour Refuges'
              : 'Special Shelter Program'
            )}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {program.subtitle || (locale === 'fr'
              ? 'Nous nous engageons à soutenir les organisations qui sauvent des vies de chats.'
              : 'We\'re committed to supporting organizations that save cat lives.'
            )}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {programFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {gettingStarted.title || (locale === 'fr' ? 'Comment Commencer' : 'Getting Started')}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {gettingStarted.subtitle || (locale === 'fr'
              ? 'Rejoindre notre programme refuges est simple et rapide.'
              : 'Joining our shelter program is simple and fast.'
            )}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">{step.number}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <Truck className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="shelter-application" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {form.title || (locale === 'fr' ? 'Demande de Partenariat Refuge' : 'Shelter Partnership Application')}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {form.subtitle || (locale === 'fr'
                ? 'Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24-48 heures.'
                : 'Fill out the form below and we\'ll get back to you within 24-48 hours.'
              )}
            </p>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.shelterName || (locale === 'fr' ? 'Nom du refuge' : 'Shelter name')} *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.contactName || (locale === 'fr' ? 'Nom du contact' : 'Contact name')} *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.email || (locale === 'fr' ? 'Courriel' : 'Email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.phone || (locale === 'fr' ? 'Téléphone' : 'Phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.address || (locale === 'fr' ? 'Adresse du refuge' : 'Shelter address')}
                    </label>
                    <textarea
                      rows={2}
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.organizationType || (locale === 'fr' ? 'Type d\'organisation' : 'Organization type')}
                    </label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    >
                      <option value="">
                        {locale === 'fr' ? 'Sélectionner...' : 'Select...'}
                      </option>
                      <option value="shelter">
                        {locale === 'fr' ? 'Refuge enregistré' : 'Registered shelter'}
                      </option>
                      <option value="rescue">
                        {locale === 'fr' ? 'Organisation de sauvetage' : 'Rescue organization'}
                      </option>
                      <option value="humane-society">
                        {locale === 'fr' ? 'Société humane' : 'Humane society'}
                      </option>
                      <option value="foster-network">
                        {locale === 'fr' ? 'Réseau de familles d\'accueil' : 'Foster network'}
                      </option>
                      <option value="other">
                        {locale === 'fr' ? 'Autre' : 'Other'}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.catCount || (locale === 'fr' ? 'Nombre de chats (approx.)' : 'Number of cats (approx.)')}
                    </label>
                    <select
                      name="catCount"
                      value={formData.catCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    >
                      <option value="">
                        {locale === 'fr' ? 'Sélectionner...' : 'Select...'}
                      </option>
                      <option value="1-10">1-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26-50">26-50</option>
                      <option value="51-100">51-100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.charityNumber || (locale === 'fr' ? 'Numéro d\'organisme de bienfaisance (si applicable)' : 'Charity registration number (if applicable)')}
                    </label>
                    <input
                      type="text"
                      name="charityNumber"
                      value={formData.charityNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.message || (locale === 'fr' ? 'Parlez-nous de votre refuge' : 'Tell us about your shelter')}
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={locale === 'fr'
                        ? 'Partagez votre mission, vos défis actuels avec le contrôle des odeurs, et comment Purrify pourrait vous aider...'
                        : 'Share your mission, current odor control challenges, and how Purrify might help...'
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>
                  {errorMessage && (
                    <div className="md:col-span-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-pink-600 dark:bg-pink-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 dark:hover:bg-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? (locale === 'fr' ? 'Envoi en cours...' : 'Submitting...')
                        : (form.submit || (locale === 'fr' ? 'Soumettre la Demande' : 'Submit Application'))
                      }
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {form.successTitle || (locale === 'fr' ? 'Demande Recue!' : 'Application Received!')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t.forms?.success?.shelterContact || 'Thank you for your interest! Our team will contact you within 24-48 hours to discuss how we can support your shelter.'}
                  </p>
                  <div className="space-y-4">
                    <div className="space-x-4">
                      <a
                        href="mailto:shelters@purrify.ca"
                        className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        shelters@purrify.ca
                      </a>
                      <a
                        href={CONTACT_INFO.phoneHref}
                        className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {PHONE_MESSAGING.callout}
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      {PHONE_MESSAGING.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Programs */}
        <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800/50 rounded-2xl mb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Découvrez Nos Autres Programmes' : locale === 'zh' ? '探索我们的其他计划' : 'Explore Our Other Programs'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {locale === 'fr' ? 'Programmes de partenariat pour différents types d\'entreprises' : locale === 'zh' ? '为不同类型的企业提供合作伙伴计划' : 'Partnership programs for different business types'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/groomers"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Scissors className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {locale === 'fr' ? 'Pour Toiletteurs' : locale === 'zh' ? '宠物美容师计划' : 'For Groomers'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'fr' ? 'Vente additionnelle' : locale === 'zh' ? '附加销售' : 'Add-on sales'}
                  </div>
                </div>
              </Link>
              <Link
                href="/retailers"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {locale === 'fr' ? 'Pour Détaillants' : locale === 'zh' ? '零售商计划' : 'For Retailers'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'fr' ? 'Prix de gros' : locale === 'zh' ? '批发定价' : 'Wholesale pricing'}
                  </div>
                </div>
              </Link>
              <Link
                href="/affiliate"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {locale === 'fr' ? 'Programme Affiliation' : locale === 'zh' ? '联盟计划' : 'Affiliate Program'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'fr' ? '30% commission' : locale === 'zh' ? '30% 佣金' : '30% commission'}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Alignment */}
        <section className="text-center bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-2xl p-8 md:p-12">
          <Heart className="h-12 w-12 text-pink-600 dark:text-pink-400 mx-auto mb-6" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {cta.missionTitle || (locale === 'fr'
              ? 'Alignes sur la Mission du Bien-Etre Animal'
              : 'Aligned with Your Animal Welfare Mission'
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {cta.missionDescription || (locale === 'fr'
              ? 'Nous croyons que chaque chat merite un environnement propre et confortable. En partenariat avec des refuges, nous aidons a creer de meilleurs espaces pour les chats en attente de leur famille pour toujours, tout en soutenant les organisations incroyables qui rendent cela possible.'
              : 'We believe every cat deserves a clean, comfortable environment. By partnering with shelters, we help create better spaces for cats waiting for their forever homes while supporting the incredible organizations that make it possible.'
            )}
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Phone className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Appelez-nous' : 'Call Us'}
              </h4>
              <a href={CONTACT_INFO.phoneHref} className="text-pink-600 dark:text-pink-400 hover:underline font-bold">
                {PHONE_MESSAGING.callout}
              </a>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Ecrivez-nous' : 'Email Us'}
              </h4>
              <a href="mailto:shelters@purrify.ca" className="text-pink-600 dark:text-pink-400 hover:underline">
                shelters@purrify.ca
              </a>
            </div>
            <div className="text-center">
              <HeartHandshake className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Donnez au nom d\'un refuge' : 'Donate on behalf of a shelter'}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {locale === 'fr'
                  ? 'Nous jumelons les dons de Purrify!'
                  : 'We match Purrify donations!'
                }
              </p>
            </div>
          </div>
          <Link
            href="#shelter-application"
            className="inline-block bg-pink-600 dark:bg-pink-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 dark:hover:bg-pink-500 transition-colors"
          >
            {cta.finalButton || (locale === 'fr' ? 'Rejoignez le Programme Refuges' : 'Join the Shelter Program')}
          </Link>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  };
};
