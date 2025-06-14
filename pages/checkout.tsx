import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { useState } from 'react';
import { useCart } from '../src/lib/cart-context';
import { useRouter } from 'next/router';
import { useTranslation } from '../src/lib/translation-context';
import { ArrowRight, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PRODUCTS } from '../src/lib/constants';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
  const router = useRouter();
  const { t } = useTranslation();
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
          total: getTotalPrice(),
          referralCode: referralStatus === 'valid' ? referralCode : undefined,
        }),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');

      const { orderId } = await orderResponse.json();

      // Create Stripe checkout session
      const checkoutResponse = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          items,
          customer: formData,
        }),
      });

      if (!checkoutResponse.ok) throw new Error('Failed to create checkout session');

      const { sessionId } = await checkoutResponse.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) throw error;

    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (show error message to user)
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

  const renderCartSummary = () => (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      {items.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        items.map(item => {
          const product = PRODUCTS.find(p => p.id === item.id);
          if (!product) return null;
          return (
            <div key={item.id} className="flex justify-between py-2">
              <span>{product.name} x {item.quantity}</span>
              <span>${(product.price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })
      )}
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {renderCartSummary()}
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Referral Code (optional)</label>
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
                >
                  {referralStatus === 'validating' ? <Loader2 className="animate-spin h-4 w-4" /> : 'Apply'}
                </Button>
              </div>
              {referralStatus === 'valid' && (
                <div className="text-green-600 text-sm mt-1">{referralMessage}</div>
              )}
              {referralStatus === 'invalid' && (
                <div className="text-red-600 text-sm mt-1">{referralMessage}</div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {renderCartSummary()}
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="province"
                placeholder="Province"
                value={formData.province}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderCartSummary()}
            <h2 className="text-2xl font-bold mb-6">Review Order</h2>
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
        description="Complete your order and get your Purrify cat litter additive delivered to your door."
      />
      
      <section className="py-20 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12">
              {[
                { icon: <CreditCard />, label: 'Contact' },
                { icon: <Truck />, label: 'Shipping' },
                { icon: <CheckCircle />, label: 'Review' },
              ].map((stepItem, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index + 1 === step ? 'text-[#FF3131]' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index + 1 === step
                        ? 'bg-[#FF3131] text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {stepItem.icon}
                  </div>
                  <span className="text-sm font-medium">{stepItem.label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl">
              {renderStep()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    className="ml-auto bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !isContactStepValid()) ||
                      (step === 2 && !isShippingStepValid())
                    }
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CheckoutPage; 