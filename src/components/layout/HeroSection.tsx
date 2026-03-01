import { Container } from '@/components/ui/container';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HeroSectionProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  icon: Icon,
  title,
  subtitle,
  description,
  children,
  className = "py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]",
  iconClassName = "w-16 h-16 mx-auto mb-6 opacity-90"
}) => {
  return (
    <section className={className}>
      <Container>
        <div className="text-center text-white text-gray-100 text-gray-100 max-w-4xl mx-auto">
          {Icon && <Icon className={iconClassName} />}
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
};