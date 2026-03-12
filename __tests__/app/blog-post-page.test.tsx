import React from 'react';
import { render, screen, within } from '@testing-library/react';
import LocalizedBlogPostPage from '../../app/[locale]/blog/[slug]/page';

const mockGetPost = jest.fn();
const mockGetPublicEditorialEntity = jest.fn();
const mockGetEditorialEntityByName = jest.fn();

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({
    href,
    children,
    className,
    prefetch: _prefetch,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    prefetch?: boolean;
  }) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    fill: _fill,
    priority: _priority,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    placeholder?: string;
    blurDataURL?: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock('lucide-react', () => ({
  ArrowLeft: function MockArrowLeft(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} aria-hidden="true" />;
  },
}));

jest.mock('@/components/ui/container', () => ({
  Container: function MockContainer({ children }: { children: React.ReactNode }) {
    return <div data-testid="container">{children}</div>;
  },
}));

jest.mock('@/components/seo/RelatedContent', () => ({
  RelatedContent: function MockRelatedContent() {
    return <div data-testid="related-content" />;
  },
}));

jest.mock('@/components/blog/BlogProductCTA', () => ({
  BlogProductCTA: function MockBlogProductCTA() {
    return <div data-testid="blog-product-cta" />;
  },
}));

jest.mock('@/components/blog/RelatedSolutionsServer', () => ({
  RelatedSolutionsServer: function MockRelatedSolutionsServer() {
    return <div data-testid="related-solutions" />;
  },
}));

jest.mock('@/lib/blog/content-store', () => ({
  ContentStore: jest.fn().mockImplementation(() => ({
    getPost: (...args: unknown[]) => mockGetPost(...args),
    getAllPosts: jest.fn(),
  })),
}));

jest.mock('@/lib/security/sanitize', () => ({
  sanitizeHTML: (html: string) => html,
}));

jest.mock('@/lib/i18n/locale-path', () => ({
  localizeInternalHrefAttributes: (html: string) => html,
}));

jest.mock('@/lib/seo-utils', () => ({
  generateArticlePageSchema: jest.fn(() => ({ '@type': 'Article' })),
  stripContext: jest.fn((value) => value),
}));

jest.mock('@/lib/static-image-optimization', () => ({
  getOptimizedStaticImageData: jest.fn((src: string) => ({ src })),
  optimizeStaticImagesInHtml: jest.fn((html: string) => html),
}));

jest.mock('@/lib/editorial/entities', () => ({
  getEditorialEntityByName: (...args: unknown[]) => mockGetEditorialEntityByName(...args),
  getPublicEditorialEntity: (...args: unknown[]) => mockGetPublicEditorialEntity(...args),
  getPublicEditorialName: jest.fn((name: string) => name),
}));

const authorEntity = {
  name: 'Purrify Team',
  canonicalPath: '/about/team/purrify-team',
  summary: 'Editorial standards and maintenance notes.',
};

const reviewerEntity = {
  name: 'Purrify Research Lab',
  canonicalPath: '/about/team/purrify-research-lab',
  summary: 'Internal testing and evidence review notes.',
};

const basePost = {
  title: 'Quiet Article Chrome',
  excerpt: 'A short article summary.',
  author: {
    name: authorEntity.name,
  },
  publishDate: '2026-03-01',
  modifiedDate: '2026-03-07',
  reviewer: {
    name: reviewerEntity.name,
  },
  reviewedDate: '2026-03-09',
  slug: 'quiet-article-chrome',
  featuredImage: {
    url: '/optimized/blog/test-hero.webp',
    alt: 'Quiet editorial blog hero',
  },
  locale: 'en',
  categories: ['odor'],
  tags: ['activated-carbon'],
  seo: {},
  translations: {},
  faq: [],
  citations: [],
};

function createPost(content: string) {
  return {
    ...basePost,
    content,
  };
}

describe('Localized blog post page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPublicEditorialEntity.mockReturnValue(authorEntity);
    mockGetEditorialEntityByName.mockReturnValue(reviewerEntity);
  });

  it('keeps the pre-article masthead minimal and moves policy details below the article', async () => {
    const longArticle = Array.from({ length: 600 }, (_, index) => `word-${index}`).join(' ');
    mockGetPost.mockResolvedValue(createPost(`<p>${longArticle}</p>`));

    render(await LocalizedBlogPostPage({
      params: Promise.resolve({ locale: 'en', slug: 'quiet-article-chrome' }),
    }));

    const masthead = screen.getByTestId('article-masthead');
    const article = screen.getByRole('article');
    const footer = screen.getByTestId('article-details-footer');

    expect(within(masthead).getByRole('link', { name: authorEntity.name })).toHaveAttribute('href', authorEntity.canonicalPath);
    expect(within(masthead).getByText('March 1, 2026')).toBeInTheDocument();
    expect(within(masthead).queryByText(/Updated/i)).not.toBeInTheDocument();
    expect(within(masthead).queryByRole('link', { name: 'Editorial policy' })).not.toBeInTheDocument();
    expect(masthead.compareDocumentPosition(article) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(within(footer).getByText('Updated March 7, 2026')).toBeInTheDocument();
    expect(within(footer).getByText('Reviewed March 9, 2026')).toBeInTheDocument();
    expect(within(footer).getByText('3 min read')).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'Editorial policy' })).toHaveAttribute('href', '/about/editorial-policy');
    expect(within(footer).getByRole('link', { name: 'Testing policy' })).toHaveAttribute('href', '/about/testing-policy');
    expect(article.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('still uses the compact masthead when the article body contains its own embedded header', async () => {
    mockGetPost.mockResolvedValue(
      createPost('<header><h2>Embedded article title</h2></header><p>Body copy.</p>'),
    );

    render(await LocalizedBlogPostPage({
      params: Promise.resolve({ locale: 'en', slug: 'quiet-article-chrome' }),
    }));

    const masthead = screen.getByTestId('article-masthead');
    const article = screen.getByRole('article');
    const footer = screen.getByTestId('article-details-footer');

    expect(within(masthead).getByText('March 1, 2026')).toBeInTheDocument();
    expect(within(masthead).queryByRole('link', { name: 'Editorial policy' })).not.toBeInTheDocument();
    expect(masthead.compareDocumentPosition(article) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(article.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
