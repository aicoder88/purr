import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from '@/lib/translation-context';

// Define validation schema with Zod
const freeGiveawayFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  catNames: z.array(
    z.object({
      value: z.string().optional()
    })
  ).optional(),
});

type FreeGiveawayFormData = z.infer<typeof freeGiveawayFormSchema>;

export function FreeGiveawayForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FreeGiveawayFormData>({
    resolver: zodResolver(freeGiveawayFormSchema),
    defaultValues: {
      name: '',
      email: '',
      catNames: [{ value: '' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "catNames",
  });

  const onSubmit = async (data: FreeGiveawayFormData) => {
    Sentry.startSpan(
      {
        op: 'ui.form.submit',
        name: 'Free Giveaway Form Submit',
      },
      async (span) => {
        const { logger } = Sentry;

        setIsSubmitting(true);
        setSubmitStatus({});

        try {
          // Filter out empty cat names
          const filteredCatNames = data.catNames?.filter(cat => cat.value && cat.value.trim() !== '') || [];

          const formData = {
            ...data,
            catNames: filteredCatNames.map(cat => cat.value),
          };

          span.setAttribute('catCount', filteredCatNames.length);
          logger.info('Submitting free giveaway request', {
            catCount: filteredCatNames.length,
            hasEmail: !!data.email
          });

          const response = await fetch('/api/free-giveaway', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json();

          span.setAttribute('responseStatus', response.status);

          if (response.ok) {
            logger.info('Free giveaway request submitted successfully');
            setSubmitStatus({
              success: true,
              message: responseData.message || (t.freeGiveaway?.successMessage || 'Your free bag request has been submitted successfully!'),
            });
            // Reset form on success
            reset();
          } else {
            logger.warn('Free giveaway request failed', {
              status: response.status,
              message: responseData.message
            });
            setSubmitStatus({
              success: false,
              message: responseData.message || (t.freeGiveaway?.errorMessage || 'Failed to submit your request. Please try again.'),
            });
          }
        } catch (error) {
          Sentry.captureException(error);
          logger.error('Error submitting free giveaway request', {
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          setSubmitStatus({
            success: false,
            message: t.freeGiveaway?.errorGeneric || 'An error occurred. Please try again later.',
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-[#E0EFC7] dark:border-gray-800 transition-colors duration-300">
      <h2 className="font-heading text-2xl font-bold text-[#1E1B4B] dark:text-white dark:text-gray-100 dark:text-gray-100 mb-6">{t.freeGiveaway?.formTitle || "Enter Your Details"}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Free giveaway form">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#333333] dark:text-gray-200"
          >
            {t.freeGiveaway?.fullName || "Full Name"} <span className="text-[#FF3131]">*</span>
          </label>
          <Input
            type="text"
            id="name"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="mt-1 block w-full border-[#E0EFC7] focus:border-[#FF3131] focus:ring-[#FF3131]"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="py-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#333333] dark:text-gray-200"
          >
            {t.freeGiveaway?.emailAddress || "Email Address"} <span className="text-[#FF3131]">*</span>
          </label>
          <Input
            type="email"
            id="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="mt-1 block w-full border-[#E0EFC7] focus:border-[#FF3131] focus:ring-[#FF3131]"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333333] dark:text-gray-200 mb-2">
            {t.freeGiveaway?.catNames || "Names of Your Cats"}
          </label>
          
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id}>
                <Input
                  placeholder={t.freeGiveaway?.catNamePlaceholder?.replace('{index}', (index + 1).toString()) || `Name of Cat ${index + 1}`}
                  {...register(`catNames.${index}.value` as const)}
                  className="border-[#E0EFC7] focus:border-[#FF3131] focus:ring-[#FF3131]"
                />
              </div>
            ))}
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ value: '' })}
            className="mt-3 text-[#0072CE] border-[#E0EFC7] hover:bg-[#E0EFC7]/20"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            {t.freeGiveaway?.addAnotherCat || "Add Another Cat"}
          </Button>
        </div>

        {submitStatus.message && (
          <div
            className={`rounded-md p-4 ${
              submitStatus.success
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800'
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
          className="w-full bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-gray-100 font-medium py-2.5"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (t.freeGiveaway?.submitting || 'Submitting...') : (t.freeGiveaway?.submitButton || 'GET MY FREE BAG NOW')}
        </Button>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-4">
          {t.freeGiveaway?.privacyNotice || "By submitting this form, you're allowing us to contact you about your free Purrify sample. We respect your privacy and will never share your information with third parties."}
        </p>
      </form>
    </div>
  );
}