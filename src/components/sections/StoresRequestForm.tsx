'use client';

import { useState, type FormEvent } from 'react';

interface StoresRequestFormProps {
  fullNameLabel: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  requestButtonLabel: string;
  sendingLabel: string;
  successLabel: string;
  successMessage: string;
  errorMessage: string;
}

export function StoresRequestForm({
  fullNameLabel,
  emailLabel,
  messageLabel,
  messagePlaceholder,
  requestButtonLabel,
  sendingLabel,
  successLabel,
  successMessage,
  errorMessage,
}: StoresRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const safeMessage = requestForm.message.replace(/[<>"'&]/g, '').trim();
      const message = [
        'Store availability request from website visitor.',
        '',
        `Requested store details: ${safeMessage}`,
        '',
        'Please contact this customer and follow up with the retailer.',
      ].join('\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: requestForm.name.trim(),
          email: requestForm.email.trim().toLowerCase(),
          message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(successMessage);
        setRequestForm({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || errorMessage);
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
              {fullNameLabel}
            </span>
            <input
              type="text"
              required
              minLength={2}
              maxLength={50}
              value={requestForm.name}
              onChange={(event) => setRequestForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
              {emailLabel}
            </span>
            <input
              type="email"
              required
              maxLength={100}
              value={requestForm.email}
              onChange={(event) => setRequestForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
            {messageLabel}
          </span>
          <textarea
            required
            minLength={10}
            maxLength={300}
            rows={4}
            value={requestForm.message}
            onChange={(event) => setRequestForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder={messagePlaceholder}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className="bg-brand-red-600 hover:bg-brand-red-700 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-0 flex items-center justify-center gap-2 mx-auto min-w-[240px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {sendingLabel}
            </>
          ) : submitStatus === 'success' ? (
            <>
              <span className="text-xl">✅</span>
              {successLabel}
            </>
          ) : (
            <>
              <span className="text-xl">📝</span>
              {requestButtonLabel}
            </>
          )}
        </button>
      </form>
      {submitStatus !== 'idle' && statusMessage ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-sm font-medium ${submitStatus === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
        >
          {statusMessage}
        </p>
      ) : null}
    </>
  );
}
