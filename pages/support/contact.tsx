import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Clock, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react';

import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Textarea } from '../../src/components/ui/textarea';
import { SITE_NAME, CONTACT_INFO, PHONE_MESSAGING, PHONE_NUMBER } from '../../src/lib/constants';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

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
  
  const pageTitle = `Contact Us - ${SITE_NAME} Customer Support & Help`;
  const pageDescription = "Get in touch with Purrify's customer support team. We're here to help with product questions, orders, and cat litter odor control advice.";
  const canonicalPath = '/support/contact';
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@purrify.ca",
      description: "Get detailed help via email",
      responseTime: "Usually within 24 hours",
      action: "mailto:support@purrify.ca"
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: CONTACT_INFO.phone,
      description: PHONE_NUMBER.tagline,
      responseTime: "Mon-Fri, 9AM-5PM EST",
      action: CONTACT_INFO.phoneHref,
      taglineNote: PHONE_NUMBER.description
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      value: "Chat with us",
      description: "Instant messaging via WhatsApp",
      responseTime: "Usually within 1 hour",
      action: "https://wa.me/385993433344?text=Hi%20I%27m%20interested%20in%20Purrify"
    }
  ];

  const faqs = [
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
        message: "Thank you for contacting us! We'll get back to you within 24 hours."
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

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Support
                </span>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Contact</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                We're Here to Help
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Have questions about Purrify? Need help with your order? Our friendly customer support team is ready to assist you with expert advice and solutions.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Choose the contact method that works best for you. Our friendly team is here to help!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#FF3131]/20 dark:hover:border-[#FF5050]/20 text-center relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF3131]/10 dark:to-[#5B2EFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF3131] to-[#5B2EFF] rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <method.icon className="w-10 h-10 text-white dark:text-gray-100" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                      {method.title}
                    </h3>

                    {/* Value */}
                    <div className="mb-4">
                      <p className="text-lg font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-2">
                        {method.value}
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {method.description}
                      </p>
                    </div>

                    {/* Tagline note for phone */}
                    {'taglineNote' in method && (
                      <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-4 rounded-xl mb-4 border border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                          {method.taglineNote}
                        </p>
                      </div>
                    )}

                    {/* Response time badge */}
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6 border border-blue-200 dark:border-blue-700">
                      <Clock className="w-4 h-4 mr-2 text-[#FF3131] dark:text-[#FF5050]" />
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {method.responseTime}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] hover:from-[#FF3131]/90 hover:to-[#5B2EFF]/90 text-white dark:text-gray-100 font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                      size="lg"
                      onClick={() => {
                        window.location.href = method.action;
                      }}
                    >
                      Contact Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Help text */}
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                💬 <span className="font-semibold">Average response time:</span> Under 2 hours during business hours
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-[#E0EFC7]/20 dark:bg-gray-800/30">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                {submitStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center ${
                    submitStatus.success 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 dark:text-green-300 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}>
                    {submitStatus.success && <CheckCircle className="w-5 h-5 mr-2" />}
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                        Full Name *
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
                        placeholder="Your full name"
                        className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        2-50 characters
                      </p>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      minLength={3}
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      At least 3 characters
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={900}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your question or concern..."
                      rows={6}
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {formData.message.length}/900 characters (minimum 10)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] hover:from-[#FF3131]/90 hover:to-[#5B2EFF]/90 text-white dark:text-gray-100 font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-gray-600 mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300">
                Quick answers to common questions
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Don't see your question answered here?
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#faq`}>
                <Button variant="outline" size="lg">
                  View Full FAQ
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Phone Messaging Section */}
        <section className="py-16 bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-[#FF3131]/5 dark:to-[#5B2EFF]/5">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                  Business Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">Monday - Friday</p>
                      <p className="text-gray-600 dark:text-gray-300">9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">Saturday</p>
                      <p className="text-gray-600 dark:text-gray-300">10:00 AM - 2:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">Sunday</p>
                      <p className="text-gray-600 dark:text-gray-300">Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                  Our Location
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
                      We ship across Canada and offer local pickup in the Mirabel area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/#contact`}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/support/contact" />
          </Container>
        </section>
      </main>
    </>
  );
}
