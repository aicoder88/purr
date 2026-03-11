"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMessages } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, MapPin, Building2 } from 'lucide-react';
import { getSession, signIn } from '@/lib/auth/client';
import { cn } from '@/lib/utils';
import { en as englishMessages } from '@/translations/en';
import type { TranslationType } from '@/translations/types';

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

interface RetailerPortalLoginCopy {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  showPassword: string;
  hidePassword: string;
  signIn: string;
  signingIn: string;
  forgotPassword: string;
  toggleApply: string;
  toggleSignIn: string;
  register: {
    title: string;
    subtitle: string;
    businessSectionTitle: string;
    shippingSectionTitle: string;
    securitySectionTitle: string;
    businessNameLabel: string;
    businessNamePlaceholder: string;
    contactNameLabel: string;
    contactNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    taxIdLabel: string;
    taxIdPlaceholder: string;
    streetLabel: string;
    streetPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    provinceLabel: string;
    provincePlaceholder: string;
    postalCodeLabel: string;
    postalCodePlaceholder: string;
    sameAsBilling: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    provinces: Record<string, string>;
    validation: {
      passwordMismatch: string;
    };
  };
  errors: {
    invalidCredentials: string;
    loginFailed: string;
    registrationFailed: string;
    pending: string;
    rejected: string;
    sessionExpired: string;
    suspended: string;
    unauthorized: string;
  };
}

const INITIAL_REGISTER_FORM: RegisterForm = {
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
};

function resolveLoginErrorMessage(
  errorCode: string | null | undefined,
  copy: RetailerPortalLoginCopy
) {
  switch (errorCode) {
    case 'retailer_pending':
      return copy.errors.pending;
    case 'retailer_rejected':
      return copy.errors.rejected;
    case 'retailer_session_expired':
      return copy.errors.sessionExpired;
    case 'retailer_suspended':
      return copy.errors.suspended;
    case 'retailer_unauthorized':
      return copy.errors.unauthorized;
    default:
      return '';
  }
}

