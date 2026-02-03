/**
 * SEO Validation API
 * POST /api/seo/validate
 *
 * Validates meta content and schema for a given page
 * Used by admin tools to check SEO quality before publishing
 */

import { validateMetaContent } from '@/lib/seo/meta-optimizer';
import { validateSchema } from '@/lib/seo/schema-validator';

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

export async function POST(req: Request): Promise<Response> {
  try {
    const body: ValidateRequestBody = await req.json();

    // Must provide at least meta content or schema
    if (!body.title && !body.description && !body.schema) {
      return Response.json({
        success: false,
        error: 'Provide title/description for meta validation or schema for schema validation',
      }, { status: 400 });
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

    return Response.json(response);
  } catch (error) {
    console.error('SEO validation error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error during validation',
    }, { status: 500 });
  }
}
