export const APP_ROLES = {
  customer: 'customer',
  retailer: 'retailer',
  admin: 'admin',
  editor: 'editor',
  affiliate: 'affiliate',
} as const;

export type AppRole = (typeof APP_ROLES)[keyof typeof APP_ROLES];

export type UserRoleRecord = 'CUSTOMER' | 'ADMIN' | 'EDITOR';

export const ADMIN_SESSION_ROLES: AppRole[] = [APP_ROLES.admin, APP_ROLES.editor];

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function roleFromUserRecord(role: string | null | undefined): AppRole {
  switch (role) {
    case 'ADMIN':
      return APP_ROLES.admin;
    case 'EDITOR':
      return APP_ROLES.editor;
    default:
      return APP_ROLES.customer;
  }
}

export function roleToUserRecord(role: AppRole): UserRoleRecord {
  switch (role) {
    case APP_ROLES.admin:
      return 'ADMIN';
    case APP_ROLES.editor:
      return 'EDITOR';
    default:
      return 'CUSTOMER';
  }
}

export function getDefaultRedirectForRole(role: AppRole): string {
  switch (role) {
    case APP_ROLES.admin:
    case APP_ROLES.editor:
      return '/admin/blog';
    case APP_ROLES.retailer:
      return '/retailer/portal/dashboard';
    case APP_ROLES.affiliate:
      return '/affiliate/dashboard';
    default:
      return '/customer/portal';
  }
}

export function isAdminSessionRole(role: string | null | undefined): boolean {
  return ADMIN_SESSION_ROLES.includes((role ?? '') as AppRole);
}
