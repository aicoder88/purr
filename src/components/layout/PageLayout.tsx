import { Container } from '@/components/ui/container';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerized?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = "min-h-screen bg-[#FFFFF5] bg-gray-900 transition-colors duration-300",
  containerized = false 
}) => {
  if (containerized) {
    return (
      <Container className={className}>
        {children}
      </Container>
    );
  }

  return (
    <main className={className}>
      {children}
    </main>
  );
};