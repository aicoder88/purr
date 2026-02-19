import { useTranslations, useLocale } from "next-intl";

// Default highlight texts for fallback
const defaultHighlightTexts = [
  '7 Days of Fresh Air Guaranteed',
  'Fresh Air in 60 Seconds - Simple as 1-2-3'
];

const SectionHeader = ({ text }: { text: string }) => {
  const t = useTranslations();
  const highlightTexts = t('sectionHeaderHighlights') || defaultHighlightTexts;
  const normalized = text.trim();
  const isHighlighted = highlightTexts.includes(normalized);

  return (
    <div className="section-header">
      <h2>
        {isHighlighted ? (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FF10F0]/70 text-white dark:bg-[#FF10F0]/60 dark:text-white text-sm sm:text-base font-semibold tracking-wide transition-colors duration-300">
            {text}
          </span>
        ) : (
          text
        )}
      </h2>
    </div>
  );
};

export default SectionHeader;
