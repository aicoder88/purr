'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,

  Home,
  ChevronRight,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SITE_NAME, CONTACT_INFO, PHONE_MESSAGING, PHONE_NUMBER, SOCIAL_LINKS } from '@/lib/constants';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import ContactForm from './_components/ContactForm';
import ContactMethodCard from './_components/ContactMethodCard';



// Default English translations for server component
const translations = {
  title: 'Contact Us',
  subtitle: 'We\'re here to help! Reach out to our friendly team for any questions about Purrify.',
  chooseContactMethod: 'Choose Your',
  contactNow: 'Contact Now',
  frequentlyAskedQuestions: 'Frequently Asked',
  quickAnswersCommon: 'Quick answers to common questions',
  dontSeeQuestion: "Don't see your question?",
  viewCompleteFAQ: 'View Complete FAQ',
  backToHome: 'Back to Home',
  form: {
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    subject: 'Subject',
    subjectPlaceholder: 'How can we help?',
    message: 'Message',
    messagePlaceholder: 'Tell us more about your question...',
    sendingMessage: 'Sending...',
    sendMessage: 'Send Message',
    successMessage: 'Message sent successfully! We\'ll get back to you soon.',
  },
  contactMethods: [
    {
      title: 'Email Us',
      description: 'Send us an email anytime',
      responseTime: 'Response within 24 hours',
    },
    {
      title: 'Call Us',
      description: 'Speak with our team',
      responseTime: 'Mon-Fri 9am-5pm EST',
    },
    {
      title: 'WhatsApp',
      description: 'Message us on WhatsApp',
      responseTime: 'Usually responds in minutes',
    },
  ],
  faqs: [
    {
      question: 'How does Purrify work?',
      answer:
        'Purrify uses activated carbon to adsorb odor molecules from your cat\'s litter box. Simply sprinkle it on top of the litter and let it do its magic!',
    },
    {
      question: 'Is Purrify safe for my cat?',
      answer:
        'Yes! Purrify is made from 100% food-grade activated carbon, which is completely safe for cats. It\'s non-toxic and chemically inert.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'We ship from Canada. Most orders arrive within 3-7 business days for Canadian addresses and 7-14 days for international orders.',
    },
  ],
  businessHours: {
    title: 'Business Hours',
    weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM EST',
    saturday: 'Saturday: 10:00 AM - 4:00 PM EST',
    sunday: 'Sunday: Closed',
  },
  location: {
    title: 'Our Location',
    shippingNote: 'We ship worldwide from our Canadian distribution center.',
  },
};

