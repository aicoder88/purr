import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  MapPin,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  ExternalLink,
  Star,
  Home,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { SITE_NAME, CONTACT_INFO, PHONE_MESSAGING, PHONE_NUMBER, SOCIAL_LINKS } from '@/lib/constants';
import ContactForm from './_components/ContactForm';
import ContactMethodCard from './_components/ContactMethodCard';

export const metadata: Metadata = {
  title: `Contact Us - ${SITE_NAME} Customer Support & Help`,
  description:
    'Get in touch with the Purrify team for product questions, business inquiries, and customer support. Fast response times and expert assistance.',
  keywords: [
    'contact purrify',
    'cat litter customer support',
    'purrify help',
    'activated carbon questions',
    'pet product support',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact Us - ${SITE_NAME}`,
    description: 'Get in touch with the Purrify team for support and inquiries.',
    url: 'https://www.purrify.ca/contact',
    type: 'website',
  },
};

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-purple-100 dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumbItems.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
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

        {/* Hero Section - Enhanced */}
        <section className="py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <Container>
            <div className="text-center max-w-4xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full mb-8 border border-purple-200 dark:border-purple-800 shadow-lg">
                <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-700 dark:text-purple-300 font-semibold">24/7 Support Available</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent leading-tight">
                {translations.title} 🐱
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                {translations.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Fast Response</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Expert Advice</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Friendly Team</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Methods - Redesigned */}
        <section className="py-20 relative">
          <Container>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">
                {translations.chooseContactMethod}{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Preferred Way
                </span>{' '}
                to Connect
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We&apos;re available through multiple channels to make it easy for you!
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

        {/* Contact Form - Enhanced */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-orange-100/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20"></div>

          <Container>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                  Send Us a{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Message
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Fill out the form below and we&apos;ll get back to you within 24 hours ⏰
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                <ContactForm translations={translations.form} locale="en" />
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section - Enhanced */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                {translations.frequentlyAskedQuestions}{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">{translations.quickAnswersCommon} 💡</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {translations.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-1"
                >
                  <h3 className="font-heading text-xl font-black mb-4 text-gray-900 dark:text-white flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-3 text-2xl">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-8 text-lg">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg font-semibold">
                {translations.dontSeeQuestion}
              </p>
              <Link href="/#faq">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-600 font-bold text-lg px-8 py-6 rounded-xl transition-all duration-300"
                >
                  {translations.viewCompleteFAQ} →
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Phone Messaging Section */}
        <section className="py-16 bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-[#FF3131]/5 dark:to-[#5B2EFF]/5">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {PHONE_MESSAGING.headline}
              </h2>
              <p className="text-xl font-bold text-[#FF3131] dark:text-[#FF5050] mb-4">{PHONE_MESSAGING.callout}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
                Or use our secret code: {PHONE_NUMBER.tagline}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                {PHONE_NUMBER.description}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                {PHONE_MESSAGING.explanation}
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100 italic whitespace-pre-line">
                {PHONE_MESSAGING.cta}
              </p>
            </div>
          </Container>
        </section>

        {/* Business Hours & Location */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center md:text-left">
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  {translations.businessHours.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {translations.businessHours.weekdays}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {translations.businessHours.saturday}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {translations.businessHours.sunday}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  {translations.location.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Purrify Canada</p>
                      <p className="text-gray-600 dark:text-gray-300">109-17680 Rue Charles</p>
                      <p className="text-gray-600 dark:text-gray-300">Mirabel, QC J7J 0T6</p>
                      <p className="text-gray-600 dark:text-gray-300">Canada</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {translations.location.shippingNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Media Directory */}
        <section className="py-16 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">
                Connect With Us{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Everywhere
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Follow us on social media for tips, updates, and exclusive offers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Social Media */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#E4405F] group"
              >
                <div className="p-3 bg-gradient-to-br from-[#E4405F] to-[#833AB4] rounded-lg text-white">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">Instagram</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@purrifyhq</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#E4405F]" />
              </a>

              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1DA1F2] group"
              >
                <div className="p-3 bg-[#1DA1F2] rounded-lg text-white">
                  <Twitter className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">X (Twitter)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@PurrifyHQ</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1DA1F2]" />
              </a>

              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1877F2] group"
              >
                <div className="p-3 bg-[#1877F2] rounded-lg text-white">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">Facebook</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purrify Canada</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1877F2]" />
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FF0000] group"
              >
                <div className="p-3 bg-[#FF0000] rounded-lg text-white">
                  <Youtube className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">YouTube</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@PurrifyHQ</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#FF0000]" />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0A66C2] group"
              >
                <div className="p-3 bg-[#0A66C2] rounded-lg text-white">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">LinkedIn</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purrify</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#0A66C2]" />
              </a>

              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black dark:hover:border-white group"
              >
                <div className="p-3 bg-black dark:bg-white rounded-lg text-white dark:text-black">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.75 2a.75.75 0 0 1 .75.75c0 2.24 1.53 4.12 3.63 4.5.37.07.62.4.62.77v2.02a.75.75 0 0 1-1.03.7 6.3 6.3 0 0 1-2.47-1.4v6.67A4.82 4.82 0 1 1 8 11.5h.75a.75.75 0 0 1 .75.75v2.14a.75.75 0 0 1-1.02.7 1.83 1.83 0 0 0-.73-.15 1.82 1.82 0 1 0 1.82 1.83V3.5a.75.75 0 0 1 .75-.75h2.43Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">TikTok</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@purrifyhq</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white" />
              </a>
            </div>

            {/* Review Platforms */}
            <div className="mt-12">
              <h3 className="font-heading text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Leave Us a Review
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.trustpilot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#00B67A]"
                >
                  <div className="flex items-center gap-0.5 text-[#00B67A]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Trustpilot</span>
                </a>

                <a
                  href={SOCIAL_LINKS.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#4285F4]"
                >
                  <div className="flex items-center gap-0.5 text-[#FBBC04]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Google</span>
                </a>

                <a
                  href={SOCIAL_LINKS.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#D32323]"
                >
                  <div className="flex items-center gap-0.5 text-[#D32323]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Yelp</span>
                </a>
              </div>
            </div>

            {/* Business Profiles */}
            <div className="mt-12">
              <h3 className="font-heading text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Business Profiles
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.crunchbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0288D1]"
                >
                  Crunchbase
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.wellfound}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600"
                >
                  Wellfound
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.producthunt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#DA552F]"
                >
                  Product Hunt
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  Medium
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#4285F4]"
                >
                  Google Business
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href="/#contact">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
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
