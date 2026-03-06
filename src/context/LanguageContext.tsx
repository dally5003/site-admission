// src/context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  translations: Record<string, any>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger la langue au montage
  useEffect(() => {
    const savedLanguage = (localStorage.getItem('language') as Language) || 'fr';
    setLanguageState(savedLanguage);
    document.documentElement.lang = savedLanguage;
  }, []);

  // Charger les traductions quand la langue change
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        const data = await response.json();
        setTranslations(data);
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
      } catch (error) {
        console.error('Erreur chargement traductions:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        translations,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
}