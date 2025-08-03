import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  available: boolean;
  description: string;
}

interface MobilePaymentProps {
  amount: number;
  currency?: string;
  onPaymentSuccess?: (paymentData: any) => void;
  onPaymentError?: (error: any) => void;
  className?: string;
}

export const MobilePayment: React.FC<MobilePaymentProps> = ({
  amount,
  currency = 'CAD',
  onPaymentSuccess,
  onPaymentError,
  className = ''
}) => {
  const [availablePayments, setAvailablePayments] = useState<PaymentMethod[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  useEffect(() => {
    checkPaymentAvailability();
  }, []);

  const checkPaymentAvailability = () => {
    const payments: PaymentMethod[] = [
      {
        id: 'apple-pay',
        name: 'Apple Pay',
        icon: '🍎',
        available: checkApplePayAvailability(),
        description: 'Pay securely with Touch ID or Face ID'
      },
      {
        id: 'google-pay',
        name: 'Google Pay',
        icon: '🟢',
        available: checkGooglePayAvailability(),
        description: 'Fast and secure Google payments'
      },
      {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: '💳',
        available: true,
        description: 'Visa, Mastercard, American Express'
      }
    ];

    setAvailablePayments(payments);
  };

  const checkApplePayAvailability = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if Apple Pay is available
    return !!(window as any).ApplePaySession && 
           (window as any).ApplePaySession.canMakePayments();
  };

  const checkGooglePayAvailability = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if Google Pay is available
    return !!(window as any).google && 
           !!(window as any).google.payments;
  };

  const handleApplePay = async () => {
    if (!checkApplePayAvailability()) {
      onPaymentError?.({ message: 'Apple Pay not available' });
      return;
    }

    setIsProcessing(true);
    setSelectedMethod('apple-pay');

    try {
      const ApplePaySession = (window as any).ApplePaySession;
      
      const request = {
        countryCode: 'CA',
        currencyCode: currency,
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'Purrify',
          amount: amount.toFixed(2)
        }
      };

      const session = new ApplePaySession(3, request);

      session.onvalidatemerchant = async (event: any) => {
        // In production, validate with your payment processor
        console.log('Validating merchant:', event.validationURL);
      };

      session.onpaymentauthorized = (event: any) => {
        const payment = event.payment;
        
        // Process payment with your backend
        processPayment(payment, 'apple-pay')
          .then((result) => {
            session.completePayment(ApplePaySession.STATUS_SUCCESS);
            onPaymentSuccess?.(result);
          })
          .catch((error) => {
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            onPaymentError?.(error);
          });
      };

      session.begin();
    } catch (error) {
      console.error('Apple Pay error:', error);
      onPaymentError?.(error);
    } finally {
      setIsProcessing(false);
      setSelectedMethod(null);
    }
  };

  const handleGooglePay = async () => {
    if (!checkGooglePayAvailability()) {
      onPaymentError?.({ message: 'Google Pay not available' });
      return;
    }

    setIsProcessing(true);
    setSelectedMethod('google-pay');

    try {
      const paymentsClient = new (window as any).google.payments.api.PaymentsClient({
        environment: 'TEST' // Change to 'PRODUCTION' for live
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'stripe',
              gatewayMerchantId: 'your-stripe-merchant-id'
            }
          }
        }],
        merchantInfo: {
          merchantId: 'your-google-merchant-id',
          merchantName: 'Purrify'
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: amount.toFixed(2),
          currencyCode: currency
        }
      };

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      
      // Process payment with your backend
      const result = await processPayment(paymentData, 'google-pay');
      onPaymentSuccess?.(result);
    } catch (error) {
      console.error('Google Pay error:', error);
      onPaymentError?.(error);
    } finally {
      setIsProcessing(false);
      setSelectedMethod(null);
    }
  };

  const processPayment = async (paymentData: any, method: string) => {
    // Simulate payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate for demo
          resolve({
            success: true,
            transactionId: `txn_${Date.now()}`,
            method,
            amount,
            currency
          });
        } else {
          reject(new Error('Payment processing failed'));
        }
      }, 2000);
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Choose Payment Method
        </h3>
        <div className="text-2xl font-bold text-[#5B2EFF]">
          {formatAmount(amount, currency)}
        </div>
      </div>

      <div className="space-y-3">
        {availablePayments.map((payment) => (
          <div key={payment.id}>
            {payment.available ? (
              <Button
                onClick={() => {
                  if (payment.id === 'apple-pay') handleApplePay();
                  else if (payment.id === 'google-pay') handleGooglePay();
                  // For card payments, you'd typically redirect to a form
                }}
                disabled={isProcessing}
                className={`w-full p-4 h-auto flex items-center justify-between border-2 transition-all ${
                  selectedMethod === payment.id
                    ? 'border-[#5B2EFF] bg-[#5B2EFF]/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#5B2EFF]/50'
                } ${
                  payment.id === 'apple-pay' 
                    ? 'bg-black hover:bg-gray-800 text-white' 
                    : payment.id === 'google-pay'
                    ? 'bg-[#4285f4] hover:bg-[#3367d6] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
                variant="outline"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{payment.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{payment.name}</div>
                    <div className="text-sm opacity-75">{payment.description}</div>
                  </div>
                </div>
                {isProcessing && selectedMethod === payment.id ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="w-5 h-5 opacity-50" />
                )}
              </Button>
            ) : (
              <div className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 opacity-50">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl grayscale">{payment.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-600 dark:text-gray-400">
                      {payment.name} (Not Available)
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      Not supported on this device/browser
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">Secure Payment</span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm mt-1">
          Your payment information is encrypted and secure. We never store your payment details.
        </p>
      </div>

      {/* Mobile-specific features */}
      <div className="md:hidden mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>💡 Tip: Use biometric authentication for faster checkout</p>
      </div>
    </div>
  );
};

// Express Checkout Button Component
export const ExpressCheckoutButtons: React.FC<{
  amount: number;
  onPaymentSuccess?: (data: any) => void;
  className?: string;
}> = ({ amount, onPaymentSuccess, className = '' }) => {
  const [showApplePay, setShowApplePay] = useState(false);
  const [showGooglePay, setShowGooglePay] = useState(false);

  useEffect(() => {
    setShowApplePay(checkApplePayAvailability());
    setShowGooglePay(checkGooglePayAvailability());
  }, []);

  const checkApplePayAvailability = (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!(window as any).ApplePaySession && 
           (window as any).ApplePaySession.canMakePayments();
  };

  const checkGooglePayAvailability = (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!(window as any).google && 
           !!(window as any).google.payments;
  };

  if (!showApplePay && !showGooglePay) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        Express Checkout
      </div>
      
      {showApplePay && (
        <button
          className="w-full bg-black text-white rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
          onClick={() => {/* Apple Pay handler */}}
        >
          <span>🍎</span>
          <span className="font-semibold">Pay with Apple Pay</span>
        </button>
      )}
      
      {showGooglePay && (
        <button
          className="w-full bg-[#4285f4] text-white rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-[#3367d6] transition-colors"
          onClick={() => {/* Google Pay handler */}}
        >
          <span>🟢</span>
          <span className="font-semibold">Pay with Google Pay</span>
        </button>
      )}
      
      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        or continue with regular checkout below
      </div>
    </div>
  );
};

export default MobilePayment;
