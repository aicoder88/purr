import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Textarea } from '../../src/components/ui/textarea';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME } from '../../src/lib/constants';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Clock, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

export default function ContactPage() {
  const { t, locale } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  
  const pageTitle = `Contact Us - ${SITE_NAME} Customer Support & Help`;
  const pageDescription = "Get in touch with Purrify's customer support team. We're here to help with product questions, orders, and cat litter odor control advice.";
  const canonicalUrl = `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/support/contact`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
    contactReason: 'general'
  });

  const contactReasons = [
    { value: 'general', label: 'General Question' },
    { value: 'product', label: 'Product Information' },
    { value: 'order', label: 'Order Support' },
    { value: 'shipping', label: 'Shipping Question' },
    { value: 'return', label: 'Return/Refund' },
    { value: 'wholesale', label: 'Wholesale Inquiry' },
    { value: 'feedback', label: 'Feedback/Review' }
  ];

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
      value: "+1 250 432 9352",
      description: "Speak directly with our team",
      responseTime: "Mon-Fri, 9AM-5PM EST",
      action: "tel:+12504329352"
    }
    // Live chat temporarily disabled
    /*
    {
      icon: MessageCircle,
      title: "Live Chat", 
      value: "Available Now",
      description: "Instant help for quick questions",
      responseTime: "Average response: 2 minutes",
      action: "#"
    }
    */
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
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus({
        success: true,
        message: "Thank you for contacting us! We'll get back to you within 24 hours."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        orderNumber: '',
        contactReason: 'general'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Sorry, there was an error sending your message. Please try again or contact us directly."
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
        <section className="py-16">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
                We're Here to Help
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-12 leading-relaxed">
                Have questions about Purrify? Need help with your order? Our friendly customer support team 
                is ready to assist you with expert advice and solutions.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                Choose How to Reach Us
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300">
                Pick the contact method that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-6">
                    <method.icon className="w-8 h-8 text-white dark:text-gray-100" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                    {method.title}
                  </h3>
                  <p className="text-xl font-semibold text-[#5B2EFF] dark:text-[#3694FF] mb-3">
                    {method.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {method.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-6">
                    {method.responseTime}
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (method.action.startsWith('#')) {
                        // Handle live chat
                        alert('Live chat feature coming soon! Please use email or phone for now.');
                      } else {
                        window.location.href = method.action;
                      }
                    }}
                  >
                    Contact Now
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50 dark:text-gray-100">
                  Send Us a Message
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300">
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
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                      />
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactReason" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                        Reason for Contact
                      </label>
                      <select
                        id="contactReason"
                        name="contactReason"
                        value={formData.contactReason}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      >
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                        Order Number (if applicable)
                      </label>
                      <Input
                        id="orderNumber"
                        name="orderNumber"
                        type="text"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., PUR-12345"
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
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your question or concern..."
                      rows={6}
                      className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 dark:text-gray-100"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] hover:from-[#FF3131]/90 hover:to-[#5B2EFF]/90 text-white dark:text-gray-100 font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
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
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
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