const contactMethods = [
  {
    iconName: 'Mail',
    title: translations.contactMethods[0]?.title || 'Email Us',
    value: 'support@purrify.ca',
    description: translations.contactMethods[0]?.description || 'Send us an email anytime',
    responseTime: translations.contactMethods[0]?.responseTime || 'Response within 24 hours',
    action: 'mailto:support@purrify.ca',
  },
  {
    iconName: 'Phone',
    title: translations.contactMethods[1]?.title || 'Call Us',
    value: CONTACT_INFO.phone,
    description: PHONE_NUMBER.tagline,
    responseTime: translations.contactMethods[1]?.responseTime || 'Mon-Fri 9am-5pm EST',
    action: CONTACT_INFO.phoneHref,
    taglineNote: PHONE_NUMBER.description,
  },
  {
    iconName: 'MessageCircle',
    title: translations.contactMethods[2]?.title || 'WhatsApp',
    value: 'Chat with us',
    description: translations.contactMethods[2]?.description || 'Message us on WhatsApp',
    responseTime: translations.contactMethods[2]?.responseTime || 'Usually responds in minutes',
    action: 'https://wa.me/385993433344?text=Hi%20I%27m%20interested%20in%20Purrify',
  },
];

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export default function ContactPage() {
  const { schema, additionalSchemas } = useEnhancedSEO({
    path: '/contact',
    title: `Contact Us - ${SITE_NAME} Customer Support & Help`,
    description:
      'Get in touch with the Purrify team for product questions, business inquiries, and customer support. Fast response times and expert assistance.',
    targetKeyword: 'contact purrify',
    schemaType: 'organization',
    schemaData: {
      description: 'Purrify customer support and contact information. Get help with activated carbon cat litter additive products.',
      socialLinks: [
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.youtube,
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.tiktok,
      ],
      contactPoint: {
        telephone: CONTACT_INFO.phone,
        type: 'customer support',
        email: 'support@purrify.ca',
      },
    },
    image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
    keywords: [
      'contact purrify',
      'cat litter customer support',
      'purrify help',
      'activated carbon questions',
      'pet product support',
    ],
  });

  // Build FAQ schema manually for the contact page FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: translations.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? 'https://www.purrify.ca/' : `https://www.purrify.ca${item.path}`,
    })),
  };

  const allSchemas = [schema, faqSchema, breadcrumbSchema, ...additionalSchemas].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            allSchemas.length === 1
              ? allSchemas[0]
              : { '@context': 'https://schema.org', '@graph': allSchemas }
          ),
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 from-gray-950 via-purple-950/20 to-gray-900">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-purple-100 border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="flex items-center text-gray-500 text-gray-400 hover:text-[#FF3131] hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumbItems.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 text-gray-100">{item.name}</span>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-500 text-gray-400 hover:text-[#FF3131] hover:text-[#FF5050] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        {/* Hero Section - Refined */}
        <section className="pt-24 pb-20 relative overflow-hidden">
          {/* Enhanced background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200/40 bg-purple-600/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-pink-200/30 bg-pink-600/5 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-100/20 bg-orange-600/5 rounded-full blur-[120px]" />
          </div>

          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/50 bg-gray-800/50 backdrop-blur-sm border border-purple-100 border-purple-800/50 shadow-sm animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 text-gray-400">
                  {translations.contactMethods[2]?.responseTime || 'Quick Response Time'}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900 text-white leading-[1.1]">
                {translations.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400">Support</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                {translations.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                {['Fast Support', 'Expert Team', 'Pet Friendly'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-gray-500 text-gray-400">
                    <CheckCircle className="w-5 h-5 text-purple-600 text-purple-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Methods */}
        <section className="py-24">
          <Container>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-white mb-6">
                Choose How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400">Connect</span>
              </h2>
              <p className="text-gray-500 text-gray-400 max-w-xl mx-auto">
                Pick your preferred method of communication and our team will be ready to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {contactMethods.map((method, index) => (
                <ContactMethodCard
                  key={index}
                  iconName={method.iconName}
                  title={method.title}
                  value={method.value}
                  description={method.description}
                  responseTime={method.responseTime}
                  action={method.action}
                  taglineNote={method.taglineNote}
                  contactNowText={translations.contactNow}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Contact Form */}
        <section className="py-24 relative overflow-hidden bg-gray-50/50 bg-gray-900/30">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-white mb-6">
                  Still Haven&apos;t Found what you&apos;re <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400">Looking For?</span>
                </h2>
                <p className="text-lg text-gray-600 text-gray-400 mb-10 leading-relaxed">
                  Fill out our contact form and one of our experts will get back to you within 24 hours. We love hearing from cat parents!
                </p>
                <div className="space-y-6">
                  {[
                    { icon: HelpCircle, title: 'In-depth Answers', desc: 'Detailed responses to your technical questions.' },
                    { icon: MessageCircle, title: 'Direct Access', desc: 'Every message is read by a real human expert.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-purple-50 bg-purple-900/20 text-purple-600 text-purple-400">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500 text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 border-gray-700/50">
                <ContactForm translations={translations.form} locale="en" />
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-white mb-6">
                Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400">Questions</span>
              </h2>
              <p className="text-gray-500 text-gray-400">{translations.quickAnswersCommon}</p>
            </div>

            <div className="max-w-3xl mx-auto grid gap-4">
              {translations.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/50 bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 border-gray-700/50 hover:border-purple-200 hover:border-purple-800 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 text-white mb-3 text-lg flex gap-3">
                    <span className="text-purple-600 text-purple-400 font-black">?</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-gray-400 leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/#faq">
                <Button
                  variant="ghost"
                  className="text-purple-600 text-purple-400 hover:text-purple-700 hover:bg-purple-50 hover:bg-purple-900/20 font-bold"
                >
                  {translations.viewCompleteFAQ} →
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Phone Support Section */}
        <section className="py-24 bg-gray-900 text-white bg-black overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full blur-[140px]" />
          </div>

          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black mb-8">
                Prefer to <span className="text-purple-400 text-purple-400">Talk?</span>
              </h2>
              <div className="mb-10">
                <p className="text-4xl md:text-5xl font-black mb-4 transition-transform hover:scale-105 inline-block">
                  <a href={CONTACT_INFO.phoneHref} className="hover:text-purple-400 hover:text-purple-400 transition-colors">
                    {PHONE_MESSAGING.callout}
                  </a>
                </p>
                <p className="text-purple-400 text-purple-400 font-bold uppercase tracking-widest text-sm">
                  Available Mon-Fri 9AM-5PM EST
                </p>
              </div>
              <p className="text-gray-400 text-gray-500 text-lg leading-relaxed mb-10">
                {PHONE_MESSAGING.explanation}
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium italic text-gray-300 text-gray-400">
                &ldquo;{PHONE_MESSAGING.cta}&rdquo;
              </div>
            </div>
          </Container>
        </section>

        {/* Info Grid: Hours & Location */}
        <section className="py-24 bg-white bg-gray-950">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-gray-50 bg-gray-900/50 border border-gray-100 border-gray-800">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-white bg-gray-800 shadow-sm">
                    <Clock className="w-6 h-6 text-purple-600 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 text-white">{translations.businessHours.title}</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Weekdays', val: translations.businessHours.weekdays },
                    { label: 'Saturday', val: translations.businessHours.saturday },
                    { label: 'Sunday', val: translations.businessHours.sunday },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 border-gray-800 last:border-0">
                      <span className="text-gray-500 text-gray-400 font-medium">{item.label}</span>
                      <span className="text-gray-900 text-white font-bold">{item.val.split(': ')[1] || item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-12 rounded-[2.5rem] bg-gray-50 bg-gray-900/50 border border-gray-100 border-gray-800">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-white bg-gray-800 shadow-sm">
                    <MapPin className="w-6 h-6 text-purple-600 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 text-white">{translations.location.title}</h3>
                </div>
                <div className="text-gray-600 text-gray-400 space-y-2 mb-8">
                  <p className="font-bold text-gray-900 text-white text-lg">Purrify Canada</p>
                  <p>109-17680 Rue Charles</p>
                  <p>Mirabel, QC J7J 0T6</p>
                  <p>Canada</p>
                </div>
                <p className="text-sm font-medium text-purple-600 text-purple-400 bg-purple-50 bg-purple-900/20 px-4 py-2 rounded-full inline-block">
                  {translations.location.shippingNote}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Media Directory */}
        <section className="py-24 bg-gray-50/50 bg-gray-900/30">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-white mb-6">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 from-purple-400 to-pink-400">Fam</span>
              </h2>
              <p className="text-gray-500 text-gray-400">Follow us for cat tips, updates, and exclusive offers.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: 'Instagram', handle: '@purrifyhq', icon: Instagram, url: SOCIAL_LINKS.instagram },
                { label: 'Facebook', handle: 'Purrify Canada', icon: Facebook, url: SOCIAL_LINKS.facebook },
                { label: 'YouTube', handle: '@PurrifyHQ', icon: Youtube, url: SOCIAL_LINKS.youtube },
                { label: 'LinkedIn', handle: 'Purrify', icon: Linkedin, url: SOCIAL_LINKS.linkedin },
                { label: 'TikTok', handle: '@purrifyhq', icon: null, url: SOCIAL_LINKS.tiktok },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-white bg-gray-800 rounded-3xl border border-gray-100 border-gray-700/50 hover:border-purple-200 hover:border-purple-800 transition-all hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 group"
                >
                  <div className="mb-4 text-gray-400 text-gray-500 group-hover:text-purple-600 group-hover:text-purple-400 transition-colors">
                    {social.icon ? <social.icon className="w-8 h-8" /> : (
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.75 2a.75.75 0 0 1 .75.75c0 2.24 1.53 4.12 3.63 4.5.37.07.62.4.62.77v2.02a.75.75 0 0 1-1.03.7 6.3 6.3 0 0 1-2.47-1.4v6.67A4.82 4.82 0 1 1 8 11.5h.75a.75.75 0 0 1 .75.75v2.14a.75.75 0 0 1-1.02.7 1.83 1.83 0 0 0-.73-.15 1.82 1.82 0 1 0 1.82 1.83V3.5a.75.75 0 0 1 .75-.75h2.43Z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-900 text-white text-center">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              {[
                { name: 'Trustpilot', url: SOCIAL_LINKS.trustpilot },
                { name: 'Google', url: SOCIAL_LINKS.googleReviews },
                { name: 'Crunchbase', url: SOCIAL_LINKS.crunchbase },
                { name: 'Product Hunt', url: SOCIAL_LINKS.producthunt },
              ].map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-500 text-gray-400 hover:text-purple-600">
                  {p.name}
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-16">
          <Container>
            <div className="text-center">
              <Link href="/#contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full text-gray-500 hover:text-purple-600 hover:text-purple-400"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  {translations.backToHome}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
