import { useState, useEffect, useCallback, useMemo } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { CONTACT_INFO, PHONE_MESSAGING } from '../../lib/constants';
import { useTranslation } from '../../lib/translation-context';

// ============================================================================
// Types
// ============================================================================

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  position: string;
  businessType: string;
  locations: string;
  currentProducts: string;
  message: string;
}

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

// ============================================================================
// Constants
// ============================================================================

const WHOLESALE_EMAIL = 'wholesale@purrify.ca';

const INITIAL_FORM_DATA: FormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  position: '',
  businessType: 'independent-pet-store',
  locations: '',
  currentProducts: '',
  message: ''
};

const GRADIENTS = {
  successIcon: 'bg-gradient-to-br from-[#10B981] to-[#34D399]',
  purpleBlue: 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF]',
  redOrange: 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E]',
  green: 'bg-gradient-to-r from-[#10B981] to-[#34D399]',
  purpleBlueTint: 'from-[#5B2EFF]/10 to-[#3694FF]/10',
  purpleBlueTintDark: 'dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20',
  section: 'bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
  formCard: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900',
} as const;

// ============================================================================
// Subcomponents
// ============================================================================

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function FormCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

interface StepIndicatorProps {
  step: number;
  gradient: string;
  title: string;
  description: string;
}

