/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '@/components/layout/header';

// Create a mutable mock that we can change per test
let mockSession: any = { data: null };

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({
    href,
    children,
    className,
    onClick,
    'aria-label': ariaLabel,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    'aria-label'?: string;
  }) {
    return (
      <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    className,
    priority,
  }: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
  }) {
    return <img src={src} alt={alt} className={className} data-priority={priority} />;
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock next-auth/react with mutable session
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => mockSession),
  signOut: jest.fn(),
}));

// Mock translation context
jest.mock('@/lib/translation-context', () => ({
  useTranslation: jest.fn(() => ({
    t: {
      nav: {
        products: 'Products',
        trialSize: 'Trial Size',
        compareSizes: 'Compare Sizes',
        shipsToUSA: 'Ships to USA',
        retailers: 'Retailers',
        wholesalePricing: 'Wholesale Pricing',
        becomePartner: 'Become a Partner',
        marketingSupport: 'Marketing Support',
        forGroomers: 'For Groomers',
        forShelters: 'For Shelters',
        affiliateProgram: 'Affiliate Program',
        b2bInquiry: 'B2B Inquiry',
        learn: 'Learn',
        howItWorksPage: 'How It Works',
        faq: 'FAQ',
        science: 'Science',
        safetyInfo: 'Safety Info',
        activatedCarbonBenefits: 'Benefits',
        catLitterGuide: 'Guide',
        howToUse: 'How to Use',
        technologyComparison: 'Comparison',
        solutions: 'Solutions',
        ammoniaSmellControl: 'Ammonia Control',
        apartmentLiving: 'Apartment Living',
        litterBoxOdor: 'Litter Box Odor',
        multipleCats: 'Multiple Cats',
        naturalAdditive: 'Natural Additive',
        seniorCats: 'Senior Cats',
        blog: 'Blog',
        about: 'About',
        ourStory: 'Our Story',
        customerReviews: 'Reviews',
        contact: 'Contact',
        signOut: 'Sign Out',
        signedIn: 'Signed In',
        toggleMenu: 'Toggle Menu',
        findStore: 'Find a Store',
        partnerPrograms: 'Partner Programs',
      },
    },
    locale: 'en',
  })),
}));

// Mock ThemeToggle
jest.mock('@/components/theme/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

// Mock LanguageSwitcher
jest.mock('@/components/ui/language-switcher', () => ({
  LanguageSwitcher: () => <button data-testid="language-switcher">Lang</button>,
}));

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: function MockButton({
    children,
    onClick,
    variant,
    size,
    className,
    asChild,
    'aria-label': ariaLabel,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
    size?: string;
    className?: string;
    asChild?: boolean;
    'aria-label'?: string;
  }) {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: `${child.props.className || ''} ${className || ''}`.trim(),
      });
    }
    return (
      <button
        onClick={onClick}
        data-variant={variant}
        data-size={size}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  },
}));

// Mock Container
jest.mock('@/components/ui/container', () => ({
  Container: function MockContainer({ children }: { children: React.ReactNode }) {
    return <div data-testid="container">{children}</div>;
  },
}));

import React from 'react';

describe('Header', () => {
  beforeEach(() => {
    // Reset session to unauthenticated by default
    mockSession = { data: null };
    jest.clearAllMocks();
  });

  it('renders the header with logo', () => {
    render(<Header />);

    // Check for logo images (both light and dark mode)
    const logos = screen.getAllByAltText(/Purrify/);
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it('renders main navigation items', () => {
    render(<Header />);

    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Retailers')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders Find a Store button', () => {
    render(<Header />);

    expect(screen.getByText('Find a Store')).toBeInTheDocument();
  });

  it('renders theme toggle', () => {
    render(<Header />);

    // Theme toggle appears twice (desktop and mobile), so use getAllByTestId
    const toggles = screen.getAllByTestId('theme-toggle');
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it('renders language switcher', () => {
    render(<Header />);

    // Language switcher appears twice (desktop and mobile)
    const switchers = screen.getAllByTestId('language-switcher');
    expect(switchers.length).toBeGreaterThanOrEqual(1);
  });

  it('has correct header structure', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
  });

  it('has navigation with correct role', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('has dropdown buttons with correct aria attributes', () => {
    render(<Header />);

    const productsDropdown = screen.getByRole('button', { name: /Products/i });
    expect(productsDropdown).toHaveAttribute('aria-haspopup', 'true');
    expect(productsDropdown).toHaveAttribute('aria-expanded');
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />);

    // Find the menu toggle button by aria-label
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Initially, mobile menu should be closed
    expect(screen.queryByRole('link', { name: /our story/i })).not.toBeInTheDocument();

    // Click to open menu
    fireEvent.click(menuButton);

    // Mobile menu should now show some navigation items
    expect(screen.getByText('Products')).toBeInTheDocument();
  });
});

describe('Header with authenticated user', () => {
  beforeEach(() => {
    // Set session to authenticated
    mockSession = {
      data: {
        user: {
          email: 'test@example.com',
          name: 'Test User',
        },
      },
    };
  });

  afterEach(() => {
    mockSession = { data: null };
  });

  it('displays user email when authenticated', () => {
    render(<Header />);

    // Should show username (part before @) - use getAllByText since it appears in multiple places
    const usernameElements = screen.getAllByText((content) => content.includes('test'));
    expect(usernameElements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows sign out button when authenticated', () => {
    render(<Header />);

    // Sign Out appears in multiple places (desktop and mobile)
    const signOutButtons = screen.getAllByText('Sign Out');
    expect(signOutButtons.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Header navigation links', () => {
  beforeEach(() => {
    mockSession = { data: null };
  });

  it('renders Products button with dropdown attributes', () => {
    render(<Header />);

    // Check Products button has correct attributes
    const productsButton = screen.getByRole('button', { name: /Products/i });
    expect(productsButton).toHaveAttribute('aria-haspopup', 'true');
    expect(productsButton).toHaveAttribute('data-menu-id', 'products');
  });

  it('renders correct href for Blog link', () => {
    render(<Header />);

    const blogLink = screen.getByRole('link', { name: /^Blog$/i });
    expect(blogLink).toHaveAttribute('href', '/blog');
  });

  it('renders correct href for Find a Store button', () => {
    render(<Header />);

    const findStoreLink = screen.getByRole('link', { name: /Find a Store/i });
    expect(findStoreLink).toHaveAttribute('href', '/stores');
  });

  it('renders logo link to home page', () => {
    render(<Header />);

    const logoLinks = screen.getAllByRole('link');
    const homeLink = logoLinks.find(link => link.getAttribute('href') === '/');
    expect(homeLink).toBeDefined();
  });
});
