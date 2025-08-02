import { z } from "zod";

// Define the schema for required environment variables
const serverEnvSchema = z.object({
  // Next.js
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Application
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  // EmailJS
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z
    .string()
    .min(1, "EmailJS public key is required"),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z
    .string()
    .min(1, "EmailJS service ID is required"),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z
    .string()
    .min(1, "EmailJS template ID is required"),

  // Stripe (optional in development)
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Authentication (optional)
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
});

// Client-side environment variables (only public ones)
const clientEnvSchema = serverEnvSchema.pick({
  NODE_ENV: true,
  NEXT_PUBLIC_SITE_URL: true,
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: true,
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: true,
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: true,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: true,
});

/**
 * Validates server environment variables
 * Throws an error if any required variables are missing
 */
export function validateServerEnv() {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((e) => `${e.path.join(".")} (${e.message})`)
        .join("\n  - ");

      const errorMessage =
        `❌ Missing or invalid environment variables:\n${missingVars}\n\n` +
        "Please check your .env.local file or Vercel project settings.";

      throw new Error(errorMessage);
    }
    throw error;
  }
}

/**
 * Returns validated client-side environment variables
 */
export function getClientEnv() {
  try {
    return clientEnvSchema.parse(process.env);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("❌ Invalid client environment variables:", error);
    }
    // Return partial data in production to avoid breaking the app
    return {
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "",
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      NEXT_PUBLIC_EMAILJS_SERVICE_ID:
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    };
  }
}

// Export validated environment variables
type Env = ReturnType<typeof getClientEnv>;

declare global {
  // eslint-disable-next-line no-var
  var ENV: Env;
  interface Window {
    ENV: Env;
  }
}

// Validate environment variables when this module is imported
if (typeof window === "undefined") {
  validateServerEnv();
}
