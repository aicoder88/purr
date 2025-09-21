// import Link from 'next/link';
import { useCallback, useId, useMemo, useState } from 'react';
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
  const menuInstanceId = useId();
  const buttonId = `${menuInstanceId}-trigger`;
  const menuId = `${menuInstanceId}-menu`;

  const currentLanguage = useMemo(
    () => languages.find(lang => lang.locale === locale) || languages[0],
    [locale]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLanguageChange = useCallback((newLocale: Locale) => {
    closeDropdown();
    changeLocale(newLocale);
  }, [changeLocale, closeDropdown]);

  const createLanguageClickHandler = useCallback((newLocale: Locale) => () => {
    handleLanguageChange(newLocale);
  }, [handleLanguageChange]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-1 px-2 py-1 hover:bg-[#FFFFF5]"
        onClick={toggleDropdown}
        id={buttonId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <Image 
          src={currentLanguage.flag} 
          alt={currentLanguage.alt} 
          width={20}
          height={20}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-800 dark:text-gray-100 dark:text-gray-100">{currentLanguage.name}</span>
        <ChevronDown className="h-4 w-4 text-[#FF3131]" />
      </Button>

      {isOpen && (
        <div 
          id={menuId}
          className="absolute right-0 mt-1 w-32 sm:w-40 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 z-50"
          aria-labelledby={buttonId}
          onMouseLeave={closeDropdown}
        >
          <ul className="py-1" aria-labelledby={buttonId}>
            {languages.map((language) => (
              <li key={language.locale}>
                <button
                  className={`flex items-center px-3 py-2 text-sm w-full text-left ${
                    locale === language.locale
                      ? 'bg-[#FFFFF5] dark:bg-gray-800 text-[#FF3131] dark:text-[#FF5050] font-medium'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-[#FFFFF5] dark:hover:bg-gray-800 hover:text-[#FF3131] dark:hover:text-[#FF5050]'
                  }`}
                  onClick={createLanguageClickHandler(language.locale)}
                  type="button"
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
