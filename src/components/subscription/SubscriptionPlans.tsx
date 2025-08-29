import { useState, useEffect } from 'react';
import { Check, Star, Zap, Gift, Crown, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount: number;
  interval: 'monthly' | 'bimonthly' | 'quarterly';
  intervalLabel: string;
  featured?: boolean;
  savings: string;
  features: string[];
  bonus?: string[];
  stripePriceId: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    value: number;
  }>;
  totalValue: number;
  badge?: string;
  icon: React.ReactNode;
  color: string;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Refill',
    description: 'Perfect for single-cat households',
    price: 19.99,
    originalPrice: 22.99,
    discount: 10,
    interval: 'monthly',
    intervalLabel: 'Every Month',
    savings: 'Save $36/year',
    features: [
      '1x Purrify 60g delivered monthly',
      'Free shipping on all orders',
      'Skip or cancel anytime',
      'Member-only discounts',
      'Priority customer support'
    ],
    stripePriceId: 'price_monthly_subscription',
    products: [
      { id: '60g', name: 'Purrify 60g', quantity: 1, value: 24.99 }
    ],
    totalValue: 24.99,
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'bimonthly',
    name: 'Bi-Monthly Bundle',
    description: 'Most popular for multi-cat homes',
    price: 37.99,
    originalPrice: 44.99,
    discount: 15,
    interval: 'bimonthly',
    intervalLabel: 'Every 2 Months',
    featured: true,
    savings: 'Save $84/year',
    features: [
      '2x Purrify 60g delivered bi-monthly',
      'Free premium scoop included',
      'Free shipping + tracking',
      'Exclusive member pricing',
      'Priority customer support',
      'Flexible delivery schedule'
    ],
    bonus: [
      'Premium metal scoop ($12.99 value)',
      'Exclusive care guide'
    ],
    stripePriceId: 'price_bimonthly_subscription',
    products: [
      { id: '60g', name: 'Purrify 60g', quantity: 2, value: 49.98 },
      { id: 'scoop', name: 'Premium Scoop', quantity: 1, value: 12.99 }
    ],
    totalValue: 62.97,
    badge: 'Most Popular',
    icon: <Star className="w-6 h-6" />,
    color: 'from-orange-500 to-pink-500'
  },
  {
    id: 'quarterly',
    name: 'Quarterly Premium',
    description: 'Maximum savings for cat families',
    price: 54.99,
    originalPrice: 69.99,
    discount: 20,
    interval: 'quarterly',
    intervalLabel: 'Every 3 Months',
    savings: 'Save $180/year',
    features: [
      '3x Purrify 140g family size',
      'FREE odor-eliminating spray',
      'FREE premium litter mat',
      'VIP customer support',
      'Exclusive product previews',
      'Member rewards program'
    ],
    bonus: [
      'Odor-eliminating spray ($19.99 value)',
      'Premium litter mat ($24.99 value)',
      'VIP phone support line'
    ],
    stripePriceId: 'price_quarterly_subscription',
    products: [
      { id: '140g', name: 'Purrify 140g', quantity: 3, value: 119.97 },
      { id: 'spray', name: 'Odor Spray', quantity: 1, value: 19.99 },
      { id: 'mat', name: 'Litter Mat', quantity: 1, value: 24.99 }
    ],
    totalValue: 164.95,
    badge: 'Best Value',
    icon: <Crown className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-500'
  }
];

interface SubscriptionPlansProps {
  onPlanSelect: (plan: SubscriptionPlan) => void;
  selectedPlan?: string;
  showAnnualSavings?: boolean;
}

