import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [cartAbandoned, setCartAbandoned] = useState(false);
  const abandonmentTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedCart = localStorage.getItem('cart');
    const savedCheckoutStarted = localStorage.getItem('checkoutStarted');
    const savedLastActivity = localStorage.getItem('lastActivity');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedCheckoutStarted === 'true') {
      setCheckoutStarted(true);
    }
    if (savedLastActivity) {
      setLastActivity(new Date(savedLastActivity));
    }
  }, []);

  // Define getTotalPrice function before it's used
  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  }, [items]);

  // Define triggerCartRecovery function before it's used
  const triggerCartRecovery = useCallback(async (recoveryType: '1h' | '24h' | '72h') => {
    if (typeof window === 'undefined' || items.length === 0) return;

    try {
      const email = localStorage.getItem('userEmail'); // Assume we capture email somewhere
      if (!email) return;

      const cartData = items.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return {
          productId: item.id,
          productName: product?.name || 'Unknown Product',
          quantity: item.quantity,
          price: product?.price || 0
        };
      });

      await fetch('/api/cart-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          cartItems: cartData,
          abandonedAt: lastActivity?.toISOString(),
          recoveryType,
          discount: recoveryType === '1h' ? { code: 'SAVE10', percentage: 10 } : undefined
        })
      });

      // Track cart abandonment
      safeTrackEvent('cart_abandoned', {
        event_category: 'ecommerce',
        event_label: recoveryType,
        value: getTotalPrice()
      });
    } catch (error) {
      console.error('Cart recovery failed:', error);
    }
  }, [items, lastActivity, getTotalPrice]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update last activity
    const now = new Date();
    setLastActivity(now);
    localStorage.setItem('lastActivity', now.toISOString());
    
    // Reset abandonment timer
    if (abandonmentTimerRef.current) {
      clearTimeout(abandonmentTimerRef.current);
    }
    
    // Set up cart abandonment detection (1 hour)
    if (items.length > 0 && !checkoutStarted) {
      abandonmentTimerRef.current = setTimeout(() => {
        setCartAbandoned(true);
        triggerCartRecovery('1h');
      }, 60 * 60 * 1000); // 1 hour
    }
  }, [items, checkoutStarted, triggerCartRecovery]);

  // Track checkout started state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('checkoutStarted', checkoutStarted.toString());
  }, [checkoutStarted]);

  const addToCart = (productId: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

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