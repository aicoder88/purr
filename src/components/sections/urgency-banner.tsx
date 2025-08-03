import { useState, useEffect } from 'react';
import { useTranslation } from "../../lib/translation-context";
import { Clock, Flame, Users, TrendingUp } from 'lucide-react';

export function UrgencyBanner() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [stockCount, setStockCount] = useState<number>(47);
  const [recentPurchases, setRecentPurchases] = useState<number>(23);

  useEffect(() => {
    // Initialize with random values on client-side only
    setTimeLeft({
      hours: Math.floor(Math.random() * 12) + 12, // 12-24 hours
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60)
    });
    
    setStockCount(Math.floor(Math.random() * (89 - 23 + 1)) + 23); // 23-89 units
    setRecentPurchases(Math.floor(Math.random() * (45 - 15 + 1)) + 15); // 15-45 purchases

    // Update countdown timer every second
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;
        
        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);

    // Simulate stock decreasing occasionally
    const stockTimer = setInterval(() => {
      setStockCount(prev => {
        const shouldDecrease = Math.random() < 0.3; // 30% chance
        return shouldDecrease && prev > 15 ? prev - 1 : prev;
      });
    }, 45000); // Every 45 seconds

    // Simulate recent purchases increasing
    const purchaseTimer = setInterval(() => {
      setRecentPurchases(prev => {
        const shouldIncrease = Math.random() < 0.4; // 40% chance
        return shouldIncrease ? prev + 1 : prev;
      });
    }, 30000); // Every 30 seconds

    return () => {
      clearInterval(timer);
      clearInterval(stockTimer);
      clearInterval(purchaseTimer);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/90 text-white py-3 px-4 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat animate-pulse"
             style={{ 
               backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E\")",
               backgroundSize: '40px 40px'
             }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Left side - Flash Sale */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 animate-bounce" />
              <span className="font-bold text-lg">FLASH SALE ENDS IN:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 px-2 py-1 rounded font-mono text-sm">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <span>:</span>
              <div className="bg-white/20 px-2 py-1 rounded font-mono text-sm">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span>:</span>
              <div className="bg-white/20 px-2 py-1 rounded font-mono text-sm">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Center - Stock Alert */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">
              Only <span className="font-bold text-yellow-300">{stockCount} units</span> left in stock!
            </span>
          </div>

          {/* Right side - Social Proof */}
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              <span className="font-bold text-yellow-300">{recentPurchases}</span> people bought this in the last hour
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StickyUrgencyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 800); // Show after scrolling 800px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/90 text-white py-3 px-4 shadow-2xl transform transition-transform duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Flame className="w-5 h-5 animate-pulse" />
          <span className="font-bold">Limited Time: 30% OFF All Sizes!</span>
        </div>
        <button className="bg-white text-[#FF3131] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200">
          Claim Discount
        </button>
      </div>
    </div>
  );
}
