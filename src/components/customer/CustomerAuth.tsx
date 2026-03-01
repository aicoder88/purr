import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface CustomerAuthProps {
  onLogin: (customer: { id: string; email: string }) => void;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

// ============================================================================
// Constants
// ============================================================================

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
  { code: 'YT', name: 'Yukon' },
] as const;

// ============================================================================
// Component
// ============================================================================

export function CustomerAuth({ onLogin }: CustomerAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: ''
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock authentication - replace with actual API call
      if (loginForm.email && loginForm.password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful login
        onLogin({
          id: 'customer_' + Date.now(),
          email: loginForm.email
        });
      } else {
        setError('Please fill in all fields');
      }
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (registerForm.password !== registerForm.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (registerForm.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Mock registration - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful registration
      onLogin({
        id: 'customer_' + Date.now(),
        email: registerForm.email
      });
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading mt-6 text-3xl font-bold text-gray-900 text-gray-50">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-gray-300">
            {isLogin ? 'Access your orders and subscriptions' : 'Join thousands of satisfied customers'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 bg-red-900/20 border border-red-200 border-red-700 rounded-md p-4">
            <p className="text-sm text-red-600 text-red-400">{error}</p>
          </div>
        )}

        {/* Test Login Information */}
        {isLogin && (
          <div className="bg-blue-50 bg-blue-900/20 border border-blue-200 border-blue-700 rounded-md p-4">
            <h4 className="text-sm font-medium text-blue-700 text-blue-300 mb-2">🧪 Demo Portal Access</h4>
            <p className="text-xs text-blue-600 text-blue-400 mb-2">
              This is a demonstration portal. Use any email and password to access the customer portal and explore all features.
            </p>
            <div className="text-xs text-blue-500 text-blue-400">
              <strong>Quick test:</strong> Try "test@example.com" with any password
            </div>
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white bg-gray-700"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white bg-gray-700"
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
                      <EyeOff className="h-5 w-5 text-gray-400 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 text-blue-400 focus:ring-blue-500 border-gray-300 border-gray-600 rounded bg-white bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 text-gray-300">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-blue-600 text-blue-400 hover:text-blue-500 hover:text-blue-300"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                loading
                  ? 'bg-gray-400 bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 bg-blue-600 hover:bg-blue-700 hover:bg-blue-700'
              )}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white border-gray-600 mr-2"></div>
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
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 text-gray-500" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                      placeholder="First name"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                    placeholder="Last name"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                    placeholder="Enter your email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 text-gray-500" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                    placeholder="(555) 123-4567"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-4 border-t border-gray-200 border-gray-600">
                <h4 className="text-sm font-medium text-gray-900 text-gray-50 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Shipping Address
                </h4>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                      Street Address
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                      placeholder="123 Main Street"
                      value={registerForm.address.street}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        address: { ...registerForm.address, street: e.target.value }
                      })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                        placeholder="Toronto"
                        value={registerForm.address.city}
                        onChange={(e) => setRegisterForm({
                          ...registerForm,
                          address: { ...registerForm.address, city: e.target.value }
                        })}
                      />
                    </div>

                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                        Province
                      </label>
                      <select
                        id="province"
                        name="province"
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 border-gray-600 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                        value={registerForm.address.province}
                        onChange={(e) => setRegisterForm({
                          ...registerForm,
                          address: { ...registerForm.address, province: e.target.value }
                        })}
                      >
                        <option value="">Select Province</option>
                        {CANADIAN_PROVINCES.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                      placeholder="M5V 3A8"
                      value={registerForm.address.postalCode}
                      onChange={(e) => setRegisterForm({
                        ...registerForm,
                        address: { ...registerForm.address, postalCode: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="pt-4 border-t border-gray-200 border-gray-600">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 text-gray-500" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                        placeholder="Enter your password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 text-gray-500" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 border-gray-600 placeholder-gray-500 placeholder-gray-400 text-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white bg-gray-700"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 text-gray-500" />
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
                'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                loading
                  ? 'bg-gray-400 bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 bg-blue-600 hover:bg-blue-700 hover:bg-blue-700'
              )}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white border-gray-600 mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
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
            }}
            className="text-sm text-blue-600 text-blue-400 hover:text-blue-500 hover:text-blue-300"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </div>
    </div>
  );
}