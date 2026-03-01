'use client';
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
  CheckCircle,
} from 'lucide-react';
import { CONTACT_INFO, PHONE_MESSAGING } from '@/lib/constants';
import { formatProductPrice } from '@/lib/pricing';
interface RetailVerticalProps {
  locale: string;
}
export function RetailVertical({ locale }: RetailVerticalProps) {
  const partnerEmail = 'partners@purrify.ca';
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600 text-blue-400" />,
      title: locale === 'fr' ? 'Marges Attractives' : 'Attractive Margins',
      description:
        locale === 'fr'
          ? 'Marges de détail compétitives avec volume croissant et remises de fidélité pour partenaires établis.'
          : 'Competitive retail margins with volume scaling and loyalty discounts for established partners.',
    },
    {
      icon: <Users className="h-8 w-8 text-green-600 text-green-400" />,
      title: locale === 'fr' ? 'Support Marketing' : 'Marketing Support',
      description:
        locale === 'fr'
          ? 'Matériel promotionnel gratuit, formation produit et support publicitaire local pour vos équipes.'
          : 'Free promotional materials, product training, and local advertising support for your teams.',
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600 text-purple-400" />,
      title: locale === 'fr' ? 'Protection Territoriale' : 'Territory Protection',
      description:
        locale === 'fr'
          ? 'Exclusivité régionale pour partenaires dédiés et protection contre la vente en ligne directe.'
          : 'Regional exclusivity for dedicated partners and protection from direct online selling.',
    },
    {
      icon: <Package className="h-8 w-8 text-orange-600 text-orange-400" />,
      title: locale === 'fr' ? 'Livraison Rapide' : 'Fast Delivery',
      description:
        locale === 'fr'
          ? 'Livraison gratuite sur commandes de 500$+ avec options express pour réapprovisionnements urgents.'
          : 'Fast shipping on $500+ orders with express options for urgent restocking needs.',
    },
    {
      icon: <Award className="h-8 w-8 text-red-600 text-red-400" />,
      title: locale === 'fr' ? 'Produit Primé' : 'Award-Winning Product',
      description:
        locale === 'fr'
          ? 'Produit fabriqué au Canada avec satisfaction client de 96% et garantie de remboursement complète.'
          : 'Made-in-Canada product with 96% customer satisfaction and complete money-back guarantee.',
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-600 text-yellow-400" />,
      title: locale === 'fr' ? 'Conditions Flexibles' : 'Flexible Terms',
      description:
        locale === 'fr'
          ? 'Termes de paiement Net 30 pour partenaires établis avec consignation disponible pour nouveaux détaillants.'
          : 'Net 30 payment terms for established partners with consignment available for new retailers.',
    },
  ];
  const pricingTiers = [
    {
      name: locale === 'fr' ? 'Nouveau Détaillant' : 'New Retailer',
      minOrder: locale === 'fr' ? '12 unités' : '12 units',
      discount: '25%',
      features: [
        locale === 'fr' ? 'Kit de démarrage gratuit' : 'Free starter kit',
        locale === 'fr' ? 'Matériel POS inclus' : 'POS materials included',
        locale === 'fr' ? 'Formation produit' : 'Product training',
        locale === 'fr' ? 'Support téléphonique' : 'Phone support',
      ],
      highlighted: false,
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
        locale === 'fr' ? 'Exclusivité territoriale' : 'Territory exclusivity',
      ],
      highlighted: true,
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
        locale === 'fr' ? 'Développement produit' : 'Product development input',
      ],
      highlighted: false,
    },
  ];
  const successStories = [
    {
      store: "Chico Boutique d'animaux",
      location: 'Montréal, QC',
      quote:
        locale === 'fr'
          ? '"Purrify se vend facilement grâce à sa qualité exceptionnelle. Nos clients reviennent spécifiquement pour ce produit."'
          : '"Purrify sells itself thanks to its exceptional quality. Our customers come back specifically for this product."',
      results: locale === 'fr' ? "300% d'augmentation des ventes" : '300% sales increase',
      avatar: 'CB',
    },
    {
      store: 'Global Pet Foods',
      location: 'Toronto, ON',
      quote:
        locale === 'fr'
          ? '"Le support marketing de Purrify nous a aidés à devenir le magasin #1 pour les additifs de litière dans notre région."'
          : "\"Purrify's marketing support helped us become the #1 store for litter additives in our area.\"",
      results: locale === 'fr' ? 'Magasin #1 regional' : '#1 regional store',
      avatar: 'GPF',
    },
    {
      store: 'Urban Pet Supply',
      location: 'Vancouver, BC',
      quote:
        locale === 'fr'
          ? '"La marge et le support client font de Purrify notre produit d\'additif de litière le plus rentable."'
          : '"The margin and customer support make Purrify our most profitable litter additive product."',
      results: locale === 'fr' ? 'Marge la plus élevée' : 'Highest margins',
      avatar: 'UPS',
    },
  ];
  return (
    <div className="space-y-16">
      {/* Hero Stats */}
      <div className="bg-blue-50 bg-blue-900/20 border border-blue-200 border-blue-800 rounded-lg p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 text-blue-400 mb-2">96%</div>
            <div className="text-sm text-gray-700 text-gray-300">
              {locale === 'fr' ? 'Satisfaction Client' : 'Customer Satisfaction'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 text-blue-400 mb-2">45%</div>
            <div className="text-sm text-gray-700 text-gray-300">
              {locale === 'fr' ? 'Marge Maximale' : 'Max Wholesale Margin'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 text-blue-400 mb-2">150+</div>
            <div className="text-sm text-gray-700 text-gray-300">
              {locale === 'fr' ? 'Partenaires Actifs' : 'Active Partners'}
            </div>
          </div>
        </div>
      </div>
      {/* Partnership Benefits */}
      <section>
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-white mb-12 text-center">
          {locale === 'fr'
            ? 'Pourquoi Choisir Purrify Comme Partenaire'
            : 'Why Choose Purrify as Your Partner'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="font-heading text-xl font-semibold text-gray-900 text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Wholesale Pricing */}
      <section id="wholesale-pricing">
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-white mb-12 text-center">
          {locale === 'fr'
            ? 'Programme de Prix en Gros'
            : 'Wholesale Pricing Program'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                tier.highlighted
                  ? 'bg-blue-50 bg-blue-900/20 border-2 border-blue-300 border-blue-600 shadow-lg'
                  : 'bg-white bg-gray-800 border border-gray-200 border-gray-700 shadow-sm'
              }`}
            >
              {tier.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-blue-600 bg-blue-600 text-white text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {locale === 'fr' ? 'Plus Populaire' : 'Most Popular'}
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-semibold text-gray-900 text-white mb-2">
                  {tier.name}
                </h3>
                <div className="text-sm text-gray-600 text-gray-400 mb-4">
                  {locale === 'fr' ? 'Commande minimum:' : 'Minimum order:'}{' '}
                  {tier.minOrder}
                </div>
                <div className="text-4xl font-bold text-blue-600 text-blue-400 mb-2">
                  {tier.discount}
                </div>
                <div className="text-sm text-gray-600 text-gray-400">
                  {locale === 'fr' ? 'remise sur PDSF' : 'off MSRP'}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {/* Success Stories */}
      <section>
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-white mb-12 text-center">
          {locale === 'fr'
            ? 'Témoignages de Partenaires'
            : 'Partner Success Stories'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-blue-600 text-blue-400">
                    {story.avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-white">
                    {story.store}
                  </h4>
                  <p className="text-sm text-gray-600 text-gray-400">
                    {story.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-gray-300 italic mb-4">
                {story.quote}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 text-yellow-300">★★★★★</div>
                <div className="text-sm font-semibold text-green-600 text-green-400">
                  {story.results}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Product Information */}
      <section className="bg-gray-50 bg-gray-800 rounded-lg p-8">
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-white mb-8 text-center">
          {locale === 'fr'
            ? 'Gamme de Produits Purrify'
            : 'Purrify Product Line'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white bg-gray-700 rounded-lg p-6 mb-4">
              <h3 className="font-heading text-lg font-semibold mb-2">
                {locale === 'fr' ? 'Format Essai 12g' : 'Trial Size 12g'}
              </h3>
              <div className="text-2xl font-bold text-blue-600 text-blue-400 mb-2">
                {trialPrice}
              </div>
              <div className="text-sm text-gray-600 text-gray-400 mb-4">
                {locale === 'fr' ? 'PDSF suggéré' : 'Suggested MSRP'}
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-50 bg-blue-900/20 border border-blue-200 border-blue-700 rounded-lg p-6 mb-4">
              <h3 className="font-heading text-lg font-semibold mb-2">
                {locale === 'fr'
                  ? 'Format Régulier 50g'
                  : 'Regular Size 50g'}
              </h3>
              <div className="text-2xl font-bold text-blue-600 text-blue-400 mb-2">
                {standardPrice}
              </div>
              <div className="text-sm text-gray-600 text-gray-400 mb-4">
                {locale === 'fr' ? 'PDSF suggéré' : 'Suggested MSRP'}
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white bg-gray-700 rounded-lg p-6 mb-4">
              <h3 className="font-heading text-lg font-semibold mb-2">
                {locale === 'fr'
                  ? 'Grand Format 120g'
                  : 'Large Size 120g'}
              </h3>
              <div className="text-2xl font-bold text-blue-600 text-blue-400 mb-2">
                {familyPrice}
              </div>
              <div className="text-sm text-gray-600 text-gray-400 mb-4">
                {locale === 'fr' ? 'PDSF suggéré' : 'Suggested MSRP'}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <section className="text-center bg-gray-50 bg-gray-800 rounded-lg p-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 text-white mb-6">
          {locale === 'fr'
            ? 'Questions? Parlons-en!'
            : "Questions? Let's Talk!"}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Phone className="h-8 w-8 text-blue-600 text-blue-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 text-white mb-2">
              {locale === 'fr' ? 'Appelez-nous' : 'Call Us'}
            </h4>
            <a
              href={CONTACT_INFO.phoneHref}
              className="text-blue-600 text-blue-400 hover:underline font-bold"
            >
              {PHONE_MESSAGING.callout}
            </a>
          </div>
          <div className="text-center">
            <Mail className="h-8 w-8 text-blue-600 text-blue-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 text-white mb-2">
              {locale === 'fr' ? 'Écrivez-nous' : 'Email Us'}
            </h4>
            <a
              href={`mailto:${partnerEmail}`}
              className="text-blue-600 text-blue-400 hover:underline"
            >
              {partnerEmail}
            </a>
          </div>
          <div className="text-center">
            <FileText className="h-8 w-8 text-blue-600 text-blue-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 text-white mb-2">
              {locale === 'fr'
                ? "Besoin de Plus d'Information?"
                : 'Need More Information?'}
            </h4>
            <a
              href={`mailto:${partnerEmail}`}
              className="text-blue-600 text-blue-400 hover:underline"
            >
              {locale === 'fr' ? 'Demander le Guide' : 'Request Guide'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}