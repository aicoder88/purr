import {
  DEFAULT_RETAILER_SHIPPING_COST,
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
  });

  it('removes shipping once 5 boxes of each size are purchased', () => {
    expect(qualifiesForRetailerFreeShipping({
      trial: 5,
      medium: 5,
      large: 5,
    })).toBe(true);

    const result = calculateRetailerProfit({
      quantities: {
        trial: 5,
        medium: 5,
        large: 5,
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
    expect(result.totalRevenue).toBe(1072.5);
    expect(result.totalCost).toBe(530);
    expect(result.totalProfit).toBe(542.5);
    expect(result.remainingBoxesForFreeShipping).toEqual({
      trial: 0,
      medium: 0,
      large: 0,
    });
  });
});
