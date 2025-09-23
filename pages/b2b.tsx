import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from '../src/lib/translation-context';
import {
  TrendingUp,
  Users,
  Shield,
  Award,
  Package,
  DollarSign,
  Phone,
  Mail,
  FileText,
  CheckCircle
} from 'lucide-react';
import { useCallback, useState } from 'react';

export default function B2B() {
  const { locale } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = useCallback(() => setFormSubmitted(true), []);

  const pageTitle = locale === 'fr'
    ? 'Purrify B2B - Partenariat Détaillant et Vente en Gros Canada'
    : 'Purrify B2B - Retail Partnership & Wholesale Canada';

  const pageDescription = locale === 'fr'
    ? 'Devenez partenaire détaillant Purrify. Programme de vente en gros exclusif pour animaleries, boutiques d\'animaux et distributeurs au Canada. Marges attractives et support marketing complet.'
    : 'Become a Purrify retail partner. Exclusive wholesale program for pet stores, animal boutiques, and distributors across Canada. Attractive margins and comprehensive marketing support.';

  const canonicalUrl = `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}b2b`;

  // Partnership benefits
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: locale === 'fr' ? 'Marges Attractives' : 'Attractive Margins',
      description: locale === 'fr'
        ? 'Marges de détail compétitives avec volume croissant et remises de fidélité pour partenaires établis.'
        : 'Competitive retail margins with volume scaling and loyalty discounts for established partners.'
    },
    {
      icon: <Users className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: locale === 'fr' ? 'Support Marketing' : 'Marketing Support',
      description: locale === 'fr'
        ? 'Matériel promotionnel gratuit, formation produit et support publicitaire local pour vos équipes.'
        : 'Free promotional materials, product training, and local advertising support for your teams.'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      title: locale === 'fr' ? 'Protection Territoriale' : 'Territory Protection',
      description: locale === 'fr'
        ? 'Exclusivité régionale pour partenaires dédiés et protection contre la vente en ligne directe.'
        : 'Regional exclusivity for dedicated partners and protection from direct online selling.'
    },
    {
      icon: <Package className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
      title: locale === 'fr' ? 'Livraison Rapide' : 'Fast Delivery',
      description: locale === 'fr'
        ? 'Livraison gratuite sur commandes de 500$+ avec options express pour réapprovisionnements urgents.'
        : 'Free shipping on $500+ orders with express options for urgent restocking needs.'
    },
    {
      icon: <Award className="h-8 w-8 text-red-600 dark:text-red-400" />,
      title: locale === 'fr' ? 'Produit Primé' : 'Award-Winning Product',
      description: locale === 'fr'
        ? 'Produit fabriqué au Canada avec satisfaction client de 96% et garantie de remboursement complète.'
        : 'Made-in-Canada product with 96% customer satisfaction and complete money-back guarantee.'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />,
      title: locale === 'fr' ? 'Conditions Flexibles' : 'Flexible Terms',
      description: locale === 'fr'
        ? 'Termes de paiement Net 30 pour partenaires établis avec consignation disponible pour nouveaux détaillants.'
        : 'Net 30 payment terms for established partners with consignment available for new retailers.'
    }
  ];

  // Wholesale pricing tiers
  const pricingTiers = [
    {
      name: locale === 'fr' ? 'Nouveau Détaillant' : 'New Retailer',
      minOrder: locale === 'fr' ? '12 unités' : '12 units',
      discount: '25%',
      features: [
        locale === 'fr' ? 'Kit de démarrage gratuit' : 'Free starter kit',
        locale === 'fr' ? 'Matériel POS inclus' : 'POS materials included',
        locale === 'fr' ? 'Formation produit' : 'Product training',
        locale === 'fr' ? 'Support téléphonique' : 'Phone support'
      ],
      highlighted: false
    },
    {
      name: locale === 'fr' ? 'Partenaire Établi' : 'Established Partner',
      minOrder: locale === 'fr' ? '36 unités' : '36 units',
      discount: '35%',
      features: [
        locale === 'fr' ? 'Tous les avantages Nouveau' : 'All New Retailer benefits',
        locale === 'fr' ? 'Termes Net 30' : 'Net 30 terms',
        locale === 'fr' ? 'Support marketing local' : 'Local marketing support',
        locale === 'fr' ? 'Représentant dédié' : 'Dedicated rep',
        locale === 'fr' ? 'Exclusivité territoriale' : 'Territory exclusivity'
      ],
      highlighted: true
    },
    {
      name: locale === 'fr' ? 'Distributeur Régional' : 'Regional Distributor',
      minOrder: locale === 'fr' ? '144 unités' : '144 units',
      discount: '45%',
      features: [
        locale === 'fr' ? 'Tous les avantages Établi' : 'All Established benefits',
        locale === 'fr' ? 'Livraison directe magasin' : 'Direct-to-store delivery',
        locale === 'fr' ? 'Termes personnalisés' : 'Custom terms',
        locale === 'fr' ? 'Co-marketing budget' : 'Co-marketing budget',
        locale === 'fr' ? 'Développement produit' : 'Product development input'
      ],
      highlighted: false
    }
  ];

  // Success stories
  const successStories = [
    {
      store: 'Chico Boutique d\'animaux',
      location: 'Montréal, QC',
      quote: locale === 'fr'
        ? '"Purrify se vend facilement grâce à sa qualité exceptionnelle. Nos clients reviennent spécifiquement pour ce produit."'
        : '"Purrify sells itself thanks to its exceptional quality. Our customers come back specifically for this product."',
      results: locale === 'fr' ? '300% d\'augmentation des ventes' : '300% sales increase',
      avatar: 'CB'
    },
    {
      store: 'Global Pet Foods',
      location: 'Toronto, ON',
      quote: locale === 'fr'
        ? '"Le support marketing de Purrify nous a aidés à devenir le magasin #1 pour les additifs de litière dans notre région."'
        : '"Purrify\'s marketing support helped us become the #1 store for litter additives in our area."',
      results: locale === 'fr' ? 'Magasin #1 regional' : '#1 regional store',
      avatar: 'GPF'
    },
    {
      store: 'Urban Pet Supply',
      location: 'Vancouver, BC',
      quote: locale === 'fr'
        ? '"La marge et le support client font de Purrify notre produit d\'additif de litière le plus rentable."'
        : '"The margin and customer support make Purrify our most profitable litter additive product."',
      results: locale === 'fr' ? 'Marge la plus élevée' : 'Highest margins',
      avatar: 'UPS'
    }
  ];

  // Structured data for B2B page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Purrify",
      "description": "Premium activated carbon cat litter additive manufacturer seeking retail partners",
      "offers": {
        "@type": "Offer",
        "name": "Wholesale Partnership Program",
        "description": "Retail partnership program with attractive margins and marketing support",
        "category": "Wholesale/B2B Program",
        "eligibility": "Pet stores, animal boutiques, and distributors"
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
              url: 'https://www.purrify.ca/images/b2b-partnership.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify B2B retail partnership program for pet stores',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Purrify wholesale, pet store wholesale Canada, cat litter wholesale, retail partnership program, pet product distributor, wholesale pet supplies, B2B pet products',
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {locale === 'fr'
                ? 'Partenariat Détaillant Purrify'
                : 'Purrify Retail Partnership'
              }
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {locale === 'fr'
                ? 'Rejoignez notre réseau de partenaires détaillants exclusif et offrez le meilleur additif de litière pour chat au Canada à vos clients'
                : 'Join our exclusive retail partner network and offer Canada\'s premium cat litter additive to your customers'
              }
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">96%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Satisfaction Client' : 'Customer Satisfaction'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">45%</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Marge Maximale' : 'Max Wholesale Margin'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">150+</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Partenaires Actifs' : 'Active Partners'}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-4">
              <Link
                href="#partnership-form"
                className="inline-block bg-blue-600 dark:bg-blue-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 dark:hover:bg-blue-50 dark:hover:bg-blue-900/200 transition-colors"
              >
                {locale === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
              </Link>
              <Link
                href="#wholesale-pricing"
                className="inline-block border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                {locale === 'fr' ? 'Voir les Prix' : 'View Pricing'}
              </Link>
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {locale === 'fr'
              ? 'Pourquoi Choisir Purrify Comme Partenaire'
              : 'Why Choose Purrify as Your Partner'
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Wholesale Pricing */}
        <section id="wholesale-pricing" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {locale === 'fr' ? 'Programme de Prix en Gros' : 'Wholesale Pricing Program'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`rounded-lg p-8 ${
                tier.highlighted
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-600 dark:border-blue-400 shadow-lg'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}>
                {tier.highlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-blue-600 dark:bg-blue-600 text-white dark:text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {locale === 'fr' ? 'Plus Populaire' : 'Most Popular'}
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {locale === 'fr' ? 'Commande minimum:' : 'Minimum order:'} {tier.minOrder}
                  </div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {tier.discount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {locale === 'fr' ? 'remise sur PDSF' : 'off MSRP'}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#partnership-form"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-blue-600 dark:bg-blue-600 text-white dark:text-white hover:bg-blue-700 dark:hover:bg-blue-50 dark:hover:bg-blue-900/200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {locale === 'fr' ? 'Commencer' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {locale === 'fr' ? 'Témoignages de Partenaires' : 'Partner Success Stories'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{story.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{story.store}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{story.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  {story.quote}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-yellow-400 dark:text-yellow-300">★★★★★</div>
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {story.results}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Information */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr' ? 'Gamme de Produits Purrify' : 'Purrify Product Line'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'fr' ? 'Format Essai 17g' : 'Trial Size 17g'}
                </h3>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">$6.99</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' ? 'PDSF suggéré' : 'Suggested MSRP'}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {locale === 'fr' ? 'Parfait pour les nouveaux clients' : 'Perfect for new customers'}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'fr' ? 'Format Régulier 60g' : 'Regular Size 60g'}
                </h3>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">$19.99</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' ? 'PDSF suggéré' : 'Suggested MSRP'}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {locale === 'fr' ? 'Le plus populaire - meilleure valeur' : 'Most popular - best value'}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'fr' ? 'Grand Format 120g' : 'Large Size 120g'}
                </h3>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">$29.99</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' ? 'PDSF suggéré' : 'Suggested MSRP'}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {locale === 'fr' ? 'Économique pour multi-chats' : 'Economical for multi-cat homes'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Application Form */}
        <section id="partnership-form" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {locale === 'fr' ? 'Demande de Partenariat' : 'Partnership Application'}
            </h2>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
              {!formSubmitted ? (
                <form className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Nom du magasin' : 'Store name'} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Nom du contact' : 'Contact name'} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Courriel' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Téléphone' : 'Phone'} *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Adresse complète du magasin' : 'Complete store address'} *
                    </label>
                    <textarea
                      rows={3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Type de magasin' : 'Store type'} *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="">
                        {locale === 'fr' ? 'Sélectionner...' : 'Select...'}
                      </option>
                      <option value="independent">
                        {locale === 'fr' ? 'Animalerie indépendante' : 'Independent pet store'}
                      </option>
                      <option value="franchise">
                        {locale === 'fr' ? 'Franchise' : 'Franchise'}
                      </option>
                      <option value="chain">
                        {locale === 'fr' ? 'Chaîne de magasins' : 'Chain store'}
                      </option>
                      <option value="distributor">
                        {locale === 'fr' ? 'Distributeur' : 'Distributor'}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Années en affaires' : 'Years in business'} *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="">
                        {locale === 'fr' ? 'Sélectionner...' : 'Select...'}
                      </option>
                      <option value="0-1">0-1 {locale === 'fr' ? 'ans' : 'years'}</option>
                      <option value="2-5">2-5 {locale === 'fr' ? 'ans' : 'years'}</option>
                      <option value="6-10">6-10 {locale === 'fr' ? 'ans' : 'years'}</option>
                      <option value="10+">10+ {locale === 'fr' ? 'ans' : 'years'}</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {locale === 'fr' ? 'Intérêt dans Purrify' : 'Interest in Purrify'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={locale === 'fr'
                        ? 'Parlez-nous de votre magasin et pourquoi vous souhaitez porter Purrify...'
                        : 'Tell us about your store and why you want to carry Purrify...'
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-full bg-blue-600 dark:bg-blue-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 dark:hover:bg-blue-50 dark:hover:bg-blue-900/200 transition-colors"
                    >
                      {locale === 'fr' ? 'Soumettre la Demande' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {locale === 'fr' ? 'Demande Reçue!' : 'Application Received!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {locale === 'fr'
                      ? 'Merci pour votre intérêt! Notre équipe vous contactera dans les 24-48 heures pour discuter des prochaines étapes.'
                      : 'Thank you for your interest! Our team will contact you within 24-48 hours to discuss next steps.'
                    }
                  </p>
                  <div className="space-x-4">
                    <a
                      href="mailto:partners@purrify.ca"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      partners@purrify.ca
                    </a>
                    <a
                      href="tel:+1-800-PURRIFY"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      1-800-PURRIFY
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'fr' ? 'Questions? Parlons-en!' : 'Questions? Let\'s Talk!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {locale === 'fr'
              ? 'Notre équipe de développement des partenaires est là pour vous aider à réussir. Contactez-nous pour discuter de votre situation spécifique.'
              : 'Our partner development team is here to help you succeed. Contact us to discuss your specific situation.'
            }
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Appelez-nous' : 'Call Us'}
              </h4>
              <a href="tel:+1-800-PURRIFY" className="text-blue-600 dark:text-blue-400 hover:underline">
                1-800-PURRIFY
              </a>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Écrivez-nous' : 'Email Us'}
              </h4>
              <a href="mailto:partners@purrify.ca" className="text-blue-600 dark:text-blue-400 hover:underline">
                partners@purrify.ca
              </a>
            </div>
            <div className="text-center">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Documentation' : 'Documentation'}
              </h4>
              <a href="/partnership-guide.pdf" className="text-blue-600 dark:text-blue-400 hover:underline">
                {locale === 'fr' ? 'Guide Partenaire' : 'Partner Guide'}
              </a>
            </div>
          </div>
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
