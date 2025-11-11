export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  structure: Array<{
    type: 'heading' | 'paragraph' | 'list' | 'callout';
    content: string;
    placeholder?: string;
    required: boolean;
  }>;
}

export const DEFAULT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'how-to-guide',
    name: 'How-To Guide',
    description: 'Step-by-step instructional content',
    structure: [
      {
        type: 'heading',
        content: 'Introduction',
        placeholder: 'Brief overview of what readers will learn',
        required: true
      },
      {
        type: 'heading',
        content: 'What You\'ll Need',
        placeholder: 'List of materials or prerequisites',
        required: true
      },
      {
        type: 'list',
        content: '',
        placeholder: 'Item 1\nItem 2\nItem 3',
        required: true
      },
      {
        type: 'heading',
        content: 'Step-by-Step Instructions',
        placeholder: 'Detailed steps',
        required: true
      },
      {
        type: 'heading',
        content: 'Tips and Best Practices',
        placeholder: 'Additional helpful advice',
        required: false
      },
      {
        type: 'heading',
        content: 'Conclusion',
        placeholder: 'Summary and next steps',
        required: true
      }
    ]
  },
  {
    id: 'product-comparison',
    name: 'Product Comparison',
    description: 'Compare different products or solutions',
    structure: [
      {
        type: 'heading',
        content: 'Introduction',
        placeholder: 'What are we comparing and why',
        required: true
      },
      {
        type: 'heading',
        content: 'Option 1: [Product Name]',
        placeholder: 'Description, pros, and cons',
        required: true
      },
      {
        type: 'heading',
        content: 'Option 2: [Product Name]',
        placeholder: 'Description, pros, and cons',
        required: true
      },
      {
        type: 'heading',
        content: 'Side-by-Side Comparison',
        placeholder: 'Direct comparison of key features',
        required: true
      },
      {
        type: 'heading',
        content: 'Our Recommendation',
        placeholder: 'Which option is best and why',
        required: true
      }
    ]
  },
  {
    id: 'problem-solution',
    name: 'Problem-Solution',
    description: 'Address a common problem and provide solutions',
    structure: [
      {
        type: 'heading',
        content: 'The Problem',
        placeholder: 'Describe the issue readers are facing',
        required: true
      },
      {
        type: 'heading',
        content: 'Why This Happens',
        placeholder: 'Explain the root causes',
        required: true
      },
      {
        type: 'heading',
        content: 'Solution 1: [Approach]',
        placeholder: 'First solution with details',
        required: true
      },
      {
        type: 'heading',
        content: 'Solution 2: [Approach]',
        placeholder: 'Alternative solution',
        required: false
      },
      {
        type: 'heading',
        content: 'Prevention Tips',
        placeholder: 'How to avoid the problem in the future',
        required: false
      },
      {
        type: 'heading',
        content: 'Conclusion',
        placeholder: 'Summary and recommended action',
        required: true
      }
    ]
  },
  {
    id: 'listicle',
    name: 'Listicle',
    description: 'Numbered list of tips, ideas, or items',
    structure: [
      {
        type: 'heading',
        content: 'Introduction',
        placeholder: 'What this list covers',
        required: true
      },
      {
        type: 'heading',
        content: '1. [First Item]',
        placeholder: 'Description and details',
        required: true
      },
      {
        type: 'heading',
        content: '2. [Second Item]',
        placeholder: 'Description and details',
        required: true
      },
      {
        type: 'heading',
        content: '3. [Third Item]',
        placeholder: 'Description and details',
        required: true
      },
      {
        type: 'callout',
        content: 'Pro Tip: [Additional insight]',
        placeholder: 'Bonus advice or insider tip',
        required: false
      },
      {
        type: 'heading',
        content: 'Conclusion',
        placeholder: 'Wrap up and call to action',
        required: true
      }
    ]
  },
  {
    id: 'ultimate-guide',
    name: 'Ultimate Guide',
    description: 'Comprehensive, in-depth content on a topic',
    structure: [
      {
        type: 'heading',
        content: 'Introduction',
        placeholder: 'Overview of the complete guide',
        required: true
      },
      {
        type: 'heading',
        content: 'What Is [Topic]?',
        placeholder: 'Define and explain the basics',
        required: true
      },
      {
        type: 'heading',
        content: 'Why [Topic] Matters',
        placeholder: 'Importance and benefits',
        required: true
      },
      {
        type: 'heading',
        content: 'Getting Started',
        placeholder: 'First steps for beginners',
        required: true
      },
      {
        type: 'heading',
        content: 'Advanced Techniques',
        placeholder: 'Expert-level information',
        required: false
      },
      {
        type: 'heading',
        content: 'Common Mistakes to Avoid',
        placeholder: 'Pitfalls and how to avoid them',
        required: true
      },
      {
        type: 'heading',
        content: 'Frequently Asked Questions',
        placeholder: 'Q&A section',
        required: false
      },
      {
        type: 'heading',
        content: 'Conclusion',
        placeholder: 'Summary and next steps',
        required: true
      }
    ]
  }
];

export class ContentTemplateManager {
  /**
   * Get all available templates
   */
  getTemplates(): ContentTemplate[] {
    return DEFAULT_TEMPLATES;
  }

  /**
   * Get a specific template by ID
   */
  getTemplate(id: string): ContentTemplate | undefined {
    return DEFAULT_TEMPLATES.find(t => t.id === id);
  }

  /**
   * Create a custom template
   */
  createCustomTemplate(template: Omit<ContentTemplate, 'id'>): ContentTemplate {
    const id = template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return {
      id,
      ...template
    };
  }
}
