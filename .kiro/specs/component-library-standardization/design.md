# Design Document

## Overview

The Component Library Standardization system will provide automated auditing, consolidation, and documentation tools for the Purrify component library. The system will identify unused and duplicate components, establish standardized patterns, create comprehensive documentation, and ensure all components follow dark mode and accessibility standards. This will reduce the current ~80+ components to a lean, well-documented library with clear usage patterns.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Component Audit CLI                        │
│              (npm run audit:components)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Component Analysis Pipeline                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Component Discovery                               │  │
│  │     - Scan src/components/ and components/            │  │
│  │     - Parse TypeScript/TSX files                      │  │
│  │     - Extract component metadata                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  2. Usage Analysis                                    │  │
│  │     - Search for import statements                    │  │
│  │     - Count references across codebase                │  │
│  │     - Identify unused components                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  3. Duplicate Detection                               │  │
│  │     - Compare component interfaces                    │  │
│  │     - Analyze functionality overlap                   │  │
│  │     - Generate consolidation recommendations          │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  4. Standards Validation                              │  │
│  │     - Check dark mode compliance                      │  │
│  │     - Validate accessibility attributes               │  │
│  │     - Verify TypeScript interfaces                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  5. Report Generation                                 │  │
│  │     - Create audit report                             │  │
│  │     - Generate cleanup recommendations                │  │
│  │     - Output actionable tasks                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Component Documentation System                  │
│                    (Storybook)                               │
└─────────────────────────────────────────────────────────────┘
```

### Component Organization Structure

```
src/components/
├── ui/                          # Shadcn/UI base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── common/                      # Shared components
│   ├── OptimizedImage.tsx      # Unified image component
│   ├── LoadingSpinner.tsx
│   └── ErrorBoundary.tsx
├── sections/                    # Page sections
│   ├── Hero.tsx
│   ├── Testimonials.tsx
│   └── ...
├── layout/                      # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Container.tsx
├── forms/                       # Form components
│   ├── ContactForm.tsx
│   └── NewsletterForm.tsx
└── templates/                   # Component templates
    ├── FormTemplate.tsx
    ├── CardTemplate.tsx
    └── ModalTemplate.tsx
```

## Components and Interfaces

### 1. Component Auditor

**Purpose**: Analyze components and identify issues

**Interface**:
```typescript
interface ComponentMetadata {
  name: string;
  path: string;
  exports: string[];
  imports: string[];
  props: PropDefinition[];
  linesOfCode: number;
  hasTests: boolean;
  hasStories: boolean;
}

interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

interface UsageInfo {
  componentName: string;
  importCount: number;
  usageLocations: string[];
  usedInPages: string[];
}

interface AuditResult {
  totalComponents: number;
  unusedComponents: ComponentMetadata[];
  duplicateGroups: ComponentMetadata[][];
  usageStats: UsageInfo[];
  standardsViolations: StandardsViolation[];
}

class ComponentAuditor {
  async scanComponents(): Promise<ComponentMetadata[]>;
  async analyzeUsage(components: ComponentMetadata[]): Promise<UsageInfo[]>;
  async detectDuplicates(components: ComponentMetadata[]): Promise<ComponentMetadata[][]>;
  async validateStandards(components: ComponentMetadata[]): Promise<StandardsViolation[]>;
  async generateReport(results: AuditResult): Promise<void>;
}
```

### 2. Duplicate Detector

**Purpose**: Identify components with overlapping functionality

**Interface**:
```typescript
interface SimilarityScore {
  component1: string;
  component2: string;
  score: number;  // 0-1
  reasons: string[];
}

interface DuplicateGroup {
  components: ComponentMetadata[];
  similarityScore: number;
  recommendedAction: 'merge' | 'keep-one' | 'refactor';
  recommendation: string;
}

class DuplicateDetector {
  calculateSimilarity(
    comp1: ComponentMetadata,
    comp2: ComponentMetadata
  ): SimilarityScore;
  
  groupDuplicates(
    similarities: SimilarityScore[]
  ): DuplicateGroup[];
  
  generateConsolidationPlan(
    groups: DuplicateGroup[]
  ): ConsolidationPlan;
}
```

### 3. Standards Validator

**Purpose**: Ensure components follow established patterns

**Interface**:
```typescript
interface StandardsViolation {
  componentPath: string;
  violationType: 'dark-mode' | 'accessibility' | 'typescript' | 'naming';
  severity: 'error' | 'warning';
  message: string;
  line?: number;
  suggestion?: string;
}

interface ValidationRules {
  darkMode: {
    requireDarkClasses: boolean;
    forbiddenColors: string[];
  };
  accessibility: {
    requireAriaLabels: boolean;
    requireKeyboardNav: boolean;
  };
  typescript: {
    requirePropTypes: boolean;
    requireExportedTypes: boolean;
  };
}

class StandardsValidator {
  validateDarkMode(component: ComponentMetadata): StandardsViolation[];
  validateAccessibility(component: ComponentMetadata): StandardsViolation[];
  validateTypeScript(component: ComponentMetadata): StandardsViolation[];
  validateNaming(component: ComponentMetadata): StandardsViolation[];
}
```

### 4. Unified Image Component

**Purpose**: Replace OptimizedImage, CLSOptimizedImage, and NextImage with single solution

**Interface**:
```typescript
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

const imageVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        hero: 'w-full h-[500px] md:h-[600px]',
        product: 'w-full h-[400px]',
        thumbnail: 'w-full h-[200px]',
        avatar: 'rounded-full',
        default: 'w-full h-auto'
      },
      objectFit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      objectFit: 'cover'
    }
  }
);

