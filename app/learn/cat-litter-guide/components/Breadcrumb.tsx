'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  localePrefix: string;
  copy: {
    breadcrumbAriaLabel: string;
    homeSrOnly: string;
    breadcrumbLearn: string;
    breadcrumbGuide: string;
  };
}

export default function Breadcrumb({ localePrefix, copy }: BreadcrumbProps) {
  const homePath = localePrefix || '/';
  const breadcrumbItems = [
    { name: copy.breadcrumbLearn, path: `${localePrefix}/learn` },
    { name: copy.breadcrumbGuide, path: `${localePrefix}/learn/cat-litter-guide` },
  ];

  return (
    <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
      <Container>
        <nav aria-label={copy.breadcrumbAriaLabel} className="flex items-center text-sm">
          <Link href={homePath} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">{copy.homeSrOnly}</span>
          </Link>
          {breadcrumbItems.map((item, index, arr) => (
            <span key={item.path} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
              {index === arr.length - 1 ? (
                <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
              ) : (
                <Link href={item.path} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </Container>
    </section>
  );
}
