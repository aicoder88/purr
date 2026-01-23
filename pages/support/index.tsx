import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Mail, Phone, Truck, MessageCircle, Clock, HelpCircle, Package, Shield } from 'lucide-react';

import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { SITE_NAME, CONTACT_INFO } from '../../src/lib/constants';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

export default function SupportPage() {
  const { t, locale } = useTranslation();
  
  const pageTitle = `Customer Support - ${SITE_NAME} Help Center`;
  const pageDescription = "Need help? Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week. Response within 24 hours. Ships to USA & Canada.";

  // Use enhanced SEO hook
  const { nextSeoProps } = useEnhancedSEO({
    path: '/support',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'purrify customer support',
    image: 'https://www.purrify.ca/customer-support-hero.jpg',
    keywords: ['customer support', 'help center', 'contact purrify', 'order help'],
  });

  const supportOptions = [
    {
      icon: Mail,
      title: "Contact Us",
      description: "Get in touch with our customer support team via email, phone, or WhatsApp",
      link: "/contact",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Truck,
      title: "Shipping Info",
      description: "Learn about delivery times, shipping costs, and tracking your order",
      link: "/support/shipping",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find quick answers to frequently asked questions about Purrify",
      link: "/#faq",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Package,
      title: "Order Status",
      description: "Track your order and view your purchase history",
      link: "/customer/portal",
      color: "from-orange-500 to-red-500"
    }
  ];

  const quickLinks = [
    { title: "How It Works", link: "/learn/how-it-works" },
    { title: "Product Comparison", link: "/products" },
    { title: "Safety Information", link: "/learn/safety" },
    { title: "Returns & Refunds", link: "/contact" },
    { title: "Wholesale Inquiries", link: "/b2b" },
    { title: "Customer Reviews", link: "/reviews" }
  ];

  return (
    <>
      <NextSeo {...nextSeoProps} />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-6 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li className="text-gray-400 dark:text-gray-500">/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-semibold">Support</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <Container>
            <div className="text-center max-w-4xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full mb-8 border border-purple-200 dark:border-purple-800 shadow-lg">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-700 dark:text-purple-300 font-semibold">We're Here to Help</span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent leading-tight">
                Customer Support 🐱
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                Need help with your order or have questions about Purrify? <br className="hidden md:block" />
                Our friendly support team is ready to assist you.
              </p>
            </div>
          </Container>
        </section>

        {/* Support Options */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {supportOptions.map((option, index) => (
                <Link key={index} href={`${locale === 'fr' ? '/fr' : ''}${option.link}`}>
                  <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/40 transition-all duration-500 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-2 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                        <option.icon className="w-10 h-10 text-white dark:text-gray-100" />
                      </div>

                      <h3 className="font-heading text-2xl font-black mb-4 text-gray-900 dark:text-white">
                        {option.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {option.description}
                      </p>

                      <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-bold">
                        Learn More →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Quick Contact Methods */}
        <section className="py-20 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-orange-100/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">
                Get in Touch <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Instantly</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Choose your preferred way to reach us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <a href="mailto:support@purrify.ca" className="group">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-1">
                  <Mail className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                  <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">support@purrify.ca</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>24h response</span>
                  </div>
                </div>
              </a>

              <a href={CONTACT_INFO.phoneHref} className="group">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-1">
                  <Phone className="w-12 h-12 text-pink-600 dark:text-pink-400 mb-4" />
                  <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{CONTACT_INFO.phone}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Mon-Fri 9AM-5PM EST</span>
                  </div>
                </div>
              </a>

              <a href="https://wa.me/385993433344?text=Hi%20I%27m%20interested%20in%20Purrify" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-1">
                  <MessageCircle className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                  <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-white">WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Chat with us</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Usually within 1 hour</span>
                  </div>
                </div>
              </a>
            </div>
          </Container>
        </section>

        {/* Quick Links */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">
                Popular <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Help Topics</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {quickLinks.map((link, index) => (
                <Link key={index} href={`${locale === 'fr' ? '/fr' : ''}${link.link}`}>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 group">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {link.title}
                      </span>
                      <span className="text-purple-600 dark:text-purple-400 transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-black mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Our friendly support team is here to help you with any questions about Purrify products, orders, or shipping.
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
                <Button size="lg" className="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg px-8 py-6">
                  Contact Support Now →
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
