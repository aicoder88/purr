import React, { useState, useEffect, useCallback } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '../../lib/translation-context';
import { formatCurrencyValue } from '@/lib/pricing';

// Type declarations for Apple Pay and Google Pay
declare global {
  interface ApplePayPaymentRequest {
    countryCode: string;
    currencyCode: string;
    supportedNetworks: string[];
    merchantCapabilities: string[];
    total: {
      label: string;
      amount: string;
    };
  }

  interface ApplePayPaymentToken {
    paymentData: unknown;
    paymentMethod: unknown;
    transactionIdentifier: string;
  }

  interface ApplePayPayment {
    token: ApplePayPaymentToken;
    billingContact?: unknown;
    shippingContact?: unknown;
  }

  interface ApplePayPaymentAuthorizedEvent extends Event {
    payment: ApplePayPayment;
  }

  interface ApplePayValidateMerchantEvent extends Event {
    validationURL: string;
  }

  interface Window {
    ApplePaySession?: {
      canMakePayments: () => boolean;
      supportsVersion: (version: number) => boolean;
      STATUS_SUCCESS: number;
      STATUS_FAILURE: number;
      new (version: number, paymentRequest: ApplePayPaymentRequest): {
        onvalidatemerchant: (event: ApplePayValidateMerchantEvent) => void;
        onpaymentauthorized: (event: ApplePayPaymentAuthorizedEvent) => void;
        oncancel: () => void;
        begin: () => void;
        completePayment: (status: number) => void;
        completeMerchantValidation: (merchantSession: unknown) => void;
        abort: () => void;
      };
    };
    google?: {
      payments: {
        api: {
          PaymentsClient: new (config: { environment: string }) => {
            isReadyToPay: (request: unknown) => Promise<{ result: boolean }>;
            loadPaymentData: (paymentRequest: unknown) => Promise<{ paymentMethodData: unknown }>;
          };
        };
      };
    };
  }
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  available: boolean;
  description: string;
}

interface PaymentResult extends Record<string, unknown> {
  success: boolean;
  transactionId?: string;
  error?: string;
  method?: string;
}

interface MobilePaymentProps {
  amount: number;
  currency?: string;
  onPaymentSuccess?: (paymentData: Record<string, unknown>) => void;
  onPaymentError?: (error: Record<string, unknown>) => void;
  className?: string;
}

