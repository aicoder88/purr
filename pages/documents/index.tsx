import { NextSeo } from 'next-seo';
import { useTranslation } from '../../src/lib/translation-context';
import { FileText, Download, Search, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Documents() {
  const { locale } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const pageTitle = locale === 'fr'
    ? 'Centre de Ressources Purrify - Matériel de Formation pour Détaillants'
    : 'Purrify Resource Center - Retail Training Materials';

  const pageDescription = locale === 'fr'
    ? 'Accédez aux guides de formation, matériel de point de vente, calculateurs de profit et autres ressources pour partenaires détaillants Purrify.'
    : 'Access training guides, POS materials, profit calculators, and other resources for Purrify retail partners.';

  const canonicalUrl = `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}documents`;

  // Resource documents
  const resources = [
    {
      id: 'employee-training-en',
      title: 'Employee Training Guide',
      titleFr: 'Guide de Formation des Employés',
      description: 'Comprehensive training for retail staff on Purrify product knowledge, sales techniques, and objection handling.',
      descriptionFr: 'Formation complète pour le personnel de vente sur la connaissance du produit Purrify, techniques de vente et gestion des objections.',
      category: 'training',
      languages: ['english'],
      path: '/documents/english/01-employee-training-guide.html',
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: 'employee-training-fr',
      title: 'Guide de Formation des Employés',
      titleFr: 'Guide de Formation des Employés',
      description: 'Formation complète pour le personnel de vente (français).',
      descriptionFr: 'Formation complète pour le personnel de vente (français).',
      category: 'training',
      languages: ['french'],
      path: '/documents/french/01-guide-formation-employes.html',
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: 'employee-training-es',
      title: 'Guía de Capacitación de Empleados',
      titleFr: 'Guide de Formation des Employés (Espagnol)',
      description: 'Capacitación completa para el personal minorista (español).',
      descriptionFr: 'Formation complète pour le personnel de vente (espagnol).',
      category: 'training',
      languages: ['spanish'],
      path: '/documents/spanish/01-guia-capacitacion-empleados.html',
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: 'profit-calculator-en',
      title: 'Store Owner Profit Calculator',
      titleFr: 'Calculateur de Profits pour Propriétaires',
      description: 'Detailed profit margins, volume discount tiers, and ROI scenarios for retailers.',
      descriptionFr: 'Marges de profit détaillées, niveaux de remise par volume et scénarios de retour sur investissement.',
      category: 'training',
      languages: ['english'],
      path: '/documents/english/02-profit-calculator.html',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      id: 'profit-calculator-fr',
      title: 'Calculateur de Profits',
      titleFr: 'Calculateur de Profits',
      description: 'Marges de profit et scénarios de retour sur investissement (français).',
      descriptionFr: 'Marges de profit et scénarios de retour sur investissement (français).',
      category: 'training',
      languages: ['french'],
      path: '/documents/french/02-calculateur-profits.html',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      id: 'profit-calculator-es',
      title: 'Calculadora de Ganancias',
      titleFr: 'Calculateur de Profits (Espagnol)',
      description: 'Márgenes de ganancia y escenarios de retorno de inversión (español).',
      descriptionFr: 'Marges de profit et scénarios de retour sur investissement (espagnol).',
      category: 'training',
      languages: ['spanish'],
      path: '/documents/spanish/02-calculadora-ganancias.html',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      id: 'pos-display-en',
      title: 'POS Display Guide',
      titleFr: 'Guide d\'Affichage Point de Vente',
      description: 'Optimal product placement, cross-merchandising strategies, and signage options.',
      descriptionFr: 'Placement optimal des produits, stratégies de vente croisée et options de signalisation.',
      category: 'marketing',
      languages: ['english'],
      path: '/documents/english/03-pos-display-guide.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'pos-display-fr',
      title: 'Guide d\'Affichage Point de Vente',
      titleFr: 'Guide d\'Affichage Point de Vente',
      description: 'Placement optimal des produits (français).',
      descriptionFr: 'Placement optimal des produits (français).',
      category: 'marketing',
      languages: ['french'],
      path: '/documents/french/03-guide-affichage-pdv.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'pos-display-es',
      title: 'Guía de Exhibición Punto de Venta',
      titleFr: 'Guide d\'Affichage Point de Vente (Espagnol)',
      description: 'Colocación óptima de productos (español).',
      descriptionFr: 'Placement optimal des produits (espagnol).',
      category: 'marketing',
      languages: ['spanish'],
      path: '/documents/spanish/03-guia-exhibicion-pdv.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'quick-reference-en',
      title: 'Quick Reference Card',
      titleFr: 'Carte de Référence Rapide',
      description: 'Pocket-sized quick reference with key benefits, pricing, and objection handling.',
      descriptionFr: 'Référence rapide de poche avec avantages clés, tarification et gestion des objections.',
      category: 'training',
      languages: ['english'],
      path: '/documents/english/04-quick-reference-card.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'quick-reference-fr',
      title: 'Carte de Référence Rapide',
      titleFr: 'Carte de Référence Rapide',
      description: 'Référence rapide de poche (français).',
      descriptionFr: 'Référence rapide de poche (français).',
      category: 'training',
      languages: ['french'],
      path: '/documents/french/04-carte-reference-rapide.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'quick-reference-es',
      title: 'Tarjeta de Referencia Rápida',
      titleFr: 'Carte de Référence Rapide (Espagnol)',
      description: 'Referencia rápida de bolsillo (español).',
      descriptionFr: 'Référence rapide de poche (espagnol).',
      category: 'training',
      languages: ['spanish'],
      path: '/documents/spanish/04-tarjeta-referencia-rapida.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'customer-faq-en',
      title: 'Customer FAQ Handout',
      titleFr: 'FAQ Clients',
      description: 'Top 10 customer questions with clear, scannable answers for retail staff.',
      descriptionFr: 'Top 10 des questions clients avec réponses claires et scannables.',
      category: 'marketing',
      languages: ['english'],
      path: '/documents/english/05-customer-faq-handout.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'customer-faq-fr',
      title: 'FAQ Clients',
      titleFr: 'FAQ Clients',
      description: 'Top 10 des questions clients (français).',
      descriptionFr: 'Top 10 des questions clients (français).',
      category: 'marketing',
      languages: ['french'],
      path: '/documents/french/05-faq-clients.html',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'customer-faq-es',
      title: 'FAQ para Clientes',
      titleFr: 'FAQ Clients (Espagnol)',
      description: 'Top 10 de preguntas de clientes (español).',
      descriptionFr: 'Top 10 des questions clients (espagnol).',
      category: 'marketing',
      languages: ['spanish'],
      path: '/documents/spanish/05-faq-clientes.html',
      icon: <FileText className="h-6 w-6" />
    },
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
    { id: 'spanish', label: 'Español' },
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
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          type: 'website'
        }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'fr' ? '📚 Centre de Ressources Purrify' : '📚 Purrify Resource Center'}
            </h1>
            <p className="text-xl text-blue-100 dark:text-blue-200">
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
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
        <div className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold mb-2">
              {locale === 'fr' ? 'Besoin d\'aide?' : 'Need help?'}
            </p>
            <p className="text-gray-300 dark:text-gray-400">
              {locale === 'fr' ? 'Contactez-nous: ' : 'Contact us: '}
              <a href="mailto:hello@purrify.ca" className="text-blue-400 hover:text-blue-300">hello@purrify.ca</a>
              {' | '}
              <a href="tel:1-450-663-6773" className="text-blue-400 hover:text-blue-300">1-450-663-6773</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
