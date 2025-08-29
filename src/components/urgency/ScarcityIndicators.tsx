import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, TrendingUp, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryData {
  [productId: string]: {
    stock: number;
    lowStockThreshold: number;
    reserved: number;
    lastUpdated: string;
  };
}

interface ScarcityIndicatorProps {
  productId: string;
  className?: string;
  variant?: 'banner' | 'badge' | 'inline';
  showRecentSales?: boolean;
}

// Simulated inventory data - moved outside component to prevent recreation on every render
const INVENTORY_DATA: InventoryData = {
  '20g': {
    stock: 23,
    lowStockThreshold: 30,
    reserved: 7,
    lastUpdated: new Date().toISOString()
  },
  '60g': {
    stock: 12,
    lowStockThreshold: 20,
    reserved: 3,
    lastUpdated: new Date().toISOString()
  },
  '140g': {
    stock: 8,
    lowStockThreshold: 15,
    reserved: 2,
    lastUpdated: new Date().toISOString()
  },
  'bundle-starter': {
    stock: 31,
    lowStockThreshold: 40,
    reserved: 5,
    lastUpdated: new Date().toISOString()
  },
  'bundle-premium': {
    stock: 6,
    lowStockThreshold: 10,
    reserved: 1,
    lastUpdated: new Date().toISOString()
  }
};

export function ScarcityIndicator({ 
  productId, 
  className,
  variant = 'badge',
  showRecentSales = true 
}: ScarcityIndicatorProps) {
  const [inventory, setInventory] = useState<InventoryData>({});
  const [recentSales, setRecentSales] = useState(0);

  useEffect(() => {
    setInventory(INVENTORY_DATA);
    
    // Simulate recent sales activity
    const salesCount = 12 + Math.floor(Math.random() * 8);
    setRecentSales(salesCount);

    // Update recent sales every 30 seconds
    const salesInterval = setInterval(() => {
      setRecentSales(prev => Math.max(5, prev + (Math.random() < 0.6 ? 1 : -1)));
    }, 30000);

    return () => clearInterval(salesInterval);
  }, [productId]);

  const product = inventory[productId];
  if (!product) return null;

  const availableStock = product.stock - product.reserved;
  const isLowStock = availableStock <= product.lowStockThreshold;
  const isCriticalStock = availableStock <= Math.floor(product.lowStockThreshold / 2);

  const getUrgencyLevel = () => {
    if (isCriticalStock) return 'critical';
    if (isLowStock) return 'low';
    return 'normal';
  };

  const getUrgencyMessage = () => {
    const urgency = getUrgencyLevel();
    
    switch (urgency) {
      case 'critical':
        return `Only ${availableStock} left! Order now before it's gone.`;
      case 'low':
        return `${availableStock} left in stock - Limited quantity available`;
      default:
        return null;
    }
  };

  const getUrgencyColor = () => {
    const urgency = getUrgencyLevel();
    
    switch (urgency) {
      case 'critical':
        return 'bg-red-500 text-white dark:text-white dark:text-gray-100 border-red-600';
      case 'low':
        return 'bg-orange-500 text-white dark:text-white dark:text-gray-100 border-orange-600';
      default:
        return 'bg-green-500 text-white dark:text-white dark:text-gray-100 border-green-600';
    }
  };

  const urgencyMessage = getUrgencyMessage();
  if (!urgencyMessage) return null;

  const handleClick = () => {
    // Track scarcity indicator interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'scarcity_indicator_clicked', {
        event_category: 'conversion',
        event_label: productId,
        value: 1
      });
    }
  };

  if (variant === 'banner') {
    return (
      <div 
        className={cn(
          'w-full p-4 rounded-lg border-2 shadow-lg animate-pulse-subtle',
          getUrgencyColor(),
          className
        )}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
            <div>
              <h3 className="font-bold text-lg">⚠️ Stock Alert</h3>
              <p className="text-sm opacity-90">{urgencyMessage}</p>
            </div>
          </div>
          
          {showRecentSales && (
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm opacity-90">
                <TrendingUp className="w-4 h-4" />
                <span>{recentSales} sold today</span>
              </div>
              <div className="text-xs opacity-75 mt-1">
                High demand product 🔥
              </div>
            </div>
          )}
        </div>
        
        {/* Progress bar showing stock level */}
        <div className="mt-3 bg-white dark:bg-gray-800/20 rounded-full h-2">
          <div 
            className="bg-white dark:bg-gray-800 rounded-full h-2 transition-all duration-1000"
            style={{ 
              width: `${Math.max(10, (availableStock / product.lowStockThreshold) * 100)}%` 
            }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div 
        className={cn(
          'inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border',
          getUrgencyColor(),
          className
        )}
        onClick={handleClick}
      >
        <Clock className="w-4 h-4" />
        <span>{urgencyMessage}</span>
        {showRecentSales && (
          <span className="opacity-75">• {recentSales} sold today</span>
        )}
      </div>
    );
  }

  // Default badge variant
  return (
    <div 
      className={cn(
        'relative inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm border-2 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200',
        getUrgencyColor(),
        className
      )}
      onClick={handleClick}
    >
      {/* Pulsing dot */}
      <div className="relative">
        <div className="w-2 h-2 bg-white dark:bg-gray-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-white dark:bg-gray-800 rounded-full animate-ping opacity-75"></div>
      </div>
      
      <span>{urgencyMessage}</span>
      
      {showRecentSales && (
        <div className="flex items-center space-x-1 opacity-90 border-l border-white/30 pl-2">
          <Users className="w-3 h-3" />
          <span className="text-xs">{recentSales} sold today</span>
        </div>
      )}
    </div>
  );
}

