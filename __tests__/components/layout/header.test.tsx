import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

const mockGetLocale = jest.fn();
const mockGetTranslations = jest.fn();

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
  default: function MockImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock('next-intl/server', () => ({
  getLocale: () => mockGetLocale(),
  getTranslations: () => mockGetTranslations(),
}));

jest.mock('@/components/ui/container', () => ({
  Container: function MockContainer({ children }: { children: React.ReactNode }) {
    return <div data-testid="container">{children}</div>;
  },
}));

jest.mock('@/components/ui/button', () => ({
  Button: function MockButton({
    children,
    asChild,
    className,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
  }) {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: `${child.props.className || ''} ${className || ''}`.trim(),
      });
    }

    return <button className={className}>{children}</button>;
  },
}));

jest.mock('@/components/ui/language-switcher', () => ({
  LanguageSwitcher: () => <button data-testid="language-switcher">Lang</button>,
}));

jest.mock('@/components/layout/header-suspense', () => ({
  HeaderDesktopNavigation: ({ navigationItems }: { navigationItems: Array<{ label: string }> }) => (
    <nav aria-label="desktop-nav">
      {navigationItems.map((item) => (
        <span key={item.label}>{item.label}</span>
      ))}
    </nav>
  ),
  HeaderMobileMenu: ({
    findStoreHref,
    findStoreLabel,
    toggleMenuLabel,
  }: {
    findStoreHref: string;
    findStoreLabel: string;
    toggleMenuLabel: string;
  }) => (
    <div>
      <button aria-label={toggleMenuLabel}>Menu</button>
      <a href={findStoreHref}>{findStoreLabel}</a>
    </div>
  ),
}));

function createTranslator(values: Record<string, string>) {
  return (key: string) => values[key] ?? key;
}

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetLocale.mockResolvedValue('en');
    mockGetTranslations.mockResolvedValue(
      createTranslator({
        'nav.products': 'Products',
        'nav.trialSize': 'Trial Size',
        'nav.compareSizes': 'Compare Sizes',
        'nav.shipsToUSA': 'Ships to USA',
        'nav.retailers': 'Retailers',
        'nav.becomePartner': 'Become a Partner',
        'nav.marketingSupport': 'Marketing Support',
        'nav.partnerPrograms': 'Partner Programs',
        'nav.forGroomers': 'For Groomers',
        'nav.forShelters': 'For Shelters',
        'nav.affiliateProgram': 'Affiliate Program',
        'nav.b2bInquiry': 'B2B Inquiry',
        'nav.learn': 'Learn',
        'nav.howItWorksPage': 'How It Works',
        'nav.faq': 'FAQ',
        'nav.science': 'Science',
        'nav.safetyInfo': 'Safety Info',
        'nav.activatedCarbonBenefits': 'Benefits',
        'nav.catLitterGuide': 'Guide',
        'nav.howToUse': 'How to Use',
        'nav.technologyComparison': 'Comparison',
        'nav.comparisonLab': 'Comparison Lab',
        'nav.catLitterAnswers': 'Cat Litter Q&A',
        'nav.scienceHub': 'Research Citations',
        'nav.litterCalculator': 'Litter Calculator',
        'nav.smellQuiz': 'Smell Quiz',
        'nav.toolsHub': 'All Tools',
        'nav.solutions': 'Solutions',
        'nav.ammoniaSmellControl': 'Ammonia Control',
        'nav.apartmentLiving': 'Apartment Living',
        'nav.litterBoxOdor': 'Litter Box Odor',
        'nav.multipleCats': 'Multiple Cats',
        'nav.naturalAdditive': 'Natural Additive',
        'nav.seniorCats': 'Senior Cats',
        'nav.blog': 'Blog',
        'nav.fun': 'Fun & Games',
        'nav.about': 'About',
        'nav.ourStory': 'Our Story',
        'nav.customerReviews': 'Reviews',
        'nav.contact': 'Contact',
        'nav.findStore': 'Find a Store',
        'nav.toggleMenu': 'Toggle menu',
      }),
    );
  });

  it('renders the English header shell with logo and main navigation', async () => {
    render(await Header());

    expect(screen.getByAltText(/Purrify - Premium Activated Carbon Cat Litter Additive - Home/i)).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Retailers')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Fun & Games')).toBeInTheDocument();
    expect(screen.getAllByText('Find a Store')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });

  it('uses French locale prefixes and French logo copy', async () => {
    mockGetLocale.mockResolvedValue('fr');
    mockGetTranslations.mockResolvedValue(
      createTranslator({
        'nav.products': 'Produits',
        'nav.trialSize': 'Essai',
        'nav.compareSizes': 'Comparer',
        'nav.shipsToUSA': 'Vers les USA',
        'nav.retailers': 'Detaillants',
        'nav.becomePartner': 'Devenir partenaire',
        'nav.marketingSupport': 'Soutien marketing',
        'nav.partnerPrograms': 'Programmes',
        'nav.forGroomers': 'Toiletteurs',
        'nav.forShelters': 'Refuges',
        'nav.affiliateProgram': 'Affiliation',
        'nav.b2bInquiry': 'Demande B2B',
        'nav.learn': 'Apprendre',
        'nav.howItWorksPage': 'Comment ca marche',
        'nav.faq': 'FAQ',
        'nav.science': 'Science',
        'nav.safetyInfo': 'Securite',
        'nav.activatedCarbonBenefits': 'Benefices',
        'nav.catLitterGuide': 'Guide',
        'nav.howToUse': 'Utilisation',
        'nav.technologyComparison': 'Comparaison',
        'nav.comparisonLab': 'Lab Comparatif',
        'nav.catLitterAnswers': 'Q&R Litiere',
        'nav.scienceHub': 'Recherche',
        'nav.litterCalculator': 'Calculatrice',
        'nav.smellQuiz': 'Quiz Odeur',
        'nav.toolsHub': 'Outils',
        'nav.solutions': 'Solutions',
        'nav.ammoniaSmellControl': 'Ammoniac',
        'nav.apartmentLiving': 'Appartement',
        'nav.litterBoxOdor': 'Odeur litiere',
        'nav.multipleCats': 'Plusieurs chats',
        'nav.naturalAdditive': 'Additif naturel',
        'nav.seniorCats': 'Chats ages',
        'nav.blog': 'Blog',
        'nav.fun': 'Jeux',
        'nav.about': 'A propos',
        'nav.ourStory': 'Notre histoire',
        'nav.customerReviews': 'Avis',
        'nav.contact': 'Contact',
        'nav.findStore': 'Trouver un magasin',
        'nav.toggleMenu': 'Ouvrir le menu',
      }),
    );

    render(await Header());

    const homeLink = screen.getByRole('link', {
      name: /Purrify - additif premium de charbon actif pour litiere - accueil/i,
    });
    expect(homeLink).toHaveAttribute('href', '/fr');

    const storeLinks = screen.getAllByRole('link', { name: 'Trouver un magasin' });
    storeLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/fr/stores/');
    });
  });
});
