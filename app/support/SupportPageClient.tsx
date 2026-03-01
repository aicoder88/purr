'use client';

import Link from 'next/link';
import { Mail, Phone, Truck, MessageCircle, Clock, HelpCircle, Package, Shield } from 'lucide-react';

import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { CONTACT_INFO } from '../../src/lib/constants';
import { useTranslations, useLocale } from 'next-intl';

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

interface SupportOption {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface QuickLink {
  title: string;
  link: string;
}

interface SupportCopy {
  breadcrumbLabel: string;
  heroBadge: string;
  heroTitle: string;
  heroDescriptionTop: string;
  heroDescriptionBottom: string;
  learnMoreLabel: string;
  instantTitlePrefix: string;
  instantTitleHighlight: string;
  instantSubtitle: string;
  emailLabel: string;
  responseLabel: string;
  phoneLabel: string;
  phoneHours: string;
  whatsappLabel: string;
  whatsappDescription: string;
  whatsappResponse: string;
  popularTitlePrefix: string;
  popularTitleHighlight: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  supportOptions: SupportOption[];
  quickLinks: QuickLink[];
}

const SUPPORT_COPY: Record<SupportedLocale, SupportCopy> = {
  en: {
    breadcrumbLabel: 'Support',
    heroBadge: "We're Here to Help",
    heroTitle: 'Customer Support',
    heroDescriptionTop: 'Need help with your order or have questions about Purrify?',
    heroDescriptionBottom: 'Our friendly support team is ready to assist you.',
    learnMoreLabel: 'Learn More',
    instantTitlePrefix: 'Get in Touch',
    instantTitleHighlight: 'Instantly',
    instantSubtitle: 'Choose your preferred way to reach us',
    emailLabel: 'Email',
    responseLabel: '24h response',
    phoneLabel: 'Phone',
    phoneHours: 'Mon-Fri 9AM-5PM EST',
    whatsappLabel: 'WhatsApp',
    whatsappDescription: 'Chat with us',
    whatsappResponse: 'Usually within 1 hour',
    popularTitlePrefix: 'Popular',
    popularTitleHighlight: 'Help Topics',
    ctaTitle: 'Still Have Questions?',
    ctaDescription: 'Our friendly support team is here to help you with any questions about Purrify products, orders, or shipping.',
    ctaButton: 'Contact Support Now',
    supportOptions: [
      {
        title: 'Contact Us',
        description: 'Get in touch with our customer support team via email, phone, or WhatsApp',
        link: '/contact',
        color: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Shipping Info',
        description: 'Learn about delivery times, shipping costs, and tracking your order',
        link: '/support/shipping',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'FAQ',
        description: 'Find quick answers to frequently asked questions about Purrify',
        link: '/#faq',
        color: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Order Status',
        description: 'Track your order and view your purchase history',
        link: '/customer/portal',
        color: 'from-orange-500 to-red-500',
      },
    ],
    quickLinks: [
      { title: 'How It Works', link: '/learn/how-it-works' },
      { title: 'Product Comparison', link: '/products' },
      { title: 'Safety Information', link: '/learn/safety' },
      { title: 'Returns & Refunds', link: '/contact' },
      { title: 'Wholesale Inquiries', link: '/b2b' },
      { title: 'Customer Reviews', link: '/reviews' },
    ],
  },
  fr: {
    breadcrumbLabel: 'Support',
    heroBadge: 'Nous sommes la pour aider',
    heroTitle: 'Support client',
    heroDescriptionTop: 'Besoin daide pour votre commande ou des questions sur Purrify?',
    heroDescriptionBottom: 'Notre equipe support est prete a vous aider.',
    learnMoreLabel: 'En savoir plus',
    instantTitlePrefix: 'Contactez-nous',
    instantTitleHighlight: 'instantanement',
    instantSubtitle: 'Choisissez votre moyen de contact prefere',
    emailLabel: 'Email',
    responseLabel: 'Reponse sous 24h',
    phoneLabel: 'Telephone',
    phoneHours: 'Lun-Ven 9h-17h EST',
    whatsappLabel: 'WhatsApp',
    whatsappDescription: 'Discutez avec nous',
    whatsappResponse: 'En general sous 1 heure',
    popularTitlePrefix: 'Sujets',
    popularTitleHighlight: 'populaires',
    ctaTitle: 'Encore des questions?',
    ctaDescription: 'Notre equipe est disponible pour toutes vos questions sur les produits Purrify, les commandes et la livraison.',
    ctaButton: 'Contacter le support',
    supportOptions: [
      {
        title: 'Nous contacter',
        description: 'Contactez notre equipe support par email, telephone ou WhatsApp',
        link: '/contact',
        color: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Infos livraison',
        description: 'Consultez les delais, frais de livraison et le suivi de commande',
        link: '/support/shipping',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'FAQ',
        description: 'Trouvez des reponses rapides aux questions frequentes sur Purrify',
        link: '/#faq',
        color: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Statut de commande',
        description: 'Suivez votre commande et consultez votre historique dachat',
        link: '/customer/portal',
        color: 'from-orange-500 to-red-500',
      },
    ],
    quickLinks: [
      { title: 'Comment ca marche', link: '/learn/how-it-works' },
      { title: 'Comparaison des produits', link: '/products' },
      { title: 'Informations de securite', link: '/learn/safety' },
      { title: 'Retours et remboursements', link: '/contact' },
      { title: 'Demandes grossistes', link: '/b2b' },
      { title: 'Avis clients', link: '/reviews' },
    ],
  },
  zh: {
    breadcrumbLabel: '支持',
    heroBadge: '我们随时为你提供帮助',
    heroTitle: '客户支持',
    heroDescriptionTop: '订单需要帮助，或对 Purrify 有疑问？',
    heroDescriptionBottom: '我们的支持团队随时为你服务。',
    learnMoreLabel: '了解更多',
    instantTitlePrefix: '立即',
    instantTitleHighlight: '联系支持',
    instantSubtitle: '选择你偏好的联系方式',
    emailLabel: '邮箱',
    responseLabel: '24小时内回复',
    phoneLabel: '电话',
    phoneHours: '周一至周五 9:00-17:00 EST',
    whatsappLabel: 'WhatsApp',
    whatsappDescription: '与我们聊天',
    whatsappResponse: '通常 1 小时内回复',
    popularTitlePrefix: '热门',
    popularTitleHighlight: '帮助主题',
    ctaTitle: '还有问题吗？',
    ctaDescription: '关于 Purrify 产品、订单或物流，我们的支持团队都可以帮你。',
    ctaButton: '立即联系支持',
    supportOptions: [
      {
        title: '联系我们',
        description: '通过邮箱、电话或 WhatsApp 联系客户支持团队',
        link: '/contact',
        color: 'from-purple-500 to-pink-500',
      },
      {
        title: '物流信息',
        description: '了解配送时效、运费和订单追踪',
        link: '/support/shipping',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        title: '常见问题',
        description: '快速查看关于 Purrify 的常见问题解答',
        link: '/#faq',
        color: 'from-green-500 to-emerald-500',
      },
      {
        title: '订单状态',
        description: '追踪订单并查看购买记录',
        link: '/customer/portal',
        color: 'from-orange-500 to-red-500',
      },
    ],
    quickLinks: [
      { title: '工作原理', link: '/learn/how-it-works' },
      { title: '产品对比', link: '/products' },
      { title: '安全信息', link: '/learn/safety' },
      { title: '退货与退款', link: '/contact' },
      { title: '批发合作', link: '/b2b' },
      { title: '客户评价', link: '/reviews' },
    ],
  },
  es: {
    breadcrumbLabel: 'Soporte',
    heroBadge: 'Estamos aqui para ayudarte',
    heroTitle: 'Atencion al cliente',
    heroDescriptionTop: 'Necesitas ayuda con tu pedido o tienes dudas sobre Purrify?',
    heroDescriptionBottom: 'Nuestro equipo de soporte esta listo para ayudarte.',
    learnMoreLabel: 'Aprender mas',
    instantTitlePrefix: 'Contactanos',
    instantTitleHighlight: 'al instante',
    instantSubtitle: 'Elige tu forma preferida de contactarnos',
    emailLabel: 'Email',
    responseLabel: 'Respuesta en 24h',
    phoneLabel: 'Telefono',
    phoneHours: 'Lun-Vie 9AM-5PM EST',
    whatsappLabel: 'WhatsApp',
    whatsappDescription: 'Chatea con nosotros',
    whatsappResponse: 'Normalmente en 1 hora',
    popularTitlePrefix: 'Temas de ayuda',
    popularTitleHighlight: 'populares',
    ctaTitle: 'Todavia tienes preguntas?',
    ctaDescription: 'Nuestro equipo de soporte puede ayudarte con cualquier duda sobre productos Purrify, pedidos o envios.',
    ctaButton: 'Contactar soporte ahora',
    supportOptions: [
      {
        title: 'Contactanos',
        description: 'Habla con nuestro equipo por email, telefono o WhatsApp',
        link: '/contact',
        color: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Informacion de envio',
        description: 'Conoce tiempos de entrega, costos de envio y seguimiento',
        link: '/support/shipping',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'FAQ',
        description: 'Respuestas rapidas a preguntas frecuentes sobre Purrify',
        link: '/#faq',
        color: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Estado del pedido',
        description: 'Rastrea tu pedido y revisa tu historial de compras',
        link: '/customer/portal',
        color: 'from-orange-500 to-red-500',
      },
    ],
    quickLinks: [
      { title: 'Como funciona', link: '/learn/how-it-works' },
      { title: 'Comparacion de productos', link: '/products' },
      { title: 'Informacion de seguridad', link: '/learn/safety' },
      { title: 'Devoluciones y reembolsos', link: '/contact' },
      { title: 'Consultas mayoristas', link: '/b2b' },
      { title: 'Resenas de clientes', link: '/reviews' },
    ],
  },
};

export default function SupportPageClient() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const copy = SUPPORT_COPY[locale as SupportedLocale] || SUPPORT_COPY.en;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 from-gray-950 via-purple-950/20 to-gray-900">
      {/* Breadcrumb Navigation */}
      <Container>
        <nav className="py-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600 text-gray-400">
            <li>
              <Link href={localePrefix || '/'} className="hover:text-[#FF3131] hover:text-[#FF5050] transition-colors">
                {t('nav.home') || 'Home'}
              </Link>
            </li>
            <li className="text-gray-400 text-gray-500">/</li>
            <li className="text-[#FF3131] text-[#FF5050] font-semibold">{copy.breadcrumbLabel}</li>
          </ol>
        </nav>
      </Container>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Container>
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 from-purple-900/40 to-pink-900/40 rounded-full mb-8 border border-purple-200 border-purple-800 shadow-lg">
              <Shield className="w-5 h-5 text-purple-600 text-purple-400" />
              <span className="text-purple-700 text-purple-300 font-semibold">{copy.heroBadge}</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
              {copy.heroTitle} 🐱
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 text-gray-300 mb-8 leading-relaxed font-medium">
              {copy.heroDescriptionTop} <br className="hidden md:block" />
              {copy.heroDescriptionBottom}
            </p>
          </div>
        </Container>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {copy.supportOptions.map((option, index) => {
              const OptionIcon = index === 0 ? Mail : index === 1 ? Truck : index === 2 ? HelpCircle : Package;
              return (
                <Link key={index} href={`${localePrefix}${option.link}`}>
                  <div className="group relative bg-white bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500 border-2 border-transparent hover:border-purple-300 hover:border-purple-600 transform hover:-translate-y-2 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
                        <OptionIcon className="w-10 h-10 text-white text-gray-100" />
                      </div>

                      <h3 className="font-heading text-2xl font-black mb-4 text-gray-900 text-white">
                        {option.title}
                      </h3>

                      <p className="text-gray-600 text-gray-300 leading-relaxed text-lg">
                        {option.description}
                      </p>

                      <div className="mt-6 flex items-center text-purple-600 text-purple-400 font-bold group-hover:text-purple-500 transition-colors">
                        {copy.learnMoreLabel} →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-20 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-orange-100/50 from-purple-900/20 via-pink-900/20 to-orange-900/20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-6 text-gray-900 text-white">
              {copy.instantTitlePrefix} <span className="bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400 bg-clip-text text-transparent">{copy.instantTitleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 text-gray-400">
              {copy.instantSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="mailto:support@purrify.ca" className="group">
              <div className="bg-white bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 hover:border-purple-600 transform hover:-translate-y-1">
                <Mail className="w-12 h-12 text-purple-600 text-purple-400 mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 text-white">{copy.emailLabel}</h3>
                <p className="text-gray-600 text-gray-300 mb-2">{CONTACT_INFO.email}</p>
                <div className="flex items-center text-sm text-gray-500 text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{copy.responseLabel}</span>
                </div>
              </div>
            </a>

            <a href={CONTACT_INFO.phoneHref} className="group">
              <div className="bg-white bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 hover:border-purple-600 transform hover:-translate-y-1">
                <Phone className="w-12 h-12 text-pink-600 text-pink-400 mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 text-white">{copy.phoneLabel}</h3>
                <p className="text-gray-600 text-gray-300 mb-2">{CONTACT_INFO.phone}</p>
                <div className="flex items-center text-sm text-gray-500 text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{copy.phoneHours}</span>
                </div>
              </div>
            </a>

            <a href="https://wa.me/385993433344?text=Hi%20I%27m%20interested%20in%20Purrify" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-white bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 hover:border-purple-600 transform hover:-translate-y-1">
                <MessageCircle className="w-12 h-12 text-green-600 text-green-400 mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 text-white">{copy.whatsappLabel}</h3>
                <p className="text-gray-600 text-gray-300 mb-2">{copy.whatsappDescription}</p>
                <div className="flex items-center text-sm text-gray-500 text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{copy.whatsappResponse}</span>
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
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-6 text-gray-900 text-white">
              {copy.popularTitlePrefix} <span className="bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400 bg-clip-text text-transparent">{copy.popularTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {copy.quickLinks.map((link, index) => (
              <Link key={index} href={`${localePrefix}${link.link}`}>
                <div className="bg-white bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 border-gray-700 hover:border-purple-300 hover:border-purple-600 group">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 text-white font-semibold group-hover:text-purple-600 group-hover:text-purple-400 transition-colors">
                      {link.title}
                    </span>
                    <span className="text-purple-600 text-purple-400 transform group-hover:translate-x-1 transition-transform">
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
          <div className="text-center text-white text-gray-100 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-6">
              {copy.ctaTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {copy.ctaDescription}
            </p>
            <Link href={`${localePrefix}/contact`}>
              <Button size="lg" className="bg-white bg-gray-900 text-purple-600 text-purple-400 hover:bg-gray-100 hover:bg-gray-800 font-bold text-lg px-8 py-6">
                {copy.ctaButton} →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