// Countdown timer for flash sales
export function CountdownTimer({ 
  endTime, 
  onExpire 
}: { 
  endTime: Date; 
  onExpire?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState({ 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        setIsExpired(true);
        onExpire?.();
        clearInterval(timer);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onExpire]);

  if (isExpired) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white dark:text-white dark:text-gray-100 px-6 py-3 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="text-sm font-medium opacity-90 mb-1">
          🚨 FLASH SALE ENDS IN:
        </div>
        <div className="flex items-center justify-center space-x-4 text-2xl font-bold">
          <div className="text-center">
            <div>{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-75">HRS</div>
          </div>
          <div>:</div>
          <div className="text-center">
            <div>{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-75">MIN</div>
          </div>
          <div>:</div>
          <div className="text-center">
            <div>{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs opacity-75">SEC</div>
          </div>
        </div>
        <div className="text-sm opacity-90 mt-2">
          Don't miss out on 25% OFF!
        </div>
      </div>
    </div>
  );
}

// Stock movement indicator
export function StockMovementIndicator({ productId }: { productId: string }) {
  const [movement, setMovement] = useState<'high' | 'medium' | 'low'>('medium');
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Simulate stock movement based on product popularity
    const movements = ['high', 'medium', 'low'] as const;
    const randomMovement = movements[Math.floor(Math.random() * movements.length)];
    setMovement(randomMovement);
    
    // Simulate view count
    const views = 127 + Math.floor(Math.random() * 73);
    setViewCount(views);

    // Update periodically
    const interval = setInterval(() => {
      setViewCount(prev => Math.max(50, prev + (Math.random() < 0.7 ? 1 : -1)));
    }, 15000);

    return () => clearInterval(interval);
  }, [productId]);

  const getMovementData = () => {
    switch (movement) {
      case 'high':
        return {
          icon: <Zap className="w-4 h-4 text-red-500 dark:text-red-400" />,
          text: 'High demand',
          color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
        };
      case 'medium':
        return {
          icon: <TrendingUp className="w-4 h-4 text-orange-500 dark:text-orange-400" />,
          text: 'Popular choice',
          color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700'
        };
      case 'low':
        return {
          icon: <Users className="w-4 h-4 text-green-500 dark:text-green-400" />,
          text: 'Steady sales',
          color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
        };
    }
  };

  const movementData = getMovementData();

  return (
    <div className={cn(
      'inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border',
      movementData.color
    )}>
      {movementData.icon}
      <span>{movementData.text}</span>
      <span className="opacity-75">• {viewCount} views today</span>
    </div>
  );
}