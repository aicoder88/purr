export type RetailerSkuId = 'trial' | 'medium' | 'large';

export interface RetailerSkuConfig {
  id: RetailerSkuId;
  unitsPerBox: number;
  defaultBoxCost: number;
  defaultUnitCost: number;
  defaultSellPrice: number;
}

export interface RetailerCalculatorInput {
  quantities: Record<RetailerSkuId, number>;
  sellPrices: Record<RetailerSkuId, number>;
  shippingCost: number;
}

export interface RetailerSkuResult {
  id: RetailerSkuId;
  boxes: number;
  units: number;
  revenue: number;
  cost: number;
  shippingShare: number;
  profit: number;
  marginPercent: number;
}

export interface RetailerCalculatorResult {
  qualifiesForFreeShipping: boolean;
  shippingApplied: number;
  subtotalCost: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  marginPercent: number;
  remainingBoxesForFreeShipping: Record<RetailerSkuId, number>;
  perSku: Record<RetailerSkuId, RetailerSkuResult>;
}

export const RETAILER_SKU_CONFIG: Record<RetailerSkuId, RetailerSkuConfig> = {
  trial: {
    id: 'trial',
    unitsPerBox: 25,
    defaultBoxCost: 25,
    defaultUnitCost: 1,
    defaultSellPrice: 1.99,
  },
  medium: {
    id: 'medium',
    unitsPerBox: 15,
    defaultBoxCost: 36,
    defaultUnitCost: 2.4,
    defaultSellPrice: 4.99,
  },
  large: {
    id: 'large',
    unitsPerBox: 10,
    defaultBoxCost: 45,
    defaultUnitCost: 4.5,
    defaultSellPrice: 8.99,
  },
};

export const RETAILER_SKU_ORDER: RetailerSkuId[] = ['trial', 'medium', 'large'];

export const FREE_SHIPPING_BOX_THRESHOLD = 5;
export const DEFAULT_RETAILER_SHIPPING_COST = 20;

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

function toSafeNumber(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}

export function qualifiesForRetailerFreeShipping(quantities: Record<RetailerSkuId, number>): boolean {
  return RETAILER_SKU_ORDER.every((skuId) => toSafeNumber(quantities[skuId]) >= FREE_SHIPPING_BOX_THRESHOLD);
}

export function getRemainingBoxesForFreeShipping(quantities: Record<RetailerSkuId, number>): Record<RetailerSkuId, number> {
  return {
    trial: Math.max(0, FREE_SHIPPING_BOX_THRESHOLD - toSafeNumber(quantities.trial)),
    medium: Math.max(0, FREE_SHIPPING_BOX_THRESHOLD - toSafeNumber(quantities.medium)),
    large: Math.max(0, FREE_SHIPPING_BOX_THRESHOLD - toSafeNumber(quantities.large)),
  };
}

export function calculateRetailerProfit(input: RetailerCalculatorInput): RetailerCalculatorResult {
  const normalizedQuantities = {
    trial: Math.floor(toSafeNumber(input.quantities.trial)),
    medium: Math.floor(toSafeNumber(input.quantities.medium)),
    large: Math.floor(toSafeNumber(input.quantities.large)),
  };

  const normalizedSellPrices = {
    trial: toSafeNumber(input.sellPrices.trial),
    medium: toSafeNumber(input.sellPrices.medium),
    large: toSafeNumber(input.sellPrices.large),
  };

  const qualifiesForFreeShipping = qualifiesForRetailerFreeShipping(normalizedQuantities);
  const shippingApplied = qualifiesForFreeShipping ? 0 : roundCurrency(toSafeNumber(input.shippingCost));

  const basePerSku = RETAILER_SKU_ORDER.reduce<Record<RetailerSkuId, Omit<RetailerSkuResult, 'shippingShare' | 'profit' | 'marginPercent'>>>(
    (accumulator, skuId) => {
      const config = RETAILER_SKU_CONFIG[skuId];
      const boxes = normalizedQuantities[skuId];
      const units = boxes * config.unitsPerBox;
      const revenue = roundCurrency(units * normalizedSellPrices[skuId]);
      const cost = roundCurrency(boxes * config.defaultBoxCost);

      accumulator[skuId] = {
        id: skuId,
        boxes,
        units,
        revenue,
        cost,
      };

      return accumulator;
    },
    {
      trial: { id: 'trial', boxes: 0, units: 0, revenue: 0, cost: 0 },
      medium: { id: 'medium', boxes: 0, units: 0, revenue: 0, cost: 0 },
      large: { id: 'large', boxes: 0, units: 0, revenue: 0, cost: 0 },
    }
  );

  const subtotalCost = roundCurrency(
    RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + basePerSku[skuId].cost, 0)
  );
  const totalRevenue = roundCurrency(
    RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + basePerSku[skuId].revenue, 0)
  );

  const perSku = RETAILER_SKU_ORDER.reduce<Record<RetailerSkuId, RetailerSkuResult>>(
    (accumulator, skuId) => {
      const baseRow = basePerSku[skuId];
      const shippingShare = subtotalCost > 0
        ? roundCurrency((baseRow.cost / subtotalCost) * shippingApplied)
        : 0;
      const profit = roundCurrency(baseRow.revenue - baseRow.cost - shippingShare);
      const marginPercent = baseRow.revenue > 0
        ? roundCurrency((profit / baseRow.revenue) * 100)
        : 0;

      accumulator[skuId] = {
        ...baseRow,
        shippingShare,
        profit,
        marginPercent,
      };

      return accumulator;
    },
    {
      trial: { ...basePerSku.trial, shippingShare: 0, profit: 0, marginPercent: 0 },
      medium: { ...basePerSku.medium, shippingShare: 0, profit: 0, marginPercent: 0 },
      large: { ...basePerSku.large, shippingShare: 0, profit: 0, marginPercent: 0 },
    }
  );

  // Keep shipping allocation totals aligned with the applied shipping amount.
  const allocatedShipping = roundCurrency(
    RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + perSku[skuId].shippingShare, 0)
  );
  const shippingDelta = roundCurrency(shippingApplied - allocatedShipping);
  if (shippingDelta !== 0) {
    perSku.large.shippingShare = roundCurrency(perSku.large.shippingShare + shippingDelta);
    perSku.large.profit = roundCurrency(perSku.large.revenue - perSku.large.cost - perSku.large.shippingShare);
    perSku.large.marginPercent = perSku.large.revenue > 0
      ? roundCurrency((perSku.large.profit / perSku.large.revenue) * 100)
      : 0;
  }

  const totalCost = roundCurrency(subtotalCost + shippingApplied);
  const totalProfit = roundCurrency(totalRevenue - totalCost);
  const marginPercent = totalRevenue > 0
    ? roundCurrency((totalProfit / totalRevenue) * 100)
    : 0;

  return {
    qualifiesForFreeShipping,
    shippingApplied,
    subtotalCost,
    totalRevenue,
    totalCost,
    totalProfit,
    marginPercent,
    remainingBoxesForFreeShipping: getRemainingBoxesForFreeShipping(normalizedQuantities),
    perSku,
  };
}
