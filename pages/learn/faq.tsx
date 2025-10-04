import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { ComprehensiveStructuredData, useStructuredData } from '../../src/components/seo/comprehensive-structured-data';
import { NextSeo } from 'next-seo';
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
  // Clock,
  Users,
  Package,
  Truck,
  CreditCard
} from 'lucide-react';

const FAQPage: NextPage = () => {
  const { locale } = useTranslation();
  const { generateBreadcrumbs } = useStructuredData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);
  
  // Generate breadcrumbs for FAQ page
  const breadcrumbs = generateBreadcrumbs('/learn/faq');

  const pageTitle = 'Frequently Asked Questions - Purrify Cat Litter Additive';
  const pageDescription = 'Get answers to common questions about Purrify activated carbon cat litter additive. Learn about usage, shipping, safety, and more.';
  const canonicalUrl = `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`;

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: 12 },
    { id: 'product', name: 'Product Information', icon: Package, count: 7 },
    { id: 'usage', name: 'Usage & Application', icon: Users, count: 3 },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck, count: 1 },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard, count: 0 },
    { id: 'support', name: 'Customer Support', icon: MessageCircle, count: 1 }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'What is Purrify and how does it work?',
      answer: 'Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon contains millions of microscopic pores that trap and neutralize odor-causing compounds like ammonia and hydrogen sulfide.',
      category: 'product',
      featured: true
    },
    {
      id: 2,
      question: 'Is Purrify safe for cats and kittens?',
      answer: 'Purrify uses the same type of coconut-shell activated carbon found in hospital water systems, municipal water treatment, and household air/water filters. It\'s made from natural coconut shells, contains no added chemicals or fragrances, and meets NSF/ANSI 61 and Food Chemicals Codex standards for potable water applications.',
      category: 'product',
      featured: true
    },
    {
      id: 3,
      question: 'How much Purrify should I use?',
      answer: 'Use 1-2 tablespoons per standard litter box. For multiple cats or extra odor control, use up to 3 tablespoons. Simply sprinkle evenly over the litter and mix gently.',
      category: 'usage',
      featured: true
    },
    {
      id: 4,
      question: 'How long does Purrify last?',
      answer: 'Purrify continues working for 2-4 weeks depending on usage and the number of cats. You\'ll know it\'s time to reapply when you notice odors returning.',
      category: 'usage',
      featured: false
    },
    {
      id: 5,
      question: 'Does Purrify work with all types of litter?',
      answer: 'Yes! Purrify works with all litter types including clay, clumping, crystal, wood, paper, and natural alternatives. It enhances rather than interferes with your current litter.',
      category: 'product',
      featured: false
    },
    {
      id: 6,
      question: 'Will my cat notice the difference?',
      answer: 'Most cats don\'t notice Purrify since it\'s odorless and doesn\'t significantly change litter texture. Many cats actually prefer the improved odor control environment.',
      category: 'usage',
      featured: false
    },
    {
      id: 7,
      question: 'How quickly does Purrify work?',
      answer: 'Purrify starts working immediately upon contact with odors. You\'ll notice reduced odors within minutes, with maximum effectiveness achieved within 24 hours.',
      category: 'product',
      featured: false
    },
    {
      id: 8,
      question: 'What sizes are available?',
      answer: 'Purrify comes in three sizes: 17g Trial Size ($6.99), 60g Standard ($19.99), and 140g Family Pack ($29.99). The trial size is perfect for testing with one litter box change.',
      category: 'product',
      featured: false
    },
    {
      id: 9,
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on all orders over $25 within Canada. Orders typically arrive within 3-5 business days.',
      category: 'shipping',
      featured: false
    },
    {
      id: 10,
      question: 'Can I return Purrify if I\'m not satisfied?',
      answer: 'Absolutely! We offer a 30-day satisfaction guarantee. If you\'re not completely satisfied, contact us for a full refund.',
      category: 'support',
      featured: false
    },
    {
      id: 11,
      question: 'Where can I find detailed product specifications and certifications?',
      answer: 'Purrify uses coconut-shell activated carbon that meets NSF/ANSI 61, AWWA B604, and Food Chemicals Codex (FCC) standards - the same type used in hospital water systems and municipal water treatment. It\'s Halal & Kosher compliant. For complete technical specifications, certifications, and detailed product information, visit our Safety Information page.',
      category: 'product',
      featured: true,
      link: '/learn/safety'
    },
    {
      id: 12,
      question: 'Can I use Purrify for rodents like hamsters, mice, or rats?',
      answer: 'Purrify uses the same type of activated carbon found in hospital water filtration and veterinary applications. When used properly in sealed pouches or containers with proper ventilation, it can be suitable for odor control in rodent environments. Always minimize dust exposure and rinse before use. For detailed usage guidelines and precautions for rodents, see our complete Safety Information page.',
      category: 'product',
      featured: false,
      link: '/learn/safety'
    }
  ];

  // Generate FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  const toggleItem = useCallback((id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const handleToggleItem = useCallback((id: number) => {
    toggleItem(id);
  }, [toggleItem]);

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqItems.filter(item => item.featured).slice(0, 4);

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
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Purrify FAQ, cat litter additive questions, activated carbon safety, odor control help',
          },
        ]}
      />

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Head>
        <title>Frequently Asked Questions - Everything About Purrify | Purrify</title>
        <meta 
          name="description" 
          content="Find answers to all your questions about Purrify cat litter additive. Learn about usage, safety, shipping, and more in our comprehensive FAQ." 
        />
        <meta name="keywords" content="Purrify FAQ, cat litter questions, activated carbon safety, usage instructions, shipping info" />
        <link rel="canonical" href={`https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Frequently Asked Questions - Everything About Purrify" />
        <meta property="og:description" content="Get answers to all your Purrify questions about usage, safety, shipping, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`} />
        
        {/* Enhanced FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "FAQPage",
                  "@id": `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
                  "url": `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
                  "name": "Frequently Asked Questions - Everything About Purrify",
                  "description": "Find answers to all your questions about Purrify cat litter additive. Learn about usage, safety, shipping, and more in our comprehensive FAQ.",
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://www.purrify.ca/#organization",
                    "name": "Purrify"
                  },
                  "datePublished": "2024-01-01",
                  "dateModified": "2024-08-30",
                  "inLanguage": "en-CA",
                  "about": {
                    "@type": "Product",
                    "name": "Purrify Activated Carbon Cat Litter Additive",
                    "description": "Premium activated carbon cat litter additive that eliminates odors at the molecular level."
                  },
                  "mainEntity": faqItems.map((item, index) => ({
                    "@type": "Question",
                    "@id": `https://www.purrify.ca/learn/faq#question-${index + 1}`,
                    "name": item.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": item.answer,
                      "dateCreated": "2024-01-01",
                      "upvoteCount": item.featured ? 25 : 10,
                      "author": {
                        "@type": "Organization",
                        "name": "Purrify Customer Service"
                      }
                    },
                    "answerCount": 1,
                    "suggestedAnswer": {
                      "@type": "Answer",
                      "text": item.answer
                    }
                  }))
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/`
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Learn",
                      "item": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "FAQ",
                      "item": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`
                    }
                  ]
                },
                {
                  "@type": "WebPage",
                  "@id": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
                  "url": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
                  "name": "FAQ - Purrify Cat Litter Additive",
                  "description": "Complete FAQ covering all aspects of Purrify activated carbon cat litter additive including usage, safety, and effectiveness.",
                  "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://www.purrify.ca/#website"
                  },
                  "datePublished": "2024-01-01",
                  "dateModified": "2024-08-30",
                  "inLanguage": "en-CA",
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://www.purrify.ca/purrify-logo.png",
                    "width": 400,
                    "height": 400
                  },
                  "significantLink": [
                    "https://purrify.ca/products/trial-size",
                    "https://purrify.ca/products/standard",
                    "https://purrify.ca/learn/how-it-works",
                    "https://purrify.ca/learn/activated-carbon-benefits"
                  ],
                  "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": [".popular-questions h3", ".faq-answer"]
                  }
                }
              ]
            })
          }}
        />
      </Head>
      
      {/* Comprehensive FAQ Structured Data */}
      <ComprehensiveStructuredData 
        pageType="faq" 
        pageData={{
          title: "Frequently Asked Questions - Everything About Purrify",
          description: "Find answers to all your questions about Purrify cat litter additive. Learn about usage, safety, shipping, and more in our comprehensive FAQ.",
          url: `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
          faqs: faqItems.map(item => ({
            question: item.question,
            answer: item.answer
          })),
          breadcrumbs: breadcrumbs
        }}
      />

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">
              <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Learn
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">FAQ</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Everything you need to know about Purrify
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 dark:text-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Popular Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Most Popular Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Quick answers to what customers ask most
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularFAQs.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.answer}
                  </p>
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
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#5B2EFF] text-white dark:text-gray-100'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <category.icon className="w-4 h-4 mr-3" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white dark:bg-gray-900/20 text-white dark:text-gray-100'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 dark:text-gray-400'
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 dark:text-gray-100">
                    {filteredFAQs.length} Question{filteredFAQs.length !== 1 ? 's' : ''} Found
                  </h3>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="text-[#5B2EFF] hover:text-[#5B2EFF]/80 font-medium"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-[#E0EFC7] dark:border-gray-700 overflow-hidden">
                      <button
                        onClick={() => handleToggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100 mb-2">
                            {item.question}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.featured && (
                              <span className="px-2 py-1 bg-[#FF3131]/10 text-[#FF3131] rounded-full text-xs font-medium">
                                Popular
                              </span>
                            )}
                            <span className="px-2 py-1 bg-[#5B2EFF]/10 text-[#5B2EFF] rounded-full text-xs font-medium">
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          </div>
                        </div>
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        )}
                      </button>
                      
                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            {item.answer}
                          </p>
                          {(item as { link?: string }).link && (
                            <Link href={`${locale === 'fr' ? '/fr' : ''}${(item as { link?: string }).link}`}>
                              <Button
                                size="sm"
                                className="mt-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] hover:from-[#FF3131]/90 hover:to-[#5B2EFF]/90 text-white dark:text-gray-100 font-semibold"
                              >
                                View Safety Information →
                              </Button>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 dark:text-gray-400 mb-2">
                      No questions found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                      Try adjusting your search terms or category filter
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Can't find what you're looking for? Our customer support team is here to help!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <Mail className="w-8 h-8 text-[#5B2EFF] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-50 dark:text-gray-100 mb-2">Email Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Get detailed answers via email
                  </p>
                  <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                    <Button size="sm" className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100">
                      Contact Us
                    </Button>
                  </Link>
                </div>

{/* Live Chat temporarily disabled */}

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <Phone className="w-8 h-8 text-[#03E46A] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-50 dark:text-gray-100 mb-2">Phone Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Speak with our team directly
                  </p>
                  <Button size="sm" variant="outline" className="border-[#03E46A] text-[#03E46A] hover:bg-[#03E46A] hover:text-white dark:text-gray-100">
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Try Purrify?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with our risk-free trial size and experience the difference for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    Try Risk-Free - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/compare`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 transition-colors">
                    Compare All Sizes
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Learn More About Purrify
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn the science behind our activated carbon technology and why it's so effective.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/cat-litter-guide`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Cat Litter Guide
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete guide to cat litter types, maintenance tips, and best practices.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Customer Stories
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read real experiences from cat owners who transformed their homes with Purrify.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/learn/faq" />
          </Container>
        </section>
      </main>
    </>
  );
};

export default FAQPage;
