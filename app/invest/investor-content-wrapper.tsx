"use client";

import dynamic from 'next/dynamic';
import { Container } from '@/components/ui/container';

// Dynamic import with ssr: false for the client component with charts
const InvestorContent = dynamic(() => import('./investor-content'), {
  ssr: false,
  loading: () => (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF3131] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading investor portal...</p>
        </div>
      </div>
    </Container>
  ),
});

export default function InvestorContentWrapper() {
  return <InvestorContent />;
}
