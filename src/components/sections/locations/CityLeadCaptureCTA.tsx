"use client";



import { useCallback, useState } from 'react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { formEvents } from '../../../lib/gtm-events';
import { safeTrackEvent } from '../../../lib/analytics';

interface CityLeadCaptureCTAProps {
  cityName: string;
  provinceName: string;
  citySlug: string;
  provinceCode: string;
  scentFocus: string;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export function CityLeadCaptureCTA({
  cityName,
  provinceName,
  citySlug,
  provinceCode,
  scentFocus,
}: CityLeadCaptureCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setMarketingConsent(true);
    setSubmissionState('idle');
    setErrorMessage('');
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (open) {
        formEvents.formStart('city_lead_capture', citySlug);
      } else {
        resetForm();
      }
    },
    [citySlug, resetForm]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmissionState('loading');
      setErrorMessage('');

      try {
        const response = await fetch('/api/leads/city', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            citySlug,
            cityName,
            provinceName,
            provinceCode,
            marketingConsent,
            scentFocus,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({ error: 'Failed to submit lead.' }));
          throw new Error(payload.error || 'Failed to submit lead.');
        }

        safeTrackEvent('generate_lead', {
          event_category: 'city_page',
          event_label: citySlug,
          city_slug: citySlug,
          city_name: cityName,
          province: provinceName,
          marketing_consent: marketingConsent,
        });
        formEvents.formSubmit('city_lead_capture', citySlug, true);
        setSubmissionState('success');
      } catch (error) {
        setErrorMessage((error as Error).message || 'Something went wrong. Please try again.');
        setSubmissionState('error');
        formEvents.formSubmit('city_lead_capture', citySlug, false);
      }
    },
    [name, email, citySlug, cityName, provinceName, provinceCode, marketingConsent, scentFocus]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto border-orange-400 text-orange-600 dark:border-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-500/10"
        >
          Get a free odor playbook for {cityName}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle>Claim your {cityName} odor plan</DialogTitle>
          <DialogDescription>
            Tell us where to send the 12g trial offer and a {provinceName} playbook for beating litter smell fast.
          </DialogDescription>
        </DialogHeader>

        {submissionState === 'success' ? (
          <div className="rounded-md border border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-800 dark:text-green-200">
            Thanks! Your {cityName} odor blueprint is on the way. Watch your inbox for the trial offer and follow-up tips.
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="lead-name">Name</Label>
              <Input
                id="lead-name"
                name="name"
                placeholder="Jess Bowie"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-email">Email<span className="ml-1 text-red-600 dark:text-red-400">*</span></Label>
              <Input
                id="lead-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 p-3 text-sm text-gray-700 dark:text-gray-200">
              <p className="font-semibold text-gray-900 dark:text-gray-50">City insights we&apos;ll send:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>{scentFocus}</li>
                <li>Climate checklist for {provinceName} homes</li>
                <li>Retailer list to grab Purrify locally</li>
              </ul>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="lead-consent"
                checked={marketingConsent}
                onCheckedChange={(checked) => setMarketingConsent(Boolean(checked))}
              />
              <Label htmlFor="lead-consent" className="text-sm font-normal text-gray-600 dark:text-gray-300">
                Yes, send me city-specific odor tips and limited offers. You can unsubscribe anytime.
              </Label>
            </div>
            {errorMessage && (
              <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
                {errorMessage}
              </div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={submissionState === 'loading'} className="w-full sm:w-auto">
                {submissionState === 'loading' ? 'Sending...' : `Email me the ${cityName} plan`}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CityLeadCaptureCTA;
