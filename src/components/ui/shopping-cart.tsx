import { useState, useEffect, useCallback } from 'react';
import type { MouseEvent } from 'react';
import { X, Plus, Minus, ShoppingCart as ShoppingCartIcon, Package, Trash2, ArrowRight, Star } from 'lucide-react';
import { Button } from './button';
import { useCart } from '../../lib/cart-context';
import { PRODUCTS } from '../../lib/constants';
import { useRouter } from 'next/router';
// import { useTranslation } from '../../lib/translation-context';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './sheet';
import Image from 'next/image';

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemAnimations, setItemAnimations] = useState<{[key: string]: boolean}>({});
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const router = useRouter();
  // const { t: _t } = useTranslation();

  // Animate new items being added
  useEffect(() => {
    const newAnimations: {[key: string]: boolean} = {};
    items.forEach(item => {
      if (!itemAnimations[item.id]) {
        newAnimations[item.id] = true;
        setTimeout(() => {
          setItemAnimations(prev => ({...prev, [item.id]: false}));
        }, 500);
      }
    });
    if (Object.keys(newAnimations).length > 0) {
      setItemAnimations(prev => ({...prev, ...newAnimations}));
    }
  }, [items, itemAnimations]);

  const handleCheckout = useCallback(() => {
    setIsOpen(false);
    router.push('/checkout');
  }, [router]);

  const findItemById = useCallback((productId: string) => items.find(item => item.id === productId), [items]);

  const handleQuantityDecrease = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const productId = event.currentTarget.dataset.productId;
    if (!productId) return;
    const targetItem = findItemById(productId);
    if (!targetItem) return;
    updateQuantity(productId, targetItem.quantity - 1);
  }, [findItemById, updateQuantity]);

  const handleQuantityIncrease = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const productId = event.currentTarget.dataset.productId;
    if (!productId) return;
    const targetItem = findItemById(productId);
    if (!targetItem) return;
    updateQuantity(productId, targetItem.quantity + 1);
  }, [findItemById, updateQuantity]);

  const handleRemoveItem = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const productId = event.currentTarget.dataset.productId;
    if (!productId) return;
    removeFromCart(productId);
  }, [removeFromCart]);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 h-11 w-11 sm:h-10 sm:w-10 md:h-9 md:w-9 p-0 active:scale-95 transition-transform duration-100"
          >
            <ShoppingCartIcon className="h-6 w-6 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF3131] text-xs font-medium text-white dark:text-white dark:text-gray-100 animate-pulse">
                {items.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[420px] p-0 flex flex-col bg-white dark:bg-gray-900">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#FF3131]/5 to-[#FF3131]/10 dark:from-[#FF3131]/10 dark:to-[#FF3131]/20">
              <div className="flex items-center gap-3">
                <ShoppingCartIcon className="h-5 w-5 text-[#FF3131]" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Shopping Cart</h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 dark:text-gray-300">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-6 mb-4">
                    <Package className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add some amazing products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform ${
                          itemAnimations[item.id] ? 'scale-105 shadow-lg border-[#FF3131]/30' : 'scale-100'
                        }`}
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-2 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                              {product.size}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 dark:fill-yellow-400 dark:text-yellow-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">4.9</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={handleQuantityDecrease}
                              data-product-id={item.id}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="min-w-[1.5rem] text-center font-medium text-gray-900 dark:text-gray-100">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={handleQuantityIncrease}
                              data-product-id={item.id}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <p className="font-bold text-lg text-[#FF3131]">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={handleRemoveItem}
                              data-product-id={item.id}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-2xl font-bold text-[#FF3131]">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-white dark:text-gray-100 font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                  🔒 Secure checkout • Free shipping over $50
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
} 
