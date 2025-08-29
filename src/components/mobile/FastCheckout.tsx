import React, { useState, useEffect } from 'react';
import { User, MapPin, CreditCard, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { ExpressCheckoutButtons } from './MobilePayment';

interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone?: string;
}

interface FastCheckoutProps {
  cartTotal: number;
  onCheckoutComplete?: (data: CheckoutData) => void;
  className?: string;
}

const CANADIAN_PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'YT', name: 'Yukon' }
];

export const FastCheckout: React.FC<FastCheckoutProps> = ({
  cartTotal,
  onCheckoutComplete,
  className = ''
}) => {
  const [formData, setFormData] = useState<CheckoutData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'contact' | 'shipping' | 'review'>('contact');
  const [useAutofill, setUseAutofill] = useState(false);

  // Auto-fill detection and setup
  useEffect(() => {
    detectAutofillCapability();
    loadSavedData();
  }, []);

  const detectAutofillCapability = () => {
    // Check if browser supports autofill
    if ('credentials' in navigator) {
      setUseAutofill(true);
    }
  };

  const loadSavedData = () => {
    // Load previously saved checkout data from localStorage
    try {
      const saved = localStorage.getItem('purrify_checkout_data');
      if (saved) {
        const data = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveData = (data: Partial<CheckoutData>) => {
    // Save non-sensitive data to localStorage for future use
    try {
      const dataToSave = {
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        province: data.province
      };
      localStorage.setItem('purrify_checkout_data', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Auto-save non-sensitive data
    if (['firstName', 'lastName', 'city', 'province'].includes(field)) {
      saveData({ ...formData, [field]: value });
    }
  };

  const validateStep = (currentStep: string): boolean => {
    const newErrors: Partial<CheckoutData> = {};

    if (currentStep === 'contact') {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }

    if (currentStep === 'shipping') {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.province) newErrors.province = 'Province is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
      else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.postalCode)) {
        newErrors.postalCode = 'Invalid Canadian postal code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 'contact') setStep('shipping');
      else if (step === 'shipping') setStep('review');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('review')) return;

    setIsSubmitting(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onCheckoutComplete?.(formData);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPostalCode = (value: string) => {
    // Auto-format Canadian postal codes
    const cleaned = value.replace(/\s/g, '').toUpperCase();
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
    }
    return cleaned;
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {['contact', 'shipping', 'review'].map((stepName, index) => (
        <div key={stepName} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === stepName 
              ? 'bg-[#5B2EFF] text-white dark:text-gray-100' 
              : index < ['contact', 'shipping', 'review'].indexOf(step)
              ? 'bg-green-500 text-white dark:text-gray-100'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {index < ['contact', 'shipping', 'review'].indexOf(step) ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              index + 1
            )}
          </div>
          {index < 2 && (
            <div className={`w-8 h-0.5 mx-2 ${
              index < ['contact', 'shipping', 'review'].indexOf(step)
                ? 'bg-green-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Express Checkout Options */}
      <ExpressCheckoutButtons 
        amount={cartTotal}
        className="mb-6"
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <StepIndicator />

        {/* Contact Information Step */}
        {step === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-[#5B2EFF]" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Contact Information
              </h3>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                autoComplete="email"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  autoComplete="given-name"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                />
                {errors.firstName && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  autoComplete="family-name"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                />
                {errors.lastName && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                autoComplete="tel"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <Button onClick={handleNext} className="w-full bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100">
              Continue to Shipping
            </Button>
          </div>
        )}

        {/* Shipping Information Step */}
        {step === 'shipping' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-[#5B2EFF]" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Shipping Address
              </h3>
            </div>

            <div>
              <input
                type="text"
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                autoComplete="street-address"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {errors.address && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  autoComplete="address-level2"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                />
                {errors.city && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <select
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  autoComplete="address-level1"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                    errors.province ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                >
                  <option value="">Province</option>
                  {CANADIAN_PROVINCES.map(province => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.province}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Postal Code (A1A 1A1)"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', formatPostalCode(e.target.value))}
                autoComplete="postal-code"
                maxLength={7}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#5B2EFF] focus:border-transparent ${
                  errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {errors.postalCode && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.postalCode}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => setStep('contact')} 
                variant="outline" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="flex-1 bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100"
              >
                Review Order
              </Button>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-[#5B2EFF]" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Review & Complete
              </h3>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                <span className="font-medium text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)} CAD</span>
              </div>
            </div>

            {/* Contact & Shipping Summary */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">Contact:</span>
                <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">Ship to:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}<br />
                  {formData.city}, {formData.province} {formData.postalCode}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => setStep('shipping')} 
                variant="outline" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white dark:text-gray-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  'Complete Order'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FastCheckout;
