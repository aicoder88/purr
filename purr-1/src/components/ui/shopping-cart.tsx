import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart as ShoppingCartIcon, Package, Trash2, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { useCart } from '../../lib/cart-context';
import { PRODUCTS } from '../../lib/constants';
import { useRouter } from 'next/router';
// import { useTranslation } from '../../lib/translation-context';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './sheet';
import Image from 'next/image';

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const router = useRouter();
  // const { t: _t } = useTranslation();

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full bg-white shadow-md hover:bg-gray-50 h-9 w-9 sm:h-10 sm:w-10 md:h-9 md:w-9 p-0 sm:p-0 md:p-0 active:scale-95 transition-transform duration-100"
          >
            <ShoppingCartIcon className="h-6 w-6 sm:h-5 sm:w-5" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF3131] text-xs font-medium text-white">
                {items.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Package className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-2">Add some products to your cart</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100"
                      >
                        <div className="w-16 h-16 bg-white rounded-md p-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">{product.size}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-gray-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl font-bold text-[#FF3131]">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white"
                  onClick={handleCheckout}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
} 