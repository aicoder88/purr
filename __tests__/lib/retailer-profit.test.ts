import {
  DEFAULT_RETAILER_SHIPPING_COST,
  FREE_SHIPPING_SUBTOTAL_THRESHOLD,
  calculateRetailerProfit,
  qualifiesForRetailerFreeShipping,
} from '@/lib/retailer-profit';

describe('retailer profit calculator', () => {
  it('applies default shipping when the free-shipping threshold is not met', () => {
    const result = calculateRetailerProfit({
      quantities: {
        trial: 1,
        medium: 1,
        large: 1,
      },
      sellPrices: {
        trial: 1.99,
        medium: 4.99,
        large: 8.99,
      },
      shippingCost: DEFAULT_RETAILER_SHIPPING_COST,
    });

    expect(result.qualifiesForFreeShipping).toBe(false);
    expect(result.shippingApplied).toBe(20);
    expect(result.totalRevenue).toBe(214.5);
    expect(result.totalCost).toBe(126);
    expect(result.totalProfit).toBe(88.5);
    expect(result.marginPercent).toBe(41.26);
    expect(result.totalBoxes).toBe(3);
    expect(result.totalBags).toBe(50);
    expect(result.productCostPerBox).toBe(35.33);
    expect(result.productCostPerBag).toBe(2.12);
    expect(result.allInCostPerBox).toBe(42);
    expect(result.allInCostPerBag).toBe(2.52);
    expect(result.profitPerBox).toBe(29.5);
    expect(result.profitPerBag).toBe(1.77);
    expect(result.perSku.trial.costPerBox).toBe(25);
    expect(result.perSku.trial.costPerBag).toBe(1);
    expect(result.perSku.trial.allInCost).toBe(29.72);
    expect(result.perSku.trial.profitPerBag).toBe(0.8);
    expect(result.perSku.trial.marginPercent).toBe(40.26);
  });

  it('removes shipping once the wholesale subtotal reaches the free-shipping threshold', () => {
    expect(qualifiesForRetailerFreeShipping({
      trial: 6,
      medium: 6,
      large: 6,
    })).toBe(true);

    const result = calculateRetailerProfit({
      quantities: {
        trial: 6,
        medium: 6,
        large: 6,
      },
      sellPrices: {
        trial: 1.99,
        medium: 4.99,
        large: 8.99,
      },
      shippingCost: DEFAULT_RETAILER_SHIPPING_COST,
    });

    expect(result.qualifiesForFreeShipping).toBe(true);
    expect(result.shippingApplied).toBe(0);
    expect(result.subtotalCost).toBe(636);
    expect(result.totalRevenue).toBe(1287);
    expect(result.totalCost).toBe(636);
    expect(result.totalProfit).toBe(651);
    expect(result.allInCostPerBox).toBe(35.33);
    expect(result.allInCostPerBag).toBe(2.12);
    expect(result.profitPerBox).toBe(36.17);
    expect(result.profitPerBag).toBe(2.17);
    expect(result.remainingSpendForFreeShipping).toBe(0);
  });

  it('tracks the remaining wholesale subtotal needed for free shipping', () => {
    const result = calculateRetailerProfit({
      quantities: {
        trial: 1,
        medium: 1,
        large: 1,
      },
      sellPrices: {
        trial: 1.99,
        medium: 4.99,
        large: 8.99,
      },
      shippingCost: DEFAULT_RETAILER_SHIPPING_COST,
    });

    expect(result.qualifiesForFreeShipping).toBe(false);
    expect(result.subtotalCost).toBe(106);
    expect(result.remainingSpendForFreeShipping).toBe(FREE_SHIPPING_SUBTOTAL_THRESHOLD - 106);
  });
});
