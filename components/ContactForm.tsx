import { useEffect } from 'react';
import { Button } from '../src/components/ui/button';
import { useTranslation } from '../src/lib/translation-context';
import { useContactForm, type ContactFormData } from '../hooks/useContactForm';
import { InputField, TextareaField } from './FormField';
import { useRouter } from 'next/router';

export default function ContactForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    submitStatus,
    onSubmit,
    initializeEmailJS,
  } = useContactForm();

  // Initialize EmailJS on component mount
  useEffect(() => {
    initializeEmailJS();
  }, [initializeEmailJS]);

  const router = useRouter();
  const { locale = 'en' } = router;

  // Get translated labels with fallbacks
  const getTranslatedLabel = (key: keyof ContactFormData) => {
    // Use the form translations if available, otherwise use the key as a fallback
    return t.contact?.form?.[key] || 
      (key === 'name' ? 'Name' : 
       key === 'email' ? 'Email' : 
       key === 'message' ? 'Message' : '');
  };

  // Get translated placeholders with fallbacks
  const getPlaceholder = (key: keyof ContactFormData) => {
    // For now, use simple English placeholders since they're not in the translation files
    return key === 'name' ? 'Your name' :
           key === 'email' ? 'your.email@example.com' :
           'Your message...';
  };

  return (
    <form 
      onSubmit={onSubmit} 
      className="space-y-6" 
      aria-label={t.contactSection?.getInTouch || 'Contact Form'}
      noValidate
    >
      <InputField
        label={getTranslatedLabel('name')}
        name="name"
        register={register}
        error={errors.name}
        required
        placeholder={getPlaceholder('name')}
      />

      <InputField
        label={getTranslatedLabel('email')}
        name="email"
        type="email"
        register={register}
        error={errors.email}
        required
        placeholder={getPlaceholder('email')}
      />

      <TextareaField
        label={getTranslatedLabel('message')}
        name="message"
        register={register}
        error={errors.message}
        required
        rows={4}
        placeholder={getPlaceholder('message')}
      />

      {submitStatus.message && (
        <div
          className={`rounded-md p-4 ${
            submitStatus.success
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200'
          }`}
          role="alert"
          aria-live={submitStatus.success ? 'polite' : 'assertive'}
        >
          {submitStatus.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#FF3131] hover:bg-[#FF3131]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3131]"
        aria-busy={isSubmitting}
      >
        {isSubmitting 
          ? t.freeGiveaway?.submitting || 'Submitting...' 
          : t.contact?.form?.submit || 'Send Message'}
      </Button>
    </form>
  );
}