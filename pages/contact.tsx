import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Clock, MapPin, Send, CheckCircle, MessageCircle, Instagram, Twitter, Facebook, Youtube, Linkedin, ExternalLink, Star } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SITE_NAME, CONTACT_INFO, PHONE_MESSAGING, PHONE_NUMBER, SOCIAL_LINKS } from '@/lib/constants';
import { useTranslation } from '@/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl, generateWebsiteSchema } from '@/lib/seo-utils';
import { RelatedArticles } from '@/components/blog/RelatedArticles';

type ResponseData = {
  success: boolean;
  message: string;
};

export default function ContactPage() {
  const { t, locale } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Use translated page metadata
  const pageTitle = t.contactPage?.title
    ? `${t.contactPage.title} - ${SITE_NAME}`
    : `Contact Us - ${SITE_NAME} Customer Support & Help`;
  const pageDescription = t.contactPage?.subtitle || "Questions? Fast support for Purrify orders, shipping to USA & Canada, or cat litter odor advice. Email, phone, or WhatsApp. Response within 24 hours.";
  const canonicalPath = '/contact';
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Contact methods with translated text but preserved icons and actions
  const translatedContactMethods = t.contactPage?.contactMethods || [];
  const contactMethods = [
    {
      icon: Mail,
      title: translatedContactMethods[0]?.title || "Email Support",
      value: "support@purrify.ca",
      description: translatedContactMethods[0]?.description || "Get detailed help via email",
      responseTime: translatedContactMethods[0]?.responseTime || "Usually within 24 hours",
      action: "mailto:support@purrify.ca"
    },
    {
      icon: Phone,
      title: translatedContactMethods[1]?.title || "Phone Support",
      value: CONTACT_INFO.phone,
      description: PHONE_NUMBER.tagline,
      responseTime: translatedContactMethods[1]?.responseTime || "Mon-Fri, 9AM-5PM EST",
      action: CONTACT_INFO.phoneHref,
      taglineNote: PHONE_NUMBER.description
    },
    {
      icon: MessageCircle,
      title: translatedContactMethods[2]?.title || "WhatsApp Chat",
      value: locale === 'es' ? "Chatea con nosotros" : (locale === 'fr' ? "Chattez avec nous" : "Chat with us"),
      description: translatedContactMethods[2]?.description || "Instant messaging via WhatsApp",
      responseTime: translatedContactMethods[2]?.responseTime || "Available 7 days a week",
      action: "https://wa.me/385993433344?text=Hi%20I%27m%20interested%20in%20Purrify"
    }
  ];

  // Use translated FAQs
  const faqs = t.contactPage?.faqs || [
    {
      question: "How quickly will I see results with Purrify?",
      answer: "Most customers notice a significant reduction in odors within the first few hours of application. The activated carbon begins trapping odor molecules immediately upon contact."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with Purrify, contact us for a full refund."
    },
    {
      question: "Do you offer bulk pricing for multiple cats?",
      answer: "Yes! Our 500g bulk size offers the best value for multi-cat households. We also have wholesale pricing available for pet stores and veterinarians."
    },
    {
      question: "What if my cat accidentally ingests some?",
      answer: "Activated carbon used in household filtration is biologically inert. Purrify is designed to stay mixed with the litter; monitor as usual and contact your veterinarian with any concerns."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // Client-side validation
      const combinedMessage = `${formData.subject}\n\n${formData.message}`;

      if (formData.name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      if (formData.name.trim().length > 50) {
        throw new Error('Name must be no more than 50 characters long');
      }

      if (combinedMessage.trim().length < 10) {
        throw new Error('Your message is too short. Please provide more details (at least 10 characters total)');
      }

      if (combinedMessage.trim().length > 1000) {
        throw new Error('Your message is too long. Please keep it under 1000 characters');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: combinedMessage,
        }),
      });

      const data = await response.json() as ResponseData;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus({
        success: true,
        message: t.contactPage?.form?.successMessage || "Thank you for contacting us! We'll get back to you within 24 hours."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Sorry, there was an error sending your message. Please try again or contact us directly at support@purrify.ca"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'website',
          images: [
            {
              url: 'https://www.purrify.ca/customer-support-hero.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify Customer Support Team'
            }
          ]
        }}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema(locale))
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            })
          }}
        />
      </Head>

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
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                  Support
                </span>
              </li>
              <li className="text-gray-400 dark:text-gray-500">/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-semibold">Contact</li>
            </ol>
          </nav>
        </Container>

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
                {t.contactPage?.title || "We're Here to Help!"} 🐱
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                {t.contactPage?.subtitle || "Have questions about Purrify? Need help with your order? Our friendly customer support team is ready to assist you with expert advice and solutions."}
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
                {t.contactPage?.chooseContactMethod || "Choose Your"} <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{locale === 'en' ? 'Preferred Way' : ''}</span> {locale === 'en' ? 'to Connect' : ''}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {locale === 'es' ? '¡Estamos disponibles a través de múltiples canales para facilitarte las cosas!' :
                 locale === 'fr' ? 'Nous sommes disponibles via plusieurs canaux pour vous faciliter la vie!' :
                 "We're available through multiple channels to make it easy for you!"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/40 transition-all duration-500 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-2"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  <div className="relative z-10">
                    {/* Icon with animated gradient */}
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                      <method.icon className="w-12 h-12 text-white dark:text-gray-100" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-black mb-4 text-gray-900 dark:text-white">
                      {method.title}
                    </h3>

                    {/* Value */}
                    <div className="mb-6">
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {method.value}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {method.description}
                      </p>
                    </div>

                    {/* Tagline note for phone */}
                    {'taglineNote' in method && (
                      <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 p-4 rounded-2xl mb-6 border-2 border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                          {method.taglineNote}
                        </p>
                      </div>
                    )}

                    {/* Response time badge */}
                    <div className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full mb-6 border-2 border-blue-200 dark:border-blue-700 shadow-md">
                      <Clock className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {method.responseTime}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white dark:text-gray-100 font-bold shadow-xl transform group-hover:scale-105 transition-all duration-300 text-lg py-6"
                      size="lg"
                      onClick={() => {
                        window.location.href = method.action;
                      }}
                    >
                      {t.contactPage?.form?.contactNow || "Contact Now"} →
                    </Button>
                  </div>
                </div>
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
                  Send Us a <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Message</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours ⏰
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                {submitStatus.message && (
                  <div className={`mb-8 p-6 rounded-2xl flex items-center text-lg font-semibold ${submitStatus.success
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-700'
                      : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border-2 border-red-300 dark:border-red-700'
                    }`}>
                    {submitStatus.success && <CheckCircle className="w-6 h-6 mr-3" />}
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        {t.contactPage?.form?.fullName || "Full Name"} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={50}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={locale === 'es' ? "Tu nombre completo" : (locale === 'fr' ? "Votre nom complet" : "Your full name")}
                        className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {locale === 'es' ? "2-50 caracteres" : (locale === 'fr' ? "2-50 caractères" : "2-50 characters")}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        {t.contactPage?.form?.emailAddress || "Email Address"} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      {t.contactPage?.form?.subject || "Subject"} *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      minLength={3}
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t.contactPage?.form?.subjectPlaceholder || "Brief description of your inquiry"}
                      className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {locale === 'es' ? "Al menos 3 caracteres" : (locale === 'fr' ? "Au moins 3 caractères" : "At least 3 characters")}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      {t.contactPage?.form?.message || "Message"} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={900}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.contactPage?.form?.messagePlaceholder || "Please provide details about your question or concern..."}
                      rows={6}
                      className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all resize-none"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {formData.message.length}/900 {locale === 'es' ? "caracteres (mínimo 10)" : (locale === 'fr' ? "caractères (minimum 10)" : "characters (minimum 10)")}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white dark:text-gray-100 font-black text-xl py-7 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white dark:border-gray-100 mr-3"></div>
                        {t.contactPage?.form?.sendingMessage || "Sending Message..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3" />
                        {t.contactPage?.form?.sendMessage || "Send Message"}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section - Enhanced */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
                {t.contactPage?.frequentlyAskedQuestions || "Frequently Asked"} <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{locale === 'en' ? 'Questions' : ''}</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t.contactPage?.quickAnswersCommon || "Quick answers to common questions"} 💡
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-1">
                  <h3 className="font-heading text-xl font-black mb-4 text-gray-900 dark:text-white flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-3 text-2xl">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-8 text-lg">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg font-semibold">
                {t.contactPage?.dontSeeQuestion || "Don't see your question answered here?"}
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : (locale === 'es' ? '/es' : '')}/#faq`}>
                <Button variant="outline" size="lg" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-600 font-bold text-lg px-8 py-6 rounded-xl transition-all duration-300">
                  {t.contactPage?.viewCompleteFAQ || "View Full FAQ"} →
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
              <p className="text-xl font-bold text-[#FF3131] dark:text-[#FF5050] mb-4">
                {PHONE_MESSAGING.callout}
              </p>
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
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                  {t.contactPage?.businessHours?.title || "Business Hours"}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">
                        {t.contactPage?.businessHours?.weekdays || "Monday - Friday: 9:00 AM - 5:00 PM EST"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">
                        {t.contactPage?.businessHours?.saturday || "Saturday: 10:00 AM - 2:00 PM EST"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">
                        {t.contactPage?.businessHours?.sunday || "Sunday: Closed"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                  {t.contactPage?.location?.title || "Our Location"}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">Purrify Canada</p>
                      <p className="text-gray-600 dark:text-gray-300">109-17680 Rue Charles</p>
                      <p className="text-gray-600 dark:text-gray-300">Mirabel, QC J7J 0T6</p>
                      <p className="text-gray-600 dark:text-gray-300">Canada</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {t.contactPage?.location?.shippingNote || "We ship across Canada and offer local pickup in the Mirabel area."}
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
                Connect With Us <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Everywhere</span>
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
                <div className="p-3 bg-gradient-to-br from-[#E4405F] to-[#833AB4] rounded-lg text-white dark:text-white">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">Instagram</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@purrifyhq</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#E4405F]" />
              </a>

              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1DA1F2] group"
              >
                <div className="p-3 bg-[#1DA1F2] rounded-lg text-white dark:text-white">
                  <Twitter className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">X (Twitter)</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@PurrifyHQ</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#1DA1F2]" />
              </a>

              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1877F2] group"
              >
                <div className="p-3 bg-[#1877F2] rounded-lg text-white dark:text-white">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">Facebook</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purrify Canada</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#1877F2]" />
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FF0000] group"
              >
                <div className="p-3 bg-[#FF0000] rounded-lg text-white dark:text-white">
                  <Youtube className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">YouTube</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@PurrifyHQ</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#FF0000]" />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0A66C2] group"
              >
                <div className="p-3 bg-[#0A66C2] rounded-lg text-white dark:text-white">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">LinkedIn</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purrify</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#0A66C2]" />
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
                <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white" />
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
                  <div className="flex items-center gap-0.5 text-[#00B67A] dark:text-emerald-400">
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
                  <div className="flex items-center gap-0.5 text-[#FBBC04] dark:text-yellow-400">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0288D1] dark:hover:text-[#0288D1]"
                >
                  Crunchbase
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.wellfound}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Wellfound
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SOCIAL_LINKS.producthunt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#DA552F] dark:hover:text-[#DA552F]"
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#4285F4] dark:hover:text-[#4285F4]"
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
              <Link href={`${locale === 'fr' ? '/fr' : (locale === 'es' ? '/es' : '')}/#contact`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t.contactPage?.backToHome || "Back to Homepage"}
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/contact" />
          </Container>
        </section>
      </main>
    </>
  );
}