import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../src/components/ui/button';
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '../src/lib/emailjs-config';

// Define validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
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
  
  useEffect(() => {
    // Initialize EmailJS with your user ID from config
    emailjs.init(EMAILJS_CONFIG.USER_ID);
    setEmailjsInitialized(true);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // Log the submission attempt for debugging
      console.log('Attempting to submit contact form:', {
        name: data.name,
        email: data.email,
        messageLength: data.message.length
      });
      
      // First, validate with the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('API response:', responseData);

      if (response.ok) {
        // If API validation is successful, send email using EmailJS
        if (emailjsInitialized) {
          try {
            console.log('EmailJS initialized, attempting to send email with:', {
              service: EMAILJS_CONFIG.SERVICE_NAME,
              serviceId: EMAILJS_CONFIG.SERVICE_ID,
              templateId: EMAILJS_CONFIG.TEMPLATE_ID,
              userId: EMAILJS_CONFIG.USER_ID.substring(0, 4) + '...' // Log partial ID for security
            });
            
            // Use the configuration from emailjs-config.ts
            const emailjsResponse = await emailjs.send(
              EMAILJS_CONFIG.SERVICE_ID,
              EMAILJS_CONFIG.TEMPLATE_ID,
              {
                name: data.name,
                email: data.email,
                message: data.message,
                // Add any additional template variables needed
                subject: `Contact form submission from ${data.name}`,
                date: new Date().toLocaleString(),
              }
            );
            
            console.log('EmailJS response:', emailjsResponse);
            
            if (emailjsResponse.status === 200) {
              setSubmitStatus({
                success: true,
                message: 'Message sent successfully! We\'ll get back to you soon.',
              });
              // Reset form on success
              reset();
            } else {
              throw new Error(`Failed to send email: Status ${emailjsResponse.status}`);
            }
          } catch (emailError) {
            console.error('EmailJS error:', emailError);
            
            // Check if it's a network error
            const errorMessage = emailError instanceof Error
              ? emailError.message
              : 'Unknown error';
              
            const isNetworkError = errorMessage.toLowerCase().includes('network') ||
                                  errorMessage.toLowerCase().includes('connection');
            
            setSubmitStatus({
              success: false,
              message: isNetworkError
                ? 'Network error. Please check your internet connection and try again.'
                : 'Failed to send email. Please try again or contact us directly at hello@purrify.ca.',
            });
          }
        } else {
          console.error('EmailJS not initialized');
          setSubmitStatus({
            success: false,
            message: 'Email service not initialized. Please try again later or contact us directly at hello@purrify.ca.',
          });
        }
      } else {
        console.error('API validation failed:', responseData);
        setSubmitStatus({
          success: false,
          message: responseData.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Form submission error:', errorMessage);
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later or contact us directly at hello@purrify.ca.',
      });
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
          Name
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
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#333333]"
        >
          Email
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
          Message
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
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}