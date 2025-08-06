import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { useState } from 'react';
import { useCart } from '../src/lib/cart-context';
import { useRouter } from 'next/router';
import { useTranslation } from '../src/lib/translation-context';
import { ArrowRight, CreditCard, Truck, CheckCircle, Loader2, Package, User, MapPin } from 'lucide-react';
import { PRODUCTS } from '../src/lib/constants';
import dynamic from "next/dynamic";
import { FastCheckout } from '../src/components/mobile/FastCheckout';
import ExpressCheckoutButtons from '../src/components/mobile/MobilePayment';
import { TrustBadges } from '../src/components/social-proof/TrustBadges';

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

  const renderCartSummary = () => (
    <div className="bg-gradient-to-r from-[#FFFFF5] to-white rounded-lg p-6 mb-8 border border-gray-100">
      <h3 className="font-semibold mb-4 text-gray-800">Order Summary</h3>
      {items.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-3">
          {items.map(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-24 relative">
                    <NextImage
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                  <p className="font-medium text-gray-800">${(product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">
                {getShippingCost() === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `$${getShippingCost().toFixed(2)}`
                )}
              </span>
            </div>
            {getTotalPrice() >= 40 && getTotalPrice() < 50 && (
              <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span className="text-gray-800">Total</span>
              <span className="text-[#FF3131]">${getTotalWithShipping().toFixed(2)}</span>
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
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#FF3131]" />
                <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2 text-gray-700">Referral Code (optional)</label>
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
                  <div className="text-green-600 text-sm mt-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {referralMessage}
                  </div>
                )}
                {referralStatus === 'invalid' && (
                  <div className="text-red-600 text-sm mt-2">{referralMessage}</div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
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
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[#FF3131]" />
                <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
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
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-[#FF3131]" />
                <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
              </div>
              <p className="text-gray-600 mb-4">
                You will be redirected to our secure payment processor to complete your purchase.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {getShippingCost() === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${getShippingCost().toFixed(2)}`
                    )}
                  </span>
                </div>
                {getTotalPrice() >= 40 && getTotalPrice() < 50 && (
                  <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded mb-2">
                    Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-[#FF3131]">${getTotalWithShipping().toFixed(2)}</span>
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
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h1>
          
          {/* Mobile-Optimized Fast Checkout */}
          <div className="md:hidden mb-8">
            <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#FF3131]/10 rounded-xl p-6 border border-[#5B2EFF]/20 mb-6">
              <h2 className="text-lg font-semibold text-center mb-2">⚡ Fast Mobile Checkout</h2>
              <p className="text-sm text-gray-600 text-center mb-4">Complete your purchase in under 60 seconds</p>
              
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
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span>or use traditional checkout</span>
                <div className="flex-1 h-px bg-gray-300"></div>
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
      </Container>
    </>
  );
};

export default CheckoutPage; 