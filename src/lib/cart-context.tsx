import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import * as CryptoJS from 'crypto-js';
import { PRODUCTS } from './constants';
import { safeTrackEvent } from './analytics';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  // New conversion optimization features
  cartAbandoned: boolean;
  checkoutStarted: boolean;
  setCheckoutStarted: (started: boolean) => void;
  lastActivity: Date | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Encryption utilities for localStorage
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_CART_ENCRYPTION_KEY || 'purrify-cart-key-2024';

function encryptData(data: string): string {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (err) {
    console.warn('Failed to encrypt data, storing unencrypted', err);
    return data;
  }
}

function decryptData(encryptedData: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (err) {
    console.warn('Failed to decrypt data', err);
    return null;
  }
}

// Secure localStorage wrapper
const secureStorage = {
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
      const encrypted = encryptData(value);
      localStorage.setItem(key, encrypted);
    } catch (err) {
      console.error('Failed to save to secure storage:', err);
    }
  },
  
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return decryptData(encrypted);
    } catch (err) {
      console.error('Failed to read from secure storage:', err);
      return null;
    }
  },
  
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Failed to remove from secure storage:', err);
    }
  }
};

// GDPR/Privacy compliance check
function hasTrackingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  // Check for user consent - adjust based on your privacy implementation
  const consent = localStorage.getItem('cookieConsent');
  return consent === 'accepted' || consent === 'analytics';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [cartAbandoned, setCartAbandoned] = useState(false);
  
  // Use refs for timers to ensure proper cleanup
  const abandonmentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recoveryTimersRef = useRef<NodeJS.Timeout[]>([]);
  const isUnmountingRef = useRef(false);

  // Load cart from encrypted localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedCart = secureStorage.getItem('cart');
    const savedCheckoutStarted = secureStorage.getItem('checkoutStarted');
    const savedLastActivity = secureStorage.getItem('lastActivity');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      } catch (err) {
        console.error('Failed to parse saved cart:', err);
        // Clear corrupted data
        secureStorage.removeItem('cart');
      }
    }
    
    if (savedCheckoutStarted === 'true') {
      setCheckoutStarted(true);
    }
    
    if (savedLastActivity) {
      try {
        setLastActivity(new Date(savedLastActivity));
      } catch (err) {
        console.error('Invalid last activity date:', err);
      }
    }
  }, []);

  // Define getTotalPrice function before it's used
  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  }, [items]);

  // Secure cart recovery function
  const triggerCartRecovery = useCallback(async (recoveryType: '1h' | '24h' | '72h') => {
    if (typeof window === 'undefined' || items.length === 0 || isUnmountingRef.current) return;

    try {
      const email = secureStorage.getItem('userEmail');
      if (!email) return;

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return;

      const cartData = items.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return {
          productId: item.id,
          productName: product?.name || 'Unknown Product',
          quantity: Math.max(1, Math.min(99, item.quantity)), // Sanitize quantity
          price: product?.price || 0
        };
      });

      const response = await fetch('/api/cart-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.substring(0, 254), // Limit email length
          cartItems: cartData,
          abandonedAt: lastActivity?.toISOString(),
          recoveryType,
          discount: recoveryType === '1h' ? { code: 'SAVE10', percentage: 10 } : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Cart recovery failed: ${response.status}`);
      }

      // Only track if user has consented to analytics
      if (hasTrackingConsent()) {
        safeTrackEvent('cart_abandoned', {
          event_category: 'ecommerce',
          event_label: recoveryType,
          value: getTotalPrice()
        });
      }
    } catch (err) {
      console.error('Cart recovery failed:', err);
    }
  }, [items, lastActivity, getTotalPrice]);

  // Set up cart recovery timers with proper cleanup
  useEffect(() => {
    // Clear existing timers
    if (abandonmentTimerRef.current) {
      clearTimeout(abandonmentTimerRef.current);
      abandonmentTimerRef.current = null;
    }
    
    recoveryTimersRef.current.forEach(timer => clearTimeout(timer));
    recoveryTimersRef.current = [];

    // Only set up timers if cart has items and checkout hasn't started
    if (items.length === 0 || checkoutStarted || isUnmountingRef.current) {
      return;
    }

    const now = new Date();
    setLastActivity(now);
    
    // Save encrypted data
    secureStorage.setItem('cart', JSON.stringify(items));
    secureStorage.setItem('lastActivity', now.toISOString());
    
    // 1 hour abandonment timer
    const oneHourTimer = setTimeout(() => {
      if (isUnmountingRef.current) return;
      setCartAbandoned(true);
      triggerCartRecovery('1h');
    }, 60 * 60 * 1000);
    
    // 24 hour recovery timer
    const twentyFourHourTimer = setTimeout(() => {
      if (isUnmountingRef.current) return;
      triggerCartRecovery('24h');
    }, 24 * 60 * 60 * 1000);
    
    // 72 hour final recovery timer
    const seventyTwoHourTimer = setTimeout(() => {
      if (isUnmountingRef.current) return;
      triggerCartRecovery('72h');
    }, 72 * 60 * 60 * 1000);

    abandonmentTimerRef.current = oneHourTimer;
    recoveryTimersRef.current = [twentyFourHourTimer, seventyTwoHourTimer];

    // Cleanup function
    return () => {
      if (abandonmentTimerRef.current) {
        clearTimeout(abandonmentTimerRef.current);
        abandonmentTimerRef.current = null;
      }
      recoveryTimersRef.current.forEach(timer => clearTimeout(timer));
      recoveryTimersRef.current = [];
    };
  }, [items, checkoutStarted, triggerCartRecovery]);

  // Track checkout started state with encryption
  useEffect(() => {
    if (typeof window === 'undefined') return;
    secureStorage.setItem('checkoutStarted', checkoutStarted.toString());
  }, [checkoutStarted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isUnmountingRef.current = true;
      
      if (abandonmentTimerRef.current) {
        clearTimeout(abandonmentTimerRef.current);
      }
      
      recoveryTimersRef.current.forEach(timer => clearTimeout(timer));
      recoveryTimersRef.current = [];
    };
  }, []);

  const addToCart = useCallback((productId: string) => {
    // Validate product ID
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      console.error('Invalid product ID:', productId);
      return;
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + 1, 99); // Max 99 items
        return currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...currentItems, { id: productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const sanitizedQuantity = Math.max(0, Math.min(99, Math.floor(quantity)));
    
    if (sanitizedQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity: sanitizedQuantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCartAbandoned(false);
    setCheckoutStarted(false);
    
    // Clear encrypted storage
    secureStorage.removeItem('cart');
    secureStorage.removeItem('checkoutStarted');
    secureStorage.removeItem('lastActivity');
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        cartAbandoned,
        checkoutStarted,
        setCheckoutStarted,
        lastActivity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
