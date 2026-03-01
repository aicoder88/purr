'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ResponseData = {
  success: boolean;
  message: string;
};

interface ContactFormProps {
  translations: {
    fullName?: string;
    emailAddress?: string;
    subject?: string;
    subjectPlaceholder?: string;
    message?: string;
    messagePlaceholder?: string;
    sendingMessage?: string;
    sendMessage?: string;
    successMessage?: string;
  };
  locale: string;
}

export default function ContactForm({ translations, locale }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

      const data = (await response.json()) as ResponseData;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus({
        success: true,
        message: translations.successMessage || 'Message sent successfully!',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Sorry, there was an error sending your message. Please try again or contact us directly at support@purrify.ca',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitStatus.message && (
        <div
          className={`mb-8 p-6 rounded-2xl flex items-center text-lg font-semibold ${submitStatus.success
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-700'
              : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border-2 border-red-300 dark:border-red-700'
            }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {submitStatus.success && <CheckCircle className="w-6 h-6 mr-3" />}
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {translations.fullName || 'Full Name'} <span className="text-purple-600 dark:text-purple-400">*</span>
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
              placeholder={locale === 'es' ? 'Tu nombre completo' : locale === 'fr' ? 'Votre nom complet' : 'Your full name'}
              className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20"
            />
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              {locale === 'es' ? '2-50 caracteres' : locale === 'fr' ? '2-50 caractères' : '2-50 characters'}
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {translations.emailAddress || 'Email Address'} <span className="text-purple-600 dark:text-purple-400">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {translations.subject || 'Subject'} <span className="text-purple-600 dark:text-purple-400">*</span>
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            minLength={3}
            value={formData.subject}
            onChange={handleInputChange}
            placeholder={translations.subjectPlaceholder || 'How can we help?'}
            className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20"
          />
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            {locale === 'es' ? 'Al menos 3 caracteres' : locale === 'fr' ? 'Au moins 3 caractères' : 'At least 3 characters'}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {translations.message || 'Message'} <span className="text-purple-600 dark:text-purple-400">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={900}
            value={formData.message}
            onChange={handleInputChange}
            placeholder={translations.messagePlaceholder || 'Tell us more about your question...'}
            rows={6}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20 resize-none"
          />
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-right">
            {formData.message.length}/900
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              {translations.sendingMessage || 'Sending...'}
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-3" />
              {translations.sendMessage || 'Send Message'}
            </>
          )}
        </Button>
      </form>
    </>
  );
}
