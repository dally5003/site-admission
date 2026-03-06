// src/components/LanguageSwitcher.tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
      title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
    >
      {language === 'fr' ? (
        <>
          <span>🇫🇷</span>
          <span>FR</span>
        </>
      ) : (
        <>
          <span>🇬🇧</span>
          <span>EN</span>
        </>
      )}
    </button>
  );
}