"use client";

import { Container } from '@/components/ui/container';
import { ReferralDashboard } from '@/components/referral/ReferralDashboard';
import type { Metadata } from 'next';

// Note: This page requires client-side interactivity for the referral dashboard
// Metadata is handled in metadata.ts

export default function ReferralPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              Give $5, Get $5
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Share your unique referral code and earn rewards
            </p>
          </div>

          <ReferralDashboard />
        </div>
      </Container>
    </main>
  );
}
