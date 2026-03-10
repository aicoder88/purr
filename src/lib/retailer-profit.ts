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
  allInCost: number;
  costPerBox: number;
  costPerBag: number;
  allInCostPerBox: number;
  allInCostPerBag: number;
  profit: number;
  profitPerBox: number;
  profitPerBag: number;
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
  totalBoxes: number;
  totalBags: number;
  productCostPerBox: number;
  productCostPerBag: number;
  allInCostPerBox: number;
  allInCostPerBag: number;
  profitPerBox: number;
  profitPerBag: number;
  remainingSpendForFreeShipping: number;
  perSku: Record<RetailerSkuId, RetailerSkuResult>;
}

type BaseRetailerSkuResult = Pick<RetailerSkuResult, 'id' | 'boxes' | 'units' | 'revenue' | 'cost'>;

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

export const FREE_SHIPPING_SUBTOTAL_THRESHOLD = 600;
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
  const subtotalCost = RETAILER_SKU_ORDER.reduce((sum, skuId) => {
    const normalizedBoxes = Math.floor(toSafeNumber(quantities[skuId]));
    return sum + (normalizedBoxes * RETAILER_SKU_CONFIG[skuId].defaultBoxCost);
  }, 0);

  return roundCurrency(subtotalCost) >= FREE_SHIPPING_SUBTOTAL_THRESHOLD;
}

export function getRemainingSpendForFreeShipping(subtotalCost: number): number {
  return roundCurrency(Math.max(0, FREE_SHIPPING_SUBTOTAL_THRESHOLD - roundCurrency(subtotalCost)));
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

  const basePerSku = RETAILER_SKU_ORDER.reduce<Record<RetailerSkuId, BaseRetailerSkuResult>>(
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
  const qualifiesForFreeShipping = subtotalCost >= FREE_SHIPPING_SUBTOTAL_THRESHOLD;
  const shippingApplied = qualifiesForFreeShipping ? 0 : roundCurrency(toSafeNumber(input.shippingCost));
  const totalRevenue = roundCurrency(
    RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + basePerSku[skuId].revenue, 0)
  );

  const createInitialSkuResult = (baseRow: BaseRetailerSkuResult): RetailerSkuResult => ({
    ...baseRow,
    shippingShare: 0,
    allInCost: 0,
    costPerBox: 0,
    costPerBag: 0,
    allInCostPerBox: 0,
    allInCostPerBag: 0,
    profit: 0,
    profitPerBox: 0,
    profitPerBag: 0,
    marginPercent: 0,
  });

  const perSku = RETAILER_SKU_ORDER.reduce<Record<RetailerSkuId, RetailerSkuResult>>(
    (accumulator, skuId) => {
      const baseRow = basePerSku[skuId];
      const shippingShare = subtotalCost > 0
        ? roundCurrency((baseRow.cost / subtotalCost) * shippingApplied)
        : 0;
      const allInCost = roundCurrency(baseRow.cost + shippingShare);
      const costPerBox = baseRow.boxes > 0 ? roundCurrency(baseRow.cost / baseRow.boxes) : 0;
      const costPerBag = baseRow.units > 0 ? roundCurrency(baseRow.cost / baseRow.units) : 0;
      const allInCostPerBox = baseRow.boxes > 0 ? roundCurrency(allInCost / baseRow.boxes) : 0;
      const allInCostPerBag = baseRow.units > 0 ? roundCurrency(allInCost / baseRow.units) : 0;
      const profit = roundCurrency(baseRow.revenue - allInCost);
      const profitPerBox = baseRow.boxes > 0 ? roundCurrency(profit / baseRow.boxes) : 0;
      const profitPerBag = baseRow.units > 0 ? roundCurrency(profit / baseRow.units) : 0;
      const marginPercent = baseRow.revenue > 0
        ? roundCurrency((profit / baseRow.revenue) * 100)
        : 0;

      accumulator[skuId] = {
        ...baseRow,
        shippingShare,
        allInCost,
        costPerBox,
        costPerBag,
        allInCostPerBox,
        allInCostPerBag,
        profit,
        profitPerBox,
        profitPerBag,
        marginPercent,
      };

      return accumulator;
    },
    {
      trial: createInitialSkuResult(basePerSku.trial),
      medium: createInitialSkuResult(basePerSku.medium),
      large: createInitialSkuResult(basePerSku.large),
    }
  );

  // Keep shipping allocation totals aligned with the applied shipping amount.
  const allocatedShipping = roundCurrency(
    RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + perSku[skuId].shippingShare, 0)
  );
  const shippingDelta = roundCurrency(shippingApplied - allocatedShipping);
  if (shippingDelta !== 0) {
    perSku.large.shippingShare = roundCurrency(perSku.large.shippingShare + shippingDelta);
    perSku.large.allInCost = roundCurrency(perSku.large.cost + perSku.large.shippingShare);
    perSku.large.allInCostPerBox = perSku.large.boxes > 0 ? roundCurrency(perSku.large.allInCost / perSku.large.boxes) : 0;
    perSku.large.allInCostPerBag = perSku.large.units > 0 ? roundCurrency(perSku.large.allInCost / perSku.large.units) : 0;
    perSku.large.profit = roundCurrency(perSku.large.revenue - perSku.large.allInCost);
    perSku.large.profitPerBox = perSku.large.boxes > 0 ? roundCurrency(perSku.large.profit / perSku.large.boxes) : 0;
    perSku.large.profitPerBag = perSku.large.units > 0 ? roundCurrency(perSku.large.profit / perSku.large.units) : 0;
    perSku.large.marginPercent = perSku.large.revenue > 0
      ? roundCurrency((perSku.large.profit / perSku.large.revenue) * 100)
      : 0;
  }

  const totalBoxes = RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + perSku[skuId].boxes, 0);
  const totalBags = RETAILER_SKU_ORDER.reduce((sum, skuId) => sum + perSku[skuId].units, 0);
  const totalCost = roundCurrency(subtotalCost + shippingApplied);
  const totalProfit = roundCurrency(totalRevenue - totalCost);
  const marginPercent = totalRevenue > 0
    ? roundCurrency((totalProfit / totalRevenue) * 100)
    : 0;
  const productCostPerBox = totalBoxes > 0 ? roundCurrency(subtotalCost / totalBoxes) : 0;
  const productCostPerBag = totalBags > 0 ? roundCurrency(subtotalCost / totalBags) : 0;
  const allInCostPerBox = totalBoxes > 0 ? roundCurrency(totalCost / totalBoxes) : 0;
  const allInCostPerBag = totalBags > 0 ? roundCurrency(totalCost / totalBags) : 0;
  const profitPerBox = totalBoxes > 0 ? roundCurrency(totalProfit / totalBoxes) : 0;
  const profitPerBag = totalBags > 0 ? roundCurrency(totalProfit / totalBags) : 0;

  return {
    qualifiesForFreeShipping,
    shippingApplied,
    subtotalCost,
    totalRevenue,
    totalCost,
    totalProfit,
    marginPercent,
    totalBoxes,
    totalBags,
    productCostPerBox,
    productCostPerBag,
    allInCostPerBox,
    allInCostPerBag,
    profitPerBox,
    profitPerBag,
    remainingSpendForFreeShipping: getRemainingSpendForFreeShipping(subtotalCost),
    perSku,
  };
}
