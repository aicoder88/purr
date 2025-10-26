const SectionHeader = ({ text }: { text: string }) => {
  const highlightTexts = [
    '7 Days of Fresh Air Guaranteed',
    'Fresh Air in 60 Seconds - Simple as 1-2-3'
  ];
  const normalized = text.trim();
  const isHighlighted = highlightTexts.includes(normalized);

  return (
    <div className="section-header">
      <h2>
        {isHighlighted ? (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E0EFC7]/80 text-[#2F3F1C] dark:bg-[#20391F]/80 dark:text-[#D4F8D0] text-sm sm:text-base font-semibold tracking-wide transition-colors duration-300">
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
