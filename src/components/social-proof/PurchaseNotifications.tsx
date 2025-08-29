import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, MapPin, Clock, Star, CheckCircle, Info } from 'lucide-react';

interface PurchaseNotification {
  id: string;
  customerName: string;
  location: string;
  product: string;
  timeAgo: string;
  verified: boolean;
  rating?: number;
  isReal?: boolean; // Flag to indicate if this is real or synthetic data
}

interface PurchaseNotificationsProps {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  autoHide?: boolean;
  hideDelay?: number; // milliseconds
  useRealData?: boolean; // Enable when connected to real purchase data
}

// SYNTHETIC DATA - Clearly marked and disclosed to users
const SYNTHETIC_PURCHASES: PurchaseNotification[] = [
  {
    id: '1',
    customerName: 'Priya S.',
    location: 'Saint-Laurent, QC',
    product: 'Purrify 120g Large',
    timeAgo: '3 minutes ago',
    verified: true,
    rating: 5,
    isReal: false
  },
  {
    id: '2',
    customerName: 'Kenji T.',
    location: 'Verdun, QC',
    product: 'Purrify 60g Regular',
    timeAgo: '12 minutes ago',
    verified: true,
    rating: 5,
    isReal: false
  },
  {
    id: '3',
    customerName: 'Fatima R.',
    location: 'Côte-des-Neiges, QC',
    product: 'Purrify 17g Trial',
    timeAgo: '18 minutes ago',
    verified: true,
    rating: 5,
    isReal: false
  }
  // Reduced to fewer notifications to be less misleading
];

// Function to fetch real purchase notifications (implement when ready)
const fetchRealPurchaseData = async (): Promise<PurchaseNotification[]> => {
  try {
    const response = await fetch('/api/recent-purchases');
    if (!response.ok) {
      throw new Error('Failed to fetch purchase data');
    }
    const data = await response.json();
    return data.map((item: unknown) => ({
      ...(item as object),
      isReal: true
    }));
  } catch (error) {
    console.error('Failed to load real purchase data:', error);
    return [];
  }
};

export const PurchaseNotifications: React.FC<PurchaseNotificationsProps> = ({
  position = 'bottom-left',
  autoHide = true,
  hideDelay = 5000,
  useRealData = false // Default to false until real data is connected
}) => {
  const [currentNotification, setCurrentNotification] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [purchaseData, setPurchaseData] = useState<PurchaseNotification[]>([]);
  const [showDisclosure, setShowDisclosure] = useState(false);

  // Load purchase data based on configuration
  useEffect(() => {
    const loadData = async () => {
      if (useRealData) {
        const realData = await fetchRealPurchaseData();
        if (realData.length > 0) {
          setPurchaseData(realData);
        } else {
          // Fallback to synthetic data with disclosure if no real data available
          setPurchaseData(SYNTHETIC_PURCHASES);
        }
      } else {
        setPurchaseData(SYNTHETIC_PURCHASES);
      }
    };

    loadData();
  }, [useRealData]);

  const getRandomInterval = () => {
    // Longer intervals to be less annoying (5-8 minutes instead of 3-4)
    return Math.floor(Math.random() * (480000 - 300000 + 1)) + 300000; // 300-480 seconds
  };

  useEffect(() => {
    if (purchaseData.length === 0) return;

    let currentTimeout: NodeJS.Timeout;
    
    const showNextNotification = () => {
      setNotificationIndex((prevIndex) => {
        const notification = purchaseData[prevIndex];
        setCurrentNotification(notification);
        setIsVisible(true);

        // Show disclosure for synthetic data
        if (!notification.isReal) {
          setShowDisclosure(true);
        }

        if (autoHide) {
          const hideTimeout = setTimeout(() => {
            setIsVisible(false);
            setShowDisclosure(false);
          }, hideDelay);
          setTimeoutId(hideTimeout);
        }

        return (prevIndex + 1) % purchaseData.length;
      });
    };
    
    const schedule = () => {
      const randomInterval = getRandomInterval();
      currentTimeout = setTimeout(() => {
        showNextNotification();
        schedule();
      }, randomInterval);
    };

    // Initial delay of 3-5 minutes to not overwhelm users
    const initialDelay = Math.floor(Math.random() * 120000) + 180000; // 180-300 seconds
    currentTimeout = setTimeout(() => {
      showNextNotification();
      schedule();
    }, initialDelay);

    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, [purchaseData, autoHide, hideDelay]);

  const handleClose = () => {
    setIsVisible(false);
    setShowDisclosure(false);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4'
  };

  if (!currentNotification || purchaseData.length === 0) return null;

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{ maxWidth: '320px' }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 m-4">
        {/* Disclosure for synthetic data */}
        {showDisclosure && !currentNotification.isReal && (
          <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <Info className="w-3 h-3 text-blue-600 dark:text-blue-400 dark:text-blue-300 flex-shrink-0" />
              <span className="text-xs text-blue-700 dark:text-blue-300">
                Sample customer activity shown for demonstration
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {currentNotification.isReal ? 'Recent Purchase' : 'Customer Activity'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-600 transition-colors"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {currentNotification.customerName}
            </span>
            {currentNotification.verified && currentNotification.isReal && (
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Verified
                </span>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            {currentNotification.isReal ? 'purchased' : 'interested in'}{' '}
            <span className="font-medium text-[#5B2EFF]">{currentNotification.product}</span>
          </div>

          {currentNotification.rating && currentNotification.isReal && (
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < currentNotification.rating!
                      ? 'text-yellow-400 dark:text-yellow-300 dark:text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({currentNotification.rating}/5)
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{currentNotification.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{currentNotification.isReal ? currentNotification.timeAgo : 'Recently'}</span>
            </div>
          </div>
        </div>

        {autoHide && (
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div
              className="bg-[#5B2EFF] h-1 rounded-full transition-all duration-100 ease-linear"
              style={{
                animation: `shrink ${hideDelay}ms linear`,
                width: '100%'
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseNotifications;