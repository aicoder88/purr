"use client";

import { Container } from '../ui/container';
import { Button } from '../ui/button';


import { useTranslation } from '../../lib/translation-context';
import { CONTACT_INFO } from '../../lib/constants';
import { useState } from 'react';

export function VeterinarianContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    clinicName: '',
    contactName: '',
    email: '',
    phone: '',
    clinicSize: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in production, this would send to an API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="vet-contact" className="py-20 bg-gradient-to-br from-[#10B981]/5 via-white to-[#3694FF]/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 dark:from-[#10B981]/20 dark:to-[#3694FF]/20 text-brand-green-700 dark:text-[#34D399] font-semibold text-sm mb-6">
            {t.veterinarians?.contact?.badge || 'Get Started Today'}
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
            {t.veterinarians?.contact?.titleLine1 || 'Request Your'}
            <span className="block bg-gradient-to-r from-[#10B981] to-[#3694FF] bg-clip-text text-transparent">
              {t.veterinarians?.contact?.titleLine2 || 'Free Sample Kit'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.veterinarians?.contact?.subtitle || 'Fill out the form below and our veterinary partnerships team will be in touch within 24 hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800/70 rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-4">
                  {t.veterinarians?.contact?.success?.title || 'Thank You!'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.veterinarians?.contact?.success?.message || 'We\'ve received your request. Our veterinary partnerships team will contact you within 24 hours.'}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-[#10B981] text-brand-green-700 hover:bg-[#10B981] hover:text-white dark:border-[#34D399] dark:text-[#34D399] dark:hover:bg-[#34D399] dark:hover:text-gray-900"
                >
                  {t.veterinarians?.contact?.success?.submitAnother || 'Submit Another Request'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="clinicName" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      {t.veterinarians?.contact?.form?.clinicName || 'Clinic Name'} *
                    </label>
                    <input
                      type="text"
                      id="clinicName"
                      name="clinicName"
                      required
                      value={formData.clinicName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      placeholder={t.veterinarians?.contact?.form?.clinicNamePlaceholder || 'Your Veterinary Clinic'}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      {t.veterinarians?.contact?.form?.contactName || 'Contact Name'} *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      placeholder={t.veterinarians?.contact?.form?.contactNamePlaceholder || 'Dr. Jane Smith'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      {t.veterinarians?.contact?.form?.email || 'Email'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      placeholder={t.veterinarians?.contact?.form?.emailPlaceholder || 'clinic@example.com'}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      {t.veterinarians?.contact?.form?.phone || 'Phone'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      placeholder={t.veterinarians?.contact?.form?.phonePlaceholder || '(555) 123-4567'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="clinicSize" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      {t.veterinarians?.contact?.form?.clinicSize || 'Clinic Size'}
                    </label>
                    <select
                      id="clinicSize"
                      name="clinicSize"
                      value={formData.clinicSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    >
                      <option value="">{t.veterinarians?.contact?.form?.clinicSizePlaceholder || 'Select size...'}</option>
                      <option value="solo">{t.veterinarians?.contact?.form?.clinicSizeOptions?.solo || 'Solo Practice (1 vet)'}</option>
                      <option value="small">{t.veterinarians?.contact?.form?.clinicSizeOptions?.small || 'Small (2-3 vets)'}</option>
                      <option value="medium">{t.veterinarians?.contact?.form?.clinicSizeOptions?.medium || 'Medium (4-6 vets)'}</option>
                      <option value="large">{t.veterinarians?.contact?.form?.clinicSizeOptions?.large || 'Large (7+ vets)'}</option>
                      <option value="network">{t.veterinarians?.contact?.form?.clinicSizeOptions?.network || 'Multi-clinic Network'}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      {t.veterinarians?.contact?.form?.interest || 'Interested In'}
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    >
                      <option value="">{t.veterinarians?.contact?.form?.interestPlaceholder || 'Select interest...'}</option>
                      <option value="samples">{t.veterinarians?.contact?.form?.interestOptions?.samples || 'Free Sample Kit'}</option>
                      <option value="wholesale">{t.veterinarians?.contact?.form?.interestOptions?.wholesale || 'Wholesale Pricing'}</option>
                      <option value="partnership">{t.veterinarians?.contact?.form?.interestOptions?.partnership || 'Full Partnership'}</option>
                      <option value="info">{t.veterinarians?.contact?.form?.interestOptions?.info || 'Just Looking for Info'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                    {t.veterinarians?.contact?.form?.message || 'Additional Notes'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#10B981] focus:border-transparent resize-none"
                    placeholder={t.veterinarians?.contact?.form?.messagePlaceholder || 'Tell us about your clinic and how you\'d like to work with Purrify...'}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#10B981] to-[#3694FF] hover:from-[#059669] hover:to-[#2563EB] text-white dark:text-white font-bold py-4 rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? (t.veterinarians?.contact?.form?.submitting || 'Submitting...')
                    : (t.veterinarians?.contact?.form?.submit || 'Request Sample Kit')}
                </Button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {t.veterinarians?.contact?.form?.privacy || 'We respect your privacy. Your information will never be shared.'}
                </p>
              </form>
            )}
          </div>

          {/* Contact Info & Why Choose Us */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 dark:from-[#10B981]/20 dark:to-[#3694FF]/20 rounded-3xl p-8 border border-[#10B981]/20 dark:border-[#34D399]/30">
              <h3 className="font-heading text-xl font-black text-gray-900 dark:text-gray-50 mb-6">
                {t.veterinarians?.contact?.direct?.title || 'Prefer to Talk?'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.veterinarians?.contact?.direct?.emailLabel || 'Email Us'}</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-bold text-gray-900 dark:text-gray-50 hover:text-brand-green-700 dark:hover:text-[#34D399]">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3694FF] to-[#60A5FA] rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.veterinarians?.contact?.direct?.phoneLabel || 'Call Us'}</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="font-bold text-gray-900 dark:text-gray-50 hover:text-[#3694FF] dark:hover:text-[#60A5FA]">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-white dark:bg-gray-800/70 rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-heading text-xl font-black text-gray-900 dark:text-gray-50 mb-6">
                {t.veterinarians?.contact?.expect?.title || 'What Happens Next'}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white dark:text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">
                      {t.veterinarians?.contact?.expect?.step1?.title || 'We\'ll Reach Out'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.veterinarians?.contact?.expect?.step1?.description || 'Our veterinary partnerships team will contact you within 24 hours to discuss your needs.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#3694FF] to-[#60A5FA] rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white dark:text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">
                      {t.veterinarians?.contact?.expect?.step2?.title || 'Receive Your Sample Kit'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.veterinarians?.contact?.expect?.step2?.description || 'We\'ll ship a complimentary sample kit with products and materials to evaluate.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white dark:text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">
                      {t.veterinarians?.contact?.expect?.step3?.title || 'Start Recommending'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.veterinarians?.contact?.expect?.step3?.description || 'Once you\'re happy with the product, we\'ll set up your wholesale account and provide training.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#3694FF] rounded-3xl p-6 text-center text-white dark:text-white">
              <p className="text-lg font-bold mb-2">
                {t.veterinarians?.contact?.trust?.title || 'Trusted by 50+ Veterinary Clinics'}
              </p>
              <p className="text-sm opacity-90">
                {t.veterinarians?.contact?.trust?.subtitle || 'Join the growing network of veterinary professionals recommending Purrify'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