export function SubscriptionPlans({ 
  onPlanSelect, 
  selectedPlan,
  showAnnualSavings = true 
}: SubscriptionPlansProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [animationDelay, setAnimationDelay] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    // Stagger animations for visual appeal
    const delays: Record<string, number> = {};
    SUBSCRIPTION_PLANS.forEach((plan, index) => {
      delays[plan.id] = index * 100;
    });
    setAnimationDelay(delays);
  }, []);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    // Track subscription selection
    if (window.gtag) {
      window.gtag('event', 'subscription_plan_selected', {
        event_category: 'subscription',
        event_label: plan.name,
        value: plan.price
      });
    }

    onPlanSelect(plan);
  };

  const calculateAnnualSavings = (plan: SubscriptionPlan) => {
    const monthsPerYear = 12;
    const deliveriesPerYear = plan.interval === 'monthly' ? 12 : 
                            plan.interval === 'bimonthly' ? 6 : 4;
    
    const annualSubscriptionCost = plan.price * deliveriesPerYear;
    const annualRetailCost = plan.totalValue * deliveriesPerYear;
    
    return Math.round(annualRetailCost - annualSubscriptionCost);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Never Run Out of Odor Control
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Save money and ensure fresh litter 24/7 with automatic deliveries
          </p>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-2" />
              Free shipping
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Skip anytime
            </div>
            <div className="flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Member bonuses
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {SUBSCRIPTION_PLANS.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                plan.featured 
                  ? 'ring-2 ring-orange-500 shadow-2xl' 
                  : 'hover:shadow-xl'
              } ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-purple-500 shadow-2xl' 
                  : ''
              }`}
              style={{
                animationDelay: `${animationDelay[plan.id] || 0}ms`
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              onClick={() => handleSelectPlan(plan)}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`bg-gradient-to-r ${plan.color} text-white px-4 py-1 text-sm font-bold shadow-lg`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                {/* Icon */}
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">CAD</span>
                  </div>
                  
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                        ${plan.originalPrice}
                      </span>
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200">
                        Save {plan.discount}%
                      </Badge>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{plan.intervalLabel}</p>
                  
                  {showAnnualSavings && (
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">
                      {plan.savings}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Bonus Items */}
                {plan.bonus && (
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2 flex items-center">
                      <Gift className="w-4 h-4 mr-2" />
                      Bonus Items
                    </h4>
                    <ul className="space-y-1">
                      {plan.bonus.map((bonus, bonusIndex) => (
                        <li key={bonusIndex} className="text-sm text-orange-600 dark:text-orange-400">
                          • {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Value Breakdown */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">What You Get:</h4>
                  <div className="space-y-1">
                    {plan.products.map((product, productIndex) => (
                      <div key={productIndex} className="flex justify-between text-sm">
                        <span>{product.quantity}x {product.name}</span>
                        <span>${product.value.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                    <span>Total Value:</span>
                    <span className="text-green-600 dark:text-green-400">${plan.totalValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-purple-600 dark:text-purple-400">
                    <span>You Pay:</span>
                    <span>${plan.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white dark:text-gray-100 font-bold py-3 transition-all transform ${
                    hoveredPlan === plan.id ? 'scale-105' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                >
                  {selectedPlan === plan.id ? 'Selected' : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscription Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-6">
            Why 3,000+ Cat Owners Love Purrify Subscriptions
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h4 className="font-semibold mb-2">Never Run Out</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic deliveries ensure your cats never suffer from odors
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">Member Perks</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Exclusive bonuses, early access, and special member pricing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">Total Flexibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Skip, pause, or cancel anytime. No commitments or fees
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold mb-2">Premium Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Priority customer service and dedicated account management
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 dark:text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="italic mb-4">
              "The bi-monthly subscription is perfect! I never run out and the premium scoop 
              they included is amazing. My 3 cats produce zero odor now."
            </p>
            <p className="font-semibold">- Sarah M., Bi-Monthly Subscriber</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 dark:text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="italic mb-4">
              "I switched to quarterly and love the bonuses! The litter mat and spray 
              are premium quality. Plus I'm saving over $150/year."
            </p>
            <p className="font-semibold">- Mike R., Quarterly Subscriber</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SUBSCRIPTION_PLANS };
export type { SubscriptionPlan };