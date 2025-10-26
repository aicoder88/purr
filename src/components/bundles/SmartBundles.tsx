import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Star, Gift, Zap, Users, Home, Crown, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { formatCurrencyValue } from '@/lib/pricing';

interface BundleProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  regularPrice: number;
  bundlePrice?: number;
  quantity: number;
  badges?: string[];
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  targetAudience: string;
  regularPrice: number;
  bundlePrice: number;
  discount: number;
  savings: number;
  featured?: boolean;
  badge?: string;
  products: BundleProduct[];
  bonusItems?: string[];
  testimonial?: {
    text: string;
    author: string;
    rating: number;
  };
  icon: React.ReactNode;
  color: string;
  urgency?: string;
  popularity?: number;
}

const INTELLIGENT_BUNDLES: Bundle[] = [
  {
    id: 'first-time-buyer',
    name: 'First-Time Cat Parent',
    description: 'Perfect starter kit for new cat owners',
    targetAudience: 'New cat owners, first-time Purrify users',
    regularPrice: 59.97,
    bundlePrice: 44.99,
    discount: 25,
    savings: 14.98,
    badge: 'Perfect Start',
    products: [
      {
        id: '12g',
        name: 'Purrify 12g Trial',
        description: 'Try risk-free for 2 weeks',
        image: '/optimized/20g.webp',
        regularPrice: 14.99,
        quantity: 1,
        badges: ['Trial Size', 'Risk-Free']
      },
      {
        id: 'scoop',
        name: 'Premium Litter Scoop',
        description: 'Ergonomic design with fine mesh',
        image: '/optimized/premium-scoop.webp',
        regularPrice: 19.99,
        quantity: 1,
        badges: ['Premium Quality']
      },
      {
        id: 'guide',
        name: 'Ultimate Cat Care Guide',
        description: 'Digital guide with expert tips',
        image: '/optimized/care-guide.webp',
        regularPrice: 24.99,
        bundlePrice: 0,
        quantity: 1,
        badges: ['FREE Bonus', 'Digital']
      }
    ],
    bonusItems: [
      '30-day money-back guarantee',
      'Fast shipping',
      'Email support'
    ],
    testimonial: {
      text: "Perfect for my first cat! The guide taught me everything I needed to know.",
      author: "Jennifer K., New Cat Mom",
      rating: 5
    },
    icon: <Home className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    urgency: '500+ sold this month',
    popularity: 87
  },
  {
    id: 'multi-cat-household',
    name: 'Multi-Cat Powerhouse',
    description: 'Heavy-duty odor control for multiple cats',
    targetAudience: 'Households with 2+ cats',
    regularPrice: 159.94,
    bundlePrice: 109.99,
    discount: 31,
    savings: 49.95,
    featured: true,
    badge: 'Most Popular',
    products: [
      {
        id: '120g-triple',
        name: '3x Purrify 120g Family Size',
        description: '6-month supply for multi-cat homes',
        image: '/optimized/140g.webp',
        regularPrice: 119.97,
        quantity: 3,
        badges: ['Family Size', 'Best Value']
      },
      {
        id: 'odor-spray',
        name: 'Enzyme Odor Eliminator Spray',
        description: 'For accidents and deep cleaning',
        image: '/optimized/odor-spray.webp',
        regularPrice: 19.99,
        quantity: 1,
        badges: ['Professional Grade']
      },
      {
        id: 'litter-mat',
        name: 'Premium Litter Mat',
        description: 'Traps litter and easy to clean',
        image: '/optimized/litter-mat.webp',
        regularPrice: 19.98,
        quantity: 1,
        badges: ['Easy Clean']
      }
    ],
    bonusItems: [
      'Free monthly refill reminder',
      'VIP customer support',
      'Exclusive multi-cat tips'
    ],
    testimonial: {
      text: "5 cats, zero smell! This bundle handles everything perfectly.",
      author: "Mike R., Multi-Cat Dad",
      rating: 5
    },
    icon: <Users className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    urgency: 'Only 23 left at this price!',
    popularity: 95
  },
  {
    id: 'premium-experience',
    name: 'Ultimate Premium Bundle',
    description: 'The complete luxury cat care system',
    targetAudience: 'Cat parents who want the best',
    regularPrice: 249.93,
    bundlePrice: 159.99,
    discount: 36,
    savings: 89.94,
    badge: 'Luxury',
    products: [
      {
        id: '120g-premium',
        name: '2x Purrify 120g Premium',
        description: 'Premium grade activated carbon',
        image: '/optimized/140g-premium.webp',
        regularPrice: 89.98,
        quantity: 2,
        badges: ['Premium Grade', 'Limited Edition']
      },
      {
        id: 'air-purifier',
        name: 'HEPA Air Purifier',
        description: 'Removes airborne particles and odors',
        image: '/optimized/air-purifier.webp',
        regularPrice: 79.99,
        quantity: 1,
        badges: ['HEPA Filter', 'Quiet Operation']
      },
      {
        id: 'enzyme-cleaner',
        name: 'Professional Enzyme Cleaner',
        description: 'Veterinarian recommended',
        image: '/optimized/enzyme-cleaner.webp',
        regularPrice: 29.99,
        quantity: 1,
        badges: ['Vet Recommended']
      },
      {
        id: 'premium-scoop-set',
        name: 'Luxury Scoop & Storage Set',
        description: 'Stainless steel with storage',
        image: '/optimized/luxury-scoop.webp',
        regularPrice: 49.97,
        quantity: 1,
        badges: ['Stainless Steel', 'Premium']
      }
    ],
    bonusItems: [
      'Personal account manager',
      'Priority shipping (next day)',
      'Exclusive product previews',
      '1-year warranty on all items'
    ],
    testimonial: {
      text: "Worth every penny! My cats live like royalty and my home is spotless.",
      author: "Sarah M., Premium Customer",
      rating: 5
    },
    icon: <Crown className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    urgency: 'Limited time - Premium grade selling fast',
    popularity: 78
  },
  {
    id: 'apartment-living',
    name: 'Small Space Solution',
    description: 'Maximum odor control for apartments',
    targetAudience: 'Apartment dwellers, small spaces',
    regularPrice: 84.96,
    bundlePrice: 59.99,
    discount: 29,
    savings: 24.97,
    products: [
      {
        id: '50g-double',
        name: '2x Purrify 50g Standard',
        description: 'Perfect portion for small spaces',
        image: '/optimized/60g.webp',
        regularPrice: 49.98,
        quantity: 2,
        badges: ['Space Saving']
      },
      {
        id: 'compact-scoop',
        name: 'Compact Litter Scoop',
        description: 'Space-saving design',
        image: '/optimized/compact-scoop.webp',
        regularPrice: 14.99,
        quantity: 1,
        badges: ['Compact Design']
      },
      {
        id: 'odor-absorber',
        name: 'Continuous Odor Absorber',
        description: 'Activated carbon air freshener',
        image: '/optimized/odor-absorber.webp',
        regularPrice: 19.99,
        quantity: 1,
        badges: ['24/7 Protection']
      }
    ],
    bonusItems: [
      'Apartment-specific usage guide',
      'Neighbor-friendly guarantee',
      'Discreet packaging'
    ],
    testimonial: {
      text: "My studio apartment stays fresh even with my cat. Neighbors have no idea!",
      author: "Lisa K., Apartment Dweller",
      rating: 5
    },
    icon: <Home className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    urgency: '200+ apartment dwellers ordered this week',
    popularity: 82
  }
];

