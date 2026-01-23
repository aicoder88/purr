/**
 * SEO Validation API
 * POST /api/seo/validate
 *
 * Validates meta content and schema for a given page
 * Used by admin tools to check SEO quality before publishing
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { validateMetaContent } from '../../../src/lib/seo/meta-optimizer';
import { validateSchema } from '../../../src/lib/seo/schema-validator';

interface ValidateRequestBody {
  title?: string;
  description?: string;
  targetKeyword?: string;
  schema?: unknown;
  url?: string;
}

interface ValidationResponse {
  success: boolean;
  meta?: {
    isValid: boolean;
    score: number;
    suggestions: string[];
    title?: {
      length: number;
      isOptimal: boolean;
    };
    description?: {
      length: number;
      isOptimal: boolean;
    };
  };
  schema?: {
    isValid: boolean;
    errors: Array<{
      field: string;
      message: string;
      fix?: string;
    }>;
    warnings: Array<{
      field: string;
      message: string;
    }>;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidationResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    const body: ValidateRequestBody = req.body;

    // Must provide at least meta content or schema
    if (!body.title && !body.description && !body.schema) {
      return res.status(400).json({
        success: false,
        error: 'Provide title/description for meta validation or schema for schema validation',
      });
    }

    const response: ValidationResponse = {
      success: true,
    };

    // Validate meta content if provided
    if (body.title || body.description) {
      const title = body.title || '';
      const description = body.description || '';

      const metaValidation = validateMetaContent(
        title,
        description,
        body.targetKeyword
      );

      response.meta = {
        isValid: metaValidation.isValid,
        score: metaValidation.score,
        suggestions: metaValidation.suggestions,
        title: body.title
          ? {
              length: title.length,
              isOptimal: title.length >= 40 && title.length <= 60,
            }
          : undefined,
        description: body.description
          ? {
              length: description.length,
              isOptimal: description.length >= 140 && description.length <= 155,
            }
          : undefined,
      };
    }

    // Validate schema if provided
    if (body.schema) {
      const schemaValidation = validateSchema(body.schema);

      response.schema = {
        isValid: schemaValidation.isValid,
        errors: schemaValidation.errors.map((e) => ({
          field: e.field,
          message: e.message,
          fix: e.fix,
        })),
        warnings: schemaValidation.warnings.map((w) => ({
          field: w.field,
          message: w.message,
        })),
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error('SEO validation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during validation',
    });
  }
}
