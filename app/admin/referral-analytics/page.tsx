"use client";

import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { ReferralAnalyticsDashboard } from '@/components/analytics/ReferralAnalyticsDashboard';

export default function AdminReferralAnalyticsPage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
          Referral Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Monitor referral performance, conversion quality, and revenue contribution from the live referral program.
        </p>
      </div>

      <Card className="p-6">
        <ReferralAnalyticsDashboard />
      </Card>
    </Container>
  );
}