interface SmartBundlesProps {
  userProfile?: {
    hasPurchased: boolean;
    catCount: number;
    livingSpace: 'apartment' | 'house' | 'unknown';
    previousProducts: string[];
  };
  onBundleSelect: (bundle: Bundle) => void;
}

export function SmartBundles({ userProfile, onBundleSelect }: SmartBundlesProps) {
  const [recommendedBundles, setRecommendedBundles] = useState<Bundle[]>(INTELLIGENT_BUNDLES);
  const [hoveredBundle, setHoveredBundle] = useState<string | null>(null);
  const { addToCart } = useCart();

  const smartSortBundles = useCallback((bundles: Bundle[], profile: typeof userProfile): Bundle[] => {
    return bundles.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // First-time buyer preference
      if (!profile?.hasPurchased) {
        if (a.id === 'first-time-buyer') scoreA += 100;
        if (b.id === 'first-time-buyer') scoreB += 100;
      }

      // Multi-cat household preference
      if (profile?.catCount && profile.catCount > 1) {
        if (a.id === 'multi-cat-household') scoreA += 90;
        if (b.id === 'multi-cat-household') scoreB += 90;
      }

      // Apartment living preference
      if (profile?.livingSpace === 'apartment') {
        if (a.id === 'apartment-living') scoreA += 80;
        if (b.id === 'apartment-living') scoreB += 80;
      }

      // Premium preference for returning customers
      if (profile?.hasPurchased && profile.previousProducts.length > 2) {
        if (a.id === 'premium-experience') scoreA += 70;
        if (b.id === 'premium-experience') scoreB += 70;
      }

      // Popularity score
      scoreA += a.popularity || 0;
      scoreB += b.popularity || 0;

      return scoreB - scoreA;
    });
  }, []);

  useEffect(() => {
    // Smart bundle recommendation based on user profile
    if (userProfile) {
      const smartSorted = smartSortBundles(INTELLIGENT_BUNDLES, userProfile);
      setRecommendedBundles(smartSorted);
    }
  }, [userProfile, smartSortBundles]);

  const handleBundleSelect = (bundle: Bundle) => {
    // Track bundle selection
    if (window.gtag) {
      window.gtag('event', 'bundle_selected', {
        event_category: 'ecommerce',
        event_label: bundle.name,
        value: bundle.bundlePrice
      });
    }

    onBundleSelect(bundle);
  };

  const addBundleToCart = (bundle: Bundle) => {
    // Add all bundle products to cart
    bundle.products.forEach(product => {
      for (let i = 0; i < product.quantity; i++) {
        addToCart(product.id);
      }
    });

    // Track bundle add to cart
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        event_category: 'ecommerce',
        event_label: bundle.name,
        value: bundle.bundlePrice,
        items: bundle.products.map(product => ({
          item_id: product.id,
          item_name: product.name,
          quantity: product.quantity,
          price: product.bundlePrice || product.regularPrice
        }))
      });
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Smart Bundles Curated For You
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-6">
            Save money with intelligently designed product combinations
          </p>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
            <div className="flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Free bonus items
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-2" />
              Fast shipping
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Satisfaction guaranteed
            </div>
          </div>
        </div>

        {/* Smart recommendation notice */}
        {userProfile && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-8 text-center">
            <Zap className="w-5 h-5 inline mr-2 text-blue-600 dark:text-blue-400 dark:text-blue-400 dark:text-blue-300" />
            <span className="text-blue-800 dark:text-blue-200 dark:text-blue-300 font-medium">
              Smart recommendations based on your profile: 
              {!userProfile.hasPurchased && ' First-time buyer'}
              {userProfile.catCount > 1 && ` ${userProfile.catCount} cats`}
              {userProfile.livingSpace === 'apartment' && ' Apartment living'}
            </span>
          </div>
        )}

        {/* Bundles Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
          {recommendedBundles.map((bundle) => (
            <Card
              key={bundle.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                bundle.featured ? 'ring-2 ring-orange-500 shadow-xl' : ''
              } ${hoveredBundle === bundle.id ? 'transform scale-102' : ''}`}
              onMouseEnter={() => setHoveredBundle(bundle.id)}
              onMouseLeave={() => setHoveredBundle(null)}
            >
              {/* Badge */}
              {bundle.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`bg-gradient-to-r ${bundle.color} text-white dark:text-gray-100 px-3 py-1 font-bold`}>
                    {bundle.badge}
                  </Badge>
                </div>
              )}

              {/* Urgency indicator */}
              {bundle.urgency && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="destructive" className="animate-pulse">
                    🔥 {bundle.urgency}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${bundle.color} flex items-center justify-center text-white dark:text-gray-100 mr-4`}>
                    {bundle.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{bundle.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{bundle.description}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-3xl font-bold">{formatCurrencyValue(bundle.bundlePrice)}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-gray-400 dark:text-gray-500 line-through">{formatCurrencyValue(bundle.regularPrice)}</p>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 dark:bg-green-800 dark:text-green-200">
                        Save {formatCurrencyValue(bundle.savings)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 dark:text-green-400 font-semibold">
                      {bundle.discount}% OFF Bundle Price
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300 mr-1" />
                      <span>Popularity: {bundle.popularity}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Products */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <div className="space-y-3">
                    {bundle.products.map((product, productIndex) => (
                      <div key={productIndex} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center flex-1">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3 flex items-center justify-center">
                            <span className="text-xs font-bold">{product.quantity}x</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{product.description}</p>
                            {product.badges && (
                              <div className="flex gap-1 mt-1">
                                {product.badges.map((badge, badgeIndex) => (
                                  <Badge key={badgeIndex} variant="outline" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {product.bundlePrice === 0 ? (
                            <span className="text-green-600 dark:text-green-400 font-bold text-sm">FREE</span>
                          ) : product.bundlePrice ? (
                            <p className="font-semibold text-sm">{formatCurrencyValue(product.bundlePrice)}</p>
                          ) : (
                            <p className="text-gray-400 dark:text-gray-500 line-through text-sm">{formatCurrencyValue(product.regularPrice)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bonus Items */}
                {bundle.bonusItems && (
                  <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <Gift className="w-4 h-4 mr-2" />
                      Bonus Perks (FREE)
                    </h4>
                    <ul className="space-y-1">
                      {bundle.bonusItems.map((bonus, bonusIndex) => (
                        <li key={bonusIndex} className="text-sm text-green-600 dark:text-green-400">
                          ✓ {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Testimonial */}
                {bundle.testimonial && (
                  <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      {[...Array(bundle.testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 dark:text-yellow-300 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm italic mb-2">"{bundle.testimonial.text}"</p>
                    <p className="text-xs font-semibold">- {bundle.testimonial.author}</p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleBundleSelect(bundle)}
                    className={`flex-1 bg-gradient-to-r ${bundle.color} hover:opacity-90 text-white dark:text-gray-100 font-bold py-3 transition-all`}
                  >
                    Choose This Bundle
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addBundleToCart(bundle)}
                    className="px-4"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Target audience */}
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  Perfect for: {bundle.targetAudience}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bundle Guarantee */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Bundle Satisfaction Guarantee</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">30-Day Money Back</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Not happy? Return everything for a full refund</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400 dark:text-blue-300" />
              </div>
              <h4 className="font-semibold mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">All bundles ship free across Canada</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">Quality Guarantee</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Premium products, carefully selected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { INTELLIGENT_BUNDLES };
export type { Bundle, BundleProduct };
