import 'server-only';

import { headers } from 'next/headers';
import {
  COMMERCIAL_EXPERIMENTS,
  type ExperimentVariant,
  type SerializedExperimentAssignment,
  isExperimentVariant,
} from './commercial';

export interface CommercialExperimentState {
  headline: ExperimentVariant;
  proofOrder: ExperimentVariant;
  ctaCopy: ExperimentVariant;
  assignments: SerializedExperimentAssignment[];
}

export async function getCommercialExperimentState(): Promise<CommercialExperimentState> {
  const requestHeaders = await headers();

  const assignments: SerializedExperimentAssignment[] = COMMERCIAL_EXPERIMENTS.map((experiment) => {
    const headerVariant = requestHeaders.get(experiment.headerName) ?? 'control';
    const variant: ExperimentVariant = isExperimentVariant(headerVariant) ? headerVariant : 'control';

    return {
      testSlug: experiment.slug,
      variant,
    };
  });

  const findVariant = (slug: string): ExperimentVariant => {
    return assignments.find((assignment) => assignment.testSlug === slug)?.variant ?? 'control';
  };

  return {
    headline: findVariant('commercial-headline-test'),
    proofOrder: findVariant('commercial-proof-order-test'),
    ctaCopy: findVariant('commercial-cta-copy-test'),
    assignments,
  };
}
