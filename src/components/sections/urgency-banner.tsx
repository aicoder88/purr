import { useState, useEffect } from 'react';
import { Users, TrendingUp, Leaf } from 'lucide-react';

export function UrgencyBanner() {
  const [recentPurchases, setRecentPurchases] = useState<number>(23);

  useEffect(() => {
    // Initialize with random values on client-side only
    setRecentPurchases(Math.floor(Math.random() * (45 - 15 + 1)) + 15); // 15-45 purchases

    // Simulate recent purchases increasing occasionally
    const purchaseTimer = setInterval(() => {
      setRecentPurchases(prev => {
        const shouldIncrease = Math.random() < 0.2; // 20% chance
        return shouldIncrease ? prev + 1 : prev;
      });
    }, 120000); // Every 2 minutes

    return () => {
      clearInterval(purchaseTimer);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white dark:text-gray-100 dark:text-gray-100 py-3 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 text-center md:text-left">
          {/* Left side - Natural Message */}
          <div className="flex items-center space-x-3">
            <Leaf className="w-5 h-5" />
            <span className="font-bold text-lg">100% Natural • Made in Canada</span>
          </div>

          {/* Center - Free Shipping */}
          {/* <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">
              Free shipping on orders over <span className="font-bold text-yellow-300 dark:text-yellow-400">$50</span>
            </span>
          </div> */} {/* TODO: Restore when free shipping is available */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">
              Fast delivery Canada-wide
            </span>
          </div>

          {/* Right side - Social Proof */}
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              <span className="font-bold text-yellow-300 dark:text-yellow-200">{recentPurchases}</span> orders this week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StickyUrgencyBar() {
  return null; // Removed flash sale banner
}
