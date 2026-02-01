'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { useCurrency } from '../../../src/lib/currency-context';
import { RelatedContent } from '../../../src/components/seo/RelatedContent';
import { formatProductPrice } from '../../../src/lib/pricing';
import { getPaymentLink } from '../../../src/lib/payment-links';
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
  Users,
  Package,
  Truck,
  CreditCard
} from 'lucide-react';
import Image from 'next/image';

// FAQ Schema Generator
function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.purrify.ca/learn/faq',
    url: 'https://www.purrify.ca/learn/faq',
    inLanguage: 'en-CA',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export default function FAQPageClient() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();
  const trialPrice = formatProductPrice('trial', currency, locale);
  const standardPrice = formatProductPrice('standard', currency, locale);
  const familyPrice = formatProductPrice('family', currency, locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || '/products/trial-size';
  const trialCtaLabel =
    locale === 'fr'
      ? `Envoyer Mon Essai GRATUIT - ${trialPrice}`
      : locale === 'zh'
        ? `发送我的免费试用 - ${trialPrice}`
        : `Send My FREE Trial - ${trialPrice}`;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  // FAQ page images - contextually relevant
  const heroImage = '/images/replacements/cat-owner-questions-ghibli.png';
  const sectionImage1 = '/images/replacements/curious-cat-ghibli.png';
  const sectionImage2 = 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=80';
  const solutionImage = '/images/replacements/happy-cat-ghibli.png';

  // Map translation category names to categories with icons
  const categoryIcons = [HelpCircle, Package, Users, HelpCircle, HelpCircle, Truck, CreditCard, MessageCircle];
  const categoryCounts = [38, 14, 9, 6, 4, 2, 2, 1];
  const categoryIds = ['all', 'product', 'usage', 'comparison', 'troubleshooting', 'shipping', 'payment', 'support'];

  const categories = (t.faqPage?.categoryList || []).map((cat, index) => ({
    id: categoryIds[index],
    name: cat.name,
    icon: categoryIcons[index],
    count: categoryCounts[index]
  }));

  // Map FAQ translations to items with categories and featured flags
  const getCategoryForIndex = (index: number): string => {
    if (index < 14) return 'product';
    if (index < 23) return 'usage';
    if (index < 29) return 'comparison';
    if (index < 33) return 'troubleshooting';
    if (index < 35) return 'shipping';
    if (index < 37) return 'payment';
    return 'support';
  };

  const faqItems = (t.faqPage?.faqItems || []).map((item, index) => ({
    id: index + 1,
    question: item.question,
    answer: item.answer,
    category: getCategoryForIndex(index),
    featured: index < 2
  }));

  // Current date for fresh content signals
  const lastUpdated = '2025-01-09';

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

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Learn', path: '/learn' },
    { name: 'FAQ', path: '/learn/faq' },
  ];

  // Generate FAQ schema from all items
  const faqSchema = generateFAQSchema(faqItems.map(item => ({
    question: item.question,
    answer: item.answer,
  })));

  return (
    <>
      {/* Auto-generated FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href={locale === 'fr' ? '/fr' : '/'}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumbItems.map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-electric-indigo via-electric-indigo-600 to-deep-coral relative overflow-hidden">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                Everything you need to know about Purrify
              </p>
              <p className="text-sm mb-8 opacity-75">
                Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg text-gray-900 dark:text-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Hero Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Cat owner researching Purrify product information and frequently asked questions"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-heading font-bold mb-2">Your Questions, Answered</h2>
                  <p className="text-xl opacity-90">Everything you need to know about Purrify</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Popular Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">
                Most Popular Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Quick answers to what customers ask most
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularFAQs.map((item) => (
                <div key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <h3 className="faq-question speakable-content text-lg font-heading font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <p className="faq-answer speakable-content text-gray-600 dark:text-gray-300 mb-4">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section Image 1 - Curious Cat */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Curious cat looking up with questions about Purrify cat litter additive"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Even Your Cat Has Questions</h3>
                  <p className="text-lg opacity-90">Let&apos;s find the answers together</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Categories and Search */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories Sidebar */}
              <div className="lg:w-1/4">
                <h3 className="text-xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedCategory === category.id
                        ? 'bg-electric-indigo text-white dark:text-gray-100 shadow-lg'
                        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300'
                        }`}
                    >
                      <div className="flex items-center">
                        <category.icon className="w-4 h-4 mr-3" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${selectedCategory === category.id
                        ? 'bg-white dark:bg-gray-900/20 text-white dark:text-gray-100'
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
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-gray-100">
                    {filteredFAQs.length} Question{filteredFAQs.length !== 1 ? 's' : ''} Found
                  </h3>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="text-electric-indigo hover:text-electric-indigo-600 font-medium transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((item) => (
                    <div key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <button
                        onClick={() => handleToggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <h4 className="faq-question text-lg font-heading font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {item.question}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.featured && (
                              <span className="px-2 py-1 bg-deep-coral/10 dark:bg-deep-coral/20 text-deep-coral dark:text-deep-coral-400 rounded-full text-xs font-medium">
                                Popular
                              </span>
                            )}
                            <span className="px-2 py-1 bg-electric-indigo/10 dark:bg-electric-indigo/20 text-electric-indigo dark:text-electric-indigo-400 rounded-full text-xs font-medium">
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
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top duration-300">
                          <p className="faq-answer text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            {item.answer}
                          </p>
                          {(item as { link?: string }).link && (
                            <Link href={`${locale !== 'en' ? `/${locale}` : ''}${(item as { link?: string }).link}`}>
                              <Button
                                size="sm"
                                className="mt-4 bg-gradient-to-r from-deep-coral to-electric-indigo hover:from-deep-coral-600 hover:to-electric-indigo-600 text-white dark:text-gray-100 font-semibold hover:scale-105 transition-all duration-300"
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
                    <h3 className="font-heading text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
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

        {/* Section Image 2 - Customer Support */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage2}
                alt="Friendly customer service support team ready to help with Purrify questions"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Expert Support Team</h3>
                  <p className="text-lg opacity-90">Ready to answer your questions</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Still Have Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Can&apos;t find what you&apos;re looking for? Our customer support team is here to help!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 text-center hover:scale-105 transition-all duration-300">
                  <Mail className="w-8 h-8 text-electric-indigo dark:text-electric-indigo-400 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Email Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Get detailed answers via email
                  </p>
                  <Link href={`${locale !== 'en' ? `/${locale}` : ''}/contact`}>
                    <Button size="sm" className="bg-electric-indigo hover:bg-electric-indigo-600 hover:scale-105 text-white dark:text-gray-100 transition-all duration-300">
                      Contact Us
                    </Button>
                  </Link>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 text-center hover:scale-105 transition-all duration-300">
                  <Phone className="w-8 h-8 text-[#03E46A] mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Phone Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Speak with our team directly
                  </p>
                  <Button size="sm" variant="outline" className="border-[#03E46A] text-[#03E46A] hover:bg-[#03E46A] hover:text-white dark:text-gray-100">
                    Call Now
                  </Button>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 text-center hover:scale-105 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-green-500 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Chat with us instantly
                  </p>
                  <a href="https://wa.me/385993433344?text=Hi%20I%27m%20interested%20in%20Purrify" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-green-500 dark:border-green-400 text-green-500 dark:text-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-600 dark:hover:text-gray-100">
                      Chat Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Solution Image - Happy Cat Owner */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={solutionImage}
                alt="Happy cat owner enjoying odor-free home with Purrify activated carbon additive"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Join Thousands of Happy Cat Owners</h3>
                  <p className="text-lg opacity-90">Experience the Purrify difference today</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-electric-indigo via-electric-indigo-600 to-deep-coral relative overflow-hidden">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Try Purrify?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with our risk-free trial size and experience the difference for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-electric-indigo hover:bg-gray-100 hover:scale-105 dark:hover:bg-gray-700 font-bold transition-all duration-300">
                    {trialCtaLabel}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link href={`${locale !== 'en' ? `/${locale}` : ''}/products`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 hover:bg-white hover:scale-105 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 transition-all duration-300">
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
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">
                Learn More About Purrify
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/learn/how-it-works`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn the science behind our activated carbon technology and why it&apos;s so effective.
                  </p>
                </div>
              </Link>

              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/learn/cat-litter-guide`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    Cat Litter Guide
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete guide to cat litter types, maintenance tips, and best practices.
                  </p>
                </div>
              </Link>

              <Link href={`${locale !== 'en' ? `/${locale}` : ''}/reviews`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
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
            <RelatedContent currentUrl="/learn/faq" />
          </Container>
        </section>
      </main>
    </>
  );
}
