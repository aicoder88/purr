'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Store,
  Coffee,
  Scissors,
  Building2,
  Heart,
  Stethoscope,
  ChevronRight,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import {
  RetailVertical,
  CatCafesVertical,
  GroomersVertical,
  HospitalityVertical,
  SheltersVertical,
  VeterinariansVertical,
} from './verticals';

type VerticalTab =
  | 'retail'
  | 'cat-cafes'
  | 'groomers'
  | 'hospitality'
  | 'shelters'
  | 'veterinarians';

interface TabConfig {
  id: VerticalTab;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<{ locale: string }>;
}

export default function B2BClientPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<VerticalTab>('retail');

  const tabs: TabConfig[] = [
    {
      id: 'retail',
      label: locale === 'fr' ? 'Détaillants' : 'Retailers',
      icon: <Store className="h-5 w-5" />,
      component: RetailVertical,
    },
    {
      id: 'cat-cafes',
      label: locale === 'fr' ? 'Cafés à Chats' : 'Cat Cafes',
      icon: <Coffee className="h-5 w-5" />,
      component: CatCafesVertical,
    },
    {
      id: 'groomers',
      label: locale === 'fr' ? 'Toiletteurs' : 'Groomers',
      icon: <Scissors className="h-5 w-5" />,
      component: GroomersVertical,
    },
    {
      id: 'hospitality',
      label: locale === 'fr' ? 'Hospitalité' : 'Hospitality',
      icon: <Building2 className="h-5 w-5" />,
      component: HospitalityVertical,
    },
    {
      id: 'shelters',
      label: locale === 'fr' ? 'Refuges' : 'Shelters',
      icon: <Heart className="h-5 w-5" />,
      component: SheltersVertical,
    },
    {
      id: 'veterinarians',
      label: locale === 'fr' ? 'Vétérinaires' : 'Veterinarians',
      icon: <Stethoscope className="h-5 w-5" />,
      component: VeterinariansVertical,
    },
  ];

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
  const ActiveComponent = activeTabConfig?.component || RetailVertical;

  const breadcrumbAriaLabel =
    locale === 'fr'
      ? "Fil d'Ariane"
      : 'Breadcrumb';

  const homeLabel =
    locale === 'fr'
      ? 'Accueil'
      : 'Home';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white bg-gray-900 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav aria-label={breadcrumbAriaLabel} className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-gray-600 text-gray-400 hover:text-blue-600 hover:text-blue-400 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">{homeLabel}</span>
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 text-gray-500" />
            <span
              className="font-medium text-gray-900 text-gray-100"
              aria-current="page"
            >
              {locale === 'fr' ? 'Partenariat B2B' : 'B2B Partnership'}
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 text-white mb-6">
          {locale === 'fr'
            ? 'Partenariat Purrify'
            : 'Purrify Partnership Program'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 text-gray-300 mb-4 max-w-4xl mx-auto">
          {locale === 'fr'
            ? "Rejoignez notre réseau de partenaires et offrez la meilleure solution d'odeurs pour chats au Canada."
            : 'Join our partner network and offer the best cat odor solution in Canada.'}
        </p>
        <p className="text-gray-500 text-gray-400">
          {locale === 'fr'
            ? 'Sélectionnez votre type de entreprise ci-dessous:'
            : 'Select your business type below:'}
        </p>
      </section>

      {/* Vertical Tabs */}
      <div className="mb-12">
        {/* Desktop: Horizontal tabs */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 bg-gray-800 text-gray-700 text-gray-300 hover:bg-gray-200 hover:bg-gray-700'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile: Dropdown */}
        <div className="md:hidden mb-8">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as VerticalTab)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 border-gray-600 bg-white bg-gray-800 text-gray-900 text-white font-semibold"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active Tab Label (Mobile) */}
        <div className="md:hidden text-center mb-4">
          <span className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 text-blue-400">
            {activeTabConfig?.icon}
            {activeTabConfig?.label}
          </span>
        </div>
      </div>

      {/* Vertical Content */}
      <div className="animate-fadeIn">
        <ActiveComponent locale={locale} />
      </div>

      {/* Universal Contact Footer */}
      <section className="mt-16 pt-12 border-t border-gray-200 border-gray-700">
        <div className="text-center">
          <h3 className="font-heading text-2xl font-bold text-gray-900 text-white mb-4">
            {locale === 'fr'
              ? "Vous avez des questions? Contactez-nous"
              : 'Have questions? Contact us'}
          </h3>
          <p className="text-gray-600 text-gray-300 mb-6 max-w-2xl mx-auto">
            {locale === 'fr'
              ? "Notre équipe de développement des partenaires est là pour vous aider à réussir, quel que soit votre type d'entreprise."
              : 'Our partner development team is here to help you succeed, regardless of your business type.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${t('contact.partnersEmail')}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              {t('contact.partnersEmail')}
            </a>
            <a
              href={`tel:${t('contact.phone')}`}
              className="inline-flex items-center justify-center gap-2 border border-blue-600 border-blue-400 text-blue-600 text-blue-400 bg-white bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 hover:bg-blue-900/20 transition-colors"
            >
              {t('contact.phone')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