export default function RetailerLoginPage() {
  const messages = useMessages() as TranslationType;
  const router = useRouter();
  const searchParams = useSearchParams();
  const copy = (
    messages.retailers?.portal?.loginPage
    ?? englishMessages.retailers.portal.loginPage
  ) as RetailerPortalLoginCopy;
  const registerCopy = copy.register;
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>(INITIAL_REGISTER_FORM);

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.user?.role === 'retailer') {
        router.push('/retailer/portal/dashboard');
      }
    };

    void checkSession();
  }, [router]);

  useEffect(() => {
    const queryError = searchParams.get('error');
    const queryErrorMessage = resolveLoginErrorMessage(queryError, copy);

    if (queryErrorMessage) {
      setError(queryErrorMessage);
    }
  }, [copy, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('retailer-credentials', {
        email: loginForm.email.trim().toLowerCase(),
        password: loginForm.password,
        redirect: false,
        callbackUrl: '/retailer/portal/dashboard',
      });

      if (result?.error) {
        const mappedError = resolveLoginErrorMessage(result.code, copy);
        if (mappedError) {
          setError(mappedError);
        } else if (result.status === 401) {
          setError(copy.errors.invalidCredentials);
        } else {
          setError(copy.errors.loginFailed);
        }

        return;
      }

      router.push('/retailer/portal/dashboard');
    } catch {
      setError(copy.errors.loginFailed);
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
        throw new Error(registerCopy.validation.passwordMismatch);
      }

      const requestBody = {
        ...registerForm,
        billingAddress: registerForm.sameAsBilling
          ? registerForm.shippingAddress
          : registerForm.billingAddress,
      };

      const response = await fetch('/api/auth/retailer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json() as {
        message?: string;
        errors?: string[];
      };

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors.join(' ')
            : data.message || copy.errors.registrationFailed
        );
      }

      setSuccess(registerCopy.success);
      setRegisterForm(INITIAL_REGISTER_FORM);
      setShowPassword(false);
      setShowConfirmPassword(false);

      // Clear form
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errors.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  const canadianProvinces = [
    { code: 'AB', name: registerCopy.provinces.AB },
    { code: 'BC', name: registerCopy.provinces.BC },
    { code: 'MB', name: registerCopy.provinces.MB },
    { code: 'NB', name: registerCopy.provinces.NB },
    { code: 'NL', name: registerCopy.provinces.NL },
    { code: 'NS', name: registerCopy.provinces.NS },
    { code: 'ON', name: registerCopy.provinces.ON },
    { code: 'PE', name: registerCopy.provinces.PE },
    { code: 'QC', name: registerCopy.provinces.QC },
    { code: 'SK', name: registerCopy.provinces.SK },
    { code: 'NT', name: registerCopy.provinces.NT },
    { code: 'NU', name: registerCopy.provinces.NU },
    { code: 'YT', name: registerCopy.provinces.YT },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="font-heading mt-6 text-3xl font-bold text-gray-900 dark:text-gray-50">
              {isLogin ? copy.title : registerCopy.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {isLogin ? copy.subtitle : registerCopy.subtitle}
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
                    {copy.emailLabel}
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
                      placeholder={copy.emailPlaceholder}
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {copy.passwordLabel}
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
                      placeholder={copy.passwordPlaceholder}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? copy.hidePassword : copy.showPassword}
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

              <div className="flex justify-end">
                <Link
                  href="/forgot-password?portal=retailer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  {copy.forgotPassword}
                </Link>
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
                    {copy.signingIn}
                  </div>
                ) : (
                  copy.signIn
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="space-y-6">
                {/* Business Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">{registerCopy.businessSectionTitle}</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {registerCopy.businessNameLabel} *
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        placeholder={registerCopy.businessNamePlaceholder}
                        value={registerForm.businessName}
                        onChange={(e) => setRegisterForm({ ...registerForm, businessName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {registerCopy.contactNameLabel} *
                        </label>
                        <input
                          id="contactName"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.contactNamePlaceholder}
                          value={registerForm.contactName}
                          onChange={(e) => setRegisterForm({ ...registerForm, contactName: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {registerCopy.phoneLabel} *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.phonePlaceholder}
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {registerCopy.emailLabel} *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.emailPlaceholder}
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {registerCopy.taxIdLabel}
                        </label>
                        <input
                          id="taxId"
                          type="text"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.taxIdPlaceholder}
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
                    {registerCopy.shippingSectionTitle}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {registerCopy.streetLabel} *
                      </label>
                      <input
                        id="street"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        placeholder={registerCopy.streetPlaceholder}
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
                          {registerCopy.cityLabel} *
                        </label>
                        <input
                          id="city"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.cityPlaceholder}
                          value={registerForm.shippingAddress.city}
                          onChange={(e) => setRegisterForm({
                            ...registerForm,
                            shippingAddress: { ...registerForm.shippingAddress, city: e.target.value },
                          })}
                        />
                      </div>

                      <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {registerCopy.provinceLabel} *
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
                          <option value="">{registerCopy.provincePlaceholder}</option>
                          {canadianProvinces.map((prov) => (
                            <option key={prov.code} value={prov.code}>
                              {prov.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {registerCopy.postalCodeLabel} *
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.postalCodePlaceholder}
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
                        {registerCopy.sameAsBilling}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">{registerCopy.securitySectionTitle}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {registerCopy.passwordLabel} *
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.passwordPlaceholder}
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? copy.hidePassword : copy.showPassword}
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
                        {registerCopy.confirmPasswordLabel} *
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                          placeholder={registerCopy.confirmPasswordPlaceholder}
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          aria-label={showConfirmPassword ? copy.hidePassword : copy.showPassword}
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
                    {registerCopy.submitting}
                  </div>
                ) : (
                  registerCopy.submit
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
                ? copy.toggleApply
                : copy.toggleSignIn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