interface OptimizedImageProps extends VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  variant,
  objectFit,
  priority = false,
  className,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Load metadata from image-dimensions.json
  const metadata = imageDimensions[src] || { width: 800, height: 600 };
  
  return (
    <div className={cn(imageVariants({ variant }), className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-400 dark:text-gray-500">Failed to load image</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || metadata.width}
          height={height || metadata.height}
          className={cn(imageVariants({ objectFit }), 'transition-opacity duration-300', {
            'opacity-0': isLoading,
            'opacity-100': !isLoading
          })}
          priority={priority}
          sizes={metadata.sizes}
          onLoad={() => {
            setIsLoading(false);
            onLoad?.();
          }}
          onError={() => {
            setHasError(true);
            onError?.();
          }}
        />
      )}
    </div>
  );
}

// Specialized variants
export const HeroImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="hero" />
);

export const ProductImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="product" />
);

export const ThumbnailImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="thumbnail" />
);
```

### 5. Component Template Generator

**Purpose**: Generate standardized component boilerplate

**Interface**:
```typescript
interface TemplateOptions {
  name: string;
  type: 'form' | 'card' | 'modal' | 'section';
  includeStories: boolean;
  includeTests: boolean;
  variants?: string[];
}

class TemplateGenerator {
  generateComponent(options: TemplateOptions): string;
  generateStory(componentName: string): string;
  generateTest(componentName: string): string;
  writeFiles(componentName: string, files: Map<string, string>): Promise<void>;
}
```

**Example Template Output**:
```typescript
// src/components/forms/ContactForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });
  
  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500 dark:text-red-400 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500 dark:text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            {...register('message')}
            className="w-full min-h-[100px] px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-red-500 dark:text-red-400 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
```

### 6. Documentation Generator

**Purpose**: Create Storybook stories and usage documentation

**Interface**:
```typescript
interface StoryConfig {
  componentName: string;
  variants: string[];
  props: PropDefinition[];
  examples: StoryExample[];
}

interface StoryExample {
  name: string;
  props: Record<string, any>;
  description: string;
}

class DocumentationGenerator {
  generateStory(config: StoryConfig): string;
  generateUsageGuide(component: ComponentMetadata): string;
  generateAccessibilityGuide(component: ComponentMetadata): string;
}
```

## Data Models

### Component Audit Report Schema

```json
{
  "timestamp": "2025-11-09T12:00:00.000Z",
  "summary": {
    "totalComponents": 83,
    "unusedComponents": 3,
    "duplicateGroups": 1,
    "standardsViolations": 12
  },
  "unusedComponents": [
    {
      "name": "OptimizedImage",
      "path": "src/components/performance/OptimizedImage.tsx",
      "linesOfCode": 500,
      "recommendation": "Delete - no imports found"
    }
  ],
  "duplicateGroups": [
    {
      "components": [
        "OptimizedImage",
        "CLSOptimizedImage",
        "NextImage"
      ],
      "similarityScore": 0.85,
      "recommendation": "Consolidate into single OptimizedImage component"
    }
  ],
  "standardsViolations": [
    {
      "component": "Hero.tsx",
      "type": "dark-mode",
      "severity": "error",
      "message": "Hardcoded color #FFFFFF found on line 45",
      "suggestion": "Use Tailwind class: text-white dark:text-gray-100"
    }
  ],
  "usageStats": [
    {
      "component": "Button",
      "importCount": 156,
      "bundleSize": "2.3KB",
      "usedInPages": 42
    }
  ]
}
```

## Error Handling

### Validation Errors

1. **Dark Mode Violations**
   - Detect hardcoded colors
   - Identify missing dark: variants
   - Suggest Tailwind alternatives

2. **Accessibility Violations**
   - Missing ARIA labels
   - No keyboard navigation
   - Insufficient color contrast

3. **TypeScript Violations**
   - Missing prop types
   - Any types used
   - Untyped exports

### Error Recovery

- Continue auditing even if individual components fail
- Log errors but don't halt process
- Generate partial reports with warnings

## Testing Strategy

### Unit Tests

1. **Component Auditor Tests**
   - Scan component directories
   - Parse component metadata
   - Count imports correctly
   - Identify unused components

2. **Duplicate Detector Tests**
   - Calculate similarity scores
   - Group similar components
   - Generate recommendations

3. **Standards Validator Tests**
   - Detect dark mode violations
   - Validate accessibility
   - Check TypeScript compliance

### Integration Tests

1. **Full Audit Test**
   - Run complete audit on test components
   - Verify report generation
   - Validate recommendations

2. **Template Generation Test**
   - Generate component from template
   - Verify file structure
   - Check code quality

## Performance Considerations

- Use AST parsing for accurate analysis
- Cache component metadata
- Parallel processing for large codebases
- Incremental audits for changed files only

## Integration Points

### CLI Tool

```bash
# Run component audit
npm run audit:components

# Generate component from template
npm run generate:component -- --name ContactForm --type form

# Validate dark mode compliance
npm run validate:dark-mode

# Generate Storybook stories
npm run generate:stories
```

### Pre-commit Hook

```javascript
// .husky/pre-commit
#!/bin/sh
npm run validate:dark-mode
npm run check-types
```

### CI/CD Integration

```yaml
# .github/workflows/component-audit.yml
name: Component Audit
on: [pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run audit:components
      - run: npm run validate:dark-mode
```
