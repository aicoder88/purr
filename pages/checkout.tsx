import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { useState, useEffect } from 'react';
import React from 'react';
import { useCart } from '../src/lib/cart-context';
import { useRouter } from 'next/router';
import { useTranslation } from '../src/lib/translation-context';
import { ArrowRight, CreditCard, Truck, CheckCircle, Loader2, Package, User, MapPin, Shield, Award, Star, Users, Clock, Zap, Heart, CheckSquare } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS } from '../src/lib/constants';
import dynamic from "next/dynamic";
import { FastCheckout } from '../src/components/mobile/FastCheckout';
import ExpressCheckoutButtons from '../src/components/mobile/MobilePayment';
import { TrustBadges, CheckoutTrustBadges, SocialProofBadges } from '../src/components/social-proof/TrustBadges';

// Dynamically import NextImage to reduce initial bundle size
const NextImage = dynamic(() => import("../components/NextImage"), {
  ssr: true,
});

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  phone: '',
};

const CheckoutPage: NextPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showPurchaseNotification, setShowPurchaseNotification] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  
  const getShippingCost = () => {
    const subtotal = getTotalPrice();
    return subtotal >= 50 ? 0 : 30;
  };
  
  const getTotalWithShipping = () => {
    return getTotalPrice() + getShippingCost();
  };
  const router = useRouter();
  // const { t } = useTranslation();
  const [referralCode, setReferralCode] = useState('');
  const [referralStatus, setReferralStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [referralMessage, setReferralMessage] = useState('');

  // Rotating testimonials effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % Math.min(TESTIMONIALS.length, 6));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Social proof notifications
  React.useEffect(() => {
    const showNotification = () => {
      setShowPurchaseNotification(true);
      setTimeout(() => setShowPurchaseNotification(false), 5000);
    };

    // Show initial notification after 2 seconds
    const initialTimeout = setTimeout(showNotification, 2000);
    
    // Then show every 45-75 seconds
    const interval = setInterval(showNotification, Math.random() * 30000 + 45000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateReferral = async () => {
    if (!referralCode) return;
    setReferralStatus('validating');
    setReferralMessage('');
    try {
      const res = await fetch('/api/referrals/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: referralCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setReferralStatus('valid');
        setReferralMessage('Referral code applied!');
      } else {
        setReferralStatus('invalid');
        setReferralMessage(data.message || 'Invalid referral code.');
      }
    } catch (err) {
      setReferralStatus('invalid');
      setReferralMessage('Could not validate referral code.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order on your backend
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: formData,
          subtotal: getTotalPrice(),
          shipping: getShippingCost(),
          total: getTotalWithShipping(),
          referralCode: referralStatus === 'valid' ? referralCode : undefined,
        }),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');

      const { orderId } = await orderResponse.json();

      // For now, just show success and clear cart
      alert('Order placed successfully!');
      clearCart();
      router.push('/');

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isContactStepValid = () => {
    return (
      formData.email &&
      formData.phone &&
      formData.firstName &&
      formData.lastName &&
      (referralStatus !== 'validating')
    );
  };

  const isShippingStepValid = () => {
    return (
      formData.address &&
      formData.city &&
      formData.province &&
      formData.postalCode
    );
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              stepNumber === step
                ? 'bg-[#FF3131] text-white'
                : stepNumber < step
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {stepNumber < step ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span className="font-medium">{stepNumber}</span>
            )}
          </div>
          {stepNumber < 3 && (
            <div
              className={`w-16 h-1 transition-colors duration-200 ${
                stepNumber < step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Purchase notification component
  const PurchaseNotification = () => {
    const notifications = [
      "Sarah from Toronto just purchased Purrify 140g",
      "Mike from Vancouver ordered 2x Purrify 60g",
      "Emma from Montreal just bought the trial size",
      "Alex from Calgary ordered Purrify 140g",
      "Lisa from Ottawa just purchased 3x Purrify 20g"
    ];
    
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    
    return (
      <div 
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          showPurchaseNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{randomNotification}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                Just now
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Testimonials sidebar component
  const TestimonialsSidebar = () => {
    const displayTestimonials = TESTIMONIALS.slice(0, 6);
    
    return (
      <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-6">
          {/* Social proof stats */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="font-bold text-2xl text-gray-900 dark:text-gray-100">10,000+</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">Happy Cat Owners</p>
              <div className="flex justify-center mt-2">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Testimonial carousel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100">Customer Love</h3>
            </div>
            
            <div className="relative min-h-[200px]">
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex mb-2">
                    {Array(testimonial.stars || 5).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-700 dark:text-gray-200 italic mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-gray-50">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-[#FF3131]' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <CheckoutTrustBadges />
          </div>
        </div>
      </div>
    );
  };

  const renderCartSummary = () => (
    <div className="bg-gradient-to-r from-[#FFFFF5] to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-8 border border-gray-100 dark:border-gray-700 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-[#FF3131]" />
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Order Summary</h3>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-300">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>
      {items.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300 text-center py-8">
          <Package className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 relative bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                    <NextImage
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{product.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full inline-block">{product.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300">x{item.quantity}</p>
                  <p className="font-semibold text-[#FF3131]">${(product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="text-gray-800 dark:text-gray-100 font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="text-gray-800 dark:text-gray-100 font-medium">
                {getShippingCost() === 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                ) : (
                  `$${getShippingCost().toFixed(2)}`
                )}
              </span>
            </div>
            {/* {getTotalPrice() >= 40 && getTotalPrice() < 50 && (
              <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span className="font-medium">Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!</span>
              </div>
            )} */} {/* TODO: Restore when free shipping is available */}
            
            {/* Urgency messaging */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800 mt-2">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">🔥 Limited stock - Order within the next hour for guaranteed delivery!</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-[#FF3131] text-xl">${getTotalWithShipping().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 transition-opacity duration-300">
            {renderCartSummary()}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF3131] to-[#FF5050] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Contact Information</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Step 1 of 3 - We'll use this to send you order updates</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Secure & Private
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Referral Code (optional)</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    name="referralCode"
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={e => {
                      setReferralCode(e.target.value);
                      setReferralStatus('idle');
                      setReferralMessage('');
                    }}
                    className="flex-1"
                    disabled={referralStatus === 'validating'}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={validateReferral}
                    disabled={!referralCode || referralStatus === 'validating'}
                    className="min-w-[100px]"
                  >
                    {referralStatus === 'validating' ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      'Apply'
                    )}
                  </Button>
                </div>
                {referralStatus === 'valid' && (
                  <div className="text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {referralMessage}
                  </div>
                )}
                {referralStatus === 'invalid' && (
                  <div className="text-red-600 dark:text-red-400 text-sm mt-2">{referralMessage}</div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Shipping Information</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Step 2 of 3 - Where should we send your Purrify?</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <Truck className="h-4 w-4 inline mr-1" />
                  Fast Delivery
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Province</label>
                    <Input
                      type="text"
                      name="province"
                      placeholder="Province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="A1A 1A1"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Secure Payment</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Step 3 of 3 - Your information is protected with 256-bit SSL</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Stripe Secured
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Secure checkout powered by Stripe. Your payment information is encrypted and protected.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-gray-50">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-gray-50">
                    {getShippingCost() === 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                    ) : (
                      `$${getShippingCost().toFixed(2)}`
                    )}
                  </span>
                </div>
                {/* {getTotalPrice() >= 40 && getTotalPrice() < 50 && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 p-2 rounded mb-2 border border-blue-200 dark:border-blue-800">
                    Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
                  </div>
                )} */} {/* TODO: Restore when free shipping is available */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="font-bold text-gray-800 dark:text-gray-100">Total</span>
                  <span className="font-bold text-[#FF3131] text-xl">${getTotalWithShipping().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NextSeo
        title="Checkout - Purrify"
        description="Complete your Purrify purchase"
      />
      <Container>
        <PurchaseNotification />
        
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 px-4 py-2 rounded-full mb-4">
              <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-800 dark:text-green-200">Fast & Secure Checkout</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Complete Your Order
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Join thousands of happy cat parents who trust Purrify for odor-free litter boxes
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Checkout form - 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="max-w-3xl">
          
          {/* Mobile-Optimized Fast Checkout */}
          <div className="md:hidden mb-8">
            <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#FF3131]/10 dark:from-[#5B2EFF]/20 dark:to-[#FF3131]/20 rounded-xl p-6 border border-[#5B2EFF]/20 dark:border-[#5B2EFF]/30 mb-6">
              <h2 className="text-lg font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">⚡ Fast Mobile Checkout</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">Complete your purchase in under 60 seconds</p>
              
              <FastCheckout 
                cartTotal={getTotalWithShipping()}
                onCheckoutComplete={(data) => {
                  console.log('Fast checkout completed:', data);
                  // Handle fast checkout completion
                  setIsProcessing(true);
                  setTimeout(() => {
                    clearCart();
                    router.push('/thank-you');
                  }, 2000);
                }}
              />
            </div>
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-300">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                <span>or use traditional checkout</span>
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mb-8">
            <TrustBadges variant="horizontal" showIcons={true} maxBadges={4} />
          </div>
          
          {renderStepIndicator()}
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="min-w-[120px]"
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !isContactStepValid()) ||
                    (step === 2 && !isShippingStepValid())
                  }
                  className="min-w-[120px] bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="min-w-[120px] bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Purchase
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
              </div>
            </div>

            {/* Testimonials Sidebar - 1 column on large screens */}
            <TestimonialsSidebar />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CheckoutPage; 