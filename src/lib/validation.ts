import { z } from "zod";

// Common validation patterns
export const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[1-9]\d{1,14}$/, // E.164 format
  name: /^[a-zA-Z\s'-]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i,
  postalCode: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
};

// Common validation messages
export const messages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  min: (length: number) => `Must be at least ${length} characters`,
  max: (length: number) => `Must be at most ${length} characters`,
  invalid: "Invalid format",
  password:
    "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
};

// Common validation schemas
export const schemas = {
  email: z.string().min(1, messages.required).email(messages.email),

  name: z
    .string()
    .min(1, messages.required)
    .min(2, messages.min(2))
    .max(50, messages.max(50))
    .regex(patterns.name, messages.invalid),

  phone: z
    .string()
    .min(1, messages.required)
    .regex(patterns.phone, "Please enter a valid phone number"),

  password: z
    .string()
    .min(1, messages.required)
    .min(8, messages.min(8))
    .regex(patterns.password, messages.password),

  url: z
    .string()
    .min(1, messages.required)
    .regex(patterns.url, "Please enter a valid URL"),

  postalCode: z
    .string()
    .min(1, messages.required)
    .regex(patterns.postalCode, "Please enter a valid postal code"),

  requiredString: (field: string) => z.string().min(1, `${field} is required`),

  optionalString: (max = 255) => z.string().max(max).optional(),
};

// Helper function to format validation errors
export function formatValidationError(
  error: z.ZodError,
): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");
    formattedErrors[path] = err.message;
  });

  return formattedErrors;
}

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Validate and sanitize form data
export async function validateFormData<T>(
  formData: FormData,
  schema: z.ZodType<T>,
): Promise<{ data?: T; errors?: Record<string, string> }> {
  try {
    // Convert FormData to plain object
    const data = Object.fromEntries(formData);

    // Sanitize all string values
    const sanitizedData = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: typeof value === "string" ? sanitizeInput(value) : value,
      }),
      {},
    );

    // Validate against schema
    const result = await schema.safeParseAsync(sanitizedData);

    if (result.success) {
      return { data: result.data };
    } else {
      return { errors: formatValidationError(result.error) };
    }
  } catch (error) {
    console.error("Validation error:", error);
    return {
      errors: {
        _form: "An error occurred while validating the form. Please try again.",
      },
    };
  }
}
