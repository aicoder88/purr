import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { 
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Home,
  Filter,
  Tag,
  Users,
  Package,
  Truck,
  CreditCard
} from 'lucide-react';

const FAQPage: NextPage = () => {
  const { t, locale } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = t.faqCategories.map(cat => ({
    ...cat,
    icon: cat.id === 'all' ? HelpCircle :
          cat.id === 'product' ? Package :
          cat.id === 'usage' ? Users :
          cat.id === 'shipping' ? Truck :
          cat.id === 'payment' ? CreditCard :
          MessageCircle
  }));

  const faqItems = t.faqItems;

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqItems.filter(item => item.popular).slice(0, 4);

  return (
    <>
      <Head>
        <title>Foire Aux Questions - Tout Sur Purrify | Purrify</title>
        <meta 
          name="description" 
          content="Trouvez des réponses à toutes vos questions sur l'additif pour litière Purrify. Apprenez sur l'usage, la sécurité, l'expédition et plus dans notre FAQ complète." 
        />
        <meta name="keywords" content="Purrify FAQ, questions litière chat, sécurité charbon actif, instructions usage, info expédition" />
        <link rel="canonical" href="https://purrify.com/fr/learn/faq" />
        
        <meta property="og:title" content="Foire Aux Questions - Tout Sur Purrify" />
        <meta property="og:description" content="Obtenez des réponses à toutes vos questions Purrify sur l'usage, la sécurité, l'expédition et plus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.com/fr/learn/faq" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/fr" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href="/fr/learn/how-it-works" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Apprendre
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">FAQ</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-4xl mx-auto">
              <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.faqPage.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {t.faqPage.subtitle}
              </p>
              
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.faqPage.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Popular Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Questions Les Plus Populaires
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Réponses rapides aux questions les plus fréquentes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularFAQs.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.answer}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-[#E0EFC7]/50 dark:bg-gray-700/50 rounded-full text-xs text-gray-600 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Categories and Search */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories Sidebar */}
              <div className="lg:w-1/4">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Catégories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#5B2EFF] text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <category.icon className="w-4 h-4 mr-3" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Items */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {filteredFAQs.length} Question{filteredFAQs.length !== 1 ? 's' : ''} Trouvée{filteredFAQs.length !== 1 ? 's' : ''}
                  </h3>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-[#5B2EFF] hover:text-[#5B2EFF]/80 font-medium"
                    >
                      Effacer Recherche
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#E0EFC7] dark:border-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {item.question}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.popular && (
                              <span className="px-2 py-1 bg-[#FF3131]/10 text-[#FF3131] rounded-full text-xs font-medium">
                                Populaire
                              </span>
                            )}
                            <span className="px-2 py-1 bg-[#5B2EFF]/10 text-[#5B2EFF] rounded-full text-xs font-medium">
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          </div>
                        </div>
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            {item.answer}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-[#E0EFC7]/50 dark:bg-gray-700/50 rounded-full text-xs text-gray-600 dark:text-gray-300">
                                <Tag className="w-3 h-3 inline mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      {t.faqPage.noQuestionsFound}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                      {t.faqPage.adjustSearchTerms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Still Have Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                {t.faqPage.stillHaveQuestions}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.faqPage.cantFindWhatLooking}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <Mail className="w-8 h-8 text-[#5B2EFF] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{t.faqPage.emailSupport}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {t.faqPage.detailedEmailHelp}
                  </p>
                  <Link href="/fr/support/contact">
                    <Button size="sm" className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white">
                      {t.faqPage.contactUs}
                    </Button>
                  </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <MessageCircle className="w-8 h-8 text-[#FF3131] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{t.faqPage.liveChat}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Chattez avec nous en temps réel
                  </p>
                  <Button size="sm" variant="outline" className="border-[#FF3131] text-[#FF3131] hover:bg-[#FF3131] hover:text-white">
                    Commencer Chat
                  </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <Phone className="w-8 h-8 text-[#03E46A] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Support Téléphonique</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Parlez directement avec notre équipe
                  </p>
                  <Button size="sm" variant="outline" className="border-[#03E46A] text-[#03E46A] hover:bg-[#03E46A] hover:text-white">
                    Appeler Maintenant
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à Essayer Purrify ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Commencez avec notre format d'essai sans risque et découvrez la différence par vous-même.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Essayer Sans Risque - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/products/compare">
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
                    Comparer Toutes Les Tailles
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                En Savoir Plus Sur Purrify
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/fr/learn/how-it-works" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Comment Ça Fonctionne
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Apprenez la science derrière notre technologie au charbon actif et pourquoi elle est si efficace.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/learn/cat-litter-guide" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Guide de Litière
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Guide complet des types de litière, conseils d'entretien et meilleures pratiques.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/customers/testimonials" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Témoignages Clients
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lisez les expériences réelles de propriétaires de chats qui ont transformé leur foyer avec Purrify.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default FAQPage;
