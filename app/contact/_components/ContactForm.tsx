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
          className={`mb-8 p-6 rounded-2xl flex items-center text-lg font-semibold ${
            submitStatus.success
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-700'
              : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border-2 border-red-300 dark:border-red-700'
          }`}
        >
          {submitStatus.success && <CheckCircle className="w-6 h-6 mr-3" />}
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              {translations.fullName || 'Full Name'} *
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
              className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {locale === 'es' ? '2-50 caracteres' : locale === 'fr' ? '2-50 caractères' : '2-50 characters'}
            </p>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              {translations.emailAddress || 'Email Address'} *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            {translations.subject || 'Subject'} *
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
            className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {locale === 'es' ? 'Al menos 3 caracteres' : locale === 'fr' ? 'Au moins 3 caractères' : 'At least 3 characters'}
          </p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            {translations.message || 'Message'} *
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
            className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100 rounded-xl py-3 px-4 text-lg transition-all resize-none"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {formData.message.length}/900{' '}
            {locale === 'es'
              ? 'caracteres (mínimo 10)'
              : locale === 'fr'
                ? 'caractères (minimum 10)'
                : 'characters (minimum 10)'}
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white dark:text-gray-100 font-black text-xl py-7 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white dark:border-gray-100 mr-3"></div>
              {translations.sendingMessage || 'Sending...'}
            </>
          ) : (
            <>
              <Send className="w-6 h-6 mr-3" />
              {translations.sendMessage || 'Send Message'}
            </>
          )}
        </Button>
      </form>
    </>
  );
}
