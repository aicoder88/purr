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

    const templateParams = {
      businessName: formData.businessName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      position: formData.position || 'Not provided',
      businessType: formData.businessType,
      locations: formData.locations || 'Not provided',
      currentProducts: formData.currentProducts || 'Not provided',
      message: formData.message || 'No additional message',
      subject: `Retailer Partnership Application from ${formData.businessName}`,
      date: new Date().toLocaleString(),
      formType: 'Retailer Partnership Application'
    };

    console.log('Sending retailer inquiry via EmailJS with service:', EMAILJS_CONFIG.SERVICE_ID);

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
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
        message: 'Partnership application sent successfully! We\'ll contact you within 24 hours.',
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
      <section id="retailer-contact" className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#5B2EFF] to-[#3694FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We've received your wholesale inquiry and will contact you within 24 hours to discuss partnership opportunities.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">What happens next?</h3>
              <ul className="text-left space-y-3 text-gray-700 dark:text-gray-200">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-full flex items-center justify-center text-[#5B2EFF] dark:text-[#3694FF] text-sm font-bold mr-3">1</span>
                  Our wholesale team will review your application
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-full flex items-center justify-center text-[#5B2EFF] dark:text-[#3694FF] text-sm font-bold mr-3">2</span>
                  We'll schedule a call to discuss your needs and pricing
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-full flex items-center justify-center text-[#5B2EFF] dark:text-[#3694FF] text-sm font-bold mr-3">3</span>
                  Setup your wholesale account and first order
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="retailer-contact" className="py-16 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              {t.retailers?.contact?.title || 'Become a Purrify Retail Partner'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.retailers?.contact?.description || 'Ready to add Canada\'s #1 cat litter additive to your store? Fill out the form below and we\'ll get back to you within 24 hours.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Partnership Application
              </h3>

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
                  className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Partnership Application'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/10 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/5 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Direct Contact
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-50">Wholesale Sales</div>
                      <div className="text-gray-600 dark:text-gray-300">1-250-432-9352</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-50">Email</div>
                      <div className="text-gray-600 dark:text-gray-300">wholesale@purrify.ca</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-50">Business Hours</div>
                      <div className="text-gray-600 dark:text-gray-300">Monday - Friday: 9 AM - 6 PM EST</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  Fast Track Your Application
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Have your business license, tax ID, and current product catalog ready to speed up the approval process.
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24-hour application review
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Same-day pricing quotes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    First order within 7 days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}