import { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PurchaseNotification {
  id: string;
  customerName: string;
  location: string;
  product: string;
  timeAgo: string;
  verified?: boolean;
}

interface LivePurchaseNotificationsProps {
  enabled?: boolean;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  maxNotifications?: number;
}

export function LivePurchaseNotifications({ 
  enabled = true,
  position = 'bottom-left',
  maxNotifications = 3
}: LivePurchaseNotificationsProps) {
  const [notifications, setNotifications] = useState<PurchaseNotification[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Realistic purchase data that cycles through
  const purchaseData: PurchaseNotification[] = [
    {
      id: '1',
      customerName: 'Sarah M.',
      location: 'Toronto, ON',
      product: '3x Purrify 140g Bundle',
      timeAgo: '2 minutes ago',
      verified: true
    },
    {
      id: '2',
      customerName: 'Mike R.',
      location: 'Vancouver, BC',
      product: 'Purrify Premium Bundle',
      timeAgo: '7 minutes ago',
      verified: true
    },
    {
      id: '3',
      customerName: 'Lisa K.',
      location: 'Montreal, QC',
      product: '2x Purrify 60g',
      timeAgo: '12 minutes ago',
      verified: false
    },
    {
      id: '4',
      customerName: 'David L.',
      location: 'Calgary, AB',
      product: 'Purrify Starter Kit',
      timeAgo: '18 minutes ago',
      verified: true
    },
    {
      id: '5',
      customerName: 'Emma W.',
      location: 'Ottawa, ON',
      product: 'Purrify 140g + Free Scoop',
      timeAgo: '25 minutes ago',
      verified: true
    },
    {
      id: '6',
      customerName: 'James T.',
      location: 'Winnipeg, MB',
      product: '5x Purrify Multi-Pack',
      timeAgo: '31 minutes ago',
      verified: true
    },
    {
      id: '7',
      customerName: 'Rachel F.',
      location: 'Halifax, NS',
      product: 'Purrify Trial Size',
      timeAgo: '38 minutes ago',
      verified: false
    },
    {
      id: '8',
      customerName: 'Alex P.',
      location: 'Edmonton, AB',
      product: 'Purrify + Enzyme Cleaner',
      timeAgo: '44 minutes ago',
      verified: true
    }
  ];

  useEffect(() => {
    if (!enabled) return;

    // Wait 3 seconds after page load before showing first notification
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      showNotification();
    }, 3000);

    const interval = setInterval(() => {
      showNotification();
    }, 15000 + Math.random() * 10000); // Show every 15-25 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [enabled]);

  const showNotification = () => {
    const randomNotification = purchaseData[Math.floor(Math.random() * purchaseData.length)];
    
    // Create a unique notification with updated timestamp
    const newNotification: PurchaseNotification = {
      ...randomNotification,
      id: `${randomNotification.id}-${Date.now()}`,
      timeAgo: getRandomTimeAgo()
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, maxNotifications);
      
      // Track social proof impression
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'social_proof_shown', {
          event_category: 'conversion',
          event_label: 'purchase_notification',
          value: 1
        });
      }
      
      return updated;
    });

    // Auto-remove notification after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 8000);
  };

  const getRandomTimeAgo = () => {
    const options = [
      '1 minute ago',
      '3 minutes ago',
      '5 minutes ago',
      '8 minutes ago',
      '12 minutes ago',
      '15 minutes ago',
      '18 minutes ago',
      '22 minutes ago',
      '27 minutes ago',
      '35 minutes ago'
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleNotificationClick = (notification: PurchaseNotification) => {
    // Track click on social proof
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'social_proof_clicked', {
        event_category: 'conversion',
        event_label: 'purchase_notification',
        value: 1
      });
    }

    // Redirect to products page
    window.location.href = '/products/compare';
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      default:
        return 'bottom-4 left-4';
    }
  };

  if (!enabled || !isVisible || notifications.length === 0) {
    return null;
  }

  return (
    <div className={cn('fixed z-50 space-y-2', getPositionClasses())}>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          onClick={() => handleNotificationClick(notification)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-in slide-in-from-bottom-2 fade-in-0"
          style={{
            animationDelay: `${index * 100}ms`,
            maxWidth: '320px'
          }}
        >
          <div className="p-4 flex items-start space-x-3">
            {/* Product Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 mb-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.customerName}
                </p>
                {notification.verified && (
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-green-500 fill-current" />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                purchased <span className="font-medium">{notification.product}</span>
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{notification.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{notification.timeAgo}</span>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setNotifications(prev => prev.filter(n => n.id !== notification.id));
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Trust indicator bar */}
          <div className="h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-lg"></div>
        </div>
      ))}
    </div>
  );
}

// Visitor counter component
export function LiveVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial visitor count (simulate realistic numbers)
    const baseCount = 47 + Math.floor(Math.random() * 23);
    setVisitorCount(baseCount);
    
    // Show after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Update count every 10-30 seconds
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.random() < 0.7 ? 1 : -1; // 70% chance of increase
        const newCount = Math.max(35, Math.min(89, prev + change));
        return newCount;
      });
    }, 10000 + Math.random() * 20000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-bottom-2 fade-in-0">
      <div className="flex items-center space-x-2 text-sm font-medium">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>{visitorCount} people viewing this page</span>
      </div>
    </div>
  );
}