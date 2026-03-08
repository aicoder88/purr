'use client';

import { Calendar, Download, Search } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import { CONTACT_INFO } from '@/lib/constants';

export default function DocumentsPageClient() {
  const locale = useLocale();
  const isFrench = locale === 'fr';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const resources = [
    {
      id: 'staff-guide-pdf',
      title: 'Staff Guide (PDF)',
      titleFr: 'Guide du personnel (PDF)',
      description: 'Complete staff training guide in PDF format (English & French).',
      descriptionFr: 'Guide complet de formation du personnel en PDF (anglais et francais).',
      category: 'training',
      languages: ['english', 'french'],
      path: '/documents/pdfs/Staff Guide En-Fr.pdf',
      icon: <Download className="h-6 w-6" />,
    },
    {
      id: 'brochure-pdf',
      title: 'Product Brochure (PDF)',
      titleFr: 'Brochure produit (PDF)',
      description: 'Product brochure in English, French, and Chinese.',
      descriptionFr: 'Brochure produit en anglais, francais et chinois.',
      category: 'marketing',
      languages: ['english', 'french', 'chinese'],
      path: '/documents/pdfs/BrochureEN-FR-ZH.pdf',
      icon: <Download className="h-6 w-6" />,
    },
    {
      id: 'christmas-pos-pdf',
      title: 'Christmas POS Materials (PDF)',
      titleFr: 'Materiel PDV Noel (PDF)',
      description: 'Holiday promotional materials for point-of-sale displays.',
      descriptionFr: 'Materiel promotionnel des fetes pour les presentoirs de point de vente.',
      category: 'seasonal',
      languages: ['english'],
      path: '/documents/pdfs/Christmas POS -EN.pdf',
      icon: <Calendar className="h-6 w-6" />,
    },
  ];

  const categories = [
    { id: 'all', label: isFrench ? 'Tous' : 'All' },
    { id: 'training', label: isFrench ? 'Formation' : 'Training' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'seasonal', label: isFrench ? 'Saisonnier' : 'Seasonal' },
  ];

  const languages = [
    { id: 'all', label: isFrench ? 'Toutes les langues' : 'All Languages' },
    { id: 'english', label: 'English' },
    { id: 'french', label: 'Francais' },
    { id: 'chinese', label: '中文' },
  ];

  const filteredResources = resources.filter((resource) => {
    const localizedTitle = isFrench ? resource.titleFr : resource.title;
    const localizedDescription = isFrench ? resource.descriptionFr : resource.description;
    const normalizedSearch = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      localizedTitle.toLowerCase().includes(normalizedSearch) ||
      localizedDescription.toLowerCase().includes(normalizedSearch);
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage =
      selectedLanguage === 'all' || resource.languages.includes(selectedLanguage);

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-16 text-white dark:from-blue-700 dark:to-blue-600 dark:text-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {isFrench ? 'Centre de ressources Purrify' : 'Purrify Resource Center'}
          </h1>
          <p className="text-xl text-blue-100 dark:text-blue-100">
            {isFrench
              ? 'Materiel de formation et ressources pour partenaires detaillants'
              : 'Training Materials & Resources for Retail Partners'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={isFrench ? 'Rechercher...' : 'Search...'}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(event) => setSelectedLanguage(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-400"
            >
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">{resource.icon}</div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                  </span>
                </div>

                <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                  {isFrench ? resource.titleFr : resource.title}
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {isFrench ? resource.descriptionFr : resource.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {resource.languages.map((language) => (
                    <span
                      key={language}
                      className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {language === 'english'
                        ? 'EN'
                        : language === 'french'
                          ? 'FR'
                          : language === 'spanish'
                            ? 'ES'
                            : 'ZH'}
                    </span>
                  ))}
                </div>

                <a
                  href={resource.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:text-gray-100 dark:hover:bg-blue-600"
                >
                  <Download className="h-4 w-4" />
                  {isFrench ? 'Telecharger' : 'Download'}
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {isFrench ? 'Aucun resultat trouve' : 'No resources found'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 bg-gray-800 py-8 text-white dark:bg-gray-950 dark:text-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-bold">{isFrench ? "Besoin d'aide?" : 'Need help?'}</p>
          <p className="text-gray-300 dark:text-gray-400">
            {isFrench ? 'Contactez-nous: ' : 'Contact us: '}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {CONTACT_INFO.email}
            </a>
            {' | '}
            <a
              href={CONTACT_INFO.phoneHref}
              className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {CONTACT_INFO.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
