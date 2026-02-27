/**
 * Reusable API Client
 * 
 * Provides a type-safe wrapper around fetch with:
 * - Consistent error handling
 * - Authentication header injection
 * - Request/response interceptors
 * - Toast integration for user feedback
 */

import { toast } from 'sonner';

// API Error class for structured error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request configuration options
interface RequestConfig extends RequestInit {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

// API Response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
}

/**
 * Make a typed API request
 */
async function request<T>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    showToast = true,
    successMessage,
    errorMessage,
    headers = {},
    ...fetchConfig
  } = config;

  // Default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge headers
  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchConfig,
      headers: mergedHeaders,
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: T;
    if (isJson) {
      data = await response.json() as T;
    } else {
      const text = await response.text();
      data = text as unknown as T;
    }

    // Handle error responses
    if (!response.ok) {
      const errorData = data as { error?: string; message?: string } | string;
      const errorMsg = typeof errorData === 'string' 
        ? errorData 
        : (errorData?.error || errorData?.message || `HTTP ${response.status}`);

      throw new ApiError(errorMsg, response.status, data);
    }

    // Show success toast if configured
    if (showToast && successMessage) {
      toast.success(successMessage);
    }

    return { data, status: response.status };
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new ApiError('Network error. Please check your connection.', 0);
      if (showToast) {
        toast.error(errorMessage || 'Network error. Please try again.');
      }
      throw networkError;
    }

    // Re-throw API errors
    if (error instanceof ApiError) {
      if (showToast) {
        toast.error(errorMessage || error.message);
      }
      throw error;
    }

    // Handle unexpected errors
    const unexpectedError = new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      500
    );
    if (showToast) {
      toast.error(errorMessage || unexpectedError.message);
    }
    throw unexpectedError;
  }
}

/**
 * HTTP GET request
 */
export function get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
  return request<T>(url, { ...config, method: 'GET' });
}

/**
 * HTTP POST request
 */
export function post<T>(
  url: string,
  body: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return request<T>(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * HTTP PUT request
 */
export function put<T>(
  url: string,
  body: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return request<T>(url, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * HTTP PATCH request
 */
export function patch<T>(
  url: string,
  body: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return request<T>(url, {
    ...config,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

/**
 * HTTP DELETE request
 */
export function del<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
  return request<T>(url, { ...config, method: 'DELETE' });
}

// Default export for convenience
export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default apiClient;
