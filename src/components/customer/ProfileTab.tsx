import { useState, useCallback } from 'react';
import { formatCurrencyValue } from '@/lib/pricing';
import type { Customer } from './customer-portal-types';

// ============================================================================
// Types
// ============================================================================

interface ProfileTabProps {
  customer: Customer;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AddressData {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const INITIAL_PASSWORD_DATA: PasswordData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const INITIAL_PREFERENCES: NotificationPreferences = {
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
  orderUpdates: true
};

const CANADIAN_PROVINCES = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'YT', label: 'Yukon' },
] as const;

const COUNTRIES = [
  { value: 'Canada', label: 'Canada' },
  { value: 'United States', label: 'United States' },
] as const;

const INPUT_CLASSES = 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50';

// ============================================================================
// Subcomponents
// ============================================================================

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  description: string;
}

function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50">{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
}


// ============================================================================
// Main Component
// ============================================================================

export function ProfileTab({ customer }: ProfileTabProps) {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone || ''
  });
  const [addressData, setAddressData] = useState<AddressData>({
    street: customer.address.street,
    city: customer.address.city,
    province: customer.address.province,
    postalCode: customer.address.postalCode,
    country: customer.address.country
  });
  const [passwordData, setPasswordData] = useState<PasswordData>(INITIAL_PASSWORD_DATA);
  const [preferences, setPreferences] = useState<NotificationPreferences>(INITIAL_PREFERENCES);
  const [loading, setLoading] = useState(false);

  const handleProfileFieldChange = useCallback((field: keyof typeof profileData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfileData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handleAddressFieldChange = useCallback((field: keyof typeof addressData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAddressData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handlePasswordFieldChange = useCallback((field: keyof typeof passwordData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handlePreferencesChange = useCallback((key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      handlePreferencesUpdate(key, e.target.checked);
    };
  }, []);

  const handleEditProfile = useCallback(() => {
    setEditingProfile(true);
  }, []);

  const handleCancelProfileEdit = useCallback(() => {
    setEditingProfile(false);
    setProfileData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || ''
    });
  }, [customer]);

  const handleEditAddress = useCallback(() => {
    setEditingAddress(true);
  }, []);

  const handleCancelAddressEdit = useCallback(() => {
    setEditingAddress(false);
    setAddressData({
      street: customer.address.street,
      city: customer.address.city,
      province: customer.address.province,
      postalCode: customer.address.postalCode,
      country: customer.address.country
    });
  }, [customer]);

  const handleShowPasswordForm = useCallback(() => {
    setShowPasswordForm(true);
  }, []);

  const handleCancelPasswordForm = useCallback(() => {
    setShowPasswordForm(false);
    setPasswordData(INITIAL_PASSWORD_DATA);
  }, []);

  const handleProfileSave = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditingProfile(false);

      if (typeof globalThis.window !== 'undefined' && window.gtag) {
        window.gtag('event', 'profile_updated', {
          event_category: 'account',
          event_label: 'profile_information'
        });
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddressSave = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditingAddress(false);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePasswordChange = useCallback(async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowPasswordForm(false);
      setPasswordData(INITIAL_PASSWORD_DATA);
      alert('Password updated successfully');
    } catch {
      alert('Failed to change password');
    } finally {
      setLoading(false);
    }
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  const handlePreferencesUpdate = async (key: string, value: boolean) => {
    try {
      setPreferences(prev => ({ ...prev, [key]: value }));
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch {
      // Silently fail
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50">Personal Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={handleProfileFieldChange('firstName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingProfile}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={handleProfileFieldChange('lastName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingProfile}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={handleProfileFieldChange('email')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                disabled={!editingProfile}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={handleProfileFieldChange('phone')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                disabled={!editingProfile}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex gap-3">
              {editingProfile ? (
                <>
                  <button
                    onClick={handleProfileSave}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancelProfileEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50">Shipping Address</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={addressData.street}
                onChange={handleAddressFieldChange('street')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                disabled={!editingAddress}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={addressData.city}
                  onChange={handleAddressFieldChange('city')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingAddress}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Province
                </label>
                <select
                  value={addressData.province}
                  onChange={handleAddressFieldChange('province')}
                  className={INPUT_CLASSES}
                  disabled={!editingAddress}
                >
                  {CANADIAN_PROVINCES.map(province => (
                    <option key={province.value} value={province.value}>{province.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={addressData.postalCode}
                  onChange={handleAddressFieldChange('postalCode')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 disabled:opacity-50"
                  disabled={!editingAddress}
                  placeholder="A1A 1A1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <select
                  value={addressData.country}
                  onChange={handleAddressFieldChange('country')}
                  className={INPUT_CLASSES}
                  disabled={!editingAddress}
                >
                  {COUNTRIES.map(country => (
                    <option key={country.value} value={country.value}>{country.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              {editingAddress ? (
                <>
                  <button
                    onClick={handleAddressSave}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Address'}
                  </button>
                  <button
                    onClick={handleCancelAddressEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditAddress}
                  className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                >
                  Edit Address
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50">Security Settings</h3>
          </div>
          <div className="p-6">
            {!showPasswordForm ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                  </div>
                  <button
                    onClick={handleShowPasswordForm}
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordFieldChange('currentPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordFieldChange('newPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordFieldChange('confirmPassword')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePasswordChange}
                    disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex-1 px-4 py-2 bg-green-600 text-white dark:text-gray-100 font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    onClick={handleCancelPasswordForm}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notification Preferences */}
        <FormSection title="Notification Preferences">
          <ToggleSwitch
            checked={preferences.emailNotifications}
            onChange={handlePreferencesChange('emailNotifications')}
            label="Email Notifications"
            description="Receive updates via email"
          />
          <ToggleSwitch
            checked={preferences.smsNotifications}
            onChange={handlePreferencesChange('smsNotifications')}
            label="SMS Notifications"
            description="Receive updates via text message"
          />
          <ToggleSwitch
            checked={preferences.marketingEmails}
            onChange={handlePreferencesChange('marketingEmails')}
            label="Marketing Emails"
            description="Receive promotional offers and news"
          />
          <ToggleSwitch
            checked={preferences.orderUpdates}
            onChange={handlePreferencesChange('orderUpdates')}
            label="Order Updates"
            description="Receive order and delivery notifications"
          />
        </FormSection>
      </div>

      {/* Account Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-heading text-lg font-medium text-gray-900 dark:text-gray-50">Account Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{customer.totalOrders}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrencyValue(customer.totalSpent)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {customer.memberSince ? new Date(customer.memberSince).getFullYear() : new Date().getFullYear()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
