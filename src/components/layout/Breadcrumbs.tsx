import Link from 'next/link';
import { Home } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useTranslation } from '@/lib/translation-context';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className = "py-4 border-b border-[#E0EFC7] dark:border-gray-800" 
}) => {
  const { locale } = useTranslation();
  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  return (
    <section className={className}>
      <Container>
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href={homeHref} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          {items.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <span>/</span>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </Container>
    </section>
  );
};