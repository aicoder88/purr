// import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from './button';
import { useTranslation } from '../../lib/translation-context';
import { Locale } from '../../translations';

interface LanguageOption {
  locale: Locale;
  name: string;
  flag: string;
  alt: string;
}

const languages: LanguageOption[] = [
  {
    locale: 'en',
    name: 'English',
    flag: '/flags/en.svg',
    alt: 'English Flag'
  },
  {
    locale: 'fr',
    name: 'Français',
    flag: '/flags/fr.svg',
    alt: 'French Flag'
  },
  {
    locale: 'zh',
    name: '中文',
    flag: '/flags/zh.svg',
    alt: 'Chinese Flag'
  }
];

export function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.locale === locale) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    // Close dropdown immediately for better UX
    closeDropdown();
    
    // Use the changeLocale function from context which handles routing properly
    // This will trigger Next.js router navigation and update the translation context
    changeLocale(newLocale);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-1 px-2 py-1 hover:bg-[#FFFFF5]"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image 
          src={currentLanguage.flag} 
          alt={currentLanguage.alt} 
          width={20}
          height={20}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-800 dark:text-gray-100">{currentLanguage.name}</span>
        <ChevronDown className="h-4 w-4 text-[#FF3131]" />
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-32 sm:w-40 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 z-50"
          onMouseLeave={closeDropdown}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.locale}
                className={`flex items-center px-3 py-2 text-sm w-full text-left ${
                  locale === language.locale
                    ? 'bg-[#FFFFF5] dark:bg-gray-800 text-[#FF3131] dark:text-[#FF5050] font-medium'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-[#FFFFF5] dark:hover:bg-gray-800 hover:text-[#FF3131] dark:hover:text-[#FF5050]'
                }`}
                onClick={() => handleLanguageChange(language.locale)}
                role="menuitem"
              >
                <Image 
                  src={language.flag} 
                  alt={language.alt} 
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover mr-2 sm:mr-3"
                />
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}