export const MobilePayment: React.FC<MobilePaymentProps> = ({
  amount,
  currency = 'CAD',
  onPaymentSuccess,
  onPaymentError,
  className = ''
}) => {
  const { t } = useTranslation();
  const [availablePayments, setAvailablePayments] = useState<PaymentMethod[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const checkPaymentAvailability = useCallback(() => {
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
  }, []);

  useEffect(() => {
    checkPaymentAvailability();
  }, [checkPaymentAvailability]);

  const checkApplePayAvailability = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if Apple Pay is available
    return !!(window.ApplePaySession && 
             window.ApplePaySession.canMakePayments());
  };

  const checkGooglePayAvailability = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if Google Pay is available
    return !!(window.google?.payments?.api);
  };

  const handleApplePay = async () => {
    if (!checkApplePayAvailability()) {
      onPaymentError?.({ message: 'Apple Pay not available' });
      return;
    }

    setIsProcessing(true);
    setSelectedMethod('apple-pay');

    try {
      if (!window.ApplePaySession) {
        throw new Error('Apple Pay is not available');
      }
      
      const paymentRequest: ApplePayPaymentRequest = {
        countryCode: 'CA',
        currencyCode: currency,
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'Purrify',
          amount: amount.toString()
        }
      };

      const session = new window.ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event: ApplePayValidateMerchantEvent) => {
        // In production, validate with your payment processor
        try {
          // Simulate merchant validation
          console.log('Validating merchant:', event.validationURL);
          // In a real app, you would call your backend to validate the merchant
          // const merchantSession = await validateMerchant(event.validationURL);
          // session.completeMerchantValidation(merchantSession);
          // For now, complete with empty object to proceed to payment
          session.completeMerchantValidation({});
        } catch (err) {
          console.error('Merchant validation failed:', err);
          if ('abort' in session) {
            session.abort();
          }
        }
      };

      session.onpaymentauthorized = (event: ApplePayPaymentAuthorizedEvent) => {
        processPayment(event.payment, 'apple-pay')
          .then((result) => {
            session.completePayment(window.ApplePaySession?.STATUS_SUCCESS || 0);
            onPaymentSuccess?.(result);
          })
          .catch((err) => {
            console.error('Payment processing failed:', err);
            session.completePayment(window.ApplePaySession?.STATUS_FAILURE || 1);
            onPaymentError?.({ 
              success: false, 
              message: err instanceof Error ? err.message : 'Payment processing failed' 
            });
          });
      };

      session.oncancel = () => {
        onPaymentError?.({ success: false, message: 'Payment was cancelled' });
      };

      session.begin();
    } catch (err) {
      console.error('Apple Pay error:', err);
      onPaymentError?.(err as Record<string, unknown>);
    } finally {
      setIsProcessing(false);
      setSelectedMethod(null);
    }
  };

  const handleGooglePay = async () => {
    if (!checkGooglePayAvailability()) {
      onPaymentError?.({ success: false, message: 'Google Pay not available' });
      return;
    }

    setIsProcessing(true);
    setSelectedMethod('google-pay');

    try {
      if (!window.google?.payments?.api) {
        throw new Error('Google Pay API not available');
      }

      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: 'TEST' // or 'PRODUCTION'
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId'
              }
            }
          }
        ],
        merchantInfo: {
          merchantId: 'BCR2DN4T7T2W4K2T',
          merchantName: 'Purrify'
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: amount.toString(),
          currencyCode: currency,
          countryCode: 'CA'
        }
      };

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      const result = await processPayment(paymentData, 'google-pay');
      onPaymentSuccess?.(result);
    } catch (err) {
      console.error('Google Pay error:', err);
      onPaymentError?.({
        success: false,
        message: err instanceof Error ? err.message : 'Google Pay processing failed'
      });
    } finally {
      setIsProcessing(false);
      setSelectedMethod(null);
    }
  };

  const processPayment = async (paymentData: ApplePayPayment | unknown, method: string): Promise<PaymentResult> => {
    // Simulate payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate for demo
          resolve({ success: true, transactionId: `test_${Date.now()}`, method, amount, currency } as PaymentResult);
        } else {
          reject(new Error('Payment processing failed'));
        }
      }, 2000);
    });
  };

  const formatAmount = useCallback((amount: number) => formatCurrencyValue(amount), []);

  const handlePaymentMethodSelect = useCallback((paymentId: string) => {
    return () => {
      if (paymentId === 'apple-pay') handleApplePay();
      else if (paymentId === 'google-pay') handleGooglePay();
      // For card payments, you'd typically redirect to a form
    };
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100 mb-2">
          Choose Payment Method
        </h3>
        <div className="text-2xl font-bold text-[#5B2EFF]">
          {formatAmount(amount)}
        </div>
      </div>

      <div className="space-y-3">
        {availablePayments.map((payment) => (
          <div key={payment.id}>
            {payment.available ? (
              <Button
                onClick={handlePaymentMethodSelect(payment.id)}
                disabled={isProcessing}
                className={`w-full p-4 h-auto flex items-center justify-between border-2 transition-all ${
                  selectedMethod === payment.id
                    ? 'border-[#5B2EFF] bg-[#5B2EFF]/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#5B2EFF]/50'
                } ${
                  payment.id === 'apple-pay' 
                    ? 'bg-black hover:bg-gray-800 text-white dark:text-gray-100' 
                    : payment.id === 'google-pay'
                    ? 'bg-[#4285f4] hover:bg-[#3367d6] text-white dark:text-gray-100'
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
                    <div className="font-semibold text-gray-600 dark:text-gray-300 dark:text-gray-400">
                      {payment.name} (Not Available)
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 dark:text-gray-400">
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
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 text-green-800 dark:text-green-200 dark:text-green-200">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">{t.paymentSecurity?.securePayment || 'Secure Payment'}</span>
        </div>
        <p className="text-green-700 dark:text-green-300 dark:text-green-400 text-sm mt-1">
          {t.paymentSecurity?.sslEncryptedCheckout || 'Your payment information is encrypted and secure. We never store your payment details.'}
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
interface ExpressCheckoutButtonsProps {
  amount: number;
  onPaymentSuccess?: (data: PaymentResult) => void;
  className?: string;
}

const ExpressCheckoutButtons: React.FC<ExpressCheckoutButtonsProps> = ({
  amount,
  onPaymentSuccess,
  className = '',
}) => {
  const [showApplePay, setShowApplePay] = useState(false);
  const [showGooglePay, setShowGooglePay] = useState(false);

  const checkApplePayAvailability = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    const applePayWindow = window as unknown as { 
      ApplePaySession?: {
        canMakePayments: () => boolean;
        supportsVersion: (version: number) => boolean;
        STATUS_SUCCESS: number;
        STATUS_FAILURE: number;
        new (version: number, paymentRequest: ApplePayPaymentRequest): unknown;
      } 
    };
    return !!(applePayWindow.ApplePaySession && 
             applePayWindow.ApplePaySession.canMakePayments());
  }, []);

  const checkGooglePayAvailability = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    const googleWindow = window as unknown as { 
      google?: { 
        payments?: { 
          api?: unknown 
        } 
      } 
    };
    return !!(googleWindow.google?.payments?.api);
  }, []);

  useEffect(() => {
    setShowApplePay(checkApplePayAvailability());
    setShowGooglePay(checkGooglePayAvailability());
  }, [checkApplePayAvailability, checkGooglePayAvailability]);

  const handleApplePayExpress = useCallback(() => {
    /* Apple Pay handler */
  }, []);

  const handleGooglePayExpress = useCallback(() => {
    /* Google Pay handler */
  }, []);

  if (!showApplePay && !showGooglePay) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        Express Checkout
      </div>
      
      {showApplePay && (
        <button
          className="w-full bg-black dark:bg-black text-white dark:text-gray-100 rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          onClick={handleApplePayExpress}
        >
          <span>🍎</span>
          <span className="font-semibold">Pay with Apple Pay</span>
        </button>
      )}
      
      {showGooglePay && (
        <button
          className="w-full bg-[#4285f4] text-white dark:text-gray-100 rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-[#3367d6] transition-colors"
          onClick={handleGooglePayExpress}
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

// Export ExpressCheckoutButtons as a named export
export { ExpressCheckoutButtons };

export default MobilePayment;
