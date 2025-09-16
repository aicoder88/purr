import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { ComprehensiveStructuredData, useStructuredData } from '../../src/components/seo/comprehensive-structured-data';
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

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: 24 },
    { id: 'product', name: 'Product Information', icon: Package, count: 8 },
    { id: 'usage', name: 'Usage & Application', icon: Users, count: 6 },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck, count: 5 },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard, count: 3 },
    { id: 'support', name: 'Customer Support', icon: MessageCircle, count: 2 }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'product',
      question: 'What is Purrify and how does it work?',
      answer: 'Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon has millions of microscopic pores that trap and neutralize odor-causing compounds, providing superior odor control compared to traditional litter alone.',
      popular: true,
      tags: ['activated carbon', 'odor control', 'how it works']
    },
    {
      id: 2,
      category: 'product',
      question: 'Is Purrify safe for cats and humans?',
      answer: 'Yes, Purrify is completely safe for both cats and humans. Our activated carbon is food-grade and non-toxic. It has been tested extensively and is made from natural materials. Many water filters and air purifiers use the same type of activated carbon.',
      popular: true,
      tags: ['safety', 'non-toxic', 'food-grade']
    },
    {
      id: 3,
      category: 'usage',
      question: 'How much Purrify should I use?',
      answer: 'For optimal results, use approximately 1-2 tablespoons of Purrify per standard litter box. Mix it thoroughly with your existing litter when you do a complete change. The 17g trial size is perfect for one litter box change.',
      popular: true,
      tags: ['dosage', 'application', 'mixing']
    },
    {
      id: 4,
      category: 'product',
      question: 'Does Purrify work with all types of litter?',
      answer: 'Yes! Purrify is designed to work with any type of cat litter - clay, clumping, crystal, natural, or biodegradable. It enhances the odor control properties of whatever litter you\'re already using.',
      popular: true,
      tags: ['compatibility', 'all litter types', 'enhancement']
    },
    {
      id: 5,
      category: 'usage',
      question: 'How long does Purrify last?',
      answer: 'Purrify extends the life of your litter by 2-3 times. Instead of changing litter weekly, you can typically go 2-3 weeks with the same litter when using Purrify, depending on the number of cats and usage frequency.',
      popular: false,
      tags: ['duration', 'litter life', 'cost savings']
    },
    {
      id: 6,
      category: 'shipping',
      question: 'How fast is shipping?',
      answer: 'We offer free standard shipping (5-7 business days) on orders over $25. Express shipping (2-3 days) is available for $9.99, and priority shipping (1-2 days) for $14.99. Orders placed before 2 PM EST ship the same day.',
      popular: true,
      tags: ['shipping speed', 'delivery times', 'same day']
    },
    {
      id: 7,
      category: 'product',
      question: 'What sizes are available?',
      answer: 'We offer three sizes: 17g Trial Size ($6.99) for first-time users, 60g Regular Size ($19.99) for single-cat households, and 120g Large Size ($29.99) for multi-cat homes. The large size offers the best value per gram.',
      popular: false,
      tags: ['sizes', 'pricing', 'value']
    },
    {
      id: 8,
      category: 'usage',
      question: 'Can I use Purrify with automatic litter boxes?',
      answer: 'Yes, Purrify works excellently with automatic litter boxes. Simply mix it with your litter as usual. The activated carbon won\'t interfere with the automatic mechanisms and will provide superior odor control.',
      popular: false,
      tags: ['automatic litter box', 'compatibility', 'mechanisms']
    },
    {
      id: 9,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are processed securely through Stripe with 256-bit SSL encryption.',
      popular: false,
      tags: ['payment methods', 'security', 'credit cards']
    },
    {
      id: 10,
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to many countries worldwide. Shipping costs vary by destination: USA ($12.99), UK/EU ($19.99), Australia ($24.99). Delivery times range from 7-35 days depending on location. Customs duties may apply.',
      popular: false,
      tags: ['international shipping', 'worldwide', 'customs']
    },
    {
      id: 11,
      category: 'product',
      question: 'Is there a money-back guarantee?',
      answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not completely satisfied with Purrify, contact us within 30 days of purchase for a full refund. We stand behind our product 100%.',
      popular: true,
      tags: ['guarantee', 'refund', '30 days']
    },
    {
      id: 12,
      category: 'usage',
      question: 'How do I know if Purrify is working?',
      answer: 'You\'ll notice the difference within hours! The most obvious sign is dramatically reduced odor from the litter box. You\'ll also find that your litter stays fresher longer, requiring less frequent complete changes.',
      popular: false,
      tags: ['effectiveness', 'results', 'timeline']
    },
    {
      id: 13,
      category: 'support',
      question: 'How can I contact customer support?',
      answer: 'You can reach us via email at hello@purrify.com, through our contact form, or by phone during business hours. We typically respond to emails within 24 hours and are always happy to help with any questions.',
      popular: false,
      tags: ['contact', 'support', 'response time']
    },
    {
      id: 14,
      category: 'product',
      question: 'Can Purrify help with multiple cats?',
      answer: 'Absolutely! Purrify is especially effective in multi-cat households where odor control is more challenging. We recommend our 120g Large Size for homes with 2-3 cats, as it provides the best value and longest-lasting results.',
      popular: false,
      tags: ['multiple cats', 'multi-cat', 'large size']
    },
    {
      id: 15,
      category: 'usage',
      question: 'Do I need to change how I clean the litter box?',
      answer: 'No changes needed! Continue your normal scooping routine. Purrify works in the background to eliminate odors. You may find you can go longer between complete litter changes, saving you time and money.',
      popular: false,
      tags: ['cleaning routine', 'scooping', 'maintenance']
    },
    {
      id: 16,
      category: 'shipping',
      question: 'Can I track my order?',
      answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can track your package directly on the Canada Post website or through our order tracking system.',
      popular: false,
      tags: ['tracking', 'order status', 'Canada Post']
    }
  ];

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
        <title>Frequently Asked Questions - Everything About Purrify | Purrify</title>
        <meta 
          name="description" 
          content="Find answers to all your questions about Purrify cat litter additive. Learn about usage, safety, shipping, and more in our comprehensive FAQ." 
        />
        <meta name="keywords" content="Purrify FAQ, cat litter questions, activated carbon safety, usage instructions, shipping info" />
        <link rel="canonical" href={`https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Frequently Asked Questions - Everything About Purrify" />
        <meta property="og:description" content="Get answers to all your Purrify questions about usage, safety, shipping, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`} />
        
        {/* Enhanced FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "FAQPage",
                  "@id": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
                  "url": `https://purrify.ca${locale === 'fr' ? '/fr' : ''}/learn/faq`,
                  "name": "Frequently Asked Questions - Everything About Purrify",
                  "description": "Find answers to all your questions about Purrify cat litter additive. Learn about usage, safety, shipping, and more in our comprehensive FAQ.",
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://purrify.ca/#organization",
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
                    "@id": `https://purrify.ca/learn/faq#question-${index + 1}`,
                    "name": item.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": item.answer,
                      "dateCreated": "2024-01-01",
                      "upvoteCount": item.popular ? 25 : 10,
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
                    "@id": "https://purrify.ca/#website"
                  },
                  "datePublished": "2024-01-01",
                  "dateModified": "2024-08-30",
                  "inLanguage": "en-CA",
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://purrify.ca/purrify-logo.png",
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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
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
                          ? 'bg-white/20 text-white dark:text-gray-100'
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
                      onClick={() => setSearchTerm('')}
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
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100 mb-2">
                            {item.question}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.popular && (
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
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Try Risk-Free - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/compare`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-gray-50 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
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
      </main>
    </>
  );
};

export default FAQPage;
