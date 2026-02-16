'use client';

import { useTranslation } from '@/lib/translation-context';
import { FileText, Download, Search, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { CONTACT_INFO } from '@/lib/constants';

export default function DocumentsPage() {
  const { locale } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const pageTitle = locale === 'fr'
    ? 'Centre de Ressources Purrify - Matériel de Formation pour Détaillants'
    : 'Purrify Resource Center - Retail Training Materials';

  const pageDescription = locale === 'fr'
    ? 'Accédez aux ressources exclusives Purrify pour partenaires détaillants: guides de formation, matériel PDV, calculateurs de profit et ressources marketing pour augmenter vos ventes.'
    : 'Access exclusive Purrify resources for retail partners: training guides, POS materials, profit calculators, and marketing assets to boost your sales.';

  const canonicalUrl = `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}documents/`;

  // Use enhanced SEO hook
  const { nextSeoProps } = useEnhancedSEO({
    path: '/documents',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'purrify retail training',
    keywords: ['training materials', 'retail resources', 'staff guide', 'pos materials'],
  });

  // PDF documents only
  const resources = [
    {
      id: 'staff-guide-pdf',
      title: 'Staff Guide (PDF)',
      titleFr: 'Guide du Personnel (PDF)',
      description: 'Complete staff training guide in PDF format (English & French).',
      descriptionFr: 'Guide complet de formation du personnel en PDF (anglais et français).',
      category: 'training',
      languages: ['english', 'french'],
      path: '/documents/pdfs/Staff Guide En-Fr.pdf',
      icon: <Download className="h-6 w-6" />
    },
    {
      id: 'brochure-pdf',
      title: 'Product Brochure (PDF)',
      titleFr: 'Brochure Produit (PDF)',
      description: 'Product brochure in English, French, and Chinese.',
      descriptionFr: 'Brochure produit en anglais, français et chinois.',
      category: 'marketing',
      languages: ['english', 'french', 'chinese'],
      path: '/documents/pdfs/BrochureEN-FR-ZH.pdf',
      icon: <Download className="h-6 w-6" />
    },
    {
      id: 'christmas-pos-pdf',
      title: 'Christmas POS Materials (PDF)',
      titleFr: 'Matériel PDV Noël (PDF)',
      description: 'Holiday promotional materials for point-of-sale displays.',
      descriptionFr: 'Matériel promotionnel des fêtes pour les présentoirs de point de vente.',
      category: 'seasonal',
      languages: ['english'],
      path: '/documents/pdfs/Christmas POS -EN.pdf',
      icon: <Calendar className="h-6 w-6" />
    }
  ];

  const categories = [
    { id: 'all', label: locale === 'fr' ? 'Tous' : 'All' },
    { id: 'training', label: locale === 'fr' ? 'Formation' : 'Training' },
    { id: 'marketing', label: locale === 'fr' ? 'Marketing' : 'Marketing' },
    { id: 'seasonal', label: locale === 'fr' ? 'Saisonnier' : 'Seasonal' }
  ];

  const languages = [
    { id: 'all', label: locale === 'fr' ? 'Toutes les langues' : 'All Languages' },
    { id: 'english', label: 'English' },
    { id: 'french', label: 'Français' },
    { id: 'chinese', label: '中文' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.languages.includes(selectedLanguage);

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{nextSeoProps.title}</title>
      <meta name="description" content={nextSeoProps.description} />
      {nextSeoProps.canonical && <link rel="canonical" href={nextSeoProps.canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://www.purrify.ca/og-image.jpg" />
      <meta property="og:site_name" content="Purrify" />
      <meta property="og:locale" content={locale === 'fr' ? 'fr_CA' : 'en_CA'} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="https://www.purrify.ca/og-image.jpg" />
      
      {/* Last Modified */}
      <meta name="last-modified" content="2025-11-25T10:30:00Z" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white dark:text-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'fr' ? '📚 Centre de Ressources Purrify' : '📚 Purrify Resource Center'}
            </h1>
            <p className="text-xl text-blue-100 dark:text-blue-100">
              {locale === 'fr'
                ? 'Matériel de Formation et Ressources pour Partenaires Détaillants'
                : 'Training Materials & Resources for Retail Partners'}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder={locale === 'fr' ? 'Rechercher...' : 'Search...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>

              {/* Language Filter */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      {resource.icon}
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                      {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {locale === 'fr' ? resource.titleFr : resource.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {locale === 'fr' ? resource.descriptionFr : resource.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.languages.map(lang => (
                      <span key={lang} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {lang === 'english' ? 'EN' : lang === 'french' ? 'FR' : lang === 'spanish' ? 'ES' : 'ZH'}
                      </span>
                    ))}
                  </div>

                  <a
                    href={resource.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 rounded-lg transition-colors font-semibold"
                  >
                    <Download className="h-4 w-4" />
                    {locale === 'fr' ? 'Télécharger' : 'Download'}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {locale === 'fr' ? 'Aucun résultat trouvé' : 'No resources found'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 dark:bg-gray-950 text-white dark:text-gray-100 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold mb-2">
              {locale === 'fr' ? 'Besoin d\'aide?' : 'Need help?'}
            </p>
              <p className="text-gray-300 dark:text-gray-400">
                {locale === 'fr' ? 'Contactez-nous: ' : 'Contact us: '}
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300">{CONTACT_INFO.email}</a>
              {' | '}
              <a href="tel:1-450-663-6773" className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300">1-450-663-6773</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
