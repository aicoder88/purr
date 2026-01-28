/**
 * Zendesk API Client for Purrify
 *
 * Provides ticket creation, user management, and Help Center integration.
 * Uses Zendesk REST API v2.
 *
 * @see https://developer.zendesk.com/api-reference/
 */

import * as Sentry from '@sentry/nextjs';

// Zendesk Configuration
const ZENDESK_CONFIG = {
  subdomain: (process.env.ZENDESK_SUBDOMAIN || 'purrifyca').trim(),
  email: (process.env.ZENDESK_EMAIL || 'hello@purrify.ca').trim(),
  apiToken: (process.env.ZENDESK_API_TOKEN || '').trim(),
  baseUrl: `https://${(process.env.ZENDESK_SUBDOMAIN || 'purrifyca').trim()}.zendesk.com/api/v2`,
};

// Check if Zendesk is properly configured
export function isZendeskConfigured(): boolean {
  return !!(
    ZENDESK_CONFIG.subdomain &&
    ZENDESK_CONFIG.email &&
    ZENDESK_CONFIG.apiToken
  );
}

// Base64 encode credentials for Basic Auth
function getAuthHeader(): string {
  const credentials = `${ZENDESK_CONFIG.email}/token:${ZENDESK_CONFIG.apiToken}`;
  return `Basic ${Buffer.from(credentials).toString('base64')}`;
}

// Common fetch wrapper with error handling
async function zendeskFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${ZENDESK_CONFIG.baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(`Zendesk API Error: ${response.status} - ${errorText}`);
    Sentry.captureException(error, {
      extra: {
        endpoint,
        status: response.status,
        errorText,
      },
    });
    throw error;
  }

  return response.json();
}

// ============================================================================
// TICKET TYPES
// ============================================================================

export type TicketPriority = 'urgent' | 'high' | 'normal' | 'low';
export type TicketType = 'problem' | 'incident' | 'question' | 'task';
export type TicketStatus = 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';

export interface ZendeskTicketComment {
  body: string;
  html_body?: string;
  public?: boolean;
  author_id?: number;
}

export interface ZendeskTicketCustomField {
  id: number;
  value: string | number | boolean | string[];
}

export interface ZendeskTicketCreate {
  subject: string;
  comment: ZendeskTicketComment;
  requester?: {
    name: string;
    email: string;
    locale_id?: number;
  };
  priority?: TicketPriority;
  type?: TicketType;
  status?: TicketStatus;
  tags?: string[];
  custom_fields?: ZendeskTicketCustomField[];
  group_id?: number;
  assignee_id?: number;
  ticket_form_id?: number;
  brand_id?: number;
}

export interface ZendeskTicket {
  id: number;
  url: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  requester_id: number;
  submitter_id: number;
  assignee_id: number | null;
  organization_id: number | null;
  group_id: number | null;
  tags: string[];
  custom_fields: ZendeskTicketCustomField[];
  created_at: string;
  updated_at: string;
}