function StepIndicator({ step, gradient, title, description }: StepIndicatorProps) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4`}>
        {step}
      </div>
      <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

interface SuccessStoryCardProps {
  icon: string;
  gradient: string;
  businessName: string;
  businessType: string;
  quote: string;
  metric: string;
  metricColor: string;
}

function SuccessStoryCard({ icon, gradient, businessName, businessType, quote, metric, metricColor }: SuccessStoryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 ${gradient} rounded-full flex items-center justify-center text-white font-black text-lg mr-4`}>
          {icon}
        </div>
        <div>
          <div className="font-black text-gray-900 dark:text-gray-50">{businessName}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{businessType}</div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-200 italic mb-3">{quote}</p>
      <div className={`text-2xl font-black ${metricColor}`}>{metric}</div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function RetailerContact() {
  const { t } = useTranslation();
  const contact = t.retailers?.contact;
  const form = contact?.form;
  const success = contact?.success;
  const stories = contact?.successStories;
  const contactInfo = contact?.contactInfo;
  const errors = contact?.errors;

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({});
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  // Build business types from translations
  const businessTypes = useMemo(() => [
    { value: 'independent-pet-store', label: form?.fields?.businessType?.options?.independentPetStore || 'Independent Pet Store' },
    { value: 'pet-store-chain', label: form?.fields?.businessType?.options?.petStoreChain || 'Pet Store Chain' },
    { value: 'veterinary-clinic', label: form?.fields?.businessType?.options?.veterinaryClinic || 'Veterinary Clinic' },
    { value: 'grooming-salon', label: form?.fields?.businessType?.options?.groomingSalon || 'Grooming Salon' },
    { value: 'distributor', label: form?.fields?.businessType?.options?.distributor || 'Distributor' },
    { value: 'other', label: form?.fields?.businessType?.options?.other || 'Other' },
  ], [form]);

  const handleWholesaleEmailClick = useCallback(() => {
    const mailtoLink = `mailto:${WHOLESALE_EMAIL}`;
    if (typeof globalThis.window !== 'undefined') {
      window.location.href = mailtoLink;
    }
  }, []);

  const handleWholesaleEmailKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleWholesaleEmailClick();
      }
    },
    [handleWholesaleEmailClick]
  );

  const handleCopyWholesaleEmail = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(WHOLESALE_EMAIL);
          setCopyStatus('copied');
        } else {
          throw new Error('Clipboard API unavailable');
        }
      } catch (err) {
        setCopyStatus('failed');
      }
    },
    []
  );

  useEffect(() => {
    if (copyStatus === 'idle') {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopyStatus('idle'), 2000);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copyStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to send retailer contact via API
  const sendRetailerContact = async () => {
    const response = await fetch('/api/contact-retailer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit application');
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    Sentry.startSpan(
      {
        op: 'ui.form.submit',
        name: 'Retailer Contact Form Submit',
      },
      async (span) => {
        const { logger } = Sentry;

        setIsSubmitting(true);
        setSubmitStatus({});

        try {
          span.setAttribute('businessType', formData.businessType);
          span.setAttribute('hasPhone', !!formData.phone);
          logger.info('Submitting retailer contact form', {
            businessType: formData.businessType,
            locations: formData.locations
          });

          // Send via API
          const result = await sendRetailerContact();

          logger.info('Retailer contact form submitted successfully');

          // Handle success
          setIsSubmitted(true);
          setSubmitStatus({
            success: true,
            message: result.message || errors?.defaultSuccess || 'Partnership application sent successfully! We\'ll contact you within 72 hours.',
          });

          // Reset form
          setFormData(INITIAL_FORM_DATA);

        } catch (err) {
          Sentry.captureException(err);
          logger.error('Error submitting retailer contact form', {
            error: err instanceof Error ? err.message : 'Unknown error'
          });
          setSubmitStatus({
            success: false,
            message: err instanceof Error
              ? err.message
              : errors?.submitFailed || 'There was an error submitting your inquiry. Please try again or contact us directly at wholesale@purrify.ca',
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    );
  };

  if (isSubmitted) {
    return (
      <section id="retailer-contact" className="py-16 bg-gradient-to-br from-[#5B2EFF]/5 via-white to-[#3694FF]/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className={`w-24 h-24 ${GRADIENTS.successIcon} rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce`}>
              <CheckIcon className="w-12 h-12 text-white dark:text-gray-100" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-50 mb-6">
              🎉 {success?.title || 'Application Received!'}
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-200 mb-8">
              {success?.welcome || 'Welcome to the'} <strong className="text-[#5B2EFF] dark:text-[#3694FF]">Purrify Partner Network!</strong>
              <br/>{success?.responseTime || 'We will get back to you within 72 hours.'}
            </p>

            <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-2xl p-8 border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
              <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-6">🚀 {success?.nextSteps?.title || 'Your Next Steps'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StepIndicator
                  step={1}
                  gradient={GRADIENTS.purpleBlue}
                  title={success?.nextSteps?.step1?.title || 'Application Review'}
                  description={success?.nextSteps?.step1?.description || 'Our team reviews your store details'}
                />
                <StepIndicator
                  step={2}
                  gradient={GRADIENTS.redOrange}
                  title={success?.nextSteps?.step2?.title || 'Partnership Call'}
                  description={success?.nextSteps?.step2?.description || 'Discuss pricing, support & logistics'}
                />
                <StepIndicator
                  step={3}
                  gradient={GRADIENTS.green}
                  title={success?.nextSteps?.step3?.title || 'Start Selling'}
                  description={success?.nextSteps?.step3?.description || 'Receive inventory & launch'}
                />
              </div>

              <div className="mt-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <h4 className="font-black text-lg text-gray-900 dark:text-gray-50 mb-3">💰 {success?.timeline?.title || 'Expected Timeline to Revenue'}</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF]">{success?.timeline?.approval?.value || '72hrs'}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{success?.timeline?.approval?.label || 'Approval'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#FF3131] dark:text-[#FF5050]">{success?.timeline?.firstShipment?.value || '3-5 days'}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{success?.timeline?.firstShipment?.label || 'First Shipment'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#10B981] dark:text-[#34D399]">{success?.timeline?.firstSales?.value || 'Week 1'}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{success?.timeline?.firstSales?.label || 'First Sales'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>{success?.needHelp || 'Need immediate assistance?'}</strong>
              </p>
              <a href={CONTACT_INFO.phoneHref} className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF] hover:underline">
                📞 {PHONE_MESSAGING.callout}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                {PHONE_MESSAGING.explanation}
              </p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="retailer-contact" className="py-16 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 text-[#5B2EFF] dark:text-[#3694FF] font-bold text-sm mb-6">
              🤝 {contact?.sectionBadge || 'Join 21 Established Partners'}
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
              {contact?.sectionTitle || 'Start Your'}
              <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
                {contact?.sectionTitleHighlight || 'Partnership Today'}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-8">
              {contact?.sectionDescription || 'Ready to earn'} <strong className="text-[#5B2EFF] dark:text-[#3694FF]">50%+</strong>
              <br/>{contact?.setupNote || 'Setup takes less than 24 hours.'}
            </p>

            {/* Urgency & Social Proof */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 dark:from-[#10B981]/20 dark:to-[#34D399]/20 rounded-2xl p-4 border border-[#10B981]/20 dark:border-[#34D399]/30">
                <div className="text-2xl font-black text-[#10B981] dark:text-[#34D399]">{contact?.urgencyStats?.approvalTime?.value || '72hrs'}</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{contact?.urgencyStats?.approvalTime?.label || 'Approval Time'}</div>
              </div>
              <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 dark:from-[#FF6B6B]/20 dark:to-[#FF8E8E]/20 rounded-2xl p-4 border border-[#FF6B6B]/20 dark:border-[#FF8E8E]/30">
                <div className="text-2xl font-black text-[#FF6B6B] dark:text-[#FF8E8E]">{contact?.urgencyStats?.setupFees?.value || 'Zero'}</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{contact?.urgencyStats?.setupFees?.label || 'Setup Fees'}</div>
              </div>
              <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-2xl p-4 border border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                <div className="text-2xl font-black text-[#5B2EFF] dark:text-[#3694FF]">{contact?.urgencyStats?.currentPartners?.value || '21'}</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{contact?.urgencyStats?.currentPartners?.label || 'Current Partners'}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${GRADIENTS.purpleBlue} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <FormCheckIcon className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                  🚀 {form?.title || 'Partnership Application'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {form?.subtitle || 'Quick 2-minute application. We respond same day!'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {form?.fields?.businessName?.label || 'Business Name'} *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder={form?.fields?.businessName?.placeholder || 'Your Pet Store Name'}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {form?.fields?.contactName?.label || 'Contact Name'} *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder={form?.fields?.contactName?.placeholder || 'Your Full Name'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {form?.fields?.position?.label || 'Your Position in the Company'}
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    placeholder={form?.fields?.position?.placeholder || 'e.g., Owner, Manager, Buyer, Sales Representative'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {form?.fields?.email?.label || 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder={form?.fields?.email?.placeholder || 'your@email.com'}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {form?.fields?.phone?.label || 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder={form?.fields?.phone?.placeholder || '(555) 123-4567'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {form?.fields?.businessType?.label || 'Business Type'} *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    >
                      {businessTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="locations" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {form?.fields?.locations?.label || 'Number of Locations'}
                    </label>
                    <input
                      type="number"
                      id="locations"
                      name="locations"
                      value={formData.locations}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                      placeholder={form?.fields?.locations?.placeholder || '1'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="currentProducts" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {form?.fields?.currentProducts?.label || 'Top-Selling Cat Litter Brand'}
                  </label>
                  <input
                    type="text"
                    id="currentProducts"
                    name="currentProducts"
                    value={formData.currentProducts}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    placeholder={form?.fields?.currentProducts?.placeholder || ""}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {form?.fields?.message?.label || 'Additional Information'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    minLength={10}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:ring-2 focus:ring-[#5B2EFF] dark:focus:ring-[#3694FF] focus:border-transparent transition-all duration-200"
                    placeholder={form?.fields?.message?.placeholder || 'Tell us about your business and wholesale needs...'}
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
                  className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-gray-100 font-black py-6 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-lg"
                >
                  {isSubmitting ? `⏳ ${form?.submitting || 'Submitting...'}` : `🚀 ${form?.submitButton || 'Submit Partnership Application'}`}
                </Button>
              </form>
            </div>

            {/* Success Stories & Contact */}
            <div className="space-y-8">
              {/* Success Stories */}
              <div className="bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/10 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/5 rounded-3xl p-8 border-2 border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-6 text-center">
                  💰 {stories?.title || 'Partner Success Stories'}
                </h3>

                <div className="space-y-6">
                  <SuccessStoryCard
                    icon="🏪"
                    gradient={GRADIENTS.green}
                    businessName={stories?.stories?.pattesEtGriffes?.businessName || 'Pattes et Griffes – Sainte‑Thérèse'}
                    businessType={stories?.stories?.pattesEtGriffes?.businessType || 'Store Owner / Manager'}
                    quote={stories?.stories?.pattesEtGriffes?.quote || 'Our customers ask for Purrify by name now. It\'s an easy recommendation at the counter and reorders have been consistent month after month.'}
                    metric={stories?.stories?.pattesEtGriffes?.metric || '30 day reorder cycle'}
                    metricColor="text-[#10B981] dark:text-[#34D399]"
                  />

                  <SuccessStoryCard
                    icon="🏪"
                    gradient={GRADIENTS.redOrange}
                    businessName={stories?.stories?.chico?.businessName || 'Chico – Boul. St‑Laurent (Montreal)'}
                    businessType={stories?.stories?.chico?.businessType || 'Store Manager'}
                    quote={stories?.stories?.chico?.quote || 'Simple to stock, strong margins, and it moves. The POS materials helped our team explain the benefits quickly to shoppers.'}
                    metric={stories?.stories?.chico?.metric || 'High shelf sell‑through'}
                    metricColor="text-[#FF6B6B] dark:text-[#FF8E8E]"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                    ⚡ {contactInfo?.title || 'Need Immediate Help?'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {contactInfo?.subtitle || 'Speak with a partnership specialist now'}
                  </p>
                </div>

                <div className="space-y-6">
                  <a href={CONTACT_INFO.phoneHref} className="flex flex-col items-start p-4 bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#3694FF]/20 dark:to-[#5B2EFF]/20 rounded-2xl hover:from-[#5B2EFF]/20 hover:to-[#3694FF]/20 dark:hover:from-[#3694FF]/30 dark:hover:to-[#5B2EFF]/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-black text-xl text-gray-900 dark:text-gray-50">📞 {PHONE_MESSAGING.callout}</div>
                        <div className="text-gray-600 dark:text-gray-300 font-semibold">{PHONE_MESSAGING.headline}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 ml-0">
                      {PHONE_MESSAGING.explanation}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 font-semibold italic mt-3 ml-0">
                      {PHONE_MESSAGING.cta}
                    </div>
                  </a>

                  <div
                    role="link"
                    tabIndex={0}
                    onClick={handleWholesaleEmailClick}
                    onKeyDown={handleWholesaleEmailKeyDown}
                    className="flex items-center p-4 bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 dark:from-[#10B981]/20 dark:to-[#34D399]/20 rounded-2xl hover:from-[#10B981]/20 hover:to-[#34D399]/20 dark:hover:from-[#10B981]/30 dark:hover:to-[#34D399]/30 transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#10B981]"
                    aria-label={`Email ${WHOLESALE_EMAIL}`}
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="font-black text-xl text-gray-900 dark:text-gray-50">✉️ {contactInfo?.wholesaleEmail || WHOLESALE_EMAIL}</div>
                        <button
                          type="button"
                          onClick={handleCopyWholesaleEmail}
                          className="flex items-center gap-1 text-sm font-semibold text-[#0F766E] dark:text-[#A7F3D0] hover:text-[#065F46] dark:hover:text-[#6EE7B7] transition-colors"
                          aria-label="Copy wholesale email address"
                        >
                          <span aria-hidden="true">📋</span>
                          <span className="sr-only">Click to copy</span>
                        </button>
                        {copyStatus === 'copied' && (
                          <span className="text-xs font-medium text-[#065F46] dark:text-[#6EE7B7]">{contactInfo?.copied || 'Copied!'}</span>
                        )}
                        {copyStatus === 'failed' && (
                          <span className="text-xs font-medium text-red-600 dark:text-red-300">{contactInfo?.copyFailed || 'Copy failed'}</span>
                        )}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">{contactInfo?.emailLabel || 'Partnership Email'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{contactInfo?.emailHint || 'Click to draft an email or copy the address.'}</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
                    <div className="font-bold text-gray-900 dark:text-gray-50 mb-1">⏰ {contactInfo?.businessHours?.title || 'Business Hours'}</div>
                    <div className="text-gray-600 dark:text-gray-300">{contactInfo?.businessHours?.hours || 'Monday - Friday: 9 AM - 6 PM EST'}</div>
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
