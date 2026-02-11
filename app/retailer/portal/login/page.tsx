"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, MapPin, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  taxId: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  billingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  sameAsBilling: boolean;
}

export default function RetailerLoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const canonicalUrl = 'https://www.purrify.ca/retailer/portal/login';

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    taxId: '',
    shippingAddress: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
    },
    billingAddress: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
    },
    sameAsBilling: true,
  });

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('retailerToken');
    if (token) {
      router.push('/retailer/portal/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/retailer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and retailer info
      localStorage.setItem('retailerToken', data.token);
      localStorage.setItem('retailerInfo', JSON.stringify(data.retailer));

      // Redirect to dashboard
      router.push('/retailer/portal/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (registerForm.password !== registerForm.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (registerForm.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      const requestBody = {
        ...registerForm,
        billingAddress: registerForm.sameAsBilling
          ? registerForm.shippingAddress
          : registerForm.billingAddress,
      };

      const response = await fetch('/api/retailer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Registration successful! Your account is pending approval. We will notify you via email once approved.');

      // Clear form
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canadianProvinces = [
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
    { code: 'YT', name: 'Yukon' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="font-heading mt-6 text-3xl font-bold text-gray-900 dark:text-gray-50">
              {isLogin ? 'Retailer Portal Login' : 'Apply for Wholesale Account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {isLogin ? 'Access your wholesale account' : 'Join our network of retail partners'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-4">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                      placeholder="your.email@business.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                  loading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500'
                )}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-100 mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="space-y-6">
                {/* Business Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Business Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Business Name *
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        placeholder="Your Pet Store Inc."
                        value={registerForm.businessName}
                        onChange={(e) => setRegisterForm({ ...registerForm, businessName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Contact Name *
                        </label>
                        <input
                          id="contactName"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="John Doe"
                          value={registerForm.contactName}
                          onChange={(e) => setRegisterForm({ ...registerForm, contactName: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="(555) 123-4567"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="contact@business.com"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Business Tax ID (Optional)
                        </label>
                        <input
                          id="taxId"
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="GST/HST Number"
                          value={registerForm.taxId}
                          onChange={(e) => setRegisterForm({ ...registerForm, taxId: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Street Address *
                      </label>
                      <input
                        id="street"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        placeholder="123 Main Street"
                        value={registerForm.shippingAddress.street}
                        onChange={(e) => setRegisterForm({
                          ...registerForm,
                          shippingAddress: { ...registerForm.shippingAddress, street: e.target.value },
                        })}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City *
                        </label>
                        <input
                          id="city"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="Toronto"
                          value={registerForm.shippingAddress.city}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            shippingAddress: { ...registerForm.shippingAddress, city: e.target.value },
                          })}
                        />
                      </div>

                      <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Province *
                        </label>
                        <select
                          id="province"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          value={registerForm.shippingAddress.province}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            shippingAddress: { ...registerForm.shippingAddress, province: e.target.value },
                          })}
                        >
                          <option value="">Select</option>
                          {canadianProvinces.map((prov) => (
                            <option key={prov.code} value={prov.code}>
                              {prov.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Postal Code *
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="M5V 3A8"
                          value={registerForm.shippingAddress.postalCode}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            shippingAddress: { ...registerForm.shippingAddress, postalCode: e.target.value },
                          })}
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="sameAsBilling"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                        checked={registerForm.sameAsBilling}
                        onChange={(e) => setRegisterForm({ ...registerForm, sameAsBilling: e.target.checked })}
                      />
                      <label htmlFor="sameAsBilling" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Billing address same as shipping address
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Account Security</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="Min. 8 characters"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder="Repeat password"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                  loading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500'
                )}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-100 mr-2"></div>
                    Submitting application...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          )}

          {/* Toggle between login and register */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {isLogin
                ? "Don't have an account? Apply for wholesale access"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
