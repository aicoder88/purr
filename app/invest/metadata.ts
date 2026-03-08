import type { Metadata } from 'next';

const INVEST_METADATA_TITLE = 'Invest in Purrify | Activated Carbon Pet Care';
const INVEST_METADATA_DESCRIPTION =
  "Review Purrify's current investment round, traction, unit economics, and retail expansion plan for activated carbon pet care in Canada.";

export const metadata: Metadata = {
  title: INVEST_METADATA_TITLE,
  description: INVEST_METADATA_DESCRIPTION,
  keywords: ['pet industry investment', 'startup investment', 'cat products startup'],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: INVEST_METADATA_TITLE,
    description: INVEST_METADATA_DESCRIPTION,
    images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
  },
};
