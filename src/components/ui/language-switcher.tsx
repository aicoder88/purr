'use client';

// import Link from 'next/link';
import { useCallback, useId, useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from './button';
import { useTranslation } from '@/lib/translation-context';
import { Locale } from '@/translations';

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
    name: 'Francais',
    flag: '/flags/fr.svg',
    alt: 'French Flag'
  }
];

export function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuInstanceId = useId();
  const buttonId = `${menuInstanceId}-trigger`;
  const menuId = `${menuInstanceId}-menu`;
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const scheduleClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleLanguageChange = useCallback((newLocale: Locale) => {
    closeDropdown();
    changeLocale(newLocale);
  }, [changeLocale, closeDropdown]);

  const createLanguageClickHandler = useCallback((newLocale: Locale) => () => {
    handleLanguageChange(newLocale);
  }, [handleLanguageChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-1 px-1.5 sm:px-2 py-1 hover:bg-[#FFFFF5] dark:hover:bg-gray-800"
        onClick={toggleDropdown}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
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
        <span className="sr-only">{currentLanguage.name}</span>
        <ChevronDown className="h-4 w-4 text-[#FF3131] dark:text-[#FF5050]" />
      </Button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute right-0 mt-1 w-32 sm:w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 dark:ring-opacity-50 z-50"
          aria-labelledby={buttonId}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <ul className="py-1" aria-labelledby={buttonId}>
            {languages.map((language) => (
              <li key={language.locale}>
                <button
                  className={`flex items-center px-3 py-2 text-sm w-full text-left ${locale === language.locale
                    ? 'bg-[#FFFFF5] dark:bg-gray-700 text-[#FF3131] dark:text-[#FF5050] font-medium'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-[#FFFFF5] dark:hover:bg-gray-700 hover:text-[#FF3131] dark:hover:text-[#FF5050]'
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
