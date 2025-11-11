/**
 * Environment Configuration and Validation
 * 
 * This module validates and provides type-safe access to environment variables.
 * It distinguishes between required and optional variables, providing helpful
 * warnings when optional features are unavailable.
 */

export interface EnvironmentConfig {
  // Required
  nextAuthSecret: string;
  nextAuthUrl: string;
  databaseUrl: string;
  
  // Optional - AI
  anthropicApiKey?: string;
  falApiKey?: string;
  unsplashAccessKey?: string;
  
  // Optional - Analytics
  ga4PropertyId?: string;
  ga4ClientEmail?: string;
  ga4PrivateKey?: string;
  
  // Optional - Monitoring
  sentryDsn?: string;
  
  // Optional - Email
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  alertEmail?: string;
  
  // Optional - Cron
  cronSecret?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FeatureAvailability {
  aiGeneration: boolean;
  aiImages: boolean;
  stockPhotos: boolean;
  realAnalytics: boolean;
  errorMonitoring: boolean;
  emailAlerts: boolean;
  cronJobs: boolean;
}

class EnvironmentValidator {
  /**
   * Validate all environment variables
   */
  validate(): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check required variables
    if (!process.env.NEXTAUTH_SECRET) {
      errors.push('NEXTAUTH_SECRET is required for authentication');
    }
    
    if (!process.env.NEXTAUTH_URL) {
      errors.push('NEXTAUTH_URL is required (e.g., https://purrify.ca)');
    }
    
    if (!process.env.DATABASE_URL) {
      errors.push('DATABASE_URL is required for database connection');
    }
    
    // Check optional variables and provide helpful warnings
    if (!process.env.ANTHROPIC_API_KEY) {
      warnings.push('ANTHROPIC_API_KEY not set - AI content generation will be disabled');
    }
    
    if (!process.env.FAL_API_KEY) {
      warnings.push('FAL_API_KEY not set - AI image generation will use default images');
    }
    
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      warnings.push('UNSPLASH_ACCESS_KEY not set - Stock photo suggestions will be disabled');
    }
    
    if (!process.env.GA4_PROPERTY_ID) {
      warnings.push('GA4_PROPERTY_ID not set - Analytics will use mock data');
    }
    
    if (!process.env.CRON_SECRET) {
      warnings.push('CRON_SECRET not set - Cron jobs will not be authenticated');
    }
    
    if (!process.env.SENTRY_DSN) {
      warnings.push('SENTRY_DSN not set - Error monitoring will use console logging only');
    }
    
    if (!process.env.SMTP_HOST) {
      warnings.push('SMTP_HOST not set - Email alerts will be disabled');
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Get validated configuration
   * @throws Error if required variables are missing
   */
  getConfig(): EnvironmentConfig {
    const validation = this.validate();
    
    if (!validation.valid) {
      throw new Error(
        `Environment validation failed:\n${validation.errors.join('\n')}`
      );
    }
    
    // Log warnings in development
    if (process.env.NODE_ENV === 'development' && validation.warnings.length > 0) {
      console.warn('⚠️  Environment Configuration Warnings:');
      validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
    }
    
    return {
      // Required
      nextAuthSecret: process.env.NEXTAUTH_SECRET!,
      nextAuthUrl: process.env.NEXTAUTH_URL!,
      databaseUrl: process.env.DATABASE_URL!,
      
      // Optional - AI
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      falApiKey: process.env.FAL_API_KEY,
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
      
      // Optional - Analytics
      ga4PropertyId: process.env.GA4_PROPERTY_ID,
      ga4ClientEmail: process.env.GA4_CLIENT_EMAIL,
      ga4PrivateKey: process.env.GA4_PRIVATE_KEY,
      
      // Optional - Monitoring
      sentryDsn: process.env.SENTRY_DSN,
      
      // Optional - Email
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS,
      alertEmail: process.env.ALERT_EMAIL,
      
      // Optional - Cron
      cronSecret: process.env.CRON_SECRET
    };
  }
  
  /**
   * Check which features are available based on environment variables
   */
  getFeatureAvailability(): FeatureAvailability {
    return {
      aiGeneration: !!process.env.ANTHROPIC_API_KEY,
      aiImages: !!process.env.FAL_API_KEY,
      stockPhotos: !!process.env.UNSPLASH_ACCESS_KEY,
      realAnalytics: !!process.env.GA4_PROPERTY_ID,
      errorMonitoring: !!process.env.SENTRY_DSN,
      emailAlerts: !!process.env.SMTP_HOST && !!process.env.SMTP_USER,
      cronJobs: !!process.env.CRON_SECRET
    };
  }
  
  /**
   * Get setup instructions for missing optional features
   */
  getSetupInstructions(): Array<{
    feature: string;
    envVar: string;
    docsUrl: string;
    description: string;
  }> {
    const instructions = [];
    
    if (!process.env.ANTHROPIC_API_KEY) {
      instructions.push({
        feature: 'AI Content Generation',
        envVar: 'ANTHROPIC_API_KEY',
        docsUrl: '/docs/BLOG_AI_API_SETUP.md',
        description: 'Generate blog posts automatically using Claude AI'
      });
    }
    
    if (!process.env.FAL_API_KEY) {
      instructions.push({
        feature: 'AI Image Generation',
        envVar: 'FAL_API_KEY',
        docsUrl: '/docs/BLOG_AI_API_SETUP.md',
        description: 'Generate custom images for blog posts'
      });
    }
    
    if (!process.env.GA4_PROPERTY_ID) {
      instructions.push({
        feature: 'Real Analytics',
        envVar: 'GA4_PROPERTY_ID',
        docsUrl: '/docs/VERCEL_ENV_SETUP.md',
        description: 'Track real traffic and engagement metrics'
      });
    }
    
    if (!process.env.CRON_SECRET) {
      instructions.push({
        feature: 'Cron Jobs',
        envVar: 'CRON_SECRET',
        docsUrl: '/docs/VERCEL_ENV_SETUP.md',
        description: 'Enable automated post publishing and cleanup'
      });
    }
    
    return instructions;
  }
}

// Singleton instance
const validator = new EnvironmentValidator();

// Export functions
export const validateEnvironment = () => validator.validate();
export const getEnvironmentConfig = () => validator.getConfig();
export const getFeatureAvailability = () => validator.getFeatureAvailability();
export const getSetupInstructions = () => validator.getSetupInstructions();

// Export for testing
export { EnvironmentValidator };
