import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, MapPin, Clock, Star, CheckCircle } from 'lucide-react';

interface PurchaseNotification {
  id: string;
  customerName: string;
  location: string;
  product: string;
  timeAgo: string;
  verified: boolean;
  rating?: number;
}

interface PurchaseNotificationsProps {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  autoHide?: boolean;
  hideDelay?: number; // milliseconds
}

const SAMPLE_PURCHASES: PurchaseNotification[] = [
  {
    id: '1',
    customerName: 'Priya S.',
    location: 'Saint-Laurent, QC',
    product: 'Purrify 120g Large',
    timeAgo: '3 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '2',
    customerName: 'Kenji T.',
    location: 'Verdun, QC',
    product: 'Purrify 60g Regular',
    timeAgo: '12 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '3',
    customerName: 'Fatima R.',
    location: 'Côte-des-Neiges, QC',
    product: 'Purrify 17g Trial',
    timeAgo: '18 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '4',
    customerName: 'Zara K.',
    location: 'Plateau, QC',
    product: 'Purrify 60g Regular',
    timeAgo: '28 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '5',
    customerName: 'François B.',
    location: 'Rosemont, QC',
    product: 'Purrify 120g Large',
    timeAgo: '35 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '6',
    customerName: 'Dr. Amara Chen',
    location: 'Westmount, QC',
    product: 'Purrify 60g Regular',
    timeAgo: '42 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '7',
    customerName: 'River K.',
    location: 'Hochelaga, QC',
    product: 'Purrify 17g Trial',
    timeAgo: '55 minutes ago',
    verified: true,
    rating: 5
  },
  {
    id: '8',
    customerName: 'Kai L.',
    location: 'Outremont, QC',
    product: 'Purrify 120g Large',
    timeAgo: '1 hour ago',
    verified: true,
    rating: 5
  }
];

export const PurchaseNotifications: React.FC<PurchaseNotificationsProps> = ({
  position = 'bottom-left',
  autoHide = true,
  hideDelay = 5000
}) => {
  const [currentNotification, setCurrentNotification] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getRandomInterval = () => {
    return Math.floor(Math.random() * (90000 - 20000 + 1)) + 20000;
  };

  const showNextNotification = useCallback(() => {
    const notification = SAMPLE_PURCHASES[notificationIndex];
    setCurrentNotification(notification);
    setIsVisible(true);

    if (autoHide) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
      setTimeoutId(hideTimeout);
    }

    setNotificationIndex((prev) => (prev + 1) % SAMPLE_PURCHASES.length);
  }, [notificationIndex, autoHide, hideDelay]);

  useEffect(() => {
    const schedule = () => {
      const randomInterval = getRandomInterval();
      const newTimeout = setTimeout(() => {
        showNextNotification();
        schedule();
      }, randomInterval);
      setTimeoutId(newTimeout);
    };

    const initialDelay = Math.floor(Math.random() * 15000) + 15000;
    const initialTimeout = setTimeout(() => {
      showNextNotification();
      schedule();
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showNextNotification, timeoutId]);

  const handleClose = () => {
    setIsVisible(false);
    if (timeoutId) clearTimeout(timeoutId);
  };

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4'
  };

  if (!currentNotification) return null;

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{ maxWidth: '320px' }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 m-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Recent Purchase
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
            {currentNotification.verified && (
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Verified
                </span>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            purchased <span className="font-medium text-[#5B2EFF]">{currentNotification.product}</span>
          </div>

          {currentNotification.rating && (
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < currentNotification.rating!
                      ? 'text-yellow-400 fill-current'
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
              <span>{currentNotification.timeAgo}</span>
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
