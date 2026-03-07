import {
  getFreshnessPlanCopy,
  type FreshnessPlanLocale,
  type FreshnessRiskLevel,
} from '@/translations/freshness-plan';

export interface FreshnessPlanInputs {
  locale?: string | null;
  catCount?: number | null;
  homeType?: string | null;
  odorSeverity?: string | null;
  currentRemedy?: string | null;
  riskLevel?: string | null;
  score?: number | null;
  recommendedProductId?: string | null;
}

export interface FreshnessPlanAction {
  id: string;
  title: string;
  description: string;
}

export interface FreshnessPlan {
  title: string;
  summary: string;
  starterNote: string;
  actions: FreshnessPlanAction[];
}

function normalizeLocale(locale?: string | null): FreshnessPlanLocale {
  return locale === 'fr' ? 'fr' : 'en';
}

function normalizeRiskLevel(riskLevel?: string | null, score?: number | null): FreshnessRiskLevel {
  if (riskLevel === 'low' || riskLevel === 'moderate' || riskLevel === 'high' || riskLevel === 'severe') {
    return riskLevel;
  }

  if (typeof score === 'number') {
    if (score <= 30) {
      return 'low';
    }
    if (score <= 50) {
      return 'moderate';
    }
    if (score <= 75) {
      return 'high';
    }
  }

  return 'moderate';
}

function inferRiskLevelFromProductId(recommendedProductId?: string | null): FreshnessRiskLevel {
  if (!recommendedProductId || recommendedProductId === 'purrify-12g') {
    return 'low';
  }

  if (recommendedProductId === 'purrify-50g' || recommendedProductId === 'purrify-50g-autoship') {
    return 'moderate';
  }

  if (recommendedProductId === 'purrify-120g' || recommendedProductId === 'purrify-120g-autoship') {
    return 'high';
  }

  return 'severe';
}

function getScoopingDescription(
  copy: ReturnType<typeof getFreshnessPlanCopy>,
  catCount?: number | null,
  riskLevel?: FreshnessRiskLevel
): string {
  if ((catCount ?? 0) >= 3 || riskLevel === 'severe') {
    return copy.scoopingThree;
  }

  if ((catCount ?? 0) >= 2 || riskLevel === 'high') {
    return copy.scoopingTwice;
  }

  return copy.scoopingOnce;
}

function getPlacementDescription(
  copy: ReturnType<typeof getFreshnessPlanCopy>,
  homeType?: string | null
): string {
  if (!homeType) {
    return copy.placementOpen;
  }

  if (homeType === 'small-apartment' || homeType === 'enclosed-closet' || homeType === 'living-space') {
    return copy.placementTight;
  }

  if (homeType === 'bathroom' || homeType === 'basement-laundry') {
    return copy.placementUtility;
  }

  return copy.placementOpen;
}

function getRemedyDescription(
  copy: ReturnType<typeof getFreshnessPlanCopy>,
  currentRemedy?: string | null
): string {
  if (currentRemedy === 'scented-litter' || currentRemedy === 'air-fresheners') {
    return copy.remedyMasking;
  }

  if (currentRemedy === 'baking-soda') {
    return copy.remedyBakingSoda;
  }

  if (currentRemedy === 'frequent-full-changes') {
    return copy.remedyMaintenance;
  }

  return copy.remedyNothing;
}

function getReorderDescription(
  copy: ReturnType<typeof getFreshnessPlanCopy>,
  recommendedProductId?: string | null
): string {
  if (!recommendedProductId || recommendedProductId === 'purrify-12g') {
    return copy.reorderByProduct.trial;
  }

  if (recommendedProductId === 'purrify-50g' || recommendedProductId === 'purrify-50g-autoship') {
    return copy.reorderByProduct.regular;
  }

  if (recommendedProductId === 'purrify-120g' || recommendedProductId === 'purrify-120g-autoship') {
    return copy.reorderByProduct.family;
  }

  return copy.reorderByProduct.bulk;
}

export function hasFreshnessPlanInputs(input: Partial<FreshnessPlanInputs> | null | undefined): boolean {
  if (!input) {
    return false;
  }

  return Boolean(
    input.riskLevel
      || typeof input.score === 'number'
      || input.homeType
      || input.currentRemedy
      || input.odorSeverity
      || input.recommendedProductId
      || typeof input.catCount === 'number'
  );
}

export function buildFreshnessPlan(input: FreshnessPlanInputs): FreshnessPlan | null {
  if (!hasFreshnessPlanInputs(input)) {
    return null;
  }

  const locale = normalizeLocale(input.locale);
  const copy = getFreshnessPlanCopy(locale);
  const normalizedRiskLevel = normalizeRiskLevel(input.riskLevel, input.score);
  const riskLevel =
    input.riskLevel || typeof input.score === 'number'
      ? normalizedRiskLevel
      : inferRiskLevelFromProductId(input.recommendedProductId);

  return {
    title: copy.title,
    summary: copy.summaryByRisk[riskLevel],
    starterNote: copy.starterNote,
    actions: [
      {
        id: 'application',
        title: copy.applicationTitle,
        description: `${copy.applicationIntro} ${copy.applicationByRisk[riskLevel]}`,
      },
      {
        id: 'scooping',
        title: copy.scoopingTitle,
        description: getScoopingDescription(copy, input.catCount, riskLevel),
      },
      {
        id: 'reset',
        title: copy.resetTitle,
        description: copy.resetByRisk[riskLevel],
      },
      {
        id: 'placement',
        title: copy.placementTitle,
        description: getPlacementDescription(copy, input.homeType),
      },
      {
        id: 'remedy',
        title: copy.remedyTitle,
        description: getRemedyDescription(copy, input.currentRemedy),
      },
      {
        id: 'reorder',
        title: copy.reorderTitle,
        description: getReorderDescription(copy, input.recommendedProductId),
      },
      {
        id: 'adjustment',
        title: copy.adjustmentTitle,
        description: copy.adjustmentBody,
      },
    ],
  };
}
