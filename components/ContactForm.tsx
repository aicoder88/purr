import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../src/components/ui/button';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../src/lib/emailjs-config';
import { useTranslation } from '../src/lib/translation-context';

// Define validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // EmailJS configuration
  const [emailjsInitialized, setEmailjsInitialized] = useState(false);
  const [configValid, setConfigValid] = useState(false);
  
  useEffect(() => {
    // Check if EmailJS is properly configured
    const isConfigured = isEmailJSConfigured();
    setConfigValid(isConfigured);
    
    // Only initialize if configuration is valid
    if (isConfigured && EMAILJS_CONFIG.PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        setEmailjsInitialized(true);
        console.log('EmailJS initialized successfully');
      } catch (err) {
        console.error('Failed to initialize EmailJS:', err);
        setEmailjsInitialized(false);
      }
    }
  }, []);

  // Helper function to validate API response
  const validateWithAPI = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('API response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'API validation failed');
    }

    return responseData;
  };

  // Helper function to send email via EmailJS
  const sendEmailViaEmailJS = async (data: ContactFormData) => {
    if (!configValid) {
      throw new Error('Email service is not properly configured. Please try again later.');
    }

    if (!emailjsInitialized) {
      throw new Error('Email service not initialized. Please try again later.');
    }

    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
      subject: `Contact form submission from ${data.name}`,
      date: new Date().toLocaleString(),
    };

    console.log('Sending email via EmailJS with service:', EMAILJS_CONFIG.SERVICE_ID);
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('EmailJS send result:', result);
    return result;
  };

  // Helper function to handle submission success
  const handleSubmissionSuccess = () => {
    setSubmitStatus({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
    });
    reset();
  };

  // Helper function to handle submission errors
  const handleSubmissionError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Form submission error:', errorMessage);
    
    setSubmitStatus({
      success: false,
      message: error instanceof Error && error.message.includes('configured') 
        ? error.message
        : 'An error occurred. Please try again later.',
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      console.log('Attempting to submit contact form:', {
        name: data.name,
        email: data.email,
        messageLength: data.message.length
      });
      
      // Step 1: Validate with API
      await validateWithAPI(data);
      
      // Step 2: Send email via EmailJS
      await sendEmailViaEmailJS(data);
      
      // Step 3: Handle success
      handleSubmissionSuccess();
      
    } catch (err) {
      handleSubmissionError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Contact form">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#333333]"
        >
          {t.contact.form?.name || "Name"}
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="mt-1 block w-full rounded-md border border-[#E0EFC7] bg-white px-3 py-2 text-sm text-[#333333] shadow-sm focus:border-[#FF3131] focus:outline-none focus:ring-1 focus:ring-[#FF3131]"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#333333]"
        >
          {t.contact.form?.email || "Email"}
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-1 block w-full rounded-md border border-[#E0EFC7] bg-white px-3 py-2 text-sm text-[#333333] shadow-sm focus:border-[#FF3131] focus:outline-none focus:ring-1 focus:ring-[#FF3131]"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[#333333]"
        >
          {t.contact.form?.message || "Message"}
        </label>
        <textarea
          id="message"
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          rows={4}
          className="mt-1 block w-full rounded-md border border-[#E0EFC7] bg-white px-3 py-2 text-sm text-[#333333] shadow-sm focus:border-[#FF3131] focus:outline-none focus:ring-1 focus:ring-[#FF3131]"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitStatus.message && (
        <div
          className={`rounded-md p-4 ${
            submitStatus.success
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
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
        className="w-full bg-[#FF3131] hover:bg-[#FF3131]/90"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? t.freeGiveaway?.submitting || "Submitting..." : t.contact.form?.submit || "Send"}
      </Button>
    </form>
  );
}
