import { Container } from '@/components/ui/container';
import { LucideIcon } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface TimelineSectionProps {
  title: string;
  subtitle?: string;
  items: TimelineItem[];
  className?: string;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  title,
  subtitle,
  items,
  className = "py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50"
}) => {
  return (
    <section className={className}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#5B2EFF] hidden lg:block"></div>
          
          <div className="space-y-12">
            {items.map((item, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className="lg:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#5B2EFF] rounded-full flex items-center justify-center mr-4">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#FF3131]">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="hidden lg:block w-6 h-6 bg-[#FF3131] rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                
                {/* Spacer */}
                <div className="lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};