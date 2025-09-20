import { useState, useEffect } from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../../lib/emailjs-config';

export function RetailerContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    position: '',
    businessType: '',
    locations: '',
    currentProducts: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailjsInitialized, setEmailjsInitialized] = useState(false);
  const [configValid, setConfigValid] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // EmailJS configuration
  useEffect(() => {
    // Check if EmailJS is properly configured
    const isConfigured = isEmailJSConfigured();
    setConfigValid(isConfigured);

    // Only initialize if configuration is valid
    if (isConfigured && EMAILJS_CONFIG.PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        setEmailjsInitialized(true);
        console.log('EmailJS initialized successfully for retailer form');
      } catch (error) {
        console.error('Failed to initialize EmailJS for retailer form:', error);
        setEmailjsInitialized(false);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to send email via EmailJS
  const sendEmailViaEmailJS = async () => {
    if (!configValid) {
      throw new Error('Email service is not properly configured. Please try again later.');
    }

    if (!emailjsInitialized) {
      throw new Error('Email service not initialized. Please try again later.');
    }

    const submittedAt = new Date();
    const fullMessage = [
      'Retailer Partnership Application',
      '--------------------------------',
      `Business Name: ${formData.businessName || '—'}`,
      `Contact Name: ${formData.contactName || '—'}`,
      `Email: ${formData.email || '—'}`,
      `Phone: ${formData.phone || '—'}`,
      `Position: ${formData.position || '—'}`,
      `Business Type: ${formData.businessType || '—'}`,
      `Number of Locations: ${formData.locations || '—'}`,
      `Current Products: ${formData.currentProducts || '—'}`,
      `Additional Message: ${formData.message || '—'}`,
      '',
      `Submitted (local): ${submittedAt.toLocaleString()}`,
      `Submitted (ISO): ${submittedAt.toISOString()}`,
    ].join('\n');

    // Note: EmailJS templates commonly use {{message}}; we include the full
    // labeled body in plain text via the `message` param below for reliability.

    const templateParams = {
      // Common mappings expected by many EmailJS templates
      subject: `Retailer Partnership Application from ${formData.businessName || 'Unknown Business'}`,
      // Common template keys for compatibility
      from_name: formData.contactName || formData.businessName || 'Retailer Applicant',
      from_email: formData.email || 'noreply@purrify.ca',
      reply_to: formData.email || 'noreply@purrify.ca',

      // Individual labeled fields
      businessName: formData.businessName || 'Not provided',
      contactName: formData.contactName || 'Not provided',
      phone: formData.phone || 'Not provided',
      position: formData.position || 'Not provided',
      businessType: formData.businessType || 'Not provided',
      locations: formData.locations || 'Not provided',
      currentProducts: formData.currentProducts || 'Not provided',
      additionalMessage: formData.message || 'No additional message',

      // Full body content (plain text)
      message: fullMessage,

      // Meta
      date: submittedAt.toLocaleString(),
      date_iso: submittedAt.toISOString(),
      formType: 'Retailer Partnership Application'
    };

    console.log('Sending retailer inquiry via EmailJS with service:', EMAILJS_CONFIG.SERVICE_ID);

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY, blockHeadless: false }
    );

    console.log('EmailJS send result for retailer form:', result);
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      console.log('Attempting to submit retailer form:', {
        businessName: formData.businessName,
        contactName: formData.contactName,
        email: formData.email,
        businessType: formData.businessType
      });

      // Send email via EmailJS
      await sendEmailViaEmailJS();

      // Handle success
      setIsSubmitted(true);
      setSubmitStatus({
        success: true,
        message: 'Partnership application sent successfully! We\'ll contact you within 72 hours.',
      });

      // Reset form
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        position: '',
        businessType: '',
        locations: '',
        currentProducts: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting retailer form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      setSubmitStatus({
        success: false,
        message: error instanceof Error && error.message.includes('configured')
          ? error.message
          : 'There was an error submitting your inquiry. Please try again or contact us directly at wholesale@purrify.ca',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="retailer-contact" className="py-20 bg-gradient-to-br from-[#5B2EFF]/5 via-white to-[#3694FF]/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-50 mb-6">
              🎉 Application Received!
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-200 mb-8">
              Welcome to the <strong className="text-[#5B2EFF] dark:text-[#3694FF]">Purrify Partner Network!</strong>
              <br/>We will get back to you within 72 hours.
            </p>

            <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-2xl p-8 border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50 mb-6">🚀 Your Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">1</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Application Review</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Our team reviews your store details</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">2</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Partnership Call</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Discuss pricing, support & logistics</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">3</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">Start Selling</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Receive inventory & launch</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <h4 className="font-black text-lg text-gray-900 dark:text-gray-50 mb-3">💰 Expected Timeline to Revenue</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF]">72hrs</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Approval</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#FF3131] dark:text-[#FF5050]">3-5 days</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">First Shipment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#10B981] dark:text-[#34D399]">Week 1</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">First Sales</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Need immediate assistance?</strong>
              </p>
              <a href="tel:1-250-432-9352" className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF] hover:underline">
                📞 1-250-432-9352
              </a>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="retailer-contact" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 text-[#5B2EFF] dark:text-[#3694FF] font-bold text-sm mb-6">
              🤝 Join 17 Established Partners
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
              Start Your
              <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
                Partnership Today
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-8">
              Ready to earn <strong className="text-[#5B2EFF] dark:text-[#3694FF]">50%+ margins</strong> with Canada's #1 cat odor solution?
              <br/>Setup takes less than 24 hours.
            </p>

            {/* Urgency & Social Proof */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 dark:from-[#10B981]/20 dark:to-[#34D399]/20 rounded-2xl p-4 border border-[#10B981]/20 dark:border-[#34D399]/30">
                <div className="text-2xl font-black text-[#10B981] dark:text-[#34D399]">72hrs</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Approval Time</div>
              </div>
              <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 dark:from-[#FF6B6B]/20 dark:to-[#FF8E8E]/20 rounded-2xl p-4 border border-[#FF6B6B]/20 dark:border-[#FF8E8E]/30">
                <div className="text-2xl font-black text-[#FF6B6B] dark:text-[#FF8E8E]">Zero</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Setup Fees</div>
              </div>
              <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-2xl p-4 border border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                <div className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF]">17</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Current Partners</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                  🚀 Partnership Application
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Quick 2-minute application. We respond same day!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder="Your Pet Store Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder="Your Full Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Your Position in the Company
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Owner, Manager, Buyer, Sales Representative"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Business Type *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Business Type</option>
                      <option value="independent-pet-store">Independent Pet Store</option>
                      <option value="pet-store-chain">Pet Store Chain</option>
                      <option value="veterinary-clinic">Veterinary Clinic</option>
                      <option value="grooming-salon">Grooming Salon</option>
                      <option value="distributor">Distributor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="locations" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Number of Locations
                    </label>
                    <input
                      type="number"
                      id="locations"
                      name="locations"
                      value={formData.locations}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="currentProducts" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Top-Selling Cat Litter Brand
                  </label>
                  <input
                    type="text"
                    id="currentProducts"
                    name="currentProducts"
                    value={formData.currentProducts}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    placeholder="What's the #1 brand of cat litter that you sell most of?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your business and wholesale needs..."
                  />
                </div>

                {submitStatus.message && !isSubmitted && (
                  <div
                    className={`rounded-lg p-4 ${
                      submitStatus.success
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                    }`}
                    role="alert"
                    aria-live="polite"
                  >
                    {submitStatus.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-black py-6 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-lg"
                >
                  {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Partnership Application'}
                </Button>
              </form>
            </div>

            {/* Success Stories & Contact */}
            <div className="space-y-8">
              {/* Success Stories */}
              <div className="bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/10 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/5 rounded-3xl p-8 border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50 mb-6 text-center">
                  💰 Partner Success Stories
                </h3>

                <div className="space-y-6">
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center text-white font-black text-lg mr-4">
                        🏪
                      </div>
                      <div>
                        <div className="font-black text-gray-900 dark:text-gray-50">Pet Palace Toronto</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Independent Pet Store</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 italic mb-3">
                      "Added $1,800/month revenue in our first quarter. Customers love it and keep coming back!"
                    </p>
                    <div className="text-2xl font-black text-[#10B981] dark:text-[#34D399]">+145% sales growth</div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full flex items-center justify-center text-white font-black text-lg mr-4">
                        🏥
                      </div>
                      <div>
                        <div className="font-black text-gray-900 dark:text-gray-50">Healthy Paws Vet</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Veterinary Clinic</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 italic mb-3">
                      "Our clients trust our recommendation. Best margins in our retail section."
                    </p>
                    <div className="text-2xl font-black text-[#FF6B6B] dark:text-[#FF8E8E]">55% profit margin</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                    ⚡ Need Immediate Help?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Speak with a partnership specialist now
                  </p>
                </div>

                <div className="space-y-6">
                  <a href="tel:1-250-432-9352" className="flex items-center p-4 bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-2xl hover:from-[#5B2EFF]/20 hover:to-[#3694FF]/20 dark:hover:from-[#3694FF]/30 dark:hover:to-[#5B2EFF]/30 transition-all duration-300 transform hover:scale-105">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-black text-xl text-gray-900 dark:text-gray-50">📞 1-250-432-9352</div>
                      <div className="text-gray-600 dark:text-gray-300">Direct Wholesale Sales Line</div>
                    </div>
                  </a>

                  <a href="mailto:wholesale@purrify.ca" className="flex items-center p-4 bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 dark:from-[#10B981]/20 dark:to-[#34D399]/20 rounded-2xl hover:from-[#10B981]/20 hover:to-[#34D399]/20 dark:hover:from-[#10B981]/30 dark:hover:to-[#34D399]/30 transition-all duration-300 transform hover:scale-105">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-black text-xl text-gray-900 dark:text-gray-50">✉️ wholesale@purrify.ca</div>
                      <div className="text-gray-600 dark:text-gray-300">Partnership Email</div>
                    </div>
                  </a>

                  <div className="text-center p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
                    <div className="font-bold text-gray-900 dark:text-gray-50 mb-1">⏰ Business Hours</div>
                    <div className="text-gray-600 dark:text-gray-300">Monday - Friday: 9 AM - 6 PM EST</div>
                    <div className="text-sm text-[#5B2EFF] dark:text-[#3694FF] font-semibold mt-2">
                      Same-day response guaranteed!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
