import { Container } from '@/components/ui/container';
import { LucideIcon } from 'lucide-react';

interface GridItem {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  [key: string]: string | number | LucideIcon | undefined;
}

interface GridSectionProps {
  title: string;
  subtitle?: string;
  items: GridItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  itemClassName?: string;
  renderItem?: (item: GridItem, index: number) => React.ReactNode;
}

export const GridSection: React.FC<GridSectionProps> = ({
  title,
  subtitle,
  items,
  columns = 4,
  className = "py-16",
  itemClassName = "text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700",
  renderItem
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const defaultRenderItem = (item: GridItem, index: number) => (
    <div key={index} className={itemClassName}>
      {item.icon && (
        <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
          <item.icon className="w-8 h-8 text-white dark:text-white dark:text-gray-100" />
        </div>
      )}
      <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        {item.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {item.description}
      </p>
    </div>
  );

  return (
    <section className={className}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {items.map((item, index) => 
            renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
          )}
        </div>
      </Container>
    </section>
  );
};