export interface ZendeskTicketResponse {
  ticket: ZendeskTicket;
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface ZendeskUser {
  id: number;
  url: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  time_zone: string;
  locale: string;
  locale_id: number;
  organization_id: number | null;
  role: 'end-user' | 'agent' | 'admin';
  verified: boolean;
  active: boolean;
  tags: string[];
  user_fields: Record<string, string | number | boolean>;
}

export interface ZendeskUserCreate {
  name: string;
  email: string;
  phone?: string;
  locale?: string;
  time_zone?: string;
  tags?: string[];
  user_fields?: Record<string, string | number | boolean>;
}

// ============================================================================
// CUSTOM FIELD IDS (Configure after Zendesk setup)
// ============================================================================

// These IDs will be populated after creating custom fields in Zendesk
export const ZENDESK_CUSTOM_FIELDS = {
  ORDER_NUMBER: 0, // Will be set after creation
  PRODUCT_PURCHASED: 0,
  CUSTOMER_TYPE: 0,
  INQUIRY_TYPE: 0,
  LANGUAGE_PREFERENCE: 0,
  PROVINCE_STATE: 0,
};

// Inquiry types for categorization
export const INQUIRY_TYPES = {
  PRE_SALE: 'pre_sale',
  ORDER_STATUS: 'order_status',
  PRODUCT_USAGE: 'product_usage',
  RETURNS_REFUNDS: 'returns_refunds',
  WHOLESALE: 'wholesale',
  TECHNICAL: 'technical',
  FEEDBACK: 'feedback',
} as const;

// Customer types
export const CUSTOMER_TYPES = {
  CONSUMER: 'consumer_b2c',
  RETAILER: 'retailer_b2b',
  AFFILIATE: 'affiliate',
  LEAD: 'lead',
} as const;

// Product options
export const PRODUCT_OPTIONS = {
  TRIAL_12G: 'trial_12g',
  STANDARD_50G: 'standard_50g',
  FAMILY_120G: 'family_120g',
  JUMBO_240G: 'jumbo_240g',
  AUTOSHIP: 'autoship',
  WHOLESALE: 'wholesale',
} as const;

// ============================================================================
// TICKET OPERATIONS
// ============================================================================

/**
 * Create a new support ticket in Zendesk
 */
export async function createTicket(
  ticket: ZendeskTicketCreate
): Promise<ZendeskTicketResponse> {
  if (!isZendeskConfigured()) {
    throw new Error('Zendesk is not properly configured');
  }

  return zendeskFetch<ZendeskTicketResponse>('/tickets.json', {
    method: 'POST',
    body: JSON.stringify({ ticket }),
  });
}

/**
 * Get a ticket by ID
 */
export async function getTicket(ticketId: number): Promise<ZendeskTicketResponse> {
  return zendeskFetch<ZendeskTicketResponse>(`/tickets/${ticketId}.json`);
}

/**
 * Update an existing ticket
 */
export async function updateTicket(
  ticketId: number,
  updates: Partial<ZendeskTicketCreate>
): Promise<ZendeskTicketResponse> {
  return zendeskFetch<ZendeskTicketResponse>(`/tickets/${ticketId}.json`, {
    method: 'PUT',
    body: JSON.stringify({ ticket: updates }),
  });
}

/**
 * Add a comment to an existing ticket
 */
export async function addTicketComment(
  ticketId: number,
  comment: ZendeskTicketComment
): Promise<ZendeskTicketResponse> {
  return zendeskFetch<ZendeskTicketResponse>(`/tickets/${ticketId}.json`, {
    method: 'PUT',
    body: JSON.stringify({
      ticket: {
        comment,
      },
    }),
  });
}

// ============================================================================
// USER OPERATIONS
// ============================================================================

/**
 * Create or update a user in Zendesk
 * Uses the create_or_update endpoint which matches by email
 */
export async function createOrUpdateUser(
  user: ZendeskUserCreate
): Promise<{ user: ZendeskUser }> {
  return zendeskFetch<{ user: ZendeskUser }>('/users/create_or_update.json', {
    method: 'POST',
    body: JSON.stringify({ user }),
  });
}

/**
 * Search for users by email
 */
export async function searchUserByEmail(
  email: string
): Promise<{ users: ZendeskUser[] }> {
  const encodedEmail = encodeURIComponent(email);
  return zendeskFetch<{ users: ZendeskUser[] }>(
    `/users/search.json?query=email:${encodedEmail}`
  );
}

// ============================================================================
// CONVENIENCE FUNCTIONS FOR PURRIFY
// ============================================================================

/**
 * Create a general contact form ticket
 */
export async function createContactTicket(params: {
  name: string;
  email: string;
  message: string;
  locale?: string;
  orderNumber?: string;
  product?: string;
}): Promise<ZendeskTicketResponse> {
  const { name, email, message, locale, orderNumber, product } = params;

  // Determine language tag based on locale
  const languageTag = locale === 'fr' ? 'french' : locale === 'zh' ? 'chinese' : 'english';

  // Build tags array
  const tags = ['contact-form', 'website', languageTag];
  if (orderNumber) tags.push('has-order');
  if (product) tags.push(`product-${product.toLowerCase().replace(/\s+/g, '-')}`);

  // Build custom fields (will be populated after field IDs are known)
  const custom_fields: ZendeskTicketCustomField[] = [];

  // Add order number if provided and field ID is configured
  if (orderNumber && ZENDESK_CUSTOM_FIELDS.ORDER_NUMBER > 0) {
    custom_fields.push({
      id: ZENDESK_CUSTOM_FIELDS.ORDER_NUMBER,
      value: orderNumber,
    });
  }

  // Add customer type
  if (ZENDESK_CUSTOM_FIELDS.CUSTOMER_TYPE > 0) {
    custom_fields.push({
      id: ZENDESK_CUSTOM_FIELDS.CUSTOMER_TYPE,
      value: CUSTOMER_TYPES.CONSUMER,
    });
  }

  return createTicket({
    subject: `Contact Form: ${name}`,
    comment: {
      body: message,
      html_body: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Contact Form Submission</h3>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
          ${product ? `<p><strong>Product:</strong> ${product}</p>` : ''}
          <hr/>
          <h4>Message:</h4>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    },
    requester: {
      name,
      email,
    },
    priority: 'normal',
    type: 'question',
    tags,
    custom_fields: custom_fields.length > 0 ? custom_fields : undefined,
  });
}

/**
 * Create a B2B/Wholesale inquiry ticket
 */
export async function createB2BTicket(params: {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  businessType: string;
  location?: string;
  catCount?: number;
  message: string;
  locale?: string;
}): Promise<ZendeskTicketResponse> {
  const {
    businessName,
    contactName,
    email,
    phone,
    businessType,
    location,
    catCount,
    message,
    locale,
  } = params;

  // Determine language tag
  const languageTag = locale === 'fr' ? 'french' : locale === 'zh' ? 'chinese' : 'english';

  // Build tags
  const tags = [
    'b2b',
    'wholesale-inquiry',
    `business-type-${businessType.toLowerCase().replace(/\s+/g, '-')}`,
    languageTag,
  ];

  // Build custom fields
  const custom_fields: ZendeskTicketCustomField[] = [];

  if (ZENDESK_CUSTOM_FIELDS.CUSTOMER_TYPE > 0) {
    custom_fields.push({
      id: ZENDESK_CUSTOM_FIELDS.CUSTOMER_TYPE,
      value: CUSTOMER_TYPES.LEAD,
    });
  }

  if (ZENDESK_CUSTOM_FIELDS.INQUIRY_TYPE > 0) {
    custom_fields.push({
      id: ZENDESK_CUSTOM_FIELDS.INQUIRY_TYPE,
      value: INQUIRY_TYPES.WHOLESALE,
    });
  }

  return createTicket({
    subject: `B2B Inquiry: ${businessName} (${businessType})`,
    comment: {
      html_body: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New B2B/Wholesale Inquiry</h3>

          <h4>Business Information</h4>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 5px;"><strong>Business Name:</strong></td><td style="padding: 5px;">${businessName}</td></tr>
            <tr><td style="padding: 5px;"><strong>Contact Name:</strong></td><td style="padding: 5px;">${contactName}</td></tr>
            <tr><td style="padding: 5px;"><strong>Email:</strong></td><td style="padding: 5px;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 5px;"><strong>Phone:</strong></td><td style="padding: 5px;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 5px;"><strong>Business Type:</strong></td><td style="padding: 5px;">${businessType}</td></tr>
            ${location ? `<tr><td style="padding: 5px;"><strong>Location:</strong></td><td style="padding: 5px;">${location}</td></tr>` : ''}
            ${catCount ? `<tr><td style="padding: 5px;"><strong>Number of Cats:</strong></td><td style="padding: 5px;">${catCount}</td></tr>` : ''}
          </table>

          <hr/>

          <h4>Message:</h4>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
      body: `
B2B/Wholesale Inquiry

Business: ${businessName}
Contact: ${contactName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Type: ${businessType}
${location ? `Location: ${location}` : ''}
${catCount ? `Cats: ${catCount}` : ''}

Message:
${message}
      `.trim(),
    },
    requester: {
      name: contactName,
      email,
    },
    priority: 'high', // B2B inquiries are high priority
    type: 'question',
    tags,
    custom_fields: custom_fields.length > 0 ? custom_fields : undefined,
  });
}

/**
 * Create a refund request ticket
 */
export async function createRefundTicket(params: {
  name: string;
  email: string;
  orderNumber: string;
  reason: string;
  product?: string;
}): Promise<ZendeskTicketResponse> {
  const { name, email, orderNumber, reason, product } = params;

  const tags = ['refund-request', 'urgent', 'order-issue'];
  if (product) tags.push(`product-${product.toLowerCase().replace(/\s+/g, '-')}`);

  return createTicket({
    subject: `Refund Request: Order ${orderNumber}`,
    comment: {
      html_body: `
        <div style="font-family: Arial, sans-serif;">
          <h3>Refund Request</h3>

          <p><strong>Order Number:</strong> ${orderNumber}</p>
          ${product ? `<p><strong>Product:</strong> ${product}</p>` : ''}

          <hr/>

          <h4>Reason for Refund:</h4>
          <p style="white-space: pre-wrap;">${reason}</p>
        </div>
      `,
      body: `
Refund Request

Order Number: ${orderNumber}
${product ? `Product: ${product}` : ''}

Reason:
${reason}
      `.trim(),
    },
    requester: {
      name,
      email,
    },
    priority: 'high',
    type: 'problem',
    tags,
  });
}

// ============================================================================
// HELP CENTER / KNOWLEDGE BASE
// ============================================================================

export interface ZendeskArticle {
  id: number;
  url: string;
  html_url: string;
  title: string;
  body: string;
  locale: string;
  source_locale: string;
  section_id: number;
  permission_group_id: number;
  user_segment_id: number | null;
  created_at: string;
  updated_at: string;
  edited_at: string;
  author_id: number;
  draft: boolean;
  promoted: boolean;
  position: number;
  vote_sum: number;
  vote_count: number;
  comments_disabled: boolean;
}

export interface ZendeskSection {
  id: number;
  url: string;
  html_url: string;
  category_id: number;
  position: number;
  sorting: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  locale: string;
  source_locale: string;
  outdated: boolean;
}

export interface ZendeskCategory {
  id: number;
  url: string;
  html_url: string;
  position: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  locale: string;
  source_locale: string;
  outdated: boolean;
}

export interface ZendeskArticleCreate {
  title: string;
  body: string;
  locale?: string;
  draft?: boolean;
  promoted?: boolean;
  position?: number;
  comments_disabled?: boolean;
  label_names?: string[];
}

export interface ZendeskSectionCreate {
  name: string;
  description?: string;
  locale?: string;
  position?: number;
}

export interface ZendeskCategoryCreate {
  name: string;
  description?: string;
  locale?: string;
  position?: number;
}

/**
 * Get Help Center base URL
 */
function getHelpCenterBaseUrl(): string {
  return `https://${ZENDESK_CONFIG.subdomain}.zendesk.com/api/v2/help_center`;
}

/**
 * Search Help Center articles
 */
export async function searchArticles(
  query: string,
  locale: string = 'en-us'
): Promise<{ results: ZendeskArticle[] }> {
  const encodedQuery = encodeURIComponent(query);
  const url = `${getHelpCenterBaseUrl()}/articles/search.json?query=${encodedQuery}&locale=${locale}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * List all categories in Help Center
 */
export async function listCategories(
  locale: string = 'en-us'
): Promise<{ categories: ZendeskCategory[] }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/categories.json`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Create a category in Help Center
 */
export async function createCategory(
  category: ZendeskCategoryCreate,
  locale: string = 'en-us'
): Promise<{ category: ZendeskCategory }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/categories.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ category }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * List all sections in a category
 */
export async function listSections(
  categoryId: number,
  locale: string = 'en-us'
): Promise<{ sections: ZendeskSection[] }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/categories/${categoryId}/sections.json`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Create a section in a category
 */
export async function createSection(
  categoryId: number,
  section: ZendeskSectionCreate,
  locale: string = 'en-us'
): Promise<{ section: ZendeskSection }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/categories/${categoryId}/sections.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ section }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * List all articles in a section
 */
export async function listArticles(
  sectionId: number,
  locale: string = 'en-us'
): Promise<{ articles: ZendeskArticle[] }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/sections/${sectionId}/articles.json`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Create an article in a section
 */
export async function createArticle(
  sectionId: number,
  article: ZendeskArticleCreate,
  locale: string = 'en-us'
): Promise<{ article: ZendeskArticle }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/sections/${sectionId}/articles.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ article }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Update an existing article
 */
export async function updateArticle(
  articleId: number,
  article: Partial<ZendeskArticleCreate>,
  locale: string = 'en-us'
): Promise<{ article: ZendeskArticle }> {
  const url = `${getHelpCenterBaseUrl()}/${locale}/articles/${articleId}.json`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify({ article }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk Help Center API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// ============================================================================
// EXPORTS
// ============================================================================

const zendeskClient = {
  isConfigured: isZendeskConfigured,
  // Ticket operations
  createTicket,
  getTicket,
  updateTicket,
  addTicketComment,
  // User operations
  createOrUpdateUser,
  searchUserByEmail,
  // Convenience ticket functions
  createContactTicket,
  createB2BTicket,
  createRefundTicket,
  // Help Center operations
  searchArticles,
  listCategories,
  createCategory,
  listSections,
  createSection,
  listArticles,
  createArticle,
  updateArticle,
};

export default zendeskClient;
