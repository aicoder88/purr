import { useState } from 'react';
import { Button } from '../src/components/ui/button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Message sent successfully!',
        });
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-[#E0EFC7] bg-white px-3 py-2 text-sm text-[#333333] shadow-sm focus:border-[#FF3131] focus:outline-none focus:ring-1 focus:ring-[#FF3131]"
        />
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-[#E0EFC7] bg-white px-3 py-2 text-sm text-[#333333] shadow-sm focus:border-[#FF3131] focus:outline-none focus:ring-1 focus:ring-[#FF3131]"
        />
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
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-[#E0EFC7] bg-white px-3 py-2 text-sm text-[#333333] shadow-sm focus:border-[#FF3131] focus:outline-none focus:ring-1 focus:ring-[#FF3131]"
        />
      </div>

      {submitStatus.message && (
        <div
          className={`rounded-md p-4 ${
            submitStatus.success
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#FF3131] hover:bg-[#FF3131]/90"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}