import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../src/lib/emailjs-config';

// Define validation schema with Zod
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [emailjsInitialized, setEmailjsInitialized] = useState(false);
  const [configValid, setConfigValid] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // Initialize EmailJS
  const initializeEmailJS = () => {
    const isConfigured = isEmailJSConfigured();
    setConfigValid(isConfigured);
    
    if (isConfigured && EMAILJS_CONFIG.PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        setEmailjsInitialized(true);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
        setEmailjsInitialized(false);
      }
    }
  };

  // Validate with API
  const validateWithAPI = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('API response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'API validation failed');
    }

    return responseData;
  };

  // Send email via EmailJS
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

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      console.log('Attempting to submit contact form:', {
        name: data.name,
        email: data.email,
        messageLength: data.message.length
      });
      
      await validateWithAPI(data);
      await sendEmailViaEmailJS(data);
      
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you soon.',
      });
      form.reset();
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Form submission error:', errorMessage);
      
      setSubmitStatus({
        success: false,
        message: errorMessage.includes('configured') 
          ? errorMessage 
          : 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    isSubmitting,
    submitStatus,
    onSubmit: form.handleSubmit(onSubmit),
    initializeEmailJS,
  };
};
