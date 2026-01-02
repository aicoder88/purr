/**
 * Referral Dashboard Page
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Container } from '@/components/ui/container';
import { ReferralDashboard } from '@/components/referral/ReferralDashboard';
import { useTranslation } from '@/lib/translation-context';

export default function ReferralPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.referral?.dashboard?.title || 'Referral Program'} | Purrify</title>
        <meta
          name="description"
          content="Share Purrify with friends and earn rewards. Give $5, Get $5 for every successful referral."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                {t.referral?.dashboard?.title || 'Give $5, Get $5'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t.referral?.dashboard?.generateDescription?.split('.')[0] || 'Share your unique referral code and earn rewards'}
              </p>
            </div>

            <ReferralDashboard />
          </div>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
