/**
 * useBreadcrumb Hook
 * Generates breadcrumb navigation and structured data for SEO
 */

import { useTranslation } from '../lib/translation-context';
import { getLocalizedUrl } from '../lib/seo-utils';

export interface BreadcrumbItem {
  name: string;
  path: string;
  position: number;
}

export interface BreadcrumbResult {
  items: BreadcrumbItem[];
  schema: object;
}

/**
 * Path segment to human-readable label mapping
 */
const SEGMENT_LABELS: Record<string, Record<string, string>> = {
  en: {
    products: 'Products',
    'trial-size': 'FREE Trial',
    standard: 'Standard',
    'family-pack': 'Family Pack',
    learn: 'Learn',
    'how-it-works': 'How It Works',
    faq: 'FAQ',
    science: 'Science',
    safety: 'Safety',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    'best-litter-odor-remover-small-apartments': 'Best Odor Remover for Small Apartments',
    'most-powerful-odor-absorber': 'Most Powerful Odor Absorber',
  },
  fr: {
    products: 'Produits',
    'trial-size': 'Essai GRATUIT',
    standard: 'Standard',
    'family-pack': 'Pack Familial',
    learn: 'Apprendre',
    'how-it-works': 'Comment ça marche',
    faq: 'FAQ',
    science: 'Science',
    safety: 'Sécurité',
    blog: 'Blog',
    about: 'À propos',
    contact: 'Contact',
    'best-litter-odor-remover-small-apartments': 'Meilleur éliminateur d\'odeur pour petits appartements',
    'most-powerful-odor-absorber': 'Absorbeur d\'odeur le plus puissant',
  },
  zh: {
    products: '产品',
    'trial-size': '免费试用',
    standard: '标准装',
    'family-pack': '家庭装',
    learn: '了解更多',
    'how-it-works': '工作原理',
    faq: '常见问题',
    science: '科学原理',
    safety: '安全性',
    blog: '博客',
    about: '关于我们',
    contact: '联系我们',
    'best-litter-odor-remover-small-apartments': '小公寓最佳除臭剂',
    'most-powerful-odor-absorber': '最强效除臭剂',
  },
};

/**
 * Get label for a path segment
 */
function getSegmentLabel(segment: string, locale: string): string {
  const labels = SEGMENT_LABELS[locale] || SEGMENT_LABELS.en;
  return labels[segment] || segment.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

/**
 * Get home label based on locale
 */
function getHomeLabel(locale: string): string {
  const homeLabels: Record<string, string> = {
    en: 'Home',
    fr: 'Accueil',
    zh: '首页',
  };
  return homeLabels[locale] || homeLabels.en;
}

/**
 * useBreadcrumb Hook
 * Generates breadcrumb items and structured data schema
 *
 * @param path - Current page path (e.g., '/products/trial-size')
 * @returns Breadcrumb items and schema.org BreadcrumbList
 *
 * @example
 * ```tsx
 * const { items, schema } = useBreadcrumb('/products/trial-size');
 *
 * // Render breadcrumb UI
 * {items.map(item => <a href={item.path}>{item.name}</a>)}
 *
 * // Add schema to page
 * <script type="application/ld+json">{JSON.stringify(schema)}</script>
 * ```
 */
export function useBreadcrumb(path: string): BreadcrumbResult {
  const { locale } = useTranslation();

  // Parse path into segments
  const segments = path.split('/').filter(Boolean);

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [
    {
      name: getHomeLabel(locale),
      path: '/',
      position: 1,
    },
  ];

  // Add breadcrumb for each segment
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      name: getSegmentLabel(segment, locale),
      path: currentPath,
      position: index + 2,
    });
  });

  // Generate schema.org BreadcrumbList
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: getLocalizedUrl(item.path, locale),
    })),
  };

  return {
    items,
    schema,
  };
}
